import React from 'react';
import { Camera, Sparkles, BookOpen, Target, Cpu, Utensils } from 'lucide-react';

interface HeaderProps {
  activeTab: 'analyzer' | 'log' | 'tech' | 'goals';
  setActiveTab: (tab: 'analyzer' | 'log' | 'tech' | 'goals') => void;
  onOpenUpload: () => void;
  dailyLoggedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenUpload,
  dailyLoggedCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Utensils className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
            NutriVision <span className="text-emerald-400 font-mono text-xs px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">DL</span>
          </span>
        </div>

        {/* Zone 2: 4 clean text navigation links / segmented tabs */}
        <nav className="hidden md:flex items-center gap-1 rounded-xl bg-slate-900/80 p-1 border border-slate-800">
          <button
            onClick={() => setActiveTab('analyzer')}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              activeTab === 'analyzer'
                ? 'bg-emerald-500 text-slate-950 shadow-sm font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Vision Analyzer</span>
          </button>

          <button
            onClick={() => setActiveTab('log')}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              activeTab === 'log'
                ? 'bg-emerald-500 text-slate-950 shadow-sm font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Daily Log</span>
            {dailyLoggedCount > 0 && (
              <span className="font-mono text-[10px] bg-slate-800 text-emerald-300 px-1.5 py-0.2 rounded-full border border-slate-700">
                {dailyLoggedCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('tech')}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              activeTab === 'tech'
                ? 'bg-emerald-500 text-slate-950 shadow-sm font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Cpu className="h-3.5 w-3.5" />
            <span>DL Architecture</span>
          </button>

          <button
            onClick={() => setActiveTab('goals')}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              activeTab === 'goals'
                ? 'bg-emerald-500 text-slate-950 shadow-sm font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Target className="h-3.5 w-3.5" />
            <span>Nutrition Targets</span>
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenUpload}
            className="flex items-center gap-2 rounded-lg bg-emerald-500 px-3.5 py-2 text-xs font-semibold text-slate-950 transition-all hover:bg-emerald-400 active:scale-[0.98] shadow-sm shadow-emerald-500/10 cursor-pointer"
          >
            <Camera className="h-3.5 w-3.5" />
            <span className="whitespace-nowrap">Scan Meal</span>
          </button>
        </div>
      </div>

      {/* Mobile nav bar row for small screens */}
      <div className="flex md:hidden items-center justify-around border-t border-slate-800/60 bg-slate-950/90 px-2 py-1.5 text-[11px]">
        <button
          onClick={() => setActiveTab('analyzer')}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg ${
            activeTab === 'analyzer' ? 'text-emerald-400 font-semibold' : 'text-slate-400'
          }`}
        >
          <Sparkles className="h-4 w-4" />
          <span>Analyzer</span>
        </button>
        <button
          onClick={() => setActiveTab('log')}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg ${
            activeTab === 'log' ? 'text-emerald-400 font-semibold' : 'text-slate-400'
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>Daily Log</span>
        </button>
        <button
          onClick={() => setActiveTab('tech')}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg ${
            activeTab === 'tech' ? 'text-emerald-400 font-semibold' : 'text-slate-400'
          }`}
        >
          <Cpu className="h-4 w-4" />
          <span>DL Model</span>
        </button>
        <button
          onClick={() => setActiveTab('goals')}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg ${
            activeTab === 'goals' ? 'text-emerald-400 font-semibold' : 'text-slate-400'
          }`}
        >
          <Target className="h-4 w-4" />
          <span>Goals</span>
        </button>
      </div>
    </header>
  );
};
