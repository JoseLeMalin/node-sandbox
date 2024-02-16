import { prisma } from "../../lib/prisma";
import { v4 } from "uuid";
import { CreateUser } from "../../types/Users";
import { decrypt, encrypt } from "../crypto-module/crypto-module.services";
import { findUserByEmail } from "./prisma-queries";
import { ApiError, messageCode } from "../../utils/express/errors";
import { generateAccessToken } from "../../utils/jwt/jwt";

export const loginService = async (email: string, password: string) => {
  // const token = await generateAccessToken();
  console.log("SHE: ");

  const user = await findUserByEmail(email);
  if (!user)
    throw new ApiError(
      404,
      messageCode.CREDENTIALS_NOT_SATISFYING,
      "Wrong email or password",
    );

  const decryptedUserPwd = await decrypt(user.password);
  if (decryptedUserPwd !== password)
    throw new ApiError(
      404,
      messageCode.CREDENTIALS_NOT_SATISFYING,
      "Wrong email or password",
    );

  return true;
};

export const createUserByEmailAndPasswordService = async (user: CreateUser) => {
  const encryptedPwd = await encrypt(user.password);
  // const hash = createHash("sha256");
  // const hashedPwd = hash.update(user.password);
  return prisma.user.create({
    data: { ...user, id: v4(), password: encryptedPwd },
  });
};

export const validateJWTService = async (jwt: string) => {
  const generatedToken = await generateAccessToken({ id: jwt });

  return generatedToken;
};
