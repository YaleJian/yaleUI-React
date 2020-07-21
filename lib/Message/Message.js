"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Message = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

require("./message.css");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 提示框
 */
var Message = function Message(content, config, autoRemove) {

    //数据格式校验处理
    if (content) {
        if ((typeof content === "undefined" ? "undefined" : _typeof(content)) === "object") content = JSON.stringify(content);
    } else {
        return;
    }

    var isConfirm = config || false;
    config = config || { yes: "Yes", no: "No" };
    var animated_down = " animated fastest fadeInDown";
    var messageContainer = _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(
            "div",
            { className: "ya-message-container" + animated_down },
            isConfirm ? _react2.default.createElement(
                "div",
                { className: "ya-message-title" },
                config.title || "Message"
            ) : null,
            _react2.default.createElement(
                "div",
                { className: "ya-message-content" },
                content
            ),
            _react2.default.createElement(_.Button, { className: "closeBtn white", content: _react2.default.createElement(_.Icon, { name: "i-close" }) }),
            isConfirm ? _react2.default.createElement(
                "div",
                { className: "ya-groupBtn" },
                _react2.default.createElement(_.Button, { className: "red ya-yesBtn", content: config.yes || "Yes" }),
                _react2.default.createElement(_.Button, { className: "grey ya-noBtn", content: config.no || "No" })
            ) : null
        )
    );
    var message = _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(
            "div",
            { className: "ya-message" },
            messageContainer
        )
    );

    var messageTag = document.getElementsByClassName("ya-messages");
    var renderTag = document.createElement("div");
    var thisNotice = void 0;
    //判断页面是否是第一次提示，是先放置一个提示区
    if (messageTag.length === 0) {
        renderTag.className = "ya-messages";
        document.body.appendChild(renderTag);
        _reactDom2.default.render(message, renderTag);
        thisNotice = renderTag.getElementsByClassName("ya-message")[0];
    } else {
        renderTag.className = "ya-message";
        messageTag[0].appendChild(renderTag);
        _reactDom2.default.render(messageContainer, renderTag);
        thisNotice = renderTag;
    }

    //给当前消息的按钮绑定移除事件
    var closeBtn = thisNotice.getElementsByClassName("closeBtn")[0];
    closeBtn.onclick = function () {
        _.DomUtils.remove(thisNotice);
    };
    //给确认按钮绑定事件
    if (isConfirm) {
        var noBtn = thisNotice.getElementsByClassName("ya-noBtn")[0];
        noBtn.onclick = function () {
            _.DomUtils.remove(thisNotice);
        };
        //点击Yes回调事件
        if (typeof config.func === "function") {
            var yesBtn = thisNotice.getElementsByClassName("ya-yesBtn")[0];
            yesBtn.onclick = function () {
                thisNotice.remove();
                config.func();
            };
        }
    }

    //提示默认自动移除
    if (autoRemove) {
        setTimeout(function () {
            _.DomUtils.remove(thisNotice);
        }, _.dataUtils.isNaN(autoRemove) ? autoRemove : 2000);
    }
};

exports.Message = Message;
//# sourceMappingURL=Message.js.map