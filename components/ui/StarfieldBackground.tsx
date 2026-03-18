'use client';
import { useEffect, useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export function StarfieldBackground({ count = 180 }: { count?: number }) {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generated: Star[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 0.5 + Math.random() * 2,
      duration: 2 + Math.random() * 4,
      delay: Math.random() * 5,
    }));
    setStars(generated);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Deep space gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, #2D0035 0%, #1B0035 30%, #0A0015 60%, #000000 100%)',
        }}
      />
      {/* Stars */}
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
      {/* Bottom glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(233,30,99,0.12) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}
