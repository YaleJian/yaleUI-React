"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.result = undefined;

var _ = require("..");

var result = function result(res, func) {
    if (res.data.code === 10000) {
        func(res.data.data);
    } else {
        console.log(res);
        (0, _.Message)(res.data.msg);
    }
};
exports.result = result;
//# sourceMappingURL=result.js.map