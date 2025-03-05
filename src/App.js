import { Console } from "@woowacourse/mission-utils";
import OutputView from "./OutputView.js";
import InputView from "./InputView.js";
import Stock from "./Stock.js";
import StockManager from "./StockManager.js";


class App {
  constructor(){
    this.initializeStock();
    this.addProductList = StockManager.AllStocks;
  }

  async run() {
    //다시 실행시 초기화 
    let total = 0;
    let promoDiscount = 0;
    let membershipDiscount = 0;
    let finalAmount = 0;
    this.addProductList = StockManager.AllStocks

    //출력1 : 상품 목록 출력 
    await OutputView.printProducts(this.addProductList);

    //입력1 : 구매 상품 입력 
    const items = await this.readItem(); //배열 [ { name: '사이다', count: 2 }, { name: '감자칩', count: 1 } ]

    //재고 관리1 : 재고 확인, 업데이트 가능여부 확인, 재고 업데이트 (프로모션 무시)
    for(let stock of StockManager.AllStocks){
      for (let item of items){
        if(stock.name == item.name){
          if(!StockManager.noStock(stock)){
            if(!StockManager.updateImpossible(stock,item.count)){
              stock.reduceQuantity(item.count);
            }
          }
        }
      }
    }

    //입력2 : 멤버십 할인 적용 여부 입력 
    const membership = await this.membershipSelect();

    //구할 것들~
    total = 10000;
    promoDiscount = 10000;
    membershipDiscount = 10000;
    finalAmount = 10000;

    //출력2 : 영수증 출력
    await OutputView.printReceipt(items, total, promoDiscount, membershipDiscount, finalAmount);

    //입력2 : 추가 구매 여부 입력
    const reStart = (await Console.readLineAsync("감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)?")) === "Y";
    if (reStart) {
      this.run();
    }
  }

  async readItem() {
    try {
      const input = await InputView.readItem();

      //error1 : 문자열X, 공백 -> 제대로 받은 경우 전처리
      if (typeof input !== 'string' || input.trim() === '') {
        throw new Error("[ERROR] 입력값이 올바르지 않습니다.");
      }
      const items = input.split(',');
      const selectedItems = [];

      items.forEach(item => {
        //error2 : [, -, ]가 포함되어있지 않음 
        const match = item.match(/^\[(.+)-(\d+)\]$/);
        if (!match) {
          throw new Error("[ERROR] 입력값이 올바르지 않습니다.");
        }

        //error3 : name이 없거나, 개수가 숫자가 아니거나, 마이너스인 경우 
        const name = match[1].trim();
        const count = parseInt(match[2], 10);
        if (!name || isNaN(count) || count <= 0) {
            throw new Error("[ERROR] 입력값이 올바르지 않습니다.");
        }

        //error4 : 상품 목록에 없는 상품을 선택한 경우 
        const existingProd = this.addProductList.find(obj => obj.name === name);
        if (!existingProd) {
          throw new Error("[ERROR] 존재하지 않는 상품입니다.");
        }

        //예외 : 똑같은 상품을 여러 번 선택 
        const existingItem = selectedItems.find(obj => obj.name === name);
        if (existingItem) {
            existingItem.count += count;
        } else {
          selectedItems.push({ name, count });
        }
      });
      return selectedItems; // 배열 반환 [ { name: '사이다', count: 2 }, { name: '감자칩', count: 1 } ]

    } catch (error) {
      Console.print(error.message);
      return this.readItem();
    }
  }

  async membershipSelect() {
    try {
      const input = await InputView.askMembership();
      if (input !== 'Y' && input !== 'N') {
        throw new Error("[ERROR] Y/N로 입력해주세요.");
      }
      return input;
    } catch (error) {
      Console.print(error.message);
      return this.membershipSelect();
    }
  }

  async promoSelect() {
    try {
      const input = await InputView.askPromotionAdd();
      if (input !== 'Y' && input !== 'N') {
        throw new Error("[ERROR] Y/N로 입력해주세요.");
      }
      return input;
    } catch (error) {
      Console.print(error.message);
      return this.membershipSelect();
    }
  }

  async whenNoPromoSelect() {
    try {
      const input = await InputView.askPromotionQuit();
      if (input !== 'Y' && input !== 'N') {
        throw new Error("[ERROR] Y/N로 입력해주세요.");
      }
      return input;
    } catch (error) {
      Console.print(error.message);
      return this.membershipSelect();
    }
  }

  initializeStock(){
    StockManager.addProduct((new Stock("콜라", 1000, 10, "탄산2+1", "2025-03-01", "2025-03-10")));
    StockManager.addProduct((new Stock("콜라", 1000, 10, "2025-03-01", "2025-03-10")));
    StockManager.addProduct((new Stock("사이다", 1000, 8, "탄산2+1", "2025-03-01", "2025-03-10")));
    StockManager.addProduct((new Stock("사이다", 1000, 7, "2025-03-01", "2025-03-10")));
    StockManager.addProduct((new Stock("오렌지주스", 1800, 9, "MD추천상품", "","")));
    StockManager.addProduct((new Stock("오렌지주스", 1800, 0)));
    StockManager.addProduct((new Stock("탄산수", 1200, 5, "탄산2+1", "2025-03-01", "2025-03-10")));
    StockManager.addProduct((new Stock("탄산수", 1200, 0)));
    StockManager.addProduct((new Stock("물", 500, 10)));
    StockManager.addProduct((new Stock("비타민워터", 1500, 6)));
    StockManager.addProduct((new Stock("감자칩", 1500, 5, "반짝할인", "", "")));
    StockManager.addProduct((new Stock("감자칩", 1500, 5)));
    StockManager.addProduct((new Stock("초코바", 1200, 5, "MD추천상품", "","")));
    StockManager.addProduct((new Stock("초코바", 1200, 5)));
    StockManager.addProduct((new Stock("에너지바", 2000, 5)));
    StockManager.addProduct((new Stock("정식도시락", 6400, 8)));
    StockManager.addProduct((new Stock("컵라면", 1700, 1, "MD추천상품", "","")));
    StockManager.addProduct((new Stock("컵라면", 1700, 10)));
  }
}

export default App;