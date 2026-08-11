import { LocationNode, TimelinePoint } from '@/types/location';

export const INITIAL_UTTARAKHAND_NODES: LocationNode[] = [
  // GARHWAL DIVISION - CHAR DHAM & HOLY SITES
  {
    id: 'kedarnath-dham',
    name: 'Kedarnath Temple Precinct',
    division: 'Garhwal',
    district: 'Rudraprayag',
    region: 'Kedarnath Valley',
    category: 'Char Dham',
    coordinates: { lng: 79.0669, lat: 30.7346 },
    currentCrowdScore: 78,
    crowdStatus: 'Heavy',
    capacityLimit: 12000,
    lastUpdated: '10 mins ago',
    description: 'One of the twelve Jyotirlingas of Lord Shiva situated at 3,583m in the Garhwal Himalayas. High Darshan queue wait time.',
    imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1000&q=80',
    altitude: '3,583 m',
    bestTimeToVisit: 'May - Jun & Sep - Nov',
    highlights: ['12 Jyotirlingas', 'Bhairavnath Temple', 'Mandakini River', 'Snow Peaks'],
    travelAlert: 'High altitude weather changes rapidly; token system active at Sonprayag.',
    historicalPeakHour: '06:00 - 14:00 IST'
  },
  {
    id: 'badrinath-dham',
    name: 'Badrinath Temple',
    division: 'Garhwal',
    district: 'Chamoli',
    region: 'Alaknanda Valley',
    category: 'Char Dham',
    coordinates: { lng: 79.4937, lat: 30.7433 },
    currentCrowdScore: 72,
    crowdStatus: 'Heavy',
    capacityLimit: 18000,
    lastUpdated: '15 mins ago',
    description: 'Sacred shrine of Lord Vishnu located along the banks of Alaknanda River, flanked by Nar and Narayana mountain ranges.',
    imageUrl: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1000&q=80',
    altitude: '3,133 m',
    bestTimeToVisit: 'May - Jun & Sep - Oct',
    highlights: ['Tapt Kund Hot Springs', 'Mana Village (Last Village of India)', 'Vasu Dhara Falls'],
    travelAlert: 'Moderate traffic flow around Joshimath bypass corridor.',
    historicalPeakHour: '07:00 - 13:00 IST'
  },
  {
    id: 'gangotri-dham',
    name: 'Gangotri Shrine & Gaumukh Trail',
    division: 'Garhwal',
    district: 'Uttarkashi',
    region: 'Bhagirathi Valley',
    category: 'Char Dham',
    coordinates: { lng: 78.9398, lat: 30.9947 },
    currentCrowdScore: 54,
    crowdStatus: 'Moderate',
    capacityLimit: 10000,
    lastUpdated: '20 mins ago',
    description: 'Origin point of the holy River Ganges (Bhagirathi River). White granite temple built by Gorkha commander Amar Singh Thapa.',
    imageUrl: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1000&q=80',
    altitude: '3,100 m',
    bestTimeToVisit: 'May - Jun & Sep - Nov',
    highlights: ['Gaumukh Glacier Trek', 'Bhagirathi Peaks', 'Submerged Shivling'],
    travelAlert: 'Gaumukh permits capped daily; check forest office at Uttarkashi.',
    historicalPeakHour: '08:00 - 12:00 IST'
  },
  {
    id: 'yamunotri-dham',
    name: 'Yamunotri Temple',
    division: 'Garhwal',
    district: 'Uttarkashi',
    region: 'Rawain Valley',
    category: 'Char Dham',
    coordinates: { lng: 78.4600, lat: 31.0140 },
    currentCrowdScore: 68,
    crowdStatus: 'Heavy',
    capacityLimit: 8000,
    lastUpdated: '18 mins ago',
    description: 'The seat of Goddess Yamuna. Requires a steep 6km trek from Janki Chatti through scenic deodar forest trails.',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80',
    altitude: '3,293 m',
    bestTimeToVisit: 'May - Jun & Sep - Oct',
    highlights: ['Surya Kund Thermal Spring', 'Divya Shila', 'Yamuna Glacier Origin'],
    travelAlert: 'Heavy mule and palanquin traffic along Janki Chatti trek path.',
    historicalPeakHour: '06:00 - 11:30 IST'
  },
  {
    id: 'hemkund-sahib',
    name: 'Gurudwara Sri Hemkund Sahib',
    division: 'Garhwal',
    district: 'Chamoli',
    region: 'Bhyundar Valley',
    category: 'Pilgrimage',
    coordinates: { lng: 79.6200, lat: 30.6970 },
    currentCrowdScore: 48,
    crowdStatus: 'Moderate',
    capacityLimit: 5000,
    lastUpdated: '30 mins ago',
    description: 'High-altitude Sikh pilgrimage site surrounded by 7 mountain peaks and a glacial glacial lake reflections.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    altitude: '4,329 m',
    bestTimeToVisit: 'Jun - Oct',
    highlights: ['Glacial Lake', 'Brahma Kamal Blooms', 'Laxman Temple'],
    travelAlert: 'Trek closes by 14:00 IST for safety due to rapid weather shifts.',
    historicalPeakHour: '08:00 - 13:00 IST'
  },

  // GARHWAL DIVISION - TREKS & ADVENTURE
  {
    id: 'valley-of-flowers',
    name: 'Valley of Flowers National Park (UNESCO)',
    division: 'Garhwal',
    district: 'Chamoli',
    region: 'Bhyundar Valley',
    category: 'Treks & Adventure',
    coordinates: { lng: 79.6000, lat: 30.7280 },
    currentCrowdScore: 35,
    crowdStatus: 'Clear',
    capacityLimit: 3000,
    lastUpdated: '12 mins ago',
    description: 'World Heritage site renowned for endemic alpine flower meadows (over 500 species) and rare Asiatic black bear sightings.',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
    altitude: '3,658 m',
    bestTimeToVisit: 'Jul - Sep (Peak Bloom)',
    highlights: ['Brahma Kamal', 'Blue Poppy', 'Pushpawati River', 'Snow Leopard Habitat'],
    travelAlert: 'Day entry permits enforced; overnight stay strictly prohibited inside park.',
    historicalPeakHour: '07:00 - 11:00 IST',
    trekDetails: {
      distanceKm: 38,
      durationDays: 6,
      difficulty: 'Easy-Moderate',
      maxAltitudeMeters: 3658,
      baseCamp: 'Govindghat / Ghangaria Base',
      bestMonths: 'July to September (Monsoon Bloom)',
      requiresPermit: true,
      permitDetails: 'Forest Checkpost Permit at Ghangaria Entry Gate (₹200 for Indians, ₹800 Foreigners)',
      itinerarySummary: [
        'Day 1: Drive Rishikesh to Govindghat (295km)',
        'Day 2: Trek Govindghat to Ghangaria Base Camp (14km)',
        'Day 3: Ghangaria to Valley of Flowers core meadow & return (10km)',
        'Day 4: Ghangaria to Hemkund Sahib (4,329m) & return (12km)',
        'Day 5: Trek back to Govindghat & drive to Joshimath'
      ]
    }
  },
  {
    id: 'kedarkantha-trek',
    name: 'Kedarkantha Summit Trek',
    division: 'Garhwal',
    district: 'Uttarkashi',
    region: 'Govind Wildlife Sanctuary',
    category: 'Treks & Adventure',
    coordinates: { lng: 78.1700, lat: 31.0230 },
    currentCrowdScore: 40,
    crowdStatus: 'Moderate',
    capacityLimit: 4000,
    lastUpdated: '22 mins ago',
    description: 'Premier winter trek in India famous for 360-degree views of Swargarohini, Bandarpoonch, and Black Peak.',
    imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80',
    altitude: '3,800 m',
    bestTimeToVisit: 'Dec - Apr (Snow) & Sep - Nov',
    highlights: ['Juda Ka Talab Lake', 'Pine Forest Camps', '360 Himalayan Summit View'],
    historicalPeakHour: '04:00 - 08:00 IST (Summit Push)',
    trekDetails: {
      distanceKm: 20,
      durationDays: 5,
      difficulty: 'Easy-Moderate',
      maxAltitudeMeters: 3800,
      baseCamp: 'Sankri Village (Uttarkashi)',
      bestMonths: 'December to April (Snow) & October to November',
      requiresPermit: true,
      permitDetails: 'Govind Wildlife Sanctuary Forest Entry Permit (Issued at Sankri Checkpost)',
      itinerarySummary: [
        'Day 1: Drive Dehradun to Sankri Base Village (220km)',
        'Day 2: Trek Sankri to Juda Ka Talab (4km)',
        'Day 3: Juda Ka Talab to Kedarkantha Base Camp (4km)',
        'Day 4: Summit Push to 3,800m Peak & descend to Hargaon (6km)',
        'Day 5: Hargaon to Sankri & drive back to Dehradun'
      ]
    }
  },
  {
    id: 'har-ki-dun',
    name: 'Har Ki Dun Valley Trek',
    division: 'Garhwal',
    district: 'Uttarkashi',
    region: 'Tons River Basin',
    category: 'Treks & Adventure',
    coordinates: { lng: 78.4300, lat: 31.1400 },
    currentCrowdScore: 25,
    crowdStatus: 'Clear',
    capacityLimit: 2500,
    lastUpdated: '40 mins ago',
    description: 'Cradle of ancient Garhwali architecture and legend. Valley carved by Supin River surrounded by alpine meadows.',
    imageUrl: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1000&q=80',
    altitude: '3,566 m',
    bestTimeToVisit: 'Apr - Jun & Sep - Dec',
    highlights: ['Osla Ancient Wooden Village', 'Jaundhar Glacier View', 'Swargarohini Peaks'],
    historicalPeakHour: '08:00 - 14:00 IST',
    trekDetails: {
      distanceKm: 47,
      durationDays: 7,
      difficulty: 'Moderate',
      maxAltitudeMeters: 3566,
      baseCamp: 'Sankri / Taluka Village',
      bestMonths: 'April to June & September to December',
      requiresPermit: true,
      permitDetails: 'Govind Pashu Vihar National Park Entry Permit',
      itinerarySummary: [
        'Day 1: Drive Dehradun to Sankri (220km)',
        'Day 2: Drive Sankri to Taluka (12km), trek to Osla Village (14km)',
        'Day 3: Osla to Har Ki Dun Valley (11km)',
        'Day 4: Exploration of Maninda Tal & Jaundhar Glacier Viewpoint (8km)',
        'Day 5-6: Return trek Osla to Taluka & Sankri'
      ]
    }
  },
  {
    id: 'roopkund-lake',
    name: 'Roopkund Mystery Lake Trek',
    division: 'Garhwal',
    district: 'Chamoli',
    region: 'Nanda Devi Biosphere',
    category: 'Treks & Adventure',
    coordinates: { lng: 79.7320, lat: 30.2630 },
    currentCrowdScore: 20,
    crowdStatus: 'Clear',
    capacityLimit: 1500,
    lastUpdated: '1 hour ago',
    description: 'High altitude glacial lake famous for ancient human skeletal remains. Bordered by Bedni and Ali Bugyals.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    altitude: '5,029 m',
    bestTimeToVisit: 'May - Jun & Sep - Oct',
    highlights: ['Ali Bugyal Meadow', 'Bedni Bugyal', 'Nanda Ghunti View', 'Skeletal Lake'],
    travelAlert: 'High altitude trek; restricted camping rules enforced on meadows.',
    historicalPeakHour: '05:00 - 09:00 IST',
    trekDetails: {
      distanceKm: 53,
      durationDays: 8,
      difficulty: 'Moderate-Difficult',
      maxAltitudeMeters: 5029,
      baseCamp: 'Lohajung Village (Chamoli)',
      bestMonths: 'May to June & September to October',
      requiresPermit: true,
      permitDetails: 'Nanda Devi Biosphere Reserve Permit (Forest Officer Wan/Lohajung)',
      itinerarySummary: [
        'Day 1: Drive Kathgodam to Lohajung (230km)',
        'Day 2: Lohajung to Didna Village (8km)',
        'Day 3: Didna to Ali Bugyal & Bedni Bugyal (10km)',
        'Day 4: Bedni Bugyal to Bhagwabasa (9km)',
        'Day 5: Summit push to Roopkund (5,029m) & Junargali Pass (7km)',
        'Day 6-7: Descend via Bedni to Wan Village & Lohajung'
      ]
    }
  },
  {
    id: 'kuari-pass-trail',
    name: 'Kuari Pass Trek (Lord Curzon Trail)',
    division: 'Garhwal',
    district: 'Chamoli',
    region: 'Nanda Devi Biosphere',
    category: 'Treks & Adventure',
    coordinates: { lng: 79.5600, lat: 30.5000 },
    currentCrowdScore: 32,
    crowdStatus: 'Clear',
    capacityLimit: 3000,
    lastUpdated: '18 mins ago',
    description: 'Historical trail opened by Lord Curzon in 1905. Offers unmatched panoramas of Nanda Devi (7,816m), Dronagiri, Chaukhamba, and Trishul peaks.',
    imageUrl: 'https://images.unsplash.com/photo-1548777123-e216912df7d8?auto=format&fit=crop&w=1000&q=80',
    altitude: '3,876 m',
    bestTimeToVisit: 'Nov - Apr (Winter Snow) & Sep - Oct',
    highlights: ['Nanda Devi Panoramic View', 'Oak & Rhododendron Forests', 'Tali Forest Lake', 'Auli Ski Slope Finish'],
    historicalPeakHour: '06:00 - 11:00 IST',
    trekDetails: {
      distanceKm: 33,
      durationDays: 6,
      difficulty: 'Easy-Moderate',
      maxAltitudeMeters: 3876,
      baseCamp: 'Dhak Village (Joshimath)',
      bestMonths: 'November to April (Snow) & September to October',
      requiresPermit: true,
      permitDetails: 'Joshimath Forest Range Entry Permit',
      itinerarySummary: [
        'Day 1: Drive Haridwar/Rishikesh to Joshimath (255km)',
        'Day 2: Drive Joshimath to Dhak (12km), trek to Gulling Top (6km)',
        'Day 3: Gulling Top to Tali Forest Camp (5km)',
        'Day 4: Tali to Kuari Pass summit (3,876m) & back via Khullara (12km)',
        'Day 5: Tali to Auli ski slopes & drive to Joshimath (8km)'
      ]
    }
  },
  {
    id: 'brahmatal-trek',
    name: 'Brahmatal Winter Lake Trek',
    division: 'Garhwal',
    district: 'Chamoli',
    region: 'Tharali Basin',
    category: 'Treks & Adventure',
    coordinates: { lng: 79.6800, lat: 30.2100 },
    currentCrowdScore: 38,
    crowdStatus: 'Clear',
    capacityLimit: 2500,
    lastUpdated: '25 mins ago',
    description: 'Sacred glacial lake where Lord Brahma is believed to have meditated. Unbeatable winter ridge walk viewing Mt. Trishul and Nanda Ghunti up close.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    altitude: '3,850 m',
    bestTimeToVisit: 'Dec - Mar (Snow Trek)',
    highlights: ['Bekaltal Frozen Lake', 'Brahmatal Ridge Walk', 'Mt. Trishul & Nanda Ghunti Views'],
    historicalPeakHour: '05:00 - 10:00 IST',
    trekDetails: {
      distanceKm: 24,
      durationDays: 6,
      difficulty: 'Easy-Moderate',
      maxAltitudeMeters: 3850,
      baseCamp: 'Lohajung Village (Chamoli)',
      bestMonths: 'December to March (Winter Snow)',
      requiresPermit: true,
      permitDetails: 'Chamoli Forest Department Entry Permit at Lohajung',
      itinerarySummary: [
        'Day 1: Drive Kathgodam to Lohajung (230km)',
        'Day 2: Lohajung to Bekaltal Lake (6km)',
        'Day 3: Bekaltal to Brahmatal Camp (7km)',
        'Day 4: Brahmatal Ridge & Pass summit push (3,850m) (7km)',
        'Day 5: Descend Brahmatal to Lohajung (9km)'
      ]
    }
  },
  {
    id: 'chopta-tungnath',
    name: 'Chopta, Tungnath & Chandrashila Peak',
    division: 'Garhwal',
    district: 'Rudraprayag',
    region: 'Kedarnath Wildlife Sanctuary',
    category: 'Heritage & Architecture',
    coordinates: { lng: 79.2170, lat: 30.4880 },
    currentCrowdScore: 65,
    crowdStatus: 'Heavy',
    capacityLimit: 6000,
    lastUpdated: '14 mins ago',
    description: 'Highest Shiva temple in the world (3,680m) and starting point for Chandrashila summit trek (4,000m).',
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1000&q=80',
    altitude: '3,680 m',
    bestTimeToVisit: 'Apr - Nov (Tungnath Open)',
    highlights: ['Highest Shiva Temple', 'Chandrashila 4000m Peak', 'Mini Switzerland Meadows'],
    historicalPeakHour: '07:00 - 15:00 IST',
    trekDetails: {
      distanceKm: 10,
      durationDays: 2,
      difficulty: 'Easy-Moderate',
      maxAltitudeMeters: 4000,
      baseCamp: 'Chopta Base Camp',
      bestMonths: 'April to November',
      requiresPermit: false,
      permitDetails: 'Kedarnath Wildlife Sanctuary Checkpost Entry (₹150)',
      itinerarySummary: [
        'Day 1: Arrive Chopta, trek to Deoriatal Lake (3km)',
        'Day 2: Chopta to Tungnath Shiva Temple (3.5km) & Chandrashila Peak (1.5km) sunrise push'
      ]
    }
  },

  // GARHWAL DIVISION - CITIES, TRANSIT & WILDLIFE
  {
    id: 'haridwar-harkipauri',
    name: 'Har Ki Pauri Ghat',
    division: 'Garhwal',
    district: 'Haridwar',
    region: 'Ganga Basin',
    category: 'Pilgrimage',
    coordinates: { lng: 78.1636, lat: 29.9557 },
    currentCrowdScore: 84,
    crowdStatus: 'Choked',
    capacityLimit: 50000,
    lastUpdated: '5 mins ago',
    description: 'Central Ganga Aarti ghat. Major surge during Kanwar Yatra, weekend holidays, and evening prayers.',
    imageUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80',
    altitude: '314 m',
    bestTimeToVisit: 'Round the year',
    highlights: ['Ganga Evening Aarti', 'Mansa Devi Cable Car', 'Chandi Devi Temple'],
    travelAlert: 'Heavy traffic congestion on NH-34 Haridwar bypass.',
    historicalPeakHour: '18:00 - 20:00 IST'
  },
  {
    id: 'rishikesh-trivenighat',
    name: 'Triveni Ghat & Laxman Jhula',
    division: 'Garhwal',
    district: 'Tehri Garhwal',
    region: 'Rishikesh Valley',
    category: 'Pilgrimage',
    coordinates: { lng: 78.2932, lat: 30.1034 },
    currentCrowdScore: 62,
    crowdStatus: 'Heavy',
    capacityLimit: 30000,
    lastUpdated: '12 mins ago',
    description: 'Yoga Capital of the World. High footfall near Ram Jhula, Triveni Ghat Aarti, and white-water rafting camps.',
    imageUrl: 'https://images.unsplash.com/photo-1545652985-5edd365b12eb?auto=format&fit=crop&w=1000&q=80',
    altitude: '372 m',
    bestTimeToVisit: 'Sep - Jun',
    highlights: ['Ganga Aarti', 'White-Water Rafting', 'Beatles Ashram', 'Parmarth Niketan'],
    historicalPeakHour: '17:00 - 19:30 IST'
  },
  {
    id: 'mussoorie-mallroad',
    name: 'Mall Road & Library Chowk',
    division: 'Garhwal',
    district: 'Dehradun',
    region: 'Mussoorie Hills',
    category: 'Hill Station',
    coordinates: { lng: 78.0746, lat: 30.4598 },
    currentCrowdScore: 55,
    crowdStatus: 'Moderate',
    capacityLimit: 20000,
    lastUpdated: '18 mins ago',
    description: 'Queen of Hills promenade. Features colonial architecture, Kempty Falls, and scenic Doon Valley overlooks.',
    imageUrl: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1000&q=80',
    altitude: '2,005 m',
    bestTimeToVisit: 'Sep - Jun & Dec (Snowfall)',
    highlights: ['Kempty Falls', 'Gun Hill Cable Car', 'George Everest House', 'Lal Tibba'],
    historicalPeakHour: '16:00 - 21:00 IST'
  },
  {
    id: 'auli-ski-resort',
    name: 'Auli Ski Slope & Ropeway',
    division: 'Garhwal',
    district: 'Chamoli',
    region: 'Joshimath',
    category: 'Hill Station',
    coordinates: { lng: 79.5690, lat: 30.5290 },
    currentCrowdScore: 38,
    crowdStatus: 'Clear',
    capacityLimit: 8000,
    lastUpdated: '25 mins ago',
    description: 'Premier skiing destination of India boasting one of Asia’s longest ropeways and views of Nanda Devi peak (7,816m).',
    imageUrl: 'https://images.unsplash.com/photo-1548777123-e216912df7d8?auto=format&fit=crop&w=1000&q=80',
    altitude: '2,800 m',
    bestTimeToVisit: 'Dec - Mar (Skiing) & Apr - Jun',
    highlights: ['Asia longest Cable Car', 'Artificial Lake', 'Nanda Devi View', 'Skiing Slopes'],
    historicalPeakHour: '10:00 - 15:00 IST'
  },
  {
    id: 'rajaji-national-park',
    name: 'Rajaji Tiger Reserve (Chilla Range)',
    division: 'Garhwal',
    district: 'Dehradun',
    region: 'Shivalik Foothills',
    category: 'Wildlife & Parks',
    coordinates: { lng: 78.1900, lat: 30.0000 },
    currentCrowdScore: 30,
    crowdStatus: 'Clear',
    capacityLimit: 4000,
    lastUpdated: '35 mins ago',
    description: 'Tiger Reserve nestled in Shivalik ranges spanning 820 sq km. Habitat for Asian elephants, tigers, and leopards.',
    imageUrl: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=1000&q=80',
    altitude: '300 m',
    bestTimeToVisit: 'Nov - Jun (Park Open)',
    highlights: ['Asian Elephants', 'Bengal Tigers', 'Jungle Jeep Safari', 'Bird Watching'],
    historicalPeakHour: '06:00 - 09:30 & 15:00 - 18:00 IST'
  },
  {
    id: 'sonprayag-gateway',
    name: 'Sonprayag Yatra Gateway',
    division: 'Garhwal',
    district: 'Rudraprayag',
    region: 'Mandakini Basin',
    category: 'Transit Hub',
    coordinates: { lng: 79.0069, lat: 30.6308 },
    currentCrowdScore: 91,
    crowdStatus: 'Choked',
    capacityLimit: 15000,
    lastUpdated: '2 mins ago',
    description: 'Primary vehicle halt and shuttle point for Kedarnath trek. High vehicle queue and registration congestion.',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80',
    altitude: '1,820 m',
    bestTimeToVisit: 'May - Nov',
    highlights: ['Kedarnath Shuttle Base', 'Confluence of Basuki & Mandakini', 'Yatra Registration Hub'],
    travelAlert: 'Severe vehicular slowdown between Guptkashi and Sonprayag.',
    historicalPeakHour: '04:00 - 09:00 IST'
  },

  // KUMAON DIVISION - HILL STATIONS & LAKES
  {
    id: 'nainital-mallital',
    name: 'Naini Lake Promenade & Mallital',
    division: 'Kumaon',
    district: 'Nainital',
    region: 'Kumaon Lakes',
    category: 'Hill Station',
    coordinates: { lng: 79.4542, lat: 29.3919 },
    currentCrowdScore: 42,
    crowdStatus: 'Moderate',
    capacityLimit: 25000,
    lastUpdated: '25 mins ago',
    description: 'Eye-shaped Naini Lake surrounded by seven hills (Sapta-Shring). Boating, Naina Devi Temple, and Mall Road.',
    imageUrl: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1000&q=80',
    altitude: '2,084 m',
    bestTimeToVisit: 'Round the year',
    highlights: ['Naini Lake Boating', 'Naina Devi Shakti Peeth', 'Snow View Cable Car', 'Tiffin Top'],
    historicalPeakHour: '15:00 - 19:00 IST'
  },
  {
    id: 'kausani-hills',
    name: 'Kausani Himalayan Panorama',
    division: 'Kumaon',
    district: 'Bageshwar',
    region: 'Central Kumaon',
    category: 'Hill Station',
    coordinates: { lng: 79.6000, lat: 29.8500 },
    currentCrowdScore: 22,
    crowdStatus: 'Clear',
    capacityLimit: 10000,
    lastUpdated: '30 mins ago',
    description: 'Called the "Switzerland of India" by Mahatma Gandhi. Unobstructed 300km view of Nanda Devi, Trishul, and Panchachuli peaks.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    altitude: '1,890 m',
    bestTimeToVisit: 'Sep - May',
    highlights: ['300km Himalayan View', 'Anasakti Ashram (Gandhi House)', 'Tea Gardens', 'Sunrise Spot'],
    historicalPeakHour: '05:30 - 07:30 IST (Sunrise)'
  },
  {
    id: 'ranikhet-cantonment',
    name: 'Ranikhet & Chaubattia Gardens',
    division: 'Kumaon',
    district: 'Almora',
    region: 'Kumaon Foothills',
    category: 'Hill Station',
    coordinates: { lng: 79.4300, lat: 29.6400 },
    currentCrowdScore: 30,
    crowdStatus: 'Clear',
    capacityLimit: 12000,
    lastUpdated: '35 mins ago',
    description: 'Queens Meadow. Home to Kumaon Regiment Centre, high-altitude golf course, and expansive apple orchards.',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
    altitude: '1,869 m',
    bestTimeToVisit: 'Sep - Jun',
    highlights: ['Golf Course', 'Chaubattia Apple Orchards', 'Jhula Devi Temple', 'Kumaon Regimental Museum'],
    historicalPeakHour: '10:00 - 16:00 IST'
  },
  {
    id: 'mukteshwar-dham',
    name: 'Mukteshwar Dham & Chauli Ki Jali',
    division: 'Kumaon',
    district: 'Nainital',
    region: 'Kumaon Ridge',
    category: 'Hill Station',
    coordinates: { lng: 79.6400, lat: 29.4700 },
    currentCrowdScore: 34,
    crowdStatus: 'Clear',
    capacityLimit: 8000,
    lastUpdated: '20 mins ago',
    description: '350-year-old Shiva temple atop a high hill. Overlooks deep valleys and dramatic Chauli Ki Jali cliff rocks.',
    imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80',
    altitude: '2,171 m',
    bestTimeToVisit: 'Oct - Jun',
    highlights: ['350yr Shiva Temple', 'Chauli Ki Jali Rock Climbing', 'IVRI Pine Campus', 'Fruit Orchards'],
    historicalPeakHour: '11:00 - 16:00 IST'
  },

  // KUMAON DIVISION - WILDLIFE & NATIONAL PARKS
  {
    id: 'jim-corbett-national-park',
    name: 'Jim Corbett National Park (Dhikala & Bijrani)',
    division: 'Kumaon',
    district: 'Nainital',
    region: 'Ramnagar Basin',
    category: 'Wildlife & Parks',
    coordinates: { lng: 78.9600, lat: 29.5300 },
    currentCrowdScore: 70,
    crowdStatus: 'Heavy',
    capacityLimit: 15000,
    lastUpdated: '8 mins ago',
    description: 'India’s oldest national park (est. 1936). Famous Project Tiger sanctuary along Ramganga river.',
    imageUrl: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=1000&q=80',
    altitude: '400 m',
    bestTimeToVisit: 'Nov - Jun (Dhikala Zone)',
    highlights: ['Bengal Tigers', 'Garial Crocodiles', 'Ramganga River Canter Safari', 'Corbett Waterfalls'],
    travelAlert: 'Dhikala zone permits sell out weeks in advance.',
    historicalPeakHour: '06:00 - 09:30 & 14:30 - 17:30 IST'
  },
  {
    id: 'binsar-wildlife-sanctuary',
    name: 'Binsar Wildlife Sanctuary & Zero Point',
    division: 'Kumaon',
    district: 'Almora',
    region: 'Binsar Hill',
    category: 'Wildlife & Parks',
    coordinates: { lng: 79.7500, lat: 29.7000 },
    currentCrowdScore: 28,
    crowdStatus: 'Clear',
    capacityLimit: 3500,
    lastUpdated: '45 mins ago',
    description: 'Dense oak and rhododendron forest reserve once summer capital of Chand Kings. Panoramic view of Himalayan range.',
    imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80',
    altitude: '2,420 m',
    bestTimeToVisit: 'Oct - Mar (Birdwatching)',
    highlights: ['Zero Point Viewpoint', '200+ Bird Species', 'Chand Dynasty Estate', 'Oak Forest Trek'],
    historicalPeakHour: '07:00 - 11:00 IST'
  },
  {
    id: 'askot-musk-deer-sanctuary',
    name: 'Askot Musk Deer Sanctuary',
    division: 'Kumaon',
    district: 'Pithoragarh',
    region: 'Kali River Basin',
    category: 'Wildlife & Parks',
    coordinates: { lng: 80.3500, lat: 29.7600 },
    currentCrowdScore: 15,
    crowdStatus: 'Clear',
    capacityLimit: 1200,
    lastUpdated: '1 hour ago',
    description: 'Established to conserve the endangered Himalayan Musk Deer (Moschus chrysogaster). High biodiversity ecological haven.',
    imageUrl: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1000&q=80',
    altitude: '1,600 m',
    bestTimeToVisit: 'Apr - Sep',
    highlights: ['Endangered Musk Deer', 'Snow Leopards', 'High Alpine Flora', 'Kailash Mansarovar Route'],
    historicalPeakHour: '07:00 - 12:00 IST'
  },

  // KUMAON DIVISION - HERITAGE & ARCHAEOLOGICAL SITES
  {
    id: 'jageshwar-dham',
    name: 'Jageshwar Dham Temple Complex',
    division: 'Kumaon',
    district: 'Almora',
    region: 'Jata Ganga Valley',
    category: 'Heritage & Architecture',
    coordinates: { lng: 79.8500, lat: 29.6400 },
    currentCrowdScore: 45,
    crowdStatus: 'Moderate',
    capacityLimit: 12000,
    lastUpdated: '15 mins ago',
    description: 'Cluster of 124 ancient Nagara-style stone temples dating from 7th to 14th century AD in a deodar forest canyon.',
    imageUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80',
    altitude: '1,870 m',
    bestTimeToVisit: 'Round the year (Shravan Mela in Jul)',
    highlights: ['124 Ancient Stone Temples', 'Maha Mritunjaya Temple', 'ASI Archaeological Museum', 'Giant Deodar Grove'],
    historicalPeakHour: '07:30 - 13:00 IST'
  },
  {
    id: 'katarmal-sun-temple',
    name: 'Katarmal Sun Temple (Baraditya)',
    division: 'Kumaon',
    district: 'Almora',
    region: 'Kosi River Valley',
    category: 'Heritage & Architecture',
    coordinates: { lng: 79.6100, lat: 29.6400 },
    currentCrowdScore: 26,
    crowdStatus: 'Clear',
    capacityLimit: 4000,
    lastUpdated: '30 mins ago',
    description: 'Rare 9th-century Sun Temple built by Katyuri King Katarmalla. Second most prominent Sun temple in India after Konark.',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80',
    altitude: '2,116 m',
    bestTimeToVisit: 'Round the year',
    highlights: ['9th-Century Stone Architecture', '44 Sub-Shrines', 'Sunrise Solar Alignment', 'ASI Heritage Protection'],
    historicalPeakHour: '08:00 - 12:00 IST'
  },
  {
    id: 'baijnath-temple-complex',
    name: 'Baijnath Temple Complex',
    division: 'Kumaon',
    district: 'Bageshwar',
    region: 'Gomti River Valley',
    category: 'Heritage & Architecture',
    coordinates: { lng: 79.6200, lat: 29.9100 },
    currentCrowdScore: 32,
    crowdStatus: 'Clear',
    capacityLimit: 6000,
    lastUpdated: '22 mins ago',
    description: '12th-century Katyuri dynasty stone temples situated on the banks of Gomti River. Parvati idol made of black stone.',
    imageUrl: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1000&q=80',
    altitude: '1,125 m',
    bestTimeToVisit: 'Oct - May',
    highlights: ['Katyuri Stone Carvings', 'Gomti River Fish Feeding', 'Black Stone Parvati Statue'],
    historicalPeakHour: '08:00 - 13:00 IST'
  },
  {
    id: 'munsiyari-panchachuli',
    name: 'Munsiyari & Panchachuli 5 Peaks Base Trek',
    division: 'Kumaon',
    district: 'Pithoragarh',
    region: 'Johar Valley',
    category: 'Treks & Adventure',
    coordinates: { lng: 80.2400, lat: 30.0700 },
    currentCrowdScore: 28,
    crowdStatus: 'Clear',
    capacityLimit: 5000,
    lastUpdated: '18 mins ago',
    description: 'Gateway to Johar Valley & Milam Glacier. Closest view of the iconic five snow-capped Panchachuli peaks (The 5 Kitchen Fires of Pandavas).',
    imageUrl: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1000&q=80',
    altitude: '2,200 m',
    bestTimeToVisit: 'Mar - Jun & Sep - Nov',
    highlights: ['Panchachuli 5 Peaks View', 'Milam Glacier Trek Base', 'Birthi Waterfalls', 'Darkot Handloom Village'],
    historicalPeakHour: '05:30 - 08:30 IST',
    trekDetails: {
      distanceKm: 60,
      durationDays: 7,
      difficulty: 'Moderate',
      maxAltitudeMeters: 4260,
      baseCamp: 'Dar Village / Dharchula',
      bestMonths: 'April to June & September to November',
      requiresPermit: true,
      permitDetails: 'Inner Line Permit from SDM Office Dharchula / Pithoragarh',
      itinerarySummary: [
        'Day 1: Drive Pithoragarh to Dharchula & Dar Village (95km)',
        'Day 2: Trek Dar to Urthing (12km)',
        'Day 3: Urthing to Naangling (14km)',
        'Day 4: Naangling to Duktu & Panchachuli Base Camp (4,260m) (11km)',
        'Day 5-6: Return trek to Dar & drive to Munsiyari'
      ]
    }
  },
  {
    id: 'pindari-glacier-trek',
    name: 'Pindari Glacier & Zero Point Trek',
    division: 'Kumaon',
    district: 'Bageshwar',
    region: 'Pindar River Valley',
    category: 'Treks & Adventure',
    coordinates: { lng: 79.9800, lat: 30.2600 },
    currentCrowdScore: 18,
    crowdStatus: 'Clear',
    capacityLimit: 2000,
    lastUpdated: '50 mins ago',
    description: 'World-famous glacier trek lying between Nanda Devi and Nanda Kot peaks. Source of Pindar River.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    altitude: '3,660 m (Zero Point)',
    bestTimeToVisit: 'Apr - Jun & Sep - Nov',
    highlights: ['Pindari Glacier Zero Point', 'Khati Remote Village', 'Nanda Kot Peak View'],
    historicalPeakHour: '06:00 - 11:00 IST',
    trekDetails: {
      distanceKm: 90,
      durationDays: 7,
      difficulty: 'Moderate',
      maxAltitudeMeters: 3660,
      baseCamp: 'Song Village (Bageshwar)',
      bestMonths: 'April to June & September to November',
      requiresPermit: true,
      permitDetails: 'KMVN Rest House & Bageshwar Forest Division Permit',
      itinerarySummary: [
        'Day 1: Drive Kathgodam/Bageshwar to Song (36km), trek to Loharkhet (3km)',
        'Day 2: Loharkhet to Khati Village (11km)',
        'Day 3: Khati to Dwali (11km)',
        'Day 4: Dwali to Phurkia & Pindari Glacier Zero Point (3,660m) (12km)',
        'Day 5-6: Return trek to Song & drive to Bageshwar'
      ]
    }
  },
  {
    id: 'milam-glacier-johar-valley',
    name: 'Milam Glacier Expedition & Johar Valley',
    division: 'Kumaon',
    district: 'Pithoragarh',
    region: 'Johar Valley',
    category: 'Treks & Adventure',
    coordinates: { lng: 80.1500, lat: 30.4300 },
    currentCrowdScore: 14,
    crowdStatus: 'Clear',
    capacityLimit: 1000,
    lastUpdated: '1 hour ago',
    description: 'Historic Indo-Tibetan trade route trek through ghost villages of Johar valley to the massive Milam Glacier (37 sq km).',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
    altitude: '4,270 m',
    bestTimeToVisit: 'May - Jun & Sep - Oct',
    highlights: ['Massive 37 sq km Glacier', 'Indo-Tibetan Trade History', 'Ghost Villages of Johar', 'Hardeol & Trishuli View'],
    historicalPeakHour: '06:00 - 10:00 IST',
    trekDetails: {
      distanceKm: 110,
      durationDays: 10,
      difficulty: 'Difficult',
      maxAltitudeMeters: 4270,
      baseCamp: 'Munsiyari (Pithoragarh)',
      bestMonths: 'May to June & September to October',
      requiresPermit: true,
      permitDetails: 'Mandatory Inner Line Permit (Munsiyari SDM Office / ITBP)',
      itinerarySummary: [
        'Day 1: Drive Kathgodam to Munsiyari (275km)',
        'Day 2: Munsiyari to Lilam (12km)',
        'Day 3: Lilam to Bogdiyar (13km)',
        'Day 4: Bogdiyar to Rilkot (12km)',
        'Day 5: Rilkot to Milam Village (15km)',
        'Day 6: Milam Village to Milam Glacier Zero Point (4,270m) (6km)',
        'Day 7-9: Return trek to Munsiyari'
      ]
    }
  }
];

