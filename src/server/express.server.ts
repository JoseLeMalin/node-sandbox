import createError from "http-errors";
import cors from "cors";
import express, { json } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { indexRouter } from "./../routes/index";
import { usersRouter } from "./../routes/users";
import { cryptoModuleRouter } from "./../routes/crypto-module";
import { errorHandler } from "./../utils/express/errors";
import { authRouter } from "./../routes/auth.routes";
import { cardsRouter } from "../routes/cards.routes.";

/**
 * Init of the Expressjs app
 */
export const buildExpressServer = () => {
  const app = express();

  // view engine setup
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "jade");
  app.use(logger("dev"));
  app.use(cors(), json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "public")));
  // error handler
  app.use(errorHandler);

  app.use("/", indexRouter);
  app.use("/users", usersRouter);
  app.use("/auth", authRouter);
  app.use("/crypto-module", cryptoModuleRouter);
  app.use("/cards", cardsRouter);

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

  return { app };
};
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

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
