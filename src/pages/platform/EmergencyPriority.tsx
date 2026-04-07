import { useState } from 'react';
import { junctions } from '../../data/junctions';
import { Siren, AlertTriangle, CheckCircle, Shield, Zap, ChevronRight, Clock, MapPin, XCircle } from 'lucide-react';
import { PageInfoBox } from '../../components/ui/PageInfoBox';
import { LiveIndicator } from '../../components/ui/LiveIndicator';
import clsx from 'clsx';

const corridorPresets = [
  {
    id: 'EC01',
    name: 'Borella → Presidential Secretariat',
    junctionSequence: ['J08', 'J11', 'J03'],
    status: 'Active',
    activatedAt: '14:05:00',
    activatedBy: 'Traffic Control Centre',
    reason: 'State motorcade — VIP Movement',
    estimatedDuration: '40 min',
    estimatedClearance: '14:45',
  },
  {
    id: 'EC02',
    name: 'Dehiwala → National Hospital (Colombo)',
    junctionSequence: ['J07', 'J12', 'J10', 'J02'],
    status: 'Standby',
    activatedAt: null,
    activatedBy: null,
    reason: 'Ambulance priority corridor',
    estimatedDuration: '18 min',
    estimatedClearance: null,
  },
  {
    id: 'EC03',
    name: 'Nugegoda → Lady Ridgeway Hospital',
    junctionSequence: ['J06', 'J09', 'J08'],
    status: 'Standby',
    activatedAt: null,
    activatedBy: null,
    reason: 'Emergency vehicle priority',
    estimatedDuration: '22 min',
    estimatedClearance: null,
  },
  {
    id: 'EC04',
    name: 'Pettah → Port of Colombo Gate',
    junctionSequence: ['J04', 'J03'],
    status: 'Standby',
    activatedAt: null,
    activatedBy: null,
    reason: 'Incident response / fire services',
    estimatedDuration: '14 min',
    estimatedClearance: null,
  },
];

const vehicleTypes = [
  { label: 'Ambulance / Medical Emergency', icon: '🚑', priority: 'Highest' },
  { label: 'Fire Service', icon: '🚒', priority: 'Highest' },
  { label: 'Police Emergency Response', icon: '🚔', priority: 'High' },
  { label: 'State / VIP Motorcade', icon: '🚗', priority: 'High' },
  { label: 'Bomb Squad / Specialist Unit', icon: '🚐', priority: 'High' },
];

