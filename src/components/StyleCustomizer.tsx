import React from 'react';
import { Sliders, Type, Palette, Shield, Sparkles, Move } from 'lucide-react';
import { CaptionStyle } from '../types';

interface StyleCustomizerProps {
  style: CaptionStyle;
  onChange: (updated: CaptionStyle) => void;
}

export const StyleCustomizer: React.FC<StyleCustomizerProps> = ({ style, onChange }) => {
  const updateProp = <K extends keyof CaptionStyle>(key: K, value: CaptionStyle[K]) => {
    onChange({
      ...style,
      [key]: value,
    });
  };

  const fonts = [
    'Impact',
    'Montserrat',
    'Arial Black',
    'Inter',
    'Georgia',
    'Helvetica Neue',
    'Trebuchet MS',
    'Courier New',
  ];

  return (
    <div className="bg-[#181818] border border-[#2B2B2B] rounded-lg p-3 space-y-3 select-none text-xs">
      <div className="flex items-center justify-between pb-2 border-b border-[#262626]">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#A78BFA]" />
          <h3 className="font-bold uppercase tracking-wider text-neutral-200">
            Caption Styling & Keyframes
          </h3>
        </div>
        <span className="text-[10px] font-mono text-neutral-400">
          ExtendScript JSX Target
        </span>
      </div>

      {/* Font & Sizing */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-neutral-400 flex items-center gap-1.5">
            <Type className="w-3.5 h-3.5 text-purple-400" />
            <span>Font Family</span>
          </label>
          <select
            value={style.fontFamily}
            onChange={(e) => updateProp('fontFamily', e.target.value)}
            className="bg-[#242424] border border-[#333] rounded px-2 py-1 text-white font-sans focus:outline-none focus:border-[#7C3AED]"
          >
            {fonts.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="flex justify-between text-neutral-400 mb-1">
            <span>Font Size (pt in Premiere)</span>
            <span className="font-mono text-white">{style.fontSize} pt</span>
          </div>
          <input
            type="range"
            min="24"
            max="84"
            value={style.fontSize}
            onChange={(e) => updateProp('fontSize', Number(e.target.value))}
            className="w-full accent-[#7C3AED] h-1.5 bg-[#2A2A2A] rounded cursor-pointer"
          />
        </div>
      </div>

      {/* Color System */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#262626]">
        <div>
          <label className="text-neutral-400 block mb-1 text-[11px]">Primary Text</label>
          <div className="flex items-center gap-1.5 bg-[#222] border border-[#333] rounded p-1.5">
            <input
              type="color"
              value={style.textColor}
              onChange={(e) => updateProp('textColor', e.target.value)}
              className="w-4 h-4 rounded cursor-pointer bg-transparent border-0"
            />
            <span className="font-mono text-[10px] text-neutral-300 uppercase truncate">
              {style.textColor}
            </span>
          </div>
        </div>

        <div>
          <label className="text-neutral-400 block mb-1 text-[11px]">Active Highlight</label>
          <div className="flex items-center gap-1.5 bg-[#222] border border-[#333] rounded p-1.5">
            <input
              type="color"
              value={style.highlightColor}
              onChange={(e) => updateProp('highlightColor', e.target.value)}
              className="w-4 h-4 rounded cursor-pointer bg-transparent border-0"
            />
            <span className="font-mono text-[10px] text-emerald-400 uppercase truncate">
              {style.highlightColor}
            </span>
          </div>
        </div>

        <div>
          <label className="text-neutral-400 block mb-1 text-[11px]">Secondary Pop</label>
          <div className="flex items-center gap-1.5 bg-[#222] border border-[#333] rounded p-1.5">
            <input
              type="color"
              value={style.secondaryColor || '#F59E0B'}
              onChange={(e) => updateProp('secondaryColor', e.target.value)}
              className="w-4 h-4 rounded cursor-pointer bg-transparent border-0"
            />
            <span className="font-mono text-[10px] text-amber-400 uppercase truncate">
              {style.secondaryColor || '#F59E0B'}
            </span>
          </div>
        </div>
      </div>

      {/* Stroke & Shadow */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#262626]">
        <div>
          <div className="flex justify-between text-neutral-400 mb-1 text-[11px]">
            <span>Stroke Width</span>
            <span className="font-mono text-white">{style.strokeWidth}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            value={style.strokeWidth}
            onChange={(e) => updateProp('strokeWidth', Number(e.target.value))}
            className="w-full accent-[#7C3AED] h-1 bg-[#2A2A2A] rounded cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-neutral-400 mb-1 text-[11px]">
            <span>Shadow Blur</span>
            <span className="font-mono text-white">{style.shadowBlur}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="30"
            value={style.shadowBlur}
            onChange={(e) => updateProp('shadowBlur', Number(e.target.value))}
            className="w-full accent-[#7C3AED] h-1 bg-[#2A2A2A] rounded cursor-pointer"
          />
        </div>
      </div>

      {/* Box Background Toggle & Settings */}
      <div className="pt-2 border-t border-[#262626] space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-neutral-300 font-medium">Box Background</label>
          <button
            onClick={() => updateProp('boxEnabled', !style.boxEnabled)}
            className={`w-8 h-4 rounded-full transition-colors relative ${
              style.boxEnabled ? 'bg-[#7C3AED]' : 'bg-[#333]'
            }`}
          >
            <div
              className={`w-3 h-3 rounded-full bg-white transition-transform absolute top-[2px] ${
                style.boxEnabled ? 'left-[18px]' : 'left-[2px]'
              }`}
            />
          </button>
        </div>

        {style.boxEnabled && (
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <span className="text-neutral-400 block mb-1">Corner Radius</span>
              <input
                type="range"
                min="0"
                max="24"
                value={style.boxRadius}
                onChange={(e) => updateProp('boxRadius', Number(e.target.value))}
                className="w-full accent-[#7C3AED] h-1 bg-[#2A2A2A] rounded cursor-pointer"
              />
            </div>
            <div>
              <span className="text-neutral-400 block mb-1">Padding</span>
              <input
                type="range"
                min="6"
                max="32"
                value={style.boxPadding}
                onChange={(e) => updateProp('boxPadding', Number(e.target.value))}
                className="w-full accent-[#7C3AED] h-1 bg-[#2A2A2A] rounded cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>

      {/* Keyframe Transition Speeds & Animation Type */}
      <div className="pt-2 border-t border-[#262626] space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-neutral-400">Animation Motion</label>
          <select
            value={style.animationType}
            onChange={(e) =>
              updateProp('animationType', e.target.value as CaptionStyle['animationType'])
            }
            className="bg-[#242424] border border-[#333] rounded px-2 py-1 text-white text-[11px] focus:outline-none focus:border-[#7C3AED]"
          >
            <option value="pop-bounce">Hormozi Pop-Bounce</option>
            <option value="scale-punch">Scale Punch</option>
            <option value="karaoke-sweep">Karaoke Lyric Sweep</option>
            <option value="glow-pulse">Neon Glow Pulse</option>
            <option value="3d-flip">3D Perspective Roll</option>
            <option value="typewriter">Terminal Typewriter</option>
            <option value="fade-up">Cinematic Fade Up</option>
            <option value="wiggle">High Energy Wiggle</option>
          </select>
        </div>

        <div>
          <div className="flex justify-between text-neutral-400 mb-1 text-[11px]">
            <span>Keyframe Speed</span>
            <span className="font-mono text-purple-300">{style.animationSpeedMs} ms</span>
          </div>
          <input
            type="range"
            min="80"
            max="350"
            step="10"
            value={style.animationSpeedMs}
            onChange={(e) => updateProp('animationSpeedMs', Number(e.target.value))}
            className="w-full accent-[#7C3AED] h-1 bg-[#2A2A2A] rounded cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-neutral-400 mb-1 text-[11px]">
            <span>Vertical Placement (Y Position)</span>
            <span className="font-mono text-neutral-200">{style.positionYPercent}%</span>
          </div>
          <input
            type="range"
            min="40"
            max="92"
            value={style.positionYPercent}
            onChange={(e) => updateProp('positionYPercent', Number(e.target.value))}
            className="w-full accent-[#7C3AED] h-1 bg-[#2A2A2A] rounded cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-neutral-400">Group Words Per Clip</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                onClick={() => updateProp('wordsPerGraphicClip', num)}
                className={`w-6 h-6 rounded text-xs font-mono font-bold transition-colors ${
                  style.wordsPerGraphicClip === num
                    ? 'bg-[#7C3AED] text-white'
                    : 'bg-[#252525] text-neutral-400 hover:text-white'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
