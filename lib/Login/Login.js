"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Login = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./login.css");

require("../Animate/animate.css");

var _qrcode = require("qrcode.react");

var _qrcode2 = _interopRequireDefault(_qrcode);

var _Axios = require("./../utils/Axios");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultUser = {
    phoneNumber: "",
    idNum: "",
    nickname: "昵称",
    password: "",
    userToken: "",
    headPortrait: "",
    pin: true
};

/**
 * 登陆注册
 */

var Login = function (_React$Component) {
    _inherits(Login, _React$Component);

    function Login(props) {
        _classCallCheck(this, Login);

        //获取本地缓存的用户信息和配置
        var _this2 = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));

        _initialiseProps.call(_this2);

        var autoLogin = localStorage.getItem("autoLogin") || false;
        var authState = _this2.getAuthState(autoLogin) || Login.NO_LOGIN;
        _this2.state = {
            type: "",
            user: defaultUser,
            phoneNumber: "",
            password: "",
            headPortrait: "",
            authState: authState,
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
            mini: false
        };
        return _this2;
    }

    _createClass(Login, [{
        key: "render",
        value: function render() {
            var authPage = "";
            switch (this.state.authState) {
                case Login.NO_LOGIN:
                    authPage = this.pages.noLogin();
                    break;
                case Login.LOGIN_SUCCESS:
                    authPage = this.pages.loginSuccess();
                    break;
                case Login.AUTH_CORE_PASSWORD:
                    authPage = this.pages.corePassword();
                    break;
                case Login.AUTH_VERIFICATION_CODE:
                    authPage = this.pages.verificationCode();
                    break;
                case Login.AUTH_PIN:
                    authPage = this.pages.pin();
                    break;
                case Login.AUTH_ACTION:
                    authPage = this.pages.action();
                    break;
                case Login.AUTH_QRCode:
                    authPage = this.pages.qrCode();
                    break;
                case Login.AGREEMENT:
                    authPage = this.pages.agreement();
                    break;
                default:
                    break;
            }
            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                this.state.authState === Login.AUTH_PIN ? _react2.default.createElement(
                    "div",
                    { className: "pin-mask" },
                    "Lock"
                ) : "",
                _react2.default.createElement(
                    "div",
                    { className: "ya-login animated fastest fadeInDownSmall" },
                    authPage
                )
            );
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            // 卸载异步操作设置状态
            this.setState = function (state, callback) {
                return "";
            };
        }
    }]);

    return Login;
}(_react2.default.Component);

Login.NO_LOGIN = 0;
Login.LOGIN_SUCCESS = 1;
Login.AUTH_CORE_PASSWORD = 2;
Login.AUTH_VERIFICATION_CODE = 3;
Login.AUTH_PIN = 4;
Login.AUTH_ACTION = 5;
Login.AUTH_QRCode = 6;
Login.AGREEMENT = 7;
Login.TYPE_LOGIN = 1;
Login.TYPE_REGISTER = 2;
Login.defaultProps = {};

