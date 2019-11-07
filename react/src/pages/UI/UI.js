import React, {Component} from 'react';
import Header from '../common/Header';
import Menu from '../common/Menu';
import Main from '../common/Main';
import ButtonDemo from "../../modules/Button/ButtonDemo";
import TreeDemo from "../../modules/Tree/TreeDemo";
import {Route, Switch} from "react-router";
import DesignStandard from "./DesignStandard";
import Typography from "./Typography";
import RichTextEditorDemo from "../../modules/RichTextEditor/RichTextEditorDemo";
import CloudDrive from "../../modules/CloudDrive/CloudDrive";
import InputDemo from "../../modules/Input/InputDemo";
import MessageDemo from "../../modules/message/MessageDemo";
import DatepickerDemo from "../../modules/Datepicker/DatepickerDemo";
import PaginationDemo from "../../modules/Pagination/PaginationDemo";
import Animation from "../../modules/animate/Animate";

/**
 * API文档
 */
class UI extends Component {
    render() {
        let path = this.props.match.path;

        let pages = <>
            <Route exact path={path} component={DesignStandard}/>
            <Route path={`${path}/designStandard`} component={DesignStandard}/>
            <Route path={`${path}/typography`} component={Typography}/>
            <Route path={`${path}/animation`} component={Animation}/>
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
                <Header children={"Yale JS"}/>
                <Menu indexId={1} path={this.props.location.pathname}/>
                <Main className={"left"}>
                    {pages}
                </Main>
            </>
        );
    }
}

export default UI;
