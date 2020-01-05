import * as React from "react";
import { Link } from "react-router-dom";

export interface MiniShoppingCartProps {}

export interface MiniShoppingCartState {
  totalPrice: number;
}

export default class MiniShoppingCart extends React.Component<
  MiniShoppingCartProps,
  MiniShoppingCartState
> {
  constructor(props: MiniShoppingCartProps) {
    super(props);

    this.state = { totalPrice: 0 };
  }

  componentDidUpdate(
    prevProps: MiniShoppingCartProps,
    prevState: MiniShoppingCartState
  ) {
    fetch("/api/shoppingcart/price")
      .then(response => response.json())
      .then(price => {
        if (price !== prevState.totalPrice) {
          this.setState({ totalPrice: price });
        }
      });
  }

  render() {
    return (
      <Link to="/shoppingcart" className="minishoppingcart-container no-link">
        <img
          src={`/assets/img/shoppingcart.png`}
          alt="Shopping cart"
          height={30}
        />
        <p>CHF {this.state.totalPrice.toFixed(2)}</p>
      </Link>
    );
  }
}
