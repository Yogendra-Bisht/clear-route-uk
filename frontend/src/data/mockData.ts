import { LocationNode, TimelinePoint } from '@/types/location';

export const INITIAL_UTTARAKHAND_NODES: LocationNode[] = [
  {
    id: 'haridwar-harkipauri',
    name: 'Har Ki Pauri Ghat',
    region: 'Haridwar',
    category: 'Pilgrimage',
    coordinates: { lng: 78.1636, lat: 29.9557 },
    currentCrowdScore: 84,
    crowdStatus: 'Choked',
    capacityLimit: 50000,
    lastUpdated: '5 mins ago',
    description: 'Central Ganga Aarti ghat. Heavy surge during evening prayers & weekend Yatras.',
    historicalPeakHour: '18:00 - 20:00 IST'
  },
  {
    id: 'rishikesh-trivenighat',
    name: 'Triveni Ghat & Ram Jhula',
    region: 'Rishikesh',
    category: 'Pilgrimage',
    coordinates: { lng: 78.2932, lat: 30.1034 },
    currentCrowdScore: 62,
    crowdStatus: 'Heavy',
    capacityLimit: 30000,
    lastUpdated: '12 mins ago',
    description: 'High footfall near suspension bridges and rafting embarkation points.',
    historicalPeakHour: '17:00 - 19:30 IST'
  },
  {
    id: 'sonprayag-gateway',
    name: 'Sonprayag Yatra Gateway',
    region: 'Rudraprayag',
    category: 'Transit Hub',
    coordinates: { lng: 79.0069, lat: 30.6308 },
    currentCrowdScore: 91,
    crowdStatus: 'Choked',
    capacityLimit: 15000,
    lastUpdated: '2 mins ago',
    description: 'Primary vehicle halt point for Kedarnath trek. High vehicle queue congestion.',
    historicalPeakHour: '04:00 - 09:00 IST'
  },
  {
    id: 'kedarnath-dham',
    name: 'Kedarnath Temple Precinct',
    region: 'Rudraprayag',
    category: 'Pilgrimage',
    coordinates: { lng: 79.0669, lat: 30.7346 },
    currentCrowdScore: 78,
    crowdStatus: 'Heavy',
    capacityLimit: 12000,
    lastUpdated: '10 mins ago',
    description: 'Holy shrine plaza. High Darshan queue waiting times (3-5 hours).',
    historicalPeakHour: '06:00 - 14:00 IST'
  },
  {
    id: 'mussoorie-mallroad',
    name: 'Mall Road & Library Chowk',
    region: 'Dehradun',
    category: 'Hill Station',
    coordinates: { lng: 78.0746, lat: 30.4598 },
    currentCrowdScore: 45,
    crowdStatus: 'Moderate',
    capacityLimit: 20000,
    lastUpdated: '18 mins ago',
    description: 'Tourist promenade. Moderate weekend vehicular slowdown near Picture Palace.',
    historicalPeakHour: '16:00 - 21:00 IST'
  },
  {
    id: 'nainital-mallital',
    name: 'Mallital & Naini Lake Promenade',
    region: 'Nainital',
    category: 'Hill Station',
    coordinates: { lng: 79.4542, lat: 29.3919 },
    currentCrowdScore: 28,
    crowdStatus: 'Clear',
    capacityLimit: 25000,
    lastUpdated: '25 mins ago',
    description: 'Normal traffic flow around lake perimeter. Parking available at Sukhatal.',
    historicalPeakHour: '15:00 - 19:00 IST'
  }
];

export const INITIAL_7DAY_FORECAST: TimelinePoint[] = [
  {
    date: '2026-08-01',
    dayName: 'Saturday',
    predictedScore: 88,
    status: 'Choked',
    heuristicNote: 'Weekend Chardham surge + Shravan Mela pilgrimage peak traffic.'
  },
  {
    date: '2026-08-02',
    dayName: 'Sunday',
    predictedScore: 82,
    status: 'Choked',
    heuristicNote: 'High return traffic flow towards Dehradun/Delhi national highways.'
  },
  {
    date: '2026-08-03',
    dayName: 'Monday',
    predictedScore: 42,
    status: 'Moderate',
    heuristicNote: 'Mid-week baseline drop across hill stations; steady Yatra registration flow.'
  },
  {
    date: '2026-08-04',
    dayName: 'Tuesday',
    predictedScore: 35,
    status: 'Clear',
    heuristicNote: 'Lowest predicted congestion day. Recommended for temple Darshan transit.'
  },
  {
    date: '2026-08-05',
    dayName: 'Wednesday',
    predictedScore: 38,
    status: 'Clear',
    heuristicNote: 'Smooth vehicular movement across Rishikesh bypass and Haridwar highways.'
  },
  {
    date: '2026-08-06',
    dayName: 'Thursday',
    predictedScore: 55,
    status: 'Moderate',
    heuristicNote: 'Pre-weekend arrivals start accumulating at Sonprayag & Rishikesh hubs.'
  },
  {
    date: '2026-08-07',
    dayName: 'Friday',
    predictedScore: 74,
    status: 'Heavy',
    heuristicNote: 'Weekend tourist inflow surge beginning Friday evening.'
  }
];
