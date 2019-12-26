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

    this.state = { product: Product.Dummy() };
    this.addToCartClicked = this.addToCartClicked.bind(this);
  }

  componentDidMount() {
    fetch(`/api/product/${this.props.match.params.id}`)
      .then(response => response.json())
      .then(product => { this.setState({ product }) });
  }

  addToCartClicked() {

  }

  render() {
    let product = this.state.product;
    return (
      <section>
        <ProductImage product={product} imageHeight={500} />
        <h3>{product.productName}</h3>
        <p>{product.description}</p>
        <button onClick={this.addToCartClicked}>Add to shopping cart</button>
      </section>
    );
  }
}

export default withRouter(ProductDetail)