import React from 'react';
import { Scale, RotateCcw } from 'lucide-react';

interface PortionScalerProps {
  portionMultiplier: number;
  onChangeMultiplier: (val: number) => void;
  baseWeightGrams: number;
}

export const PortionScaler: React.FC<PortionScalerProps> = ({
  portionMultiplier,
  onChangeMultiplier,
  baseWeightGrams,
}) => {
  const presets = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
  const currentTotalWeight = Math.round(baseWeightGrams * portionMultiplier);

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-xl backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Scale className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-white">Interactive Portion Scaler</h4>
            <p className="text-[11px] text-slate-400">
              Estimated Total Meal Mass:{' '}
              <span className="font-mono text-emerald-400 font-semibold tabular-nums">
                {currentTotalWeight}g
              </span>
            </p>
          </div>
        </div>

        {portionMultiplier !== 1 && (
          <button
            onClick={() => onChangeMultiplier(1.0)}
            className="flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset (1.0x)</span>
          </button>
        )}
      </div>

      {/* Preset buttons */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {presets.map((preset) => (
          <button
            key={preset}
            onClick={() => onChangeMultiplier(preset)}
            className={`flex-1 rounded-lg py-1 px-2 text-xs font-mono font-medium transition-all ${
              portionMultiplier === preset
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                : 'bg-slate-800/80 text-slate-300 border border-slate-700/60 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {preset}x
          </button>
        ))}
      </div>

      {/* Range Slider */}
      <div className="flex items-center gap-3 pt-1">
        <span className="text-[10px] font-mono text-slate-500">0.5x</span>
        <input
          type="range"
          min="0.5"
          max="3.0"
          step="0.05"
          value={portionMultiplier}
          onChange={(e) => onChangeMultiplier(parseFloat(e.target.value))}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-800 accent-emerald-500"
        />
        <span className="text-[10px] font-mono text-slate-500">3.0x</span>
        <span className="font-mono text-xs font-semibold text-emerald-400 w-12 text-right tabular-nums">
          {portionMultiplier.toFixed(2)}x
        </span>
      </div>
    </div>
  );
};
