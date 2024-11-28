import prisma from "../prisma/client";

interface RideData {
  customer_id: number;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver_id: number;
  value: number;
}

export const saveRideToDatabase = async (rideData: RideData) => {
  // Salva a viagem no banco de dados
  const ride = await prisma.ride.create({
    data: {
      userId: rideData.customer_id,
      driverId: rideData.driver_id,
      origin: rideData.origin,
      destination: rideData.destination,
      distance: `${rideData.distance}`, // Converte para string conforme o schema
      duration: rideData.duration,
      date: new Date(), // Adiciona a data atual
    },
  });

  return ride;
};

export const getRidesFromDatabase = async (
  customerId: number,
  driverId?: number
) => {

  return await prisma.ride.findMany({
    where: {
      userId: String(customerId),
      ...(driverId && { driverId }),
    },
    orderBy: {
      date: "desc",
    },
    select: {
      id: true,
      date: true,
      origin: true,
      destination: true,
      distance: true,
      duration: true,
      driver: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};
