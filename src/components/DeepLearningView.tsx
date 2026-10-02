import React from 'react';
import { Cpu, Eye, Box, Layers, Zap, CheckCircle2, Binary, Activity, Network } from 'lucide-react';
import { MealAnalysisResult } from '../types/nutrition';

interface DeepLearningViewProps {
  analysis?: MealAnalysisResult | null;
}

export const DeepLearningView: React.FC<DeepLearningViewProps> = ({ analysis }) => {
  const metrics = analysis?.deepLearningMetrics;

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto py-2">
      {/* Title block */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Cpu className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Deep Learning Vision & Volumetric Nutrition Pipeline
            </h2>
            <p className="text-xs text-slate-400">
              Multimodal Vision Transformer Architecture & Spatial Localization Engine
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mt-3">
          NutriVision DL utilizes multi-stage deep convolutional and visual attention networks to recognize complex meals in real-time. Instead of traditional monolithic classification, the model executes zero-shot multi-item spatial segmentation, regression of normalized bounding boxes [ymin, xmin, ymax, xmax], and volumetric mass projection calibrated to plate geometry.
        </p>

        {metrics && (
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80">
            <div className="rounded-lg bg-slate-950/50 p-2.5 border border-slate-800">
              <span className="text-[10px] text-slate-500 block uppercase font-mono">Inference Model</span>
              <span className="text-xs font-semibold text-white truncate block">
                {metrics.modelName}
              </span>
            </div>
            <div className="rounded-lg bg-slate-950/50 p-2.5 border border-slate-800">
              <span className="text-[10px] text-slate-500 block uppercase font-mono">Inference Latency</span>
              <span className="text-xs font-mono font-bold text-emerald-400 tabular-nums">
                {metrics.inferenceTimeMs} ms
              </span>
            </div>
            <div className="rounded-lg bg-slate-950/50 p-2.5 border border-slate-800">
              <span className="text-[10px] text-slate-500 block uppercase font-mono">Overall Confidence</span>
              <span className="text-xs font-mono font-bold text-emerald-400 tabular-nums">
                {metrics.overallConfidence}%
              </span>
            </div>
            <div className="rounded-lg bg-slate-950/50 p-2.5 border border-slate-800">
              <span className="text-[10px] text-slate-500 block uppercase font-mono">Coordinate Space</span>
              <span className="text-xs font-mono text-cyan-400">
                Normalized 0-1000 Box
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 3 Pipeline Stages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Stage 1 */}
        <div className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-xl">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Eye className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-emerald-400 block uppercase">Stage 01</span>
              <h3 className="text-xs font-bold text-white">Visual Feature Encoding</h3>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            The input RGB image passes through a high-resolution multimodal vision patch encoder. Attention heads extract pixel gradients, specular browning (Maillard reaction indicators), moisture indices, and grain textures to distinguish foods with similar color palettes.
          </p>
          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1.5 font-mono">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Color Space: L*a*b* & RGB</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Multi-head Self-Attention</span>
            </div>
          </div>
        </div>

        {/* Stage 2 */}
        <div className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-xl">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Box className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-amber-400 block uppercase">Stage 02</span>
              <h3 className="text-xs font-bold text-white">Spatial Object Localization</h3>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Dense regression heads predict 2D bounding boxes for overlapping components on the dish. Cross-attention layers decouple stacked garnishes, sauces, and mixed grains into discrete culinary items with respective confidence thresholds.
          </p>
          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1.5 font-mono">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span>Normalized Box [ymin, xmin, ymax, xmax]</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span>Multi-Class Probability Distribution</span>
            </div>
          </div>
        </div>

        {/* Stage 3 */}
        <div className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-xl">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Layers className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-cyan-400 block uppercase">Stage 03</span>
              <h3 className="text-xs font-bold text-white">Volumetric Mass & Caloric Model</h3>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            By estimating plate rim diameter reference heuristics (~260mm) and optical perspective angle, the model computes 3D voxel volume estimations, mapping USDA food density tables (&rho; = g/cm³) into net mass and macronutrients.
          </p>
          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1.5 font-mono">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              <span>Reference Plate Calibration</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              <span>USDA Standard Nutritional Mapping</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detected Feature Vectors from Current Meal */}
      {metrics && metrics.featuresAnalyzed && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-xl">
          <h3 className="text-xs font-semibold text-white mb-3 flex items-center gap-2">
            <Binary className="h-4 w-4 text-emerald-400" />
            Active Visual Attention Features Extracted
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {metrics.featuresAnalyzed.map((feat, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 rounded-xl bg-slate-950/50 p-3 border border-slate-800/80 text-xs text-slate-300"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl bg-slate-950/40 p-3.5 border border-slate-800 text-xs text-slate-400">
            <span className="text-[11px] font-semibold text-slate-300 block mb-1">
              Volumetric Calibration Method:
            </span>
            <p className="font-mono text-slate-300 text-[11px]">
              {metrics.volumetricEstimationMethod}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
