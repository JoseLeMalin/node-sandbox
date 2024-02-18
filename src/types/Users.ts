import { Prisma, Role } from "@prisma/client";
import { z } from "zod";

// export type User = {
//   id: string;
//   email: string;
//   name: string;
//   password: string;
//   passwordIv: string;
//   refreshTokens: string;
//   role: Role;
//   posts: Post[];
//   profile: Profile;
// };

// export type CreateUser = Omit<User, "id">;
export const schemaCreateUser = z.object({
  // id: z.string(),
  email: z.string(),
  name: z.string(),
  password: z.string(),
  role: z.nativeEnum(Role),
}) satisfies z.ZodType<Prisma.UserCreateInput>;
export type CreateUser = z.infer<typeof schemaCreateUser>;

// type Inferred = z.infer<typeof schemaCreateUser>;
// const userValidator = Prisma.validator(
//     prismaClient,
//     "user",
//     "findUnique",
//     "select",
//   )({
//     id: true,
//     email: true,
//     password: true,
//     name: true,
//     passwordIv: true,
//   });

// export type UpdateUser = Required<Pick<User, "id"> & Partial<User>>;

// const  RoleEnum = z.nativeEnum(Role);
// type RoleEnum = z.infer<typeof RoleEnum>;
// export const createUserSchema = z.object({
//     email: z.string(),
//     name:  z.string(),
//     password:  z.string(),
//     passwordIv:  z.string(),
//     role: z.string(RoleEnum),
// })
// export type CreateUser = z.infer<typeof createUserSchema>;
