/* ─── ViewModel: Dashboard ─── */
import { useMemo } from 'react';
import { StudentService } from '../services/StudentService';
import { ObservationCategory } from '../models';

export function useDashboardViewModel() {
  const students = StudentService.getAll();

  const totalStudents = students.length;
  const totalObservations = students.reduce((sum, s) => sum + s.observations.length, 0);
  const totalGrades = new Set(students.map((s) => s.grade)).size;

  const thisWeekCount = useMemo(() => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 86_400_000);
    return students
      .flatMap((s) => s.observations)
      .filter((o) => new Date(o.date) >= weekAgo).length;
  }, [students]);

  const recentObservations = useMemo(() => {
    return StudentService.getAllObservations()
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 6);
  }, [students]);

  const categoryCounts = useMemo(() => {
    const all = students.flatMap((s) => s.observations);
    const counts: Record<ObservationCategory, number> = {
      academic: 0,
      behavioral: 0,
      social: 0,
      attendance: 0,
    };
    all.forEach((o) => {
      counts[o.category]++;
    });
    return counts;
  }, [students]);

  return {
    stats: {
      totalStudents,
      totalObs: totalObservations,
      gradeCount: totalGrades,
      thisWeek: thisWeekCount,
    },
    recentObservations,
    categoryCounts,
  };
}
