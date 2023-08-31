import React from 'react';
import ReactDOM from 'react-dom';
import './components/layout/css/index.css';
import './components/UI/Demo/Button/Animate/animate.css'
import {Route, Routes} from "react-router";
import {BrowserRouter} from "react-router-dom";
import Test from "./components/UI/Test/Test";
import {Login, UI} from "./components";
import {createRoot} from "react-dom/client";

let root = <>
    <Login/>
    <BrowserRouter>
        <Routes>
            <Route exact path={'*'} element={<UI/>}/>
            <Route path={'/ui'} element={<UI/>}/>
            <Route path={'/test'} element={<Test/>}/>
        </Routes>
    </BrowserRouter>
</>
createRoot(document.getElementById('root')).render(root);