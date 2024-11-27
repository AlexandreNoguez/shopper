import { Router } from "express";
import { listDrivers } from "../controllers/driverController";

const router = Router();

/**
 * Rota para listar todos os motoristas
 * GET /api/drivers
 */
router.get("/", listDrivers);

export default router;
