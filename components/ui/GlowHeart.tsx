'use client';

export function GlowHeart() {
  return (
    <div className="flex justify-center mb-8">
      <div
        className="relative flex items-center justify-center w-28 h-28 rounded-full animate-glowPulse"
        style={{
          background: 'rgba(233, 30, 99, 0.15)',
          border: '2px solid rgba(233,30,99,0.4)',
        }}
      >
        {/* Outer halo */}
        <div
          className="absolute inset-0 rounded-full opacity-30 animate-heartPulse"
          style={{
            background: 'radial-gradient(circle, rgba(233,30,99,0.4) 0%, transparent 70%)',
            transform: 'scale(1.4)',
          }}
        />
        <span className="text-6xl animate-heartPulse select-none" role="img" aria-label="heart">
          💗
        </span>
      </div>
    </div>
  );
}
