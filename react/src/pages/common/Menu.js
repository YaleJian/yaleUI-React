import React, {Component} from 'react';
import Tree from "../../modules/Tree/Tree";
import Icon from "../../modules/utils/Icon";
import Button from "../../modules/Button/Button";

const menuData = [
    {id: 1, name: "设计规范", link: "/ui/designStandard", sort: 1},
    {id: 8, name: "排版", link: "/ui/typography", sort: 2},
    {id: 2, name: "树组件", link: "/ui/tree", sort: 3},
    {id: 3, name: "富文本编辑器", link: "/ui/richTextEditor", sort: 4},
    {id: 4, name: "云盘", link: "/ui/cloudDrive", sort: 5},
    {id: 5, name: "按钮", link: "/ui/button", sort: 6},
    {id: 6, name: "输入框和选择框", link: "/ui/input", sort: 7},
    {id: 7, name: "提示", link: "/ui/message", sort: 8},
    {id: 9, name: "日期", link: "/ui/date", sort: 9},
    {id: 10, name: "分页", link: "/ui/pagination", sort: 10},
];

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isHide: document.body.clientWidth < 900
        }
    }

    render() {
        let indexId = 1;
        let path = this.props.path;
        let link = path.substring(path.lastIndexOf("/") + 1);
        menuData.forEach((v) => {
            if (v.link === link) indexId = v.id;
        });

        let toggleClass = this.state.isHide ? " hide" : " animated fastest fadeInDownSmall";
        return (
            <>
                <div className={this.state.isHide ? "ya-menu hide" : "ya-menu"}>
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
                    <Button className={"white toggle"} content={<Icon name={this.state.isHide ? "i-BAI-youjiantou" : "i-BAI-zuojiantou"}/>}
                            onClick={this.toggle.bind(this)}/>
                </div>

            </>
        );
    }

    toggle = () => {
        this.setState({isHide: !this.state.isHide});
    }
}

export default Menu;
