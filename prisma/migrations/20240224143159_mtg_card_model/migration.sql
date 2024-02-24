-- CreateTable
CREATE TABLE "CardSet" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "asciiName" TEXT,
    "attractionLights" INTEGER[],
    "borderColor" TEXT NOT NULL,
    "colorIdentity" TEXT[],
    "colorIndicator" TEXT[],
    "colors" TEXT[],
    "convertedManaCost" INTEGER NOT NULL,
    "defense" TEXT,
    "edhrecRank" INTEGER,
    "edhrecSaltiness" INTEGER,
    "faceConvertedManaCost" INTEGER,
    "faceManaValue" INTEGER,
    "faceName" TEXT,
    "finishes" TEXT[],
    "firstPrinting" TIMESTAMP(3),
    "flavorText" TEXT,
    "frameVersion" TEXT NOT NULL,
    "hand" TEXT,
    "hasAlternativeDeckLimit" BOOLEAN DEFAULT false,
    "hasFoil" BOOLEAN NOT NULL,
    "hasNonFoil" BOOLEAN NOT NULL,
    "isFunny" BOOLEAN,
    "isReserved" BOOLEAN,
    "keywords" TEXT[],
    "language" TEXT NOT NULL,
    "layout" TEXT NOT NULL,
    "life" TEXT,
    "loyalty" TEXT,
    "manaCost" TEXT,
    "manaValue" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "otherFaceIds" TEXT[],
    "power" TEXT,
    "printings" TEXT[],
    "rarity" TEXT NOT NULL,
    "side" TEXT,
    "subsets" TEXT[],
    "subtypes" TEXT[],
    "supertypes" TEXT[],
    "text" TEXT,
    "toughness" TEXT,
    "type" TEXT NOT NULL,
    "types" TEXT[],

    CONSTRAINT "CardSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArtistsOfCard" (
    "cardId" UUID NOT NULL,
    "artistId" UUID NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "ArtistsOfCard_pkey" PRIMARY KEY ("cardId","artistId")
);

-- CreateTable
CREATE TABLE "Set" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "languages" TEXT[],
    "type" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Set_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CardInSet" (
    "cardId" UUID NOT NULL,
    "setId" UUID NOT NULL,

    CONSTRAINT "CardInSet_pkey" PRIMARY KEY ("cardId","setId")
);

-- CreateTable
CREATE TABLE "ForeignData" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "faceName" TEXT,
    "flavorText" TEXT,
    "language" TEXT,
    "multiverseId" INTEGER,
    "text" TEXT,
    "type" TEXT,
    "cardId" UUID NOT NULL,

    CONSTRAINT "ForeignData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeadershipSkills" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "brawl" BOOLEAN NOT NULL DEFAULT false,
    "commander" BOOLEAN NOT NULL DEFAULT false,
    "oathbreaker" BOOLEAN NOT NULL DEFAULT false,
    "cardId" UUID NOT NULL,

    CONSTRAINT "LeadershipSkills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rulings" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "date" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "cardId" UUID NOT NULL,

    CONSTRAINT "Rulings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CardSet_id_key" ON "CardSet"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ArtistsOfCard_cardId_key" ON "ArtistsOfCard"("cardId");

-- CreateIndex
CREATE UNIQUE INDEX "ArtistsOfCard_artistId_key" ON "ArtistsOfCard"("artistId");

-- CreateIndex
CREATE UNIQUE INDEX "CardInSet_cardId_key" ON "CardInSet"("cardId");

-- CreateIndex
CREATE UNIQUE INDEX "CardInSet_setId_key" ON "CardInSet"("setId");

-- CreateIndex
CREATE UNIQUE INDEX "ForeignData_id_key" ON "ForeignData"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ForeignData_cardId_key" ON "ForeignData"("cardId");

-- CreateIndex
CREATE UNIQUE INDEX "LeadershipSkills_id_key" ON "LeadershipSkills"("id");

-- CreateIndex
CREATE UNIQUE INDEX "LeadershipSkills_cardId_key" ON "LeadershipSkills"("cardId");

-- CreateIndex
CREATE UNIQUE INDEX "Rulings_id_key" ON "Rulings"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Rulings_cardId_key" ON "Rulings"("cardId");

-- AddForeignKey
ALTER TABLE "ArtistsOfCard" ADD CONSTRAINT "ArtistsOfCard_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistsOfCard" ADD CONSTRAINT "ArtistsOfCard_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "CardSet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardInSet" ADD CONSTRAINT "CardInSet_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "CardSet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardInSet" ADD CONSTRAINT "CardInSet_setId_fkey" FOREIGN KEY ("setId") REFERENCES "Set"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForeignData" ADD CONSTRAINT "ForeignData_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "CardSet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadershipSkills" ADD CONSTRAINT "LeadershipSkills_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "CardSet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rulings" ADD CONSTRAINT "Rulings_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "CardSet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
