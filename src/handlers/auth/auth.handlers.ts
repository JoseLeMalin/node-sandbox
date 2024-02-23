import { z } from "zod";
import { validateJWTService } from "../users/users.services";
import { Request } from "express";
import { ApiError, messageCode } from "../../utils/express/errors";

export const validateJWTHandler = async (req: Request) => {
  console.log("req.body.id SHE: ", req.body.id);
  const jwtSchema = z.object({
    id: z.string(),
  });
  const parsedBody = await jwtSchema.safeParseAsync(req.body);
  if (!parsedBody.success)
    throw new ApiError(500, messageCode.WRONG_QUERY_PARAMS, "Wrong body");

  const result = await validateJWTService(parsedBody.data.id);
  return result;
};
