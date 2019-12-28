import * as React from "react";
import { Link } from "react-router-dom";
import ShoppingCart from "../../../lib/shoppingCart";

export interface MiniShoppingCartProps {

}

export interface MiniShoppingCartState {
    totalPrice: number;
}

export default class MiniShoppingCart extends React.Component<MiniShoppingCartProps, MiniShoppingCartState> {
    constructor(props: MiniShoppingCartProps) {
        super(props);

        this.state = { totalPrice: 0 };
    }

    
    componentDidUpdate() {
        fetch("/api/shoppingcart")
            .then(response => response.json())
            .then(shoppingcart => {
                let cart = (shoppingcart as ShoppingCart);
                cart.getTotalPrice = new ShoppingCart().getTotalPrice;

                this.setState({ totalPrice: cart.getTotalPrice() });
            });
    }

    render() {
        return (
            <Link to="/shoppingcart">
                <p>
                    CHF {this.state.totalPrice.toFixed(2)}
                    <img
                        src={`/assets/img/shoppingcart.png`}
                        alt="Shopping cart"
                        height={30} />
                </p>
            </Link>
        );
    }
}
