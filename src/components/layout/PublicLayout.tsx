import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, Map, AlertTriangle, Navigation, ChevronRight, Menu, X, Gauge } from 'lucide-react';
import clsx from 'clsx';

const navLinks = [
  { to: '/solution', label: 'Solution' },
  { to: '/map', label: 'Traffic Map' },
  { to: '/alerts', label: 'Alerts' },
  { to: '/routes', label: 'Route Guidance' },
  { to: '/docs', label: 'Project Docs' },
];

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-brand-navy flex flex-col">
      {/* Top advisory bar */}
      <div className="bg-amber-500/10 border-b border-amber-500/20 text-center py-2 px-4">
        <span className="text-xs text-amber-300">
          <strong>Traffic Advisory:</strong> Active collision at Liberty Roundabout — Avoid Galle Rd (Colombo 03). Use Marine Drive alternate.
          &nbsp;<Link to="/alerts" className="underline hover:text-amber-100">View all alerts →</Link>
        </span>
      </div>

      {/* Nav */}
      <nav className="border-b border-brand-border bg-brand-panel/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center h-14 gap-8">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-7 h-7 rounded-lg bg-brand-blue flex items-center justify-center glow-blue">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-sm font-bold text-white tracking-tight leading-none">SignalSync</div>
                <div className="text-[9px] text-brand-cyan font-medium uppercase tracking-widest">Smart Traffic · Colombo</div>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1 flex-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={clsx(
                    'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                    location.pathname === link.to
                      ? 'text-brand-cyan bg-brand-cyan/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-2 flex-shrink-0">
              <Link
                to="/platform/dashboard"
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white border border-brand-border hover:border-slate-500 rounded-lg transition-colors"
              >
                <Gauge className="w-3.5 h-3.5" />
                Platform Login
              </Link>
              <Link
                to="/platform/dashboard"
                className="btn-primary text-xs py-1.5 px-3"
              >
                <Gauge className="w-3.5 h-3.5" />
                Live Dashboard
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden ml-auto text-slate-400 hover:text-white"
              onClick={() => setMobileOpen(v => !v)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-brand-border bg-brand-panel px-4 py-3 flex flex-col gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="py-2 text-sm text-slate-300 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/platform/dashboard"
              onClick={() => setMobileOpen(false)}
              className="mt-2 btn-primary justify-center"
            >
              Live Dashboard
            </Link>
          </div>
        )}
      </nav>

      {/* Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-brand-border bg-brand-panel">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-md bg-brand-blue flex items-center justify-center">
                  <Activity className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-sm font-bold text-white">SignalSync</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                AI-powered adaptive traffic signal management for Colombo. A B2G smart city platform designed for Sri Lanka's Road Development Authority.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-slate-300 mb-3 uppercase tracking-wider">Platform</h4>
              <ul className="space-y-2 text-xs text-slate-500">
                <li><Link to="/solution" className="hover:text-slate-300 transition-colors">Solution Overview</Link></li>
                <li><Link to="/platform/dashboard" className="hover:text-slate-300 transition-colors">Operations Dashboard</Link></li>
                <li><Link to="/platform/cctv" className="hover:text-slate-300 transition-colors">CCTV Intelligence</Link></li>
                <li><Link to="/platform/reports" className="hover:text-slate-300 transition-colors">Analytics & Reports</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-slate-300 mb-3 uppercase tracking-wider">Public Services</h4>
              <ul className="space-y-2 text-xs text-slate-500">
                <li><Link to="/map" className="hover:text-slate-300 transition-colors">Congestion Map</Link></li>
                <li><Link to="/alerts" className="hover:text-slate-300 transition-colors">Incident Alerts</Link></li>
                <li><Link to="/routes" className="hover:text-slate-300 transition-colors">Route Guidance</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-slate-300 mb-3 uppercase tracking-wider">Governance</h4>
              <ul className="space-y-2 text-xs text-slate-500">
                <li><span className="text-slate-600">Privacy Policy</span></li>
                <li><span className="text-slate-600">Data Governance</span></li>
                <li><span className="text-slate-600">Terms of Service</span></li>
                <li><Link to="/platform/audit" className="hover:text-slate-300 transition-colors">Audit Framework</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-brand-border flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-slate-600">
              © 2026 SignalSync · Road Development Authority of Sri Lanka · Prototype — Coursework Demonstration
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-600">
              <span>System Status: <span className="text-emerald-400">Operational</span></span>
              <span>Uptime: 99.7%</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
