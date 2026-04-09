export type RuleState = 'Active' | 'Draft' | 'Archived' | 'Pending Approval';

export interface OptimisationProfile {
  id: string;
  name: string;
  corridor: string;
  junctions: string[];
  state: RuleState;
  version: string;
  minGreen: number;
  maxGreen: number;
  minRed: number;
  cycleLimit: number;
  pedestrianPhase: number;
  timeOfDay: string;
  safetyConstraints: string[];
  notes: string;
  updatedBy: string;
  updatedAt: string;
  approvedBy?: string;
}

export const optimisationProfiles: OptimisationProfile[] = [
  {
    id: 'OP01', name: 'Galle Road — Morning Peak', corridor: 'Galle Road Corridor',
    junctions: ['J01', 'J02', 'J10', 'J12'],
    state: 'Active', version: 'v3.1',
    minGreen: 25, maxGreen: 75, minRed: 15, cycleLimit: 110, pedestrianPhase: 18,
    timeOfDay: '06:30 – 09:30',
    safetyConstraints: ['Min ped phase must be ≥15s', 'Emergency override takes priority', 'Cycle limit enforced regardless of demand'],
    notes: 'Optimised for southbound Galle Rd inflow. Coordinated green wave with J01.',
    updatedBy: 'Amara Wijesekera', updatedAt: '2026-04-01 10:00', approvedBy: 'Sunil Bandara',
  },
  {
    id: 'OP02', name: 'Galle Road — Evening Peak', corridor: 'Galle Road Corridor',
    junctions: ['J01', 'J02', 'J10', 'J12'],
    state: 'Active', version: 'v3.0',
    minGreen: 28, maxGreen: 80, minRed: 15, cycleLimit: 115, pedestrianPhase: 20,
    timeOfDay: '16:00 – 19:30',
    safetyConstraints: ['Min ped phase must be ≥15s', 'Emergency override takes priority'],
    notes: 'Northbound priority for Galle Rd evening dispersal.',
    updatedBy: 'Amara Wijesekera', updatedAt: '2026-03-28 14:30', approvedBy: 'Sunil Bandara',
  },
  {
    id: 'OP03', name: 'Galle Road — Peak PM Extended', corridor: 'Galle Road Corridor',
    junctions: ['J01', 'J02', 'J10', 'J12'],
    state: 'Draft', version: 'v3.2-draft',
    minGreen: 28, maxGreen: 85, minRed: 15, cycleLimit: 120, pedestrianPhase: 20,
    timeOfDay: '16:00 – 20:00',
    safetyConstraints: ['Min ped phase must be ≥15s'],
    notes: 'Extended peak window to cover event traffic on Galle Face days. Pending approval.',
    updatedBy: 'Amara Wijesekera', updatedAt: '2026-04-07 12:34',
  },
  {
    id: 'OP04', name: 'High Level Road — Standard Adaptive', corridor: 'High Level Road',
    junctions: ['J06', 'J09'],
    state: 'Active', version: 'v2.4',
    minGreen: 22, maxGreen: 68, minRed: 12, cycleLimit: 95, pedestrianPhase: 16,
    timeOfDay: 'All Day',
    safetyConstraints: ['Min ped phase must be ≥12s', 'Road works override: max green capped at 55s'],
    notes: 'Adjusted for ongoing road works near Kirulapone. Applies until 2026-04-15.',
    updatedBy: 'Amara Wijesekera', updatedAt: '2026-04-07 10:15', approvedBy: 'Sunil Bandara',
  },
  {
    id: 'OP05', name: 'Maradana–Pettah — Bus Priority', corridor: 'Maradana–Pettah',
    junctions: ['J03', 'J04'],
    state: 'Active', version: 'v1.8',
    minGreen: 30, maxGreen: 70, minRed: 15, cycleLimit: 100, pedestrianPhase: 18,
    timeOfDay: '07:00 – 20:00',
    safetyConstraints: ['Bus phase priority active: minimum bus green ≥30s'],
    notes: 'Bus priority rules active for Lanka Ashok Leyland CTB routes.',
    updatedBy: 'Sunil Bandara', updatedAt: '2026-03-10 09:00', approvedBy: 'Sunil Bandara',
  },
  {
    id: 'OP06', name: 'Borella–Maradana — Off-Peak', corridor: 'Borella–Maradana',
    junctions: ['J08', 'J11'],
    state: 'Archived', version: 'v1.2',
    minGreen: 20, maxGreen: 55, minRed: 10, cycleLimit: 75, pedestrianPhase: 14,
    timeOfDay: 'All Day',
    safetyConstraints: [],
    notes: 'Replaced by OP07. Retained for reference.',
    updatedBy: 'Sunil Bandara', updatedAt: '2026-01-15 11:00',
  },
];
