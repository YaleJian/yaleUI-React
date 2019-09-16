import React from "react";

/**
 * iconfont封装
 */
class Icon extends React.Component{

    static defaultProps = {
        name : "i-yalejian-logo",
        className : "",
        onClick: ()=>{},
    };
    render() {
        let className = "icon " + this.props.className;
        return <svg className={className} aria-hidden="true" onClick={this.onClick.bind(this)}>
            <use xlinkHref={"#"+this.props.name}> </use>
        </svg>
    }
    onClick = (e)=>{
        this.props.onClick(e);
    }
}

export default Icon ;