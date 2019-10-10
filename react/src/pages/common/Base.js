import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Button from "../../modules/Button/Button";
import Icon from "../../modules/utils/Icon";

/**
 * 输入框
 */
class Base extends Component {
    render() {
        return (
            <div className={"ya-homePage"}>
                <div className={"ya-apps"}>
                    <Link to={"api"}>
                        <div><Button className={"app radius blue"} content={<Icon name={"i-API"}/>}/></div>
                        <div className={"appName"}><Button className={"white"} content={"Yale UI"}/></div>
                    </Link>
                    <Link to={"api"}>
                        <div><Button className={"app radius"} content={<Icon name={"i-icon-test"}/>}/></div>
                        <div className={"appName"}><Button className={"white"} content={"照片"}/></div>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Base;
