import React from 'react';
import { DetectedFoodItem } from '../types/nutrition';
import { Layers, CheckCircle2, ChevronRight } from 'lucide-react';

interface DetectedItemsTableProps {
  items: DetectedFoodItem[];
  selectedItemId: string | null;
  onSelectItem: (id: string | null) => void;
  portionMultiplier: number;
}

export const DetectedItemsTable: React.FC<DetectedItemsTableProps> = ({
  items,
  selectedItemId,
  onSelectItem,
  portionMultiplier,
}) => {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-xl backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Layers className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Itemized Recognition Breakdown</h3>
            <p className="text-[11px] text-slate-400">
              Click an item to highlight its spatial bounding box in the camera canvas
            </p>
          </div>
        </div>
        <span className="font-mono text-xs text-slate-400 tabular-nums">
          {items.length} components
        </span>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-[11px] text-slate-500 uppercase tracking-wider font-mono">
              <th className="pb-2.5 font-medium">Food Component</th>
              <th className="pb-2.5 font-medium">Category</th>
              <th className="pb-2.5 font-medium text-right">Confidence</th>
              <th className="pb-2.5 font-medium text-right">Mass (g)</th>
              <th className="pb-2.5 font-medium text-right">Energy</th>
              <th className="pb-2.5 font-medium text-right">P / C / F</th>
              <th className="pb-2.5 w-6"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {items.map((item) => {
              const isSelected = selectedItemId === item.id;
              const scaledWeight = Math.round(item.estimatedWeightGrams * portionMultiplier);
              const scaledCals = Math.round(item.calories * portionMultiplier);
              const p = Math.round(item.macronutrients.protein * portionMultiplier);
              const c = Math.round(item.macronutrients.carbs * portionMultiplier);
              const f = Math.round(item.macronutrients.fat * portionMultiplier);

              return (
                <tr
                  key={item.id}
                  onClick={() => onSelectItem(isSelected ? null : item.id)}
                  className={`group cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-emerald-500/10 hover:bg-emerald-500/15'
                      : 'hover:bg-slate-800/50'
                  }`}
                >
                  <td className="py-3 pr-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: item.color || '#10B981' }}
                      />
                      <span className="font-medium text-slate-200 group-hover:text-white transition-colors">
                        {item.name}
                      </span>
                    </div>
                    <div className="pl-4 text-[10px] text-slate-500 truncate max-w-xs">
                      {item.portionDescription}
                    </div>
                  </td>

                  <td className="py-3 text-slate-400">
                    <span className="inline-block rounded bg-slate-800/80 px-2 py-0.5 text-[10px] text-slate-300 border border-slate-700/50">
                      {item.category}
                    </span>
                  </td>

                  <td className="py-3 text-right">
                    <span className="font-mono text-emerald-400 font-semibold tabular-nums">
                      {Math.round(item.confidence)}%
                    </span>
                  </td>

                  <td className="py-3 text-right font-mono text-slate-300 tabular-nums">
                    {scaledWeight}g
                  </td>

                  <td className="py-3 text-right">
                    <span className="font-mono font-semibold text-amber-400 tabular-nums">
                      {scaledCals} kcal
                    </span>
                  </td>

                  <td className="py-3 text-right font-mono text-[11px] tabular-nums">
                    <span className="text-rose-400">{p}g</span>
                    <span className="text-slate-600 mx-1">/</span>
                    <span className="text-amber-400">{c}g</span>
                    <span className="text-slate-600 mx-1">/</span>
                    <span className="text-emerald-400">{f}g</span>
                  </td>

                  <td className="py-3 text-right pr-2">
                    <ChevronRight
                      className={`h-4 w-4 transition-transform text-slate-500 group-hover:text-slate-300 ${
                        isSelected ? 'rotate-90 text-emerald-400' : ''
                      }`}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
