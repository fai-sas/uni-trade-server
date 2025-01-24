/*
  Warnings:

  - A unique constraint covering the columns `[customerEmail,productId]` on the table `cart` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "cart_customerEmail_productId_key" ON "cart"("customerEmail", "productId");
