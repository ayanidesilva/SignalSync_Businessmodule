import { useState } from 'react';
import { routeScenarios, presetOrigins, presetDestinations } from '../../data/routes';
import { Navigation, Clock, AlertTriangle, CheckCircle, Info, ArrowRight, MapPin, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

const congestionColors = {
  Low: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  Moderate: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  High: 'text-red-400 bg-red-500/10 border-red-500/20',
};

export function RouteGuidance() {
  const [origin, setOrigin] = useState('Dehiwala');
  const [destination, setDestination] = useState('Fort (Colombo 01)');
  const [searched, setSearched] = useState(true);

  const scenario = routeScenarios.find(
    r => r.origin === origin && r.destination === destination
  );

  const handleSearch = () => setSearched(true);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="section-heading mb-1">Public Route Intelligence</div>
        <h1 className="text-2xl font-bold text-white mb-2">Route Guidance</h1>
        <p className="text-sm text-slate-400">
          AI-assisted route recommendations based on real-time congestion data across Colombo's monitored corridors.
        </p>
      </div>

      {/* Simulation Notice */}
      <div className="flex items-start gap-2 p-3 panel-sm border-l-4 border-brand-cyan mb-6">
        <Info className="w-4 h-4 text-brand-cyan flex-shrink-0 mt-0.5" />
        <div className="text-xs text-slate-400">
          <strong className="text-brand-cyan">Prototype simulation:</strong> This route guidance interface demonstrates how SignalSync would provide AI-ranked route recommendations based on live congestion data. Select from the preset origin/destination pairs to view sample route options.
        </div>
      </div>

      {/* Search form */}
      <div className="panel p-5 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div>
            <label className="label flex items-center gap-1">
              <MapPin className="w-3 h-3" /> Origin
            </label>
            <select
              value={origin}
              onChange={e => { setOrigin(e.target.value); setSearched(false); }}
              className="select"
            >
              {presetOrigins.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="label flex items-center gap-1">
              <Navigation className="w-3 h-3" /> Destination
            </label>
            <select
              value={destination}
              onChange={e => { setDestination(e.target.value); setSearched(false); }}
              className="select"
            >
              {presetDestinations.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <button onClick={handleSearch} className="btn-primary justify-center py-2.5">
            <Navigation className="w-4 h-4" />
            Find Routes
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Quick presets */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-xs text-slate-500 mr-1">Quick select:</span>
          {routeScenarios.map(s => (
            <button
              key={s.origin + s.destination}
              onClick={() => { setOrigin(s.origin); setDestination(s.destination); setSearched(true); }}
              className="px-2.5 py-1 text-xs border border-brand-border rounded-md text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors"
            >
              {s.origin} → {s.destination.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {searched && (
        <div className="animate-fade-up">
          {scenario ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-white">
                  {scenario.routes.length} route{scenario.routes.length !== 1 ? 's' : ''} found — <span className="text-slate-400">{origin}</span> <ArrowRight className="inline w-3 h-3" /> <span className="text-slate-400">{destination}</span>
                </h2>
                <span className="text-xs text-slate-500">Based on live data · 14:32</span>
              </div>

              <div className="space-y-4">
                {scenario.routes.map(route => (
                  <div key={route.id} className={clsx(
                    'panel p-5 relative',
                    route.recommended && 'border-brand-cyan/30 glow-cyan'
                  )}>
                    {route.recommended && (
                      <div className="absolute top-4 right-4">
                        <span className="badge-cyan text-xs">Recommended</span>
                      </div>
                    )}

                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={clsx(
                        'w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0',
                        route.recommended ? 'bg-brand-cyan/15 border-brand-cyan/30' : 'bg-brand-slate border-brand-border'
                      )}>
                        <Navigation className={clsx('w-5 h-5', route.recommended ? 'text-brand-cyan' : 'text-slate-400')} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-white mb-1">{route.label}</h3>

                        {/* Route path */}
                        <div className="flex items-center gap-1 flex-wrap mb-3">
                          {route.via.map((point, i) => (
                            <span key={point} className="flex items-center gap-1">
                              <span className="text-xs text-slate-400">{point}</span>
                              {i < route.via.length - 1 && <ChevronRight className="w-3 h-3 text-slate-600" />}
                            </span>
                          ))}
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-4 mb-3">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-slate-500" />
                            <span className={clsx('text-sm font-bold', route.recommended ? 'text-brand-cyan' : 'text-white')}>
                              ~{route.estimatedMins} min
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-slate-500" />
                            <span className="text-sm text-slate-300">{route.distanceKm} km</span>
                          </div>
                          <div className={clsx('text-xs font-medium px-2 py-0.5 rounded border', congestionColors[route.congestionLevel])}>
                            {route.congestionLevel} Congestion
                          </div>
                        </div>

                        {/* Reason */}
                        <div className={clsx(
                          'flex items-start gap-2 text-xs p-2.5 rounded-lg',
                          route.recommended ? 'bg-brand-cyan/5 border border-brand-cyan/15 text-brand-cyan' : 'bg-brand-slate text-slate-400'
                        )}>
                          {route.recommended
                            ? <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                            : <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />}
                          <span>{route.reason}</span>
                        </div>

                        {/* Active incidents on route */}
                        {route.incidents.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            <span className="text-xs text-slate-500">Active incidents:</span>
                            {route.incidents.map(i => (
                              <span key={i} className="badge-red text-[10px]">{i}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Time-saving note */}
              {scenario.routes.length >= 2 && (
                <div className="mt-4 p-3 panel-sm border-l-4 border-emerald-500 text-xs text-slate-400">
                  <strong className="text-emerald-400">Time saving:</strong> Recommended route saves approximately{' '}
                  <strong className="text-white">
                    {Math.abs(scenario.routes[1].estimatedMins - scenario.routes[0].estimatedMins)} minutes
                  </strong>{' '}
                  vs. the standard route based on current conditions.
                </div>
              )}
            </div>
          ) : (
            <div className="panel p-10 text-center">
              <Navigation className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <h3 className="text-sm font-semibold text-white mb-1">No route data for this combination</h3>
              <p className="text-xs text-slate-400">
                Try one of the preset origin/destination pairs above to see route recommendations.
              </p>
            </div>
          )}
        </div>
      )}

      {/* How it works note */}
      <div className="mt-8 panel p-5">
        <div className="section-heading mb-3">How route guidance works</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Navigation, title: 'Live Data Input', desc: 'Route recommendations are based on real-time congestion levels, active incidents, and signal states across the monitored junction network.' },
            { icon: CheckCircle, title: 'AI Ranking', desc: 'The SignalSync engine ranks routes by estimated travel time, factoring in queue lengths, override states, and reported incident clearance times.' },
            { icon: AlertTriangle, title: 'Incident Awareness', desc: 'Routes affected by active incidents are flagged and de-prioritised. Advisory notes explain why a route is or is not recommended.' },
          ].map(item => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex gap-3">
                <Icon className="w-4 h-4 text-brand-cyan flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-white mb-1">{item.title}</div>
                  <div className="text-xs text-slate-400 leading-relaxed">{item.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
