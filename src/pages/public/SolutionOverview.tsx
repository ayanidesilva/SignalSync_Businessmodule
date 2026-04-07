import { Link } from 'react-router-dom';
import { Camera, Brain, Zap, Activity, Globe, Shield, CheckCircle, ArrowRight, Server, Eye, Lock, Layers, ChevronRight } from 'lucide-react';
import { PageInfoBox } from '../../components/ui/PageInfoBox';

const steps = [
  {
    id: '01', icon: Camera, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20',
    title: 'CCTV Feed Ingestion',
    detail: 'SignalSync connects to existing CCTV infrastructure at each junction using a lightweight software integration layer. No new roadside cameras are required. Video streams are processed locally at the edge — raw footage is not retained. Only anonymised detection metadata (vehicle count, queue estimate, congestion level) is transmitted to the central system.',
    specs: ['Existing camera compatibility: 720p / 1080p / 4K', 'Edge processing: detection at source, no raw video cloud upload', 'Feed health monitoring: live status per camera', 'Calibration system: accuracy validated per junction'],
  },
  {
    id: '02', icon: Eye, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20',
    title: 'Computer Vision Detection',
    detail: 'A deep learning model analyses each camera frame to estimate vehicle density and queue build-up. The system detects vehicles by type (private car, bus, three-wheeler, motorcycle), measures queue length in metres, and produces a congestion density index. Detection confidence is reported per feed — degraded feeds are flagged for technician review.',
    specs: ['Vehicle classification: 5+ types', 'Queue estimation accuracy: ±8m at 90%+ confidence', 'Processing latency: <500ms per frame', 'Confidence threshold alerts: <75% triggers degraded status'],
  },
  {
    id: '03', icon: Brain, color: 'text-brand-cyan', bg: 'bg-cyan-500/10 border-cyan-500/20',
    title: 'Adaptive Optimisation Engine',
    detail: 'The core AI engine receives real-time detection data from all approaches at each junction and calculates optimal signal phase durations. It operates within configurable safety constraints (minimum green time, pedestrian phases, cycle limits). Multiple time-of-day profiles can be preconfigured by traffic administrators and activated automatically or manually.',
    specs: ['Inputs: queue length, density, approach count, time of day', 'Constraints: min/max green, pedestrian phase, cycle limit', 'Override-ready: human command takes immediate precedence', 'Profile-based: configurable for peak AM / PM / off-peak / event'],
  },
  {
    id: '04', icon: Zap, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20',
    title: 'Signal Controller Integration',
    detail: 'Optimised signal timings are transmitted to the junction controller hardware. SignalSync supports standard traffic controller protocols. The controller executes phase changes within seconds. If the SignalSync feed is interrupted, controllers revert to their pre-configured fixed-time fallback — ensuring no single point of failure for junction operation.',
    specs: ['Command latency: <3 seconds end-to-end', 'Protocol: UTMC-compatible controller interface', 'Failsafe: automatic fixed-time fallback on signal loss', 'Controller status: monitored and reported in real time'],
  },
  {
    id: '05', icon: Activity, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20',
    title: 'Operations Dashboard',
    detail: 'Authorised traffic operators access the central dashboard to monitor all junctions simultaneously. The dashboard provides a live view of congestion levels, signal states, active incidents, system health, and CCTV feed status. Police officers can issue manual overrides and create incidents directly from the interface.',
    specs: ['Live junction grid with congestion indicators', 'Manual override with audit logging', 'Incident creation and tracking', 'Role-based access: officers, admins, technicians, viewers'],
  },
  {
    id: '06', icon: Globe, color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20',
    title: 'Public Traffic Intelligence',
    detail: 'A curated subset of system data is published to the public-facing portal. Road users access live congestion maps, incident alerts, and route guidance. Traffic advisories are approved and published by authorised administrators. No raw CCTV data or sensitive junction control information is exposed through the public interface.',
    specs: ['Congestion map: corridor and junction level', 'Incident alerts: type, severity, affected areas', 'Route guidance: AI-ranked recommendations with estimated times', 'Advisory moderation: admin approval before publication'],
  },
];

const stakeholders = [
  {
    role: 'Police Officer', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20',
    capabilities: ['Monitor junction and corridor status', 'Activate manual signal override', 'Create and update incidents', 'Activate emergency priority corridors', 'View audit trail for own actions'],
  },
  {
    role: 'Traffic Administrator', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20',
    capabilities: ['Manage optimisation rule profiles', 'Approve and publish rule changes', 'Publish public traffic advisories', 'Access full analytics and KPI reports', 'Review CCTV and system health'],
  },
  {
    role: 'System Administrator', color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20',
    capabilities: ['Full platform access and configuration', 'Create and manage user accounts', 'Set role-based access boundaries', 'Approve high-risk system changes', 'Review full audit logs and governance records'],
  },
  {
    role: 'Field Technician', color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20',
    capabilities: ['Access CCTV calibration tools', 'Review feed health and detection status', 'Submit recalibration reports', 'View technical controller diagnostics', 'Raise maintenance requests'],
  },
];

