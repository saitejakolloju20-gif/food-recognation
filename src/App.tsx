/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SAMPLE_DISHES, SampleDish } from './data/sampleDishes';
import { MealAnalysisResult, DailyLogEntry, UserNutritionGoals } from './types/nutrition';
import { Header } from './components/Header';
import { FoodCanvasViewer } from './components/FoodCanvasViewer';
import { CalorieRing } from './components/CalorieRing';
import { PortionScaler } from './components/PortionScaler';
import { DetectedItemsTable } from './components/DetectedItemsTable';
import { NutritionScorecard } from './components/NutritionScorecard';
import { BurnEquivalents } from './components/BurnEquivalents';
import { DeepLearningView } from './components/DeepLearningView';
import { DailyLogView } from './components/DailyLogView';
import { GoalSettingsView } from './components/GoalSettingsView';
import { UploadModal } from './components/UploadModal';
import { LogMealModal } from './components/LogMealModal';
import {
  Sparkles,
  Camera,
  Plus,
  BookOpen,
  AlertCircle,
  RefreshCw,
  Lightbulb,
  Check,
  ChevronRight,
  Flame,
  Scale,
  Cpu,
} from 'lucide-react';

const DEFAULT_GOALS: UserNutritionGoals = {
  dailyCalories: 2100,
  proteinGrams: 140,
  carbsGrams: 220,
  fatGrams: 65,
  goalType: 'Maintenance',
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'analyzer' | 'log' | 'tech' | 'goals'>('analyzer');
  const [selectedDish, setSelectedDish] = useState<SampleDish>(SAMPLE_DISHES[0]);
  const [analysisResult, setAnalysisResult] = useState<MealAnalysisResult>(SAMPLE_DISHES[0].benchmarkResult);
  const [currentImageUrl, setCurrentImageUrl] = useState<string>(SAMPLE_DISHES[0].image);
  const [portionMultiplier, setPortionMultiplier] = useState<number>(1.0);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [isLogModalOpen, setIsLogModalOpen] = useState<boolean>(false);
  const [justLoggedToast, setJustLoggedToast] = useState<boolean>(false);

  // Daily log state with localStorage persistence
  const [dailyLogEntries, setDailyLogEntries] = useState<DailyLogEntry[]>(() => {
    try {
      const saved = localStorage.getItem('nutrivision_daily_log');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // User nutrition targets with localStorage persistence
  const [userGoals, setUserGoals] = useState<UserNutritionGoals>(() => {
    try {
      const saved = localStorage.getItem('nutrivision_goals');
      return saved ? JSON.parse(saved) : DEFAULT_GOALS;
    } catch {
      return DEFAULT_GOALS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('nutrivision_daily_log', JSON.stringify(dailyLogEntries));
    } catch (e) {
      console.error('Failed to save daily log to localStorage', e);
    }
  }, [dailyLogEntries]);

  useEffect(() => {
    try {
      localStorage.setItem('nutrivision_goals', JSON.stringify(userGoals));
    } catch (e) {
      console.error('Failed to save user goals to localStorage', e);
    }
  }, [userGoals]);

  // Handle selecting a benchmark dish
  const handleSelectSampleDish = (dish: SampleDish) => {
    setSelectedDish(dish);
    setCurrentImageUrl(dish.image);
    setAnalysisResult(dish.benchmarkResult);
    setPortionMultiplier(1.0);
    setSelectedItemId(null);
    setAnalysisError(null);
    setIsUploadModalOpen(false);
  };

  // Live Deep Learning analysis call to server /api/analyze-food
  const handleAnalyzeCustomImage = async (
    imageBase64: string,
    mimeType: string,
    userNote?: string
  ) => {
    setIsAnalyzing(true);
    setAnalysisError(null);
    try {
      const response = await fetch('/api/analyze-food', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64,
          mimeType,
          userPrompt: userNote,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server responded with status ${response.status}`);
      }

      const data: MealAnalysisResult = await response.json();
      setAnalysisResult(data);
      setCurrentImageUrl(imageBase64);
      setPortionMultiplier(1.0);
      setSelectedItemId(null);
      setIsUploadModalOpen(false);
      setActiveTab('analyzer');
    } catch (err: any) {
      console.error('Food analysis error:', err);
      setAnalysisError(
        err.message || 'Failed to complete deep learning analysis. Please try again.'
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAddLogEntry = (entry: DailyLogEntry) => {
    setDailyLogEntries((prev) => [entry, ...prev]);
    setJustLoggedToast(true);
    setTimeout(() => setJustLoggedToast(false), 3000);
  };

  const handleRemoveLogEntry = (id: string) => {
    setDailyLogEntries((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearLog = () => {
    if (confirm('Are you sure you want to clear your entire food log for today?')) {
      setDailyLogEntries([]);
    }
  };

  // Compute total base weight of detected items
  const baseWeightGrams = analysisResult.detectedItems.reduce(
    (acc, curr) => acc + (curr.estimatedWeightGrams || 0),
    0
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenUpload={() => setIsUploadModalOpen(true)}
        dailyLoggedCount={dailyLogEntries.length}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {/* Error notification banner if any */}
        {analysisError && (
          <div className="mb-6 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs text-rose-300 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
              <span>{analysisError}</span>
            </div>
            <button
              onClick={() => setAnalysisError(null)}
              className="text-xs text-rose-400 hover:text-white font-medium"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Success toast after logging a meal */}
        {justLoggedToast && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-bold text-slate-950 shadow-2xl animate-in slide-in-from-bottom-4">
            <Check className="h-4 w-4" />
            <span>Meal successfully saved to your Daily Log!</span>
          </div>
        )}

        {/* Tab 1: Vision Analyzer View */}
        {activeTab === 'analyzer' && (
          <div className="space-y-6">
            {/* Quick Benchmark Dishes Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/40 p-3.5 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-400" />
                <span className="text-xs font-semibold text-slate-300">
                  Quick Benchmark Samples:
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {SAMPLE_DISHES.map((dish) => {
                  const isCurrent = currentImageUrl === dish.image;
                  return (
                    <button
                      key={dish.id}
                      onClick={() => handleSelectSampleDish(dish)}
                      className={`flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                        isCurrent
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                          : 'bg-slate-950/60 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="h-4 w-4 rounded-full object-cover"
                      />
                      <span>{dish.name.split(' ')[0]}</span>
                      <span className="font-mono text-[10px] text-slate-400">
                        ~{dish.estimatedCalories} kcal
                      </span>
                    </button>
                  );
                })}

                <button
                  onClick={() => setIsUploadModalOpen(true)}
                  className="flex items-center gap-1.5 rounded-xl bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors border border-slate-700"
                >
                  <Camera className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Upload / Snap Photo</span>
                </button>
              </div>
            </div>

            {/* Meal Title & Action Row */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold tracking-tight text-white">
                    {analysisResult.mealName}
                  </h1>
                  <span className="rounded bg-slate-800 px-2 py-0.5 font-mono text-xs font-semibold text-emerald-400 border border-slate-700">
                    {analysisResult.cuisine}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-400 max-w-2xl">
                  {analysisResult.summary}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsLogModalOpen(true)}
                  className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 active:scale-95 transition-all shadow-md shadow-emerald-500/10"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Add to Daily Log</span>
                </button>
              </div>
            </div>

            {/* Top Grid: Canvas Viewer (left) & Caloric Gauge (right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7">
                <FoodCanvasViewer
                  imageUrl={currentImageUrl}
                  detectedItems={analysisResult.detectedItems}
                  selectedItemId={selectedItemId}
                  onSelectItem={setSelectedItemId}
                  portionMultiplier={portionMultiplier}
                />
              </div>

              <div className="lg:col-span-5 flex flex-col gap-6">
                <CalorieRing
                  totalCalories={analysisResult.totalCalories}
                  dailyGoalCalories={userGoals.dailyCalories}
                  proteinGrams={analysisResult.macronutrients.protein}
                  carbsGrams={analysisResult.macronutrients.carbs}
                  fatGrams={analysisResult.macronutrients.fat}
                  portionMultiplier={portionMultiplier}
                />

                <PortionScaler
                  portionMultiplier={portionMultiplier}
                  onChangeMultiplier={setPortionMultiplier}
                  baseWeightGrams={baseWeightGrams}
                />
              </div>
            </div>

            {/* Itemized Table of Recognized Foods */}
            <DetectedItemsTable
              items={analysisResult.detectedItems}
              selectedItemId={selectedItemId}
              onSelectItem={setSelectedItemId}
              portionMultiplier={portionMultiplier}
            />

            {/* Health Scorecard & Micronutrients */}
            <NutritionScorecard
              analysis={analysisResult}
              portionMultiplier={portionMultiplier}
            />

            {/* Physical Activity Energy Burn Equivalents */}
            <BurnEquivalents
              burnEquivalents={analysisResult.workoutBurnEquivalents}
              portionMultiplier={portionMultiplier}
              totalCalories={analysisResult.totalCalories}
            />

            {/* Culinary & Dietary Recommendations */}
            {analysisResult.recommendations && analysisResult.recommendations.length > 0 && (
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-xl backdrop-blur-sm">
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-amber-400" />
                  Clinical &amp; Metabolic Recommendations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {analysisResult.recommendations.map((rec, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl bg-slate-950/40 p-3.5 border border-slate-800/80 text-xs text-slate-300 leading-relaxed"
                    >
                      <p>{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Daily Log View */}
        {activeTab === 'log' && (
          <DailyLogView
            entries={dailyLogEntries}
            goals={userGoals}
            onRemoveEntry={handleRemoveLogEntry}
            onClearAll={handleClearLog}
            onSwitchToAnalyzer={() => setActiveTab('analyzer')}
          />
        )}

        {/* Tab 3: Deep Learning Architecture & Telemetry */}
        {activeTab === 'tech' && (
          <DeepLearningView analysis={analysisResult} />
        )}

        {/* Tab 4: User Nutrition Targets */}
        {activeTab === 'goals' && (
          <GoalSettingsView
            goals={userGoals}
            onSaveGoals={(newGoals) => setUserGoals(newGoals)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>NutriVision DL · Computer Vision Food Recognition &amp; Volumetric Calorie Analysis</span>
          <span className="font-mono text-[11px] text-slate-600">
            Powered by Deep Learning Vision Transformer · Gemini 3.8 Flash
          </span>
        </div>
      </footer>

      {/* Upload & Camera Modal */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onAnalyzeCustomImage={handleAnalyzeCustomImage}
        onSelectSampleDish={handleSelectSampleDish}
        isAnalyzing={isAnalyzing}
      />

      {/* Log Meal to Daily Tracker Modal */}
      <LogMealModal
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
        analysis={analysisResult}
        imageUrl={currentImageUrl}
        portionMultiplier={portionMultiplier}
        onConfirmLog={handleAddLogEntry}
      />
    </div>
  );
}
