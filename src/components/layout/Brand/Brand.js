import React from 'react';
import {Icon} from "../../index";
import "./Brand.css"
import {Hang} from "../..";

/**
 * 品牌
 */
function Brand(props = {
    className: "",
    name: "Yale UI",
    logo: ""
}) {
    let logo = props.logo || <Icon name={"i-logo"} className={"brand-icon"}/>;
    if (typeof props.logo === "object") {
        logo = <Icon name={props.logo} className={"brand-icon"}/>
    }
    return (
        <Hang>
            <div className={"ya-brand " + props.className}>
                <a href={"/"}>{logo}</a>
                <span className={"name"}>{props.name}</span>
            </div>
        </Hang>
    );
}

export {Brand}