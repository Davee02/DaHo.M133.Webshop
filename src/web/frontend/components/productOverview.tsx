import React from "react";
import Product from "../../../lib/product";
import { Link } from "react-router-dom";
import ProductImage from "./ProductImage";

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
      <div className="overview-item">
        <Link to={`/product/${product.id}`}>
          <ProductImage product={product} className="overview" />
        </Link>
        <p><b>{product.productName}</b></p>
        {
          product.specialOffer
            ? <p>CHF {product.specialOffer.toFixed(2)} <s>CHF {product.normalPrice.toFixed(2)}</s></p>
            : <p>CHF {product.normalPrice.toFixed(2)}</p>
        }

      </div>
    );
  }
}
