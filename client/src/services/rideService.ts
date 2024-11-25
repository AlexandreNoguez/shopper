import { decode } from "@googlemaps/polyline-codec";
import Api from "./axiosConfig";
import { AxiosError } from "axios";

interface RideEstimateRequest {
  customer_id: number;
  origin: string;
  destination: string;
}

interface LatLng {
  lat: number;
  lng: number;
}

interface RideEstimateResponse {
  distance: string;
  duration: string;
  path: LatLng[];
}

export const getRideEstimate = async (
  request: RideEstimateRequest
): Promise<RideEstimateResponse> => {
  try {
    const { data } = await Api.post("/ride/estimate", request);

    if (data.status === "OK") {
      const polyline = data.routes[0].overview_polyline.points;
      const decodedPath = decode(polyline).map(([lat, lng]) => ({
        lat,
        lng,
      }));

      return {
        distance: data.routes[0].legs[0].distance.text,
        duration: data.routes[0].legs[0].duration.text,
        path: decodedPath,
      };
    } else {
      throw new Error(data.error_message || "Erro desconhecido na API");
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Erro ao calcular rota:", error);
      throw new Error(`Erro na API: ${error.message}`);
    }
    throw error;
  }
};
