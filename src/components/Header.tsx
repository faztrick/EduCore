import { Bell, MoreVertical, BarChart3, Users, ClipboardList } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mobileActions = [
    { label: 'Dashboard', icon: BarChart3, to: '/' },
    { label: 'Students', icon: Users, to: '/students' },
    { label: 'Observations', icon: ClipboardList, to: '/observations' },
  ];

  return (
    <header className="sticky top-0 z-20 glass border-b border-gray-200/50 px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="min-w-0">
          <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent truncate">
            {title}
          </h1>
          {subtitle && <p className="text-xs sm:text-sm text-gray-500 mt-0.5 truncate">{subtitle}</p>}
        </div>

        <div className="relative flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors sm:hidden"
            aria-label="More options"
          >
            <MoreVertical size={18} />
          </button>

          {isMenuOpen && (
            <div className="absolute top-11 right-0 w-44 bg-white/95 backdrop-blur-xl border border-gray-200/80 shadow-xl rounded-xl p-1.5 sm:hidden">
              {mobileActions.map(({ label, icon: Icon, to }) => (
                <button
                  key={to}
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate(to);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-left text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 rounded-lg transition-colors"
                >
                  <Icon size={15} />
                  {label}
                </button>
              ))}
            </div>
          )}

          {/* Notifications */}
          <button className="relative p-2 sm:p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
          </button>

          {/* Avatar */}
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-[10px] sm:text-xs font-bold shadow-lg shadow-blue-500/25 cursor-pointer hover:scale-105 transition-transform">
            UIS
          </div>
        </div>
      </div>
    </header>
  );
}
