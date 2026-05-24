/*
  Warnings:

  - You are about to drop the column `terminal_category_id` on the `ProductItem` table. All the data in the column will be lost.
  - You are about to drop the `ProductItemCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductItem" DROP CONSTRAINT "ProductItem_terminal_category_id_fkey";

-- AlterTable
ALTER TABLE "ProductItem" DROP COLUMN "terminal_category_id",
ADD COLUMN     "terminal_category" TEXT,
ALTER COLUMN "in_stock" SET DEFAULT true;

-- DropTable
DROP TABLE "ProductItemCategory";
