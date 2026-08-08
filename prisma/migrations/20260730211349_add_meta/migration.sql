-- CreateTable
CREATE TABLE "Meta" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "image" TEXT,

    CONSTRAINT "Meta_pkey" PRIMARY KEY ("id")
);

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "metaId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Post_metaId_key" ON "Post"("metaId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_metaId_fkey" FOREIGN KEY ("metaId") REFERENCES "Meta"("id") ON DELETE SET NULL ON UPDATE CASCADE;
