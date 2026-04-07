import { useState } from 'react';
import { Link } from 'react-router-dom';
import { junctions } from '../../data/junctions';
import { incidents } from '../../data/incidents';
import { kpiSummary, hourlyThroughput, congestionTrend7Day } from '../../data/metrics';
import { CongestionBadge, SignalModeBadge, ControllerStatusBadge } from '../../components/ui/Badge';
import { MetricCard } from '../../components/ui/MetricCard';
import { LiveIndicator } from '../../components/ui/LiveIndicator';
import {
  Activity, AlertTriangle, Camera, Zap, TrendingDown, Server,
  ArrowRight, RefreshCw, MapPin, Eye, Siren, ChevronRight,
} from 'lucide-react';
import { PageInfoBox } from '../../components/ui/PageInfoBox';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, LineChart, Line,
} from 'recharts';
import clsx from 'clsx';

const congestionBg: Record<string, string> = {
  free: 'border-l-emerald-500',
  moderate: 'border-l-amber-500',
  heavy: 'border-l-orange-500',
  severe: 'border-l-red-500',
};

const recentActivity = [
  { time: '14:32', type: 'override', text: 'Manual override active: Liberty Roundabout (J02) — Insp. R. Perera', color: 'text-amber-400' },
  { time: '14:18', type: 'incident', text: 'INC-0041 created: Collision at Galle Rd / Liberty Roundabout', color: 'text-red-400' },
  { time: '14:05', type: 'emergency', text: 'Emergency Priority activated: Borella→Secretariat corridor (J08, J11)', color: 'text-red-400' },
  { time: '13:55', type: 'ai', text: 'AI auto-created INC-0039: Heavy congestion at Pettah Bus Terminal (J04)', color: 'text-blue-400' },
  { time: '13:20', type: 'resolve', text: 'INC-0036 resolved: Stalled vehicle cleared at Narahenpita (J11)', color: 'text-emerald-400' },
  { time: '12:34', type: 'rule', text: 'Rule change submitted: Galle Road Peak PM cycle extended to 105s — pending approval', color: 'text-purple-400' },
  { time: '12:00', type: 'advisory', text: 'Public advisory published: Liberty Roundabout — Collision in progress', color: 'text-cyan-400' },
  { time: '11:44', type: 'emergency', text: 'Emergency mode auto-triggered: Flash flooding detected at Dehiwala (J07)', color: 'text-amber-400' },
];

