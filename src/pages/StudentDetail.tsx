import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  Mail,
  Phone,
  User,
  Calendar,
  X,
  BookOpen,
  Heart,
  Users,
  Clock,
  ImagePlus,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useStudentDetailViewModel } from '../viewmodels/useStudentDetailViewModel';
import { StudentService } from '../services/StudentService';
import Avatar from '../components/Avatar';
import CategoryBadge from '../components/CategoryBadge';
import ConfirmDialog from '../components/ConfirmDialog';
import { ObservationCategory, ObservationFormData, RelationType } from '../models';
import { useState, useMemo, useRef, useEffect } from 'react';

const relationLabel: Record<RelationType, string> = {
  brother: 'Brother',
  sister: 'Sister',
  cousin_brother: 'Cousin Brother',
  cousin_sister: 'Cousin Sister',
  twin_brother: 'Twin Brother',
  twin_sister: 'Twin Sister',
};

const categoryConfig: Record<ObservationCategory, { icon: typeof BookOpen; gradient: string; ring: string }> = {
  academic:   { icon: BookOpen, gradient: 'from-blue-500 to-cyan-400',   ring: 'ring-blue-200' },
  behavioral: { icon: Heart,    gradient: 'from-amber-500 to-orange-400', ring: 'ring-amber-200' },
  social:     { icon: Users,    gradient: 'from-emerald-500 to-teal-400', ring: 'ring-emerald-200' },
  attendance: { icon: Clock,    gradient: 'from-purple-500 to-pink-400',  ring: 'ring-purple-200' },
};

