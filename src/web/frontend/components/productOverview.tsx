import React from "react";
import Product from "../../../lib/product";

export interface ProductOverviewProps {
  product: Product;
}

export interface ProductOverviewState { }

export default class App extends React.Component<
  ProductOverviewProps,
  ProductOverviewState
  > {
  constructor(props: ProductOverviewProps) {
    super(props);
  }

  render() {
    let product = this.props.product;
    return (
      <section>
        <img
          src={`/assets/img/${product.imageName}`}
          alt={product.productName}
          height={250}
        />
        <p>{product.productName}</p>
        <p>{product.specialOffer} <s>{product.normalPrice}</s></p>
      </section>
    );
  }
}
