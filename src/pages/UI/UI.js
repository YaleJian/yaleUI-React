import React, {Component} from 'react';
import ButtonDemo from "./Demo/Button/ButtonDemo";
import TreeDemo from "./Demo/Tree/TreeDemo";
import {Route} from "react-router";
import {Animate,CloudDrive} from "../../components";
import DesignStandard from "./DesignStandard";
import Typography from "./Typography";
import RichTextEditorDemo from "./Demo/RichTextEditor/RichTextEditorDemo";
import InputDemo from "./Demo/Input/InputDemo";
import MessageDemo from "./Demo/Message/MessageDemo";
import DatepickerDemo from "./Demo/Datepicker/DatepickerDemo";
import PaginationDemo from "./Demo/Pagination/PaginationDemo";
import ChartDemo from "./Demo/Chart/ChartDemo";
import Menu from "../common/Menu";
import Main from "../common/Main";

/**
 * API文档
 */
class UI extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        let path = this.props.match.path || "";

        let pages = <React.Fragment>
            <Route exact path={path} component={DesignStandard}/>
            <Route path={`${path}/designStandard`} component={DesignStandard}/>
            <Route path={`${path}/typography`} component={Typography}/>
            <Route path={`${path}/animation`} component={Animate}/>
            <Route path={`${path}/tree`} component={TreeDemo}/>
            <Route path={`${path}/richTextEditor`} component={RichTextEditorDemo}/>
            <Route path={`${path}/cloudDrive`} component={CloudDrive}/>
            <Route path={`${path}/button`} component={ButtonDemo}/>
            <Route path={`${path}/input`} component={InputDemo}/>
            <Route path={`${path}/message`} component={MessageDemo}/>
            <Route path={`${path}/date`} component={DatepickerDemo}/>
            <Route path={`${path}/pagination`} component={PaginationDemo}/>
            <Route path={`${path}/map`} component={PaginationDemo}/>
            <Route path={`${path}/chart`} component={ChartDemo}/>
            </React.Fragment>;

        let mainClass = this.state.sideLeft ? "sideLeft" : "";
        mainClass = this.state.sideRight ? mainClass +=" sideRight" : "";
        return (
            <React.Fragment>
                <Menu indexId={1} path={this.props.location.pathname} setSideLeft = {this.setSideLeft.bind(this)}/>
                <Main className={mainClass}>
                    {pages}
                </Main>
            </React.Fragment>
        );
    }

    setSideLeft = (sideLeft) =>{
        this.setState({sideLeft});
    };
    setSideRight = (sideRight) =>{
        this.setState({sideRight});
    }
}

export default UI;
