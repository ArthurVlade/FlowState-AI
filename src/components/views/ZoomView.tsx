import React, { useState } from 'react';
import { ArrowLeft, ZoomIn, Sliders, CheckCircle2, Video } from 'lucide-react';

interface ZoomViewProps {
  onBack: () => void;
  activeSequence: string;
  onExecute: () => void;
  isExecuting: boolean;
}

export const ZoomView: React.FC<ZoomViewProps> = ({
  onBack,
  activeSequence,
  onExecute,
  isExecuting,
}) => {
  const [zoomScale, setZoomScale] = useState(1.15);
  const [pacing, setPacing] = useState<'topic' | 'sentence' | 'rhythm'>('topic');
  const [cutType, setCutType] = useState<'jump' | 'smooth'>('jump');

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
            <div className="w-6 h-6 rounded bg-amber-950/60 border border-amber-800/40 flex items-center justify-center">
              <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-white uppercase tracking-wider">
                AutoZoom (Dynamic Punch-In Jump Cuts)
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
            Zoom Scale & Motion Behavior
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between text-neutral-400 mb-1">
                <span>Punch-In Magnification Factor</span>
                <span className="font-mono text-amber-400 font-bold">{zoomScale.toFixed(2)}x ({(zoomScale * 100).toFixed(0)}%)</span>
              </div>
              <input
                type="range"
                min="1.05"
                max="1.35"
                step="0.05"
                value={zoomScale}
                onChange={(e) => setZoomScale(Number(e.target.value))}
                className="w-full accent-amber-500 h-1.5 bg-[#252538] rounded cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-500 mt-1 font-mono">
                <span>Subtle (1.10x)</span>
                <span>Standard (1.15x)</span>
                <span>Dramatic (1.30x)</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#222232]">
              <span className="text-neutral-400 block mb-2">Punch-In Trigger Pacing</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setPacing('topic')}
                  className={`p-2.5 rounded-lg border text-left transition-colors ${
                    pacing === 'topic'
                      ? 'bg-amber-950/40 border-amber-500/60 text-amber-200'
                      : 'bg-[#181824] border-[#26263A] text-neutral-400 hover:text-white'
                  }`}
                >
                  <strong className="block text-white text-xs">Topic Emphasis</strong>
                  <span className="text-[10px] text-neutral-400">Zooms on strong emotion words & chapter starts.</span>
                </button>

                <button
                  onClick={() => setPacing('sentence')}
                  className={`p-2.5 rounded-lg border text-left transition-colors ${
                    pacing === 'sentence'
                      ? 'bg-amber-950/40 border-amber-500/60 text-amber-200'
                      : 'bg-[#181824] border-[#26263A] text-neutral-400 hover:text-white'
                  }`}
                >
                  <strong className="block text-white text-xs">Every 2nd Sentence</strong>
                  <span className="text-[10px] text-neutral-400">Standard YouTube vlogging cadence (every 4-6s).</span>
                </button>

                <button
                  onClick={() => setPacing('rhythm')}
                  className={`p-2.5 rounded-lg border text-left transition-colors ${
                    pacing === 'rhythm'
                      ? 'bg-amber-950/40 border-amber-500/60 text-amber-200'
                      : 'bg-[#181824] border-[#26263A] text-neutral-400 hover:text-white'
                  }`}
                >
                  <strong className="block text-white text-xs">Rapid Rhythm</strong>
                  <span className="text-[10px] text-neutral-400">High-energy cuts every 2-3s for TikTok/Shorts.</span>
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-[#222232] flex items-center justify-between">
              <div>
                <span className="text-white font-medium block">Transition Transition Style</span>
                <span className="text-neutral-400 text-[11px]">Instant jump cut vs subtle camera push zoom.</span>
              </div>
              <div className="flex items-center gap-1 bg-[#1A1A26] p-0.5 rounded border border-[#2B2B3E]">
                <button
                  onClick={() => setCutType('jump')}
                  className={`px-3 py-1 rounded text-xs transition-colors ${
                    cutType === 'jump'
                      ? 'bg-amber-600 text-white font-bold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Instant Jump
                </button>
                <button
                  onClick={() => setCutType('smooth')}
                  className={`px-3 py-1 rounded text-xs transition-colors ${
                    cutType === 'smooth'
                      ? 'bg-amber-600 text-white font-bold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Smooth Push
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="h-16 px-6 bg-[#13131A] border-t border-[#20202C] flex items-center justify-between shrink-0">
        <span className="text-xs text-neutral-400 font-mono">
          Will inject scale & position keyframes onto Video Track 1
        </span>

        <button
          onClick={onExecute}
          disabled={isExecuting}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold text-white bg-amber-600 hover:bg-amber-500 active:scale-[0.98] transition-all shadow-lg shadow-amber-950/60"
        >
          <ZoomIn className="w-4 h-4 fill-white" />
          <span>{isExecuting ? 'Injecting Keyframes...' : 'Apply Smart Zooms in Premiere'}</span>
        </button>
      </div>
    </div>
  );
};
