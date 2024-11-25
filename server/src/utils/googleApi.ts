import axios from "axios";
import {
  GOOGLE_API_KEY,
  GOOGLE_DIRECTIONS_URL,
} from "../constants/googleConfig";

export const getRouteDetails = async (origin: string, destination: string) => {
  if (!GOOGLE_API_KEY) {
    throw new Error("Google API key is not set in environment variables.");
  }
  console.log("body", origin, destination);

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

    if (response.status !== 200 || !response.data.routes.length) {
      throw new Error(
        "No route found or invalid response from Google Maps API."
      );
    }

    return response.data;
  } catch (error: any) {
    throw new Error(`Error fetching route details: ${error.message}`);
  }
};
