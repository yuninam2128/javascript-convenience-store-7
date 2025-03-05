class StockManager{
    static AllStocks = [];

    //상품 추가
    static addProduct(stock) {
        this.AllStocks.push(stock);
    }

    //반환
    static getAllStocks() {return this.AllStocks;}

    //재고 상태 확인 
    static noStock(stock) {
        if (stock.quantity === 0) {return true;}
        else {return false;}
    }

    //업데이트시 재고 상태 확인 
    static updateImpossible(stock, count) {
        if (stock.quantity - count < 0) {return true;}
        else {return false;}
    }

    //재고 차감 
    static reduceNormalStock(count) {
    }

    static reducePromoStock(count) {
    }
}

export default StockManager;