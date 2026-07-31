export type CrowdStatus = 'Clear' | 'Moderate' | 'Heavy' | 'Choked';

export interface LocationCoordinates {
  lng: number;
  lat: number;
}

export interface LocationNode {
  id: string;
  name: string;
  region: string;
  category: 'Pilgrimage' | 'Hill Station' | 'Transit Hub' | 'Tourist Spot';
  coordinates: LocationCoordinates; // [lng, lat]
  currentCrowdScore: number; // 0 to 100
  crowdStatus: CrowdStatus;
  capacityLimit: number;
  lastUpdated: string;
  description: string;
  historicalPeakHour?: string;
}

export interface TimelinePoint {
  date: string;
  dayName: string;
  predictedScore: number;
  status: CrowdStatus;
  heuristicNote: string;
}

export interface CrowdsourcedReportPayload {
  locationId: string;
  locationName: string;
  userCoordinates: LocationCoordinates;
  reportedStatus: CrowdStatus;
  crowdScoreEstimate: number;
  comment?: string;
  timestamp: string;
}

export interface RadiusQueryFilter {
  userCoordinates: LocationCoordinates | null;
  radiusKm: number;
  activeCategory: string | 'All';
}
