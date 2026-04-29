import prisma from "../config/db.js";
import { findAllTechnology, findTechnologyById, create, update, remove } from "../repositories/technologyRepo.js";

export async function getAllTech() {
    return findAllTechnology();
}

export async function getTechById(id) {
    const tech = await findTechnologyById(id);

    if(tech) return tech;
    else{
        const error = new Error(`Technology ${id} not found`);
        error.status = 404;
        throw error;
    }
}


export async function rentTechById(id, userId) {
    const user = await prisma.Users.findUnique({where: {id: userId}});

    const tech = await findTechnologyById(id);

    if(tech){

        if (user.is_renting_tech) {
          const error = new Error(
            `User is already renting an Item - Limit is only 1 technology rental per user`,
          );
          error.status = 404;
          throw error;
        }
        
        if(tech.availability > 0){
            await prisma.$transaction(async (tx) => {
                await tx.Users.update({
                    where: {id: userId},
                    data: {is_renting_tech: true}
                })

                await tx.technology.update({
                    where: {id: id},
                    data: {availability: {decrement: 1}}
                });
            });

            const date = new Date();
            const in90Days = new Date();
            in90Days.setDate(date.getDate() + 90);

            //rental table
            const transactionRental = await prisma.Technology_Rentals.create({
                data: {
                    user_id: userId,
                    tech_id: id,
                    rent_start: date,
                    rent_end: in90Days
                }
            });

            return transactionRental;

        } else{
            const error = new Error(`Technology ${id} is out of stock`);
            error.status = 404;
            throw error;
        }

    }
    else{
        const error = new Error(`Technology ${id} not found`);
        error.status = 404;
        throw error;
    }
}


export async function reviewTechById(id, rating) {
    const tech = await findTechnologyById(id);

    if(tech){
        const newTotal = tech.total_reviews + 1;
        //console.log(Number(rating))
        //console.log(tech);
        //console.log(tech.avg_rating);
        const newAvg = ((tech.avg_rating * tech.total_reviews) + Number(rating))/newTotal;

        //console.log(newAvg)

        return await prisma.$transaction(async (tx) => {
                return await tx.technology.update({
                    where: {id: id},
                    data: {
                        avg_rating: newAvg,
                        total_reviews: newTotal
                    }
                });
        });
    }
    else{
        const error = new Error(`Technology ${id} not found`);
        error.status = 404;
        throw error;
    }
}

export async function createNewProduct(data){
    return create(data);
}

export async function updateProduct(id, data){
  const updatedProduct = await update(id, data);
  if (updatedProduct) return updatedProduct;
  else {
    const error = new Error(`Product ${id} not found`);
    error.status = 404;
    throw error;
  }
}


export async function deleteProduct(id){
  const result = await remove(id);
  if (result) return;
  else {
    const error = new Error(`Product ${id} not found`);
    error.status = 404;
    throw error;
  }
}
