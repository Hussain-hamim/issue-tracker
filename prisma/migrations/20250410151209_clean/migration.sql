/*
  Warnings:

  - Made the column `status` on table `issue` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `issue` MODIFY `status` ENUM('OPEN', 'IN_PROGRESS', 'CLOSED') NOT NULL DEFAULT 'OPEN';
