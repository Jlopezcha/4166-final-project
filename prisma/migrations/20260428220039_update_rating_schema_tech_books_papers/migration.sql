/*
  Warnings:

  - You are about to drop the column `rating` on the `academicPapers` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `technology` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "academicPapers" DROP COLUMN "rating",
ADD COLUMN     "avg_rating" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_reviews" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "books" DROP COLUMN "rating",
ADD COLUMN     "avg_rating" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_reviews" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "technology" DROP COLUMN "rating",
ADD COLUMN     "avg_rating" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_reviews" INTEGER NOT NULL DEFAULT 0;
