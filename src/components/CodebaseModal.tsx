import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  FolderDown, 
  FileCode, 
  Terminal, 
  FolderTree, 
  BookOpen, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import {
  INSTALL_MAC_SH,
  INSTALL_WINDOWS_BAT,
  MAIN_JS_BRIDGE,
  MANIFEST_XML,
  PREMIERE_JSX,
  PYTHON_MAIN_PY,
  REQUIREMENTS_TXT,
} from '../backendCode/templates';
import { PRESET_LIBRARY } from '../data/presetsData';

interface CodebaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadZip: () => void;
}

export const CodebaseModal: React.FC<CodebaseModalProps> = ({
  isOpen,
  onClose,
  onDownloadZip,
}) => {
  const [activeTab, setActiveTab] = useState<string>('manifest');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const fileContents: Record<string, { title: string; filename: string; language: string; content: string; description: string }> = {
    tree: {
      title: 'Directory Tree',
      filename: 'Architecture & File Structure',
      language: 'markdown',
      description: 'Complete Directory Layout for Adobe Premiere Pro CEP 10.0 and Local Python 3.12 Backend',
      content: `FlowState_AI/
├── CSXS/
│   └── manifest.xml               # Adobe CEP Extension Configuration & Host Whitelist (PPRO 14.0 - 99.9)
├── jsx/
│   └── Premiere.jsx               # ExtendScript Engine: C++ DOM interaction, Graphic Clips, FCPXML cuts
├── extension/
│   ├── CSInterface.js            # Official Adobe Creative Cloud CEP JavaScript Bridge
│   └── main.js                   # Drag & drop handler (.mkv/.mp4), WebSocket client, JSX evaluator
├── backend/
│   ├── main.py                   # FastAPI 3.12 microservice (ffmpeg, whisper, Silero VAD, Ollama)
│   ├── presets.json              # 84+ Style presets definitions (Hormozi, MrBeast, Minimalist)
│   └── requirements.txt          # Python dependencies (100% Free & Open Source)
├── index.html                    # CEP HTML5 Entry Point
├── package.json                  # React 19 + Vite 6 + Tailwind CSS build spec
├── install_windows_registry.bat  # Windows 1-Click Installer (PlayerDebugMode=1 + AppData CEP Link)
├── install_mac.sh                # macOS 1-Click Installer (defaults write PlayerDebugMode=1)
└── README.md                     # Architecture specification & deployment manual
`,
    },
    manifest: {
      title: 'CSXS/manifest.xml',
      filename: 'CSXS/manifest.xml',
      language: 'xml',
      description: 'Defines CEP 10.0 extension bundle, PPRO host compatibility, and Node.js mixed context flags.',
      content: MANIFEST_XML,
    },
    premiere_jsx: {
      title: 'jsx/Premiere.jsx',
      filename: 'jsx/Premiere.jsx',
      language: 'javascript',
      description: 'Premiere Pro ExtendScript C++ bridge. Creates native Graphic Clips, slices timeline intervals, and adds markers.',
      content: PREMIERE_JSX,
    },
    main_js: {
      title: 'extension/main.js',
      filename: 'extension/main.js',
      language: 'javascript',
      description: 'CEP Panel runtime bridge. Detects CSInterface, connects WebSocket with port auto-fallback, and coordinates JSX calls.',
      content: MAIN_JS_BRIDGE,
    },
    python_main: {
      title: 'backend/main.py',
      filename: 'backend/main.py',
      language: 'python',
      description: 'Local Python 3.12 FastAPI microservice. Integrates faster-whisper, Silero VAD, Ollama emojis, and port conflict resolution.',
      content: PYTHON_MAIN_PY,
    },
    presets_json: {
      title: 'backend/presets.json',
      filename: 'backend/presets.json',
      language: 'json',
      description: 'Complete presets library with visual styling parameters, animations, and keyframes.',
      content: JSON.stringify(PRESET_LIBRARY, null, 2),
    },
    requirements: {
      title: 'backend/requirements.txt',
      filename: 'backend/requirements.txt',
      language: 'text',
      description: 'Python package requirements for 100% local, zero-cloud hardware acceleration.',
      content: REQUIREMENTS_TXT,
    },
    registry_win: {
      title: 'install_windows_registry.bat',
      filename: 'install_windows_registry.bat',
      language: 'batch',
      description: 'Windows Registry script enabling PlayerDebugMode for CSXS 10/11/12 and copying extension to %APPDATA%.',
      content: INSTALL_WINDOWS_BAT,
    },
    registry_mac: {
      title: 'install_mac.sh',
      filename: 'install_mac.sh',
      language: 'bash',
      description: 'macOS terminal script writing PlayerDebugMode defaults and linking to Application Support/Adobe/CEP.',
      content: INSTALL_MAC_SH,
    },
  };

  const currentFile = fileContents[activeTab] || fileContents['manifest'];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 select-none">
      <div className="bg-[#141414] border border-[#2E2E2E] rounded-xl w-full max-w-5xl h-[88vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Top Bar */}
        <div className="h-14 border-b border-[#282828] bg-[#181818] px-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#4F46E5] flex items-center justify-center">
              <FileCode className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                FlowState AI Codebase & Production Architecture
              </h2>
              <p className="text-[11px] text-neutral-400 font-mono">
                Adobe CEP 10.0 Extension + Local Python 3.12 FastAPI Microservice
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onDownloadZip}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#7C3AED] hover:bg-[#6D28D9] text-white shadow-md transition-colors"
            >
              <FolderDown className="w-3.5 h-3.5" />
              <span>Download Complete CEP Package (.zip)</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#222222] hover:bg-[#2C2C2C] text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Body */}
        <div className="flex-1 flex overflow-hidden">
          {/* File Navigation List */}
          <div className="w-64 border-r border-[#262626] bg-[#111111] p-3 space-y-1 overflow-y-auto shrink-0 scrollbar-thin scrollbar-thumb-[#252525]">
            <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-2 py-1">
              Architecture & Files
            </div>

            {Object.entries(fileContents).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-mono transition-colors flex items-center gap-2 ${
                  activeTab === key
                    ? 'bg-[#2A233A] text-purple-300 font-semibold border border-[#7C3AED]/40'
                    : 'text-neutral-400 hover:bg-[#1A1A1A] hover:text-neutral-200'
                }`}
              >
                {key === 'tree' ? (
                  <FolderTree className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                ) : (
                  <FileCode className="w-3.5 h-3.5 text-[#A78BFA] shrink-0" />
                )}
                <span className="truncate">{item.title}</span>
              </button>
            ))}

            <div className="pt-4 border-t border-[#222] mt-4 px-2 space-y-2">
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>Zero-Cloud Privacy Mandate</span>
              </div>
              <p className="text-[10px] text-neutral-400 leading-normal">
                All inference is 100% self-hosted via local CUDA/CPU. No cloud subscriptions or API keys needed.
              </p>
            </div>
          </div>

          {/* Code Viewer Panel */}
          <div className="flex-1 flex flex-col bg-[#0C0C0C] overflow-hidden">
            {/* File Info Bar */}
            <div className="px-4 py-2 bg-[#161616] border-b border-[#242424] flex items-center justify-between shrink-0">
              <div>
                <span className="text-xs font-mono font-bold text-neutral-200">
                  {currentFile.filename}
                </span>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  {currentFile.description}
                </p>
              </div>

              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#222222] hover:bg-[#2C2C2C] border border-[#333333] text-neutral-200 hover:text-white transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Content */}
            <div className="flex-1 overflow-auto p-4 font-mono text-xs text-neutral-300 leading-relaxed scrollbar-thin scrollbar-thumb-[#252525] bg-[#0A0A0A]">
              <pre className="select-text whitespace-pre font-mono">
                {currentFile.content}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
