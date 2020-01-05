import * as React from "react";
import { Link } from "react-router-dom";
import ShoppingCartLib from "../../../lib/shoppingCart";
import ProductRow from "./ProductRow";
import Product from "../../../lib/product";

export interface ShoppingCartProps {}

export interface ShoppingCartState {
  shoppingCart: ShoppingCartLib;
}

export default class ShoppingCart extends React.Component<
  ShoppingCartProps,
  ShoppingCartState
> {
  constructor(props: ShoppingCartProps) {
    super(props);

    this.state = { shoppingCart: new ShoppingCartLib() };
  }

  componentDidMount() {
    fetch("/api/shoppingcart")
      .then(response => response.json())
      .then(shoppingcart => {
        let cart = shoppingcart as ShoppingCartLib;
        this.setState({ shoppingCart: cart });
      });
  }

  groupBy<TKey, TValue>(
    list: Array<TValue>,
    keyGetter: (item: TValue) => TKey
  ) {
    const map = new Map<TKey, TValue[]>();
    list.forEach(item => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }

  render() {
    if (this.state.shoppingCart.allProducts.length === 0) {
      return null;
    }

    const groupedProducts = this.groupBy(
      this.state.shoppingCart.allProducts,
      product => product.id
    );
    const productsRows = new Array<JSX.Element>();
    groupedProducts.forEach(products =>
      productsRows.push(
        <ProductRow
          product={products[0]}
          productCount={products.length}
          key={products[0].id}
        />
      )
    );

    let productTable = (
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Amount</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>{productsRows}</tbody>
        <tfoot>
          <tr>
            <td />
            <td />
            <td />
            <td>100</td>
          </tr>
        </tfoot>
      </table>
    );

    return (
      <div>
        {productTable}
        <Link to="/checkout">Checkout</Link>
      </div>
    );
  }
}
