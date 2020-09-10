import React from "react";
import {Button, getNavData, Input} from "../../../index";
import {Icon} from "../../../index";
import {Tree} from "../../../index";
import TreeDemo from "../Tree/TreeDemo";
import {Message, testTreeData} from "../../..";

class InputDemo extends React.Component {
    static defaultProps = {};

    constructor(props) {
        super(props);
        let treeData = testTreeData(5, 20);
        this.state = {
            treeData,
            selectData: "",
            selectData2: "",
            checkboxData: "",
            returnData: "",
            inputValue: "",
            baseInput: "",
            borderInput: "",
            blockInput: "",
            numberInput: "1",
            pswInput: "123456",
            iconInput: "",
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
            <h1>输入框</h1>
            <h2 className="ya-title">基础输入框</h2>
            <div className="ya-p">
                <div className="margin10">输入的值：{this.state.baseInput}</div>
                <Input className="margin4" placeholder={"默认180px"} onChange={this.onChange.bind(this, "baseInput")}
                       value={this.state.baseInput}/>
                <br/>
                <Input className="margin4" placeholder={"请输入内容"} onChange={this.onChange.bind(this, "baseInput")}
                       value={this.state.baseInput}/>
            </div>

            <h2 className="ya-title">边框样式</h2>
            <div className="ya-p">
                <div className="margin10">输入的值：{this.state.borderInput}</div>
                <div className={"ya-flex"}>
                    <Input className="ya-border-red margin4 min-width0" onChange={this.onChange.bind(this, "borderInput")}/>
                    <Input className="ya-border-green radius4 margin4 min-width0" onChange={this.onChange.bind(this, "borderInput")}/>
                    <Input className="ya-border-blue radius6 margin4 min-width0" onChange={this.onChange.bind(this, "borderInput")}/>
                    <Input className="ya-border-orange radius10 margin4 min-width0" onChange={this.onChange.bind(this, "borderInput")}/>
                    <Input className="ya-border-purple margin4 radius16 min-width0" onChange={this.onChange.bind(this, "borderInput")}/>
                    <Input className="ya-border-yellow margin4 radius50 min-width0" onChange={this.onChange.bind(this, "borderInput")}/>
                </div>
            </div>

            <h2 className="ya-title">根据内容长短自动宽度的输入框</h2>
            <div className="ya-p">
                <Input onChange={this.onChange.bind(this, "blockInput")} value={this.state.blockInput} autoContent/>
                <span className="padding0-10">输入的值：{this.state.blockInput}</span>
            </div>

            <h2 className="ya-title">密码框</h2>
            <div className="ya-p">
                <div className="margin10">输入的值：{this.state.pswInput}</div>
                <Input type="password" onChange={this.onChange.bind(this, "pswInput")} value={this.state.pswInput}/>
            </div>

            <h2 className="ya-title">带图标的输入框</h2>
            <div className="ya-p">
                <div className="margin10">输入的值：{this.state.iconInput}</div>
                <h3>搜索框</h3>
                <Input type="search" left placeholder={"请输入内容"} onChange={this.onChange.bind(this, "iconInput")}
                       iconClick={()=>{Message("点击了输入框图标", "",1000)}}
                       value={this.state.iconInput}/>
                <br/>
                <h3>带图标的输入框</h3>
                <Input type="group" left={"i-dingwei"} placeholder={"请输入内容"}
                       onChange={this.onChange.bind(this, "iconInput")}
                       iconClick={()=>{Message("点击了输入框图标", "",1000)}}
                       value={this.state.iconInput}/>
                <br/>
                <h3>带按钮的输入框</h3>
                <Input type="group" left={<Button icon={"i-dingwei"}/>} placeholder={"请输入内容"}
                       onChange={this.onChange.bind(this, "iconInput")}
                       iconClick={()=>{Message("点击了输入框图标", "",1000)}}
                       value={this.state.iconInput}/>
                <br/>
                <Input type="group" right={<Button icon={"i-dingwei"}/>} placeholder={"请输入内容"}
                       onChange={this.onChange.bind(this, "iconInput")}
                       iconClick={()=>{Message("点击了输入框图标", "",1000)}}
                       value={this.state.iconInput}/>
            </div>

            <h2 className="ya-title">文本域</h2>
            <div className="ya-p">
                <Input type="textarea" onChange={this.onChange.bind(this, "textareaInput")} value={this.state.textareaInput}/>
            </div>

            <h2 className="ya-title">数字框</h2>
            <div className="ya-p">
                <div className="margin10">输入的值：{this.state.numberInput}</div>
                <h3>整数</h3>
                <Input type="number" onChange={this.onChange.bind(this, "numberInput")} value={this.state.numberInput}/><br/>
                <h3>自定义小数位</h3>
                <Input type="number" increment={0.001} onChange={this.onChange.bind(this, "numberInput")} value={this.state.numberInput}/><br/>
            </div>

            <h2 className="ya-title">选择框</h2>
            <div className="ya-p">
                <span className={"margin0-10"}>入参为字符串数组：</span>
                <Input type="select"
                       dropDownBoxData={["item1", "item2", "item3", "item4", "item5", "item6",]}
                       onChange={this.getSelectData.bind(this)}
                       value={this.state.selectData}
                       placeholder={"请选择"}/>
                <span>选中的值：{this.state.selectData.toString()}</span>
                <br/>
                <span>入参为对象数组：</span>
                <Input type="select"
                       dropDownBoxData={[{id: 1, text: "item1"}, {id: 1, text: "item2"}, {id: 2, text: "item3"}, {
                           id: 3,
                           text: "item4"
                       }, {id: 4, text: "item5"},]}
                       onChange={this.getSelectData2.bind(this)}
                       value={this.state.selectData2}
                       placeholder={"请选择"}/>
                <span className={"margin0-10"}>选中的值：{this.state.selectData2.toString()}</span>
            </div>

            <h2 className="ya-title">多选选择框</h2>
            <div className="ya-p">
                <Input type="popUp" value={this.state.checkboxData} placeholder={"请选择"}>
                    <Tree treeData={this.state.treeData} openBtn={false} checkbox={true}
                          checkboxClick={this.getCheckboxData.bind(this)}/>
                </Input>
                <span>选中的值：{this.state.checkboxData.toString()}</span>

            </div>

            <div className="ya-p">
                <h2 className="ya-title">自定义弹出内容输入框：在弹出内容中确认返回值</h2>
                <div>输出的值：{this.state.returnData.toString()}</div>
                <Input type="popUp" value={this.state.returnData}
                       placeholder={"请选择"}>
                    <TreeDemo getReturnData={this.getReturnData.bind(this)}/>
                </Input>
            </div>
        </React.Fragment>;
    }

    onChange(id, e) {
        let state = {...this.state};
        state[id] = e.target.value;
        this.setState(state);
    }

    getReturnData(returnData) {
        this.setState({returnData});
    }

    getSelectData(selectData, e) {
        this.setState({selectData});
    }

    getSelectData2(selectData2) {
        this.setState({selectData2});
    }

    getCheckboxData(checkboxData) {
        this.setState({checkboxData});
    }
    componentDidMount() {
        if (this.state.loading) this.setState({navData: getNavData(), loading: false});
    }
}

export default InputDemo;