import { Request, Response } from "express";
import { createUser } from "../services/userService";

export const createUserController = async (req: Request, res: Response) => {
  const { id, name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required." });
  }

  try {
    const user = await createUser(id, name);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the user." });
  }
};
