'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TypewriterText } from '@/components/ui/TypewriterText';

export function HeroSection() {
  const [headingDone, setHeadingDone] = useState(false);
  const [subtextDone, setSubtextDone] = useState(false);
  const router = useRouter();

  return (
    <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
      {/* Main heading */}
      <h1
        className="font-script text-5xl sm:text-6xl md:text-7xl mb-6 leading-tight"
        style={{ color: '#5C3D2E' }}
      >
        <TypewriterText
          text="Happy Birthday, Ammu! 💝"
          speed={70}
          startDelay={400}
          onComplete={() => setHeadingDone(true)}
        />
      </h1>

      {/* Subtext */}
      <div
        className="transition-all duration-700 max-w-md"
        style={{ opacity: headingDone ? 1 : 0, transform: headingDone ? 'translateY(0)' : 'translateY(16px)' }}
      >
        <p
          className="font-body text-lg sm:text-xl mb-8 leading-relaxed"
          style={{ color: '#8B5E52' }}
        >
          <TypewriterText
            text="Today is all about celebrating you and the joy you bring to my life"
            speed={35}
            startDelay={headingDone ? 200 : 99999}
            onComplete={() => setSubtextDone(true)}
            showCursor={false}
          />
        </p>

        {/* Bouncing hearts row */}
        <div
          className="flex justify-center gap-3 mb-10 text-2xl transition-all duration-500"
          style={{ opacity: subtextDone ? 1 : 0 }}
        >
          {['❤️', '💕', '🦋', '💕', '❤️'].map((emoji, i) => (
            <span
              key={i}
              className="animate-bounceGentle select-none"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {emoji}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div
          className="flex flex-col items-center gap-3 transition-all duration-700"
          style={{
            opacity: subtextDone ? 1 : 0,
            transform: subtextDone ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <button
            onClick={() => router.push('/cuteness-meter')}
            className="relative overflow-hidden font-body font-semibold text-white px-10 py-4 rounded-full text-lg shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #E91E63, #FF8A65, #E91E63)',
              backgroundSize: '200% auto',
              animation: 'shimmer 2.5s linear infinite',
            }}
          >
            Start the Celebration ✨
          </button>

          {/* <Link
            href="/cuteness-meter"
            className="font-body text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: 'rgba(233,30,99,0.1)',
              border: '1px solid rgba(233,30,99,0.3)',
              color: '#C0604A',
            }}
          >
            🌡️ Measure your cuteness
          </Link> */}
        </div>
      </div>
    </section>
  );
}
