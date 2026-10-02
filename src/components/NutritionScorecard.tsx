import React from 'react';
import { MealAnalysisResult } from '../types/nutrition';
import { ShieldCheck, AlertCircle, HeartPulse, Sparkles, Activity } from 'lucide-react';

interface NutritionScorecardProps {
  analysis: MealAnalysisResult;
  portionMultiplier: number;
}

export const NutritionScorecard: React.FC<NutritionScorecardProps> = ({
  analysis,
  portionMultiplier,
}) => {
  const {
    nutriScore,
    glycemicIndex,
    dietaryAttributes,
    micronutrients,
    healthAssessment,
    macronutrients,
  } = analysis;

  const nutriScoreGrades: Array<'A' | 'B' | 'C' | 'D' | 'E'> = ['A', 'B', 'C', 'D', 'E'];
  const nutriScoreColors: Record<string, { bg: string; text: string; active: string }> = {
    A: { bg: 'bg-emerald-950/60', text: 'text-emerald-400', active: 'bg-emerald-500 text-slate-950 ring-2 ring-emerald-300' },
    B: { bg: 'bg-green-950/60', text: 'text-green-400', active: 'bg-green-500 text-slate-950 ring-2 ring-green-300' },
    C: { bg: 'bg-yellow-950/60', text: 'text-yellow-400', active: 'bg-yellow-500 text-slate-950 ring-2 ring-yellow-300' },
    D: { bg: 'bg-orange-950/60', text: 'text-orange-400', active: 'bg-orange-500 text-slate-950 ring-2 ring-orange-300' },
    E: { bg: 'bg-rose-950/60', text: 'text-rose-400', active: 'bg-rose-500 text-slate-950 ring-2 ring-rose-300' },
  };

  const giRatingColors: Record<string, string> = {
    Low: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    Medium: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    High: 'text-rose-400 border-rose-500/30 bg-rose-500/10',
  };

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-xl backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <HeartPulse className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-semibold text-white">Health Indicators & Micronutrients</h3>
        </div>
        <span className="text-[11px] text-slate-400 font-mono">Clinical Dietetics Standard</span>
      </div>

      {/* Nutri-Score & Glycemic Index Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Nutri-Score Card */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-3.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-300">Nutri-Score Grade</span>
            <span className="text-[11px] text-slate-500">Overall Dietary Density</span>
          </div>

          <div className="flex items-center gap-1.5 mt-2">
            {nutriScoreGrades.map((grade) => {
              const isActive = nutriScore === grade;
              const config = nutriScoreColors[grade];
              return (
                <div
                  key={grade}
                  className={`flex h-8 flex-1 items-center justify-center rounded-lg text-xs font-bold font-mono transition-transform ${
                    isActive ? config.active + ' scale-105 shadow-md' : 'bg-slate-900 text-slate-500 border border-slate-800'
                  }`}
                >
                  {grade}
                </div>
              );
            })}
          </div>
        </div>

        {/* Glycemic Index Card */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-3.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-300">Glycemic Index (GI)</span>
            <span
              className={`rounded px-1.5 py-0.5 text-[10px] font-semibold border ${
                giRatingColors[glycemicIndex.rating] || 'text-slate-400'
              }`}
            >
              {glycemicIndex.rating} GI
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] text-slate-500 block">Est. GI Rating</span>
              <span className="font-mono text-base font-bold text-white tabular-nums">
                {glycemicIndex.value}
              </span>
              <span className="text-[10px] text-slate-500"> / 100</span>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-500 block">Glycemic Load</span>
              <span className="font-mono text-base font-bold text-white tabular-nums">
                {Math.round(glycemicIndex.glycemicLoad * portionMultiplier)}
              </span>
              <span className="text-[10px] text-slate-500 block">GL impact</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dietary Badges & Allergen Warnings */}
      <div>
        <span className="text-[11px] font-medium text-slate-400 block mb-2">
          Dietary Profile & Allergen Safety
        </span>
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {dietaryAttributes.isGlutenFree && (
            <span className="rounded-lg bg-emerald-500/10 px-2.5 py-1 text-emerald-300 border border-emerald-500/20 text-[11px] flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" /> Gluten-Free
            </span>
          )}
          {dietaryAttributes.isDairyFree && (
            <span className="rounded-lg bg-cyan-500/10 px-2.5 py-1 text-cyan-300 border border-cyan-500/20 text-[11px] flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" /> Dairy-Free
            </span>
          )}
          {dietaryAttributes.isVegetarian && (
            <span className="rounded-lg bg-green-500/10 px-2.5 py-1 text-green-300 border border-green-500/20 text-[11px]">
              Vegetarian
            </span>
          )}
          {dietaryAttributes.isVegan && (
            <span className="rounded-lg bg-teal-500/10 px-2.5 py-1 text-teal-300 border border-teal-500/20 text-[11px]">
              100% Vegan
            </span>
          )}
          {dietaryAttributes.isKetoFriendly && (
            <span className="rounded-lg bg-purple-500/10 px-2.5 py-1 text-purple-300 border border-purple-500/20 text-[11px]">
              Keto-Friendly
            </span>
          )}
          {dietaryAttributes.isLowSodium && (
            <span className="rounded-lg bg-blue-500/10 px-2.5 py-1 text-blue-300 border border-blue-500/20 text-[11px]">
              Low Sodium (&lt;600mg)
            </span>
          )}

          {/* Allergens warning */}
          {dietaryAttributes.allergens && dietaryAttributes.allergens.length > 0 && (
            <div className="flex items-center gap-1 rounded-lg bg-rose-500/10 px-2.5 py-1 text-rose-300 border border-rose-500/20 text-[11px]">
              <AlertCircle className="h-3 w-3" />
              <span>Allergens: {dietaryAttributes.allergens.join(', ')}</span>
            </div>
          )}
        </div>
      </div>

      {/* Health Assessment Text */}
      <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3.5 text-xs text-slate-300 leading-relaxed">
        <p className="flex items-start gap-2">
          <Sparkles className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>{healthAssessment}</span>
        </p>
      </div>

      {/* Micronutrients Progress Bars */}
      <div>
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-semibold text-slate-200">Key Micronutrients & Vitamins</span>
          <span className="text-[11px] text-slate-500 font-mono">% of Recommended Daily Value (DV)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {micronutrients.map((micro) => {
            const scaledPct = Math.round(micro.percentDailyValue * portionMultiplier);
            return (
              <div key={micro.name} className="rounded-lg bg-slate-950/40 p-2.5 border border-slate-800/80">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-medium text-slate-300">{micro.name}</span>
                  <div className="flex items-center gap-1.5 font-mono text-[11px] tabular-nums">
                    <span className="text-slate-400">{micro.amount}</span>
                    <span className="text-emerald-400 font-semibold">({scaledPct}% DV)</span>
                  </div>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-emerald-400 transition-all duration-500"
                    style={{ width: `${Math.min(100, scaledPct)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
