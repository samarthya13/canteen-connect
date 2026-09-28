import React from 'react';

export type StickyNoteColor = 'yellow' | 'mint' | 'coral' | 'lavender';

interface StickyNoteProps {
  color?: StickyNoteColor;
  title?: string;
  children: React.ReactNode;
  rotation?: number;
  className?: string;
  pinType?: 'pin' | 'tape' | 'clip' | 'none';
  id?: string;
}

export const StickyNote: React.FC<StickyNoteProps> = ({
  color = 'yellow',
  title,
  children,
  rotation = -2,
  className = '',
  pinType = 'tape',
  id
}) => {
  const colorStyles: Record<StickyNoteColor, { bg: string; border: string; tape: string }> = {
    yellow: {
      bg: 'bg-[#FFD166]/90 text-[#1F2937]',
      border: 'border-[#e6b800]/40',
      tape: 'bg-[#fff5cc]/80'
    },
    mint: {
      bg: 'bg-[#a7f3d0] text-[#064e3b]',
      border: 'border-[#34d399]/40',
      tape: 'bg-[#ecfdf5]/80'
    },
    coral: {
      bg: 'bg-[#fed7aa] text-[#7c2d12]',
      border: 'border-[#fb923c]/40',
      tape: 'bg-[#fff7ed]/80'
    },
    lavender: {
      bg: 'bg-[#e0e7ff] text-[#312e81]',
      border: 'border-[#a5b4fc]/40',
      tape: 'bg-[#eef2ff]/80'
    }
  };

  const style = colorStyles[color];

  return (
    <div
      id={id}
      style={{ transform: `rotate(${rotation}deg)` }}
      className={`relative p-4 rounded-md shadow-md transition-transform hover:scale-102 hover:rotate-0 duration-200 border ${style.bg} ${style.border} ${className}`}
    >
      {/* Tape or Pin decoration on top */}
      {pinType === 'tape' && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-white/50 backdrop-blur-[0.5px] border-t border-b border-white/60 shadow-[0_1px_2px_rgba(0,0,0,0.1)] -rotate-2" />
      )}

      {pinType === 'pin' && (
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-[#FF7F6A] shadow-md border border-[#c2410c] relative">
            <div className="w-1.5 h-1.5 rounded-full bg-white/70 absolute top-0.5 left-0.5" />
          </div>
        </div>
      )}

      {pinType === 'clip' && (
        <div className="absolute -top-3 left-6 w-3 h-7 rounded-sm border-2 border-slate-600 bg-transparent" />
      )}

      {title && (
        <div className="font-kalam text-lg sm:text-xl font-bold tracking-wide border-b border-current/20 pb-1 mb-2">
          {title}
        </div>
      )}

      <div className="font-handwriting text-base sm:text-lg leading-snug">
        {children}
      </div>
    </div>
  );
};
