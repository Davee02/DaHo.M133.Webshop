import * as React from "react";
import { Link } from "react-router-dom";

export interface ShoppingCartProps {}

export interface ShoppingCartState {}

export default class ShoppingCart extends React.Component<ShoppingCartProps, ShoppingCartState> {
  constructor(props: ShoppingCartProps) {
    super(props);
  }

  render() {
      return <Link to="/checkout">Checkout</Link>;
  }
}