export function EmergencyPriority() {
  const [selectedCorridor, setSelectedCorridor] = useState('EC01');
  const [activating, setActivating] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<string | null>(null);
  const [customMode, setCustomMode] = useState(false);

  const selected = corridorPresets.find(c => c.id === selectedCorridor);

  const handleActivate = (id: string) => {
    setActivating(id);
    setTimeout(() => {
      setConfirmed(id);
      setActivating(null);
    }, 1500);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Siren className="w-5 h-5 text-red-400" />
            Emergency Priority Control
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">Activate emergency vehicle priority corridors — restricted to authorised officers</p>
        </div>
        <div className="flex items-center gap-3">
          <LiveIndicator label="EC01 ACTIVE" color="red" size="md" />
        </div>
      </div>

      <PageInfoBox
        title="Page Functionality — Emergency Priority Control"
        description="Enables authorised officers to activate pre-configured emergency priority corridors for rapid response vehicles, VIP motorcades, or critical incidents. Activation immediately overrides AI adaptive control on the affected junction sequence."
        points={[
          'Corridor presets: pre-defined emergency routes (e.g., Borella → Secretariat, Nugegoda → Lady Ridgeway Hospital)',
          'Activate / Deactivate: one-click corridor control with a mandatory confirmation step',
          'Vehicle type selection: ambulance, fire service, police response, VIP motorcade, specialist unit',
          'Custom corridor mode: manually select specific junctions for ad-hoc priority sequences',
          'All activations logged to audit trail with officer identity, reason, and timestamp',
          'Affected junctions revert to AI adaptive or fixed-time mode on deactivation',
        ]}
      />

      {/* Auth Notice */}
      <div className="p-4 panel-sm border border-red-500/30 bg-red-500/5">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-semibold text-red-300 mb-1">Restricted Access — Authorised Officers Only</div>
            <p className="text-xs text-slate-400">
              This module controls emergency signal priority across Colombo junctions. All activations are immediately logged with officer identity, timestamp, corridor, and justification. Misuse or unauthorised activation constitutes a disciplinary offence under SL Traffic Ordinance Section 14(b). Activating priority will suspend normal AI adaptive control on affected junctions.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Corridor List */}
        <div className="space-y-3">
          <div className="section-heading">Emergency Corridors</div>
          {corridorPresets.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCorridor(c.id)}
              className={clsx(
                'w-full text-left panel p-4 transition-all',
                selectedCorridor === c.id ? 'border-red-500/40 bg-red-500/5' : 'hover:border-brand-border/70',
                c.status === 'Active' && 'border-l-4 border-l-red-500'
              )}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="text-xs font-mono text-slate-500">{c.id}</div>
                <span className={clsx('text-xs font-bold',
                  c.status === 'Active' ? 'text-red-400' : 'text-slate-500'
                )}>
                  {c.status === 'Active' ? (
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 live-pulse" />
                      ACTIVE
                    </span>
                  ) : 'Standby'}
                </span>
              </div>
              <div className="text-sm font-semibold text-white leading-tight mb-1">{c.name}</div>
              <div className="text-xs text-slate-400">{c.reason}</div>
              <div className="mt-2 flex items-center gap-1 flex-wrap">
                {c.junctionSequence.map((j, i) => (
                  <span key={j} className="flex items-center gap-1">
                    <span className="badge-slate text-[10px]">{j}</span>
                    {i < c.junctionSequence.length - 1 && <ChevronRight className="w-2.5 h-2.5 text-slate-600" />}
                  </span>
                ))}
              </div>
            </button>
          ))}

          <button
            onClick={() => setCustomMode(v => !v)}
            className="w-full btn-secondary text-xs py-2 justify-center"
          >
            <Zap className="w-3.5 h-3.5" />
            Custom Corridor
          </button>
        </div>

        {/* Selected Corridor Detail */}
        {selected && (
          <div className="lg:col-span-2 space-y-4">
            {/* Status panel */}
            <div className={clsx(
              'panel p-5 border-l-4',
              selected.status === 'Active' ? 'border-l-red-500' : 'border-l-slate-600'
            )}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-xs font-mono text-slate-500 mb-1">{selected.id}</div>
                  <h2 className="text-base font-bold text-white">{selected.name}</h2>
                  <p className="text-xs text-slate-400 mt-1">{selected.reason}</p>
                </div>
                {selected.status === 'Active' ? (
                  <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-red-400 live-pulse" />
                    CORRIDOR ACTIVE
                  </span>
                ) : (
                  <span className="badge-slate">Standby</span>
                )}
              </div>

              {/* Junction Sequence */}
              <div className="mb-4">
                <div className="section-heading mb-3">Junction Sequence</div>
                <div className="flex items-center gap-2 flex-wrap">
                  {selected.junctionSequence.map((jId, i) => {
                    const j = junctions.find(j => j.id === jId);
                    return (
                      <span key={jId} className="flex items-center gap-2">
                        <div className={clsx(
                          'px-3 py-2 rounded-lg border text-xs font-medium',
                          selected.status === 'Active'
                            ? 'bg-red-500/15 border-red-500/30 text-red-300'
                            : 'bg-brand-slate border-brand-border text-slate-300'
                        )}>
                          <div className="font-mono text-[10px] mb-0.5">{jId}</div>
                          <div className="text-white font-semibold">{j?.shortName || jId}</div>
                          {selected.status === 'Active' && (
                            <div className="text-[10px] text-red-400 mt-0.5">Pre-cleared</div>
                          )}
                        </div>
                        {i < selected.junctionSequence.length - 1 && (
                          <ChevronRight className="w-4 h-4 text-red-400 flex-shrink-0" />
                        )}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                {selected.status === 'Active' ? (
                  <>
                    <div className="bg-brand-slate rounded-lg p-2.5">
                      <div className="text-[10px] text-slate-500">Activated</div>
                      <div className="text-xs font-bold text-white">{selected.activatedAt}</div>
                    </div>
                    <div className="bg-brand-slate rounded-lg p-2.5">
                      <div className="text-[10px] text-slate-500">Activated By</div>
                      <div className="text-xs font-bold text-white truncate">{selected.activatedBy}</div>
                    </div>
                    <div className="bg-brand-slate rounded-lg p-2.5">
                      <div className="text-[10px] text-slate-500">Duration</div>
                      <div className="text-xs font-bold text-amber-400">{selected.estimatedDuration}</div>
                    </div>
                    <div className="bg-brand-slate rounded-lg p-2.5">
                      <div className="text-[10px] text-slate-500">Est. Clearance</div>
                      <div className="text-xs font-bold text-white">{selected.estimatedClearance}</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-brand-slate rounded-lg p-2.5">
                      <div className="text-[10px] text-slate-500">Est. Duration</div>
                      <div className="text-xs font-bold text-white">{selected.estimatedDuration}</div>
                    </div>
                    <div className="bg-brand-slate rounded-lg p-2.5">
                      <div className="text-[10px] text-slate-500">Junctions</div>
                      <div className="text-xs font-bold text-white">{selected.junctionSequence.length} junctions</div>
                    </div>
                  </>
                )}
              </div>

              {/* Activation Controls */}
              {selected.status === 'Active' ? (
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-300">
                    <strong>Corridor is active.</strong> All junctions in sequence are on Emergency Priority mode. AI adaptive control is suspended. Manually end priority when vehicle has cleared.
                  </div>
                  <button className="btn-secondary text-sm">
                    <XCircle className="w-4 h-4" />
                    End Emergency Priority
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {confirmed === selected.id ? (
                    <div className="p-3 rounded-lg bg-red-500/15 border border-red-500/30 text-sm text-red-300 flex items-center gap-2 animate-fade-up">
                      <Siren className="w-4 h-4 flex-shrink-0" />
                      Emergency priority activated for {selected.name}. All {selected.junctionSequence.length} junctions pre-cleared.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <label className="label">Activation Justification</label>
                        <select className="select">
                          {vehicleTypes.map(v => (
                            <option key={v.label}>{v.icon} {v.label} (Priority: {v.priority})</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="label">Additional Notes</label>
                        <input className="input" placeholder="Vehicle registration, incident reference, etc." />
                      </div>
                      <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
                        <strong>Confirmation required:</strong> Activating this corridor will immediately pre-clear all {selected.junctionSequence.length} junctions listed above. This action is irreversible and will be logged with your identity.
                      </div>
                      <button
                        onClick={() => handleActivate(selected.id)}
                        disabled={activating === selected.id}
                        className="btn-danger text-sm w-full justify-center"
                      >
                        <Siren className="w-4 h-4" />
                        {activating === selected.id ? 'Activating…' : `Activate Emergency Priority — ${selected.name}`}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Safety Checklist */}
            <div className="panel p-5">
              <div className="section-heading mb-3">Pre-Activation Safety Validation</div>
              <div className="space-y-2">
                {[
                  { check: 'All junction controllers in sequence are connected', ok: true },
                  { check: 'CCTV detection on all corridor junctions is stable', ok: selected.junctionSequence.every(jId => {
                    const j = junctions.find(j => j.id === jId);
                    return j && j.cctvHealthy === j.cctvFeeds;
                  })},
                  { check: 'No conflicting emergency corridors currently active', ok: true },
                  { check: 'Requesting officer identity verified (MFA session active)', ok: true },
                  { check: 'Activation reason recorded for audit log', ok: true },
                ].map(c => (
                  <div key={c.check} className="flex items-center gap-2.5 text-xs">
                    {c.ok
                      ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      : <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />}
                    <span className={c.ok ? 'text-slate-300' : 'text-amber-400'}>{c.check}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom Corridor Builder */}
      {customMode && (
        <div className="panel p-5 animate-fade-up">
          <div className="section-heading mb-3">Custom Emergency Corridor Builder</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="label">Corridor Name</label>
              <input className="input" placeholder="e.g. Mount Lavinia → Colombo General" />
            </div>
            <div>
              <label className="label">Emergency Type</label>
              <select className="select">
                {vehicleTypes.map(v => <option key={v.label}>{v.label}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Junction Sequence</label>
              <select className="select" multiple>
                {junctions.map(j => <option key={j.id} value={j.id}>{j.id} — {j.shortName}</option>)}
              </select>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="btn-danger text-xs"><Siren className="w-3.5 h-3.5" />Activate Custom Corridor</button>
            <button onClick={() => setCustomMode(false)} className="btn-secondary text-xs">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
