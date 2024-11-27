import { decode } from "@googlemaps/polyline-codec";
import Api from "./axiosConfig";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

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

    if (data.routeResponse.status === "OK") {
      const polyline = data.routeResponse.routes[0].overview_polyline.points;
      const decodedPath = decode(polyline).map(([lat, lng]) => ({
        lat,
        lng,
      }));

      return {
        path: decodedPath,
        distance: data.distance.text,
        duration: data.duration.text,
      };
    } else {
      throw new Error(data.error_message || "Erro desconhecido na API");
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.message);
      console.error("Erro ao calcular rota:", error);
      throw new Error(`Erro na API: ${error.message}`);
    }
    throw error;
  }
};
