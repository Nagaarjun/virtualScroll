"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var router = express_1.Router();
exports.router = router;
router.get("/users", function (req, res) {
    if (req.headers.username === "admin@admin.com" &&
        req.headers.password === "admin")
        res.send("Authenticated Successfully");
    else {
        res.status(401);
        res.send("Not Authorised successfull");
    }
});
