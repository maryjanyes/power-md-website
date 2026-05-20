/*
  Warnings:

  - You are about to drop the column `product_id` on the `ProductFav` table. All the data in the column will be lost.
  - You are about to drop the column `terminal_akb_type` on the `ProductItem` table. All the data in the column will be lost.
  - You are about to drop the `ProductItemApplication` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductItemFeature` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `product_item_id` to the `ProductFav` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductFav" DROP COLUMN "product_id",
ADD COLUMN     "product_item_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ProductItem" DROP COLUMN "terminal_akb_type";

-- DropTable
DROP TABLE "ProductItemApplication";

-- DropTable
DROP TABLE "ProductItemFeature";

-- CreateTable
CREATE TABLE "ProductItemFeatured" (
    "id" SERIAL NOT NULL,
    "product_item_id" INTEGER NOT NULL,

    CONSTRAINT "ProductItemFeatured_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductFav" ADD CONSTRAINT "ProductFav_product_item_id_fkey" FOREIGN KEY ("product_item_id") REFERENCES "ProductItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductItemFeatured" ADD CONSTRAINT "ProductItemFeatured_product_item_id_fkey" FOREIGN KEY ("product_item_id") REFERENCES "ProductItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
