import React from 'react';
import { useStudentListViewModel } from '../viewmodels/useStudentListViewModel';
import { Link } from 'react-router-dom';
import { Search, Filter, ChevronRight, BookOpen, Users as UsersIcon } from 'lucide-react';
import Header from '../components/Header';
import Avatar from '../components/Avatar';

const StudentList: React.FC = () => {
  const { students, search, setSearch, gradeFilter, setGradeFilter, grades, totalCount } =
    useStudentListViewModel();

  return (
    <div className="min-h-screen">
      <Header title="Students" subtitle={`${totalCount} students enrolled`} />

      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Filters bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all placeholder:text-gray-400"
              placeholder="Search by name, roll number, or email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="relative">
            <Filter
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <select
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value)}
              className="appearance-none pl-10 pr-8 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 cursor-pointer transition-all"
            >
              <option value="all">All Grades</option>
              {grades.map((g) => (
                <option key={g} value={g}>
                  Grade {g}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Student cards grid */}
        {students.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {students.map((student) => (
              <Link
                key={student.id}
                to={`/students/${student.id}`}
                className="group relative bg-white/80 backdrop-blur-xl rounded-2xl border border-white/60 p-5 hover:shadow-xl hover:shadow-gray-200/60 hover:border-gray-200 transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="flex items-start gap-4">
                  <Avatar student={student} size="md" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                      {student.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-0.5">
                      Grade {student.grade} · Section {student.section}
                    </p>
                    <p className="text-xs text-gray-400 mt-1 truncate">{student.email}</p>
                  </div>
                  <ChevronRight
                    size={18}
                    className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1"
                  />
                </div>

                {/* Stats row */}
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <BookOpen size={13} className="text-blue-500" />
                    <span>
                      <span className="font-semibold text-gray-700">
                        {student.observations.length}
                      </span>{' '}
                      observations
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <UsersIcon size={13} className="text-emerald-500" />
                    <span>Roll #{student.rollNumber}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
              <UsersIcon size={28} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">No students found</h3>
            <p className="text-sm text-gray-500">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentList;
