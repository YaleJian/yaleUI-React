import React from "react"
import "./cloudDrive.css"
import Tree from "../Tree/Tree";
import {testTreeData} from "../Tree/TreeUtil";
/**
 * 云盘
 */
class CloudDrive extends React.Component {

    constructor(props) {
        super(props);
        let fileTreeData = testTreeData(5, 20, "file");
        this.state = {
            fileTreeData,
        }
    }

    render() {
        return <>
            <div className="cloudDrive">
                <div className="fileTools">
                    <div className="title">云盘</div>
                </div>
                <div className="cloudBody">
                    <div className="leftBar">
                        <Tree treeData={this.state.fileTreeData}
                              treeType={1}
                              searchNum={11}
                        />
                    </div>
                    <div className="rightMain">
                        <Tree treeData={this.state.fileTreeData}
                              treeType={2}
                              displayMode={"grid"}
                              openBtn={false}
                              checkbox={true}
                              nodeIconBtn={true}
                              indexBar={true}
                              autoSearch={true}
                              searchNum={11}
                        />
                    </div>
                </div>
            </div>
        </>
    }
}

export default CloudDrive;