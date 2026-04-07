export type AuditAction = 'LOGIN' | 'LOGOUT' | 'OVERRIDE_START' | 'OVERRIDE_END' | 'INCIDENT_CREATE' | 'INCIDENT_UPDATE' | 'INCIDENT_RESOLVE' | 'EMERGENCY_ACTIVATE' | 'EMERGENCY_DEACTIVATE' | 'RULE_CHANGE' | 'RULE_PUBLISH' | 'USER_CREATE' | 'USER_SUSPEND' | 'CONFIG_UPDATE' | 'ADVISORY_PUBLISH' | 'CCTV_CALIBRATE';
export type AuditOutcome = 'Success' | 'Failed' | 'Pending Approval';

export interface AuditEntry {
  id: string;
  timestamp: string;
  action: AuditAction;
  actor: string;
  actorRole: string;
  resource: string;
  detail: string;
  outcome: AuditOutcome;
  ipAddress: string;
  approvedBy?: string;
}

export const auditLogs: AuditEntry[] = [
  { id: 'A0841', timestamp: '2026-04-07 14:18:33', action: 'OVERRIDE_START', actor: 'Insp. R. Perera', actorRole: 'Police Officer', resource: 'Junction J02 — Liberty Roundabout', detail: 'Manual override activated due to INC-0041 (Collision). Green extended to 68s.', outcome: 'Success', ipAddress: '10.14.2.88' },
  { id: 'A0840', timestamp: '2026-04-07 14:05:00', action: 'EMERGENCY_ACTIVATE', actor: 'Traffic Control Centre', actorRole: 'System', resource: 'Emergency Corridor: J08 → Secretariat', detail: 'VIP motorcade priority activated. Junctions J08, J11 pre-cleared.', outcome: 'Success', ipAddress: '10.14.0.1' },
  { id: 'A0839', timestamp: '2026-04-07 13:55:12', action: 'INCIDENT_CREATE', actor: 'AI Detection System', actorRole: 'System', resource: 'Junction J04 — Pettah Bus Terminal', detail: 'Auto-created INC-0039: Heavy Congestion. Monitoring mode activated.', outcome: 'Success', ipAddress: '10.14.0.1' },
  { id: 'A0838', timestamp: '2026-04-07 13:20:44', action: 'INCIDENT_RESOLVE', actor: 'Cpl. S. Jayawardena', actorRole: 'Police Officer', resource: 'INC-0036 — Stalled Vehicle, J11', detail: 'Incident resolved. Breakdown vehicle cleared. Queue dissipated.', outcome: 'Success', ipAddress: '10.14.2.95' },
  { id: 'A0837', timestamp: '2026-04-07 12:34:01', action: 'RULE_CHANGE', actor: 'Amara Wijesekera', actorRole: 'Traffic Administrator', resource: 'Optimisation Profile — Galle Road Peak PM', detail: 'Peak PM cycle time adjusted from 90s to 105s. Awaiting approval.', outcome: 'Pending Approval', ipAddress: '10.14.1.44', approvedBy: undefined },
  { id: 'A0836', timestamp: '2026-04-07 12:00:00', action: 'ADVISORY_PUBLISH', actor: 'Amara Wijesekera', actorRole: 'Traffic Administrator', resource: 'Public Advisory — Liberty Roundabout', detail: 'Published public advisory: "Avoid duplication at Liberty Roundabout – Collision in progress."', outcome: 'Success', ipAddress: '10.14.1.44' },
  { id: 'A0835', timestamp: '2026-04-07 11:44:00', action: 'EMERGENCY_ACTIVATE', actor: 'AI Detection System', actorRole: 'System', resource: 'Junction J07 — Dehiwala', detail: 'Auto-emergency mode triggered: Flash flooding detected on camera feed CAM-J07-02.', outcome: 'Success', ipAddress: '10.14.0.1' },
  { id: 'A0834', timestamp: '2026-04-07 11:32:00', action: 'CCTV_CALIBRATE', actor: 'Priya Senanayake', actorRole: 'Field Technician', resource: 'Camera CAM-J09-03 — Kirulapone', detail: 'Recalibration performed. Detection confidence improved from 78% to 94%.', outcome: 'Success', ipAddress: '10.14.3.12' },
  { id: 'A0833', timestamp: '2026-04-07 10:15:00', action: 'RULE_PUBLISH', actor: 'Sunil Bandara', actorRole: 'System Administrator', resource: 'Rule Set v2.4 — High Level Road', detail: 'Published approved rule set v2.4 for High Level Road corridor. Min green: 25s, Max: 70s.', outcome: 'Success', ipAddress: '10.14.0.5', approvedBy: 'Amara Wijesekera' },
  { id: 'A0832', timestamp: '2026-04-07 09:44:00', action: 'USER_SUSPEND', actor: 'Sunil Bandara', actorRole: 'System Administrator', resource: 'User U007 — Cpl. D. Ranasinghe', detail: 'Account suspended pending investigation. MFA was not enabled on account.', outcome: 'Success', ipAddress: '10.14.0.5' },
  { id: 'A0831', timestamp: '2026-04-07 09:14:00', action: 'LOGIN', actor: 'Sunil Bandara', actorRole: 'System Administrator', resource: 'Authentication', detail: 'Successful login. MFA verified. Session ID: 8f3a2d1c.', outcome: 'Success', ipAddress: '10.14.0.5' },
  { id: 'A0830', timestamp: '2026-04-07 08:55:00', action: 'LOGIN', actor: 'Amara Wijesekera', actorRole: 'Traffic Administrator', resource: 'Authentication', detail: 'Successful login. MFA verified. Session ID: 4c7e9b2a.', outcome: 'Success', ipAddress: '10.14.1.44' },
  { id: 'A0829', timestamp: '2026-04-06 18:30:00', action: 'OVERRIDE_END', actor: 'Insp. R. Perera', actorRole: 'Police Officer', resource: 'Junction J02 — Liberty Roundabout', detail: 'Manual override ended. System returned to Adaptive mode.', outcome: 'Success', ipAddress: '10.14.2.88' },
  { id: 'A0828', timestamp: '2026-04-06 17:22:00', action: 'CONFIG_UPDATE', actor: 'Amara Wijesekera', actorRole: 'Traffic Administrator', resource: 'Alert Rule — Queue Threshold J04', detail: 'Queue alert threshold updated from 120m to 100m for J04.', outcome: 'Success', ipAddress: '10.14.1.44' },
  { id: 'A0827', timestamp: '2026-04-06 16:42:00', action: 'CCTV_CALIBRATE', actor: 'Priya Senanayake', actorRole: 'Field Technician', resource: 'Camera CAM-J05-01 — Rajagiriya', detail: 'Post-maintenance calibration completed. Feed health: Stable.', outcome: 'Success', ipAddress: '10.14.3.12' },
  { id: 'A0826', timestamp: '2026-04-06 15:00:00', action: 'USER_CREATE', actor: 'Sunil Bandara', actorRole: 'System Administrator', resource: 'User U008 — Sachini Fernando', detail: 'New Field Technician account created. Access zones: Galle Road, Maradana–Pettah.', outcome: 'Success', ipAddress: '10.14.0.5' },
  { id: 'A0825', timestamp: '2026-04-06 12:14:00', action: 'LOGIN', actor: 'Cpl. S. Jayawardena', actorRole: 'Police Officer', resource: 'Authentication', detail: 'Login attempt failed — incorrect password. Account flagged for review.', outcome: 'Failed', ipAddress: '192.168.88.12' },
];
