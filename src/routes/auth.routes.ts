import express from "express";
import { Request, Response, NextFunction } from "express";
import { validateJWTHandler } from "../handlers/auth/auth.handlers";
import { userLoginHandler } from "../handlers/users/users.handlers";

export const authRouter = express.Router();

authRouter.get(
  "/jwt-tests",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createdUser = await validateJWTHandler(req, res);

      res.status(201);
      res.send(createdUser);
    } catch (error) {
      next(error);
    }
  },
);

authRouter.post(
  "/jwt-tests",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createdUser = await validateJWTHandler(req, res);

      res.status(201);
      res.send(createdUser);
    } catch (error) {
      next(error);
    }
  },
);

authRouter.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await userLoginHandler(req, res);

      res.status(201);
      res.send(result);
    } catch (error) {
      console.log("Here in the error ?");
      
      next(error);
    }
  },
);
