import React, { useState } from 'react';
import { ArrowLeft, Users, Camera, Mic, Sliders, CheckCircle2, Video } from 'lucide-react';

interface PodcastViewProps {
  onBack: () => void;
  activeSequence: string;
  onExecute: () => void;
  isExecuting: boolean;
}

export const PodcastView: React.FC<PodcastViewProps> = ({
  onBack,
  activeSequence,
  onExecute,
  isExecuting,
}) => {
  const [minShotDuration, setMinShotDuration] = useState(2.5);
  const [reactionShots, setReactionShots] = useState(true);
  const [wideShotOnBoth, setWideShotOnBoth] = useState(true);

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
            <div className="w-6 h-6 rounded bg-blue-950/60 border border-blue-800/40 flex items-center justify-center">
              <Users className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-white uppercase tracking-wider">
                AutoPodcast (Multi-Camera Diarization)
              </h2>
              <p className="text-[11px] text-neutral-400 font-mono">
                Target: {activeSequence}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5 max-w-4xl mx-auto w-full scrollbar-thin scrollbar-thumb-[#20202C]">
        {/* Camera Track Mapping */}
        <div className="bg-[#14141E] border border-[#222232] rounded-xl p-5 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-200">
            Camera Angle to Microphone Track Routing
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-lg bg-[#191926] border border-[#26263A] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5" />
                  <span>Camera 1 (Host)</span>
                </span>
                <span className="text-[10px] font-mono text-neutral-400">Track V1</span>
              </div>
              <p className="text-[11px] text-neutral-400">Switches when Audio Track 1 speaks.</p>
              <div className="flex items-center gap-1.5 text-xs text-white bg-[#12121C] p-2 rounded border border-[#2E2E44]">
                <Mic className="w-3 h-3 text-purple-400" />
                <span className="font-mono">Audio Track A1 (Host Mic)</span>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-[#191926] border border-[#26263A] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5" />
                  <span>Camera 2 (Guest)</span>
                </span>
                <span className="text-[10px] font-mono text-neutral-400">Track V2</span>
              </div>
              <p className="text-[11px] text-neutral-400">Switches when Audio Track 2 speaks.</p>
              <div className="flex items-center gap-1.5 text-xs text-white bg-[#12121C] p-2 rounded border border-[#2E2E44]">
                <Mic className="w-3 h-3 text-emerald-400" />
                <span className="font-mono">Audio Track A2 (Guest Mic)</span>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-[#191926] border border-[#26263A] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5" />
                  <span>Camera 3 (Wide Shot)</span>
                </span>
                <span className="text-[10px] font-mono text-neutral-400">Track V3</span>
              </div>
              <p className="text-[11px] text-neutral-400">Switches when both speak or during laugh.</p>
              <div className="flex items-center gap-1.5 text-xs text-white bg-[#12121C] p-2 rounded border border-[#2E2E44]">
                <Users className="w-3 h-3 text-amber-400" />
                <span className="font-mono">Simultaneous Overlap</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pacing Sliders */}
        <div className="bg-[#14141E] border border-[#222232] rounded-xl p-5 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-200">
            Switching Pacing & Reaction Cuts
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between text-neutral-400 mb-1">
                <span>Minimum Shot Duration</span>
                <span className="font-mono text-blue-300">{minShotDuration} seconds</span>
              </div>
              <input
                type="range"
                min="1.5"
                max="6.0"
                step="0.5"
                value={minShotDuration}
                onChange={(e) => setMinShotDuration(Number(e.target.value))}
                className="w-full accent-blue-500 h-1.5 bg-[#252538] rounded cursor-pointer"
              />
              <span className="text-[11px] text-neutral-500">
                Prevents rapid ping-pong switching during quick cross-talk.
              </span>
            </div>

            <div className="pt-2 border-t border-[#222232] flex items-center justify-between">
              <div>
                <span className="text-white font-medium block">Wide Shot on Simultaneous Laughter</span>
                <span className="text-neutral-400 text-[11px]">Cuts to wide angle when both host and guest audio peak together.</span>
              </div>
              <input
                type="checkbox"
                checked={wideShotOnBoth}
                onChange={(e) => setWideShotOnBoth(e.target.checked)}
                className="accent-blue-500 rounded"
              />
            </div>

            <div className="pt-2 border-t border-[#222232] flex items-center justify-between">
              <div>
                <span className="text-white font-medium block">Intermittent Reaction Cuts</span>
                <span className="text-neutral-400 text-[11px]">Periodically cuts to listening speaker for 1.5s nod reactions.</span>
              </div>
              <input
                type="checkbox"
                checked={reactionShots}
                onChange={(e) => setReactionShots(e.target.checked)}
                className="accent-blue-500 rounded"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="h-16 px-6 bg-[#13131A] border-t border-[#20202C] flex items-center justify-between shrink-0">
        <div className="text-xs text-neutral-400 font-mono">
          Ready to analyze tracks A1 & A2 using pyannote speaker diarization
        </div>

        <button
          onClick={onExecute}
          disabled={isExecuting}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 active:scale-[0.98] transition-all shadow-lg shadow-blue-950/60"
        >
          <Users className="w-4 h-4 fill-white" />
          <span>{isExecuting ? 'Switching Angles...' : 'Build Multicam Cuts in Premiere'}</span>
        </button>
      </div>
    </div>
  );
};
