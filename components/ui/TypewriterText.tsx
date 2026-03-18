'use client';
import { useTypewriter } from '@/hooks/useTypewriter';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
  onComplete?: () => void;
  showCursor?: boolean;
}

export function TypewriterText({
  text,
  speed = 60,
  startDelay = 0,
  className = '',
  onComplete,
  showCursor = true,
}: TypewriterTextProps) {
  const { displayText, isDone } = useTypewriter({ text, speed, startDelay, onComplete });

  return (
    <span className={className}>
      {displayText}
      {showCursor && (
        <span
          className={`inline-block w-0.5 h-[1em] ml-0.5 align-middle bg-current ${
            isDone ? 'animate-blink' : 'opacity-100'
          }`}
        />
      )}
    </span>
  );
}
