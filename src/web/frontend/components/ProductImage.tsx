import * as React from "react";
import Product from "../../../lib/product";

export interface ProductImageProps {
  product: Product;
  className?: string;
}

export interface ProductImageState {}

export default class ProductImage extends React.Component<
  ProductImageProps,
  ProductImageState
> {
  constructor(props: ProductImageProps) {
    super(props);
  }

  render() {
    let product = this.props.product;

    return (
      <img
        src={`/assets/img/${product.imageName}`}
        alt={product.productName}
        className={this.props.className}
      />
    );
  }
}
