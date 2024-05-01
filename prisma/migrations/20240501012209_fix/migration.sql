-- DropIndex
DROP INDEX `Upload_fileName_key` ON `Upload`;

-- AlterTable
ALTER TABLE `UserSettings` MODIFY `embedColor` INTEGER NOT NULL DEFAULT 0,
    MODIFY `embedDescription` VARCHAR(191) NOT NULL DEFAULT 'Uploaded by {{username}} at {{time}}',
    MODIFY `embedTitle` VARCHAR(191) NOT NULL DEFAULT '{{file}}';
