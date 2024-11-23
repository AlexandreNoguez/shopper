import express from "express";
import cors from "cors";
import tripRoutes from "./routes/tripRoutes";

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use("/trips", tripRoutes);

export default app;
