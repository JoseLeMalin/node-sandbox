import { prisma } from "../../lib/prisma";
import { v4 } from "uuid";
import { CreateUser } from "../../types/Users";
import { verifyPassword } from "../crypto-module/crypto-module.services";
import { findUserByEmail, findUserById } from "./prisma-queries";
import { ApiError, messageCode } from "../../utils/express/errors";

export const loginService = async (email: string, password: string) => {
  // const token = await generateAccessToken();
  try {
    console.log("SHE: ");
    const user = await findUserByEmail(email);
    if (!user)
      throw new ApiError(
        404,
        messageCode.CREDENTIALS_NOT_SATISFYING,
        "Wrong email or password",
      );
    return verifyPassword(password, user.password);
  } catch (error) {
    throw new ApiError(
      405,
      messageCode.CREDENTIALS_NOT_SATISFYING,
      "Wrong email or password",
    );
  }
  // const decryptedUserPwd = await decrypt(user.password);
  // if (hashedVerify !== password)
  //   throw new ApiError(
  //     404,
  //     messageCode.CREDENTIALS_NOT_SATISFYING,
  //     "Wrong email or password",
  //   );

  // return true;
};
export const getUserService = async (id: string) => {
  const user = await findUserById(id);
  if (!user)
    throw new ApiError(404, messageCode.USER_NOT_FOUND, "User not found");
  return user;
};

export const createUserByEmailAndPasswordService = async (user: CreateUser) => {
  // const hash = createHash("sha256");
  // const hashedPwd = hash.update(user.password);
  return prisma.user.create({
    data: { ...user, id: v4() },
  });
};

export const validateJWTService = async (jwt: string) => {
  console.log("jwt: ", jwt);
  // const generatedToken = await generateAccessToken({ id: jwt });
  // return generatedToken;
};
