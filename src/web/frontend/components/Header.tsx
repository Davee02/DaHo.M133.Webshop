import * as React from "react";
import BrandLogo from "./BrandLogo";
import MiniShoppingCart from "./MiniShoppingCart";

export interface HeaderProps {}

export interface HeaderState {}

export default class Header extends React.Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
  }

  render() {
    return (
      <header>
        <BrandLogo />
        <MiniShoppingCart />
      </header>
    );
  }
}
