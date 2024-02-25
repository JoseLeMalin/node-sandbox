// import createError from "http-errors";
// import cors from "cors";
// import express, { json } from "express";
// import path from "path";
// import cookieParser from "cookie-parser";
// import logger from "morgan";
// import { indsessionParser: unknownexRouter } from "./routes/index";
// import { usersRouter } from "./routes/users";
// import { cryptoModuleRouter } from "./routes/crypto-module";
// import { errorHandler } from "./utils/express/errors";
// import { authRouter } from "./routes/auth.routes";
//
// export const app = express();
// const port = process.env.PORT || 3000;
//
// // view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");
// app.use(logger("dev"));
// app.use(cors(), json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
// // error handler
// app.use(errorHandler);
//
// app.use("/", indexRouter);
// app.use("/users", usersRouter);
// app.use("/auth", authRouter);
// app.use("/crypto-module", cryptoModuleRouter);
//
// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// app.use(
//   (
//     err: ErrorRequestHandler,
//     req: Request,
//     res: Response,
//     next: NextFunction,
//   ) => {
//     // set locals, only providing error in development
//     try {
//       res.locals.message = err.toString();
//       res.locals.error = req.app.get("env") === "development" ? err : {};
//
//       // render the error page
//     } catch (error) {
//       //res.status(err.status || 500);
//       //res.("error");
//       next();
//     }
//   },
// );

import session from "express-session";
import { buildExpressServer } from "./server/express.server";
import { buildWebsocket } from "./server/ws.server";
import { createServer } from "http";

// const sessionParser = session({
//   saveUninitialized: false,
//   secret: "$eCuRiTy",
//   resave: false,
// });

const port = process.env.PORT || 3000;
const portWS = process.env.PORT || 8080;

const { app } = buildExpressServer();
const server = createServer(app);

const { wss } = buildWebsocket(server);
console.log("wss: ", wss);

// app.use(sessionParser);

server.listen(portWS, function () {
  console.log("Listening on http://localhost:8080");
  console.log("process: ", process.env.JWT_PASSPHRASE);
});
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

// module.exports = app;
