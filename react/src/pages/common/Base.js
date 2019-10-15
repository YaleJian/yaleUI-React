import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Button from "../../modules/Button/Button";
import Icon from "../../modules/utils/Icon";
import Input from "../../modules/Input/Input";
import Desktop from "../../modules/Desktop/Desktop";

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
