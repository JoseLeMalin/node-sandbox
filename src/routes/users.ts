import express from "express";
import { Request, Response, NextFunction } from "express";

export const usersRouter = express.Router();

/* GET users listing. */
usersRouter.get("/",(req: Request, res: Response, next: NextFunction) => {
  try {
    res.send("respond with a resource");
  } catch (error) {
    next(error);
  }
});


