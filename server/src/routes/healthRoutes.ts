import { Router } from "express";
import { healthService } from "../services/healthService";
const router = Router();

router.get("/", healthService);

export default router;
