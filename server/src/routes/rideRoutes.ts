import { Router } from "express";
import {
  getCalculateRide,
  confirmRide,
  getUserRides,
} from "../controllers/rideController";

const router = Router();

router.post("/estimate", getCalculateRide);
router.patch("/confirm", confirmRide);
router.get("/:customer_id", getUserRides);

export default router;
