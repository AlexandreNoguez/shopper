import { Request, Response } from "express";
import { calculateRideDetails } from "../services/rideService";

export const getCalculateRide = async (req: Request, res: Response) => {
  const {
    customer_id,
    origin: startLocation,
    destination: endLocation,
  } = req.body;

  if (!customer_id || !startLocation || !endLocation) {
    return res.status(400).json({ message: "All fields must be filled" });
  }

  try {
    const rideDetails = await calculateRideDetails(startLocation, endLocation);

    return res.status(200).json(rideDetails);
  } catch (error: any) {
    console.error(error);

    if (error.message === "Origem e destino devem ser diferentes!") {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal server error" });
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
