import { prisma } from "../../src/lib/prisma";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { v4 } from "uuid";


async function main() {
    const postAlice = await prisma.cardAtomic.upsert({
      where: { id: "null" },
      update: {},
      create: {
        id: v4(),
        
      },
    });
    const postBob = await prisma.post.upsert({
      where: { id: "null" },
      update: {},
      create: {
        
      },
    });
    console.log("Performed seed users.ts: ", { postAlice, postBob });
  }
  main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
  