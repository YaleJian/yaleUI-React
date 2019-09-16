import React, {Component} from 'react';
import Header from './BasePage/Header';
import Menu from './BasePage/Menu';
import Main from './BasePage/Main';
import ButtonDemo from "../modules/Button/ButtonDemo";

/**
 * 按钮
 */
class ButtonPage extends Component {
    render() {
        return (
            <>
                <Header/>
                <Menu indexId = {5}/>
                <Main content = {<ButtonDemo/>} />
            </>
        );
    }
}

export default ButtonPage;
