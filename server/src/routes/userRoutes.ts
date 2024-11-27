import { Router } from "express";
import { createUserController } from "../controllers/userController";

const router = Router();

// Route to create a user
router.post("/", createUserController);

export default router;
