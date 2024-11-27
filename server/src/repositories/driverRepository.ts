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
  try {
    return await prisma.driver.findMany();
  } catch (error) {
    console.error("Error in driver repository:", error);
    throw new Error("Failed to fetch drivers from database");
  }
};