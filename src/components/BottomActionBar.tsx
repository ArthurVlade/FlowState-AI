import React from 'react';
import { 
  Zap, 
  Square, 
  Terminal, 
  CheckCircle2, 
  Clock, 
  Loader2, 
  SlidersHorizontal 
} from 'lucide-react';

interface BottomActionBarProps {
  isExecuting: boolean;
  currentStep: number;
  totalSteps: number;
  currentStepName: string;
  onExecute: () => void;
  onCancel: () => void;
  onToggleTerminal: () => void;
  isTerminalOpen: boolean;
  lastExecutionStats: Record<string, number | string> | null;
}

export const BottomActionBar: React.FC<BottomActionBarProps> = ({
  isExecuting,
  currentStep,
  totalSteps,
  currentStepName,
  onExecute,
  onCancel,
  onToggleTerminal,
  isTerminalOpen,
  lastExecutionStats,
}) => {
  return (
    <footer className="h-16 border-t border-[#262626] bg-[#141414] px-4 flex items-center justify-between select-none shrink-0 z-30">
      {/* Left: Execution Progress & Step Indicator */}
      <div className="flex items-center gap-4 min-w-0">
        {isExecuting ? (
          <div className="flex items-center gap-3">
            <Loader2 className="w-5 h-5 text-[#A78BFA] animate-spin shrink-0" />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Step {currentStep} of {totalSteps}:
                </span>
                <span className="text-xs text-[#C4B5FD] font-medium truncate">
                  {currentStepName}
                </span>
              </div>
              <div className="w-48 h-1.5 bg-[#262626] rounded-full overflow-hidden mt-1">
                <div
                  className="h-full bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] transition-all duration-300 rounded-full"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ) : lastExecutionStats ? (
          <div className="flex items-center gap-2 bg-[#1A1A1A] border border-emerald-900/40 rounded-lg px-3 py-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="text-xs">
              <span className="font-semibold text-white">Pipeline Executed: </span>
              <span className="text-neutral-400 font-mono">
                {lastExecutionStats['Cuts Applied']} · {lastExecutionStats['Graphic Clips']} · Saved {lastExecutionStats['Time Saved']}
              </span>
            </div>
          </div>
        ) : (
          <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-400">
            <Clock className="w-3.5 h-3.5 text-neutral-400" />
            <span>Ready. All processing runs locally with hardware acceleration.</span>
          </div>
        )}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {isExecuting ? (
          <button
            onClick={onCancel}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-[#262626] hover:bg-[#333] border border-[#3A3A3A] text-neutral-200 transition-colors"
          >
            <Square className="w-3.5 h-3.5 text-red-400 fill-red-400" />
            <span>Cancel</span>
          </button>
        ) : (
          <button
            onClick={onExecute}
            className="group relative flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold text-white bg-[#7C3AED] hover:bg-[#6D28D9] active:scale-[0.98] transition-all shadow-lg shadow-purple-900/50 hover:shadow-purple-700/60 ring-1 ring-purple-400/40"
          >
            <Zap className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
            <span>Execute FlowState</span>
          </button>
        )}

        <button
          onClick={onToggleTerminal}
          className={`p-2 rounded-lg border text-xs font-medium transition-colors ${
            isTerminalOpen
              ? 'bg-[#261E38] border-[#7C3AED] text-purple-200'
              : 'bg-[#1C1C1C] border-[#2A2A2A] text-neutral-400 hover:text-white hover:bg-[#252525]'
          }`}
          title="Toggle Terminal Console"
        >
          <Terminal className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
};
