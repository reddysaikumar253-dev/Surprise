'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { StarfieldBackground } from '@/components/ui/StarfieldBackground';

type Phase = 'intro' | 'scanning' | 'result';

const SCAN_STEPS = [
  { label: 'Detecting smile intensity...', emoji: '😊', duration: 900 },
  { label: 'Measuring eye sparkle...', emoji: '✨', duration: 800 },
  { label: 'Calculating laugh frequency...', emoji: '😂', duration: 1000 },
  { label: 'Analysing heart-melting power...', emoji: '💗', duration: 900 },
  { label: 'Detecting dimple depth...', emoji: '🥰', duration: 700 },
  { label: 'Measuring vibe levels...', emoji: '💫', duration: 850 },
  { label: 'Counting butterflies caused...', emoji: '🦋', duration: 950 },
  { label: 'Compiling final cuteness score...', emoji: '💝', duration: 1100 },
];

const RESULT_TIERS: Record<string, { label: string; desc: string; color: string; emoji: string }> = {
  '100': {
    label: 'MAXIMUM CUTENESS',
    desc: "Off the charts. Scientists are baffled. You broke the meter. There is literally no one cuter.",
    color: '#E91E63',
    emoji: '👑',
  },
};

const FINAL_SCORE = 100;

export default function CutenessMeterPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>('intro');
  const [stepIndex, setStepIndex] = useState(0);
  const [scanProgress, setScanProgress] = useState(0);
  const [displayScore, setDisplayScore] = useState(0);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; emoji: string; delay: number }[]>([]);
  const [pulseRing, setPulseRing] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (phase === 'result') {
      const emojis = ['💕', '❤️', '✨', '💗', '🌸', '💖', '🦋', '⭐'];
      const pts = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -10 - Math.random() * 30,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        delay: Math.random() * 2,
      }));
      setParticles(pts);

      let current = 0;
      const counter = setInterval(() => {
        current += 2;
        setDisplayScore(Math.min(current, FINAL_SCORE));
        if (current >= FINAL_SCORE) clearInterval(counter);
      }, 25);
      return () => clearInterval(counter);
    }
  }, [phase]);

  const startScan = () => {
    setPhase('scanning');
    setStepIndex(0);
    setScanProgress(0);

    let step = 0;
    const totalDuration = SCAN_STEPS.reduce((a, s) => a + s.duration, 0);
    let elapsed = 0;

    const runStep = () => {
      if (step >= SCAN_STEPS.length) {
        setPhase('result');
        return;
      }
      setStepIndex(step);
      setPulseRing(true);
      setTimeout(() => setPulseRing(false), 400);

      const stepDur = SCAN_STEPS[step].duration;
      elapsed += stepDur;
      setScanProgress(Math.round((elapsed / totalDuration) * 100));

      step++;
      intervalRef.current = setTimeout(runStep, stepDur);
    };

    runStep();
  };

  useEffect(() => {
    return () => { if (intervalRef.current) clearTimeout(intervalRef.current); };
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden page-enter flex flex-col items-center px-4 sm:px-0">
      <StarfieldBackground count={140} />

      {phase === 'result' && (
        <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
          {particles.map(p => (
            <span
              key={p.id}
              className="absolute text-xl sm:text-2xl animate-floatUp select-none"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                animationDuration: `${2.5 + Math.random() * 2}s`,
                animationDelay: `${p.delay}s`,
              }}
            >
              {p.emoji}
            </span>
          ))}
        </div>
      )}

      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 text-center w-full max-w-md mx-auto">

        {phase === 'intro' && (
          <div className="flex flex-col items-center gap-8 sm:gap-6 animate-fadeInUp">

            <div
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center text-5xl sm:text-6xl animate-heartPulse"
              style={{
                background: 'rgba(233,30,99,0.15)',
                border: '2px solid rgba(233,30,99,0.4)',
                boxShadow: '0 0 40px rgba(233,30,99,0.3)',
              }}
            >
              🌡️
            </div>

            <h1 className="font-script text-4xl sm:text-5xl" style={{ color: '#FFB6C1' }}>
              Cuteness Meter
            </h1>

            <p className="font-body text-sm sm:text-base leading-relaxed" style={{ color: 'rgba(255,182,193,0.75)' }}>
              A highly scientific instrument designed to measure exactly one person&apos;s cuteness level.
            </p>

            <div
              className="w-full rounded-2xl p-5 text-left"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(233,30,99,0.25)',
              }}
            >
              <p className="font-body text-sm mb-3 font-semibold tracking-widest uppercase" style={{ color: 'rgba(255,182,193,0.5)' }}>
                Scanning parameters
              </p>
              {SCAN_STEPS.slice(0, 5).map((s, i) => (
                <p key={i} className="font-body text-sm py-1 flex gap-2" style={{ color: 'rgba(255,182,193,0.65)' }}>
                  <span>{s.emoji}</span> {s.label}
                </p>
              ))}
            </div>

            <button
              onClick={startScan}
              className="font-body font-semibold text-white px-10 py-5 sm:py-4 rounded-full text-lg shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 mt-2 w-full sm:w-auto"
              style={{ background: '#E91E63', boxShadow: '0 4px 30px rgba(233,30,99,0.5)' }}
            >
              Start Scanning 🔍
            </button>
          </div>
        )}

        {/* Remaining code unchanged */}

        {/* ── SCANNING ──────────────────────────────────────── */}
        {phase === 'scanning' && (
          <div className="flex flex-col items-center gap-8 w-full animate-fadeInUp">
            <h2 className="font-script text-4xl" style={{ color: '#FFB6C1' }}>
              Scanning...
            </h2>

            {/* Animated scan circle */}
            <div className="relative flex items-center justify-center">
              <div
                className="w-44 h-44 rounded-full flex items-center justify-center text-7xl transition-transform duration-300"
                style={{
                  background: 'rgba(233,30,99,0.12)',
                  border: `3px solid rgba(233,30,99,${0.3 + (scanProgress / 100) * 0.6})`,
                  boxShadow: pulseRing
                    ? '0 0 60px rgba(233,30,99,0.7), 0 0 120px rgba(233,30,99,0.3)'
                    : '0 0 30px rgba(233,30,99,0.3)',
                  transform: pulseRing ? 'scale(1.06)' : 'scale(1)',
                  transition: 'all 0.3s ease',
                }}
              >
                {SCAN_STEPS[stepIndex]?.emoji}
              </div>

              {/* Rotating ring */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  border: '2px solid transparent',
                  borderTopColor: '#E91E63',
                  animation: 'spin 1.2s linear infinite',
                }}
              />
            </div>

            {/* Current step label */}
            <p
              className="font-body text-base min-h-[2rem] transition-all duration-300"
              style={{ color: '#FFB6C1' }}
            >
              {SCAN_STEPS[stepIndex]?.label}
            </p>

            {/* Progress bar */}
            <div className="w-full max-w-xs">
              <div className="flex justify-between mb-2">
                <span className="font-body text-xs" style={{ color: 'rgba(255,182,193,0.5)' }}>Progress</span>
                <span className="font-body text-xs font-semibold" style={{ color: '#FFB6C1' }}>{scanProgress}%</span>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${scanProgress}%`,
                    background: 'linear-gradient(90deg, #E91E63, #FF80AB)',
                  }}
                />
              </div>
            </div>

            {/* Completed steps */}
            <div className="w-full space-y-1">
              {SCAN_STEPS.slice(0, stepIndex).map((s, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-4 py-2 rounded-xl"
                  style={{ background: 'rgba(233,30,99,0.08)' }}
                >
                  <span className="text-green-400 text-sm">✓</span>
                  <span className="font-body text-sm" style={{ color: 'rgba(255,182,193,0.6)' }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── RESULT ────────────────────────────────────────── */}
        {phase === 'result' && (
          <div className="flex flex-col items-center gap-6 sm:gap-6 pt-10 sm:pt-0 animate-fadeInUp">

            <p className="font-body text-xs sm:text-sm tracking-widest uppercase font-semibold"
              style={{ color: 'rgba(255,182,193,0.5)' }}>
              Scan Complete ✓
            </p>

            <h1
              className="font-script text-3xl sm:text-5xl leading-tight"
              style={{ color: '#FFB6C1' }}
            >
              Results are in!
            </h1>

            {/* Score ring */}
            <div className="relative flex items-center justify-center my-2 sm:my-4">
              <svg
                viewBox="0 0 200 200"
                className="w-32 h-32 sm:w-[180px] sm:h-[180px] rotate-[-90deg]"
              >
                <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(233,30,99,0.15)" strokeWidth="10" />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="url(#scoreGrad)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 80}`}
                  strokeDashoffset={`${2 * Math.PI * 80 * (1 - displayScore / 100)}`}
                />
                <defs>
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#E91E63" />
                    <stop offset="100%" stopColor="#FF80AB" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute flex flex-col items-center">
                <span className="text-3xl sm:text-5xl font-bold" style={{ color: '#E91E63' }}>
                  {displayScore}
                </span>
                <span className="text-xs" style={{ color: 'rgba(255,182,193,0.6)' }}>
                  / 100
                </span>
              </div>
            </div>

            {/* Badge */}
            <div
              className="flex flex-col items-center gap-3 w-full rounded-3xl px-5 py-5 sm:px-6 sm:py-6 mt-2"
              style={{
                background: 'linear-gradient(135deg, rgba(233,30,99,0.2), rgba(255,128,171,0.15))',
                border: '1px solid rgba(233,30,99,0.35)',
              }}
            >
              <span className="text-4xl sm:text-5xl">👑</span>
              <h2 className="font-script text-xl sm:text-3xl" style={{ color: '#FFB6C1' }}>
                MAXIMUM CUTENESS
              </h2>
              <p className="font-body text-xs sm:text-sm leading-relaxed text-center px-2"
                style={{ color: 'rgba(255,182,193,0.8)' }}>
                Off the charts. Scientists are baffled. You broke the meter.
                There is literally no one cuter. 💕
              </p>
            </div>

            {/* Score breakdown */}
            <div className="w-full space-y-2">
              {[
                { label: 'Smile Intensity', score: 100, emoji: '😊' },
                { label: 'Eye Sparkle', score: 100, emoji: '✨' },
                { label: 'Heart-Melting Power', score: 100, emoji: '💗' },
                { label: 'Vibe Level', score: 100, emoji: '💫' },
                { label: 'Overall Adorableness', score: 100, emoji: '🥰' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-base w-6">{item.emoji}</span>
                  <span className="font-body text-xs w-36 text-left" style={{ color: 'rgba(255,182,193,0.65)' }}>
                    {item.label}
                  </span>
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${displayScore}%`,
                        background: 'linear-gradient(90deg, #E91E63, #FF80AB)',
                        transition: 'width 1.5s ease',
                        transitionDelay: `${i * 0.15}s`,
                      }}
                    />
                  </div>
                  <span className="font-body text-xs font-bold w-8 text-right" style={{ color: '#FF80AB' }}>
                    {displayScore === 100 ? '100' : `${Math.round(displayScore * 0.95 + Math.random() * 5)}`}
                  </span>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3 w-full mt-2">
              {/* <button
                onClick={() => router.push('/you-are-special')}
                className="px-4 py-2 rounded-full font-body text-sm shadow-md hover:scale-105 transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #ff9a9e, #fad0c4)',
                  color: '#fff',
                }}
              >
                💖 You are special
              </button> */}
              <button
                onClick={() => {
                  setPhase('intro');
                  setDisplayScore(0);
                  setScanProgress(0);
                  setStepIndex(0);
                }}
                className="font-body font-semibold text-white px-8 py-4 rounded-full text-base shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
                style={{ background: '#E91E63', boxShadow: '0 4px 25px rgba(233,30,99,0.4)' }}
              >
                Scan Again 🔄
              </button>
              <button
                onClick={() => router.push('/you-are-special')}
                className="font-body font-semibold px-8 py-4 rounded-full text-base transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: 'rgba(233,30,99,0.12)',
                  border: '1px solid rgba(233,30,99,0.35)',
                  color: '#FFB6C1',
                }}
              >
                💖 You are special
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Spin keyframe */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </main>
  );
}
