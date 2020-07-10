import React, {Component} from 'react';
import Tree from './Tree';
import {testTreeData, textNodeAddList, testSelectedIdsData, getNavData} from './TreeUtil';
import Icon from "../utils/Icon";

/**
 * 树组件演示
 */
class TreeDemo extends Component {

    //入参
    static defaultProps = {
        treeData: [], //树的节点对象集合
        selectedIds: [], //默认选中的节点id集合
        getReturnData: ()=>{},//获取选中的值
    };

    constructor(props) {
        super(props);

        console.log("TreeDemo constructor");
        let treeData = testTreeData(5, 20);
        let selectedIds = testSelectedIdsData(treeData, 4);
        let fileTreeData = testTreeData(5, 20, "file");

        let menuData = testTreeData(2, 5);
        let menuSelectedIds = testSelectedIdsData(menuData, 1);
        this.state = {
            loading: true,
            treeData,
            fileTreeData,
            defaultSelectedIds: selectedIds,//入参，默认选中
            menuData,
            menuSelectedIds,
            defaultOpenIds: selectedIds,//入参，默认打开
            navData: [],

            selectedIds: selectedIds,//出参，选中的节点id
            openIds: selectedIds,//出参，打开的节点id
            nodeContentClick: {},
            addNodeClick: {},
            indexBarClick: {},
            updateNodes: [],
            defaultOpenLevel: 1,
        }
    }

    //点击树节点名称事件，返回的node对象
    nodeContentClick = node => {
        this.setState({nodeContentClick: node});
    };
    //复选框点击事件，返回选中的父节点们
    checkboxClick = selectedIds => {
        this.props.getReturnData(selectedIds);
        this.setState({selectedIds});
    };
    //展开点击事件，返回展开的节点
    openIconClick = openIds => {
        this.setState({openIds});
    };

    //更新树
    updateNode() {
        let treeData = testTreeData(10, 10);
        let selectedIds = testSelectedIdsData(treeData, 2);
        this.setState({
            treeData,
            defaultSelectedIds: selectedIds,
            defaultOpenIds: selectedIds,
        })
    }

    //追加节点
    addNodeFun = (parentId) => {
        return textNodeAddList(parentId, 10);
    };

    //追加的节点点击
    addNodeClick(node) {
        this.setState({addNodeClick: node});
    }

    //索引节点点击
    indexBarClick(node) {
        this.setState({indexBarClick: node});
    }

    //更新的节点(包含新增的节点)
    updateNodes(node) {
        this.setState({updateNodes: node});
    }

