import React, { useState } from 'react';
import { 
  Scissors, 
  ArrowLeft, 
  RotateCcw, 
  ShieldCheck, 
  Layers, 
  Clock, 
  Sliders, 
  CheckCircle2, 
  Volume2, 
  VolumeX,
  Play,
  Pause,
  Zap,
  Info
} from 'lucide-react';
import { ActiveMedia, FeatureSettings, SilenceSegment } from '../../types';

interface SilenceCutViewProps {
  onBack: () => void;
  media: ActiveMedia;
  silences: SilenceSegment[];
  onSilencesChange: (silences: SilenceSegment[]) => void;
  settings: FeatureSettings;
  onSettingsChange: (settings: FeatureSettings) => void;
  onExecute: () => void;
  isExecuting: boolean;
  activeSequence: string;
}

export const SilenceCutView: React.FC<SilenceCutViewProps> = ({
  onBack,
  media,
  silences,
  onSilencesChange,
  settings,
  onSettingsChange,
  onExecute,
  isExecuting,
  activeSequence,
}) => {
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [selectedPresetMode, setSelectedPresetMode] = useState<'balanced' | 'aggressive' | 'natural'>('balanced');

  const setPreset = (mode: 'balanced' | 'aggressive' | 'natural') => {
    setSelectedPresetMode(mode);
    if (mode === 'aggressive') {
      onSettingsChange({
        ...settings,
        silenceThresholdDb: -28,
        minSilenceDurationMs: 250,
        silencePaddingMs: 50,
      });
    } else if (mode === 'balanced') {
      onSettingsChange({
        ...settings,
        silenceThresholdDb: -35,
        minSilenceDurationMs: 350,
        silencePaddingMs: 80,
      });
    } else {
      onSettingsChange({
        ...settings,
        silenceThresholdDb: -42,
        minSilenceDurationMs: 550,
        silencePaddingMs: 120,
      });
    }
  };

  const toggleSilence = (id: string) => {
    onSilencesChange(
      silences.map((s) => (s.id === id ? { ...s, isCut: !s.isCut } : s))
    );
  };

  const totalCutDuration = silences
    .filter((s) => s.isCut)
    .reduce((sum, s) => sum + s.duration, 0);

  const activeCutsCount = silences.filter((s) => s.isCut).length;

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0D0D12] overflow-hidden select-none">
      {/* Top Breadcrumb & Sequence Bar */}
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
            <div className="w-6 h-6 rounded bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center">
              <Scissors className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-white uppercase tracking-wider">
                AutoCut Silences
              </h2>
              <p className="text-[11px] text-neutral-400 font-mono">
                Target: {activeSequence}
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Safety Switch */}
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 cursor-pointer bg-[#171722] border border-[#262638] px-3 py-1.5 rounded-lg">
            <input
              type="checkbox"
              checked={settings.backupSequenceFirst}
              onChange={(e) =>
                onSettingsChange({
                  ...settings,
                  backupSequenceFirst: e.target.checked,
                })
              }
              className="accent-[#7C3AED] rounded"
            />
            <span className="text-xs text-neutral-300 font-medium">
              Duplicate Sequence before cut (Safety Backup)
            </span>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          </label>
        </div>
      </div>

      {/* Main Configuration Workspace */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5 scrollbar-thin scrollbar-thumb-[#20202C]">
        {/* Preset Selector Bar */}
        <div className="bg-[#14141E] border border-[#222232] rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-neutral-200 uppercase tracking-wider">
              Pacing Presets
            </span>
            <span className="text-xs text-neutral-400">
              Select desired cadence for dialogue cuts
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setPreset('balanced')}
              className={`p-3 rounded-lg border text-left transition-all ${
                selectedPresetMode === 'balanced'
                  ? 'bg-[#201A33] border-[#7C3AED] ring-1 ring-[#7C3AED]'
                  : 'bg-[#181824] border-[#26263A] hover:bg-[#1E1E2E]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Balanced</span>
                <span className="text-[10px] font-mono text-purple-300">Recommended</span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-1 leading-tight">
                -35 dB · 350ms duration · 80ms pad. Perfect natural flow for podcasts & vlogs.
              </p>
            </button>

            <button
              onClick={() => setPreset('aggressive')}
              className={`p-3 rounded-lg border text-left transition-all ${
                selectedPresetMode === 'aggressive'
                  ? 'bg-[#201A33] border-[#7C3AED] ring-1 ring-[#7C3AED]'
                  : 'bg-[#181824] border-[#26263A] hover:bg-[#1E1E2E]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Aggressive (Viral)</span>
                <span className="text-[10px] font-mono text-amber-300">Zero Air</span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-1 leading-tight">
                -28 dB · 250ms duration · 50ms pad. Ultra-tight pacing for TikTok & Reels.
              </p>
            </button>

            <button
              onClick={() => setPreset('natural')}
              className={`p-3 rounded-lg border text-left transition-all ${
                selectedPresetMode === 'natural'
                  ? 'bg-[#201A33] border-[#7C3AED] ring-1 ring-[#7C3AED]'
                  : 'bg-[#181824] border-[#26263A] hover:bg-[#1E1E2E]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Relaxed</span>
                <span className="text-[10px] font-mono text-neutral-400">Cinematic</span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-1 leading-tight">
                -42 dB · 550ms duration · 120ms pad. Preserves thoughtful breathing & pauses.
              </p>
            </button>
          </div>
        </div>

        {/* Timeline Target Settings & Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Target Track & Scope */}
          <div className="bg-[#14141E] border border-[#222232] rounded-xl p-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-200">
              Timeline Targeting
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">Audio Track to Analyze</span>
                <select
                  value={media.selectedAudioTrack}
                  className="bg-[#1E1E2C] border border-[#303046] rounded px-2.5 py-1 text-white font-mono"
                  onChange={() => {}}
                >
                  <option value={1}>Track A1 (Host Mic)</option>
                  <option value={2}>Track A2 (Guest Mic)</option>
                  <option value={3}>All Linked Audio Tracks</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-neutral-400">Timeline Scope</span>
                <div className="flex items-center gap-1 bg-[#1A1A26] p-0.5 rounded border border-[#2B2B3E]">
                  <button
                    onClick={() =>
                      onSettingsChange({ ...settings, scopeRange: 'entire' })
                    }
                    className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
                      settings.scopeRange === 'entire'
                        ? 'bg-[#7C3AED] text-white font-semibold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Entire Sequence
                  </button>
                  <button
                    onClick={() =>
                      onSettingsChange({ ...settings, scopeRange: 'workarea' })
                    }
                    className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
                      settings.scopeRange === 'workarea'
                        ? 'bg-[#7C3AED] text-white font-semibold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    In/Out Work Area
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-neutral-400">Timeline Edit Behavior</span>
                <button
                  onClick={() =>
                    onSettingsChange({
                      ...settings,
                      rippleDelete: !settings.rippleDelete,
                    })
                  }
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
                    settings.rippleDelete
                      ? 'bg-emerald-950/60 border border-emerald-800/50 text-emerald-300'
                      : 'bg-neutral-800 text-neutral-300'
                  }`}
                >
                  {settings.rippleDelete ? 'Ripple Delete (Close Gaps)' : 'Cut & Leave Gaps'}
                </button>
              </div>
            </div>
          </div>

          {/* Precision Sliders */}
          <div className="bg-[#14141E] border border-[#222232] rounded-xl p-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-200">
              VAD Precision Sliders
            </h3>

            <div className="space-y-2.5 text-xs">
              <div>
                <div className="flex justify-between text-neutral-400 mb-1">
                  <span>Noise Threshold</span>
                  <span className="font-mono text-purple-300">{settings.silenceThresholdDb} dB</span>
                </div>
                <input
                  type="range"
                  min="-50"
                  max="-20"
                  value={settings.silenceThresholdDb}
                  onChange={(e) =>
                    onSettingsChange({
                      ...settings,
                      silenceThresholdDb: Number(e.target.value),
                    })
                  }
                  className="w-full accent-[#7C3AED] h-1.5 bg-[#252538] rounded cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-neutral-400 mb-1">
                  <span>Minimum Silence Duration</span>
                  <span className="font-mono text-purple-300">{settings.minSilenceDurationMs} ms</span>
                </div>
                <input
                  type="range"
                  min="150"
                  max="800"
                  step="25"
                  value={settings.minSilenceDurationMs}
                  onChange={(e) =>
                    onSettingsChange({
                      ...settings,
                      minSilenceDurationMs: Number(e.target.value),
                    })
                  }
                  className="w-full accent-[#7C3AED] h-1.5 bg-[#252538] rounded cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-neutral-400 mb-1">
                  <span>Speech Boundary Padding (Lead-in/Lead-out)</span>
                  <span className="font-mono text-purple-300">{settings.silencePaddingMs} ms</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="200"
                  step="10"
                  value={settings.silencePaddingMs}
                  onChange={(e) =>
                    onSettingsChange({
                      ...settings,
                      silencePaddingMs: Number(e.target.value),
                    })
                  }
                  className="w-full accent-[#7C3AED] h-1.5 bg-[#252538] rounded cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Audio Waveform & Silence Excision Visualizer */}
        <div className="bg-[#14141E] border border-[#222232] rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Detected Silence Excision Map
              </span>
            </div>
            <span className="text-xs font-mono text-neutral-400">
              Total Duration: {media.duration}s
            </span>
          </div>

          {/* Waveform Bar with Red Cut Interval Overlays */}
          <div className="relative h-20 bg-[#0B0B10] border border-[#20202E] rounded-lg overflow-hidden flex items-center px-2">
            {/* Simulated audio bars */}
            <div className="w-full h-full flex items-center justify-between gap-[2px]">
              {Array.from({ length: 64 }).map((_, i) => {
                // Determine if this bar falls inside a silence interval
                const timePos = (i / 64) * 18.0;
                const isSilence = silences.some(
                  (s) => timePos >= s.start && timePos <= s.end && s.isCut
                );
                const heightPercent = isSilence
                  ? 8
                  : Math.max(20, Math.sin(i * 0.4) * 50 + Math.cos(i * 0.9) * 30 + 35);

                return (
                  <div
                    key={i}
                    style={{ height: `${heightPercent}%` }}
                    className={`flex-1 rounded-sm transition-all ${
                      isSilence
                        ? 'bg-rose-500/40 border-t-2 border-rose-500'
                        : 'bg-[#7C3AED]'
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Individual Silence Intervals Chips */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs text-neutral-400 mr-1">Excision Intervals:</span>
            {silences.map((silence, idx) => (
              <button
                key={silence.id}
                onClick={() => toggleSilence(silence.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono transition-all ${
                  silence.isCut
                    ? 'bg-rose-950/50 border border-rose-700/60 text-rose-300'
                    : 'bg-[#20202E] border border-[#303044] text-neutral-400 line-through'
                }`}
                title={`Click to ${silence.isCut ? 'restore silence' : 'cut silence'}`}
              >
                <Scissors className="w-3 h-3 text-rose-400" />
                <span>Pause {idx + 1}: {silence.duration.toFixed(2)}s [{silence.start.toFixed(1)}s - {silence.end.toFixed(1)}s]</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="h-16 px-6 bg-[#13131A] border-t border-[#20202C] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-neutral-300">
            <span>Cuts Queued:</span>
            <strong className="text-white">{activeCutsCount} of {silences.length}</strong>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span>Time Saved:</span>
            <strong>-{totalCutDuration.toFixed(2)}s</strong>
          </div>
        </div>

        <button
          onClick={onExecute}
          disabled={isExecuting || activeCutsCount === 0}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] transition-all shadow-lg shadow-emerald-950/60 disabled:opacity-50"
        >
          <Scissors className="w-4 h-4 fill-white" />
          <span>
            {isExecuting ? 'Cutting Timeline...' : `Cut Silences in Premiere (${activeCutsCount} pauses)`}
          </span>
        </button>
      </div>
    </div>
  );
};
