/*
  Warnings:

  - You are about to drop the column `author_id` on the `CartOrder` table. All the data in the column will be lost.
  - You are about to drop the column `card_order_id` on the `CartOrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `terminal_type` on the `ProductItem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[contact_shipping_id]` on the table `CartOrder` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cart_order_id` to the `CartOrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `terminal_category_id` to the `ProductItem` table without a default value. This is not possible if the table is not empty.
  - Made the column `full_name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "CartOrder" DROP CONSTRAINT "CartOrder_author_id_fkey";

-- DropForeignKey
ALTER TABLE "CartOrderItem" DROP CONSTRAINT "CartOrderItem_card_order_id_fkey";

-- AlterTable
ALTER TABLE "CartOrder" DROP COLUMN "author_id",
ADD COLUMN     "contact_shipping_id" INTEGER,
ADD COLUMN     "contact_user_id" INTEGER;

-- AlterTable
ALTER TABLE "CartOrderItem" DROP COLUMN "card_order_id",
ADD COLUMN     "cart_order_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ProductItem" DROP COLUMN "terminal_type",
ADD COLUMN     "terminal_category_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "home_address" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "zip_code" TEXT,
ALTER COLUMN "full_name" SET NOT NULL;

-- CreateTable
CREATE TABLE "CartOrderShipping" (
    "id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "home_address" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "CartOrderShipping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductItemCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ProductItemCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductFav" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "ProductFav_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CartOrder_contact_shipping_id_key" ON "CartOrder"("contact_shipping_id");

-- AddForeignKey
ALTER TABLE "CartOrder" ADD CONSTRAINT "CartOrder_contact_user_id_fkey" FOREIGN KEY ("contact_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartOrder" ADD CONSTRAINT "CartOrder_contact_shipping_id_fkey" FOREIGN KEY ("contact_shipping_id") REFERENCES "CartOrderShipping"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartOrderItem" ADD CONSTRAINT "CartOrderItem_cart_order_id_fkey" FOREIGN KEY ("cart_order_id") REFERENCES "CartOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductItem" ADD CONSTRAINT "ProductItem_terminal_category_id_fkey" FOREIGN KEY ("terminal_category_id") REFERENCES "ProductItemCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
