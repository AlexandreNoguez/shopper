import prisma from "../prisma/client";

export const createUserInDatabase = async (name: string) => {
  try {
    const user = await prisma.user.create({
      data: { name },
    });
    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Database error while creating user.");
  }
};
