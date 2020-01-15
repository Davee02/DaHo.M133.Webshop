import React from "react";
import ProductOverview from "./ProductOverview";
import Product from "../../../lib/product";
import { Switch, Route, Redirect } from "react-router-dom";
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

  private ProductDetailPage = () => (
    <ProductDetail
      onCartUpdate={() => {
        this.onCartUpdate();
      }}
    />
  );

  private ShoppingCartPage = () => (
    <ShoppingCart
      onCartUpdate={() => {
        this.onCartUpdate();
      }}
    />
  );

  private CheckoutPage = () => (
    <Checkout onSuccessfulCheckout={() => this.onCartUpdate()} />
  );

  private OverviewPage = () => (
    <div className="overview-container">
      {this.state.products.map(x => (
        <ProductOverview product={x} key={x.id} />
      ))}
    </div>
  );

  private RedirectToRoot = () => <Redirect to="/" />;

  render() {
    return (
      <div>
        <Header />
        <hr />
        <main>
          <Switch>
            <Route path="/product/:id" component={this.ProductDetailPage} />
            <Route path="/shoppingcart" component={this.ShoppingCartPage} />
            <Route path="/checkout" component={this.CheckoutPage} />
            <Route path="/" exact component={this.OverviewPage} />
            <Route component={this.RedirectToRoot} />
          </Switch>
        </main>
      </div>
    );
  }
}
