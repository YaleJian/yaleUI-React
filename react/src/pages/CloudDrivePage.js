import React, {Component} from 'react';
import Header from './BasePage/Header';
import Menu from './BasePage/Menu';
import Main from './BasePage/Main';
import TreeDemo from "../modules/Tree/TreeDemo";
import CloudDrive from "../modules/CloudDrive/CloudDrive";

/**
 * 云盘
 */
class CloudDrivePage extends Component {
    render() {
        return (
            <>
                <Header/>
                <Menu indexId = {4}/>
                <Main content = {<CloudDrive />} />
            </>
        );
    }
}

export default CloudDrivePage;
