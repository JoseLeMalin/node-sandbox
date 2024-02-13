import { Router } from "express";
import {
  handlerCipher,
  handlerDecipher,
  handlerGeneratePem,
} from "../handlers/crypto-module/crypto-module.handlers";

export const cryptoModuleRouter = Router();

cryptoModuleRouter.get("/", async (req, res, next) => {
  try {
    console.log("In the cryptomodule get endpoint");

    // const result = await handlerHashPassword(req, res);
    res.status(201);
    res.send(`Result crypto module: `);
    next();
  } catch (error) {
    next(error);
  }
});

cryptoModuleRouter.get("/cypher", async (req, res, next) => {
  try {
    console.log("In the cryptomodule cypher endpoint");

    await handlerCipher(req, res, next);
    //  res.status(201);
    //  res.send(
    //    `Result crypto module: ${result?.resultEncrypt} - ${result?.resultDecrypt}`,
    //  );
    // next();
  } catch (error) {
    next(error);
  }
});

cryptoModuleRouter.post("/decypher", async (req, res, next) => {
  try {
    console.log("In the cryptomodule decypher endpoint");

    await handlerDecipher(req, res, next);
    // next();
  } catch (error) {
    next(error);
  }
});

cryptoModuleRouter.get("/generate-pem", async (req, res, next) => {
  try {
    await handlerGeneratePem(req, res, next);
    // res.status(200);
    // res.send(result);
  } catch (error) {
    console.error("Error: ", error);
    next(error);
  }
});
