'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Tree = require('./Tree');

var _TreeUtil = require('./TreeUtil');

var _ = require('..');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 树组件演示
 */
var TreeDemo = function (_Component) {
    _inherits(TreeDemo, _Component);

    function TreeDemo(props) {
        _classCallCheck(this, TreeDemo);

        var _this = _possibleConstructorReturn(this, (TreeDemo.__proto__ || Object.getPrototypeOf(TreeDemo)).call(this, props));

        _initialiseProps.call(_this);

        console.log("TreeDemo constructor");
        var treeData = (0, _TreeUtil.testTreeData)(5, 20);
        var selectedIds = (0, _TreeUtil.testSelectedIdsData)(treeData, 4);
        var fileTreeData = (0, _TreeUtil.testTreeData)(5, 20, "file");

        var menuData = (0, _TreeUtil.testTreeData)(2, 5);
        var menuSelectedIds = (0, _TreeUtil.testSelectedIdsData)(menuData, 1);
        _this.state = {
            loading: true,
            treeData: treeData,
            fileTreeData: fileTreeData,
            defaultSelectedIds: selectedIds, //入参，默认选中
            menuData: menuData,
            menuSelectedIds: menuSelectedIds,
            defaultOpenIds: selectedIds, //入参，默认打开
            navData: [],

            selectedIds: selectedIds, //出参，选中的节点id
            openIds: selectedIds, //出参，打开的节点id
            nodeContentClick: {},
            addNodeClick: {},
            indexBarClick: {},
            updateNodes: [],
            defaultOpenLevel: 1
        };
        return _this;
    }

    //点击树节点名称事件，返回的node对象


    //入参

    //复选框点击事件，返回选中的父节点们

    //展开点击事件，返回展开的节点


    _createClass(TreeDemo, [{
        key: 'updateNode',


        //更新树
        value: function updateNode() {
            var treeData = (0, _TreeUtil.testTreeData)(10, 10);
            var selectedIds = (0, _TreeUtil.testSelectedIdsData)(treeData, 2);
            this.setState({
                treeData: treeData,
                defaultSelectedIds: selectedIds,
                defaultOpenIds: selectedIds
            });
        }

        //追加节点

    }, {
        key: 'addNodeClick',


        //追加的节点点击
        value: function addNodeClick(node) {
            this.setState({ addNodeClick: node });
        }

        //索引节点点击

    }, {
        key: 'indexBarClick',
        value: function indexBarClick(node) {
            this.setState({ indexBarClick: node });
        }

        //更新的节点(包含新增的节点)

    }, {
        key: 'updateNodes',
        value: function updateNodes(node) {
            this.setState({ updateNodes: node });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { className: 'ya-treeDemo' },
                _react2.default.createElement(
                    'div',
                    { className: 'ya-console-area' },
                    _react2.default.createElement(
                        'h2',
                        { className: 'ya-title' },
                        '\u6570\u636E\u8F93\u51FA'
                    ),
                    _react2.default.createElement(
                        'button',
                        { onClick: this.updateNode.bind(this) },
                        '\u66F4\u65B0\u6811'
                    ),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement(
                        'div',
                        null,
                        '\u5165\u53C2\uFF1A\u9ED8\u8BA4\u9009\u4E2D\uFF1A ',
                        JSON.stringify(this.state.defaultSelectedIds)
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        '\u5165\u53C2\uFF1A\u9ED8\u8BA4\u5C55\u5F00\u7684\u5C42\u7EA7\uFF1A ',
                        this.state.defaultOpenLevel
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        '\u9009\u4E2D\u7684\u6700\u5927\u7236\u8282\u70B9:  ',
                        JSON.stringify(this.state.selectedIds)
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        '\u6253\u5F00\u7684\u8282\u70B9\uFF08\u7B2C\u4E00\u6B21\u4E3A\u9ED8\u8BA4\u6253\u5F00\u7684\u8282\u70B9\uFF09: ',
                        JSON.stringify(this.state.openIds)
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        '\u70B9\u51FB\u8282\u70B9\u540D\u79F0\u8F93\u51FA\u5F53\u524D\u8282\u70B9: ',
                        JSON.stringify(this.state.nodeContentClick)
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        '\u8FFD\u52A0\u7684\u8282\u70B9\u70B9\u51FB\uFF1A ',
                        JSON.stringify(this.state.addNodeClick)
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        '\u7D22\u5F15\u8282\u70B9\u70B9\u51FB\uFF1A ',
                        JSON.stringify(this.state.indexBarClick)
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        '\u88AB\u4FEE\u6539\u7684\u8282\u70B9\uFF1A ',
                        JSON.stringify(this.state.updateNodes)
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'demo' },
                    _react2.default.createElement(
                        'h1',
                        { className: 'ya-title' },
                        '\u5404\u79CD\u7C7B\u578B\u7684\u6811'
                    ),
                    _react2.default.createElement(
                        'h2',
                        { className: 'ya-title' },
                        '\u591A\u8282\u70B9\u5C55\u5F00\u6811'
                    ),
                    _react2.default.createElement(_Tree.Tree, { treeData: this.state.treeData,
                        selectedIds: this.state.defaultSelectedIds,
                        openLevel: this.state.defaultOpenLevel,
                        openIds: this.state.defaultOpenIds,

                        checkbox: true,
                        nodeIconBtn: true,
                        operationBtn: true,
                        indexBar: true,
                        autoSearch: true,
                        searchNum: 12,
                        draggable: true,
                        theme: true,

                        openIcon: _react2.default.createElement(_.Icon, { name: 'i-folder-open' }),
                        closeIcon: _react2.default.createElement(_.Icon, { name: 'i-folder' }),
                        childIcon: _react2.default.createElement(_.Icon, { name: 'i-file' }),

                        addNodeFun: this.addNodeFun.bind(this),
                        nodeContentClick: this.nodeContentClick.bind(this),
                        checkboxClick: this.checkboxClick.bind(this),
                        openIconClick: this.openIconClick.bind(this),
                        addNodeClick: this.addNodeClick.bind(this),
                        indexBarClick: this.indexBarClick.bind(this),
                        updateNodes: this.updateNodes.bind(this),

                        ref: function ref(tree) {
                            _this2.tree = tree;
                        }
                    })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'demo' },
                    _react2.default.createElement(
                        'h2',
                        { className: 'ya-title' },
                        '\u5355\u5C42\u8282\u70B9\u6253\u5F00\u6811-\u5217\u8868\u6837\u5F0F'
                    ),
                    _react2.default.createElement(_Tree.Tree, { treeData: this.state.treeData,
                        selectedIds: this.state.defaultSelectedIds,
                        indexId: this.state.defaultOpenIds[0],

                        treeType: 2,
                        nodeIconBtn: true,
                        operationBtn: true,
                        theme: true,
                        indexBar: true,
                        autoSearch: true,
                        searchNum: 11,
                        draggable: true,

                        closeIcon: _react2.default.createElement(_.Icon, { name: 'i-folder' }),

                        nodeContentClick: this.nodeContentClick.bind(this),
                        openIconClick: this.openIconClick.bind(this),
                        indexBarClick: this.indexBarClick.bind(this),
                        updateNodes: this.updateNodes.bind(this),

                        ref: function ref(tree) {
                            _this2.tree = tree;
                        }
                    })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'demo' },
                    _react2.default.createElement(
                        'h2',
                        { className: 'ya-title' },
                        '\u5355\u5C42\u8282\u70B9\u6253\u5F00\u6811-\u5E73\u94FA\u6837\u5F0F'
                    ),
                    _react2.default.createElement(_Tree.Tree, { treeData: this.state.fileTreeData,
                        treeType: 2,
                        displayMode: "grid",

                        openBtn: false,
                        checkbox: true,
                        nodeIconBtn: true,
                        operationBtn: false,
                        theme: true,
                        indexBar: true,
                        autoSearch: true,
                        searchNum: 11,
                        draggable: true,

                        nodeContentClick: this.nodeContentClick.bind(this),
                        checkboxClick: this.checkboxClick.bind(this),
                        openIconClick: this.openIconClick.bind(this),
                        indexBarClick: this.indexBarClick.bind(this),
                        updateNodes: this.updateNodes.bind(this),

                        ref: function ref(tree) {
                            _this2.tree = tree;
                        }
                    })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'demo' },
                    _react2.default.createElement(
                        'h2',
                        { className: 'ya-title' },
                        '\u83DC\u5355\u6811'
                    ),
                    _react2.default.createElement(_Tree.Tree, { treeData: this.state.menuData,
                        indexId: this.state.menuSelectedIds[0],

                        treeType: 4,
                        operationBtn: true,
                        openLevel: "all"
                        // indent = {false}
                        , menuStyle: "dark",
                        rightClickMenu: true,

                        ref: function ref(tree) {
                            _this2.tree = tree;
                        }
                    })
                ),
                _react2.default.createElement(
                    'h2',
                    { className: 'ya-title' },
                    '\u53F3\u4FA7\u76EE\u5F55\u6811'
                ),
                _react2.default.createElement(_Tree.Tree, { treeData: this.state.navData,

                    treeType: 3,
                    openBtn: false,
                    openLevel: "all",

                    ref: function ref(tree) {
                        _this2.tree = tree;
                    }
                }),
                _react2.default.createElement(
                    'div',
                    { className: 'demo' },
                    _react2.default.createElement(
                        'h2',
                        { className: 'ya-title' },
                        '\u5F02\u6B65\u6811'
                    ),
                    _react2.default.createElement(_Tree.Tree, { treeData: this.state.menuData,

                        treeType: 1,
                        operationBtn: true,
                        theme: true,
                        indexBar: true,
                        autoSearch: true,
                        searchNum: 11,
                        draggable: true,

                        childIcon: _react2.default.createElement(_.Icon, { name: 'i-file' }),
                        nodeContentClick: this.nodeContentClick.bind(this),
                        openIconClick: this.openIconClick.bind(this),
                        indexBarClick: this.indexBarClick.bind(this),
                        updateNodes: this.updateNodes.bind(this),

                        async: true,
                        asyncGetChildNode: this.asyncGetChildNode,
                        asyncSearchNode: this.asyncSearchNode,
                        ref: function ref(tree) {
                            _this2.tree = tree;
                        }
                    })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'demo' },
                    _react2.default.createElement(
                        'h2',
                        { className: 'ya-title' },
                        '[\u5B9A\u5236\u529F\u80FD]\u7BA1\u7406\u5458\u6839\u636E\u90E8\u95E8\u9009\u62E9\u4EBA\u5458\uFF1A\u70B9\u51FB\u8282\u70B9\u540D\u79F0\uFF0C\u5728\u8282\u70B9\u5185\u8FFD\u52A0\u8282\u70B9\u5217\u8868\uFF0C\u8FD9\u4E9B\u8282\u70B9\u652F\u6301\u5355\u9009'
                    ),
                    _react2.default.createElement(_Tree.Tree, { treeData: this.state.treeData,

                        operationBtn: true,
                        autoSearch: true,
                        searchNum: 12,
                        addNodeSwitch: true,

                        addNodeFun: this.addNodeFun.bind(this),
                        addNodeClick: this.addNodeClick.bind(this),
                        indexBarClick: this.indexBarClick.bind(this),

                        ref: function ref(tree) {
                            _this2.tree = tree;
                        }
                    })
                )
            );
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.state.loading) {
                var navData = (0, _TreeUtil.getNavData)();
                this.setState({ navData: navData, loading: false });
            }
        }

        //异步树，分页查询子节点方法

    }, {
        key: 'asyncGetChildNode',
        value: function asyncGetChildNode(parentId) {
            return (0, _TreeUtil.textNodeAddList)(parentId, 10);
        }

        //异步树，分页搜索方法

    }, {
        key: 'asyncSearchNode',
        value: function asyncSearchNode(node) {
            return (0, _TreeUtil.textNodeAddList)(node.parentId, 10);
        }
    }]);

    return TreeDemo;
}(_react.Component);

TreeDemo.defaultProps = {
    treeData: [], //树的节点对象集合
    selectedIds: [], //默认选中的节点id集合
    getReturnData: function getReturnData() {} //获取选中的值
};

var _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.nodeContentClick = function (node) {
        _this3.setState({ nodeContentClick: node });
    };

    this.checkboxClick = function (selectedIds) {
        _this3.props.getReturnData(selectedIds);
        _this3.setState({ selectedIds: selectedIds });
    };

    this.openIconClick = function (openIds) {
        _this3.setState({ openIds: openIds });
    };

    this.addNodeFun = function (parentId) {
        return (0, _TreeUtil.textNodeAddList)(parentId, 10);
    };
};

exports.default = TreeDemo;
//# sourceMappingURL=TreeDemo.js.map