'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

type Phase = 'fade-in' | 'bear' | 'text' | 'extra';

const MESSAGES = [
    "You'll always be special to me",
    "No matter what, no matter when",
    "You're my favourite everything 💕",
];

const FLOATING = ['💕', '🌸', '✨', '💗', '🦋', '⭐', '💖', '🌷'];

export default function EndingPage() {
    const router = useRouter();

    const [phase, setPhase] = useState<Phase>('fade-in');
    const [msgIndex, setMsgIndex] = useState(0);
    const [displayMsg, setDisplayMsg] = useState('');
    const [particles, setParticles] = useState<any[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    /* Floating emojis */
    useEffect(() => {
        const pts = Array.from({ length: 18 }, (_, i) => ({
            id: i,
            emoji: FLOATING[Math.floor(Math.random() * FLOATING.length)],
            x: Math.random() * 100,
            dur: 6 + Math.random() * 5,
            delay: Math.random() * 5,
            size: 14 + Math.random() * 8,
        }));
        setParticles(pts);
    }, []);

    /* Phase flow */
    useEffect(() => {
        if (phase === 'fade-in') {
            timerRef.current = setTimeout(() => setPhase('bear'), 500);
        } else if (phase === 'bear') {
            timerRef.current = setTimeout(() => setPhase('text'), 1000);
        }

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [phase]);

    /* ✅ FIXED TYPEWRITER (NO SKIPPING) */
    useEffect(() => {
        if (phase !== 'text') return;

        const msg = MESSAGES[msgIndex];
        if (!msg) return;

        let i = 0;
        setDisplayMsg('');

        const interval = setInterval(() => {
            i++;
            setDisplayMsg(msg.slice(0, i));

            if (i >= msg.length) {
                clearInterval(interval);

                setTimeout(() => {
                    if (msgIndex < MESSAGES.length - 1) {
                        setMsgIndex(prev => prev + 1);
                    } else {
                        setPhase('extra');
                    }
                }, 1200);
            }
        }, 50);

        return () => clearInterval(interval);
    }, [msgIndex, phase]);

    return (
        <main
            className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden"
            style={{
                background: 'radial-gradient(circle at center, #1a001a, #000)',
            }}
        >

            {/* Floating emojis */}
            <div className="absolute inset-0 pointer-events-none">
                {particles.map(p => (
                    <span
                        key={p.id}
                        className="absolute"
                        style={{
                            left: `${p.x}%`,
                            bottom: 0,
                            fontSize: `${p.size}px`,
                            animation: `floatUp ${p.dur}s ${p.delay}s linear infinite`,
                        }}
                    >
                        {p.emoji}
                    </span>
                ))}
            </div>

            {/* Content */}
            <div className="flex flex-col items-center text-center gap-6 w-full max-w-sm">

                {/* 🧸 Teddy */}
                <img
                    src="/photos/teddy.webp"
                    alt="teddy"
                    className="w-36 sm:w-48 md:w-56 drop-shadow-2xl animate-bounce"
                    style={{
                        opacity: phase === 'fade-in' ? 0 : 1,
                        transition: 'all 0.8s ease',
                    }}
                />

                {/* 💬 Text */}
                <p className="text-lg sm:text-2xl font-script text-pink-200 min-h-[60px] leading-relaxed px-2">
                    {displayMsg}
                    {phase === 'text' && (
                        <span className="ml-1 animate-pulse">|</span>
                    )}
                </p>

                {/* 💖 Final Section */}
                {phase === 'extra' && (
                    <div className="flex flex-col gap-4 mt-4 animate-fadeIn">

                        <p
                            className="font-body text-sm leading-relaxed max-w-xs px-4 text-center"
                            style={{
                                color: 'rgba(240,200,208,0.75)',
                                animation: 'fadeInUp 0.8s 0.3s ease both',
                                opacity: 0,
                            }}
                        >
                            Thank you for being in my life.
                            Thank you for being you.
                            No words will ever be enough —
                            but I hope this made you smile, even a little. 💕
                        </p>

                        <div className="flex gap-3 text-2xl justify-center">
                            {['❤️', '💕', '🌸', '💖'].map((e, i) => (
                                <span key={i} className="animate-bounce">
                                    {e}
                                </span>
                            ))}
                        </div>

                        <div className="flex flex-col gap-3 mt-3 w-full px-4">
                            <button
                                onClick={() => router.push('/')}
                                className="bg-pink-600 text-white py-3 rounded-full shadow-lg hover:scale-105 transition"
                            >
                                Start Over 🌸
                            </button>

                            <button
                                onClick={() => router.push('/love-letter')}
                                className="border border-pink-400 text-pink-200 py-3 rounded-full hover:bg-pink-500/10 transition"
                            >
                                Read The letter Again 🌹
                            </button>
                        </div>

                    </div>
                )}

            </div>

            {/* Animations */}
            <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </main>
    );
}