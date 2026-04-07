export interface RouteOption {
  id: string;
  label: string;
  via: string[];
  distanceKm: number;
  estimatedMins: number;
  congestionLevel: 'Low' | 'Moderate' | 'High';
  recommended: boolean;
  reason: string;
  incidents: string[];
}

export interface RouteScenario {
  origin: string;
  destination: string;
  routes: RouteOption[];
}

export const routeScenarios: RouteScenario[] = [
  {
    origin: 'Dehiwala',
    destination: 'Fort (Colombo 01)',
    routes: [
      {
        id: 'R1', label: 'Via Marine Drive', via: ['Marine Drive', 'Slave Island Junction', 'Fort'],
        distanceKm: 14.2, estimatedMins: 28, congestionLevel: 'Low', recommended: true,
        reason: 'Marine Drive is currently clear. Avoids Liberty Roundabout collision.',
        incidents: [],
      },
      {
        id: 'R2', label: 'Via Galle Rd (Standard)', via: ['Dehiwala', 'Bambalapitiya', 'Liberty Roundabout', 'Fort'],
        distanceKm: 12.8, estimatedMins: 52, congestionLevel: 'High', recommended: false,
        reason: 'Active collision at Liberty Roundabout. Severe delay expected.',
        incidents: ['INC-0041'],
      },
    ],
  },
  {
    origin: 'Nugegoda',
    destination: 'Maradana',
    routes: [
      {
        id: 'R3', label: 'Via Borella', via: ['Nugegoda', 'Kirulapone', 'Borella', 'Maradana'],
        distanceKm: 9.4, estimatedMins: 34, congestionLevel: 'Moderate', recommended: true,
        reason: 'Balanced route. Signal J08 is on Emergency Priority but should clear by 14:45.',
        incidents: ['INC-0040'],
      },
      {
        id: 'R4', label: 'Via High Level Road', via: ['Nugegoda', 'Kirulapone', 'Baseline Rd', 'Maradana'],
        distanceKm: 10.1, estimatedMins: 41, congestionLevel: 'Moderate', recommended: false,
        reason: 'Road works narrowing near Kirulapone. Expect 12–18 min additional delay.',
        incidents: ['INC-0038'],
      },
    ],
  },
  {
    origin: 'Rajagiriya',
    destination: 'Pettah',
    routes: [
      {
        id: 'R5', label: 'Via Rajagiriya Flyover → Maradana', via: ['Rajagiriya', 'Maradana', 'Pettah'],
        distanceKm: 7.8, estimatedMins: 22, congestionLevel: 'Low', recommended: true,
        reason: 'Rajagiriya flyover is free-flowing. Recommended as fastest option.',
        incidents: [],
      },
      {
        id: 'R6', label: 'Via Baseline Rd', via: ['Rajagiriya', 'Baseline Rd', 'Pettah'],
        distanceKm: 9.2, estimatedMins: 38, congestionLevel: 'Moderate', recommended: false,
        reason: 'Heavier congestion on Baseline Rd. Not recommended during peak hour.',
        incidents: [],
      },
    ],
  },
];

export const presetOrigins = ['Dehiwala', 'Nugegoda', 'Rajagiriya', 'Borella', 'Kirulapone', 'Bambalapitiya', 'Kollupitiya', 'Maradana'];
export const presetDestinations = ['Fort (Colombo 01)', 'Pettah', 'Maradana', 'Kollupitiya', 'Nugegoda', 'Rajagiriya', 'Dehiwala', 'Borella'];