export const INITIAL_7DAY_FORECAST: TimelinePoint[] = [
  {
    date: '2026-08-01',
    dayName: 'Saturday',
    predictedScore: 88,
    status: 'Choked',
    heuristicNote: 'Weekend Chardham surge + Shravan Mela pilgrimage peak traffic at Haridwar & Kedarnath corridor.'
  },
  {
    date: '2026-08-02',
    dayName: 'Sunday',
    predictedScore: 82,
    status: 'Choked',
    heuristicNote: 'High return traffic flow towards Dehradun, Delhi, & Kathgodam national highways.'
  },
  {
    date: '2026-08-03',
    dayName: 'Monday',
    predictedScore: 42,
    status: 'Moderate',
    heuristicNote: 'Mid-week baseline drop across hill stations (Nainital/Mussoorie); steady Yatra registration flow.'
  },
  {
    date: '2026-08-04',
    dayName: 'Tuesday',
    predictedScore: 35,
    status: 'Clear',
    heuristicNote: 'Lowest predicted congestion day. Highly recommended window for Temple Darshan & Corbett Safaris.'
  },
  {
    date: '2026-08-05',
    dayName: 'Wednesday',
    predictedScore: 38,
    status: 'Clear',
    heuristicNote: 'Smooth vehicular movement across Rishikesh bypass and Almora-Jageshwar highways.'
  },
  {
    date: '2026-08-06',
    dayName: 'Thursday',
    predictedScore: 55,
    status: 'Moderate',
    heuristicNote: 'Pre-weekend arrivals start accumulating at Sonprayag, Joshimath & Rishikesh hubs.'
  },
  {
    date: '2026-08-07',
    dayName: 'Friday',
    predictedScore: 74,
    status: 'Heavy',
    heuristicNote: 'Weekend tourist inflow surge beginning Friday evening across Garhwal & Kumaon passes.'
  }
];

