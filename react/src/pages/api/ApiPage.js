import React, {Component} from 'react';
import Header from '../common/Header';
import Menu from '../common/Menu';
import Main from '../common/Main';
import ButtonDemo from "../../modules/Button/ButtonDemo";
import TreeDemo from "../../modules/Tree/TreeDemo";
import {Route, Switch} from "react-router";
import DesignStandardPage from "./DesignStandardPage";
import TypographyPage from "./TypographyPage";
import RichTextEditorDemo from "../../modules/RichTextEditor/RichTextEditorDemo";
import CloudDrive from "../../modules/CloudDrive/CloudDrive";
import InputDemo from "../../modules/Input/InputDemo";
import MessageDemo from "../../modules/message/MessageDemo";
import DatepickerDemo from "../../modules/Datepicker/DatepickerDemo";
import PaginationDemo from "../../modules/Pagination/PaginationDemo";

/**
 * API文档
 */
class ApiPage extends Component {
    render() {
        let path = this.props.match.path;
        let content = <>
            <Route exact path={path} component={DesignStandardPage}/>
            <Route path={`${path}/designStandard`} component={DesignStandardPage}/>
            <Route path={`${path}/typography`} component={TypographyPage}/>
            <Route path={`${path}/tree`} component={TreeDemo}/>
            <Route path={`${path}/richTextEditor`} component={RichTextEditorDemo}/>
            <Route path={`${path}/cloudDrive`} component={CloudDrive}/>
            <Route path={`${path}/button`} component={ButtonDemo}/>
            <Route path={`${path}/input`} component={InputDemo}/>
            <Route path={`${path}/message`} component={MessageDemo}/>
            <Route path={`${path}/date`} component={DatepickerDemo}/>
            <Route path={`${path}/pagination`} component={PaginationDemo}/>
        </>;

        return (
            <>
                <Header/>
                <Menu indexId={1} path={this.props.location.pathname}/>
                <Main content={content}/>
            </>
        );
    }
}

export default ApiPage;
