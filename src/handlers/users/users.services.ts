import { prisma } from "../../lib/prisma";
import { generateTokens } from "../../utils/jwt/jwt";
import { createHash } from "crypto";
import { v4 } from "uuid";
import { CreateUser } from "../../types/Users";

export const loginService = async () => {
  // const token = await generateAccessToken();
  console.log("SHE: ");
  const { accessToken, refreshToken } = await generateTokens(
    { id: v4() },
    "string",
  );
  console.log("token accessToken: ", accessToken);
  console.log("token refreshToken: ", refreshToken);

  return false;
};
// "exec": "npx ts-node src/app.ts"

export const findUserByEmail = (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const createUserByEmailAndPasswordService = (user: CreateUser) => {
  const hash = createHash("sha256");
  const hashedPwd = hash.update(user.password);
  return prisma.user.create({
    data: { ...user, id: v4(), password: hashedPwd.digest("hex") },
  });
};

export const findUserById = (userId: string) => {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
};
