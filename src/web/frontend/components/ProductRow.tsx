import * as React from "react";
import Product from "../../../lib/product";

export interface ProductRowProps {
  product: Product;
  productCount: number;
  onCartUpdate: () => void;
}

export interface ProductRowState {
  productCount: number;
}

export default class ProductRow extends React.Component<
  ProductRowProps,
  ProductRowState
> {
  constructor(props: ProductRowProps) {
    super(props);

    this.state = { productCount: this.props.productCount };
    this.incrementProductCount = this.incrementProductCount.bind(this);
    this.decrementProductCount = this.decrementProductCount.bind(this);
  }

  incrementProductCount() {
    fetch(`/api/shoppingcart/add/${this.props.product.id}`, {
      method: "PUT"
    }).then(_ => this.props.onCartUpdate());

    this.setState(state => ({ productCount: state.productCount + 1 }));
  }

  decrementProductCount() {
    fetch(`/api/shoppingcart/remove/${this.props.product.id}`, {
      method: "PUT"
    }).then(_ => this.props.onCartUpdate());

    this.setState(state => ({ productCount: state.productCount - 1 }));
  }

  render() {
    const product = this.props.product;
    const singlePrice = product.specialOffer || product.normalPrice;

    return (
      <tr>
        <td>{product.productName}</td>
        <td>{<p>CHF {singlePrice.toFixed(2)}</p>}</td>
        <td>
          <div>
            <button onClick={this.decrementProductCount}>-</button>
            {this.state.productCount}
            <button onClick={this.incrementProductCount}>+</button>
          </div>
        </td>
        <td>
          {<p>CHF {(singlePrice * this.state.productCount).toFixed(2)}</p>}
        </td>
      </tr>
    );
  }
}
