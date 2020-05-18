import React, {Component} from 'react';
import Desktop from "../Desktop/Desktop";

/**
 * 主页
 */
class Base extends Component {

    constructor(props){
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <Desktop/>
        );
    }
}

export default Base;
