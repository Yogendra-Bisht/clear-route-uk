export type CrowdStatus = 'Clear' | 'Moderate' | 'Heavy' | 'Choked';

export interface LocationCoordinates {
  lng: number;
  lat: number;
}

export type DivisionName = 'Garhwal' | 'Kumaon';

export type LocationCategory = 
  | 'Char Dham' 
  | 'Treks & Adventure' 
  | 'Wildlife & Parks' 
  | 'Hill Station' 
  | 'Heritage & Architecture' 
  | 'Pilgrimage' 
  | 'Transit Hub';

export interface LocationNode {
  id: string;
  name: string;
  division: DivisionName;
  district: string;
  region: string;
  category: LocationCategory;
  coordinates: LocationCoordinates; // [lng, lat]
  currentCrowdScore: number; // 0 to 100
  crowdStatus: CrowdStatus;
  capacityLimit: number;
  lastUpdated: string;
  description: string;
  imageUrl: string;
  altitude?: string;
  bestTimeToVisit?: string;
  highlights?: string[];
  travelAlert?: string;
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

// ── Trip Planner Types ───────────────────────────────────────────────────────

export type BudgetTier = 'Budget' | 'Moderate' | 'Luxury';

export type StayType = 'Homestay' | 'Budget Hotel' | 'Mid-Range Hotel' | 'Resort' | 'Guest House' | 'GMVN / KMVN';

export interface StayListing {
  id: string;
  locationId: string; // references LocationNode.id
  name: string;
  type: StayType;
  phone: string;
  altPhone?: string;
  pricePerNight: number; // INR
  budgetTier: BudgetTier;
  rating: number; // 1-5
  amenities: string[];
  address: string;
}

export interface TripStop {
  locationId: string;
  locationName: string;
  dayIndex: number;     // 1-based
  nightsToStay: number;
  distanceFromPrevKm: number;
  driveTimeHours: number;
  suggestedActivities: string[];
}

export interface TripPlan {
  id: string;
  originCity: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  groupSize: { adults: number; children: number };
  budgetTier: BudgetTier;
  stops: TripStop[];
  estimatedCosts: {
    transport: number;
    accommodation: number;
    food: number;
    entryFees: number;
    miscellaneous: number;
    total: number;
  };
}

