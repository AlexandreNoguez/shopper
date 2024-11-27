import React from "react";
import {
  Modal,
  Box,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";

interface Driver {
  id: number;
  name: string;
  description: string;
  carId: number;
  ratePerKm: number;
  minKm: number;
  estimatedCost: number;
}

interface DriversModalProps {
  open: boolean;
  onSelectDriver: (driver: object) => void;
  onClose: () => void;
  drivers?: Driver[] | null;
}

const DriversModal: React.FC<DriversModalProps> = ({
  open,
  onClose,
  drivers,
  onSelectDriver,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: "600px",
          bgcolor: "white",
          boxShadow: 24,
          p: 2,
          borderRadius: 2,
          overflowY: "auto", // Scroll em telas menores
          maxHeight: "80vh",
        }}
      >
        <Typography variant="h6" textAlign="center" mb={3}>
          Motoristas Disponíveis
        </Typography>
        {drivers?.length
          ? drivers.map((driver) => (
              <Card
                key={driver.id}
                sx={{
                  mb: 2,
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  boxShadow: "none",
                  "&:hover": {
                    boxShadow: 2,
                  },
                }}
                onClick={() => {
                  onClose();
                  onSelectDriver({
                    id: driver.id,
                    name: driver.name,
                    value: driver.estimatedCost,
                  });
                }}
              >
                <CardContent>
                  <Typography variant="h6">{driver.name}</Typography>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    {driver.description}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Taxa:</strong> R$ {driver.ratePerKm.toFixed(2)} / km
                  </Typography>
                  <Typography variant="body1">
                    <strong>Distância mínima:</strong> {driver.minKm} km
                  </Typography>
                  <Typography>
                    Valor estimado:{" "}
                    {driver.estimatedCost
                      ? `R$ ${driver.estimatedCost}`
                      : "Distância insuficiente"}
                  </Typography>
                </CardContent>
              </Card>
            ))
          : null}
        <Box display="flex" justifyContent="center" mt={2}>
          <Button variant="outlined" onClick={onClose}>
            Fechar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DriversModal;
