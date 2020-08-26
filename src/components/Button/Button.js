import React, {useState} from "react";
import "./button.css"
import {Icon} from "..";

const Button = (props) => {
    let className = "ya-btn ya-border-transparent ";

    //使用内置样式
    if (props.color || props.line) {
        if (props.color) {
            //实心按钮：字体白色、背景颜色自定义
            if (props.color === "yellow" || props.color === "lightGrey") {
                className += "ya-black" + " ya-bg-" + props.color;
            } else {
                className += "ya-white" + " ya-bg-" + props.color;
            }

        } else if (props.line) {
            //空心按钮：字体颜色自定义、边框颜色自定义、背景白色
            className += "ya-btn-line ya-" + props.line;
            className += " ya-bg-white-only ya-bg-" + props.line;
            className += " ya-border-"+ props.line
        }
    } else {
        //使用了自定义样式
        if (props.textColor) className += " ya-" + props.textColor;
        className += "ya-bg-" + (props.bgColor || "white");
    }

    //边框圆角
    if (props.radius) className += " ya-radius10";

    //禁用
    if (props.disabled) className += " ya-disabled";

    //额外样式
    if (props.className) className += " " + props.className;


    //图标按钮
    let content = <>
        {props.icon ? <Icon name={props.icon}/> : ""}
        {props.children || (props.icon ? "" : "Button")}
    </>;
    if (props.adaptive) {
        return <div className={className} onClick={props.onClick}>{content}</div>;
    } else {
        return <button type="button" className={className} onClick={props.onClick}>{content}</button>;
    }
}
export {Button};