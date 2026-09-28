import React from 'react';

export type DoodleType = 
  | 'compass'
  | 'ruler'
  | 'pencil'
  | 'gear'
  | 'bolt'
  | 'circuit'
  | 'formula'
  | 'blueprint';

interface EngineeringDoodleProps {
  type: DoodleType;
  className?: string;
  color?: string;
  size?: number;
}

export const EngineeringDoodle: React.FC<EngineeringDoodleProps> = ({
  type,
  className = '',
  color = '#7C5CFF',
  size = 48
}) => {
  switch (type) {
    case 'compass':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 60 60"
          fill="none"
          stroke={color}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`opacity-70 hover:opacity-100 transition-opacity ${className}`}
        >
          {/* Compass Top Hinge & Knob */}
          <circle cx="30" cy="10" r="3.5" strokeWidth="2" />
          <line x1="30" y1="6" x2="30" y2="3" strokeWidth="2" />
          {/* Compass Legs */}
          <path d="M 28,13 L 14,52" />
          <path d="M 32,13 L 46,52" />
          {/* Needle tip on left */}
          <line x1="14" y1="52" x2="12" y2="56" strokeWidth="2" />
          {/* Pencil clamp on right */}
          <rect x="42" y="44" width="7" height="10" rx="1" strokeWidth="1.2" />
          <path d="M 44,54 L 46.5,58 L 49,54" strokeWidth="1.2" />
          {/* Measuring arc guide */}
          <path d="M 22,34 Q 30,38 38,34" strokeDasharray="2 2" strokeWidth="1.2" />
        </svg>
      );

    case 'ruler':
      return (
        <svg
          width={size * 1.6}
          height={size * 0.6}
          viewBox="0 0 100 36"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          className={`opacity-75 hover:opacity-100 transition-opacity ${className}`}
        >
          {/* Ruler body */}
          <rect x="2" y="4" width="96" height="28" rx="3" fill="#FFF8EE" fillOpacity="0.4" strokeWidth="1.8" />
          {/* Tick marks */}
          <line x1="12" y1="4" x2="12" y2="18" strokeWidth="1.6" />
          <line x1="19" y1="4" x2="19" y2="11" strokeWidth="1" />
          <line x1="26" y1="4" x2="26" y2="11" strokeWidth="1" />
          <line x1="33" y1="4" x2="33" y2="15" strokeWidth="1.3" />
          <line x1="40" y1="4" x2="40" y2="11" strokeWidth="1" />
          <line x1="47" y1="4" x2="47" y2="11" strokeWidth="1" />
          <line x1="54" y1="4" x2="54" y2="18" strokeWidth="1.6" />
          <line x1="61" y1="4" x2="61" y2="11" strokeWidth="1" />
          <line x1="68" y1="4" x2="68" y2="11" strokeWidth="1" />
          <line x1="75" y1="4" x2="75" y2="15" strokeWidth="1.3" />
          <line x1="82" y1="4" x2="82" y2="11" strokeWidth="1" />
          <line x1="89" y1="4" x2="89" y2="18" strokeWidth="1.6" />
          {/* Scale labels */}
          <text x="10" y="27" fontSize="7" fill={color} stroke="none" fontFamily="monospace">0</text>
          <text x="52" y="27" fontSize="7" fill={color} stroke="none" fontFamily="monospace">5</text>
          <text x="86" y="27" fontSize="7" fill={color} stroke="none" fontFamily="monospace">10cm</text>
        </svg>
      );

    case 'pencil':
      return (
        <svg
          width={size}
          height={size * 0.4}
          viewBox="0 0 80 24"
          fill="none"
          stroke={color}
          strokeWidth="1.4"
          className={`opacity-70 hover:opacity-100 transition-opacity ${className}`}
        >
          {/* Wooden pencil body */}
          <rect x="22" y="6" width="46" height="12" rx="1" fill="#FFD166" fillOpacity="0.3" />
          <line x1="22" y1="10" x2="68" y2="10" strokeWidth="0.8" opacity="0.6" />
          <line x1="22" y1="14" x2="68" y2="14" strokeWidth="0.8" opacity="0.6" />
          {/* Eraser ferrule on right */}
          <rect x="68" y="6" width="6" height="12" fill="#cbd5e1" strokeWidth="1" />
          <rect x="74" y="6" width="4" height="12" rx="2" fill="#FF7F6A" fillOpacity="0.6" strokeWidth="1" />
          {/* Sharpened tip on left */}
          <polygon points="22,6 8,12 22,18" fill="#fde68a" fillOpacity="0.5" strokeWidth="1.2" />
          {/* Graphite lead */}
          <polygon points="12,10 6,12 12,14" fill="#1F2937" strokeWidth="0.8" />
        </svg>
      );

    case 'gear':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 50 50"
          fill="none"
          stroke={color}
          strokeWidth="1.6"
          className={`opacity-60 hover:opacity-90 transition-transform hover:rotate-45 duration-500 ${className}`}
        >
          {/* Gear teeth and body */}
          <path
            d="M 22,4 L 28,4 L 29,9 L 34,11 L 38,7 L 43,12 L 39,16 L 41,21 L 46,22 L 46,28 L 41,29 L 39,34 L 43,38 L 38,43 L 34,39 L 29,41 L 28,46 L 22,46 L 21,41 L 16,39 L 12,43 L 7,38 L 11,34 L 9,29 L 4,28 L 4,22 L 9,21 L 11,16 L 7,12 L 12,7 L 16,11 L 21,9 Z"
            strokeLinejoin="round"
          />
          {/* Center axle hole */}
          <circle cx="25" cy="25" r="7" strokeWidth="1.8" />
        </svg>
      );

    case 'bolt':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 40 40"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          className={`opacity-60 ${className}`}
        >
          {/* Hexagonal head */}
          <polygon points="20,4 32,10 32,22 20,28 8,22 8,10" />
          <circle cx="20" cy="16" r="4.5" />
          <line x1="20" y1="28" x2="20" y2="38" strokeWidth="2.5" />
          {/* Thread markings */}
          <line x1="17" y1="31" x2="23" y2="30" strokeWidth="1.2" />
          <line x1="17" y1="34" x2="23" y2="33" strokeWidth="1.2" />
          <line x1="17" y1="37" x2="23" y2="36" strokeWidth="1.2" />
        </svg>
      );

    case 'circuit':
      return (
        <svg
          width={size * 1.5}
          height={size}
          viewBox="0 0 80 40"
          fill="none"
          stroke={color}
          strokeWidth="1.6"
          className={`opacity-70 hover:opacity-100 ${className}`}
        >
          {/* Input node */}
          <circle cx="6" cy="20" r="2.5" fill={color} />
          <line x1="8.5" y1="20" x2="20" y2="20" />
          {/* Resistor zigzag */}
          <path d="M 20,20 L 24,12 L 28,28 L 32,12 L 36,28 L 40,12 L 44,28 L 48,20" />
          {/* Connector to capacitor */}
          <line x1="48" y1="20" x2="58" y2="20" />
          {/* Capacitor plates */}
          <line x1="58" y1="10" x2="58" y2="30" strokeWidth="2" />
          <line x1="64" y1="10" x2="64" y2="30" strokeWidth="2" />
          {/* Output node */}
          <line x1="64" y1="20" x2="74" y2="20" />
          <circle cx="76" cy="20" r="2.5" fill={color} />
          <text x="30" y="38" fontSize="7" fill={color} stroke="none" fontFamily="monospace">R = 47Ω</text>
        </svg>
      );

    case 'formula':
      return (
        <div className={`font-handwriting text-xs text-[#7C5CFF]/80 select-none ${className}`}>
          <span className="border-b border-[#7C5CFF]/40 pb-0.5">E = mc² + chai ☕</span>
          <div className="text-[10px] text-[#1F2937]/60 mt-0.5">η = (Snack / Boredom) × 100%</div>
        </div>
      );

    case 'blueprint':
      return (
        <div className={`w-24 h-16 border border-[#7C5CFF]/20 rounded notebook-grid-lines flex items-center justify-center p-1 relative ${className}`}>
          <span className="font-mono text-[9px] text-[#7C5CFF]/60 uppercase tracking-tighter">
            CAD_REV_3.dwg
          </span>
          <div className="absolute bottom-1 right-1 text-[8px] font-mono text-[#FF7F6A]/70">
            1:50
          </div>
        </div>
      );

    default:
      return null;
  }
};
