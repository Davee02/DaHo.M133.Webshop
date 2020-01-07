import * as React from "react";
import { Link } from "react-router-dom";
import ShoppingCartLib from "../../../lib/shoppingCart";
import ProductRow from "./ProductRow";

export interface ShoppingCartProps {
  onCartUpdate: () => void;
}

export interface ShoppingCartState {
  shoppingCart: ShoppingCartLib;
  totalPrice: number;
}

export default class ShoppingCart extends React.Component<
  ShoppingCartProps,
  ShoppingCartState
> {
  constructor(props: ShoppingCartProps) {
    super(props);

    this.onCartUpdate = this.onCartUpdate.bind(this);
    this.state = { shoppingCart: new ShoppingCartLib(), totalPrice: 0 };
  }

  componentDidMount() {
    this.onCartUpdate();
  }

  onCartUpdate() {
    fetch("/api/shoppingcart/price")
      .then(response => response.json())
      .then(price => {
        if (price !== this.state.totalPrice) {
          this.props.onCartUpdate();
          this.setState({ totalPrice: price });
        }
      });

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
      return <h3>Your shopping cart is empty.</h3>;
    }

    const sortedProducts = this.state.shoppingCart.allProducts.sort((a, b) =>
      a.id > b.id ? 1 : -1
    );

    const groupedProducts = this.groupBy(sortedProducts, product => product.id);
    const productsRows = new Array<JSX.Element>();
    groupedProducts.forEach(products =>
      productsRows.push(
        <ProductRow
          product={products[0]}
          productCount={products.length}
          onCartUpdate={() => this.onCartUpdate()}
          key={products[0].id}
        />
      )
    );

    let productTable = (
      <table className="shoppingcart">
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
            <td>CHF {this.state.totalPrice.toFixed(2)}</td>
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
