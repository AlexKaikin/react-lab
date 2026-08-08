-- CreateEnum
CREATE TYPE "Locale" AS ENUM ('ru', 'en');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_metaId_fkey";

-- CreateTable
CREATE TABLE "PostCategoryTranslation" (
    "id" TEXT NOT NULL,
    "locale" "Locale" NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "PostCategoryTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostTranslation" (
    "id" TEXT NOT NULL,
    "locale" "Locale" NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "metaId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "PostTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PostCategoryTranslation_categoryId_locale_key" ON "PostCategoryTranslation"("categoryId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "PostTranslation_metaId_key" ON "PostTranslation"("metaId");

-- CreateIndex
CREATE UNIQUE INDEX "PostTranslation_postId_locale_key" ON "PostTranslation"("postId", "locale");

-- AddForeignKey
ALTER TABLE "PostCategoryTranslation" ADD CONSTRAINT "PostCategoryTranslation_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "PostCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_metaId_fkey" FOREIGN KEY ("metaId") REFERENCES "Meta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostTranslation" ADD CONSTRAINT "PostTranslation_metaId_fkey" FOREIGN KEY ("metaId") REFERENCES "Meta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostTranslation" ADD CONSTRAINT "PostTranslation_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
