import { fetchDriversFromDatabase } from "../repositories/driverRepository";

/**
 * Serviço para buscar todos os motoristas.
 */
export const fetchAllDrivers = async () => {
  try {
    // Busca os motoristas do repositório
    return await fetchDriversFromDatabase();
  } catch (error) {
    console.error("Error in driver service:", error);
    throw new Error("Failed to fetch drivers");
  }
};
