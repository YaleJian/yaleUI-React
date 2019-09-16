import React, { Component } from 'react';
class Main extends Component{


    render() {

        return (
            <div className="ya-main">
                {this.props.content}
            </div>
        )
    }

}

export default Main;