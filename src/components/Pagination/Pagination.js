import React from "react";
import {Input} from "..";
import {Icon} from "..";
import {Button} from "..";
import "./pagination.css";

/**
 * 分页
 */
class Pagination extends React.Component {
    static defaultProps = {
        page: 1,//当前页
        eachPage: 1,//每页多少条
        total: 1, //一共多少条数据
        getPage: () => {
        },//获取选择的页码
    };

    constructor(props) {
        super(props);
        this.state = {
            page: this.props.page,
            eachPage: this.props.eachPage,
            total: this.props.total
        }
    }

    render() {
        let page = this.state.page;
        let totalPage = Math.ceil(this.state.total / this.state.eachPage);
        let dropData = totalPage ? Array(totalPage).fill(null).map((_, h) => h + 1) : [];
        return <div className={"ya-pagination"}>
            <span onClick={this.prev.bind(this)}>
                <Button className={"item white" + (page === 1 ? " disabled" : "")}><Icon name={"i-BAI-zuojiantou"}/></Button>
            </span>
            <span className="item pageItem">
                <Input className="page" type={"select"} dropDownBoxData={dropData}
                       value={this.state.page} autoContent = {0}
                       onChange={this.getSelectData.bind(this)} selectIcon={false}/>
            </span>
            <span className="item">/</span>
            <span className="item">{totalPage}</span>
            <span onClick={this.next.bind(this)}>
                <Button className={"item white" + (page === totalPage ? " disabled" : "")}><Icon name={"i-BAI-youjiantou"}/></Button>
            </span>
        </div>
    }

    getSelectData = (page) => {
        this.props.getPage(page);
        this.setState({page})
    };
    prev = () => {
        let page = this.state.page;
        if (page > 1) this.setState({page: page - 1});
    };
    next = () => {
        let page = this.state.page;
        if (page < this.state.total) this.setState({page: page + 1});
    }


}

export {Pagination};