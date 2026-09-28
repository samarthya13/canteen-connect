import React, { useState } from 'react';
import { FoodItemData } from '../types';
import { AvailabilityStamp } from './AvailabilityStamp';

interface FoodItemProps {
  item: FoodItemData;
  onOrder?: (item: FoodItemData) => void;
  className?: string;
}

export const FoodItem: React.FC<FoodItemProps> = ({
  item,
  onOrder,
  className = ''
}) => {
  const [compilingState, setCompilingState] = useState<'idle' | 'compiling' | 'success'>('idle');

  const handleOrder = () => {
    if (item.availability === 'SOLD OUT' || compilingState !== 'idle') return;

    setCompilingState('compiling');
    setTimeout(() => {
      setCompilingState('success');
      if (onOrder) onOrder(item);

      setTimeout(() => {
        setCompilingState('idle');
      }, 2200);
    }, 900);
  };

  // Render soft 3D clay-style food icons
  const renderClayIcon = () => {
    switch (item.clayIconType) {
      case 'vada-pav':
        return (
          <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center p-1.5 border border-amber-200 shadow-inner">
            <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-sm">
              <rect x="4" y="6" width="32" height="28" rx="8" fill="#fcd34d" stroke="#d97706" strokeWidth="1.5" />
              <circle cx="20" cy="21" r="11" fill="#d97706" />
              <circle cx="20" cy="21" r="9" fill="#f59e0b" />
              <path d="M 12,24 Q 20,20 28,24" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </svg>
          </div>
        );

      case 'poha':
        return (
          <div className="w-12 h-12 bg-yellow-50 rounded-2xl flex items-center justify-center p-1.5 border border-yellow-200 shadow-inner">
            <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-sm">
              <ellipse cx="20" cy="22" rx="16" ry="9" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.2" />
              <circle cx="15" cy="21" r="2" fill="#78350f" />
              <circle cx="24" cy="23" r="2.2" fill="#78350f" />
              <circle cx="19" cy="20" r="1.5" fill="#15803d" />
              <line x1="12" y1="20" x2="16" y2="22" stroke="#eab308" strokeWidth="1.5" />
              <line x1="21" y1="24" x2="27" y2="22" stroke="#eab308" strokeWidth="1.5" />
            </svg>
          </div>
        );

      case 'upma':
        return (
          <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center p-1.5 border border-amber-200 shadow-inner">
            <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-sm">
              <path d="M 6,24 C 6,14 34,14 34,24 Z" fill="#fde68a" stroke="#d97706" strokeWidth="1.2" />
              <ellipse cx="20" cy="24" rx="14" ry="5" fill="#fcd34d" />
              <circle cx="16" cy="18" r="1.5" fill="#15803d" />
              <circle cx="22" cy="17" r="1.5" fill="#b45309" />
              <circle cx="20" cy="21" r="1" fill="#f8fafc" />
            </svg>
          </div>
        );

      case 'tea':
        return (
          <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center p-1.5 border border-amber-200 shadow-inner">
            <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-sm">
              <polygon points="12,12 28,12 25,32 15,32" fill="#b45309" stroke="#78350f" strokeWidth="1" />
              <ellipse cx="20" cy="12" rx="8" ry="2.5" fill="#d97706" stroke="#f8fafc" strokeWidth="1" />
              <path d="M 18,8 Q 20,4 22,2" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </svg>
          </div>
        );

      case 'coffee':
      case 'cold-coffee':
        return (
          <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center p-1.5 border border-amber-200 shadow-inner">
            <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-sm">
              <rect x="13" y="10" width="14" height="22" rx="3" fill="#78350f" stroke="#451a03" strokeWidth="1.2" />
              <rect x="11" y="8" width="18" height="4" rx="2" fill="#fef3c7" />
              <line x1="22" y1="4" x2="26" y2="12" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        );

      case 'cold-drinks':
      case 'lemon-water':
        return (
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center p-1.5 border border-emerald-200 shadow-inner">
            <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-sm">
              <rect x="13" y="10" width="14" height="22" rx="3" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.2" />
              <circle cx="20" cy="20" r="4.5" fill="#a7f3d0" stroke="#059669" strokeWidth="0.8" />
              <line x1="20" y1="14" x2="20" y2="24" stroke="#059669" strokeWidth="0.8" strokeLinecap="round" />
              <line x1="24" y1="4" x2="20" y2="15" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        );

      case 'rice':
        return (
          <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center p-1.5 border border-amber-200 shadow-inner">
            <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-sm">
              <ellipse cx="20" cy="25" rx="15" ry="9" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
              <ellipse cx="20" cy="21" rx="14" ry="7" fill="#fffdfa" stroke="#cbd5e1" strokeWidth="1" />
              <circle cx="16" cy="20" r="1.5" fill="#f59e0b" />
              <circle cx="22" cy="19" r="1.5" fill="#15803d" />
              <circle cx="20" cy="22" r="1.2" fill="#ea580c" />
            </svg>
          </div>
        );

      case 'thali':
        return (
          <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center p-1.5 border border-amber-200 shadow-inner">
            <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-sm">
              <circle cx="20" cy="20" r="17" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.2" />
              <circle cx="20" cy="20" r="15" fill="#f8fafc" stroke="#94a3b8" strokeWidth="0.8" />
              <circle cx="13" cy="14" r="4" fill="#ea580c" />
              <circle cx="27" cy="14" r="4" fill="#16a34a" />
              <ellipse cx="20" cy="26" rx="9" ry="4" fill="#fef08a" stroke="#d97706" strokeWidth="0.8" />
            </svg>
          </div>
        );

      case 'curry':
        return (
          <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center p-1.5 border border-amber-200 shadow-inner">
            <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-sm">
              <ellipse cx="20" cy="26" rx="15" ry="8" fill="#dc2626" stroke="#991b1b" strokeWidth="1" />
              <ellipse cx="20" cy="22" rx="14" ry="6" fill="#ea580c" />
              <circle cx="16" cy="21" r="2" fill="#facc15" />
              <circle cx="24" cy="22" r="1.8" fill="#f59e0b" />
              <circle cx="20" cy="20" r="1.5" fill="#15803d" />
            </svg>
          </div>
        );

      case 'roti':
        return (
          <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center p-1.5 border border-amber-200 shadow-inner">
            <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-sm">
              <circle cx="20" cy="20" r="15" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
              <circle cx="16" cy="18" r="1.5" fill="#b45309" opacity="0.6" />
              <circle cx="24" cy="21" r="1.8" fill="#b45309" opacity="0.6" />
              <circle cx="19" cy="25" r="1.2" fill="#b45309" opacity="0.6" />
            </svg>
          </div>
        );

      case 'snack':
      default:
        return (
          <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center p-1.5 border border-amber-200 shadow-inner">
            <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-sm">
              <circle cx="20" cy="20" r="14" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.2" />
              <circle cx="17" cy="18" r="2" fill="#ca8a04" />
              <circle cx="23" cy="21" r="2" fill="#ea580c" />
              <path d="M 14,24 Q 20,28 26,24" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </svg>
          </div>
        );
    }
  };

  const isSoldOut = item.availability === 'SOLD OUT';

  return (
    <div
      id={`food-item-${item.id}`}
      className={`relative p-4 rounded-2xl transition-all duration-200 border-2 ${
        isSoldOut 
          ? 'bg-slate-50/70 border-slate-200 opacity-80' 
          : 'bg-[#FFF8EE] border-[#1F2937]/10 hover:border-[#7C5CFF]/60 hover:shadow-md'
      } ${className}`}
    >
      {/* Top row: Icon, Name & Stamp */}
      <div className="flex items-start justify-between gap-2.5">
        <div className="flex items-center gap-3">
          {renderClayIcon()}
          <div>
            <h3 className="font-extrabold text-lg text-[#1F2937] leading-snug">
              {item.name}
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              {item.price !== undefined && item.price !== null ? (
                <span className="font-black text-lg text-[#1F2937] font-mono">
                  ₹{item.price}
                </span>
              ) : (
                <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                  Price not specified
                </span>
              )}
              {item.preparationTime && (
                <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                  ⏱ {item.preparationTime}
                </span>
              )}
            </div>
            {item.note && (
              <div className="mt-1">
                <span className="text-[10px] font-mono font-bold text-amber-900 bg-amber-100/90 border border-amber-300 px-2 py-0.5 rounded inline-block">
                  📌 {item.note}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex-shrink-0">
          <AvailabilityStamp status={item.availability} size="sm" />
        </div>
      </div>

      {/* Description */}
      {item.description && (
        <p className="font-handwriting text-slate-700 text-sm sm:text-base mt-2.5 leading-snug">
          {item.description}
        </p>
      )}

      {/* Footer info & Action button */}
      <div className="flex items-center justify-between mt-3 pt-2 border-t border-dashed border-[#1F2937]/10">
        <span className="text-[11px] font-mono text-slate-400">
          {item.caloriesApprox ? `~${item.caloriesApprox}` : 'Canteen staple'}
        </span>

        {/* Engineering-humor Quick Action Button */}
        <button
          onClick={handleOrder}
          disabled={isSoldOut || compilingState !== 'idle'}
          className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
            isSoldOut
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : compilingState === 'compiling'
              ? 'bg-[#FFD166] text-[#1F2937] animate-pulse'
              : compilingState === 'success'
              ? 'bg-[#2ED8A7] text-slate-900 shadow-sm'
              : 'bg-[#7C5CFF] hover:bg-[#6847ed] text-white clay-button cursor-pointer'
          }`}
        >
          {compilingState === 'compiling' && (
            <>
              <span className="animate-spin text-xs">⚙</span>
              <span>Compiling snack...</span>
            </>
          )}

          {compilingState === 'success' && (
            <>
              <span>✓</span>
              <span>{item.name} compiled!</span>
            </>
          )}

          {compilingState === 'idle' && (
            <>
              <span>+</span>
              <span>{isSoldOut ? 'Sold Out' : 'Add to Tray'}</span>
            </>
          )}
        </button>
      </div>

      {/* Success notification banner toast when compiled */}
      {compilingState === 'success' && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2ED8A7] text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-md z-20 border border-emerald-600 whitespace-nowrap animate-bounce">
          ⚡ Fuel level restored!
        </div>
      )}
    </div>
  );
};
