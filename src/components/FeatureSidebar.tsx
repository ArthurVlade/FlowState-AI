import React from 'react';
import { 
  Subtitles, 
  Scissors, 
  Users, 
  ZoomIn, 
  Film, 
  ShieldAlert, 
  Bookmark, 
  Smartphone, 
  Languages,
  Sliders,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { FeatureSettings } from '../types';

interface FeatureSidebarProps {
  settings: FeatureSettings;
  onChange: (settings: FeatureSettings) => void;
}

export const FeatureSidebar: React.FC<FeatureSidebarProps> = ({ settings, onChange }) => {
  const [expandedFeature, setExpandedFeature] = React.useState<string | null>('silence');

  const toggleSwitch = (key: keyof FeatureSettings) => {
    onChange({
      ...settings,
      [key]: !settings[key],
    });
  };

  const toggleExpand = (id: string) => {
    setExpandedFeature(expandedFeature === id ? null : id);
  };

  return (
    <aside className="w-80 border-r border-[#262626] bg-[#141414] flex flex-col h-full overflow-hidden select-none shrink-0">
      <div className="p-3 border-b border-[#242424] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#A78BFA]" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-200">
            Feature Automation Suite
          </h2>
        </div>
        <span className="text-[10px] font-mono text-neutral-400">
          9 Local Engines
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2.5 scrollbar-thin scrollbar-thumb-[#2E2E2E]">
        {/* 1. AutoCaptions */}
        <div className="bg-[#1C1C1C] border border-[#2B2B2B] rounded-lg p-2.5 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded bg-[#272727] flex items-center justify-center text-purple-400">
                <Subtitles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-white">AutoCaptions</h3>
                <p className="text-[11px] text-neutral-400">Graphic Clips + Ollama Emojis</p>
              </div>
            </div>
            <button
              onClick={() => toggleSwitch('autoCaptions')}
              className={`w-9 h-5 rounded-full transition-colors relative ${
                settings.autoCaptions ? 'bg-[#7C3AED]' : 'bg-[#333333]'
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full bg-white transition-transform absolute top-[3px] ${
                  settings.autoCaptions ? 'left-[19px]' : 'left-[3px]'
                }`}
              />
            </button>
          </div>
        </div>

        {/* 2. AutoCut Silences */}
        <div className="bg-[#1C1C1C] border border-[#2B2B2B] rounded-lg p-2.5 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded bg-[#272727] flex items-center justify-center text-emerald-400">
                <Scissors className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-white">AutoCut Silences</h3>
                <p className="text-[11px] text-neutral-400">Silero VAD - Sub-ms Precision</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleExpand('silence')}
                className="text-neutral-400 hover:text-white p-1"
              >
                {expandedFeature === 'silence' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => toggleSwitch('autoCutSilences')}
                className={`w-9 h-5 rounded-full transition-colors relative ${
                  settings.autoCutSilences ? 'bg-[#7C3AED]' : 'bg-[#333333]'
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full bg-white transition-transform absolute top-[3px] ${
                    settings.autoCutSilences ? 'left-[19px]' : 'left-[3px]'
                  }`}
                />
              </button>
            </div>
          </div>

          {expandedFeature === 'silence' && (
            <div className="mt-3 pt-2.5 border-t border-[#292929] space-y-2 text-[11px]">
              <div>
                <div className="flex justify-between text-neutral-400 mb-1">
                  <span>Threshold Level</span>
                  <span className="font-mono text-neutral-200">{settings.silenceThresholdDb} dB</span>
                </div>
                <input
                  type="range"
                  min="-50"
                  max="-20"
                  step="1"
                  value={settings.silenceThresholdDb}
                  onChange={(e) => onChange({ ...settings, silenceThresholdDb: Number(e.target.value) })}
                  className="w-full accent-[#7C3AED] h-1.5 bg-[#2E2E2E] rounded cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-neutral-400 mb-1">
                  <span>Min Silence Duration</span>
                  <span className="font-mono text-neutral-200">{settings.minSilenceDurationMs} ms</span>
                </div>
                <input
                  type="range"
                  min="150"
                  max="800"
                  step="25"
                  value={settings.minSilenceDurationMs}
                  onChange={(e) => onChange({ ...settings, minSilenceDurationMs: Number(e.target.value) })}
                  className="w-full accent-[#7C3AED] h-1.5 bg-[#2E2E2E] rounded cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>

        {/* 3. AutoPodcast (Multicam Diarization) */}
        <div className="bg-[#1C1C1C] border border-[#2B2B2B] rounded-lg p-2.5 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded bg-[#272727] flex items-center justify-center text-blue-400">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-white">AutoPodcast Diarization</h3>
                <p className="text-[11px] text-neutral-400">pyannote multicam angle switch</p>
              </div>
            </div>
            <button
              onClick={() => toggleSwitch('autoPodcast')}
              className={`w-9 h-5 rounded-full transition-colors relative ${
                settings.autoPodcast ? 'bg-[#7C3AED]' : 'bg-[#333333]'
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full bg-white transition-transform absolute top-[3px] ${
                  settings.autoPodcast ? 'left-[19px]' : 'left-[3px]'
                }`}
              />
            </button>
          </div>
        </div>

        {/* 4. AutoZoom */}
        <div className="bg-[#1C1C1C] border border-[#2B2B2B] rounded-lg p-2.5 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded bg-[#272727] flex items-center justify-center text-amber-400">
                <ZoomIn className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-white">AutoZoom (Smart Jump)</h3>
                <p className="text-[11px] text-neutral-400">1.15x dynamic punch-ins</p>
              </div>
            </div>
            <button
              onClick={() => toggleSwitch('autoZoom')}
              className={`w-9 h-5 rounded-full transition-colors relative ${
                settings.autoZoom ? 'bg-[#7C3AED]' : 'bg-[#333333]'
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full bg-white transition-transform absolute top-[3px] ${
                  settings.autoZoom ? 'left-[19px]' : 'left-[3px]'
                }`}
              />
            </button>
          </div>
        </div>

        {/* 5. AutoB-Rolls */}
        <div className="bg-[#1C1C1C] border border-[#2B2B2B] rounded-lg p-2.5 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded bg-[#272727] flex items-center justify-center text-rose-400">
                <Film className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-white">AutoB-Rolls</h3>
                <p className="text-[11px] text-neutral-400">Local keyword & footage place</p>
              </div>
            </div>
            <button
              onClick={() => toggleSwitch('autoBRolls')}
              className={`w-9 h-5 rounded-full transition-colors relative ${
                settings.autoBRolls ? 'bg-[#7C3AED]' : 'bg-[#333333]'
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full bg-white transition-transform absolute top-[3px] ${
                  settings.autoBRolls ? 'left-[19px]' : 'left-[3px]'
                }`}
              />
            </button>
          </div>
        </div>

        {/* 6. AutoProfanity Filter */}
        <div className="bg-[#1C1C1C] border border-[#2B2B2B] rounded-lg p-2.5 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded bg-[#272727] flex items-center justify-center text-red-500">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-white">AutoProfanity Censor</h3>
                <p className="text-[11px] text-neutral-400">Beep tone / 1kHz audio mute</p>
              </div>
            </div>
            <button
              onClick={() => toggleSwitch('autoProfanityFilter')}
              className={`w-9 h-5 rounded-full transition-colors relative ${
                settings.autoProfanityFilter ? 'bg-[#7C3AED]' : 'bg-[#333333]'
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full bg-white transition-transform absolute top-[3px] ${
                  settings.autoProfanityFilter ? 'left-[19px]' : 'left-[3px]'
                }`}
              />
            </button>
          </div>
        </div>

        {/* 7. AutoChapters */}
        <div className="bg-[#1C1C1C] border border-[#2B2B2B] rounded-lg p-2.5 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded bg-[#272727] flex items-center justify-center text-teal-400">
                <Bookmark className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-white">AutoChapters</h3>
                <p className="text-[11px] text-neutral-400">Timeline chapter markers</p>
              </div>
            </div>
            <button
              onClick={() => toggleSwitch('autoChapters')}
              className={`w-9 h-5 rounded-full transition-colors relative ${
                settings.autoChapters ? 'bg-[#7C3AED]' : 'bg-[#333333]'
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full bg-white transition-transform absolute top-[3px] ${
                  settings.autoChapters ? 'left-[19px]' : 'left-[3px]'
                }`}
              />
            </button>
          </div>
        </div>

        {/* 8. AutoResize (Smart Framing) */}
        <div className="bg-[#1C1C1C] border border-[#2B2B2B] rounded-lg p-2.5 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded bg-[#272727] flex items-center justify-center text-cyan-400">
                <Smartphone className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-white">AutoResize (9:16)</h3>
                <p className="text-[11px] text-neutral-400">YOLOv8 Face center tracking</p>
              </div>
            </div>
            <button
              onClick={() => toggleSwitch('autoResize')}
              className={`w-9 h-5 rounded-full transition-colors relative ${
                settings.autoResize ? 'bg-[#7C3AED]' : 'bg-[#333333]'
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full bg-white transition-transform absolute top-[3px] ${
                  settings.autoResize ? 'left-[19px]' : 'left-[3px]'
                }`}
              />
            </button>
          </div>
        </div>

        {/* 9. AutoTranslate */}
        <div className="bg-[#1C1C1C] border border-[#2B2B2B] rounded-lg p-2.5 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded bg-[#272727] flex items-center justify-center text-orange-400">
                <Languages className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-white">AutoTranslate</h3>
                <p className="text-[11px] text-neutral-400">80+ Foreign to English Sync</p>
              </div>
            </div>
            <button
              onClick={() => toggleSwitch('autoTranslate')}
              className={`w-9 h-5 rounded-full transition-colors relative ${
                settings.autoTranslate ? 'bg-[#7C3AED]' : 'bg-[#333333]'
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full bg-white transition-transform absolute top-[3px] ${
                  settings.autoTranslate ? 'left-[19px]' : 'left-[3px]'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
