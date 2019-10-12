import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Button from "../../modules/Button/Button";
import Icon from "../../modules/utils/Icon";
import Input from "../../modules/Input/Input";

/**
 * 主页
 */
class Base extends Component {

    constructor(props){
        super(props);
        this.state = {
            searchValue:"",
        }
    }
    render() {
        return (
            <>
                <div className="ya-header ya-nav-simple ya-fixed">
                    <Icon name={"i-logo"}/>
                    <span className={"name"}>扬歌YaleJian</span>
                </div>
                <div className={"ya-homePage"}>
                    <div className={"ya-h-search"}>
                        <Input type="search" className="ya-h-search-input right" placeholder={"搜索网页"} onChange={this.search.bind(this)} onSearch={this.onSearch.bind(this)} value={this.state.searchValue}/>
                    </div>
                    <div className={"ya-apps"}>
                        <Link to={"api"}>
                            <div><Button className={"app radius grey"} content={<Icon name={"i-uicn"}/>}/></div>
                            <div className={"appName"}><Button className={"white"} content={"Yale UI"}/></div>
                        </Link>
                        <Link to={"pic"}>
                            <div><Button className={"app radius"} content={<Icon name={"i-chongwusheying"}/>}/></div>
                            <div className={"appName"}><Button className={"white"} content={"照片"}/></div>
                        </Link>
                    </div>
                </div>
                <div className={"ya-footer"}>
                    隐私和条款 | 版权所有 © 2019 Yale Jian 保留所有权利 | 备案号: 苏ICP备18013414号
                </div>
            </>
        );
    }

    search = (searchValue)=>{
        this.setState({searchValue});
    };
    onSearch = ()=>{
        window.location.href = "https://www.baidu.com/s?ie=utf-8&wd="+this.state.searchValue;
    }
}

export default Base;
