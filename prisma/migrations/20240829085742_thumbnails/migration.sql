/*
  Warnings:

  - You are about to drop the column `placeholder` on the `Thumbnail` table. All the data in the column will be lost.
  - Added the required column `fileName` to the `Thumbnail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Thumbnail` DROP COLUMN `placeholder`,
    ADD COLUMN `fileName` LONGTEXT NOT NULL;
