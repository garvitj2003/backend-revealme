/*
  Warnings:

  - A unique constraint covering the columns `[quizId]` on the table `LeaderboardEntry` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rawdataId` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `selected` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "rawdataId" TEXT NOT NULL,
ADD COLUMN     "selected" BOOLEAN NOT NULL,
ALTER COLUMN "correctAnswer" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Quiz" ALTER COLUMN "title" DROP NOT NULL;

-- CreateTable
CREATE TABLE "rawQuiz" (
    "id" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,

    CONSTRAINT "rawQuiz_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LeaderboardEntry_quizId_key" ON "LeaderboardEntry"("quizId");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_rawdataId_fkey" FOREIGN KEY ("rawdataId") REFERENCES "rawQuiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;
