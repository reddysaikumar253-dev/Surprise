'use client';

import { useEffect, useState, useCallback } from 'react';
import { PhotoCard } from '@/components/ui/PhotoCard';

const QUOTES = [
  'With you, everything feels right',
  'My favorite person in every universe',
  'Every moment with you is magic',
  'You make ordinary days extraordinary',
  "You're not just my love, you're my peace",
  "Forever wouldn't be enough",
];

const CAPTIONS = ['Us', 'Always', 'Forever', 'My heart', 'Peace', 'Eternity'];

const STORAGE_KEY = 'fy_gallery_photos';

type Photos = (string | null)[];

const DEFAULT_PHOTOS: string[] = [
  '/photos/photo1.jpg',
  '/photos/photo2.jpg',
  '/photos/photo3.jpg',
  '/photos/photo4.jpg',
  '/photos/photo5.jpg',
  '/photos/photo6.jpg',
];

export function GalleryGrid() {
  const [photos, setPhotos] = useState<Photos>(Array(6).fill(null));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: Photos = JSON.parse(saved);
        setPhotos(parsed);
      }
    } catch { }
  }, []);

  const handleUpload = useCallback((index: number, dataUrl: string) => {
    setPhotos(prev => {
      const next = [...prev];
      next[index] = dataUrl;

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch { }

      return next;
    });
  }, []);

  const hasCustomPhotos = photos.some(Boolean);

  return (
    <section className="relative z-10 px-4 sm:px-6 pb-28 sm:pb-24 max-w-2xl mx-auto w-full">

      {/* Heading */}
      <div className="text-center mb-10 sm:mb-8 space-y-3">
        <p className="font-script text-2xl sm:text-4xl leading-tight" style={{ color: '#5C3D2E' }}>
          Our moments together 🌸
        </p>

        <p
          className="font-body text-xs sm:text-sm px-2"
          style={{ color: '#A0806D' }}
        >
          Tap on each photo to feel the love ✨
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-3">
        {Array(6).fill(null).map((_, i) => {
          const image = photos[i] || DEFAULT_PHOTOS[i];

          return (
            <PhotoCard
              key={i}
              imageUrl={image}
              quote={QUOTES[i]}
              caption={CAPTIONS[i]}
              index={i}
              onUpload={handleUpload}
            />
          );
        })}
      </div>

      {/* Clear button */}
      {hasCustomPhotos && mounted && (
        <div className="flex justify-center mt-8 sm:mt-6">
          <button
            onClick={() => {
              setPhotos(Array(6).fill(null));
              localStorage.removeItem(STORAGE_KEY);
            }}
            className="font-body text-xs px-5 py-3 rounded-full transition-all duration-200 hover:opacity-80"
            style={{
              color: '#B07060',
              border: '1px solid rgba(176,112,96,0.3)',
            }}
          >
            Reset to original photos
          </button>
        </div>
      )}

      {/* Footer */}
      <p className="font-script text-center mt-12 sm:mt-10 text-lg sm:text-xl px-2" style={{ color: '#B07060' }}>
        Made with 💕 just for you
      </p>
    </section>
  );
}