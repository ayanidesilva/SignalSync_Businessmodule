import { useState } from 'react';
import { incidents } from '../../data/incidents';
import { IncidentStatusBadge, SeverityBadge, IncidentTypeBadge } from '../../components/ui/Badge';
import { LiveIndicator } from '../../components/ui/LiveIndicator';
import { AlertTriangle, Clock, MapPin, Navigation, Info, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import clsx from 'clsx';

export function IncidentAlertsPage() {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>('INC-0041');

  const filtered = incidents.filter(i => {
    const statusOk = filterStatus === 'all' || i.status === filterStatus;
    const severityOk = filterSeverity === 'all' || i.severity === filterSeverity;
    return statusOk && severityOk;
  });

  const activeCount = incidents.filter(i => i.status === 'Active').length;
  const monitoringCount = incidents.filter(i => i.status === 'Monitoring').length;
  const plannedCount = incidents.filter(i => i.status === 'Planned').length;

  const severityOrder: Record<string, number> = { Critical: 0, High: 1, Medium: 2, Low: 3 };
  const sorted = [...filtered].sort((a, b) => {
    const statusOrder: Record<string, number> = { Active: 0, Monitoring: 1, Planned: 2, Resolved: 3 };
    if (statusOrder[a.status] !== statusOrder[b.status]) return statusOrder[a.status] - statusOrder[b.status];
    return severityOrder[a.severity] - severityOrder[b.severity];
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
        <div>
          <div className="section-heading mb-1">Public Advisory</div>
          <h1 className="text-2xl font-bold text-white">Traffic Incident Alerts</h1>
          <p className="text-sm text-slate-400 mt-1">Live incident information for Colombo road users</p>
        </div>
        <div className="flex items-center gap-3">
          <LiveIndicator label="LIVE" color="green" />
          <span className="text-xs text-slate-500">Updated: 14:32:14</span>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Active Incidents', value: activeCount, color: 'text-red-400', bg: 'border-red-500/20 bg-red-500/5' },
          { label: 'Under Monitoring', value: monitoringCount, color: 'text-amber-400', bg: 'border-amber-500/20 bg-amber-500/5' },
          { label: 'Planned Events', value: plannedCount, color: 'text-blue-400', bg: 'border-blue-500/20 bg-blue-500/5' },
        ].map(s => (
          <div key={s.label} className={`panel-sm border ${s.bg} p-4 text-center`}>
            <div className={`text-3xl font-bold font-mono mb-1 ${s.color}`}>{s.value}</div>
            <div className="text-xs text-slate-400">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Filter className="w-3.5 h-3.5 text-slate-500" />
        <span className="text-xs text-slate-500 mr-1">Status:</span>
        {['all', 'Active', 'Monitoring', 'Planned', 'Resolved'].map(s => (
          <button key={s} onClick={() => setFilterStatus(s)}
            className={clsx('px-2.5 py-1 rounded-md text-xs font-medium border transition-colors',
              filterStatus === s ? 'bg-brand-cyan/15 text-brand-cyan border-brand-cyan/30' : 'text-slate-400 border-brand-border hover:bg-white/5'
            )}>
            {s === 'all' ? 'All' : s}
          </button>
        ))}
        <span className="text-xs text-slate-500 ml-2 mr-1">Severity:</span>
        {['all', 'Critical', 'High', 'Medium', 'Low'].map(s => (
          <button key={s} onClick={() => setFilterSeverity(s)}
            className={clsx('px-2.5 py-1 rounded-md text-xs font-medium border transition-colors',
              filterSeverity === s ? 'bg-brand-cyan/15 text-brand-cyan border-brand-cyan/30' : 'text-slate-400 border-brand-border hover:bg-white/5'
            )}>
            {s === 'all' ? 'All' : s}
          </button>
        ))}
      </div>

      {/* Incident list */}
      <div className="space-y-3">
        {sorted.map(incident => {
          const isExpanded = expandedId === incident.id;
          return (
            <div key={incident.id} className={clsx(
              'panel overflow-hidden transition-all',
              incident.status === 'Active' && incident.severity === 'High' && 'border-red-500/30',
              incident.status === 'Resolved' && 'opacity-60'
            )}>
              {/* Card header */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : incident.id)}
                className="w-full p-4 text-left"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className={clsx(
                      'w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5',
                      incident.severity === 'High' || incident.severity === 'Critical' ? 'bg-red-500/15 border border-red-500/20' :
                      incident.severity === 'Medium' ? 'bg-amber-500/15 border border-amber-500/20' :
                      'bg-slate-500/15 border border-slate-500/20'
                    )}>
                      <AlertTriangle className={clsx('w-4 h-4',
                        incident.severity === 'High' || incident.severity === 'Critical' ? 'text-red-400' :
                        incident.severity === 'Medium' ? 'text-amber-400' : 'text-slate-400'
                      )} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs font-mono text-slate-500">{incident.id}</span>
                        <IncidentTypeBadge type={incident.type} />
                        <SeverityBadge severity={incident.severity} />
                        <IncidentStatusBadge status={incident.status} />
                      </div>
                      <div className="text-sm font-semibold text-white mb-1">{incident.location}</div>
                      <div className="text-xs text-slate-400 line-clamp-1">{incident.description}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    <div className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />{incident.reportedAt}
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                  </div>
                </div>
              </button>

              {/* Expanded detail */}
              {isExpanded && (
                <div className="border-t border-brand-border px-4 py-4 bg-brand-slate/30 animate-fade-up">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Full Description</div>
                        <p className="text-sm text-slate-300">{incident.description}</p>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Affected Corridor</div>
                        <div className="text-sm text-slate-200">{incident.corridor}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Reported By</div>
                        <div className="text-sm text-slate-200">{incident.reportedBy}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Estimated Clearance</div>
                        <div className="text-sm text-slate-200 font-medium">{incident.estimatedClearance}</div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                          <Navigation className="w-3 h-3" /> Diversion Advisory
                        </div>
                        <div className={clsx(
                          'p-3 rounded-lg text-xs leading-relaxed',
                          incident.status === 'Active' ? 'bg-amber-500/10 border border-amber-500/20 text-amber-200' :
                          'bg-brand-slate text-slate-300'
                        )}>
                          {incident.diversionNote}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Affected Junctions</div>
                        <div className="flex flex-wrap gap-1.5">
                          {incident.affectedJunctions.map(j => (
                            <span key={j} className="badge-slate">{j}</span>
                          ))}
                        </div>
                      </div>
                      {incident.overrideTriggered && (
                        <div className="flex items-center gap-2 text-xs text-amber-300">
                          <span className="w-2 h-2 rounded-full bg-amber-400 live-pulse" />
                          Signal override active at affected junctions
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Disclaimer */}
      <div className="mt-6 flex items-start gap-2 text-xs text-slate-500">
        <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
        <span>
          Incident information is published by authorised traffic administrators and police officers through the SignalSync platform. Data is updated as conditions change. For emergencies, contact Sri Lanka Police: 119.
        </span>
      </div>
    </div>
  );
}
