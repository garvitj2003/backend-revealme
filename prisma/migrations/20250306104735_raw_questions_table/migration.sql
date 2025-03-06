/*
  Warnings:

  - The primary key for the `Question` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `rawdataId` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `selected` on the `Question` table. All the data in the column will be lost.
  - The `id` column on the `Question` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[creatorId]` on the table `rawQuiz` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_rawdataId_fkey";

-- AlterTable
ALTER TABLE "Question" DROP CONSTRAINT "Question_pkey",
DROP COLUMN "rawdataId",
DROP COLUMN "selected",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Question_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "rawQuestion" (
    "id" SERIAL NOT NULL,
    "creatorId" TEXT NOT NULL,
    "selected" BOOLEAN NOT NULL,
    "text" TEXT NOT NULL,
    "options" TEXT[],

    CONSTRAINT "rawQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rawQuiz_creatorId_key" ON "rawQuiz"("creatorId");

-- AddForeignKey
ALTER TABLE "rawQuestion" ADD CONSTRAINT "rawQuestion_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "rawQuiz"("creatorId") ON DELETE CASCADE ON UPDATE CASCADE;
