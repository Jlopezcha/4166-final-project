-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "technologyRentals" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "tech_id" INTEGER NOT NULL,
    "rent_start" TIMESTAMP(3) NOT NULL,
    "rent_end" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "technologyRentals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "technology" (
    "id" SERIAL NOT NULL,
    "product_name" TEXT NOT NULL,
    "category" TEXT[],
    "availability" INTEGER NOT NULL,
    "product_year" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "technology_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookRentals" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "book_id" INTEGER NOT NULL,
    "rent_start" TIMESTAMP(3) NOT NULL,
    "rent_end" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bookRentals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "books" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "genre" TEXT[],
    "availability" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academicRentals" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "paper_id" INTEGER NOT NULL,
    "rent_start" TIMESTAMP(3) NOT NULL,
    "rent_end" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "academicRentals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academicPapers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "topic" TEXT[],
    "availability" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "academicPapers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "authors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "authors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Academic_PapersToAuthors" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_Academic_PapersToAuthors_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_AuthorsToBooks" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AuthorsToBooks_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "_Academic_PapersToAuthors_B_index" ON "_Academic_PapersToAuthors"("B");

-- CreateIndex
CREATE INDEX "_AuthorsToBooks_B_index" ON "_AuthorsToBooks"("B");

-- AddForeignKey
ALTER TABLE "technologyRentals" ADD CONSTRAINT "technologyRentals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "technologyRentals" ADD CONSTRAINT "technologyRentals_tech_id_fkey" FOREIGN KEY ("tech_id") REFERENCES "technology"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookRentals" ADD CONSTRAINT "bookRentals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookRentals" ADD CONSTRAINT "bookRentals_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academicRentals" ADD CONSTRAINT "academicRentals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academicRentals" ADD CONSTRAINT "academicRentals_paper_id_fkey" FOREIGN KEY ("paper_id") REFERENCES "academicPapers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Academic_PapersToAuthors" ADD CONSTRAINT "_Academic_PapersToAuthors_A_fkey" FOREIGN KEY ("A") REFERENCES "academicPapers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Academic_PapersToAuthors" ADD CONSTRAINT "_Academic_PapersToAuthors_B_fkey" FOREIGN KEY ("B") REFERENCES "authors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorsToBooks" ADD CONSTRAINT "_AuthorsToBooks_A_fkey" FOREIGN KEY ("A") REFERENCES "authors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorsToBooks" ADD CONSTRAINT "_AuthorsToBooks_B_fkey" FOREIGN KEY ("B") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE;