// ── Trip Planner Data ────────────────────────────────────────────────────────

import { StayListing } from '@/types/location';

export const STAYS_DATA: StayListing[] = [
  // Kedarnath
  { id: 's1', locationId: 'kedarnath-dham', name: 'Sonprayag Retreat Homestay', type: 'Homestay', phone: '+91-9456-112-201', pricePerNight: 1200, budgetTier: 'Budget', rating: 4.1, amenities: ['Hot Water', 'Home-cooked meals', 'Mountain view', 'Parking'], address: 'Near Sonprayag Bus Stand, Kedarnath Road, Rudraprayag' },
  { id: 's2', locationId: 'kedarnath-dham', name: 'Gaurikund GMVN Tourist Rest House', type: 'GMVN / KMVN', phone: '+91-1364-262-228', altPhone: '+91-9410-332-567', pricePerNight: 800, budgetTier: 'Budget', rating: 3.8, amenities: ['Dormitory available', 'Canteen', 'Hot Water'], address: 'Gaurikund, Sonprayag-Kedarnath Route, Rudraprayag' },
  { id: 's3', locationId: 'kedarnath-dham', name: 'Himalayan Bliss Resort', type: 'Resort', phone: '+91-7895-221-445', pricePerNight: 5500, budgetTier: 'Luxury', rating: 4.7, amenities: ['Spa', 'Restaurant', 'Valley view', 'Wifi', 'Helipad nearby'], address: 'Sitapur, Near Gaurikund, Rudraprayag – 246445' },

  // Badrinath
  { id: 's4', locationId: 'badrinath-dham', name: 'Dev Lok Homestay Badrinath', type: 'Homestay', phone: '+91-9411-567-892', pricePerNight: 1500, budgetTier: 'Budget', rating: 4.3, amenities: ['Hot Water', 'Vegetarian meals', 'Temple view', 'Bonfire'], address: 'Near Badrinath Temple Gate, Chamoli – 246422' },
  { id: 's5', locationId: 'badrinath-dham', name: 'Mana Village Guest House', type: 'Guest House', phone: '+91-9412-334-781', pricePerNight: 1000, budgetTier: 'Budget', rating: 3.9, amenities: ['Basic meals', 'Blankets', 'Shared bath'], address: 'Mana Village, Last Village of India, Chamoli' },
  { id: 's6', locationId: 'badrinath-dham', name: 'Snow Crest Hotel Badrinath', type: 'Mid-Range Hotel', phone: '+91-1381-222-345', altPhone: '+91-9456-778-901', pricePerNight: 3200, budgetTier: 'Moderate', rating: 4.4, amenities: ['Restaurant', 'Room service', 'Hot Water', 'Wifi', 'Mountain view'], address: 'Main Market Road, Badrinath, Chamoli – 246422' },

  // Gangotri
  { id: 's7', locationId: 'gangotri-dham', name: 'Bhagirathi Niwas Homestay', type: 'Homestay', phone: '+91-9458-123-678', pricePerNight: 900, budgetTier: 'Budget', rating: 4.0, amenities: ['Home-cooked meals', 'River view', 'Meditation space'], address: 'Near Gangotri Temple, Uttarkashi – 249193' },
  { id: 's8', locationId: 'gangotri-dham', name: 'GMVN Gangotri Tourist Bungalow', type: 'GMVN / KMVN', phone: '+91-1374-222-441', pricePerNight: 750, budgetTier: 'Budget', rating: 3.7, amenities: ['Dormitory', 'Canteen', 'Blankets'], address: 'Gangotri Township, Uttarkashi' },
  { id: 's9', locationId: 'gangotri-dham', name: 'Glacier Meadows Resort', type: 'Resort', phone: '+91-8979-456-112', pricePerNight: 4800, budgetTier: 'Luxury', rating: 4.6, amenities: ['Bonfire', 'River-facing rooms', 'Trekking guide', 'Multi-cuisine restaurant'], address: 'Gangotri-Gaumukh Corridor, Uttarkashi' },

  // Yamunotri
  { id: 's10', locationId: 'yamunotri-dham', name: 'Janki Chatti Trek Stop', type: 'Guest House', phone: '+91-9456-889-223', pricePerNight: 700, budgetTier: 'Budget', rating: 3.8, amenities: ['Basic meals', 'Hot Water', 'Trekking gear storage'], address: 'Janki Chatti, Start of Yamunotri Trek, Uttarkashi' },
  { id: 's11', locationId: 'yamunotri-dham', name: 'Yamunotri GMVN Rest House', type: 'GMVN / KMVN', phone: '+91-1374-235-551', pricePerNight: 800, budgetTier: 'Budget', rating: 3.6, amenities: ['Dormitory', 'Canteen', 'Lockers'], address: 'Janki Chatti, Yamunotri Route, Uttarkashi' },

  // Valley of Flowers
  { id: 's12', locationId: 'valley-of-flowers', name: 'Ghangaria Camp & Lodge', type: 'Guest House', phone: '+91-9411-678-234', pricePerNight: 1100, budgetTier: 'Budget', rating: 4.2, amenities: ['Meals included', 'Trekking guides', 'First aid'], address: 'Ghangaria Base Camp, Chamoli – 246443' },
  { id: 's13', locationId: 'valley-of-flowers', name: 'Nanda Devi Homestay', type: 'Homestay', phone: '+91-9458-345-901', pricePerNight: 1400, budgetTier: 'Budget', rating: 4.4, amenities: ['Home meals', 'Guide info', 'Flower photography tips'], address: 'Ghangaria Village, Near GHNP Entry, Chamoli' },

  // Jim Corbett
  { id: 's14', locationId: 'jim-corbett-np', name: 'Corbett Riverside Homestay', type: 'Homestay', phone: '+91-9837-112-567', pricePerNight: 2200, budgetTier: 'Moderate', rating: 4.5, amenities: ['River view', 'Jeep safari booking', 'Bonfire', 'Home-cooked food'], address: 'Ramnagar Road, Near Dhikala Gate, Ramnagar, Nainital' },
  { id: 's15', locationId: 'jim-corbett-np', name: 'The Corbett Ramganga Resort', type: 'Resort', phone: '+91-5947-251-234', altPhone: '+91-9411-567-345', pricePerNight: 7500, budgetTier: 'Luxury', rating: 4.8, amenities: ['Pool', 'Spa', 'Restaurant', 'Safari booking', 'Wifi', 'Kids zone'], address: 'Jim Corbett National Park Buffer Zone, Ramnagar – 244715' },

  // Mussoorie
  { id: 's16', locationId: 'mussoorie-hill-station', name: 'Landour Walnut Heritage Homestay', type: 'Homestay', phone: '+91-9897-234-561', pricePerNight: 2800, budgetTier: 'Moderate', rating: 4.6, amenities: ['Heritage bungalow', 'Valley view', 'Fireplace', 'Library'], address: 'Landour Cantonment, Mussoorie – 248179' },
  { id: 's17', locationId: 'mussoorie-hill-station', name: 'The Savoy Mussoorie (Heritage)', type: 'Resort', phone: '+91-135-263-2010', pricePerNight: 9000, budgetTier: 'Luxury', rating: 4.9, amenities: ['Heritage property', 'Spa', 'Pool', 'Fine dining', 'Mall Road view'], address: '1 Library Road, Mussoorie – 248179' },
  { id: 's18', locationId: 'mussoorie-hill-station', name: 'Mall Road Budget Inn', type: 'Budget Hotel', phone: '+91-9456-112-788', pricePerNight: 1200, budgetTier: 'Budget', rating: 3.7, amenities: ['Central location', 'Hot Water', 'TV'], address: 'Near Picture Palace, Mall Road, Mussoorie' },

  // Nainital
  { id: 's19', locationId: 'nainital-lake-town', name: 'Nainital Lake View Homestay', type: 'Homestay', phone: '+91-9758-445-221', pricePerNight: 2500, budgetTier: 'Moderate', rating: 4.5, amenities: ['Lake view', 'Home breakfast', 'Boating tips'], address: 'Mallital, Near Naini Lake, Nainital – 263002' },
  { id: 's20', locationId: 'nainital-lake-town', name: 'KMVN Tourist Rest House Nainital', type: 'GMVN / KMVN', phone: '+91-5942-235-624', pricePerNight: 1100, budgetTier: 'Budget', rating: 3.9, amenities: ['Lake view', 'Canteen', 'Parking'], address: 'Sukhatal, Nainital – 263002' },
  { id: 's21', locationId: 'nainital-lake-town', name: 'Manu Maharani Resort Nainital', type: 'Resort', phone: '+91-5942-237-341', pricePerNight: 8000, budgetTier: 'Luxury', rating: 4.8, amenities: ['Pool', 'Fine dining', 'Spa', 'Lake view', 'Wifi', 'Heritage'], address: 'Grassmere Estate, Club Side, Nainital – 263002' },

  // Rishikesh
  { id: 's22', locationId: 'rishikesh-yoga-hub', name: 'Ganga View Yoga Ashram Stay', type: 'Homestay', phone: '+91-9897-678-234', pricePerNight: 900, budgetTier: 'Budget', rating: 4.3, amenities: ['Yoga classes', 'Ganga view', 'Vegetarian meals', 'Meditation hall'], address: 'Swarg Ashram, Near Laxman Jhula, Rishikesh – 249302' },
  { id: 's23', locationId: 'rishikesh-yoga-hub', name: 'Glenburn on Ganges', type: 'Resort', phone: '+91-9871-112-567', pricePerNight: 12000, budgetTier: 'Luxury', rating: 4.9, amenities: ['Infinity pool', 'Spa', 'Rafting package', 'Fine dining', 'Helicopter transfer'], address: 'Beach Road, Tapovan, Rishikesh – 249192' },

  // Haridwar
  { id: 's24', locationId: 'haridwar-gateway', name: 'Ganga Kinare Homestay', type: 'Homestay', phone: '+91-9012-334-567', pricePerNight: 1000, budgetTier: 'Budget', rating: 4.1, amenities: ['Ghat view', 'Aarti walking distance', 'Vegetarian food'], address: 'Har Ki Pauri Area, Haridwar – 249401' },
  { id: 's25', locationId: 'haridwar-gateway', name: 'Haveli Hari Ganga (Heritage Hotel)', type: 'Mid-Range Hotel', phone: '+91-1334-226-443', altPhone: '+91-9997-112-234', pricePerNight: 6500, budgetTier: 'Luxury', rating: 4.7, amenities: ['Heritage architecture', 'Ganga view', 'Pool', 'Restaurant', 'Aarti boat ride'], address: 'Ramghat, Haridwar – 249401' },
];

