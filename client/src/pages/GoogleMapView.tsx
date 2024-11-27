import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Box, Typography } from "@mui/material";
import { GoogleMap, Polyline, useLoadScript } from "@react-google-maps/api";

import BaseButton from "../components/BaseButton";
import BaseInput from "../components/BaseInput";
import useWindowSize from "../hooks/useSizeObserver";
import { getRideEstimate } from "../services/rideService";

interface LatLng {
  lat: number;
  lng: number;
}

const GoogleMapView: React.FC = () => {
  const [origin, setOrigin] = useState<string>("Porto Alegre, RS");
  const [destination, setDestination] = useState<string>("Novo Hamburgo, RS");
  const [distanceKm, setDistanceKm] = useState<string>("");
  const [rideDuration, setRideDuration] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [polylinePath, setPolylinePath] = useState<LatLng[] | null>(null);
  const [mapCenter, setMapCenter] = useState<LatLng>({
    lat: -30.0277,
    lng: -51.2287,
  });

  const { width } = useWindowSize();
  const { id, currentUser } = useSelector(
    (rootReducer: any) => rootReducer.userReducer
  );

  const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_API_KEY,
  });

  const mapRef = useRef<google.maps.Map | null>(null);

  const handleCalculateRoute = async () => {
    setPolylinePath(null);

    if (!currentUser) {
      return toast.warning("Antes de calcular, faça o login por favor!");
    }

    if (!origin || !destination) {
      return toast.warning("Origem e destino devem ser preenchidos!");
    }

    setLoading(true);

    try {
      const result = await getRideEstimate({
        customer_id: id,
        origin,
        destination,
      });

      setDistanceKm(result.distance);
      setRideDuration(result.duration);
      setPolylinePath(result.path);

      if (mapRef.current && result.path.length > 0) {
        const bounds = new google.maps.LatLngBounds();
        result.path.forEach((point) => bounds.extend(point));
        mapRef.current.fitBounds(bounds);
        setMapCenter(result.path[0]);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(
        error.message || "Erro ao calcular rota. Tente novamente."
      );

    } finally {
      setLoading(false);
    }
  };

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
          gap: 2,
          mb: 4,
        }}
      >
        <BaseInput
          label={"Origem"}
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          placeholder="Porto Alegre, RS"
        />
        <BaseInput
          label={"Destino"}
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Novo Hamburgo, RS"
        />
        <BaseButton
          disabled={loading}
          sx={{ maxHeight: 32 }}
          onClick={handleCalculateRoute}
        >
          Calcular Rota
        </BaseButton>
      </Box>
      {rideDuration && distanceKm && (
        <Box display={"flex"} justifyContent={"center"} gap={4}>
          <Typography>
            Tempo de deslocamento: <strong>{rideDuration}</strong>
          </Typography>
          <Typography>
            Distância: <strong>{distanceKm}</strong>
          </Typography>
        </Box>
      )}
      {isLoaded && (
        <GoogleMap
          center={mapCenter}
          zoom={10}
          mapContainerStyle={{ height: "60vh", width: "100%" }}
          onLoad={(map) => {
            mapRef.current = map;
          }}
        >
          {polylinePath && <Polyline path={polylinePath} />}
        </GoogleMap>
      )}
    </Box>
  );
};

export default GoogleMapView;
