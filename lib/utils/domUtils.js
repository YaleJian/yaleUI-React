"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var animated_up = " animated fastest fadeOutUp";
var DomUtils = {
    remove: function remove(obj) {
        obj.className += animated_up;
        setTimeout(function () {
            return obj.remove();
        }, 300);
    },
    getTextLength: function getTextLength(text) {
        var span = document.createElement("span");
        span.innerHTML = text;
        document.body.appendChild(span);
        var length = span.offsetWidth;
        span.remove();
        return length;
    }
};
exports.DomUtils = DomUtils;
//# sourceMappingURL=domUtils.js.map