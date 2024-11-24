import prisma from "../prisma/client";

export const saveRoute = async (
  customer_id: number,
  origin: string,
  destination: string,
  distance: number,
  duration: number
) => {
  return prisma.ride.create({
    data: { customer_id, origin, destination, distance, duration },
  });
};
