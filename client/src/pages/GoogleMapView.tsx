import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Box, Typography } from "@mui/material";
import {
  GoogleMap,
  Marker,
  Polyline,
  useLoadScript,
} from "@react-google-maps/api";

import BaseButton from "../components/BaseButton";
import BaseInput from "../components/BaseInput";
import useWindowSize from "../hooks/useSizeObserver";
import {
  DistanceDuration,
  Driver,
  getRideEstimate,
  saveUserRide,
} from "../services/rideService";
import FloatingRideDetails from "../components/FloatingRideDetails";
import { validateRideData } from "../helpers/handleErrors";

export interface LatLng {
  lat: number;
  lng: number;
}

export interface SelectedDriver {
  id: number;
  name: string;
  value?: number | null;
}

export interface Ride {
  customer_id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: SelectedDriver;
  value: number;
}

const GoogleMapView: React.FC = () => {
  const navigate = useNavigate();

  const [origin, setOrigin] = useState<string>("Porto Alegre, RS");
  const [destination, setDestination] = useState<string>("Novo Hamburgo, RS");
  const [startLocation, setStartLocation] = useState<LatLng | null>(null);
  const [endLocation, setEndLocation] = useState<LatLng | null>(null);
  const [drivers, setDrivers] = useState<Driver[] | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [polylinePath, setPolylinePath] = useState<LatLng[] | null>(null);
  const [showRideDetails, setShowRideDetails] = useState<boolean>(false);
  const [rideData, setRideData] = useState<Ride>({
    customer_id: "",
    origin: "",
    destination: "",
    distance: 0,
    duration: "",
    driver: { id: 0, name: "" },
    value: 0,
  });

  const [distanceKm, setDistanceKm] = useState<DistanceDuration>({
    text: "",
    value: 0,
  });
  const [rideDuration, setRideDuration] = useState<DistanceDuration>({
    text: "",
    value: 0,
  });
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
    setDistanceKm({ text: "", value: 0 });
    setRideDuration({ text: "", value: 0 });
    setPolylinePath(null);
    setStartLocation(null);
    setEndLocation(null);
    setDrivers([]);
    setShowRideDetails(true);

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
      setStartLocation(result.origin);
      setEndLocation(result.destination);
      setDrivers(result.options);

      if (mapRef.current && result.path.length > 0) {
        const bounds = new google.maps.LatLngBounds();
        result.path.forEach((point) => bounds.extend(point));
        mapRef.current.fitBounds(bounds);
        setMapCenter(result.path[0]);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Erro ao calcular rota. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const onSelectDriver = (selectedDriver: SelectedDriver) => {
    if (!selectedDriver) {
      return toast.warning("Selecione um motorista antes de confirmar!");
    }
    const rideDataToSave: Ride = {
      customer_id: id,
      origin: origin,
      destination: destination,
      distance: distanceKm.value,
      duration: rideDuration.text,
      driver: { id: selectedDriver.id, name: selectedDriver.name },
      value: selectedDriver.value ?? 0,
    };

    setRideData(rideDataToSave);
  };

  const handleConfirmRide = async () => {
    console.log(rideData);

    const validationError = validateRideData(rideData);
    if (validationError) {
      return toast.warning(validationError);
    } else {
      console.log(rideData);
      await saveUserRide(rideData);
      navigate("/busca");
    }
    setShowRideDetails(false);
  };

  const handleCloseRideDetails = () => {
    setShowRideDetails(false);
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

      {isLoaded && (
        <GoogleMap
          center={mapCenter}
          zoom={10}
          mapContainerStyle={{ height: "60vh", width: "100%" }}
          onLoad={(map) => {
            mapRef.current = map;
          }}
        >
          {/* Marcador para o ponto de origem (A) */}
          {startLocation && (
            <Marker
              position={startLocation}
              icon={{
                url: "http://maps.google.com/mapfiles/kml/paddle/A.png",
                scaledSize: new google.maps.Size(32, 32),
              }}
            />
          )}

          {/* Marcador para o ponto de destino (B) */}
          {endLocation && (
            <Marker
              position={endLocation}
              icon={{
                url: "http://maps.google.com/mapfiles/kml/paddle/B.png",
                scaledSize: new google.maps.Size(32, 32),
              }}
            />
          )}
          {polylinePath && <Polyline path={polylinePath} />}
        </GoogleMap>
      )}
      <FloatingRideDetails
        visible={showRideDetails}
        distance={distanceKm}
        duration={rideDuration}
        startLocation={startLocation}
        endLocation={endLocation}
        onConfirm={handleConfirmRide}
        onSelectDriver={onSelectDriver}
        onClose={handleCloseRideDetails}
        drivers={drivers}
        rideData={rideData}
      />
    </Box>
  );
};

export default GoogleMapView;
