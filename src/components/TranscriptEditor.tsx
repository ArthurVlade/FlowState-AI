import React, { useState } from 'react';
import { 
  Scissors, 
  RotateCcw, 
  Search, 
  Sparkles, 
  Check, 
  Edit3, 
  Trash2, 
  Undo2, 
  Clock, 
  VolumeX, 
  Volume2,
  FileText
} from 'lucide-react';
import { SilenceSegment, TranscriptWord } from '../types';

interface TranscriptEditorProps {
  words: TranscriptWord[];
  silences: SilenceSegment[];
  onWordsChange: (words: TranscriptWord[]) => void;
  onSilencesChange: (silences: SilenceSegment[]) => void;
  currentTime: number;
  onSeek: (time: number) => void;
}

export const TranscriptEditor: React.FC<TranscriptEditorProps> = ({
  words,
  silences,
  onWordsChange,
  onSilencesChange,
  currentTime,
  onSeek,
}) => {
  const [editingWordId, setEditingWordId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Toggle word cut status (strikethrough)
  const toggleCutWord = (id: string) => {
    onWordsChange(
      words.map((w) => {
        if (w.id === id) {
          return { ...w, isCut: !w.isCut };
        }
        return w;
      })
    );
  };

  const startEditingWord = (word: TranscriptWord) => {
    setEditingWordId(word.id);
    setEditingText(word.text);
  };

  const saveEditingWord = (id: string) => {
    if (!editingText.trim()) return;
    onWordsChange(
      words.map((w) => {
        if (w.id === id) {
          return {
            ...w,
            text: editingText.trim(),
            isEdited: true,
            originalText: w.originalText || w.text,
          };
        }
        return w;
      })
    );
    setEditingWordId(null);
  };

  // Toggle silence segment cut
  const toggleSilence = (silenceId: string) => {
    onSilencesChange(
      silences.map((s) => {
        if (s.id === silenceId) {
          return { ...s, isCut: !s.isCut };
        }
        return s;
      })
    );
  };

  // Bulk actions
  const cutAllSilences = () => {
    onSilencesChange(silences.map((s) => ({ ...s, isCut: true })));
  };

  const restoreAllSilences = () => {
    onSilencesChange(silences.map((s) => ({ ...s, isCut: false })));
  };

  const removeFillerWords = () => {
    const fillers = ['um', 'uh', 'like', 'you know', 'ah'];
    onWordsChange(
      words.map((w) => {
        const clean = w.text.toLowerCase().replace(/[^a-z]/g, '');
        if (fillers.includes(clean)) {
          return { ...w, isCut: true };
        }
        return w;
      })
    );
  };

  const restoreAllCuts = () => {
    onWordsChange(words.map((w) => ({ ...w, isCut: false })));
    onSilencesChange(silences.map((s) => ({ ...s, isCut: false })));
  };

  const cutWordsCount = words.filter((w) => w.isCut).length;
  const cutSilencesCount = silences.filter((s) => s.isCut).length;
  const totalSilencesSeconds = silences
    .filter((s) => s.isCut)
    .reduce((acc, curr) => acc + curr.duration, 0);

  // Group words by speaker for readable conversation flow
  const speakerGroups: { speaker: string; words: TranscriptWord[] }[] = [];
  let currentGroup: { speaker: string; words: TranscriptWord[] } | null = null;

  words.forEach((word) => {
    if (!currentGroup || currentGroup.speaker !== word.speaker) {
      currentGroup = { speaker: word.speaker, words: [word] };
      speakerGroups.push(currentGroup);
    } else {
      currentGroup.words.push(word);
    }
  });

  return (
    <div className="flex-1 flex flex-col h-full bg-[#121212] overflow-hidden select-none">
      {/* Top Toolbar */}
      <div className="p-3 border-b border-[#242424] bg-[#161616] flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#A78BFA]" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-200">
            Interactive Transcript Editor
          </h2>
          <span className="text-[11px] font-mono text-neutral-400">
            ({words.length} words · {cutWordsCount} cut)
          </span>
        </div>

        {/* Quick Bulk Actions */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-2 top-2" />
            <input
              type="text"
              placeholder="Search words..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#202020] border border-[#303030] text-xs text-neutral-200 pl-7 pr-2 py-1 rounded w-32 focus:w-44 focus:outline-none focus:border-[#7C3AED] transition-all font-sans"
            />
          </div>

          <button
            onClick={cutAllSilences}
            className="flex items-center gap-1 px-2 py-1 rounded text-xs bg-[#1F1F1F] hover:bg-[#282828] border border-[#2E2E2E] text-neutral-300 transition-colors"
            title="Excise all detected silent pauses"
          >
            <Scissors className="w-3 h-3 text-emerald-400" />
            <span>Cut Silences ({cutSilencesCount})</span>
          </button>

          <button
            onClick={removeFillerWords}
            className="flex items-center gap-1 px-2 py-1 rounded text-xs bg-[#1F1F1F] hover:bg-[#282828] border border-[#2E2E2E] text-neutral-300 transition-colors"
            title="Auto-detect and strike out filler words like 'um', 'like'"
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Cut Fillers</span>
          </button>

          <button
            onClick={restoreAllCuts}
            className="flex items-center gap-1 px-2 py-1 rounded text-xs bg-[#1F1F1F] hover:bg-[#282828] border border-[#2E2E2E] text-neutral-400 hover:text-neutral-200 transition-colors"
            title="Restore all cut words and silences"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Restore</span>
          </button>
        </div>
      </div>

      {/* Stats summary bar */}
      <div className="px-4 py-2 bg-[#171717] border-b border-[#222] flex items-center justify-between text-[11px] text-neutral-400 font-mono">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-neutral-400" />
            Active Scrubber: <strong className="text-white">{currentTime.toFixed(2)}s</strong>
          </span>
          <span className="flex items-center gap-1">
            <VolumeX className="w-3 h-3 text-emerald-400" />
            Silences Cut: <strong className="text-emerald-400">-{totalSilencesSeconds.toFixed(2)}s</strong>
          </span>
        </div>
        <span className="text-neutral-400 hidden sm:inline">
          Tip: Click word to edit spelling · Click scissors icon to cut from timeline
        </span>
      </div>

      {/* Transcript Text Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#2B2B2B]">
        {speakerGroups.map((group, groupIdx) => (
          <div
            key={groupIdx}
            className="bg-[#181818] border border-[#262626] rounded-lg p-3 transition-colors hover:border-[#333333]"
          >
            {/* Speaker Header */}
            <div className="flex items-center justify-between mb-2.5 pb-1.5 border-b border-[#222222]">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded font-mono ${
                    group.speaker === 'Speaker 01'
                      ? 'bg-purple-950/60 text-purple-300 border border-purple-800/50'
                      : 'bg-blue-950/60 text-blue-300 border border-blue-800/50'
                  }`}
                >
                  {group.speaker}
                </span>
                <span className="text-[11px] font-mono text-neutral-400">
                  [{group.words[0]?.start.toFixed(2)}s - {group.words[group.words.length - 1]?.end.toFixed(2)}s]
                </span>
              </div>
            </div>

            {/* Word Chips Flow */}
            <div className="flex flex-wrap items-center gap-1.5 leading-relaxed">
              {group.words.map((word) => {
                const isPlayingNow =
                  currentTime >= word.start && currentTime <= word.end;
                const matchesSearch =
                  searchQuery.trim() !== '' &&
                  word.text.toLowerCase().includes(searchQuery.toLowerCase());

                // Check if silence follows this word
                const matchingSilence = silences.find(
                  (s) => Math.abs(s.start - word.end) < 0.2
                );

                return (
                  <React.Fragment key={word.id}>
                    {/* Word Tag Container */}
                    <div
                      className={`group relative inline-flex items-center rounded px-1.5 py-0.5 transition-all text-sm ${
                        word.isCut
                          ? 'bg-[#221818] border border-red-950/50 text-neutral-500 line-through'
                          : isPlayingNow
                          ? 'bg-[#7C3AED] text-white font-semibold ring-2 ring-purple-400/50'
                          : matchesSearch
                          ? 'bg-amber-950/60 border border-amber-500/50 text-amber-200'
                          : 'bg-[#222222] hover:bg-[#2C2C2C] border border-[#2E2E2E] text-neutral-200'
                      }`}
                    >
                      {/* Inline text editor */}
                      {editingWordId === word.id ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="text"
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') saveEditingWord(word.id);
                              if (e.key === 'Escape') setEditingWordId(null);
                            }}
                            autoFocus
                            className="bg-black text-white text-xs px-1 py-0.5 rounded border border-[#7C3AED] focus:outline-none w-20"
                          />
                          <button
                            onClick={() => saveEditingWord(word.id)}
                            className="text-emerald-400 hover:text-emerald-300"
                          >
                            <Check className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <span
                          onClick={() => onSeek(word.start)}
                          className="cursor-pointer select-text flex items-center gap-1"
                        >
                          {word.hasEmoji && (
                            <span className="no-underline">{word.hasEmoji}</span>
                          )}
                          <span>{word.text}</span>
                        </span>
                      )}

                      {/* Hover action menu */}
                      {editingWordId !== word.id && (
                        <div className="hidden group-hover:flex items-center gap-1 ml-1 pl-1 border-l border-neutral-700/60 text-neutral-400">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              startEditingWord(word);
                            }}
                            title="Edit spelling / grammar"
                            className="hover:text-white"
                          >
                            <Edit3 className="w-2.5 h-2.5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleCutWord(word.id);
                            }}
                            title={word.isCut ? 'Restore word' : 'Cut word from video'}
                            className={`${word.isCut ? 'text-emerald-400' : 'hover:text-red-400'}`}
                          >
                            <Scissors className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Silence pause chip inserted right after word */}
                    {matchingSilence && (
                      <button
                        onClick={() => toggleSilence(matchingSilence.id)}
                        title={`Silence interval: ${matchingSilence.duration}s. Click to ${matchingSilence.isCut ? 'keep' : 'cut'}.`}
                        className={`inline-flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.5 rounded transition-colors ${
                          matchingSilence.isCut
                            ? 'bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 line-through'
                            : 'bg-[#262626] border border-[#333333] text-neutral-400'
                        }`}
                      >
                        <VolumeX className="w-2.5 h-2.5" />
                        <span>⏸ {matchingSilence.duration.toFixed(2)}s</span>
                      </button>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
