class Stock {
    constructor(name, price, quantity, promoType = null, promoStartDate = null, promoEndDate = null) {
      this.name = name; // 상품명
      this.price = price; // 기본 가격
      this.quantity = quantity; // 재고 수량
      this.promoType = promoType; // 프로모션 타입 (예: "1+1", "2+1")
      this.promoStartDate = promoStartDate; // 프로모션 시작일
      this.promoEndDate = promoEndDate; // 프로모션 종료일
    }
}

export default Stock;