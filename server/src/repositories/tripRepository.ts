import prisma from "../prisma/client";

export const saveRoute = async (
  origin: string,
  destination: string,
  distance: number,
  duration: number
) => {
  return prisma.location.create({
    data: { origin, destination, distance, duration },
  });
};
