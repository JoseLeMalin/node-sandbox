import { RefreshToken } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { hashToken } from "../../utils/jwt/jwt-hash";

export const addRefreshTokenToWhitelist = (
  jti: string,
  refreshToken: RefreshToken,
  userId: string,
) => {
  return prisma.refreshToken.create({
    data: {
      id: jti,
      hashedToken: hashToken(refreshToken.hashedToken),
      userId,
    },
  });
};

// used to check if the token sent by the client is in the database.
export const findRefreshTokenById = (id: string) => {
  return prisma.refreshToken.findUnique({
    where: {
      id,
    },
  });
};

// soft delete tokens after usage.
export const deleteRefreshToken = (id: string) => {
  return prisma.refreshToken.update({
    where: {
      id,
    },
    data: {
      revoked: true,
    },
  });
};

export const revokeTokens = (userId: string) => {
  return prisma.refreshToken.updateMany({
    where: {
      userId,
    },
    data: {
      revoked: true,
    },
  });
};
