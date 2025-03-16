/*
  Warnings:

  - Made the column `correctAnswer` on table `Question` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "LeaderboardEntry_quizId_key";

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "correctAnswer" SET NOT NULL;
