import { Router } from "express";
import { getAllDrivers } from "../controllers/driverController";

const router = Router();

/**
 * Rota para listar todos os motoristas
 * GET /api/drivers
 */
router.get("/", getAllDrivers);

export default router;
