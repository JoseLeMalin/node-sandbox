"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexRouter = void 0;
var express_1 = require("express");
exports.indexRouter = (0, express_1.Router)();
/* GET home page. */
exports.indexRouter.get("/", function (req, res, next) {
    try {
        res.render("index", { title: "Express" });
    }
    catch (error) {
        next(error);
    }
});
