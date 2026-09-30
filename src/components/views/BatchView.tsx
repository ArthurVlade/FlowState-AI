import React from 'react';
import { 
  ArrowLeft, 
  Zap, 
  Scissors, 
  Subtitles, 
  ZoomIn, 
  Smartphone, 
  ShieldAlert, 
  Bookmark, 
  Languages,
  CheckCircle2,
  Sliders
} from 'lucide-react';
import { FeatureSettings } from '../../types';

interface BatchViewProps {
  onBack: () => void;
  activeSequence: string;
  settings: FeatureSettings;
  onSettingsChange: (settings: FeatureSettings) => void;
  onExecute: () => void;
  isExecuting: boolean;
}

export const BatchView: React.FC<BatchViewProps> = ({
  onBack,
  activeSequence,
  settings,
  onSettingsChange,
  onExecute,
  isExecuting,
}) => {
  const toggleFeature = (key: keyof FeatureSettings) => {
    onSettingsChange({
      ...settings,
      [key]: !settings[key],
    });
  };

  const steps = [
    {
      key: 'autoCutSilences' as keyof FeatureSettings,
      title: 'AutoCut Silences',
      desc: 'Excise dead air and silent pauses using Silero VAD',
      icon: <Scissors className="w-4 h-4 text-emerald-400" />,
      active: settings.autoCutSilences,
    },
    {
      key: 'autoCaptions' as keyof FeatureSettings,
      title: 'AutoCaptions',
      desc: 'Build native animated Graphic Clip subtitles with word-by-word karaoke',
      icon: <Subtitles className="w-4 h-4 text-[#A78BFA]" />,
      active: settings.autoCaptions,
    },
    {
      key: 'autoZoom' as keyof FeatureSettings,
      title: 'AutoZoom',
      desc: 'Inject 1.15x jump punch-in keyframes on subject emphasis',
      icon: <ZoomIn className="w-4 h-4 text-amber-400" />,
      active: settings.autoZoom,
    },
    {
      key: 'autoProfanityFilter' as keyof FeatureSettings,
      title: 'AutoCensor',
      desc: 'Scan for profanity and place audio bleep markers',
      icon: <ShieldAlert className="w-4 h-4 text-rose-400" />,
      active: settings.autoProfanityFilter,
    },
    {
      key: 'autoChapters' as keyof FeatureSettings,
      title: 'AutoChapters',
      desc: 'Generate YouTube & Premiere Pro timeline chapter markers',
      icon: <Bookmark className="w-4 h-4 text-teal-400" />,
      active: settings.autoChapters,
    },
  ];

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
            <div className="w-6 h-6 rounded bg-purple-950/60 border border-purple-800/40 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-purple-400 fill-purple-400" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-white uppercase tracking-wider">
                AutoCut Complete (Unified Batch Pipeline)
              </h2>
              <p className="text-[11px] text-neutral-400 font-mono">
                Target: {activeSequence}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 max-w-3xl mx-auto w-full scrollbar-thin scrollbar-thumb-[#20202C]">
        <div className="bg-[#14141E] border border-[#222232] rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-200">
              Chained Pipeline Modules
            </h3>
            <span className="text-[11px] font-mono text-purple-400">
              Runs sequentially in single pass
            </span>
          </div>

          <div className="space-y-2">
            {steps.map((s) => (
              <div
                key={s.key}
                onClick={() => toggleFeature(s.key)}
                className={`p-3.5 rounded-lg border cursor-pointer flex items-center justify-between transition-all ${
                  s.active
                    ? 'bg-[#1C182A] border-[#7C3AED]/50'
                    : 'bg-[#161622] border-[#222232] opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#222232] flex items-center justify-center">
                    {s.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{s.title}</h4>
                    <p className="text-[11px] text-neutral-400">{s.desc}</p>
                  </div>
                </div>

                <div
                  className={`w-9 h-5 rounded-full transition-colors relative ${
                    s.active ? 'bg-[#7C3AED]' : 'bg-[#333333]'
                  }`}
                >
                  <div
                    className={`w-3.5 h-3.5 rounded-full bg-white transition-transform absolute top-[3px] ${
                      s.active ? 'left-[19px]' : 'left-[3px]'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="h-16 px-6 bg-[#13131A] border-t border-[#20202C] flex items-center justify-between shrink-0">
        <span className="text-xs text-neutral-400 font-mono">
          Will execute full multi-engine pipeline and update sequence
        </span>

        <button
          onClick={onExecute}
          disabled={isExecuting}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold text-white bg-[#7C3AED] hover:bg-[#6D28D9] active:scale-[0.98] transition-all shadow-lg shadow-purple-950/60"
        >
          <Zap className="w-4 h-4 fill-white" />
          <span>{isExecuting ? 'Running Pipeline...' : 'Execute Complete AutoCut Pipeline'}</span>
        </button>
      </div>
    </div>
  );
};
