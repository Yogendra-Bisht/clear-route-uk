import { LocationCoordinates } from '@/types/location';

/**
 * Calculates Haversine distance between two coordinates in kilometers.
 */
export function calculateDistanceKm(
  coord1: LocationCoordinates,
  coord2: LocationCoordinates
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(coord2.lat - coord1.lat);
  const dLng = toRad(coord2.lng - coord1.lng);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(coord1.lat)) *
      Math.cos(toRad(coord2.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 10) / 10; // Round to 1 decimal place
}

function toRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * Checks if user is within threshold radius (e.g., 2.0 km) of target location for report validation.
 */
export function isWithinGeofence(
  userCoords: LocationCoordinates,
  targetCoords: LocationCoordinates,
  maxDistanceKm: number = 2.0
): { isValid: boolean; distanceKm: number } {
  const distance = calculateDistanceKm(userCoords, targetCoords);
  return {
    isValid: distance <= maxDistanceKm,
    distanceKm: distance,
  };
}
