/* ─── Model: Observation ─── */
export type ObservationCategory = 'academic' | 'behavioral' | 'social' | 'attendance';

export interface Observation {
  id: string;
  date: string;
  category: ObservationCategory;
  summary: string;
  details: string;
  observer: string;
  imageUrl?: string;          // optional photo / evidence attachment
}

export interface ObservationFormData {
  date: string;
  category: ObservationCategory;
  summary: string;
  details: string;
  observer: string;
  imageUrl?: string;
}
