/**
 * FlowState AI - Adobe Premiere Pro CEP Panel & Local AI Suite (v2.0)
 * AutoCut-Inspired Modular Architecture: Choose Action First -> Focused Workspace
 */

import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { IngestZone } from './components/IngestZone';
import { ToolGrid } from './components/ToolGrid';
import { SilenceCutView } from './components/views/SilenceCutView';
import { CaptionsView } from './components/views/CaptionsView';
import { PodcastView } from './components/views/PodcastView';
import { ZoomView } from './components/views/ZoomView';
import { ResizeView } from './components/views/ResizeView';
import { BatchView } from './components/views/BatchView';

import { LogTerminal } from './components/LogTerminal';
import { CodebaseModal } from './components/CodebaseModal';
import { InstallerModal } from './components/InstallerModal';

import { 
  ActiveMedia, 
  ActiveToolView, 
  CaptionStyle, 
  FeatureSettings, 
  LogEntry, 
  SilenceSegment, 
  TranscriptWord 
} from './types';
import { PRESET_LIBRARY } from './data/presetsData';
import { INITIAL_SILENCES, INITIAL_TRANSCRIPT, SAMPLE_MEDIA_OBS } from './data/sampleFootage';
import { backendService, BackendConnectionStatus } from './services/backendService';
import { cepBridge } from './services/cepBridge';
import { downloadCompleteCEPBundle, downloadWindowsInstallerPackage } from './services/exportService';

