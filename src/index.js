import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './components/Animate/animate.css'
import UI from "./pages/UI/UI";
import {Route, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";

let root = <React.Fragment>
    <BrowserRouter>
        <Switch>
            <Route exact path={'/'} component={UI}/>
            <Route path={'/ui'} component={UI}/>
        </Switch>
    </BrowserRouter>
</React.Fragment>
ReactDOM.render(root, document.getElementById('root'));