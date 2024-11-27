import prisma from "../prisma/client";

export const getDriversByMinKm = async (distanceInKm: number) => {
  return prisma.driver.findMany({
    where: {
      minKm: {
        lt: distanceInKm,
      },
    },
  });
};
