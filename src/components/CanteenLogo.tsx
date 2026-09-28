import React from 'react';

interface CanteenLogoProps {
  size?: number;
  className?: string;
  showTagline?: boolean;
}

export const CanteenLogo: React.FC<CanteenLogoProps> = ({
  size = 130,
  className = '',
  showTagline = false
}) => {
  return (
    <div className={`inline-flex flex-col items-center justify-center select-none ${className}`}>
      <div 
        className="relative group transition-transform duration-300 hover:scale-105"
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 240 240"
          className="w-full h-full drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Wooden table surface gradients */}
            <radialGradient id="canteenWoodTable" cx="48%" cy="46%" r="54%">
              <stop offset="0%" stopColor="#e3af7d" />
              <stop offset="60%" stopColor="#c58b56" />
              <stop offset="88%" stopColor="#a36b3b" />
              <stop offset="100%" stopColor="#7a4b22" />
            </radialGradient>

            <linearGradient id="canteenWoodBevel" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f5cca4" />
              <stop offset="100%" stopColor="#542e0f" />
            </linearGradient>

            {/* Steel Plate Gradient */}
            <radialGradient id="steelPlate" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="60%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#94a3b8" />
            </radialGradient>

            {/* Chai Glass Gradient */}
            <radialGradient id="chaiTea" cx="45%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="70%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#78350f" />
            </radialGradient>

            {/* Clay drop shadow filter */}
            <filter id="clayShadowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#2a1608" floodOpacity="0.28" />
            </filter>

            {/* Circular Path for "CANTEEN CONNECT" Engraved along Table Edge */}
            {/* Center (120, 120), radius ~71 */}
            <path
              id="tableEdgeBrandPath"
              d="M 120, 48 A 72,72 0 1,1 119.9, 48"
              fill="none"
            />
          </defs>

          {/* ======================================================= */}
          {/* FLOOR SHADOW & CHAIRS (TOP VIEW)                        */}
          {/* ======================================================= */}
          <circle cx="120" cy="123" r="84" fill="#1F2937" fillOpacity="0.14" />

          {/* Stools / Chairs under students */}
          <circle cx="120" cy="30" r="21" fill="#d7c0a7" stroke="#8c6239" strokeWidth="1.5" opacity="0.6" />
          <circle cx="210" cy="120" r="21" fill="#d7c0a7" stroke="#8c6239" strokeWidth="1.5" opacity="0.6" />
          <circle cx="120" cy="210" r="21" fill="#d7c0a7" stroke="#8c6239" strokeWidth="1.5" opacity="0.6" />
          <circle cx="30" cy="120" r="21" fill="#d7c0a7" stroke="#8c6239" strokeWidth="1.5" opacity="0.6" />

          {/* ======================================================= */}
          {/* STUDENTS SITTING AROUND THE TABLE (TOP VIEW)            */}
          {/* Top, Right, Bottom, Left with backpacks & ID lanyards    */}
          {/* ======================================================= */}

          {/* STUDENT 1: TOP (12 o'clock) - Navy College Hoodie + Backpack */}
          <g id="student-top" filter="url(#clayShadowFilter)">
            {/* Backpack resting behind */}
            <rect x="106" y="2" width="28" height="18" rx="8" fill="#334155" stroke="#1e293b" strokeWidth="1.5" />
            <line x1="114" y1="2" x2="114" y2="10" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
            {/* Shoulders & Torso (Top View) */}
            <ellipse cx="120" cy="32" rx="26" ry="16" fill="#1e3a8a" stroke="#172554" strokeWidth="1.5" />
            {/* College ID Lanyard Ribbon hanging over shoulder toward table */}
            <path d="M 112,32 C 112,42 120,46 120,50" stroke="#22d3ee" strokeWidth="2" fill="none" strokeLinecap="round" />
            <rect x="117" y="50" width="7" height="9" rx="1.5" fill="#f8fafc" stroke="#0284c7" strokeWidth="0.8" />
            {/* Head (Top View: Hair & Ears) */}
            <ellipse cx="120" cy="28" rx="14" ry="14" fill="#3f2e1e" />
            <path d="M 108,24 C 114,18 126,18 132,24 C 130,16 110,16 108,24 Z" fill="#241910" />
            <circle cx="106" cy="28" r="2.5" fill="#fcd34d" />
            <circle cx="134" cy="28" r="2.5" fill="#fcd34d" />
            {/* Arms resting on table */}
            <path d="M 98,34 Q 102,48 108,52" stroke="#1e3a8a" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M 142,34 Q 138,48 132,52" stroke="#1e3a8a" strokeWidth="6" strokeLinecap="round" fill="none" />
            <circle cx="108" cy="52" r="3.5" fill="#fcd34d" />
            <circle cx="132" cy="52" r="3.5" fill="#fcd34d" />
          </g>

          {/* STUDENT 2: RIGHT (3 o'clock) - Coral Sweatshirt & Ponytail */}
          <g id="student-right" filter="url(#clayShadowFilter)">
            {/* Backpack */}
            <rect x="220" y="106" width="18" height="28" rx="8" fill="#475569" stroke="#334155" strokeWidth="1.5" />
            {/* Shoulders (Vertical Top View) */}
            <ellipse cx="208" cy="120" rx="16" ry="26" fill="#f43f5e" stroke="#be123c" strokeWidth="1.5" />
            {/* Head */}
            <circle cx="210" cy="120" r="14" fill="#503322" />
            {/* Ponytail */}
            <circle cx="225" cy="120" r="7" fill="#3a2213" />
            <circle cx="220" cy="120" r="3" fill="#fbbf24" /> {/* yellow scrunchie */}
            {/* Ears */}
            <circle cx="210" cy="106" r="2.5" fill="#fde68a" />
            <circle cx="210" cy="134" r="2.5" fill="#fde68a" />
            {/* Arms resting on table holding a pen */}
            <path d="M 204,102 Q 192,106 188,114" stroke="#f43f5e" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M 204,138 Q 192,134 188,126" stroke="#f43f5e" strokeWidth="6" strokeLinecap="round" fill="none" />
            <circle cx="188" cy="114" r="3.5" fill="#fde68a" />
            <circle cx="188" cy="126" r="3.5" fill="#fde68a" />
            {/* Pen in hand */}
            <line x1="184" y1="110" x2="191" y2="118" stroke="#0284c7" strokeWidth="1.8" strokeLinecap="round" />
          </g>

          {/* STUDENT 3: BOTTOM (6 o'clock) - Lavender Hoodie & Specs */}
          <g id="student-bottom" filter="url(#clayShadowFilter)">
            {/* Shoulder bag strap */}
            <rect x="106" y="220" width="28" height="18" rx="8" fill="#0f766e" stroke="#115e59" strokeWidth="1.5" />
            {/* Shoulders */}
            <ellipse cx="120" cy="208" rx="26" ry="16" fill="#7C5CFF" stroke="#5b3be6" strokeWidth="1.5" />
            {/* College Lanyard */}
            <path d="M 128,208 C 128,198 122,194 122,190" stroke="#f59e0b" strokeWidth="2" fill="none" strokeLinecap="round" />
            <rect x="118" y="181" width="7" height="9" rx="1.5" fill="#ffffff" stroke="#d97706" strokeWidth="0.8" />
            {/* Head (Top view: wavy clay hair + spectacles rim peeking) */}
            <ellipse cx="120" cy="212" rx="14" ry="14" fill="#2d1b0c" />
            <circle cx="106" cy="212" r="2.5" fill="#fcd34d" />
            <circle cx="134" cy="212" r="2.5" fill="#fcd34d" />
            {/* Arms reaching onto table */}
            <path d="M 98,206 Q 102,192 108,188" stroke="#7C5CFF" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M 142,206 Q 138,192 132,188" stroke="#7C5CFF" strokeWidth="6" strokeLinecap="round" fill="none" />
            <circle cx="108" cy="188" r="3.5" fill="#fcd34d" />
            <circle cx="132" cy="188" r="3.5" fill="#fcd34d" />
          </g>

          {/* STUDENT 4: LEFT (9 o'clock) - Mint Green Sweatshirt */}
          <g id="student-left" filter="url(#clayShadowFilter)">
            {/* College backpack */}
            <rect x="2" y="106" width="18" height="28" rx="8" fill="#1e293b" stroke="#0f172a" strokeWidth="1.5" />
            {/* Shoulders */}
            <ellipse cx="32" cy="120" rx="16" ry="26" fill="#2ED8A7" stroke="#059669" strokeWidth="1.5" />
            {/* Head with dark clay curls */}
            <circle cx="30" cy="120" r="14" fill="#1c1917" />
            <circle cx="30" cy="106" r="2.5" fill="#fcd34d" />
            <circle cx="30" cy="134" r="2.5" fill="#fcd34d" />
            {/* Arms resting forward */}
            <path d="M 36,102 Q 48,106 52,114" stroke="#2ED8A7" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M 36,138 Q 48,134 52,126" stroke="#2ED8A7" strokeWidth="6" strokeLinecap="round" fill="none" />
            <circle cx="52" cy="114" r="3.5" fill="#fcd34d" />
            <circle cx="52" cy="126" r="3.5" fill="#fcd34d" />
          </g>


          {/* ======================================================= */}
          {/* THE ROUND WOODEN CANTEEN TABLE (TOP-DOWN VIEW)          */}
          {/* ======================================================= */}

          {/* Outer Table Rim Bevel */}
          <circle cx="120" cy="120" r="76" fill="url(#canteenWoodBevel)" stroke="#4a250a" strokeWidth="2" />
          
          {/* Main Wooden Table Top */}
          <circle cx="120" cy="120" r="69" fill="url(#canteenWoodTable)" stroke="#693b16" strokeWidth="1.5" />

          {/* Concentric Wood Rings / Grain lines */}
          <circle cx="118" cy="118" r="58" stroke="#875329" strokeWidth="0.8" strokeDasharray="6 3" opacity="0.4" />
          <circle cx="121" cy="121" r="44" stroke="#6e421d" strokeWidth="0.7" strokeDasharray="8 4" opacity="0.3" />
          <circle cx="119" cy="119" r="28" stroke="#6e421d" strokeWidth="0.6" opacity="0.25" />

          {/* ======================================================= */}
          {/* INTEGRATED BRANDING: "CANTEEN CONNECT" ENGRAVED ON RIM  */}
          {/* Curved naturally into the wooden table circumference    */}
          {/* ======================================================= */}
          <text 
            className="font-black tracking-[0.24em] uppercase select-none"
            fontSize="8.5" 
            fill="#2c1404"
            opacity="0.92"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            <textPath href="#tableEdgeBrandPath" startOffset="50%" textAnchor="middle">
              ★ CANTEEN CONNECT ★ CAMPUS TABLE
            </textPath>
          </text>


          {/* ======================================================= */}
          {/* FOOD ITEMS & STUDENT ARTIFACTS ON THE TABLE             */}
          {/* ======================================================= */}

          {/* 1. OPEN SPIRAL ENGINEERING NOTEBOOK (Left Side of Table) */}
          <g id="table-notebook" transform="translate(68, 98) rotate(-10)" filter="url(#clayShadowFilter)">
            {/* Notebook pages */}
            <rect x="0" y="0" width="24" height="30" rx="2" fill="#fffdf7" stroke="#cbd5e1" strokeWidth="1" />
            {/* Spiral binding rings along left */}
            <line x1="2" y1="4" x2="4" y2="4" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="2" y1="9" x2="4" y2="9" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="2" y1="14" x2="4" y2="14" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="2" y1="19" x2="4" y2="19" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="2" y1="24" x2="4" y2="24" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
            {/* Light blue ruled lines */}
            <line x1="7" y1="8" x2="20" y2="8" stroke="#93c5fd" strokeWidth="0.8" />
            <line x1="7" y1="13" x2="20" y2="13" stroke="#93c5fd" strokeWidth="0.8" />
            <line x1="7" y1="18" x2="20" y2="18" stroke="#93c5fd" strokeWidth="0.8" />
            <line x1="7" y1="23" x2="16" y2="23" stroke="#93c5fd" strokeWidth="0.8" />
            {/* Red margin line */}
            <line x1="6.5" y1="2" x2="6.5" y2="28" stroke="#fca5a5" strokeWidth="0.6" />
          </g>

          {/* 2. CENTER SHARING STEEL PLATE (Samosa + Vada Pav) */}
          <g id="table-center-plate" filter="url(#clayShadowFilter)">
            {/* Stainless steel round thali plate */}
            <circle cx="124" cy="118" r="23" fill="url(#steelPlate)" stroke="#64748b" strokeWidth="1.2" />
            <circle cx="124" cy="118" r="20" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.8" />

            {/* Crispy Golden SAMOSA on plate */}
            <path
              d="M 116,105 L 128,122 C 127,124 107,124 106,122 Z"
              fill="#f59e0b"
              stroke="#b45309"
              strokeWidth="1"
              strokeLinejoin="round"
            />
            {/* Crispy highlight */}
            <path d="M 116,108 L 124,120 C 120,121 112,121 109,120 Z" fill="#fbbf24" opacity="0.85" />
            {/* Ajwain speck */}
            <circle cx="116" cy="116" r="0.7" fill="#78350f" />

            {/* Bombay VADA PAV on plate */}
            <rect x="123" y="112" width="18" height="17" rx="6" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
            <circle cx="132" cy="120" r="6.5" fill="#d97706" />
            <circle cx="132" cy="120" r="5" fill="#f59e0b" />
            <ellipse cx="132" cy="115" rx="5" ry="2" fill="#fef3c7" opacity="0.8" />
            {/* Green chilli */}
            <path d="M 129,123 Q 134,121 138,124" stroke="#15803d" strokeWidth="1.8" strokeLinecap="round" fill="none" />

            {/* Mint Chutney dollop */}
            <circle cx="118" cy="127" r="3.2" fill="#16a34a" />
            <circle cx="117" cy="126" r="1.1" fill="#bbf7d0" />
          </g>

          {/* 3. CUTTING CHAI CUP (Top-Right of table) */}
          <g id="table-chai-1" transform="translate(136, 78)" filter="url(#clayShadowFilter)">
            <circle cx="10" cy="10" r="10" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
            <circle cx="10" cy="10" r="7.5" fill="url(#chaiTea)" stroke="#f8fafc" strokeWidth="1.2" />
            <circle cx="10" cy="10" r="5" fill="#b45309" />
            <circle cx="9" cy="9" r="2" fill="#d97706" opacity="0.6" />
          </g>

          {/* 4. SECOND CHAI CUP (Bottom-Left of table) */}
          <g id="table-chai-2" transform="translate(86, 140)" filter="url(#clayShadowFilter)">
            <circle cx="9" cy="9" r="9" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
            <circle cx="9" cy="9" r="6.8" fill="url(#chaiTea)" stroke="#f8fafc" strokeWidth="1.2" />
            <circle cx="9" cy="9" r="4.2" fill="#b45309" />
          </g>

          {/* 5. MINI HYDRO WATER BOTTLE (Bottom-Right of table) */}
          <g id="table-hydro" transform="translate(142, 134)" filter="url(#clayShadowFilter)">
            <rect x="0" y="0" width="11" height="18" rx="5" fill="#2ED8A7" stroke="#0ea5e9" strokeWidth="1" />
            <rect x="2" y="-3" width="7" height="4" rx="2" fill="#FFD166" stroke="#d97706" strokeWidth="0.8" />
            <ellipse cx="4" cy="9" rx="1.5" ry="6" fill="#ffffff" opacity="0.6" />
          </g>

          {/* 6. STUDENT PHONE / SCIENTIFIC CALCULATOR (Top-Left of table) */}
          <g id="table-calc" transform="translate(84, 76) rotate(15)" filter="url(#clayShadowFilter)">
            <rect x="0" y="0" width="13" height="20" rx="2.5" fill="#334155" stroke="#1e293b" strokeWidth="0.8" />
            <rect x="2" y="2" width="9" height="5" rx="1" fill="#a7f3d0" />
            <circle cx="4" cy="10" r="0.8" fill="#94a3b8" />
            <circle cx="7" cy="10" r="0.8" fill="#94a3b8" />
            <circle cx="10" cy="10" r="0.8" fill="#94a3b8" />
            <circle cx="4" cy="13" r="0.8" fill="#94a3b8" />
            <circle cx="7" cy="13" r="0.8" fill="#94a3b8" />
            <circle cx="10" cy="13" r="0.8" fill="#94a3b8" />
          </g>

          {/* Center Table Brass Rivet */}
          <circle cx="120" cy="120" r="3.5" fill="#78350f" opacity="0.6" />
          <circle cx="120" cy="120" r="1.8" fill="#f59e0b" opacity="0.8" />
        </svg>
      </div>

      {showTagline && (
        <div className="mt-2 text-center">
          <span className="text-xs uppercase tracking-widest font-extrabold text-[#7C5CFF]">
            Canteen Connect
          </span>
          <p className="text-xs font-handwriting text-[#1F2937]/75 font-bold">
            Your Student Canteen Companion
          </p>
        </div>
      )}
    </div>
  );
};

