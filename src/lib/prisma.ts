import { PrismaClient } from "@prisma/client/edge";
// import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
const connectionString = `${process.env.DATABASE_URL}`;

// const pool = new Pool({ connectionString })
// const adapter = new PrismaPg(pool)
// export const prisma = new PrismaClient({ adapter })
export const prisma = new PrismaClient({
  datasourceUrl: connectionString,
});
// use `prisma` in your application to read and write data in your DB
