import { useState } from 'react';
import { junctions, corridors } from '../../data/junctions';
import { CongestionBadge, SignalModeBadge, ControllerStatusBadge } from '../../components/ui/Badge';
import { LiveIndicator } from '../../components/ui/LiveIndicator';
import { RefreshCw, Filter, Info, Layers, MapPin, Activity } from 'lucide-react';
import { PageInfoBox } from '../../components/ui/PageInfoBox';
import clsx from 'clsx';

const congestionColors: Record<string, string> = {
  free: 'bg-emerald-500',
  moderate: 'bg-amber-500',
  heavy: 'bg-orange-500',
  severe: 'bg-red-500',
};

const corridorColors: Record<string, string> = {
  free: 'text-emerald-400',
  moderate: 'text-amber-400',
  heavy: 'text-orange-400',
  severe: 'text-red-400',
};

// Simulated map positions (percentage-based within the map container)
const junctionPositions: Record<string, { x: number; y: number }> = {
  J01: { x: 38, y: 72 },
  J02: { x: 28, y: 42 },
  J03: { x: 52, y: 22 },
  J04: { x: 42, y: 16 },
  J05: { x: 68, y: 48 },
  J06: { x: 55, y: 75 },
  J07: { x: 20, y: 85 },
  J08: { x: 46, y: 34 },
  J09: { x: 52, y: 65 },
  J10: { x: 30, y: 55 },
  J11: { x: 44, y: 42 },
  J12: { x: 26, y: 62 },
};

