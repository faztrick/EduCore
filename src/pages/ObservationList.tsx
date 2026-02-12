import { Link } from 'react-router-dom';
import { Search, BookOpen, Heart, Users, Clock, ChevronRight, X } from 'lucide-react';
import { useObservationsViewModel } from '../viewmodels/useObservationsViewModel';
import Header from '../components/Header';
import CategoryBadge from '../components/CategoryBadge';
import { ObservationCategory } from '../models';

const categoryConfig: Record<ObservationCategory, { icon: typeof BookOpen; gradient: string; ring: string }> = {
  academic:   { icon: BookOpen, gradient: 'from-blue-500 to-cyan-400',   ring: 'ring-blue-200' },
  behavioral: { icon: Heart,    gradient: 'from-amber-500 to-orange-400', ring: 'ring-amber-200' },
  social:     { icon: Users,    gradient: 'from-emerald-500 to-teal-400', ring: 'ring-emerald-200' },
  attendance: { icon: Clock,    gradient: 'from-purple-500 to-pink-400',  ring: 'ring-purple-200' },
};

export default function ObservationList() {
  const vm = useObservationsViewModel();
  const selectedStudent = vm.students.find((s) => s.id === vm.selectedStudentId);

  return (
    <div className="min-h-screen">
      <Header title="Observations" subtitle={`${vm.totalCount} total observations across all students`} />

      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* ─── Left: Student list panel ─── */}
          <div className="w-full lg:w-72 xl:w-80 flex-shrink-0">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/60 shadow-sm overflow-hidden lg:sticky lg:top-20">
              <div className="px-4 py-3 border-b border-gray-100/80">
                <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Students</h2>
                <p className="text-[11px] text-gray-400 mt-0.5">{vm.students.length} enrolled</p>
              </div>

              {/* All students button */}
              <div className="p-2">
                <button
                  onClick={() => vm.setSelectedStudentId(null)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 ${
                    !vm.selectedStudentId
                      ? 'bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg shadow-gray-900/20'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                    !vm.selectedStudentId
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    <Users size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">All Students</p>
                    <p className={`text-[10px] ${!vm.selectedStudentId ? 'text-gray-300' : 'text-gray-400'}`}>
                      {vm.totalCount} observations
                    </p>
                  </div>
                </button>
              </div>

              {/* Student list */}
              <div className="px-2 pb-2 max-h-[60vh] lg:max-h-[calc(100vh-16rem)] overflow-y-auto space-y-0.5">
                {vm.students.map((s) => {
                  const active = vm.selectedStudentId === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => vm.setSelectedStudentId(active ? null : s.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 ${
                        active
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {s.avatarUrl ? (
                        <img src={s.avatarUrl} alt="" className="w-8 h-8 rounded-lg object-cover ring-1 ring-white shadow-sm" />
                      ) : (
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shadow-sm ${
                          active ? 'bg-white/20 text-white' : 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white'
                        }`}>
                          {s.initials}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">{s.name}</p>
                        <p className={`text-[10px] ${active ? 'text-blue-100' : 'text-gray-400'}`}>
                          Grade {s.grade} · {s.obsCount} obs
                        </p>
                      </div>
                      <ChevronRight size={14} className={`flex-shrink-0 transition-transform duration-200 ${
                        active ? 'text-white/70 rotate-90' : 'text-gray-300'
                      }`} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ─── Right: Observations ─── */}
          <div className="flex-1 min-w-0 space-y-4">

            {/* Active student banner */}
            {selectedStudent && (
              <div className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl px-4 py-3 text-white shadow-lg shadow-blue-500/20 animate-slideUp">
                {selectedStudent.avatarUrl ? (
                  <img src={selectedStudent.avatarUrl} alt="" className="w-9 h-9 rounded-lg object-cover ring-2 ring-white/30" />
                ) : (
                  <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center text-xs font-bold">
                    {selectedStudent.initials}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate">{selectedStudent.name}</p>
                  <p className="text-[11px] text-blue-100">Grade {selectedStudent.grade} · Section {selectedStudent.section}</p>
                </div>
                <button
                  onClick={() => vm.setSelectedStudentId(null)}
                  className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            {/* Search + category filter row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={vm.search}
                  onChange={(e) => vm.setSearch(e.target.value)}
                  placeholder="Search summary, observer…"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-white/80 backdrop-blur border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200 placeholder:text-gray-400"
                />
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {(['all', 'academic', 'behavioral', 'social', 'attendance'] as const).map((tag) => {
                  const active = vm.categoryFilter === tag;
                  const cfg = tag !== 'all' ? categoryConfig[tag] : null;
                  const Icon = cfg?.icon;
                  return (
                    <button
                      key={tag}
                      onClick={() => vm.setCategoryFilter(tag)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border transition-all duration-300 ${
                        active
                          ? tag === 'all'
                            ? 'bg-gray-900 text-white border-gray-900 shadow-lg shadow-gray-900/20'
                            : `bg-gradient-to-r ${cfg!.gradient} text-white border-transparent shadow-lg`
                          : 'bg-white/80 backdrop-blur text-gray-600 border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }`}
                    >
                      {Icon && <Icon size={12} />}
                      {tag === 'all' ? 'All' : tag.charAt(0).toUpperCase() + tag.slice(1)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Results count */}
            <p className="text-xs text-gray-400 font-medium">
              Showing {vm.observations.length} of {vm.totalCount} observations
              {selectedStudent && <span> for <span className="text-gray-600 font-semibold">{selectedStudent.name}</span></span>}
            </p>

            {/* Observation cards */}
            {vm.observations.length === 0 ? (
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/60 shadow-sm p-12 text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center mx-auto mb-3">
                  <BookOpen size={24} className="text-gray-400" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">No observations found</h3>
                <p className="text-sm text-gray-500">Try adjusting your search or filter.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {vm.observations.map((obs, i) => {
                  const cfg = categoryConfig[obs.category];
                  const Icon = cfg.icon;
                  return (
                    <Link
                      key={obs.id}
                      to={`/students/${obs.studentId}`}
                      className="group relative flex items-start gap-4 bg-white/80 backdrop-blur-xl rounded-2xl border border-white/60 shadow-sm hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-500 overflow-hidden p-4 sm:p-5 pl-5 sm:pl-6"
                      style={{ animationDelay: `${i * 30}ms` }}
                    >
                      <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${cfg.gradient} rounded-l-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />

                      <div className={`flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br ${cfg.gradient} flex items-center justify-center shadow-md ring-2 ${cfg.ring} ring-offset-1`}>
                        <Icon size={16} className="text-white sm:hidden" />
                        <Icon size={18} className="text-white hidden sm:block" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <CategoryBadge category={obs.category} />
                          <span className="text-[11px] text-gray-400 font-medium">{obs.date}</span>
                          {!selectedStudent && (
                            <span className="text-[11px] text-blue-600 font-semibold">
                              {obs.studentName}
                            </span>
                          )}
                        </div>
                        <h4 className="font-semibold text-gray-900 text-sm leading-snug">{obs.summary}</h4>
                        <p className="text-sm text-gray-500 mt-1 leading-relaxed line-clamp-2">{obs.details}</p>
                        <div className="flex items-center gap-4 mt-2 pt-2 border-t border-gray-50">
                          <span className="text-[11px] text-gray-400 font-medium">
                            by <span className="text-gray-600">{obs.observer}</span>
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
