/* ─── ViewModel: Student Detail + Observation CRUD ─── */
import { useState, useCallback } from 'react';
import { StudentService } from '../services/StudentService';
import { Observation, ObservationFormData } from '../models';

export function useStudentDetailViewModel(studentId: string) {
  const [revision, setRevision] = useState(0);          // force re-read after mutations
  const student = StudentService.getById(studentId);

  // ── Modal state ──────────────────────────────────────────────────────────────
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingObs, setEditingObs] = useState<Observation | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Observation | null>(null);

  // ── Image lightbox ───────────────────────────────────────────────────────────
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  // ── Actions ──────────────────────────────────────────────────────────────────
  const openAddForm = useCallback(() => {
    setEditingObs(null);
    setIsFormOpen(true);
  }, []);

  const openEditForm = useCallback((obs: Observation) => {
    setEditingObs(obs);
    setIsFormOpen(true);
  }, []);

  const closeForm = useCallback(() => {
    setIsFormOpen(false);
    setEditingObs(null);
  }, []);

  const saveObservation = useCallback(
    (data: ObservationFormData) => {
      if (editingObs) {
        StudentService.updateObservation(studentId, editingObs.id, data);
      } else {
        StudentService.addObservation(studentId, data);
      }
      setRevision((r) => r + 1);
      closeForm();
    },
    [studentId, editingObs, closeForm],
  );

  const confirmDelete = useCallback(
    (obs: Observation) => {
      setDeleteTarget(obs);
    },
    [],
  );

  const executeDelete = useCallback(() => {
    if (deleteTarget) {
      StudentService.deleteObservation(studentId, deleteTarget.id);
      setRevision((r) => r + 1);
      setDeleteTarget(null);
    }
  }, [studentId, deleteTarget]);

  const cancelDelete = useCallback(() => {
    setDeleteTarget(null);
  }, []);

  // sorted observations
  const sortedObservations = student
    ? [...student.observations].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      )
    : [];

  // void usage to satisfy eslint
  void revision;

  return {
    student,
    observations: sortedObservations,
    // form
    isFormOpen,
    editingObs,
    openAddForm,
    openEditForm,
    closeForm,
    saveObservation,
    // delete
    deleteTarget,
    confirmDelete,
    executeDelete,
    cancelDelete,
    // lightbox
    lightboxUrl,
    setLightboxUrl,
  };
}
