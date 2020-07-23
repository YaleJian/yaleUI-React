import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './components/Animate/animate.css'
import UI from "./pages/UI/UI";
import {Route, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";
import Test from "./pages/Test/Test";

let root = <React.Fragment>
    <BrowserRouter>
        <Switch>
            <Route exact path={'/'} component={UI}/>
            <Route path={'/ui'} component={UI}/>
            <Route path={'/test'} component={Test}/>
        </Switch>
    </BrowserRouter>
</React.Fragment>
ReactDOM.render(root, document.getElementById('root'));