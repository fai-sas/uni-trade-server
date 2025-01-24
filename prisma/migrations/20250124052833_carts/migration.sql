/*
  Warnings:

  - You are about to drop the `cart_products` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productId` to the `cart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cart_products" DROP CONSTRAINT "cart_products_cartId_fkey";

-- DropForeignKey
ALTER TABLE "cart_products" DROP CONSTRAINT "cart_products_productId_fkey";

-- AlterTable
ALTER TABLE "cart" ADD COLUMN     "productId" TEXT NOT NULL;

-- DropTable
DROP TABLE "cart_products";

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;
