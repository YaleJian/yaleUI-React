import React, {Component} from 'react';
import Tree from "../../modules/Tree/Tree";
const menuData = [
    {id: 1, name: "设计规范", link : "designStandard", sort : 1},
    {id: 8, name: "排版", link : "typography", sort : 2},
    {id: 2, name: "树组件", link : "tree", sort : 3},
    {id: 3, name: "富文本编辑器", link : "richTextEditor", sort : 4},
    {id: 4, name: "云盘", link : "cloudDrive", sort : 5},
    {id: 5, name: "按钮", link : "button", sort : 6},
    {id: 6, name: "输入框和选择框", link : "input", sort : 7},
    {id: 7, name: "提示", link : "message", sort : 8},
    {id: 9, name: "日期", link : "date", sort : 9},
    {id: 10, name: "分页", link : "pagination", sort : 10},
];

class Menu extends Component {
    render() {
        return (
            <div className="ya-menu ya-fixed">
                <Tree treeData={menuData}
                      indexId={this.props.indexId}

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
        );
    }
}

export default Menu;
