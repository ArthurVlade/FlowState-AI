import { ActiveMedia, SilenceSegment, TranscriptWord } from '../types';

export const SAMPLE_MEDIA_OBS: ActiveMedia = {
  fileName: 'OBS_Podcast_Ep42_4K_MultiTrack.mkv',
  filePath: 'D:/Recordings/OBS_Studio/OBS_Podcast_Ep42_4K_MultiTrack.mkv',
  fileSize: '1.42 GB',
  duration: 38.6,
  format: 'Matroska (.mkv) / H.264 / AAC 48kHz',
  audioChannels: 4, // Multi-track OBS recording!
  fps: 29.97,
  resolution: '3840 x 2160 (4K UHD)',
  selectedAudioTrack: 1, // Track 1: Isolated Host Mic
};

export const SAMPLE_MEDIA_REEL: ActiveMedia = {
  fileName: 'Viral_TalkingHead_Reel_Raw.mp4',
  filePath: 'C:/Users/Editor/Videos/Viral_TalkingHead_Reel_Raw.mp4',
  fileSize: '348 MB',
  duration: 24.2,
  format: 'MPEG-4 (.mp4) / ProRes / PCM 48kHz',
  audioChannels: 2,
  fps: 60.0,
  resolution: '1080 x 1920 (9:16 Vertical)',
  selectedAudioTrack: 1,
};

