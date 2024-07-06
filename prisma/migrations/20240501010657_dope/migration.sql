/*
  Warnings:

  - Added the required column `embedColor` to the `UserSettings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `embedDescription` to the `UserSettings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `embedTitle` to the `UserSettings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `maxUploadMB` INTEGER NOT NULL DEFAULT 100;

-- AlterTable
ALTER TABLE `UserSettings` ADD COLUMN `embedColor` INTEGER NOT NULL,
    ADD COLUMN `embedDescription` VARCHAR(191) NOT NULL,
    ADD COLUMN `embedTitle` VARCHAR(191) NOT NULL,
    ADD COLUMN `linkToRaw` BOOLEAN NOT NULL DEFAULT false;
