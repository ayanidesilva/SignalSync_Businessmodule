import { useState } from 'react';
import { auditLogs } from '../../data/auditLogs';
import { AuditOutcomeBadge } from '../../components/ui/Badge';
import { ScrollText, Filter, Search, Shield, Download, ChevronDown, Info, Lock } from 'lucide-react';
import { PageInfoBox } from '../../components/ui/PageInfoBox';
import clsx from 'clsx';

const actionColors: Record<string, string> = {
  LOGIN: 'badge-slate',
  LOGOUT: 'badge-slate',
  OVERRIDE_START: 'badge-amber',
  OVERRIDE_END: 'badge-slate',
  INCIDENT_CREATE: 'badge-red',
  INCIDENT_UPDATE: 'badge-amber',
  INCIDENT_RESOLVE: 'badge-green',
  EMERGENCY_ACTIVATE: 'badge-red',
  EMERGENCY_DEACTIVATE: 'badge-slate',
  RULE_CHANGE: 'badge-purple',
  RULE_PUBLISH: 'badge-blue',
  USER_CREATE: 'badge-blue',
  USER_SUSPEND: 'badge-amber',
  CONFIG_UPDATE: 'badge-cyan',
  ADVISORY_PUBLISH: 'badge-green',
  CCTV_CALIBRATE: 'badge-cyan',
};

