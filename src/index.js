import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './components/Animate/animate.css'
import {Route, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";
import Test from "./components/UI/Test/Test";
import {Login, UI, Brand} from "./components";

let root = <React.Fragment>
    <Brand/>
    <Login/>
    <BrowserRouter>
        <Switch>
            <Route exact path={'/'} component={UI}/>
            <Route path={'/ui'} component={UI}/>
            <Route path={'/test'} component={Test}/>
        </Switch>
    </BrowserRouter>
</React.Fragment>
ReactDOM.render(root, document.getElementById('root'));