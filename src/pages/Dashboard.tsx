import { Link } from 'react-router-dom';
import { Users, ClipboardList, GraduationCap, TrendingUp, ChevronRight, Calendar } from 'lucide-react';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import CategoryBadge from '../components/CategoryBadge';
import { useDashboardViewModel } from '../viewmodels/useDashboardViewModel';
import { ObservationCategory } from '../models/Observation';

export default function Dashboard() {
  const { stats, recentObservations, categoryCounts } = useDashboardViewModel();

  const barColors: Record<ObservationCategory, string> = {
    academic: 'bg-blue-500',
    behavioral: 'bg-amber-500',
    social: 'bg-emerald-500',
    attendance: 'bg-purple-500',
  };

  return (
    <div className="min-h-screen">
      <Header title="Dashboard" subtitle="Welcome back! Here's what's happening." />

      <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            label="Total Students"
            value={stats.totalStudents}
            icon={<Users size={22} className="text-blue-600" />}
            gradient="bg-blue-100"
            trend={{ value: 12, positive: true }}
          />
          <StatCard
            label="Observations"
            value={stats.totalObs}
            icon={<ClipboardList size={22} className="text-emerald-600" />}
            gradient="bg-emerald-100"
            trend={{ value: 8, positive: true }}
          />
          <StatCard
            label="Grades Covered"
            value={stats.gradeCount}
            icon={<GraduationCap size={22} className="text-amber-600" />}
            gradient="bg-amber-100"
          />
          <StatCard
            label="This Week"
            value={stats.thisWeek}
            icon={<TrendingUp size={22} className="text-purple-600" />}
            gradient="bg-purple-100"
            trend={{ value: 5, positive: true }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent observations */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-2xl border border-white/60 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-gray-400" />
                <h2 className="font-semibold text-gray-900">Recent Observations</h2>
              </div>
              <Link to="/observations" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 group">
                View all
                <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
            <div className="divide-y divide-gray-50">
              {recentObservations.map((o) => (
                <div key={o.id} className="px-6 py-4 hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-start gap-4">
                    {o.imageUrl && (
                      <img src={o.imageUrl} alt="" className="w-16 h-12 rounded-lg object-cover hidden sm:block" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <Link
                          to={`/students/${o.studentId}`}
                          className="font-medium text-gray-900 hover:text-blue-600 transition-colors"
                        >
                          {o.studentName}
                        </Link>
                        <CategoryBadge category={o.category} />
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-1">{o.summary}</p>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap">{o.date}</span>
                  </div>
                </div>
              ))}
              {recentObservations.length === 0 && (
                <div className="px-6 py-12 text-center text-gray-400">No observations yet.</div>
              )}
            </div>
          </div>

          {/* Category breakdown */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/60 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">By Category</h2>
            </div>
            <div className="p-6 space-y-5">
              {(['academic', 'behavioral', 'social', 'attendance'] as const).map((cat) => {
                const count = categoryCounts[cat];
                const pct = stats.totalObs > 0 ? Math.round((count / stats.totalObs) * 100) : 0;
                return (
                  <div key={cat}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 capitalize">{cat}</span>
                      <span className="text-sm text-gray-500">
                        {count} <span className="text-gray-400">({pct}%)</span>
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div
                        className={`${barColors[cat]} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
