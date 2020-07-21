"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.User = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ = require("..");

require("./user.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var User = function (_React$Component) {
    _inherits(User, _React$Component);

    function User(props) {
        _classCallCheck(this, User);

        var _this = _possibleConstructorReturn(this, (User.__proto__ || Object.getPrototypeOf(User)).call(this, props));

        _this.pages = {
            mini: function mini() {
                var headPortraitTags = "",
                    headPortrait = _this.state.headPortrait;
                if (!headPortrait) {
                    headPortraitTags = _react2.default.createElement(_.Icon, null);
                } else if (typeof headPortrait[0] === "string") {
                    headPortraitTags = _react2.default.createElement("img", { src: headPortrait, alt: headPortrait });
                }
                var btnClass = "userSettingBtn";
                btnClass = _this.state.pageType === User.MINI ? btnClass : btnClass + " show";
                return _react2.default.createElement(
                    "div",
                    { className: "title" },
                    _this.state.pageType === User.MINI ? _react2.default.createElement(
                        "span",
                        { className: "user " },
                        _react2.default.createElement(
                            "span",
                            { className: "headPortrait" },
                            headPortraitTags
                        ),
                        _react2.default.createElement(
                            "span",
                            { className: "nickname" },
                            _this.state.nickname
                        )
                    ) : "",
                    _react2.default.createElement(
                        "span",
                        { className: btnClass, onClick: _this.setting.bind(_this) },
                        _react2.default.createElement(_.Icon, { name: "i-shezhi1" })
                    )
                );
            },
            home: function home() {
                return _react2.default.createElement(
                    _react2.default.Fragment,
                    null,
                    _this.pages.mini(),
                    _react2.default.createElement(
                        "form",
                        { className: "userSetting" },
                        _react2.default.createElement(
                            "div",
                            { className: "column" },
                            _react2.default.createElement(
                                "span",
                                { className: "left" },
                                "\u5934\u50CF"
                            ),
                            _react2.default.createElement(
                                "span",
                                { className: "right" },
                                _react2.default.createElement(
                                    "span",
                                    null,
                                    _react2.default.createElement(_.Icon, null)
                                ),
                                _react2.default.createElement(
                                    "span",
                                    { className: "rightArrow" },
                                    _react2.default.createElement(_.Icon, { name: "i-BAI-youjiantou" })
                                )
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "column" },
                            _react2.default.createElement(
                                "span",
                                { className: "left" },
                                "\u6635\u79F0"
                            ),
                            _react2.default.createElement(
                                "span",
                                { className: "right" },
                                _react2.default.createElement("input", { value: _this.state.nickname, onChange: _this.pages.nicknameEnter.bind(_this), maxLength: "8" }),
                                _react2.default.createElement(
                                    "span",
                                    { className: "rightArrow" },
                                    _react2.default.createElement(_.Icon, { name: "i-BAI-youjiantou" })
                                )
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "column" },
                            _react2.default.createElement(
                                "span",
                                { className: "left" },
                                "PIN"
                            ),
                            _react2.default.createElement(
                                "span",
                                { className: "right" },
                                _react2.default.createElement("input", { value: _this.state.pin, onChange: _this.pages.pinEnter.bind(_this), maxLength: "4",
                                    pattern: "[0-9]*",
                                    onInvalid: _this.pages.inputInvalid.bind(_this, "输入正确的PIN密码"),
                                    required: true }),
                                _react2.default.createElement(
                                    "span",
                                    { className: "rightArrow" },
                                    _react2.default.createElement(_.Icon, { name: "i-BAI-youjiantou" })
                                )
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "column" },
                            _react2.default.createElement(
                                "span",
                                { className: "left" },
                                "\u4E0B\u6B21\u81EA\u52A8\u767B\u5F55"
                            ),
                            _react2.default.createElement(
                                "span",
                                { className: "right", onClick: _this.pages.autoLoginEnter.bind(_this) },
                                _react2.default.createElement("input", { className: "ya-radio", type: "radio", checked: _this.state.autoLogin, onChange: function onChange() {
                                        return true;
                                    } }),
                                _react2.default.createElement(
                                    "span",
                                    { className: "radioText" },
                                    " "
                                )
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "operate" },
                            _react2.default.createElement(
                                "button",
                                { type: "submit" },
                                "\u4FDD\u5B58"
                            ),
                            _react2.default.createElement(
                                "button",
                                { onClick: function onClick() {
                                        return _this.setState({ pageType: User.MINI });
                                    } },
                                "\u8FD4\u56DE"
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "logout operate" },
                            _react2.default.createElement(
                                "button",
                                { onClick: _this.props.logout },
                                "\u9000\u51FA\u767B\u5F55"
                            )
                        )
                    )
                );
            },
            nicknameEnter: function nicknameEnter(e) {
                _this.setState({ nickname: e.target.value });
            },
            pinEnter: function pinEnter(e) {
                _this.setState({ pin: e.target.value });
            },
            autoLoginEnter: function autoLoginEnter() {
                //设置以后登录标志
                if (!_this.state.autoLogin) {
                    localStorage.setItem("autoLogin", "true");
                } else {
                    //清除登录记录
                    localStorage.removeItem("autoLogin");
                }
                _this.setState({ autoLogin: !_this.state.autoLogin });
            },
            inputInvalid: function inputInvalid(text, e) {
                e.currentTarget.setCustomValidity(text);
            }

        };

        _this.setting = function () {
            _this.setState({ pageType: User.HOME });
        };

        var autoLogin = localStorage.getItem("autoLogin") || false;
        var userData = props.data;
        _this.state = {
            headPortrait: userData.headPortrait || "",
            nickname: userData.nickname || "昵称",
            autoLogin: Boolean(autoLogin),
            pageType: User.MINI
        };
        return _this;
    }

    _createClass(User, [{
        key: "render",
        value: function render() {
            //页面切换
            var page = "";
            switch (this.state.pageType) {
                case User.MINI:
                    page = this.pages.mini();
                    break;
                case User.HOME:
                    page = this.pages.home();
                    break;
                default:
                    break;
            }

            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.createElement(
                    "div",
                    { className: "userArea" },
                    page
                )
            );
        }
    }]);

    return User;
}(_react2.default.Component);

User.MINI = 0;
User.HOME = 1;
User.defaultProps = {
    logout: function logout() {}
};
exports.User = User;
//# sourceMappingURL=User.js.map