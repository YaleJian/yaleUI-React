import React from "react";
import ReactDOM from 'react-dom';
import "./message.css";
import Icon from "../utils/Icon";
import Button from "../Button/Button";
import DomUtils from "../utils/domUtils";
import dataUtils from "../utils/dataUtils";

/**
 * 提示框
 */
let Message = (content, config, autoRemove) => {

    //数据格式校验处理
    if(content){
        if(typeof content === "object") content = JSON.stringify(content);
    }else {
        return;
    }

    let isConfirm = config || false;
    config = config || {yes: "Yes", no: "No"};
    let animated_down = " animated fastest fadeInDown";
    let messageContainer = <>
        <div className={"ya-message-container" + animated_down}>
            {isConfirm ? <div className="ya-message-title">{config.title || "Message"}</div> : null}
            <div className="ya-message-content">{content}</div>
            <Button className="closeBtn white" content={<Icon name="i-close"/>}/>
            {isConfirm ? <div className="ya-groupBtn">
                <Button className="red ya-yesBtn" content={config.yes || "Yes"}/>
                <Button className="grey ya-noBtn" content={config.no || "No"}/>
            </div> : null}
        </div>
    </>;
    let message = <>
        <div className="ya-message">
            {messageContainer}
        </div>
    </>;

    let messageTag = document.getElementsByClassName("ya-messages");
    let renderTag = document.createElement("div");
    let thisNotice;
    //判断页面是否是第一次提示，是先放置一个提示区
    if (messageTag.length === 0) {
        renderTag.className = "ya-messages";
        document.body.appendChild(renderTag);
        ReactDOM.render(message, renderTag);
        thisNotice = renderTag.getElementsByClassName("ya-message")[0];
    } else {
        renderTag.className = "ya-message";
        messageTag[0].appendChild(renderTag);
        ReactDOM.render(messageContainer, renderTag);
        thisNotice = renderTag;
    }

    //给当前消息的按钮绑定移除事件
    let closeBtn = thisNotice.getElementsByClassName("closeBtn")[0];
    closeBtn.onclick = () => {
        DomUtils.remove(thisNotice);
    };
    //给确认按钮绑定事件
    if (isConfirm) {
        let noBtn = thisNotice.getElementsByClassName("ya-noBtn")[0];
        noBtn.onclick = () => {
            DomUtils.remove(thisNotice);
        };
        //点击Yes回调事件
        if (typeof config.func === "function") {
            let yesBtn = thisNotice.getElementsByClassName("ya-yesBtn")[0];
            yesBtn.onclick = () => {
                thisNotice.remove();
                config.func();
            }
        }
    }

    //提示默认自动移除
    if (autoRemove) {
        setTimeout(() => {
            DomUtils.remove(thisNotice);
        }, dataUtils.isNaN(autoRemove) ? autoRemove : 2000);
    }

};

export default Message;