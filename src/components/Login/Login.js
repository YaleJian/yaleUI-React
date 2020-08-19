import React from "react";
import "./login.css";
import "../Animate/animate.css";
import QRCode from 'qrcode.react';
import {axios} from './../utils/Axios';
import {Icon,User,result,Cookie,Button,dataUtils} from '..';

const defaultUser = {
    phoneNumber: "",
    idNum: "",
    nickname: "昵称",
    password: "",
    userToken: "",
    headPortrait: "",
    pin: true,
};

/**
 * 登陆注册
 */
class Login extends React.Component {
    static NO_LOGIN = 0;//未登录界面
    static LOGIN_SUCCESS = 1;//登录成功
    static AUTH_PASSWORD = 2;//密码验证
    static AUTH_CODE = 3;//验证码验证
    static AUTH_PIN = 4;//PIN验证
    static AUTH_ACTION = 5;//动作验证
    static AUTH_QRCode = 6;//二维码登录
    static AGREEMENT = 7;//协议

    static LOGIN = 1;//登录
    static REGISTER = 2;//注册

    static defaultProps = {};

    constructor(props) {
        super(props);

        //获取本地缓存的用户信息和配置
        let autoLogin = localStorage.getItem("autoLogin") || false;
        let authState = this.getAuthState(autoLogin) || Login.NO_LOGIN;
        this.state = {
            type: "",
            user: defaultUser,
            phoneNumber: "",
            password: "",
            headPortrait: "",
            authState,
            autoLogin: Boolean(autoLogin),
            agree: false,
            verificationCode: "",
            countdown60: "获取",
            pin1: "",
            pin2: "",
            pin3: "",
            pin4: "",
            passwordShow: false,
            confirmPasswordShow: false,
            mini: false,
        };
    }

    render() {
        let authPage = "";
        switch (this.state.authState) {
            case Login.NO_LOGIN :
                authPage = this.pages.noLogin();
                break;
            case Login.LOGIN_SUCCESS :
                authPage = this.pages.loginSuccess();
                break;
            case Login.AUTH_PASSWORD  :
                authPage = this.pages.corePassword();
                break;
            case Login.AUTH_CODE :
                authPage = this.pages.verificationCode();
                break;
            case Login.AUTH_PIN :
                authPage = this.pages.pin();
                break;
            case Login.AUTH_ACTION :
                authPage = this.pages.action();
                break;
            case Login.AUTH_QRCode :
                authPage = this.pages.qrCode();
                break;
            case Login.AGREEMENT :
                authPage = this.pages.agreement();
                break;
            default:
                break;
        }
        return <>
            {this.state.authState === Login.AUTH_PIN ? <div className="pin-mask">Lock</div> : ""}
            <div className="ya-login animated fastest fadeInDownSmall">
                {authPage}
            </div>
        </>
    }

    componentWillUnmount() {
        // 卸载异步操作设置状态
        /*this.setState = (state, callback) => {
            return "";
        }*/
    }

    getAuthState = (autoLogin) => {
        let pin = localStorage.getItem("pin");
        //登陆认证
        let cookieToken = Cookie.getCookie("userToken");
        if (cookieToken) {
            //1.先取cooke用户信息
            this.getUser();
        } else if (autoLogin) {
            //2.取本地存储用户信息
            let localToken = localStorage.getItem("userToken");
            if (localToken) {
                if (pin) {
                    return Login.AUTH_PIN;
                } else {
                    Cookie.setCookie("userToken", localToken);
                    this.getUser();
                }
            } else {
                return Login.NO_LOGIN;
            }
        } else {
            return Login.NO_LOGIN;
        }
    };

