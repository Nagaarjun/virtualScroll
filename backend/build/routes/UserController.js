"use strict";
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
        while (_) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authcall = exports.registerUsers = exports.getUsers = void 0;
var fs = require("fs");
var path = require("path");
var fsPromises = fs.promises;
var staticfile = path.resolve(__dirname, "../../../mocks", "users.json");
//TODO to move the file read and write to a common function
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var usersjson, parseuserjson, mailId, domain, filteredResults;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fsPromises.readFile(staticfile, "utf8")];
            case 1:
                usersjson = _a.sent();
                parseuserjson = JSON.parse(usersjson);
                mailId = req.headers.emailid;
                domain = mailId.split("@").pop();
                filteredResults = {
                    users: parseuserjson.users.filter(function (user) {
                        return user.domain === domain;
                    })
                };
                res.send(filteredResults);
                return [2 /*return*/];
        }
    });
}); };
exports.getUsers = getUsers;
var authcall = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var usersjson, parseuserjson;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fsPromises.readFile(staticfile, "utf8")];
            case 1:
                usersjson = _a.sent();
                parseuserjson = JSON.parse(usersjson);
                if (parseuserjson.users.find(function (user) {
                    return (user.emailId === req.headers.emailid &&
                        user.passWord === req.headers.password);
                }))
                    res.send("Authenticated Successfully");
                else {
                    res.status(401);
                    res.send("Not Authorised successfull");
                }
                return [2 /*return*/];
        }
    });
}); };
exports.authcall = authcall;
var registerUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var usersjson, parseuserjson, users, newUser, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, fsPromises.readFile(staticfile, "utf8")];
            case 1:
                usersjson = _a.sent();
                parseuserjson = JSON.parse(usersjson);
                users = parseuserjson.users;
                if (!users.find(function (user) { return user.emailId === req.body.emailId; })) return [3 /*break*/, 2];
                res.status(409).send("User already exists");
                return [3 /*break*/, 4];
            case 2:
                newUser = req.body;
                (newUser.kudosGivenTo = []), (newUser.numberOfKudosRemaining = 3);
                newUser.domain = newUser.emailId.split("@").pop();
                parseuserjson.users.push(newUser);
                return [4 /*yield*/, fsPromises.writeFile(staticfile, JSON.stringify(parseuserjson))];
            case 3:
                _a.sent();
                res.send("registration Successfull");
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                console.log(error_1);
                res.status(500);
                res.send("Error occured");
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.registerUsers = registerUsers;
