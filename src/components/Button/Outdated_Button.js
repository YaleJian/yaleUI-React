import React from "react";
import "./Outdated_Button.css";
import {Icon} from "..";

/**
 * 按钮组
 */
class Outdated_Button extends React.Component {

    static defaultProps = {
        className: "",
        radius: true,
        adaptive: false,
        size: "",
        icon: "",//iconfont图标
        onClick: function () {
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            status: !this.props.className.includes("disabled"),
        }
    }

    render() {
        let className = "ya-btn " + this.props.className;
        let content = <>
            {this.props.icon ? <Icon name={this.props.icon}/> : ""}
            {this.props.children || (this.props.icon || "Button")}
        </>;
        if (this.props.adaptive) {
            return <div className={className} onClick={this.onClick.bind(this)}>{content}</div>;
        } else {
            return <button type="button" className={className} onClick={this.onClick.bind(this)}>{content}</button>;
        }
    }

    onClick = (e) => {
        if (this.state.status) {
            this.props.onClick(e);
        }
    }
}

export {Outdated_Button};