import React from "react";
import ProductOverview from "./productOverview";
import Product from "../../../lib/product";

export interface AppProps {
}

export interface AppState {
  products: Product[];
}

export default class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { products: new Array<Product>() }
  }

  componentDidMount() {
    fetch("/api/product/list")
      .then(response => response.json())
      .then(products => { this.setState({ products }) });
  }

  render() {
    const productComponents = this.state.products.map(x => <ProductOverview product={x} key={x.id} />);

    return productComponents;
  }
}
