import React from 'react';
import {Icon} from "../../index";
import "./Brand.css"
import {Hang} from "../..";

/**
 * 品牌
 */
class Brand extends React.Component {
    static defaultProps = {
        className: "",
        name: "Yale UI",
        logo: ""
    }

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let logo = this.props.logo || <Icon name={"i-logo"} className={"brand-icon"}/>;
        if (typeof this.props.logo === "object") {
            logo = <Icon name={this.props.logo} className={"brand-icon"}/>
        }
        return (
            <Hang>
                <div className={"ya-brand " + this.props.className}>
                    <a href={"/"}>{logo}</a>
                    <span className={"name"}>{this.props.name}</span>
                </div>
            </Hang>
        );
    }
}

export {Brand}