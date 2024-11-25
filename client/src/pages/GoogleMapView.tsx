import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Box, Typography } from "@mui/material";
import { GoogleMap, Polyline, useLoadScript } from "@react-google-maps/api";

import BaseButton from "../components/BaseButton";
import BaseInput from "../components/BaseInput";
import useWindowSize from "../hooks/useSizeObserver";

import Api from "../services/axiosConfig";

const GoogleMapView: React.FC = () => {
  const [origin, setOrigin] = useState<string>("Porto Alegre, RS");
  const [destination, setDestination] = useState<string>("Novo Hamburgo, RS");
  const [loading, setLoading] = useState<boolean>(false);
  const [polylinePath, setPolylinePath] = useState<
    { lat: number; lng: number }[] | null
  >(null);

  const { width } = useWindowSize();
  const { currentUser } = useSelector(
    (rootReducer: any) => rootReducer.userReducer
  );

  const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
  const API_URL = import.meta.env.VITE_API_URL;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_API_KEY,
  });

  const sendOriginDestination = async () => {
    setPolylinePath(null);

    if (!currentUser) {
      return toast.warning("Antes de calcular, faça o login por favor!");
    }

    setLoading(true);

    const requestBody = {
      origin,
      destination,
    };

    try {
      const response = await Api.post(`${API_URL}/ride/estimate`, requestBody);

      if (response.data.status === "OK") {
        const polyline = response.data.routes[0].overview_polyline.points;
        console.log(polyline);

        const path = decodePolyline(polyline); // Decodifica a polilinha
        setPolylinePath(path);
        setLoading(false);
      } else {
        alert(`Erro: ${response.data.error_message}`);
      }
    } catch (error) {
      console.error("Erro ao calcular rota:", error);
    } finally {
      setLoading(false);
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
      <Typography textAlign={"center"} fontSize={32} m={4}>
        Mapa de Rotas
      </Typography>
      <Box
        bgcolor={"white"}
        p={2}
        borderRadius={1}
        sx={{
          display: "flex",
          flexDirection: width < 768 ? "column" : "row",
          justifyContent: "center",
          alignItems: "center",
          // flexDirection: "column",
          gap: 2,
          mb: 4,
        }}
      >
        <Box>
          {/* <p>Origem:</p> */}
          <BaseInput
            label={"Origem"}
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="Digite um ponto de partida"
          />
        </Box>
        <Box>
          {/* <p>Destino:</p> */}
          <BaseInput
            label={"Destino"}
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Digite destino"
          />
        </Box>
        <BaseButton
          disabled={loading}
          sx={{ maxHeight: 32 }}
          onClick={sendOriginDestination}
        >
          Calcular Rota
        </BaseButton>
      </Box>
      {isLoaded && (
        <GoogleMap
          center={{ lat: -30.0277, lng: -51.2287 }}
          zoom={10}
          mapContainerStyle={{ height: "60vh", width: "100%" }}
        >
          {polylinePath && <Polyline path={polylinePath} />}
        </GoogleMap>
      )}
    </Box>
  );
};

export default GoogleMapView;
