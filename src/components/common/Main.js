import React, { Component } from 'react';
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

export {Main};