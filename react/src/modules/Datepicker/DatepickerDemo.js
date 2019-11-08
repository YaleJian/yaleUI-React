import React from "react";
import Datepicker from "./Datepicker";
import Input from "../Input/Input";
class DatepickerDemo extends React.Component{
    static defaultProps = {

    };
    constructor(props){
        super(props);
        this.state = {
            date : {
                year :"",
                month :"",
                day :"",
                hours :"",
                minutes :"",
            }
        }
    }

    render() {
        return <div className={"datepickerDemo"}>
            <Input type="popUp"
                   content={<Datepicker getSelectData={this.getSelectData.bind(this)} showLunar={false}/>}
                   value={this.state.date.year+"年"+this.state.date.month+"月"+this.state.date.day+"日 "+this.state.date.hours+":"+this.state.date.minutes}
                   placeholder={"请选择"}/>
            <Input type="popUp"
                   content={<Datepicker getSelectData={this.getSelectData.bind(this)} showLunar={true}/>}
                   value={this.state.date.year+"年"+this.state.date.month+"月"+this.state.date.day+"日 "+this.state.date.hours+":"+this.state.date.minutes}
                   placeholder={"请选择"}/>
        </div>
    }

    getSelectData(date){
        this.setState({date});
    }
}

export default DatepickerDemo;