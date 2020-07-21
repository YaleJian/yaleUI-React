"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Tree = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require("react-router-dom");

require("./tree.css");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var Tree = function (_React$Component) {
    _inherits(Tree, _React$Component);

    //新增节点引起变化的节点（暂时存储，点保存才使用）

    //节点图片类型-样式

    //节点图片类型-h5标签或react对象/组件
    //拖曳到目标节点内部
    //父节点不存在
    //选中状态
    function Tree(props) {
        _classCallCheck(this, Tree);

        //默认打开（索引）时开启自动滚动
        var _this2 = _possibleConstructorReturn(this, (Tree.__proto__ || Object.getPrototypeOf(Tree)).call(this, props));

        _this2.delChangingIds = [];
        _this2.addChangingIds = [];
        _this2.data = {
            //数据优化
            handleData: function handleData(rawData) {

                //初始化虚拟根节点
                _this2.rootNode = {
                    id: "rootNode",
                    childIds: [],
                    open: true,
                    level: 0,
                    icon: "",
                    iconType: Tree.ICON_TYPE_TAG,
                    hasChild: false //是否可以打开
                };

                //优化查询，转换为json格式，以node[i]方式获取某一个节点数据
                var jsonData = {};
                jsonData = _this2.data.convertJsonFormat([].concat(_toConsumableArray(rawData)), jsonData);

                //第一次循环：计算属性
                for (var i in jsonData) {

                    if (jsonData.hasOwnProperty(i)) {

                        var node = jsonData[i],
                            parentNode = jsonData[node.parentId];

                        //记录每个节点的子节点id集合
                        if (parentNode) {
                            parentNode.childIds.push(node.id);
                        } else {
                            //父节点不存在的节点,作为第一层节点
                            _this2.rootNode.childIds.push(node.id);
                        }

                        //计算层级方法
                        if (parentNode && parentNode.level) {
                            //如果父节点存在，且父节点已经算过，那么当前节点的层级是父节点层级+1
                            node.level = parentNode.level + 1;
                        } else {
                            //向上找父节点，直到父节点不存在，记录找到父节点的次数即层级
                            var level = 1; //定义层级，默认从第一层开始
                            var parentId = node.parentId;
                            while (jsonData[parentId]) {
                                level++;
                                parentId = jsonData[parentId].parentId; //获取上一个父级ID
                            }
                            node.level = level;
                        }

                        //默认打开的层级
                        if (_this2.props.openLevel >= node.level || _this2.props.openLevel === "all") jsonData[i].open = true;
                    }
                }
                return jsonData;
            },

            //转换json格式,支持增量
            convertJsonFormat: function convertJsonFormat(data, jsonData, isIncrement) {
                for (var i = 0; i < data.length; i++) {

                    var node = _extends({}, data[i]); //防止组件复用时，对象数组的对象引用的同一个堆造成的值改变联动
                    var id = node.id;
                    var parentId = node.parentId;

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
                    node.hasOpen = false; //打开过,减少渲染未打开的节点
                    node.select = Tree.UNSELECTED;
                    jsonData[id] = node;

                    //增量时，直接计算属性
                    if (isIncrement) {
                        //父节点记录子节点id
                        var parentNode = jsonData[node.parentId];
                        if (parentNode) {
                            parentNode.childIds.push(node.id);
                        } else {
                            //父节点不存在的节点,作为第一层节点
                            _this2.rootNode.childIds.push(node.id);
                        }

                        //设置层级
                        if (parentNode) {
                            jsonData[id].level = jsonData[node.parentId].level + 1;
                        } else {
                            jsonData[id].level = 1;
                        }
                        //是否默认打开:异步开启时，默认打开会失效，增量节点默认不自动打开
                        //是否默认选中:1.父节点默认选中，2.默认选中的节点
                        if (jsonData[node.parentId].select === Tree.SELECTED || _this2.props.selectedIds.indexOf(node.id) > -1) jsonData[id].select = Tree.SELECTED;
                    }
                }
                return jsonData;
            },

            //默认打开
            defaultOpen: function defaultOpen(ids, jsonData) {
                ids.forEach(function (id) {
                    //打开当前节点(有子节点时)
                    var node = jsonData[id];
                    if (node.childIds > 0) jsonData[id].open = true;

                    var parentNode = jsonData[node.parentId];
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
            prevSelect: function prevSelect(jsonData, id, select) {

                //向上节点的半选和选中、取消选中
                var node = jsonData[id];
                var parentNode = jsonData[node.parentId];

                var _loop = function _loop() {
                    //向上更改父节点选中状态，直到父节点不存在
                    var currentNode = parentNode;

                    //计算上一个父节点的子节点选中、半选的节点数目
                    var currentNodeChildIds = currentNode.childIds;
                    var selectedNum = 0;
                    var semiSelectedNum = 0;
                    currentNodeChildIds.forEach(function (k) {
                        if (jsonData[k].select === Tree.SELECTED) {
                            selectedNum++;
                        } else if (jsonData[k].select === Tree.SEMI_SELECTED) {
                            semiSelectedNum++;
                        }
                    });

                    //当前节点（上一个父亲节点）的状态改变，以下用"当前"描述上一个父亲节点，用"当前下"描述上一个父亲节点的子节点们
                    var toSelect = void 0;
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
                };

                while (parentNode) {
                    _loop();
                }

                return jsonData;
            },

            //向下选中
            nextSelect: function nextSelect(jsonData, id, select) {

                jsonData[id].select = select;
                //子节点选中
                jsonData[id].childIds.forEach(function (i) {
                    _this2.data.nextSelect(jsonData, i, select);
                });
                return jsonData;
            },

            //默认选中
            defaultSelectedNodes: function defaultSelectedNodes(ids, jsonData) {

                var select = Tree.SELECTED;
                ids.forEach(function (id) {
                    if (jsonData[id]) {
                        //当前选中
                        jsonData[id].select = select;
                        //向上变化
                        jsonData = _this2.data.prevSelect(jsonData, id, select);
                        //向下变化
                        jsonData = _this2.data.nextSelect(jsonData, id, select);
                    }
                });

                return jsonData;
            },

            //获取选中的最大父节点们
            getSelectIds: function getSelectIds(jsonData) {
                var selectedIds = [];
                for (var i in jsonData) {
                    if (jsonData.hasOwnProperty(i)) {
                        var node = jsonData[i];
                        if (node.select === Tree.SELECTED && (jsonData[node.parentId] === undefined || jsonData[node.parentId].select !== Tree.SELECTED)) {
                            selectedIds.push(node.id);
                        }
                    }
                }
                return selectedIds;
            },

            //节点移动
            moveNode: function moveNode(dId, tId, movePosition) {
                if (dId === tId) return;

                var jsonData = _extends({}, _this2.state.jsonData);
                var dNode = jsonData[dId];
                var tNode = jsonData[tId] || _this2.rootNode;

                _this2.data.delNode(dNode, tNode, movePosition, jsonData); //从原处移除当前节点
                _this2.data.addNode(dNode, tNode, movePosition, jsonData); //在目标节点处新增
                _this2.setState({ jsonData: jsonData, dragNodeId: dId, indexId: dId });

                var changingNodes = [];
                //删除引起的变化节点
                for (var i in _this2.delChangingIds) {
                    changingNodes.push(jsonData[_this2.delChangingIds[i]]);
                    _this2.delChangingIds = [];
                }
                //新增引起的变化节点
                for (var _i in _this2.addChangingIds) {
                    changingNodes.push(jsonData[_this2.addChangingIds[_i]]);
                    _this2.addChangingIds = [];
                }
                _this2.props.updateNodes(changingNodes);

                //逐渐隐藏节点焦点
                var self = _this2;
                if (_this2.dragFcous) clearTimeout(_this2.dragFcous);
                _this2.dragFcous = setTimeout(function () {
                    self.setState({ dragNodeId: '' });
                }, 10000);
            },

            //删除当前节点
            delNode: function delNode(dNode, jsonData) {

                var dParentNode = jsonData[dNode.parentId] || _this2.rootNode;
                var idIndex = dParentNode.childIds.indexOf(dNode.id);
                if (idIndex > -1) dParentNode.childIds.splice(idIndex, 1);
                delete jsonData[dNode.id];

                _this2.delChangingIds.push(dParentNode.id);
                _this2.delChangingIds.push(dNode.id);
            },

            //在目标节点处新建
            addNode: function addNode(newNode, tNode, movePosition, jsonData) {

                jsonData[newNode.id] = newNode;
                if (movePosition === Tree.MOVE_IN) {
                    //新建到目标节点内

                    //目标节点子集ids增加拖动的节点
                    if (!tNode.childIds) tNode.childIds = [];
                    tNode.childIds.push(newNode.id);
                    tNode.open = true;

                    //追加到最后
                    var maxSort = jsonData[tNode.childIds[0]].sort;
                    tNode.childIds.forEach(function (id) {
                        if (jsonData[id].sort > maxSort) maxSort = jsonData[id].sort;
                    });
                    newNode.sort = maxSort + 1;

                    newNode.parentId = tNode.id;
                    newNode.level = tNode.level + 1;

                    _this2.addChangingIds.push(tNode.id); //记录变化节点id（目标节点）
                } else if (movePosition === Tree.MOVE_TOP || movePosition === Tree.MOVE_BOTTOM) {
                    //新建到目标节点上、下

                    //目标节点之后节点后移（先空出位置）
                    var tParentNode = jsonData[tNode.parentId] || _this2.rootNode;
                    tParentNode.childIds.forEach(function (id) {
                        if (jsonData[id].sort > tNode.sort) {
                            ++jsonData[id].sort;
                            _this2.addChangingIds.push(id); //记录变化节点id（新建/拖动到目标节点处，引起的排序变化的节点）
                        }
                    });

                    if (movePosition === Tree.MOVE_TOP) {
                        newNode.sort = tNode.sort || 0;
                        if (tNode.sort) ++tNode.sort; //目标节点后移，排序值+1
                        _this2.addChangingIds.push(tNode.id); //记录变化节点id（拖动到目标节点处，目标节点后移）
                    } else {
                        newNode.sort = (tNode.sort || 0) + 1;
                    }

                    newNode.parentId = tNode.parentId;
                    tParentNode.childIds.push(newNode.id);

                    newNode.level = tNode.level;
                }

                jsonData[newNode.id] = newNode;

                //此节点及其子节点层级重新计算
                _this2.data.resetNodeLevel(jsonData, newNode.id);
                return jsonData;
            },

            //此节点的子节点层级重新计算
            resetNodeLevel: function resetNodeLevel(jsonData, id) {
                var parentNode = jsonData[jsonData[id].parentId] || _this2.rootNode;
                jsonData[id].level = parentNode.level + 1;
                //如果还有子节点
                jsonData[id].childIds.forEach(function (i) {
                    _this2.data.resetNodeLevel(jsonData, i);
                });
            }

        };
        _this2.rendering = {
            //渲染多节点展开树
            tree: function tree(jsonData, child) {
                var treeItem = void 0;
                if (_this2.TREE_SINGLE) {
                    var node = jsonData[_this2.state.indexId];
                    if (node) {

                        child = node.childIds;
                        if (!node[_this2.props.hasNodeMark]) {
                            //节点属性不可以打开，且打开的节点没有子节点，或者索引的id和拖曳的id相等，则默认打开父级，此节点显示选中样式
                            var parentNode = jsonData[node.parentId] || _this2.rootNode;
                            if (child.length === 0 || _this2.state.indexId === _this2.state.dragNodeId) child = parentNode.childIds;
                        } else {
                            //如果可以打开、但没有子节点
                            if (child && child.length === 0) {
                                return _react2.default.createElement(
                                    "div",
                                    { className: "noData" },
                                    _react2.default.createElement(_.Icon, { name: "i--expressionless" }),
                                    _react2.default.createElement(
                                        "div",
                                        null,
                                        "No Data"
                                    )
                                );
                            }
                        }
                    } else {
                        child = _this2.rootNode.childIds;
                    }
                }
                if (child) {
                    //排序
                    child = _this2.rendering.childSort(child, jsonData);
                    // 子元素是数组的形式，把所有的子元素循环出来
                    treeItem = child.map(function (item, key) {

                        var node = jsonData[item];
                        if (node) {

                            var itemStyle = void 0,
                                nodeGroupStyle = void 0;
                            if (!_this2.TREE_SINGLE) {

                                var _parentNode = jsonData[node.parentId];
                                // 父节点未打开，且从未打开过的节点，不渲染
                                if (_parentNode && !_parentNode.open && !_parentNode.hasOpen) return null;

                                //子节点隐藏
                                nodeGroupStyle = "node-group animated fastest " + (node.open ? "fadeInDownSmall ya-show" : "ya-hide");

                                // 根据层级缩进
                                var indentPx = 25;
                                if (_this2.TREE_NAV) indentPx = 11;
                                itemStyle = { paddingLeft: indentPx * (node.level - 1) + 'px' };
                                if (!_this2.props.indent) itemStyle = {}; //关闭缩进
                            }

                            return _react2.default.createElement(
                                "div",
                                { key: key, className: "node", onMouseDown: _this2.operationBtn.rightClick.bind(_this2, node) },
                                _this2.rendering.nodeContent(node, itemStyle),
                                _react2.default.createElement(
                                    "div",
                                    { className: nodeGroupStyle },
                                    !_this2.TREE_SINGLE ? _this2.rendering.tree(jsonData, node.childIds) : null,
                                    _this2.customize.nodeAddList(node.id, jsonData)
                                )
                            );
                        } else {
                            console.log("子节点" + item + "不存在或被删除");
                        }
                        return null;
                    });
                }
                return treeItem;
            },

            nodeContent: function nodeContent(node, itemStyle) {
                var nodeContent = _react2.default.createElement(
                    "div",
                    {
                        className: "node-content " + (_this2.state.indexId === node.id || _this2.state.dragNodeId === node.id ? "nodeFocus " : "") + (node.select === Tree.SELECTED ? "selected" : ""),
                        style: itemStyle,
                        onClick: _this2.nodeContentClick.bind(_this2, node),
                        draggable: _this2.props.draggable,
                        onDragStart: _this2.drag.onDragStart.bind(_this2, node.id),
                        onDragEnd: _this2.drag.onDragEnd.bind(_this2, node.id),
                        onDragOver: _this2.props.draggable ? _this2.drag.onDragOver.bind(_this2, node.id) : function () {},
                        onDragLeave: _this2.drag.onDragLeave.bind(_this2, node.id),
                        onDrop: _this2.drag.onDrop.bind(_this2, node.id),
                        ref: function ref(indexedNode) {
                            return _this2.state.indexId === node.id ? _this2.indexedNode = indexedNode : {};
                        } },
                    _this2.open.handleOpenIcon(node),
                    _this2.checkbox.handleCheckBox(node),
                    _this2.handleNodeIcon(node),
                    _this2.nodeName.handleNodeName(node),
                    _this2.nodeName.handleEditName(node),
                    _this2.operationBtn.handleOperationBtn(node)
                );

                if (_this2.TREE_MENU && node.link) nodeContent = _react2.default.createElement(
                    _reactRouterDom.Link,
                    { to: node.link },
                    nodeContent
                );
                return nodeContent;
            },
            //根据排序字段排序(冒泡排序)
            childSort: function childSort(child, jsonData) {
                var len = child.length,
                    i = void 0,
                    j = void 0,
                    d = void 0;
                if (len === 0) return child;
                for (i = len; i--;) {
                    for (j = 0; j < i; j++) {
                        var z = j + 1; //下一个
                        var thisSort = jsonData[child[j]].sort || 0;
                        var nextSort = jsonData[child[z]].sort || 0;
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

        _this2.handleNodeIcon = function (node) {
            if (!_this2.props.nodeIconBtn) return null;
            var nodeIcon = node.icon;

            //节点未设置图标时，设置默认图标
            if (!nodeIcon) {
                nodeIcon = node.childIds.length > 0 || node[_this2.props.hasNodeMark] ? _react2.default.createElement(_.Icon, { name: "i-folder" }) : _react2.default.createElement(_.Icon, { name: "i-file" });
            }

            var nodeIconType = node.iconType || Tree.ICON_TYPE_TAG;

            //根据图标类型
            if (nodeIconType === Tree.ICON_TYPE_IMG) nodeIcon = _react2.default.createElement("img", { className: "nodeIconImg", src: nodeIcon, alt: nodeIcon });
            if (nodeIconType === Tree.ICON_TYPE_CLASS) nodeIcon = _react2.default.createElement(
                "span",
                { className: node.icon },
                " "
            );

            return _react2.default.createElement(
                "span",
                { className: "ya-nodeIcon" },
                nodeIcon
            );
        };

        _this2.nodeContentClick = function (node) {

            //导航栏树锚点
            if (_this2.TREE_NAV) {
                node.obj.scrollIntoView({ block: "center", inline: "nearest" });
                return;
            }
            var jsonData = _extends({}, _this2.state.jsonData);
            if (node.childIds.length > 0 || _this2.props.addNodeSwitch) node.open = !node.open;

            //当前节点索引
            if (!node) node = _this2.rootNode; //id不存在默认回第一级
            var indexId = node.id;

            _this2.setState({ indexId: indexId, jsonData: jsonData });

            //[定制功能]点击名称追加节点
            if (_this2.props.addNodeSwitch) _this2.customize.addNodeFun(node.id, jsonData);
            _this2.props.nodeContentClick(node);
        };

        _this2.open = {
            //处理打开图标
            handleOpenIcon: function handleOpenIcon(node) {
                if (!_this2.props.openBtn) return null;

                //异步加载图标
                if (node.async) {
                    var loadingIcon = _react2.default.createElement(_.Icon, { name: "i-loading-min" });
                    return _react2.default.createElement(
                        "span",
                        { className: "openIcon ya-rotationInfinite" },
                        loadingIcon
                    );
                }

                //默认图标
                var defaultOpenIcon = _react2.default.createElement(_.Icon, { name: "i-BAI-youjiantou" });
                var defaultMenuOpenIcon = _react2.default.createElement(_.Icon, { name: "i-BAI-shangjiantou" });

                var openIconSvg = _this2.props.childIcon || "",
                    rotate = "";
                //计算后节点有子节点，或者有存在子节点标识
                if (node.childIds.length > 0 || node[_this2.props.hasNodeMark]) {
                    openIconSvg = _this2.props.closeIcon || (_this2.TREE_MENU ? defaultMenuOpenIcon : defaultOpenIcon);
                    if (node.open) {
                        openIconSvg = _this2.props.openIcon || openIconSvg;
                        if (!_this2.props.closeIcon) rotate = _this2.TREE_MENU ? "ya-rotateX180" : "ya-rotate90"; //使用默认图标、节点打开时添加旋转动效
                    }
                }

                var openIcon = 'openIcon ' + rotate + " " + (_this2.TREE_MENU ? "ya-floatRight" : "");
                return _react2.default.createElement(
                    "span",
                    { className: openIcon,
                        onClick: _this2.open.openIconClick.bind(_this2, node.id) },
                    openIconSvg
                );
            },

            //打开事件
            openIconClick: function openIconClick(id, e) {

                var jsonData = _extends({}, _this2.state.jsonData);
                jsonData[id].open = !jsonData[id].open;

                //开启节点异步且节点没有打开过
                var openNow = _this2.props.async && !jsonData[id].hasOpen;
                if (openNow) {
                    jsonData[id].async = true;
                }

                //非异步时立即设置为打开过
                if (!_this2.props.async) jsonData[id].hasOpen = true;
                if (_this2.TREE_SINGLE) {

                    _this2.setState({ jsonData: jsonData, indexId: id });
                    //打开的节点
                    _this2.props.openIconClick([id]);
                } else {

                    _this2.setState({ jsonData: jsonData });
                    //打开的节点们
                    _this2.props.openIconClick(_this2.open.getOpenIds(jsonData));
                }

                if (openNow) {
                    setTimeout(function () {
                        var childNodeData = _this2.props.asyncGetChildNode(id);
                        if (childNodeData) {
                            //转换json数据并记录
                            _this2.data.convertJsonFormat(childNodeData, jsonData, true);
                            //关闭节点异步
                            jsonData[id].async = false;
                            //设置为打开过
                            jsonData[id].hasOpen = true;
                            _this2.setState({ jsonData: jsonData });
                        }
                    }, 400);
                }

                e.preventDefault();
                e.stopPropagation();
            },

            //获取打开的节点IDs
            getOpenIds: function getOpenIds(jsonData) {
                var openIds = [];
                for (var i in jsonData) {
                    if (jsonData.hasOwnProperty(i)) {
                        if (jsonData[i].open) openIds.push(jsonData[i].id);
                    }
                }
                return openIds;
            }
        };
        _this2.nodeName = {
            //处理节点名称
            handleNodeName: function handleNodeName(node) {
                if (_this2.state.editNameId === node.id) return null;

                var nodeNameStyle = "nodeName";
                //菜单树节点名称前没有图标，增加间隙
                if (_this2.TREE_MENU) {
                    nodeNameStyle += " ya-padding-left10";
                }
                if (_this2.TREE_NAV) {
                    var nodeOffsetTop = _this2.drag.getOffset(node.obj, false).top;
                    if (_this2.state.scrollTop >= nodeOffsetTop && _this2.state.scrollTop <= nodeOffsetTop + document.documentElement.clientHeight) {
                        nodeNameStyle += " active";
                    }
                    // console.log(this.state.scrollTop, nodeOffsetTop, document.documentElement.clientHeight)
                }
                return _react2.default.createElement(
                    "span",
                    { className: nodeNameStyle },
                    _react2.default.createElement(
                        "span",
                        null,
                        node.name
                    )
                );
            },

            //处理节点名称编辑
            handleEditName: function handleEditName(node) {
                if (_this2.state.editNameId !== node.id) return null;
                return _react2.default.createElement(
                    "span",
                    { className: "ya-editNodeName" },
                    _react2.default.createElement("input", { type: "text", className: "ya-nameInput", defaultValue: node.name, maxLength: "20",
                        onClick: _this2.nodeName.editNameInputClick.bind(_this2),
                        ref: function ref(nameInput) {
                            return _this2.nameInput = nameInput;
                        } }),
                    _react2.default.createElement(
                        "span",
                        { className: "ya-editOK",
                            onClick: _this2.operationBtn.saveNodeName.bind(_this2, node.id) },
                        _react2.default.createElement(_.Icon, { name: "i-ok" })
                    ),
                    _react2.default.createElement(
                        "span",
                        { className: "ya-cancel",
                            onClick: _this2.operationBtn.cancelEditName.bind(_this2, node) },
                        _react2.default.createElement(_.Icon, { name: "i-close" })
                    )
                );
            },
            //名称编辑输入框事件
            editNameInputClick: function editNameInputClick(e) {
                e.preventDefault();
                e.stopPropagation();
            }
        };
        _this2.index = {
            //渲染索引条
            indexBar: function indexBar(jsonData) {
                var id = _this2.state.indexId;
                var list = [];
                if (id) {
                    if (jsonData[id]) {
                        var prevId = id;
                        while (jsonData[prevId]) {
                            var node = jsonData[prevId];
                            list.unshift(_react2.default.createElement(
                                "span",
                                { key: node.id, className: "item node-group animated fastest fadeInLeft",
                                    ref: function ref(IndexBarItem) {
                                        return _this2.lastIndexBarItem = IndexBarItem;
                                    },
                                    onClick: _this2.index.indexBarClick.bind(_this2, node),
                                    onDragEnd: _this2.drag.onDragEnd.bind(_this2, node.id),
                                    onDragOver: _this2.drag.onDragOver.bind(_this2, node.id),
                                    onDragLeave: _this2.drag.onDragLeave.bind(_this2, node.id),
                                    onDrop: _this2.drag.onDrop.bind(_this2, node.id)
                                },
                                node.name
                            ));
                            prevId = jsonData[prevId].parentId; //获取上一个父级ID
                        }
                    }
                }
                var start = _react2.default.createElement(
                    "span",
                    { key: "root", className: "item" },
                    _react2.default.createElement(
                        "span",
                        { className: "indexBarName",
                            onClick: _this2.index.indexBarClick.bind(_this2, false),
                            onDragEnd: _this2.drag.onDragEnd.bind(_this2, false),
                            onDragOver: _this2.drag.onDragOver.bind(_this2, false),
                            onDragLeave: _this2.drag.onDragLeave.bind(_this2, false),
                            onDrop: _this2.drag.onDrop.bind(_this2, false)
                        },
                        _react2.default.createElement(_.Icon, { name: "i-BAI-wuzi" })
                    )
                );
                list.unshift(start);
                return _react2.default.createElement(
                    "div",
                    { className: "ya-indexBar", key: "indexBar" },
                    list
                );
            },

            //索引点击事件
            indexBarClick: function indexBarClick(node, e) {
                if (node) {
                    _this2.setState({ indexId: node.id });
                } else {
                    _this2.setState({ indexId: _this2.rootNode.id });
                }

                _this2.props.indexBarClick(node || {});
                e.preventDefault();
            }
        };
        _this2.search = {
            //渲染自动搜索
            autoSearch: function autoSearch(jsonData) {
                if (!_this2.props.autoSearch) return null;

                var items = [];
                if (_this2.state.keyword && _this2.state.searchFocus) {
                    var count = 0;
                    for (var i in jsonData) {
                        if (jsonData.hasOwnProperty(i) && jsonData[i].name.indexOf(_this2.state.keyword) > -1) {
                            var node = jsonData[i];
                            items.push(_react2.default.createElement(
                                "div",
                                { className: "searchItem animated fastest fadeInDownSmall", key: node.id,
                                    onMouseDown: _this2.search.searchItemClick.bind(_this2, node, jsonData) },
                                node.name
                            ));
                            count++;
                            if (count > _this2.state.searchNum) {
                                items.push(_react2.default.createElement(
                                    "div",
                                    { className: "searchItem animated fastest fadeInDownSmall", key: "searchMore",
                                        onMouseDown: _this2.search.searchMore.bind(_this2) },
                                    "......"
                                ));
                                break;
                            }
                        }
                    }
                }

                var autoSearchStyle = "ya-autoSearch " + (_this2.state.searchFocus ? "searchFocus" : "");
                return _react2.default.createElement(
                    "div",
                    { className: "ya-treeTools" },
                    _react2.default.createElement(
                        "div",
                        { className: autoSearchStyle, key: "autoSearch", onBlur: _this2.search.searchBlur },
                        _react2.default.createElement(
                            "span",
                            { className: "searchIcon" },
                            _react2.default.createElement(_.Icon, { name: "i-magnifier" })
                        ),
                        _react2.default.createElement("input", { className: "searchInput", type: "text", id: "searchInput", value: _this2.state.keyword,
                            onChange: _this2.search.searchInput.bind(_this2), autoComplete: "off",
                            onFocus: _this2.search.searchInput.bind(_this2) }),
                        _react2.default.createElement(
                            "div",
                            { className: "resultList" },
                            items
                        )
                    ),
                    _this2.state.displayMode === "list" ? _react2.default.createElement(
                        "div",
                        { className: "displayMode", onClick: function onClick() {
                                _this2.setState({ displayMode: "grid" });
                            } },
                        _react2.default.createElement(_.Icon, { name: "i-mode-list" })
                    ) : "",
                    _this2.state.displayMode === "grid" ? _react2.default.createElement(
                        "div",
                        { className: "displayMode", onClick: function onClick() {
                                _this2.setState({ displayMode: "list" });
                            } },
                        _react2.default.createElement(_.Icon, { name: "i-mode-grid" })
                    ) : ""
                );
            },

            //搜索更多
            searchMore: function searchMore(e) {
                _this2.setState({ searchNum: _this2.state.searchNum + 10, searchFocus: true });
                e.preventDefault();
            },

            //搜索输入和聚焦事件
            searchInput: function searchInput(e) {
                _this2.setState({ keyword: e.currentTarget.value, searchFocus: true, searchNum: _this2.props.searchNum || 10 });
            },

            //搜索失去焦点
            searchBlur: function searchBlur() {
                _this2.setState({ searchFocus: false });
            },

            searchItemClick: function searchItemClick(node, jsonData, e) {
                //多节点树自动展开
                if (_this2.TREE_MULTI) {
                    jsonData = _this2.data.defaultOpen([node.id], jsonData);
                    _this2.indexedNodeScroll = true;
                }
                _this2.indexBarScroll = true;
                _this2.setState({ searchFocus: false, keyword: node.name, indexId: node.id, jsonData: jsonData });

                _this2.props.searchItemClick(node || {});
                e.preventDefault();
            }
        };
        _this2.checkbox = {
            //处理复选框
            handleCheckBox: function handleCheckBox(node) {
                if (!_this2.props.checkbox) return "";

                var selectIconSvg = _react2.default.createElement(_.Icon, { name: "i-buxuan" });
                var zoom = '';
                if (node.select === Tree.SELECTED) {
                    selectIconSvg = _react2.default.createElement(_.Icon, { name: "i-xuanzhong" });
                    zoom = 'ya-zoom10-15';
                } else if (node.select === Tree.SEMI_SELECTED) {
                    selectIconSvg = _react2.default.createElement(_.Icon, { name: "i-banxuan" });
                }
                var selectIcon = 'selectIcon ' + zoom;
                return _react2.default.createElement(
                    "span",
                    { className: selectIcon,
                        onClick: _this2.checkbox.checkboxClick.bind(_this2, node.id) },
                    selectIconSvg
                );
            },

            //复选框点击事件
            checkboxClick: function checkboxClick(id, e) {

                var jsonData = _extends({}, _this2.state.jsonData);

                //设置点击的节点选中状态（只存在选中、不选中，点击后设置为原有状态的反状态）
                var select = void 0;
                if (jsonData[id].select === Tree.SELECTED) {
                    select = Tree.UNSELECTED;
                } else {
                    select = Tree.SELECTED;
                }
                jsonData[id].select = select;

                //向上改变
                jsonData = _this2.data.prevSelect(jsonData, id, select);

                //向下改变
                jsonData = _this2.data.nextSelect(jsonData, id, select);
                _this2.setState({ jsonData: jsonData });

                //选中的最大父节点们
                _this2.props.checkboxClick(_this2.data.getSelectIds(jsonData));

                e.stopPropagation();
                e.preventDefault();
            }
        };
        _this2.operationBtn = {
            //处理节点操作按钮(编辑、删除)
            handleOperationBtn: function handleOperationBtn(node) {

                if (!_this2.props.operationBtn) return "";
                return _react2.default.createElement(
                    "span",
                    { className: "btn operationBtn" },
                    _react2.default.createElement(
                        "span",
                        { className: "btn", onClick: _this2.operationBtn.addNode.bind(_this2, Tree.MOVE_TOP, node) },
                        _react2.default.createElement(_.Icon, {
                            name: "i-top-add" })
                    ),
                    _react2.default.createElement(
                        "span",
                        { className: "btn", onClick: _this2.operationBtn.addNode.bind(_this2, Tree.MOVE_IN, node) },
                        _react2.default.createElement(_.Icon, {
                            name: "i-child-add" })
                    ),
                    _react2.default.createElement(
                        "span",
                        { className: "btn", onClick: _this2.operationBtn.addNode.bind(_this2, Tree.MOVE_BOTTOM, node) },
                        _react2.default.createElement(_.Icon, {
                            name: "i-bottom-add" })
                    ),
                    _react2.default.createElement(
                        "span",
                        { className: "btn", onClick: _this2.operationBtn.editBtnClick.bind(_this2, node.id) },
                        _react2.default.createElement(_.Icon, {
                            name: "i-edit" })
                    ),
                    _react2.default.createElement(
                        "span",
                        { className: "btn", onClick: _this2.operationBtn.delBtnClick.bind(_this2, node.id) },
                        _react2.default.createElement(_.Icon, {
                            name: "i-delete" })
                    )
                );
            },

            //新建节点
            addNode: function addNode(movePosition, node, e) {

                var jsonData = _extends({}, _this2.state.jsonData);
                _this2.delChangingIds = [];
                var newNodeId = "node" + new Date().getTime();
                jsonData = _this2.data.addNode({
                    op: "add",
                    id: newNodeId,
                    name: "new node",
                    sort: 0,
                    childIds: []
                }, node, movePosition, jsonData);
                _this2.setState({ jsonData: jsonData, editNameId: newNodeId });
                e.stopPropagation();
                e.preventDefault();
            },

            //编辑按钮点击事件
            editBtnClick: function editBtnClick(id, e) {

                _this2.setState({ editNameId: id });
                _this2.props.editBtnClick(_extends({}, _this2.state.jsonData)[id]);
                e.stopPropagation();
                e.preventDefault();
            },

            //保存节点名称（包含新增的节点）
            saveNodeName: function saveNodeName(id, e) {
                var jsonData = _extends({}, _this2.state.jsonData);
                jsonData[id].name = _this2.nameInput.value;
                if (jsonData[id].op === "add") jsonData[id].op = "added";
                _this2.setState({ jsonData: jsonData, editNameId: "" });
                _this2.delChangingIds.push(id);

                //节点名称变化的节点
                var changingNodes = [];
                if (_this2.addChangingIds.indexOf(id) === -1) changingNodes.push(jsonData[id]);

                //新增引起的变化节点
                for (var i in _this2.addChangingIds) {
                    changingNodes.push(jsonData[_this2.addChangingIds[i]]);
                    _this2.addChangingIds = [];
                }
                _this2.props.updateNodes(changingNodes);
                e.stopPropagation();
            },

            //退出编辑
            cancelEditName: function cancelEditName(node, e) {
                var jsonData = _extends({}, _this2.state.jsonData);

                //取消新增的节点
                if (node.op === "add") {
                    _this2.data.delNode(node, jsonData);
                }
                _this2.setState({ editNameId: "", jsonData: jsonData });
                e.stopPropagation();
                e.preventDefault();
            },
            //删除
            delBtnClick: function delBtnClick(id, e) {
                var jsonData = _extends({}, _this2.state.jsonData);
                _this2.data.delNode(jsonData[id], jsonData);
                _this2.setState({ jsonData: jsonData });

                _this2.props.delBtnClick(jsonData[id]);

                e.stopPropagation();
                e.preventDefault();
            },

            //右键菜单
            rightClick: function rightClick(node, e) {
                if (!_this2.props.rightClickMenu) return;

                //暂时屏蔽右键菜单
                e.target.parentNode.parentNode.oncontextmenu = function () {
                    return false;
                };

                //点击其他位置关闭右键菜单
                var fun = function fun() {
                    _this2.setState({ rightClickMenu: "" });
                };
                window.document.removeEventListener("click", fun);
                window.document.onclick = fun;

                var rightClickMenu = "";
                if (e.button === 2) {
                    //右键

                    //设置相对位置
                    var rmcStyle = {
                        left: e.clientX + 5 + "px",
                        top: e.clientY - e.target.offsetHeight + 10 + "px"
                    };
                    rightClickMenu = _react2.default.createElement(
                        "div",
                        { className: "ya-right-click-menu", style: rmcStyle },
                        _react2.default.createElement(
                            "div",
                            { className: "fn", onClick: _this2.operationBtn.addNode.bind(_this2, Tree.MOVE_TOP, node) },
                            "\u5728\u4E0A\u65B9\u65B0\u5EFA"
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "fn", onClick: _this2.operationBtn.addNode.bind(_this2, Tree.MOVE_IN, node) },
                            "\u5728\u8282\u70B9\u5185\u65B0\u5EFA"
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "fn", onClick: _this2.operationBtn.addNode.bind(_this2, Tree.MOVE_BOTTOM, node) },
                            "\u5728\u4E0B\u65B9\u65B0\u5EFA"
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "fn", onClick: _this2.operationBtn.editBtnClick.bind(_this2, node.id) },
                            "\u91CD\u547D\u540D"
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "fn", onClick: _this2.operationBtn.delBtnClick.bind(_this2, node.id) },
                            "\u5220\u9664"
                        )
                    );
                }

                _this2.setState({ rightClickMenu: rightClickMenu });
                e.stopPropagation();
                e.preventDefault();
            }
        };
        _this2.drag = {
            //拖拽开始
            onDragStart: function onDragStart(dragNodeId, e) {
                _this2.dragNodeId = dragNodeId;
                e.dataTransfer.effectAllowed = "move";
                //自动关闭节点
                var jsonData = _extends({}, _this2.state.jsonData);
                if (jsonData[dragNodeId].childIds) {
                    jsonData[dragNodeId].open = false;
                    _this2.setState({ jsonData: jsonData });
                }
            },

            //拖拽结束,元素没有被放置
            onDragEnd: function onDragEnd(dragNodeId, e) {
                _this2.drag.resetDragStyle(e);
            },
            //拖拽元素在目标元素头上移动的时候
            onDragOver: function onDragOver(targetNodeId, e) {
                var jsonData = _extends({}, _this2.state.jsonData);

                //单节点树，禁止移动到当前节点的父节点索引上
                var parentNode = jsonData[jsonData[_this2.dragNodeId].parentId] || _this2.rootNode;
                if (_this2.TREE_SINGLE && (targetNodeId === parentNode.id || targetNodeId === false && parentNode === _this2.rootNode)) return;

                var className = e.currentTarget.className;
                var pClassName = e.currentTarget.parentNode.className || "";
                if (typeof className === "string") {
                    var _className = e.currentTarget.className || "";

                    if (_this2.dragY !== e.clientY) {
                        _this2.dragY = e.clientY;

                        var targetTop = _this2.drag.getOffset(e.currentTarget, false).top - _this2.treeBody.scrollTop;
                        if (_this2.dragY < targetTop + 12 && _className.indexOf("ya-dragTop") === -1) {
                            _this2.dragPosition = Tree.MOVE_TOP;
                            _this2.drag.resetDragStyle(e);
                            e.currentTarget.className += " ya-dragTop";
                        } else if (_this2.dragY > targetTop + 12 && _this2.dragY < targetTop + e.currentTarget.offsetHeight - 12 && _className.indexOf("ya-dragIn") === -1) {
                            _this2.dragPosition = Tree.MOVE_IN;
                            _this2.drag.resetDragStyle(e);
                            e.currentTarget.className += " ya-dragIn";

                            //自动打开节点
                            if (_this2.TREE_MULTI && _this2.dragNodeId !== targetNodeId) {
                                if (jsonData[targetNodeId].childIds) {
                                    jsonData[targetNodeId].open = true;
                                    _this2.setState({ jsonData: jsonData });
                                }
                            }
                        } else if (_this2.dragY > targetTop + e.currentTarget.offsetHeight - 12 && _className.indexOf("ya-dragBottom") === -1) {
                            _this2.dragPosition = Tree.MOVE_BOTTOM;
                            _this2.drag.resetDragStyle(e);
                            e.currentTarget.className += " ya-dragBottom";
                        }
                        console.log(targetNodeId, _this2.dragPosition, "拖动元素top: " + _this2.dragY, "目标元素高度: " + targetTop, "目标元素高：" + e.currentTarget.offsetHeight, "滚动top：" + _this2.treeBody.scrollTop);
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
            onDragLeave: function onDragLeave(targetNodeId, e) {
                //移除onDragEnter样式
                _this2.drag.resetDragStyle(e);
            },

            //拖拽元素进入目标元素头上，同时鼠标松开的时候
            onDrop: function onDrop(targetNodeId, e) {
                //重置样式
                _this2.drag.resetDragStyle(e);

                //节点改变
                _this2.data.moveNode(_this2.dragNodeId, targetNodeId, _this2.dragPosition);

                e.preventDefault();
            },

            //获取相对窗口的top值
            getOffset: function getOffset(target, offset) {
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
                return _this2.drag.getOffset(target.offsetParent, offset); //向上累加offset里的值
            },

            //重置拖动
            resetDragStyle: function resetDragStyle(e) {
                if (e.currentTarget) {
                    var className = e.currentTarget.className || "";
                    var pClassName = e.currentTarget.parentNode.className || "";
                    if (typeof className === "string" && className.indexOf("ya-dragTop") > -1) e.currentTarget.className = className.replace(" ya-dragTop", "");
                    if (typeof className === "string" && className.indexOf("ya-dragBottom") > -1) e.currentTarget.className = className.replace(" ya-dragBottom", "");
                    if (typeof className === "string" && className.indexOf("ya-dragIn") > -1) e.currentTarget.className = className.replace(" ya-dragIn", "");
                    //兼容单节点树，拖动到主页icon上
                    if (typeof pClassName === "string" && pClassName.indexOf("ya-dragIn") > -1) e.currentTarget.parentNode.className = pClassName.replace(" ya-dragIn", "");
                }
            }
        };
        _this2.customize = {
            //[定制功能]功能]渲染追加的节点
            nodeAddList: function nodeAddList(id, jsonData) {
                if (typeof _this2.props.addNodeFun !== "function") return null;
                var addNodeList = jsonData[id].addNodeList;
                if (!addNodeList) return null;

                var node = jsonData[id];

                // 根据层级缩进
                var itemStyle = {
                    paddingLeft: 22 * node.level + 'px'
                };

                var addItem = addNodeList.map(function (item, key) {
                    return _react2.default.createElement(
                        "div",
                        { id: node.id, key: key, className: "node nodeAdd" },
                        _react2.default.createElement(
                            "div",
                            { className: "node-content", style: itemStyle,
                                onClick: _this2.customize.addNodeClick.bind(_this2, item) },
                            _react2.default.createElement(
                                "span",
                                { className: "openIcon" },
                                " "
                            ),
                            _react2.default.createElement("input", { type: "radio", className: "addNodeRadio", checked: _this2.state.addNodeSelectId === item.id,
                                onChange: function onChange(ignore) {
                                    return true;
                                } }),
                            _react2.default.createElement(
                                "span",
                                { className: "nodeName" },
                                item.name
                            )
                        )
                    );
                });
                return _react2.default.createElement(
                    "div",
                    { className: "nodeAddList" },
                    addItem
                );
            },
            //[定制功能]追加节点
            addNodeFun: function addNodeFun(id, jsonData) {
                var addNodeList = _this2.props.addNodeFun(id);

                if (jsonData[id] && addNodeList) jsonData[id].addNodeList = addNodeList;
                _this2.setState({ jsonData: jsonData });
            },
            //[定制功能]点击追加的节点
            addNodeClick: function addNodeClick(node) {
                _this2.setState({ addNodeSelectId: node.id });
                _this2.props.addNodeClick(node);
            }
        };
        if (_this2.props.indexId) _this2.indexBarScroll = true;
        _this2.indexedNodeScroll = true;

        //初始化
        _this2.state = {
            // treeData: this.props.treeData,
            jsonData: _this2.init(_this2.props),
            selectedIds: _this2.props.selectedIds || [],
            openIds: _this2.props.openIds || [],
            indexId: _this2.props.indexId, //索引id（单节点树打开的节点）
            searchNum: _this2.props.searchNum || 10,

            displayMode: _this2.props.displayMode,
            keyword: "", //搜索关键字
            searchFocus: false, //搜索区是否激活
            dragNodeId: "", //拖曳的节点id
            editNameId: "", //编辑中的节点id
            addNodeSelectId: "", //新增的节点单选的id
            scrollTop: 0, //滚动的top
            rightClickMenu: "" //右键菜单
        };

        return _this2;
    } //删除节点引起变化的节点
    //节点图片类型-图片地址
    //拖曳到目标节点下
    //拖曳到目标节点上
    //半选状态
    //非选中状态


    //入参


    _createClass(Tree, [{
        key: "UNSAFE_componentWillReceiveProps",
        value: function UNSAFE_componentWillReceiveProps(nextProps, nextContext) {

            //入参变化时更新树
            if (this.props.treeData !== nextProps.treeData || this.props.selectedIds !== nextProps.selectedIds || this.props.openIds !== nextProps.openIds || this.props.indexId !== nextProps.indexId) {
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

    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var jsonData = _extends({}, this.state.jsonData);
            if (!this.props.treeData || this.props.treeData.length === 0 || Object.keys(jsonData).length === 0) return null;
            var theme = this.props.theme ? "theme " : "";
            var treeStyle = "ya-tree " + theme + this.state.displayMode;

            var treeBodyStyle = "ya-treeBody";
            if (this.TREE_MENU) treeBodyStyle += " ya-menuTree " + this.props.menuStyle;
            if (this.TREE_NAV) treeBodyStyle += " ya-nav ";
            return _react2.default.createElement(
                "div",
                { className: treeStyle },
                this.props.indexBar ? this.index.indexBar(jsonData) : "",
                this.search.autoSearch(jsonData),
                _react2.default.createElement(
                    "div",
                    { className: treeBodyStyle, ref: function ref(treeBody) {
                            return _this3.treeBody = treeBody;
                        } },
                    this.rendering.tree(jsonData, !this.TREE_SINGLE ? this.rootNode.childIds : null)
                ),
                this.state.rightClickMenu
            );
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            //初始化时自动滚动
            this.autoScroll();

            //导航目录树滚动跟随
            var _this = this;
            if (this.TREE_NAV) {
                window.onscroll = function () {
                    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //滚动条y轴上的距离
                    _this.setState({ scrollTop: scrollTop });
                };
            }
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            window.document.body.scrollIntoView({
                block: "start",
                inline: "nearest"
            });
            // 卸载异步操作设置状态
            this.setState = function (state, callback) {
                return "";
            };
        }
    }, {
        key: "init",
        value: function init(props) {
            var jsonData = {};
            var treeData = props.treeData;

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

        //处理节点图标


        //节点点击

    }, {
        key: "autoScroll",


        //自动滚动
        value: function autoScroll() {
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
    }]);

    return Tree;
}(_react2.default.Component);

Tree.defaultProps = {
    treeData: [], //树的节点对象集合
    treeType: 1, //树类型，默认多节点展开树，1多节点展开树，2单节点打开树，3导航栏树，4菜单树
    selectedIds: [], //默认选中的节点id集合
    openIds: [], //默认打开的节点id集合
    indexId: "", //要索引的id（单节点树打开的节点）
    openLevel: 0, //默认打开的层级, all表示全部展开
    searchNum: 10, //自动关键字搜索默认数量
    openIcon: "", //父节点展开图标
    closeIcon: "", //父节点关闭图标
    childIcon: "", //子节点图标
    menuStyle: "", //菜单树主题

    //回调事件
    nodeContentClick: function nodeContentClick() {}, //点击节点，回调父组件方法，回调入参为节点对象
    checkboxClick: function checkboxClick() {}, //复选框点击，回调父组件方法，回调入参为选中的最大父节点们
    openIconClick: function openIconClick() {}, //打开按钮点击，回调父组件方法，回调入参为打开的节点
    editBtnClick: function editBtnClick() {}, //点击编辑，回调父组件方法，回调入参为节点对象
    delBtnClick: function delBtnClick() {}, //点击删除，回调父组件方法，回调入参为节点对象
    indexBarClick: function indexBarClick() {}, //点击索引节点，回调父组件方法，回调入参为节点对象
    searchItemClick: function searchItemClick() {}, //点击搜索结果，回调父组件方法，回调入参为节点对象
    updateNodes: function updateNodes() {}, //移动/编辑节点，回调父组件方法，回调入参为更新的节点对象

    //功能开关
    displayMode: "", //展示方式，列表展示或格子平铺展示
    async: false, //是否开启异步节点
    openBtn: true, // 展开按钮
    checkbox: false, //复选框
    nodeIconBtn: false, //节点图标
    operationBtn: false, //操作按钮
    theme: false, //默认主题开关
    indexBar: false, //索引条开关
    autoSearch: false, //自动关键字搜索开关
    indent: true, //层级缩进
    draggable: false, //拖曳排序开关
    rightClickMenu: false, //右键菜单
    hasNodeMark: "hasNodeMark", //声明有子节点可以打开节点的字段，数据为布尔类型

    asyncGetChildNode: function asyncGetChildNode() {}, //开启异步，获取子节点数据方法
    asyncSearchNode: function asyncSearchNode() {}, //开启异步，获取搜索结果数据方法

    //定制功能：追加节点，支持单选
    addNodeSwitch: false,
    addNodeFun: function addNodeFun() {}, //点击节点名称，追加节点的方法,回调入参为父节点id
    addNodeClick: function addNodeClick() {} //点击追加的节点名称，回调父组件方法，回调入参为节点对象
};
Tree.UNSELECTED = 1;
Tree.SELECTED = 2;
Tree.SEMI_SELECTED = 3;
Tree.NO_PARENT = "noParent";
Tree.MOVE_TOP = 1;
Tree.MOVE_IN = 2;
Tree.MOVE_BOTTOM = 3;
Tree.ICON_TYPE_TAG = 1;
Tree.ICON_TYPE_IMG = 2;
Tree.ICON_TYPE_CLASS = 3;
exports.Tree = Tree;
//# sourceMappingURL=Tree.js.map