import React, {Component} from 'react';
import {Icon} from "..";

class Header extends Component {

    static defaultProps = {
        title: "",
        className: "",
        occupied: true
    };

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="ya-header ya-fixed">
                <div className={"ya-header-main ya-nav-simple " + this.props.className}>
                    <a href={"/"}><Icon name={"i-logo"}/></a>
                    <span className={"name"}>{this.props.children}</span>
                </div>
                {this.props.occupied ? <div className={"ya-header-occupied"}/> : ""}
            </div>
        );
    }
}

export {Header};
