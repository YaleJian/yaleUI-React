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
                        <Button/>
                        <Button className={"blue"}/>
                        <Button className={"green"}/>
                        <Button className={"orange"}/>
                        <Button className={"red"}/>
                        <Button className={"white"}/>
                        <Button className={"grey"}/>
                    </div>
                </div>


                <h2>按钮大小</h2>
                <div className="ya-p">
                    <div className="content">
                        <Button className={"small"}/>
                        <Button/>
                        <Button className={"big"}/>
                        <Button className={"biggest"}/>
                    </div>
                    <div className="content">
                        <Button className={"small radius"}/>
                        <Button className={"radius"}/>
                        <Button className={"big radius"}/>
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

                <h2>禁用</h2>
                <div className="ya-p">
                    <div className="content">
                        <Button className={"disabled"}/>
                    </div>
                </div>

                <h2>自适应按钮</h2>
                <div className="ya-p">
                    <div className="content">
                        <Button className={"blue"} adaptive={true}/>
                        <Button className={"green"} adaptive={true}/>
                        <Button className={"orange"} adaptive={true}/>
                        <Button className={"outline"} adaptive={true}/>
                        <Button className={"red outline"} adaptive={true}/>
                        <Button className={"white radius"} adaptive={true}/>
                        <Button className={"grey radius"} adaptive={true}/>
                    </div>
                </div>

                <h2>组合按钮</h2>
                <div className="ya-p">
                    <div>
                        <span className="ya-groupBtn">
                            <Button className={"radius blue"}>left</Button>
                            <Button className={"radius blue"}>middle</Button>
                            <Button className={"radius blue"}>right</Button>
                        </span>
                        <span className="ya-groupBtn">
                            <Button className={"blue"}>left</Button>
                            <Button className={"blue"}>middle</Button>
                            <Button className={"blue"}>right</Button>
                        </span>
                    </div>
                </div>

                <h2>图标</h2>
                <div className="ya-p">
                    <div>
                        <Button className={"outline white"}><Icon name="i-shijian1"/></Button>
                        <Button className={"outline white radius"}><Icon name="i-qrCode"/></Button>
                        <Button className={"radius grey"}><Icon name="i--expressionless"/></Button>
                        <Button className={"radius orange"}  adaptive={true}><Icon name="i-shezhi1"/></Button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ButtonDemo;
