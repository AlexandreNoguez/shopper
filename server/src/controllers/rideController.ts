import { Request, Response } from "express";
import { getRouteDetails } from "../utils/googleApi";
import { calculateRide } from "../services/rideService";

export const getCalculateRide = async (req: Request, res: Response) => {
  const { customer_id, origin, destination } = req.body;
  // if (!customer_id || !origin || !destination) {
  //   throw new Error("All fields must be filled");
  // }
  console.log("BODY", req.body);

  try {
    // const calculate = calculateRide();
    // const calculateServiceRode = await calculateRide();
    // console.log("calculateServiceRode", calculateServiceRode);

    const calculate = await getRouteDetails(origin, destination);
    console.log("calculate", calculate);

    res.status(200).json(calculate);
    // calculateRoute(customer_id, origin, destination);
  } catch (error) {
    console.error(error);

    throw new Error("Failed to calculate route, try again later.");
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
