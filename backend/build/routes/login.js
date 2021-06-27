"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authcall = void 0;
var authcall = function (req, res) {
    if (req.headers.username === "admin@admin.com" &&
        req.headers.password === "admin")
        res.send("Authenticated Successfully");
    else {
        res.status(401);
        res.send("Not Authorised successfull");
    }
};
exports.authcall = authcall;
