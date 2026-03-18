import { StarfieldBackground } from '@/components/ui/StarfieldBackground';
import { LoveLetterCard } from '@/components/sections/LoveLetterCard';

export default function LoveLetterPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden page-enter">
      {/* Reuse cosmic background */}
      <StarfieldBackground count={120} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center pt-16 pb-10 w-full">
        {/* Page heading */}
        <h1
          className="font-script text-4xl sm:text-5xl mb-10 text-center px-6"
          style={{ color: '#FFB6C1' }}
        >
          A little note for you 🌹
        </h1>

        {/* The letter card with typewriter */}
        <LoveLetterCard />
      </div>
    </main>
  );
}
