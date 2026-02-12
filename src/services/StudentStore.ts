/* ─── Service: StudentStore (in-memory reactive store) ─── */
import { Student } from '../models/Student';
import { Observation, ObservationFormData } from '../models/Observation';
import { seedStudents } from '../data/seed';

let _students: Student[] = [...seedStudents];
let _listeners: (() => void)[] = [];

function notify() {
  _listeners.forEach((fn) => fn());
}

export const StudentStore = {
  /* ── Subscribe ── */
  subscribe(listener: () => void) {
    _listeners.push(listener);
    return () => {
      _listeners = _listeners.filter((l) => l !== listener);
    };
  },

  getSnapshot(): Student[] {
    return _students;
  },

  /* ── Students ── */
  getAll(): Student[] {
    return _students;
  },

  getById(id: string): Student | undefined {
    return _students.find((s) => s.id === id);
  },

  /* ── Observations CRUD ── */
  addObservation(studentId: string, data: ObservationFormData): Observation | null {
    const student = _students.find((s) => s.id === studentId);
    if (!student) return null;

    const obs: Observation = {
      id: `obs-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      ...data,
      date: data.date || new Date().toISOString().split('T')[0],
    };

    student.observations = [obs, ...student.observations];
    _students = [..._students];
    notify();
    return obs;
  },

  updateObservation(studentId: string, obsId: string, data: Partial<ObservationFormData>): boolean {
    const student = _students.find((s) => s.id === studentId);
    if (!student) return false;

    const idx = student.observations.findIndex((o) => o.id === obsId);
    if (idx === -1) return false;

    student.observations[idx] = { ...student.observations[idx], ...data };
    student.observations = [...student.observations];
    _students = [..._students];
    notify();
    return true;
  },

  deleteObservation(studentId: string, obsId: string): boolean {
    const student = _students.find((s) => s.id === studentId);
    if (!student) return false;

    const before = student.observations.length;
    student.observations = student.observations.filter((o) => o.id !== obsId);
    if (student.observations.length === before) return false;

    _students = [..._students];
    notify();
    return true;
  },
};
