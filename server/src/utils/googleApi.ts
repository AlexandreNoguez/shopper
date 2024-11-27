import axios from "axios";
import {
  GOOGLE_API_KEY,
  GOOGLE_DIRECTIONS_URL,
} from "../constants/googleConfig";
import { areCoordinatesEqual } from "./compareFunctions";

export const getRouteDetails = async (origin: string, destination: string) => {
  if (!GOOGLE_API_KEY) {
    throw new Error("Google API key is not set in environment variables.");
  }

  if (!origin || !destination) {
    throw new Error(`Origin and destination must be provided`);
  }

  try {
    // Enviar a requisição para a API do Google
    const response = await axios.get(GOOGLE_DIRECTIONS_URL, {
      params: {
        origin,
        destination,
        mode: "driving",
        key: GOOGLE_API_KEY,
      },
    });
    const startLocation = response.data.routes[0].legs[0].start_location;
    const endLocation = response.data.routes[0].legs[0].end_location;
    const areLocationsEqual = areCoordinatesEqual(startLocation, endLocation);

    return { data: response.data, areLocationsEqual };
  } catch (error: any) {
    throw new Error(`Error fetching route details: ${error.message}`);
  }
};
