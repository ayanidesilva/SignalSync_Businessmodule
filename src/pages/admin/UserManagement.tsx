import { useState } from 'react';
import { users, roles } from '../../data/users';
import { UserStatusBadge, RoleBadge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Users, Plus, Search, Shield, CheckCircle, XCircle, Edit, Lock, Unlock, Eye } from 'lucide-react';
import clsx from 'clsx';

export function UserManagement() {
  const [activeTab, setActiveTab] = useState<'users' | 'roles'>('users');
  const [createModal, setCreateModal] = useState(false);
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [created, setCreated] = useState(false);

  const filtered = users.filter(u => {
    const roleOk = filterRole === 'all' || u.role === filterRole;
    const searchOk = !search ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.department.toLowerCase().includes(search.toLowerCase());
    return roleOk && searchOk;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-400" />
            User & Role Management
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">Manage platform users, roles, and access boundaries</p>
        </div>
        <button onClick={() => { setCreateModal(true); setCreated(false); }} className="btn-primary text-sm">
          <Plus className="w-4 h-4" />
          Add User
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-brand-border">
        {[
          { id: 'users', label: `Users (${users.length})` },
          { id: 'roles', label: `Roles & Permissions (${roles.length})` },
        ].map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id as 'users' | 'roles')}
            className={clsx('px-4 py-2.5 text-xs font-medium border-b-2 transition-colors -mb-px',
              activeTab === t.id ? 'border-brand-cyan text-brand-cyan' : 'border-transparent text-slate-400 hover:text-slate-200'
            )}>
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'users' && (
        <div className="space-y-4 animate-fade-up">
          {/* Filters */}
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-48">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search users, email, department…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="input pl-9"
              />
            </div>
            <select className="select text-xs py-2 w-52" value={filterRole} onChange={e => setFilterRole(e.target.value)}>
              <option value="all">All Roles</option>
              <option>System Administrator</option>
              <option>Traffic Administrator</option>
              <option>Police Officer</option>
              <option>Field Technician</option>
              <option>Agency Viewer</option>
            </select>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Total Users', value: users.length, color: 'text-white' },
              { label: 'Active', value: users.filter(u => u.status === 'Active').length, color: 'text-emerald-400' },
              { label: 'With MFA', value: users.filter(u => u.mfaEnabled).length, color: 'text-brand-cyan' },
              { label: 'Suspended', value: users.filter(u => u.status === 'Suspended').length, color: 'text-red-400' },
            ].map(s => (
              <div key={s.label} className="panel-sm p-3 text-center">
                <div className={`text-2xl font-bold font-mono ${s.color}`}>{s.value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Users Table */}
          <div className="panel overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-brand-border bg-brand-slate/50">
                  {['User', 'Role', 'Department', 'Status', 'MFA', 'Last Login', 'Permissions', 'Actions'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-[10px] text-slate-500 font-semibold uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(user => (
                  <tr key={user.id} className={clsx('table-row', user.status === 'Suspended' && 'opacity-60')}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-brand-border flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-semibold text-slate-300">{user.name.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="text-slate-200 font-medium">{user.name}</div>
                          <div className="text-slate-500 text-[10px]">{user.email}</div>
                          {user.badge && <div className="text-slate-600 text-[10px]">Badge {user.badge}</div>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3"><RoleBadge role={user.role} /></td>
                    <td className="px-4 py-3">
                      <div className="text-slate-300 max-w-[160px] truncate">{user.department}</div>
                      <div className="text-slate-500 text-[10px] max-w-[160px] truncate">
                        {user.accessZones.join(', ')}
                      </div>
                    </td>
                    <td className="px-4 py-3"><UserStatusBadge status={user.status} /></td>
                    <td className="px-4 py-3">
                      {user.mfaEnabled
                        ? <CheckCircle className="w-4 h-4 text-emerald-400" />
                        : <XCircle className="w-4 h-4 text-red-400" />}
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-400 text-[10px] whitespace-nowrap">{user.lastLogin}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {user.canOverride && <span className="badge-amber text-[10px]">Override</span>}
                        {user.canPublishAdvisory && <span className="badge-blue text-[10px]">Advisory</span>}
                        {user.canModifyRules && <span className="badge-purple text-[10px]">Rules</span>}
                        {!user.canOverride && !user.canPublishAdvisory && !user.canModifyRules && (
                          <span className="badge-slate text-[10px]">Read Only</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button className="text-brand-cyan hover:text-cyan-300 transition-colors">
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        {user.status === 'Active' ? (
                          <button className="text-amber-400 hover:text-amber-300 transition-colors">
                            <Lock className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button className="text-emerald-400 hover:text-emerald-300 transition-colors">
                            <Unlock className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'roles' && (
        <div className="space-y-4 animate-fade-up">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {roles.map(role => (
              <div key={role.id} className="panel p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-semibold text-white">{role.name}</h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{role.description}</p>
                  </div>
                  <div className="text-xs text-slate-500 flex-shrink-0 ml-3">
                    {users.filter(u => u.role === role.name).length} users
                  </div>
                </div>
                <div className="section-heading mb-2">Permissions</div>
                <div className="flex flex-wrap gap-1.5">
                  {role.permissions.map(p => (
                    <div key={p} className="flex items-center gap-1 text-xs text-slate-300">
                      <CheckCircle className="w-3 h-3 text-brand-cyan" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 panel-sm border-l-4 border-purple-500 text-xs text-slate-400">
            <strong className="text-purple-400">Role Architecture:</strong> SignalSync uses a strict role-based access control (RBAC) model. Roles cannot be modified without System Administrator approval. All role changes are logged to the audit trail.
          </div>
        </div>
      )}

      {/* Create User Modal */}
      <Modal
        open={createModal}
        onClose={() => setCreateModal(false)}
        title="Add New User"
        subtitle="Create a new platform user account with appropriate role and access zones"
        width="lg"
        footer={
          <>
            <button onClick={() => setCreateModal(false)} className="btn-secondary text-xs">Cancel</button>
            <button
              onClick={() => { setCreated(true); setTimeout(() => setCreateModal(false), 1500); }}
              className="btn-primary text-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              {created ? 'User Created' : 'Create User'}
            </button>
          </>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Full Name</label>
            <input className="input" placeholder="e.g. Inspector K. Silva" />
          </div>
          <div>
            <label className="label">Email Address</label>
            <input className="input" type="email" placeholder="ksilva@police.gov.lk" />
          </div>
          <div>
            <label className="label">Role</label>
            <select className="select">
              {roles.map(r => <option key={r.id}>{r.name}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Department</label>
            <input className="input" placeholder="e.g. Sri Lanka Police — Traffic Division" />
          </div>
          <div>
            <label className="label">Badge Number (if applicable)</label>
            <input className="input" placeholder="#0XXX" />
          </div>
          <div>
            <label className="label">Require MFA at First Login</label>
            <select className="select">
              <option>Yes — enforce MFA</option>
              <option>No — optional (not recommended)</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="label">Access Zones</label>
            <select className="select" multiple>
              <option>All Corridors</option>
              <option>Galle Road Corridor</option>
              <option>Maradana–Pettah</option>
              <option>High Level Road</option>
              <option>Borella–Maradana</option>
              <option>Rajagiriya–Kotte</option>
            </select>
            <p className="text-[10px] text-slate-500 mt-1">Hold Ctrl/Cmd to select multiple zones</p>
          </div>
          {created && (
            <div className="sm:col-span-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 flex items-center gap-2 animate-fade-up">
              <CheckCircle className="w-4 h-4" />
              User account created. Welcome email with setup instructions dispatched. Entry logged to audit trail.
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
