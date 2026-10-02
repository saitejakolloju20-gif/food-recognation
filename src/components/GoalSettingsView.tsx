import React, { useState } from 'react';
import { UserNutritionGoals } from '../types/nutrition';
import { Target, Check, RotateCcw, Sparkles } from 'lucide-react';

interface GoalSettingsViewProps {
  goals: UserNutritionGoals;
  onSaveGoals: (newGoals: UserNutritionGoals) => void;
}

export const GoalSettingsView: React.FC<GoalSettingsViewProps> = ({ goals, onSaveGoals }) => {
  const [formData, setFormData] = useState<UserNutritionGoals>({ ...goals });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const presets: Record<
    UserNutritionGoals['goalType'],
    { cals: number; p: number; c: number; f: number; desc: string }
  > = {
    'Weight Loss': {
      cals: 1800,
      p: 150,
      c: 160,
      f: 60,
      desc: 'Moderate caloric deficit with high protein to protect lean muscle mass and enhance satiety.',
    },
    'Muscle Gain': {
      cals: 2600,
      p: 180,
      c: 310,
      f: 75,
      desc: 'Hypertrophic caloric surplus emphasizing amino acid availability and glycogen replenishment.',
    },
    Maintenance: {
      cals: 2100,
      p: 130,
      c: 240,
      f: 70,
      desc: 'Equilibrium caloric balance for metabolic stability, cardiovascular health, and sustained energy.',
    },
    Ketogenic: {
      cals: 2000,
      p: 120,
      c: 25,
      f: 155,
      desc: 'Low carbohydrate ketogenic protocol triggering nutritional ketosis and lipid-derived fuel.',
    },
    Endurance: {
      cals: 2500,
      p: 125,
      c: 360,
      f: 60,
      desc: 'High-glycogen fueling for runners, cyclists, and high-volume aerobic athletes.',
    },
  };

  const handleApplyPreset = (type: UserNutritionGoals['goalType']) => {
    const p = presets[type];
    setFormData({
      goalType: type,
      dailyCalories: p.cals,
      proteinGrams: p.p,
      carbsGrams: p.c,
      fatGrams: p.f,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveGoals(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto py-2">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Target className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Personalized Nutrition & Caloric Targets
            </h2>
            <p className="text-xs text-slate-400">
              Configure daily goals used for meal comparison, progress rings, and nutrient density grading
            </p>
          </div>
        </div>

        {/* Preset Selector */}
        <div className="mt-5">
          <label className="text-xs font-semibold text-slate-300 block mb-2">
            Recommended Clinical Presets
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {(Object.keys(presets) as Array<UserNutritionGoals['goalType']>).map((type) => {
              const isSelected = formData.goalType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleApplyPreset(type)}
                  className={`rounded-xl p-3 text-left border transition-all ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/40'
                      : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`}
                >
                  <div className="text-xs font-semibold text-white">{type}</div>
                  <div className="text-[10px] font-mono text-slate-400 mt-1">
                    {presets[type].cals} kcal
                  </div>
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-xs text-slate-400">
            {presets[formData.goalType].desc}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 pt-5 border-t border-slate-800/80 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">
                Daily Caloric Target (kcal)
              </label>
              <input
                type="number"
                min="1000"
                max="6000"
                value={formData.dailyCalories}
                onChange={(e) =>
                  setFormData({ ...formData, dailyCalories: parseInt(e.target.value) || 2000 })
                }
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-sm text-white font-mono focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">
                Daily Protein Target (grams)
              </label>
              <input
                type="number"
                min="30"
                max="400"
                value={formData.proteinGrams}
                onChange={(e) =>
                  setFormData({ ...formData, proteinGrams: parseInt(e.target.value) || 120 })
                }
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-sm text-white font-mono focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">
                Daily Carbohydrates Target (grams)
              </label>
              <input
                type="number"
                min="0"
                max="600"
                value={formData.carbsGrams}
                onChange={(e) =>
                  setFormData({ ...formData, carbsGrams: parseInt(e.target.value) || 200 })
                }
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-sm text-white font-mono focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">
                Daily Fats Target (grams)
              </label>
              <input
                type="number"
                min="10"
                max="300"
                value={formData.fatGrams}
                onChange={(e) =>
                  setFormData({ ...formData, fatGrams: parseInt(e.target.value) || 65 })
                }
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-sm text-white font-mono focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800/80">
            {savedSuccess && (
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                <Check className="h-4 w-4" /> Targets successfully updated!
              </span>
            )}

            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors shadow-sm"
            >
              <span>Save Nutrition Goals</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
