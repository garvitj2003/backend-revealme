/*
  Warnings:

  - The primary key for the `LeaderboardEntry` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `LeaderboardEntry` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "LeaderboardEntry" DROP CONSTRAINT "LeaderboardEntry_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "LeaderboardEntry_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Response" (
    "id" SERIAL NOT NULL,
    "leaderBoardId" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,
    "answerChosen" TEXT NOT NULL,

    CONSTRAINT "Response_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Response_questionId_key" ON "Response"("questionId");

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_leaderBoardId_fkey" FOREIGN KEY ("leaderBoardId") REFERENCES "LeaderboardEntry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
