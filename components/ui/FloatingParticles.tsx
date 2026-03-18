'use client';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  emoji: string;
  left: number;
  duration: number;
  delay: number;
  size: number;
}

const EMOJIS = ['❤️', '💕', '💝', '🦋', '💖', '🌸', '💗', '✨'];

export function FloatingParticles({ count = 25 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generated: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      left: Math.random() * 100,
      duration: 8 + Math.random() * 10,
      delay: Math.random() * 12,
      size: 14 + Math.floor(Math.random() * 16),
    }));
    setParticles(generated);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map(p => (
        <span
          key={p.id}
          className="absolute bottom-0 animate-floatUp select-none"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            willChange: 'transform, opacity',
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}
