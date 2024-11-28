import prisma from "../prisma/client";
import { getRidesByCustomer } from "../services/rideService";

describe("User Service", () => {
  it("should fetch a user by ID", async () => {
    const mockUser = { id: "123456", name: "John Doe" };

    jest.spyOn(prisma.user, "findUnique").mockResolvedValue(mockUser);

    const result = await getRidesByCustomer(123456);

    expect(result).toEqual(mockUser);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: "123456" },
    });
  });
});
