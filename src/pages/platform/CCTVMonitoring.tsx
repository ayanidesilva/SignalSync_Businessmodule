import { useState } from 'react';
import { cctvFeeds } from '../../data/cctv';
import { FeedHealthBadge, DetectionStatusBadge } from '../../components/ui/Badge';
import { LiveIndicator } from '../../components/ui/LiveIndicator';
import { Camera, AlertTriangle, CheckCircle, Info, Activity, Filter, Wifi, WifiOff, Settings, Eye, Shield } from 'lucide-react';
import { PageInfoBox } from '../../components/ui/PageInfoBox';
import clsx from 'clsx';

const healthSummary = {
  stable: cctvFeeds.filter(f => f.health === 'Stable').length,
  degraded: cctvFeeds.filter(f => f.health === 'Degraded').length,
  offline: cctvFeeds.filter(f => f.health === 'Offline').length,
  calibrating: cctvFeeds.filter(f => f.health === 'Calibrating').length,
};

export function CCTVMonitoring() {
  const [selectedFeed, setSelectedFeed] = useState<string | null>('CAM-J01-01');
  const [filterHealth, setFilterHealth] = useState<string>('all');
  const [showOnlyIssues, setShowOnlyIssues] = useState(false);

  const filtered = cctvFeeds.filter(f => {
    if (showOnlyIssues) return f.health !== 'Stable';
    if (filterHealth === 'all') return true;
    return f.health === filterHealth;
  });

  const feed = cctvFeeds.find(f => f.id === selectedFeed);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-white">CCTV Detection Monitoring</h1>
          <p className="text-xs text-slate-400 mt-0.5">AI detection layer · Camera feed health · Calibration status</p>
        </div>
        <div className="flex items-center gap-3">
          <LiveIndicator label="LIVE" color="cyan" />
          <span className="text-xs text-slate-500 font-mono">14:32:14</span>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="flex items-start gap-2.5 p-3 panel-sm border-l-4 border-blue-500">
        <Shield className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-slate-400">
          <strong className="text-blue-400">Privacy by Design:</strong> Raw CCTV footage is processed at the edge and is not stored in this system. SignalSync retains only anonymised detection metadata (vehicle count, queue estimate, congestion level). No individual or vehicle identification is performed or retained.
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Stable Feeds', value: healthSummary.stable, color: 'text-emerald-400', bg: 'border-emerald-500/20 bg-emerald-500/5' },
          { label: 'Degraded', value: healthSummary.degraded, color: 'text-amber-400', bg: 'border-amber-500/20 bg-amber-500/5' },
          { label: 'Offline', value: healthSummary.offline, color: 'text-red-400', bg: 'border-red-500/20 bg-red-500/5' },
          { label: 'Calibrating', value: healthSummary.calibrating, color: 'text-blue-400', bg: 'border-blue-500/20 bg-blue-500/5' },
        ].map(s => (
          <div key={s.label} className={`panel-sm border p-4 text-center ${s.bg}`}>
            <div className={`text-2xl font-bold font-mono ${s.color}`}>{s.value}</div>
            <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <Filter className="w-3.5 h-3.5 text-slate-500" />
        {['all', 'Stable', 'Degraded', 'Offline', 'Calibrating'].map(h => (
          <button key={h} onClick={() => { setFilterHealth(h); setShowOnlyIssues(false); }}
            className={clsx('px-2.5 py-1 rounded-md text-xs font-medium border transition-colors',
              filterHealth === h && !showOnlyIssues ? 'bg-brand-cyan/15 text-brand-cyan border-brand-cyan/30' : 'text-slate-400 border-brand-border hover:bg-white/5'
            )}>
            {h === 'all' ? 'All Feeds' : h}
          </button>
        ))}
        <button onClick={() => { setShowOnlyIssues(v => !v); setFilterHealth('all'); }}
          className={clsx('px-2.5 py-1 rounded-md text-xs font-medium border transition-colors',
            showOnlyIssues ? 'bg-amber-500/15 text-amber-400 border-amber-500/30' : 'text-slate-400 border-brand-border hover:bg-white/5'
          )}>
          Issues Only
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Feed Grid */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filtered.map(f => (
              <button
                key={f.id}
                onClick={() => setSelectedFeed(f.id)}
                className={clsx(
                  'text-left panel p-4 transition-all hover:border-brand-border/80',
                  selectedFeed === f.id && 'border-brand-cyan/40 bg-brand-cyan/5',
                  f.health === 'Offline' && 'opacity-70',
                  f.health === 'Degraded' && 'border-amber-500/20'
                )}
              >
                {/* Simulated camera view */}
                <div className={clsx(
                  'w-full h-28 rounded-lg mb-3 relative overflow-hidden flex items-center justify-center',
                  f.health === 'Stable' ? 'bg-slate-800' :
                  f.health === 'Degraded' ? 'bg-slate-900' :
                  f.health === 'Calibrating' ? 'bg-slate-900' : 'bg-slate-950'
                )}>
                  {/* Simulated video feed look */}
                  {f.health !== 'Offline' ? (
                    <>
                      <div className="absolute inset-0 bg-grid opacity-20" />
                      {/* Simulated detection boxes */}
                      {f.health === 'Stable' && f.vehicleCount > 0 && (
                        <>
                          <div className="absolute top-3 left-4 w-8 h-5 border border-emerald-400/60 rounded-sm" />
                          <div className="absolute top-5 left-14 w-7 h-5 border border-emerald-400/60 rounded-sm" />
                          <div className="absolute top-8 left-24 w-9 h-5 border border-emerald-400/60 rounded-sm" />
                          {f.vehicleCount > 10 && (
                            <>
                              <div className="absolute top-4 right-8 w-8 h-5 border border-amber-400/50 rounded-sm" />
                              <div className="absolute top-8 right-16 w-6 h-4 border border-emerald-400/60 rounded-sm" />
                            </>
                          )}
                        </>
                      )}
                      {f.health === 'Degraded' && (
                        <div className="absolute inset-0 bg-amber-900/20 flex items-center justify-center">
                          <div className="text-[10px] text-amber-400 text-center">
                            <AlertTriangle className="w-4 h-4 mx-auto mb-1" />
                            Degraded Signal
                          </div>
                        </div>
                      )}
                      {f.health === 'Calibrating' && (
                        <div className="absolute inset-0 bg-blue-900/20 flex items-center justify-center">
                          <div className="text-[10px] text-blue-400 text-center">
                            <Settings className="w-4 h-4 mx-auto mb-1 animate-spin" style={{ animationDuration: '3s' }} />
                            Calibrating…
                          </div>
                        </div>
                      )}
                      {/* Detection overlay info */}
                      <div className="absolute bottom-0 left-0 right-0 px-2 py-1 bg-black/60 flex items-center justify-between text-[9px] font-mono">
                        <span className="text-emerald-400">{f.vehicleCount} vehicles</span>
                        <span className="text-slate-400">Queue: {f.queueEstimate}m</span>
                        <span className={clsx(f.confidence >= 90 ? 'text-emerald-400' : f.confidence >= 70 ? 'text-amber-400' : 'text-red-400')}>
                          {f.confidence}%
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <WifiOff className="w-6 h-6 text-red-400/60" />
                      <span className="text-[10px] text-red-400">Feed Offline</span>
                    </div>
                  )}
                  {/* Live indicator */}
                  {f.health === 'Stable' && (
                    <div className="absolute top-2 right-2 flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 live-pulse" />
                      <span className="text-[9px] text-white font-bold uppercase">Live</span>
                    </div>
                  )}
                </div>

                {/* Feed info */}
                <div className="flex items-start justify-between mb-1.5">
                  <div>
                    <div className="text-xs font-semibold text-white">{f.label}</div>
                    <div className="text-[10px] text-slate-400">{f.direction}</div>
                  </div>
                  <FeedHealthBadge health={f.health} />
                </div>
                <div className="text-[10px] text-slate-500 truncate">{f.junctionName}</div>

                {/* Confidence bar */}
                {f.health !== 'Offline' && (
                  <div className="mt-2 h-1 bg-brand-border rounded-full overflow-hidden">
                    <div
                      className={clsx('h-full rounded-full',
                        f.confidence >= 90 ? 'bg-emerald-500' : f.confidence >= 70 ? 'bg-amber-500' : 'bg-red-500'
                      )}
                      style={{ width: `${f.confidence}%` }}
                    />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Feed Detail Panel */}
        <div className="space-y-4">
          {feed ? (
            <>
              <div className="panel p-4">
                <div className="section-heading mb-2">Feed Detail</div>
                <h3 className="text-sm font-semibold text-white mb-0.5">{feed.label}</h3>
                <div className="text-xs text-slate-400 mb-4">{feed.junctionName} — {feed.direction}</div>

                <div className="space-y-2 text-xs">
                  {[
                    { label: 'Health', value: <FeedHealthBadge health={feed.health} /> },
                    { label: 'Detection', value: <DetectionStatusBadge status={feed.detectionStatus} /> },
                    { label: 'Confidence', value: `${feed.confidence}%` },
                    { label: 'Queue Estimate', value: `${feed.queueEstimate}m` },
                    { label: 'Vehicle Count', value: `${feed.vehicleCount}` },
                    { label: 'Resolution', value: feed.resolution },
                    { label: 'IP Address', value: feed.ip },
                    { label: 'Last Frame', value: feed.lastFrame },
                    { label: 'Calibrated', value: feed.calibratedAt },
                  ].map(d => (
                    <div key={d.label} className="flex items-center justify-between">
                      <span className="text-slate-400">{d.label}</span>
                      <span className="text-slate-200 font-medium text-right">{d.value}</span>
                    </div>
                  ))}
                </div>

                {feed.notes && (
                  <div className="mt-3 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
                    <strong>Note:</strong> {feed.notes}
                  </div>
                )}
              </div>

              <div className="panel p-4">
                <div className="section-heading mb-3">Detection Confidence Trend</div>
                <div className="space-y-2">
                  {['Last 1 hour', 'Last 4 hours', 'Today avg', '7-day avg'].map((p, i) => {
                    const val = Math.max(0, feed.confidence - i * 3 + Math.random() * 4 - 2);
                    return (
                      <div key={p}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-400">{p}</span>
                          <span className={clsx(val >= 90 ? 'text-emerald-400' : val >= 70 ? 'text-amber-400' : 'text-red-400')}>
                            {Math.round(val)}%
                          </span>
                        </div>
                        <div className="h-1 bg-brand-border rounded-full overflow-hidden">
                          <div
                            className={clsx('h-full rounded-full', val >= 90 ? 'bg-emerald-500' : val >= 70 ? 'bg-amber-500' : 'bg-red-500')}
                            style={{ width: `${val}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="panel p-4">
                <div className="section-heading mb-3">Actions</div>
                <div className="space-y-2">
                  <button className="w-full btn-secondary text-xs py-2 justify-center">
                    <Settings className="w-3.5 h-3.5" />
                    Request Recalibration
                  </button>
                  <button className="w-full btn-secondary text-xs py-2 justify-center">
                    <Activity className="w-3.5 h-3.5" />
                    Run Diagnostic
                  </button>
                  {feed.health === 'Offline' && (
                    <button className="w-full btn-amber text-xs py-2 justify-center">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Raise Maintenance Request
                    </button>
                  )}
                </div>
                <p className="text-[10px] text-slate-600 mt-2">Calibration actions are logged to the audit trail and assigned to a field technician.</p>
              </div>
            </>
          ) : (
            <div className="panel p-8 text-center">
              <Camera className="w-8 h-8 text-slate-600 mx-auto mb-3" />
              <p className="text-sm text-slate-400">Select a camera feed to view details</p>
            </div>
          )}
        </div>
      </div>

      <PageInfoBox
        title="Page Functionality — CCTV Detection Monitoring"
        description="Displays the health and AI detection output of every CCTV feed connected to the SignalSync platform. Technicians use this page to monitor camera status, review detection confidence, and flag feeds for recalibration."
        points={[
          'Feed grid: shows all cameras with health status (Stable / Degraded / Offline / Calibrating)',
          'Filter controls: narrow by health status or show only feeds with issues',
          'Detail panel: click any feed to see live detection output — vehicle count, queue estimate, congestion level, and confidence score',
          'Calibration flag: mark a feed for technician review directly from the detail panel',
          'Privacy-by-design: only anonymised detection metadata is shown — no raw footage is stored or displayed',
        ]}
      />
    </div>
  );
}
