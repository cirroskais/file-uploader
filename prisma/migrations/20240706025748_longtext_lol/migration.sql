-- AlterTable
ALTER TABLE `Upload` MODIFY `fileName` LONGTEXT NOT NULL,
    MODIFY `public` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `UserSettings` MODIFY `newPostsPublic` BOOLEAN NOT NULL DEFAULT true;
