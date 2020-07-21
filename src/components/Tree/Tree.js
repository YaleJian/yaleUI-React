import React from "react";
import {Link} from "react-router-dom";
import './tree.css';
import {Icon} from "..";

/**
 * 树组件 V0.5, 支持多节点展开、单节点打开两种形式
 * @author 简泽洋
 * @date 2019/3/19
 * @update 2019/8/1
 * @readme
 * 功能说明：
 * 1.支持多节点展开、单节点打开两种形式
 * 2.支持大量数据，1w节点数据渲染控制在1秒内，增删查改速度快，因为内部使用了以id作为key，节点对象作为value的json格式数据结构
 * 3.支持排序，以节点的sort字段排序
 * 4.支持复选框，支持默认选中
 * 5.支持默认展开，以节点id或层级
 * 6.支持操作节点：编辑、删除
 * 7.支持自动刷新，当入参变化，树会自动刷新
 * 8.支持关键字自动搜索，点击自动滚动到搜索结果
 * 9.支持节点名称拖曳排序，拖曳完成10s后焦点样式消失
 * 10.支持自定义展开关闭图标
 * 11.支持自定义节点图标，支持h5标签、图片、class名称三种类型
 * 12.支持点击按钮或者右击菜单，在节点上、中、下新增节点
 * 13.支持异步节点、异步搜索.注：异步打开时，多节点展开树会影响默认打开会失效
 * 14.支持点击节点名称【组织机构选人的业务定制】，追加带单选框的节点列表，可以单选
 *
 * 容错说明：
 * 1.第一层节点支持多个，第一层节点的父节点可以没有或者为null，或者不是同一个父节点。因为内部构造了一个虚拟根节点
 * 2.节点的id和父节点parentId不限制数据类型
 *
 * 使用注意：
 * 1.因为树支持自动刷新，树的选中、打开、索引id（单节点树打开的节点）、追加的节点单选等依赖父组件，树组件本身不存储状态值，所以改变入参时，
 * 2.父组件需要自行存储这些值，一并传入才可以维持上一个树状态，这样设计等目的是为了把状态维护交给使用者，减少组件强定义
 *
 */

class Tree extends React.Component {

    //入参
    static defaultProps = {
        treeData: [], //树的节点对象集合
        treeType: 1,//树类型，默认多节点展开树，1多节点展开树，2单节点打开树，3导航栏树，4菜单树
        selectedIds: [], //默认选中的节点id集合
        openIds: [], //默认打开的节点id集合
        indexId: "",//要索引的id（单节点树打开的节点）
        openLevel: 0, //默认打开的层级, all表示全部展开
        searchNum: 10, //自动关键字搜索默认数量
        openIcon: "",//父节点展开图标
        closeIcon: "",//父节点关闭图标
        childIcon: "",//子节点图标
        menuStyle: "",//菜单树主题

        //回调事件
        nodeContentClick: function () {
        }, //点击节点，回调父组件方法，回调入参为节点对象
        checkboxClick: function () {
        }, //复选框点击，回调父组件方法，回调入参为选中的最大父节点们
        openIconClick: function () {
        }, //打开按钮点击，回调父组件方法，回调入参为打开的节点
        editBtnClick: function () {
        }, //点击编辑，回调父组件方法，回调入参为节点对象
        delBtnClick: function () {
        }, //点击删除，回调父组件方法，回调入参为节点对象
        indexBarClick: function () {
        }, //点击索引节点，回调父组件方法，回调入参为节点对象
        searchItemClick: function () {
        }, //点击搜索结果，回调父组件方法，回调入参为节点对象
        updateNodes: function () {
        }, //移动/编辑节点，回调父组件方法，回调入参为更新的节点对象

        //功能开关
        displayMode: "",//展示方式，列表展示或格子平铺展示
        async: false,//是否开启异步节点
        openBtn: true, // 展开按钮
        checkbox: false, //复选框
        nodeIconBtn: false, //节点图标
        operationBtn: false, //操作按钮
        theme: false,//默认主题开关
        indexBar: false,//索引条开关
        autoSearch: false, //自动关键字搜索开关
        indent: true, //层级缩进
        draggable: false, //拖曳排序开关
        rightClickMenu: false,//右键菜单
        hasNodeMark: "hasNodeMark",//声明有子节点可以打开节点的字段，数据为布尔类型

        asyncGetChildNode: function () {
        },//开启异步，获取子节点数据方法
        asyncSearchNode: function () {
        },//开启异步，获取搜索结果数据方法

        //定制功能：追加节点，支持单选
        addNodeSwitch: false,
        addNodeFun: function () {
        },//点击节点名称，追加节点的方法,回调入参为父节点id
        addNodeClick: function () {
        },//点击追加的节点名称，回调父组件方法，回调入参为节点对象
    };

    static UNSELECTED = 1;//非选中状态
    static SELECTED = 2;//选中状态
    static SEMI_SELECTED = 3;//半选状态
    static NO_PARENT = "noParent";//父节点不存在
    static MOVE_TOP = 1;//拖曳到目标节点上
    static MOVE_IN = 2;//拖曳到目标节点内部
    static MOVE_BOTTOM = 3;//拖曳到目标节点下
    static ICON_TYPE_TAG = 1;//节点图片类型-h5标签或react对象/组件
    static ICON_TYPE_IMG = 2;//节点图片类型-图片地址
    static ICON_TYPE_CLASS = 3;//节点图片类型-样式

    delChangingIds = []; //删除节点引起变化的节点
    addChangingIds = []; //新增节点引起变化的节点（暂时存储，点保存才使用）

