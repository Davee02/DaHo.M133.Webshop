import * as React from "react";
import Product from "../../../lib/product";

export interface ProductRowProps {
  product: Product;
  productCount: number;
}

export interface ProductRowState {}

export default class ProductRow extends React.Component<
  ProductRowProps,
  ProductRowState
> {
  constructor(props: ProductRowProps) {
    super(props);
  }

  render() {
    const product = this.props.product;
    const singlePrice = (product.specialOffer || product.normalPrice);

    return (
      <tr>
        <td>{product.productName}</td>
        <td>{<p>CHF {singlePrice.toFixed(2)}</p>}</td>
        <td>{this.props.productCount}</td>
        <td>{<p>CHF {(singlePrice * this.props.productCount).toFixed(2)}</p>}</td>
      </tr>
    );
  }
}
