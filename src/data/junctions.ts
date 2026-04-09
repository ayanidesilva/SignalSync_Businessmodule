export type CongestionLevel = 'free' | 'moderate' | 'heavy' | 'severe';
export type SignalMode = 'Adaptive' | 'Manual Override' | 'Fixed-Time' | 'Emergency Priority' | 'Offline';
export type ControllerStatus = 'Connected' | 'Degraded' | 'Offline';

export interface Junction {
  id: string;
  name: string;
  shortName: string;
  corridor: string;
  lat: number;
  lng: number;
  congestion: CongestionLevel;
  congestionPct: number;
  queueLength: number; // metres
  signalMode: SignalMode;
  controllerStatus: ControllerStatus;
  cctvFeeds: number;
  cctvHealthy: number;
  currentGreenTime: number; // seconds
  cycleTime: number;
  avgDelay: number; // seconds per vehicle
  throughput: number; // vehicles/hour
  overrideActive: boolean;
  lastUpdated: string;
  incidents: number;
}

export const junctions: Junction[] = [
  {
    id: 'J01', name: 'Baseline Rd / Galle Rd', shortName: 'Baseline-Galle', corridor: 'Galle Road Corridor',
    lat: 6.8731, lng: 79.8707, congestion: 'heavy', congestionPct: 78, queueLength: 145,
    signalMode: 'Adaptive', controllerStatus: 'Connected', cctvFeeds: 4, cctvHealthy: 4,
    currentGreenTime: 52, cycleTime: 90, avgDelay: 42, throughput: 1240, overrideActive: false,
    lastUpdated: '14:32:08', incidents: 0,
  },
  {
    id: 'J02', name: 'Liberty Roundabout', shortName: 'Liberty Rbt', corridor: 'Galle Road Corridor',
    lat: 6.8927, lng: 79.8539, congestion: 'severe', congestionPct: 91, queueLength: 230,
    signalMode: 'Manual Override', controllerStatus: 'Connected', cctvFeeds: 6, cctvHealthy: 5,
    currentGreenTime: 68, cycleTime: 120, avgDelay: 74, throughput: 890, overrideActive: true,
    lastUpdated: '14:32:11', incidents: 1,
  },
  {
    id: 'J03', name: 'Maradana Railway Junction', shortName: 'Maradana Rly', corridor: 'Maradana–Pettah',
    lat: 6.9217, lng: 79.8607, congestion: 'moderate', congestionPct: 54, queueLength: 72,
    signalMode: 'Adaptive', controllerStatus: 'Connected', cctvFeeds: 4, cctvHealthy: 4,
    currentGreenTime: 38, cycleTime: 80, avgDelay: 28, throughput: 1480, overrideActive: false,
    lastUpdated: '14:32:05', incidents: 0,
  },
  {
    id: 'J04', name: 'Pettah Bus Terminal Junction', shortName: 'Pettah Bus', corridor: 'Maradana–Pettah',
    lat: 6.9354, lng: 79.8519, congestion: 'heavy', congestionPct: 82, queueLength: 160,
    signalMode: 'Adaptive', controllerStatus: 'Connected', cctvFeeds: 3, cctvHealthy: 3,
    currentGreenTime: 55, cycleTime: 90, avgDelay: 56, throughput: 1020, overrideActive: false,
    lastUpdated: '14:32:09', incidents: 0,
  },
  {
    id: 'J05', name: 'Rajagiriya Flyover Base', shortName: 'Rajagiriya', corridor: 'Rajagiriya–Kotte',
    lat: 6.9014, lng: 79.9009, congestion: 'moderate', congestionPct: 47, queueLength: 55,
    signalMode: 'Adaptive', controllerStatus: 'Connected', cctvFeeds: 4, cctvHealthy: 4,
    currentGreenTime: 32, cycleTime: 75, avgDelay: 22, throughput: 1650, overrideActive: false,
    lastUpdated: '14:32:03', incidents: 0,
  },
  {
    id: 'J06', name: 'Nugegoda Town Centre', shortName: 'Nugegoda', corridor: 'High Level Road',
    lat: 6.8644, lng: 79.8986, congestion: 'heavy', congestionPct: 74, queueLength: 118,
    signalMode: 'Adaptive', controllerStatus: 'Degraded', cctvFeeds: 3, cctvHealthy: 2,
    currentGreenTime: 48, cycleTime: 85, avgDelay: 48, throughput: 1110, overrideActive: false,
    lastUpdated: '14:31:58', incidents: 0,
  },
  {
    id: 'J07', name: 'Dehiwala Junction', shortName: 'Dehiwala', corridor: 'Galle Road Corridor',
    lat: 6.8525, lng: 79.8657, congestion: 'free', congestionPct: 22, queueLength: 18,
    signalMode: 'Adaptive', controllerStatus: 'Connected', cctvFeeds: 3, cctvHealthy: 3,
    currentGreenTime: 28, cycleTime: 65, avgDelay: 11, throughput: 1920, overrideActive: false,
    lastUpdated: '14:32:07', incidents: 0,
  },
  {
    id: 'J08', name: 'Borella Cemetery Junction', shortName: 'Borella', corridor: 'Borella–Maradana',
    lat: 6.9142, lng: 79.8749, congestion: 'severe', congestionPct: 88, queueLength: 195,
    signalMode: 'Emergency Priority', controllerStatus: 'Connected', cctvFeeds: 4, cctvHealthy: 4,
    currentGreenTime: 90, cycleTime: 120, avgDelay: 69, throughput: 780, overrideActive: true,
    lastUpdated: '14:32:14', incidents: 1,
  },
  {
    id: 'J09', name: 'Kirulapone Interchange', shortName: 'Kirulapone', corridor: 'High Level Road',
    lat: 6.8748, lng: 79.8864, congestion: 'moderate', congestionPct: 58, queueLength: 80,
    signalMode: 'Adaptive', controllerStatus: 'Connected', cctvFeeds: 4, cctvHealthy: 4,
    currentGreenTime: 40, cycleTime: 80, avgDelay: 31, throughput: 1390, overrideActive: false,
    lastUpdated: '14:32:06', incidents: 0,
  },
  {
    id: 'J10', name: 'Kollupitiya Junction', shortName: 'Kollupitiya', corridor: 'Galle Road Corridor',
    lat: 6.9016, lng: 79.8508, congestion: 'heavy', congestionPct: 70, queueLength: 105,
    signalMode: 'Adaptive', controllerStatus: 'Connected', cctvFeeds: 4, cctvHealthy: 4,
    currentGreenTime: 45, cycleTime: 85, avgDelay: 38, throughput: 1280, overrideActive: false,
    lastUpdated: '14:32:10', incidents: 0,
  },
  {
    id: 'J11', name: 'Narahenpita Police Junction', shortName: 'Narahenpita', corridor: 'Borella–Maradana',
    lat: 6.9066, lng: 79.8788, congestion: 'free', congestionPct: 18, queueLength: 12,
    signalMode: 'Adaptive', controllerStatus: 'Connected', cctvFeeds: 2, cctvHealthy: 2,
    currentGreenTime: 25, cycleTime: 60, avgDelay: 8, throughput: 2040, overrideActive: false,
    lastUpdated: '14:32:02', incidents: 0,
  },
  {
    id: 'J12', name: 'Bambalapitiya Junction', shortName: 'Bambalapitiya', corridor: 'Galle Road Corridor',
    lat: 6.8887, lng: 79.8524, congestion: 'moderate', congestionPct: 49, queueLength: 62,
    signalMode: 'Adaptive', controllerStatus: 'Connected', cctvFeeds: 3, cctvHealthy: 3,
    currentGreenTime: 35, cycleTime: 75, avgDelay: 25, throughput: 1510, overrideActive: false,
    lastUpdated: '14:32:04', incidents: 0,
  },
];

export const corridors = [
  { id: 'C1', name: 'Galle Road Corridor', junctionCount: 5, congestion: 'heavy' as CongestionLevel, avgDelay: 38 },
  { id: 'C2', name: 'Maradana–Pettah', junctionCount: 2, congestion: 'moderate' as CongestionLevel, avgDelay: 42 },
  { id: 'C3', name: 'High Level Road', junctionCount: 2, congestion: 'heavy' as CongestionLevel, avgDelay: 40 },
  { id: 'C4', name: 'Borella–Maradana', junctionCount: 2, congestion: 'severe' as CongestionLevel, avgDelay: 55 },
  { id: 'C5', name: 'Rajagiriya–Kotte', junctionCount: 1, congestion: 'moderate' as CongestionLevel, avgDelay: 22 },
];
