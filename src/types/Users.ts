import { User } from "@prisma/client";

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

export type CreateUser = Omit<User, "id">;
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
