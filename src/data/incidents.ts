export type IncidentType = 'Collision' | 'Road Closure' | 'Heavy Congestion' | 'VIP Movement' | 'Road Works' | 'Flooding' | 'Stalled Vehicle' | 'Public Event';
export type Severity = 'Critical' | 'High' | 'Medium' | 'Low';
export type IncidentStatus = 'Active' | 'Monitoring' | 'Resolved' | 'Planned';

export interface Incident {
  id: string;
  type: IncidentType;
  severity: Severity;
  status: IncidentStatus;
  location: string;
  corridor: string;
  affectedJunctions: string[];
  description: string;
  reportedAt: string;
  reportedBy: string;
  estimatedClearance: string;
  diversionNote: string;
  overrideTriggered: boolean;
}

export const incidents: Incident[] = [
  {
    id: 'INC-0041',
    type: 'Collision',
    severity: 'High',
    status: 'Active',
    location: 'Galle Rd near Liberty Roundabout, Colombo 03',
    corridor: 'Galle Road Corridor',
    affectedJunctions: ['J02', 'J10'],
    description: 'Two-vehicle collision blocking the inner lane. Police on scene. Tow requested.',
    reportedAt: '14:18:33',
    reportedBy: 'Insp. R. Perera (Badge #0182)',
    estimatedClearance: '15:00',
    diversionNote: 'Recommend diversion via Thurstan Rd → Duplication Rd. Signal J02 on manual override.',
    overrideTriggered: true,
  },
  {
    id: 'INC-0040',
    type: 'VIP Movement',
    severity: 'Medium',
    status: 'Active',
    location: 'Borella Cemetery Junction → Presidential Secretariat',
    corridor: 'Borella–Maradana',
    affectedJunctions: ['J08', 'J11'],
    description: 'State motorcade movement active. Emergency priority corridor engaged via J08.',
    reportedAt: '14:05:00',
    reportedBy: 'Traffic Control Centre — Auto Dispatch',
    estimatedClearance: '14:45',
    diversionNote: 'Road users advised to avoid Dharmapala Mawatha until 14:45.',
    overrideTriggered: true,
  },
  {
    id: 'INC-0039',
    type: 'Heavy Congestion',
    severity: 'Medium',
    status: 'Monitoring',
    location: 'Pettah Bus Terminal Junction',
    corridor: 'Maradana–Pettah',
    affectedJunctions: ['J04'],
    description: 'Unusually high bus accumulation causing queue spillback on Main St. System auto-extended green.',
    reportedAt: '13:52:10',
    reportedBy: 'AI Detection System',
    estimatedClearance: '14:30',
    diversionNote: 'No advisory issued. Monitoring queue dissipation.',
    overrideTriggered: false,
  },
  {
    id: 'INC-0038',
    type: 'Road Works',
    severity: 'Low',
    status: 'Active',
    location: 'High Level Rd — Kirulapone to Nugegoda Segment',
    corridor: 'High Level Road',
    affectedJunctions: ['J09', 'J06'],
    description: 'Lane narrowing due to Road Development Authority resurfacing works. Planned until 18:00.',
    reportedAt: '07:00:00',
    reportedBy: 'Road Development Authority',
    estimatedClearance: '18:00',
    diversionNote: 'Motorists advised to use High Level Road inner lane or Baseline Rd as alternative.',
    overrideTriggered: false,
  },
  {
    id: 'INC-0037',
    type: 'Public Event',
    severity: 'Medium',
    status: 'Planned',
    location: 'Galle Face Green & Galle Road Corridor',
    corridor: 'Galle Road Corridor',
    affectedJunctions: ['J02', 'J10', 'J12'],
    description: 'National Day public event at Galle Face. Expect crowd dispersal traffic surge 17:00–19:00.',
    reportedAt: '09:00:00',
    reportedBy: 'Urban Council – Event Notification',
    estimatedClearance: '19:30',
    diversionNote: 'Adaptive timing profiles pre-loaded for J02, J10, J12 for event dispersal.',
    overrideTriggered: false,
  },
  {
    id: 'INC-0036',
    type: 'Stalled Vehicle',
    severity: 'Low',
    status: 'Resolved',
    location: 'Narahenpita Police Junction — Northbound',
    corridor: 'Borella–Maradana',
    affectedJunctions: ['J11'],
    description: 'Breakdown vehicle cleared by traffic police. Queue dissipated within 12 minutes.',
    reportedAt: '13:20:44',
    reportedBy: 'Cpl. S. Jayawardena (Badge #0311)',
    estimatedClearance: '13:35',
    diversionNote: 'No diversion required. Incident resolved.',
    overrideTriggered: false,
  },
  {
    id: 'INC-0035',
    type: 'Flooding',
    severity: 'High',
    status: 'Resolved',
    location: 'Dehiwala Low-Level Crossing',
    corridor: 'Galle Road Corridor',
    affectedJunctions: ['J07'],
    description: 'Flash flooding following rainfall blocked road for 38 minutes. Signal placed in Emergency mode.',
    reportedAt: '11:44:00',
    reportedBy: 'AI Detection System',
    estimatedClearance: '12:28',
    diversionNote: 'Marine Drive used as alternate. Signal restored to Adaptive at 12:30.',
    overrideTriggered: true,
  },
];

export const publicAlerts = incidents.filter(i => ['Active', 'Planned'].includes(i.status));
