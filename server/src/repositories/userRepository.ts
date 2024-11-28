import prisma from "../prisma/client";

export const createUserInDatabase = async (id: string, name: string) => {
  try {
    const user = await prisma.user.create({
      data: { id, name },
    });
    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Database error while creating user.");
  }
};
