"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GlobalErrorHandler = void 0;
var routing_controllers_1 = require("routing-controllers");
var errors = {
    '23505': 'User already exists. Please change e-mail.',
    '420': 'Unknown user e-mail',
    '423': 'You are not an administrator',
    '424': 'Unknown userEmail field',
    '421': 'Incorrect password',
    '422': 'User is unauthorized',
    '0': 'Server error, try to repeat your request later.'
};
var GlobalErrorHandler = /** @class */ (function () {
    function GlobalErrorHandler() {
    }
    GlobalErrorHandler.prototype.error = function (error, request, response, next) {
        var frontendText = errors[error.code] || errors[error.message] || errors[0];
        var t = !isNaN(+error.message) ? +error.message : 500;
        response.status(t).json(__assign(__assign({}, error), { detail: frontendText, datailOld: error === null || error === void 0 ? void 0 : error.detail }));
        next();
    };
    GlobalErrorHandler = __decorate([
        (0, routing_controllers_1.Middleware)({ type: 'after' })
    ], GlobalErrorHandler);
    return GlobalErrorHandler;
}());
exports.GlobalErrorHandler = GlobalErrorHandler;
//# sourceMappingURL=globalErrorHandler.js.map