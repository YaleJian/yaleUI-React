"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getNavData = exports.textNodeAddList = exports.testSelectedIdsData = exports.testTreeData = undefined;

var _Icon = require("../utils/Icon");

var _Icon2 = _interopRequireDefault(_Icon);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//生成树的测试数据（level100,everyLevel100,总节点约1w个）
var nodIcons = [_react2.default.createElement(_Icon2.default, { name: "i-file-word" }), _react2.default.createElement(_Icon2.default, { name: "i-file-excel" }), _react2.default.createElement(_Icon2.default, { name: "i-file-ppt" }), _react2.default.createElement(_Icon2.default, { name: "i-file-ppt" })];
var testTreeData = exports.testTreeData = function testTreeData(level, everyLevel, type) {
    var treeData = [];

    //记录上层ids
    var parentIds = [];
    while (level > 0) {
        //循环多少层
        var childNum = Math.ceil(Math.random() * everyLevel); //每层随机多少个节点
        var thisLevelIds = [];

        var thisLevelI = [];
        while (thisLevelIds.length < childNum) {
            //每层生成的节点
            var i = Math.ceil(Math.random() * childNum);
            if (thisLevelI.indexOf(i) === -1) {
                //去重
                thisLevelI.push(i);

                var parentIndex = Math.floor(Math.random() * parentIds.length);
                var parentId = parentIds[parentIndex] || "";
                var id = parentId ? parentId + "-" + i : i;
                if (id[0] === '-') id = id.substr(1);

                var icon = nodIcons[Math.floor(Math.random() * nodIcons.length)];
                if (type === "file") icon = "";
                var node = {
                    id: id,
                    parentId: parentId,
                    name: "节点node " + id,
                    sort: Math.ceil(Math.random() * everyLevel), //排序
                    icon: icon,
                    hasNodeMark: type === "file" && Math.floor(Math.random() * 3) === 1 ? true : ""
                };
                treeData.push(node);
                thisLevelIds.push(id);
            }
        }
        parentIds = thisLevelIds;
        level--;
    }
    console.log("生成树的测试数据:", treeData);
    return treeData;
};

//生成默认选中的测试数据
var testSelectedIdsData = exports.testSelectedIdsData = function testSelectedIdsData(treeData, selectedNodeNum) {
    if (treeData.length < selectedNodeNum) selectedNodeNum = treeData.length;
    var selectedNodes = [];
    while (selectedNodes.length < selectedNodeNum) {
        var index = Math.floor(Math.random() * treeData.length);
        var id = treeData[index].id;
        if (selectedNodes.indexOf(id) === -1) {
            selectedNodes.push(id);
        }
    }
    console.log("生成默认选中的测试数据:", selectedNodes);
    return selectedNodes;
};

//生成追加的节点测试数据
var textNodeAddList = exports.textNodeAddList = function textNodeAddList(parentId, num) {
    var list = [];
    var idList = [];
    while (list.length < num) {
        var id = parentId + "--" + Math.ceil(Math.random() * num);
        if (idList.indexOf(id) === -1) {
            list.push({
                id: id,
                name: id,
                parentId: parentId,
                asyncHasChild: true
            });
            idList.push(id);
        }
    }
    return list;
};

var getNavData = exports.getNavData = function getNavData() {
    //获取导航栏树数据
    var navData = [];
    var titleList = window.document.getElementsByClassName("ya-title");
    var hList = [];
    for (var i = 0; i < titleList.length; i++) {
        var id = titleList[i].innerText;
        var tagName = titleList[i].tagName;
        var level = tagName.replace("H", "");
        hList[level] = id;
        navData.push({
            id: id,
            name: id,
            parentId: hList[level - 1],
            obj: titleList[i],
            sort: i
        });
    }
    console.log("navData:", navData);

    return navData;
};
//# sourceMappingURL=TreeUtil.js.map