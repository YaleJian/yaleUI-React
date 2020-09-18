import React, {Fragment} from "react";
import "./button.css"
import {Icon} from "..";

const Button = (props) => {
    let className = "ya-btn ";

    if (props.color) {
        className += props.color
    } else if (props.line) {
        className += `line-` + props.line
    } else {
        if (!props.noStyle) className += "default";
    }

    //大小
    if (props.small) className += " small";
    if (props.big) className += " big";

    //边框圆角
    if (props.radius) className += " radius10";

    //禁用
    if (props.disabled) className += " disabled";

    //额外样式
    if (props.className) className += ` ${props.className}`;

    //带图标的按钮
    let content = <Fragment>
        {props.icon ? <Icon name={props.icon}/> : ""}
        {props.children || (props.icon ? "" : "Button")}
    </Fragment>;
    if (props.adaptive) {
        return <div className={className} onClick={props.onClick}>{content}</div>;
    } else {
        return <button type="button" className={className} onClick={props.onClick}>{content}</button>;
    }
}
export {Button};