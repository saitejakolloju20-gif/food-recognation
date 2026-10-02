import React from 'react';
import { DailyLogEntry, UserNutritionGoals } from '../types/nutrition';
import { BookOpen, Trash2, Download, Plus, Flame, Sparkles } from 'lucide-react';

interface DailyLogViewProps {
  entries: DailyLogEntry[];
  goals: UserNutritionGoals;
  onRemoveEntry: (id: string) => void;
  onClearAll: () => void;
  onSwitchToAnalyzer: () => void;
}

export const DailyLogView: React.FC<DailyLogViewProps> = ({
  entries,
  goals,
  onRemoveEntry,
  onClearAll,
  onSwitchToAnalyzer,
}) => {
  // Aggregate daily totals
  const totalCalories = entries.reduce((acc, curr) => acc + curr.calories, 0);
  const totalProtein = entries.reduce((acc, curr) => acc + curr.protein, 0);
  const totalCarbs = entries.reduce((acc, curr) => acc + curr.carbs, 0);
  const totalFat = entries.reduce((acc, curr) => acc + curr.fat, 0);

  const calProgress = Math.min(100, Math.round((totalCalories / goals.dailyCalories) * 100));
  const proteinProgress = Math.min(100, Math.round((totalProtein / goals.proteinGrams) * 100));
  const carbsProgress = Math.min(100, Math.round((totalCarbs / goals.carbsGrams) * 100));
  const fatProgress = Math.min(100, Math.round((totalFat / goals.fatGrams) * 100));

  const exportReport = () => {
    const reportData = {
      date: new Date().toLocaleDateString(),
      goals,
      summary: {
        totalCalories,
        totalProtein,
        totalCarbs,
        totalFat,
      },
      meals: entries,
    };
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NutriVision-Daily-Log-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto py-2">
      {/* Daily Progress Overview Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-emerald-400" />
              Daily Calorie & Nutrition Ledger
            </h2>
            <p className="text-xs text-slate-400">
              Target Profile: {goals.goalType} (Daily budget: {goals.dailyCalories} kcal)
            </p>
          </div>

          <div className="flex items-center gap-2">
            {entries.length > 0 && (
              <>
                <button
                  onClick={exportReport}
                  className="flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700 transition-colors border border-slate-700"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Export JSON</span>
                </button>
                <button
                  onClick={onClearAll}
                  className="flex items-center gap-1.5 rounded-lg bg-rose-500/10 px-3 py-1.5 text-xs font-medium text-rose-300 hover:bg-rose-500/20 transition-colors border border-rose-500/20"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Clear Log</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Aggregate Progress Bars */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-4 gap-4">
          {/* Calorie Card */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-slate-300 flex items-center gap-1">
                <Flame className="h-3.5 w-3.5 text-amber-400" /> Calories
              </span>
              <span className="font-mono text-emerald-400 font-bold tabular-nums">
                {calProgress}%
              </span>
            </div>
            <div className="text-lg font-mono font-extrabold text-white tabular-nums">
              {totalCalories} <span className="text-xs font-normal text-slate-400">/ {goals.dailyCalories} kcal</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-emerald-400 transition-all duration-500"
                style={{ width: `${calProgress}%` }}
              />
            </div>
          </div>

          {/* Protein Card */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-slate-300">Protein</span>
              <span className="font-mono text-rose-400 font-bold tabular-nums">
                {proteinProgress}%
              </span>
            </div>
            <div className="text-lg font-mono font-extrabold text-white tabular-nums">
              {totalProtein}g <span className="text-xs font-normal text-slate-400">/ {goals.proteinGrams}g</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-rose-500 transition-all duration-500"
                style={{ width: `${proteinProgress}%` }}
              />
            </div>
          </div>

          {/* Carbs Card */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-slate-300">Carbohydrates</span>
              <span className="font-mono text-amber-400 font-bold tabular-nums">
                {carbsProgress}%
              </span>
            </div>
            <div className="text-lg font-mono font-extrabold text-white tabular-nums">
              {totalCarbs}g <span className="text-xs font-normal text-slate-400">/ {goals.carbsGrams}g</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-amber-500 transition-all duration-500"
                style={{ width: `${carbsProgress}%` }}
              />
            </div>
          </div>

          {/* Fat Card */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-slate-300">Fats</span>
              <span className="font-mono text-cyan-400 font-bold tabular-nums">
                {fatProgress}%
              </span>
            </div>
            <div className="text-lg font-mono font-extrabold text-white tabular-nums">
              {totalFat}g <span className="text-xs font-normal text-slate-400">/ {goals.fatGrams}g</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-cyan-400 transition-all duration-500"
                style={{ width: `${fatProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Meal Entries List */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur-sm">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <h3 className="text-sm font-semibold text-white">Logged Meals for Today</h3>
          <span className="text-xs text-slate-400 font-mono tabular-nums">
            {entries.length} items logged
          </span>
        </div>

        {entries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800 text-slate-400 mb-3 border border-slate-700">
              <BookOpen className="h-6 w-6" />
            </div>
            <h4 className="text-sm font-semibold text-white">No meals recorded today yet</h4>
            <p className="text-xs text-slate-400 max-w-sm mt-1">
              Use the Deep Learning Vision Analyzer to recognize any food platter or snack, then click &quot;Add to Daily Log&quot;.
            </p>
            <button
              onClick={onSwitchToAnalyzer}
              className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400 transition-colors shadow-sm"
            >
              <Plus className="h-4 w-4" />
              <span>Scan &amp; Log First Meal</span>
            </button>
          </div>
        ) : (
          <div className="mt-4 divide-y divide-slate-800/60">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="flex flex-wrap items-center justify-between gap-3 py-3.5 hover:bg-slate-800/30 px-2 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3">
                  {entry.imageUrl ? (
                    <img
                      src={entry.imageUrl}
                      alt={entry.mealName}
                      className="h-12 w-12 rounded-lg object-cover border border-slate-800 shrink-0"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-800 text-slate-400 border border-slate-700 shrink-0">
                      <Sparkles className="h-5 w-5 text-emerald-400" />
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-white">{entry.mealName}</span>
                      <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-medium text-emerald-300 border border-slate-700">
                        {entry.mealType}
                      </span>
                      {entry.portionMultiplier !== 1 && (
                        <span className="text-[10px] font-mono text-slate-400">
                          ({entry.portionMultiplier}x portion)
                        </span>
                      )}
                    </div>
                    <div className="mt-0.5 text-xs text-slate-400">
                      {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · {entry.detectedCount} items localized
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="font-mono text-sm font-bold text-amber-400 tabular-nums block">
                      {entry.calories} kcal
                    </span>
                    <span className="font-mono text-[11px] text-slate-400 tabular-nums">
                      P: {entry.protein}g · C: {entry.carbs}g · F: {entry.fat}g
                    </span>
                  </div>

                  <button
                    onClick={() => onRemoveEntry(entry.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                    title="Remove entry"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
