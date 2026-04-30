import { useState, useCallback, useRef } from 'react';

/**
 * A custom hook to simulate a complex background process (like scraping or AI analysis)
 * for demonstration purposes.
 */
export function useSimulation() {
  const [isSimulating, setIsSimulating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'idle' | 'running' | 'completed' | 'error'>('idle');
  const [logs, setLogs] = useState<string[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const addLog = (message: string) => {
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${message}`, ...prev].slice(0, 5));
  };

  const startSimulation = useCallback((steps: { message: string; duration: number }[], onComplete?: () => void) => {
    if (isSimulating) return;

    setIsSimulating(true);
    setStatus('running');
    setProgress(0);
    setLogs([]);

    let currentStep = 0;
    const totalSteps = steps.length;

    const runStep = () => {
      if (currentStep >= totalSteps) {
        setStatus('completed');
        setIsSimulating(false);
        setProgress(100);
        addLog("All tasks completed successfully.");
        if (onComplete) onComplete();
        return;
      }

      const step = steps[currentStep];
      addLog(step.message);
      
      const stepIncrement = 100 / totalSteps;
      const startProgress = currentStep * stepIncrement;
      
      let stepProgress = 0;
      const stepInterval = setInterval(() => {
        stepProgress += 10;
        if (stepProgress >= 100) {
          clearInterval(stepInterval);
          currentStep++;
          runStep();
        } else {
          setProgress(startProgress + (stepProgress / 100) * stepIncrement);
        }
      }, step.duration / 10);
    };

    runStep();
  }, [isSimulating]);

  const resetSimulation = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsSimulating(false);
    setProgress(0);
    setStatus('idle');
    setLogs([]);
  };

  return {
    isSimulating,
    progress,
    status,
    logs,
    startSimulation,
    resetSimulation
  };
}
