import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useSelector } from "react-redux";
import { getUserRides } from "../services/rideService";
import { formatDistance } from "../helpers/formatString";

interface Trip {
  id: number;
  origin: string;
  destination: string;
  driver: {
    id: number;
    name: string;
  };
  date: string;
  distance: number;
  duration: string;
  value: number;
}

const RidesHistory: React.FC = () => {
  const { id, currentUser } = useSelector(
    (state: any) => state.userReducer || {}
  );
  const [rides, setRides] = useState<Trip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getRidesByUserId = async () => {
    setLoading(true);
    const response = await getUserRides(id);
    setLoading(false);
    setRides(response.rides);
  };
  useEffect(() => {
    getRidesByUserId();
  }, [currentUser]);
  console.log(rides);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Histórico de Viagens
      </Typography>

      {loading ? (
        <Typography variant="body1">Carregando...</Typography>
      ) : rides.length === 0 ? (
        <Typography variant="body1">
          Nenhum histórico de viagens encontrado.
        </Typography>
      ) : (
        <Paper elevation={3} sx={{ overflow: "hidden", mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>ID</strong>
                </TableCell>
                <TableCell>
                  <strong>Origem</strong>
                </TableCell>
                <TableCell>
                  <strong>Destino</strong>
                </TableCell>
                <TableCell>
                  <strong>Motorista</strong>
                </TableCell>
                <TableCell>
                  <strong>Data</strong>
                </TableCell>
                <TableCell>
                  <strong>Distância</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rides.map((ride) => (
                <TableRow key={ride.id}>
                  <TableCell>{ride.id}</TableCell>
                  <TableCell>{ride.origin}</TableCell>
                  <TableCell>{ride.destination}</TableCell>
                  <TableCell>{ride.driver.name}</TableCell>
                  <TableCell>
                    {new Date(ride.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{formatDistance(ride.distance)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
};

export default RidesHistory;
