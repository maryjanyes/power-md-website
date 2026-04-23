-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LifeInsightPost" (
    "id" SERIAL NOT NULL,
    "situation_overview" TEXT NOT NULL,
    "final_decision" TEXT NOT NULL,
    "other_content" TEXT,
    "status" TEXT NOT NULL,
    "publisherId" INTEGER NOT NULL,

    CONSTRAINT "LifeInsightPost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "LifeInsightPost" ADD CONSTRAINT "LifeInsightPost_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