export const BUDGET_RATES = {
  transport: {
    perKmCar: 12,       // ₹/km for private car
    perKmBus: 2.5,      // ₹/km for state bus
    perKmTaxi: 18,      // ₹/km for taxi
  },
  food: {
    Budget: 400,        // ₹/person/day
    Moderate: 900,
    Luxury: 1800,
  },
  entryFees: {
    'Char Dham': 0,
    'Treks & Adventure': 350,
    'Wildlife & Parks': 800,
    'Hill Station': 0,
    'Heritage & Architecture': 200,
    'Pilgrimage': 0,
    'Transit Hub': 0,
  } as Record<string, number>,
  accommodation: {
    Budget: 1000,
    Moderate: 3500,
    Luxury: 8000,
  },
  misc: 0.08, // 8% of subtotal for miscellaneous
};

export const ROUTE_DISTANCES: Record<string, Record<string, { km: number; hours: number }>> = {
  'Dehradun': {
    'Rishikesh': { km: 44, hours: 1.2 },
    'Haridwar': { km: 54, hours: 1.5 },
    'Mussoorie': { km: 35, hours: 1.3 },
    'Yamunotri': { km: 173, hours: 5.5 },
    'Gangotri': { km: 249, hours: 7.5 },
    'Badrinath': { km: 324, hours: 9.5 },
    'Kedarnath': { km: 228, hours: 7 },
    'Valley of Flowers': { km: 298, hours: 9 },
    'Auli': { km: 296, hours: 8.5 },
    'Nainital': { km: 310, hours: 7 },
    'Jim Corbett': { km: 276, hours: 6.5 },
  },
  'Haridwar': {
    'Rishikesh': { km: 21, hours: 0.7 },
    'Mussoorie': { km: 89, hours: 2.5 },
    'Dehradun': { km: 54, hours: 1.5 },
    'Kedarnath': { km: 249, hours: 7.5 },
    'Badrinath': { km: 317, hours: 9 },
    'Gangotri': { km: 263, hours: 8 },
    'Yamunotri': { km: 215, hours: 6.5 },
    'Nainital': { km: 280, hours: 6.5 },
    'Jim Corbett': { km: 238, hours: 5.5 },
  },
  'Rishikesh': {
    'Haridwar': { km: 21, hours: 0.7 },
    'Mussoorie': { km: 79, hours: 2.3 },
    'Dehradun': { km: 44, hours: 1.2 },
    'Kedarnath': { km: 216, hours: 7 },
    'Badrinath': { km: 293, hours: 8.5 },
    'Gangotri': { km: 246, hours: 7.5 },
    'Yamunotri': { km: 191, hours: 6 },
    'Nainital': { km: 289, hours: 6.8 },
    'Jim Corbett': { km: 230, hours: 5.5 },
    'Valley of Flowers': { km: 273, hours: 8 },
  },
  'Delhi': {
    'Haridwar': { km: 220, hours: 4.5 },
    'Rishikesh': { km: 241, hours: 5 },
    'Dehradun': { km: 278, hours: 5.5 },
    'Mussoorie': { km: 305, hours: 6.5 },
    'Nainital': { km: 303, hours: 6.5 },
    'Jim Corbett': { km: 262, hours: 5.5 },
    'Kedarnath': { km: 447, hours: 11 },
    'Badrinath': { km: 498, hours: 13 },
    'Gangotri': { km: 477, hours: 12 },
    'Yamunotri': { km: 424, hours: 10.5 },
  },
};

