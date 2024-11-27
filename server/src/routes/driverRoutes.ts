import { Router } from "express";
import { getAllDrivers } from "../controllers/driverController";

const router = Router();

router.get("/", getAllDrivers);
// router.get("/{customer_id}", getRides);

export default router;
