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
exports.__esModule = true;
exports.updateMeeting$ = exports.deleteMeeting$ = exports.createMeetings$ = exports.meetings$ = exports.lastValue$ = void 0;
// import { db } from '../index';
// export const getUsers = db.query('SELECT * FROM meetings.users');
var index_1 = require("../index");
var rxjs_1 = require("rxjs");
// =====================================================================================================================
/** Get last generated value for sync table*/
var lastValue$ = function () { return index_1.db.query(' select (last_value+1) as num  from meetings."meetings_meetingId_seq"'); };
exports.lastValue$ = lastValue$;
// =====================================================================================================================
/** Get meetings which are available to user*/
var meetings$ = function (userId) {
    var result = [];
    var lastMeetingId = 0;
    return index_1.db.query("\n    SELECT t1.* , t2.\"isCreator\" , t3.\"userId\",t3.email,\"firstName\",t3.\"secondName\",t3.photo\n    FROM  meetings.meetings as t1 join\n          meetings.\"mUsers\" as t2 on t1.\"meetingId\"=t2.\"meetingId\" left join\n          meetings.users as t3 ON t3.\"userId\"=t2.\"userId\"\n    WHERE t2.\"meetingId\" in (select \"meetingId\" from meetings.\"mUsers\" where \"userId\"='".concat(userId, "')\n    ORDER BY t1.datetime desc, t1.\"meetingId\" desc, t2.\"isCreator\"\n    ")).pipe((0, rxjs_1.map)(function (a) {
        var user = __assign(__assign({}, a), {
            meetingId: undefined,
            name: undefined,
            datetime: undefined,
            description: undefined
        });
        if (!lastMeetingId || lastMeetingId !== a.meetingId) {
            lastMeetingId = a.meetingId;
            result.push({
                meetingId: a.meetingId,
                name: a.name,
                datetime: +a.datetime,
                description: a.description,
                users: [__assign({}, user)]
            });
        }
        else {
            result[result.length - 1].users.push(__assign({}, user));
        }
        return result;
    }));
};
exports.meetings$ = meetings$;
// =====================================================================================================================
/** Meeting creation*/
var createMeetings$ = function (data, newMeetingId) {
    var results = [];
    return index_1.db.tx(function (t) {
        /** meeting creation*/
        var insertMeting = t.query("\n        INSERT INTO meetings.meetings (\"name\", \"description\", \"datetime\") \n        VALUES ('".concat(data.name, "','").concat(data.description, "','").concat(data.datetime, "') \n        RETURNING TRUE;"));
        results.push(insertMeting);
        /** add users to meeting*/
        data.users.forEach(function (item) {
            var insertUser = t.query("\n        INSERT INTO meetings.\"mUsers\" (\"meetingId\", \"userId\", \"isCreator\") \n        VALUES ('".concat(newMeetingId, "','").concat(item.userId, "','").concat(!!item.isCreator, "') \n        RETURNING TRUE;"));
            results.push(insertUser);
        });
        return (0, rxjs_1.forkJoin)(results);
    });
};
exports.createMeetings$ = createMeetings$;
// =====================================================================================================================
/** Meeting deletion*/
var deleteMeeting$ = function (meetingId) {
    var results = [];
    return index_1.db.tx(function (t) {
        var deleteMeting = t.query("\n        delete from meetings.meetings where \"meetingId\"=".concat(meetingId, "\n        RETURNING TRUE;"));
        results.push(deleteMeting);
        var deleteMUsers = t.query("\n        delete from meetings.\"mUsers\" where \"meetingId\"=".concat(meetingId, "\n        RETURNING TRUE;"));
        results.push(deleteMUsers);
        return (0, rxjs_1.forkJoin)(results);
    });
};
exports.deleteMeeting$ = deleteMeeting$;
// =====================================================================================================================
/** Meeting update*/
var updateMeeting$ = function (meeting) {
    var results = [];
    return index_1.db.tx(function (t) {
        var updateMeeting$ = t.query("\n      UPDATE meetings.meetings \n      SET name='".concat(meeting.name, "', datetime='").concat(meeting.datetime, "',description='").concat(meeting.description, "'\n      WHERE \"meetingId\"='").concat(meeting.meetingId, "'\n      RETURNING TRUE;"));
        results.push(updateMeeting$);
        var deleteMUsers = t.query("\n      delete from meetings.\"mUsers\" where \"meetingId\"=".concat(meeting.meetingId, "\n      RETURNING TRUE;"));
        results.push(deleteMUsers);
        meeting.users.forEach(function (item) {
            var insertUser = t.query("\n        INSERT INTO meetings.\"mUsers\" (\"meetingId\", \"userId\", \"isCreator\") \n        VALUES ('".concat(meeting.meetingId, "','").concat(item.userId, "','").concat(!!item.isCreator, "') \n        RETURNING TRUE;"));
            results.push(insertUser);
        });
        return (0, rxjs_1.forkJoin)(results);
    });
};
exports.updateMeeting$ = updateMeeting$;
// =====================================================================================================================
//# sourceMappingURL=meetings.db.js.map