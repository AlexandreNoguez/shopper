export const getRouteDetails = jest.fn(() => ({
  areLocationsEqual: false,
  data: {
    routes: [
      {
        legs: [
          {
            start_location: "Porto Alegre, RS",
            end_location: "Novo Hamburgo, RS",
            distance: { value: 45000, text: "45 km" },
            duration: { value: 2700, text: "45 mins" },
          },
        ],
      },
    ],
  },
}));
