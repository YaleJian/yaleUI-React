import React, {Component} from 'react';
import {Icon} from "../../components";
import {Tree} from "../../components";
import {getNavData} from "../../components/Tree/TreeUtil";
import {Checkbox} from "../../components";
import {Radio} from "../../components";

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
            <div className="ya-p">
                <h2 className="ya-title">标题</h2>
                <h1>h1.design</h1>
                <h2>h2.design</h2>
                <h3>h3.design</h3>
                <h4>h4.design</h4>
                <h5>h5.design</h5>
                <h6>h6.design</h6>
            </div>
            <div className="ya-p textDemo">
                <h2 className="ya-title">颜色</h2>
                <div className="white bg-blue">white</div>
                <div className="red">red</div>
                <div className="blue">blue</div>
                <div className="orange">orange</div>
                <div className="green">green</div>
                <div className="grey">grey</div>

            </div>
            <div className="ya-p textDemo">
                <h2 className="ya-title">背景</h2>
                <div className="bg-white">bg-white</div>
                <div className="bg-red">bg-red</div>
                <div className="bg-blue">bg-blue</div>
                <div className="bg-orange">bg-orange</div>
                <div className="bg-green">bg-green</div>
                <div className="bg-grey">bg-grey</div>
            </div>
            <div className="ya-p">
                <h2 className="ya-title">标识</h2>
                <mark>Yale Design</mark>
                <br/>
                <code>Yale Design</code><br/>
                <u>Yale Design</u><br/>
                <del>Yale Design</del>
                <br/>
                <strong>Yale Design</strong><br/>
            </div>
            <div className="ya-p textDemo">
                <h2 className="ya-title">边框</h2>
                <div className="ya-border">ya-border</div>
                <div className="ya-border-white">ya-border</div>
                <div className="ya-border-white">ya-border</div>
            </div>

            <div className="ya-p">
                <h2 className="ya-title">自适应列</h2>
                <div className="ya-flex center">
                    <div className="flex-1 bg-blue white">flex-1</div>
                    <div className="flex-auto bg-green white">flex-auto</div>
                    <div className="flex-2 bg-orange white">flex-2</div>
                    <div className="flex-3 bg-blue white">flex-3</div>
                    <div className="flex-4 bg-green white">flex-4</div>
                    <div className="flex-5 bg-orange white">flex-5</div>
                    <div className="flex-6 bg-blue white">flex-6</div>
                </div>
                <br/>
                <div className="ya-flex center">
                    <div className="flex-1 bg-blue white height20">flex-1</div>
                    <div className="flex-auto bg-green white height50">flex-auto</div>
                    <div className="flex-2 bg-orange white height20">flex-2</div>
                </div>
                <br/>
                <div className="ya-flex align-center center">
                    <div className="flex-1 bg-green white height20">flex-1</div>
                    <div className="flex-auto bg-blue white height50">flex-auto</div>
                    <div className="flex-2 bg-orange white height20">flex-2</div>
                </div>
                <br/>
                <div className="ya-flex align-bottom center">
                    <div className="flex-1 bg-green white height20">flex-1</div>
                    <div className="flex-auto bg-blue white height50">flex-auto</div>
                    <div className="flex-2 bg-orange white height20">flex-2</div>
                </div>
            </div>

            <div className="ya-p">
                <h2 className="ya-title">索引（面包屑导航）</h2>
                <div className="ya-indexBar">
                    <span className="item"><Icon name="i-BAI-wuzi"/></span>
                    <span className="item animated fastest fadeInLeft">节点node 8</span>
                    <span className="item animated fastest fadeInLeft">节点node 8-1</span>
                    <span className="item animated fastest fadeInLeft">节点node 8-1-5</span>
                    <span className="item animated fastest fadeInLeft">节点node 8-1-5-14</span>
                </div>
            </div>
            <div className="ya-p">
                <h2 className="ya-title">下拉框</h2>
                <div>
                    <select className="ya-select">
                        <option>item</option>
                        <option>item</option>
                        <option>item</option>
                    </select>
                </div>
            </div>
            <div className="ya-p">
                <h2 className="ya-title">图标</h2>
                <div>
                    <Icon name="i-yalejian"/>
                    <Icon name="i-yalejian-logo"/>
                    <Icon name="i-chakan"/>
                    <Icon name="i-BAI-wuzi"/>
                    <Icon name="i-BAI-gongneng"/>
                    <Icon name="i-BAI-zan"/>
                </div>
            </div>
            <div className="ya-p checkboxDemo">
                <h2 className="ya-title">多选框</h2>
                <div>
                    <Checkbox select={1}/>
                    <Checkbox select={2}/>
                    <Checkbox select={3}/>
                </div>
            </div>

            <div className="ya-p">
                <h2 className="ya-title">单选框</h2>
                <div>
                    <Radio text={"单选框"}/>
                </div>
            </div>

        </React.Fragment>;
    }

    componentDidMount() {
        if (this.state.loading) this.setState({navData: getNavData(), loading: false});
    }
}

export default Typography;