export const INITIAL_TRANSCRIPT: TranscriptWord[] = [
  { id: 'w1', text: 'Welcome', start: 0.20, end: 0.65, confidence: 0.98, speaker: 'Speaker 01', isCut: false, isEdited: false, hasEmoji: '👋' },
  { id: 'w2', text: 'back', start: 0.68, end: 0.95, confidence: 0.99, speaker: 'Speaker 01', isCut: false, isEdited: false },
  { id: 'w3', text: 'everyone.', start: 0.98, end: 1.45, confidence: 0.97, speaker: 'Speaker 01', isCut: false, isEdited: false },
  
  // Pause 1.45 - 2.15 (0.70s silence)
  
  { id: 'w4', text: 'Today', start: 2.15, end: 2.50, confidence: 0.96, speaker: 'Speaker 01', isCut: false, isEdited: false },
  { id: 'w5', text: 'we', start: 2.52, end: 2.70, confidence: 0.99, speaker: 'Speaker 01', isCut: false, isEdited: false },
  { id: 'w6', text: 'are', start: 2.72, end: 2.88, confidence: 0.99, speaker: 'Speaker 01', isCut: false, isEdited: false },
  { id: 'w7', text: 'revealing', start: 2.90, end: 3.42, confidence: 0.95, speaker: 'Speaker 01', isCut: false, isEdited: false, hasEmoji: '✨' },
  { id: 'w8', text: 'FlowState', start: 3.45, end: 3.98, confidence: 0.98, speaker: 'Speaker 01', isCut: false, isEdited: false, hasEmoji: '⚡' },
  { id: 'w9', text: 'AI,', start: 4.00, end: 4.35, confidence: 0.97, speaker: 'Speaker 01', isCut: false, isEdited: false },
  
  // Pause 4.35 - 5.20 (0.85s silence)
  
  { id: 'w10', text: 'the', start: 5.20, end: 5.35, confidence: 0.99, speaker: 'Speaker 01', isCut: false, isEdited: false },
  { id: 'w11', text: 'fastest', start: 5.38, end: 5.85, confidence: 0.98, speaker: 'Speaker 01', isCut: false, isEdited: false, hasEmoji: '🚀' },
  { id: 'w12', text: 'local', start: 5.88, end: 6.22, confidence: 0.96, speaker: 'Speaker 01', isCut: false, isEdited: false },
  { id: 'w13', text: 'video', start: 6.25, end: 6.60, confidence: 0.99, speaker: 'Speaker 01', isCut: false, isEdited: false },
  { id: 'w14', text: 'editor', start: 6.62, end: 7.05, confidence: 0.97, speaker: 'Speaker 01', isCut: false, isEdited: false },
  { id: 'w15', text: 'ever', start: 7.08, end: 7.35, confidence: 0.98, speaker: 'Speaker 01', isCut: false, isEdited: false },
  { id: 'w16', text: 'built', start: 7.38, end: 7.72, confidence: 0.99, speaker: 'Speaker 01', isCut: false, isEdited: false },
  { id: 'w17', text: 'for', start: 7.75, end: 7.92, confidence: 0.99, speaker: 'Speaker 01', isCut: false, isEdited: false },
  { id: 'w18', text: 'Premiere.', start: 7.95, end: 8.55, confidence: 0.98, speaker: 'Speaker 01', isCut: false, isEdited: false, hasEmoji: '🎬' },
  
  // Silence 8.55 - 9.40 (0.85s)
  // Speaker 02 Diarization turn!
  { id: 'w19', text: 'And', start: 9.40, end: 9.60, confidence: 0.95, speaker: 'Speaker 02', isCut: false, isEdited: false },
  { id: 'w20', text: 'remember,', start: 9.62, end: 10.15, confidence: 0.94, speaker: 'Speaker 02', isCut: false, isEdited: false },
  { id: 'w21', text: 'um', start: 10.18, end: 10.45, confidence: 0.88, speaker: 'Speaker 02', isCut: true, isEdited: false }, // Filler word cut!
  { id: 'w22', text: 'like', start: 10.48, end: 10.75, confidence: 0.89, speaker: 'Speaker 02', isCut: true, isEdited: false }, // Filler word cut!
  { id: 'w23', text: 'it', start: 10.78, end: 10.92, confidence: 0.98, speaker: 'Speaker 02', isCut: false, isEdited: false },
  { id: 'w24', text: 'runs', start: 10.95, end: 11.28, confidence: 0.99, speaker: 'Speaker 02', isCut: false, isEdited: false },
  { id: 'w25', text: 'one', start: 11.30, end: 11.55, confidence: 0.99, speaker: 'Speaker 02', isCut: false, isEdited: false },
  { id: 'w26', text: 'hundred', start: 11.58, end: 11.95, confidence: 0.98, speaker: 'Speaker 02', isCut: false, isEdited: false, hasEmoji: '💯' },
  { id: 'w27', text: 'percent', start: 11.98, end: 12.38, confidence: 0.98, speaker: 'Speaker 02', isCut: false, isEdited: false },
  { id: 'w28', text: 'on', start: 12.40, end: 12.58, confidence: 0.99, speaker: 'Speaker 02', isCut: false, isEdited: false },
  { id: 'w29', text: 'your', start: 12.60, end: 12.82, confidence: 0.99, speaker: 'Speaker 02', isCut: false, isEdited: false },
  { id: 'w30', text: 'local', start: 12.85, end: 13.22, confidence: 0.97, speaker: 'Speaker 02', isCut: false, isEdited: false, hasEmoji: '💻' },
  { id: 'w31', text: 'GPU.', start: 13.25, end: 13.80, confidence: 0.98, speaker: 'Speaker 02', isCut: false, isEdited: false, hasEmoji: '🔥' },
  
  // Silence 13.80 - 14.60
  
  { id: 'w32', text: 'Zero', start: 14.60, end: 15.00, confidence: 0.99, speaker: 'Speaker 01', isCut: false, isEdited: false, hasEmoji: '🛡️' },
  { id: 'w33', text: 'cloud', start: 15.02, end: 15.35, confidence: 0.99, speaker: 'Speaker 01', isCut: false, isEdited: false },
  { id: 'w34', text: 'subscriptions,', start: 15.38, end: 16.10, confidence: 0.96, speaker: 'Speaker 01', isCut: false, isEdited: false },
  { id: 'w35', text: 'complete', start: 16.15, end: 16.65, confidence: 0.98, speaker: 'Speaker 01', isCut: false, isEdited: false },
  { id: 'w36', text: 'data', start: 16.68, end: 17.00, confidence: 0.99, speaker: 'Speaker 01', isCut: false, isEdited: false },
  { id: 'w37', text: 'privacy.', start: 17.02, end: 17.65, confidence: 0.98, speaker: 'Speaker 01', isCut: false, isEdited: false, hasEmoji: '🔒' },
];

export const INITIAL_SILENCES: SilenceSegment[] = [
  { id: 's1', start: 1.45, end: 2.15, duration: 0.70, isCut: true },
  { id: 's2', start: 4.35, end: 5.20, duration: 0.85, isCut: true },
  { id: 's3', start: 8.55, end: 9.40, duration: 0.85, isCut: true },
  { id: 's4', start: 13.80, end: 14.60, duration: 0.80, isCut: true },
];
