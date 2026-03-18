'use client';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  emoji: string;
  left: number;
  duration: number;
  delay: number;
  size: number;
  drift: number;
}

const EMOJIS = ['❤️', '💕', '💝', '🦋', '💖', '🌸', '💗', '✨'];

export function FloatingParticles({ count = 20 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generated: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      left: Math.random() * 100,
      duration: 8 + Math.random() * 8,
      delay: Math.random() * 10,
      size: 14 + Math.floor(Math.random() * 16),
      drift: Math.random() * 60 - 30, // 👈 horizontal movement (-30px to +30px)
    }));
    setParticles(generated);
  }, [count]);

  return (
    <>
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute animate-floatUp select-none"
            style={{
              left: `${p.left}%`,
              bottom: '-40px', // 👈 start below screen
              fontSize: `${p.size}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              '--drift': `${p.drift}px`, // 👈 custom variable
              willChange: 'transform, opacity',
            } as React.CSSProperties}
          >
            {p.emoji}
          </span>
        ))}
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) translateX(0) scale(0.8);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateY(-110vh) translateX(var(--drift)) scale(1.2);
            opacity: 0;
          }
        }

        .animate-floatUp {
          animation-name: floatUp;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </>
  );
}