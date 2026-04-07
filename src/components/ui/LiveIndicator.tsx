import clsx from 'clsx';

interface LiveIndicatorProps {
  label?: string;
  color?: 'green' | 'cyan' | 'amber' | 'red';
  size?: 'sm' | 'md';
}

export function LiveIndicator({ label = 'LIVE', color = 'green', size = 'sm' }: LiveIndicatorProps) {
  const dotColors = {
    green: 'bg-emerald-400',
    cyan: 'bg-brand-cyan',
    amber: 'bg-amber-400',
    red: 'bg-red-400',
  };
  const textColors = {
    green: 'text-emerald-400',
    cyan: 'text-brand-cyan',
    amber: 'text-amber-400',
    red: 'text-red-400',
  };
  const dotSize = size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2';

  return (
    <div className="flex items-center gap-1.5">
      <span className={clsx('rounded-full live-pulse flex-shrink-0', dotColors[color], dotSize)} />
      <span className={clsx('font-mono font-semibold tracking-widest', textColors[color],
        size === 'sm' ? 'text-[10px]' : 'text-xs')}>{label}</span>
    </div>
  );
}

export function SystemTime() {
  const now = new Date();
  const time = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const date = now.toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <div className="flex flex-col items-end">
      <span className="text-sm font-mono font-semibold text-slate-200 tracking-wider">{time}</span>
      <span className="text-[10px] text-slate-500">{date}</span>
    </div>
  );
}
