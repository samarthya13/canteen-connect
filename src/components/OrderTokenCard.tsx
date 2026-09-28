import React from 'react';
import { OrderToken } from '../types';

interface OrderTokenCardProps {
  token: OrderToken;
  onClose?: () => void;
  onStatusChange?: (newStatus: OrderToken['status']) => void;
  className?: string;
  isCompact?: boolean;
}

export const OrderTokenCard: React.FC<OrderTokenCardProps> = ({
  token,
  onClose,
  onStatusChange,
  className = '',
  isCompact = false
}) => {
  const getStatusBadge = () => {
    switch (token.status) {
      case 'READY':
        return {
          bg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          dot: 'bg-emerald-500',
          text: 'READY FOR PICKUP! 🔔'
        };
      case 'PREPARING':
        return {
          bg: 'bg-amber-100 text-amber-900 border-amber-300',
          dot: 'bg-amber-500 animate-ping',
          text: 'PREPARING AT COUNTER ⏳'
        };
      case 'COLLECTED':
        return {
          bg: 'bg-slate-100 text-slate-700 border-slate-300',
          dot: 'bg-slate-400',
          text: 'COLLECTED & ENJOYED 🍽️'
        };
      case 'CANCELLED':
        return {
          bg: 'bg-rose-100 text-rose-800 border-rose-300',
          dot: 'bg-rose-500',
          text: 'CANCELLED'
        };
      default:
        return {
          bg: 'bg-blue-100 text-blue-800 border-blue-300',
          dot: 'bg-blue-500',
          text: token.status
        };
    }
  };

  const statusInfo = getStatusBadge();

  return (
    <div className={`relative bg-[#FFFDF8] border-2 border-[#1F2937]/30 rounded-2xl shadow-xl p-5 sm:p-6 font-mono select-none ${className}`}>
      {/* Brass paperclip graphic at top */}
      <div className="absolute -top-3 left-8 w-6 h-10 z-20 pointer-events-none">
        <div className="w-4 h-9 rounded-full border-2 border-amber-600 bg-transparent shadow-xs" />
      </div>

      {/* Red perforated receipt tear edge at bottom */}
      <div className="absolute -bottom-1.5 left-0 right-0 h-3 flex justify-between overflow-hidden px-1">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className="w-2.5 h-2.5 bg-[#FFF8EE] rotate-45 transform -translate-y-1.5" />
        ))}
      </div>

      {/* Top Bar with Canteen Token header */}
      <div className="flex items-start justify-between border-b-2 border-dashed border-[#1F2937]/20 pb-3 mb-3">
        <div>
          <span className="text-[10px] tracking-widest font-black uppercase text-[#7C5CFF] block">
            CANTEEN CONNECT • COUNTER PASS
          </span>
          <h3 className="font-extrabold text-base text-[#1F2937] tracking-tight">
            ENGINEERING HOSTEL & CANTEEN
          </h3>
          <p className="text-[11px] text-slate-500 font-sans">
            Issued: {token.timestamp}
          </p>
        </div>

        {onClose && (
          <button
            id="close-order-token-button"
            type="button"
            onClick={onClose}
            aria-label="Close token preview"
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-600 text-xs font-bold cursor-pointer transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      {/* Prominent Physical Token Number Box */}
      <div className="bg-amber-50/80 border-2 border-amber-300 rounded-xl p-3 my-2 text-center shadow-inner">
        <span className="text-[10px] uppercase font-bold text-amber-900 tracking-wider block">
          OFFICIAL CANTEEN TOKEN NUMBER
        </span>
        <div className="text-3xl sm:text-4xl font-black tracking-widest text-[#1F2937] font-mono my-1">
          {token.tokenNumber}
        </div>
        
        {/* Status Chip */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border mt-1 shadow-2xs">
          <span className={`w-2 h-2 rounded-full ${statusInfo.dot}`} />
          <span className={statusInfo.bg.split(' ')[1]}>{statusInfo.text}</span>
        </div>
      </div>

      {/* Items Breakdown */}
      <div className="my-3 space-y-1.5 text-xs">
        <div className="flex justify-between text-slate-400 uppercase text-[10px] font-bold border-b border-dashed border-slate-200 pb-1">
          <span>ITEM</span>
          <span>QTY × AMT</span>
        </div>
        
        {token.items.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center text-slate-800">
            <span className="font-medium text-xs truncate max-w-[210px]">
              {item.name}
            </span>
            <span className="font-bold font-mono">
              {item.quantity} × ₹{item.price}
            </span>
          </div>
        ))}

        <div className="flex justify-between items-center border-t-2 border-dashed border-[#1F2937]/20 pt-2 mt-2 font-bold text-sm">
          <span>TOTAL PAYABLE</span>
          <span className="text-base text-[#1F2937]">₹{token.totalAmount}</span>
        </div>
      </div>

      {/* Counter instructions */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 my-2 text-[11px] leading-tight text-slate-600">
        <div className="flex items-center gap-1 font-bold text-slate-800 mb-0.5">
          <span>📍</span>
          <span>{token.counterLocation}</span>
        </div>
        <p className="text-[10px] font-sans">
          {token.specialNotes || 'Present this token on your phone when your number is called.'}
        </p>
      </div>

      {/* Barcode Mock for Canteen Scanner */}
      <div className="pt-2 pb-1 flex flex-col items-center">
        <div className="h-8 w-44 flex items-center justify-between opacity-75">
          {[2, 1, 3, 1, 4, 2, 1, 3, 2, 4, 1, 2, 3, 1, 2, 4, 2, 1, 3, 2].map((w, idx) => (
            <div
              key={idx}
              className="h-full bg-slate-900"
              style={{ width: `${w * 1.5}px` }}
            />
          ))}
        </div>
        <span className="text-[9px] text-slate-400 tracking-widest mt-1">
          CC-REF-{token.id.slice(-6).toUpperCase()}
        </span>
      </div>

      {/* Interactive Status Changer (If Admin or Testing) */}
      {onStatusChange && (
        <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between gap-1 text-[10px]">
          <span className="text-slate-400 font-sans">Test Status:</span>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => onStatusChange('PREPARING')}
              className="px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded hover:bg-amber-200 cursor-pointer"
            >
              Preparing
            </button>
            <button
              type="button"
              onClick={() => onStatusChange('READY')}
              className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded hover:bg-emerald-200 cursor-pointer"
            >
              Ready
            </button>
            <button
              type="button"
              onClick={() => onStatusChange('COLLECTED')}
              className="px-1.5 py-0.5 bg-slate-100 text-slate-800 rounded hover:bg-slate-200 cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
