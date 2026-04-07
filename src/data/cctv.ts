export type FeedHealth = 'Stable' | 'Degraded' | 'Offline' | 'Calibrating';
export type DetectionStatus = 'Active' | 'Paused' | 'Error';

export interface CCTVFeed {
  id: string;
  junctionId: string;
  junctionName: string;
  label: string;
  direction: string;
  health: FeedHealth;
  detectionStatus: DetectionStatus;
  confidence: number;
  queueEstimate: number;
  vehicleCount: number;
  lastFrame: string;
  resolution: string;
  ip: string;
  calibratedAt: string;
  notes?: string;
}

export const cctvFeeds: CCTVFeed[] = [
  { id: 'CAM-J01-01', junctionId: 'J01', junctionName: 'Baseline Rd / Galle Rd', label: 'CAM-J01-01', direction: 'North Approach', health: 'Stable', detectionStatus: 'Active', confidence: 96, queueEstimate: 145, vehicleCount: 38, lastFrame: '14:32:08', resolution: '1080p', ip: '10.14.11.101', calibratedAt: '2026-04-01' },
  { id: 'CAM-J01-02', junctionId: 'J01', junctionName: 'Baseline Rd / Galle Rd', label: 'CAM-J01-02', direction: 'South Approach', health: 'Stable', detectionStatus: 'Active', confidence: 94, queueEstimate: 112, vehicleCount: 29, lastFrame: '14:32:08', resolution: '1080p', ip: '10.14.11.102', calibratedAt: '2026-04-01' },
  { id: 'CAM-J01-03', junctionId: 'J01', junctionName: 'Baseline Rd / Galle Rd', label: 'CAM-J01-03', direction: 'East Approach', health: 'Stable', detectionStatus: 'Active', confidence: 91, queueEstimate: 78, vehicleCount: 21, lastFrame: '14:32:08', resolution: '720p', ip: '10.14.11.103', calibratedAt: '2026-04-01' },
  { id: 'CAM-J01-04', junctionId: 'J01', junctionName: 'Baseline Rd / Galle Rd', label: 'CAM-J01-04', direction: 'West Approach', health: 'Stable', detectionStatus: 'Active', confidence: 93, queueEstimate: 89, vehicleCount: 24, lastFrame: '14:32:08', resolution: '720p', ip: '10.14.11.104', calibratedAt: '2026-04-01' },

  { id: 'CAM-J02-01', junctionId: 'J02', junctionName: 'Liberty Roundabout', label: 'CAM-J02-01', direction: 'Main Entry', health: 'Stable', detectionStatus: 'Active', confidence: 97, queueEstimate: 230, vehicleCount: 58, lastFrame: '14:32:11', resolution: '1080p', ip: '10.14.12.101', calibratedAt: '2026-03-28' },
  { id: 'CAM-J02-02', junctionId: 'J02', junctionName: 'Liberty Roundabout', label: 'CAM-J02-02', direction: 'Galle Rd South', health: 'Stable', detectionStatus: 'Active', confidence: 95, queueEstimate: 185, vehicleCount: 47, lastFrame: '14:32:11', resolution: '1080p', ip: '10.14.12.102', calibratedAt: '2026-03-28' },
  { id: 'CAM-J02-03', junctionId: 'J02', junctionName: 'Liberty Roundabout', label: 'CAM-J02-03', direction: 'Thurstan Rd', health: 'Degraded', detectionStatus: 'Active', confidence: 72, queueEstimate: 140, vehicleCount: 34, lastFrame: '14:32:09', resolution: '720p', ip: '10.14.12.103', calibratedAt: '2026-03-15', notes: 'Partial occlusion by tree. Recalibration pending.' },
  { id: 'CAM-J02-04', junctionId: 'J02', junctionName: 'Liberty Roundabout', label: 'CAM-J02-04', direction: 'Duplication Rd', health: 'Stable', detectionStatus: 'Active', confidence: 96, queueEstimate: 160, vehicleCount: 42, lastFrame: '14:32:11', resolution: '1080p', ip: '10.14.12.104', calibratedAt: '2026-03-28' },
  { id: 'CAM-J02-05', junctionId: 'J02', junctionName: 'Liberty Roundabout', label: 'CAM-J02-05', direction: 'Overhead Panoramic', health: 'Stable', detectionStatus: 'Active', confidence: 98, queueEstimate: 210, vehicleCount: 54, lastFrame: '14:32:11', resolution: '4K', ip: '10.14.12.105', calibratedAt: '2026-04-02' },
  { id: 'CAM-J02-06', junctionId: 'J02', junctionName: 'Liberty Roundabout', label: 'CAM-J02-06', direction: 'Pedestrian Flow', health: 'Offline', detectionStatus: 'Paused', confidence: 0, queueEstimate: 0, vehicleCount: 0, lastFrame: '13:55:00', resolution: '1080p', ip: '10.14.12.106', calibratedAt: '2026-02-20', notes: 'Network timeout. Field tech dispatched.' },

  { id: 'CAM-J06-01', junctionId: 'J06', junctionName: 'Nugegoda Town Centre', label: 'CAM-J06-01', direction: 'High Level Rd North', health: 'Stable', detectionStatus: 'Active', confidence: 92, queueEstimate: 118, vehicleCount: 31, lastFrame: '14:31:58', resolution: '1080p', ip: '10.14.16.101', calibratedAt: '2026-03-22' },
  { id: 'CAM-J06-02', junctionId: 'J06', junctionName: 'Nugegoda Town Centre', label: 'CAM-J06-02', direction: 'Cross Rd', health: 'Degraded', detectionStatus: 'Active', confidence: 68, queueEstimate: 85, vehicleCount: 22, lastFrame: '14:31:55', resolution: '720p', ip: '10.14.16.102', calibratedAt: '2026-02-15', notes: 'Lens contamination. Confidence degraded.' },
  { id: 'CAM-J06-03', junctionId: 'J06', junctionName: 'Nugegoda Town Centre', label: 'CAM-J06-03', direction: 'High Level Rd South', health: 'Offline', detectionStatus: 'Error', confidence: 0, queueEstimate: 0, vehicleCount: 0, lastFrame: '12:14:00', resolution: '720p', ip: '10.14.16.103', calibratedAt: '2026-01-30', notes: 'Power supply failure. Maintenance request raised.' },

  { id: 'CAM-J09-01', junctionId: 'J09', junctionName: 'Kirulapone Interchange', label: 'CAM-J09-01', direction: 'Main Approach', health: 'Stable', detectionStatus: 'Active', confidence: 95, queueEstimate: 80, vehicleCount: 22, lastFrame: '14:32:06', resolution: '1080p', ip: '10.14.19.101', calibratedAt: '2026-04-07' },
  { id: 'CAM-J09-02', junctionId: 'J09', junctionName: 'Kirulapone Interchange', label: 'CAM-J09-02', direction: 'Slip Road', health: 'Stable', detectionStatus: 'Active', confidence: 93, queueEstimate: 55, vehicleCount: 15, lastFrame: '14:32:06', resolution: '1080p', ip: '10.14.19.102', calibratedAt: '2026-04-07' },
  { id: 'CAM-J09-03', junctionId: 'J09', junctionName: 'Kirulapone Interchange', label: 'CAM-J09-03', direction: 'Pedestrian Crossing', health: 'Stable', detectionStatus: 'Active', confidence: 94, queueEstimate: 30, vehicleCount: 8, lastFrame: '14:32:06', resolution: '1080p', ip: '10.14.19.103', calibratedAt: '2026-04-07', notes: 'Recently recalibrated by P. Senanayake.' },
  { id: 'CAM-J09-04', junctionId: 'J09', junctionName: 'Kirulapone Interchange', label: 'CAM-J09-04', direction: 'Exit Lane', health: 'Calibrating', detectionStatus: 'Paused', confidence: 0, queueEstimate: 0, vehicleCount: 0, lastFrame: '14:30:00', resolution: '1080p', ip: '10.14.19.104', calibratedAt: '2026-04-07', notes: 'Calibration in progress by field technician.' },
];
