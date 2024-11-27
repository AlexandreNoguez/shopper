import { getDriversByMinKm } from "../repositories/driverRepository";
import { getRouteDetails } from "../utils/googleApi";

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

  return {
    origin,
    destination,
    distance,
    duration,
    options: drivers,
    routeResponse: routeDetails.data,
  };
};
