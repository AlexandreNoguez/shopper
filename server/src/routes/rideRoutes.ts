import { Router } from "express";
import {
  getCalculateRide,
  confirmRide,
  // getRides,
} from "../controllers/rideController";

const router = Router();

router.post("/estimate", getCalculateRide);
router.patch("/confirm", confirmRide);
// router.get("/{customer_id}", getRides);

export default router;
