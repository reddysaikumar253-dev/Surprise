'use client';

interface RevealCardProps {
  text: string;
  isRevealed: boolean;
  onReveal: () => void;
  index: number;
}

export function RevealCard({ text, isRevealed, onReveal, index }: RevealCardProps) {
  return (
    <button
      onClick={onReveal}
      disabled={isRevealed}
      className="w-full text-left transition-all duration-500 rounded-2xl px-6 py-4 mb-3 cursor-pointer select-none"
      style={{
        background: isRevealed
          ? 'rgba(233,30,99,0.18)'
          : 'rgba(255,255,255,0.05)',
        border: isRevealed
          ? '1px solid rgba(233,30,99,0.5)'
          : '1px solid rgba(255,255,255,0.12)',
        animationDelay: `${index * 0.1}s`,
      }}
    >
      <div className="flex items-center gap-4">
        <span
          className="text-2xl transition-all duration-300 flex-shrink-0"
          style={{ filter: isRevealed ? 'none' : 'grayscale(1) opacity(0.4)' }}
        >
          {isRevealed ? '♥' : '♡'}
        </span>
        <span
          className="font-body text-base transition-all duration-500"
          style={{
            color: isRevealed ? '#FFB6C1' : 'rgba(255,255,255,0.3)',
            fontStyle: isRevealed ? 'italic' : 'normal',
          }}
        >
          {isRevealed ? text : 'Tap to reveal...'}
        </span>
      </div>
    </button>
  );
}
