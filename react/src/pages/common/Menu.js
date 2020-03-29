import React, {Component} from 'react';
import Tree from "../../modules/Tree/Tree";
import Icon from "../../modules/utils/Icon";
import Button from "../../modules/Button/Button";

const menuData = [
    {id: "designStandard", name: "设计规范", link: "/ui/designStandard", sort: 1},
    {id: "typography", name: "排版", link: "/ui/typography", sort: 2},
    {id: "tree", name: "树组件", link: "/ui/tree", sort: 3},
    {id: "richTextEditor", name: "富文本编辑器", link: "/ui/richTextEditor", sort: 4},
    {id: "cloudDrive", name: "云盘", link: "/ui/cloudDrive", sort: 5},
    {id: "button", name: "按钮", link: "/ui/button", sort: 6},
    {id: "input", name: "输入框和选择框", link: "/ui/input", sort: 7},
    {id: "message", name: "提示", link: "/ui/message", sort: 8},
    {id: "date", name: "日期", link: "/ui/date", sort: 9},
    {id: "pagination", name: "分页", link: "/ui/pagination", sort: 10},
    {id: "animation", name: "动画", link: "/ui/animation", sort: 11},
    {id: "map", name: "地图", link: "/ui/map", sort: 12},
    {id: "chart", name: "图表", link: "/ui/chart", sort: 13},
];

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShow: document.body.clientWidth > 900
        }
    }

    render() {
        let indexId;
        let path = this.props.path;
        indexId = path.substring(path.lastIndexOf("/") + 1);
        if(indexId === 'ui') indexId = menuData[0].id;

        let toggleClass = this.state.isShow ?  " animated fastest fadeInDownSmall" : " hide" ;
        return (
            <>
                <div className={this.state.isShow ? "ya-menu" : "ya-menu  hide"}>
                    <div className={"content" + toggleClass}>
                        <Tree treeData={menuData}
                              indexId={indexId}

                              treeType={4}
                              openLevel={"all"}
                            // indent = {false}
                              menuStyle={"dark"}
                              rightClickMenu={true}

                              ref={tree => {
                                  this.tree = tree
                              }}
                        />
                    </div>
                    <Button className={"white toggle"} content={<Icon name={this.state.isShow ? "i-BAI-zuojiantou" : "i-BAI-youjiantou"}/>}
                            onClick={this.toggle.bind(this)}/>
                </div>

            </>
        );
    }

    toggle = () => {
        let isShow = !this.state.isShow;
        this.props.setSideLeft(isShow);
        this.setState({isShow});
    }
}

export default Menu;
