import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Button from "../../modules/Button/Button";
import Icon from "../../modules/utils/Icon";

/**
 * 主页
 */
class Base extends Component {
    render() {
        return (
            <>
                <div className="ya-header ya-nav-simple ya-fixed">
                    <Icon name={"i-logo"}/>
                    <span className={"name"}>Yale Jian</span>
                </div>
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
                <div className={"ya-footer"}>
                    隐私政策 | 条款与条件 | 版权所有 © 2019 Yale Jian 保留所有权利
                </div>
            </>
        );
    }
}

export default Base;