    constructor(props) {
        super(props);

        //默认打开（索引）时开启自动滚动
        if (this.props.indexId) this.indexBarScroll = true;
        this.indexedNodeScroll = true;

        //初始化
        this.state = {
            // treeData: this.props.treeData,
            jsonData: this.init(this.props),
            selectedIds: this.props.selectedIds || [],
            openIds: this.props.openIds || [],
            indexId: this.props.indexId,//索引id（单节点树打开的节点）
            searchNum: this.props.searchNum || 10,

            displayMode: this.props.displayMode,
            keyword: "",//搜索关键字
            searchFocus: false,//搜索区是否激活
            dragNodeId: "",//拖曳的节点id
            editNameId: "",//编辑中的节点id
            addNodeSelectId: "",//新增的节点单选的id
            scrollTop: 0,//滚动的top
            rightClickMenu: ""//右键菜单
        };

    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {

        //入参变化时更新树
        if (this.props.treeData !== nextProps.treeData || this.props.selectedIds !== nextProps.selectedIds ||
            this.props.openIds !== nextProps.openIds || this.props.indexId !== nextProps.indexId) {
            //更新树
            this.setState({
                jsonData: this.init(nextProps) || [],
                selectedIds: nextProps.selectedIds || [],
                openIds: nextProps.openIds || []
            });
        }
    }

    /*static getDerivedStateFromProps(nextProps, prevState) {
        const {treeData, selectedIds, openIds, indexId} = nextProps;
        // 入参变化时更新树
        if (treeData !== prevState.treeData || selectedIds !== prevState.selectedIds || openIds !== prevState.openIds || indexId !== prevState.indexId) {
            //更新树
            return {
                treeData,
                selectedIds,
                openIds,
                indexId,
            };
        }
        // 否则，对于state不进行任何操作
        return null;
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        //渲染前计算
        if (nextState.treeData !== this.state.treeData) {
            let jsonData = this.init(nextProps);
            this.setState({jsonData});
        }
        return true;
    }*/

    render() {
        let jsonData = {...this.state.jsonData};
        if (!this.props.treeData || this.props.treeData.length === 0 || Object.keys(jsonData).length === 0) return null;
        let theme = this.props.theme ? "theme " : "";
        let treeStyle = "ya-tree " + theme + this.state.displayMode;

        let treeBodyStyle = "ya-treeBody";
        if (this.TREE_MENU) treeBodyStyle += " ya-menuTree " + this.props.menuStyle;
        if (this.TREE_NAV) treeBodyStyle += " ya-nav ";
        return <div className={treeStyle}>
            {this.props.indexBar ? this.index.indexBar(jsonData) : ""}
            {this.search.autoSearch(jsonData)}
            <div className={treeBodyStyle} ref={treeBody => this.treeBody = treeBody}>
                {this.rendering.tree(jsonData, !this.TREE_SINGLE ? this.rootNode.childIds : null)}
            </div>
            {this.state.rightClickMenu}
        </div>;
    }

    componentDidMount() {
        //初始化时自动滚动
        this.autoScroll();

        //导航目录树滚动跟随
        let _this = this;
        if (this.TREE_NAV) {
            window.onscroll = function () {
                let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;//滚动条y轴上的距离
                _this.setState({scrollTop: scrollTop})
            };
        }
    }

    componentWillUnmount() {
        window.document.body.scrollIntoView({
            block: "start",
            inline: "nearest"
        });
        // 卸载异步操作设置状态
        this.setState = (state, callback) => {
            return "";
        }
    }

    init(props) {
        let jsonData = {};
        let treeData = props.treeData;

        this.TREE_MULTI = this.props.treeType === 1;
        this.TREE_SINGLE = this.props.treeType === 2;
        this.TREE_NAV = this.props.treeType === 3;
        this.TREE_MENU = this.props.treeType === 4;

        if (treeData.length > 0) {
            //数据优化
            jsonData = this.data.handleData(treeData);

            if (jsonData !== {} && props.selectedIds && props.selectedIds.length > 0) {
                //默认打开
                jsonData = this.data.defaultOpen(props.openIds, jsonData);

                //默认选中
                jsonData = this.data.defaultSelectedNodes(props.selectedIds, jsonData);
            }
        }
        return jsonData;
    }

    data = {
        //数据优化
        handleData: (rawData) => {

            //初始化虚拟根节点
            this.rootNode = {
                id: "rootNode",
                childIds: [],
                open: true,
                level: 0,
                icon: "",
                iconType: Tree.ICON_TYPE_TAG,
                hasChild: false,//是否可以打开
            };

            //优化查询，转换为json格式，以node[i]方式获取某一个节点数据
            let jsonData = {};
            jsonData = this.data.convertJsonFormat([...rawData], jsonData);

            //第一次循环：计算属性
            for (let i in jsonData) {

                if (jsonData.hasOwnProperty(i)) {

                    let node = jsonData[i], parentNode = jsonData[node.parentId];

                    //记录每个节点的子节点id集合
                    if (parentNode) {
                        parentNode.childIds.push(node.id);
                    } else {
                        //父节点不存在的节点,作为第一层节点
                        this.rootNode.childIds.push(node.id);
                    }

                    //计算层级方法
                    if (parentNode && parentNode.level) {
                        //如果父节点存在，且父节点已经算过，那么当前节点的层级是父节点层级+1
                        node.level = parentNode.level + 1;
                    } else {
                        //向上找父节点，直到父节点不存在，记录找到父节点的次数即层级
                        let level = 1;//定义层级，默认从第一层开始
                        let parentId = node.parentId;
                        while (jsonData[parentId]) {
                            level++;
                            parentId = jsonData[parentId].parentId;//获取上一个父级ID
                        }
                        node.level = level;
                    }

                    //默认打开的层级
                    if (this.props.openLevel >= node.level || this.props.openLevel === "all") jsonData[i].open = true;
                }
            }
            return jsonData;
        },

        //转换json格式,支持增量
        convertJsonFormat: (data, jsonData, isIncrement) => {
            for (let i = 0; i < data.length; i++) {

                let node = {...data[i]};//防止组件复用时，对象数组的对象引用的同一个堆造成的值改变联动
                let id = node.id;
                let parentId = node.parentId;

                //防止父id和子id相等造成的死循环
                if (id === parentId) console.log("参数有误，存在相同id和parentId，节点为：" + data[i]);
                //容错：父节点异常情况
                if (node.parentId === undefined || node.parentId === null) node.parentId = Tree.NO_PARENT;
                //容错：兼容节点名称不统一
                if (node.name === undefined) node.name = node.name || node.text || node.nodeName;

                //设置初始化属性
                node.childIds = [];
                node.level = false;
                node.open = false;
                node.hasOpen = false;//打开过,减少渲染未打开的节点
                node.select = Tree.UNSELECTED;
                jsonData[id] = node;

                //增量时，直接计算属性
                if (isIncrement) {
                    //父节点记录子节点id
                    let parentNode = jsonData[node.parentId];
                    if (parentNode) {
                        parentNode.childIds.push(node.id);
                    } else {
                        //父节点不存在的节点,作为第一层节点
                        this.rootNode.childIds.push(node.id);
                    }

                    //设置层级
                    if (parentNode) {
                        jsonData[id].level = jsonData[node.parentId].level + 1;
                    } else {
                        jsonData[id].level = 1;
                    }
                    //是否默认打开:异步开启时，默认打开会失效，增量节点默认不自动打开
                    //是否默认选中:1.父节点默认选中，2.默认选中的节点
                    if (jsonData[node.parentId].select === Tree.SELECTED || this.props.selectedIds.indexOf(node.id) > -1) jsonData[id].select = Tree.SELECTED;
                }
            }
            return jsonData;
        },

        //默认打开
        defaultOpen: (ids, jsonData) => {
            ids.forEach(id => {
                //打开当前节点(有子节点时)
                let node = jsonData[id];
                if (node.childIds > 0) jsonData[id].open = true;

                let parentNode = jsonData[node.parentId];
                while (parentNode) {
                    //向上打开父节点
                    parentNode.open = true;
                    parentNode.hasOpen = true;
                    parentNode = jsonData[parentNode.parentId];
                }
            });

            return jsonData;
        },

        //向上选中
        prevSelect: (jsonData, id, select) => {

            //向上节点的半选和选中、取消选中
            let node = jsonData[id];
            let parentNode = jsonData[node.parentId];
            while (parentNode) {
                //向上更改父节点选中状态，直到父节点不存在
                let currentNode = parentNode;

                //计算上一个父节点的子节点选中、半选的节点数目
                let currentNodeChildIds = currentNode.childIds;
                let selectedNum = 0;
                let semiSelectedNum = 0;
                currentNodeChildIds.forEach(k => {
                    if (jsonData[k].select === Tree.SELECTED) {
                        selectedNum++;
                    } else if (jsonData[k].select === Tree.SEMI_SELECTED) {
                        semiSelectedNum++;
                    }
                });

                //当前节点（上一个父亲节点）的状态改变，以下用"当前"描述上一个父亲节点，用"当前下"描述上一个父亲节点的子节点们
                let toSelect;
                if (select === Tree.UNSELECTED) {

                    //操作是取消选中，当前下无选中且无半选，当前才会变成取消，否则半选，不可能是全选
                    toSelect = selectedNum === 0 && semiSelectedNum === 0 ? Tree.UNSELECTED : Tree.SEMI_SELECTED;
                } else if (select === Tree.SELECTED) {

                    //操作是选中,当前下全选,当前才会变成选中，否则半选，不可能是全选
                    if (currentNodeChildIds.length === selectedNum) {
                        toSelect = Tree.SELECTED;
                    } else {
                        toSelect = Tree.SEMI_SELECTED;
                    }
                }
                currentNode.select = toSelect;

                //设置上一个节点id
                parentNode = jsonData[currentNode.parentId];
            }

            return jsonData;
        },

        //向下选中
        nextSelect: (jsonData, id, select) => {

            jsonData[id].select = select;
            //子节点选中
            jsonData[id].childIds.forEach(i => {
                this.data.nextSelect(jsonData, i, select);
            });
            return jsonData;
        },

        //默认选中
        defaultSelectedNodes: (ids, jsonData) => {

            let select = Tree.SELECTED;
            ids.forEach(id => {
                if (jsonData[id]) {
                    //当前选中
                    jsonData[id].select = select;
                    //向上变化
                    jsonData = this.data.prevSelect(jsonData, id, select);
                    //向下变化
                    jsonData = this.data.nextSelect(jsonData, id, select);
                }
            });

            return jsonData;
        },

        //获取选中的最大父节点们
        getSelectIds: (jsonData) => {
            let selectedIds = [];
            for (let i in jsonData) {
                if (jsonData.hasOwnProperty(i)) {
                    let node = jsonData[i];
                    if (node.select === Tree.SELECTED && (jsonData[node.parentId] === undefined || jsonData[node.parentId].select !== Tree.SELECTED)) {
                        selectedIds.push(node.id);
                    }
                }
            }
            return selectedIds;
        },

        //节点移动
        moveNode: (dId, tId, movePosition) => {
            if (dId === tId) return;

            let jsonData = {...this.state.jsonData};
            let dNode = jsonData[dId];
            let tNode = jsonData[tId] || this.rootNode;

            this.data.delNode(dNode, tNode, movePosition, jsonData); //从原处移除当前节点
            this.data.addNode(dNode, tNode, movePosition, jsonData);//在目标节点处新增
            this.setState({jsonData, dragNodeId: dId, indexId: dId});

            let changingNodes = [];
            //删除引起的变化节点
            for (let i in this.delChangingIds) {
                changingNodes.push(jsonData[this.delChangingIds[i]]);
                this.delChangingIds = [];
            }
            //新增引起的变化节点
            for (let i in this.addChangingIds) {
                changingNodes.push(jsonData[this.addChangingIds[i]]);
                this.addChangingIds = [];
            }
            this.props.updateNodes(changingNodes);

            //逐渐隐藏节点焦点
            let self = this;
            if (this.dragFcous) clearTimeout(this.dragFcous);
            this.dragFcous = setTimeout(() => {
                self.setState({dragNodeId: ''})
            }, 10000);

        },

        //删除当前节点
        delNode: (dNode, jsonData) => {

            let dParentNode = jsonData[dNode.parentId] || this.rootNode;
            let idIndex = dParentNode.childIds.indexOf(dNode.id);
            if (idIndex > -1) dParentNode.childIds.splice(idIndex, 1);
            delete jsonData[dNode.id];

            this.delChangingIds.push(dParentNode.id);
            this.delChangingIds.push(dNode.id);
        },

        //在目标节点处新建
        addNode: (newNode, tNode, movePosition, jsonData) => {

            jsonData[newNode.id] = newNode;
            if (movePosition === Tree.MOVE_IN) {
                //新建到目标节点内

                //目标节点子集ids增加拖动的节点
                if (!tNode.childIds) tNode.childIds = [];
                tNode.childIds.push(newNode.id);
                tNode.open = true;

                //追加到最后
                let maxSort = jsonData[tNode.childIds[0]].sort;
                tNode.childIds.forEach(id => {
                    if (jsonData[id].sort > maxSort) maxSort = jsonData[id].sort;
                });
                newNode.sort = maxSort + 1;

                newNode.parentId = tNode.id;
                newNode.level = tNode.level + 1;

                this.addChangingIds.push(tNode.id);//记录变化节点id（目标节点）

            } else if (movePosition === Tree.MOVE_TOP || movePosition === Tree.MOVE_BOTTOM) {
                //新建到目标节点上、下

                //目标节点之后节点后移（先空出位置）
                let tParentNode = jsonData[tNode.parentId] || this.rootNode;
                tParentNode.childIds.forEach(id => {
                    if (jsonData[id].sort > tNode.sort) {
                        ++jsonData[id].sort;
                        this.addChangingIds.push(id);//记录变化节点id（新建/拖动到目标节点处，引起的排序变化的节点）
                    }
                });

                if (movePosition === Tree.MOVE_TOP) {
                    newNode.sort = tNode.sort || 0;
                    if (tNode.sort) ++tNode.sort;//目标节点后移，排序值+1
                    this.addChangingIds.push(tNode.id);//记录变化节点id（拖动到目标节点处，目标节点后移）
                } else {
                    newNode.sort = (tNode.sort || 0) + 1;
                }

                newNode.parentId = tNode.parentId;
                tParentNode.childIds.push(newNode.id);

                newNode.level = tNode.level;
            }

            jsonData[newNode.id] = newNode;

            //此节点及其子节点层级重新计算
            this.data.resetNodeLevel(jsonData, newNode.id);
            return jsonData;
        },

        //此节点的子节点层级重新计算
        resetNodeLevel: (jsonData, id) => {
            let parentNode = jsonData[jsonData[id].parentId] || this.rootNode;
            jsonData[id].level = parentNode.level + 1;
            //如果还有子节点
            jsonData[id].childIds.forEach(i => {
                this.data.resetNodeLevel(jsonData, i);
            });
        },

    };

    rendering = {
        //渲染多节点展开树
        tree: (jsonData, child) => {
            let treeItem;
            if (this.TREE_SINGLE) {
                let node = jsonData[this.state.indexId];
                if (node) {

                    child = node.childIds;
                    if (!node[this.props.hasNodeMark]) {
                        //节点属性不可以打开，且打开的节点没有子节点，或者索引的id和拖曳的id相等，则默认打开父级，此节点显示选中样式
                        let parentNode = jsonData[node.parentId] || this.rootNode;
                        if ((child.length === 0 || this.state.indexId === this.state.dragNodeId)) child = parentNode.childIds;
                    } else {
                        //如果可以打开、但没有子节点
                        if (child && child.length === 0) {
                            return <div className="noData">
                                <Icon name="i--expressionless"/>
                                <div>No Data</div>
                            </div>;
                        }
                    }
                } else {
                    child = this.rootNode.childIds;
                }
            }
            if (child) {
                //排序
                child = this.rendering.childSort(child, jsonData);
                // 子元素是数组的形式，把所有的子元素循环出来
                treeItem = child.map((item, key) => {

                    let node = jsonData[item];
                    if (node) {

                        let itemStyle, nodeGroupStyle;
                        if (!this.TREE_SINGLE) {

                            let parentNode = jsonData[node.parentId];
                            // 父节点未打开，且从未打开过的节点，不渲染
                            if (parentNode && !parentNode.open && !parentNode.hasOpen) return null;

                            //子节点隐藏
                            nodeGroupStyle = "node-group animated fastest " + (node.open ? "fadeInDownSmall ya-show" : "ya-hide");

                            // 根据层级缩进
                            let indentPx = 25;
                            if (this.TREE_NAV) indentPx = 11;
                            itemStyle = {paddingLeft: indentPx * (node.level - 1) + 'px'};
                            if (!this.props.indent) itemStyle = {};//关闭缩进
                        }

                        return (
                            <div key={key} className="node" onMouseDown={this.operationBtn.rightClick.bind(this, node)}>
                                {this.rendering.nodeContent(node, itemStyle)}
                                <div className={nodeGroupStyle}>
                                    {!this.TREE_SINGLE ? this.rendering.tree(jsonData, node.childIds) : null}
                                    {this.customize.nodeAddList(node.id, jsonData)}
                                </div>
                            </div>);
                    } else {
                        console.log("子节点" + item + "不存在或被删除");
                    }
                    return null;
                })
            }
            return treeItem;
        },

        nodeContent: (node, itemStyle) => {
            let nodeContent = <div
                className={"node-content " + ( (this.state.indexId === node.id || this.state.dragNodeId === node.id) ? "nodeFocus ": ""  ) + (node.select === Tree.SELECTED ? "selected": "")}
                style={itemStyle}
                onClick={this.nodeContentClick.bind(this, node)}
                draggable={this.props.draggable}
                onDragStart={this.drag.onDragStart.bind(this, node.id)}
                onDragEnd={this.drag.onDragEnd.bind(this, node.id)}
                onDragOver={this.props.draggable ? this.drag.onDragOver.bind(this, node.id) : () => {
                }}
                onDragLeave={this.drag.onDragLeave.bind(this, node.id)}
                onDrop={this.drag.onDrop.bind(this, node.id)}
                ref={indexedNode => this.state.indexId === node.id ? this.indexedNode = indexedNode : {}}>
                {this.open.handleOpenIcon(node)}
                {this.checkbox.handleCheckBox(node)}
                {this.handleNodeIcon(node)}
                {this.nodeName.handleNodeName(node)}
                {this.nodeName.handleEditName(node)}
                {this.operationBtn.handleOperationBtn(node)}
            </div>;

            if (this.TREE_MENU && node.link) nodeContent = <Link to={node.link}>{nodeContent}</Link>;
            return nodeContent;
        },
        //根据排序字段排序(冒泡排序)
        childSort(child, jsonData) {
            let len = child.length, i, j, d;
            if (len === 0) return child;
            for (i = len; i--;) {
                for (j = 0; j < i; j++) {
                    let z = j + 1;//下一个
                    let thisSort = jsonData[child[j]].sort || 0;
                    let nextSort = jsonData[child[z]].sort || 0;
                    if (thisSort > nextSort) {
                        //排序字段大的在后面
                        d = child[j];
                        child[j] = child[z];
                        child[z] = d;
                    }
                }
            }
            return child;
        }
    };

    //处理节点图标
    handleNodeIcon = (node) => {
        if (!this.props.nodeIconBtn) return null;
        let nodeIcon = node.icon;

        //节点未设置图标时，设置默认图标
        if (!nodeIcon) {
            nodeIcon = node.childIds.length > 0 || node[this.props.hasNodeMark] ? <Icon name="i-folder"/> :
                <Icon name="i-file"/>
        }

        let nodeIconType = node.iconType || Tree.ICON_TYPE_TAG;

        //根据图标类型
        if (nodeIconType === Tree.ICON_TYPE_IMG) nodeIcon =
            <img className="nodeIconImg" src={nodeIcon} alt={nodeIcon}/>;
        if (nodeIconType === Tree.ICON_TYPE_CLASS) nodeIcon = <span className={node.icon}> </span>;

        return <span className="ya-nodeIcon">{nodeIcon}</span>;
    };

    //节点点击
    nodeContentClick = (node) => {

        //导航栏树锚点
        if (this.TREE_NAV) {
            node.obj.scrollIntoView({block: "center", inline: "nearest"});
            return;
        }
        let jsonData = {...this.state.jsonData};
        if (node.childIds.length > 0 || this.props.addNodeSwitch) node.open = !node.open;

        //当前节点索引
        if (!node) node = this.rootNode;//id不存在默认回第一级
        let indexId = node.id;

        this.setState({indexId, jsonData});

        //[定制功能]点击名称追加节点
        if (this.props.addNodeSwitch) this.customize.addNodeFun(node.id, jsonData);
        this.props.nodeContentClick(node);
    };

    open = {
        //处理打开图标
        handleOpenIcon: (node) => {
            if (!this.props.openBtn) return null;

            //异步加载图标
            if (node.async) {
                let loadingIcon = <Icon name="i-loading-min"/>;
                return <span className="openIcon ya-rotationInfinite">{loadingIcon}</span>;
            }

            //默认图标
            let defaultOpenIcon = <Icon name="i-BAI-youjiantou"/>;
            let defaultMenuOpenIcon = <Icon name="i-BAI-shangjiantou"/>;

            let openIconSvg = this.props.childIcon || "", rotate = "";
            //计算后节点有子节点，或者有存在子节点标识
            if (node.childIds.length > 0 || node[this.props.hasNodeMark]) {
                openIconSvg = this.props.closeIcon || (this.TREE_MENU ? defaultMenuOpenIcon : defaultOpenIcon);
                if (node.open) {
                    openIconSvg = this.props.openIcon || openIconSvg;
                    if (!this.props.closeIcon) rotate = this.TREE_MENU ? "ya-rotateX180" : "ya-rotate90";//使用默认图标、节点打开时添加旋转动效
                }
            }

            let openIcon = 'openIcon ' + rotate + " " + (this.TREE_MENU ? "ya-floatRight" : "");
            return <span className={openIcon}
                         onClick={this.open.openIconClick.bind(this, node.id)}>{openIconSvg}</span>;
        },

        //打开事件
        openIconClick: (id, e) => {

            let jsonData = {...this.state.jsonData};
            jsonData[id].open = !jsonData[id].open;

            //开启节点异步且节点没有打开过
            let openNow = this.props.async && !jsonData[id].hasOpen;
            if (openNow) {
                jsonData[id].async = true;
            }

            //非异步时立即设置为打开过
            if (!this.props.async) jsonData[id].hasOpen = true;
            if (this.TREE_SINGLE) {

                this.setState({jsonData, indexId: id});
                //打开的节点
                this.props.openIconClick([id]);
            } else {

                this.setState({jsonData});
                //打开的节点们
                this.props.openIconClick(this.open.getOpenIds(jsonData));
            }

            if (openNow) {
                setTimeout(() => {
                    let childNodeData = this.props.asyncGetChildNode(id);
                    if (childNodeData) {
                        //转换json数据并记录
                        this.data.convertJsonFormat(childNodeData, jsonData, true);
                        //关闭节点异步
                        jsonData[id].async = false;
                        //设置为打开过
                        jsonData[id].hasOpen = true;
                        this.setState({jsonData});
                    }
                }, 400);

            }

            e.preventDefault();
            e.stopPropagation();
        },

        //获取打开的节点IDs
        getOpenIds: (jsonData) => {
            let openIds = [];
            for (let i in jsonData) {
                if (jsonData.hasOwnProperty(i)) {
                    if (jsonData[i].open) openIds.push(jsonData[i].id);
                }
            }
            return openIds;
        }
    };

    nodeName = {
        //处理节点名称
        handleNodeName: (node) => {
            if (this.state.editNameId === node.id) return null;

            let nodeNameStyle = "nodeName";
            //菜单树节点名称前没有图标，增加间隙
            if (this.TREE_MENU) {
                nodeNameStyle += " ya-padding-left10";
            }
            if (this.TREE_NAV) {
                let nodeOffsetTop = this.drag.getOffset(node.obj, false).top;
                if (this.state.scrollTop >= nodeOffsetTop && this.state.scrollTop <= (nodeOffsetTop + document.documentElement.clientHeight)) {
                    nodeNameStyle += " active";
                }
                // console.log(this.state.scrollTop, nodeOffsetTop, document.documentElement.clientHeight)
            }
            return <span className={nodeNameStyle}>
                    <span>{node.name}</span>
                </span>
        },

        //处理节点名称编辑
        handleEditName: (node) => {
            if (this.state.editNameId !== node.id) return null;
            return <span className="ya-editNodeName">
                    <input type="text" className="ya-nameInput" defaultValue={node.name} maxLength="20"
                           onClick={this.nodeName.editNameInputClick.bind(this)}
                           ref={nameInput => this.nameInput = nameInput}/>
                    <span className="ya-editOK"
                          onClick={this.operationBtn.saveNodeName.bind(this, node.id)}><Icon name="i-ok"/></span>
                    <span className="ya-cancel"
                          onClick={this.operationBtn.cancelEditName.bind(this, node)}><Icon name="i-close"/></span>
                </span>
        },
        //名称编辑输入框事件
        editNameInputClick: (e) => {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    index = {
        //渲染索引条
        indexBar: (jsonData) => {
            let id = this.state.indexId;
            let list = [];
            if (id) {
                if (jsonData[id]) {
                    let prevId = id;
                    while (jsonData[prevId]) {
                        let node = jsonData[prevId];
                        list.unshift(<span key={node.id} className="item node-group animated fastest fadeInLeft"
                                           ref={IndexBarItem => this.lastIndexBarItem = IndexBarItem}
                                           onClick={this.index.indexBarClick.bind(this, node)}
                                           onDragEnd={this.drag.onDragEnd.bind(this, node.id)}
                                           onDragOver={this.drag.onDragOver.bind(this, node.id)}
                                           onDragLeave={this.drag.onDragLeave.bind(this, node.id)}
                                           onDrop={this.drag.onDrop.bind(this, node.id)}
                        >{node.name}</span>);
                        prevId = jsonData[prevId].parentId;//获取上一个父级ID
                    }
                }
            }
            let start = (<span key="root" className="item">
            <span className="indexBarName"
                  onClick={this.index.indexBarClick.bind(this, false)}
                  onDragEnd={this.drag.onDragEnd.bind(this, false)}
                  onDragOver={this.drag.onDragOver.bind(this, false)}
                  onDragLeave={this.drag.onDragLeave.bind(this, false)}
                  onDrop={this.drag.onDrop.bind(this, false)}
            ><Icon name="i-BAI-wuzi"/></span></span>);
            list.unshift(start);
            return <div className="ya-indexBar" key="indexBar">{list}</div>
        },

        //索引点击事件
        indexBarClick: (node, e) => {
            if (node) {
                this.setState({indexId: node.id});
            } else {
                this.setState({indexId: this.rootNode.id});
            }

            this.props.indexBarClick(node || {});
            e.preventDefault();
        },
    };

    search = {
        //渲染自动搜索
        autoSearch: (jsonData) => {
            if (!this.props.autoSearch) return null;

            let items = [];
            if (this.state.keyword && this.state.searchFocus) {
                let count = 0;
                for (let i in jsonData) {
                    if (jsonData.hasOwnProperty(i) && jsonData[i].name.indexOf(this.state.keyword) > -1) {
                        let node = jsonData[i];
                        items.push(<div className="searchItem animated fastest fadeInDownSmall" key={node.id}
                                        onMouseDown={this.search.searchItemClick.bind(this, node, jsonData)}>{node.name}</div>);
                        count++;
                        if (count > this.state.searchNum) {
                            items.push(<div className="searchItem animated fastest fadeInDownSmall" key="searchMore"
                                            onMouseDown={this.search.searchMore.bind(this)}>......</div>);
                            break;
                        }
                    }
                }
            }

            let autoSearchStyle = "ya-autoSearch " + (this.state.searchFocus ? "searchFocus": "");
            return <div className="ya-treeTools">
                <div className={autoSearchStyle} key="autoSearch" onBlur={this.search.searchBlur}>
                    <span className="searchIcon"><Icon name="i-magnifier"/></span>
                    <input className="searchInput" type="text" id="searchInput" value={this.state.keyword}
                           onChange={this.search.searchInput.bind(this)} autoComplete="off"
                           onFocus={this.search.searchInput.bind(this)}/>
                    <div className="resultList">{items}</div>
                </div>
                {this.state.displayMode === "list" ? <div className="displayMode" onClick={() => {
                    this.setState({displayMode: "grid"})
                }}><Icon name="i-mode-list"/></div> : ""}
                {this.state.displayMode === "grid" ? <div className="displayMode" onClick={() => {
                    this.setState({displayMode: "list"})
                }}><Icon name="i-mode-grid"/></div> : ""}
            </div>
        },

        //搜索更多
        searchMore: (e) => {
            this.setState({searchNum: this.state.searchNum + 10, searchFocus: true,});
            e.preventDefault();
        },

        //搜索输入和聚焦事件
        searchInput: (e) => {
            this.setState({keyword: e.currentTarget.value, searchFocus: true, searchNum: this.props.searchNum || 10});
        },

        //搜索失去焦点
        searchBlur: () => {
            this.setState({searchFocus: false});
        },

        searchItemClick: (node, jsonData, e) => {
            //多节点树自动展开
            if (this.TREE_MULTI) {
                jsonData = this.data.defaultOpen([node.id], jsonData);
                this.indexedNodeScroll = true;
            }
            this.indexBarScroll = true;
            this.setState({searchFocus: false, keyword: node.name, indexId: node.id, jsonData});


            this.props.searchItemClick(node || {});
            e.preventDefault();
        },
    };

    checkbox = {
        //处理复选框
        handleCheckBox: (node) => {
            if (!this.props.checkbox) return "";

            let selectIconSvg = <Icon name="i-buxuan"/>;
            let zoom = '';
            if (node.select === Tree.SELECTED) {
                selectIconSvg = <Icon name="i-xuanzhong"/>;
                zoom = 'ya-zoom10-15';
            } else if (node.select === Tree.SEMI_SELECTED) {
                selectIconSvg = <Icon name="i-banxuan"/>;
            }
            let selectIcon = 'selectIcon ' + zoom;
            return <span className={selectIcon}
                         onClick={this.checkbox.checkboxClick.bind(this, node.id)}>{selectIconSvg}</span>;
        },

        //复选框点击事件
        checkboxClick: (id, e) => {

            let jsonData = {...this.state.jsonData};

            //设置点击的节点选中状态（只存在选中、不选中，点击后设置为原有状态的反状态）
            let select;
            if (jsonData[id].select === Tree.SELECTED) {
                select = Tree.UNSELECTED;
            } else {
                select = Tree.SELECTED;
            }
            jsonData[id].select = select;

            //向上改变
            jsonData = this.data.prevSelect(jsonData, id, select);

            //向下改变
            jsonData = this.data.nextSelect(jsonData, id, select);
            this.setState({jsonData});

            //选中的最大父节点们
            this.props.checkboxClick(this.data.getSelectIds(jsonData));

            e.stopPropagation();
            e.preventDefault();
        }
    };

    operationBtn = {
        //处理节点操作按钮(编辑、删除)
        handleOperationBtn: (node) => {

            if (!this.props.operationBtn) return "";
            return <span className="btn operationBtn">
            <span className="btn" onClick={this.operationBtn.addNode.bind(this, Tree.MOVE_TOP, node)}><Icon
                name="i-top-add"/></span>
            <span className="btn" onClick={this.operationBtn.addNode.bind(this, Tree.MOVE_IN, node)}><Icon
                name="i-child-add"/></span>
            <span className="btn" onClick={this.operationBtn.addNode.bind(this, Tree.MOVE_BOTTOM, node)}><Icon
                name="i-bottom-add"/></span>
            <span className="btn" onClick={this.operationBtn.editBtnClick.bind(this, node.id)}><Icon
                name="i-edit"/></span>
            <span className="btn" onClick={this.operationBtn.delBtnClick.bind(this, node.id)}><Icon
                name="i-delete"/></span>
        </span>
        },

        //新建节点
        addNode: (movePosition, node, e) => {

            let jsonData = {...this.state.jsonData};
            this.delChangingIds = [];
            let newNodeId = "node" + new Date().getTime();
            jsonData = this.data.addNode({
                op: "add",
                id: newNodeId,
                name: "new node",
                sort: 0,
                childIds: []
            }, node, movePosition, jsonData);
            this.setState({jsonData, editNameId: newNodeId});
            e.stopPropagation();
            e.preventDefault();
        },

        //编辑按钮点击事件
        editBtnClick: (id, e) => {

            this.setState({editNameId: id});
            this.props.editBtnClick({...this.state.jsonData}[id]);
            e.stopPropagation();
            e.preventDefault();
        },

        //保存节点名称（包含新增的节点）
        saveNodeName: (id, e) => {
            let jsonData = {...this.state.jsonData};
            jsonData[id].name = this.nameInput.value;
            if (jsonData[id].op === "add") jsonData[id].op = "added";
            this.setState({jsonData, editNameId: ""});
            this.delChangingIds.push(id);

            //节点名称变化的节点
            let changingNodes = [];
            if (this.addChangingIds.indexOf(id) === -1) changingNodes.push(jsonData[id]);

            //新增引起的变化节点
            for (let i in this.addChangingIds) {
                changingNodes.push(jsonData[this.addChangingIds[i]]);
                this.addChangingIds = [];
            }
            this.props.updateNodes(changingNodes);
            e.stopPropagation();
        },

        //退出编辑
        cancelEditName: (node, e) => {
            let jsonData = {...this.state.jsonData};

            //取消新增的节点
            if (node.op === "add") {
                this.data.delNode(node, jsonData);
            }
            this.setState({editNameId: "", jsonData});
            e.stopPropagation();
            e.preventDefault();
        },
        //删除
        delBtnClick: (id, e) => {
            let jsonData = {...this.state.jsonData};
            this.data.delNode(jsonData[id], jsonData);
            this.setState({jsonData});

            this.props.delBtnClick(jsonData[id]);

            e.stopPropagation();
            e.preventDefault();
        },

        //右键菜单
        rightClick: (node, e) => {
            if (!this.props.rightClickMenu) return;

            //暂时屏蔽右键菜单
            e.target.parentNode.parentNode.oncontextmenu = function () {
                return false;
            };

            //点击其他位置关闭右键菜单
            let fun = () => {
                this.setState({rightClickMenu: ""});
            };
            window.document.removeEventListener("click", fun);
            window.document.onclick = fun;

            let rightClickMenu = "";
            if (e.button === 2) { //右键

                //设置相对位置
                let rmcStyle = {
                    left: e.clientX + 5 + "px",
                    top: e.clientY - e.target.offsetHeight + 10 + "px"
                };
                rightClickMenu = <div className="ya-right-click-menu" style={rmcStyle}>
                    <div className="fn" onClick={this.operationBtn.addNode.bind(this, Tree.MOVE_TOP, node)}>在上方新建</div>
                    <div className="fn" onClick={this.operationBtn.addNode.bind(this, Tree.MOVE_IN, node)}>在节点内新建</div>
                    <div className="fn" onClick={this.operationBtn.addNode.bind(this, Tree.MOVE_BOTTOM, node)}>在下方新建
                    </div>
                    <div className="fn" onClick={this.operationBtn.editBtnClick.bind(this, node.id)}>重命名</div>
                    <div className="fn" onClick={this.operationBtn.delBtnClick.bind(this, node.id)}>删除</div>
                </div>;
            }

            this.setState({rightClickMenu});
            e.stopPropagation();
            e.preventDefault();
        }
    };

    drag = {
        //拖拽开始
        onDragStart: (dragNodeId, e) => {
            this.dragNodeId = dragNodeId;
            e.dataTransfer.effectAllowed = "move";
            //自动关闭节点
            let jsonData = {...this.state.jsonData};
            if (jsonData[dragNodeId].childIds) {
                jsonData[dragNodeId].open = false;
                this.setState({jsonData});
            }
        },

        //拖拽结束,元素没有被放置
        onDragEnd: (dragNodeId, e) => {
            this.drag.resetDragStyle(e);
        },
        //拖拽元素在目标元素头上移动的时候
        onDragOver: (targetNodeId, e) => {
            let jsonData = {...this.state.jsonData};

            //单节点树，禁止移动到当前节点的父节点索引上
            let parentNode = jsonData[jsonData[this.dragNodeId].parentId] || this.rootNode;
            if (this.TREE_SINGLE && (targetNodeId === parentNode.id || (targetNodeId === false && parentNode === this.rootNode))) return;

            let className = e.currentTarget.className;
            let pClassName = e.currentTarget.parentNode.className || "";
            if (typeof className === "string") {
                let className = e.currentTarget.className || "";

                if (this.dragY !== e.clientY) {
                    this.dragY = e.clientY;

                    let targetTop = this.drag.getOffset(e.currentTarget, false).top - this.treeBody.scrollTop;
                    if (this.dragY < (targetTop + 12) && className.indexOf("ya-dragTop") === -1) {
                        this.dragPosition = Tree.MOVE_TOP;
                        this.drag.resetDragStyle(e);
                        e.currentTarget.className += " ya-dragTop";
                    } else if (this.dragY > (targetTop + 12) && this.dragY < (targetTop + e.currentTarget.offsetHeight - 12) && className.indexOf("ya-dragIn") === -1) {
                        this.dragPosition = Tree.MOVE_IN;
                        this.drag.resetDragStyle(e);
                        e.currentTarget.className += " ya-dragIn";

                        //自动打开节点
                        if (this.TREE_MULTI && this.dragNodeId !== targetNodeId) {
                            if (jsonData[targetNodeId].childIds) {
                                jsonData[targetNodeId].open = true;
                                this.setState({jsonData});
                            }
                        }
                    } else if (this.dragY > (targetTop + e.currentTarget.offsetHeight - 12) && className.indexOf("ya-dragBottom") === -1) {
                        this.dragPosition = Tree.MOVE_BOTTOM;
                        this.drag.resetDragStyle(e);
                        e.currentTarget.className += " ya-dragBottom";
                    }
                    console.log(targetNodeId, this.dragPosition, "拖动元素top: " + this.dragY, "目标元素高度: " + targetTop, "目标元素高：" + e.currentTarget.offsetHeight, "滚动top：" + this.treeBody.scrollTop);
                }
            } else if (typeof className === "string" && className.indexOf("indexBarName") > -1) {
                if (e.currentTarget.className.indexOf("ya-dragIn") === -1) e.currentTarget.className += " ya-dragIn";
            } else if (typeof pClassName === "string" && pClassName.indexOf("indexBarName") > -1) {
                //兼容单节点树，拖动到主页icon上
                if (pClassName.indexOf("ya-dragIn") === -1) e.currentTarget.parentNode.className += " ya-dragIn";
            }
            e.preventDefault();
        },

        //拖动离开目标元素
        onDragLeave: (targetNodeId, e) => {
            //移除onDragEnter样式
            this.drag.resetDragStyle(e);
        },

        //拖拽元素进入目标元素头上，同时鼠标松开的时候
        onDrop: (targetNodeId, e) => {
            //重置样式
            this.drag.resetDragStyle(e);

            //节点改变
            this.data.moveNode(this.dragNodeId, targetNodeId, this.dragPosition);

            e.preventDefault();
        },

        //获取相对窗口的top值
        getOffset: (target, offset) => {
            if (!offset) {
                offset = {};
                offset.top = 0;
                offset.left = 0;
            }
            if (target === document.body || !target) {
                //当该节点为body节点时，结束递归
                offset.top -= window.scrollY;
                offset.left -= window.scrollX;
                return offset;
            }
            offset.top += target.offsetTop - target.scrollTop;
            offset.left += target.offsetLeft - target.scrollLeft;
            return this.drag.getOffset(target.offsetParent, offset);//向上累加offset里的值
        },

        //重置拖动
        resetDragStyle: (e) => {
            if (e.currentTarget) {
                let className = e.currentTarget.className || "";
                let pClassName = e.currentTarget.parentNode.className || "";
                if (typeof className === "string" && className.indexOf("ya-dragTop") > -1) e.currentTarget.className = className.replace(" ya-dragTop", "");
                if (typeof className === "string" && className.indexOf("ya-dragBottom") > -1) e.currentTarget.className = className.replace(" ya-dragBottom", "");
                if (typeof className === "string" && className.indexOf("ya-dragIn") > -1) e.currentTarget.className = className.replace(" ya-dragIn", "");
                //兼容单节点树，拖动到主页icon上
                if (typeof pClassName === "string" && pClassName.indexOf("ya-dragIn") > -1) e.currentTarget.parentNode.className = pClassName.replace(" ya-dragIn", "");
            }
        },
    };

    //自动滚动
    autoScroll() {
        //索引调自动滚动到最后
        if (this.lastIndexBarItem && this.indexBarScroll) this.lastIndexBarItem.scrollIntoView({
            block: "center",
            inline: "end"
        });

        //树自动滚动到被索引的节点
        if (this.indexedNode && this.indexedNodeScroll) this.indexedNode.scrollIntoView({
            block: "center",
            inline: "nearest"
        });

        this.indexBarScroll = false;
        this.indexedNodeScroll = false;
    }

    customize = {
        //[定制功能]功能]渲染追加的节点
        nodeAddList: (id, jsonData) => {
            if (typeof this.props.addNodeFun !== "function") return null;
            let addNodeList = jsonData[id].addNodeList;
            if (!addNodeList) return null;

            let node = jsonData[id];

            // 根据层级缩进
            let itemStyle = {
                paddingLeft: 22 * node.level + 'px',
            };

            let addItem = addNodeList.map((item, key) => {
                return <div id={node.id} key={key} className="node nodeAdd">
                    <div className="node-content" style={itemStyle}
                         onClick={this.customize.addNodeClick.bind(this, item)}>
                        <span className="openIcon"> </span>
                        <input type="radio" className="addNodeRadio" checked={this.state.addNodeSelectId === item.id}
                               onChange={ignore => {
                                   return true
                               }}/>
                        <span className="nodeName">{item.name}</span>
                    </div>
                </div>
            });
            return <div className="nodeAddList">{addItem}</div>
        },
        //[定制功能]追加节点
        addNodeFun: (id, jsonData) => {
            let addNodeList = this.props.addNodeFun(id);

            if (jsonData[id] && addNodeList) jsonData[id].addNodeList = addNodeList;
            this.setState({jsonData});
        },
        //[定制功能]点击追加的节点
        addNodeClick: (node) => {
            this.setState({addNodeSelectId: node.id});
            this.props.addNodeClick(node);
        }
    };

}

export {Tree};