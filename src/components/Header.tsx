import React from 'react';
import { 
  Cpu, 
  RefreshCw, 
  Terminal, 
  FolderDown, 
  FileCode, 
  Film,
  Zap,
  Grid
} from 'lucide-react';
import { ActiveToolView } from '../types';
import { BackendConnectionStatus } from '../services/backendService';

interface HeaderProps {
  activeSequence: string;
  activeTool: ActiveToolView;
  onSelectTool: (tool: ActiveToolView) => void;
  connectionStatus: BackendConnectionStatus;
  currentPort: number;
  onRefreshSequence: () => void;
  onReconnect: () => void;
  onOpenCodeModal: () => void;
  onOpenInstallerModal: () => void;
  onToggleTerminal: () => void;
  isTerminalOpen: boolean;
  onDownloadZip: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSequence,
  activeTool,
  onSelectTool,
  connectionStatus,
  currentPort,
  onRefreshSequence,
  onReconnect,
  onOpenCodeModal,
  onOpenInstallerModal,
  onToggleTerminal,
  isTerminalOpen,
  onDownloadZip,
}) => {
  return (
    <header className="h-14 border-b border-[#20202E] bg-[#0E0E14] px-4 flex items-center justify-between select-none shrink-0 z-30">
      {/* Brand & Home Navigation */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onSelectTool('hub')}
          className="flex items-center gap-2.5 text-left group"
          title="Return to FlowState AI AutoCut Tools Grid"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] flex items-center justify-center shadow-lg shadow-purple-950/60 group-hover:scale-105 transition-transform">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-base tracking-tight font-sans">
                FlowState <span className="text-[#A78BFA]">AutoCut</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-neutral-400 bg-[#1A1A24] border border-[#2B2B3E] px-1.5 py-0.5 rounded">
                CEP 10.0
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 font-mono flex items-center gap-1.5 leading-none">
              <span>100% Local GPU</span>
              <span className="text-neutral-600">·</span>
              <span className="text-emerald-400">Zero Cloud Subscriptions</span>
            </p>
          </div>
        </button>

        {activeTool !== 'hub' && (
          <button
            onClick={() => onSelectTool('hub')}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#1B1B26] hover:bg-[#252538] border border-[#2B2B3E] text-xs font-medium text-neutral-300 hover:text-white transition-colors ml-2"
          >
            <Grid className="w-3 h-3 text-purple-400" />
            <span>Tools Menu</span>
          </button>
        )}
      </div>

      {/* Middle Zone: Active Premiere Sequence */}
      <div className="hidden md:flex items-center gap-2 bg-[#151520] border border-[#242436] rounded-md px-3 py-1.5 max-w-md">
        <Film className="w-3.5 h-3.5 text-purple-400 shrink-0" />
        <span className="text-xs text-neutral-400 font-medium shrink-0">Premiere Sequence:</span>
        <span className="text-xs text-neutral-200 font-mono font-medium truncate max-w-[180px]" title={activeSequence}>
          {activeSequence}
        </span>
        <button
          onClick={onRefreshSequence}
          title="Refresh Premiere Pro Sequence State via ExtendScript"
          className="text-neutral-400 hover:text-white p-0.5 rounded transition-colors ml-1"
        >
          <RefreshCw className="w-3 h-3" />
        </button>
      </div>

      {/* Right Zone: Local Daemon Status & Code Tools */}
      <div className="flex items-center gap-2">
        {/* Local Microservice Connection Status */}
        <div 
          onClick={onReconnect}
          className="cursor-pointer group flex items-center gap-2 bg-[#151520] border border-[#242436] hover:border-[#383852] rounded-md px-2.5 py-1.5 transition-colors"
          title="Click to probe local Python daemon (ports 8000-8003)"
        >
          <div className="relative flex items-center justify-center">
            {connectionStatus === 'connected' ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="absolute w-2 h-2 rounded-full bg-emerald-400 animate-ping opacity-75"></span>
              </>
            ) : connectionStatus === 'connecting' ? (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            ) : connectionStatus === 'simulated' ? (
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
            ) : (
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            )}
          </div>
          <span className="text-xs font-mono text-neutral-300">
            {connectionStatus === 'connected'
              ? `Python :${currentPort}`
              : connectionStatus === 'connecting'
              ? 'Probing Ports...'
              : connectionStatus === 'simulated'
              ? 'Local Engine (Ready)'
              : 'Daemon Offline'}
          </span>
          <Cpu className="w-3 h-3 text-neutral-500 group-hover:text-neutral-300 transition-colors" />
        </div>

        {/* Toggle Terminal */}
        <button
          onClick={onToggleTerminal}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium border transition-colors ${
            isTerminalOpen
              ? 'bg-[#2A233A] border-[#7C3AED] text-purple-200'
              : 'bg-[#151520] border-[#242436] text-neutral-300 hover:bg-[#1E1E2C]'
          }`}
          title="Toggle Real-Time Execution Console & Terminal"
        >
          <Terminal className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Console</span>
        </button>

        {/* Windows 1-Click Auto Installer */}
        <button
          onClick={onOpenInstallerModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-[#1D2B4A] hover:bg-[#25375E] border border-blue-500/50 text-blue-200 transition-colors shadow-sm"
          title="Download 1-Click Windows Setup Installer (.bat) with automated Registry & Python setup"
        >
          <FolderDown className="w-3.5 h-3.5 text-blue-400" />
          <span className="hidden sm:inline">Windows Setup (.bat)</span>
        </button>

        {/* View Full Codebase & CEP Package */}
        <button
          onClick={onOpenCodeModal}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium bg-[#191924] border border-[#28283C] text-neutral-200 hover:bg-[#202030] transition-colors"
          title="Inspect Complete Generated Codebase (manifest.xml, main.py, ExtendScript, Registry)"
        >
          <FileCode className="w-3.5 h-3.5 text-[#A78BFA]" />
          <span className="hidden sm:inline">Codebase Hub</span>
        </button>

        {/* Download ZIP Package */}
        <button
          onClick={onDownloadZip}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-[#7C3AED] hover:bg-[#6D28D9] text-white shadow-md shadow-purple-950/40 transition-colors"
          title="Download complete ready-to-install FlowState AI CEP extension bundle"
        >
          <FolderDown className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Export CEP Bundle</span>
        </button>
      </div>
    </header>
  );
};
