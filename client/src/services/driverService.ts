import { AxiosError } from "axios";
import Api from "./axiosConfig";

export const getAllDrivers = async (): Promise<
  { id: number; name: string }[]
> => {
  try {
    const response = await Api.get("/driver");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Erro ao calcular rota:", error);
      throw new Error(`Erro na API: ${error.message}`);
    }
    throw error;
  }
};
