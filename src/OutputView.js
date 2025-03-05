import { Console } from "@woowacourse/mission-utils";

class OutputView { 
    static printProducts(products) {
        Console.print("안녕하세요. W편의점입니다.");
        Console.print("현재 보유하고 있는 상품입니다.");
        Console.print("");
        products.forEach((product) => {
            if (product.quantity === 0){
                Console.print(`- ${product.name} ${product.price}원 재고 없음 ${product.promoType ? product.promoType : ""}`);
            } else {
                Console.print(`- ${product.name} ${product.price}원 ${product.quantity}개 ${product.promoType ? product.promoType : ""}`);
            }
        });
        Console.print("");
    }

    static printReceipt(items, total, promoDiscount, membershipDiscount, finalAmount) {
        Console.print("===========W 편의점=============");
        items.forEach((item) => Console.print(`${item.name} ${item.count} ${item.price}`));
        Console.print("===========증 정=============");
        items.forEach((item) => Console.print(`${item.name} ${item.price}`));
        Console.print("==============================");
        Console.print(`총구매액: ${total}원`);
        Console.print(`행사할인: -${promoDiscount}원`);
        Console.print(`멤버십할인: -${membershipDiscount}원`);
        Console.print(`내실돈: ${finalAmount}원`);
    }
}

export default OutputView;