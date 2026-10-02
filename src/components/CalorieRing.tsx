import React from 'react';
import { Flame, PieChart, Activity, Zap } from 'lucide-react';

interface CalorieRingProps {
  totalCalories: number;
  dailyGoalCalories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  portionMultiplier: number;
}

export const CalorieRing: React.FC<CalorieRingProps> = ({
  totalCalories,
  dailyGoalCalories,
  proteinGrams,
  carbsGrams,
  fatGrams,
  portionMultiplier,
}) => {
  const scaledCalories = Math.round(totalCalories * portionMultiplier);
  const scaledProtein = Math.round(proteinGrams * portionMultiplier);
  const scaledCarbs = Math.round(carbsGrams * portionMultiplier);
  const scaledFat = Math.round(fatGrams * portionMultiplier);

  // Calorie contributions from macros (4 kcal/g protein, 4 kcal/g carbs, 9 kcal/g fat)
  const proteinCals = scaledProtein * 4;
  const carbsCals = scaledCarbs * 4;
  const fatCals = scaledFat * 9;
  const totalMacroCals = Math.max(1, proteinCals + carbsCals + fatCals);

  const proteinPct = Math.round((proteinCals / totalMacroCals) * 100);
  const carbsPct = Math.round((carbsCals / totalMacroCals) * 100);
  const fatPct = Math.max(0, 100 - proteinPct - carbsPct);

  // Daily budget percentage
  const budgetPct = Math.min(100, Math.round((scaledCalories / dailyGoalCalories) * 100));

  // Circular gauge calculations
  const size = 180;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (budgetPct / 100) * circumference;

  return (
    <div className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-xl backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Flame className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-semibold text-white">Caloric Energy & Macronutrients</h3>
        </div>
        <span className="text-xs text-slate-400 font-mono tabular-nums">
          {budgetPct}% of daily budget ({dailyGoalCalories} kcal)
        </span>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Gauge Centerpiece */}
        <div className="md:col-span-5 flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-center">
            <svg width={size} height={size} className="rotate-[-90deg]">
              {/* Background track */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#1e293b"
                strokeWidth={strokeWidth}
                fill="none"
              />
              {/* Animated Progress Track */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="url(#calorieGradient)"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-700 ease-out"
              />
              <defs>
                <linearGradient id="calorieGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="50%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#EF4444" />
                </linearGradient>
              </defs>
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-extrabold tracking-tight text-white font-mono tabular-nums">
                {scaledCalories}
              </span>
              <span className="text-xs font-medium text-slate-400">Total kcal</span>
              {portionMultiplier !== 1 && (
                <span className="mt-0.5 rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-mono text-emerald-400 border border-emerald-500/20">
                  {portionMultiplier}x portion
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Macro Bars */}
        <div className="md:col-span-7 flex flex-col justify-center gap-3.5">
          {/* Protein Bar */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-rose-500" />
                <span className="font-medium text-slate-200">Protein</span>
                <span className="text-[11px] text-slate-500 font-mono">({proteinPct}% cals)</span>
              </div>
              <span className="font-mono font-semibold text-rose-400 tabular-nums">
                {scaledProtein}g
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-rose-500 transition-all duration-500"
                style={{ width: `${Math.min(100, (scaledProtein / 50) * 100)}%` }}
              />
            </div>
          </div>

          {/* Carbs Bar */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                <span className="font-medium text-slate-200">Carbohydrates</span>
                <span className="text-[11px] text-slate-500 font-mono">({carbsPct}% cals)</span>
              </div>
              <span className="font-mono font-semibold text-amber-400 tabular-nums">
                {scaledCarbs}g
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-amber-500 transition-all duration-500"
                style={{ width: `${Math.min(100, (scaledCarbs / 100) * 100)}%` }}
              />
            </div>
          </div>

          {/* Fat Bar */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="font-medium text-slate-200">Dietary Fats</span>
                <span className="text-[11px] text-slate-500 font-mono">({fatPct}% cals)</span>
              </div>
              <span className="font-mono font-semibold text-emerald-400 tabular-nums">
                {scaledFat}g
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${Math.min(100, (scaledFat / 40) * 100)}%` }}
              />
            </div>
          </div>

          {/* Quick macro distribution segment bar */}
          <div className="mt-2 pt-2 border-t border-slate-800/80">
            <div className="text-[11px] text-slate-400 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <PieChart className="h-3 w-3 text-slate-400" />
                Macro Split Ratio
              </span>
              <span className="font-mono text-[10px] text-slate-500">P : C : F</span>
            </div>
            <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
              <div style={{ width: `${proteinPct}%` }} className="bg-rose-500" />
              <div style={{ width: `${carbsPct}%` }} className="bg-amber-500" />
              <div style={{ width: `${fatPct}%` }} className="bg-emerald-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
