import { Request, Response, Router, NextFunction } from "express";
import { handlerCipher } from "../handlers/crypto-module/crypto-module.handlers";

export const cryptoModuleRouter = Router();

cryptoModuleRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("In the cryptomodule get endpoint");

      // const result = await handlerHashPassword(req, res);
      res.status(201);
      res.send(`Result crypto module: `);
    } catch (error) {
      next(error);
    }
  },
);

cryptoModuleRouter.get(
  "/cypher",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("In the cryptomodule get endpoint");

      const result = await handlerCipher();
      res.status(201);
      res.send(`Result crypto module: ${result?.resultEncrypt} - ${result?.resultDecrypt}`);
    } catch (error) {
      next(error);
    }
  },
);
