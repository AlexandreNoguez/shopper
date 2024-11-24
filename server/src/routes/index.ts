import { Router } from "express";
import routeRouter from "./tripRoutes";

const apiRouter = Router();

// Registrar o roteador de "route"
apiRouter.use("/route", routeRouter);

export default apiRouter;
