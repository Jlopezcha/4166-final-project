import prisma from '../config/db.js';

export async function findAllTechnology() {
    return prisma.Technology.findMany();
}

export async function findTechnologyById(id) {
    return await prisma.Technology.findUnique({where: {id}});
}

export async function create(data) {
    const newProduct = await prisma.Technology.create({data: data})
    return newProduct;
}

export async function update(id, data) {
    try {
      const updatedProduct = await prisma.Technology.update({
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
      const deletedProduct = await prisma.Technology.delete({
        where: { id },
      });
      return deletedProduct;
    } catch (error) {
      if (error.code === 'P2025') return null;
      throw error;
    }
}

