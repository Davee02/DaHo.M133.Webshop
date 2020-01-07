import * as React from "react";
import { withRouter, RouteComponentProps, Redirect } from "react-router-dom";

export interface CheckoutProps extends RouteComponentProps {
  onSuccessfulCheckout: () => void;
}

export interface CheckoutState {
  checkoutIsFinished: boolean;
}

class Checkout extends React.Component<CheckoutProps, CheckoutState> {
  constructor(props: CheckoutProps) {
    super(props);

    this.state = { checkoutIsFinished: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const name = target.name;

    this.setState(state => ({
      [name]: target.value,
      checkoutIsFinished: state.checkoutIsFinished
    }));
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: { "Content-Type": "application/json" }
    }).then(response => {
      if (response.ok) {
        alert("Your checkout was made and you'll be redirected to the start-page.");
        this.setState({ checkoutIsFinished: true });
        this.props.onSuccessfulCheckout();
      } else {
        alert(
          "There was an error while processing your checkout. Maybe you used invalid data. Please retry it."
        );
      }
    });
  }

  render() {
    if (this.state.checkoutIsFinished) {
      return <Redirect to="/" />;
    }

    return (
      <form onSubmit={this.handleSubmit} className="checkout">
        <div>
          <label htmlFor="firstname">Firstname: </label>
          <input
            type="text"
            onChange={this.handleInputChange}
            name="firstname"
            id="firstname"
            required
          />
        </div>

        <div>
          <label htmlFor="lastname">Lastname: </label>
          <input
            type="text"
            onChange={this.handleInputChange}
            name="lastname"
            id="lastname"
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email-address: </label>
          <input
            type="email"
            onChange={this.handleInputChange}
            name="email"
            id="email"
            required
          />
        </div>

        <div>
          <label htmlFor="phone">Phone-number (only digits): </label>
          <input
            type="tel"
            onChange={this.handleInputChange}
            name="phone"
            id="phone"
            pattern="^\d*$"
            required
          />
        </div>

        <input type="submit" value="Complete the purchase" />
      </form>
    );
  }
}

export default withRouter(Checkout);
