import { Request, Response, NextFunction } from "express";
import {
  cipherTextService,
  decipherTextService,
  generatePemService,
} from "./crypto-module.services";
import z from "zod";

export const handlerCipher = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("reqSHE: ", req);
  console.log("resSHE: ", res);
  try {
    const result = await cipherTextService();
    return res.status(200).send(result);
  } catch (error) {
    return next(error);
  }
};

export const handlerDecipher = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("resSHE: ", res);
  try {
    const schemaTextDecipher = z.object({
      encryptedText: z.string(),
    });
    const body = schemaTextDecipher.parse(req.body);

    const result = await decipherTextService(body.encryptedText);
    return res.status(200).send(result);
  } catch (error) {
    return next(error);
  }
};

export const handlerGeneratePem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await generatePemService();
    return res.status(200).send();
  } catch (error) {
    return next(error);
  }
};
