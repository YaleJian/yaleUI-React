//生成树的测试数据（level100,everyLevel100,总节点约1w个）
import Icon from "../utils/Icon";
import React from "react";

let nodIcons = [<Icon name="i-file-word"/>, <Icon name="i-file-excel"/>, <Icon name="i-file-ppt"/>,
    <Icon name="i-file-ppt"/>];
export var testTreeData = (level, everyLevel, type) => {
    let treeData = [];

    //记录上层ids
    let parentIds = [];
    while (level > 0) {
        //循环多少层
        let childNum = Math.ceil(Math.random() * everyLevel);//每层随机多少个节点
        let thisLevelIds = [];

        let thisLevelI = [];
        while (thisLevelIds.length < childNum) {
            //每层生成的节点
            let i = Math.ceil(Math.random() * childNum);
            if (thisLevelI.indexOf(i) === -1) {//去重
                thisLevelI.push(i);

                let parentIndex = Math.floor(Math.random() * parentIds.length);
                let parentId = parentIds[parentIndex] || "";
                let id = parentId ? parentId + "-" + i : i;
                if (id[0] === '-') id = id.substr(1);

                let icon = nodIcons[Math.floor(Math.random() * nodIcons.length)];
                if(type === "file")  icon = "";
                let node = {
                    id: id,
                    parentId: parentId,
                    name: "节点node " + id,
                    sort: Math.ceil(Math.random() * everyLevel),//排序
                    icon,
                    hasNodeMark : type === "file" && Math.floor(Math.random() * 3) === 1 ? true : ""
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
export var testSelectedIdsData = (treeData, selectedNodeNum) => {
    if(treeData.length < selectedNodeNum) selectedNodeNum = treeData.length;
    let selectedNodes = [];
    while (selectedNodes.length < selectedNodeNum) {
        let index = Math.floor(Math.random() * treeData.length);
        let id = treeData[index].id;
        if (selectedNodes.indexOf(id) === -1) {
            selectedNodes.push(id);
        }
    }
    console.log("生成默认选中的测试数据:", selectedNodes);
    return selectedNodes;

};

//生成追加的节点测试数据
export var textNodeAddList = (parentId, num) => {
    let list = [];
    let idList = [];
    while (list.length < num) {
        let id = parentId + "--" + Math.ceil(Math.random() * num);
        if (idList.indexOf(id) === -1) {
            list.push({
                id: id,
                name: id,
                parentId: parentId,
                asyncHasChild: true,
            });
            idList.push(id);
        }
    }
    return list;
};

export var getNavData = () => {
    //获取导航栏树数据
    let navData = [];
    let titleList = window.document.getElementsByClassName("ya-title");
    let hList = [];
    for (let i = 0; i < titleList.length; i++) {
        let id = titleList[i].innerText;
        let tagName = titleList[i].tagName;
        let level = tagName.replace("H", "");
        hList[level] = id;
        navData.push({
            id: id,
            name: id,
            parentId: hList[level - 1],
            obj: titleList[i],
            sort: i
        });
    }
    console.log("navData" + navData);

    return navData;
};