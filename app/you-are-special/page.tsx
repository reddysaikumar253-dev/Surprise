'use client';
import Link from 'next/link';
import { StarfieldBackground } from '@/components/ui/StarfieldBackground';
import { GlowHeart } from '@/components/ui/GlowHeart';
import { ComplimentCards } from '@/components/sections/ComplimentCards';

export default function YouAreSpecialPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden page-enter">
      {/* Cosmic starfield */}
      <StarfieldBackground count={180} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center pt-16 pb-10 w-full">
        {/* Glowing heart hero */}
        <GlowHeart />

        {/* Heading */}
        <h1
          className="font-script text-5xl sm:text-6xl mb-3 text-center"
          style={{ color: '#FFB6C1' }}
        >
          Just for you
        </h1>

        <p
          className="font-body text-sm mb-4 text-center tracking-widest uppercase"
          style={{ color: 'rgba(255,182,193,0.55)', letterSpacing: '0.18em' }}
        >
          Tap each one to reveal
        </p>

        {/* Cuteness Meter teaser
        <Link
          href="/cuteness-meter"
          className="mb-8 flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            background: 'rgba(233,30,99,0.15)',
            border: '1px solid rgba(233,30,99,0.35)',
            color: '#FFB6C1',
          }}
        >
          🌡️ Measure your cuteness
        </Link> */}

        {/* Compliment reveal cards */}
        <ComplimentCards />
      </div>
    </main>
  );
}
