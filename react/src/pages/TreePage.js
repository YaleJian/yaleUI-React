import React, {Component} from 'react';
import Header from './BasePage/Header';
import Menu from './BasePage/Menu';
import Main from './BasePage/Main';
import TreeDemo from "../modules/Tree/TreeDemo";

/**
 * 树
 */
class TreePage extends Component {
    render() {
        return (
            <>
                <Header/>
                <Menu indexId = {2}/>
                <Main content = {<TreeDemo />} />
            </>
        );
    }
}

export default TreePage;
