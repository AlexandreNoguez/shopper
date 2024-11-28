import React, { useEffect, useState, ChangeEvent } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useSelector } from "react-redux";
import { formatDistance } from "../helpers/formatString";
import { getAllDrivers } from "../services/driverService";
import { getUserRides } from "../services/rideService";

interface Ride {
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
  const { id: loggedInUserId } = useSelector(
    (state: any) => state.userReducer || {}
  );
  const [userId, setUserId] = useState<string | null>(loggedInUserId);
  const [driverId, setDriverId] = useState<string | undefined>("all");
  const [rides, setRides] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [drivers, setDrivers] = useState<{ id: number; name: string }[]>([]);

  const fetchRides = async () => {
    setLoading(true);
    try {
      const response = await getUserRides(loggedInUserId);
      console.log(response);

      setRides(response.rides);
    } catch (error) {
      console.error("Erro ao buscar viagens:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllDrivers = async () => {
    // Suponha que há um serviço para obter motoristas
    // Altere `getDrivers` para o serviço correto
    try {
      const response = await getAllDrivers(); // Deve retornar [{ id, name }]
      setDrivers(response);
    } catch (error) {
      console.error("Erro ao buscar motoristas:", error);
    }
  };

  useEffect(() => {
    fetchAllDrivers();
    fetchRides();
  }, []);
  console.log(rides);

  const handleFilter = (event: React.FormEvent) => {
    event.preventDefault();
    fetchRides();
  };
  console.log(rides);
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom textAlign={"center"}>
        Veja seu Histórico de Viagens
      </Typography>

      <Box
        component="form"
        onSubmit={handleFilter}
        sx={{
          display: "flex",
          gap: 2,
          marginBottom: 4,
          flexDirection: { xs: "column", md: "row" },
          backgroundColor: "white",
          borderRadius: 2,
          p: 4,
        }}
      >
        <TextField
          label="ID do Usuário"
          value={userId}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUserId(e.target.value)
          }
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Motorista</InputLabel>
          <Select
            value={driverId}
            onChange={(e) => setDriverId(e.target.value)}
            displayEmpty
          >
            <MenuItem value="all">Todos</MenuItem>
            {drivers.map((driver) => (
              <MenuItem key={driver.id} value={driver.id}>
                {driver.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Aplicar Filtro
        </Button>
      </Box>

      {/* Tabela de Viagens */}
      {loading ? (
        <Typography variant="body1">Carregando...</Typography>
      ) : rides.length === 0 ? (
        <Typography variant="body1">
          Nenhum histórico de viagens encontrado.
        </Typography>
      ) : (
        <Paper elevation={3} sx={{ overflow: "hidden" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Data e Hora</strong>
                </TableCell>
                <TableCell>
                  <strong>Motorista</strong>
                </TableCell>
                <TableCell>
                  <strong>Origem</strong>
                </TableCell>
                <TableCell>
                  <strong>Destino</strong>
                </TableCell>
                <TableCell>
                  <strong>Distância</strong>
                </TableCell>
                <TableCell>
                  <strong>Duração</strong>
                </TableCell>
                <TableCell>
                  <strong>Valor</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rides.map((ride: Ride) => (
                <TableRow key={ride.id}>
                  <TableCell>{new Date(ride?.date).toLocaleString()}</TableCell>
                  <TableCell>{ride?.driver?.name}</TableCell>
                  <TableCell>{ride?.origin}</TableCell>
                  <TableCell>{ride?.destination}</TableCell>
                  <TableCell>{formatDistance(ride.distance)}</TableCell>
                  <TableCell>{ride?.duration}</TableCell>
                  <TableCell>{`R$ ${ride?.value.toFixed(2)}`}</TableCell>
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
