"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Authentication = void 0;
var express_http_context_1 = __importDefault(require("express-http-context"));
var jsonwebtoken_1 = require("jsonwebtoken");
function Authentication(request, response, next) {
    try {
        var resultAuth = (0, jsonwebtoken_1.verify)(request.headers.authorization.replace('Bearer ', ''), 'super_strong_password');
        express_http_context_1["default"].set('userId', resultAuth.data.userId);
        next();
    }
    catch (e) {
        throw new Error('422');
    }
}
exports.Authentication = Authentication;
//# sourceMappingURL=midAuthentication.js.map