    //页面
    pages = {
        //未登录页面，其他页面共用此页面作为标题
        noLogin: () => {
            let noLoginClass = "noLogin ";
            noLoginClass = this.state.authState === Login.NO_LOGIN ? noLoginClass : noLoginClass + "active";
            let loginPage = <>
                <span className="loginEntrance" onClick={this.pageAction.login.bind(this)}
                      hidden={this.state.authState !== Login.NO_LOGIN && this.state.type !== Login.LOGIN}>登陆</span>
                <span className="registerEntrance" onClick={this.pageAction.register.bind()}
                      hidden={this.state.authState !== Login.NO_LOGIN && this.state.type !== Login.REGISTER}>注册</span>
                <span className="close" onClick={this.pageAction.close.bind()}
                      hidden={this.state.authState === Login.NO_LOGIN}>
                        <Icon name="i-BAI-guanbi"/>
                    </span>
            </>;
            let hideBtn = <Button className={"hideBtn white"} onClick={() => this.setState({mini: !this.state.mini})}><Icon name={this.state.mini ? "i-BAI-wode" : "i-BAI-youjiantou"}/></Button>;
            return <>
                {this.state.authState === Login.NO_LOGIN ? hideBtn : ""}
                {this.state.mini ? "" : <div className={noLoginClass}> {loginPage}</div>}
            </>
        },
        //登录成功
        loginSuccess: () => {
            return <User data={this.state.user} logout={this.logout.bind(this)}/>
        },
        //密码登录
        corePassword: () => {
            return <>
                {this.pages.noLogin()}
                <form
                    onSubmit={this.state.type === Login.LOGIN ? this.auth.corePassword.bind(this) : this.register.bind(this)}>
                    <div className="corePassword">
                        <input placeholder="手机号" type="tel" value={this.state.phoneNumber}
                               pattern="[0-9]*"
                               onInvalid={this.pageAction.inputInvalid.bind(this, "输入正确的手机号")}
                               required
                               onChange={this.pageAction.phoneNumberEnter.bind(this)}/>
                        <div>
                            <input className={"pswInput"} placeholder="密码" type={this.state.passwordShow ? "text" : "password"}
                                   value={this.state.password}
                                   onChange={this.pageAction.passwordEnter.bind(this)}/>
                            <span className="showPsw"
                                  onClick={() => this.setState({passwordShow: !this.state.passwordShow})}><Icon
                                name={this.state.passwordShow ? "i-showPsw" : "i-hidePsw"}/></span>
                        </div>
                        {this.state.type === Login.REGISTER ?
                            <div>
                                <input placeholder="确认密码" type={this.state.confirmPasswordShow ? "text" : "password"}
                                       defaultValue={this.state.confirmPassword}
                                       onChange={this.pageAction.confirmPassword.bind(this)}/>
                                <span className="showPsw"
                                      onClick={() => this.setState({confirmPasswordShow: !this.state.confirmPasswordShow})}>
                                    <Icon name={this.state.confirmPasswordShow ? "i-showPsw" : "i-hidePsw"}/>
                                </span>
                            </div>
                            : ""}
                    </div>
                    {this.pages.operate()}
                    {this.pages.creditLogin()}
                    {this.pages.autoLogin()}
                </form>
            </>
        },
        //验证码登录
        verificationCode: () => {
            return <>
                {this.pages.noLogin()}
                <div className="verificationCode">
                    <div className={"verificationItem"}>
                        <input placeholder="手机号" type="tel" value={this.state.phoneNumber}
                               onChange={this.pageAction.phoneNumberEnter.bind(this)}/>
                    </div>
                    <div className={"verificationItem"}>
                        <input className="verificationCodeEnter" placeholder="短信验证码" type="tel"
                               onChange={this.pageAction.verificationCodeEnter.bind(this)}/>
                        <div className="getVerificationCode"
                             onClick={this.vCode.getVerificationCode.bind(this)}>{this.state.countdown60}</div>
                    </div>
                </div>
                {this.pages.operate()}
                {this.pageAction.back()}
                {this.pages.autoLogin()}
            </>
        },
        //PIN登录
        pin: () => {
            return <>
                <div className="pinTitle">请输入PIN密码解锁</div>
                <div className="pin " onKeyUp={this.pageAction.pinKeyUp.bind()}>
                    <input autoFocus={true} type="text" className="pinText" maxLength="1" name="1"
                           onInput={this.pageAction.pinInput.bind(this)} defaultValue={this.state.pin1}
                           autoComplete="off"/>
                    <input type="text" className="pinText" maxLength="1" name="2"
                           onInput={this.pageAction.pinInput.bind(this)} defaultValue={this.state.pin2}
                           autoComplete="off"/>
                    <input type="text" className="pinText" maxLength="1" name="3"
                           onInput={this.pageAction.pinInput.bind(this)} defaultValue={this.state.pin3}
                           autoComplete="off"/>
                    <input type="text" className="pinText" maxLength="1" name="4"
                           onInput={this.pageAction.pinInput.bind(this)} defaultValue={this.state.pin4}
                           autoComplete="off"/>
                </div>
                {this.pageAction.back()}
                {this.pageAction.clear()}
            </>
        },
        //动作检测
        action: () => {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.src = 'https://ssl.captcha.qq.com/TCaptcha.js';
            document.head.appendChild(script);

            let _this = this;
            window.callback = (res) => {
                console.log(res);
                // res（用户主动关闭验证码）= {ret: 2, ticket: null}
                // res（验证成功） = {ret: 0, ticket: "String", randstr: "String"}
                if (res.ret === 0) {
                    _this.auth.action(_this);
                }
            };

            return <>
                {this.pages.noLogin()}
                <div className="action ">
                    <button className="actionBtn" id="TencentCaptcha" data-appid="2030796655" data-cbfn="callback">点击登录
                    </button>
                </div>
                {this.pageAction.back()}
                {this.pageAction.clear()}
            </>
        },
        //二维码登录
        qrCode: () => {
            return <>
                {this.pages.noLogin()}
                <div className="qrCode">
                    <div className="qrCodeContent">
                        <QRCode
                            value={"https://yalejian.com"}  //value参数为生成二维码的链接
                            size={174} //二维码的宽高尺寸
                            fgColor="#000000"  //二维码的颜色
                        />
                    </div>
                    <div className="qrCodeState">扫码成功</div>
                    <div className="tips">扫一扫登录</div>
                </div>
                {this.pages.autoLogin()}
                {this.pageAction.back()}
            </>
        },
        //协议条款
        agreement: () => {
            return <div className="agreement">
                <div className="title">注册条款和隐私政策</div>
                <div>
                    <strong>同意以下条款</strong>：<br/>
                    1. 遵守中华人民共和国相关法律法规,不可危害国家安全和稳定，破坏民族团结<br/>
                    2. 遵守本网站的规则：不侵犯其他用户、不侵犯本站及其创始维护人员<br/>
                    3. 遵守道德文明,不控制舆论<br/>
                    4. 需要配合实名认证，并且一人一账号<br/>
                    4. 如有违背以上条款，本站维护人员有权进行处罚和数据信息修改<br/>
                    <br/>
                    <strong>承诺以下隐私政策和安全</strong>：<br/>
                    1. 保证注册的用户信息安全，网站架构设计之初，已经斟酌再三避免存储用户信息，不收集用户信息牟利<br/>
                    2. 重要信息进行加密和脱敏，密文存储的信息仅用于身份认证，不进行解密也难以解密<br/>
                    3. 明文存储的信息即使泄露也不涉及重要隐私安全<br/>
                    <br/>
                    <strong>附录</strong>：<br/>
                    1. 本网站正在建设中，以上隐私政策安全保障需要在网站建设完毕实现<br/>
                </div>
                {this.pageAction.back()}
            </div>;
        },
        //操作按钮
        operate: () => {
            return <React.Fragment>
                <div className="operate">
                    {this.state.type === Login.LOGIN ?
                        <button type="submit" className="loginBtn">登录</button> : ""}
                    {this.state.type === Login.REGISTER ?
                        <button type="submit" className="registerBtn">注册</button> : ""}
                </div>
                {this.state.type === Login.REGISTER ? this.pages.agreementConfirm() : ""}
            </React.Fragment>;

        },
        //阅读同意
        agreementConfirm: () => {
            return <div className="agreementConfirm">
                <input type="checkbox" id="agreementInput" className="agreementInput"
                       defaultChecked={this.state.agree} onChange={this.pageAction.agreeInput.bind(this)}/>
                <label htmlFor="agreementInput" className="agreementText">我已阅读并同意
                    <span className="agreementLink"
                          onClick={() => this.setState({authState: Login.AGREEMENT})}>此条款</span>
                </label>
            </div>
        },
        //自动登录
        autoLogin: () => {
            return <div className="autoLogin">
                <input type="checkbox" id="autoLoginInput" className="autoLoginInput"
                       defaultChecked={this.state.autoLogin}
                       onChange={this.auth.autoLoginChange.bind(this)}/>
                <label htmlFor="autoLoginInput" className="autoLoginText">以后自动登录</label>
            </div>
        },
        //其他方式登录
        creditLogin: () => {
            return <React.Fragment>
                <div className="creditLogin">
                    <span className="verificationCodeLogin"
                          onClick={() => this.setState({authState: Login.AUTH_CODE})}><Icon
                        name="i-message"/></span>
                    <span className="qrCodeLogin" onClick={() => this.setState({authState: Login.AUTH_QRCode})}><Icon
                        name="i-qrCode"/></span>
                    <span><Icon name="i-wechat"/> </span>
                    <span><Icon name="i-QQ"/> </span>
                </div>
            </React.Fragment>
        },
    };

