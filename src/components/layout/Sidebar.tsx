import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, MapPin, Camera, AlertTriangle, Siren,
  BarChart3, ScrollText, Users, Settings, ChevronRight,
  Activity, Shield, Zap,
} from 'lucide-react';
import clsx from 'clsx';

const navSections = [
  {
    label: 'Operations',
    items: [
      { to: '/platform/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/platform/junctions', label: 'Junction Monitoring', icon: MapPin },
      { to: '/platform/cctv', label: 'CCTV Detection', icon: Camera },
      { to: '/platform/incidents', label: 'Incident Management', icon: AlertTriangle },
      { to: '/platform/emergency', label: 'Emergency Priority', icon: Siren },
    ],
  },
  {
    label: 'Reporting',
    items: [
      { to: '/platform/reports', label: 'Reports & Analytics', icon: BarChart3 },
      { to: '/platform/audit', label: 'Audit Logs', icon: ScrollText },
    ],
  },
  {
    label: 'Administration',
    items: [
      { to: '/admin/users', label: 'User Management', icon: Users },
      { to: '/admin/rules', label: 'Optimisation Rules', icon: Settings },
    ],
  },
];

interface SidebarProps {
  collapsed?: boolean;
}

export function Sidebar({ collapsed = false }: SidebarProps) {
  const location = useLocation();

  return (
    <aside className={clsx(
      'flex flex-col h-full bg-brand-panel border-r border-brand-border transition-all duration-200',
      collapsed ? 'w-14' : 'w-56'
    )}>
      {/* Logo */}
      <div className={clsx(
        'flex items-center gap-2.5 px-4 py-4 border-b border-brand-border flex-shrink-0',
        collapsed && 'justify-center px-0'
      )}>
        <div className="w-7 h-7 rounded-lg bg-brand-blue flex items-center justify-center flex-shrink-0 glow-blue">
          <Activity className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <div>
            <div className="text-sm font-bold text-white tracking-tight">SignalSync</div>
            <div className="text-[9px] text-slate-500 font-medium uppercase tracking-widest">Operations</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 overflow-y-auto">
        {navSections.map(section => (
          <div key={section.label} className="mb-4">
            {!collapsed && (
              <div className="px-4 mb-1.5 section-heading">{section.label}</div>
            )}
            {section.items.map(item => {
              const Icon = item.icon;
              const active = location.pathname === item.to ||
                (item.to !== '/platform/dashboard' && location.pathname.startsWith(item.to));
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={clsx(
                    'flex items-center gap-2.5 mx-2 px-2 py-2 rounded-lg text-sm font-medium transition-all duration-100 group',
                    collapsed && 'justify-center',
                    active
                      ? 'bg-brand-blue/20 text-brand-cyan border border-brand-blue/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  )}
                >
                  <Icon className={clsx('flex-shrink-0', collapsed ? 'w-4.5 h-4.5' : 'w-4 h-4',
                    active ? 'text-brand-cyan' : 'text-slate-500 group-hover:text-slate-300')} />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                  {!collapsed && active && <ChevronRight className="w-3 h-3 ml-auto text-brand-cyan/60" />}
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className={clsx(
        'border-t border-brand-border px-3 py-3 flex-shrink-0',
        collapsed ? 'flex justify-center' : ''
      )}>
        {collapsed ? (
          <div className="w-6 h-6 rounded-full bg-brand-border flex items-center justify-center">
            <Shield className="w-3 h-3 text-slate-400" />
          </div>
        ) : (
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-brand-border flex items-center justify-center flex-shrink-0">
              <Shield className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-medium text-slate-300 truncate">Sunil Bandara</div>
              <div className="text-[10px] text-slate-500 truncate">System Administrator</div>
            </div>
            <Zap className="w-3.5 h-3.5 text-brand-cyan ml-auto flex-shrink-0" />
          </div>
        )}
      </div>
    </aside>
  );
}
