import * as React from "react";
import { Link } from "react-router-dom";

export interface BrandLogoProps { }

export interface BrandLogoState { }

export default class BrandLogo extends React.Component<BrandLogoProps, BrandLogoState> {
    constructor(props: BrandLogoProps) {
        super(props);
    }

    render() {
        return (
            <Link to="/">
                <img
                    src={`/assets/img/logo.png`}
                    alt="SwissTechSupply"
                    height={100} />
            </Link>
        );
    }
}
