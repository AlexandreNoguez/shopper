import { Request, Response } from "express";
import prisma from "../prisma/client";

// Se der tempo, implementar Grafana ou Prometheus
export const healthService = async (req: Request, res: Response) => {
  try {
    // Testar conexão com o banco de dados
    await prisma.$queryRaw`SELECT 1`;

    // Resposta de sucesso
    res.status(200).json({
      status: "UP",
      database: "Connected",
      timestamp: new Date().toISOString(),
      message: "Application is running smoothly",
    });
  } catch (error: any) {
    // Resposta de erro
    res.status(500).json({
      status: "DOWN",
      database: "Disconnected",
      timestamp: new Date().toISOString(),
      message: "Application is experiencing issues",
      error: error.message,
    });
  }
};
