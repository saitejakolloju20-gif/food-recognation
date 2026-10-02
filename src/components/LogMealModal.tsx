import React, { useState } from 'react';
import { MealAnalysisResult, DailyLogEntry } from '../types/nutrition';
import { BookOpen, X, Check, Flame } from 'lucide-react';

interface LogMealModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: MealAnalysisResult;
  imageUrl: string;
  portionMultiplier: number;
  onConfirmLog: (entry: DailyLogEntry) => void;
}

export const LogMealModal: React.FC<LogMealModalProps> = ({
  isOpen,
  onClose,
  analysis,
  imageUrl,
  portionMultiplier,
  onConfirmLog,
}) => {
  const [mealType, setMealType] = useState<'Breakfast' | 'Lunch' | 'Dinner' | 'Snack'>('Lunch');

  if (!isOpen) return null;

  const scaledCalories = Math.round(analysis.totalCalories * portionMultiplier);
  const scaledProtein = Math.round(analysis.macronutrients.protein * portionMultiplier);
  const scaledCarbs = Math.round(analysis.macronutrients.carbs * portionMultiplier);
  const scaledFat = Math.round(analysis.macronutrients.fat * portionMultiplier);

  const handleSave = () => {
    const entry: DailyLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: Date.now(),
      mealType,
      mealName: analysis.mealName,
      calories: scaledCalories,
      protein: scaledProtein,
      carbs: scaledCarbs,
      fat: scaledFat,
      portionMultiplier,
      imageUrl,
      detectedCount: analysis.detectedItems.length,
    };
    onConfirmLog(entry);
    onClose();
  };

  const mealTypes: Array<'Breakfast' | 'Lunch' | 'Dinner' | 'Snack'> = [
    'Breakfast',
    'Lunch',
    'Dinner',
    'Snack',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl p-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <BookOpen className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-bold text-white">Record to Daily Food Log</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-white">{analysis.mealName}</h4>
            <p className="text-xs text-slate-400">{analysis.cuisine}</p>
          </div>

          {/* Meal Slot Picker */}
          <div>
            <label className="text-xs font-medium text-slate-300 block mb-2">Meal Category</label>
            <div className="grid grid-cols-4 gap-2">
              {mealTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setMealType(type)}
                  className={`rounded-xl py-2 px-2 text-xs font-semibold border transition-all ${
                    mealType === type
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Nutritional Summary */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-300 flex items-center gap-1">
                <Flame className="h-3.5 w-3.5 text-amber-400" /> Total Energy
              </span>
              <span className="font-mono text-base font-bold text-white tabular-nums">
                {scaledCalories} kcal
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] font-mono border-t border-slate-800/80 pt-2 tabular-nums">
              <span className="text-rose-400">Protein: {scaledProtein}g</span>
              <span className="text-amber-400">Carbs: {scaledCarbs}g</span>
              <span className="text-emerald-400">Fat: {scaledFat}g</span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-1.5 rounded-xl bg-emerald-500 px-5 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors shadow-sm"
            >
              <Check className="h-4 w-4" />
              <span>Confirm &amp; Log</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
