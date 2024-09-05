/*
  Warnings:

  - You are about to drop the column `GB` on the `memory` table. All the data in the column will be lost.
  - Added the required column `wattage` to the `cpuCooler` table without a default value. This is not possible if the table is not empty.
  - Added the required column `capacity` to the `memory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `capacity` to the `storage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wattage` to the `storage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cpuCooler" ADD COLUMN     "wattage" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "memory" DROP COLUMN "GB",
ADD COLUMN     "capacity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "storage" ADD COLUMN     "capacity" INTEGER NOT NULL,
ADD COLUMN     "wattage" INTEGER NOT NULL;
