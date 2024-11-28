export const formatDistance = (distanceInMeters: number): string => {
  const distanceInKm = distanceInMeters / 1000; // Converte para km
  return `${distanceInKm.toFixed(1).replace(".", ",")} km`; // Formata e substitui "." por ","
};

export function generateRandomString(length: number = 6): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}