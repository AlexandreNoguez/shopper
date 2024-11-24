import axios from "axios";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || "";

// Base URL da API de rotas do Google
const GOOGLE_DIRECTIONS_URL = `https://maps.googleapis.com/maps/api/directions/json?`;

export const getRouteDetails = async (origin: string, destination: string) => {
  if (!GOOGLE_API_KEY) {
    throw new Error("Google API key is not set in environment variables.");
  }

  try {
    // Enviar a requisição para a API do Google
    const response = await axios.get(GOOGLE_DIRECTIONS_URL, {
      params: {
        origin,
        destination,
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