// ── Folk Music & Cultural Pahadi Bands Data ─────────────────────────────────

import { FolkArtist, TraditionalInstrument, DisasterEvent } from '@/types/location';

export const FOLK_ARTISTS_DATA: FolkArtist[] = [
  {
    id: 'artist-narendra-singh-negi',
    name: 'Narendra Singh Negi',
    category: 'Folk Legend',
    region: 'Garhwal',
    title: 'Voice of Uttarakhand & Padma Shri Folk Singer',
    bio: 'Renowned as the Bob Dylan of the Himalayas. Over 1,000 iconic Garhwali songs capturing Himalayan folklore, environmental preservation, social issues, and love.',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    popularTracks: [
      { id: 't1', title: 'Bedu Pako Baro Masa', artist: 'Narendra Singh Negi', genre: 'Classic Pahadi Folk', youtubeUrl: 'https://www.youtube.com/results?search_query=Bedu+Pako+Baro+Masa+Negi', spotifyUrl: '#' },
      { id: 't2', title: 'Surma Sarela', artist: 'Narendra Singh Negi', genre: 'Garhwali Romantic Folk', youtubeUrl: 'https://www.youtube.com/results?search_query=Surma+Sarela+Narendra+Singh+Negi', spotifyUrl: '#' },
      { id: 't3', title: 'Chhuma Chaudhani', artist: 'Narendra Singh Negi', genre: 'Cultural Legend', youtubeUrl: 'https://www.youtube.com/results?search_query=Chhuma+Chaudhani', spotifyUrl: '#' }
    ],
    instrumentsPlayed: ['Harmonium', 'Dhol Damau', 'Flute'],
    associatedValleys: ['Alaknanda Valley', 'Mandakini Valley', 'Rawain Valley']
  },
  {
    id: 'artist-basanti-devi-bisht',
    name: 'Basanti Devi Bisht',
    category: 'Folk Legend',
    region: 'Garhwal',
    title: 'Padma Shri Jagar Singer & Cultural Icon',
    bio: 'The first female singer of the traditional Jagar (divine spirit invocation) folk genre in Uttarakhand. Preserving centuries-old sacred mountain oral traditions.',
    imageUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80',
    popularTracks: [
      { id: 't4', title: 'Maa Nanda Devi Jagar', artist: 'Basanti Devi Bisht', genre: 'Sacred Jagar Chant', youtubeUrl: 'https://www.youtube.com/results?search_query=Basanti+Devi+Bisht+Jagar', spotifyUrl: '#' },
      { id: 't5', title: 'Nanda Raj Jat Gatha', artist: 'Basanti Devi Bisht', genre: 'Epical Folk Gatha', youtubeUrl: 'https://www.youtube.com/results?search_query=Nanda+Raj+Jat+Basanti+Bisht', spotifyUrl: '#' }
    ],
    instrumentsPlayed: ['Thali', 'Damau'],
    associatedValleys: ['Nanda Devi Sanctuary', 'Chamoli Valley']
  },
  {
    id: 'artist-pandavaas-band',
    name: 'Pandavaas Band',
    category: 'Modern Pahadi Band',
    region: 'Statewide',
    title: 'Pioneers of Modern Himalayan Music Fusion',
    bio: 'Acclaimed audio-visual music production band blending ancient Himalayan folk instruments (Ransingha, Dhol) with contemporary cinematic rock & ambient soundscapes.',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    popularTracks: [
      { id: 't6', title: 'Time Machine (Uttarakhand Folk Tale)', artist: 'Pandavaas', genre: 'Cinematic Folk Fusion', youtubeUrl: 'https://www.youtube.com/results?search_query=Pandavaas+Time+Machine', spotifyUrl: '#' },
      { id: 't7', title: 'Jagar - The Awakening', artist: 'Pandavaas', genre: 'Modern Jagar Rock', youtubeUrl: 'https://www.youtube.com/results?search_query=Pandavaas+Jagar', spotifyUrl: '#' },
      { id: 't8', title: 'Baramasa Project', artist: 'Pandavaas', genre: 'Pahadi Ambient', youtubeUrl: 'https://www.youtube.com/results?search_query=Pandavaas+Baramasa', spotifyUrl: '#' }
    ],
    instrumentsPlayed: ['Electric Guitar', 'Ransingha', 'Dhol', 'Synthesizer'],
    associatedValleys: ['Srinagar Garhwal', 'Dehradun Valley']
  },
  {
    id: 'artist-gopal-babu-goswami',
    name: 'Gopal Babu Goswami',
    category: 'Folk Legend',
    region: 'Kumaon',
    title: 'Legendary Nightingale of Kumaon',
    bio: 'Immortal voice of Kumaon. Songs like "Hit Bhina Almoray" and "Kaile Baji Muruli" remain the soul of Kumaoni cultural festivals and identity.',
    imageUrl: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?auto=format&fit=crop&w=800&q=80',
    popularTracks: [
      { id: 't9', title: 'Hit Bhina Almoray', artist: 'Gopal Babu Goswami', genre: 'Kumaoni Classic Folk', youtubeUrl: 'https://www.youtube.com/results?search_query=Hit+Bhina+Almoray', spotifyUrl: '#' },
      { id: 't10', title: 'Kaile Baji Muruli', artist: 'Gopal Babu Goswami', genre: 'Kumaoni Flute Ballad', youtubeUrl: 'https://www.youtube.com/results?search_query=Kaile+Baji+Muruli', spotifyUrl: '#' }
    ],
    instrumentsPlayed: ['Flute', 'Hurka'],
    associatedValleys: ['Almora Valley', 'Kosi River Valley']
  },
  {
    id: 'artist-jubin-nautiyal-band',
    name: 'Jubin Nautiyal & Modern Pahadi Collective',
    category: 'Modern Pahadi Band',
    region: 'Statewide',
    title: 'Global Himalayan Pop Icon',
    bio: 'Jaunsari/Garhwali native who brought Himalayan tunes to global charts. Actively promotes Jaunsari and Garhwali acoustic sessions.',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80',
    popularTracks: [
      { id: 't11', title: 'Taqdeer (Jaunsari Folk Session)', artist: 'Jubin Nautiyal', genre: 'Acoustic Pahadi Pop', youtubeUrl: 'https://www.youtube.com/results?search_query=Jubin+Nautiyal+Pahadi+song', spotifyUrl: '#' },
      { id: 't12', title: 'O Aasman Wale', artist: 'Jubin Nautiyal', genre: 'Himalayan Ballad', youtubeUrl: 'https://www.youtube.com/results?search_query=Jubin+Nautiyal+O+Aasman+Wale', spotifyUrl: '#' }
    ],
    instrumentsPlayed: ['Acoustic Guitar', 'Harmonium'],
    associatedValleys: ['Jaunsar Bawar', 'Dehradun Hills']
  },
  {
    id: 'artist-pritam-bhartwan',
    name: 'Pritam Bhartwan (Jagar Samrat)',
    category: 'Folk Legend',
    region: 'Garhwal',
    title: 'Padma Shri Jagar Samrat & Master Percussionist',
    bio: 'Unmatched exponent of the ancient Jagar tradition and Pawada epic ballads. Master of Dhol Damau percussion and Himalayan oral chanting.',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    popularTracks: [
      { id: 't13', title: 'Nirankar Jagar', artist: 'Pritam Bhartwan', genre: 'Sacred Jagar Chant', youtubeUrl: 'https://www.youtube.com/results?search_query=Pritam+Bhartwan+Jagar', spotifyUrl: '#' },
      { id: 't14', title: 'Rajula Malushahi Gatha', artist: 'Pritam Bhartwan', genre: 'Epic Romance Ballad', youtubeUrl: 'https://www.youtube.com/results?search_query=Rajula+Malushahi+Pritam+Bhartwan', spotifyUrl: '#' }
    ],
    instrumentsPlayed: ['Dhol', 'Damau', 'Thali', 'Hurka'],
    associatedValleys: ['Srinagar Garhwal', 'Bhagirathi Valley']
  },
  {
    id: 'artist-meena-rana',
    name: 'Meena Rana',
    category: 'Folk Legend',
    region: 'Garhwal',
    title: 'Nightingale of Garhwal Folk Duets',
    bio: 'Prolific female folk singer with over 500 iconic duets across Garhwali, Kumaoni, and Jaunsari languages spanning three decades.',
    imageUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80',
    popularTracks: [
      { id: 't15', title: 'Sobhani Band', artist: 'Meena Rana', genre: 'Classic Garhwali Duet', youtubeUrl: 'https://www.youtube.com/results?search_query=Sobhani+Band+Meena+Rana', spotifyUrl: '#' },
      { id: 't16', title: 'Chandra Solani', artist: 'Meena Rana', genre: 'Pahadi Cultural Folk', youtubeUrl: 'https://www.youtube.com/results?search_query=Chandra+Solani+Meena+Rana', spotifyUrl: '#' }
    ],
    instrumentsPlayed: ['Harmonium'],
    associatedValleys: ['Pauri Garhwal', 'Doon Valley']
  },
  {
    id: 'artist-gunjan-dangwal',
    name: 'Gunjan Dangwal & Modern Beats',
    category: 'Modern Pahadi Band',
    region: 'Statewide',
    title: 'Pahadi Music Producer & Pop Innovator',
    bio: 'Modern music composer who modernized Garhwali & Kumaoni tracks like "Fwa Bagana" with electronic beats while preserving traditional vocal soul.',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    popularTracks: [
      { id: 't17', title: 'Fwa Bagana Modern Mix', artist: 'Gunjan Dangwal', genre: 'Electro Pahadi Folk', youtubeUrl: 'https://www.youtube.com/results?search_query=Fwa+Bagana+Gunjan+Dangwal', spotifyUrl: '#' },
      { id: 't18', title: 'Chait Ki Chaitwal', artist: 'Gunjan Dangwal', genre: 'Folk Pop Fusion', youtubeUrl: 'https://www.youtube.com/results?search_query=Chait+Ki+Chaitwal', spotifyUrl: '#' }
    ],
    instrumentsPlayed: ['Synthesizer', 'Dhol', 'Drums'],
    associatedValleys: ['Tehri Garhwal', 'Dehradun']
  }
];

