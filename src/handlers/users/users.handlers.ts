import { Request, Response } from "express";
import { User, Role } from "@prisma/client";
import {
  loginService,
  createUserByEmailAndPasswordService,
  validateJWTService,
} from "./users.services";
import { z } from "zod";
import { ApiError, messageCode } from "../../utils/express/errors";
import { generateAccessToken, generateTokens } from "../../utils/jwt/jwt";
import { v4 } from "uuid";
import { encrypt, hashTextService } from "../crypto-module/crypto-module.services";
import { schemaCreateUser } from "../../types/Users";

export const userLoginHandler = async (req: Request, res: Response) => {
  const userLoginSchema = z.object({
    email: z.string(),
    password: z.string(),
  });
  const parsedBody = await userLoginSchema.safeParseAsync(req.body);
  if (!parsedBody.success)
    throw new ApiError(
      404,
      messageCode.WRONG_QUERY_PARAMS,
      "Data provided from client do not respect expected inputs",
    );

  return await loginService(parsedBody.data.email, parsedBody.data.password);
};

export const userCreate = async (req: Request, res: Response) => {
  try {

    const userToCreate = schemaCreateUser.parse(req.body);
    console.log(" userToCreate SHE: ", userToCreate);
    const hashedPwd = await hashTextService(req.body.password);
    // const userId = v4();
    // const { accessToken, refreshToken } = await generateTokens(userId, v4());
    
    userToCreate.password = hashedPwd;
    const createdUser = await createUserByEmailAndPasswordService(userToCreate);
    console.log("createdUser SHE: ", createdUser);
    // console.log("refreshToken SHE: ", refreshToken);
    // console.log("accessToken SHE: ", accessToken);
    return createdUser;
  } catch (error) {
    throw new ApiError(501, messageCode.CREDENTIALS_NOT_SATISFYING, error);
  }
};
//export const userCreateBis = async (req: Request, res: Response) => {
//  try {
//    const userSchema = z.object({
//      id: z.string().optional(),
//      email: z.string(),
//      password: z.string(),
//      // passwordIv: z.string(),
//      name: z.string(),
//      // age: z.number(),
//      role: z.nativeEnum(Role),
//    });
//    const userId = v4();
//    const userToCreate = userSchema.parse(req.body);
//    console.log(" userToCreate SHE: ", userToCreate);
//    const encryptedPwd = await encrypt(req.body.password);
//    const { accessToken, refreshToken } = await generateTokens(userId, v4());
//    userToCreate.id = userId;
//    userToCreate.password = encryptedPwd;
//    const createdUser = await createUserByEmailAndPasswordService(userToCreate);
//    console.log("createdUser SHE: ", createdUser);
//    console.log("refreshToken SHE: ", refreshToken);
//    console.log("accessToken SHE: ", accessToken);
//    return createdUser;
//  } catch (error) {
//    throw new ApiError(501, messageCode.CREDENTIALS_NOT_SATISFYING, error);
//  }
//};
