export const kpiSummary = {
  activeJunctions: 12,
  totalJunctions: 14,
  activeIncidents: 2,
  overridesActive: 2,
  cctvFeeds: 44,
  cctvHealthy: 42,
  avgDelayReduction: 18.4,
  throughputGain: 11.2,
  systemUptime: 99.7,
  adaptiveJunctions: 10,
};

export const hourlyThroughput = [
  { time: '06:00', galle: 540, maradana: 320, highLevel: 280, borella: 190 },
  { time: '07:00', galle: 1020, maradana: 760, highLevel: 680, borella: 510 },
  { time: '08:00', galle: 1580, maradana: 1210, highLevel: 1040, borella: 870 },
  { time: '09:00', galle: 1720, maradana: 1380, highLevel: 1190, borella: 940 },
  { time: '10:00', galle: 1340, maradana: 1050, highLevel: 920, borella: 720 },
  { time: '11:00', galle: 1180, maradana: 920, highLevel: 840, borella: 650 },
  { time: '12:00', galle: 1420, maradana: 1100, highLevel: 980, borella: 780 },
  { time: '13:00', galle: 1510, maradana: 1180, highLevel: 1030, borella: 820 },
  { time: '14:00', galle: 1280, maradana: 960, highLevel: 880, borella: 700 },
  { time: '15:00', galle: 1110, maradana: 840, highLevel: 770, borella: 610 },
  { time: '16:00', galle: 1650, maradana: 1280, highLevel: 1120, borella: 890 },
  { time: '17:00', galle: 1890, maradana: 1490, highLevel: 1310, borella: 1040 },
  { time: '18:00', galle: 1940, maradana: 1530, highLevel: 1350, borella: 1080 },
  { time: '19:00', galle: 1580, maradana: 1200, highLevel: 1060, borella: 840 },
  { time: '20:00', galle: 1150, maradana: 870, highLevel: 750, borella: 590 },
  { time: '21:00', galle: 790, maradana: 580, highLevel: 510, borella: 380 },
  { time: '22:00', galle: 440, maradana: 310, highLevel: 270, borella: 210 },
];

export const congestionTrend7Day = [
  { day: 'Mon', avgDelay: 52, peakDelay: 89, incidents: 3 },
  { day: 'Tue', avgDelay: 48, peakDelay: 82, incidents: 2 },
  { day: 'Wed', avgDelay: 55, peakDelay: 94, incidents: 4 },
  { day: 'Thu', avgDelay: 44, peakDelay: 76, incidents: 1 },
  { day: 'Fri', avgDelay: 61, peakDelay: 102, incidents: 5 },
  { day: 'Sat', avgDelay: 34, peakDelay: 58, incidents: 1 },
  { day: 'Sun', avgDelay: 28, peakDelay: 44, incidents: 0 },
];

export const overrideFrequency = [
  { week: 'W1 Mar', manual: 12, emergency: 3, emergency_vip: 1 },
  { week: 'W2 Mar', manual: 9, emergency: 2, emergency_vip: 2 },
  { week: 'W3 Mar', manual: 14, emergency: 4, emergency_vip: 0 },
  { week: 'W4 Mar', manual: 8, emergency: 1, emergency_vip: 1 },
  { week: 'W1 Apr', manual: 11, emergency: 3, emergency_vip: 2 },
];

export const junctionPerformance = [
  { junction: 'Baseline-Galle', delayReduction: 22, throughputGain: 14, overrides: 3 },
  { junction: 'Liberty Rbt', delayReduction: 11, throughputGain: 6, overrides: 9 },
  { junction: 'Maradana Rly', delayReduction: 19, throughputGain: 12, overrides: 1 },
  { junction: 'Pettah Bus', delayReduction: 16, throughputGain: 9, overrides: 4 },
  { junction: 'Rajagiriya', delayReduction: 24, throughputGain: 16, overrides: 0 },
  { junction: 'Nugegoda', delayReduction: 14, throughputGain: 8, overrides: 2 },
  { junction: 'Borella', delayReduction: 8, throughputGain: 4, overrides: 12 },
  { junction: 'Kirulapone', delayReduction: 20, throughputGain: 13, overrides: 1 },
];

export const systemHealthTimeline = [
  { time: '06:00', uptime: 100, cctvHealth: 100, latency: 42 },
  { time: '08:00', uptime: 100, cctvHealth: 98, latency: 48 },
  { time: '10:00', uptime: 100, cctvHealth: 100, latency: 38 },
  { time: '12:00', uptime: 99, cctvHealth: 97, latency: 51 },
  { time: '14:00', uptime: 100, cctvHealth: 95, latency: 44 },
  { time: '16:00', uptime: 100, cctvHealth: 100, latency: 40 },
  { time: '18:00', uptime: 100, cctvHealth: 98, latency: 46 },
  { time: '20:00', uptime: 100, cctvHealth: 100, latency: 39 },
];
