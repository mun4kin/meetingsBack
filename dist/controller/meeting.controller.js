"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.MeetingController = void 0;
var routing_controllers_1 = require("routing-controllers");
require("reflect-metadata");
var meetings_db_1 = require("../db/meetings.db");
var rxjs_1 = require("rxjs");
var midAuthentication_1 = require("../middleware/midAuthentication");
var express_http_context_1 = __importDefault(require("express-http-context"));
var meetings_types_1 = require("../model/meetings.types");
var MeetingController = /** @class */ (function () {
    function MeetingController() {
    }
    MeetingController.prototype.getMeetings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = express_http_context_1["default"].get('userId');
                        return [4 /*yield*/, (0, rxjs_1.lastValueFrom)((0, meetings_db_1.meetings$)(user), { defaultValue: [] })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MeetingController.prototype.createMeetings = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var newMeeting;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, rxjs_1.lastValueFrom)((0, meetings_db_1.lastValue$)())];
                    case 1:
                        newMeeting = _a.sent();
                        return [4 /*yield*/, (0, rxjs_1.lastValueFrom)((0, meetings_db_1.createMeetings$)(data, newMeeting['num']))];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MeetingController.prototype.deleteMeetings = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, rxjs_1.lastValueFrom)((0, meetings_db_1.deleteMeeting$)(data.meetingId))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MeetingController.prototype.updateMeetings = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, rxjs_1.lastValueFrom)((0, meetings_db_1.updateMeeting$)(data))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    __decorate([
        (0, routing_controllers_1.Get)('/all'),
        (0, routing_controllers_1.UseBefore)(midAuthentication_1.Authentication),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], MeetingController.prototype, "getMeetings");
    __decorate([
        (0, routing_controllers_1.Post)('/create'),
        (0, routing_controllers_1.UseBefore)(midAuthentication_1.Authentication),
        __param(0, (0, routing_controllers_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [meetings_types_1.IMeetings]),
        __metadata("design:returntype", Promise)
    ], MeetingController.prototype, "createMeetings");
    __decorate([
        (0, routing_controllers_1.Post)('/delete'),
        (0, routing_controllers_1.UseBefore)(midAuthentication_1.Authentication),
        __param(0, (0, routing_controllers_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [meetings_types_1.IMeetings]),
        __metadata("design:returntype", Promise)
    ], MeetingController.prototype, "deleteMeetings");
    __decorate([
        (0, routing_controllers_1.Put)('/update'),
        (0, routing_controllers_1.UseBefore)(midAuthentication_1.Authentication),
        __param(0, (0, routing_controllers_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [meetings_types_1.IMeetings]),
        __metadata("design:returntype", Promise)
    ], MeetingController.prototype, "updateMeetings");
    MeetingController = __decorate([
        (0, routing_controllers_1.Controller)(),
        (0, routing_controllers_1.JsonController)('/meeting')
    ], MeetingController);
    return MeetingController;
}());
exports.MeetingController = MeetingController;
//# sourceMappingURL=meeting.controller.js.map