function InlineObservationForm({
  initial,
  onSave,
  onCancel,
  isEditing,
}: {
  initial?: Partial<ObservationFormData>;
  onSave: (data: ObservationFormData) => void;
  onCancel: () => void;
  isEditing: boolean;
}) {
  const [form, setForm] = useState<ObservationFormData>({
    date: initial?.date ?? new Date().toISOString().split('T')[0],
    category: initial?.category ?? 'academic',
    summary: initial?.summary ?? '',
    details: initial?.details ?? '',
    observer: initial?.observer ?? '',
    imageUrl: initial?.imageUrl ?? '',
  });

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, []);

  useEffect(() => {
    setForm({
      date: initial?.date ?? new Date().toISOString().split('T')[0],
      category: initial?.category ?? 'academic',
      summary: initial?.summary ?? '',
      details: initial?.details ?? '',
      observer: initial?.observer ?? '',
      imageUrl: initial?.imageUrl ?? '',
    });
  }, [initial]);

  const update = (key: keyof ObservationFormData, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const activeCfg = categoryConfig[form.category];

  return (
    <div
      ref={formRef}
      className="group relative bg-white rounded-2xl border border-gray-200 shadow-xl shadow-gray-200/50 overflow-hidden animate-slideUp"
    >
      <form onSubmit={(e) => { e.preventDefault(); onSave(form); }} className="flex flex-col md:flex-row">
        
        {/* Left Side: Category Selection (Visual Vertical Menu) */}
        <div className="w-full md:w-48 bg-gray-50/50 border-b md:border-b-0 md:border-r border-gray-100 p-3 flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
          {(['academic', 'behavioral', 'social', 'attendance'] as ObservationCategory[]).map((c) => {
            const cfg = categoryConfig[c];
            const Icon = cfg.icon;
            const active = form.category === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() => update('category', c)}
                className={`flex-shrink-0 flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-left w-full ${
                  active
                    ? 'bg-white shadow-md shadow-gray-200 ring-1 ring-gray-200/50 scale-[1.02]'
                    : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${active ? `bg-gradient-to-br ${cfg.gradient} text-white shadow-sm` : 'bg-gray-200/50 text-gray-400'}`}>
                  <Icon size={14} />
                </div>
                <div className="hidden md:block">
                  <span className={`block text-xs font-bold capitalize ${active ? 'text-gray-900' : 'text-gray-500'}`}>{c}</span>
                  {active && <span className="block text-[10px] text-gray-400 font-medium leading-none mt-0.5">Selected</span>}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Side: Form Content */}
        <div className="flex-1 p-5 sm:p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-gray-900">
                {isEditing ? 'Edit Observation' : 'New Observation'}
              </h3>
              <div className="flex gap-2">
                <input 
                  type="date" 
                  value={form.date} 
                  onChange={(e) => update('date', e.target.value)} 
                  className="px-2 py-1 text-xs border border-gray-200 rounded-lg text-gray-500 bg-gray-50 focus:bg-white focus:outline-none focus:border-blue-400"
                />
                <button type="button" onClick={onCancel} className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {/* Main Input Area */}
              <div className="space-y-3">
                <input 
                  type="text" 
                  value={form.summary} 
                  onChange={(e) => update('summary', e.target.value)} 
                  className="w-full px-0 py-2 text-lg font-semibold text-gray-900 border-none focus:ring-0 placeholder:text-gray-300 bg-transparent" 
                  placeholder="What did you observe?" 
                  autoFocus
                  required 
                />
                <textarea
                  value={form.details}
                  onChange={(e) => update('details', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 text-sm text-gray-600 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:bg-white transition-all resize-none placeholder:text-gray-400"
                  placeholder="Add more details about this observation..."
                  required
                />
              </div>

              {/* Advanced/Footer Row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                   <div className="relative group/avatar">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User size={14} className="text-gray-400" />
                        </div>
                        <input 
                          type="text" 
                          value={form.observer} 
                          onChange={(e) => update('observer', e.target.value)} 
                          className="pl-9 pr-3 py-1.5 text-xs font-medium bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none w-32 placeholder:text-gray-400 transition-all" 
                          placeholder="Observer key" 
                          required 
                        />
                   </div>

                   <div className="h-4 w-px bg-gray-200 hidden sm:block"></div>

                   {/* Image Attachment Button */}
                   <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        id="form-img"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onloadend = () => update('imageUrl', reader.result as string);
                          reader.readAsDataURL(file);
                        }}
                      />
                      {form.imageUrl ? (
                        <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-2 py-1 rounded-lg border border-blue-100">
                          <ImagePlus size={14} />
                          <span className="text-xs font-medium max-w-[80px] truncate">Image Added</span>
                          <button type="button" onClick={() => update('imageUrl', '')} className="hover:text-red-500"><X size={12}/></button>
                        </div>
                      ) : (
                        <label htmlFor="form-img" className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-800 cursor-pointer px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors">
                          <ImagePlus size={16} />
                          <span>Attach Photo</span>
                        </label>
                      )}
                   </div>
                </div>

                {/* Submit Action */}
                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                   <button type="button" onClick={onCancel} className="text-xs font-semibold text-gray-500 hover:text-gray-700">Cancel</button>

                   <button type="button" className="px-3 py-2 bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-xl transition-colors active:scale-95 group/ai" title="AI Assist">
                    <Sparkles size={16} className="group-hover/ai:animate-pulse" />
                   </button>

                   <button 
                    type="submit" 
                    className={`px-6 py-2 text-sm font-semibold text-white bg-gradient-to-r ${activeCfg.gradient} rounded-xl shadow-md shadow-gray-200 hover:shadow-lg transition-all transform active:scale-95`}
                   >
                    {isEditing ? 'Update Observation' : 'Save Observation'}
                   </button>
                </div>
              </div>
            </div>
        </div>
      </form>
    </div>
  );
}

export default function StudentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const vm = useStudentDetailViewModel(id!);
  const [activeTag, setActiveTag] = useState<'all' | ObservationCategory>('all');

  const allStudents = useMemo(() => StudentService.getAll(), []);

  const filteredObservations = useMemo(() => {
    if (activeTag === 'all') return vm.observations;
    return vm.observations.filter((o) => o.category === activeTag);
  }, [vm.observations, activeTag]);

  if (!vm.student) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
          <User size={32} className="text-gray-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Student not found</h2>
        <Link
          to="/students"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Students
        </Link>
      </div>
    );
  }

  const { student } = vm;

  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = { all: vm.observations.length };
    vm.observations.forEach((o) => {
      counts[o.category] = (counts[o.category] || 0) + 1;
    });
    return counts;
  }, [vm.observations]);

  return (
    <div className="min-h-screen">
      {/* Slim top bar — back nav only, no duplicate header */}
      <div className="sticky top-0 z-20 glass border-b border-gray-200/50 px-4 sm:px-5 lg:px-6 py-3">
        <Link
          to="/students"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 transition-all duration-200 font-medium group"
        >
          <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform duration-200" /> All Students
        </Link>
      </div>

      <div className="p-4 sm:p-5 lg:p-6">

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-5">
          <div className="flex-1 min-w-0 space-y-5">

        {/* Student profile card */}
        <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl border border-white/60 shadow-lg shadow-gray-200/40">
          {/* Gradient banner — top accent */}
          <div className="h-5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-t-2xl" />

          {/* Content body */}
          <div className="px-4 sm:px-6 pt-5 pb-5">
            {/* Top row: avatar + name + action */}
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 ring-4 ring-white rounded-2xl shadow-xl">
                <Avatar student={student} size="lg" />
              </div>
              <div className="flex-1 min-w-0 pb-1">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate">{student.name}</h2>
                <p className="text-xs text-gray-500 truncate">
                  Roll #{student.rollNumber} · Grade {student.grade} · Section {student.section}
                </p>
              </div>
              {!vm.isFormOpen && (
                <button
                  onClick={vm.openAddForm}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 active:scale-[0.98] flex-shrink-0"
                >
                  <Plus size={14} /> Add Observation
                </button>
              )}
            </div>

            {/* Stats badges */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-1 text-[11px] font-semibold text-blue-700 bg-blue-50 border border-blue-100 rounded-full">
                {vm.observations.length} Observations
              </span>
              <span className="inline-flex items-center px-2.5 py-1 text-[11px] font-semibold text-pink-700 bg-pink-50 border border-pink-100 rounded-full">
                {student.relations?.length ?? 0} Family Links
              </span>
            </div>

            {/* Contact info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-100/80">
              <div className="min-w-0 flex items-center gap-2 text-[13px] text-gray-600 bg-gray-50/80 px-3 py-1.5 rounded-lg">
                <Mail size={13} className="text-blue-500 flex-shrink-0" />
                <span className="truncate">{student.email}</span>
              </div>
              <div className="min-w-0 flex items-center gap-2 text-[13px] text-gray-600 bg-gray-50/80 px-3 py-1.5 rounded-lg">
                <User size={13} className="text-emerald-500 flex-shrink-0" />
                <span className="truncate">{student.parentName}</span>
              </div>
              <div className="min-w-0 flex items-center gap-2 text-[13px] text-gray-600 bg-gray-50/80 px-3 py-1.5 rounded-lg">
                <Phone size={13} className="text-purple-500 flex-shrink-0" />
                <span className="truncate">{student.parentPhone}</span>
              </div>
            </div>

            {/* Mobile-only add button */}
            {!vm.isFormOpen && (
              <button
                onClick={vm.openAddForm}
                className="mt-4 w-full sm:hidden inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-200 active:scale-[0.98]"
              >
                <Plus size={16} /> Add Observation
              </button>
            )}
          </div>

          {/* Gradient banner — bottom accent */}
          <div className="h-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-b-2xl" />
        </div>

        {/* Tag filter chips */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mr-1">Filter</span>
          {(['all', 'academic', 'behavioral', 'social', 'attendance'] as const).map((tag) => {
            const active = activeTag === tag;
            const cfg = tag !== 'all' ? categoryConfig[tag] : null;
            const Icon = cfg?.icon;
            const count = tagCounts[tag] || 0;
            return (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full border transition-all duration-300 ${
                  active
                    ? tag === 'all'
                      ? 'bg-gray-900 text-white border-gray-900 shadow-lg shadow-gray-900/20'
                      : `bg-gradient-to-r ${cfg!.gradient} text-white border-transparent shadow-lg`
                    : 'bg-white/80 backdrop-blur text-gray-600 border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                {Icon && <Icon size={12} />}
                {tag === 'all' ? 'All' : tag.charAt(0).toUpperCase() + tag.slice(1)}
                <span className={`ml-0.5 text-[10px] px-1.5 py-0.5 rounded-full ${
                  active ? 'bg-white/20' : 'bg-gray-100'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Expanded observations list */}
        {filteredObservations.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-sm p-8 sm:p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center mx-auto mb-4">
              <Calendar size={28} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">No observations</h3>
            <p className="text-sm text-gray-500">
              {activeTag === 'all' ? 'No observations recorded yet.' : `No ${activeTag} observations found.`}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredObservations.map((obs) => {
              const cfg = categoryConfig[obs.category];
              const Icon = cfg.icon;
              const isEditingThis = vm.isFormOpen && vm.editingObs?.id === obs.id;
              return (
                <div key={obs.id} className="space-y-2">
                  <div
                    className="group relative bg-white/80 backdrop-blur-xl rounded-2xl border border-white/60 shadow-sm hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-500 overflow-hidden cursor-pointer"
                    onClick={() => vm.openEditForm(obs)}
                  >
                    <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${cfg.gradient} rounded-l-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />

                    <div className="p-4 sm:p-5 pl-5 sm:pl-6">
                      <div className="flex items-start gap-4">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${cfg.gradient} flex items-center justify-center shadow-md ring-2 ${cfg.ring} ring-offset-1`}>
                          <Icon size={18} className="text-white" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                            <CategoryBadge category={obs.category} />
                            <span className="text-[11px] text-gray-400 font-medium">{obs.date}</span>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 text-sm leading-snug">{obs.summary}</h4>
                              <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{obs.details}</p>
                            </div>

                            {obs.imageUrl && (
                              <img
                                src={obs.imageUrl}
                                alt=""
                                className="w-full sm:w-28 h-28 rounded-xl object-cover cursor-pointer hover:opacity-90 transition-opacity duration-200 ring-1 ring-gray-100 flex-shrink-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  vm.setLightboxUrl(obs.imageUrl!);
                                }}
                              />
                            )}
                          </div>

                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                            <span className="text-[11px] text-gray-400 font-medium">
                              Observed by <span className="text-gray-600">{obs.observer}</span>
                            </span>

                            <div className="flex items-center gap-0.5">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  vm.openEditForm(obs);
                                }}
                                className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                                title="Edit"
                              >
                                <Pencil size={13} />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  vm.confirmDelete(obs);
                                }}
                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                                title="Delete"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {isEditingThis && (
                    <InlineObservationForm
                      key={vm.editingObs?.id ?? 'new'}
                      initial={vm.editingObs ?? undefined}
                      onSave={vm.saveObservation}
                      onCancel={vm.closeForm}
                      isEditing={!!vm.editingObs}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Inline add/edit form — anchored at the bottom */}
        {vm.isFormOpen && !vm.editingObs && (
          <InlineObservationForm
            key="new"
            initial={vm.editingObs ?? undefined}
            onSave={vm.saveObservation}
            onCancel={vm.closeForm}
            isEditing={!!vm.editingObs}
          />
        )}

          </div>

          <div className="w-full lg:w-64 xl:w-72 flex-shrink-0">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/60 shadow-sm overflow-hidden lg:sticky lg:top-20">
              <div className="h-5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600" />
              <div className="px-4 py-3 border-b border-gray-100/80">
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Heart size={12} className="text-pink-400" /> Family Connections
                </h3>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  {student.relations?.length ?? 0} related students
                </p>
              </div>

              <div className="p-2 space-y-1.5">
                {student.relations && student.relations.length > 0 ? (
                  student.relations.map((rel) => {
                    const related = allStudents.find((s) => s.id === rel.studentId);
                    if (!related) return null;
                    return (
                      <button
                        key={rel.studentId}
                        onClick={() => navigate(`/students/${rel.studentId}`)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 bg-gradient-to-r from-pink-50/80 to-purple-50/60 hover:from-pink-100/90 hover:to-purple-100/70 border border-pink-200/50 hover:border-pink-300/60 rounded-xl text-left transition-all duration-200 group/rel"
                      >
                        <Avatar student={related} size="sm" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800 group-hover/rel:text-pink-700 transition-colors truncate">
                            {related.name}
                          </p>
                          <p className="text-[10px] text-pink-500/80 font-medium">
                            {relationLabel[rel.relation]}
                          </p>
                        </div>
                        <ChevronRight size={12} className="text-pink-300 group-hover/rel:text-pink-500 group-hover/rel:translate-x-0.5 transition-all" />
                      </button>
                    );
                  })
                ) : (
                  <div className="px-3 py-6 text-center text-sm text-gray-400">No family connections added</div>
                )}
              </div>
              <div className="h-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600" />
            </div>

            {/* Observation Stats Badges */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/60 shadow-sm overflow-hidden mt-5">
              <div className="px-4 py-3 border-b border-gray-100/80 flex justify-between items-center bg-gray-50/50">
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen size={12} className="text-teal-500" /> Performance
                </h3>
                <span className="text-[10px] font-medium text-gray-400">
                  {tagCounts['all']} Total
                </span>
              </div>
              
              <div className="p-3 grid grid-cols-2 gap-3">
                {(['academic', 'behavioral', 'social', 'attendance'] as const).map((cat) => {
                  const count = tagCounts[cat] || 0;
                  const total = tagCounts['all'] || 1; // avoid divide by zero
                  const pct = Math.round((count / total) * 100);
                  const cfg = categoryConfig[cat];
                  const Icon = cfg.icon;
                  
                  return (
                    <div key={cat} className="group relative p-3 bg-gradient-to-br from-white to-gray-50/50 rounded-xl border border-gray-100/80 hover:border-gray-300/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${cfg.gradient} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                          <Icon size={14} className="text-white" />
                        </div>
                        <span className="text-lg font-bold text-gray-900 leading-none">
                          {count}
                        </span>
                      </div>
                      
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-end">
                          <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">{cat}</span>
                          <span className="text-[10px] text-gray-400 font-medium">{pct}%</span>
                        </div>
                        
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full bg-gradient-to-r ${cfg.gradient} opacity-80 group-hover:opacity-100 transition-all duration-500`} 
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Delete confirmation */}
      <ConfirmDialog
        isOpen={!!vm.deleteTarget}
        message={`Delete observation "${vm.deleteTarget?.summary}"? This cannot be undone.`}
        onConfirm={vm.executeDelete}
        onCancel={vm.cancelDelete}
      />

      {/* Lightbox */}
      {vm.lightboxUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn"
          onClick={() => vm.setLightboxUrl(null)}
        >
          <button className="absolute top-6 right-6 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200">
            <X size={24} />
          </button>
          <img
            src={vm.lightboxUrl}
            alt=""
            className="max-w-full max-h-[85vh] rounded-3xl shadow-2xl object-contain ring-1 ring-white/10"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
