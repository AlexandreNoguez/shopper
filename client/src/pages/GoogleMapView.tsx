import React, { useState } from "react";
import axios from "axios";
import { GoogleMap, Polyline, useLoadScript } from "@react-google-maps/api";
import BaseButton from "../components/BaseButton";
import { Box, InputBase } from "@mui/material";

const GoogleMapView: React.FC = () => {
  const [origin, setOrigin] = useState<string>("Porto Alegre, RS");
  const [destination, setDestination] = useState<string>("Novo Hamburgo, RS");
  const [polylinePath, setPolylinePath] = useState<
    { lat: number; lng: number }[] | null
  >(null);

  const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
  const API_URL = import.meta.env.VITE_API_URL;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_API_KEY,
  });

  const sendOriginDestination = async () => {
    // const;
    try {
      const response = await axios.post(API_URL, {
        params: {
          origin,
          destination,
          mode: "driving",
        },
      });

      if (response.data.status === "OK") {
        const polyline = response.data.routes[0].overview_polyline.points;
        const path = decodePolyline(polyline); // Decodifica a polilinha
        setPolylinePath(path);
      } else {
        alert(`Erro: ${response.data.error_message}`);
      }
    } catch (error) {
      console.error("Erro ao calcular rota:", error);
    }
  };

  // método encontrado no stackoverflowd
  const decodePolyline = (encoded: string): { lat: number; lng: number }[] => {
    let points: { lat: number; lng: number }[] = [];
    let index = 0,
      lat = 0,
      lng = 0;

    while (index < encoded.length) {
      let b,
        shift = 0,
        result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      points.push({ lat: lat / 1e5, lng: lng / 1e5 });
    }
    return points;
  };
  console.log("polylinePath", polylinePath);

  return (
    <Box sx={{ width: "100%" }}>
      <h1>Mapa de Rotas</h1>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mb: 4,
        }}
      >
        <Box>
          <p>Origem:</p>
          <InputBase
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="Digite um ponto de partida"
            sx={{
              backgroundColor: "#f0f0f0",
              borderRadius: "5px",
            }}
          />
        </Box>
        <Box>
          <p>Destino:</p>
          <InputBase
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Digite destino"
            sx={{
              backgroundColor: "#f0f0f0",
              borderRadius: "5px",
              paddingInline: 1,
            }}
          />
        </Box>
        <BaseButton onClick={sendOriginDestination}>Calcular Rota</BaseButton>
      </Box>
      {isLoaded && (
        <GoogleMap
          center={{ lat: -30.0277, lng: -51.2287 }}
          zoom={10}
          mapContainerStyle={{ height: "400px", width: "100%" }}
        >
          {polylinePath && <Polyline path={polylinePath} />}
        </GoogleMap>
      )}
    </Box>
  );
};

export default GoogleMapView;
