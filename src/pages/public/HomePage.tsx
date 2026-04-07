import { Link } from 'react-router-dom';
import { PageInfoBox } from '../../components/ui/PageInfoBox';
import {
  Activity, ArrowRight, ChevronRight, Camera, Brain, Zap, Shield,
  Users, BarChart3, Globe, CheckCircle, AlertTriangle, Map, Navigation,
  Clock, TrendingDown, TrendingUp, Server, Lock, Eye, Layers,
} from 'lucide-react';

const problems = [
  { stat: '3.2 hrs', label: 'Average commuter time lost per day in Colombo peak hour', icon: Clock },
  { stat: '42%', label: 'Of junctions still operating on fixed-time signal cycles (2024)', icon: Zap },
  { stat: 'LKR 48B', label: 'Estimated annual economic cost of traffic congestion to Sri Lanka', icon: TrendingDown },
  { stat: '0 adaptive', label: 'Junctions with real-time AI-based signal control before SignalSync', icon: Brain },
];

const modules = [
  {
    icon: Camera, title: 'CCTV Intelligence Layer',
    desc: 'Leverages existing CCTV infrastructure. Computer vision analyses vehicle density, queue build-up, and congestion in real time across all connected junctions.',
    tag: 'Infrastructure-Light',
  },
  {
    icon: Brain, title: 'AI Optimisation Engine',
    desc: 'Replaces fixed-time cycles with demand-responsive signal plans. Automatically adjusts green phases based on live traffic, reducing unnecessary waiting.',
    tag: 'Real-Time Adaptive',
  },
  {
    icon: Activity, title: 'Traffic Operations Dashboard',
    desc: 'Centralised command view for authorised traffic officers. Live junction status, congestion heat maps, incident alerts, and system health — all in one interface.',
    tag: 'Command & Control',
  },
  {
    icon: AlertTriangle, title: 'Incident & Override Control',
    desc: 'Create incidents, trigger manual overrides, and activate emergency priority corridors. Authorised officers retain full human-in-the-loop control at all times.',
    tag: 'Human-In-The-Loop',
  },
  {
    icon: Globe, title: 'Public Traffic Intelligence',
    desc: 'Road users receive real-time congestion maps, incident alerts, and route guidance. Transparent public information builds trust and reduces unnecessary journeys.',
    tag: 'Public-Facing',
  },
  {
    icon: Shield, title: 'Governance & Audit Framework',
    desc: 'Every override, incident, and rule change is logged with operator identity, timestamp, and outcome. Role-based access ensures accountability across all actions.',
    tag: 'Compliance-Ready',
  },
];

const authBenefits = [
  'Reduce average junction delay by 15–25% in pilot corridors',
  'Deploy using existing CCTV infrastructure — no new roadside hardware required',
  'Single dashboard view across all monitored junctions and corridors',
  'Maintain human override authority — the AI assists, officers decide',
  'Measurable KPIs exportable for government reporting and accountability',
  'Phased rollout from pilot corridor to city-wide scale',
  'Role-based access controls for police, traffic admins, field technicians',
  'Full audit trail for every operational action taken on the platform',
];

const publicBenefits = [
  'Real-time congestion status across Colombo corridors',
  'Incident alerts before you encounter them on the road',
  'Recommended alternate routes based on current traffic conditions',
  'Reduced overall wait time at monitored junctions',
  'Reliable public advisory updates during major incidents',
];

const phases = [
  {
    phase: '01', label: 'Pilot Corridor', timeline: 'Months 1–6',
    desc: 'Deploy on a single high-congestion corridor (e.g., Galle Road). Validate AI accuracy, signal integration, and dashboard performance with real traffic data.',
    junctions: '4–6 junctions',
  },
  {
    phase: '02', label: 'Expansion Zone', timeline: 'Months 7–18',
    desc: 'Extend to 2–3 additional corridors. Onboard police and traffic admin users. Activate public advisory feeds. Begin producing government-ready performance reports.',
    junctions: '14–20 junctions',
  },
  {
    phase: '03', label: 'City-Wide Scale', timeline: 'Year 2+',
    desc: 'Full Colombo deployment. Integration with National Transport Commission data. Inter-agency data sharing. Advanced predictive traffic modelling.',
    junctions: '50+ junctions',
  },
];

