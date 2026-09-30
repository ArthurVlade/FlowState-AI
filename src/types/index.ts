export type ActiveToolView = 
  | 'hub' 
  | 'silence' 
  | 'captions' 
  | 'podcast' 
  | 'zoom' 
  | 'resize' 
  | 'censor' 
  | 'broll' 
  | 'chapters' 
  | 'translate'
  | 'batch';

export type CaptionCategory = 
  | 'All'
  | 'Viral Creators'
  | 'Gamer & Streaming'
  | 'Cinematic & Doc'
  | 'Minimal & Clean'
  | 'Neon & Cyber'
  | 'Retro & VHS'
  | 'Comic & Pop'
  | 'Luxury & Finance'
  | 'Karaoke Styles'
  | 'Custom';

export interface CaptionStyle {
  id: string;
  name: string;
  category: CaptionCategory;
  fontFamily: string;
  fontSize: number; // pt in Premiere
  fontWeight: string;
  textCase: 'uppercase' | 'capitalize' | 'normal';
  textColor: string;
  highlightColor: string; // Active spoken word color
  secondaryColor?: string; // Optional secondary pop color
  inactiveWordOpacity?: number; // 0.3 - 1.0
  strokeWidth: number;
  strokeColor: string;
  shadowBlur: number;
  shadowOffset: number;
  shadowColor: string;
  shadowOpacity: number;
  boxEnabled: boolean;
  boxColor: string;
  boxOpacity: number;
  boxPadding: number;
  boxRadius: number;
  animationType: 'pop-bounce' | 'karaoke-sweep' | 'scale-punch' | 'fade-up' | 'wiggle' | 'typewriter' | '3d-flip' | 'glow-pulse';
  animationSpeedMs: number; // e.g. 180ms
  positionYPercent: number; // 75% down screen
  wordsPerGraphicClip: number; // 1 to 5 words grouped
  showEmoji: boolean;
  tags?: string[];
  isCustom?: boolean;
}

export interface TranscriptWord {
  id: string;
  text: string;
  start: number; // in seconds
  end: number;
  confidence: number;
  speaker: string;
  isCut: boolean; // if user deleted it
  isEdited: boolean;
  originalText?: string;
  hasEmoji?: string;
}

export interface SilenceSegment {
  id: string;
  start: number;
  end: number;
  duration: number;
  isCut: boolean;
}

export interface FeatureSettings {
  autoCaptions: boolean;
  autoCutSilences: boolean;
  autoPodcast: boolean;
  autoZoom: boolean;
  autoBRolls: boolean;
  autoProfanityFilter: boolean;
  autoChapters: boolean;
  autoResize: boolean;
  autoTranslate: boolean;
  
  // Specific params
  silenceThresholdDb: number; // e.g. -35
  minSilenceDurationMs: number; // e.g. 350
  silencePaddingMs: number; // e.g. 80
  rippleDelete: boolean;
  backupSequenceFirst: boolean;
  scopeRange: 'entire' | 'workarea';
  
  zoomFactor: number; // e.g. 1.15
  zoomPacing: 'sentences' | 'shifts' | 'rapid';
  
  podcastCamCount: 2 | 3;
  minShotDurationSec: number; // e.g. 2.5
  
  aspectRatio: '9:16' | '16:9' | '1:1';
  targetLanguage: string; // 'en'
  censorBleepType: 'beep' | 'mute';
  maxWordsPerLine: number;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'INFO' | 'SUCCESS' | 'WARN' | 'ERROR' | 'DEBUG' | 'PREMIERE';
  message: string;
  process?: string;
  details?: string;
}

export interface ActiveMedia {
  fileName: string;
  filePath: string;
  fileSize: string;
  duration: number; // seconds
  format: string;
  audioChannels: number;
  fps: number;
  resolution: string;
  selectedAudioTrack: number;
  inPoint?: number;
  outPoint?: number;
}
