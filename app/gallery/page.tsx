'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GalleryGrid } from '@/components/sections/GalleryGrid';

export default function GalleryPage() {
    const router = useRouter();

    const [subtextDone, setSubtextDone] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setSubtextDone(true), 300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <main className="min-h-screen w-full flex flex-col items-center justify-start pt-10 pb-20 px-4">

            <GalleryGrid />

            {/* Button Section */}
            <div
                className="flex flex-col items-center gap-4 mt-0 w-full transition-all duration-700 pt-0 pb-4"
                style={{
                    opacity: subtextDone ? 1 : 0,
                    transform: subtextDone
                        ? 'translateY(-10px)'
                        : 'translateY(20px)',
                }}
            >
                <button
                    onClick={() => router.push('/cuteness-meter')}
                    className="relative overflow-hidden font-body font-semibold text-white px-8 sm:px-10 py-4 rounded-full text-base sm:text-lg shadow-xl 
          transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95 
          w-full sm:w-auto text-center"
                    style={{
                        background: 'linear-gradient(135deg, #E91E63, #FF8A65, #E91E63)',
                        backgroundSize: '200% auto',
                        animation: 'shimmer 2.5s linear infinite',
                    }}
                >
                    Let's Measure Your Cuteness 💕
                </button>
            </div>

            {/* shimmer animation */}
            <style>{`
        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>

        </main>
    );
}