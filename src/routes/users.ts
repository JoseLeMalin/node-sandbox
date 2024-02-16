import express from "express";
import { Request, Response, NextFunction } from "express";
import { userCreate, userLoginHandler, validateJWTHandler } from "../handlers/users/users.handlers";

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

usersRouter.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await userLoginHandler(req, res);

      res.status(201);
      res.send(result );
    } catch (error) {
      next(error);
    }
  },
);

usersRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createdUser = await userCreate(req, res);

      res.status(201);
      res.send(createdUser);
    } catch (error) {
      next(error);
    }
  },
);
