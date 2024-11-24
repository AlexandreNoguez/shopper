import { getRouteDetails } from "../utils/googleApi";
import { saveRoute } from "../repositories/tripRepository";

export const calculateAndSaveRoute = async (
  origin: string,
  destination: string
) => {
  const routeData: any = await getRouteDetails(origin, destination);

  if (!routeData.routes.length) {
    throw new Error("No routes found");
  }

  const { distance, duration } = routeData.routes[0].legs[0];
  return saveRoute(origin, destination, distance.value, duration.value);
};
