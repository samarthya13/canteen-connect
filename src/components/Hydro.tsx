import React, { useState } from 'react';
import { hydroDialogueQuotes } from '../data/canteenData';

interface HydroProps {
  speechText?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  interactive?: boolean;
}

export const Hydro: React.FC<HydroProps> = ({
  speechText,
  size = 'md',
  className = '',
  interactive = true
}) => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isWaving, setIsWaving] = useState(false);
  const [hasUserCycled, setHasUserCycled] = useState(false);

  // If user has not clicked next yet and speechText was provided, show it; otherwise cycle through quotes
  const currentDialogue = hasUserCycled || !speechText 
    ? hydroDialogueQuotes[quoteIndex % hydroDialogueQuotes.length]
    : speechText;

  const handleNextQuote = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!interactive) return;
    setIsWaving(true);
    setHasUserCycled(true);
    setQuoteIndex((prev) => (prev + 1) % hydroDialogueQuotes.length);
    setTimeout(() => setIsWaving(false), 700);
  };

  const handleHydroClick = () => {
    handleNextQuote();
  };

  const scale = size === 'sm' ? 0.75 : size === 'lg' ? 1.25 : 1;

  return (
    <div className={`relative inline-flex items-center gap-3 select-none ${className}`}>
      {/* Hydro Character SVG */}
      <div 
        id="hydro-mascot"
        onClick={handleHydroClick}
        title={interactive ? "Click Hydro for student survival tips!" : undefined}
        className={`relative cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95 ${
          isWaving ? 'animate-bounce' : 'animate-float-gentle'
        }`}
        style={{ width: `${80 * scale}px`, height: `${100 * scale}px` }}
      >
        <svg
          viewBox="0 0 100 125"
          className="w-full h-full drop-shadow-lg"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Soft 3D Clay Gradient for Bottle Body */}
            <linearGradient id="hydroBody" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#67e8f9" />
              <stop offset="35%" stopColor="#2ED8A7" />
              <stop offset="85%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>

            <linearGradient id="hydroCap" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFD166" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>

            <radialGradient id="rosyCheek" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF7F6A" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FF7F6A" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Tiny clay shadow underneath */}
          <ellipse cx="50" cy="120" rx="22" ry="4.5" fill="#1F2937" fillOpacity="0.2" />

          {/* Tiny Legs & Clay Shoes */}
          {/* Left Leg */}
          <rect x="36" y="104" width="7" height="12" rx="3.5" fill="#0284c7" />
          <ellipse cx="38" cy="116" rx="6" ry="4" fill="#FF7F6A" />
          {/* Right Leg */}
          <rect x="57" y="104" width="7" height="12" rx="3.5" fill="#0284c7" />
          <ellipse cx="61" cy="116" rx="6" ry="4" fill="#FF7F6A" />

          {/* Water Bottle Main Body (Pillowy clay shape) */}
          <rect
            x="24"
            y="32"
            width="52"
            height="74"
            rx="24"
            fill="url(#hydroBody)"
            stroke="#0369a1"
            strokeWidth="2"
          />

          {/* Soft 3D Clay Highlight (Left side curve reflection) */}
          <path
            d="M 32,44 Q 30,68 34,92"
            stroke="#ffffff"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.55"
          />

          {/* Bottle Collar & Cap */}
          {/* Collar ring */}
          <rect x="37" y="26" width="26" height="7" rx="3.5" fill="#0284c7" />
          {/* Yellow Cap */}
          <rect x="35" y="14" width="30" height="14" rx="6" fill="url(#hydroCap)" stroke="#b45309" strokeWidth="1.5" />
          {/* Grip ridges on cap */}
          <line x1="43" y1="16" x2="43" y2="25" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
          <line x1="50" y1="16" x2="50" y2="25" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
          <line x1="57" y1="16" x2="57" y2="25" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
          {/* Cap strap loop */}
          <path d="M 62,17 C 72,17 74,28 65,28" stroke="#f59e0b" strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* Friendly Expressive Face */}
          {/* Eyes */}
          <ellipse cx="41" cy="58" rx="3.5" ry="5" fill="#1F2937" />
          <circle cx="42" cy="56" r="1.5" fill="#ffffff" />
          <ellipse cx="59" cy="58" rx="3.5" ry="5" fill="#1F2937" />
          <circle cx="60" cy="56" r="1.5" fill="#ffffff" />

          {/* Happy Little Mouth */}
          <path
            d="M 45,68 Q 50,74 55,68"
            stroke="#1F2937"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="#FF7F6A"
          />

          {/* Rosy Cheeks */}
          <circle cx="34" cy="65" r="4.5" fill="url(#rosyCheek)" />
          <circle cx="66" cy="65" r="4.5" fill="url(#rosyCheek)" />

          {/* Tiny Arms */}
          {/* Left Arm: Resting or wave */}
          <path
            d="M 24,62 Q 14,68 18,76"
            stroke="#0ea5e9"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="18" cy="76" r="3" fill="#0284c7" />

          {/* Right Arm: Waving / Thumbs up */}
          <g className={isWaving ? 'animate-spin' : ''} style={{ transformOrigin: '76px 62px' }}>
            <path
              d="M 76,62 Q 88,58 86,48"
              stroke="#0ea5e9"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="86" cy="48" r="3.5" fill="#0284c7" />
            {/* Little finger thumb */}
            <circle cx="88" cy="46" r="1.8" fill="#FFD166" />
          </g>

          {/* Water Measurement / Graduation Marks on side */}
          <line x1="68" y1="46" x2="72" y2="46" stroke="#ffffff" strokeWidth="1.5" opacity="0.7" />
          <line x1="69" y1="52" x2="72" y2="52" stroke="#ffffff" strokeWidth="1" opacity="0.5" />
          <line x1="68" y1="58" x2="72" y2="58" stroke="#ffffff" strokeWidth="1.5" opacity="0.7" />
          <line x1="69" y1="64" x2="72" y2="64" stroke="#ffffff" strokeWidth="1" opacity="0.5" />
        </svg>

        {interactive && (
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-handwriting text-navy/60 whitespace-nowrap bg-white/80 px-1 rounded-full border border-[#d6c1a5]">
            tap me!
          </span>
        )}
      </div>

      {/* Handwritten Speech Bubble */}
      <div className="relative max-w-xs sm:max-w-sm">
        <div className="relative bg-[#FFF8EE] border-2 border-[#1F2937]/80 rounded-2xl px-3.5 py-2.5 shadow-sm transform -rotate-1 hover:rotate-0 transition-transform">
          {/* Speech bubble pointer / triangle */}
          <div className="absolute -left-2 top-4 w-3 h-3 bg-[#FFF8EE] border-l-2 border-b-2 border-[#1F2937]/80 transform rotate-45" />
          
          <p className="font-handwriting text-[#1F2937] text-base sm:text-lg leading-tight font-bold">
            "{currentDialogue}"
          </p>
          <div className="flex items-center justify-between mt-1 text-[11px] font-kalam text-[#7C5CFF]">
            <span>— Hydro, Canteen Mascot</span>
            {interactive && (
              <button
                id="hydro-next-note-button"
                type="button"
                onClick={handleNextQuote}
                title="Click for next survival tip"
                className="text-[11px] font-bold text-[#FF7F6A] hover:text-[#f43f5e] bg-amber-100/80 hover:bg-amber-200/80 px-2 py-0.5 rounded-full border border-[#FF7F6A]/40 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1"
              >
                <span>next note</span>
                <span>→</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
