import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Smartphone, Monitor, Square, Volume2 } from 'lucide-react';
import { CaptionStyle, TranscriptWord } from '../types';

interface CaptionPreviewerProps {
  style: CaptionStyle;
  words: TranscriptWord[];
  currentTime: number;
  onTimeUpdate: (time: number) => void;
  aspectRatio: '9:16' | '16:9' | '1:1';
  onAspectRatioChange: (ratio: '9:16' | '16:9' | '1:1') => void;
}

export const CaptionPreviewer: React.FC<CaptionPreviewerProps> = ({
  style,
  words,
  currentTime,
  onTimeUpdate,
  aspectRatio,
  onAspectRatioChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());

  // Total duration of sample sequence
  const maxDuration = 18.0;

  // Animation playback loop
  useEffect(() => {
    let activeTime = currentTime;

    const loop = (now: number) => {
      const delta = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      if (isPlaying) {
        activeTime += delta;
        if (activeTime > maxDuration) {
          activeTime = 0.2;
        }
        onTimeUpdate(activeTime);
      }

      renderCanvas(activeTime);
      animationFrameRef.current = requestAnimationFrame(loop);
    };

    lastTimeRef.current = performance.now();
    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, style, words, aspectRatio]);

  const renderCanvas = (time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Draw background gradient simulating camera feed
    const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
    bgGradient.addColorStop(0, '#1E1B2E');
    bgGradient.addColorStop(0.5, '#161324');
    bgGradient.addColorStop(1, '#0C0A14');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Subtle framing lines for cinematic feel
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    ctx.strokeRect(20, 20, width - 40, height - 40);

    // Simulated speaker silhouette
    ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.beginPath();
    ctx.arc(width / 2, height * 0.42, width * 0.22, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(width / 2, height * 0.95, width * 0.48, 0, Math.PI * 2);
    ctx.fill();

    // Find words active at current timestamp
    // Group into chunks of style.wordsPerGraphicClip
    const visibleWords = words.filter((w) => !w.isCut);
    let activeChunk: TranscriptWord[] = [];

    // Find word index
    const activeIndex = visibleWords.findIndex(
      (w) => time >= w.start && time <= w.end
    );

    if (activeIndex !== -1) {
      const chunkStart =
        Math.floor(activeIndex / style.wordsPerGraphicClip) *
        style.wordsPerGraphicClip;
      activeChunk = visibleWords.slice(
        chunkStart,
        chunkStart + style.wordsPerGraphicClip
      );
    } else {
      // Find closest upcoming or recent chunk
      const nextWord = visibleWords.find((w) => w.start > time);
      if (nextWord) {
        const nextIdx = visibleWords.indexOf(nextWord);
        const chunkStart =
          Math.floor(nextIdx / style.wordsPerGraphicClip) *
          style.wordsPerGraphicClip;
        activeChunk = visibleWords.slice(
          chunkStart,
          chunkStart + style.wordsPerGraphicClip
        );
      } else if (visibleWords.length > 0) {
        activeChunk = visibleWords.slice(-style.wordsPerGraphicClip);
      }
    }

    if (activeChunk.length === 0) return;

    // Calculate Y position
    const posY = (height * style.positionYPercent) / 100;

    // Text formatting
    const formattedWords = activeChunk.map((w) => {
      let t = w.text;
      if (style.textCase === 'uppercase') t = t.toUpperCase();
      else if (style.textCase === 'capitalize') {
        t = t.charAt(0).toUpperCase() + t.slice(1);
      }
      return {
        ...w,
        display: style.showEmoji && w.hasEmoji ? `${w.hasEmoji} ${t}` : t,
      };
    });

    const fullLine = formattedWords.map((w) => w.display).join(' ');

    // Calculate dynamic animation progress
    const currentWordInChunk = activeChunk.find(
      (w) => time >= w.start && time <= w.end
    );
    let scaleFactor = 1.0;
    let rotateDeg = 0;
    let glowBlurAdd = 0;
    let visibleLetterCount = 999;

    if (currentWordInChunk) {
      const wordProgress = Math.max(
        0,
        Math.min(
          1,
          (time - currentWordInChunk.start) /
            Math.max(0.1, currentWordInChunk.end - currentWordInChunk.start)
        )
      );

      if (style.animationType === 'pop-bounce') {
        if (wordProgress < 0.28) {
          scaleFactor = 1.0 + Math.sin(wordProgress * Math.PI * 3.5) * 0.22;
        }
      } else if (style.animationType === 'scale-punch') {
        if (wordProgress < 0.3) {
          scaleFactor = 1.3 - wordProgress * 1.0;
        }
      } else if (style.animationType === 'wiggle') {
        scaleFactor = 1.0 + Math.sin(wordProgress * Math.PI * 6) * 0.08;
        rotateDeg = Math.sin(wordProgress * Math.PI * 10) * 0.06;
      } else if (style.animationType === 'glow-pulse') {
        glowBlurAdd = Math.sin(wordProgress * Math.PI) * 16;
        scaleFactor = 1.0 + Math.sin(wordProgress * Math.PI) * 0.08;
      } else if (style.animationType === '3d-flip') {
        if (wordProgress < 0.35) {
          scaleFactor = Math.abs(Math.cos(wordProgress * Math.PI * 2.8)) * 0.4 + 0.6;
        }
      } else if (style.animationType === 'typewriter') {
        visibleLetterCount = Math.floor(wordProgress * (currentWordInChunk.text.length + 1));
      }
    }

    ctx.save();
    ctx.translate(width / 2, posY);
    ctx.scale(scaleFactor, scaleFactor);
    if (rotateDeg !== 0) ctx.rotate(rotateDeg);

    // Font setup
    ctx.font = `${style.fontWeight} ${style.fontSize * (width / 500)}px ${
      style.fontFamily
    }, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Measure bounding box
    const metrics = ctx.measureText(fullLine);
    const boxW = metrics.width + style.boxPadding * 2;
    const boxH = style.fontSize * 1.4 + style.boxPadding;

    // Optional Box Background
    if (style.boxEnabled) {
      ctx.fillStyle = hexToRgba(style.boxColor, style.boxOpacity);
      roundRect(
        ctx,
        -boxW / 2,
        -boxH / 2,
        boxW,
        boxH,
        style.boxRadius
      );
      ctx.fill();
    }

    // Shadow setup
    if (style.shadowBlur > 0 || style.shadowOffset > 0 || glowBlurAdd > 0) {
      ctx.shadowColor = hexToRgba(style.shadowColor, style.shadowOpacity);
      ctx.shadowBlur = style.shadowBlur + glowBlurAdd;
      ctx.shadowOffsetX = style.shadowOffset;
      ctx.shadowOffsetY = style.shadowOffset;
    }

    // Render word by word for karaoke color highlight
    let currentX = -metrics.width / 2;
    ctx.textAlign = 'left';

    formattedWords.forEach((word) => {
      const isWordActive = time >= word.start && time <= word.end;
      let textToRender = word.display;

      if (style.animationType === 'typewriter' && isWordActive && visibleLetterCount < word.display.length) {
        textToRender = word.display.substring(0, Math.max(1, visibleLetterCount));
      }

      const wordWidth = ctx.measureText(word.display + ' ').width;

      // Stroke
      if (style.strokeWidth > 0) {
        ctx.strokeStyle = style.strokeColor;
        ctx.lineWidth = style.strokeWidth * (width / 500);
        ctx.lineJoin = 'round';
        ctx.strokeText(textToRender, currentX, 0);
      }

      // Fill color
      ctx.fillStyle = isWordActive ? style.highlightColor : style.textColor;
      ctx.fillText(textToRender, currentX, 0);

      currentX += wordWidth;
    });

    ctx.restore();
  };

  const hexToRgba = (hex: string, alpha: number) => {
    let c = hex.replace('#', '');
    if (c.length === 3) {
      c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
    }
    const num = parseInt(c, 16);
    return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${
      num & 255
    }, ${alpha})`;
  };

  const roundRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
  ) => {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  };

  return (
    <div className="bg-[#181818] border border-[#2B2B2B] rounded-lg p-3 flex flex-col items-center">
      {/* Aspect Ratio & Video Toolbar */}
      <div className="w-full flex items-center justify-between mb-2 pb-2 border-b border-[#262626]">
        <div className="flex items-center gap-1 bg-[#1F1F1F] p-0.5 rounded border border-[#2E2E2E]">
          <button
            onClick={() => onAspectRatioChange('9:16')}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
              aspectRatio === '9:16'
                ? 'bg-[#7C3AED] text-white font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
            title="9:16 Vertical (Shorts, Reels, TikTok)"
          >
            <Smartphone className="w-3 h-3" />
            <span>9:16</span>
          </button>
          <button
            onClick={() => onAspectRatioChange('16:9')}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
              aspectRatio === '16:9'
                ? 'bg-[#7C3AED] text-white font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
            title="16:9 Landscape (YouTube, Broadcast)"
          >
            <Monitor className="w-3 h-3" />
            <span>16:9</span>
          </button>
          <button
            onClick={() => onAspectRatioChange('1:1')}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
              aspectRatio === '1:1'
                ? 'bg-[#7C3AED] text-white font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
            title="1:1 Square (Instagram Feed)"
          >
            <Square className="w-3 h-3" />
            <span>1:1</span>
          </button>
        </div>

        <div className="text-[11px] font-mono text-neutral-400 flex items-center gap-2">
          <span>Active: <strong className="text-white">{currentTime.toFixed(2)}s</strong></span>
        </div>
      </div>

      {/* HTML5 Canvas Viewport */}
      <div className="relative flex items-center justify-center bg-[#0D0D0D] rounded-md overflow-hidden border border-[#2E2E2E] shadow-inner max-h-[340px] w-full">
        <canvas
          ref={canvasRef}
          width={aspectRatio === '9:16' ? 270 : aspectRatio === '16:9' ? 480 : 320}
          height={aspectRatio === '9:16' ? 480 : aspectRatio === '16:9' ? 270 : 320}
          className="max-h-[300px] object-contain transition-all"
        />

        {/* Style Tag Watermark */}
        <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm border border-white/10 rounded px-1.5 py-0.5 text-[10px] font-mono text-purple-300">
          {style.name} · {style.animationType}
        </div>
      </div>

      {/* Playback Controls & Scrubber */}
      <div className="w-full mt-3 space-y-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-7 h-7 rounded bg-[#7C3AED] hover:bg-[#6D28D9] text-white flex items-center justify-center shrink-0 transition-colors"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white ml-0.5" />}
          </button>

          <button
            onClick={() => onTimeUpdate(0.2)}
            className="p-1 rounded bg-[#242424] hover:bg-[#2C2C2C] text-neutral-300 shrink-0"
            title="Reset scrubber to start"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <input
            type="range"
            min="0"
            max={maxDuration}
            step="0.05"
            value={currentTime}
            onChange={(e) => onTimeUpdate(Number(e.target.value))}
            className="flex-1 accent-[#7C3AED] h-1.5 bg-[#2E2E2E] rounded cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