export function CongestionMap() {
  const [selectedJunction, setSelectedJunction] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'heavy' | 'moderate' | 'free'>('all');
  const [showOverrides, setShowOverrides] = useState(false);

  const filtered = junctions.filter(j => {
    if (showOverrides) return j.overrideActive;
    if (filter === 'all') return true;
    return j.congestion === filter || (filter === 'heavy' && j.congestion === 'severe');
  });

  const selected = junctions.find(j => j.id === selectedJunction);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
        <div>
          <div className="section-heading mb-1">Live Traffic Intelligence</div>
          <h1 className="text-2xl font-bold text-white">Colombo Traffic Map</h1>
          <p className="text-sm text-slate-400 mt-1">Real-time congestion status across monitored junctions and corridors</p>
        </div>
        <div className="flex items-center gap-3">
          <LiveIndicator label="LIVE DATA" color="green" />
          <span className="text-xs text-slate-500">Last updated: 14:32:14</span>
          <button className="btn-secondary text-xs py-1.5 px-2.5">
            <RefreshCw className="w-3 h-3" />
            Refresh
          </button>
        </div>
      </div>

      {/* Advisory banner */}
      <div className="p-3 panel-sm border-l-4 border-red-500 mb-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-red-300">
          <Activity className="w-4 h-4 text-red-400 flex-shrink-0" />
          <span><strong>Public Advisory:</strong> Avoid Liberty Roundabout (Colombo 03) — Active collision, heavy delays. Use Marine Drive via Galle Face alternate.</span>
        </div>
        <span className="text-xs text-slate-500 flex-shrink-0">14:18 — INC-0041</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Map */}
        <div className="lg:col-span-2">
          {/* Filters */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {(['all', 'heavy', 'moderate', 'free'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={clsx('px-3 py-1 rounded-lg text-xs font-medium transition-colors border',
                  filter === f
                    ? 'bg-brand-cyan/15 text-brand-cyan border-brand-cyan/30'
                    : 'text-slate-400 border-brand-border hover:text-slate-200 hover:bg-white/5'
                )}
              >
                {f === 'all' ? 'All Junctions' : f === 'heavy' ? 'Heavy / Severe' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
            <button
              onClick={() => setShowOverrides(v => !v)}
              className={clsx('px-3 py-1 rounded-lg text-xs font-medium transition-colors border',
                showOverrides
                  ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                  : 'text-slate-400 border-brand-border hover:text-slate-200 hover:bg-white/5'
              )}
            >
              Overrides Active
            </button>
          </div>

          {/* Simulated Map Canvas */}
          <div className="panel relative overflow-hidden" style={{ height: '480px' }}>
            {/* Background grid representing city */}
            <div className="absolute inset-0 bg-grid opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/40 via-transparent to-brand-slate/60" />

            {/* Road Lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.25 }}>
              {/* Galle Road corridor */}
              <line x1="20%" y1="85%" x2="32%" y2="42%" stroke="#00C8E8" strokeWidth="3" strokeDasharray="6 3" />
              {/* Connecting segments */}
              <line x1="32%" y1="42%" x2="44%" y2="34%" stroke="#00C8E8" strokeWidth="2" strokeDasharray="6 3" />
              <line x1="26%" y1="62%" x2="30%" y2="55%" stroke="#00C8E8" strokeWidth="2" strokeDasharray="6 3" />
              <line x1="30%" y1="55%" x2="38%" y2="72%" stroke="#1D6FEB" strokeWidth="2" strokeDasharray="6 3" />
              {/* High Level Road */}
              <line x1="38%" y1="72%" x2="52%" y2="65%" stroke="#F59E0B" strokeWidth="2" strokeDasharray="6 3" />
              <line x1="52%" y1="65%" x2="55%" y2="75%" stroke="#F59E0B" strokeWidth="2" strokeDasharray="6 3" />
              {/* Maradana-Pettah */}
              <line x1="52%" y1="22%" x2="42%" y2="16%" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="6 3" />
              {/* Borella */}
              <line x1="44%" y1="42%" x2="46%" y2="34%" stroke="#EF4444" strokeWidth="2.5" strokeDasharray="6 3" />
              <line x1="46%" y1="34%" x2="52%" y2="22%" stroke="#1D6FEB" strokeWidth="1.5" strokeDasharray="6 3" />
              {/* Rajagiriya */}
              <line x1="44%" y1="42%" x2="68%" y2="48%" stroke="#10B981" strokeWidth="2" strokeDasharray="6 3" />
            </svg>

            {/* Corridor Labels */}
            <div className="absolute text-[10px] font-medium text-brand-cyan/70" style={{ left: '10%', top: '58%', transform: 'rotate(-55deg)' }}>Galle Road</div>
            <div className="absolute text-[10px] font-medium text-amber-400/70" style={{ left: '42%', top: '68%' }}>High Level Rd</div>
            <div className="absolute text-[10px] font-medium text-purple-400/70" style={{ left: '40%', top: '10%' }}>Maradana–Pettah</div>

            {/* Junction Markers */}
            {junctions.map(j => {
              const pos = junctionPositions[j.id];
              if (!pos) return null;
              const isFiltered = filtered.find(f => f.id === j.id);
              const isSelected = selectedJunction === j.id;

              return (
                <button
                  key={j.id}
                  onClick={() => setSelectedJunction(isSelected ? null : j.id)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                >
                  {/* Pulse ring for overrides */}
                  {j.overrideActive && (
                    <div className="absolute inset-0 rounded-full bg-amber-500/30 animate-ping scale-150" />
                  )}

                  {/* Marker */}
                  <div className={clsx(
                    'w-4 h-4 rounded-full border-2 transition-all duration-150',
                    isFiltered ? 'opacity-100' : 'opacity-30',
                    isSelected ? 'scale-150 ring-2 ring-white/50' : 'group-hover:scale-125',
                    congestionColors[j.congestion],
                    j.congestion === 'severe' ? 'border-red-300' :
                    j.congestion === 'heavy' ? 'border-orange-300' :
                    j.congestion === 'moderate' ? 'border-amber-300' :
                    'border-emerald-300'
                  )} />

                  {/* Tooltip */}
                  <div className={clsx(
                    'absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-36 panel-sm p-2 text-left transition-all duration-150 pointer-events-none z-10',
                    isSelected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0'
                  )}>
                    <div className="text-[10px] font-semibold text-white mb-1 leading-tight">{j.name}</div>
                    <div className="text-[10px] text-slate-400">Queue: {j.queueLength}m</div>
                    <div className="text-[10px] text-slate-400">{j.signalMode}</div>
                    {j.overrideActive && <div className="text-[10px] text-amber-400 font-medium">Override Active</div>}
                  </div>
                </button>
              );
            })}

            {/* Legend */}
            <div className="absolute bottom-4 left-4 panel-sm p-3 flex flex-col gap-2">
              <div className="section-heading text-[9px] mb-1">Congestion Level</div>
              {[
                { label: 'Free Flow', color: 'bg-emerald-500' },
                { label: 'Moderate', color: 'bg-amber-500' },
                { label: 'Heavy', color: 'bg-orange-500' },
                { label: 'Severe', color: 'bg-red-500' },
              ].map(l => (
                <div key={l.label} className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${l.color}`} />
                  <span className="text-[10px] text-slate-400">{l.label}</span>
                </div>
              ))}
              <div className="border-t border-brand-border mt-1 pt-1">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-amber-400/30" />
                  <span className="text-[10px] text-amber-400">Override Active</span>
                </div>
              </div>
            </div>

            {/* Map disclaimer */}
            <div className="absolute bottom-4 right-4 text-[9px] text-slate-600 flex items-center gap-1">
              <Info className="w-2.5 h-2.5" />
              Simulated map representation
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="flex flex-col gap-4">
          {/* Selected Junction Detail */}
          {selected ? (
            <div className="panel p-4 animate-fade-up">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="section-heading mb-1">{selected.id}</div>
                  <h3 className="text-sm font-semibold text-white leading-tight">{selected.name}</h3>
                  <div className="text-xs text-slate-500">{selected.corridor}</div>
                </div>
                <CongestionBadge level={selected.congestion} />
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { label: 'Queue Length', value: `${selected.queueLength}m` },
                  { label: 'Avg Delay', value: `${selected.avgDelay}s` },
                  { label: 'Throughput', value: `${selected.throughput}/hr` },
                  { label: 'CCTV', value: `${selected.cctvHealthy}/${selected.cctvFeeds} healthy` },
                ].map(s => (
                  <div key={s.label} className="bg-brand-slate rounded-lg p-2.5">
                    <div className="text-[10px] text-slate-500 mb-0.5">{s.label}</div>
                    <div className="text-sm font-semibold text-white">{s.value}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Signal Mode</span>
                  <SignalModeBadge mode={selected.signalMode} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Controller</span>
                  <ControllerStatusBadge status={selected.controllerStatus} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Override Active</span>
                  <span className={selected.overrideActive ? 'text-amber-400 font-medium' : 'text-slate-500'}>
                    {selected.overrideActive ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
              {selected.congestion === 'severe' || selected.congestion === 'heavy' ? (
                <div className="mt-3 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
                  <strong>Advisory:</strong> Significant delays expected. Consider alternate routes.
                </div>
              ) : null}
            </div>
          ) : (
            <div className="panel p-6 text-center">
              <MapPin className="w-8 h-8 text-slate-600 mx-auto mb-3" />
              <p className="text-sm text-slate-400">Click a junction marker on the map to view live status</p>
            </div>
          )}

          {/* Corridor Status */}
          <div className="panel p-4">
            <div className="section-heading mb-3">Corridor Status</div>
            <div className="space-y-3">
              {corridors.map(c => (
                <div key={c.id} className="flex items-center justify-between text-xs">
                  <div>
                    <div className="text-slate-300 font-medium">{c.name}</div>
                    <div className="text-slate-500">{c.junctionCount} junctions · Avg delay {c.avgDelay}s</div>
                  </div>
                  <div className={`font-medium ${corridorColors[c.congestion]}`}>
                    {c.congestion.charAt(0).toUpperCase() + c.congestion.slice(1)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Junction List */}
          <div className="panel p-4 flex-1">
            <div className="section-heading mb-3">All Junctions ({filtered.length})</div>
            <div className="space-y-2 overflow-y-auto" style={{ maxHeight: '280px' }}>
              {filtered.map(j => (
                <button
                  key={j.id}
                  onClick={() => setSelectedJunction(j.id === selectedJunction ? null : j.id)}
                  className={clsx(
                    'w-full text-left p-2.5 rounded-lg transition-colors',
                    selectedJunction === j.id ? 'bg-brand-blue/20 border border-brand-blue/30' : 'hover:bg-brand-slate'
                  )}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-slate-200 truncate">{j.shortName}</span>
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${congestionColors[j.congestion]}`} />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span>Queue: {j.queueLength}m</span>
                    <span>{j.signalMode}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Note */}
      <div className="mt-5 flex items-start gap-2 text-xs text-slate-500">
        <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
        <span>This map is a prototype simulation representing real-time junction states. Junction positions are illustrative. Data is updated every 30 seconds from the SignalSync AI detection layer.</span>
      </div>

      <PageInfoBox
        title="Page Functionality — Colombo Traffic Map"
        description="Public-facing real-time congestion map showing the status of all monitored junctions and corridors across Colombo. Road users can view live congestion levels, filter by severity, and identify active signal overrides."
        points={[
          'Junction markers: colour-coded by congestion level — green (free), amber (moderate), orange (heavy), red (severe)',
          'Corridor summary: table view of all monitored corridors with overall congestion status and active incident flags',
          'Filter controls: show all junctions, or filter to heavy/severe congestion or active overrides only',
          'Junction detail panel: click any junction to see queue length, signal mode, AI confidence, and current override status',
          'Advisory banner: prominently displays any active public advisories issued by traffic administrators',
        ]}
      />
    </div>
  );
}
