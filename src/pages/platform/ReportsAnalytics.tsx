import { useState } from 'react';
import { congestionTrend7Day, overrideFrequency, junctionPerformance, hourlyThroughput, kpiSummary } from '../../data/metrics';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { BarChart3, Download, Filter, Calendar, TrendingUp, TrendingDown, Activity, AlertTriangle, Zap, ChevronDown } from 'lucide-react';
import { PageInfoBox } from '../../components/ui/PageInfoBox';
import clsx from 'clsx';

const exportFormats = ['PDF Report', 'CSV Data', 'Excel Workbook'];

export function ReportsAnalytics() {
  const [dateRange, setDateRange] = useState('7d');
  const [corridor, setCorridor] = useState('all');
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <div className="space-y-5">
      {/* Header */}
      <PageInfoBox
        title="Page Functionality — Reports & Analytics"
        description="Provides traffic administrators with exportable performance reports, KPI summaries, and trend visualisations across the network. Data can be filtered by date range and corridor, and exported in PDF, CSV, or Excel format for government reporting."
        points={[
          'KPI summary: delay reduction, throughput improvement, incidents resolved, and AI accuracy rate',
          'Congestion trend chart: 7-day corridor-level congestion index across the network',
          'Junction performance radar: comparative per-junction efficiency across key metrics',
          'Override frequency chart: bar chart of manual overrides per junction — supports accountability review',
          'Export controls: generate PDF reports, CSV data exports, or Excel workbooks with selected date range',
        ]}
      />

      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-white">Reports & Analytics</h1>
          <p className="text-xs text-slate-400 mt-0.5">Network performance · KPI tracking · Exportable intelligence reports</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              className="select text-xs pr-8 pl-3 py-1.5"
              value={dateRange}
              onChange={e => setDateRange(e.target.value)}
            >
              <option value="1d">Today</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last Quarter</option>
            </select>
          </div>
          <select className="select text-xs py-1.5" value={corridor} onChange={e => setCorridor(e.target.value)}>
            <option value="all">All Corridors</option>
            <option>Galle Road Corridor</option>
            <option>Maradana–Pettah</option>
            <option>High Level Road</option>
            <option>Borella–Maradana</option>
          </select>
          <div className="relative group">
            <button className="btn-secondary text-xs py-1.5">
              <Download className="w-3.5 h-3.5" />
              Export
              <ChevronDown className="w-3 h-3" />
            </button>
            <div className="absolute right-0 top-full mt-1 w-44 panel-sm py-1 z-10 hidden group-hover:block animate-fade-up">
              {exportFormats.map(f => (
                <button key={f} className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-white/5 hover:text-white transition-colors">
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="flex border-b border-brand-border">
        {[
          { id: 'overview', label: 'Network Overview' },
          { id: 'congestion', label: 'Congestion Trends' },
          { id: 'performance', label: 'Junction Performance' },
          { id: 'overrides', label: 'Override Analysis' },
          { id: 'system', label: 'System Health' },
        ].map(s => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={clsx(
              'px-4 py-2.5 text-xs font-medium border-b-2 transition-colors -mb-px whitespace-nowrap',
              activeSection === s.id
                ? 'border-brand-cyan text-brand-cyan'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* KPI Summary (always visible) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Avg Delay Reduction', value: `${kpiSummary.avgDelayReduction}%`, trend: '↑ 2.1% vs prev week', color: 'text-emerald-400', icon: TrendingDown },
          { label: 'Throughput Gain', value: `+${kpiSummary.throughputGain}%`, trend: '↑ 0.8% vs prev week', color: 'text-brand-cyan', icon: TrendingUp },
          { label: 'Override Events (7d)', value: '44', trend: '↓ 3 vs prev week', color: 'text-amber-400', icon: Zap },
          { label: 'Incidents Managed', value: incidents7d.toString(), trend: '↓ 2 vs prev week', color: 'text-blue-400', icon: AlertTriangle },
        ].map(k => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="panel p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="metric-label">{k.label}</span>
                <Icon className={`w-4 h-4 ${k.color}`} />
              </div>
              <div className={`text-2xl font-bold font-mono ${k.color} mb-1`}>{k.value}</div>
              <div className="text-[10px] text-slate-500">{k.trend}</div>
            </div>
          );
        })}
      </div>

      {activeSection === 'overview' && (
        <div className="space-y-5 animate-fade-up">
          {/* Throughput Chart */}
          <div className="panel p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-white">Hourly Throughput by Corridor — Today</h2>
              <span className="text-xs text-slate-500">Vehicles per hour</span>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={hourlyThroughput}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ background: '#162236', border: '1px solid #1E3A5F', borderRadius: 8, fontSize: 11 }} />
                <Legend />
                <Area type="monotone" dataKey="galle" stroke="#00C8E8" fill="#00C8E8" fillOpacity={0.1} name="Galle Road" strokeWidth={2} />
                <Area type="monotone" dataKey="maradana" stroke="#1D6FEB" fill="#1D6FEB" fillOpacity={0.1} name="Maradana–Pettah" strokeWidth={2} />
                <Area type="monotone" dataKey="highLevel" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.1} name="High Level Rd" strokeWidth={2} />
                <Area type="monotone" dataKey="borella" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.1} name="Borella–Maradana" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Junction Performance Table */}
          <div className="panel overflow-hidden">
            <div className="p-4 border-b border-brand-border flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">Junction Performance Summary</h2>
              <span className="text-xs text-slate-500">7-day period</span>
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-brand-border bg-brand-slate/50">
                  {['Junction', 'Delay Reduction', 'Throughput Gain', 'Override Count', 'Rating'].map(h => (
                    <th key={h} className="px-4 py-2.5 text-left text-[10px] text-slate-500 font-semibold uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {junctionPerformance.map(j => (
                  <tr key={j.junction} className="table-row">
                    <td className="px-4 py-2.5 font-medium text-slate-200">{j.junction}</td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 bg-brand-border rounded-full w-20 overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${j.delayReduction * 4}%` }} />
                        </div>
                        <span className="text-emerald-400 font-bold">{j.delayReduction}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-brand-cyan font-bold">+{j.throughputGain}%</td>
                    <td className="px-4 py-2.5">
                      <span className={clsx('font-bold',
                        j.overrides > 8 ? 'text-red-400' : j.overrides > 4 ? 'text-amber-400' : 'text-slate-300'
                      )}>{j.overrides}</span>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className={clsx(
                        j.delayReduction >= 18 ? 'badge-green' : j.delayReduction >= 12 ? 'badge-amber' : 'badge-red'
                      )}>
                        {j.delayReduction >= 18 ? 'Excellent' : j.delayReduction >= 12 ? 'Good' : 'Review Required'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeSection === 'congestion' && (
        <div className="space-y-5 animate-fade-up">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="panel p-5">
              <h2 className="text-sm font-semibold text-white mb-4">7-Day Average & Peak Delay</h2>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={congestionTrend7Day}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} unit="s" />
                  <Tooltip contentStyle={{ background: '#162236', border: '1px solid #1E3A5F', borderRadius: 8, fontSize: 11 }} />
                  <Legend />
                  <Bar dataKey="avgDelay" name="Avg Delay (s)" fill="#00C8E8" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="peakDelay" name="Peak Delay (s)" fill="#EF4444" radius={[3, 3, 0, 0]} fillOpacity={0.7} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="panel p-5">
              <h2 className="text-sm font-semibold text-white mb-4">Daily Incident Count (7d)</h2>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={congestionTrend7Day}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} allowDecimals={false} />
                  <Tooltip contentStyle={{ background: '#162236', border: '1px solid #1E3A5F', borderRadius: 8, fontSize: 11 }} />
                  <Line type="monotone" dataKey="incidents" stroke="#F59E0B" strokeWidth={2.5} dot={{ r: 4, fill: '#F59E0B' }} name="Incidents" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'performance' && (
        <div className="space-y-5 animate-fade-up">
          <div className="panel p-5">
            <h2 className="text-sm font-semibold text-white mb-4">Junction Delay Reduction vs Throughput Gain</h2>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={junctionPerformance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tick={{ fontSize: 10 }} unit="%" />
                <YAxis type="category" dataKey="junction" tick={{ fontSize: 9 }} width={90} />
                <Tooltip contentStyle={{ background: '#162236', border: '1px solid #1E3A5F', borderRadius: 8, fontSize: 11 }} />
                <Legend />
                <Bar dataKey="delayReduction" name="Delay Reduction %" fill="#10B981" radius={[0, 3, 3, 0]} />
                <Bar dataKey="throughputGain" name="Throughput Gain %" fill="#00C8E8" radius={[0, 3, 3, 0]} fillOpacity={0.8} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeSection === 'overrides' && (
        <div className="space-y-5 animate-fade-up">
          <div className="panel p-5">
            <h2 className="text-sm font-semibold text-white mb-4">Override Frequency by Type (Weekly)</h2>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={overrideFrequency}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ background: '#162236', border: '1px solid #1E3A5F', borderRadius: 8, fontSize: 11 }} />
                <Legend />
                <Bar dataKey="manual" name="Manual Override" fill="#F59E0B" radius={[3, 3, 0, 0]} />
                <Bar dataKey="emergency" name="Emergency Priority" fill="#EF4444" radius={[3, 3, 0, 0]} />
                <Bar dataKey="emergency_vip" name="VIP Movement" fill="#8B5CF6" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeSection === 'system' && (
        <div className="space-y-5 animate-fade-up">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Platform Uptime', value: '99.7%', subtext: '30-day rolling average', color: 'text-emerald-400' },
              { label: 'Avg Command Latency', value: '44ms', subtext: 'Dashboard → controller end-to-end', color: 'text-brand-cyan' },
              { label: 'CCTV Feed Availability', value: '95.5%', subtext: '42 of 44 feeds currently healthy', color: 'text-blue-400' },
            ].map(s => (
              <div key={s.label} className="panel p-5 text-center">
                <div className={`text-4xl font-bold font-mono mb-1 ${s.color}`}>{s.value}</div>
                <div className="text-sm font-semibold text-white mb-1">{s.label}</div>
                <div className="text-xs text-slate-500">{s.subtext}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const incidents7d = 16;
