/* ─── Service: StudentService (Repository / Data Access) ─── */
import { Student, Observation, ObservationFormData } from '../models';

// ── Seed data ──────────────────────────────────────────────────────────────────
const students: Student[] = [
  {
    id: '1',
    name: 'Omar Al Mansoori',
    initials: 'OM',
    grade: '10',
    section: 'A',
    rollNumber: '1001',
    avatarUrl: 'https://api.dicebear.com/9.x/notionists/svg?seed=Omar&backgroundColor=b6e3f4',
    email: 'aarav.sharma@school.edu',
    parentName: 'Rajesh Sharma',
    parentPhone: '+91 98765 43210',
    observations: [
      {
        id: 'o1',
        date: '2026-02-10',
        category: 'academic',
        summary: 'Excellent performance in Mathematics test',
        details:
          'Scored 95/100 in the weekly assessment. Shows strong analytical skills and solves complex problems independently.',
        observer: 'Mrs. Gupta',
        imageUrl: 'https://images.unsplash.com/photo-1596496050827-8299e0220de1?w=400&q=80',
      },
      {
        id: 'o2',
        date: '2026-02-08',
        category: 'behavioral',
        summary: 'Helpful towards classmates',
        details:
          'Voluntarily helped three classmates understand the trigonometry chapter during free period. Demonstrates leadership qualities.',
        observer: 'Mr. Verma',
      },
      {
        id: 'o3',
        date: '2026-02-05',
        category: 'social',
        summary: 'Active participation in group discussion',
        details:
          'Led the team during the intra-class debate on climate change. Well-researched arguments and encouraged peers to participate.',
        observer: 'Ms. Iyer',
      },
    ],
    relations: [
      { studentId: '4', relation: 'cousin_sister' },
    ],
  },
  {
    id: '2',
    name: 'Fatima Al Nuaimi',
    initials: 'FN',
    grade: '10',
    section: 'A',
    rollNumber: '1002',
    avatarUrl: 'https://api.dicebear.com/9.x/notionists/svg?seed=Fatima&backgroundColor=ffd5dc',
    email: 'priya.patel@school.edu',
    parentName: 'Meena Patel',
    parentPhone: '+91 98765 43211',
    observations: [
      {
        id: 'o4',
        date: '2026-02-11',
        category: 'academic',
        summary: 'Outstanding science project submission',
        details:
          'Submitted a well-structured project on renewable energy with a working solar panel model. Creativity and research quality were exceptional.',
        observer: 'Dr. Reddy',
        imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&q=80',
      },
      {
        id: 'o5',
        date: '2026-02-07',
        category: 'attendance',
        summary: 'Perfect attendance this month',
        details:
          'Has maintained 100% attendance for the entire month. Always arrives on time and is well-prepared for classes.',
        observer: 'Mrs. Gupta',
      },
    ],
    relations: [
      { studentId: '6', relation: 'cousin_sister' },
    ],
  },
  {
    id: '3',
    name: 'Zayed Al Mazrouei',
    initials: 'ZM',
    grade: '10',
    section: 'B',
    rollNumber: '1003',
    avatarUrl: 'https://api.dicebear.com/9.x/notionists/svg?seed=Zayed&backgroundColor=c0aede',
    email: 'rohan.desai@school.edu',
    parentName: 'Sunil Desai',
    parentPhone: '+91 98765 43212',
    observations: [
      {
        id: 'o6',
        date: '2026-02-09',
        category: 'behavioral',
        summary: 'Needs improvement in class discipline',
        details:
          'Was found talking during the lecture multiple times. A gentle reminder was given. Will monitor for the next week.',
        observer: 'Mr. Verma',
      },
      {
        id: 'o7',
        date: '2026-02-06',
        category: 'academic',
        summary: 'Improvement seen in English writing',
        details:
          'Essay writing has improved significantly compared to last month. Vocabulary usage and sentence structure show marked progress.',
        observer: 'Ms. Iyer',
      },
      {
        id: 'o8',
        date: '2026-02-03',
        category: 'social',
        summary: 'Participated in sports day event',
        details:
          'Won second place in the 200m sprint. Showed great sportsmanship by congratulating the winner and encouraging teammates.',
        observer: 'Coach Kumar',
        imageUrl: 'https://images.unsplash.com/photo-1461896836934-bd45ba7e4cac?w=400&q=80',
      },
    ],
    relations: [
      { studentId: '7', relation: 'cousin_brother' },
    ],
  },
  {
    id: '4',
    name: 'Aisha Al Falasi',
    initials: 'AF',
    grade: '9',
    section: 'A',
    rollNumber: '0901',
    avatarUrl: 'https://api.dicebear.com/9.x/notionists/svg?seed=Aisha&backgroundColor=ffdfbf',
    email: 'ananya.k@school.edu',
    parentName: 'Lakshmi Krishnan',
    parentPhone: '+91 98765 43213',
    observations: [
      {
        id: 'o9',
        date: '2026-02-10',
        category: 'academic',
        summary: 'Consistent top performer in Science',
        details:
          'Ranked first in the unit test with 98/100. Her lab work is meticulous and she maintains an excellent lab notebook.',
        observer: 'Dr. Reddy',
      },
      {
        id: 'o10',
        date: '2026-02-04',
        category: 'social',
        summary: 'Organized classroom library initiative',
        details:
          'Took the initiative to organize a mini-library in the classroom. Cataloged 50+ books and created a lending system for classmates.',
        observer: 'Mrs. Gupta',
      },
    ],
    relations: [
      { studentId: '1', relation: 'cousin_brother' },
    ],
  },
  {
    id: '5',
    name: 'Khalid Al Suwaidi',
    initials: 'KS',
    grade: '9',
    section: 'B',
    rollNumber: '0902',
    avatarUrl: 'https://api.dicebear.com/9.x/notionists/svg?seed=Khalid&backgroundColor=d1f4d9',
    email: 'vikram.singh@school.edu',
    parentName: 'Harpreet Singh',
    parentPhone: '+91 98765 43214',
    observations: [
      {
        id: 'o11',
        date: '2026-02-11',
        category: 'attendance',
        summary: 'Absent for three consecutive days',
        details:
          'Was absent from Feb 6-8. Parent informed that the student had fever. Medical certificate received. Needs to catch up on missed work.',
        observer: 'Mr. Verma',
      },
      {
        id: 'o12',
        date: '2026-02-02',
        category: 'behavioral',
        summary: 'Showed great initiative in class',
        details:
          'Volunteered to present the history project first. Delivered a well-prepared presentation on the Indian independence movement.',
        observer: 'Ms. Iyer',
      },
    ],
    relations: [
      { studentId: '8', relation: 'sister' },
    ],
  },
  {
    id: '6',
    name: 'Maryam Al Hammadi',
    initials: 'MH',
    grade: '11',
    section: 'A',
    rollNumber: '1101',
    avatarUrl: 'https://api.dicebear.com/9.x/notionists/svg?seed=Maryam&backgroundColor=ffd5dc',
    email: 'sneha.nair@school.edu',
    parentName: 'Ramesh Nair',
    parentPhone: '+91 98765 43215',
    observations: [
      {
        id: 'o13',
        date: '2026-02-10',
        category: 'academic',
        summary: 'Excellent coding skills demonstrated',
        details:
          'Built a working calculator app during the computer science practical. Code was clean, well-commented, and followed best practices.',
        observer: 'Mr. Joshi',
        imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80',
      },
      {
        id: 'o14',
        date: '2026-02-07',
        category: 'social',
        summary: 'Mentoring junior students',
        details:
          'Spent time during lunch breaks helping Class 9 students with their Python assignments. Shows maturity and willingness to help.',
        observer: 'Mr. Joshi',
      },
      {
        id: 'o15',
        date: '2026-02-01',
        category: 'behavioral',
        summary: 'Excellent classroom conduct',
        details:
          'Consistently demonstrates respectful behavior. Follows classroom rules and sets a positive example for peers.',
        observer: 'Mrs. Gupta',
      },
    ],
    relations: [
      { studentId: '2', relation: 'cousin_sister' },
    ],
  },
  {
    id: '7',
    name: 'Saif Al Marri',
    initials: 'SM',
    grade: '11',
    section: 'B',
    rollNumber: '1102',
    avatarUrl: 'https://api.dicebear.com/9.x/notionists/svg?seed=Saif&backgroundColor=b6e3f4',
    email: 'arjun.mehta@school.edu',
    parentName: 'Deepak Mehta',
    parentPhone: '+91 98765 43216',
    observations: [
      {
        id: 'o16',
        date: '2026-02-09',
        category: 'academic',
        summary: 'Struggling with Physics concepts',
        details:
          'Finding it difficult to grasp electromagnetism. Extra tutorial sessions recommended. One-on-one session scheduled for next week.',
        observer: 'Dr. Reddy',
      },
      {
        id: 'o17',
        date: '2026-02-05',
        category: 'attendance',
        summary: 'Frequently late to morning classes',
        details:
          'Has been late to first period 4 times this month. Parent meeting scheduled to discuss and find a solution.',
        observer: 'Mr. Verma',
      },
    ],
    relations: [
      { studentId: '3', relation: 'cousin_brother' },
    ],
  },
  {
    id: '8',
    name: 'Noor Al Kaabi',
    initials: 'NK',
    grade: '8',
    section: 'A',
    rollNumber: '0801',
    avatarUrl: 'https://api.dicebear.com/9.x/notionists/svg?seed=Noor&backgroundColor=ffdfbf',
    email: 'kavya.joshi@school.edu',
    parentName: 'Amit Joshi',
    parentPhone: '+91 98765 43217',
    observations: [
      {
        id: 'o18',
        date: '2026-02-11',
        category: 'academic',
        summary: 'Won inter-school quiz competition',
        details:
          'Represented the school at the district-level quiz and secured first place. Exceptional general knowledge and quick thinking.',
        observer: 'Ms. Iyer',
        imageUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&q=80',
      },
      {
        id: 'o19',
        date: '2026-02-06',
        category: 'social',
        summary: 'Active in cultural committee',
        details:
          'Playing a key role in organizing the upcoming annual day celebrations. Coordinating with multiple teams effectively.',
        observer: 'Mrs. Gupta',
      },
    ],
    relations: [
      { studentId: '5', relation: 'brother' },
    ],
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────────
let nextObsId = 20;
function generateId(): string {
  return `o${nextObsId++}`;
}

// ── Public API ─────────────────────────────────────────────────────────────────
export const StudentService = {
  getAll(): Student[] {
    return students;
  },

  getById(id: string): Student | undefined {
    return students.find((s) => s.id === id);
  },

  getGrades(): string[] {
    return [...new Set(students.map((s) => s.grade))].sort();
  },

  addObservation(studentId: string, data: ObservationFormData): Observation | null {
    const student = students.find((s) => s.id === studentId);
    if (!student) return null;
    const obs: Observation = { id: generateId(), ...data };
    student.observations.unshift(obs);
    return obs;
  },

  updateObservation(studentId: string, observationId: string, data: ObservationFormData): boolean {
    const student = students.find((s) => s.id === studentId);
    if (!student) return false;
    const idx = student.observations.findIndex((o) => o.id === observationId);
    if (idx === -1) return false;
    student.observations[idx] = { ...student.observations[idx], ...data };
    return true;
  },

  deleteObservation(studentId: string, observationId: string): boolean {
    const student = students.find((s) => s.id === studentId);
    if (!student) return false;
    const idx = student.observations.findIndex((o) => o.id === observationId);
    if (idx === -1) return false;
    student.observations.splice(idx, 1);
    return true;
  },

  getAllObservations() {
    return students.flatMap((s) =>
      s.observations.map((o) => ({
        ...o,
        studentId: s.id,
        studentName: s.name,
        grade: s.grade,
        section: s.section,
      })),
    );
  },
};