export const TRADITIONAL_INSTRUMENTS_DATA: TraditionalInstrument[] = [
  {
    id: 'inst-dhol-damau',
    name: 'Dhol & Damau Duo',
    regionalName: 'ढोल-दमाऊ',
    material: 'Copper/Brass bowl, Wood, Goat-skin membrane',
    description: 'The sacred percussion duo of Uttarakhand. Played by the Das/Auja community during religious Jagars, weddings, and royal processions.',
    usedIn: 'Garhwali & Kumaoni Jagars, Nanda Devi Raj Jat, Weddings',
    imageUrl: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'inst-ransingha',
    name: 'Ransingha / Ran-Shing',
    regionalName: 'रणसिंगा',
    material: 'S-shaped curved Copper horn',
    description: 'Ancient Himalayan war horn played during royal war calls, sacred temple processions, and high mountain announcements.',
    usedIn: 'Temple Processions, War Re-enactments, Royal Ceremonies',
    imageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'inst-hurka',
    name: 'Hurka / Hourglass Drum',
    regionalName: 'हुड़का',
    material: 'Hourglass-shaped wood body, leather thongs',
    description: 'Hourglass-shaped drum holding central importance in Kumaoni Hurkiya Baul folk storytelling and paddy sowing songs.',
    usedIn: 'Hurkiya Baul Sowing Songs, Kumaoni Ballads',
    imageUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'inst-turhi',
    name: 'Turhi Trumpet',
    regionalName: 'तुरी',
    material: 'Straight brass or silver tube with flared bell',
    description: 'Resonant trumpet blown at high pitch to announce the arrival of deity palanquins during Char Dham Yatras.',
    usedIn: 'Deity Doli Arrivals, Char Dham Festivities',
    imageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'inst-bhinai',
    name: 'Bhinai / Double Bamboo Flute',
    regionalName: 'भिनाई',
    material: 'Twin bamboo pipes bound with bronze wire',
    description: 'Pastoral shepherd double flute creating hypnotic drone and melody simultaneously across high alpine meadows.',
    usedIn: 'Pastoral Shepherd Melodies, Kumaoni Love Ballads',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'inst-damama',
    name: 'Damama / Heavy Kettle Drum',
    regionalName: 'दमामा',
    material: 'Cast iron bowl with heavy leather head',
    description: 'Deep resonant kettle drum played alongside Dhol to echo sacred rhythms across deep Himalayan river valleys.',
    usedIn: 'Royal Festivities, Jagar Ritual Invocations',
    imageUrl: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=600&q=80'
  }
];

