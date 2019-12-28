import React from "react";
import ProductOverview from "./ProductOverview";
import Product from "../../../lib/product";
import { Switch, Route } from "react-router-dom";
import ProductDetail from "./productDetail";
import ShoppingCart from "./ShoppingCart";
import Header from "./Header";

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
    return (
      <div>
        <Header />
        <main>
          <Switch>
            <Route path="/product/:id" >
              <ProductDetail />
            </Route>
            <Route path="/shoppingcart" >
              <ShoppingCart />
            </Route>
            <Route path="/" exact>
              {this.state.products.map(x => <ProductOverview product={x} key={x.id} />)}
            </Route>
          </Switch>
        </main>
      </div>);
  }
}
