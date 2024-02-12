import express from "express";
import { Request, Response, NextFunction } from "express";

export const usersRouter = express.Router();

/* GET users listing. */
usersRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("In the users get endpoint");

      res.status(201);
      res.send(`respond with a resource`);
    } catch (error) {
      next(error);
    }
  },
);
