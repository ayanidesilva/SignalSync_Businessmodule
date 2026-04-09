import { CongestionLevel, SignalMode, ControllerStatus } from '../../data/junctions';
import { Severity, IncidentStatus, IncidentType } from '../../data/incidents';
import { UserStatus, UserRole } from '../../data/users';
import { FeedHealth, DetectionStatus } from '../../data/cctv';
import { RuleState } from '../../data/optimisationRules';
import { AuditOutcome } from '../../data/auditLogs';

export function CongestionBadge({ level }: { level: CongestionLevel }) {
  const map = {
    free: 'badge-green',
    moderate: 'badge-amber',
    heavy: 'badge-red',
    severe: 'badge-red',
  };
  const label = { free: 'Free Flow', moderate: 'Moderate', heavy: 'Heavy', severe: 'Severe' };
  return <span className={map[level]}>{label[level]}</span>;
}

export function SignalModeBadge({ mode }: { mode: SignalMode }) {
  const map: Record<SignalMode, string> = {
    'Adaptive': 'badge-cyan',
    'Manual Override': 'badge-amber',
    'Fixed-Time': 'badge-slate',
    'Emergency Priority': 'badge-red',
    'Offline': 'badge-slate',
  };
  return <span className={map[mode]}>{mode}</span>;
}

export function ControllerStatusBadge({ status }: { status: ControllerStatus }) {
  const map: Record<ControllerStatus, string> = {
    'Connected': 'badge-green',
    'Degraded': 'badge-amber',
    'Offline': 'badge-red',
  };
  return <span className={map[status]}>{status}</span>;
}

export function SeverityBadge({ severity }: { severity: Severity }) {
  const map: Record<Severity, string> = {
    'Critical': 'badge-red',
    'High': 'badge-amber',
    'Medium': 'badge-blue',
    'Low': 'badge-slate',
  };
  return <span className={map[severity]}>{severity}</span>;
}

export function IncidentStatusBadge({ status }: { status: IncidentStatus }) {
  const map: Record<IncidentStatus, string> = {
    'Active': 'badge-red',
    'Monitoring': 'badge-amber',
    'Resolved': 'badge-green',
    'Planned': 'badge-blue',
  };
  return <span className={map[status]}>{status}</span>;
}

export function IncidentTypeBadge({ type }: { type: IncidentType }) {
  const map: Record<IncidentType, string> = {
    'Collision': 'badge-red',
    'Road Closure': 'badge-amber',
    'Heavy Congestion': 'badge-amber',
    'VIP Movement': 'badge-purple',
    'Road Works': 'badge-slate',
    'Flooding': 'badge-blue',
    'Stalled Vehicle': 'badge-slate',
    'Public Event': 'badge-cyan',
  };
  return <span className={map[type]}>{type}</span>;
}

export function UserStatusBadge({ status }: { status: UserStatus }) {
  const map: Record<UserStatus, string> = {
    'Active': 'badge-green',
    'Inactive': 'badge-slate',
    'Suspended': 'badge-red',
  };
  return <span className={map[status]}>{status}</span>;
}

export function RoleBadge({ role }: { role: UserRole }) {
  const map: Record<UserRole, string> = {
    'System Administrator': 'badge-purple',
    'Traffic Administrator': 'badge-blue',
    'Police Officer': 'badge-amber',
    'Field Technician': 'badge-cyan',
    'Agency Viewer': 'badge-slate',
  };
  return <span className={map[role]}>{role}</span>;
}

export function FeedHealthBadge({ health }: { health: FeedHealth }) {
  const map: Record<FeedHealth, string> = {
    'Stable': 'badge-green',
    'Degraded': 'badge-amber',
    'Offline': 'badge-red',
    'Calibrating': 'badge-blue',
  };
  return <span className={map[health]}>{health}</span>;
}

export function DetectionStatusBadge({ status }: { status: DetectionStatus }) {
  const map: Record<DetectionStatus, string> = {
    'Active': 'badge-green',
    'Paused': 'badge-slate',
    'Error': 'badge-red',
  };
  return <span className={map[status]}>{status}</span>;
}

export function RuleStateBadge({ state }: { state: RuleState }) {
  const map: Record<RuleState, string> = {
    'Active': 'badge-green',
    'Draft': 'badge-amber',
    'Archived': 'badge-slate',
    'Pending Approval': 'badge-blue',
  };
  return <span className={map[state]}>{state}</span>;
}

export function AuditOutcomeBadge({ outcome }: { outcome: AuditOutcome }) {
  const map: Record<AuditOutcome, string> = {
    'Success': 'badge-green',
    'Failed': 'badge-red',
    'Pending Approval': 'badge-amber',
  };
  return <span className={map[outcome]}>{outcome}</span>;
}
