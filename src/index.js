import React from 'react';
import ReactDOM from 'react-dom';
import './components/layout/css/index.css';
import './components/UI/Demo/Button/Animate/animate.css'
import {Route, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";
import Test from "./components/UI/Test/Test";
import {Login, UI, Brand} from "./components";

let root = <>
    <Login/>
    <BrowserRouter>
        <Switch>
            <Route exact path={'/'} component={UI}/>
            <Route path={'/ui'} component={UI}/>
            <Route path={'/test'} component={Test}/>
        </Switch>
    </BrowserRouter>
</>
ReactDOM.render(root, document.getElementById('root'));