export function SolutionOverview() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-12 max-w-3xl">
        <div className="section-heading mb-3">Solution Overview</div>
        <h1 className="text-4xl font-bold text-white mb-4">How SignalSync works — end to end</h1>
        <p className="text-slate-400 leading-relaxed">
          SignalSync is a six-layer platform that transforms existing CCTV infrastructure into an intelligent, adaptive traffic signal network. Every layer is designed for government-grade reliability, accountability, and public transparency.
        </p>
        <div className="flex flex-wrap gap-3 mt-6">
          <Link to="/platform/dashboard" className="btn-primary text-sm">
            <Activity className="w-4 h-4" />
            Open Live Dashboard
          </Link>
          <Link to="/map" className="btn-secondary text-sm">
            View Traffic Map
          </Link>
        </div>
      </div>

      <PageInfoBox
        title="Page Functionality — Solution Overview"
        description="Technical and operational walkthrough of how SignalSync works end-to-end — from CCTV feed ingestion to public traffic advisories. Designed for government stakeholders, procurement evaluators, and technical reviewers assessing the platform."
        points={[
          'Six-layer architecture: each layer is explained with operational detail, technical specifications, and design rationale',
          'Stakeholder role breakdown: capabilities and access boundaries for Police Officers, Traffic Administrators, Technicians, Viewers, and System Administrators',
          'Governance section: explains role-based access, audit trail design, approval workflows, and failsafe mechanisms',
          'Links to live platform: calls-to-action connecting reviewers to the live Dashboard and Traffic Map for hands-on exploration',
          'Infrastructure-light positioning: emphasises no new roadside hardware required — key procurement advantage for government clients',
        ]}
      />

      {/* Architecture Steps */}
      <div className="space-y-6 mb-16">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={step.id} className="panel p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${step.bg}`}>
                    <Icon className={`w-5 h-5 ${step.color}`} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-600 font-mono mb-1">Layer {step.id}</div>
                    <h3 className={`text-sm font-semibold ${step.color} mb-1`}>{step.title}</h3>
                    {i < steps.length - 1 && (
                      <div className="flex items-center gap-1 text-xs text-slate-600">
                        <ArrowRight className="w-3 h-3" />
                        <span>→ Layer {String(i + 2).padStart(2, '0')}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <p className="text-sm text-slate-400 leading-relaxed">{step.detail}</p>
                  <ul className="space-y-2">
                    {step.specs.map(s => (
                      <li key={s} className="flex items-start gap-2 text-xs text-slate-400">
                        <CheckCircle className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${step.color}`} />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stakeholder Roles */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <div className="section-heading mb-2">Role Design</div>
          <h2 className="text-2xl font-bold text-white">Platform roles and capabilities</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stakeholders.map(s => (
            <div key={s.role} className="panel p-5">
              <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-lg border text-xs font-semibold mb-4 ${s.bg} ${s.color}`}>
                {s.role}
              </div>
              <ul className="space-y-2">
                {s.capabilities.map(c => (
                  <li key={c} className="flex items-start gap-2 text-xs text-slate-400">
                    <CheckCircle className={`w-3 h-3 flex-shrink-0 mt-0.5 ${s.color}`} />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Key Design Principles */}
      <div className="panel p-8 mb-8">
        <div className="section-heading mb-4">Design Principles</div>
        <h2 className="text-xl font-bold text-white mb-6">What makes SignalSync different</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Lock, title: 'Human-in-the-loop', desc: 'No autonomous decision-making without human authority. Officers can override any AI decision instantly. The system augments, never replaces, trained traffic personnel.' },
            { icon: Layers, title: 'Infrastructure-light', desc: 'Works with existing CCTV cameras. No new roadside sensors, inductive loops, or dedicated hardware required. Deployment cost is significantly lower than traditional adaptive systems.' },
            { icon: Shield, title: 'Governance-first', desc: 'Audit logs, role-based access, approval workflows, and transparent reporting are built into the core — not added as afterthoughts. Designed for public-sector accountability from day one.' },
          ].map(p => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="flex flex-col gap-3">
                <div className="w-9 h-9 rounded-lg bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center">
                  <Icon className="w-4.5 h-4.5 text-brand-cyan" />
                </div>
                <h4 className="text-sm font-semibold text-white">{p.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 panel-sm border-l-4 border-brand-cyan">
        <div>
          <div className="text-sm font-semibold text-white">Ready to explore the platform?</div>
          <div className="text-xs text-slate-400">View the live dashboard, junction monitoring, CCTV intelligence, and more.</div>
        </div>
        <Link to="/platform/dashboard" className="btn-primary text-sm flex-shrink-0">
          Open Platform <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
