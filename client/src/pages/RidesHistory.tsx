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
import axios from "axios";

interface Trip {
  id: number;
  origin: string;
  destination: string;
  driverName: string;
  date: string;
  distance: string;
}

const RidesHistory: React.FC = () => {
  const { currentUser } = useSelector((state: any) => state.userReducer || {});
  const [rides, setRides] = useState<Trip[]>([
    {
      id: 1,
      origin: "Porto Alegre, RS",
      destination: "Novo Hamburgo, RS",
      driverName: "João Silva",
      date: "2024-11-20T14:00:00.000Z",
      distance: "30 km",
    },
    {
      id: 2,
      origin: "São Paulo, SP",
      destination: "Campinas, SP",
      driverName: "Maria Oliveira",
      date: "2024-11-18T09:00:00.000Z",
      distance: "100 km",
    },
  ]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        if (!currentUser?.id) return;

        // Substitua pela sua API
        const response = await axios.get(
          `/api/trips/history/${currentUser.id}`
        );
        setRides(response.data.trips);
      } catch (error) {
        console.error("Erro ao buscar histórico de viagens:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [currentUser]);

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
                  <TableCell>{ride.driverName}</TableCell>
                  <TableCell>
                    {new Date(ride.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{ride.distance}</TableCell>
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