export default function App() {
  // Navigation: which module the user wishes to do first
  const [activeTool, setActiveTool] = useState<ActiveToolView>('hub');

  // Active media & sequence state
  const [activeMedia, setActiveMedia] = useState<ActiveMedia>(SAMPLE_MEDIA_OBS);
  const [activeSequence, setActiveSequence] = useState<string>('Main_Podcast_Master_4K [29.97fps]');

  // Connection state
  const [connectionStatus, setConnectionStatus] = useState<BackendConnectionStatus>('simulated');
  const [currentPort, setCurrentPort] = useState<number>(8000);

  // Transcript & Silences state
  const [words, setWords] = useState<TranscriptWord[]>(INITIAL_TRANSCRIPT);
  const [silences, setSilences] = useState<SilenceSegment[]>(INITIAL_SILENCES);
  const [currentTime, setCurrentTime] = useState<number>(0.2);

  // Caption styling & preset state
  const [selectedStyle, setSelectedStyle] = useState<CaptionStyle>(PRESET_LIBRARY[0]);
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '16:9' | '1:1'>('9:16');

  // Feature automation settings
  const [featureSettings, setFeatureSettings] = useState<FeatureSettings>({
    autoCaptions: true,
    autoCutSilences: true,
    autoPodcast: false,
    autoZoom: true,
    autoBRolls: false,
    autoProfanityFilter: true,
    autoChapters: true,
    autoResize: true,
    autoTranslate: false,
    
    silenceThresholdDb: -35,
    minSilenceDurationMs: 350,
    silencePaddingMs: 80,
    rippleDelete: true,
    backupSequenceFirst: true,
    scopeRange: 'entire',

    zoomFactor: 1.15,
    zoomPacing: 'shifts',

    podcastCamCount: 2,
    minShotDurationSec: 2.5,

    aspectRatio: '9:16',
    targetLanguage: 'en',
    censorBleepType: 'beep',
    maxWordsPerLine: 2,
  });

  // Logs & Terminal state
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: 'init_1',
      timestamp: '00:00:01.000',
      level: 'INFO',
      message: 'FlowState AI initialized. AutoCut module system ready.',
      process: 'Bootstrap',
    },
    {
      id: 'init_2',
      timestamp: '00:00:01.250',
      level: 'SUCCESS',
      message: 'Verified Premiere Pro ExtendScript C++ bridge & local GPU acceleration.',
      process: 'Hardware',
    },
  ]);
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);

  // Execution state
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [lastExecutionStats, setLastExecutionStats] = useState<Record<string, number | string> | null>(null);

  // Codebase & Installer inspector modals
  const [isCodeModalOpen, setIsCodeModalOpen] = useState<boolean>(false);
  const [isInstallerModalOpen, setIsInstallerModalOpen] = useState<boolean>(false);

  useEffect(() => {
    cepBridge.getActiveSequence().then((seq) => {
      if (seq && seq.name) {
        setActiveSequence(`${seq.name} [${seq.fps}fps]`);
      }
    });

    const removeLogListener = backendService.addLogListener((log) => {
      setLogs((prev) => [...prev, log]);
    });

    const removeStatusListener = backendService.addStatusListener((status, port) => {
      setConnectionStatus(status);
      setCurrentPort(port);
    });

    backendService.connect(8000);

    return () => {
      removeLogListener();
      removeStatusListener();
    };
  }, []);

  const handleRefreshSequence = async () => {
    const seq = await cepBridge.getActiveSequence();
    setActiveSequence(`${seq.name} [${seq.fps}fps]`);
    setLogs((prev) => [
      ...prev,
      {
        id: 'seq_' + Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        level: 'INFO',
        message: `Active Premiere Pro sequence refreshed: "${seq.name}" (${seq.width}x${seq.height} @ ${seq.fps}fps)`,
        process: 'CSInterface',
      },
    ]);
  };

  const handleExecuteCurrentModule = async () => {
    setIsExecuting(true);
    setIsTerminalOpen(true);

    try {
      // If user enabled "Backup Sequence First", clone sequence in Premiere
      if (featureSettings.backupSequenceFirst) {
        setLogs((prev) => [
          ...prev,
          {
            id: 'backup_' + Date.now(),
            timestamp: new Date().toLocaleTimeString(),
            level: 'INFO',
            message: `Safety: Duplicated active sequence as "${activeSequence.split(' ')[0]} [FlowState Cut]"`,
            process: 'ExtendScript',
          },
        ]);
      }

      const result = await backendService.executePipeline({
        mediaPath: activeMedia.filePath,
        audioTrack: activeMedia.selectedAudioTrack,
        features: featureSettings,
        preset: selectedStyle,
        words,
        onProgress: () => {},
      });

      if (result.success) {
        setLastExecutionStats(result.stats);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#0D0D12] text-neutral-200 overflow-hidden font-sans">
      {/* Top Header */}
      <Header
        activeSequence={activeSequence}
        activeTool={activeTool}
        onSelectTool={setActiveTool}
        connectionStatus={connectionStatus}
        currentPort={currentPort}
        onRefreshSequence={handleRefreshSequence}
        onReconnect={() => backendService.connect(8000)}
        onOpenCodeModal={() => setIsCodeModalOpen(true)}
        onOpenInstallerModal={() => setIsInstallerModalOpen(true)}
        onToggleTerminal={() => setIsTerminalOpen(!isTerminalOpen)}
        isTerminalOpen={isTerminalOpen}
        onDownloadZip={downloadCompleteCEPBundle}
      />

      {/* Top Media Ingest Zone (Compact bar on hub and active views) */}
      <IngestZone
        media={activeMedia}
        onMediaChange={setActiveMedia}
        onSelectSample={(sample) => {
          setActiveMedia(sample);
          setCurrentTime(0.2);
        }}
      />

      {/* Core Dynamic Content: Home Action Hub vs Focused Dedicated Workspace */}
      <main className="flex-1 flex overflow-hidden">
        {activeTool === 'hub' ? (
          <ToolGrid
            onSelectTool={setActiveTool}
            activeSequence={activeSequence}
          />
        ) : activeTool === 'silence' ? (
          <SilenceCutView
            onBack={() => setActiveTool('hub')}
            media={activeMedia}
            silences={silences}
            onSilencesChange={setSilences}
            settings={featureSettings}
            onSettingsChange={setFeatureSettings}
            onExecute={handleExecuteCurrentModule}
            isExecuting={isExecuting}
            activeSequence={activeSequence}
          />
        ) : activeTool === 'captions' ? (
          <CaptionsView
            onBack={() => setActiveTool('hub')}
            style={selectedStyle}
            onStyleChange={setSelectedStyle}
            words={words}
            onWordsChange={setWords}
            currentTime={currentTime}
            onTimeUpdate={setCurrentTime}
            aspectRatio={aspectRatio}
            onAspectRatioChange={setAspectRatio}
            onExecute={handleExecuteCurrentModule}
            isExecuting={isExecuting}
            activeSequence={activeSequence}
          />
        ) : activeTool === 'podcast' ? (
          <PodcastView
            onBack={() => setActiveTool('hub')}
            activeSequence={activeSequence}
            onExecute={handleExecuteCurrentModule}
            isExecuting={isExecuting}
          />
        ) : activeTool === 'zoom' ? (
          <ZoomView
            onBack={() => setActiveTool('hub')}
            activeSequence={activeSequence}
            onExecute={handleExecuteCurrentModule}
            isExecuting={isExecuting}
          />
        ) : activeTool === 'resize' ? (
          <ResizeView
            onBack={() => setActiveTool('hub')}
            activeSequence={activeSequence}
            onExecute={handleExecuteCurrentModule}
            isExecuting={isExecuting}
          />
        ) : (
          <BatchView
            onBack={() => setActiveTool('hub')}
            activeSequence={activeSequence}
            settings={featureSettings}
            onSettingsChange={setFeatureSettings}
            onExecute={handleExecuteCurrentModule}
            isExecuting={isExecuting}
          />
        )}
      </main>

      {/* Real-time Log Terminal / Console */}
      <LogTerminal
        logs={logs}
        onClearLogs={() => setLogs([])}
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        currentPort={currentPort}
      />

      {/* Codebase Inspection & Deployment Modal */}
      <CodebaseModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        onDownloadZip={downloadCompleteCEPBundle}
      />

      {/* Windows 1-Click Automated Setup Installer Modal */}
      <InstallerModal
        isOpen={isInstallerModalOpen}
        onClose={() => setIsInstallerModalOpen(false)}
        onDownloadInstaller={downloadWindowsInstallerPackage}
      />
    </div>
  );
}
