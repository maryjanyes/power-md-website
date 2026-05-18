-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "full_name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartOrder" (
    "id" SERIAL NOT NULL,
    "author_id" INTEGER NOT NULL,

    CONSTRAINT "CartOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartOrderItem" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "card_order_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "CartOrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "voltage" INTEGER NOT NULL,
    "starting_current_a" INTEGER NOT NULL,
    "capacity_ah" INTEGER NOT NULL,
    "cycle_life" INTEGER NOT NULL,
    "weight_kg" TEXT NOT NULL,
    "warranty_years" TEXT NOT NULL,
    "dimensions" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "polarity" TEXT NOT NULL,
    "production_country" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "terminal_type" TEXT NOT NULL,
    "terminal_cover_type" TEXT NOT NULL,
    "terminal_akb_type" TEXT NOT NULL,
    "image_url" TEXT,
    "in_stock" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ProductItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductItemFeature" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "ProductItemFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductItemApplication" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "ProductItemApplication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "CartOrder" ADD CONSTRAINT "CartOrder_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartOrderItem" ADD CONSTRAINT "CartOrderItem_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "ProductItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartOrderItem" ADD CONSTRAINT "CartOrderItem_card_order_id_fkey" FOREIGN KEY ("card_order_id") REFERENCES "CartOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
