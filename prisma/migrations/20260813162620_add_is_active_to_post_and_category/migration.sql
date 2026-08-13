-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "PostCategory" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
