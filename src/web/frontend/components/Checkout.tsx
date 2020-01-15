import * as React from "react";
import { withRouter, RouteComponentProps, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

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

  private showErrorToast() {
    toast.error(
      "There was an error processing your checkout. Maybe you used invalid data. Please retry it.",
      {
        position: "top-center",
        pauseOnHover: false,
        pauseOnFocusLoss: false
      }
    );
  }

  private showSuccessToast() {
    toast.success(
      "Your checkout was made and you'll be redirected to the start-page.",
      {
        position: "top-center",
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        onClose: () => {
          this.setState({ checkoutIsFinished: true });
          this.props.onSuccessfulCheckout();
        }
      }
    );
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: { "Content-Type": "application/json" }
    }).then(response => {
      if (response.ok) {
        this.showSuccessToast();
      } else {
        this.showErrorToast();
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
