import * as React from "react";
import Product from "../../../lib/product";
import { RouteComponentProps, withRouter } from "react-router-dom";
import ProductImage from "./ProductImage";

export interface ProductDetailRouterProps {
  id: string;
}

export interface ProductDetailProps extends RouteComponentProps<ProductDetailRouterProps> {
}

export interface ProductDetailState {
  product: Product;
}

class ProductDetail extends React.Component<ProductDetailProps, ProductDetailState> {
  constructor(props: ProductDetailProps) {
    super(props);

    this.state = { product: new Product(0, "Loading", 0, 0, "loading.jpg", "Loading") };
    this.handleAddToCartClick = this.handleAddToCartClick.bind(this);
  }

  componentDidMount() {
    fetch(`/api/product/${this.props.match.params.id}`)
      .then(response => response.json())
      .then(product => { this.setState({ product }) });
  }

  handleAddToCartClick() {
    fetch(`/api/shoppingcart/add/${this.props.match.params.id}`, { method: "PUT" });
  }

  render() {
    let product = this.state.product;
    return (
      <section>
        <ProductImage product={product} imageHeight={500} />
        <h3>{product.productName}</h3>
        <p>{product.description}</p>
        <button onClick={this.handleAddToCartClick}>Add to shopping cart</button>
      </section>
    );
  }
}

export default withRouter(ProductDetail)