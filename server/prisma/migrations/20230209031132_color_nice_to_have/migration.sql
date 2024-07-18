/*
  Warnings:

  - Added the required column `definitionCardColor` to the `Deck` table without a default value. This is not possible if the table is not empty.
  - Added the required column `definitionTextColor` to the `Deck` table without a default value. This is not possible if the table is not empty.
  - Added the required column `termCardColor` to the `Deck` table without a default value. This is not possible if the table is not empty.
  - Added the required column `termTextColor` to the `Deck` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Deck" ADD COLUMN     "definitionCardColor" TEXT NOT NULL,
ADD COLUMN     "definitionTextColor" TEXT NOT NULL,
ADD COLUMN     "termCardColor" TEXT NOT NULL,
ADD COLUMN     "termTextColor" TEXT NOT NULL;
