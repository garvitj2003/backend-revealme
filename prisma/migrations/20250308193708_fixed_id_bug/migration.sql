/*
  Warnings:

  - The primary key for the `Quiz` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Quiz` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `rawQuiz` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `rawQuiz` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `quizId` on the `LeaderboardEntry` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `quizId` on the `Question` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "LeaderboardEntry" DROP CONSTRAINT "LeaderboardEntry_quizId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_quizId_fkey";

-- AlterTable
ALTER TABLE "LeaderboardEntry" DROP COLUMN "quizId",
ADD COLUMN     "quizId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "quizId",
ADD COLUMN     "quizId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "rawQuiz" DROP CONSTRAINT "rawQuiz_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "rawQuiz_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "LeaderboardEntry_quizId_key" ON "LeaderboardEntry"("quizId");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaderboardEntry" ADD CONSTRAINT "LeaderboardEntry_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
