import React, {Component} from 'react';
import {Progress} from "../..";

/**
 * 测试
 */
class Test extends Component {

    componentDidMount() {
        this.Test();
    }

    render() {
        return <>

        </>;
    }

    Test(){
        Progress.start();
    }
}

export default Test;
