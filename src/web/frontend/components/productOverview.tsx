import React from "react";
import Product from "../../../lib/product";
import { Link } from "react-router-dom";
import ProductImage from "./ProductImage";
import Price from "./Price";

export interface ProductOverviewProps {
  product: Product;
}

export interface ProductOverviewState {}

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
      <div className="overview-item">
        <Link to={`/product/${product.id}`} className="no-link">
          <ProductImage product={product} className="overview" />
          <p>
            <b>{product.productName}</b>
          </p>
          <Price product={product}/>
        </Link>
      </div>
    );
  }
}
