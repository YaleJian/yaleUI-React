import React, {Component} from 'react';
import {Icon} from "..";

class Header extends Component {

    static defaultProps = {
        title: "",
        className:"",
        occupied : true
    };

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <React.Fragment>
            <div className={"ya-header ya-nav-simple ya-fixed " + this.props.className}>
                <a href={"/"}><Icon name={"i-logo"}/></a>
                <span className={"name"}>{this.props.children}</span>
            </div>
                {this.props.occupied ? <div className={"ya-header-occupied"}/> : ""}
            </React.Fragment>
        );
    }
}

export {Header};
