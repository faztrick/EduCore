import { NavLink } from 'react-router-dom';
import { Users, BarChart3, ClipboardList, GraduationCap, X } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Dashboard', icon: BarChart3 },
  { to: '/students', label: 'Students', icon: Users },
  { to: '/observations', label: 'Observations', icon: ClipboardList },
];

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  return (
    <aside className="h-full w-64 bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col shadow-xl">
      {/* Logo */}
      <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl p-2.5 shadow-lg shadow-blue-500/25">
            <GraduationCap size={24} />
          </div>
          <div>
            <span className="text-lg font-bold text-white tracking-tight">UAE International School</span>
            <p className="text-[10px] text-slate-400 -mt-0.5">Student Observation Portal</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors lg:hidden">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        <p className="px-3 mb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-500">Main Menu</p>
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600/90 to-indigo-600/90 text-white shadow-lg shadow-blue-600/20'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-[10px] font-bold text-white">
            UIS
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-white truncate">UAEIS Admin</p>
            <p className="text-[10px] text-slate-500">admin@uaeis.edu</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
