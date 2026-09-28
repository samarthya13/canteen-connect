import React, { useState } from 'react';
import { TodayLunchTiffin, FoodItemData } from '../types';
import { AvailabilityStamp } from './AvailabilityStamp';

interface TiffinProps {
  data: TodayLunchTiffin;
  onAddToTray?: (item: FoodItemData) => void;
  className?: string;
}

export const Tiffin: React.FC<TiffinProps> = ({ data, onAddToTray, className = '' }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleOrderLunch = () => {
    if (!onAddToTray) return;
    onAddToTray({
      id: 'lunch-roti-2sabzis',
      name: `Canteen Lunch (${data.sabzi1} + ${data.sabzi2})`,
      price: data.price,
      category: 'lunch',
      availability: data.isAvailable ? 'AVAILABLE' : 'SOLD OUT',
      description: `${data.roti}, ${data.sabzi1} & ${data.sabzi2}`
    });
  };

  return (
    <div className={`relative bg-[#FFF8EE] rounded-3xl p-5 sm:p-7 border-2 border-[#1F2937]/15 shadow-lg ${className}`}>
      {/* Tape on top right */}
      <div className="absolute -top-3 right-6 w-20 h-6 washi-tape -rotate-3 border-t border-b border-amber-300/60 z-10" />

      {/* Header section with handwritten title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-3 border-b-2 border-dashed border-[#1F2937]/20">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🍱</span>
            <h2 className="font-extrabold text-2xl sm:text-3xl text-[#1F2937] tracking-tight">
              TODAY'S LUNCH
            </h2>
            <AvailabilityStamp status={data.isAvailable ? 'AVAILABLE' : 'SOLD OUT'} size="sm" />
          </div>
          <p className="font-handwriting text-[#7C5CFF] text-lg sm:text-xl font-bold mt-0.5">
            Roti + Two Sabzis • Daily Canteen Meal
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Interactive Open/Pack toggle button */}
          <button
            id="tiffin-toggle-button"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 border-[#1F2937]/20 bg-white/90 hover:bg-white text-xs font-mono font-bold text-slate-800 shadow-xs transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>{isOpen ? '🔒 Pack Tiffin' : '🔓 Open Tiffin'}</span>
            <span className="text-[10px] bg-[#FFD166]/60 px-1.5 py-0.5 rounded text-amber-900">
              Interactive 3D
            </span>
          </button>

          <div className="text-right">
            <span className="text-xs text-[#1F2937]/60 font-semibold block uppercase tracking-wider font-mono">Rate</span>
            <span className="font-black text-2xl sm:text-3xl text-[#1F2937] font-mono">₹{data.price}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive 3D Clay/Steel Tiffin Illustration & Dish Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left Col: Interactive 3D Clay/Steel Tiffin Graphic */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#FFFDF9] to-[#FFF3E0] rounded-2xl border border-amber-200/60 shadow-inner">
          
          <div 
            onClick={() => setIsOpen(!isOpen)}
            title="Click to open or close the tiffin container"
            className="relative w-full max-w-[340px] cursor-pointer group select-none transition-transform duration-300 hover:scale-[1.02]"
          >
            {/* Click helper hint badge */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-30 bg-[#1F2937] text-white text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
              <span>{isOpen ? '👆 Click to close tiffin' : '✨ Click to open tiffin & reveal dishes'}</span>
            </div>

            {/* SVG Visual Representation of Tiffin with Satisfying Physical Open/Close Animation */}
            <svg
              viewBox="0 0 320 280"
              className="w-full h-auto drop-shadow-xl"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Steel metallic reflections */}
                <linearGradient id="tiffinSteelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#94a3b8" />
                  <stop offset="20%" stopColor="#cbd5e1" />
                  <stop offset="50%" stopColor="#ffffff" />
                  <stop offset="78%" stopColor="#cbd5e1" />
                  <stop offset="100%" stopColor="#64748b" />
                </linearGradient>

                <linearGradient id="tiffinBrassTrim" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#d97706" />
                  <stop offset="40%" stopColor="#fde68a" />
                  <stop offset="70%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#92400e" />
                </linearGradient>

                {/* Clay food gradients */}
                <radialGradient id="curryGravySabzi1" cx="45%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#fca5a5" />
                  <stop offset="50%" stopColor="#ea580c" />
                  <stop offset="85%" stopColor="#c2410c" />
                  <stop offset="100%" stopColor="#9a3412" />
                </radialGradient>

                <radialGradient id="veggieSabzi2" cx="40%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#bbf7d0" />
                  <stop offset="45%" stopColor="#4ade80" />
                  <stop offset="80%" stopColor="#16a34a" />
                  <stop offset="100%" stopColor="#14532d" />
                </radialGradient>

                <radialGradient id="rotiPhulka" cx="50%" cy="45%" r="55%">
                  <stop offset="0%" stopColor="#fffbeb" />
                  <stop offset="60%" stopColor="#fde68a" />
                  <stop offset="90%" stopColor="#d97706" />
                  <stop offset="100%" stopColor="#b45309" />
                </radialGradient>

                <filter id="clayTiffinShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#2a1608" floodOpacity="0.25" />
                </filter>
              </defs>

              {/* Tiffin Base Shadow */}
              <ellipse cx="160" cy="265" rx="90" ry="12" fill="#1F2937" fillOpacity="0.16" />

              {/* Brass Carrier Handle & Side Lock Clamps */}
              <g id="tiffin-carrier-brackets" className="transition-all duration-500">
                {/* Brass Arch Handle */}
                <path
                  d={isOpen ? "M 110,35 C 110,8 210,8 210,35" : "M 110,65 C 110,25 210,25 210,65"}
                  stroke="url(#tiffinBrassTrim)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  fill="none"
                />
                <rect x={142} y={isOpen ? 12 : 32} width="36" height="10" rx="3.5" fill="#334155" stroke="#1e293b" strokeWidth="1" />
              </g>

              {/* ======================================================== */}
              {/* TIER 3 (BOTTOM CONTAINER): SABZI 2                       */}
              {/* ======================================================== */}
              <g 
                id="tiffin-tier-sabzi2"
                transform={isOpen ? "translate(0, 30)" : "translate(0, 0)"}
                className="transition-transform duration-500 ease-out"
              >
                {/* Stainless body */}
                <path
                  d="M 90,175 L 90,225 C 90,242 230,242 230,225 L 230,175 Z"
                  fill="url(#tiffinSteelGrad)"
                  stroke="#475569"
                  strokeWidth="1.5"
                />
                <ellipse cx="160" cy="175" rx="70" ry="16" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
                
                {/* Revealed Interior: Sabzi 2 Bowl */}
                <ellipse cx="160" cy="175" rx="64" ry="13" fill="url(#veggieSabzi2)" />
                {/* Sautéed Vegetable Garnish & Texture */}
                <rect x="130" y="172" width="10" height="4" rx="2" fill="#14532d" />
                <rect x="150" y="174" width="12" height="4" rx="2" fill="#166534" />
                <rect x="175" y="171" width="10" height="4" rx="2" fill="#14532d" />
                <circle cx="145" cy="176" r="2.2" fill="#86efac" />
                <circle cx="168" cy="177" r="2.2" fill="#facc15" />
                <circle cx="188" cy="175" r="2" fill="#86efac" />
                
                {/* Dish Name Tag Badge on Container */}
                <rect x="110" y="196" width="100" height="18" rx="5" fill="#ffffff" stroke="#16a34a" strokeWidth="1" opacity="0.95" />
                <text x="160" y="209" textAnchor="middle" fill="#14532d" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                  Sabzi 2: {data.sabzi2.slice(0, 14)}
                </text>
              </g>

              {/* ======================================================== */}
              {/* TIER 2 (MIDDLE CONTAINER): SABZI 1                       */}
              {/* ======================================================== */}
              <g 
                id="tiffin-tier-sabzi1"
                transform={isOpen ? "translate(0, -10)" : "translate(0, 0)"}
                className="transition-transform duration-500 ease-out"
              >
                {/* Stainless body */}
                <path
                  d="M 90,118 L 90,168 C 90,185 230,185 230,168 L 230,118 Z"
                  fill="url(#tiffinSteelGrad)"
                  stroke="#475569"
                  strokeWidth="1.5"
                />
                <ellipse cx="160" cy="118" rx="70" ry="16" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
                
                {/* Revealed Interior: Sabzi 1 Curry Gravy */}
                <ellipse cx="160" cy="118" rx="64" ry="13" fill="url(#curryGravySabzi1)" />
                {/* Paneer / Spiced Potato Cubes & Peas in Gravy */}
                <rect x="135" y="115" width="8" height="7" rx="1.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.8" />
                <rect x="160" y="116" width="9" height="7" rx="1.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.8" />
                <circle cx="125" cy="118" r="2.5" fill="#22c55e" />
                <circle cx="148" cy="120" r="2.5" fill="#16a34a" />
                <circle cx="178" cy="119" r="2.5" fill="#22c55e" />
                <circle cx="190" cy="117" r="1.5" fill="#b91c1c" />

                {/* Dish Name Tag Badge on Container */}
                <rect x="110" y="140" width="100" height="18" rx="5" fill="#ffffff" stroke="#ea580c" strokeWidth="1" opacity="0.95" />
                <text x="160" y="153" textAnchor="middle" fill="#9a3412" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                  Sabzi 1: {data.sabzi1.slice(0, 14)}
                </text>
              </g>

              {/* ======================================================== */}
              {/* TIER 1 (TOP CONTAINER): ROTI                             */}
              {/* ======================================================== */}
              <g 
                id="tiffin-tier-roti"
                transform={isOpen ? "translate(0, -50)" : "translate(0, 0)"}
                className="transition-transform duration-500 ease-out"
              >
                {/* Stainless body */}
                <path
                  d="M 90,62 L 90,112 C 90,129 230,129 230,112 L 230,62 Z"
                  fill="url(#tiffinSteelGrad)"
                  stroke="#475569"
                  strokeWidth="1.5"
                />
                <ellipse cx="160" cy="62" rx="70" ry="16" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
                
                {/* Revealed Interior: Fresh Rotis / Phulkas */}
                <ellipse cx="160" cy="62" rx="64" ry="13" fill="url(#rotiPhulka)" stroke="#d97706" strokeWidth="1" />
                {/* Folded Rotis stacked */}
                <ellipse cx="152" cy="61" rx="42" ry="9" fill="#fef3c7" stroke="#b45309" strokeWidth="1" />
                <circle cx="138" cy="60" r="1.5" fill="#92400e" opacity="0.8" />
                <circle cx="165" cy="62" r="1.8" fill="#92400e" opacity="0.7" />
                <circle cx="150" cy="59" r="1.2" fill="#92400e" opacity="0.7" />
                <ellipse cx="145" cy="61" rx="7" ry="2" fill="#ffffff" opacity="0.6" />

                {/* Dish Name Tag Badge on Container */}
                <rect x="110" y="84" width="100" height="18" rx="5" fill="#ffffff" stroke="#b45309" strokeWidth="1" opacity="0.95" />
                <text x="160" y="97" textAnchor="middle" fill="#78350f" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                  🫓 {data.roti.slice(0, 14)}
                </text>
              </g>

              {/* ======================================================== */}
              {/* TIFFIN LID (Lifts high when opened)                      */}
              {/* ======================================================== */}
              <g 
                id="tiffin-lid"
                transform={isOpen ? "translate(0, -85) rotate(-6 160 55)" : "translate(0, 0)"}
                className="transition-transform duration-500 ease-out origin-center"
              >
                <path
                  d="M 92,58 C 92,36 228,36 228,58 Z"
                  fill="url(#tiffinSteelGrad)"
                  stroke="#334155"
                  strokeWidth="1.5"
                />
                <ellipse cx="160" cy="58" rx="68" ry="12" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
                {/* Brass knob on top */}
                <circle cx="160" cy="38" r="8" fill="url(#tiffinBrassTrim)" stroke="#92400e" strokeWidth="1" />
                <circle cx="160" cy="37" r="3" fill="#ffffff" opacity="0.6" />
              </g>

              {/* Clamping latches on sides */}
              {!isOpen && (
                <g id="tiffin-latches">
                  <path d="M 86,65 L 86,220" stroke="url(#tiffinBrassTrim)" strokeWidth="5" strokeLinecap="round" />
                  <path d="M 234,65 L 234,220" stroke="url(#tiffinBrassTrim)" strokeWidth="5" strokeLinecap="round" />
                  <circle cx="86" cy="70" r="4" fill="#f59e0b" />
                  <circle cx="86" cy="220" r="4" fill="#f59e0b" />
                  <circle cx="234" cy="70" r="4" fill="#f59e0b" />
                  <circle cx="234" cy="220" r="4" fill="#f59e0b" />
                </g>
              )}
            </svg>
          </div>

          <div className="mt-3 flex items-center justify-between w-full px-2 text-[11px] font-mono text-slate-600">
            <span className="font-bold">STATUS: {isOpen ? 'TIFFIN UNLOCKED' : 'TIFFIN PACKED'}</span>
            <span className="text-[#7C5CFF] font-handwriting text-sm font-bold">Roti + 2 Daily Sabzis</span>
          </div>
        </div>

        {/* Right Col: Menu Details & Real-Time Data Fields */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-[#7C5CFF] font-bold">
                Today's Canteen Plate Breakdown
              </span>
              <span className="text-[11px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                Roti • 2 Sabzis • Dal • Rice
              </span>
            </div>

            {/* Dishes list: Strictly ROTI / POLI + SABZI 1 + SABZI 2 + DAL + RICE */}
            <div className="space-y-2">
              
              {/* Dish 1: Roti / Poli */}
              <div className="p-3 bg-white/95 rounded-xl border-2 border-amber-300/80 flex items-center justify-between shadow-xs hover:border-amber-400 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-lg shadow-inner border border-amber-200">
                    🫓
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-amber-900 font-extrabold block">
                      Roti / Poli
                    </span>
                    <span className="font-extrabold text-[#1F2937] text-sm sm:text-base">
                      {data.roti}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-200">
                  Included
                </span>
              </div>

              {/* Dish 2: Sabzi 1 (DYNAMIC ADMIN FIELD) */}
              <div className="p-3 bg-white/95 rounded-xl border-2 border-[#2ED8A7]/70 flex items-center justify-between shadow-xs hover:border-[#2ED8A7] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-lg shadow-inner border border-emerald-200">
                    🥘
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-wider text-emerald-800 font-extrabold block">
                        Sabzi 1
                      </span>
                      <span className="text-[9px] font-mono text-emerald-600 bg-emerald-50 px-1 rounded border border-emerald-200">
                        Dynamic
                      </span>
                    </div>
                    <span className="font-extrabold text-[#1F2937] text-sm sm:text-base">
                      {data.sabzi1}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                  Bowl 1
                </span>
              </div>

              {/* Dish 3: Sabzi 2 (DYNAMIC ADMIN FIELD) */}
              <div className="p-3 bg-white/95 rounded-xl border-2 border-[#7C5CFF]/70 flex items-center justify-between shadow-xs hover:border-[#7C5CFF] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center text-lg shadow-inner border border-indigo-200">
                    🥗
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-wider text-indigo-800 font-extrabold block">
                        Sabzi 2
                      </span>
                      <span className="text-[9px] font-mono text-indigo-600 bg-indigo-50 px-1 rounded border border-indigo-200">
                        Dynamic
                      </span>
                    </div>
                    <span className="font-extrabold text-[#1F2937] text-sm sm:text-base">
                      {data.sabzi2}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold bg-indigo-50 text-indigo-800 px-2 py-0.5 rounded border border-indigo-200">
                  Bowl 2
                </span>
              </div>

              {/* Dish 4: Dal */}
              <div className="p-2.5 bg-white/95 rounded-xl border border-amber-200 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-base border border-amber-200">
                    🥣
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-amber-800 font-extrabold block">
                      Dal
                    </span>
                    <span className="font-extrabold text-[#1F2937] text-xs sm:text-sm">
                      {data.dal || 'Dal'}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-mono font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-200">
                  Included
                </span>
              </div>

              {/* Dish 5: Rice */}
              <div className="p-2.5 bg-white/95 rounded-xl border border-slate-200 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-base border border-slate-200">
                    🍚
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-700 font-extrabold block">
                      Rice
                    </span>
                    <span className="font-extrabold text-[#1F2937] text-xs sm:text-sm">
                      {data.rice || 'Rice'}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-mono font-bold bg-slate-50 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                  Included
                </span>
              </div>

            </div>
          </div>

          {/* Canteen counter note */}
          {data.preparationNote && (
            <div className="bg-[#FFD166]/25 border-l-4 border-[#FFD166] p-3 rounded-r-xl flex items-start gap-2 text-xs">
              <span className="text-base">📝</span>
              <div className="font-handwriting text-slate-700 text-sm leading-tight">
                <span className="font-bold text-[#1F2937]">Canteen Note: </span>
                {data.preparationNote}
              </div>
            </div>
          )}

          {/* Quick Action Button to Add Lunch to Tray */}
          <button
            id="order-lunch-tiffin-button"
            type="button"
            disabled={!data.isAvailable}
            onClick={handleOrderLunch}
            className={`w-full py-3 px-4 rounded-xl font-extrabold text-sm uppercase tracking-wider clay-button transition-all flex items-center justify-center gap-2 shadow-sm ${
              data.isAvailable
                ? 'bg-[#1F2937] hover:bg-slate-800 text-white cursor-pointer active:scale-95'
                : 'bg-slate-300 text-slate-500 cursor-not-allowed'
            }`}
          >
            <span>🍱</span>
            <span>{data.isAvailable ? `Add Today's Lunch to Tray (₹${data.price})` : 'Lunch Sold Out for Today'}</span>
          </button>

        </div>
      </div>
    </div>
  );
};
