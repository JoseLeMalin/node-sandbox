import { ErrorRequestHandler } from "express-serve-static-core";

export enum messageCode {
  WRONG_QUERY_PARAMS = "WRONG_QUERY_PARAMS",
  CREDENTIALS_NOT_SATISFYING = "CREDENTIALS_NOT_SATISFYING",
  FILEREAD_FAILED = "FILEREAD_FAILED",
  MISSING_ENV_VARIABLE = "MISSING_ENV_VARIABLE",
  UNHANDLED_ERROR = "UNHANDLED_ERROR",
  USER_NOT_FOUND = "USER_NOT_FOUND",
  CARD_NOT_FOUND = "CARD_NOT_FOUND",
}

export class ApiError extends Error {
  /**
   * @param statusCode Http Status code
   * @param messageCode Functionnal message code used by the front-end to display an appropriate error message
   */
  constructor(
    public errorCode: number,
    public messageLabel: messageCode,
    public error?: unknown | { message: string },
  ) {
    super((error as { message: string })?.message || messageLabel);
  }
}

/**
 * Error handler middleware
 * @param err - The error passed to the next() function (ex: next(err))
 */

export const errorHandler: ErrorRequestHandler = (
  err: ApiError | Error,
  req,
  res,
  next,
) => {
  if ((err as ApiError).error) console.log((err as ApiError).error);

  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof ApiError) {
    return res.status(err.errorCode).json({
      status: err.errorCode,

      message: err.messageLabel,
    });
  } else {
    return res.status(500).json({
      status: 500,

      message: messageCode.UNHANDLED_ERROR,
    });
  }
};
