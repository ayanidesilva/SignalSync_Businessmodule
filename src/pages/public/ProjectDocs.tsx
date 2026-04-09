import { Link } from 'react-router-dom';
import {
  Activity, Globe, LayoutDashboard, Camera, AlertTriangle, Zap,
  BarChart2, ClipboardList, Users, Settings, Map, Navigation,
  Bell, BookOpen, Code2, Database, Shield, Layers, CheckCircle,
  ChevronRight, ExternalLink, FileText, Cpu, Lock, GitBranch
} from 'lucide-react';

/* ─── Section heading ─── */
function SectionHeading({ icon: Icon, title, subtitle }: { icon: React.ElementType; title: string; subtitle?: string }) {
  return (
    <div className="flex items-start gap-3 mb-6">
      <div className="w-9 h-9 rounded-lg bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon className="w-4.5 h-4.5 text-brand-cyan" size={18} />
      </div>
      <div>
        <h2 className="text-lg font-bold text-white">{title}</h2>
        {subtitle && <p className="text-sm text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

/* ─── Page card ─── */
interface PageCardProps {
  route: string;
  label: string;
  section: 'Public' | 'Platform' | 'Admin';
  icon: React.ElementType;
  purpose: string;
  features: string[];
  color: string;
}
function PageCard({ route, label, section, icon: Icon, purpose, features, color }: PageCardProps) {
  const sectionColor: Record<string, string> = {
    Public: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    Platform: 'text-brand-cyan bg-brand-cyan/10 border-brand-cyan/20',
    Admin: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  };
  return (
    <div className="panel border border-brand-border hover:border-brand-blue/40 transition-colors">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color}`}>
            <Icon size={16} />
          </div>
          <div>
            <div className="font-semibold text-sm text-white">{label}</div>
            <div className="font-mono text-[10px] text-slate-500">{route}</div>
          </div>
        </div>
        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${sectionColor[section]}`}>{section}</span>
      </div>
      <p className="text-xs text-slate-300 leading-relaxed mb-3">{purpose}</p>
      <ul className="space-y-1">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-1.5 text-[11px] text-slate-400">
            <CheckCircle size={11} className="text-brand-cyan mt-0.5 flex-shrink-0" />
            {f}
          </li>
        ))}
      </ul>
      <div className="mt-3 pt-3 border-t border-brand-border">
        <Link to={route} className="flex items-center gap-1 text-[11px] text-brand-cyan hover:text-cyan-300 transition-colors">
          <ExternalLink size={11} /> View page
        </Link>
      </div>
    </div>
  );
}

/* ─── Tech pill ─── */
function TechPill({ label, desc }: { label: string; desc: string }) {
  return (
    <div className="flex items-start gap-2 p-3 rounded-lg bg-brand-slate/50 border border-brand-border">
      <Code2 size={14} className="text-brand-cyan mt-0.5 flex-shrink-0" />
      <div>
        <div className="text-xs font-semibold text-white">{label}</div>
        <div className="text-[11px] text-slate-400 mt-0.5">{desc}</div>
      </div>
    </div>
  );
}