const metrics = [
  { value: '−18%', label: 'Average delay reduction at adaptive junctions', accent: 'text-emerald-400' },
  { value: '+11%', label: 'Peak corridor throughput improvement', accent: 'text-brand-cyan' },
  { value: '99.7%', label: 'Platform uptime across monitored junctions', accent: 'text-blue-400' },
  { value: '44', label: 'CCTV feeds integrated across 12 active junctions', accent: 'text-purple-400' },
  { value: '2.3×', label: 'Faster incident detection vs. manual monitoring', accent: 'text-amber-400' },
  { value: '<3s', label: 'Average signal override command latency', accent: 'text-emerald-400' },
];

export function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-navy/95 to-brand-navy" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-20">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-cyan/20 bg-brand-cyan/5 text-brand-cyan text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan live-pulse" />
            AI-Powered Smart Traffic · Colombo, Sri Lanka
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold text-white leading-tight tracking-tight max-w-4xl mb-6">
            Smarter Signals.<br />
            <span className="text-gradient-cyan">Faster Cities.</span><br />
            Safer Roads.
          </h1>

          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed mb-8">
            SignalSync replaces fixed-time traffic signals with real-time, AI-driven optimisation. Built for Colombo's road network. Designed for government deployment. Delivered through existing infrastructure.
          </p>

          <div className="flex flex-wrap gap-3 mb-16">
            <Link to="/platform/dashboard" className="btn-primary px-5 py-2.5 text-sm">
              <Activity className="w-4 h-4" />
              View Live Platform
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link to="/map" className="btn-secondary px-5 py-2.5 text-sm">
              <Map className="w-4 h-4" />
              Explore Traffic Map
            </Link>
            <Link to="/solution" className="btn-secondary px-5 py-2.5 text-sm">
              How It Works
            </Link>
          </div>

          {/* Live mini-stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
            {[
              { label: 'Active Junctions', value: '12 / 14', color: 'text-emerald-400' },
              { label: 'Active Incidents', value: '2', color: 'text-amber-400' },
              { label: 'Delay Reduction', value: '−18.4%', color: 'text-brand-cyan' },
              { label: 'CCTV Feeds', value: '42 / 44', color: 'text-blue-400' },
            ].map(s => (
              <div key={s.label} className="panel-sm p-3">
                <div className="text-xs text-slate-500 mb-1">{s.label}</div>
                <div className={`text-xl font-bold font-mono ${s.color}`}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Page Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-4">
        <PageInfoBox
          title="Page Functionality — Homepage"
          description="Public landing page and primary entry point for SignalSync. Communicates the platform's value proposition to two audiences: government/authority decision-makers evaluating procurement, and road users seeking live traffic information."
          points={[
            'Hero section: headline, live network stats (active junctions, incidents, delay reduction, CCTV feeds), and primary navigation CTAs',
            'Problem framing: four data-backed statistics on the cost of fixed-time signal control in Colombo',
            'How It Works: five-step architecture walkthrough from CCTV ingestion to public advisories',
            'Core modules: six platform capability cards covering CCTV intelligence, AI engine, dashboard, incident control, public intelligence, and governance',
            'Benefits split: separate value propositions for government authorities and road users',
            'Metrics section: six simulated pilot KPIs demonstrating expected platform performance',
            'Phased rollout: three-phase deployment model from pilot corridor to city-wide scale',
            'Governance section: trust and accountability design principles for public-sector procurement confidence',
          ]}
        />
      </div>

      {/* Why Fixed-Time Fails */}
      <section className="py-20 bg-brand-slate">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="section-heading mb-3">The Problem</div>
            <h2 className="text-3xl font-bold text-white mb-4">Why fixed-time traffic control fails Colombo</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Colombo's road network has grown faster than its signal infrastructure. Fixed-time cycles designed in the 1990s cannot adapt to today's demand, creating preventable congestion every day.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {problems.map(p => {
              const Icon = p.icon;
              return (
                <div key={p.stat} className="panel p-6 text-center">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-5 h-5 text-red-400" />
                  </div>
                  <div className="text-3xl font-bold text-red-400 mb-2 font-mono">{p.stat}</div>
                  <div className="text-xs text-slate-400 leading-relaxed">{p.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="section-heading mb-3">System Architecture</div>
            <h2 className="text-3xl font-bold text-white mb-4">How SignalSync works</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              A five-layer process from existing CCTV infrastructure to real-time signal control — fully automated, with human override available at every stage.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
            {[
              { n: '01', icon: Camera, label: 'CCTV Feeds', desc: 'Existing junction cameras stream live video to the SignalSync processing layer', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
              { n: '02', icon: Eye, label: 'AI Detection', desc: 'Computer vision estimates queue length, vehicle count, and congestion density', color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
              { n: '03', icon: Brain, label: 'Optimisation Engine', desc: 'Adaptive algorithm calculates optimal green times and phase sequences', color: 'text-brand-cyan', bg: 'bg-cyan-500/10 border-cyan-500/20' },
              { n: '04', icon: Zap, label: 'Signal Control', desc: 'Commands sent to junction controllers. Signals adjust within seconds of demand change', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
              { n: '05', icon: Activity, label: 'Dashboard + Public', desc: 'Operators monitor system state. Public receives live advisories and route guidance', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
            ].map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.n} className="relative">
                  <div className={`panel p-5 h-full flex flex-col gap-3`}>
                    <div className={`w-9 h-9 rounded-lg border flex items-center justify-center ${step.bg}`}>
                      <Icon className={`w-4.5 h-4.5 ${step.color}`} />
                    </div>
                    <div className="text-[10px] text-slate-600 font-mono">{step.n}</div>
                    <h3 className={`text-sm font-semibold ${step.color}`}>{step.label}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                  </div>
                  {i < 4 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-1 z-10 items-center -translate-y-1/2">
                      <ArrowRight className="w-4 h-4 text-brand-border" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 p-4 panel-sm border-l-4 border-brand-cyan text-sm text-slate-300">
            <strong className="text-brand-cyan">Infrastructure-light deployment:</strong> SignalSync uses your existing CCTV camera network. No new roadside hardware required for the intelligence layer — significantly reducing deployment cost and complexity for municipal authorities.
          </div>
        </div>
      </section>

      {/* Core Modules */}
      <section className="py-20 bg-brand-slate">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="section-heading mb-3">Platform Capabilities</div>
            <h2 className="text-3xl font-bold text-white mb-4">Core operational modules</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {modules.map(m => {
              const Icon = m.icon;
              return (
                <div key={m.title} className="panel p-6 hover:border-brand-border/80 transition-colors group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-brand-cyan" />
                    </div>
                    <span className="badge-slate text-[10px]">{m.tag}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-2">{m.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{m.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits — Authority + Public */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Authority */}
            <div className="panel p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="section-heading mb-0.5">For Authorities</div>
                  <h3 className="text-base font-semibold text-white">Value for government and traffic operators</h3>
                </div>
              </div>
              <ul className="space-y-3">
                {authBenefits.map(b => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-brand-cyan flex-shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Public */}
            <div className="panel p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                  <Users className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="section-heading mb-0.5">For Road Users</div>
                  <h3 className="text-base font-semibold text-white">Value for commuters and the public</h3>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {publicBenefits.map(b => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3 pt-6 border-t border-brand-border">
                <Link to="/map" className="btn-secondary text-xs py-2">
                  <Map className="w-3.5 h-3.5" />
                  View Congestion Map
                </Link>
                <Link to="/alerts" className="btn-secondary text-xs py-2">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  See Live Alerts
                </Link>
                <Link to="/routes" className="btn-secondary text-xs py-2">
                  <Navigation className="w-3.5 h-3.5" />
                  Route Guidance
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Metrics */}
      <section className="py-20 bg-brand-slate">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="section-heading mb-3">Impact Potential</div>
            <h2 className="text-3xl font-bold text-white mb-3">Measurable platform performance</h2>
            <p className="text-xs text-slate-500">Based on simulated pilot corridor data — indicative of expected outcomes during full deployment</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {metrics.map(m => (
              <div key={m.label} className="panel p-6 text-center">
                <div className={`text-4xl font-bold font-mono mb-2 ${m.accent}`}>{m.value}</div>
                <div className="text-xs text-slate-400">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Phased Rollout */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="section-heading mb-3">Deployment Model</div>
            <h2 className="text-3xl font-bold text-white mb-4">Pilot-to-scale rollout</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              SignalSync is designed for incremental deployment. Start with a proven pilot, build evidence, then expand — reducing financial and operational risk for government clients.
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-8 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-brand-blue via-brand-cyan to-emerald-500" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {phases.map((phase, i) => (
                <div key={phase.phase} className="panel p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0 ${
                      i === 0 ? 'bg-brand-blue' : i === 1 ? 'bg-brand-cyan text-brand-navy' : 'bg-emerald-500'
                    }`}>
                      {phase.phase}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{phase.label}</div>
                      <div className="text-xs text-slate-500">{phase.timeline}</div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">{phase.desc}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Layers className="w-3 h-3" />
                    <span>{phase.junctions}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Governance */}
      <section className="py-20 bg-brand-slate">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="section-heading mb-3">Trust & Accountability</div>
              <h2 className="text-3xl font-bold text-white mb-4">Governance by design</h2>
              <p className="text-slate-400 mb-6 leading-relaxed">
                SignalSync is built for public-sector accountability. Every action taken on the platform is recorded, attributed, and available for review. Authority over the road network remains with authorised officers — the system augments, never replaces, human judgement.
              </p>
              <div className="space-y-3">
                {[
                  { icon: Lock, text: 'Role-based access with MFA enforcement for all privileged accounts' },
                  { icon: ScrollText, text: 'Immutable audit log for every login, override, incident, and rule change' },
                  { icon: Server, text: 'Approval workflow for all optimisation rule modifications before publishing' },
                  { icon: Eye, text: 'Privacy-by-design: CCTV analytics processed in real time, no long-term raw footage storage' },
                  { icon: Shield, text: 'Failsafe defaults: junctions revert to fixed-time if AI feed is interrupted' },
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <div key={item.text} className="flex items-start gap-3 text-sm text-slate-300">
                      <Icon className="w-4 h-4 text-brand-cyan flex-shrink-0 mt-0.5" />
                      <span>{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Audit Events Logged', value: '841+', accent: 'text-brand-cyan' },
                { label: 'Rule Changes Approved', value: '24', accent: 'text-emerald-400' },
                { label: 'Users with MFA', value: '6 / 8', accent: 'text-blue-400' },
                { label: 'Override Incidents Logged', value: '100%', accent: 'text-purple-400' },
              ].map(s => (
                <div key={s.label} className="panel p-5 text-center">
                  <div className={`text-3xl font-bold font-mono mb-1 ${s.accent}`}>{s.value}</div>
                  <div className="text-xs text-slate-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="panel p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 via-transparent to-brand-cyan/5" />
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center mx-auto mb-6">
                <Activity className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">See SignalSync in action</h2>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                Explore the full operations platform, live junction data, CCTV detection monitoring, and public traffic intelligence.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/platform/dashboard" className="btn-primary px-6 py-2.5">
                  <Activity className="w-4 h-4" />
                  Open Operations Dashboard
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/solution" className="btn-secondary px-6 py-2.5">
                  Solution Overview
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Missing import fix
function ScrollText(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4" /><path d="M19 3H5a2 2 0 0 0-2 2" /><path d="M15 8h-5" /><path d="M15 12h-5" /></svg>; }
