import React from "react";
import "./input.css";
import Icon from "../utils/Icon";
import ReactDOM from "react-dom";
import Button from "../Button/Button";
import DomUtils from "../utils/domUtils";

class Input extends React.Component {
    static defaultProps = {
        type: "text",
        value: "",
        placeholder: "",
        className: "",
        icon: [],
        autoComplete: "off",
        autoContent : false,
        dropDownBoxData: [],
        selectIcon : true,
        onChange: () => {
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            passwordHide: this.props.type === "password",
            showContent: false,
            selectData: "",
        };
        this.autoContent = this.props.autoContent || typeof this.props.autoContent === "number";
    }

    render() {
        let type = this.props.type;
        let className = this.props.className;
        switch (type) {
            case "password":
                let passwordIcon = ["", <Icon name={this.state.passwordHide ? "i-showPsw" : "i-hidePsw"}/>];
                return this.inputWithIcon(className + " right", passwordIcon);
            case "search":
                let searchIcon = className.includes("right") ? ["", <Icon name="i-magnifier"/>] : [<Icon
                    name="i-magnifier"/>];
                return this.inputWithIcon(className, searchIcon);
            case "number":
                className += " number";
                return this.numberInput(className);
            case "integer":
                className += " integer";
                return this.numberInput(className);
            case "select":
                return this.popUp(className);
            case "popUp":
                return this.popUp(className);
            case "withIcon":
                return this.inputWithIcon(className, this.props.icon);
            case "textarea":
                return <textarea className={className} defaultValue={this.props.value}/>;
            default:
                return this.input(className);
        }
    }

    //普通输入框
    input = (className) => {
        let type = this.props.type;
        className = "ya-input " + this.props.type + " " + className;
        //计算长度
        let inputWidth = DomUtils.getTextLength(this.props.value) * this.props.autoContent;
        //判断input值类型
        let value = this.props.value;
        value = type === "number" || type === "integer"  ? Number(value) : value.toString();
        return <input className={className} style={this.autoContent ? {width : inputWidth ? inputWidth : 14} : null}
                      type={this.state.passwordHide ? "password" : this.props.type}
                      value={value}
                      placeholder={this.props.placeholder}
                      autoComplete={this.props.autoComplete}
                      onChange={this.onChange.bind(this)}
                      onClick={this.onClick.bind(this)}
                      ref={inputRef => this.inputRef = inputRef}
        />;
    };

    //带图标的输入框
    inputWithIcon = (className, icon) => {
        if (icon && icon[0]) className += " left";
        if (icon && icon[1]) className += " right";
        let inputIcon = (icon) => {
            return <span className="inputIcon" onClick={this.iconClick.bind(this)}>{icon}</span>
        };
        return <span className="inputGroup" onClick={this.onClick.bind(this)}>
            {icon[0] ? inputIcon(icon[0]) : null}
            {this.input(className)}
            {icon[1] ? inputIcon(icon[1]) : null}
        </span>;
    };

    //数字输入框
    numberInput = (className) => {
        let minus = <Button className="white" content={<Icon name="i-minus"/>} onClick={this.numberMinus.bind(this)}/>;
        let plus = <Button className="white" content={<Icon name="i-plus"/>} onClick={this.numberPlus.bind(this)}/>;
        return this.inputWithIcon(className, [minus, plus]);
    };
    //数字增加
    numberMinus = (e) => {
        let number = Number(this.inputRef.value);
        this.inputRef.value = number + 1;
        this.props.onChange(e);
    };
    //数字减少
    numberPlus = (e) => {
        let number = Number(this.inputRef.value);
        this.inputRef.value = number - 1;
        this.props.onChange(e);
    };

    onChange = (e) => {
        this.props.onChange(e.target.value, e);
    };

    iconClick = () => {
        if (this.props.type === "password") this.setState({passwordHide: !this.state.passwordHide})
    };
    onClick = (e) => {
        if (this.props.type === "popUp" || this.props.type === "select") {
            this.setState({showContent: !this.state.showContent});
        }
    };
    cancel = (maskTag, e) => {
        this.setState({showContent: false});
        maskTag.remove();
        e.preventDefault();
        e.stopPropagation();
    };


    //自定义弹出输入框
    popUp = (className) => {
        let maskContent, maskTag;
        if (this.state.showContent) {
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
            maskContent = <div className="ya-mask-content" onClick={this.cancel.bind(this, maskTag)}/>;
        }

        let content = this.props.content;

        //判断是否是选择框
        if (this.props.type === "select") content = this.select(maskTag);

        let popUpContentClass = "ya-popUp-content animated fastest fadeInDownSmall";

        //右侧下拉标志
        let icon = this.state.showContent ? <Icon name="i-BAI-shangjiantou"/> :
            <Icon name="i-BAI-xiajiantou"/>;

        return <span className="ya-popUp">
            { !this.props.selectIcon ? this.input(className) : this.inputWithIcon(className, ["",icon])}
            {this.state.showContent ? <div className={popUpContentClass}>
                {content}
            </div> : null}
            {this.state.showContent ? ReactDOM.createPortal(maskContent, maskTag) : null}
        </span>
    };

    //下拉选择框
    select = (maskTag) => {
        let isArray = Array.isArray(this.props.dropDownBoxData);
        if (isArray) {
            let selectContent = this.props.dropDownBoxData.map((item, key) => {
                let isObject = typeof item === "object";
                return <div className="ya-select-content-item" key={key}
                            onClick={this.selectItemClick.bind(this, isObject ? item.id : item, maskTag)}>{isObject ? item.text : item}</div>
            });
            return <div className="ya-select-content">
                {selectContent}
            </div>;
        } else {
            return "参数应为数组";
        }
    };

    selectItemClick = (item, maskTag, e) => {
        this.props.onChange(item,e);
        this.cancel(maskTag, e);
    }


}

export default Input;