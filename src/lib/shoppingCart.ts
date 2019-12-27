import Product from "./product";

export default class ShoppingCart {
    allProducts: Product[];

    constructor() {
        this.allProducts = new Array<Product>();
    }

    getTotalPrice(): number {
        let price = 0;

        this.allProducts.forEach(product => {
            price += product.specialOffer;
        });

        return price;
    }
}