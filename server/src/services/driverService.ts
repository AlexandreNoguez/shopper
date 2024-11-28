import { fetchDriversFromDatabase } from "../repositories/driverRepository";

/**
 * Serviço para buscar todos os motoristas.
 */
export const fetchAllDrivers = async () => {
  try {
    // Aqui você pode adicionar lógica adicional, caso necessário
    return await fetchDriversFromDatabase();
  } catch (error) {
    throw new Error("Erro ao buscar motoristas do banco de dados");
  }
};