import React from "react";
import "./button.css";

/**
 * 按钮组
 */
class Button extends React.Component {

    static defaultProps = {
        content: "Button",
        className: "",
        radius: true,
        size: "",
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
        let className = "ya-btn "+ this.props.className;
        if (this.props.className.indexOf("adaptive") > -1) {
            return <div className={className} onClick={this.onClick.bind(this)}>{this.props.content}</div>;
        } else if (this.props.className.indexOf("press") > -1) {
            return <>
                <div className={className} onClick={this.onClick.bind(this)}>
                    <span>{this.props.content}</span>
                </div>
            </>;
        }
        return <div className={className} onClick={this.onClick.bind(this)}>{this.props.content}</div>
    }

    onClick = (e) => {
        if (this.state.status) {
            this.props.onClick(e);
        }
    }
}

export {Button};