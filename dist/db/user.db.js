"use strict";
exports.__esModule = true;
exports.isAdmin$ = exports.userByEmail$ = exports.registration$ = exports.allUsers$ = void 0;
var index_1 = require("../index");
var rxjs_1 = require("rxjs");
// =====================================================================================================================
/** Get all available users  for adding to meeting, limit 4 is threshold*/
var allUsers$ = function (search, me) {
    var users = [];
    return index_1.db.query("\n    SELECT \"firstName\",\"secondName\",email,photo,\"userId\" FROM meetings.users\n    WHERE \"userId\" != '".concat(me, "' and (  LOWER(\"firstName\") LIKE '%").concat(search, "%' \n          OR LOWER(\"secondName\" )LIKE '%").concat(search, "%' OR LOWER(email) LIKE '%").concat(search, "%')\n    LIMIT 4\n    ")).pipe((0, rxjs_1.map)(function (user) {
        users.push(user);
        return users;
    }));
};
exports.allUsers$ = allUsers$;
// =====================================================================================================================
/** New user registration */
var registration$ = function (user, pass) { return index_1.db.tx(function (t) {
    return t.query("\n    INSERT INTO meetings.users (\"email\", \"firstName\", \"secondName\",\"password\",\"photo\") \n    VALUES ('".concat(user.email, "','").concat(user.firstName, "','").concat(user.secondName, "','").concat(pass, "',\n            ").concat(user.photo ? '\'' + user.photo + '\'' : 'DEFAULT', ") \n    RETURNING TRUE;"));
}); };
exports.registration$ = registration$;
// =====================================================================================================================
/** Get user by them e-mail */
var userByEmail$ = function (email) { return index_1.db.query("SELECT * FROM meetings.users WHERE email = '".concat(email, "'")); };
exports.userByEmail$ = userByEmail$;
var isAdmin$ = function (email) { return index_1.db.query("SELECT * FROM meetings.users WHERE \"isAdmin\" = true and email = '".concat(email, "'")); };
exports.isAdmin$ = isAdmin$;
//# sourceMappingURL=user.db.js.map