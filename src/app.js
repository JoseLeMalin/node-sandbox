"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_errors_1 = require("http-errors");
var express_1 = require("express");
var path_1 = require("path");
var cookie_parser_1 = require("cookie-parser");
var morgan_1 = require("morgan");
var index_1 = require("./routes/index");
var users_1 = require("./routes/users");
var app = (0, express_1.default)();
var port = process.env.PORT || 3000;
// view engine setup
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "jade");
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use("/", index_1.indexRouter);
app.use("/users", users_1.usersRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    try {
        res.locals.message = err.toString();
        res.locals.error = req.app.get("env") === "development" ? err : {};
        // render the error page
    }
    catch (error) {
        //res.status(err.status || 500);
        //res.("error");
        next();
    }
});
app.listen(port, function () {
    console.log("Server running at http://localhost:".concat(port));
});
module.exports = app;
