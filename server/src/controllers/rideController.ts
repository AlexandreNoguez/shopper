import { Request, Response } from "express";
import {
  calculateRideDetails,
  getRidesByCustomer,
  saveRide,
} from "../services/rideService";

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

export const confirmRide = async (req: Request, res: Response) => {
  try {
    const {
      customer_id,
      origin,
      destination,
      distance,
      duration,
      driver,
      value,
    } = req.body;

    // Validações básicas
    if (
      !customer_id ||
      !origin ||
      !destination ||
      !distance ||
      !duration ||
      !driver ||
      !value
    ) {
      return res.status(400).json({ message: "All fields must be provided" });
    }

    // Chama o service para salvar os dados
    const ride = await saveRide({
      customer_id,
      origin,
      destination,
      distance,
      duration,
      driver_id: driver.id, // Extrai o ID do motorista
      value: parseFloat(value), // Converte o valor para número
    });

    // Retorna a resposta de sucesso com os dados da viagem
    return res
      .status(201)
      .json({ message: "Operação realizada com sucesso!", ride });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while confirming the ride.",
      error: error.message,
    });
  }
};

export const getRides = (req: Request, res: Response) => {
  const customerId = req.params.customer_id;
  const driverId = req.query.driver_id;

  if (!driverId) {
    return res.status(400).send("Driver ID is required");
  }
  res.send(`Customer ID: ${customerId}, Driver ID: ${driverId}`);
};

export const getUserRides = async (req: Request, res: Response) => {
  const { customer_id } = req.params;
  const { driver_id } = req.query;
  console.log(req.body);

  // Validações
  if (!customer_id) {
    return res
      .status(400)
      .json({ message: "O id do usuário não pode estar em branco." });
  }

  if (driver_id && isNaN(Number(driver_id))) {
    return res
      .status(400)
      .json({ message: "O id do motorista precisa ser um número válido." });
  }

  try {
    const rides = await getRidesByCustomer(
      Number(customer_id),
      Number(driver_id)
    );

    return res.status(200).json({
      customer_id,
      rides,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Erro ao buscar as viagens do usuário.", error });
  }
};