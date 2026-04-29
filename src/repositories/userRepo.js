import prisma from '../config/db.js';

export async function createUser(data) {
  try {
    const newUser = await prisma.Users.create({
      data,
      omit: { password: true },
    });
    return newUser;
  } catch (error) {
    if (error.code === 'P2002') {
      const err = new Error('Email has already been used');
      err.status = 409;
      throw err;
    }
    throw error;
  }
}

export async function findUserByEmail(email) {
  return prisma.Users.findUnique({ where: { email } });
}

export async function findAllUsers() {
    return prisma.Users.findMany({omit: {password: true}});
}
