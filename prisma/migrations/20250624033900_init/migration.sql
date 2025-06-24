/*
  Warnings:

  - A unique constraint covering the columns `[shortCode]` on the table `application` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shortCode` to the `application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "application" ADD COLUMN     "shortCode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "application_shortCode_key" ON "application"("shortCode");
