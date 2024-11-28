import { Request, Response } from "express";
import { fetchAllDrivers } from "../services/driverService";

/**
 * Controlador para listar todos os motoristas.
 */
export const listDrivers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Busca todos os motoristas usando o serviço
    const drivers = await fetchAllDrivers();

    // Retorna os motoristas no formato JSON
    res.status(200).json(drivers);
  } catch (error) {
    console.error("Error fetching drivers:", error);
    res.status(500).json({ error: "Failed to fetch drivers" });
  }
};

export const getAllDrivers = async (req: Request, res: Response) => {
  try {
    const drivers = await fetchAllDrivers();
    res.status(200).json(drivers);
  } catch (error) {
    console.error("Erro ao buscar motoristas:", error);
    res.status(500).json({ message: "Erro ao buscar motoristas" });
  }
};