/* ─── ViewModel: Observations List ─── */
import { useState, useMemo } from 'react';
import { StudentService } from '../services/StudentService';
import { ObservationCategory } from '../models';

export function useObservationsViewModel() {
  const [categoryFilter, setCategoryFilter] = useState<'all' | ObservationCategory>('all');
  const [search, setSearch] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  const students = useMemo(() => {
    return StudentService.getAll().map((s) => ({
      id: s.id,
      name: s.name,
      initials: s.initials,
      grade: s.grade,
      section: s.section,
      avatarUrl: s.avatarUrl,
      obsCount: s.observations.length,
    }));
  }, []);

  const allObservations = useMemo(() => {
    return StudentService.getAllObservations().sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }, []);

  const filtered = useMemo(() => {
    let list = allObservations;
    if (selectedStudentId) {
      list = list.filter((o) => o.studentId === selectedStudentId);
    }
    if (categoryFilter !== 'all') {
      list = list.filter((o) => o.category === categoryFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (o) =>
          o.studentName.toLowerCase().includes(q) ||
          o.summary.toLowerCase().includes(q) ||
          o.observer.toLowerCase().includes(q),
      );
    }
    return list;
  }, [allObservations, categoryFilter, search, selectedStudentId]);

  return {
    categoryFilter,
    setCategoryFilter,
    search,
    setSearch,
    selectedStudentId,
    setSelectedStudentId,
    students,
    observations: filtered,
    totalCount: allObservations.length,
  };
}
