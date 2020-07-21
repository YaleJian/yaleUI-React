import React from "react";
import "./message.css";
import {Message} from "./Message";
import {Icon} from "..";
import {Button} from "..";
import {ButtonDemo} from "../Button/ButtonDemo";

/**
 * 按钮组
 */
class MessageDemo extends React.Component {

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return <React.Fragment>
            <div className="ya-p">
                <h2>基础提示框</h2>
                <Button content={"基础提示框"} onClick={() => Message("基础提示框",)}/>
            </div>
            <div className="ya-p">
                <h2>自动移除的提示框</h2>
                <Button content={"自动消失的提示框"} onClick={() => Message("一秒钟自动移除", false, true)}/>
            </div>

            <div className="ya-p">
                <h2>自定义消失时间的提示框</h2>
                <Button content={"自定义3000毫秒后消失的提示框"} onClick={() => Message(<Icon/>, false, 3000)}/>
            </div>
            <div className="ya-p">
                <h2>带确认的提示框</h2>
                <Button content={"带确认的提示框"} onClick={() => Message("基础提示框", {func: () => Message("点击了Yes",false, true)})}/>
            </div>
            <div className="ya-p">
                <h2>自定义内容</h2>
                <Button content={"自定义内容"} onClick={() => Message(<ButtonDemo/>, {})}/>
            </div>
        </React.Fragment>
    }


}

export {MessageDemo};