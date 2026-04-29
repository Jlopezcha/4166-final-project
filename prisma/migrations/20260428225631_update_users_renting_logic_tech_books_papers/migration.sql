-- AlterTable
ALTER TABLE "users" ADD COLUMN     "is_renting_tech" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "num_books_renting" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "num_papers_renting" INTEGER NOT NULL DEFAULT 0;
