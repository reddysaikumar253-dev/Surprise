'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RevealCard } from '@/components/ui/RevealCard';
import { useReveal } from '@/hooks/useReveal';
import { DEFAULT_COMPLIMENTS } from '@/lib/seeds';
import { ChevronRight } from 'lucide-react';

interface Compliment {
  text: string;
  order: number;
}

export function ComplimentCards() {
  const [compliments, setCompliments] = useState<Compliment[]>(DEFAULT_COMPLIMENTS);
  const router = useRouter();
  const { revealed, revealCard, allRevealed, revealedCount } = useReveal(compliments.length);

  useEffect(() => {
    fetch('/api/compliments')
      .then(r => r.json())
      .then(d => { if (d.compliments?.length) setCompliments(d.compliments); })
      .catch(() => { });
  }, []);

  const showSeeMore = revealedCount >= Math.ceil(compliments.length / 2);

  return (
    <section className="relative z-10 w-full max-w-md mx-auto px-6 pb-32">
      <div className="w-full">
        {compliments.map((c, i) => (
          <div
            key={i}
            className="animate-fadeInUp"
            style={{ animationDelay: `${i * 0.08}s`, animationFillMode: 'both' }}
          >
            <RevealCard
              text={c.text}
              isRevealed={revealed[i]}
              onReveal={() => revealCard(i)}
              index={i}
            />
          </div>
        ))}
      </div>

      {/* Progress hint */}
      {!allRevealed && (
        <p
          className="text-center text-sm mt-4 font-body"
          style={{ color: 'rgba(255,182,193,0.5)' }}
        >
          {revealedCount}/{compliments.length} revealed
        </p>
      )}

      {/* See more button */}
      <div
        className="flex justify-center mt-8 transition-all duration-700"
        style={{ opacity: showSeeMore ? 1 : 0, transform: showSeeMore ? 'translateY(0)' : 'translateY(20px)' }}
      >
        <button
          onClick={() => router.push('/love-letter')}
          className="font-body font-semibold text-white px-10 py-4 rounded-full text-base shadow-xl 
  transition-all duration-300 hover:scale-105 active:scale-95 
  flex items-center justify-center gap-2 w-full sm:w-auto"
          style={{ background: '#E91E63', boxShadow: '0 4px 30px rgba(233,30,99,0.4)' }}
        >
          <span>See more</span>
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}
