/*
  Warnings:

  - You are about to alter the column `size` on the `Upload` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `Upload` MODIFY `size` INTEGER NOT NULL;
