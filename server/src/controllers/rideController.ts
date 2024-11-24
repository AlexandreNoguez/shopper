import { Request, Response } from "express";

export const calculateRide = (req: Request, res: Response) => {
  const { origin, destination } = req.body;
  // Integração com Google Maps aqui
  res.json({ distance: 15.2, estimatedPrice: 30 });
};

export const confirmRide = (req: Request, res: Response) => {
  const { tripData } = req.body;
  // Salvar viagem no banco
  res.status(201).json({ message: "Ride confirmed!", tripId: "12345" });
};

export const getRides = (req: Request, res: Response) => {
  const customerId = req.params.customer_id;
  const driverId = req.query.driver_id;

  if (!driverId) {
    return res.status(400).send("Driver ID is required");
  }
  res.send(`Customer ID: ${customerId}, Driver ID: ${driverId}`);
};
