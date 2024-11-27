import prisma from "../prisma/client";

export const getAll = async () => {
  prisma.driver.findMany({
    include: {
      car: true, // Inclui os dados do carro relacionado
    },
  });
};
