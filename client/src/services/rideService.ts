import { decode } from "@googlemaps/polyline-codec";
import Api from "./axiosConfig";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { Ride } from "../pages/GoogleMapView";

interface RideEstimateRequest {
  customer_id: number;
  origin: string;
  destination: string;
}

interface LatLng {
  lat: number;
  lng: number;
}

export interface Driver {
  carId: number;
  description: string;
  id: number;
  minKm: number;
  name: string;
  ratePerKm: number;
  estimatedCost: number;
}

interface RideEstimateResponse {
  origin: LatLng;
  destination: LatLng;
  distance: DistanceDuration;
  duration: DistanceDuration;
  options: Driver[] | null;
  path: LatLng[];
}

export interface DistanceDuration {
  text: string;
  value: number;
}

export interface RideResponse {
  customer_id: string;
  rides: {
    id: number;
    date: string;
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    driver: {
      id: number;
      name: string;
    };
    value: number;
  }[];
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
        distance: data.distance,
        duration: data.duration,
        origin: data.origin,
        destination: data.destination,
        options: data.options,
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

export const saveUserRide = async (rideData: Ride) => {
  try {
    await Api.patch("/ride/confirm", rideData);
    toast.success("Operação realizada com sucesso");
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.message);
      console.error("Erro ao salvar corrida:", error);
      throw new Error(`Erro na API: ${error.message}`);
    }
    throw error;
  }
};

export const getUserRides = async (
  customerId: number,
  driverId?: number
): Promise<RideResponse> => {
  try {
    const queryParam = driverId ? `?driver_id=${driverId}` : "";
    const response = await Api.get(`/ride/${customerId}${queryParam}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.message || "Erro ao buscar viagens.");
      console.error("Erro ao buscar viagens:", error);
      throw new Error(`Erro na API: ${error.message}`);
    }
    throw error;
  }
};