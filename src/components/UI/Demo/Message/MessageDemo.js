import React, {useEffect, useState} from "react";
import "./message.css";
import {Icon, Button, Message, getNavData} from "../../../index";
import ButtonDemo from "../Button/ButtonDemo";
import {Confirm} from "../../../Message/Message";

/**
 * 按钮组
 */
const MessageDemo = () => {

    //加载右侧目录
    const [loading, setLoading] = useState(true);
    const [navData, setNavData] = useState([]);
    useEffect(() => {
        if (loading) {
            setNavData(getNavData())
            setLoading(false)
        }
    })
    return <div>
        <div className="ya-p">
            <h2>基础提示框</h2>
            <Button color={"blue"} onClick={() => Message("默认2秒消失",)}>{"基础提示框"}</Button>
        </div>
        <div className="ya-p">
            <h2>不自动移除的提示框</h2>
            <Button color={"blue"} onClick={() => Message("不自动移除", false)}>{"不自动移除的提示框"}</Button>
        </div>

        <div className="ya-p">
            <h2>自定义消失时间的提示框</h2>
            <Button color={"blue"} onClick={() => Message("4000毫秒后消失", 4000)}>{"自定义4000毫秒后消失的提示框"}</Button>
        </div>
        <div className="ya-p">
            <h2>带确认的提示框</h2>
            <Button color={"blue"}
                    onClick={() => Confirm({content: "基础提示框"}, () => Message("点击了Yes"), () => Message("点击了No"))}>
                {"带确认的提示框"}
            </Button>
        </div>
        <div className="ya-p">
            <h2>自定义内容</h2>
            <Button color={"blue"} onClick={() => Message(<ButtonDemo/>, false)}>{"自定义内容"}</Button>
        </div>
    </div>
}

export default MessageDemo;