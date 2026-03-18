'use client';
import { useState, useCallback } from 'react';

export function useReveal(count: number) {
  const [revealed, setRevealed] = useState<boolean[]>(Array(count).fill(false));

  const revealCard = useCallback((index: number) => {
    setRevealed(prev => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
  }, []);

  const allRevealed = revealed.every(Boolean);
  const revealedCount = revealed.filter(Boolean).length;

  return { revealed, revealCard, allRevealed, revealedCount };
}
