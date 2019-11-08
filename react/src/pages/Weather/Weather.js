import React from 'react';
import './weather.css'
import Header from "../common/Header";
import Main from "../common/Main";
import {Map} from "react-amap";
class Weather extends React.Component{

    constructor(props){
        super(props);
        this.getData();
        this.state = {

        }
    }
    render() {
        return <>
            <Header children={"天气"} className={"center"}/>
            <Main>
                <div className={"ya-weather"}>
                    <Map amapkey={"3e1573216986096de00822a455a0a852"} />
                </div>
            </Main>
        </>;
    }

    getData = ()=>{


    }
}
export default Weather;