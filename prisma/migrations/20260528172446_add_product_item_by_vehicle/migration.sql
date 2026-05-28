/*
  Warnings:

  - You are about to drop the `ProductFav` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductFav" DROP CONSTRAINT "ProductFav_product_item_id_fkey";

-- AlterTable
ALTER TABLE "ProductItemFeatured" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "ProductFav";

-- CreateTable
CREATE TABLE "ProductItemByVehicle" (
    "id" SERIAL NOT NULL,
    "vehicle_model" TEXT NOT NULL,
    "product_item_id" INTEGER NOT NULL,

    CONSTRAINT "ProductItemByVehicle_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductItemByVehicle" ADD CONSTRAINT "ProductItemByVehicle_product_item_id_fkey" FOREIGN KEY ("product_item_id") REFERENCES "ProductItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
