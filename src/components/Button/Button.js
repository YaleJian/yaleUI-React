import React, {Fragment} from "react";
import "./button.css"
import {Icon} from "..";

const Button = (props) => {
    let className = "ya-btn ya-border-transparent ";

    if (props.color || props.line || props.light || props.textColor || props.textColor || props.tcl) {
        //使用内置样式
        if (props.color) {
            //实心按钮：字体白色、背景颜色自定义
            if (props.color === "yellow" || props.color === "lightGrey") {
                className += `ya-black ya-bg-${props.color}`;
            } else {
                className += `ya-white" ya-bg-${props.color}`;
            }
        } else if (props.light) {
            //浅色按钮
            if (props.light === "yellow") {
                className += " ya-grey";
            } else {
                className += ` ya-${props.light}`;
            }
            className += ` ya-bg-light-${props.light}`;
        } else if (props.line) {
            //线框按钮：字体颜色自定义、边框颜色自定义、背景白色
            className += `ya-btn-line ya-${props.line}`;
            className += ` ya-bg-white-only ya-bg-${props.line}`;
            className += ` ya-border-${props.line}`;
        } else if (props.textColor) {
            //文字按钮
            className += `white ya-${props.textColor}`;
            className += ` ya-bg-light-${props.textColor}`;
        } else if (props.tcl) {
            //浅色背景彩色按钮
            className += ` ya-border ya-${props.tcl}`;
            className += ` ya-bg-light-${props.tcl}`;
        }
    } else {
        //使用了自定义样式
        if (props.textColor) className += ` ya-${props.textColor}`;
        className += ` ya-bg-${props.bgColor || "white"}`;
        if (props.borderColor) className += ` ya-bg-${props.borderColor}`;
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