import extensionContent from "../db_local/RAV.json" assert { type: "json" };
import type { CardSet } from "@prisma/client";
import { prisma } from "../src/lib/prisma";
import { v4 } from "uuid";
import { getUTCFormattedDate } from "../src/utils/dayjs/functions.utils";

// run script: pnpx ts-node .\scripts\mtg_cards_extract.ts

const extractCardsFromMTGJSON = async () => {
  const cards = extensionContent.data.cards;
  const block = await prisma.set.findFirst({
    where: {
      code: "RAV",
    },
  });
  if (!block) return;
  console.log("block: ", block);
  if (!cards.length) return;

  const serializedCards = cards.map((card) => {
    const testCard: CardSet = {
      borderColor: card?.borderColor ? card.borderColor : "",
      colorIdentity: card?.colorIdentity ? card.colorIdentity : [],
      colors: card?.colors ? card.colors : [],
      convertedManaCost: card?.convertedManaCost ? card.convertedManaCost : -1,
      edhrecRank: card?.edhrecRank ? card.edhrecRank : 0,
      faceConvertedManaCost: card?.faceConvertedManaCost
        ? card.faceConvertedManaCost
        : -1,
      faceManaValue: card?.faceManaValue ? card.faceManaValue : 0,
      faceName: card?.faceName ? card.faceName : "",
      finishes: card?.finishes ? card.finishes : [],
      flavorText: card?.flavorText ? card.flavorText : "",
      frameVersion: card?.frameVersion ? card.frameVersion : "",
      hasFoil: card?.hasFoil ? card.hasFoil : false,
      hasNonFoil: card?.hasNonFoil ? card.hasNonFoil : false,
      keywords: card?.keywords ? card.keywords : [],
      language: card?.language ? card.language : "",
      layout: card?.layout ? card.layout : "",
      manaCost: card?.manaCost ? card.manaCost : "",
      manaValue: card?.manaValue ? card.manaValue : -1,
      name: card?.name ? card.name : "",
      number: card?.number ? card.number : "",
      power: card?.power ? card.power : "",
      printings: card?.printings ? card.printings : [],
      rarity: card?.rarity ? card.rarity : "",
      side: "",
      subtypes: card?.subtypes ? card.subtypes : [],
      supertypes: card?.supertypes ? card.supertypes : [],
      text: card?.text ? card.text : "",
      toughness: card?.toughness ? card.toughness : "",
      type: card?.type ? card.type : "",
      types: card?.types ? card.types : [],
    };
    return testCard;
  });

  await prisma.cardSet.createMany({
    data: serializedCards,
  });
};
const createSet = async (setCode: string) => {
  await prisma.set.create({
    data: {
      id: v4(),
      code: setCode,
      name: "Ravnica: City of Guilds",
      releaseDate: getUTCFormattedDate(extensionContent.data.releaseDate),
      type: extensionContent.data.type,
      languages: extensionContent.data.languages,
    },
  });
};
// createSet("RAV")
extractCardsFromMTGJSON();
