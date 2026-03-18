import { FloatingParticles } from '@/components/ui/FloatingParticles';
import { HeroSection } from '@/components/sections/HeroSection';
// import { GalleryGrid } from '@/components/sections/GalleryGrid';

export default function BirthdayPage() {
  return (
    <main
      className="relative min-h-screen w-full overflow-x-hidden page-enter"
      style={{ background: '#FEFAE0' }}
    >
      {/* Floating hearts & butterflies */}
      <FloatingParticles count={28} />

      {/* Subtle top vignette */}
      <div
        className="fixed top-0 left-0 right-0 h-24 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to bottom, rgba(254,250,224,0.6) 0%, transparent 100%)',
        }}
      />

      {/* Hero */}
      <HeroSection />

      {/* Divider wave */}
      <div className="relative z-10 w-full overflow-hidden leading-none" style={{ height: '60px' }}>
        <svg
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M0,30 C300,60 900,0 1200,30 L1200,60 L0,60 Z"
            fill="rgba(233,30,99,0.06)"
          />
        </svg>
      </div>

      {/* Gallery */}
      {/* <GalleryGrid /> */}
    </main>
  );
}