export const NATURAL_DISASTERS_DATA: DisasterEvent[] = [
  {
    id: 'disaster-kedarnath-2013',
    title: '2013 Kedarnath Himalayan Deluge & Flash Floods',
    year: 2013,
    dateStr: '16-17 June 2013',
    category: 'Flash Flood',
    district: 'Rudraprayag',
    region: 'Garhwal',
    severity: 'Critical',
    coordinates: { lng: 79.0669, lat: 30.7346 },
    summary: 'Chorabari Glacier lake outburst combined with multi-day torrential cloudbursts triggered catastrophic flash floods in the Mandakini and Alaknanda river basins.',
    impact: {
      livesAffected: '5,000+ casualties & missing persons across 4,200 villages',
      infrastructureDamage: 'Sonprayag bridge destroyed, Rambara town completely submerged, 1,300+ roads washed out.',
      affectedCorridors: ['Rudraprayag-Gaurikund NH-107', 'Rishikesh-Badrinath NH-58', 'Gangotri Highway'],
      reconstructionStatus: 'Fully rebuilt with concrete bio-retaining walls, new Sonprayag-Kedar trek path, 3-tier disaster shelters, and automated Doppler radar monitoring.',
      currentSafetyAdvice: 'Follow mandatory Sonprayag Biometric token check. Avoid trekking during active orange weather warnings.'
    },
    lessonsLearned: [
      'Establishment of State Disaster Response Force (SDRF) in Uttarakhand',
      'Construction of multi-tiered river embankments along Mandakini',
      'Satellite weather telemetry & automated rain gauges along Char Dham corridors'
    ],
    currentSafetyScore: 92,
    mitigationMeasures: [
      'Chorabari glacial lake sensor monitoring',
      'Mandakini river wall reinforcement',
      'Real-time weather SMS alert grid'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'disaster-chamoli-2021',
    title: '2021 Chamoli Glacial Outburst & Rishi Ganga Surge',
    year: 2021,
    dateStr: '7 February 2021',
    category: 'Glacial Outburst',
    district: 'Chamoli',
    region: 'Garhwal',
    severity: 'Severe',
    coordinates: { lng: 79.7420, lat: 30.4180 },
    summary: 'A rock and ice avalanche from Nanda Ghunti glacier triggered a devastating surge in Rishi Ganga and Dhauli Ganga rivers, impacting hydroelectric projects.',
    impact: {
      livesAffected: '200+ workers and villagers affected',
      infrastructureDamage: 'Rishi Ganga Hydro Project destroyed, Tapovan Vishnugad tunnel flooded, 5 motor bridges breached.',
      affectedCorridors: ['Joshimath-Niti Pass Road', 'Tapovan Access Corridor'],
      reconstructionStatus: 'New steel girder bridges built; high-frequency river water level warning sensors operational.',
      currentSafetyAdvice: 'Check Dhauli Ganga river level indicators near Raini village before travelling towards Niti Valley.'
    },
    lessonsLearned: [
      'Deployment of early warning water-level radar sensors on glacier streams',
      'Strict environmental zoning for mountain hydel projects',
      'Disaster drone surveillance squads established in Chamoli'
    ],
    currentSafetyScore: 88,
    mitigationMeasures: [
      'Acoustic river surge warnings',
      'SDRF rapid response unit in Joshimath'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'disaster-joshimath-2023',
    title: '2023 Joshimath Land Subsidence & Aquifer Crisis',
    year: 2023,
    dateStr: 'January 2023',
    category: 'Land Subsidence',
    district: 'Chamoli',
    region: 'Garhwal',
    severity: 'Severe',
    coordinates: { lng: 79.5690, lat: 30.5500 },
    summary: 'Cracks appeared in 800+ structures across Joshimath township due to sub-surface aquifer rupture, toe erosion by Alaknanda, and fragile moraine geology.',
    impact: {
      livesAffected: '250+ families safely relocated to relief camps',
      infrastructureDamage: 'Cracks on NH-58 Badrinath access highway, structural damage to hotels and town infrastructure.',
      affectedCorridors: ['Joshimath Town Corridor', 'Auli Cable Car Base'],
      reconstructionStatus: 'New Helang-Marwari Badrinath bypass road under construction to divert heavy Char Dham traffic away from vulnerable town slopes.',
      currentSafetyAdvice: 'Heavy vehicles diverted to Helang bypass corridor during peak traffic hours.'
    },
    lessonsLearned: [
      'Load-bearing cap enforced on commercial construction in fragile moraine zones',
      'Construction of comprehensive subterranean town drainage network',
      'ISRO satellite radar (InSAR) continuous land displacement monitoring'
    ],
    currentSafetyScore: 85,
    mitigationMeasures: [
      'InSAR Satellite Subsidence Monitoring',
      'Helang-Marwari Bypass Highway Construction',
      'Retaining wall slope stabilization'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'disaster-malpa-1998',
    title: '1998 Malpa Landslide & Rockfall',
    year: 1998,
    dateStr: '18 August 1998',
    category: 'Landslide',
    district: 'Pithoragarh',
    region: 'Kumaon',
    severity: 'Historical Warning',
    coordinates: { lng: 80.7300, lat: 29.8800 },
    summary: 'A massive rockfall destroyed Malpa village along the Kali River, taking down section of the Kailash Mansarovar Yatra pilgrimage trail.',
    impact: {
      livesAffected: '200+ casualties including Kailash Mansarovar pilgrims and dancer Protima Bedi',
      infrastructureDamage: 'Pithoragarh-Dharchula border trail devastated.',
      affectedCorridors: ['Dharchula-Lipulekh Kailash Yatra Route'],
      reconstructionStatus: 'Border Roads Organisation (BRO) constructed an all-weather blacktopped motor road bypassing rockfall zones.',
      currentSafetyAdvice: 'All-weather BRO highway now operational up to Lipulekh Pass.'
    },
    lessonsLearned: [
      'Geological slope stabilization mapping across Kumaon border highways',
      'BRO avalanche and landslide rock-shed structures built along Kali river'
    ],
    currentSafetyScore: 90,
    mitigationMeasures: [
      'BRO Rock-shed protective tunnels',
      'Slope mesh netting along cliff faces'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80'
  }
];

