import { ReactNode } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import clsx from 'clsx';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  trendPositive?: boolean; // whether up is good
  icon?: ReactNode;
  accent?: 'cyan' | 'green' | 'amber' | 'red' | 'blue' | 'purple';
  subtext?: string;
  className?: string;
}

const accentColors = {
  cyan: 'text-brand-cyan border-brand-cyan/20 bg-brand-cyan/5',
  green: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
  amber: 'text-amber-400 border-amber-500/20 bg-amber-500/5',
  red: 'text-red-400 border-red-500/20 bg-red-500/5',
  blue: 'text-blue-400 border-blue-500/20 bg-blue-500/5',
  purple: 'text-purple-400 border-purple-500/20 bg-purple-500/5',
};

const accentText = {
  cyan: 'text-brand-cyan',
  green: 'text-emerald-400',
  amber: 'text-amber-400',
  red: 'text-red-400',
  blue: 'text-blue-400',
  purple: 'text-purple-400',
};

export function MetricCard({
  label, value, unit, trend, trendValue, trendPositive = true,
  icon, accent = 'cyan', subtext, className,
}: MetricCardProps) {
  const isGoodTrend = (trend === 'up' && trendPositive) || (trend === 'down' && !trendPositive);
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;

  return (
    <div className={clsx('panel p-5 flex flex-col gap-3', className)}>
      <div className="flex items-start justify-between gap-2">
        <span className="metric-label">{label}</span>
        {icon && (
          <div className={clsx('w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0', accentColors[accent])}>
            <span className={clsx('w-4 h-4', accentText[accent])}>{icon}</span>
          </div>
        )}
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className={clsx('metric-value', accentText[accent])}>{value}</span>
        {unit && <span className="text-sm text-slate-400 font-medium">{unit}</span>}
      </div>
      {(trend || subtext) && (
        <div className="flex items-center justify-between">
          {trend && trendValue && (
            <div className={clsx('flex items-center gap-1 text-xs font-medium',
              isGoodTrend ? 'text-emerald-400' : 'text-red-400')}>
              <TrendIcon className="w-3 h-3" />
              <span>{trendValue}</span>
            </div>
          )}
          {subtext && <span className="text-xs text-slate-500">{subtext}</span>}
        </div>
      )}
    </div>
  );
}
