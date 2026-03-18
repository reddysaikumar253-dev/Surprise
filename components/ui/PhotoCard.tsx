'use client';
import { useRef, useState } from 'react';

interface PhotoCardProps {
  imageUrl: string;
  quote: string;
  caption: string;
  index: number;
  onUpload?: (index: number, dataUrl: string) => void;
}

const GRADIENTS = [
  'linear-gradient(135deg, #f8b4c8, #fce4ec)',
  'linear-gradient(135deg, #ffccbc, #ff8a65)',
  'linear-gradient(135deg, #f8bbd0, #e91e63)',
  'linear-gradient(135deg, #fce4ec, #f48fb1)',
  'linear-gradient(135deg, #ff80ab, #ff4081)',
  'linear-gradient(135deg, #ffcdd2, #ef9a9a)',
];

export function PhotoCard({ imageUrl, quote, caption, index, onUpload }: PhotoCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [active, setActive] = useState(false);
  const isEmpty = !imageUrl;

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = e => {
      const dataUrl = e.target?.result as string;
      onUpload?.(index, dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div
      className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.03]"
      onDrop={handleDrop}
      onDragOver={e => e.preventDefault()}
      onClick={() => {
        if (!isEmpty) {
          setActive(prev => !prev);
        } else {
          inputRef.current?.click();
        }
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />

      {/* Placeholder */}
      {isEmpty ? (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 transition-all duration-300 group-hover:brightness-90"
          style={{ background: GRADIENTS[index % GRADIENTS.length] }}
        >
          <span className="text-4xl select-none">📸</span>
          <span className="text-xs font-body text-white/70 font-semibold tracking-wide">
            Tap to add photo
          </span>
        </div>
      ) : (
        <>
          <img
            src={imageUrl}
            alt={caption}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </>
      )}

      {/* Quote Overlay */}
      {!isEmpty && (
        <div
          className={`absolute inset-0 flex flex-col items-center justify-end p-4 transition-all duration-300
            ${active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
          style={{
            background: 'linear-gradient(to top, rgba(233,30,99,0.85) 0%, rgba(233,30,99,0.2) 60%, transparent 100%)',
          }}
        >
          <p
            className={`font-script text-white text-center text-base leading-snug drop-shadow-lg transform transition-transform duration-300
            ${active ? 'translate-y-0' : 'translate-y-4 group-hover:translate-y-0'}`}
          >
            &ldquo;{quote}&rdquo;
          </p>
        </div>
      )}

      {/* Caption */}
      {!isEmpty && (
        <div
          className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-body text-white transition-opacity duration-300
            ${active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
          style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
        >
          {caption}
        </div>
      )}
    </div>
  );
}