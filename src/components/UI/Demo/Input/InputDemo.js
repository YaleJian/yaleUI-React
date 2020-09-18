import React, {useEffect, useState} from "react";
import {Button, getNavData, Input} from "../../../index";
import {Icon} from "../../../index";
import {Tree} from "../../../index";
import TreeDemo from "../Tree/TreeDemo";
import {Message, testTreeData} from "../../..";

const InputDemo = () => {

    //加载右侧目录
    const [loading, setLoading] = useState(true);
    const [navData, setNavData] = useState([]);
    useEffect(() => {
        if (loading) {
            setNavData(getNavData())
            setLoading(false)
        }
    })

    const [treeData, set_treeData] = useState(testTreeData(5, 20));
    const [selectData, set_selectData] = useState("");
    const [selectData2, set_selectData2] = useState("");
    const [checkboxData, set_checkboxData] = useState("");
    const [returnData, set_returnData] = useState("");
    const [baseInput, set_baseInput] = useState("");
    const [borderInput, set_borderInput] = useState("");
    const [blockInput, set_blockInput] = useState("");
    const [numberInput, set_numberInput] = useState("");
    const [pswInput, set_pswInput] = useState("");
    const [iconInput, set_iconInput] = useState("");
    const [textareaInput, set_textareaInput] = useState("");

    return <React.Fragment>
        <Tree treeData={navData}
              treeType={3}
              openBtn={false}
              openLevel={"all"}
              ref={tree => {
                  tree = tree
              }}
        />
        <h1>输入框</h1>
        <h2 className="ya-title">基础输入框</h2>
        <div className="ya-p">
            <div className="margin10">输入的值：{baseInput}</div>
            <Input className="margin4" placeholder={"默认180px"} onChange={e => set_baseInput(e.target.value)}
                   value={baseInput}/>
            <br/>
            <Input className="margin4 radius6" placeholder={"支持自定义样式"} onChange={e => set_baseInput(e.target.value)}
                   value={baseInput}/>
        </div>

        <h2 className="ya-title">边框样式</h2>
        <div className="ya-p">
            <div className="margin10">输入的值：{borderInput}</div>
            <div className={"ya-flex"}>
                <Input className="ya-border-red margin4 min-width0" onChange={e => set_borderInput(e.target.value)}/>
                <Input className="ya-border-green radius4 margin4 min-width0"
                       onChange={e => set_borderInput(e.target.value)}/>
                <Input className="ya-border-blue radius6 margin4 min-width0"
                       onChange={e => set_borderInput(e.target.value)}/>
                <Input className="ya-border-orange radius10 margin4 min-width0"
                       onChange={e => set_borderInput(e.target.value)}/>
                <Input className="ya-border-purple margin4 radius16 min-width0"
                       onChange={e => set_borderInput(e.target.value)}/>
                <Input className="ya-border-yellow margin4 radius50 min-width0"
                       onChange={e => set_borderInput(e.target.value)}/>
            </div>
        </div>

        <h2 className="ya-title">根据内容长短自动宽度的输入框</h2>
        <div className="ya-p">
            <Input onChange={e => set_blockInput(e.target.value)} value={blockInput} autoContent/>
            <span className="padding0-10">输入的值：{blockInput}</span>
        </div>

        <h2 className="ya-title">密码框</h2>
        <div className="ya-p">
            <div className="margin10">输入的值：{pswInput}</div>
            <Input type="password" onChange={e => set_pswInput(e.target.value)} value={pswInput}/>
        </div>

        <h2 className="ya-title">带图标的输入框</h2>
        <div className="ya-p">
            <div className="margin10">输入的值：{iconInput}</div>
            <h3>搜索框</h3>
            <Input type="search" left placeholder={"请输入内容"} onChange={e => set_iconInput(e.target.value)}
                   iconClick={() => {
                       Message("点击了输入框图标", "", 1000)
                   }}
                   value={iconInput}/>
            <br/>
            <h3>带图标的输入框</h3>
            <Input type="group" left={"i-dingwei"} placeholder={"请输入内容"}
                   onChange={e => set_iconInput(e.target.value)}
                   iconClick={() => {
                       Message("点击了输入框图标", "", 1000)
                   }}
                   value={iconInput}/>
            <br/>
            <h3>带按钮的输入框</h3>
            <Input type="group" left={<Button icon={"i-dingwei"}/>} placeholder={"请输入内容"}
                   onChange={e => set_iconInput(e.target.value)}
                   iconClick={() => {
                       Message("点击了输入框图标", "", 1000)
                   }}
                   value={iconInput}/>
            <br/>
            <Input type="group" right={<Button icon={"i-dingwei"}/>} placeholder={"请输入内容"}
                   onChange={e => set_iconInput(e.target.value)}
                   iconClick={() => {
                       Message("点击了输入框图标", "", 1000)
                   }}
                   value={iconInput}/>
        </div>

        <h2 className="ya-title">文本域</h2>
        <div className="ya-p">
            <Input type="textarea" onChange={e => set_textareaInput(e.target.value)} value={textareaInput}/>
        </div>

        <h2 className="ya-title">数字框</h2>
        <div className="ya-p">
            <div className="margin10">输入的值：{numberInput}</div>
            <h3>整数</h3>
            <Input type="number" onChange={e => set_numberInput(e.target.value)} value={numberInput}/><br/>
            <h3>自定义小数位</h3>
            <Input type="number" increment={0.001} onChange={e => set_numberInput(e.target.value)}
                   value={numberInput}/><br/>
        </div>

        <h2 className="ya-title">选择框</h2>
        <div className="ya-p">
            <span className={"margin0-10"}>入参为字符串数组：</span>
            <Input type="select"
                   dropDownBoxData={["item1", "item2", "item3", "item4", "item5", "item6",]}
                   onChange={e => set_selectData(e.target.value)}
                   value={selectData}
                   placeholder={"请选择"}/>
            <span>选中的值：{selectData.toString()}</span>
            <br/>
            <span>入参为对象数组：</span>
            <Input type="select"
                   dropDownBoxData={[{id: 1, text: "item1"}, {id: 1, text: "item2"}, {id: 2, text: "item3"}, {
                       id: 3,
                       text: "item4"
                   }, {id: 4, text: "item5"},]}
                   onChange={e => set_selectData2(e.target.value)}
                   value={selectData2}
                   placeholder={"请选择"}/>
            <span className={"margin0-10"}>选中的值：{selectData2.toString()}</span>
        </div>

        <h2 className="ya-title">多选选择框</h2>
        <div className="ya-p">
            <Input type="popUp" value={checkboxData} placeholder={"请选择"}>
                <Tree treeData={treeData} openBtn={false} checkbox={true}
                      checkboxClick={e => set_checkboxData(e)}/>
            </Input>
            <span>选中的值：{checkboxData.toString()}</span>

        </div>

        <div className="ya-p">
            <h2 className="ya-title">自定义弹出内容输入框：在弹出内容中确认返回值</h2>
            <div>输出的值：{returnData.toString()}</div>
            <Input type="popUp" value={returnData}
                   placeholder={"请选择"}>
                <TreeDemo getReturnData={e => set_returnData(e)}/>
            </Input>
        </div>
    </React.Fragment>;

    function onChange(id, e) {
    }
}

export default InputDemo;