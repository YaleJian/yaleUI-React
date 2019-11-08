import React from "react";
import Icon from "../utils/Icon";
import "./user.css";

class User extends React.Component {
    static MINI = 0;
    static HOME = 1;

    static defaultProps = {
        logout : function () {

        },
    };

    constructor(props) {
        super(props);
        let autoLogin = localStorage.getItem("autoLogin") || false;
        let userData = props.data;
        this.state = {
            headPortrait: userData.headPortrait || "",
            nickname: userData.nickname || "昵称",
            autoLogin: Boolean(autoLogin),
            pageType: User.MINI
        }
    }

    render() {
        //页面切换
        let page = "";
        switch (this.state.pageType) {
            case User.MINI :
                page = this.pages.mini();
                break;
            case User.HOME :
                page = this.pages.home();
                break;
            default:
                break;
        }

        return <>
            <div className="userArea">
                {page}
            </div>
        </>
    }

    pages = {
        mini: () => {
            let headPortraitTags = "", headPortrait = this.state.headPortrait;
            if (!headPortrait) {
                headPortraitTags = <Icon/>;
            } else if (typeof headPortrait[0] === "string") {
                headPortraitTags = <img src={headPortrait} alt={headPortrait}/>
            }
            let btnClass = "userSettingBtn";
            btnClass = this.state.pageType === User.MINI ? btnClass : btnClass + " show";
            return <div className="title">
                {this.state.pageType === User.MINI ? <span className="user ">
                        <span className="headPortrait">{headPortraitTags}</span>
                        <span className="nickname">{this.state.nickname}</span>
                    </span> : ""}
                <span className={btnClass} onClick={this.setting.bind(this)}><Icon name="i-shezhi1"/></span>
            </div>
        },
        home: () => {
            return <>
                {this.pages.mini()}
                <form className="userSetting">
                    <div className="column">
                        <span className="left">头像</span>
                        <span className="right">
                            <span><Icon/></span>
                            <span className="rightArrow"><Icon name="i-BAI-youjiantou"/></span>
                        </span>
                    </div>
                    <div className="column">
                        <span className="left">昵称</span>
                        <span className="right">
                            <input value={this.state.nickname} onChange={this.pages.nicknameEnter.bind(this)} maxLength="8"/>
                            <span className="rightArrow"><Icon name="i-BAI-youjiantou"/></span>
                        </span>
                    </div>
                    <div className="column">
                        <span className="left">PIN</span>
                        <span className="right">
                            <input value={this.state.pin} onChange={this.pages.pinEnter.bind(this)} maxLength="4"
                                   pattern="[0-9]*"
                                   onInvalid={this.pages.inputInvalid.bind(this, "输入正确的PIN密码")}
                                   required/>
                            <span className="rightArrow"><Icon name="i-BAI-youjiantou"/></span>
                        </span>
                    </div>
                    <div className="column">
                        <span className="left">下次自动登录</span>
                        <span className="right" onClick={this.pages.autoLoginEnter.bind(this)}>
                            <input className="ya-radio" type="radio" checked={this.state.autoLogin} onChange={() => {
                                return true
                            }}/>
                            <span className="radioText"> </span>
                        </span>
                    </div>
                    <div className="operate">
                        <button type="submit">保存</button>
                        <button onClick={() => this.setState({pageType: User.MINI})}>返回</button>
                    </div>
                    <div className="logout operate">
                        <button onClick={this.props.logout}>退出登录</button>
                    </div>
                </form>
            </>
        },
        nicknameEnter: (e) => {
            this.setState({nickname: e.target.value})
        },
        pinEnter: (e) => {
            this.setState({pin: e.target.value})
        },
        autoLoginEnter: () => {
            //设置以后登录标志
            if (!this.state.autoLogin) {
                localStorage.setItem("autoLogin", "true");
            } else {
                //清除登录记录
                localStorage.removeItem("autoLogin");
            }
            this.setState({autoLogin: !this.state.autoLogin});
        },
        inputInvalid: (text, e) => {
            e.currentTarget.setCustomValidity(text);
        },

    };

    setting = () => {
        this.setState({pageType: User.HOME});
    };

}

export default User;