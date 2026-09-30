import React from 'react';
import { 
  Scissors, 
  Subtitles, 
  Users, 
  ZoomIn, 
  Smartphone, 
  ShieldAlert, 
  Film, 
  Bookmark, 
  Languages, 
  Zap, 
  ChevronRight,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { ActiveToolView } from '../types';

interface ToolGridProps {
  onSelectTool: (tool: ActiveToolView) => void;
  activeSequence: string;
}

export const ToolGrid: React.FC<ToolGridProps> = ({ onSelectTool, activeSequence }) => {
  const tools: {
    id: ActiveToolView;
    title: string;
    badge?: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    bgGlow: string;
    stats: string;
  }[] = [
    {
      id: 'silence',
      title: 'AutoCut Silences',
      badge: 'Popular',
      description: 'Automatically detect & ripple-delete dead air and silent pauses using Silero VAD.',
      icon: <Scissors className="w-5 h-5 text-emerald-400" />,
      color: 'border-emerald-500/30 hover:border-emerald-500/60 group-hover:text-emerald-400',
      bgGlow: 'hover:shadow-emerald-950/30',
      stats: 'Save up to 40% timeline editing time',
    },
    {
      id: 'captions',
      title: 'AutoCaptions & Emojis',
      badge: 'Essential Graphics',
      description: 'Word-by-word animated captions, karaoke colors, and contextual emojis.',
      icon: <Subtitles className="w-5 h-5 text-[#A78BFA]" />,
      color: 'border-purple-500/30 hover:border-purple-500/60 group-hover:text-[#A78BFA]',
      bgGlow: 'hover:shadow-purple-950/30',
      stats: 'Hormozi, MrBeast, Minimalist presets',
    },
    {
      id: 'podcast',
      title: 'AutoPodcast (Multicam)',
      description: 'Switch between Camera 1, 2, and Wide shot automatically based on speaker microphone.',
      icon: <Users className="w-5 h-5 text-blue-400" />,
      color: 'border-blue-500/30 hover:border-blue-500/60 group-hover:text-blue-400',
      bgGlow: 'hover:shadow-blue-950/30',
      stats: 'Pyannote.audio speaker diarization',
    },
    {
      id: 'zoom',
      title: 'AutoZoom',
      description: 'Apply subtle 1.15x punch-in zooms on key sentences and topic shifts.',
      icon: <ZoomIn className="w-5 h-5 text-amber-400" />,
      color: 'border-amber-500/30 hover:border-amber-500/60 group-hover:text-amber-400',
      bgGlow: 'hover:shadow-amber-950/30',
      stats: 'Keeps viewers engaged on talking heads',
    },
    {
      id: 'resize',
      title: 'AutoResize (9:16 Shorts)',
      description: 'Reframe widescreen 16:9 videos into 9:16 vertical with face tracking.',
      icon: <Smartphone className="w-5 h-5 text-cyan-400" />,
      color: 'border-cyan-500/30 hover:border-cyan-500/60 group-hover:text-cyan-400',
      bgGlow: 'hover:shadow-cyan-950/30',
      stats: 'YOLOv8 face centering keyframes',
    },
    {
      id: 'censor',
      title: 'AutoCensor',
      description: 'Detect profanity against local dictionary and apply 1kHz bleep tone or clean mute.',
      icon: <ShieldAlert className="w-5 h-5 text-rose-400" />,
      color: 'border-rose-500/30 hover:border-rose-500/60 group-hover:text-rose-400',
      bgGlow: 'hover:shadow-rose-950/30',
      stats: 'Monetization-safe audio censor',
    },
    {
      id: 'broll',
      title: 'AutoB-Roll',
      description: 'Extract spoken keywords via local LLM and insert relevant cutaway footage on Track V2.',
      icon: <Film className="w-5 h-5 text-indigo-400" />,
      color: 'border-indigo-500/30 hover:border-indigo-500/60 group-hover:text-indigo-400',
      bgGlow: 'hover:shadow-indigo-950/30',
      stats: 'Contextual keyword overlay placement',
    },
    {
      id: 'chapters',
      title: 'AutoChapters',
      description: 'Generate timeline chapter markers and YouTube timestamps automatically.',
      icon: <Bookmark className="w-5 h-5 text-teal-400" />,
      color: 'border-teal-500/30 hover:border-teal-500/60 group-hover:text-teal-400',
      bgGlow: 'hover:shadow-teal-950/30',
      stats: 'Native Premiere Pro Chapter markers',
    },
    {
      id: 'translate',
      title: 'AutoTranslate',
      description: 'Translate foreign audio into synchronized English captions in real time.',
      icon: <Languages className="w-5 h-5 text-orange-400" />,
      color: 'border-orange-500/30 hover:border-orange-500/60 group-hover:text-orange-400',
      bgGlow: 'hover:shadow-orange-950/30',
      stats: '80+ languages supported locally',
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-8 bg-[#0F0F14] select-none scrollbar-thin scrollbar-thumb-[#22222E]">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Welcome & Target Sequence Hero */}
        <div className="bg-gradient-to-r from-[#181824] via-[#14141E] to-[#121218] border border-[#242436] rounded-xl p-5 shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-semibold">
                  AutoCut Suite for Adobe Premiere Pro
                </span>
                <span className="text-[10px] bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 px-2 py-0.5 rounded font-mono">
                  Hardware Acceleration Active
                </span>
              </div>
              <h1 className="text-xl font-bold text-white tracking-tight">
                What would you like to edit first?
              </h1>
              <p className="text-xs text-neutral-400 mt-1">
                Select an automated editing module to open its dedicated timeline workspace.
              </p>
            </div>

            {/* Quick Batch Runner */}
            <button
              onClick={() => onSelectTool('batch')}
              className="group flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-semibold shadow-lg shadow-purple-950/50 hover:shadow-purple-900/60 transition-all shrink-0"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Full Pipeline (Cut + Captions + Zoom)</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Modular Tool Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {tools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => onSelectTool(tool.id)}
              className={`group relative bg-[#15151F] hover:bg-[#1A1A28] border ${tool.color} rounded-xl p-4 cursor-pointer transition-all duration-200 shadow-md ${tool.bgGlow} hover:-translate-y-0.5 flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1F1F2E] border border-[#2B2B3E] flex items-center justify-center">
                    {tool.icon}
                  </div>
                  {tool.badge && (
                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-purple-950/50 text-purple-300 border border-purple-800/50">
                      {tool.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-white tracking-tight flex items-center justify-between">
                  <span>{tool.title}</span>
                  <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                </h3>

                <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              <div className="mt-4 pt-2.5 border-t border-[#202030] flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span className="truncate">{tool.stats}</span>
                <span className="text-purple-400 font-semibold group-hover:underline">Open →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
