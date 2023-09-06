import React from "react";
import "./message.css";
import {Icon} from "../../index";
import {Button} from "../../index";
import {DomUtils} from "../../index";
import {dataUtils} from "../../index";
import {createRoot} from "react-dom/client";

/**
 * 提示框
 */
function baseMsg(config, func1, func2, isConFirm) {

    //快速提示写法
    config = config || {};

    //确认提示框
    let confirmBtn, title;
    if (isConFirm) {
        let text1 = "Yes", text2 = "No";
        if (config.btn && config.btn.length > 2) {
            text1 = config.btn[0]
            text2 = config.btn[1]
        }
        confirmBtn = <div className="ya-groupBtn">
            <Button className="red ya-yesBtn">{text1}</Button>
            <Button className="grey ya-noBtn">{text2}</Button>
        </div>;
        title = <div className="ya-message-title">{config.title || "Message"}</div>;
    }

    let animated_down = " animated fastest fadeInDown";
    let messageContain = <>
        <div className={"ya-message-container" + animated_down}>
            {title}
            <div className="ya-message-content">{config.content}</div>
            <Button className="closeBtn" onClick={e=>{DomUtils.remove(e.target.parentNode.parentNode.parentNode)}}><Icon name="i-close"/></Button>
            {confirmBtn}
        </div>
    </>;


    //创建弹框组
    let msgListTag = document.getElementsByClassName("ya-msgList");
    if (msgListTag.length === 0) {
        msgListTag = document.createElement("div");
        msgListTag.className = "ya-msgList";
        msgListTag = document.body.appendChild(msgListTag)
    }else {
        msgListTag = msgListTag[0]
    }

    //创建弹框
    let msgTag = document.createElement("div");
    msgTag.className = "ya-message";
    createRoot(msgTag).render(messageContain);
    msgTag = msgListTag.appendChild(msgTag);

    //提示默认自动移除,非确认框或设置没有设置为关
    if (config.autoRemove !== false && !isConFirm) {
        setTimeout(() => {
            DomUtils.remove(msgTag);
        }, dataUtils.isNaN(config.autoRemove) ? config.autoRemove : 2000);
    }

    if (isConFirm) {
        setTimeout( ()=>{
            //确定回调事件
            if (typeof func1 === "function") {
                let yesBtn = msgTag.getElementsByClassName("ya-yesBtn")[0];
                yesBtn.onclick = () => {
                    msgTag.remove();
                    func1();
                }
            }
            //关闭事件
            if (typeof func1 === "function") {
                let noBtn = msgTag.getElementsByClassName("ya-noBtn")[0];
                noBtn.onclick = () => {
                    msgTag.remove();
                    func2();
                };
            }
        },50)
    }

}

let Message = (content, autoRemove) => {
    baseMsg({
        content,
        autoRemove,
        btn: false
    })
}
let Confirm = (config, func1, func2) => {
    baseMsg(config, func1, func2, true);
}

export {Message, Confirm};