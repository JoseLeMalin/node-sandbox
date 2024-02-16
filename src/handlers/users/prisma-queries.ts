import { Prisma, User } from "@prisma/client";
import { prisma as prismaClient } from "../../lib/prisma";

const userValidator = Prisma.validator(
  prismaClient,
  "user",
  "findUnique",
  "select",
)({
  id: true,
  email: true,
  password: true,
  name: true,
  // passwordIv: true,
});

export const findUserByEmail = async (email: string) =>
  await prismaClient.user.findUnique({
    where: {
      email,
    },
    select: userValidator,
  });

export const findUserById = async (id: string) =>
  await prismaClient.user.findUnique({
    where: {
      id,
    },
    select: userValidator,
  });

export const findAllUsers = async () => await prismaClient.user.findMany();
