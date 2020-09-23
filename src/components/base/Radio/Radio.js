import React from "react";
import "./Radio.css";

class Radio extends React.Component {
    static defaultProps = {
        className: "",
        onClick : ()=>{},
    };

    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.checked || false,
        }
    }

    render() {
        let className = "ya-radio-text " + this.props.className;
        return <span className="ya-radio" onClick={this.onClick.bind(this)}>
            <input type="radio" className="ya-radio-input" checked={this.state.checked} onChange={ignore => {
                return true
            }}/>
            <span className={className}>
                {this.props.children}
            </span>
        </span>
    }

    onClick = (e) => {
        this.setState({checked : !this.state.checked});
        this.props.onClick(this.state.checked, this.props.bindData, e);
    }
}

export {Radio};