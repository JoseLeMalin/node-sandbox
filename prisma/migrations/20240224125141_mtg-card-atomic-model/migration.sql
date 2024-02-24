-- CreateTable
CREATE TABLE "CardAtomic" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "asciiName" TEXT,
    "attractionLights" INTEGER[],
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
    "firstPrinting" TIMESTAMP(3),
    "hand" TEXT,
    "hasAlternativeDeckLimit" BOOLEAN DEFAULT false,
    "isFunny" BOOLEAN NOT NULL,
    "isReserved" BOOLEAN NOT NULL,
    "keywords" TEXT[],
    "layout" TEXT NOT NULL,
    "life" TEXT,
    "loyalty" TEXT,
    "manaCost" TEXT,
    "manaValue" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "power" TEXT,
    "printings" TEXT[],
    "side" TEXT,
    "subsets" TEXT[],
    "subtypes" TEXT[],
    "supertypes" TEXT[],
    "text" TEXT,
    "toughness" TEXT,
    "type" TEXT NOT NULL,
    "types" TEXT[],

    CONSTRAINT "CardAtomic_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "CardAtomic_id_key" ON "CardAtomic"("id");

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
ALTER TABLE "ForeignData" ADD CONSTRAINT "ForeignData_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "CardAtomic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadershipSkills" ADD CONSTRAINT "LeadershipSkills_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "CardAtomic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rulings" ADD CONSTRAINT "Rulings_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "CardAtomic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
