import { AxiosError } from "axios";
import Api from "./axiosConfig";

export const getDrivers = async () => {
  try {
    const { data } = await Api.get("/driver");
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Erro ao calcular rota:", error);
      throw new Error(`Erro na API: ${error.message}`);
    }
    throw error;
  }
};