export function AuditLogs() {
  const [filterAction, setFilterAction] = useState('all');
  const [filterOutcome, setFilterOutcome] = useState('all');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const actionGroups = [
    { label: 'All Actions', value: 'all' },
    { label: 'Authentication', value: 'auth', match: ['LOGIN', 'LOGOUT'] },
    { label: 'Overrides', value: 'override', match: ['OVERRIDE_START', 'OVERRIDE_END'] },
    { label: 'Incidents', value: 'incident', match: ['INCIDENT_CREATE', 'INCIDENT_UPDATE', 'INCIDENT_RESOLVE'] },
    { label: 'Emergency', value: 'emergency', match: ['EMERGENCY_ACTIVATE', 'EMERGENCY_DEACTIVATE'] },
    { label: 'Rules & Config', value: 'rules', match: ['RULE_CHANGE', 'RULE_PUBLISH', 'CONFIG_UPDATE'] },
    { label: 'Users', value: 'users', match: ['USER_CREATE', 'USER_SUSPEND'] },
    { label: 'CCTV & Advisory', value: 'cctv', match: ['CCTV_CALIBRATE', 'ADVISORY_PUBLISH'] },
  ];

  const filtered = auditLogs.filter(e => {
    const group = actionGroups.find(g => g.value === filterAction);
    const actionOk = filterAction === 'all' || (group?.match && group.match.includes(e.action));
    const outcomeOk = filterOutcome === 'all' || e.outcome === filterOutcome;
    const searchOk = !search ||
      e.actor.toLowerCase().includes(search.toLowerCase()) ||
      e.resource.toLowerCase().includes(search.toLowerCase()) ||
      e.action.toLowerCase().includes(search.toLowerCase()) ||
      e.id.toLowerCase().includes(search.toLowerCase());
    return actionOk && outcomeOk && searchOk;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <PageInfoBox
        title="Page Functionality — Audit Logs & Governance"
        description="Displays the immutable, append-only log of every action taken on the SignalSync platform. This page supports accountability reviews, compliance audits, and disciplinary investigations by providing a full, tamper-evident record of operator activity."
        points={[
          'Action types logged: logins/logouts, signal overrides, incident creates/updates/resolves, emergency activations, rule changes, user management, CCTV calibrations',
          'Filter by action group, outcome (Success / Failure / Denied), or search by actor or resource',
          'Expand any log entry to view full detail: actor, role, resource, IP, timestamp, and outcome',
          'Export Log: download filtered audit data for compliance submission or external review',
          'All entries are read-only and cannot be edited or deleted — governance by design',
        ]}
      />

      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <ScrollText className="w-5 h-5 text-purple-400" />
            Audit Logs & Governance
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">Immutable record of all platform actions — authentication, overrides, incidents, rule changes</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary text-xs py-1.5">
            <Download className="w-3.5 h-3.5" />
            Export Log
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Governance Notice */}
      <div className="flex items-start gap-3 p-4 panel-sm border-l-4 border-purple-500">
        <Lock className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-slate-400">
          <strong className="text-purple-400">Immutable Audit Trail:</strong> All entries in this log are write-protected and cannot be modified or deleted by any user, including system administrators. The audit log constitutes the authoritative record of all platform actions for governance, legal compliance, and accountability purposes.
        </div>
      </div>

      {/* Summary Chips */}
      <div className="flex flex-wrap gap-3">
        {[
          { label: 'Total Events', value: auditLogs.length, color: 'text-white' },
          { label: 'Override Events', value: auditLogs.filter(e => e.action.includes('OVERRIDE')).length, color: 'text-amber-400' },
          { label: 'Failed Actions', value: auditLogs.filter(e => e.outcome === 'Failed').length, color: 'text-red-400' },
          { label: 'Pending Approvals', value: auditLogs.filter(e => e.outcome === 'Pending Approval').length, color: 'text-blue-400' },
        ].map(s => (
          <div key={s.label} className="panel-sm px-4 py-2 flex items-center gap-2">
            <span className={`text-lg font-bold font-mono ${s.color}`}>{s.value}</span>
            <span className="text-xs text-slate-400">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-52">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search actor, resource, action ID…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input pl-9"
            />
          </div>
          <select className="select text-xs py-2 w-40" value={filterOutcome} onChange={e => setFilterOutcome(e.target.value)}>
            <option value="all">All Outcomes</option>
            <option>Success</option>
            <option>Failed</option>
            <option>Pending Approval</option>
          </select>
        </div>
        <div className="flex flex-wrap gap-2">
          {actionGroups.map(g => (
            <button key={g.value} onClick={() => setFilterAction(g.value)}
              className={clsx('px-2.5 py-1 rounded-md text-xs font-medium border transition-colors',
                filterAction === g.value ? 'bg-brand-cyan/15 text-brand-cyan border-brand-cyan/30' : 'text-slate-400 border-brand-border hover:bg-white/5'
              )}>
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* Log Table */}
      <div className="panel overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-brand-border bg-brand-slate/50">
              {['Event ID', 'Timestamp', 'Action', 'Actor', 'Resource', 'Outcome', ''].map(h => (
                <th key={h} className="px-4 py-3 text-left text-[10px] text-slate-500 font-semibold uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(entry => (
              <>
                <tr
                  key={entry.id}
                  className={clsx('table-row cursor-pointer', expandedId === entry.id && 'bg-brand-slate/60')}
                  onClick={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
                >
                  <td className="px-4 py-2.5 font-mono text-slate-500">{entry.id}</td>
                  <td className="px-4 py-2.5 font-mono text-slate-400 whitespace-nowrap">{entry.timestamp}</td>
                  <td className="px-4 py-2.5">
                    <span className={actionColors[entry.action] || 'badge-slate'}>
                      {entry.action.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="text-slate-200 font-medium">{entry.actor}</div>
                    <div className="text-slate-500 text-[10px]">{entry.actorRole}</div>
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="text-slate-300 max-w-xs truncate">{entry.resource}</div>
                  </td>
                  <td className="px-4 py-2.5">
                    <AuditOutcomeBadge outcome={entry.outcome} />
                  </td>
                  <td className="px-4 py-2.5 text-slate-500 font-mono text-[10px]">
                    <ChevronDown className={clsx('w-3.5 h-3.5 transition-transform', expandedId === entry.id && 'rotate-180')} />
                  </td>
                </tr>
                {expandedId === entry.id && (
                  <tr key={`${entry.id}-detail`} className="bg-brand-slate/30 border-b border-brand-border">
                    <td colSpan={7} className="px-4 py-3">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                          <div className="text-[10px] text-slate-500 mb-1">Detail</div>
                          <p className="text-xs text-slate-300 leading-relaxed">{entry.detail}</p>
                        </div>
                        <div className="space-y-2 text-xs">
                          <div><span className="text-slate-500">IP Address:</span> <span className="font-mono text-slate-300 ml-2">{entry.ipAddress}</span></div>
                          {entry.approvedBy && (
                            <div><span className="text-slate-500">Approved By:</span> <span className="text-emerald-400 ml-2">{entry.approvedBy}</span></div>
                          )}
                          <div><span className="text-slate-500">Timestamp:</span> <span className="font-mono text-slate-300 ml-2">{entry.timestamp}</span></div>
                          {entry.outcome === 'Pending Approval' && (
                            <div className="flex gap-2 mt-2">
                              <button className="btn-success text-xs py-1 px-2.5">Approve</button>
                              <button className="btn-secondary text-xs py-1 px-2.5">Reject</button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="p-8 text-center">
            <ScrollText className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-sm text-slate-400">No audit entries match your filter</p>
          </div>
        )}
      </div>

      <div className="flex items-start gap-2 text-xs text-slate-600">
        <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
        <span>Showing {filtered.length} of {auditLogs.length} audit entries. Full log available for export. Retention policy: 7 years per government digital record standards.</span>
      </div>
    </div>
  );
}
