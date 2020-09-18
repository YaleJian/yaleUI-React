import React from "react";
import "./checkbox.css";
import {Icon} from "..";

/**
 * 复选框
 */
class Checkbox extends React.Component {
    static defaultProps = {
        bindData: "",
        onClick: () => {
        }
    };
    static UNSELECTED = 1;//非选中状态
    static SELECTED = 2;//选中状态
    static SEMI_SELECTED = 3;//半选状态
    constructor(props) {
        super(props);
        this.state = {
            select: this.props.select || Checkbox.UNSELECTED,
        }
    }

    render() {
        let selectIconSvg = <Icon name="i-buxuan"/>;
        let zoom = '';
        if (this.state.select === Checkbox.SELECTED) {
            selectIconSvg = <Icon name="i-xuanzhong"/>;
            zoom = 'ya-zoom10-15';
        } else if (this.state.select === Checkbox.SEMI_SELECTED) {
            selectIconSvg = <Icon name="i-banxuan"/>;
        }
        let selectIcon = 'ya-checkbox ' + zoom + " " + this.props.className;
        return <span className={selectIcon} onClick={this.onClick.bind(this)}>
            {selectIconSvg}
            <span className={"ya-checkbox-text"}>{this.props.children}</span>
        </span>;
    }

    onClick = (e) => {
        if (this.state.select === Checkbox.SELECTED) {
            this.setState({select: Checkbox.UNSELECTED});
        } else {
            this.setState({select: Checkbox.SELECTED});
        }
        this.props.onClick(this.state.select, this.props.bindData, e);
    }
}

export {Checkbox};