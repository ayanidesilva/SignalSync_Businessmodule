import { useState } from 'react';
import { incidents, type Incident } from '../../data/incidents';
import { IncidentStatusBadge, SeverityBadge, IncidentTypeBadge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { AlertTriangle, Plus, Search, Filter, Clock, MapPin, ChevronRight, CheckCircle, Edit, Eye } from 'lucide-react';
import { PageInfoBox } from '../../components/ui/PageInfoBox';
import { LiveIndicator } from '../../components/ui/LiveIndicator';
import clsx from 'clsx';

export function IncidentManagement() {
  const [createModal, setCreateModal] = useState(false);
  const [viewModal, setViewModal] = useState<Incident | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [created, setCreated] = useState(false);

  const filtered = incidents.filter(i => {
    const statusOk = filterStatus === 'all' || i.status === filterStatus;
    const searchOk = !search || i.location.toLowerCase().includes(search.toLowerCase()) || i.id.toLowerCase().includes(search.toLowerCase()) || i.type.toLowerCase().includes(search.toLowerCase());
    return statusOk && searchOk;
  });

  const statusOrder: Record<string, number> = { Active: 0, Monitoring: 1, Planned: 2, Resolved: 3 };
  const sorted = [...filtered].sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);

  const counts = { Active: 0, Monitoring: 0, Planned: 0, Resolved: 0 };
  incidents.forEach(i => counts[i.status as keyof typeof counts]++);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-white">Incident Management</h1>
          <p className="text-xs text-slate-400 mt-0.5">Create, monitor and resolve traffic incidents across the network</p>
        </div>
        <div className="flex items-center gap-3">
          <LiveIndicator label="LIVE" color="green" />
          <button onClick={() => { setCreateModal(true); setCreated(false); }} className="btn-primary text-sm">
            <Plus className="w-4 h-4" />
            Create Incident
          </button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { status: 'Active', count: counts.Active, color: 'text-red-400', bg: 'border-red-500/20 bg-red-500/5' },
          { status: 'Monitoring', count: counts.Monitoring, color: 'text-amber-400', bg: 'border-amber-500/20 bg-amber-500/5' },
          { status: 'Planned', count: counts.Planned, color: 'text-blue-400', bg: 'border-blue-500/20 bg-blue-500/5' },
          { status: 'Resolved', count: counts.Resolved, color: 'text-emerald-400', bg: 'border-emerald-500/20 bg-emerald-500/5' },
        ].map(s => (
          <button
            key={s.status}
            onClick={() => setFilterStatus(s.status === filterStatus ? 'all' : s.status)}
            className={clsx(
              'panel-sm border p-4 text-center transition-all hover:border-opacity-50 cursor-pointer',
              s.bg,
              filterStatus === s.status && 'ring-1 ring-brand-cyan/40'
            )}
          >
            <div className={`text-3xl font-bold font-mono ${s.color}`}>{s.count}</div>
            <div className="text-xs text-slate-400 mt-0.5">{s.status}</div>
          </button>
        ))}
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-52">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search incidents, locations, IDs…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-500" />
          {['all', 'Active', 'Monitoring', 'Planned', 'Resolved'].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={clsx('px-2.5 py-1.5 rounded-md text-xs font-medium border transition-colors',
                filterStatus === s ? 'bg-brand-cyan/15 text-brand-cyan border-brand-cyan/30' : 'text-slate-400 border-brand-border hover:bg-white/5'
              )}>
              {s === 'all' ? 'All' : s}
            </button>
          ))}
        </div>
      </div>

      {/* Incident Table */}
      <div className="panel overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-brand-border bg-brand-slate/50">
              {['ID', 'Type & Severity', 'Location / Corridor', 'Status', 'Reported', 'Override', 'Actions'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-[10px] text-slate-500 font-semibold uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map(inc => (
              <tr key={inc.id} className="table-row">
                <td className="px-4 py-3 font-mono text-slate-400">{inc.id}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-1">
                    <IncidentTypeBadge type={inc.type} />
                    <SeverityBadge severity={inc.severity} />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-slate-200 font-medium max-w-xs truncate">{inc.location}</div>
                  <div className="text-slate-500 text-[10px]">{inc.corridor}</div>
                </td>
                <td className="px-4 py-3"><IncidentStatusBadge status={inc.status} /></td>
                <td className="px-4 py-3">
                  <div className="text-slate-300">{inc.reportedAt}</div>
                  <div className="text-slate-500 text-[10px]">Est: {inc.estimatedClearance}</div>
                </td>
                <td className="px-4 py-3">
                  {inc.overrideTriggered ? (
                    <span className="flex items-center gap-1.5 text-amber-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 live-pulse" />
                      Active
                    </span>
                  ) : (
                    <span className="text-slate-500">No</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => setViewModal(inc)} className="text-brand-cyan hover:text-cyan-300 flex items-center gap-1 transition-colors">
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button className="text-slate-400 hover:text-slate-200 transition-colors">
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    {inc.status !== 'Resolved' && (
                      <button className="text-emerald-400 hover:text-emerald-300 transition-colors">
                        <CheckCircle className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {sorted.length === 0 && (
          <div className="p-8 text-center">
            <AlertTriangle className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-sm text-slate-400">No incidents match your filter</p>
          </div>
        )}
      </div>

      <PageInfoBox
        title="Page Functionality — Incident Management"
        description="Allows authorised traffic officers to create, monitor, update, and resolve traffic incidents across the network. Every incident is logged with type, severity, affected junction, and responsible officer."
        points={[
          'Create Incident: raises a new incident record with type, severity, location, and initial notes',
          'Status filter: view incidents by Active, Monitoring, Planned, or Resolved state',
          'Search: find incidents by location, ID, or type',
          'Incident detail modal: view full timeline, affected junctions, assigned officer, and resolution notes',
          'AI-created incidents are automatically generated when the detection engine flags anomalous congestion',
          'All incident actions are recorded in the Audit Log with operator identity and timestamp',
        ]}
      />

      {/* Create Incident Modal */}
      <Modal
        open={createModal}
        onClose={() => setCreateModal(false)}
        title="Create Incident"
        subtitle="Log a new traffic incident and trigger appropriate controls"
        width="lg"
        footer={
          <>
            <button onClick={() => setCreateModal(false)} className="btn-secondary text-xs">Cancel</button>
            <button
              onClick={() => { setCreated(true); setTimeout(() => setCreateModal(false), 1500); }}
              className="btn-danger text-xs"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              {created ? 'Incident Created' : 'Create Incident'}
            </button>
          </>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Incident Type</label>
            <select className="select">
              <option>Collision</option>
              <option>Road Closure</option>
              <option>Heavy Congestion</option>
              <option>VIP Movement</option>
              <option>Road Works</option>
              <option>Flooding</option>
              <option>Stalled Vehicle</option>
              <option>Public Event</option>
            </select>
          </div>
          <div>
            <label className="label">Severity</label>
            <select className="select">
              <option>Critical</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="label">Location / Description</label>
            <input className="input" placeholder="e.g. Galle Rd / Liberty Roundabout, Colombo 03" />
          </div>
          <div>
            <label className="label">Affected Corridor</label>
            <select className="select">
              <option>Galle Road Corridor</option>
              <option>Maradana–Pettah</option>
              <option>High Level Road</option>
              <option>Borella–Maradana</option>
              <option>Rajagiriya–Kotte</option>
            </select>
          </div>
          <div>
            <label className="label">Estimated Clearance</label>
            <input className="input" type="time" defaultValue="15:00" />
          </div>
          <div className="sm:col-span-2">
            <label className="label">Full Description</label>
            <textarea className="textarea" rows={3} placeholder="Describe the incident in detail…" />
          </div>
          <div className="sm:col-span-2">
            <label className="label">Diversion Advisory (for public publication)</label>
            <textarea className="textarea" rows={2} placeholder="e.g. Recommend diversion via Marine Drive. Avoid Galle Rd between…" />
          </div>
          <div>
            <label className="label">Activate Signal Override</label>
            <select className="select">
              <option>No override required</option>
              <option>Activate at affected junctions</option>
              <option>Emergency priority corridor</option>
            </select>
          </div>
          <div>
            <label className="label">Publish Public Advisory</label>
            <select className="select">
              <option>Yes — publish immediately</option>
              <option>Yes — require admin approval</option>
              <option>No — internal record only</option>
            </select>
          </div>
          {created && (
            <div className="sm:col-span-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 flex items-center gap-2 animate-fade-up">
              <CheckCircle className="w-4 h-4" />
              Incident created and logged to audit trail. Notifications dispatched.
            </div>
          )}
        </div>
      </Modal>

      {/* View Incident Modal */}
      <Modal
        open={!!viewModal}
        onClose={() => setViewModal(null)}
        title={viewModal?.id || ''}
        subtitle={viewModal?.location}
        width="lg"
        footer={
          <button onClick={() => setViewModal(null)} className="btn-secondary text-xs">Close</button>
        }
      >
        {viewModal && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div><div className="label">Type</div><IncidentTypeBadge type={viewModal.type} /></div>
              <div><div className="label">Severity</div><SeverityBadge severity={viewModal.severity} /></div>
              <div><div className="label">Status</div><IncidentStatusBadge status={viewModal.status} /></div>
            </div>
            <div><div className="label">Description</div><p className="text-sm text-slate-300">{viewModal.description}</p></div>
            <div className="grid grid-cols-2 gap-4">
              <div><div className="label">Corridor</div><div className="text-sm text-slate-200">{viewModal.corridor}</div></div>
              <div><div className="label">Reported By</div><div className="text-sm text-slate-200">{viewModal.reportedBy}</div></div>
              <div><div className="label">Reported At</div><div className="text-sm text-slate-200">{viewModal.reportedAt}</div></div>
              <div><div className="label">Est. Clearance</div><div className="text-sm text-slate-200 font-semibold">{viewModal.estimatedClearance}</div></div>
            </div>
            <div><div className="label">Diversion Advisory</div>
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">{viewModal.diversionNote}</div>
            </div>
            <div><div className="label">Affected Junctions</div>
              <div className="flex gap-2 flex-wrap">{viewModal.affectedJunctions.map(j => <span key={j} className="badge-slate">{j}</span>)}</div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
