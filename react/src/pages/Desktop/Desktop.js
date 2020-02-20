import React from 'react';
import Icon from "../../modules/utils/Icon";
import Input from "../../modules/Input/Input";
import {Link} from "react-router-dom";
import Button from "../../modules/Button/Button";
import './desktop.css';
import Header from "../common/Header";
import Footer from "../common/Footer";

/**
 * 桌面
 */
class Desktop extends React.Component {
    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            searchValue: "",
        }
    }

    render() {
        let data = [
            {name: "APP下载", link: "appDownload", icon: "i-ziyuan", bg: "grey"},
            {name: "Yale UI", link: "ui", icon: "i-uicn", bg: "grey"},
            {name: "摄影展", link: "photo", icon: "i-chongwusheying", bg: ""},
            {name: "文章", link: "pic", icon: "i-book-2", bg: "green"},
            {name: "天气", link: "weather", icon: "i-duoyun1", bg: "white"},
            {name: "云盘", link: "pic", icon: "i-yunpan2", bg: "grey"},
            {name: "今天吃什么", link: "eatToday", icon: "i-zuofan", bg: ""},
            {name: "账号设置", link: "pic", icon: "i-anquan", bg: "orange"},
            {name: "后台管理", link: "pic", icon: "i-huabanfuben1", bg: "blue"},
            {name: "留言反馈", link: "pic", icon: "i-fankui1", bg: "grey"},
            {name: "关于我们", link: "pic", icon: "i-guanyu-", bg: "grey"},
            {name: "华富云", link: "hfm", icon: "i-guanggaopai", bg: "white"},
        ];
        let apps = data.map((app) => {
            return <Link to={app.link} key={app.name}>
                <div><Button className={"app radius " + app.bg} content={<Icon name={app.icon}/>}/></div>
                <div className={"appName"}><Button className={"white"} content={app.name}/></div>
            </Link>
        });
        return <>
            <Header children={"扬歌YaleJian"}/>
            <div className={"ya-homePage"}>
                <div className={"ya-h-search"}>
                    <Input type="search" className="ya-h-search-input right" placeholder={"搜索网页"}
                           onChange={this.search.bind(this)} onSearch={this.onSearch.bind(this)}
                           value={this.state.searchValue}/>
                </div>
                <div className={"ya-apps"}>
                    {apps}
                </div>
            </div>
            <Footer/>
        </>
    }


    search = (searchValue) => {
        this.setState({searchValue});
    };
    onSearch = () => {
        window.location.href = "https://www.baidu.com/s?ie=utf-8&wd=" + this.state.searchValue;
    }
}

export default Desktop;