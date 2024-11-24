import { Request, Response } from "express";
import { healthService } from "../services/healthService";

export const healthController = (req: Request, res: Response) => {
  const { origin, destination } = req.body;
  // Integração com Google Maps aqui
  healthService(req, res);
};
