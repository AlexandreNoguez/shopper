import { createUserInDatabase } from "../repositories/userRepository";

export const createUser = async (id: string, name: string) => {
  try {
    // Call repository to save user
    const user = await createUserInDatabase(id, name);
    return user;
  } catch (error) {
    throw new Error("Failed to create user.");
  }
};
