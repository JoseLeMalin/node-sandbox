import { Request, Response } from "express";
import { User, Role } from "@prisma/client";
import {
  loginService,
  createUserByEmailAndPasswordService,
} from "./users.services";
import { z } from "zod";
import { ApiError, messageCode } from "../../utils/express/errors";

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

  return await loginService(req.body.email, req.body.password);
};

export const userCreate = async (req: Request, res: Response) => {
  try {
    const userSchema = z.object({
      email: z.string(),
      password: z.string(),
      // passwordIv: z.string(),
      name: z.string(),
      // age: z.number(),
      role: z.nativeEnum(Role),
    });

    const userToCreate = userSchema.parse(req.body);
    console.log(" userToCreate SHE: ", userToCreate);

    const createdUser = await createUserByEmailAndPasswordService(userToCreate);
    console.log("createdUser SHE: ", createdUser);
    return createdUser;
  } catch (error) {
    throw new ApiError(501, messageCode.CREDENTIALS_NOT_SATISFYING, error);
  }
};
