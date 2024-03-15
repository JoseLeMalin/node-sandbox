import { createHash } from "crypto";

export const hashToken = (token: string) =>
  createHash("sha512").update(token).digest("hex");
