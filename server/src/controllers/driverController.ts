import { Request, Response } from "express";
import { getAll } from "../services/driverService";

export const getAllDrivers = async (req: Request, res: Response) => {
  try {
    // Busca todos os motoristas na tabela Driver
    const drivers = await getAll();

    // Retorna os motoristas em formato JSON
    res.status(200).json(drivers);
  } catch (error) {
    console.error("Error fetching drivers:", error);
    res.status(500).json({ error: "Failed to fetch drivers" });
  }
};
