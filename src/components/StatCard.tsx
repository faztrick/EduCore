import { ReactNode } from 'react';

interface Props {
  label: string;
  value: string | number;
  icon: ReactNode;
  trend?: { value: number; positive: boolean };
  gradient: string;
}

export default function StatCard({ label, value, icon, trend, gradient }: Props) {
  return (
    <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl border border-white/60 p-5 overflow-hidden group hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300">
      {/* Gradient blob */}
      <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full ${gradient} opacity-20 blur-2xl group-hover:opacity-30 transition-opacity`} />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && (
            <p className={`text-xs mt-2 font-medium ${trend.positive ? 'text-emerald-600' : 'text-red-500'}`}>
              {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}% from last week
            </p>
          )}
        </div>
        <div className={`rounded-xl p-3 ${gradient}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
