import { Ride } from "../pages/GoogleMapView";

export const validateRideData = (data: Ride): string | null => {
  if (!data.customer_id) return "Usuário não identificado.";
  if (!data.origin || !data.destination)
    return "Origem e destino são obrigatórios.";
  if (!data.driver) return "Selecione um motorista.";
  if (!data.value) return "Valor estimado é necessário.";
  return null;
};
