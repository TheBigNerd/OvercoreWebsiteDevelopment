/*
  Warnings:

  - The primary key for the `VerificationToken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `identifier` on the `VerificationToken` table. All the data in the column will be lost.
  - You are about to drop the `Authenticator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[token]` on the table `VerificationToken` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email,token]` on the table `VerificationToken` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `VerificationToken` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `VerificationToken` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "Socket" AS ENUM ('AM4', 'AM5', 'LGA1151', 'LGA1200', 'LGA1700');

-- CreateEnum
CREATE TYPE "connection" AS ENUM ('sata', 'PCIE');

-- DropForeignKey
ALTER TABLE "Authenticator" DROP CONSTRAINT "Authenticator_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isTwoFactorEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';

-- AlterTable
ALTER TABLE "VerificationToken" DROP CONSTRAINT "VerificationToken_pkey",
DROP COLUMN "identifier",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Authenticator";

-- DropTable
DROP TABLE "Session";

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TwoFactorToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TwoFactorToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TwoFactorConfirmation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "TwoFactorConfirmation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CPU" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "priceInPence" INTEGER NOT NULL,
    "Wattage" INTEGER NOT NULL,
    "Socket" "Socket" NOT NULL,
    "IntegratedGraphics" BOOLEAN NOT NULL,
    "IntegratedCooler" BOOLEAN NOT NULL,

    CONSTRAINT "CPU_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cpuCooler" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "priceInPence" INTEGER NOT NULL,
    "AM4" BOOLEAN NOT NULL,
    "AM5" BOOLEAN NOT NULL,
    "LGA1151" BOOLEAN NOT NULL,
    "LGA1200" BOOLEAN NOT NULL,
    "LGA1700" BOOLEAN NOT NULL,

    CONSTRAINT "cpuCooler_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Motherboard" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "priceInPence" INTEGER NOT NULL,
    "Wattage" INTEGER NOT NULL,
    "Socket" "Socket" NOT NULL,
    "memorySlots" INTEGER NOT NULL,
    "ATX" BOOLEAN NOT NULL,
    "EATX" BOOLEAN NOT NULL,
    "MicroATX" BOOLEAN NOT NULL,
    "MiniITX" BOOLEAN NOT NULL,
    "XLATX" BOOLEAN NOT NULL,
    "memorySpeed" TEXT[],
    "wifi" BOOLEAN NOT NULL,

    CONSTRAINT "Motherboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "memory" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "priceInPence" INTEGER NOT NULL,
    "Wattage" INTEGER NOT NULL,
    "numberOfSticks" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "GB" INTEGER NOT NULL,

    CONSTRAINT "memory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "storage" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL,
    "priceInPence" INTEGER NOT NULL,
    "connection" TEXT NOT NULL,

    CONSTRAINT "storage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gpu" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL,
    "priceInPence" INTEGER NOT NULL,
    "Wattage" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,

    CONSTRAINT "Gpu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Case" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL,
    "priceInPence" INTEGER NOT NULL,
    "ATX" BOOLEAN NOT NULL,
    "EATX" BOOLEAN NOT NULL,
    "MicroATX" BOOLEAN NOT NULL,
    "MiniITX" BOOLEAN NOT NULL,
    "XLATX" BOOLEAN NOT NULL,

    CONSTRAINT "Case_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PSU" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL,
    "priceInPence" INTEGER NOT NULL,
    "wattage" INTEGER NOT NULL,

    CONSTRAINT "PSU_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_token_key" ON "PasswordResetToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_email_token_key" ON "PasswordResetToken"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "TwoFactorToken_token_key" ON "TwoFactorToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "TwoFactorToken_email_token_key" ON "TwoFactorToken"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "TwoFactorConfirmation_userId_key" ON "TwoFactorConfirmation"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_email_token_key" ON "VerificationToken"("email", "token");

-- AddForeignKey
ALTER TABLE "TwoFactorConfirmation" ADD CONSTRAINT "TwoFactorConfirmation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
