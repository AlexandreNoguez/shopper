import { Car, Review, Ride } from "@prisma/client";
import prisma from "../prisma/client";
import { getDriversByMinKm } from "../repositories/driverRepository";

interface Driver {
  id: number;
  name: string;
  description?: string;
  carId: string;
  car?: Car;
  ratePerKm: number;
  minKm: number;
  rides?: Ride[];
  reviews?: Review[];
}

describe("Driver Service", () => {
  it("should fetch drivers based on minimum km", async () => {
    const mockDrivers: Driver[] = [
      {
        id: 1,
        name: "Driver 1",
        description: "Experienced driver",
        carId: "1",
        car: undefined,
        ratePerKm: 2.0,
        minKm: 5,
        rides: [],
        reviews: [],
      },
      {
        id: 2,
        name: "Driver 2",
        description: "New driver",
        carId: "2",
        car: undefined,
        ratePerKm: 2.5,
        minKm: 10,
        rides: [],
        reviews: [],
      },
    ];

    // Mock do prisma
    jest.spyOn(prisma.driver, "findMany").mockResolvedValue(mockDrivers);

    const result = await getDriversByMinKm(8);

    // Verificações
    expect(result).toEqual(mockDrivers);
    expect(prisma.driver.findMany).toHaveBeenCalledWith({
      where: { minKm: { lte: 8 } },
    });
  });
});
