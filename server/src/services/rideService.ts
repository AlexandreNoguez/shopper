import { getDriversByMinKm } from "../repositories/driverRepository";
import {
  getRidesFromDatabase,
  saveRideToDatabase,
} from "../repositories/rideRepository";
import { getRouteDetails } from "../utils/googleApi";

export interface RideData {
  customer_id: number;
  origin: string;
  destination: string;
  distance: number; // Em metros
  duration: string;
  driver_id: number;
  value: number; // Em reais
}

export const calculateRideDetails = async (
  startLocation: string,
  endLocation: string
) => {
  const routeDetails = await getRouteDetails(startLocation, endLocation);

  if (routeDetails.areLocationsEqual) {
    throw new Error("Origem e destino devem ser diferentes!");
  }

  const origin = routeDetails.data.routes[0].legs[0].start_location;
  const destination = routeDetails.data.routes[0].legs[0].end_location;
  const distance = routeDetails.data.routes[0].legs[0].distance;
  const duration = routeDetails.data.routes[0].legs[0].duration;

  const distanceInKm = distance.value / 1000;

  const drivers = await getDriversByMinKm(distanceInKm);

  const driversWithCost = drivers.map((driver) => {
    const estimatedCost =
      distanceInKm >= driver.minKm
        ? (distanceInKm * driver.ratePerKm).toFixed(2)
        : null;

    return {
      ...driver,
      estimatedCost, // Inclui o custo calculado no retorno
    };
  });

  return {
    origin,
    destination,
    distance,
    duration,
    options: driversWithCost,
    routeResponse: routeDetails.data,
  };
};

export const saveRide = async (rideData: RideData) => {
  // Validações de regras de negócio podem ser adicionadas aqui
  if (rideData.distance < 1) {
    throw new Error("The distance must be greater than zero.");
  }

  // Formata e salva no banco através do repository
  const savedRide = await saveRideToDatabase(rideData);
  return savedRide;
};

export const getRidesByCustomer = async (
  customerId: number,
  driverId?: number
) => {
  // Chama o repositório para buscar as viagens
  return await getRidesFromDatabase(customerId, driverId);
};
