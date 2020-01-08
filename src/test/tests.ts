import { expect } from "chai";
import Product from "../lib/product";
import ShoppingCart from "../lib/shoppingCart";
import { groupBy } from "../lib/helper";

describe("Shopping cart", () => {
  it("calculates total price with special offers", () => {
    const products = new Array<Product>(
      new Product(1, "Product 1", 10, 15, "", ""),
      new Product(2, "Product 2", 15, 20, "", ""),
      new Product(3, "Product 3", 5, 10, "", ""),
      new Product(4, "Product 4", 10, 100, "", "")
    );
    
    const cart = new ShoppingCart();
    cart.allProducts = products;

    expect(cart.getTotalPrice()).to.be.equal(40);
  });

  it("calculates total price with normal prices", () => {
    const products = new Array<Product>(
      new Product(1, "Product 1", 0, 10, "", ""),
      new Product(2, "Product 2", 0, 15, "", ""),
      new Product(3, "Product 3", 0, 5, "", ""),
      new Product(4, "Product 4", 0, 10, "", "")
    );

    const cart = new ShoppingCart();
    cart.allProducts = products;

    expect(cart.getTotalPrice()).to.be.equal(40);
  });

  it("groups same products", () => {
    const products = new Array<Product>(
      new Product(1, "Product 1", 0, 10, "", ""),
      new Product(1, "Product 1", 0, 10, "", ""),
      new Product(1, "Product 1", 0, 10, "", ""),
      new Product(2, "Product 2", 0, 20, "", ""),
      new Product(2, "Product 2", 0, 20, "", ""),
      new Product(3, "Product 3", 0, 30, "", "")
    );

    const groupedProducts = groupBy(products, product => product.id);
    const productOnes = groupedProducts.get(1);
    const productTwos = groupedProducts.get(2);
    const productThrees = groupedProducts.get(3);

    expect(productOnes?.length).to.be.equal(3);
    expect(productTwos?.length).to.be.equal(2);
    expect(productThrees?.length).to.be.equal(1);
  });
});
