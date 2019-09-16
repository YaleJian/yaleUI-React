import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import "normalize.css";
import * as serviceWorker from './serviceWorker';
import {Route, Switch} from "react-router";
import TreePage from "./pages/TreePage";
import RichTextEditorPage from "./pages/RichTextEditorPage";
import {BrowserRouter} from "react-router-dom";
import Login from  './modules/Login/Login';
import CloudDrivePage from "./pages/CloudDrivePage";
import ButtonPage from "./pages/ButtonPage";
import DesignStandardPage from "./pages/DesignStandardPage";
import InputPage from "./pages/InputPage";
import MessagePage from "./pages/MessagePage";
import TypographyPage from "./pages/TypographyPage";
import DatepickerPage from "./pages/DatepickerPage";
import PaginationPage from "./pages/PaginationPage";

let root = <>
    <Login/>
    <BrowserRouter>
        <Switch>
            <Route exact path={'/'} component={PaginationPage}/>
            <Route exact path={'/designStandard'} component={DesignStandardPage}/>
            <Route exact path={'/typography'} component={TypographyPage}/>
            <Route exact path={'/tree'} component={TreePage}/>
            <Route exact path={'/richTextEditor'} component={RichTextEditorPage}/>
            <Route exact path={'/cloudDrive'} component={CloudDrivePage}/>
            <Route exact path={'/button'} component={ButtonPage}/>
            <Route exact path={'/input'} component={InputPage}/>
            <Route exact path={'/message'} component={MessagePage}/>
            <Route exact path={'/date'} component={DatepickerPage}/>
            <Route exact path={'/pagination'} component={PaginationPage}/>
        </Switch>
    </BrowserRouter>
</>;
ReactDOM.render(root, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();