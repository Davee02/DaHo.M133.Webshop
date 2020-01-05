import * as React from "react";
import { Link } from "react-router-dom";
import ShoppingCartLib from "../../../lib/shoppingCart";

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

  render() {
    if (this.state.shoppingCart.allProducts.length === 0) {
      return null;
    }

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
        <tbody></tbody>
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

    return <Link to="/checkout">Checkout</Link>;
  }
}
