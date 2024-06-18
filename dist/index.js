"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.db = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var routing_controllers_1 = require("routing-controllers");
var user_controller_1 = require("./controller/user.controller");
var body_parser_1 = __importDefault(require("body-parser"));
var express_http_context_1 = __importDefault(require("express-http-context"));
var pg_reactive_1 = __importDefault(require("pg-reactive"));
var globalErrorHandler_1 = require("./middleware/globalErrorHandler");
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var swaggerDocument = __importStar(require("../src/swagger/openapi.json"));
var cors_1 = __importDefault(require("cors"));
var meeting_controller_1 = require("./controller/meeting.controller");
dotenv_1["default"].config();
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
var port = process.env.PORT || 3000;
// =====================================================================================================================
/** db connection*/
exports.db = new pg_reactive_1["default"]({
    host: 'ec2-54-246-85-151.eu-west-1.compute.amazonaws.com',
    database: 'derbn5lnj0iukq',
    user: 'uxggkygkspduiy',
    port: 5432,
    password: 'cf927aeab131cedb1e20b3f748f5644e33bf471ca54b503423244e7fcef94898',
    ssl: { rejectUnauthorized: false }
});
// =====================================================================================================================
/** Express global settings*/
var app = (0, express_1["default"])();
app.use(body_parser_1["default"].json());
app.use(express_http_context_1["default"].middleware);
app.use((0, cors_1["default"])());
(0, routing_controllers_1.useExpressServer)(app, {
    controllers: [user_controller_1.UserController, meeting_controller_1.MeetingController],
    middlewares: [globalErrorHandler_1.GlobalErrorHandler],
    defaultErrorHandler: false
});
app.use('/api-docs', swagger_ui_express_1["default"].serve, swagger_ui_express_1["default"].setup(swaggerDocument));
app.listen(port, function () { return console.log("Running on port http://localhost:".concat(port, "/api-docs")); });
//# sourceMappingURL=index.js.map