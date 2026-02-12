import { ObservationCategory } from '../models/Observation';
import { BookOpen, Heart, Users, Calendar } from 'lucide-react';

const config: Record<ObservationCategory, { bg: string; text: string; icon: typeof BookOpen }> = {
  academic: { bg: 'bg-blue-50', text: 'text-blue-700', icon: BookOpen },
  behavioral: { bg: 'bg-amber-50', text: 'text-amber-700', icon: Heart },
  social: { bg: 'bg-emerald-50', text: 'text-emerald-700', icon: Users },
  attendance: { bg: 'bg-purple-50', text: 'text-purple-700', icon: Calendar },
};

interface Props {
  category: ObservationCategory;
  size?: 'sm' | 'md';
}

export default function CategoryBadge({ category, size = 'sm' }: Props) {
  const c = config[category];
  const Icon = c.icon;
  const base = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-3 py-1 text-xs';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-medium ${c.bg} ${c.text} ${base}`}>
      <Icon size={size === 'sm' ? 12 : 14} />
      {category.charAt(0).toUpperCase() + category.slice(1)}
    </span>
  );
}
