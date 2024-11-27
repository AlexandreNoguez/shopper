import express from "express";
import cors from "cors";

import userRoutes from "./routes/userRoutes";
import driverRoutes from "./routes/driverRoutes";
import rideRoutes from "./routes/rideRoutes";
import healthRoutes from "./routes/healthRoutes";

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/user", userRoutes);
app.use("/api/driver", driverRoutes);
app.use("/api/ride", rideRoutes);
app.use("/api/health", healthRoutes);

export default app;
