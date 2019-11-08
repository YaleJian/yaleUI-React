import React, {Component} from 'react';
import Icon from "../../modules/utils/Icon";
import Button from "../../modules/Button/Button";
import "./appDownload.css";
/**
 * 下载页面
 */
class AppDownload extends Component {

    render() {
        return <div className={"ya-appDownload"}>
            <div className={"ya-header header"}>
                <a href={"/"} className={"logo"}><Icon name={"i-logo"}/></a>
                <span className={"title"}>扬歌YaleJian · 客户端下载</span>
            </div>
            <div className={"content"}>
                <img className={"preview"} src={"https://cdn.yalejian.com/system/img/jietu%402x.png"} alt={"preview"}/>
                <div className={"right"}>
                    <div className={"desc"}>轻装上线</div>
                    <div className={"downloadBtn"}>
                        <a href={"http://file.yalejian.com/download/YaleJian.apk"} >
                            <Button className={"green"} content={<><Icon name={"i-Android"}/><span>Android</span><Icon name={"i-download"}/></>}/>
                        </a>
                        <Button className={"green"} content={<><Icon name={"i-ios"}/><span>IOS</span><Icon name={"i-download"}/></> }/>
                        <a href={"http://file.yalejian.com/download/YaleJian.dmg"} >
                            <Button className={"green"} content={<><Icon name={"i-mac1"}/><span>MacOS</span><Icon name={"i-download"}/></>}/>
                        </a>
                        <a href={"http://file.yalejian.com/download/YaleJian.exe"} >
                            <Button className={"green"} content={<><Icon name={"i-win"}/><span>Windows</span><Icon name={"i-download"}/></>}/>
                        </a>
                    </div>
                    <div className={"updateInfo"}>
                        <div>当前版本：0.0.1</div>
                        <div>运行要求：各设备最新x64系统</div>
                        <div>更新时间：2019年10月28日</div>
                    </div>
                </div>
            </div>
        </div>;
    }
}

export default AppDownload;
