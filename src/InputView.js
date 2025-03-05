import { Console } from "@woowacourse/mission-utils";

class InputView {
  static async readItem() {
    return await Console.readLineAsync("구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])");
  }

  static async askPromotionAdd(product) {
    return await Console.readLineAsync(`현재 ${product}은(는) ${product}개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)`);
  }

  static async askPromotionQuit(product) {
    return await Console.readLineAsync(`현재 ${product} ${product}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)`);
  }

  static async askMembership() {
    return await Console.readLineAsync("멤버십 할인을 받으시겠습니까? (Y/N)");
  }
}

export default InputView;