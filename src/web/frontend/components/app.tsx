import React from "react";
import ProductOverview from "./ProductOverview";
import Product from "../../../lib/product";
import { Switch, Route } from "react-router-dom";
import ProductDetail from "./productDetail";
import ShoppingCart from "./ShoppingCart";
import Header from "./Header";
import Checkout from "./Checkout";

export interface AppProps {}

export interface AppState {
  products: Product[];
}

export default class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.onCartUpdate = this.onCartUpdate.bind(this);
    this.state = { products: new Array<Product>() };
  }

  componentDidMount() {
    this.onCartUpdate();
  }

  onCartUpdate() {
    fetch("/api/product/list")
      .then(response => response.json())
      .then(products => {
        this.setState({ products });
      });
  }

  render() {
    return (
      <div>
        <Header />
        <main>
          <Switch>
            <Route path="/product/:id">
              <ProductDetail
                onCartUpdate={() => {
                  this.onCartUpdate();
                }}
              />
            </Route>
            <Route path="/shoppingcart">
              <ShoppingCart
                onCartUpdate={() => {
                  this.onCartUpdate();
                }}
              />
            </Route>
            <Route path="/checkout">
              <Checkout onSuccessfulCheckout={() => this.onCartUpdate()} />
            </Route>
            <Route path="/" exact>
              <div className="overview-container">
                {this.state.products.map(x => (
                  <ProductOverview product={x} key={x.id} />
                ))}
              </div>
            </Route>
          </Switch>
        </main>
      </div>
    );
  }
}