    //页面切换
    pageAction = {
        back: () => {
            return <div className="loginBack"
                        onClick={() => this.setState({authState: Login.AUTH_PASSWORD})}>返回</div>
        },
        phoneNumberEnter: (e) => {
            this.setState({phoneNumber: e.target.value.replace(/[^\d]/g, '')});
        },
        passwordEnter: (e) => {
            this.setState({password: e.target.value.replace(/\s*/g, "")});
        },
        confirmPassword: (e) => {
            this.setState({confirmPassword: e.target.value.replace(/\s*/g, "")});
        },
        verificationCodeEnter: (e) => {
            this.setState({verificationCode: e.target.value.replace(/[^\d]/g, '')});
        },
        agreeInput: () => {
            this.setState({agree: !this.state.agree});
        },
        pinKeyUp: (e) => {
            // 删除/后退键往前，其他键盘往后
            if (e.target.className.indexOf("pinText") > -1) {
                if (e.keyCode === 46 || e.keyCode === 8) {
                    let prevNode = e.target.previousSibling;
                    if (prevNode && prevNode.className.indexOf("pinText") > -1) prevNode.focus();
                } else if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
                    let nextNode = e.target.nextElementSibling;
                    if (e.target.value && nextNode && nextNode.className.indexOf("pinText") > -1) nextNode.focus();
                } else if (e.keyCode === 229) {
                    // alert("请切换其他英文输入法")
                }
            }
        },
        pinInput: (e) => {
            let value = e.target.value.replace(/[^\d]/g, '');
            e.target.value = value;
            e.target.focus();
            if (value) {
                if (e.target.name === "4") {
                    this.auth.pin(value);
                } else {
                    let state = {};
                    state["pin" + e.target.name] = value;
                    this.setState(state);
                }
            }
        },
        clear: () => {
            return <div className="clearLoginHistory" onClick={this.auth.clearLoginHistory.bind(this)}>清除登录记录</div>
        },
        inputInvalid: (text, e) => {
            e.currentTarget.setCustomValidity(text);
        },
        login: () => {
            this.setState({type: Login.LOGIN, authState: Login.AUTH_PASSWORD})
        },
        register: () => {
            this.setState({type: Login.REGISTER, authState: Login.AUTH_PASSWORD})
        },
        close: () => {
            this.setState({authState: Login.NO_LOGIN})
        }
    }

    //认证
    auth = {
        //账号密码登录
        corePassword: (e) => {
            this.login(this.auth.getData());
            e.preventDefault();
        },
        verificationCode: () => {
            let authState = 1;
            this.setState({authState});
        },
        pin: (pin4) => {
            //输到最后一个PIN立即校验
            let localPin = localStorage.getItem("pin");
            let thisPin = "" + this.state.pin1 + this.state.pin2 + this.state.pin3 + pin4;
            if (localPin === dataUtils.MD5(thisPin)) {
                //验证通过
                this.setState({authState: Login.LOGIN_SUCCESS});
            }
        },
        action: () => {
            //发送解除登陆锁定
            this.setState({authState: Login.NO_LOGIN});
        },
        autoLoginChange: () => {
            //设置以后登录标志
            if (!this.state.autoLogin) {
                localStorage.setItem("autoLogin", "true");
            } else {
                //清除登录记录
                localStorage.removeItem("autoLogin");
            }
            this.setState({autoLogin: !this.state.autoLogin});
        },
        clearLoginHistory: () => {
            localStorage.clear();
            this.setState({authState: 0});
        },
        getData: () => {
            let data;
            let phoneNumber = this.state.phoneNumber;
            let password = this.state.password;
            let verificationCode = this.state.verificationCode;
            if (this.state.authState === Login.AUTH_PASSWORD) {
                data = {
                    phoneNumber,
                    password: dataUtils.MD5(dataUtils.MD5(password)),
                };
            } else if (this.state.authState === Login.AUTH_CODE) {
                data = {
                    phoneNumber,
                    verificationCode,
                };
            }
            return data;
        }

    };

    //注册请求
    register = (e) => {
        e.preventDefault();
        if (this.state.password !== this.state.confirmPassword) {
            alert("两次密码不一致");
            return;
        }
        if (!this.state.agree) {
            alert("需要同意协议");
            return;
        }
        axios.post('/service/user/register', dataUtils.object2FormData(this.auth.getData()), {withCredentials: true})
            .then((res) => {
                result(res, (user) => {
                    //如果开启了PIN
                    if (user.pin) localStorage.setItem("pin", user.pin);
                    this.setState({authState: Login.LOGIN_SUCCESS, user});
                });
            })
            .catch(function (res) {
                console.log(res);
            });
    };

    //登录请求
    login = (user) => {
        axios.post('/service/user/login', dataUtils.object2FormData(user), {withCredentials: true})
            .then((res) => {
                result(res, (user) => {
                    this.setUser(user)
                });

                //登陆错误超过2次，开启动作验证
                if (res.data.code === 20006) {
                    this.setState({authState: Login.AUTH_ACTION, user});
                }
            })
    };

    //登出
    logout = () => {
        Cookie.delCookie("userToken");
        localStorage.removeItem("userToken");
        this.setState({authState: Login.NO_LOGIN});
    };

    //获取用户信息
    getUser = () => {
        axios.post('/service/user/getUser', "", {withCredentials: true})
            .then((res) => {
                result(res, (user) => {
                    this.setUser(user)
                });
            })
            .catch(function (e) {
                console.log(e);
            });
    };

    //设置用户信息
    setUser = (user) => {
        if (localStorage.getItem("autoLogin")) {
            //配置了自动登录，使用localStorage存储的登录记录
            localStorage.setItem("userToken", Cookie.getCookie("userToken"));
            //如果设置了pin密码，则在本地存储下来，用于客户端页面验证
            if (user.pin) localStorage.setItem("pin", dataUtils.MD5(user.pin));
        } else {
            //自动登录关闭，清除
            localStorage.clear();
        }
        if (user) this.setState({authState: Login.LOGIN_SUCCESS, user});
    };

    //验证码请求
    vCode = {
        getVerificationCode: () => {

            if (!isNaN(this.state.countdown60)) return;

            let user = {phoneNumber: this.state.phoneNumber};
            axios.post('/service/sms/single', dataUtils.object2FormData(user), {withCredentials: true})
                .then((res) => {
                    result(res, () => {
                        this.setState({countdown60: 60});
                        this.countdown60 = setInterval(() => this.vCode.countdown60(), 1000);
                    });
                })
                .catch(function (res) {
                    console.log(res);
                });
        },
        countdown60: () => {
            let countdown60 = this.state.countdown60;
            if (countdown60 > 1) {
                this.setState({countdown60: countdown60 - 1});
            } else {
                clearInterval(this.countdown60);
                this.setState({countdown60: "获取"});
            }
        },
    }

}

export {Login};