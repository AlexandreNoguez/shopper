import {
  calculateRideDetails,
  saveRide,
  getRidesByCustomer,
} from "../services/rideService";
import { getDriversByMinKm } from "../repositories/driverRepository";
import { getRouteDetails } from "../utils/googleApi";
import {
  saveRideToDatabase,
  getRidesFromDatabase,
} from "../repositories/rideRepository";

jest.mock("../repositories/driverRepository");
jest.mock("../repositories/rideRepository");
jest.mock("../utils/googleApi");

describe("Ride Service", () => {
  describe("calculateRideDetails", () => {
    it("should calculate ride details and return drivers with estimated costs", async () => {
      const startLocation = "Porto Alegre, RS";
      const endLocation = "Novo Hamburgo, RS";

      const result = await calculateRideDetails(startLocation, endLocation);

      expect(getRouteDetails).toHaveBeenCalledWith(startLocation, endLocation);
      expect(getDriversByMinKm).toHaveBeenCalledWith(45); // Distância em km
      expect(result).toMatchObject({
        origin: "Porto Alegre, RS",
        destination: "Novo Hamburgo, RS",
        distance: { value: 45000, text: "45 km" },
        duration: { value: 2700, text: "45 mins" },
        options: expect.arrayContaining([
          expect.objectContaining({
            id: 1,
            name: "Driver 1",
            estimatedCost: "225.00", // 45 km * 5
          }),
        ]),
      });
    });

    it("should throw an error if origin and destination are the same", async () => {
      (getRouteDetails as jest.Mock).mockResolvedValueOnce({
        areLocationsEqual: true,
      });

      await expect(
        calculateRideDetails("Porto Alegre, RS", "Porto Alegre, RS")
      ).rejects.toThrow("Origem e destino devem ser diferentes!");
    });
  });

  describe("saveRide", () => {
    it("should save a ride and return the saved ride data", async () => {
      const rideData = {
        customer_id: 1,
        origin: "Porto Alegre, RS",
        destination: "Novo Hamburgo, RS",
        distance: 45000,
        duration: "45 mins",
        driver_id: 1,
        value: 225,
      };

      const result = await saveRide(rideData);

      expect(saveRideToDatabase).toHaveBeenCalledWith(rideData);
      expect(result).toMatchObject({
        ...rideData,
        id: 123, // Mocked ID
      });
    });

    it("should throw an error if distance is less than 1", async () => {
      const rideData = {
        customer_id: 1,
        origin: "Porto Alegre, RS",
        destination: "Novo Hamburgo, RS",
        distance: 0,
        duration: "45 mins",
        driver_id: 1,
        value: 225,
      };

      await expect(saveRide(rideData)).rejects.toThrow(
        "The distance must be greater than zero."
      );
    });
  });

  describe("getRidesByCustomer", () => {
    it("should fetch rides for a given customer", async () => {
      const customerId = 1;

      const result = await getRidesByCustomer(customerId);

      expect(getRidesFromDatabase).toHaveBeenCalledWith(customerId, undefined);
      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        origin: "Porto Alegre, RS",
        destination: "Novo Hamburgo, RS",
        distance: 45000,
      });
    });
  });
});