var _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.getAuthState = function (autoLogin) {
        var pin = localStorage.getItem("pin");
        //登陆认证
        var cookieToken = _.Cookie.getCookie("userToken");
        if (cookieToken) {
            _this3.getUser();
        } else if (autoLogin) {
            var localToken = localStorage.getItem("userToken");
            if (localToken) {
                if (pin) {
                    return Login.AUTH_PIN;
                } else {
                    _.Cookie.setCookie("userToken", localToken);
                    _this3.getUser();
                }
            } else {
                return Login.NO_LOGIN;
            }
        } else {
            return Login.NO_LOGIN;
        }
    };

    this.pages = {

        noLogin: function noLogin() {
            var noLoginClass = "noLogin ";
            noLoginClass = _this3.state.authState === Login.NO_LOGIN ? noLoginClass : noLoginClass + "active";
            var loginPage = _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _this3.state.authState === Login.NO_LOGIN || _this3.state.type === Login.TYPE_LOGIN ? _react2.default.createElement(
                    "span",
                    { className: "loginEntrance", onClick: function onClick() {
                            return _this3.setState({
                                type: Login.TYPE_LOGIN,
                                authState: Login.AUTH_CORE_PASSWORD
                            });
                        } },
                    "\u767B\u9646"
                ) : "",
                _this3.state.authState === Login.NO_LOGIN || _this3.state.type === Login.TYPE_REGISTER ? _react2.default.createElement(
                    "span",
                    { className: "registerEntrance", onClick: function onClick() {
                            return _this3.setState({
                                type: Login.TYPE_REGISTER,
                                authState: Login.AUTH_CORE_PASSWORD
                            });
                        } },
                    "\u6CE8\u518C"
                ) : "",
                _this3.state.authState !== Login.NO_LOGIN ? _react2.default.createElement(
                    "span",
                    { className: "close", onClick: function onClick() {
                            return _this3.setState({ authState: Login.NO_LOGIN });
                        } },
                    _react2.default.createElement(_.Icon, {
                        name: "i-BAI-guanbi" })
                ) : ""
            );
            var hideBtn = _react2.default.createElement(_.Button, { className: "hideBtn white",
                content: _react2.default.createElement(_.Icon, { name: _this3.state.mini ? "i-BAI-zuojiantou" : "i-BAI-youjiantou" }),
                onClick: function onClick() {
                    return _this3.setState({ mini: !_this3.state.mini });
                } });
            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _this3.state.authState === Login.NO_LOGIN ? hideBtn : "",
                _this3.state.mini ? "" : _react2.default.createElement(
                    "div",
                    { className: noLoginClass },
                    " ",
                    loginPage
                )
            );
        },
        loginSuccess: function loginSuccess() {
            return _react2.default.createElement(_.User, { data: _this3.state.user, logout: _this3.logout.bind(_this3) });
        },
        corePassword: function corePassword() {
            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _this3.pages.noLogin(),
                _react2.default.createElement(
                    "form",
                    {
                        onSubmit: _this3.state.type === Login.TYPE_LOGIN ? _this3.auth.corePassword.bind(_this3) : _this3.register.bind(_this3) },
                    _react2.default.createElement(
                        "div",
                        { className: "corePassword" },
                        _react2.default.createElement("input", { placeholder: "\u624B\u673A\u53F7", type: "tel", value: _this3.state.phoneNumber,
                            pattern: "[0-9]*",
                            onInvalid: _this3.pages.inputInvalid.bind(_this3, "输入正确的手机号"),
                            required: true,
                            onChange: _this3.pages.phoneNumberEnter.bind(_this3) }),
                        _react2.default.createElement(
                            "div",
                            null,
                            _react2.default.createElement("input", { placeholder: "\u5BC6\u7801", type: _this3.state.passwordShow ? "text" : "password",
                                value: _this3.state.password,
                                onChange: _this3.pages.passwordEnter.bind(_this3) }),
                            _react2.default.createElement(
                                "span",
                                { className: "showPsw",
                                    onClick: function onClick() {
                                        return _this3.setState({ passwordShow: !_this3.state.passwordShow });
                                    } },
                                _react2.default.createElement(_.Icon, {
                                    name: _this3.state.passwordShow ? "i-showPsw" : "i-hidePsw" })
                            )
                        ),
                        _this3.state.type === Login.TYPE_REGISTER ? _react2.default.createElement(
                            "div",
                            null,
                            _react2.default.createElement("input", { placeholder: "\u786E\u8BA4\u5BC6\u7801", type: _this3.state.confirmPasswordShow ? "text" : "password",
                                defaultValue: _this3.state.confirmPassword,
                                onChange: _this3.pages.confirmPassword.bind(_this3) }),
                            _react2.default.createElement(
                                "span",
                                { className: "showPsw",
                                    onClick: function onClick() {
                                        return _this3.setState({ confirmPasswordShow: !_this3.state.confirmPasswordShow });
                                    } },
                                _react2.default.createElement(_.Icon, { name: _this3.state.confirmPasswordShow ? "i-showPsw" : "i-hidePsw" })
                            )
                        ) : ""
                    ),
                    _this3.pages.operate(),
                    _this3.pages.creditLogin(),
                    _this3.pages.autoLogin()
                )
            );
        },
        verificationCode: function verificationCode() {
            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _this3.pages.noLogin(),
                _react2.default.createElement(
                    "div",
                    { className: "verificationCode" },
                    _react2.default.createElement("input", { placeholder: "\u624B\u673A\u53F7", type: "tel", value: _this3.state.phoneNumber,
                        onChange: _this3.pages.phoneNumberEnter.bind(_this3) }),
                    _react2.default.createElement("input", { className: "verificationCodeEnter", placeholder: "\u77ED\u4FE1\u9A8C\u8BC1\u7801", type: "tel",
                        onChange: _this3.pages.verificationCodeEnter.bind(_this3) }),
                    _react2.default.createElement(
                        "button",
                        { className: "getVerificationCode",
                            onClick: _this3.vCode.getVerificationCode.bind(_this3) },
                        _this3.state.countdown60
                    )
                ),
                _this3.pages.operate(),
                _this3.pages.back(),
                _this3.pages.autoLogin()
            );
        },
        pin: function pin() {
            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.createElement(
                    "div",
                    { className: "pinTitle" },
                    "\u8BF7\u8F93\u5165PIN\u5BC6\u7801\u89E3\u9501"
                ),
                _react2.default.createElement(
                    "div",
                    { className: "pin ", onKeyUp: _this3.pages.pinKeyUp.bind() },
                    _react2.default.createElement("input", { autoFocus: true, type: "text", className: "pinText", maxLength: "1", name: "1",
                        onInput: _this3.pages.pinInput.bind(_this3), defaultValue: _this3.state.pin1, autoComplete: "off" }),
                    _react2.default.createElement("input", { type: "text", className: "pinText", maxLength: "1", name: "2",
                        onInput: _this3.pages.pinInput.bind(_this3), defaultValue: _this3.state.pin2, autoComplete: "off" }),
                    _react2.default.createElement("input", { type: "text", className: "pinText", maxLength: "1", name: "3",
                        onInput: _this3.pages.pinInput.bind(_this3), defaultValue: _this3.state.pin3, autoComplete: "off" }),
                    _react2.default.createElement("input", { type: "text", className: "pinText", maxLength: "1", name: "4",
                        onInput: _this3.pages.pinInput.bind(_this3), defaultValue: _this3.state.pin4, autoComplete: "off" })
                ),
                _this3.pages.back(),
                _this3.pages.clear()
            );
        },
        action: function action() {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.src = 'https://ssl.captcha.qq.com/TCaptcha.js';
            document.head.appendChild(script);

            var _this = _this3;
            window.callback = function (res) {
                console.log(res);
                // res（用户主动关闭验证码）= {ret: 2, ticket: null}
                // res（验证成功） = {ret: 0, ticket: "String", randstr: "String"}
                if (res.ret === 0) {
                    _this.auth.action(_this);
                }
            };

            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _this3.pages.noLogin(),
                _react2.default.createElement(
                    "div",
                    { className: "action " },
                    _react2.default.createElement(
                        "button",
                        { className: "actionBtn", id: "TencentCaptcha", "data-appid": "2030796655", "data-cbfn": "callback" },
                        "\u70B9\u51FB\u767B\u5F55"
                    )
                ),
                _this3.pages.back(),
                _this3.pages.clear()
            );
        },
        qrCode: function qrCode() {
            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _this3.pages.noLogin(),
                _react2.default.createElement(
                    "div",
                    { className: "qrCode" },
                    _react2.default.createElement(
                        "div",
                        { className: "qrCodeContent" },
                        _react2.default.createElement(_qrcode2.default, {
                            value: "https://yalejian.com" //value参数为生成二维码的链接
                            , size: 174 //二维码的宽高尺寸
                            , fgColor: "#000000" //二维码的颜色
                        })
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "qrCodeState" },
                        "\u626B\u7801\u6210\u529F"
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "tips" },
                        "\u626B\u4E00\u626B\u767B\u5F55"
                    )
                ),
                _this3.pages.autoLogin(),
                _this3.pages.back()
            );
        },
        agreement: function agreement() {
            return _react2.default.createElement(
                "div",
                { className: "agreement" },
                _react2.default.createElement(
                    "div",
                    { className: "title" },
                    "\u6CE8\u518C\u6761\u6B3E\u548C\u9690\u79C1\u653F\u7B56"
                ),
                _react2.default.createElement(
                    "div",
                    null,
                    _react2.default.createElement(
                        "strong",
                        null,
                        "\u540C\u610F\u4EE5\u4E0B\u6761\u6B3E"
                    ),
                    "\uFF1A",
                    _react2.default.createElement("br", null),
                    "1. \u9075\u5B88\u4E2D\u534E\u4EBA\u6C11\u5171\u548C\u56FD\u76F8\u5173\u6CD5\u5F8B\u6CD5\u89C4,\u4E0D\u53EF\u5371\u5BB3\u56FD\u5BB6\u5B89\u5168\u548C\u7A33\u5B9A\uFF0C\u7834\u574F\u6C11\u65CF\u56E2\u7ED3",
                    _react2.default.createElement("br", null),
                    "2. \u9075\u5B88\u672C\u7F51\u7AD9\u7684\u89C4\u5219\uFF1A\u4E0D\u4FB5\u72AF\u5176\u4ED6\u7528\u6237\u3001\u4E0D\u4FB5\u72AF\u672C\u7AD9\u53CA\u5176\u521B\u59CB\u7EF4\u62A4\u4EBA\u5458",
                    _react2.default.createElement("br", null),
                    "3. \u9075\u5B88\u9053\u5FB7\u6587\u660E,\u4E0D\u63A7\u5236\u8206\u8BBA",
                    _react2.default.createElement("br", null),
                    "4. \u9700\u8981\u914D\u5408\u5B9E\u540D\u8BA4\u8BC1\uFF0C\u5E76\u4E14\u4E00\u4EBA\u4E00\u8D26\u53F7",
                    _react2.default.createElement("br", null),
                    "4. \u5982\u6709\u8FDD\u80CC\u4EE5\u4E0A\u6761\u6B3E\uFF0C\u672C\u7AD9\u7EF4\u62A4\u4EBA\u5458\u6709\u6743\u8FDB\u884C\u5904\u7F5A\u548C\u6570\u636E\u4FE1\u606F\u4FEE\u6539",
                    _react2.default.createElement("br", null),
                    _react2.default.createElement("br", null),
                    _react2.default.createElement(
                        "strong",
                        null,
                        "\u627F\u8BFA\u4EE5\u4E0B\u9690\u79C1\u653F\u7B56\u548C\u5B89\u5168"
                    ),
                    "\uFF1A",
                    _react2.default.createElement("br", null),
                    "1. \u4FDD\u8BC1\u6CE8\u518C\u7684\u7528\u6237\u4FE1\u606F\u5B89\u5168\uFF0C\u7F51\u7AD9\u67B6\u6784\u8BBE\u8BA1\u4E4B\u521D\uFF0C\u5DF2\u7ECF\u659F\u914C\u518D\u4E09\u907F\u514D\u5B58\u50A8\u7528\u6237\u4FE1\u606F\uFF0C\u4E0D\u6536\u96C6\u7528\u6237\u4FE1\u606F\u725F\u5229",
                    _react2.default.createElement("br", null),
                    "2. \u91CD\u8981\u4FE1\u606F\u8FDB\u884C\u52A0\u5BC6\u548C\u8131\u654F\uFF0C\u5BC6\u6587\u5B58\u50A8\u7684\u4FE1\u606F\u4EC5\u7528\u4E8E\u8EAB\u4EFD\u8BA4\u8BC1\uFF0C\u4E0D\u8FDB\u884C\u89E3\u5BC6\u4E5F\u96BE\u4EE5\u89E3\u5BC6",
                    _react2.default.createElement("br", null),
                    "3. \u660E\u6587\u5B58\u50A8\u7684\u4FE1\u606F\u5373\u4F7F\u6CC4\u9732\u4E5F\u4E0D\u6D89\u53CA\u91CD\u8981\u9690\u79C1\u5B89\u5168",
                    _react2.default.createElement("br", null),
                    _react2.default.createElement("br", null),
                    _react2.default.createElement(
                        "strong",
                        null,
                        "\u9644\u5F55"
                    ),
                    "\uFF1A",
                    _react2.default.createElement("br", null),
                    "1. \u672C\u7F51\u7AD9\u6B63\u5728\u5EFA\u8BBE\u4E2D\uFF0C\u4EE5\u4E0A\u9690\u79C1\u653F\u7B56\u5B89\u5168\u4FDD\u969C\u9700\u8981\u5728\u7F51\u7AD9\u5EFA\u8BBE\u5B8C\u6BD5\u5B9E\u73B0",
                    _react2.default.createElement("br", null)
                ),
                _this3.pages.back()
            );
        },
        operate: function operate() {
            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.createElement(
                    "div",
                    { className: "operate" },
                    _this3.state.type === Login.TYPE_LOGIN ? _react2.default.createElement(
                        "button",
                        { type: "submit", className: "loginBtn" },
                        "\u767B\u5F55"
                    ) : "",
                    _this3.state.type === Login.TYPE_REGISTER ? _react2.default.createElement(
                        "button",
                        { type: "submit", className: "registerBtn" },
                        "\u6CE8\u518C"
                    ) : ""
                ),
                _this3.state.type === Login.TYPE_REGISTER ? _this3.pages.agreementConfirm() : ""
            );
        },
        agreementConfirm: function agreementConfirm() {
            return _react2.default.createElement(
                "div",
                { className: "agreementConfirm" },
                _react2.default.createElement("input", { type: "checkbox", id: "agreementInput", className: "agreementInput",
                    defaultChecked: _this3.state.agree, onChange: _this3.pages.agreeInput.bind(_this3) }),
                _react2.default.createElement(
                    "label",
                    { htmlFor: "agreementInput", className: "agreementText" },
                    "\u6211\u5DF2\u9605\u8BFB\u5E76\u540C\u610F",
                    _react2.default.createElement(
                        "span",
                        { className: "agreementLink",
                            onClick: function onClick() {
                                return _this3.setState({ authState: Login.AGREEMENT });
                            } },
                        "\u6B64\u6761\u6B3E"
                    )
                )
            );
        },
        autoLogin: function autoLogin() {
            return _react2.default.createElement(
                "div",
                { className: "autoLogin" },
                _react2.default.createElement("input", { type: "checkbox", id: "autoLoginInput", className: "autoLoginInput",
                    defaultChecked: _this3.state.autoLogin,
                    onChange: _this3.auth.autoLoginChange.bind(_this3) }),
                _react2.default.createElement(
                    "label",
                    { htmlFor: "autoLoginInput", className: "autoLoginText" },
                    "\u4EE5\u540E\u81EA\u52A8\u767B\u5F55"
                )
            );
        },
        creditLogin: function creditLogin() {
            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.createElement(
                    "div",
                    { className: "creditLogin" },
                    _react2.default.createElement(
                        "span",
                        { className: "verificationCodeLogin",
                            onClick: function onClick() {
                                return _this3.setState({ authState: Login.AUTH_VERIFICATION_CODE });
                            } },
                        _react2.default.createElement(_.Icon, {
                            name: "i-message" })
                    ),
                    _react2.default.createElement(
                        "span",
                        { className: "qrCodeLogin", onClick: function onClick() {
                                return _this3.setState({ authState: Login.AUTH_QRCode });
                            } },
                        _react2.default.createElement(_.Icon, {
                            name: "i-qrCode" })
                    ),
                    _react2.default.createElement(
                        "span",
                        null,
                        _react2.default.createElement(_.Icon, { name: "i-wechat" }),
                        " "
                    ),
                    _react2.default.createElement(
                        "span",
                        null,
                        _react2.default.createElement(_.Icon, { name: "i-QQ" }),
                        " "
                    )
                )
            );
        },

        back: function back() {
            return _react2.default.createElement(
                "div",
                { className: "loginBack",
                    onClick: function onClick() {
                        return _this3.setState({ authState: Login.AUTH_CORE_PASSWORD });
                    } },
                "\u8FD4\u56DE"
            );
        },
        phoneNumberEnter: function phoneNumberEnter(e) {
            _this3.setState({ phoneNumber: e.target.value.replace(/[^\d]/g, '') });
        },
        passwordEnter: function passwordEnter(e) {
            _this3.setState({ password: e.target.value.replace(/\s*/g, "") });
        },
        confirmPassword: function confirmPassword(e) {
            _this3.setState({ confirmPassword: e.target.value.replace(/\s*/g, "") });
        },
        verificationCodeEnter: function verificationCodeEnter(e) {
            _this3.setState({ verificationCode: e.target.value.replace(/[^\d]/g, '') });
        },
        agreeInput: function agreeInput() {

            _this3.setState({ agree: !_this3.state.agree });
        },
        pinKeyUp: function pinKeyUp(e) {
            // 删除/后退键往前，其他键盘往后
            if (e.target.className.indexOf("pinText") > -1) {
                if (e.keyCode === 46 || e.keyCode === 8) {
                    var prevNode = e.target.previousSibling;
                    if (prevNode && prevNode.className.indexOf("pinText") > -1) prevNode.focus();
                } else if (e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 96 && e.keyCode <= 105) {
                    var nextNode = e.target.nextElementSibling;
                    if (e.target.value && nextNode && nextNode.className.indexOf("pinText") > -1) nextNode.focus();
                } else if (e.keyCode === 229) {
                    // alert("请切换其他英文输入法")
                }
            }
        },
        pinInput: function pinInput(e) {
            var value = e.target.value.replace(/[^\d]/g, '');
            e.target.value = value;
            e.target.focus();
            if (value) {
                if (e.target.name === "4") {
                    _this3.auth.pin(value);
                } else {
                    var state = {};
                    state["pin" + e.target.name] = value;
                    _this3.setState(state);
                }
            }
        },
        clear: function clear() {
            return _react2.default.createElement(
                "div",
                { className: "clearLoginHistory", onClick: _this3.auth.clearLoginHistory.bind(_this3) },
                "\u6E05\u9664\u767B\u5F55\u8BB0\u5F55"
            );
        },
        inputInvalid: function inputInvalid(text, e) {
            e.currentTarget.setCustomValidity(text);
        }
    };
    this.auth = {
        //账号密码登录
        corePassword: function corePassword(e) {
            _this3.login(_this3.auth.getData());
            e.preventDefault();
        },
        verificationCode: function verificationCode() {
            var authState = 1;
            _this3.setState({ authState: authState });
        },
        pin: function pin(pin4) {
            //输到最后一个PIN立即校验
            var localPin = localStorage.getItem("pin");
            var thisPin = "" + _this3.state.pin1 + _this3.state.pin2 + _this3.state.pin3 + pin4;
            if (localPin === _.dataUtils.MD5(thisPin)) {
                //验证通过
                _this3.setState({ authState: Login.LOGIN_SUCCESS });
            }
        },
        action: function action() {
            //发送解除登陆锁定
            _this3.setState({ authState: Login.NO_LOGIN });
        },
        autoLoginChange: function autoLoginChange() {
            //设置以后登录标志
            if (!_this3.state.autoLogin) {
                localStorage.setItem("autoLogin", "true");
            } else {
                //清除登录记录
                localStorage.removeItem("autoLogin");
            }
            _this3.setState({ autoLogin: !_this3.state.autoLogin });
        },
        clearLoginHistory: function clearLoginHistory() {
            localStorage.clear();
            _this3.setState({ authState: 0 });
        },
        getData: function getData() {
            var data = void 0;
            var phoneNumber = _this3.state.phoneNumber;
            var password = _this3.state.password;
            var verificationCode = _this3.state.verificationCode;
            if (_this3.state.authState === Login.AUTH_CORE_PASSWORD) {
                data = {
                    phoneNumber: phoneNumber,
                    password: _.dataUtils.MD5(_.dataUtils.MD5(password))
                };
            } else if (_this3.state.authState === Login.AUTH_VERIFICATION_CODE) {
                data = {
                    phoneNumber: phoneNumber,
                    verificationCode: verificationCode
                };
            }
            return data;
        }

    };

    this.register = function (e) {
        e.preventDefault();
        if (_this3.state.password !== _this3.state.confirmPassword) {
            alert("两次密码不一致");
            return;
        }
        if (!_this3.state.agree) {
            alert("需要同意协议");
            return;
        }
        _Axios.axios.post('/service/user/register', _.dataUtils.object2FormData(_this3.auth.getData()), { withCredentials: true }).then(function (res) {
            (0, _.result)(res, function (user) {
                //如果开启了PIN
                if (user.pin) localStorage.setItem("pin", user.pin);
                _this3.setState({ authState: Login.LOGIN_SUCCESS, user: user });
            });
        }).catch(function (res) {
            console.log(res);
        });
    };

    this.login = function (user) {
        _Axios.axios.post('/service/user/login', _.dataUtils.object2FormData(user), { withCredentials: true }).then(function (res) {
            (0, _.result)(res, function (user) {
                _this3.setUser(user);
            });

            //登陆错误超过2次，开启动作验证
            if (res.data.code === 20006) {
                _this3.setState({ authState: Login.AUTH_ACTION, user: user });
            }
        });
    };

    this.logout = function () {
        _.Cookie.delCookie("userToken");
        localStorage.removeItem("userToken");
        _this3.setState({ authState: Login.NO_LOGIN });
    };

    this.getUser = function () {
        _Axios.axios.post('/service/user/getUser', "", { withCredentials: true }).then(function (res) {
            (0, _.result)(res, function (user) {
                _this3.setUser(user);
            });
        }).catch(function (e) {
            console.log(e);
        });
    };

    this.setUser = function (user) {
        if (localStorage.getItem("autoLogin")) {
            //配置了自动登录，使用localStorage存储的登录记录
            localStorage.setItem("userToken", _.Cookie.getCookie("userToken"));
            //如果设置了pin密码，则在本地存储下来，用于客户端页面验证
            if (user.pin) localStorage.setItem("pin", _.dataUtils.MD5(user.pin));
        } else {
            //自动登录关闭，清除
            localStorage.clear();
        }
        if (user) _this3.setState({ authState: Login.LOGIN_SUCCESS, user: user });
    };

    this.vCode = {

        getVerificationCode: function getVerificationCode() {

            if (!isNaN(_this3.state.countdown60)) return;

            var user = { phoneNumber: _this3.state.phoneNumber };
            _Axios.axios.post('/service/sms/single', _.dataUtils.object2FormData(user), { withCredentials: true }).then(function (res) {
                (0, _.result)(res, function () {
                    _this3.setState({ countdown60: 60 });
                    _this3.countdown60 = setInterval(function () {
                        return _this3.vCode.countdown60();
                    }, 1000);
                });
            }).catch(function (res) {
                console.log(res);
            });
        },
        countdown60: function countdown60() {
            var countdown60 = _this3.state.countdown60;
            if (countdown60 > 1) {
                _this3.setState({ countdown60: countdown60 - 1 });
            } else {
                clearInterval(_this3.countdown60);
                _this3.setState({ countdown60: "获取" });
            }
        }
    };
};

exports.Login = Login;
//# sourceMappingURL=Login.js.map