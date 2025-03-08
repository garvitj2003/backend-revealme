-- CreateTable
CREATE TABLE "stats" (
    "id" SERIAL NOT NULL,
    "total_submission" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "stats_pkey" PRIMARY KEY ("id")
);
