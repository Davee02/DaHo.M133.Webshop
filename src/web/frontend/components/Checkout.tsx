import * as React from "react";

export interface CheckoutProps { }

export interface CheckoutState {

}

export default class Checkout extends React.Component<CheckoutProps, CheckoutState> {
  constructor(props: CheckoutProps) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const name = target.name;

    this.setState({
      [name]: target.value
    });
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="checkout">
        <div>
          <label htmlFor="firstname">Firstname: </label>
          <input type="text" onChange={this.handleInputChange} name="firstname" id="firstname" required />
        </div>

        <div>
          <label htmlFor="lastname">Lastname: </label>
          <input type="text" onChange={this.handleInputChange} name="lastname" id="lastname" required />
        </div>

        <div>
          <label htmlFor="email">Email-address: </label>
          <input type="email" onChange={this.handleInputChange} name="email" id="email" required />
        </div>

        <div>
          <label htmlFor="phone">Phone-number: </label>
          <input type="tel" onChange={this.handleInputChange} name="phone" id="phone" required />
        </div>

        <input type="submit" value="Complete the purchase" />
      </form>
    );
  }
}
