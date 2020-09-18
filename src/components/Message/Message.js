import React from "react";
import ReactDOM from 'react-dom';
import "./message.css";
import {Icon} from "..";
import {Button} from "..";
import {DomUtils} from "..";
import {dataUtils} from "..";

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
    let messageContain = <React.Fragment>
        <div className={"ya-message-container" + animated_down}>
            {title}
            <div className="ya-message-content">{config.content}</div>
            <Button className="closeBtn"><Icon name="i-close"/></Button>
            {confirmBtn}
        </div>
    </React.Fragment>;

    //弹框容器
    let messageTag = document.getElementsByClassName("ya-msgList");

    let msg;
    //判断页面是否是第一次提示，是多一层提示区
    if (messageTag.length === 0) {

        let msgListTag = document.createElement("div");
        msgListTag.className = "ya-msgList";
        ReactDOM.render(<div className="ya-message">{messageContain}</div>, msgListTag);

        document.body.appendChild(msgListTag);
        msg = msgListTag.getElementsByClassName("ya-message")[0];
    } else {
        let msgTag = document.createElement("div");
        msgTag.className = "ya-message";
        ReactDOM.render(messageContain, msgTag);

        messageTag[0].appendChild(msgTag);
        msg = msgTag;
    }

    //给当前消息的按钮绑定移除事件
    let closeBtn = msg.getElementsByClassName("closeBtn")[0];
    closeBtn.onclick = () => {
        DomUtils.remove(msg);
    };

    //提示默认自动移除,非确认框或设置没有设置为关
    if (config.autoRemove !== false && !isConFirm) {
        setTimeout(() => {
            DomUtils.remove(msg);
        }, dataUtils.isNaN(config.autoRemove) ? config.autoRemove : 2000);
    }

    if (isConFirm) {
        //确定回调事件
        if (typeof func1 === "function") {
            let yesBtn = msg.getElementsByClassName("ya-yesBtn")[0];
            yesBtn.onclick = () => {
                msg.remove();
                func1();
            }
        }
        //关闭事件
        if (typeof func1 === "function") {
            let noBtn = msg.getElementsByClassName("ya-noBtn")[0];
            noBtn.onclick = () => {
                msg.remove();
                func2();
            };
        }
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