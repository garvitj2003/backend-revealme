/*
  Warnings:

  - A unique constraint covering the columns `[leaderBoardId,questionId]` on the table `Response` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Response_questionId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Response_leaderBoardId_questionId_key" ON "Response"("leaderBoardId", "questionId");
