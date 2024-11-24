import express from "express";
import cors from "cors";

import { getRouteDetails } from "./utils/googleApi";

import rideRoutes from "./routes/rideRoutes";
import healthRoutes from "./routes/healthRoutes";

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/ride", rideRoutes);
app.use("/api/health", healthRoutes);

// Teste adicional de funcionalidade
// async function getRoute() {
//   const response = await getRouteDetails("Toronto", "Montreal");
//   console.log(response);
// }
// getRoute();

export default app;
