import { Request, Response } from "express";
import { getRouteDetails } from "../services/rideService";

export const getCalculateRide = async (req: Request, res: Response) => {
  const { customer_id, origin, destination } = req.body;
  if (!customer_id || !origin || !destination) {
    return res.status(400).json({ message: "All fields must be filled" });
  }

  if (origin === destination) {
    return res
      .status(400)
      .json({ message: "Origin and destination must be different" });
  }

  try {
    const calculate = await getRouteDetails(origin, destination);

    return res.status(200).json(calculate);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
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
