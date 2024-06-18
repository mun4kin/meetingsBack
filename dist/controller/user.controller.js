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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.UserController = void 0;
var routing_controllers_1 = require("routing-controllers");
require("reflect-metadata");
var rxjs_1 = require("rxjs");
var user_db_1 = require("../db/user.db");
var argon2 = __importStar(require("argon2"));
var jwt = __importStar(require("jsonwebtoken"));
var midAuthentication_1 = require("../middleware/midAuthentication");
var express_http_context_1 = __importDefault(require("express-http-context"));
var midAdmin_1 = require("../middleware/midAdmin");
var user_types_1 = require("../model/user.types");
/**
 * @swagger
 * tags:
 *   - name: API functions
 *     description: >-
 *       User Controller
 * */
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController_1 = UserController;
    UserController.prototype.adminLogin = function (userEmail) {
        return __awaiter(this, void 0, void 0, function () {
            var currentUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, rxjs_1.firstValueFrom)((0, user_db_1.userByEmail$)(userEmail), { defaultValue: undefined })];
                    case 1:
                        currentUser = _a.sent();
                        if (!currentUser) {
                            throw new Error('424');
                        }
                        return [2 /*return*/, currentUser];
                }
            });
        });
    };
    // =======================================================================================================================================
    UserController.prototype.login = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var currentUser, correctPassword, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, rxjs_1.firstValueFrom)((0, user_db_1.userByEmail$)(data.email), { defaultValue: undefined })];
                    case 1:
                        currentUser = _b.sent();
                        if (!currentUser) {
                            throw new Error('420');
                        }
                        return [4 /*yield*/, argon2.verify(currentUser.password, data.password)];
                    case 2:
                        correctPassword = _b.sent();
                        if (!correctPassword) {
                            throw new Error('421');
                        }
                        // if user is admin
                        _a = data.userEmail;
                        if (!_a) 
                        // if user is admin
                        return [3 /*break*/, 4];
                        return [4 /*yield*/, this.adminLogin(data.userEmail)];
                    case 3:
                        _a = (currentUser = _b.sent());
                        _b.label = 4;
                    case 4:
                        // if user is admin
                        _a;
                        delete currentUser.password;
                        return [2 /*return*/, __assign(__assign({}, currentUser), { token: UserController_1.generateJWT(currentUser) })];
                }
            });
        });
    };
    // =======================================================================================================================================
    UserController.prototype.registration = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var passwordHashed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, argon2.hash(data.password)];
                    case 1:
                        passwordHashed = _a.sent();
                        return [4 /*yield*/, (0, rxjs_1.lastValueFrom)((0, user_db_1.registration$)(data, passwordHashed))];
                    case 2: return [2 /*return*/, !!(_a.sent())];
                }
            });
        });
    };
    // =======================================================================================================================================
    UserController.prototype.sendAll = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!data.search) {
                            return [2 /*return*/, []];
                        }
                        return [4 /*yield*/, (0, rxjs_1.lastValueFrom)((0, user_db_1.allUsers$)(data.search, express_http_context_1["default"].get('userId')), { defaultValue: [] })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // =======================================================================================================================================
    UserController.generateJWT = function (user) {
        var data = {
            userId: user.userId,
            email: user.email
        };
        var signature = 'super_strong_password';
        var expiration = '6h';
        return jwt.sign({ data: data }, signature, { expiresIn: expiration });
    };
    var UserController_1;
    __decorate([
        (0, routing_controllers_1.Post)('/login'),
        (0, routing_controllers_1.UseBefore)(midAdmin_1.Admin),
        __param(0, (0, routing_controllers_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [user_types_1.ILogin]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "login");
    __decorate([
        (0, routing_controllers_1.Post)('/registration'),
        __param(0, (0, routing_controllers_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "registration");
    __decorate([
        (0, routing_controllers_1.Post)('/all'),
        (0, routing_controllers_1.UseBefore)(midAuthentication_1.Authentication),
        __param(0, (0, routing_controllers_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "sendAll");
    UserController = UserController_1 = __decorate([
        (0, routing_controllers_1.Controller)(),
        (0, routing_controllers_1.JsonController)('/users')
    ], UserController);
    return UserController;
}());
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map