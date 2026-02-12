/* ─── Model: Student ─── */
import { Observation } from './Observation';

export type RelationType = 'brother' | 'sister' | 'cousin_brother' | 'cousin_sister' | 'twin_brother' | 'twin_sister';

export interface StudentRelation {
  studentId: string;
  relation: RelationType;
}

export interface Student {
  id: string;
  name: string;
  initials: string;
  grade: string;
  section: string;
  rollNumber: string;
  avatarUrl?: string;         // profile image URL
  email: string;
  parentName: string;
  parentPhone: string;
  observations: Observation[];
  relations?: StudentRelation[];
}