    render() {
        return (
            <div className="ya-treeDemo">
                <div className="ya-console-area">
                    <h2 className="ya-title">数据输出</h2>
                    <button onClick={this.updateNode.bind(this)}>更新树</button>
                    <br/>
                    <div>入参：默认选中： {JSON.stringify(this.state.defaultSelectedIds)}</div>
                    <div>入参：默认展开的层级： {this.state.defaultOpenLevel}</div>
                    <div>选中的最大父节点:  {JSON.stringify(this.state.selectedIds)}</div>
                    <div>打开的节点（第一次为默认打开的节点）: {JSON.stringify(this.state.openIds)}</div>
                    <div>点击节点名称输出当前节点: {JSON.stringify(this.state.nodeContentClick)}</div>
                    <div>追加的节点点击： {JSON.stringify(this.state.addNodeClick)}</div>
                    <div>索引节点点击： {JSON.stringify(this.state.indexBarClick)}</div>
                    <div>被修改的节点： {JSON.stringify(this.state.updateNodes)}</div>
                </div>
                <div className="demo">
                    <h1 className="ya-title">各种类型的树</h1>
                    <h2 className="ya-title">多节点展开树</h2>
                    <Tree treeData={this.state.treeData}
                          selectedIds={this.state.defaultSelectedIds}
                          openLevel={this.state.defaultOpenLevel}
                          openIds={this.state.defaultOpenIds}

                          checkbox={true}
                          nodeIconBtn={true}
                          operationBtn={true}
                          indexBar={true}
                          autoSearch={true}
                          searchNum={12}
                          draggable={true}
                          theme={true}

                          openIcon={<Icon name="i-folder-open"/>}
                          closeIcon={<Icon name="i-folder"/>}
                          childIcon={<Icon name="i-file"/>}

                          addNodeFun={this.addNodeFun.bind(this)}
                          nodeContentClick={this.nodeContentClick.bind(this)}
                          checkboxClick={this.checkboxClick.bind(this)}
                          openIconClick={this.openIconClick.bind(this)}
                          addNodeClick={this.addNodeClick.bind(this)}
                          indexBarClick={this.indexBarClick.bind(this)}
                          updateNodes={this.updateNodes.bind(this)}

                          ref={tree => {
                              this.tree = tree
                          }}
                    />
                </div>
                <div className="demo">
                    <h2 className="ya-title">单层节点打开树-列表样式</h2>
                    <Tree treeData={this.state.treeData}
                          selectedIds={this.state.defaultSelectedIds}
                          indexId={this.state.defaultOpenIds[0]}

                          treeType={2}
                          nodeIconBtn={true}
                          operationBtn={true}
                          theme={true}
                          indexBar={true}
                          autoSearch={true}
                          searchNum={11}
                          draggable={true}

                          closeIcon={<Icon name="i-folder"/>}

                          nodeContentClick={this.nodeContentClick.bind(this)}
                          openIconClick={this.openIconClick.bind(this)}
                          indexBarClick={this.indexBarClick.bind(this)}
                          updateNodes={this.updateNodes.bind(this)}

                          ref={tree => {
                              this.tree = tree
                          }}
                    />
                </div>
                <div className="demo">
                    <h2 className="ya-title">单层节点打开树-平铺样式</h2>
                    <Tree treeData={this.state.fileTreeData}
                          treeType={2}
                          displayMode={"grid"}

                          openBtn={false}
                          checkbox={true}
                          nodeIconBtn={true}
                          operationBtn={false}
                          theme={true}
                          indexBar={true}
                          autoSearch={true}
                          searchNum={11}
                          draggable={true}

                          nodeContentClick={this.nodeContentClick.bind(this)}
                          checkboxClick={this.checkboxClick.bind(this)}
                          openIconClick={this.openIconClick.bind(this)}
                          indexBarClick={this.indexBarClick.bind(this)}
                          updateNodes={this.updateNodes.bind(this)}

                          ref={tree => {
                              this.tree = tree
                          }}
                    />
                </div>
                <div className="demo">
                    <h2 className="ya-title">菜单树</h2>
                    <Tree treeData={this.state.menuData}
                          indexId={this.state.menuSelectedIds[0]}

                          treeType={4}
                          operationBtn={true}
                          openLevel={"all"}
                        // indent = {false}
                          menuStyle={"dark"}
                          rightClickMenu={true}

                          ref={tree => {
                              this.tree = tree
                          }}
                    />
                </div>
                <h2 className="ya-title">右侧目录树</h2>
                <Tree treeData={this.state.navData}

                      treeType={3}
                      openBtn={false}
                      openLevel={"all"}

                      ref={tree => {
                          this.tree = tree
                      }}
                />
                <div className="demo">
                    <h2 className="ya-title">异步树</h2>
                    <Tree treeData={this.state.menuData}

                          treeType={1}
                          operationBtn={true}
                          theme={true}
                          indexBar={true}
                          autoSearch={true}
                          searchNum={11}
                          draggable={true}

                          childIcon={<Icon name="i-file"/>}
                          nodeContentClick={this.nodeContentClick.bind(this)}
                          openIconClick={this.openIconClick.bind(this)}
                          indexBarClick={this.indexBarClick.bind(this)}
                          updateNodes={this.updateNodes.bind(this)}

                          async={true}
                          asyncGetChildNode={this.asyncGetChildNode}
                          asyncSearchNode={this.asyncSearchNode}
                          ref={tree => {
                              this.tree = tree
                          }}
                    />
                </div>
                <div className="demo">
                    <h2 className="ya-title">[定制功能]管理员根据部门选择人员：点击节点名称，在节点内追加节点列表，这些节点支持单选</h2>
                    <Tree treeData={this.state.treeData}

                          operationBtn={true}
                          autoSearch={true}
                          searchNum={12}
                          addNodeSwitch={true}

                          addNodeFun={this.addNodeFun.bind(this)}
                          addNodeClick={this.addNodeClick.bind(this)}
                          indexBarClick={this.indexBarClick.bind(this)}

                          ref={tree => {
                              this.tree = tree
                          }}
                    />
                </div>

            </div>
        );
    }

    componentDidMount() {
        if (this.state.loading){
            let navData = getNavData();
            this.setState({navData, loading: false});
        }
    }

    //异步树，分页查询子节点方法
    asyncGetChildNode(parentId) {
        return textNodeAddList(parentId, 10);
    }

    //异步树，分页搜索方法
    asyncSearchNode(node) {
        return textNodeAddList(node.parentId, 10);
    }
}

export default TreeDemo