/*
  Warnings:

  - Made the column `resume` on table `candidate` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "candidate" ALTER COLUMN "resume" SET NOT NULL;
