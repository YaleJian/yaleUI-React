import React, {Component} from 'react';
import Header from './BasePage/Header';
import Menu from './BasePage/Menu';
import Main from './BasePage/Main';
import InputDemo from "../modules/Input/InputDemo";

/**
 * 输入框
 */
class InputPage extends Component {
    render() {
        return (
            <>
                <Header/>
                <Menu indexId={6}/>
                <Main content={<InputDemo/>}/>
            </>
        );
    }
}

export default InputPage;
