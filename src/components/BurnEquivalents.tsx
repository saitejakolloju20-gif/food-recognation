import React from 'react';
import { Flame, Footprints, Bike, Waves, Zap } from 'lucide-react';

interface BurnEquivalentsProps {
  burnEquivalents: {
    runningMinutes: number;
    cyclingMinutes: number;
    swimmingMinutes: number;
    walkingMinutes: number;
  };
  portionMultiplier: number;
  totalCalories: number;
}

export const BurnEquivalents: React.FC<BurnEquivalentsProps> = ({
  burnEquivalents,
  portionMultiplier,
  totalCalories,
}) => {
  const scaledCalories = Math.round(totalCalories * portionMultiplier);
  const runMin = Math.round(burnEquivalents.runningMinutes * portionMultiplier);
  const cycleMin = Math.round(burnEquivalents.cyclingMinutes * portionMultiplier);
  const swimMin = Math.round(burnEquivalents.swimmingMinutes * portionMultiplier);
  const walkMin = Math.round(burnEquivalents.walkingMinutes * portionMultiplier);

  const activities = [
    {
      name: 'Outdoor Running',
      pace: '~10 km/h (6:00/km)',
      minutes: runMin,
      icon: Zap,
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    },
    {
      name: 'Road Cycling',
      pace: 'Moderate 20-22 km/h',
      minutes: cycleMin,
      icon: Bike,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    },
    {
      name: 'Lap Swimming',
      pace: 'Freestyle Moderate Pace',
      minutes: swimMin,
      icon: Waves,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    },
    {
      name: 'Brisk Walking',
      pace: '5.5 km/h aerobic walk',
      minutes: walkMin,
      icon: Footprints,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
  ];

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-xl backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <Flame className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Physical Activity Burn Equivalents</h3>
            <p className="text-[11px] text-slate-400">
              Estimated exercise time required to expend{' '}
              <span className="font-mono text-amber-400 font-semibold tabular-nums">
                {scaledCalories} kcal
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-2">
        {activities.map((act) => {
          const Icon = act.icon;
          return (
            <div
              key={act.name}
              className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950/40 p-3.5"
            >
              <div className="flex items-center justify-between">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg border ${act.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className="font-mono text-xl font-bold text-white tabular-nums">
                  {act.minutes}
                  <span className="text-xs font-normal text-slate-400 ml-0.5">m</span>
                </span>
              </div>

              <div className="mt-2.5">
                <div className="text-xs font-medium text-slate-200">{act.name}</div>
                <div className="text-[10px] text-slate-500 truncate">{act.pace}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
