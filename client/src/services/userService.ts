import { toast } from "react-toastify";
import Api from "./axiosConfig";
import { AxiosError } from "axios";

interface User {
  name: string;
}

export const saveUser = async (userData: User) => {
  try {
    await Api.post("/user", userData);
    toast.success("Cadastro realizado com sucesso");
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.message);
      console.error("Erro ao salvar usuário:", error);
    }
    throw error;
  }
};
