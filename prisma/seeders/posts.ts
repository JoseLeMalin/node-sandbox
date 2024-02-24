import { prisma } from "../../src/lib/prisma";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { v4 } from "uuid";

async function main() {
  const postAlice = await prisma.post.upsert({
    where: { id: "null" },
    update: {},
    create: {
      id: v4(),
      content: faker.lorem.text(),
      title: faker.lorem.sentence(),
      authorId: v4(),
      createdAt: dayjs().format(),
      published: true,
    },
  });
  const postBob = await prisma.post.upsert({
    where: { id: "null" },
    update: {},
    create: {
      id: v4(),
      content: faker.lorem.text(),
      title: faker.lorem.sentence(),
      authorId: v4(),
      createdAt: dayjs().format(),
      published: true,
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