export function TrafficDashboard() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [chartView, setChartView] = useState<'throughput' | 'delay'>('throughput');

  const activeIncidents = incidents.filter(i => i.status === 'Active');
  const overrideJunctions = junctions.filter(j => j.overrideActive);
  const degradedFeeds = junctions.reduce((sum, j) => sum + (j.cctvFeeds - j.cctvHealthy), 0);

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-white">Traffic Operations Dashboard</h1>
          <p className="text-xs text-slate-400 mt-0.5">Real-time monitoring · Colombo Smart Traffic Network</p>
        </div>
        <div className="flex items-center gap-3">
          <LiveIndicator label="LIVE" color="green" size="md" />
          <span className="text-xs text-slate-500 font-mono">14:32:14 · Monday, 7 Apr 2026</span>
          <button className="btn-secondary text-xs py-1.5 px-2.5">
            <RefreshCw className="w-3 h-3" />
            Refresh
          </button>
        </div>
      </div>

      <PageInfoBox
        title="Page Functionality — Traffic Operations Dashboard"
        description="This is the central command view for authorised traffic officers. It provides a real-time overview of all monitored junctions in the Colombo network, including live KPI metrics, active incidents, congestion trends, and recent system activity."
        points={[
          'KPI cards show active junctions, CCTV feeds, active incidents, average delay, and AI override rate',
          'Live junction grid displays per-junction congestion status and signal mode — click any row to drill into Junction Monitoring',
          'Charts visualise hourly throughput and 7-day congestion trends across the network',
          'Activity feed logs every override, incident, emergency activation, and AI alert in real time',
          'All data refreshes live — manual Refresh button triggers a full state reload',
        ]}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        <MetricCard
          label="Active Junctions"
          value={`${kpiSummary.activeJunctions}/${kpiSummary.totalJunctions}`}
          accent="green"
          icon={<Activity />}
          subtext="2 offline"
        />
        <MetricCard
          label="Active Incidents"
          value={activeIncidents.length}
          accent="red"
          icon={<AlertTriangle />}
          trend="up"
          trendValue="+1 vs yesterday"
          trendPositive={false}
          subtext="1 override active"
        />
        <MetricCard
          label="Avg Delay Reduction"
          value={kpiSummary.avgDelayReduction}
          unit="%"
          accent="cyan"
          icon={<TrendingDown />}
          trend="up"
          trendValue="+2.1% this week"
          trendPositive={true}
        />
        <MetricCard
          label="Throughput Gain"
          value={`+${kpiSummary.throughputGain}`}
          unit="%"
          accent="blue"
          icon={<Zap />}
          trend="up"
          trendValue="+0.8% vs AM peak"
          trendPositive={true}
        />
        <MetricCard
          label="CCTV Feeds"
          value={`${kpiSummary.cctvHealthy}/${kpiSummary.cctvFeeds}`}
          accent="purple"
          icon={<Camera />}
          subtext={degradedFeeds > 0 ? `${degradedFeeds} degraded` : 'All healthy'}
        />
        <MetricCard
          label="System Uptime"
          value={kpiSummary.systemUptime}
          unit="%"
          accent="green"
          icon={<Server />}
          subtext="30-day rolling"
        />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

        {/* Junction Grid — takes 2/3 */}
        <div className="xl:col-span-2 space-y-4">
          {/* Controls */}
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Live Junction Status</h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">{junctions.length} junctions</span>
              <div className="flex border border-brand-border rounded-lg overflow-hidden">
                {(['grid', 'list'] as const).map(v => (
                  <button key={v} onClick={() => setViewMode(v)}
                    className={clsx('px-2.5 py-1 text-xs transition-colors',
                      viewMode === v ? 'bg-brand-border text-white' : 'text-slate-500 hover:text-slate-300'
                    )}>
                    {v.charAt(0).toUpperCase() + v.slice(1)}
                  </button>
                ))}
              </div>
              <Link to="/platform/junctions" className="text-xs text-brand-cyan hover:text-cyan-300 flex items-center gap-1">
                All junctions <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {junctions.map(j => (
                <Link
                  key={j.id}
                  to={`/platform/junctions?j=${j.id}`}
                  className={clsx(
                    'panel p-4 border-l-4 hover:bg-brand-slate/50 transition-colors',
                    congestionBg[j.congestion]
                  )}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="text-xs font-mono text-slate-500">{j.id}</div>
                      <div className="text-sm font-semibold text-white leading-tight">{j.shortName}</div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <CongestionBadge level={j.congestion} />
                      {j.overrideActive && <span className="badge-amber text-[10px]">Override</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-2">
                    <div className="bg-brand-slate rounded p-1.5 text-center">
                      <div className="text-[10px] text-slate-500">Queue</div>
                      <div className="text-xs font-bold text-white">{j.queueLength}m</div>
                    </div>
                    <div className="bg-brand-slate rounded p-1.5 text-center">
                      <div className="text-[10px] text-slate-500">Delay</div>
                      <div className="text-xs font-bold text-white">{j.avgDelay}s</div>
                    </div>
                    <div className="bg-brand-slate rounded p-1.5 text-center">
                      <div className="text-[10px] text-slate-500">Veh/hr</div>
                      <div className="text-xs font-bold text-white">{j.throughput}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px]">
                    <SignalModeBadge mode={j.signalMode} />
                    <ControllerStatusBadge status={j.controllerStatus} />
                  </div>

                  {/* Congestion bar */}
                  <div className="mt-2 h-1 bg-brand-border rounded-full overflow-hidden">
                    <div
                      className={clsx('h-full rounded-full transition-all',
                        j.congestionPct > 80 ? 'bg-red-500' :
                        j.congestionPct > 60 ? 'bg-orange-500' :
                        j.congestionPct > 40 ? 'bg-amber-500' : 'bg-emerald-500'
                      )}
                      style={{ width: `${j.congestionPct}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5 text-right">{j.congestionPct}% congestion</div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="panel overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-brand-border bg-brand-slate/50">
                    {['ID', 'Junction', 'Congestion', 'Queue', 'Delay', 'Mode', 'Controller', 'Actions'].map(h => (
                      <th key={h} className="px-3 py-2.5 text-left text-[10px] text-slate-500 font-semibold uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {junctions.map(j => (
                    <tr key={j.id} className="table-row">
                      <td className="px-3 py-2.5 font-mono text-slate-500">{j.id}</td>
                      <td className="px-3 py-2.5">
                        <div className="text-white font-medium">{j.shortName}</div>
                        <div className="text-slate-500">{j.corridor}</div>
                      </td>
                      <td className="px-3 py-2.5"><CongestionBadge level={j.congestion} /></td>
                      <td className="px-3 py-2.5 text-white font-mono">{j.queueLength}m</td>
                      <td className="px-3 py-2.5 text-white font-mono">{j.avgDelay}s</td>
                      <td className="px-3 py-2.5"><SignalModeBadge mode={j.signalMode} /></td>
                      <td className="px-3 py-2.5"><ControllerStatusBadge status={j.controllerStatus} /></td>
                      <td className="px-3 py-2.5">
                        <Link to={`/platform/junctions?j=${j.id}`} className="text-brand-cyan hover:text-cyan-300 flex items-center gap-1">
                          View <ChevronRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Active Incidents */}
          <div className="panel p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                Active Incidents
              </h2>
              <Link to="/platform/incidents" className="text-xs text-brand-cyan hover:text-cyan-300 flex items-center gap-1">
                Manage <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {activeIncidents.map(inc => (
                <div key={inc.id} className={clsx(
                  'p-3 rounded-lg border-l-2 bg-brand-slate/50',
                  inc.severity === 'High' ? 'border-red-500' : 'border-amber-500'
                )}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-slate-500">{inc.id}</span>
                    <span className={clsx('text-[10px] font-bold',
                      inc.severity === 'High' ? 'text-red-400' : 'text-amber-400'
                    )}>{inc.severity}</span>
                  </div>
                  <div className="text-xs font-medium text-white mb-0.5">{inc.type}</div>
                  <div className="text-[10px] text-slate-400 leading-relaxed line-clamp-2">{inc.location}</div>
                  {inc.overrideTriggered && (
                    <div className="mt-1.5 flex items-center gap-1 text-[10px] text-amber-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 live-pulse" />
                      Override active
                    </div>
                  )}
                </div>
              ))}
            </div>
            <Link to="/platform/incidents" className="mt-3 block btn-secondary text-xs justify-center py-2">
              <AlertTriangle className="w-3.5 h-3.5" />
              Create Incident
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="panel p-4">
            <h2 className="text-sm font-semibold text-white mb-3">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/platform/emergency" className="btn-danger text-xs py-2 justify-center">
                <Siren className="w-3.5 h-3.5" />
                Emergency Priority
              </Link>
              <Link to="/platform/incidents" className="btn-amber text-xs py-2 justify-center">
                <AlertTriangle className="w-3.5 h-3.5" />
                Log Incident
              </Link>
              <Link to="/platform/cctv" className="btn-secondary text-xs py-2 justify-center">
                <Camera className="w-3.5 h-3.5" />
                CCTV Monitor
              </Link>
              <Link to="/platform/reports" className="btn-secondary text-xs py-2 justify-center">
                <Activity className="w-3.5 h-3.5" />
                View Reports
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="panel p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-white">Recent Activity</h2>
              <Link to="/platform/audit" className="text-xs text-brand-cyan hover:text-cyan-300 flex items-center gap-1">
                Full log <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-2.5 max-h-64 overflow-y-auto">
              {recentActivity.map((a, i) => (
                <div key={i} className="flex gap-2.5 text-xs">
                  <span className="text-slate-600 font-mono flex-shrink-0 mt-0.5 w-10">{a.time}</span>
                  <p className={clsx('leading-relaxed', a.color)}>{a.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Traffic Chart */}
        <div className="panel p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">Corridor Throughput — Today</h2>
            <div className="flex border border-brand-border rounded-lg overflow-hidden">
              {(['throughput', 'delay'] as const).map(v => (
                <button key={v} onClick={() => setChartView(v)}
                  className={clsx('px-2.5 py-1 text-xs transition-colors',
                    chartView === v ? 'bg-brand-border text-white' : 'text-slate-500 hover:text-slate-300'
                  )}>
                  {v === 'throughput' ? 'Throughput' : '7-Day Delay'}
                </button>
              ))}
            </div>
          </div>
          {chartView === 'throughput' ? (
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={hourlyThroughput.slice(0, 14)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ background: '#162236', border: '1px solid #1E3A5F', borderRadius: 8, fontSize: 11 }} />
                <Legend />
                <Area type="monotone" dataKey="galle" stroke="#00C8E8" fill="#00C8E8" fillOpacity={0.1} name="Galle Rd" strokeWidth={1.5} />
                <Area type="monotone" dataKey="maradana" stroke="#1D6FEB" fill="#1D6FEB" fillOpacity={0.1} name="Maradana" strokeWidth={1.5} />
                <Area type="monotone" dataKey="highLevel" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.1} name="High Level" strokeWidth={1.5} />
                <Area type="monotone" dataKey="borella" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.1} name="Borella" strokeWidth={1.5} />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={congestionTrend7Day}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ background: '#162236', border: '1px solid #1E3A5F', borderRadius: 8, fontSize: 11 }} />
                <Legend />
                <Bar dataKey="avgDelay" name="Avg Delay (s)" fill="#00C8E8" radius={[3, 3, 0, 0]} />
                <Bar dataKey="peakDelay" name="Peak Delay (s)" fill="#EF4444" radius={[3, 3, 0, 0]} fillOpacity={0.7} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* System Health */}
        <div className="panel p-5">
          <h2 className="text-sm font-semibold text-white mb-4">System Health Overview</h2>
          <div className="space-y-3 mb-4">
            {[
              { label: 'AI Optimisation Engine', status: 'Operational', value: 100, color: 'bg-emerald-500' },
              { label: 'Junction Controller Network', status: 'Operational', value: 100, color: 'bg-emerald-500' },
              { label: 'CCTV Detection Layer', status: 'Degraded (2 feeds offline)', value: 95, color: 'bg-amber-500' },
              { label: 'Public Data Feed', status: 'Operational', value: 100, color: 'bg-emerald-500' },
              { label: 'Audit & Logging System', status: 'Operational', value: 100, color: 'bg-emerald-500' },
              { label: 'Emergency Override Channel', status: 'Operational', value: 100, color: 'bg-emerald-500' },
            ].map(s => (
              <div key={s.label}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-300">{s.label}</span>
                  <span className={s.value >= 100 ? 'text-emerald-400' : s.value >= 90 ? 'text-amber-400' : 'text-red-400'}>
                    {s.status}
                  </span>
                </div>
                <div className="h-1 bg-brand-border rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.value}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-brand-border">
            {[
              { label: 'Avg Latency', value: '44ms', color: 'text-emerald-400' },
              { label: 'Commands/min', value: '186', color: 'text-brand-cyan' },
              { label: 'Uptime', value: '99.7%', color: 'text-blue-400' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className={`text-lg font-bold font-mono ${s.color}`}>{s.value}</div>
                <div className="text-[10px] text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
