import { Student } from '../models/Student';

interface Props {
  student: Student;
  size?: 'sm' | 'md' | 'lg';
}

export default function Avatar({ student, size = 'md' }: Props) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-11 h-11 text-sm',
    lg: 'w-16 h-16 text-lg',
  };

  if (student.avatarUrl) {
    return (
      <img
        src={student.avatarUrl}
        alt={student.name}
        className={`${sizeClasses[size]} rounded-2xl object-cover ring-2 ring-white/80 shadow-lg bg-gray-100`}
      />
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white flex items-center justify-center font-bold shadow-lg ring-2 ring-white/80`}
    >
      {student.initials}
    </div>
  );
}
