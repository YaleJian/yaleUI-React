import React, {Component} from 'react';
import Header from './BasePage/Header';
import Menu from './BasePage/Menu';
import Main from './BasePage/Main';

/**
 * 设计规范
 */
class DesignStandardPage extends Component {

    render() {
        let designStandard = <>
            <h1>设计规范</h1>
            <h2>偶数数值</h2>
        </>;

        return (
            <>
                <Header/>
                <Menu indexId = {1}/>
                <Main content = {designStandard} />
            </>
        );
    }
}

export default DesignStandardPage;
