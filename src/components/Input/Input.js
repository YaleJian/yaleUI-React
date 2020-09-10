import React, {useState} from "react";
import "./input.css";
import {dataUtils, Icon} from "..";
import ReactDOM from "react-dom";
import {Button} from "..";
import {DomUtils} from "..";

const Input = (props) => {

    const [showPsw, setShowPsw] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [selectData, setSelectData] = useState("");
    const [value, setValue] = useState(props.value || "");
    let autoContent = props.autoContent || typeof props.autoContent === "number";

    //普通输入框
    let input = (className) => {
        className = `ya-input ${className}`;

        //根据内容长短自动宽度的输入框
        let inputWidth = DomUtils.getTextLength(props.value) * props.autoContent;//计算文字长度
        let autoLength = autoContent ? {width: inputWidth ? inputWidth : 14} : null;

        //判断input值类型
        return <input className={className} style={autoLength}
                      type={props.type === "password" ? (showPsw ? "text" : "password") : props.type}
                      value={value}
                      placeholder={props.placeholder}
                      autoComplete={props.autoComplete || "off"}
                      onChange={onChange.bind(this)}
                      onClick={onClick.bind(this)}
                      onKeyDown={onKeyDown.bind(this)}
        />;
    };

    //带图标的输入框
    let inputGroup = (className, left, right) => {
        if (typeof left === "string") left = <Icon name={left}/>
        if (typeof right === "string") right = <Icon name={right}/>
        return <div className={"inputGroup" + (right ? " suffix" : "")} onClick={onClick.bind(this)}>
            {left ? <span className={"left"}>{left}</span> : ""}
            {input(className)}
            {right ? <span className={"right"}>{right}</span> : ""}
        </div>;
    };

    //数字输入框
    let numberInput = (className) => {
        let minus = <Button color="light-grey" className="margin0" icon="i-minus" onClick={numberMinus.bind(this)}/>;
        let plus = <Button color="light-grey" className="margin0" icon="i-plus" onClick={numberPlus.bind(this)}/>;
        return inputGroup(className, minus, plus);
    };
    //数字减少
    let numberMinus = (e) => {
        let data = dataUtils.decimalCalc(value || 0, props.increment || 1);
        setValue((data.arg1 - data.arg2) / data.gain);
        props.onChange(e);
    };
    //数字增加
    let numberPlus = (e) => {
        let data = dataUtils.decimalCalc(value || 0, props.increment || 1);
        setValue((data.arg1 + data.arg2) / data.gain);
        props.onChange(e);
    };

    let onChange = (e) => {
        setValue(e.target.value);
        props.onChange(e);
    };

    let iconClick = (e) => {
        if (props.iconClick) props.iconClick(e);
    };
    let onClick = (e) => {
        if (props.type === "popUp" || props.type === "select") setShowContent(!showContent);
    };
    let onKeyDown = (e) => {
        if (e.keyCode === 13 && props.type === "search") {
            props.onSearch(e);
        }
    };
    let cancel = (maskTag, e) => {
        setShowContent(false);
        maskTag.remove();
        e.preventDefault();
        e.stopPropagation();
    };


    //自定义弹出输入框
    let popUp = (className) => {
        let maskContent, maskTag;
        if (showContent) {
            //渲染模态层
            maskTag = document.getElementsByClassName("ya-mask");
            if (maskTag.length === 0) {
                //定义模态层渲染区
                maskTag = document.createElement("div");
                maskTag.className = "ya-mask";
                document.body.appendChild(maskTag);
            } else {
                maskTag = maskTag[0];
            }
            maskContent = <div className="ya-mask-content" onClick={cancel.bind(this, maskTag)}/>;
        }

        let content = props.children;

        //判断是否是选择框
        if (props.type === "select") content = select(maskTag);

        let popUpContentClass = "ya-popUp-content animated fastest fadeInDownSmall";

        //右侧下拉标志
        let icon = showContent ? <Icon name="i-BAI-shangjiantou"/> :
            <Icon name="i-BAI-xiajiantou"/>;

        return <span className="ya-popUp">
            {!props.selectIcon ? input(className) : inputGroup(className, ["", icon])}
            {showContent ? <div className={popUpContentClass}>
                {content}
            </div> : null}
            {showContent ? ReactDOM.createPortal(maskContent, maskTag) : null}
        </span>
    };

    //下拉选择框
    let select = (maskTag) => {
        let isArray = Array.isArray(props.dropDownBoxData);
        if (isArray) {
            let selectContent = props.dropDownBoxData.map((item, key) => {
                let isObject = typeof item === "object";
                return <div className="ya-select-content-item" key={key}
                            onClick={selectItemClick.bind(this, isObject ? item.id : item, maskTag)}>{isObject ? item.text : item}</div>
            });
            return <div className="ya-select-content">
                {selectContent}
            </div>;
        } else {
            return "参数应为数组";
        }
    };

    let selectItemClick = (item, maskTag, e) => {
        props.onChange(item, e);
        cancel(maskTag, e);
    }

    let type = props.type || "text";
    let className = props.className || "";

    switch (type) {
        case "password":
            let passwordIcon = <Icon name={showPsw ? "i-showPsw" : "i-hidePsw"} onClick={() => setShowPsw(!showPsw)}/>;
            return inputGroup(className, false, passwordIcon);
        case "search":
            let iconName = "i-magnifier";
            return inputGroup(className, props.left ? iconName : false, props.right ? iconName : false);
        case "number":
            className += "number";
            return numberInput(className);
        case "select":
            return popUp(className);
        case "popUp":
            return popUp(className);
        case "group":
            return inputGroup(className, props.left, props.right);
        case "textarea":
            return <textarea className={className} defaultValue={props.value}/>;
        default:
            return input(className);
    }

}

export {Input};