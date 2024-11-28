import prisma from "../prisma/client";
import { RideData } from "../services/rideService";

export const saveRideToDatabase = async (rideData: RideData) => {
  const ride = await prisma.ride.create({
    data: {
      userId: String(rideData.customer_id), // Corrigido para string
      driverId: rideData.driver_id,
      origin: rideData.origin,
      destination: rideData.destination,
      distance: String(rideData.distance), // Converte distância para string se necessário
      duration: rideData.duration,
      date: new Date(),
    },
  });
  return ride;
};
