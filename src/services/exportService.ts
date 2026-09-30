import JSZip from 'jszip';
import { LogEntry } from '../types';
import {
  INSTALL_MAC_SH,
  INSTALL_POWERSHELL_PS1,
  INSTALL_WINDOWS_BAT,
  MAIN_JS_BRIDGE,
  MANIFEST_XML,
  PREMIERE_JSX,
  PYTHON_MAIN_PY,
  REQUIREMENTS_TXT,
} from '../backendCode/templates';
import { PRESET_LIBRARY } from '../data/presetsData';

export function exportLogsToCSV(logs: LogEntry[]) {
  const headers = ['ID', 'Timestamp', 'Level', 'Process', 'Message'];
  const rows = logs.map((log) => [
    `"${log.id}"`,
    `"${log.timestamp}"`,
    `"${log.level}"`,
    `"${log.process || 'Core'}"`,
    `"${log.message.replace(/"/g, '""')}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `flowstate_ai_logs_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportLogsToJSON(logs: LogEntry[]) {
  const jsonContent = JSON.stringify(logs, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `flowstate_ai_logs_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export async function downloadWindowsInstallerPackage() {
  const zip = new JSZip();

  const root = zip.folder('FlowState_AI_Windows_AutoInstaller');
  if (!root) return;

  root.file('setup_flowstate_windows.bat', INSTALL_WINDOWS_BAT);
  root.file('install_flowstate_ai.ps1', INSTALL_POWERSHELL_PS1);
  root.file(
    'START_HERE_WINDOWS_INSTRUCTIONS.txt',
    `========================================================================
 FLOWSTATE AI - 1-CLICK WINDOWS SETUP FOR ADOBE PREMIERE PRO
========================================================================

HOW TO INSTALL IN 1 STEP:
1. Right-click "setup_flowstate_windows.bat" and choose "Run as administrator".
2. Click "Yes" on the Windows UAC permission prompt.
3. The installer will automatically:
   - Configure the Windows Registry (PlayerDebugMode = 1 for all Premiere Pro CC versions)
   - Copy the panel extension into %APPDATA%\\Adobe\\CEP\\extensions\\FlowStateAI
   - Check and configure your local Python 3.12 AI microservice virtual environment
   - Install faster-whisper, silero-vad, torch, and FastAPI
   - Create a Desktop shortcut to start the background AI daemon

4. Launch Adobe Premiere Pro -> Open any sequence.
5. In the top menu, go to:
   Window > Extensions > FlowState AI (AutoCut Suite)

All AI processing runs 100% locally on your hardware with 0 cloud cost!
========================================================================
`
  );

  const csxs = root.folder('CSXS');
  csxs?.file('manifest.xml', MANIFEST_XML);

  const jsx = root.folder('jsx');
  jsx?.file('Premiere.jsx', PREMIERE_JSX);

  const ext = root.folder('extension');
  ext?.file('main.js', MAIN_JS_BRIDGE);

  const backend = root.folder('backend');
  backend?.file('main.py', PYTHON_MAIN_PY);
  backend?.file('presets.json', JSON.stringify(PRESET_LIBRARY, null, 2));
  backend?.file('requirements.txt', REQUIREMENTS_TXT);

  const content = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(content);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'FlowState_AI_Windows_AutoInstaller.zip';
  a.click();
  URL.revokeObjectURL(url);
}

export async function downloadCompleteCEPBundle() {
  const zip = new JSZip();

  const root = zip.folder('FlowStateAI_CEP_Bundle');
  if (!root) return;

  const csxs = root.folder('CSXS');
  csxs?.file('manifest.xml', MANIFEST_XML);

  const jsx = root.folder('jsx');
  jsx?.file('Premiere.jsx', PREMIERE_JSX);

  const ext = root.folder('extension');
  ext?.file('main.js', MAIN_JS_BRIDGE);

  const backend = root.folder('backend');
  backend?.file('main.py', PYTHON_MAIN_PY);
  backend?.file('presets.json', JSON.stringify(PRESET_LIBRARY, null, 2));
  backend?.file('requirements.txt', REQUIREMENTS_TXT);

  root.file('setup_flowstate_windows.bat', INSTALL_WINDOWS_BAT);
  root.file('install_flowstate_ai.ps1', INSTALL_POWERSHELL_PS1);
  root.file('install_mac.sh', INSTALL_MAC_SH);

  const content = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(content);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'FlowState_AI_CEP_Extension_Package.zip';
  a.click();
  URL.revokeObjectURL(url);
}