/* ─── Theme card ─── */
function ThemeCard({ icon: Icon, title, body }: { icon: React.ElementType; title: string; body: string }) {
  return (
    <div className="p-4 rounded-xl bg-brand-panel border border-brand-border">
      <div className="flex items-center gap-2 mb-2">
        <Icon size={16} className="text-brand-cyan" />
        <span className="text-sm font-semibold text-white">{title}</span>
      </div>
      <p className="text-xs text-slate-400 leading-relaxed">{body}</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════ */
export function ProjectDocs() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-16">

      {/* ── Hero ── */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue/15 border border-brand-blue/30 text-xs text-brand-cyan font-medium mb-2">
          <FileText size={12} /> Project Documentation
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          SignalSync — Full Platform Guide
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed">
          A complete walkthrough of every page, its purpose, key features, and the design decisions behind this prototype.
          Written to help reviewers understand what was built and why.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          {[
            { label: '14 Pages', color: 'text-brand-cyan bg-brand-cyan/10 border-brand-cyan/20' },
            { label: '5 Public', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
            { label: '7 Platform', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
            { label: '2 Admin', color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
          ].map(b => (
            <span key={b.label} className={`px-3 py-1 rounded-full text-xs font-semibold border ${b.color}`}>{b.label}</span>
          ))}
        </div>
      </div>

      {/* ── What is SignalSync ── */}
      <div>
        <SectionHeading icon={Activity} title="What is SignalSync?" subtitle="Business concept and problem statement" />
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <p>
              <strong className="text-white">SignalSync</strong> is a B2G (Business-to-Government) AI-powered smart traffic
              management platform designed for the <strong className="text-white">Road Development Authority of Sri Lanka</strong>.
              It targets Colombo's chronic urban congestion by replacing outdated fixed-time traffic signals with
              adaptive AI-driven control.
            </p>
            <p>
              The core business proposition is <strong className="text-white">infrastructure-light deployment</strong> —
              instead of installing expensive new hardware, SignalSync repurposes existing CCTV cameras at junctions.
              An on-premise edge AI module analyses the live camera feed to measure queue lengths and vehicle density in
              real time, then dynamically adjusts signal timings to minimise delays.
            </p>
            <p>
              The platform is designed as a <strong className="text-white">phased pilot-to-scale rollout</strong>,
              starting with 10 high-congestion junctions in Colombo 03 and expanding progressively — reducing financial
              risk for the government client while proving ROI at each stage.
            </p>
          </div>
          <div className="space-y-3">
            {[
              { icon: Cpu, title: 'AI Detection', body: 'CCTV feeds processed by edge AI to measure real-time queue lengths without cloud dependency.' },
              { icon: Shield, title: 'Privacy by Design', body: 'Processing happens on-premise at each junction. No facial data or identifiable footage is transmitted.' },
              { icon: GitBranch, title: 'Human-in-the-Loop', body: 'All AI decisions can be reviewed and overridden by traffic operators. Governance is built in, not bolted on.' },
              { icon: Globe, title: 'Dual Audience', body: 'Platform operators see full dashboards. Citizens get a public-facing portal with alerts and route guidance.' },
            ].map(t => <ThemeCard key={t.title} icon={t.icon} title={t.title} body={t.body} />)}
          </div>
        </div>
      </div>

      {/* ── Tech Stack ── */}
      <div>
        <SectionHeading icon={Code2} title="Technology Stack" subtitle="All libraries and tooling used to build this prototype" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <TechPill label="React 18 + TypeScript" desc="Component-based UI with full static typing. All data models use TypeScript interfaces." />
          <TechPill label="Vite 5" desc="Build tool and dev server. Version 5 used (not 6) for Node.js v21 compatibility." />
          <TechPill label="Tailwind CSS v3" desc="Utility-first CSS with a custom brand palette (navy, cyan, blue accents). v3 used for PostCSS compatibility." />
          <TechPill label="React Router v6" desc="Client-side routing for all 14 pages. Nested layouts via wrapper components." />
          <TechPill label="Recharts" desc="Data visualisation — AreaChart, BarChart, LineChart, RadialBar used across dashboard and analytics pages." />
          <TechPill label="Lucide React" desc="Icon library. ~40 icons used throughout for consistent iconography." />
          <TechPill label="clsx" desc="Utility for conditional Tailwind class composition (active states, badge variants, etc.)." />
          <TechPill label="Custom CSS Animations" desc="livePulse, fadeUp, slideIn keyframes defined in index.css for the live indicator and modal transitions." />
          <TechPill label="Mock Data (no backend)" desc="All data defined in src/data/ as typed TypeScript arrays — junctions, incidents, users, audit logs, CCTV feeds, routes, rules." />
        </div>
      </div>

      {/* ── Architecture ── */}
      <div>
        <SectionHeading icon={Layers} title="Codebase Architecture" subtitle="How the project is structured" />
        <div className="grid md:grid-cols-3 gap-4 text-xs">
          {[
            {
              title: 'src/data/', color: 'border-amber-500/30 bg-amber-500/5',
              items: [
                'junctions.ts — 12 Colombo junctions with congestion, signal mode, CCTV, and performance data',
                'incidents.ts — 7 incidents (collision, VIP, roadworks, etc.) with severity and diversion notes',
                'metrics.ts — KPI summaries, hourly throughput, 7-day congestion trend, system health timeline',
                'users.ts — 8 users with RBAC roles, MFA status, and permission flags',
                'auditLogs.ts — 17 immutable audit entries across all action types',
                'cctv.ts — 15 CCTV feed objects with health, confidence, detection data',
                'routes.ts — 3 route scenarios with AI-ranked options',
                'optimisationRules.ts — 6 signal timing profiles with approval states',
              ]
            },
            {
              title: 'src/components/', color: 'border-brand-cyan/30 bg-brand-cyan/5',
              items: [
                'layout/DashboardLayout.tsx — Platform shell: sidebar + topbar + alert banner',
                'layout/PublicLayout.tsx — Public shell: advisory bar + nav + footer',
                'layout/Sidebar.tsx — Collapsible sidebar (56→14 wide) with 3 nav groups',
                'ui/Badge.tsx — 11 badge variants: CongestionBadge, SeverityBadge, RoleBadge, etc.',
                'ui/MetricCard.tsx — Reusable KPI card with trend indicator and accent colour',
                'ui/LiveIndicator.tsx — Animated pulsing live dot + SystemTime clock',
                'ui/Modal.tsx — Backdrop modal with header/body/footer and 4 width variants',
              ]
            },
            {
              title: 'src/pages/', color: 'border-purple-500/30 bg-purple-500/5',
              items: [
                'public/ — 5 citizen-facing pages (Home, Solution, Map, Alerts, Routes)',
                'platform/ — 7 operator pages (Dashboard, Junctions, CCTV, Incidents, Emergency, Reports, Audit)',
                'admin/ — 2 admin pages (Users/Roles, Optimisation Rules)',
                'Each page is a self-contained React component that imports from data/ and components/ui/',
                'Routing defined in App.tsx using BrowserRouter + Routes',
              ]
            },
          ].map(col => (
            <div key={col.title} className={`p-4 rounded-xl border ${col.color}`}>
              <div className="font-mono text-brand-cyan font-semibold mb-3">{col.title}</div>
              <ul className="space-y-1.5">
                {col.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-slate-400">
                    <span className="text-slate-600 mt-0.5">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Public Pages ── */}
      <div>
        <SectionHeading icon={Globe} title="Public-Facing Pages" subtitle="Accessible to all citizens — no login required" />
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          <PageCard
            route="/"
            label="Homepage"
            section="Public"
            icon={Activity}
            color="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
            purpose="The main landing page for SignalSync. Designed as a polished B2G product marketing page that explains the platform to both government stakeholders and the public."
            features={[
              'Live hero section with 4 real-time KPI counters (junctions monitored, vehicles, delay reduction, uptime)',
              '"Why fixed-time signals fail" section with 4 problem statistics',
              '5-layer "How It Works" flow (detect → analyse → optimise → override → audit)',
              '6 Core Module cards linking to platform pages',
              'Phased rollout timeline (Pilot → Expansion → City-wide)',
              'Governance & compliance section explaining RBAC and audit trails',
            ]}
          />
          <PageCard
            route="/solution"
            label="Solution Overview"
            section="Public"
            icon={BookOpen}
            color="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
            purpose="A detailed technical and business architecture page. Explains how each layer of SignalSync works, from CCTV edge detection to the signal controller API."
            features={[
              '6 architecture steps with spec callouts (latency, accuracy, protocols)',
              'Stakeholder roles section (RDA, Traffic Police, Municipal Council)',
              '5 design principles (privacy-first, human-in-the-loop, infrastructure-light, open standards, audit-native)',
              'Deployment prerequisites and infrastructure requirements',
            ]}
          />
          <PageCard
            route="/map"
            label="Congestion Map"
            section="Public"
            icon={Map}
            color="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
            purpose="A simulated live map of Colombo showing real-time congestion at monitored junctions. Uses an SVG city background with percentage-positioned junction markers."
            features={[
              'Clickable junction markers with colour-coded congestion levels (free/moderate/heavy/severe)',
              'Tooltip on click showing queue length, signal mode, and delay',
              'Corridor status panel showing 5 major corridors',
              'Filter bar to show all or specific congestion levels',
              'Live pulse animation on active junction markers',
            ]}
          />
          <PageCard
            route="/alerts"
            label="Incident Alerts"
            section="Public"
            icon={Bell}
            color="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
            purpose="Public incident feed showing active traffic disruptions, planned works, and resolved events. Gives citizens actionable diversion information."
            features={[
              'Summary count cards for Active, Monitoring, Planned, Resolved incidents',
              'Expandable accordion for each incident with full details',
              'Diversion advisory section per incident (e.g. "Use Marine Drive")',
              'Filter by status and severity',
              'Colour-coded severity and type badges',
            ]}
          />
          <PageCard
            route="/routes"
            label="Route Guidance"
            section="Public"
            icon={Navigation}
            color="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
            purpose="AI-powered route recommendations for common Colombo journeys, ranked by current congestion conditions. Shows citizens the fastest alternative routes."
            features={[
              '3 preset journey scenarios (e.g. Airport → Fort, Nugegoda → Pettah)',
              'AI-ranked route options with estimated travel time and congestion level',
              '"Recommended" badge on the optimal route',
              'Via junctions listed for each route',
              'Congestion level badge per route',
            ]}
          />
        </div>
      </div>

      {/* ── Platform Pages ── */}
      <div>
        <SectionHeading icon={LayoutDashboard} title="Operations Platform Pages" subtitle="Restricted to authenticated traffic management officers" />
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          <PageCard
            route="/platform/dashboard"
            label="Traffic Dashboard"
            section="Platform"
            icon={LayoutDashboard}
            color="bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20"
            purpose="The main operator home screen. Gives a real-time overview of the entire Colombo traffic network at a glance — KPIs, junction grid, active incidents, and system health."
            features={[
              '6 MetricCards (junctions, vehicles/hr, avg delay, override rate, CCTV uptime, system health)',
              'Junction grid with toggle between card view and table list',
              'Colour-coded congestion badges and signal mode per junction',
              'AreaChart showing hourly throughput over 17 time points',
              'Active incidents panel and recent activity feed',
              'Quick actions: create incident, emergency priority, generate report',
            ]}
          />
          <PageCard
            route="/platform/junctions"
            label="Junction Monitoring"
            section="Platform"
            icon={Activity}
            color="bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20"
            purpose="Deep-dive into any individual junction. Operators select a junction and see live signal phasing, performance charts, events log, and controller health."
            features={[
              'Horizontal junction selector showing all 12 junctions',
              '4 tabs: Overview, Performance, Events, Controller',
              'Live signal phase bar (North/South/East/West phases with green time remaining)',
              'AreaChart for throughput and LineChart for average delay over time',
              'Safety rule checklist (e.g. min green time, pedestrian phase enforcement)',
              'Manual override modal with reason logging',
            ]}
          />
          <PageCard
            route="/platform/cctv"
            label="CCTV Intelligence"
            section="Platform"
            icon={Camera}
            color="bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20"
            purpose="Simulates the live CCTV feed monitoring interface. Shows camera health, AI detection confidence, and queue measurements from each camera feed."
            features={[
              'Grid of camera feed tiles with simulated detection overlay boxes',
              'Detection confidence bar per feed (% accuracy of AI model)',
              'Feed health status (Healthy, Degraded, Offline)',
              'Filter by health status or junction',
              'Feed detail panel showing full metadata on click',
              'Privacy notice: "No facial data transmitted — edge processing only"',
            ]}
          />
          <PageCard
            route="/platform/incidents"
            label="Incident Management"
            section="Platform"
            icon={AlertTriangle}
            color="bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20"
            purpose="Full incident lifecycle management. Operators create, monitor, and resolve traffic incidents. All incidents feed into the audit log automatically."
            features={[
              'Status summary cards (Active/Monitoring/Planned/Resolved counts) — clickable as filters',
              'Full incident table: ID, type, severity, location, corridor, status, override, actions',
              '"Create Incident" modal with all fields (type, severity, location, diversion advisory, signal override, publish toggle)',
              '"View" modal showing full incident details and affected junctions',
              'Override indicator shows which incidents triggered signal changes',
            ]}
          />
          <PageCard
            route="/platform/emergency"
            label="Emergency Priority"
            section="Platform"
            icon={Zap}
            color="bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20"
            purpose="Activates emergency green-wave corridors for ambulances, fire engines, or VIP convoys. Clears a priority path across multiple junctions in sequence."
            features={[
              'Pre-configured emergency corridors (e.g. Galle Rd Hospital Corridor)',
              'Junction sequence visualiser showing the path the vehicle will take',
              'Safety validation checklist that must pass before activation',
              'Activation modal with vehicle type selector (Ambulance, Fire, Police, VIP)',
              'Custom corridor builder for ad-hoc emergency routes',
              'Active override timer once activated',
            ]}
          />
          <PageCard
            route="/platform/reports"
            label="Reports & Analytics"
            section="Platform"
            icon={BarChart2}
            color="bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20"
            purpose="Comprehensive analytics across the entire network. Used by management for performance review, policy decisions, and system audit reporting."
            features={[
              '5 tab sections: Network Overview, Congestion Trends, Junction Performance, Override Analysis, System Health',
              'AreaChart for network throughput, BarChart for junction comparison, LineChart for 7-day congestion trend',
              'Date range filter and corridor filter',
              'Export button with format dropdown (PDF, CSV, Excel)',
              'Override frequency breakdown by junction and reason',
              'System health timeline showing uptime and error rates',
            ]}
          />
          <PageCard
            route="/platform/audit"
            label="Audit Logs"
            section="Platform"
            icon={ClipboardList}
            color="bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20"
            purpose="Immutable chronological log of all system actions. Satisfies governance and compliance requirements. Every override, login, rule change, and incident is recorded here."
            features={[
              '17 log entries covering: logins, overrides, incident creation, emergency activations, rule changes, user management',
              'Expandable row showing full detail of each action',
              'Filter by action group (Authentication, Signal Control, Incidents, Admin) and outcome (Success/Warning/Failure)',
              'Immutable notice: "Logs cannot be edited or deleted — SHA-256 hash per entry"',
              'Pending approval actions panel for rule changes awaiting sign-off',
            ]}
          />
        </div>
      </div>

      {/* ── Admin Pages ── */}
      <div>
        <SectionHeading icon={Lock} title="Administration Pages" subtitle="Restricted to system administrators only" />
        <div className="grid md:grid-cols-2 gap-4">
          <PageCard
            route="/admin/users"
            label="User & Role Management"
            section="Admin"
            icon={Users}
            color="bg-purple-500/10 text-purple-400 border border-purple-500/20"
            purpose="Full RBAC (Role-Based Access Control) management. Admins create accounts, assign roles, and define what each user can see and do in the platform."
            features={[
              'Users tab: table of 8 users with name, role, status, MFA indicator, last login, access zones',
              'Permission badges per user: canOverride, canPublishAdvisory, canModifyRules',
              'Roles tab: 6 role cards (Super Admin, Traffic Manager, Field Officer, Analyst, Auditor, Read-Only) with full permission lists',
              '"Create User" modal with role selector, zone assignment, MFA enforcement',
              'Deactivate/edit actions per user row',
            ]}
          />
          <PageCard
            route="/admin/rules"
            label="Optimisation Rules"
            section="Admin"
            icon={Settings}
            color="bg-purple-500/10 text-purple-400 border border-purple-500/20"
            purpose="Configuration panel for the AI signal optimisation engine. Admins define timing profiles for different scenarios (peak hour, night, emergency) with a built-in approval workflow."
            features={[
              '6 timing profiles: Rush Hour Adaptive, Night-time Fixed, Emergency Override, Pedestrian Priority, Event Mode, Weekend Relaxed',
              'Each profile shows min/max green time, cycle time, pedestrian buffer, queue threshold',
              'Signal phase bar visualisation showing relative green time allocation per direction',
              'Safety constraints checklist per profile',
              'Approval workflow: Draft → Pending Approval → Active → Archived',
              '"Create Profile" modal for new rule configuration',
            ]}
          />
        </div>
      </div>

      {/* ── Key Business Themes ── */}
      <div>
        <SectionHeading icon={Database} title="Key Business & Design Themes" subtitle="The conceptual pillars that shaped every design decision" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              icon: Cpu,
              title: 'Infrastructure-Light',
              body: 'No new hardware required at junctions. SignalSync reuses existing CCTV cameras, reducing capital expenditure and procurement complexity for the government client. The only new hardware is an edge processing unit per junction.'
            },
            {
              icon: Shield,
              title: 'Governance by Design',
              body: 'Every action is logged in an immutable audit trail. Role-based access control is enforced at every level. No signal change happens without attribution. Compliance is not an add-on — it is structurally enforced.'
            },
            {
              icon: Users,
              title: 'Human-in-the-Loop',
              body: 'The AI recommends and adapts, but operators retain full override authority. The system is designed so that human judgment always supersedes automation. This is critical for public-sector trust and accountability.'
            },
            {
              icon: GitBranch,
              title: 'Pilot-to-Scale Rollout',
              body: 'The deployment plan starts with 10 junctions in Colombo 03, expands to 45 across the city, then scales to 120+ city-wide. Each phase proves ROI before the next is funded — reducing risk for both client and vendor.'
            },
            {
              icon: Lock,
              title: 'Privacy by Design',
              body: 'CCTV feeds are processed entirely on-premise at the junction edge node. No video footage or facial data is ever transmitted off-site. Only anonymised traffic metrics (vehicle counts, queue lengths) reach the platform servers.'
            },
            {
              icon: Globe,
              title: 'Dual Audience Design',
              body: 'The platform serves two distinct audiences: trained traffic operators (who use the dark, dense platform UI) and the general public (who use a cleaner public portal for congestion info and route guidance). Both are served from the same data layer.'
            },
          ].map(t => (
            <div key={t.title} className="p-4 rounded-xl bg-brand-panel border border-brand-border">
              <div className="flex items-center gap-2 mb-2">
                <t.icon size={15} className="text-brand-cyan" />
                <span className="text-sm font-semibold text-white">{t.title}</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{t.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Quick Navigation ── */}
      <div>
        <SectionHeading icon={Navigation} title="Quick Navigation" subtitle="Jump directly to any page in the prototype" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {[
            { to: '/', label: 'Homepage', group: 'Public' },
            { to: '/solution', label: 'Solution', group: 'Public' },
            { to: '/map', label: 'Traffic Map', group: 'Public' },
            { to: '/alerts', label: 'Alerts', group: 'Public' },
            { to: '/routes', label: 'Route Guidance', group: 'Public' },
            { to: '/platform/dashboard', label: 'Dashboard', group: 'Platform' },
            { to: '/platform/junctions', label: 'Junctions', group: 'Platform' },
            { to: '/platform/cctv', label: 'CCTV', group: 'Platform' },
            { to: '/platform/incidents', label: 'Incidents', group: 'Platform' },
            { to: '/platform/emergency', label: 'Emergency', group: 'Platform' },
            { to: '/platform/reports', label: 'Reports', group: 'Platform' },
            { to: '/platform/audit', label: 'Audit Logs', group: 'Platform' },
            { to: '/admin/users', label: 'Users', group: 'Admin' },
            { to: '/admin/rules', label: 'Rules', group: 'Admin' },
          ].map(link => {
            const groupColor: Record<string, string> = {
              Public: 'border-emerald-500/20 hover:border-emerald-500/40 hover:bg-emerald-500/5',
              Platform: 'border-brand-cyan/20 hover:border-brand-cyan/40 hover:bg-brand-cyan/5',
              Admin: 'border-purple-500/20 hover:border-purple-500/40 hover:bg-purple-500/5',
            };
            const labelColor: Record<string, string> = {
              Public: 'text-emerald-400',
              Platform: 'text-brand-cyan',
              Admin: 'text-purple-400',
            };
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex flex-col p-3 rounded-lg border bg-brand-panel transition-all ${groupColor[link.group]}`}
              >
                <span className={`text-[10px] font-semibold uppercase tracking-wider mb-1 ${labelColor[link.group]}`}>{link.group}</span>
                <span className="text-xs text-slate-200 font-medium flex items-center gap-1">
                  {link.label} <ChevronRight size={10} className="text-slate-500" />
                </span>
                <span className="text-[10px] font-mono text-slate-600 mt-0.5">{link.to}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── Footer note ── */}
      <div className="p-5 rounded-xl bg-brand-blue/10 border border-brand-blue/20 text-center">
        <p className="text-sm text-slate-300">
          This is a <strong className="text-white">high-fidelity prototype</strong> built for final-year university coursework.
          All data is mock data — no real backend, database, or live API connections exist.
          The prototype demonstrates UI/UX design, information architecture, and B2G platform thinking.
        </p>
        <p className="text-xs text-slate-500 mt-2">
          Stack: React 18 · TypeScript · Vite 5 · Tailwind CSS v3 · React Router v6 · Recharts · Lucide React
        </p>
      </div>

    </div>
  );
}
