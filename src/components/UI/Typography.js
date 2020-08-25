import React, {Component} from 'react';
import {Icon} from "../index";
import {Tree} from "../index";
import {getNavData} from "..";
import {Checkbox} from "../index";
import {Radio} from "../index";

/**
 * 排版
 */
class Typography extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            navData: []
        }
    }

    render() {
        return <React.Fragment>
            <Tree treeData={this.state.navData}

                  treeType={3}
                  openBtn={false}
                  openLevel={"all"}

                  ref={tree => {
                      this.tree = tree
                  }}
            />
            <h1 className="ya-title">排版</h1>

            <h2 className="ya-title">颜色</h2>
            <div className="ya-p ya-flex">
                <div className="ya-black margin0-6">黑色</div>
                <div className="ya-white ya-bg-black ya-width-fit margin0-6">白色</div>
                <div className="ya-grey margin0-6">深灰色</div>
                <div className="ya-red margin0-6">红色</div>
                <div className="ya-green margin0-6">绿色</div>
                <div className="ya-blue margin0-6">蓝色</div>
                <div className="ya-orange margin0-6">橙色</div>
                <div className="ya-yellow margin0-6">黄色</div>
                <div className="ya-purple margin0-6">紫色</div>
                <div className="ya-lightGrey margin0-6">浅灰色</div>
            </div>
            <h2 className="ya-title">背景</h2>
            <div className="ya-p textDemo">
                <div className="ya-bg-black ya-white padding6-0 center">黑色背景</div>
                <div className="ya-bg-white padding6-0 center">白色背景</div>
                <div className="ya-bg-grey ya-white padding6-0 center">深灰色背景</div>
                <div className="ya-bg-red ya-white padding6-0 center">红色背景</div>
                <div className="ya-bg-green ya-white padding6-0 center">绿色背景</div>
                <div className="ya-bg-blue ya-white padding6-0 center">蓝色背景</div>
                <div className="ya-bg-orange ya-white padding6-0 center">橙色背景</div>
                <div className="ya-bg-yellow ya-white padding6-0 center">黄色背景</div>
                <div className="ya-bg-purple ya-white padding6-0 center">紫色背景</div>
                <div className="ya-bg-lightGrey padding6-0 center">浅灰色背景</div>
                <div className="ya-bg-lightRed padding6-0 center">浅红色背景</div>
                <div className="ya-bg-lightBlue padding6-0 center">浅蓝色背景</div>
                <div className="ya-bg-lightOrange padding6-0 center">浅橙色背景</div>
                <div className="ya-bg-lightGreen padding6-0 center">浅绿色背景</div>
            </div>
            <h2 className="ya-title">边框</h2>
            <div className="ya-p textDemo">
                <div className="ya-border-black margin6-0 padding6">黑色边框</div>
                <div className="ya-border-grey margin6-0 padding6">浅灰色边框</div>
                <div className="ya-border-orange margin6-0 padding6">橙色边框</div>
                <div className="ya-border-purple margin6-0 padding6">紫色边框</div>
                <div className="ya-border ya-blue margin6-0 padding6">和文字颜色一致的边框</div>
                <div className="ya-border ya-blue ya-radius4 ya-width-fit margin6-0 padding6">圆角4px</div>
                <div className="ya-border ya-green ya-radius10 ya-width-fit margin6-0 padding6">圆角10px</div>
                <div className="ya-border ya-green ya-radius16 ya-width-fit margin6-0 padding6">圆角16px</div>
                <div className="ya-border ya-red ya-radius50 ya-width-fit with20 height20 margin6-0 padding6 center">圆</div>
            </div>
            <h2 className="ya-title">标题</h2>
            <div className="ya-p">
                <h1>h1标题</h1>
                <h2>h2标题</h2>
                <h3>h3标题</h3>
                <h4>h4标题</h4>
                <h5>h5标题</h5>
                <h6>h6标题</h6>
            </div>
            <h2 className="ya-title">标签默认样式</h2>
            <div className="ya-p">
                <mark>标记</mark>
                <br/>
                <code>代码</code>
                <br/>
                <u>下划线</u>
                <br/>
                <del>删除线</del>
                <br/>
                <strong>粗体</strong>
                <br/>
            </div>

            <h2 className="ya-title">对齐方式</h2>
            <div className="ya-p">
                <div className="ya-flex center">
                    <div className="ya-flex-1 ya-bg-blue ya-white">ya-flex-1</div>
                    <div className="ya-flex-auto ya-bg-green ya-white">ya-flex-auto</div>
                    <div className="ya-flex-2 ya-bg-orange ya-white">ya-flex-2</div>
                    <div className="ya-flex-3 ya-bg-blue ya-white">ya-flex-3</div>
                    <div className="ya-flex-4 ya-bg-green ya-white">ya-flex-4</div>
                    <div className="ya-flex-5 ya-bg-orange ya-white">ya-flex-5</div>
                    <div className="ya-flex-6 ya-bg-blue ya-white">ya-flex-6</div>
                </div>
                <br/>
                <div className="ya-flex center">
                    <div className="ya-flex-1 ya-bg-blue ya-white height20">ya-flex-1</div>
                    <div className="ya-flex-auto ya-bg-green ya-white height50">ya-flex-auto</div>
                    <div className="ya-flex-3 ya-bg-orange ya-white height20">ya-flex-3</div>
                </div>
                <br/>
                <div className="ya-flex align-center center">
                    <div className="ya-flex-1 ya-bg-green ya-white height20">ya-flex-1</div>
                    <div className="ya-flex-auto ya-bg-blue ya-white height50">ya-flex-auto</div>
                    <div className="ya-flex-4 ya-bg-orange ya-white height20">ya-flex-4</div>
                </div>
                <br/>
                <div className="ya-flex align-bottom center">
                    <div className="ya-flex-1 ya-bg-green ya-white height20">ya-flex-1</div>
                    <div className="ya-flex-auto ya-bg-blue ya-white height50">ya-flex-auto</div>
                    <div className="ya-flex-5 ya-bg-orange ya-white height20">ya-flex-5</div>
                </div>
            </div>


            <h2 className="ya-title">图标</h2>
            <div className="ya-p">
                <Icon name="i-chakan"/>彩色图标<br/>
                <Icon name="i-BAI-wuzi"/>单色图标<br/>
                <Icon name="i-BAI-zan" className={" ya-purple"}/>自定义颜色图标<br/>
            </div>
            <h2 className="ya-title">多选框</h2>
            <div className="ya-p checkboxDemo">
                <div>
                    <Checkbox select={1}>未选中</Checkbox>
                    <Checkbox select={2} className={"ya-orange"}>选中</Checkbox>
                    <Checkbox select={3} className={"ya-blue"}>半选</Checkbox>
                </div>
            </div>

            <h2 className="ya-title">单选框</h2>
            <div className="ya-p">
                <Radio>单选框</Radio>
                <Radio className={"ya-red"}>单选框</Radio>
                <Radio className={"ya-green"}>单选框</Radio>
            </div>
            <h2 className="ya-title">索引（面包屑导航）</h2>
            <div className="ya-p">
                <div className="ya-indexBar">
                    <span className="item"><Icon name="i-BAI-wuzi"/></span>
                    <span className="item animated fastest fadeInLeft">节点node 8</span>
                    <span className="item animated fastest fadeInLeft">节点node 8-1</span>
                    <span className="item animated fastest fadeInLeft">节点node 8-1-5</span>
                    <span className="item animated fastest fadeInLeft">节点node 8-1-5-14</span>
                </div>
            </div>

        </React.Fragment>;
    }

    componentDidMount() {
        if (this.state.loading) this.setState({navData: getNavData(), loading: false});
    }
}

export default Typography;
