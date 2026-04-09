import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Search, Menu, X, Globe, AlertTriangle, ChevronRight } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { LiveIndicator } from '../ui/LiveIndicator';
import clsx from 'clsx';

const breadcrumbMap: Record<string, string> = {
  platform: 'Platform',
  dashboard: 'Dashboard',
  junctions: 'Junction Monitoring',
  cctv: 'CCTV Detection',
  incidents: 'Incident Management',
  emergency: 'Emergency Priority',
  reports: 'Reports & Analytics',
  audit: 'Audit Logs',
  admin: 'Admin',
  users: 'User Management',
  rules: 'Optimisation Rules',
};

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const crumbs = location.pathname.split('/').filter(Boolean).map(seg => ({
    label: breadcrumbMap[seg] || seg,
    path: '/' + location.pathname.split('/').slice(1, location.pathname.split('/').indexOf(seg) + 1).join('/'),
  }));

  // Fix breadcrumb paths
  const pathParts = location.pathname.split('/').filter(Boolean);
  const crumbsFixed = pathParts.map((seg, i) => ({
    label: breadcrumbMap[seg] || seg,
    path: '/' + pathParts.slice(0, i + 1).join('/'),
  }));

  return (
    <div className="flex h-screen overflow-hidden bg-brand-navy">
      {/* Sidebar */}
      <Sidebar collapsed={!sidebarOpen} />

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="h-12 flex-shrink-0 flex items-center gap-3 px-4 border-b border-brand-border bg-brand-panel">
          <button
            onClick={() => setSidebarOpen(v => !v)}
            className="text-slate-400 hover:text-white transition-colors"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1 text-xs text-slate-500 min-w-0 flex-1">
            <span>SignalSync</span>
            {crumbsFixed.map((crumb, i) => (
              <span key={crumb.path} className="flex items-center gap-1">
                <ChevronRight className="w-3 h-3 flex-shrink-0" />
                <span className={clsx(
                  i === crumbsFixed.length - 1 ? 'text-slate-300 font-medium' : 'hover:text-slate-300 cursor-pointer'
                )}>
                  {crumb.label}
                </span>
              </span>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <LiveIndicator label="LIVE" color="green" />

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search junctions, incidents…"
                className="bg-brand-slate border border-brand-border rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-brand-cyan/50 w-52"
              />
            </div>

            <button className="relative text-slate-400 hover:text-white transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border border-brand-panel" />
            </button>

            <Link
              to="/"
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors border border-brand-border px-2.5 py-1.5 rounded-lg"
            >
              <Globe className="w-3 h-3" />
              <span>Public</span>
            </Link>
          </div>
        </header>

        {/* Active alerts banner */}
        <div className="flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border-b border-amber-500/20">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
          <span className="text-xs text-amber-300">
            <strong>2 active incidents</strong> — INC-0041: Collision at Liberty Roundabout (Manual Override active) &nbsp;·&nbsp; INC-0040: VIP Movement, Emergency Priority on J08
          </span>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-5 bg-brand-navy">
          {children}
        </main>
      </div>
    </div>
  );
}
