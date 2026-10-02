import React, { useState } from 'react';
import { DetectedFoodItem } from '../types/nutrition';
import { Eye, EyeOff, Crosshair, Sparkles, Scale, Flame } from 'lucide-react';

interface FoodCanvasViewerProps {
  imageUrl: string;
  detectedItems: DetectedFoodItem[];
  selectedItemId: string | null;
  onSelectItem: (id: string | null) => void;
  portionMultiplier: number;
}

export const FoodCanvasViewer: React.FC<FoodCanvasViewerProps> = ({
  imageUrl,
  detectedItems,
  selectedItemId,
  onSelectItem,
  portionMultiplier,
}) => {
  const [showBoxes, setShowBoxes] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  // Active item is either hovered or explicitly clicked
  const activeId = hoveredItemId || selectedItemId;

  return (
    <div className="relative flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-xl backdrop-blur-sm">
      {/* Control bar */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold text-slate-200">
            Multi-Item Vision Segmentation
          </span>
          <span className="text-xs text-slate-500 font-mono tabular-nums">
            ({detectedItems.length} objects localized)
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowBoxes(!showBoxes)}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
              showBoxes
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-slate-200'
            }`}
          >
            {showBoxes ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
            <span>Bounding Boxes</span>
          </button>

          <button
            onClick={() => setShowLabels(!showLabels)}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
              showLabels
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-slate-200'
            }`}
          >
            <Crosshair className="h-3.5 w-3.5" />
            <span>Scores</span>
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-950 border border-slate-800/60 select-none group">
        <img
          src={imageUrl}
          alt="Recognized food platter"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-300"
        />

        {/* Subtle grid mesh overlay for deep learning scanner aesthetics */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-20"
          aria-hidden="true"
        />

        {/* Bounding Boxes Layer */}
        {showBoxes &&
          detectedItems.map((item) => {
            if (!item.box2d || item.box2d.length !== 4) return null;
            const [ymin, xmin, ymax, xmax] = item.box2d;

            const top = `${(ymin / 1000) * 100}%`;
            const left = `${(xmin / 1000) * 100}%`;
            const width = `${((xmax - xmin) / 1000) * 100}%`;
            const height = `${((ymax - ymin) / 1000) * 100}%`;

            const isActive = activeId === item.id;
            const itemColor = item.color || '#10B981';

            const scaledWeight = Math.round(item.estimatedWeightGrams * portionMultiplier);
            const scaledCals = Math.round(item.calories * portionMultiplier);

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredItemId(item.id)}
                onMouseLeave={() => setHoveredItemId(null)}
                onClick={() => onSelectItem(selectedItemId === item.id ? null : item.id)}
                style={{
                  top,
                  left,
                  width,
                  height,
                  borderColor: itemColor,
                }}
                className={`absolute cursor-pointer transition-all duration-150 rounded-sm border-2 ${
                  isActive
                    ? 'ring-4 ring-white/40 shadow-lg shadow-black/80 bg-white/10 z-30'
                    : 'bg-black/10 hover:bg-white/5 border-dashed z-10'
                }`}
              >
                {/* Corner crosshairs */}
                <div
                  className="absolute -top-1 -left-1 h-2 w-2 border-t-2 border-l-2"
                  style={{ borderColor: itemColor }}
                />
                <div
                  className="absolute -top-1 -right-1 h-2 w-2 border-t-2 border-r-2"
                  style={{ borderColor: itemColor }}
                />
                <div
                  className="absolute -bottom-1 -left-1 h-2 w-2 border-b-2 border-l-2"
                  style={{ borderColor: itemColor }}
                />
                <div
                  className="absolute -bottom-1 -right-1 h-2 w-2 border-b-2 border-r-2"
                  style={{ borderColor: itemColor }}
                />

                {/* Floating Tag */}
                {showLabels && (
                  <div
                    style={{ backgroundColor: itemColor }}
                    className={`absolute -top-7 left-0 flex items-center gap-1.5 whitespace-nowrap rounded px-1.5 py-0.5 text-[10px] font-bold text-slate-950 shadow-md transition-transform ${
                      isActive ? 'scale-105 ring-2 ring-white/60' : 'opacity-90'
                    }`}
                  >
                    <span>{item.name}</span>
                    <span className="font-mono text-[9px] bg-black/20 px-1 rounded text-white tabular-nums">
                      {Math.round(item.confidence)}%
                    </span>
                  </div>
                )}

                {/* Active Tooltip Details */}
                {isActive && (
                  <div className="absolute top-full left-0 mt-1 z-40 w-48 rounded-lg bg-slate-900/95 p-2 text-xs text-slate-200 shadow-xl border border-slate-700/80 backdrop-blur-md animate-in fade-in zoom-in-95 duration-100">
                    <p className="font-semibold text-white truncate">{item.name}</p>
                    <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Scale className="h-3 w-3 text-slate-400" />
                        <span className="font-mono tabular-nums">{scaledWeight}g</span>
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-amber-400">
                        <Flame className="h-3 w-3 text-amber-400" />
                        <span className="font-mono tabular-nums">{scaledCals} kcal</span>
                      </span>
                    </div>
                    <div className="mt-1.5 grid grid-cols-3 gap-1 text-[10px] text-center border-t border-slate-800 pt-1 font-mono tabular-nums">
                      <div>
                        <span className="text-slate-400 block text-[9px]">P</span>
                        <span className="text-rose-400">{Math.round(item.macronutrients.protein * portionMultiplier)}g</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px]">C</span>
                        <span className="text-amber-400">{Math.round(item.macronutrients.carbs * portionMultiplier)}g</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px]">F</span>
                        <span className="text-emerald-400">{Math.round(item.macronutrients.fat * portionMultiplier)}g</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>

      {/* Helper footnote */}
      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
        <span className="flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-emerald-400" />
          Click or hover any bounding box to inspect item nutrition
        </span>
        <span className="hidden sm:inline font-mono">Normalized [0, 1000] Bounding Coordinates</span>
      </div>
    </div>
  );
};
