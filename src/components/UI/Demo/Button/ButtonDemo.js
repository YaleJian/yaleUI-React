import React, {Component} from 'react';
import {Button, getNavData, Tree} from "../../../index";
import {Icon} from "../../../index";

/**
 * 首页
 */
class ButtonDemo extends Component {
    state={
        loading: true,
        navData: []
    }
    componentDidMount() {
        if (this.state.loading) this.setState({navData: getNavData(), loading: false});
    }
    render() {
        return (
            <React.Fragment>
                <Tree treeData={this.state.navData}
                      treeType={3}
                      openBtn={false}
                      openLevel={"all"}
                      ref={tree => {
                          this.tree = tree
                      }}
                />
                <h1>按钮</h1>
                <h2 className="ya-title">大小</h2>
                <div className="ya-p">
                    <div>
                        <Button small/>
                        <Button/>
                        <Button big/>
                    </div>
                </div>

                <h2 className="ya-title">内置颜色样式</h2>
                <div className="ya-p">
                    <div>
                        <Button color={"light-white"}/>
                        <Button color={"light-grey"}/>
                        <Button color={"grey"}/>
                        <Button color={"black"}/>
                    </div>
                    <div>
                        <Button color={"red"}/>
                        <Button color={"orange"}/>
                        <Button color={"green"}/>
                        <Button color={"blue"}/>
                        <Button color={"purple"}/>
                        <Button color={"yellow"}/>
                    </div>
                    <div>
                        <Button className={"ya-red "} noStyle/>
                        <Button className={"ya-border-orange"} noStyle/>
                        <Button className={"ya-green"} noStyle/>
                        <Button className={"ya-blue"} noStyle/>
                        <Button className={"ya-purple"} noStyle/>
                        <Button className={"ya-yellow"} noStyle/>
                    </div>

                </div>

                <h2 className="ya-title">边框圆角</h2>
                <div className="ya-p">
                    <div>
                        <Button radius color={"black"}/>
                        <Button radius color={"grey"}/>
                        <Button radius color={"red"}/>
                        <Button radius color={"green"}/>
                        <Button radius color={"blue"}/>
                        <Button radius color={"orange"}/>
                        <Button radius color={"purple"}/>
                        <Button radius color={"yellow"}/>
                    </div>
                </div>

                <h2 className="ya-title">禁用</h2>
                <div className="ya-p">
                    <div>
                        <Button color={"blue"} disabled/>
                    </div>
                </div>

                <h2 className="ya-title">自适应按钮</h2>
                <div className="ya-p">
                    <div>
                        <Button color={"blue"} adaptive/>
                        <Button color={"green"} adaptive/>
                        <Button color={"orange"} adaptive/>
                        <Button color={"red"} adaptive/>
                        <Button radius color={"grey"} adaptive/>
                        <Button color={"light-purple"} adaptive/>
                        <Button radius adaptive/>
                    </div>
                </div>

                <h2 className="ya-title">组合按钮</h2>
                <div className="ya-p">
                    <div>
                        <span className="ya-groupBtn">
                            <Button radius color={"orange"}>上一页</Button>
                            <Button radius color={"orange"}>下一页</Button>
                        </span>
                        <span className="ya-groupBtn">
                            <Button color={"yellow"}>上一页</Button>
                            <Button color={"yellow"}>下一页</Button>
                        </span>
                        <span className="ya-groupBtn">
                            <Button radius color={"blue"}>向后</Button>
                            <Button radius color={"blue"}>刷新</Button>
                            <Button radius color={"blue"}>向前</Button>
                        </span>
                    </div>
                </div>

                <h2 className="ya-title">图标按钮</h2>
                <div className="ya-p">
                    <div>
                        <Button color={"white"} icon="i-dingwei"/>
                        <Button radius color={"red"} icon="i-shuaxin"/>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ButtonDemo;
