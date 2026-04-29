import prisma from "../config/db.js";
import { findAllPapers, findPaperById, create, update, remove } from "../repositories/researchRepo.js";

export async function getAllPapers() {
    return findAllPapers();
}

export async function getPaperById(id) {
    const productId = await findPaperById(id);

    if(productId) return productId;
    else{
        const error = new Error(`Paper ${id} not found`);
        error.status = 404;
        throw error;
    }
}

export async function rentPaperById(id, userId){
    const user = await prisma.Users.findUnique({where: {id: userId}});

    const prod = await findPaperById(id);

    if(prod){
        if(user.num_papers_renting > 10){
            const error = new Error(
                `This User exceeded the rental limit of 10`,
            );
            error.status = 404;
            throw error;
        }

        if(prod.availability > 0){
            await prisma.$transaction(async (tx) => {
                await tx.Users.update({
                    where: {id: userId},
                    data: {num_papers_renting: {increment: 1}}
                })

                await tx.Academic_Papers.update({
                    where: {id: id},
                    data: {availability: {decrement: 1}}
                });
            });

            const date = new Date();
            const in90Days = new Date();
            in90Days.setDate(date.getDate() + 90);

            const transactionRental = await prisma.Academic_Rentals.create({
                data: {
                    user_id: userId,
                    paper_id: id,
                    rent_start: date,
                    rent_end: in90Days
                }
            });

            return transactionRental; 
        }

    } else{
        const error = new Error(`Paper ${id} not found`);
        error.status = 404;
        throw error;
    }

}

export async function reviewPaperById(id, rating) {
    const prod = await findPaperById(id);

    if(prod){
        const newTotal = prod.total_reviews + 1;        
        const newAvg = ((prod.avg_rating * prod.total_reviews) + Number(rating))/newTotal;
        return await prisma.$transaction(async (tx) => {
                return await tx.Academic_Papers.update({
                    where: {id: id},
                    data: {
                        avg_rating: newAvg,
                        total_reviews: newTotal
                    }
                });
        });
    }
    else{
        const error = new Error(`Paper ${id} not found`);
        error.status = 404;
        throw error;
    }
}

export async function createNewProduct(data){

    //console.log(data.authors);

    return create(data);
}

export async function updateProduct(id, data){
  const updatedProduct = await update(id, data);
  if (updatedProduct) return updatedProduct;
  else {
    const error = new Error(`Paper ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export async function deleteProduct(id){
  const result = await remove(id);
  if (result) return;
  else {
    const error = new Error(`Paper ${id} not found`);
    error.status = 404;
    throw error;
  }
}