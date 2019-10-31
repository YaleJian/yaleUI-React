import React, { Component } from 'react';
import {Link} from "react-router-dom";
class Main extends Component{

    static defaultProps={
        className : ""
    };

    render() {

        return (
            <div className={"ya-main " + this.props.className}>
                {this.props.children}
            </div>
        )
    }

}

export default Main;