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
                        <Button color={"light-red"}/>
                        <Button color={"light-orange"}/>
                        <Button color={"light-green"}/>
                        <Button color={"light-blue"}/>
                        <Button color={"light-purple"}/>
                        <Button color={"light-yellow"}/>
                    </div>
                    <div>
                        <Button color={"grey"}/>
                        <Button color={"black"}/>
                        <Button color={"red"}/>
                        <Button color={"orange"}/>
                        <Button color={"green"}/>
                        <Button color={"blue"}/>
                        <Button color={"purple"}/>
                        <Button color={"yellow"}/>
                    </div>
                    <div>
                        <Button line={"grey"}/>
                        <Button line={"black"}/>
                        <Button line={"red"}/>
                        <Button line={"orange"}/>
                        <Button line={"green"}/>
                        <Button line={"blue"}/>
                        <Button line={"purple"}/>
                        <Button line={"yellow"}/>
                    </div>
                    <div>
                        <Button line={"light-grey"}/>
                        <Button line={"light-black"}/>
                        <Button line={"light-red"}/>
                        <Button line={"light-orange"}/>
                        <Button line={"light-green"}/>
                        <Button line={"light-blue"}/>
                        <Button line={"light-purple"}/>
                        <Button line={"light-yellow"}/>
                    </div>

                </div>

                <h2 className="ya-title">边框圆角</h2>
                <div className="ya-p">
                    <div>
                        <Button radius color={"black"}/>
                        <Button radius color={"grey"}/>
                        <Button radius line={"red"}/>
                        <Button radius line={"light-green"}/>
                        <Button radius line={"blue"}/>
                        <Button radius color={"light-orange"}/>
                        <Button radius color={"purple"}/>
                        <Button radius line={"light-yellow"}/>
                    </div>
                </div>

                <h2 className="ya-title">禁用</h2>
                <div className="ya-p">
                    <Button color={"blue"} disabled/>
                    <Button disabled/>
                </div>

                <h2 className="ya-title">自适应按钮</h2>
                <div className="ya-p">
                    <div>
                        <Button color={"blue"} adaptive/>
                        <Button color={"green"} adaptive/>
                        <Button radius color={"red"} adaptive/>
                        <Button radius color={"grey"} adaptive/>
                        <Button color={"light-orange"} adaptive/>
                        <Button color={"light-purple"} adaptive/>
                        <Button radius color={"light-green"} adaptive/>
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
                        <Button color={"light-white"} icon="i-dingwei"/>
                        <Button radius color={"red"} icon="i-shuaxin"/>
                    </div>
                </div>

                <h2 className="ya-title">清除默认样式</h2>
                <div className="ya-p">
                    <Button noStyle/>
                </div>
            </React.Fragment>
        );
    }
}

export default ButtonDemo;
