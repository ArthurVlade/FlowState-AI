import React, { useEffect, useRef, useState } from 'react';
import { 
  Terminal, 
  Trash2, 
  Download, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  X, 
  Filter, 
  FileSpreadsheet,
  FileJson,
  Cpu
} from 'lucide-react';
import { LogEntry } from '../types';
import { exportLogsToCSV, exportLogsToJSON } from '../services/exportService';

interface LogTerminalProps {
  logs: LogEntry[];
  onClearLogs: () => void;
  isOpen: boolean;
  onClose: () => void;
  currentPort: number;
}

export const LogTerminal: React.FC<LogTerminalProps> = ({
  logs,
  onClearLogs,
  isOpen,
  onClose,
  currentPort,
}) => {
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const [filterLevel, setFilterLevel] = useState<string>('ALL');
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, isOpen]);

  if (!isOpen) return null;

  const filteredLogs = logs.filter((log) => {
    const matchesLevel = filterLevel === 'ALL' || log.level === filterLevel;
    const matchesSearch =
      search === '' ||
      log.message.toLowerCase().includes(search.toLowerCase()) ||
      (log.process && log.process.toLowerCase().includes(search.toLowerCase()));
    return matchesLevel && matchesSearch;
  });

  return (
    <div className="h-64 border-t border-[#262626] bg-[#0E0E0E] flex flex-col font-mono text-xs select-none shrink-0 z-20">
      {/* Console Top Header */}
      <div className="px-3 py-1.5 bg-[#141414] border-b border-[#222222] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-[#A78BFA]" />
          <span className="font-bold text-neutral-200">Execution Console & Daemon Stream</span>
          <span className="text-[10px] text-neutral-400">
            · ws://127.0.0.1:{currentPort}/ws/stream
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Level Filter */}
          <div className="flex items-center gap-1 bg-[#1A1A1A] p-0.5 rounded border border-[#2B2B2B]">
            {['ALL', 'INFO', 'SUCCESS', 'PREMIERE', 'WARN'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setFilterLevel(lvl)}
                className={`px-1.5 py-0.5 rounded text-[10px] transition-colors ${
                  filterLevel === lvl
                    ? 'bg-[#7C3AED] text-white font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="w-3 h-3 text-neutral-500 absolute left-2 top-1.5" />
            <input
              type="text"
              placeholder="Search logs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#1C1C1C] border border-[#2C2C2C] text-[11px] text-neutral-200 pl-6 pr-2 py-0.5 rounded focus:outline-none focus:border-[#7C3AED] w-28"
            />
          </div>

          {/* Export to CSV */}
          <button
            onClick={() => exportLogsToCSV(logs)}
            className="flex items-center gap-1 px-2 py-1 rounded bg-[#1C1C1C] hover:bg-[#252525] border border-[#2D2D2D] text-neutral-300 hover:text-white transition-colors text-[10px]"
            title="Export all process logs to CSV format"
          >
            <FileSpreadsheet className="w-3 h-3 text-emerald-400" />
            <span>CSV</span>
          </button>

          {/* Export to JSON */}
          <button
            onClick={() => exportLogsToJSON(logs)}
            className="flex items-center gap-1 px-2 py-1 rounded bg-[#1C1C1C] hover:bg-[#252525] border border-[#2D2D2D] text-neutral-300 hover:text-white transition-colors text-[10px]"
            title="Export all process logs to JSON format"
          >
            <FileJson className="w-3 h-3 text-amber-400" />
            <span>JSON</span>
          </button>

          {/* Clear */}
          <button
            onClick={onClearLogs}
            className="p-1 rounded bg-[#1C1C1C] hover:bg-[#282828] text-neutral-400 hover:text-red-400"
            title="Clear logs"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="p-1 rounded bg-[#1C1C1C] hover:bg-[#282828] text-neutral-400 hover:text-white"
            title="Minimize console"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Output Stream */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1 font-mono text-[11px] scrollbar-thin scrollbar-thumb-[#252525]">
        {filteredLogs.length === 0 ? (
          <div className="text-neutral-500 py-4 text-center">
            No matching log entries found. Ready to process.
          </div>
        ) : (
          filteredLogs.map((log) => {
            let color = 'text-neutral-300';
            if (log.level === 'SUCCESS') color = 'text-emerald-400';
            else if (log.level === 'PREMIERE') color = 'text-purple-400 font-bold';
            else if (log.level === 'WARN') color = 'text-amber-400';
            else if (log.level === 'ERROR') color = 'text-rose-400 font-bold';
            else if (log.level === 'DEBUG') color = 'text-neutral-500';

            return (
              <div key={log.id} className="flex items-start gap-2 hover:bg-white/[0.02] py-0.5 px-1 rounded">
                <span className="text-neutral-400 shrink-0 select-none">
                  [{log.timestamp}]
                </span>
                <span
                  className={`font-semibold shrink-0 select-none ${
                    log.level === 'SUCCESS'
                      ? 'text-emerald-500'
                      : log.level === 'PREMIERE'
                      ? 'text-[#A78BFA]'
                      : log.level === 'WARN'
                      ? 'text-amber-500'
                      : log.level === 'ERROR'
                      ? 'text-rose-500'
                      : 'text-neutral-400'
                  }`}
                >
                  [{log.level}]
                </span>
                {log.process && (
                  <span className="text-neutral-400 shrink-0 select-none">
                    [{log.process}]
                  </span>
                )}
                <span className={`${color} break-all select-text`}>{log.message}</span>
              </div>
            );
          })
        )}
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
};
