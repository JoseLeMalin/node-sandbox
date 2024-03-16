import { ApiError, messageCode } from "../../utils/express/errors";
import { findCardById } from "./prisma-queries";

export const getCardByIdService = async (id: string) => {
  const user = await findCardById(id);
  if (!user)
    throw new ApiError(404, messageCode.USER_NOT_FOUND, "User not found");
  return user;
};
