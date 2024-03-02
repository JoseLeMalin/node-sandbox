// import * as extensionContent from "../db_local/RAV.json"
import { CardInSet } from "@prisma/client";
import extensionContent from "../db_local/RAV.json" assert  { type: "json" };
import { CardSet } from "@prisma/client";
import { prisma } from "../src/lib/prisma";
import { v4 } from "uuid"
import {getUTCFormattedDate} from "../src/utils/dayjs/functions.utils";

// const extensionContent =  require("../db_local/RAV.json");

const extractCardsFromMTGJSON = async () => {
  const cards = extensionContent.data.cards;
  const block = await prisma.set.findFirst({where:{
    code: "RAV",
  }})
  if (!block) return;
  console.log("block: ", block);
  if (!cards.length) return;
  // console.log("cards[0]:", cards[0]);
  // const serializedCards = cards.map(card => {
  //   // const newItem: CardSet = {
  //   //   cardId:card.uuid,
  //   //   setId: 
  //   // }
  //   // return {
  //   //   id: card.
  //   // }
  // })

};
const createSet = async(setCode: string) => {
  await prisma.set.create({
    data: {
      id: v4(),
      code: setCode,
      name: "Ravnica: City of Guilds",
      releaseDate: getUTCFormattedDate(extensionContent.data.releaseDate),
      type: extensionContent.data.type,
      languages: extensionContent.data.languages,
    }
  })
}
// createSet("RAV")
extractCardsFromMTGJSON();
