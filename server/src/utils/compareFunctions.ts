interface Coordinates {
  lat: number;
  lng: number;
}

// Função para comparar dois objetos do tipo Coordinates
export function areCoordinatesEqual(
  coord1: Coordinates,
  coord2: Coordinates
): boolean {
  return coord1.lat === coord2.lat && coord1.lng === coord2.lng;
}
