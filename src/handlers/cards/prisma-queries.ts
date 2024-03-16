import { Prisma } from "@prisma/client";
import { prisma as prismaClient } from "../../lib/prisma";

const cardValidator = Prisma.validator(
  prismaClient,
  "cardSet",
  "findUnique",
  "select",
)({
  id: true,
  name:true,
  colors: true,
  language: true,
  purchaseUrls: true
});

export const findCardByName = async (cardName: string) => {
  const result = await prismaClient.cardSet.findFirst({
    where: {
      name: cardName,
    },
    select: cardValidator,
  });
  console.log("result: ", result);
  return result;
};
export const findCardById = async (cardId: string) => {
  const result = await prismaClient.cardSet.findUnique({
    where: {
      id: cardId,
    },
    select: cardValidator,
  });
  console.log("result: ", result);
  return result;
};

export const findUserById = async (id: string) =>
  await prismaClient.user.findUnique({
    where: {
      id,
    },
    select: cardValidator,
  });

export const findAllUsers = async () => await prismaClient.user.findMany();
