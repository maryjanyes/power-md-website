-- CreateTable
CREATE TABLE "ProductItemReview" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "product_item_id" INTEGER NOT NULL,

    CONSTRAINT "ProductItemReview_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductItemReview" ADD CONSTRAINT "ProductItemReview_product_item_id_fkey" FOREIGN KEY ("product_item_id") REFERENCES "ProductItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
