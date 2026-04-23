-- CreateTable
CREATE TABLE "LifeInsightAnalysisRecord" (
    "id" SERIAL NOT NULL,
    "analysis_content" TEXT NOT NULL,
    "analysis_category" TEXT NOT NULL,
    "missed_alternatives" JSONB NOT NULL,
    "cognitive_distortions_list" JSONB NOT NULL,
    "status" TEXT NOT NULL,
    "originalPostId" INTEGER NOT NULL,

    CONSTRAINT "LifeInsightAnalysisRecord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LifeInsightAnalysisRecord" ADD CONSTRAINT "LifeInsightAnalysisRecord_originalPostId_fkey" FOREIGN KEY ("originalPostId") REFERENCES "LifeInsightPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
