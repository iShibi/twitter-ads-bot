-- CreateTable
CREATE TABLE "ad" (
    "id" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "creatorName" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,

    CONSTRAINT "ad_pkey" PRIMARY KEY ("id")
);
