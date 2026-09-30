# FlowState AI — Local Video Editing Suite for Adobe Premiere Pro

> Free, open-source, 100% local AI video editing panel for Adobe Premiere Pro. Replicates and expands upon AutoCut with zero cloud subscriptions, zero API keys, and complete data privacy.

[![Premiere Pro](https://img.shields.io/badge/Adobe%20Premiere%20Pro-2020%20--%202026+-9999FF?logo=adobe-premiere-pro&logoColor=white)](https://www.adobe.com/products/premiere.html)
[![CEP](https://img.shields.io/badge/CEP-10.0%20%2F%20HTML5-7C3AED)](https://github.com/Adobe-CEP)
[![Python](https://img.shields.io/badge/Python-3.12-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Zero Cloud](https://img.shields.io/badge/Cloud%20Cost-%240.00%20(100%25%20Local)-10B981)](#)

---

## Overview

**FlowState AI** is a native Adobe Premiere Pro panel extension (CEP 10.0) connected to a local, hardware-accelerated Python 3.12 microservice. It delivers automated silence excision, word-level interactive text editing, multi-camera switching, smart reframing, and animated Essential Graphics caption styling directly in your Premiere timeline.

Everything runs on your local machine using your GPU (CUDA) or CPU. No audio or video ever leaves your workstation.

---

## Key Workflows

FlowState AI uses an **action-first modular workflow** inspired by the AutoCut plugin:

### 1. ✂️ AutoCut Silences
* **Sub-millisecond VAD:** Powered by `Silero VAD` v4. Accurately identifies speech pauses without chopping natural consonants.
* **Pacing Presets:** Quick 1-click presets: *Balanced* (-35 dB, 350ms), *Aggressive* (-28 dB, 250ms for TikTok/Reels), and *Relaxed* (-42 dB, 550ms for documentary cadence).
* **Speech Boundary Padding:** Configurable lead-in/lead-out buffers (e.g. 80ms) prevent clipping the start or end of words.
* **Interactive Waveform Map:** Visual timeline map displaying detected silence intervals; click any interval to toggle keeping or cutting that pause.
* **Safety Sequence Duplication:** Optionally clones the active sequence (e.g., `Sequence_01 [FlowState Cut]`) before cutting so edits remain 100% non-destructive.
* **Ripple Delete:** Automatically closes gaps in the timeline with reverse-order razor execution to eliminate timecode drift.

### 2. 💬 AutoCaptions & Emojis
* **Native Essential Graphics (Graphic Clips):** Captions are injected directly as native Premiere Pro Graphic Clips on Video Track 3 — **no slow After Effects MOGRT rendering required**.
* **100+ Creator & Aesthetic Presets:**
  * **Viral Creators:** Alex Hormozi (Bouncy Green, Red Punch, Yellow Box, Rapid 1-Word Pop), MrBeast (Gaming Yellow, Cyan Monster, Comic Boom), Ali Abdaal (Clarity Minimal, Oxford Book Serif), Iman Gadzhi (Luxury Noir, Clean Sans), Joe Rogan, Huberman Lab, GaryVee, Devin Jatho, Graham Stephan, MKBHD, and more.
  * **Aesthetic Genres:** Neon Glow, Retro VHS 1984, Cyberpunk HUD, Comic Book Pop Art, Documentary Crisp, Minimal Subtitles, and Karaoke Sweeps.
* **8 Dynamic Motion Engines:** `pop-bounce`, `scale-punch`, `karaoke-sweep`, `glow-pulse`, `3d-flip`, `typewriter`, `fade-up`, and `wiggle`.
* **Interactive Transcript Editor:** Click any word to edit spelling inline, click the scissors icon to cut words and their corresponding video frames, or toggle silence badges.
* **Contextual Emojis:** Integrates with local `Ollama` (`llama3.2:3b`) to synthesize semantic Unicode emojis (👋, ✨, ⚡, 🚀, 💻, 🔥).
* **Custom Preset Saving:** Save your custom font, stroke, shadow, box background, and animation speeds to your local library.

### 3. 🎙️ AutoPodcast (Multi-Camera Diarization)
* Uses `pyannote.audio` local speaker diarization to classify speakers.
* Maps **Camera 1 (Host)** to Audio Track A1, **Camera 2 (Guest)** to Audio Track A2, and **Camera 3 (Wide Shot)** to simultaneous cross-talk or laughter.
* Enforces minimum shot durations (e.g. 2.5s) to avoid nauseating rapid cuts.

### 4. 🔍 AutoZoom (Dynamic Jump Cuts)
* Generates subtle 1.15x punch-in zooms on key topic starts, sentence changes, or emotional shifts.
* Automatically writes Premiere Pro Motion Scale & Position keyframes.

### 5. 📱 AutoResize (9:16 Vertical Reframing)
* Uses `OpenCV` + `YOLOv8-face` to track speaker faces across frames.
* Applies dynamic pan & scan keyframes to keep the subject centered in 9:16 vertical sequences for TikTok, Instagram Reels, and YouTube Shorts.

### 6. 🤫 AutoCensor (Profanity Filter)
* Compares audio timecodes against a local dictionary to place 1kHz audio bleep tones or clean audio mutes.

---

## System Architecture

```
┌────────────────────────────────────────────────────────┐
│               Adobe Premiere Pro Timeline              │
│     (Video Tracks V1-V3, Audio Tracks A1-A4, Markers)  │
└──────────────────────────▲─────────────────────────────┘
                           │
                           │ ExtendScript C++ Bridge ($._FlowState)
                           │ Native Ticks: 254016000000 / sec
                           │
┌──────────────────────────▼─────────────────────────────┐
│       FlowState AI CEP Panel (HTML5 / React / Vite)     │
│        • Action-First AutoCut Module Grid              │
│        • Interactive Transcript & Word Cutter          │
│        • Real-Time HTML5 Canvas Animation Previewer    │
│        • 100+ Preset Library & Style Customizer        │
└──────────────────────────▲─────────────────────────────┘
                           │
                           │ Bidirectional WebSockets (ws://127.0.0.1:8000/ws/stream)
                           │ Auto Port Fallback (8000 -> 8001 -> 8002)
                           │
┌──────────────────────────▼─────────────────────────────┐
│          Local Python 3.12 FastAPI Microservice        │
│  ┌──────────────────────────────────────────────────┐  │
│  │ ffmpeg-python   ── Multi-Track OBS Audio Demux   │  │
│  │ silero-vad      ── Sub-ms Silence Excision       │  │
│  │ faster-whisper  ── Word-Level Timestamps (CUDA)  │  │
│  │ pyannote.audio  ── Speaker Diarization           │  │
│  │ ultralytics     ── YOLOv8-face 9:16 Centering    │  │
│  │ Ollama          ── Contextual Unicode Emojis     │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

---

## Automated 1-Click Windows Setup

The repository includes a self-elevating setup script that automates all manual Windows configuration:

```bash
# 1. Clone the repository
git clone https://github.com/your-username/flowstate-ai.git
cd flowstate-ai

# 2. Run the automated installer as Administrator
setup_flowstate_windows.bat
```

### What `setup_flowstate_windows.bat` does automatically:
1. **Self-Elevates** to Administrator privileges via Windows UAC.
2. **Enables `PlayerDebugMode = 1`** across Windows Registry keys (`CSXS.9` through `CSXS.16` in both `HKCU` and `HKLM`).
3. **Deploys the extension** to `%APPDATA%\Adobe\CEP\extensions\FlowStateAI`.
4. **Verifies/Installs Python 3.12** silently via `winget` if not detected.
5. **Creates the virtual environment** at `backend\venv` and installs all AI dependencies (`pip install -r backend\requirements.txt`).
6. **Creates a Desktop Shortcut** ("FlowState AI Daemon") and silent background launcher.

---

## macOS Setup

```bash
# 1. Enable Adobe CEP PlayerDebugMode in macOS defaults
defaults write com.adobe.CSXS.10 PlayerDebugMode 1
defaults write com.adobe.CSXS.11 PlayerDebugMode 1
defaults write com.adobe.CSXS.12 PlayerDebugMode 1

# 2. Create CEP directory & link extension
mkdir -p "$HOME/Library/Application Support/Adobe/CEP/extensions/FlowStateAI"
cp -R CSXS jsx extension index.html "$HOME/Library/Application Support/Adobe/CEP/extensions/FlowStateAI/"

# 3. Setup Python backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python main.py
```

---

## How to Use in Premiere Pro

1. Launch **Adobe Premiere Pro** (2020 or higher).
2. Open any project with an active sequence.
3. In the top menu bar, click:  
   **Window > Extensions > FlowState AI (AutoCut Suite)**.
4. Select what you would like to edit first (*AutoCut Silences*, *AutoCaptions*, *AutoPodcast*, etc.).
5. Adjust settings or pick a preset, then click **Execute** to inject cuts and graphic clips directly into your timeline!

---

## Supported File Formats & Audio Tracks

* **Video Formats:** `.mp4`, `.mkv`, `.mov`, `.avi`, `.webm`
* **Audio Formats:** `.wav`, `.mp3`, `.aac`, `.m4a`, `.flac`
* **OBS Studio Multi-Track:** Automatically isolates microphone tracks (e.g. Track 1 Host, Track 2 Guest/Discord, Track 3 Game/Desktop) without manual re-encoding.

---

## Local AI Tech Stack & Dependencies

| Task | Engine | License |
| :--- | :--- | :--- |
| **Speech-to-Text** | `faster-whisper` (`large-v3-turbo`) | MIT |
| **Silence Detection** | `silero-vad` v4 | MIT |
| **Multicam Diarization** | `pyannote.audio` | MIT |
| **Face Tracking & Reframing** | `OpenCV` + `ultralytics` (`YOLOv8-face`) | AGPL / Apache |
| **Audio Extraction** | `ffmpeg-python` | MIT |
| **Local Emoji Synthesis** | `Ollama` (`llama3.2:3b`) | MIT |
| **Host Extensibility** | Adobe CEP 10.0 + ExtendScript C++ DOM | Apache 2.0 |
| **Frontend Panel** | React 19, TypeScript, Tailwind CSS, Vite | MIT |

---

## Troubleshooting

### Panel does not appear under Window > Extensions
* Make sure `PlayerDebugMode` is set to `1` in the Windows Registry (`HKEY_CURRENT_USER\Software\Adobe\CSXS.10` through `CSXS.16`). Running `setup_flowstate_windows.bat` as Administrator resolves this automatically.
* Verify the extension folder exists at:  
  `%APPDATA%\Adobe\CEP\extensions\FlowStateAI\CSXS\manifest.xml`.

### Port Conflict on 8000
* FlowState AI has automatic port resolution built-in: if port `8000` is in use, it will automatically probe and bind to `8001`, `8002`, or `8003`.

### GPU vs CPU Mode
* PyTorch automatically leverages your NVIDIA GPU if CUDA is available. On systems without an NVIDIA GPU, it falls back to CPU vectorization (AVX-512 / OpenVINO).

---

## License

This project is licensed under the Apache 2.0 License. All integrated models (`faster-whisper`, `silero-vad`, `ffmpeg-python`) are 100% open-source and free for commercial and personal video editing.
