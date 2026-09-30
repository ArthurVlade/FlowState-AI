/**
 * Adobe Premiere Pro CEP CSInterface Bridge Service
 */

interface CSInterfaceInstance {
  evalScript: (script: string, callback?: (result: string) => void) => void;
  getHostEnvironment: () => { appId: string; appVersion: string };
  getCurrentApiVersion: () => { major: number; minor: number };
}

declare global {
  interface Window {
    CSInterface?: new () => CSInterfaceInstance;
    FlowStateBridge?: unknown;
  }
}

class CEPBridge {
  private csInterface: CSInterfaceInstance | null = null;
  public isRunningInCEP: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && typeof window.CSInterface === 'function') {
      try {
        this.csInterface = new window.CSInterface();
        this.isRunningInCEP = true;
      } catch (e) {
        console.warn('CEP CSInterface initialization error:', e);
      }
    }
  }

  public getActiveSequence(): Promise<{ name: string; fps: number; width: number; height: number }> {
    return new Promise((resolve) => {
      if (this.csInterface) {
        this.csInterface.evalScript('$._FlowState.getActiveSequence()', (res) => {
          try {
            const data = JSON.parse(res);
            if (data.error) {
              resolve({ name: 'Sequence_01 (Simulated)', fps: 29.97, width: 3840, height: 2160 });
            } else {
              resolve(data);
            }
          } catch {
            resolve({ name: 'Sequence_01 (Simulated)', fps: 29.97, width: 3840, height: 2160 });
          }
        });
      } else {
        // Standalone browser preview simulation
        resolve({
          name: 'Main_Podcast_Master_4K [29.97fps]',
          fps: 29.97,
          width: 3840,
          height: 2160,
        });
      }
    });
  }

  public evalScript(script: string): Promise<string> {
    return new Promise((resolve) => {
      if (this.csInterface) {
        this.csInterface.evalScript(script, (result) => {
          resolve(result);
        });
      } else {
        resolve(JSON.stringify({ success: true, simulated: true }));
      }
    });
  }
}

export const cepBridge = new CEPBridge();
