export type UserRole = 'System Administrator' | 'Traffic Administrator' | 'Police Officer' | 'Field Technician' | 'Agency Viewer';
export type UserStatus = 'Active' | 'Inactive' | 'Suspended';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  badge?: string;
  department: string;
  accessZones: string[];
  lastLogin: string;
  createdAt: string;
  mfaEnabled: boolean;
  canOverride: boolean;
  canPublishAdvisory: boolean;
  canModifyRules: boolean;
}

export const users: User[] = [
  {
    id: 'U001', name: 'Sunil Bandara', email: 'sbandara@rda.gov.lk', role: 'System Administrator',
    status: 'Active', department: 'Road Development Authority — ICT', accessZones: ['All'],
    lastLogin: '2026-04-07 09:14', createdAt: '2025-01-12', mfaEnabled: true,
    canOverride: true, canPublishAdvisory: true, canModifyRules: true,
  },
  {
    id: 'U002', name: 'Insp. Ruwan Perera', email: 'rperera@police.gov.lk', role: 'Police Officer',
    status: 'Active', badge: '#0182', department: 'Sri Lanka Police — Traffic Division',
    accessZones: ['Galle Road Corridor', 'Borella–Maradana'],
    lastLogin: '2026-04-07 14:18', createdAt: '2025-02-03', mfaEnabled: true,
    canOverride: true, canPublishAdvisory: false, canModifyRules: false,
  },
  {
    id: 'U003', name: 'Amara Wijesekera', email: 'awijesekera@udc.gov.lk', role: 'Traffic Administrator',
    status: 'Active', department: 'Urban Development Corporation — Traffic Ops',
    accessZones: ['All'],
    lastLogin: '2026-04-07 08:55', createdAt: '2025-01-20', mfaEnabled: true,
    canOverride: false, canPublishAdvisory: true, canModifyRules: true,
  },
  {
    id: 'U004', name: 'Cpl. Sudath Jayawardena', email: 'sjayawardena@police.gov.lk', role: 'Police Officer',
    status: 'Active', badge: '#0311', department: 'Sri Lanka Police — Traffic Division',
    accessZones: ['Maradana–Pettah', 'Borella–Maradana'],
    lastLogin: '2026-04-07 13:20', createdAt: '2025-02-10', mfaEnabled: false,
    canOverride: true, canPublishAdvisory: false, canModifyRules: false,
  },
  {
    id: 'U005', name: 'Priya Senanayake', email: 'psenanayake@rda.gov.lk', role: 'Field Technician',
    status: 'Active', department: 'Road Development Authority — Technical',
    accessZones: ['High Level Road', 'Rajagiriya–Kotte'],
    lastLogin: '2026-04-06 16:42', createdAt: '2025-03-01', mfaEnabled: true,
    canOverride: false, canPublishAdvisory: false, canModifyRules: false,
  },
  {
    id: 'U006', name: 'Nimal Herath', email: 'nherath@cmc.lk', role: 'Agency Viewer',
    status: 'Active', department: 'Colombo Municipal Council',
    accessZones: ['All — Read Only'],
    lastLogin: '2026-04-07 10:30', createdAt: '2025-04-01', mfaEnabled: false,
    canOverride: false, canPublishAdvisory: false, canModifyRules: false,
  },
  {
    id: 'U007', name: 'Dilshan Ranasinghe', email: 'dranasinghe@police.gov.lk', role: 'Police Officer',
    status: 'Suspended', badge: '#0204', department: 'Sri Lanka Police — Traffic Division',
    accessZones: ['Galle Road Corridor'],
    lastLogin: '2026-03-29 07:44', createdAt: '2025-02-15', mfaEnabled: false,
    canOverride: false, canPublishAdvisory: false, canModifyRules: false,
  },
  {
    id: 'U008', name: 'Sachini Fernando', email: 'sfernando@rda.gov.lk', role: 'Field Technician',
    status: 'Active', department: 'Road Development Authority — Technical',
    accessZones: ['Galle Road Corridor', 'Maradana–Pettah'],
    lastLogin: '2026-04-07 11:05', createdAt: '2025-03-15', mfaEnabled: true,
    canOverride: false, canPublishAdvisory: false, canModifyRules: false,
  },
];

export const roles = [
  {
    id: 'R1', name: 'System Administrator',
    description: 'Full platform access. Manages users, rules, and system configuration.',
    permissions: ['All Operations', 'User Management', 'Rule Modification', 'Audit Access', 'Advisory Publishing'],
  },
  {
    id: 'R2', name: 'Traffic Administrator',
    description: 'Manages optimisation rules, public advisories and reporting. Cannot manage users.',
    permissions: ['Rule Modification', 'Advisory Publishing', 'Reports Access', 'Read All Junctions'],
  },
  {
    id: 'R3', name: 'Police Officer',
    description: 'Operational field role. Can override signals and create incidents within assigned zones.',
    permissions: ['Manual Override', 'Incident Creation', 'Emergency Priority', 'Read Assigned Junctions'],
  },
  {
    id: 'R4', name: 'Field Technician',
    description: 'Technical operations. Manages CCTV calibration and controller diagnostics.',
    permissions: ['CCTV Calibration', 'Controller Diagnostics', 'Read Technical Panels'],
  },
  {
    id: 'R5', name: 'Agency Viewer',
    description: 'Read-only dashboard access for partner agencies (e.g., Municipal Council).',
    permissions: ['Read-Only Dashboard', 'View Public Reports'],
  },
];
