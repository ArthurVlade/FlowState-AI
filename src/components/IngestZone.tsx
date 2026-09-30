import React, { useRef, useState } from 'react';
import { UploadCloud, Music, FileVideo, CheckCircle2, SlidersHorizontal, Sparkles } from 'lucide-react';
import { ActiveMedia } from '../types';
import { SAMPLE_MEDIA_OBS, SAMPLE_MEDIA_REEL } from '../data/sampleFootage';

interface IngestZoneProps {
  media: ActiveMedia;
  onMediaChange: (media: ActiveMedia) => void;
  onSelectSample: (sample: ActiveMedia) => void;
}

export const IngestZone: React.FC<IngestZoneProps> = ({
  media,
  onMediaChange,
  onSelectSample,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (['mkv', 'mp4', 'mov', 'wav', 'mp3'].includes(ext || '')) {
        onMediaChange({
          fileName: file.name,
          filePath: `/Users/Editor/Media/${file.name}`,
          fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          duration: 32.4,
          format: `${ext?.toUpperCase()} / Audio 48kHz`,
          audioChannels: ext === 'mkv' ? 4 : 2,
          fps: 29.97,
          resolution: ext === 'mkv' ? '3840 x 2160 (4K)' : '1080 x 1920 (9:16)',
          selectedAudioTrack: 1,
        });
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const ext = file.name.split('.').pop()?.toLowerCase();
      onMediaChange({
        fileName: file.name,
        filePath: `C:/PremiereProject/Media/${file.name}`,
        fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        duration: 28.5,
        format: `${ext?.toUpperCase()} / High-Res PCM`,
        audioChannels: ext === 'mkv' ? 4 : 2,
        fps: 30.0,
        resolution: '1920 x 1080 (16:9)',
        selectedAudioTrack: 1,
      });
    }
  };

  return (
    <div className="bg-[#161616] border-b border-[#262626] p-3.5 select-none">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
        {/* Dashed Drag & Drop Container */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`flex-1 flex items-center justify-between px-4 py-3 rounded-lg border-2 border-dashed cursor-pointer transition-all ${
            isDragging
              ? 'border-[#7C3AED] bg-[#221A30]'
              : 'border-[#2E2E2E] hover:border-[#4B3B6B] bg-[#1A1A1A] hover:bg-[#1E1E1E]'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInput}
            accept=".mkv,.mp4,.mov,.wav,.mp3"
            className="hidden"
          />

          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-md bg-[#252525] border border-[#333] flex items-center justify-center shrink-0">
              <UploadCloud className="w-5 h-5 text-[#A78BFA]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-white truncate">
                  {media.fileName}
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#2A2A2A] text-neutral-300">
                  {media.resolution}
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 truncate mt-0.5 font-mono">
                {media.fileSize} · {media.duration}s · {media.format}
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-right shrink-0 ml-3">
            <span className="text-[11px] text-neutral-400">
              Drop <span className="font-mono text-neutral-300">.mkv / .mp4 / .mov</span>
            </span>
          </div>
        </div>

        {/* Multi-Track OBS Recording Audio Track Selector */}
        <div className="flex items-center gap-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-3 py-2 shrink-0">
          <div className="flex items-center gap-1.5 text-neutral-300">
            <Music className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-xs font-medium">Mic Track:</span>
          </div>
          <select
            value={media.selectedAudioTrack}
            onChange={(e) =>
              onMediaChange({ ...media, selectedAudioTrack: Number(e.target.value) })
            }
            className="bg-[#242424] border border-[#383838] text-neutral-200 text-xs rounded px-2 py-1 focus:outline-none focus:border-[#7C3AED] font-mono cursor-pointer"
          >
            <option value={1}>Track 1 (Host Microphone)</option>
            <option value={2}>Track 2 (Guest / Discord)</option>
            <option value={3}>Track 3 (Game / System Audio)</option>
            <option value={4}>Track 4 (Mixdown Master)</option>
          </select>
        </div>

        {/* Quick Sample Media Selectors */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => onSelectSample(SAMPLE_MEDIA_OBS)}
            className={`flex items-center gap-1 px-2.5 py-2 rounded-lg text-xs font-medium border transition-colors ${
              media.fileName === SAMPLE_MEDIA_OBS.fileName
                ? 'bg-[#2A233A] border-[#7C3AED] text-purple-300'
                : 'bg-[#1E1E1E] border-[#2A2A2A] text-neutral-300 hover:bg-[#252525]'
            }`}
            title="Load sample 4K multi-track OBS podcast recording"
          >
            <FileVideo className="w-3.5 h-3.5 text-amber-400" />
            <span>OBS 4K .mkv</span>
          </button>

          <button
            onClick={() => onSelectSample(SAMPLE_MEDIA_REEL)}
            className={`flex items-center gap-1 px-2.5 py-2 rounded-lg text-xs font-medium border transition-colors ${
              media.fileName === SAMPLE_MEDIA_REEL.fileName
                ? 'bg-[#2A233A] border-[#7C3AED] text-purple-300'
                : 'bg-[#1E1E1E] border-[#2A2A2A] text-neutral-300 hover:bg-[#252525]'
            }`}
            title="Load sample 9:16 vertical talking head reel"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Viral Reel .mp4</span>
          </button>
        </div>
      </div>
    </div>
  );
};
