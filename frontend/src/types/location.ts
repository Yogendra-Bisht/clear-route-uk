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

export type TrekDifficulty = 'Easy' | 'Easy-Moderate' | 'Moderate' | 'Moderate-Difficult' | 'Difficult' | 'Strenuous / Expedition';

export interface TrekDetails {
  distanceKm: number;           // Total round-trip or trail distance in km
  durationDays: number;          // Number of trekking days required
  difficulty: TrekDifficulty;    // Toughness rating
  maxAltitudeMeters: number;     // Highest altitude in meters
  baseCamp: string;              // Starting village / trailhead
  bestMonths: string;            // Peak trekking season
  requiresPermit: boolean;       // Permit status (Forest Dept / Inner Line)
  permitDetails?: string;        // Permit authority / process
  itinerarySummary?: string[];   // Day-by-day trek itinerary preview
}

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
  trekDetails?: TrekDetails;     // Granular trek parameters if location is a trek/adventure site
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

// ── Folk & Popular Music Types ────────────────────────────────────────────────

export type MusicCategory = 'Folk Legend' | 'Modern Pahadi Band' | 'Traditional Instrument' | 'Cultural Genre';

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  genre: string;
  duration?: string;
  youtubeUrl?: string;
  spotifyUrl?: string;
  coverImage?: string;
}

export interface FolkArtist {
  id: string;
  name: string;
  category: MusicCategory;
  region: DivisionName | 'Statewide';
  title: string; // e.g. "Voice of the Hills", "Padma Shri Folk Singer"
  bio: string;
  imageUrl: string;
  popularTracks: MusicTrack[];
  instrumentsPlayed?: string[];
  associatedValleys?: string[];
}

export interface TraditionalInstrument {
  id: string;
  name: string;
  regionalName: string;
  material: string;
  description: string;
  usedIn: string;
  imageUrl: string;
}

// ── Natural Disaster Intelligence Types ─────────────────────────────────────

export type DisasterSeverity = 'Critical' | 'Severe' | 'Moderate' | 'Historical Warning';

export type DisasterCategory = 'Flash Flood' | 'Landslide' | 'Glacial Outburst' | 'Land Subsidence' | 'Earthquake' | 'Cloudburst';

export interface DisasterImpact {
  livesAffected?: string;
  infrastructureDamage: string;
  affectedCorridors: string[];
  reconstructionStatus: string;
  currentSafetyAdvice: string;
}

export interface DisasterEvent {
  id: string;
  title: string;
  year: number;
  dateStr: string;
  category: DisasterCategory;
  district: string;
  region: DivisionName;
  severity: DisasterSeverity;
  coordinates: LocationCoordinates;
  summary: string;
  impact: DisasterImpact;
  lessonsLearned: string[];
  currentSafetyScore: number; // 0 to 100 (100 = safe corridor today)
  mitigationMeasures: string[];
  imageUrl: string;
}

