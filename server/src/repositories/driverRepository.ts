import prisma from "../prisma/client";

export const getDriversByMinKm = async (distanceInKm: number) => {
  return prisma.driver.findMany({
    where: {
      minKm: {
        lt: distanceInKm,
      },
    },
    orderBy: {
      ratePerKm: "asc",
    },
  });
};

export const fetchDriversFromDatabase = async () => {
  return await prisma.driver.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      ratePerKm: true,
      minKm: true,
      car: {
        select: {
          brand: true,
          model: true,
          year: true,
          description: true,
        },
      },
    },
  });
};