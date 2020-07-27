import React, {Component} from 'react';
import {Button} from "../../../index";
import {Icon} from "../../../index";

/**
 * 首页
 */
class ButtonDemo extends Component {
    render() {
        return (
            <React.Fragment>
                <h2>按钮颜色</h2>
                <div className="ya-p">
                    <div className="content">
                        <Button className={"blue"}/>
                        <Button className={"green"}/>
                        <Button className={"orange"}/>
                        <Button/>
                        <Button className={"red"}/>
                        <Button className={"white"}/>
                        <Button className={"grey"}/>
                    </div>
                </div>


                <h2>按钮大小</h2>
                <div className="ya-p">
                    <div className="content">
                        <Button className={"smallest radius"}/>
                        <Button className={"smaller radius"}/>
                        <Button className={"small radius"}/>
                        <Button className={"radius"}/>
                        <Button className={"big radius"}/>
                        <Button className={"bigger radius"}/>
                        <Button className={"biggest radius"}/>
                    </div>
                </div>

                <h2>空心按钮</h2>
                <div className="ya-p">
                    <div className="content">
                        <Button className={"blue outline"}/>
                        <Button className={"green outline"}/>
                        <Button className={"orange outline"}/>
                        <Button className={"outline"}/>
                        <Button className={"red outline"}/>
                        <Button className={"white outline"}/>
                        <Button className={"grey outline"}/>
                    </div>
                    <div className="content">
                        <Button className={"radius blue outline"}/>
                        <Button className={"radius green outline"}/>
                        <Button className={"radius orange outline"}/>
                        <Button className={"radius outline"}/>
                        <Button className={"radius red outline"}/>
                        <Button className={"radius white outline"}/>
                        <Button className={"radius grey outline"}/>
                    </div>
                </div>

                <h2>圆形按钮</h2>
                <div className="ya-p">
                    <div className="content">
                        <Button className={"smallest radius circular"} content="b"/>
                        <Button className={"smaller radius circular"} content="b"/>
                        <Button className={"small radius circular"} content="b"/>
                        <Button className={"radius circular"} content="b"/>
                        <Button className={"big radius circular"} content="b"/>
                        <Button className={"bigger radius circular"} content="b"/>
                        <Button className={"biggest radius circular"} content="b"/>
                    </div>
                </div>

                <h2>按钮阴影</h2>
                <div className="ya-p">
                    <div className="content">
                        <Button className={"blue shadow"}/>
                        <Button className={"green shadow"}/>
                        <Button className={"orange shadow"}/>
                        <Button className={"shadow"}/>
                        <Button className={"red shadow"}/>
                        <Button className={"white shadow"}/>
                        <Button className={"grey shadow"}/>
                    </div>
                    <div className="content">
                        <Button className={"blue shadow radius"}/>
                        <Button className={"green shadow radius"}/>
                        <Button className={"orange shadow radius"}/>
                        <Button className={"shadow radius"}/>
                        <Button className={"red shadow radius"}/>
                        <Button className={"white shadow radius"}/>
                        <Button className={"grey shadow radius"}/>
                    </div>
                    <div className="content">
                        <Button className={"blue shadow radius circular big"}/>
                        <Button className={"green shadow radius circular big"} />
                        <Button className={"orange shadow radius circular big"}/>
                        <Button className={"shadow radius circular big"}/>
                        <Button className={"red shadow radius circular big"}/>
                        <Button className={"white shadow radius circular big"}/>
                        <Button className={"grey shadow radius circular big"}/>
                    </div>
                </div>

                <h2>禁用</h2>
                <div className="ya-p">
                    <div className="content">
                        <Button className={"disabled"} content="Disabled"/>
                    </div>
                </div>

                <h2>自适应按钮</h2>
                <div className="ya-p">
                    <div className="content">
                        <Button className={"blue adaptive"}/>
                        <Button className={"green adaptive"}/>
                        <Button className={"orange adaptive"}/>
                        <Button className={"adaptive outline"}/>
                        <Button className={"red adaptive outline"}/>
                        <Button className={"white adaptive radius"}/>
                        <Button className={"grey adaptive radius"}/>
                    </div>
                </div>

                <h2>组合按钮</h2>
                <div className="ya-p">
                    <div>
                        <div className="ya-groupBtn">
                            <Button className={"radius blue"} content="left"/>
                            <Button className={"radius blue"} content="middle"/>
                            <Button className={"radius blue"} content="right"/>
                        </div>

                        <div className="ya-groupBtn">
                            <Button className={"blue"} content="left"/>
                            <Button className={"blue"} content="middle"/>
                            <Button className={"blue"} content="right"/>
                        </div>
                    </div>
                </div>

                <h2>按钮内容自定义</h2>
                <div className="ya-p">
                    <div>
                        <Button className={"smallest outline blue radius"} content={<Icon name="i-loading-min"/>}/>
                        <Button className={"outline white"} content={<Icon name="i-shijian1"/>}/>
                        <Button className={"outline white radius"} content={<Icon name="i-qrCode"/>}/>
                        <Button className={"biggest radius grey"} content={<Icon name="i--expressionless"/>}/>
                        <Button className={"adaptive radius orange"} content={<Icon name="i-shezhi1"/>}/>
                    </div>
                </div>

                <h2>按钮反馈效果</h2>
                <div className="ya-p">
                    <div>
                        <Button className={"press smallest"} content={"可按下按钮"}/>
                        <Button className={"press smaller"} content={"可按下按钮"}/>
                        <Button className={"press small"} content={"可按下按钮"}/>
                        <Button className={"press"} content={"可按下按钮"}/>
                        <Button className={"press big"} content={"可按下按钮"}/>
                        <Button className={"press bigger"} content={"可按下按钮"}/>
                        <Button className={"press biggest"} content={"可按下按钮"}/>
                    </div><br/>
                    <div>
                        <Button className={"press blue"} content={"可按下按钮"}/>
                        <Button className={"press green"} content={"可按下按钮"}/>
                        <Button className={"press orange"} content={"可按下按钮"}/>
                        <Button className={"press"} content={"可按下按钮"}/>
                        <Button className={"press red"} content={"可按下按钮"}/>
                        <Button className={"press grey"} content={"可按下按钮"}/>
                    </div>
                </div>


            </React.Fragment>
        );
    }
}

export default ButtonDemo;
