import React from 'react';

interface RollingTableLoaderProps {
  message?: string;
  subMessage?: string;
  compact?: boolean;
}

export const RollingTableLoader: React.FC<RollingTableLoaderProps> = ({
  message = 'Setting up the canteen...',
  subMessage = 'Compiling snacks & verifying queue telemetry',
  compact = false
}) => {
  return (
    <div className={`flex flex-col items-center justify-center select-none ${compact ? 'py-4' : 'py-10'}`}>
      {/* Container for rolling/spinning round table */}
      <div className="relative w-36 h-36 flex items-center justify-center">
        {/* Clay rolling motion track / ground line with chalk dashes */}
        <div className="absolute bottom-2 w-32 h-2.5 bg-amber-950/10 rounded-full blur-[1px] animate-pulse" />

        {/* The Rolling Round Table */}
        <div className="relative w-28 h-28 animate-spin-slow [animation-timing-function:cubic-bezier(0.4,0,0.2,1)] origin-center">
          <svg
            viewBox="0 0 140 140"
            className="w-full h-full drop-shadow-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="rollingWood" cx="45%" cy="45%" r="55%">
                <stop offset="0%" stopColor="#f3c292" />
                <stop offset="65%" stopColor="#bf8552" />
                <stop offset="100%" stopColor="#7a4c25" />
              </radialGradient>
              <linearGradient id="rollingEdge" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fed7aa" />
                <stop offset="100%" stopColor="#543114" />
              </linearGradient>
            </defs>

            {/* Wooden Table Outer Bevel */}
            <circle cx="70" cy="70" r="66" fill="url(#rollingEdge)" stroke="#451a03" strokeWidth="1.5" />
            {/* Wooden Table Surface */}
            <circle cx="70" cy="70" r="58" fill="url(#rollingWood)" stroke="#5c3818" strokeWidth="1" />

            {/* Wood Grain Rings */}
            <circle cx="70" cy="70" r="44" stroke="#875329" strokeWidth="0.8" strokeDasharray="5 3" opacity="0.4" />
            <circle cx="70" cy="70" r="28" stroke="#6e421d" strokeWidth="0.8" opacity="0.3" />

            {/* Food items attached to the rolling table */}
            {/* Item 1: Samosa (Top) */}
            <g transform="translate(56, 18)">
              <path d="M 14,0 L 26,20 C 25,22 3,22 2,20 Z" fill="#f59e0b" stroke="#b45309" strokeWidth="1" strokeLinejoin="round" />
              <path d="M 14,3 L 22,18 C 18,19 10,19 6,18 Z" fill="#fbbf24" opacity="0.8" />
              <circle cx="14" cy="13" r="0.8" fill="#78350f" />
            </g>

            {/* Item 2: Vada Pav (Right) */}
            <g transform="translate(90, 56)">
              <rect x="0" y="0" width="22" height="20" rx="7" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
              <circle cx="11" cy="10" r="7" fill="#d97706" />
              <circle cx="11" cy="10" r="5.5" fill="#f59e0b" />
            </g>

            {/* Item 3: Cutting Chai Cup (Bottom) */}
            <g transform="translate(58, 92)">
              <circle cx="12" cy="12" r="11" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
              <circle cx="12" cy="12" r="8" fill="#b45309" stroke="#f8fafc" strokeWidth="1" />
              <circle cx="11" cy="11" r="3" fill="#d97706" opacity="0.6" />
            </g>

            {/* Item 4: Mini Notebook (Left) */}
            <g transform="translate(18, 56) rotate(15)">
              <rect x="0" y="0" width="18" height="22" rx="2" fill="#fffdf5" stroke="#94a3b8" strokeWidth="0.8" />
              <line x1="2" y1="4" x2="4" y2="4" stroke="#64748b" strokeWidth="1" />
              <line x1="2" y1="9" x2="4" y2="9" stroke="#64748b" strokeWidth="1" />
              <line x1="2" y1="14" x2="4" y2="14" stroke="#64748b" strokeWidth="1" />
              <line x1="7" y1="7" x2="15" y2="7" stroke="#93c5fd" strokeWidth="0.7" />
              <line x1="7" y1="12" x2="15" y2="12" stroke="#93c5fd" strokeWidth="0.7" />
              <line x1="7" y1="17" x2="13" y2="17" stroke="#93c5fd" strokeWidth="0.7" />
            </g>

            {/* Center Brass Rivet */}
            <circle cx="70" cy="70" r="4" fill="#451a03" />
            <circle cx="70" cy="70" r="2" fill="#f59e0b" />
          </svg>
        </div>

        {/* Tiny rolling sparks / engineering dust particles */}
        <span className="absolute -top-1 right-3 text-xs animate-ping opacity-60">✨</span>
        <span className="absolute bottom-1 left-3 text-xs animate-bounce opacity-70">☕</span>
      </div>

      {/* Playful Microcopy */}
      <div className="mt-4 text-center">
        <div className="flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#7C5CFF] animate-ping" />
          <h3 className="font-extrabold text-[#1F2937] text-base tracking-tight font-mono">
            {message}
          </h3>
        </div>
        {subMessage && (
          <p className="font-handwriting text-[#7C5CFF] text-sm sm:text-base font-bold mt-1">
            {subMessage}
          </p>
        )}
      </div>
    </div>
  );
};
