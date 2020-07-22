import React from "react";
import {Input} from "./Input";
import {Icon} from "..";
import {TreeDemo} from "..";
import {Tree} from "..";
import {testTreeData} from "../Tree/TreeUtil";

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
        }
    }

    render() {
        return <React.Fragment>

            <div className="ya-p">
                <h2>基础输入框</h2>
                <Input placeholder={"请输入内容"} onChange={this.onChange.bind(this)} value={this.state.inputValue}/>
                <span className="padding0-10">输入的值：{this.state.inputValue}</span>
            </div>

            <div className="ya-p">
                <h2>根据内容长短自动宽度的输入框</h2>
                <Input placeholder={"请输入内容"} onChange={this.onChange.bind(this)} value={this.state.inputValue} autoContent={true}/>
                <br/>
                <Input placeholder={"请输入内容"} onChange={this.onChange.bind(this)} value={this.state.inputValue} autoContent={1.4}/>
                <span className="padding0-10">输入的值：{this.state.inputValue}</span>
            </div>

            <div className="ya-p">
                <h2>密码框</h2>
                <Input type="password" placeholder={"请输入内容"} onChange={this.onChange.bind(this)} value={this.state.inputValue}/>
            </div>

            <div className="ya-p">
                <h2>搜索框</h2>
                <Input type="search" placeholder={"请输入内容"} onChange={this.onChange.bind(this)} value={this.state.inputValue}/>
                <br/>
                <Input type="search" className="right" placeholder={"请输入内容"} onChange={this.onChange.bind(this)} value={this.state.inputValue}/>
            </div>

            <div className="ya-p">
                <h2>带图标的输入框</h2>
                <Input type="withIcon" placeholder={"请输入内容"} icon={[<Icon/>]} onChange={this.onChange.bind(this)} value={this.state.inputValue}/><br/>
                <Input type="withIcon" placeholder={"请输入内容"} icon={[<Icon/>,<Icon/>]} onChange={this.onChange.bind(this)} value={this.state.inputValue}/>
            </div>

            <div className="ya-p">
                <h2>文本域</h2>
                <Input type="textarea" placeholder={"请输入内容"} onChange={this.onChange.bind(this)} value={this.state.inputValue}/>
            </div>

            <div className="ya-p">
                <h2>数字框</h2>
                任意数字：<Input type="number" onChange={this.onChange.bind(this)} value={this.state.inputValue}/><br/>
                整数：<Input type="integer" onChange={this.onChange.bind(this)} value={this.state.inputValue}/>
            </div>

            <div className="ya-p">
                <h2>选择框</h2>

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

            <div className="ya-p">
                <h2>多选选择框</h2>

                <Input type="popUp"
                       content={<Tree treeData={this.state.treeData}
                                      openBtn={false}
                                      checkbox={true}
                                      checkboxClick={this.getCheckboxData.bind(this)}
                       />}
                       value={this.state.checkboxData}
                       placeholder={"请选择"}/>
                <span>选中的值：{this.state.checkboxData.toString()}</span>

            </div>



            <div className="ya-p">
                <h2>自定义弹出内容输入框：在弹出内容中确认返回值</h2>
                <div>输出的值：{this.state.returnData.toString()}</div>
                <Input type="popUp"
                       content={<TreeDemo getReturnData={this.getReturnData.bind(this)}/>}
                       value={this.state.returnData}
                       placeholder={"请选择"}/>
            </div>
        </React.Fragment>;
    }

    onChange(inputValue,e) {
        this.setState({inputValue});
    }

    getReturnData(returnData) {
        this.setState({returnData});
    }

    getSelectData(selectData,e) {
        this.setState({selectData});
    }

    getSelectData2(selectData2) {
        this.setState({selectData2});
    }
    getCheckboxData(checkboxData) {
        this.setState({checkboxData});
    }
}

export {InputDemo};