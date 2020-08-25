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
                <h2>大小</h2>
                <div className="ya-p">
                    <div className="content">
                        <Button className={"small"}/>
                        <Button/>
                        <Button className={"big"}/>
                    </div>
                </div>

                <h2>内置颜色样式</h2>
                <div className="ya-p">
                    <div className="content">
                        <Button color={"black"}/>
                        <Button color={"grey"}/>
                        <Button color={"red"}/>
                        <Button color={"orange"}/>
                        <Button color={"yellow"}/>
                        <Button color={"green"}/>
                        <Button color={"blue"}/>
                        <Button color={"purple"}/>
                    </div>
                    <div className="content">
                        <Button line={"black"}/>
                        <Button line={"grey"}/>
                        <Button line={"red"}/>
                        <Button line={"orange"}/>
                        <Button line={"yellow"}/>
                        <Button line={"green"}/>
                        <Button line={"blue"}/>
                        <Button line={"purple"}/>
                    </div>
                </div>

                <h2>边框圆角</h2>
                <div className="ya-p">
                    <div className="content">
                        <Button radius line={"black"}/>
                        <Button radius color={"grey"}/>
                        <Button radius line={"red"}/>
                        <Button radius color={"green"}/>
                        <Button radius color={"blue"}/>
                        <Button radius color={"orange"}/>
                        <Button radius line={"yellow"}/>
                        <Button radius line={"purple"}/>
                    </div>
                </div>

                <h2>禁用</h2>
                <div className="ya-p">
                    <div className="content">
                        <Button color={"blue"} disabled/>
                    </div>
                </div>

                <h2>自适应按钮</h2>
                <div className="ya-p">
                    <div className="content">
                        <Button color={"blue"} adaptive/>
                        <Button color={"green"} adaptive/>
                        <Button color={"orange"} adaptive/>
                        <Button line={"purple"} adaptive/>
                        <Button line={"red"} adaptive/>
                        <Button radius color={"grey"} adaptive/>
                        <Button radius adaptive/>
                    </div>
                </div>

                <h2>组合按钮</h2>
                <div className="ya-p">
                    <div>
                        <span className="ya-groupBtn">
                            <Button radius color={"blue"}>left</Button>
                            <Button radius color={"blue"}>middle</Button>
                            <Button radius color={"blue"}>right</Button>
                        </span>
                        <span className="ya-groupBtn">
                            <Button color={"blue"}>left</Button>
                            <Button color={"blue"}>middle</Button>
                            <Button color={"blue"}>right</Button>
                        </span>
                    </div>
                </div>

                <h2>图标</h2>
                <div className="ya-p">
                    <div>
                        <Button color={"white"}><Icon name="i-shijian1"/></Button>
                        <Button color={"white"}><Icon name="i-qrCode"/></Button>
                        <Button radius color={"grey"}><Icon name="i--expressionless"/></Button>
                        <Button adaptive radius color={"orange"}><Icon name="i-shezhi1"/></Button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ButtonDemo;
