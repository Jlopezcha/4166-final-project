import prisma from '../config/db.js';

export async function findAllPapers() {
    return prisma.Academic_Papers.findMany();
}

export async function findPaperById(id) {
    return await prisma.Academic_Papers.findUnique({where: {id}});
}

export async function create(data) {
    const newProduct = await prisma.Academic_Papers.create({
        data: {
            name: data.name,
            authors: {
                connectOrCreate: data.authors.map((aName) => ({
                    where: {name: aName},
                    create: {name: aName}
                })),
            },
            topic: data.topic,
            availability: data.availability,
            avg_rating: data.avg_rating,
            total_reviews: data.total_reviews

        }})
    return newProduct;
}

export async function update(id, data) {
    try {
      const updatedProduct = await prisma.Academic_Papers.update({
        where: { id },
        data: data,
      });
      return updatedProduct;
    } catch (error) {
      if (error.code === 'P2025') return null;
      throw error;
    }
}

export async function remove(id) {
    try {
      const deletedProduct = await prisma.Academic_Papers.delete({
        where: { id },
      });
      return deletedProduct;
    } catch (error) {
      if (error.code === 'P2025') return null;
      throw error;
    }
}