"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
var express_1 = require("express");
exports.usersRouter = express_1.default.Router();
/* GET users listing. */
exports.usersRouter.get("/", function (req, res, next) {
    try {
        res.send("respond with a resource");
    }
    catch (error) {
        next(error);
    }
});
