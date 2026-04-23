/*
  Warnings:

  - You are about to drop the column `originalPostId` on the `LifeInsightAnalysisRecord` table. All the data in the column will be lost.
  - Added the required column `original_post_id` to the `LifeInsightAnalysisRecord` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LifeInsightAnalysisRecord" DROP CONSTRAINT "LifeInsightAnalysisRecord_originalPostId_fkey";

-- AlterTable
ALTER TABLE "LifeInsightAnalysisRecord" DROP COLUMN "originalPostId",
ADD COLUMN     "original_post_id" INTEGER NOT NULL;
