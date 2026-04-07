import { Info } from 'lucide-react';

interface PageInfoBoxProps {
  title: string;
  description: string;
  points?: string[];
}

export function PageInfoBox({ title, description, points }: PageInfoBoxProps) {
  return (
    <div className="rounded-lg border border-brand-cyan/20 bg-brand-cyan/5 p-4 flex gap-3">
      <Info className="w-4 h-4 text-brand-cyan flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-xs font-semibold text-brand-cyan mb-1">{title}</p>
        <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
        {points && points.length > 0 && (
          <ul className="mt-2 space-y-0.5">
            {points.map(p => (
              <li key={p} className="text-xs text-slate-500 flex items-start gap-1.5">
                <span className="text-brand-cyan mt-0.5">·</span>
                {p}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
