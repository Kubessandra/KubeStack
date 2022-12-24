-- CreateTable
CREATE TABLE "PaymentInfos" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PaymentInfos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PaymentInfos_customerId_key" ON "PaymentInfos"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentInfos_userId_key" ON "PaymentInfos"("userId");
