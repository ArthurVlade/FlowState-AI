import React, { useState } from 'react';
import { ArrowLeft, Smartphone, Check, Sliders, Monitor, Square } from 'lucide-react';

interface ResizeViewProps {
  onBack: () => void;
  activeSequence: string;
  onExecute: () => void;
  isExecuting: boolean;
}

export const ResizeView: React.FC<ResizeViewProps> = ({
  onBack,
  activeSequence,
  onExecute,
  isExecuting,
}) => {
  const [targetAspect, setTargetAspect] = useState<'9:16' | '1:1'>('9:16');
  const [trackingConfidence, setTrackingConfidence] = useState(0.85);
  const [motionSmoothing, setMotionSmoothing] = useState(12);

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0D0D12] overflow-hidden select-none">
      {/* Header */}
      <div className="px-6 py-3.5 bg-[#13131A] border-b border-[#20202C] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#1B1B26] hover:bg-[#252535] border border-[#2B2B3E] text-xs font-medium text-neutral-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Tools</span>
          </button>
          <div className="h-4 w-[1px] bg-neutral-800" />
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-cyan-950/60 border border-cyan-800/40 flex items-center justify-center">
              <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-white uppercase tracking-wider">
                AutoResize (Smart Framing with YOLOv8 Face Tracking)
              </h2>
              <p className="text-[11px] text-neutral-400 font-mono">
                Target: {activeSequence}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Settings */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5 max-w-3xl mx-auto w-full scrollbar-thin scrollbar-thumb-[#20202C]">
        <div className="bg-[#14141E] border border-[#222232] rounded-xl p-5 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-200">
            Target Aspect Ratio
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setTargetAspect('9:16')}
              className={`p-3.5 rounded-lg border text-left transition-all flex items-center gap-3 ${
                targetAspect === '9:16'
                  ? 'bg-cyan-950/40 border-cyan-500/60 ring-1 ring-cyan-500/60'
                  : 'bg-[#181824] border-[#26263A] text-neutral-400 hover:text-white'
              }`}
            >
              <div className="w-8 h-8 rounded bg-[#1C1C2C] flex items-center justify-center text-cyan-400">
                <Smartphone className="w-4 h-4" />
              </div>
              <div>
                <strong className="block text-white text-xs">9:16 Vertical</strong>
                <span className="text-[11px] text-neutral-400">TikTok, Instagram Reels, YouTube Shorts</span>
              </div>
            </button>

            <button
              onClick={() => setTargetAspect('1:1')}
              className={`p-3.5 rounded-lg border text-left transition-all flex items-center gap-3 ${
                targetAspect === '1:1'
                  ? 'bg-cyan-950/40 border-cyan-500/60 ring-1 ring-cyan-500/60'
                  : 'bg-[#181824] border-[#26263A] text-neutral-400 hover:text-white'
              }`}
            >
              <div className="w-8 h-8 rounded bg-[#1C1C2C] flex items-center justify-center text-cyan-400">
                <Square className="w-4 h-4" />
              </div>
              <div>
                <strong className="block text-white text-xs">1:1 Square</strong>
                <span className="text-[11px] text-neutral-400">Instagram Feed & LinkedIn Square Video</span>
              </div>
            </button>
          </div>

          <div className="pt-3 border-t border-[#222232] space-y-3 text-xs">
            <div>
              <div className="flex justify-between text-neutral-400 mb-1">
                <span>Motion Smoothing Window</span>
                <span className="font-mono text-cyan-300">{motionSmoothing} frames</span>
              </div>
              <input
                type="range"
                min="4"
                max="30"
                value={motionSmoothing}
                onChange={(e) => setMotionSmoothing(Number(e.target.value))}
                className="w-full accent-cyan-500 h-1.5 bg-[#252538] rounded cursor-pointer"
              />
              <span className="text-[11px] text-neutral-500">
                Averages facial coordinates across frames to prevent jittery camera movements.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="h-16 px-6 bg-[#13131A] border-t border-[#20202C] flex items-center justify-between shrink-0">
        <span className="text-xs text-neutral-400 font-mono">
          Will clone sequence as "{activeSequence} [9x16 Vertical]"
        </span>

        <button
          onClick={onExecute}
          disabled={isExecuting}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 active:scale-[0.98] transition-all shadow-lg shadow-cyan-950/60"
        >
          <Smartphone className="w-4 h-4 fill-white" />
          <span>{isExecuting ? 'Reframing Video...' : 'Create 9:16 Sequence in Premiere'}</span>
        </button>
      </div>
    </div>
  );
};
