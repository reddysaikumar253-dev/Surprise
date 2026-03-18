'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TypewriterText } from '@/components/ui/TypewriterText';
import { DEFAULT_LOVE_LETTER } from '@/lib/seeds';
import { ChevronRight } from 'lucide-react';

interface LetterData {
  paragraphs: string[];
  signoff: string;
  recipientName: string;
}

export function LoveLetterCard() {
  const [letter, setLetter] = useState<LetterData>(DEFAULT_LOVE_LETTER);
  const [currentPara, setCurrentPara] = useState(0);
  const [allDone, setAllDone] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/love-letter')
      .then(r => r.json())
      .then(d => { if (d.letter?.paragraphs?.length) setLetter(d.letter); })
      .catch(() => { });
  }, []);

  const handleParaComplete = () => {
    if (currentPara < letter.paragraphs.length - 1) {
      setTimeout(() => setCurrentPara(p => p + 1), 600);
    } else {
      setTimeout(() => setAllDone(true), 800);
    }
  };

  return (
    <section className="relative z-10 w-full max-w-md mx-auto px-6 pb-32">
      <div
        className="rounded-3xl p-8 shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #FFB6C1 0%, #FF69B4 100%)',
          boxShadow: '0 20px 60px rgba(233,30,99,0.3)',
        }}
      >
        {/* Heart icon */}
        <div className="flex justify-center mb-6">
          <span className="text-5xl animate-heartPulse select-none">💗</span>
        </div>

        {/* Letter paragraphs */}
        <div className="space-y-4">
          {letter.paragraphs.slice(0, currentPara + 1).map((para, i) => (
            <p
              key={i}
              className="font-body text-white leading-relaxed text-base"
            >
              {i < currentPara ? (
                para
              ) : (
                <TypewriterText
                  text={para}
                  speed={28}
                  startDelay={i === 0 ? 300 : 0}
                  onComplete={i === currentPara ? handleParaComplete : undefined}
                  showCursor={i === currentPara && !allDone}
                />
              )}
            </p>
          ))}
        </div>

        {/* Signoff */}
        {allDone && (
          <p
            className="font-script text-white text-2xl mt-6 text-right animate-fadeInUp"
            style={{ animationFillMode: 'both' }}
          >
            {letter.signoff}
          </p>
        )}
      </div>

      {/* One more thing button */}
      <div
        className="flex justify-center mt-10 transition-all duration-700"
        style={{ opacity: allDone ? 1 : 0, transform: allDone ? 'translateY(0)' : 'translateY(20px)' }}
      >
        <button
          onClick={() => router.push('/ending')}
          className="font-body font-semibold text-white px-10 py-4 rounded-full text-base shadow-xl 
  transition-all duration-300 hover:scale-105 active:scale-95 
  flex items-center justify-center gap-2 w-full sm:w-auto"
          style={{ background: '#E91E63', boxShadow: '0 4px 30px rgba(233,30,99,0.4)' }}
        >
          <span>One more thing</span>
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}
