/* ─── ViewModel: Student List ─── */
import { useState, useMemo } from 'react';
import { StudentService } from '../services/StudentService';

export function useStudentListViewModel() {
  const [search, setSearch] = useState('');
  const [gradeFilter, setGradeFilter] = useState('all');

  const allStudents = StudentService.getAll();
  const grades = useMemo(() => StudentService.getGrades(), []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return allStudents.filter((s) => {
      const matchSearch =
        s.name.toLowerCase().includes(q) ||
        s.rollNumber.includes(q) ||
        s.email.toLowerCase().includes(q);
      const matchGrade = gradeFilter === 'all' || s.grade === gradeFilter;
      return matchSearch && matchGrade;
    });
  }, [allStudents, search, gradeFilter]);

  return {
    search,
    setSearch,
    gradeFilter,
    setGradeFilter,
    grades,
    students: filtered,
    totalCount: allStudents.length,
  };
}
