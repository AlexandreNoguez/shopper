import { Router } from "express";
import {
  calculateRide,
  confirmRide,
  getRides,
} from "../controllers/rideController";

const router = Router();

router.post("/estimate", calculateRide);
router.patch("/confirm", confirmRide);
router.get("/{customer_id}", getRides);

export default router;
