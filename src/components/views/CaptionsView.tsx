import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Subtitles, 
  Sparkles, 
  Layers, 
  Edit3, 
  Sliders, 
  Check, 
  Smartphone, 
  Monitor, 
  Square,
  Play,
  RotateCcw
} from 'lucide-react';
import { CaptionStyle, TranscriptWord } from '../../types';
import { CaptionPreviewer } from '../CaptionPreviewer';
import { PresetLibrary } from '../PresetLibrary';
import { StyleCustomizer } from '../StyleCustomizer';
import { TranscriptEditor } from '../TranscriptEditor';

interface CaptionsViewProps {
  onBack: () => void;
  style: CaptionStyle;
  onStyleChange: (style: CaptionStyle) => void;
  words: TranscriptWord[];
  onWordsChange: (words: TranscriptWord[]) => void;
  currentTime: number;
  onTimeUpdate: (time: number) => void;
  aspectRatio: '9:16' | '16:9' | '1:1';
  onAspectRatioChange: (ratio: '9:16' | '16:9' | '1:1') => void;
  onExecute: () => void;
  isExecuting: boolean;
  activeSequence: string;
}

export const CaptionsView: React.FC<CaptionsViewProps> = ({
  onBack,
  style,
  onStyleChange,
  words,
  onWordsChange,
  currentTime,
  onTimeUpdate,
  aspectRatio,
  onAspectRatioChange,
  onExecute,
  isExecuting,
  activeSequence,
}) => {
  const [activeTab, setActiveTab] = useState<'presets' | 'transcript' | 'customize'>('presets');

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0D0D12] overflow-hidden select-none">
      {/* Top Header */}
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
            <div className="w-6 h-6 rounded bg-purple-950/60 border border-purple-800/40 flex items-center justify-center">
              <Subtitles className="w-3.5 h-3.5 text-[#A78BFA]" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-white uppercase tracking-wider">
                AutoCaptions & Graphic Clips
              </h2>
              <p className="text-[11px] text-neutral-400 font-mono">
                Target: {activeSequence} · Video Track 3
              </p>
            </div>
          </div>
        </div>

        {/* Workflow Tabs */}
        <div className="flex items-center gap-1 bg-[#171722] p-1 rounded-lg border border-[#242436]">
          <button
            onClick={() => setActiveTab('presets')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              activeTab === 'presets'
                ? 'bg-[#7C3AED] text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            1. Style Presets
          </button>
          <button
            onClick={() => setActiveTab('transcript')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              activeTab === 'transcript'
                ? 'bg-[#7C3AED] text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            2. Transcript & Emojis
          </button>
          <button
            onClick={() => setActiveTab('customize')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              activeTab === 'customize'
                ? 'bg-[#7C3AED] text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            3. Fine-Tune Styling
          </button>
        </div>
      </div>

      {/* 2-Column Split Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Active Workflow Step */}
        <div className="flex-1 overflow-y-auto p-5 scrollbar-thin scrollbar-thumb-[#20202C]">
          {activeTab === 'presets' && (
            <div className="space-y-4">
              <div className="bg-[#14141E] border border-[#222232] rounded-xl p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-200 mb-1">
                  Community Preset Library
                </h3>
                <p className="text-xs text-neutral-400 mb-3">
                  Choose a style inspired by top viral creators. The live canvas on the right previews keyframe animations in real time.
                </p>
                <PresetLibrary
                  selectedStyle={style}
                  onSelectStyle={onStyleChange}
                />
              </div>
            </div>
          )}

          {activeTab === 'transcript' && (
            <div className="h-full flex flex-col">
              <TranscriptEditor
                words={words}
                silences={[]}
                onWordsChange={onWordsChange}
                onSilencesChange={() => {}}
                currentTime={currentTime}
                onSeek={onTimeUpdate}
              />
            </div>
          )}

          {activeTab === 'customize' && (
            <div className="space-y-4">
              <StyleCustomizer
                style={style}
                onChange={onStyleChange}
              />
            </div>
          )}
        </div>

        {/* Right Side: Live HTML5 Canvas Animation Previewer */}
        <div className="w-[420px] border-l border-[#20202C] bg-[#121218] p-5 flex flex-col justify-between shrink-0 overflow-y-auto scrollbar-thin scrollbar-thumb-[#20202C]">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#20202C]">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Live Keyframe Canvas
              </span>
              <span className="text-[10px] font-mono text-purple-400 bg-purple-950/40 border border-purple-800/40 px-2 py-0.5 rounded">
                Real-Time Render
              </span>
            </div>

            <CaptionPreviewer
              style={style}
              words={words}
              currentTime={currentTime}
              onTimeUpdate={onTimeUpdate}
              aspectRatio={aspectRatio}
              onAspectRatioChange={onAspectRatioChange}
            />

            <div className="mt-4 bg-[#161622] border border-[#242436] rounded-lg p-3 text-xs space-y-1.5 text-neutral-300 font-mono">
              <div className="flex justify-between">
                <span className="text-neutral-400">Selected Font:</span>
                <span className="text-white">{style.fontFamily} ({style.fontWeight})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Motion Curve:</span>
                <span className="text-purple-300">{style.animationType} ({style.animationSpeedMs}ms)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Active Highlight:</span>
                <span style={{ color: style.highlightColor }}>{style.highlightColor}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#20202C] mt-4">
            <button
              onClick={onExecute}
              disabled={isExecuting}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold text-white bg-[#7C3AED] hover:bg-[#6D28D9] active:scale-[0.98] transition-all shadow-lg shadow-purple-950/60"
            >
              <Subtitles className="w-4 h-4 fill-white" />
              <span>
                {isExecuting ? 'Injecting Graphic Clips...' : 'Add Captions to Premiere Timeline (V3)'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
