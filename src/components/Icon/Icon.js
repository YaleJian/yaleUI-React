import React from "react";
import "./icon.css"
/**
 * iconfont封装
 */
const Icon = (props) => {
    let className = "icon " + props.className;
    return <svg className={className} aria-hidden="true" onClick={props.onClick}>
        <use xlinkHref={"#" + props.name}/>
    </svg>
}
export {Icon} ;