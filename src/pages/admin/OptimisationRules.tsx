import { useState } from 'react';
import { optimisationProfiles } from '../../data/optimisationRules';
import { RuleStateBadge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Settings, Plus, CheckCircle, AlertTriangle, Clock, Shield, Edit, Copy, Archive, ChevronDown, ChevronUp, Info, Zap } from 'lucide-react';
import { PageInfoBox } from '../../components/ui/PageInfoBox';
import clsx from 'clsx';

export function OptimisationRules() {
  const [expandedId, setExpandedId] = useState<string | null>('OP01');
  const [createModal, setCreateModal] = useState(false);
  const [filterState, setFilterState] = useState('all');
  const [saved, setSaved] = useState(false);

  const filtered = optimisationProfiles.filter(p =>
    filterState === 'all' || p.state === filterState
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-brand-cyan" />
            Optimisation Rules & Configuration
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">Manage adaptive signal timing profiles, safety constraints, and publish approved configurations</p>
        </div>
        <button onClick={() => { setCreateModal(true); setSaved(false); }} className="btn-primary text-sm">
          <Plus className="w-4 h-4" />
          New Profile
        </button>
      </div>

      {/* Governance notice */}
      <div className="flex items-start gap-3 p-4 panel-sm border-l-4 border-brand-cyan">
        <Shield className="w-4 h-4 text-brand-cyan flex-shrink-0 mt-0.5" />
        <div className="text-xs text-slate-400">
          <strong className="text-brand-cyan">Approval Workflow:</strong> All new or modified signal timing profiles must be reviewed and approved by a System Administrator before being published to live junctions. Draft profiles can be reviewed in simulation mode. Publish action is logged to the audit trail with approver identity.
        </div>
      </div>

      {/* State Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Active Profiles', value: optimisationProfiles.filter(p => p.state === 'Active').length, color: 'text-emerald-400' },
          { label: 'Drafts', value: optimisationProfiles.filter(p => p.state === 'Draft').length, color: 'text-amber-400' },
          { label: 'Pending Approval', value: optimisationProfiles.filter(p => p.state === 'Pending Approval').length, color: 'text-blue-400' },
          { label: 'Archived', value: optimisationProfiles.filter(p => p.state === 'Archived').length, color: 'text-slate-500' },
        ].map(s => (
          <div key={s.label} className="panel-sm p-3 text-center">
            <div className={`text-2xl font-bold font-mono ${s.color}`}>{s.value}</div>
            <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {['all', 'Active', 'Draft', 'Pending Approval', 'Archived'].map(s => (
          <button key={s} onClick={() => setFilterState(s)}
            className={clsx('px-2.5 py-1 rounded-md text-xs font-medium border transition-colors',
              filterState === s ? 'bg-brand-cyan/15 text-brand-cyan border-brand-cyan/30' : 'text-slate-400 border-brand-border hover:bg-white/5'
            )}>
            {s === 'all' ? 'All Profiles' : s}
          </button>
        ))}
      </div>

      {/* Profile List */}
      <div className="space-y-3">
        {filtered.map(profile => (
          <div key={profile.id} className={clsx(
            'panel overflow-hidden',
            profile.state === 'Active' && 'border-l-4 border-l-emerald-500',
            profile.state === 'Draft' && 'border-l-4 border-l-amber-500',
            profile.state === 'Archived' && 'opacity-60',
          )}>
            {/* Header row */}
            <button
              onClick={() => setExpandedId(expandedId === profile.id ? null : profile.id)}
              className="w-full p-4 text-left"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className={clsx(
                    'w-9 h-9 rounded-xl border flex items-center justify-center flex-shrink-0',
                    profile.state === 'Active' ? 'bg-emerald-500/10 border-emerald-500/20' :
                    profile.state === 'Draft' ? 'bg-amber-500/10 border-amber-500/20' :
                    'bg-brand-border/50 border-brand-border'
                  )}>
                    <Settings className={clsx('w-4 h-4',
                      profile.state === 'Active' ? 'text-emerald-400' :
                      profile.state === 'Draft' ? 'text-amber-400' : 'text-slate-500'
                    )} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-xs font-mono text-slate-500">{profile.id}</span>
                      <span className="text-xs text-slate-500">{profile.version}</span>
                      <RuleStateBadge state={profile.state} />
                    </div>
                    <div className="text-sm font-semibold text-white">{profile.name}</div>
                    <div className="text-xs text-slate-400">{profile.corridor} · {profile.junctions.length} junctions · {profile.timeOfDay}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-right hidden sm:block">
                    <div className="text-xs text-slate-500">Updated by {profile.updatedBy}</div>
                    <div className="text-[10px] text-slate-600">{profile.updatedAt}</div>
                  </div>
                  {expandedId === profile.id
                    ? <ChevronUp className="w-4 h-4 text-slate-500" />
                    : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </div>
              </div>
            </button>

            {/* Expanded Detail */}
            {expandedId === profile.id && (
              <div className="border-t border-brand-border px-4 py-4 bg-brand-slate/20 animate-fade-up">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Timing Parameters */}
                  <div>
                    <div className="section-heading mb-3">Signal Timing Parameters</div>
                    <div className="space-y-2">
                      {[
                        { label: 'Minimum Green Time', value: `${profile.minGreen}s` },
                        { label: 'Maximum Green Time', value: `${profile.maxGreen}s` },
                        { label: 'Minimum Red Time', value: `${profile.minRed}s` },
                        { label: 'Cycle Limit', value: `${profile.cycleLimit}s` },
                        { label: 'Pedestrian Phase', value: `${profile.pedestrianPhase}s` },
                        { label: 'Time of Day', value: profile.timeOfDay },
                      ].map(p => (
                        <div key={p.label} className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">{p.label}</span>
                          <span className="text-white font-mono font-semibold">{p.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Visual timing bar */}
                    <div className="mt-4">
                      <div className="text-[10px] text-slate-500 mb-2">Cycle composition (illustrative)</div>
                      <div className="flex h-4 rounded-full overflow-hidden gap-0.5">
                        <div className="bg-emerald-500 rounded-l-full flex items-center justify-center" style={{ flexBasis: `${(profile.maxGreen / profile.cycleLimit) * 100}%` }}>
                          <span className="text-[8px] text-white font-bold hidden">G</span>
                        </div>
                        <div className="bg-amber-500 flex items-center justify-center" style={{ flexBasis: `${(profile.pedestrianPhase / profile.cycleLimit) * 100}%` }} />
                        <div className="bg-red-500 rounded-r-full flex items-center justify-center" style={{ flexBasis: `${((profile.cycleLimit - profile.maxGreen - profile.pedestrianPhase) / profile.cycleLimit) * 100}%` }} />
                      </div>
                      <div className="flex justify-between text-[9px] text-slate-600 mt-0.5">
                        <span>Green ({profile.maxGreen}s max)</span>
                        <span>Ped ({profile.pedestrianPhase}s)</span>
                        <span>Red/Clear</span>
                      </div>
                    </div>
                  </div>

                  {/* Safety Constraints */}
                  <div>
                    <div className="section-heading mb-3">Safety Constraints</div>
                    {profile.safetyConstraints.length > 0 ? (
                      <ul className="space-y-2">
                        {profile.safetyConstraints.map(c => (
                          <li key={c} className="flex items-start gap-2 text-xs">
                            <CheckCircle className="w-3.5 h-3.5 text-brand-cyan flex-shrink-0 mt-0.5" />
                            <span className="text-slate-300">{c}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-xs text-slate-500 italic">No additional constraints defined</div>
                    )}

                    <div className="mt-4">
                      <div className="section-heading mb-2">Affected Junctions</div>
                      <div className="flex flex-wrap gap-1.5">
                        {profile.junctions.map(j => (
                          <span key={j} className="badge-slate">{j}</span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-3 text-xs text-slate-500">
                      <div>Notes: <span className="text-slate-400">{profile.notes}</span></div>
                    </div>
                  </div>

                  {/* Approval & Actions */}
                  <div>
                    <div className="section-heading mb-3">Status & Actions</div>
                    <div className="space-y-2 mb-4 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Updated By</span>
                        <span className="text-slate-200">{profile.updatedBy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Last Updated</span>
                        <span className="text-slate-200 font-mono text-[10px]">{profile.updatedAt}</span>
                      </div>
                      {profile.approvedBy && (
                        <div className="flex justify-between">
                          <span className="text-slate-400">Approved By</span>
                          <span className="text-emerald-400">{profile.approvedBy}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-slate-400">State</span>
                        <RuleStateBadge state={profile.state} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      {profile.state === 'Draft' && (
                        <>
                          <button className="w-full btn-primary text-xs py-2 justify-center">
                            <CheckCircle className="w-3.5 h-3.5" />
                            Submit for Approval
                          </button>
                          <button className="w-full btn-secondary text-xs py-2 justify-center">
                            <Edit className="w-3.5 h-3.5" />
                            Edit Draft
                          </button>
                        </>
                      )}
                      {profile.state === 'Active' && (
                        <>
                          <button className="w-full btn-secondary text-xs py-2 justify-center">
                            <Copy className="w-3.5 h-3.5" />
                            Clone as Draft
                          </button>
                          <button className="w-full btn-secondary text-xs py-2 justify-center text-amber-400 border-amber-500/20">
                            <Archive className="w-3.5 h-3.5" />
                            Archive Profile
                          </button>
                        </>
                      )}
                      {profile.state === 'Pending Approval' && (
                        <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300">
                          Awaiting System Administrator approval before publishing to live junctions.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Create Profile Modal */}
      <Modal
        open={createModal}
        onClose={() => setCreateModal(false)}
        title="New Optimisation Profile"
        subtitle="Define signal timing parameters for a corridor or junction group"
        width="xl"
        footer={
          <>
            <button onClick={() => setCreateModal(false)} className="btn-secondary text-xs">Cancel</button>
            <button className="btn-secondary text-xs">
              <Zap className="w-3.5 h-3.5" />
              Save as Draft
            </button>
            <button
              onClick={() => { setSaved(true); setTimeout(() => setCreateModal(false), 1500); }}
              className="btn-primary text-xs"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              {saved ? 'Submitted for Approval' : 'Submit for Approval'}
            </button>
          </>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <label className="label">Profile Name</label>
            <input className="input" placeholder="e.g. High Level Road — Peak AM" />
          </div>
          <div>
            <label className="label">Version Label</label>
            <input className="input" placeholder="e.g. v1.0-draft" />
          </div>
          <div>
            <label className="label">Corridor</label>
            <select className="select">
              <option>Galle Road Corridor</option>
              <option>Maradana–Pettah</option>
              <option>High Level Road</option>
              <option>Borella–Maradana</option>
              <option>Rajagiriya–Kotte</option>
            </select>
          </div>
          <div>
            <label className="label">Time of Day</label>
            <select className="select">
              <option>All Day</option>
              <option>Morning Peak (06:30–09:30)</option>
              <option>Evening Peak (16:00–19:30)</option>
              <option>Off-Peak (09:30–16:00)</option>
              <option>Night (21:00–06:00)</option>
              <option>Custom</option>
            </select>
          </div>
          <div>
            <label className="label">Min Green Time (s)</label>
            <input className="input" type="number" min="15" max="60" defaultValue="25" />
          </div>
          <div>
            <label className="label">Max Green Time (s)</label>
            <input className="input" type="number" min="30" max="120" defaultValue="75" />
          </div>
          <div>
            <label className="label">Min Red Time (s)</label>
            <input className="input" type="number" min="10" max="30" defaultValue="15" />
          </div>
          <div>
            <label className="label">Cycle Limit (s)</label>
            <input className="input" type="number" min="60" max="150" defaultValue="110" />
          </div>
          <div>
            <label className="label">Pedestrian Phase (s)</label>
            <input className="input" type="number" min="12" max="30" defaultValue="18" />
          </div>
          <div className="lg:col-span-3">
            <label className="label">Notes / Justification</label>
            <textarea className="textarea" rows={3} placeholder="Describe the rationale for this profile, expected impact, and any operational context…" />
          </div>
          {saved && (
            <div className="lg:col-span-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 flex items-center gap-2 animate-fade-up">
              <CheckCircle className="w-4 h-4" />
              Profile submitted for approval. System Administrator will be notified. Entry logged to audit trail.
            </div>
          )}
        </div>
      </Modal>

      <PageInfoBox
        title="Page Functionality — Optimisation Rules & Configuration"
        description="Enables Traffic Administrators to create, review, and publish adaptive signal timing profiles that govern how the AI engine allocates green time at each junction. All profile changes go through a mandatory approval workflow before taking effect on live junctions."
        points={[
          'Profile list: view all timing profiles by state — Active, Draft, Under Review, or Archived',
          'Expand any profile to see its phase durations, safety constraints, and applicable time-of-day conditions',
          'New Profile: create a draft timing configuration with custom green time ranges, pedestrian phase settings, and cycle limits',
          'Approval workflow: drafts must be reviewed and approved by a System Administrator before publishing',
          'Publish action: pushes an approved profile to live junction controllers and logs the change to the Audit Log',
          'Copy / Archive: duplicate an existing profile for modification, or retire outdated configurations',
        ]}
      />
    </div>
  );
}
