/*
  Warnings:

  - You are about to drop the column `subscriptionEnd` on the `PaymentInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PaymentInfo" DROP COLUMN "subscriptionEnd",
ADD COLUMN     "subscriptionEndAt" TIMESTAMP(3);
