import React, {Component} from 'react';
import Header from './BasePage/Header';
import Menu from './BasePage/Menu';
import Main from './BasePage/Main';
import MessageDemo from "../modules/message/MessageDemo";

/**
 * 提示
 */
class MessagePage extends Component {
    render() {
        return (
            <>
                <Header/>
                <Menu indexId={7}/>
                <Main content={<MessageDemo/>}/>
            </>
        );
    }
}

export default MessagePage;
