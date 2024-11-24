import axios from "axios";
import { saveRoute } from "../repositories/rideRepository";
import { getRouteDetails } from "../utils/googleApi";
import { GOOGLE_API_KEY, GOOGLE_API_URL } from "../constants/googleConfig";

interface LatLng {
  latitude: number;
  longitude: number;
}

interface Waypoint {
  location: {
    latLng: LatLng;
  };
}

// export const calculateRoute = async (
//   customer_id: string,
//   origin: string,
//   destination: string
// ) => {
//   const routeData: any = await getRouteDetails(origin, destination);

//   if (!routeData.routes.length) {
//     throw new Error("No routes found");
//   }

//   const { distance, duration } = routeData.routes[0].legs[0];
//   return saveRoute(
//     customer_id,
//     origin,
//     destination,
//     distance.value,
//     duration.value
//   );
// };

export async function calculateRide() {
  const origin: Waypoint = {
    location: {
      latLng: {
        latitude: -30.0277, // Latitude de Porto Alegre
        longitude: -51.2287, // Longitude de Porto Alegre
      },
    },
  };

  const destination: Waypoint = {
    location: {
      latLng: {
        latitude: -29.6842, // Latitude de Novo Hamburgo
        longitude: -51.1328, // Longitude de Novo Hamburgo
      },
    },
  };

  const requestBody = {
    origin: origin,
    destination: destination,
    travelMode: "DRIVE",
    routingPreference: "TRAFFIC_AWARE",
    computeAlternativeRoutes: false,
    routeModifiers: {
      avoidTolls: false,
      avoidHighways: false,
      avoidFerries: false,
    },
    languageCode: "pt-BR",
    units: "METRIC",
  };

  try {
    const response = await axios.post(GOOGLE_API_URL, requestBody, {
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": GOOGLE_API_KEY,
        "X-Goog-FieldMask":
          "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline",
      },
    });

    const data = response.data;
    console.log("data:", data);
    console.log("Duração:", data.routes[0].duration);
    console.log("Distância (em metros):", data.routes[0].distanceMeters);
    console.log(
      "Polilinha codificada:",
      data.routes[0].polyline.encodedPolyline
    );
    return data;
  } catch (error) {
    console.error("Erro ao calcular a rota:", error);
  }
}
