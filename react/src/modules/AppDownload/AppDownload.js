import React, {Component} from 'react';
import Icon from "../utils/Icon";
import Button from "../Button/Button";
import "./appDownload.css";
/**
 * 下载页面
 */
class AppDownload extends Component {

    render() {
        return <div className={"ya-appDownload"}>
            <div className={"header"}>
                <span className={"logo"}><Icon name={"i-logo"}/></span>
                <span className={"title"}>扬歌YaleJian · 客户端下载</span>
            </div>
            <div className={"content"}>
                <img className={"preview"} src={"http://file.yalejian.com/system/img/jietu%402x.png"} />
                <div className={"right"}>
                    <div className={"desc"}>轻装上线</div>
                    <div className={"downloadBtn"}>
                        <a href={"http://file.yalejian.com/download/YaleJian.dmg"} >
                            <Button className={"green"} content={<><Icon name={"i-mac"}/><span>立即下载</span></>}/>
                        </a>
                        <Button className={"green"} content={<><Icon name={"i-ios"}/><span>正在开发</span></> }/>
                        <a href={"http://file.yalejian.com/download/YaleJian.apk"} >
                            <Button className={"green"} content={<><Icon name={"i-Android"}/><span>立即下载</span></>}/>
                        </a>
                        <Button className={"green"} content={<><Icon name={"i-win"}/><span>正在开发</span></>}/>
                        <Button className={"green"} content={<><Icon name={"i-linux-"}/><span>正在开发</span></>}/>
                    </div>
                    <div className={"updateInfo"}>
                        <div>当前版本：0.0.1</div>
                        <div>运行要求：各设备最新系统</div>
                        <div>更新时间：2019年10月18日</div>
                    </div>
                </div>
            </div>
        </div>;
    }
}

export default AppDownload;
