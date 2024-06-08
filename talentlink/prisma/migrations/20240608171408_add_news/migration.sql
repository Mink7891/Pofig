-- CreateTable
CREATE TABLE "News" (
    "NewID" SERIAL NOT NULL,
    "Header" VARCHAR(50) NOT NULL,
    "Category" VARCHAR(50) NOT NULL,
    "Text" VARCHAR(500) NOT NULL,

    CONSTRAINT "News_pkey" PRIMARY KEY ("NewID")
);
