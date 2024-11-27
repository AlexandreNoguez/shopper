import React, { Dispatch, SetStateAction, useState } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { Slide } from "react-awesome-reveal";
import { LatLng, Ride, SelectedDriver } from "../pages/GoogleMapView";
import { DistanceDuration, Driver } from "../services/rideService";
import DriversModal from "./DriversModal";

interface FloatingRideDetailsProps {
  distance: DistanceDuration;
  duration: DistanceDuration;
  drivers?: Driver[] | null;
  startLocation?: LatLng;
  endLocation?: LatLng;
  visible: boolean;
  rideData: Ride;
  onConfirm: () => void;
  onSelectDriver: (driver: object) => void;
  onClose: () => void;
  setDriver: Dispatch<SetStateAction<SelectedDriver | null>>;
}

const FloatingRideDetails: React.FC<FloatingRideDetailsProps> = ({
  distance,
  duration,
  startLocation,
  endLocation,
  onConfirm,
  onClose,
  visible,
  drivers,
  onSelectDriver,
  rideData,
}) => {
  if (!visible) return null; // Não renderiza o componente se não estiver visível
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Slide
      direction="right"
      style={{
        position: "fixed",
        top: "50%",
        right: "16px",
        transform: "translateY(-50%)",
        width: "45%",
        padding: 16,
        zIndex: 1000,
        borderRadius: "8px",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          position: "fixed",
          top: "50%",
          right: "16px",
          transform: "translateY(-50%)",
          width: "100%",
          padding: "16px",
          zIndex: 1000,
          borderRadius: "8px",
        }}
      >
        <Typography textAlign={"center"} variant="h6" mb={4}>
          Detalhes da Rota
        </Typography>
        <Box display={"flex"} justifyContent={"space-evenly"}>
          <Typography variant="body1">
            <strong>Distância:</strong> {distance.text}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Tempo estimado:</strong> {duration.value}
          </Typography>
        </Box>
        <Typography textAlign={"center"} variant="h6" gutterBottom>
          Origem
        </Typography>
        <Box display={"flex"} justifyContent={"space-evenly"}>
          <Typography variant="body1" gutterBottom>
            <strong>Latitude:</strong>{" "}
            {startLocation ? startLocation.lat : null}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong> Longitude:</strong>{" "}
            {startLocation ? startLocation.lng : null}
          </Typography>
        </Box>
        <Typography textAlign={"center"} variant="h6" gutterBottom>
          Destino
        </Typography>
        <Box display={"flex"} justifyContent={"space-evenly"}>
          <Typography variant="body1" gutterBottom>
            <strong>Latitude:</strong> {endLocation ? endLocation.lat : null}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong> Longitude:</strong> {endLocation ? endLocation.lng : null}
          </Typography>
        </Box>
        <div>
          <Box
            display={"flex"}
            justifyContent={"space-evenly"}
            alignItems={"center"}
            mt={4}
          >
            <Typography>
              Total: R$ {rideData.value.toString().replace(".", ",")}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setModalOpen(true)}
            >
              Mostrar Motoristas
            </Button>
          </Box>

          <DriversModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            drivers={drivers}
            onSelectDriver={onSelectDriver}
          />
        </div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "16px",
          }}
        >
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="contained" color="primary" onClick={onConfirm}>
            Confirmar Viagem
          </Button>
        </Box>
      </Paper>
    </Slide>
  );
};

export default FloatingRideDetails;
