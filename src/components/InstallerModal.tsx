import React, { useState } from 'react';
import { 
  X, 
  Download, 
  CheckCircle2, 
  Terminal, 
  Copy, 
  Check, 
  ShieldCheck, 
  Sparkles,
  Layers,
  ArrowRight,
  ExternalLink,
  Laptop
} from 'lucide-react';
import { INSTALL_POWERSHELL_PS1, INSTALL_WINDOWS_BAT } from '../backendCode/templates';

interface InstallerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadInstaller: () => void;
}

export const InstallerModal: React.FC<InstallerModalProps> = ({
  isOpen,
  onClose,
  onDownloadInstaller,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'batch' | 'powershell'>('overview');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const copyScript = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    {
      num: '01',
      title: 'Administrator Self-Elevation',
      desc: 'Automatically requests UAC admin elevation to configure Adobe CEP PlayerDebugMode without manual command prompt work.',
    },
    {
      num: '02',
      title: 'Windows Registry Configuration',
      desc: 'Enables PlayerDebugMode = 1 across CSXS.9 through CSXS.16 in both HKCU and HKLM so Premiere Pro loads the extension immediately.',
    },
    {
      num: '03',
      title: 'Extension Auto-Deployment',
      desc: 'Copies manifest.xml, ExtendScript JSX, and UI files into %APPDATA%\\Adobe\\CEP\\extensions\\FlowStateAI and Common Files.',
    },
    {
      num: '04',
      title: 'Python 3.12 & AI Libraries Provisioning',
      desc: 'Detects Python, sets up backend\\venv, and installs faster-whisper, silero-vad, torch, and FastAPI automatically.',
    },
    {
      num: '05',
      title: 'Desktop Shortcut & Background Daemon',
      desc: 'Creates a 1-click Desktop shortcut and silent launcher so the local AI engine runs seamlessly alongside Premiere Pro.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 select-none">
      <div className="bg-[#121218] border border-[#26263A] rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="h-16 border-b border-[#202030] bg-[#161622] px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-[#7C3AED] flex items-center justify-center shadow-lg shadow-purple-950/60">
              <Laptop className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                FlowState AI — Automated Windows Setup Installer
              </h2>
              <p className="text-xs text-neutral-400 font-mono">
                1-Click Full Automation: Registry, CEP Folders, Python Venv & Premiere Menu
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onDownloadInstaller}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-white bg-[#7C3AED] hover:bg-[#6D28D9] shadow-md shadow-purple-950/50 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download 1-Click Installer (.zip)</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#20202E] hover:bg-[#2A2A3E] text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="px-6 py-2 bg-[#14141E] border-b border-[#202030] flex items-center gap-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'overview'
                ? 'bg-[#7C3AED] text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Installation Overview & Steps
          </button>
          <button
            onClick={() => setActiveTab('batch')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'batch'
                ? 'bg-[#7C3AED] text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Inspect Setup.bat
          </button>
          <button
            onClick={() => setActiveTab('powershell')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'powershell'
                ? 'bg-[#7C3AED] text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Inspect PowerShell Script (.ps1)
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-[#242436]">
          {activeTab === 'overview' ? (
            <div className="space-y-6">
              {/* How it works banner */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/40 via-[#181826] to-[#14141E] border border-purple-800/40 space-y-2">
                <div className="flex items-center gap-2 text-purple-300 font-bold text-xs">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>Zero Manual Setup Required</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  The automated installer performs all manual Windows setup tasks in a single execution. It enables Adobe CEP debug mode in the Windows Registry, unpacks the panel into Premiere’s extension directory, provisions the local Python 3.12 AI environment with GPU acceleration, and generates a Desktop shortcut.
                </p>
              </div>

              {/* 5-Step Automated Pipeline */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                  Automated Installer Sequence
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {steps.map((s) => (
                    <div
                      key={s.num}
                      className="p-3.5 rounded-xl bg-[#161622] border border-[#242436] space-y-1.5"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-md bg-[#252538] text-[10px] font-mono font-bold text-purple-300 flex items-center justify-center">
                          {s.num}
                        </span>
                        <h4 className="text-xs font-bold text-white">{s.title}</h4>
                      </div>
                      <p className="text-[11px] text-neutral-400 leading-normal">
                        {s.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3 Simple User Steps */}
              <div className="p-4 rounded-xl bg-[#151520] border border-[#242436] space-y-3">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>How to Run After Downloading</span>
                </h3>

                <ol className="space-y-2 text-xs text-neutral-300 font-mono">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">1.</span>
                    <span>Download and unzip <strong>FlowState_AI_Windows_AutoInstaller.zip</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">2.</span>
                    <span>Right-click <strong>setup_flowstate_windows.bat</strong> and select <strong>Run as Administrator</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">3.</span>
                    <span>Open Adobe Premiere Pro $\rightarrow$ <strong>Window $\gt$ Extensions $\gt$ FlowState AI (AutoCut Suite)</strong></span>
                  </li>
                </ol>
              </div>
            </div>
          ) : activeTab === 'batch' ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#242436]">
                <span className="text-xs font-mono text-neutral-300">
                  setup_flowstate_windows.bat
                </span>
                <button
                  onClick={() => copyScript(INSTALL_WINDOWS_BAT)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#20202E] hover:bg-[#2A2A3E] text-xs text-neutral-200"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Script'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-[#0B0B10] border border-[#20202E] font-mono text-xs text-neutral-300 overflow-x-auto select-text whitespace-pre">
                {INSTALL_WINDOWS_BAT}
              </pre>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#242436]">
                <span className="text-xs font-mono text-neutral-300">
                  install_flowstate_ai.ps1
                </span>
                <button
                  onClick={() => copyScript(INSTALL_POWERSHELL_PS1)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#20202E] hover:bg-[#2A2A3E] text-xs text-neutral-200"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Script'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-[#0B0B10] border border-[#20202E] font-mono text-xs text-neutral-300 overflow-x-auto select-text whitespace-pre">
                {INSTALL_POWERSHELL_PS1}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
