export const formatDistance = (distanceInMeters: number): string => {
  const distanceInKm = distanceInMeters / 1000; // Converte para km
  return `${distanceInKm.toFixed(1).replace(".", ",")} km`; // Formata e substitui "." por ","
};
