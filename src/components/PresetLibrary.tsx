import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  Search, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Download, 
  Upload,
  BookmarkPlus
} from 'lucide-react';
import { CaptionCategory, CaptionStyle } from '../types';
import { PRESET_LIBRARY } from '../data/presetsData';

interface PresetLibraryProps {
  selectedStyle: CaptionStyle;
  onSelectStyle: (style: CaptionStyle) => void;
  onSaveCurrentAsPreset?: (name: string) => void;
}

export const PresetLibrary: React.FC<PresetLibraryProps> = ({
  selectedStyle,
  onSelectStyle,
  onSaveCurrentAsPreset,
}) => {
  const [activeCategory, setActiveCategory] = useState<CaptionCategory>('All');
  const [search, setSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isSavingCustom, setIsSavingCustom] = useState(false);
  const [customPresetName, setCustomPresetName] = useState('');
  const [userCustomPresets, setUserCustomPresets] = useState<CaptionStyle[]>(() => {
    try {
      const stored = localStorage.getItem('flowstate_custom_presets');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const categories: CaptionCategory[] = [
    'All',
    'Viral Creators',
    'Gamer & Streaming',
    'Cinematic & Doc',
    'Minimal & Clean',
    'Neon & Cyber',
    'Retro & VHS',
    'Comic & Pop',
    'Luxury & Finance',
    'Karaoke Styles',
    'Custom',
  ];

  const allPresets = [...userCustomPresets, ...PRESET_LIBRARY];

  const filteredPresets = allPresets.filter((preset) => {
    const matchesCat =
      activeCategory === 'All'
        ? true
        : activeCategory === 'Custom'
        ? preset.isCustom
        : preset.category === activeCategory;

    const matchesSearch =
      search === '' ||
      preset.name.toLowerCase().includes(search.toLowerCase()) ||
      preset.fontFamily.toLowerCase().includes(search.toLowerCase()) ||
      (preset.tags && preset.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())));

    return matchesCat && matchesSearch;
  });

  // Pagination
  const pageSize = 12;
  const totalPages = Math.max(1, Math.ceil(filteredPresets.length / pageSize));
  const paginatedPresets = filteredPresets.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleCategoryChange = (cat: CaptionCategory) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setCurrentPage(1);
  };

  const saveCustom = () => {
    if (!customPresetName.trim()) return;
    const newPreset: CaptionStyle = {
      ...selectedStyle,
      id: 'custom_' + Date.now(),
      name: customPresetName.trim(),
      category: 'Custom',
      isCustom: true,
      tags: ['custom', customPresetName.toLowerCase()],
    };
    const updated = [newPreset, ...userCustomPresets];
    setUserCustomPresets(updated);
    try {
      localStorage.setItem('flowstate_custom_presets', JSON.stringify(updated));
    } catch {}
    setIsSavingCustom(false);
    setCustomPresetName('');
    onSelectStyle(newPreset);
    setActiveCategory('Custom');
  };

  return (
    <div className="bg-[#14141E] border border-[#222232] rounded-xl p-4 flex flex-col select-none space-y-3">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-2.5 border-b border-[#20202E]">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#A78BFA]" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-white">
            Preset Style Hub (100+ Styles)
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSavingCustom(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#201C30] hover:bg-[#282240] border border-[#7C3AED]/50 text-[11px] text-purple-300 transition-colors"
            title="Save current slider settings as a new custom preset"
          >
            <BookmarkPlus className="w-3 h-3 text-[#A78BFA]" />
            <span>Save Custom</span>
          </button>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded">
            {filteredPresets.length} Presets Available
          </span>
        </div>
      </div>

      {/* Save Custom Modal Input */}
      {isSavingCustom && (
        <div className="p-3 bg-[#1C1A2A] border border-[#7C3AED]/60 rounded-lg flex items-center justify-between gap-2">
          <input
            type="text"
            placeholder="Enter custom preset name..."
            value={customPresetName}
            onChange={(e) => setCustomPresetName(e.target.value)}
            className="flex-1 bg-[#100E1C] border border-[#352D50] text-xs text-white px-2.5 py-1 rounded focus:outline-none focus:border-[#7C3AED]"
            autoFocus
          />
          <button
            onClick={saveCustom}
            className="px-3 py-1 rounded text-xs font-semibold bg-[#7C3AED] hover:bg-[#6D28D9] text-white"
          >
            Save
          </button>
          <button
            onClick={() => setIsSavingCustom(false)}
            className="px-2 py-1 rounded text-xs text-neutral-400 hover:text-white"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Category Pills Slider */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-3 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors ${
              activeCategory === cat
                ? 'bg-[#7C3AED] text-white shadow-sm font-semibold'
                : 'bg-[#1C1C2A] text-neutral-400 hover:text-neutral-200 hover:bg-[#252538]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-2.5" />
        <input
          type="text"
          placeholder="Search 100+ presets by creator (Hormozi, MrBeast, Abdaal, Gadzhi), style, or font..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full bg-[#181824] border border-[#2B2B3E] text-xs text-neutral-200 pl-8 pr-3 py-1.5 rounded-lg focus:outline-none focus:border-[#7C3AED]"
        />
      </div>

      {/* Preset Cards Grid (Paginated) */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 min-h-[300px]">
        {paginatedPresets.length === 0 ? (
          <div className="col-span-full py-12 text-center text-xs text-neutral-500">
            No presets found matching "{search}". Try searching for "Hormozi", "MrBeast", "Cyber", or "Neon".
          </div>
        ) : (
          paginatedPresets.map((preset) => {
            const isSelected = selectedStyle.id === preset.id;
            return (
              <div
                key={preset.id}
                onClick={() => onSelectStyle(preset)}
                className={`group relative p-2.5 rounded-xl border cursor-pointer transition-all duration-150 ${
                  isSelected
                    ? 'bg-[#251D38] border-[#7C3AED] ring-2 ring-[#7C3AED]/70 shadow-lg shadow-purple-950/50'
                    : 'bg-[#181824] border-[#252538] hover:border-[#3E3E58] hover:bg-[#1E1E2E]'
                }`}
              >
                {/* Active Selection Check badge */}
                {isSelected && (
                  <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#7C3AED] flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-white" />
                  </div>
                )}

                {/* Typography Mini Card Preview */}
                <div
                  className="h-12 rounded-lg bg-[#0F0F16] border border-[#222232] flex items-center justify-center overflow-hidden mb-2 px-2"
                  style={{
                    boxShadow: preset.boxEnabled
                      ? `0 0 0 2px ${preset.boxColor}`
                      : 'none',
                  }}
                >
                  <span
                    style={{
                      fontFamily: preset.fontFamily,
                      fontWeight: preset.fontWeight,
                      color: preset.highlightColor,
                      fontSize: '13px',
                      textTransform: preset.textCase,
                      textShadow:
                        preset.shadowBlur > 0
                          ? `${preset.shadowOffset}px ${preset.shadowOffset}px ${preset.shadowBlur}px ${preset.shadowColor}`
                          : 'none',
                    }}
                    className="truncate max-w-full font-bold"
                  >
                    {preset.name.split(' ')[0]}
                  </span>
                </div>

                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-white truncate group-hover:text-purple-300 transition-colors">
                    {preset.name}
                  </h4>
                  <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono mt-0.5">
                    <span className="truncate">{preset.fontFamily}</span>
                    <span className="text-purple-400 font-medium shrink-0 ml-1">
                      {preset.animationType}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination Controls */}
      <div className="pt-2 border-t border-[#20202E] flex items-center justify-between text-xs text-neutral-400">
        <span className="font-mono text-[11px]">
          Showing {(currentPage - 1) * pageSize + 1}-
          {Math.min(currentPage * pageSize, filteredPresets.length)} of {filteredPresets.length}
        </span>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded bg-[#181824] hover:bg-[#222232] border border-[#2B2B3E] text-neutral-300 disabled:opacity-40"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <span className="font-mono text-xs text-white px-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded bg-[#181824] hover:bg-[#222232] border border-[#2B2B3E] text-neutral-300 disabled:opacity-40"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
