import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { junctions } from '../../data/junctions';
import { incidents } from '../../data/incidents';
import { CongestionBadge, SignalModeBadge, ControllerStatusBadge } from '../../components/ui/Badge';
import { LiveIndicator } from '../../components/ui/LiveIndicator';
import { Modal } from '../../components/ui/Modal';
import {
  Activity, Camera, AlertTriangle, Settings, Clock, Zap, ChevronRight,
  CheckCircle, XCircle, Play, Pause, SkipForward, RotateCcw, MapPin,
  TrendingUp, Signal,
} from 'lucide-react';
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import clsx from 'clsx';

// Simulated trend data per junction
const generateTrend = (base: number, variance: number, count = 24) =>
  Array.from({ length: count }, (_, i) => ({
    time: `${String(i).padStart(2, '0')}:00`,
    queue: Math.max(0, base + Math.sin(i / 3) * variance + Math.random() * 20 - 10),
    throughput: Math.max(0, 1200 + Math.cos(i / 3) * 400 + Math.random() * 100 - 50),
    delay: Math.max(0, base * 0.4 + Math.sin(i / 3) * 15 + Math.random() * 5),
  }));

const tabs = ['Overview', 'Performance', 'Events', 'Controller'];

export function JunctionMonitoring() {
  const [searchParams] = useSearchParams();
  const [selectedId, setSelectedId] = useState(searchParams.get('j') || 'J01');
  const [activeTab, setActiveTab] = useState('Overview');
  const [overrideModal, setOverrideModal] = useState(false);
  const [overrideConfirmed, setOverrideConfirmed] = useState(false);

  const junction = junctions.find(j => j.id === selectedId) || junctions[0];
  const trend = generateTrend(junction.queueLength, 40);
  const junctionIncidents = incidents.filter(i => i.affectedJunctions.includes(junction.id));

  const phaseData = [
    { phase: 'North–South Green', duration: junction.currentGreenTime, color: 'bg-emerald-500' },
    { phase: 'Left Turn Permitted', duration: Math.round(junction.currentGreenTime * 0.3), color: 'bg-blue-500' },
    { phase: 'All Red / Clearance', duration: 4, color: 'bg-red-500' },
    { phase: 'East–West Green', duration: Math.round(junction.cycleTime * 0.35), color: 'bg-emerald-500' },
    { phase: 'Pedestrian Phase', duration: 18, color: 'bg-amber-500' },
    { phase: 'All Red / Clearance', duration: 4, color: 'bg-red-500' },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-white">Junction Monitoring</h1>
          <p className="text-xs text-slate-400 mt-0.5">Detailed per-junction view — select a junction from the list</p>
        </div>
        <div className="flex items-center gap-3">
          <LiveIndicator label="LIVE" color="green" />
          <span className="text-xs text-slate-500 font-mono">Updated {junction.lastUpdated}</span>
        </div>
      </div>

      {/* Junction Selector */}
      <div className="panel p-3 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {junctions.map(j => (
            <button
              key={j.id}
              onClick={() => setSelectedId(j.id)}
              className={clsx(
                'flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border transition-all flex-shrink-0',
                selectedId === j.id
                  ? 'bg-brand-blue/20 border-brand-blue/40 text-white'
                  : 'border-brand-border text-slate-400 hover:text-slate-200 hover:bg-white/5'
              )}
            >
              <div className={clsx('w-2 h-2 rounded-full flex-shrink-0',
                j.congestion === 'free' ? 'bg-emerald-500' :
                j.congestion === 'moderate' ? 'bg-amber-500' :
                j.congestion === 'heavy' ? 'bg-orange-500' : 'bg-red-500'
              )} />
              {j.id}
              {j.overrideActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
            </button>
          ))}
        </div>
      </div>

      {/* Junction Details */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">

        {/* Left: Info + Status */}
        <div className="lg:col-span-1 space-y-4">
          {/* Identity */}
          <div className="panel p-4">
            <div className="section-heading mb-2">Junction ID: {junction.id}</div>
            <h2 className="text-base font-bold text-white leading-tight mb-1">{junction.name}</h2>
            <div className="text-xs text-slate-400 mb-3 flex items-center gap-1">
              <MapPin className="w-3 h-3" />{junction.corridor}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Congestion Level</span>
                <CongestionBadge level={junction.congestion} />
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Signal Mode</span>
                <SignalModeBadge mode={junction.signalMode} />
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Controller</span>
                <ControllerStatusBadge status={junction.controllerStatus} />
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Override Active</span>
                <span className={junction.overrideActive ? 'text-amber-400 font-semibold' : 'text-slate-500'}>
                  {junction.overrideActive ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">CCTV Health</span>
                <span className={junction.cctvHealthy === junction.cctvFeeds ? 'text-emerald-400' : 'text-amber-400'}>
                  {junction.cctvHealthy}/{junction.cctvFeeds} stable
                </span>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="panel p-4 space-y-3">
            <div className="section-heading">Live Metrics</div>
            {[
              { label: 'Queue Length', value: `${junction.queueLength}m`, color: junction.queueLength > 150 ? 'text-red-400' : junction.queueLength > 80 ? 'text-amber-400' : 'text-emerald-400' },
              { label: 'Avg Vehicle Delay', value: `${junction.avgDelay}s`, color: 'text-white' },
              { label: 'Throughput', value: `${junction.throughput} veh/hr`, color: 'text-brand-cyan' },
              { label: 'Congestion %', value: `${junction.congestionPct}%`, color: 'text-white' },
              { label: 'Current Green', value: `${junction.currentGreenTime}s`, color: 'text-emerald-400' },
              { label: 'Cycle Time', value: `${junction.cycleTime}s`, color: 'text-slate-300' },
            ].map(m => (
              <div key={m.label} className="flex justify-between items-center">
                <span className="text-xs text-slate-400">{m.label}</span>
                <span className={`text-sm font-bold font-mono ${m.color}`}>{m.value}</span>
              </div>
            ))}
          </div>

          {/* Manual Actions */}
          <div className="panel p-4">
            <div className="section-heading mb-3">Manual Controls</div>
            <div className="space-y-2">
              <button
                onClick={() => setOverrideModal(true)}
                className={clsx('w-full justify-center text-xs py-2',
                  junction.overrideActive ? 'btn-secondary' : 'btn-amber'
                )}
              >
                <Zap className="w-3.5 h-3.5" />
                {junction.overrideActive ? 'End Override' : 'Activate Override'}
              </button>
              <button className="w-full btn-secondary text-xs py-2 justify-center">
                <SkipForward className="w-3.5 h-3.5" />
                Force Phase Skip
              </button>
              <button className="w-full btn-secondary text-xs py-2 justify-center">
                <RotateCcw className="w-3.5 h-3.5" />
                Reset to Adaptive
              </button>
            </div>
            <p className="text-[10px] text-slate-600 mt-2">All manual actions are logged and require officer authentication.</p>
          </div>
        </div>

        {/* Right: Tabs */}
        <div className="lg:col-span-3 space-y-4">
          {/* Tab Bar */}
          <div className="flex border-b border-brand-border">
            {tabs.map(t => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={clsx(
                  'px-4 py-2.5 text-xs font-medium border-b-2 transition-colors -mb-px',
                  activeTab === t
                    ? 'border-brand-cyan text-brand-cyan'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                )}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'Overview' && (
            <div className="space-y-4 animate-fade-up">
              {/* Congestion meter */}
              <div className="panel p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-semibold text-white">Congestion Level</div>
                  <span className={clsx('text-2xl font-bold font-mono',
                    junction.congestionPct > 80 ? 'text-red-400' :
                    junction.congestionPct > 60 ? 'text-orange-400' :
                    junction.congestionPct > 40 ? 'text-amber-400' : 'text-emerald-400'
                  )}>{junction.congestionPct}%</span>
                </div>
                <div className="h-4 bg-brand-border rounded-full overflow-hidden">
                  <div
                    className={clsx('h-full rounded-full transition-all',
                      junction.congestionPct > 80 ? 'bg-gradient-to-r from-orange-500 to-red-500' :
                      junction.congestionPct > 60 ? 'bg-gradient-to-r from-amber-400 to-orange-500' :
                      junction.congestionPct > 40 ? 'bg-amber-400' : 'bg-emerald-500'
                    )}
                    style={{ width: `${junction.congestionPct}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>Free Flow</span>
                  <span>Moderate</span>
                  <span>Heavy</span>
                  <span>Severe</span>
                </div>
              </div>

              {/* Signal Phase Sequence */}
              <div className="panel p-5">
                <div className="text-sm font-semibold text-white mb-4">Current Signal Phase Sequence</div>
                <div className="flex gap-1 h-8 rounded-lg overflow-hidden mb-3">
                  {phaseData.map((p, i) => (
                    <div
                      key={i}
                      className={`${p.color} relative group flex-shrink-0`}
                      style={{ flexBasis: `${(p.duration / junction.cycleTime) * 100}%` }}
                    >
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 rounded" />
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {phaseData.map((p, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <div className={`w-2.5 h-2.5 rounded ${p.color} flex-shrink-0`} />
                      <span className="text-slate-400 truncate">{p.phase}</span>
                      <span className="text-slate-300 font-mono ml-auto">{p.duration}s</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety Rules */}
              <div className="panel p-5">
                <div className="text-sm font-semibold text-white mb-3">Safety Rule Status</div>
                <div className="space-y-2">
                  {[
                    { rule: 'Minimum green time enforced (25s)', active: true },
                    { rule: 'Pedestrian phase protected (18s minimum)', active: true },
                    { rule: 'Maximum cycle limit enforced (110s)', active: true },
                    { rule: 'Emergency override channel: Ready', active: true },
                    { rule: 'Controller failsafe: Configured', active: true },
                    { rule: 'CCTV detection confidence above threshold', active: junction.cctvHealthy === junction.cctvFeeds },
                  ].map(r => (
                    <div key={r.rule} className="flex items-center gap-2.5 text-xs">
                      {r.active
                        ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        : <XCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />}
                      <span className={r.active ? 'text-slate-300' : 'text-amber-400'}>{r.rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Performance' && (
            <div className="space-y-4 animate-fade-up">
              <div className="panel p-5">
                <div className="text-sm font-semibold text-white mb-4">Queue Length — Today (24hr)</div>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={trend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" tick={{ fontSize: 10 }} interval={3} />
                    <YAxis tick={{ fontSize: 10 }} unit="m" />
                    <Tooltip contentStyle={{ background: '#162236', border: '1px solid #1E3A5F', borderRadius: 8, fontSize: 11 }} />
                    <Area type="monotone" dataKey="queue" stroke="#EF4444" fill="#EF4444" fillOpacity={0.1} name="Queue (m)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="panel p-5">
                  <div className="text-sm font-semibold text-white mb-4">Throughput — Today</div>
                  <ResponsiveContainer width="100%" height={160}>
                    <LineChart data={trend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" tick={{ fontSize: 9 }} interval={5} />
                      <YAxis tick={{ fontSize: 9 }} />
                      <Tooltip contentStyle={{ background: '#162236', border: '1px solid #1E3A5F', borderRadius: 8, fontSize: 11 }} />
                      <Line type="monotone" dataKey="throughput" stroke="#00C8E8" dot={false} strokeWidth={2} name="Vehicles/hr" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="panel p-5">
                  <div className="text-sm font-semibold text-white mb-4">Avg Delay — Today</div>
                  <ResponsiveContainer width="100%" height={160}>
                    <LineChart data={trend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" tick={{ fontSize: 9 }} interval={5} />
                      <YAxis tick={{ fontSize: 9 }} unit="s" />
                      <Tooltip contentStyle={{ background: '#162236', border: '1px solid #1E3A5F', borderRadius: 8, fontSize: 11 }} />
                      <Line type="monotone" dataKey="delay" stroke="#F59E0B" dot={false} strokeWidth={2} name="Delay (s)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Events' && (
            <div className="space-y-3 animate-fade-up">
              {junctionIncidents.length > 0 ? junctionIncidents.map(inc => (
                <div key={inc.id} className="panel p-4">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs font-mono text-slate-500">{inc.id}</span>
                    <span className={clsx('text-xs font-bold',
                      inc.status === 'Active' ? 'text-red-400' : 'text-emerald-400'
                    )}>{inc.status}</span>
                  </div>
                  <div className="text-sm font-semibold text-white mb-1">{inc.type} — {inc.severity}</div>
                  <p className="text-xs text-slate-400">{inc.description}</p>
                  <div className="mt-2 text-xs text-slate-500">Reported: {inc.reportedAt} · Est. clearance: {inc.estimatedClearance}</div>
                </div>
              )) : (
                <div className="panel p-8 text-center">
                  <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <div className="text-sm text-white font-medium">No active events at this junction</div>
                  <div className="text-xs text-slate-400 mt-1">All clear — {junction.name}</div>
                </div>
              )}

              {/* Historical events */}
              <div className="panel p-4">
                <div className="section-heading mb-3">Recent Event Log</div>
                <div className="space-y-2.5">
                  {[
                    { time: '13:55', event: 'AI auto-extended green phase by 12s due to queue build-up on North approach' },
                    { time: '12:30', event: 'Cycle time adjusted to 95s (was 85s) by optimisation engine' },
                    { time: '10:15', event: 'New optimisation rule profile activated: Galle Road Morning Peak v3.1' },
                    { time: '09:22', event: 'CCTV feed CAM-J01-03 reported low confidence (74%). Threshold adjusted.' },
                    { time: '07:45', event: 'Junction entered Adaptive mode — daily startup sequence completed' },
                  ].map((e, i) => (
                    <div key={i} className="flex gap-3 text-xs">
                      <span className="text-slate-600 font-mono flex-shrink-0">{e.time}</span>
                      <span className="text-slate-400">{e.event}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Controller' && (
            <div className="space-y-4 animate-fade-up">
              <div className="panel p-5">
                <div className="text-sm font-semibold text-white mb-4">Controller Diagnostics</div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Controller ID', value: `CTRL-${junction.id}-A01` },
                    { label: 'Status', value: junction.controllerStatus },
                    { label: 'Firmware', value: 'UTMC v4.2.1' },
                    { label: 'Last Heartbeat', value: junction.lastUpdated },
                    { label: 'Command Latency', value: '38ms' },
                    { label: 'Uptime (today)', value: '99.8%' },
                    { label: 'Failsafe Mode', value: 'Fixed-Time (65s)' },
                    { label: 'CCTV Integration', value: `${junction.cctvFeeds} feeds` },
                  ].map(d => (
                    <div key={d.label} className="bg-brand-slate rounded-lg p-3">
                      <div className="text-[10px] text-slate-500 mb-0.5">{d.label}</div>
                      <div className="text-xs font-semibold text-white">{d.value}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="panel p-5">
                <div className="text-sm font-semibold text-white mb-3">CCTV Feeds — {junction.name}</div>
                <div className="grid grid-cols-2 gap-3">
                  {Array.from({ length: junction.cctvFeeds }, (_, i) => {
                    const isOffline = i >= junction.cctvHealthy;
                    return (
                      <div key={i} className={clsx('p-3 rounded-lg border text-xs',
                        isOffline ? 'border-red-500/30 bg-red-500/5' : 'border-brand-border bg-brand-slate'
                      )}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-slate-400">CAM-{junction.id}-0{i + 1}</span>
                          <span className={isOffline ? 'text-red-400' : 'text-emerald-400'}>
                            {isOffline ? 'Offline' : 'Stable'}
                          </span>
                        </div>
                        <div className="text-slate-500">{isOffline ? 'Feed unavailable' : `Confidence: ${92 - i}%`}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Override Modal */}
      <Modal
        open={overrideModal}
        onClose={() => { setOverrideModal(false); setOverrideConfirmed(false); }}
        title="Activate Manual Override"
        subtitle={`Junction ${junction.id} — ${junction.name}`}
        width="md"
        footer={
          <>
            <button onClick={() => { setOverrideModal(false); setOverrideConfirmed(false); }} className="btn-secondary text-xs">
              Cancel
            </button>
            <button
              onClick={() => { setOverrideConfirmed(true); setTimeout(() => { setOverrideModal(false); setOverrideConfirmed(false); }, 1500); }}
              className="btn-amber text-xs"
            >
              <Zap className="w-3.5 h-3.5" />
              {overrideConfirmed ? 'Override Activated' : 'Confirm Override'}
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
            <strong>Warning:</strong> Activating manual override will suspend AI-based adaptive control for this junction. All signal timings will be under direct officer control. This action will be logged with your identity and timestamp.
          </div>
          <div className="space-y-3">
            <div>
              <label className="label">Override Reason</label>
              <select className="select">
                <option>Active incident — traffic management</option>
                <option>VIP or official motorcade</option>
                <option>Emergency vehicle priority</option>
                <option>Road works or lane closure</option>
                <option>Other operational requirement</option>
              </select>
            </div>
            <div>
              <label className="label">Extended Green Direction</label>
              <select className="select">
                <option>North–South Approach</option>
                <option>East–West Approach</option>
                <option>All Approaches (Hold)</option>
              </select>
            </div>
            <div>
              <label className="label">Override Duration</label>
              <select className="select">
                <option>15 minutes</option>
                <option>30 minutes</option>
                <option>60 minutes</option>
                <option>Until manually ended</option>
              </select>
            </div>
          </div>
          {overrideConfirmed && (
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 flex items-center gap-2 animate-fade-up">
              <CheckCircle className="w-4 h-4" />
              Override activated at {junction.id}. Event logged to audit trail.
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
