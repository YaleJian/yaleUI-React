import React, {Component} from 'react';
import Header from './BasePage/Header';
import Menu from './BasePage/Menu';
import Main from './BasePage/Main';
import DatepickerDemo from "../modules/Datepicker/DatepickerDemo";

/**
 * 日期选择器demo
 */
class DatepickerPage extends Component {
    render() {
        return (
            <>
                <Header/>
                <Menu indexId = {9}/>
                <Main content = {<DatepickerDemo />} />
            </>
        );
    }
}

export default DatepickerPage;
