import React from "react";
import ProductOverview from "./productOverview";
import Product from "../../../lib/product";

export default class App extends React.Component {
  render() {
    let product = new Product(1, "Eggs", 12.3, 15.5, "eier.jpg", "Sehr gute Eier");

    return <ProductOverview product={product} />;
  }
}
