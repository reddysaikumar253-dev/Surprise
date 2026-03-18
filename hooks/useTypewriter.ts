'use client';
import { useState, useEffect } from 'react';

interface UseTypewriterOptions {
  text: string;
  speed?: number;
  startDelay?: number;
  onComplete?: () => void;
}

export function useTypewriter({ text, speed = 60, startDelay = 0, onComplete }: UseTypewriterOptions) {
  const [displayText, setDisplayText] = useState('');
  const [isDone, setIsDone] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const delayTimer = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(delayTimer);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;
    if (displayText.length >= text.length) {
      setIsDone(true);
      onComplete?.();
      return;
    }
    const timer = setTimeout(() => {
      setDisplayText(text.slice(0, displayText.length + 1));
    }, speed);
    return () => clearTimeout(timer);
  }, [started, displayText, text, speed, onComplete]);

  useEffect(() => {
    setDisplayText('');
    setIsDone(false);
    setStarted(false);
  }, [text]);

  return { displayText, isDone };
}
