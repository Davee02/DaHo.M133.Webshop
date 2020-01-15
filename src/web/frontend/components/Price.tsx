import React from "react";
import Product from "../../../lib/product";

export interface PriceProps {
  product: Product;
}

export interface PriceState {}

export default class Price extends React.Component<PriceProps, PriceState> {
  constructor(props: PriceProps) {
    super(props);
  }

  render() {
    let product = this.props.product;

    return (
      <div>
        {product.specialOffer ? (
          <p>
            CHF {product.specialOffer.toFixed(2)}{" "}
            <s className="crossed-out">CHF {product.normalPrice.toFixed(2)}</s>
          </p>
        ) : (
          <p>CHF {product.normalPrice.toFixed(2)}</p>
        )}
      </div>
    );
  }
}
