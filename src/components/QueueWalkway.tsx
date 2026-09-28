import React, { useState } from 'react';
import { QueueDensity } from '../types';

interface QueueWalkwayProps {
  density: QueueDensity;
  description?: string;
  className?: string;
}

export const QueueWalkway: React.FC<QueueWalkwayProps> = ({
  density = 'MEDIUM',
  description = 'Moving steadily — ~4 min wait at billing counter',
  className = ''
}) => {
  const densityConfig: Record<QueueDensity, {
    label: 'LOW' | 'MEDIUM' | 'HIGH';
    studentCount: number;
    color: string;
    waitTime: string;
    badgeBg: string;
    badgeText: string;
  }> = {
    LOW: {
      label: 'LOW',
      studentCount: 2,
      color: '#2ED8A7',
      waitTime: '~1 min wait',
      badgeBg: 'bg-emerald-100 border-emerald-400',
      badgeText: 'text-emerald-800'
    },
    MEDIUM: {
      label: 'MEDIUM',
      studentCount: 5,
      color: '#FFD166',
      waitTime: '~4 min wait',
      badgeBg: 'bg-amber-100 border-amber-400',
      badgeText: 'text-amber-900'
    },
    HIGH: {
      label: 'HIGH',
      studentCount: 8,
      color: '#FF7F6A',
      waitTime: '~9 min wait',
      badgeBg: 'bg-rose-100 border-rose-400',
      badgeText: 'text-rose-900'
    }
  };

  const current = densityConfig[density] || densityConfig.MEDIUM;

  // Colors for clay students' backpacks & shirts
  const studentThemes = [
    { shirt: '#7C5CFF', bag: '#FF7F6A', hair: '#1F2937' },
    { shirt: '#2ED8A7', bag: '#1F2937', hair: '#451a03' },
    { shirt: '#FFD166', bag: '#7C5CFF', hair: '#1F2937' },
    { shirt: '#FF7F6A', bag: '#0ea5e9', hair: '#78350f' },
    { shirt: '#38bdf8', bag: '#f59e0b', hair: '#1F2937' },
    { shirt: '#a855f7', bag: '#10b981', hair: '#451a03' },
    { shirt: '#ec4899', bag: '#3b82f6', hair: '#1F2937' },
    { shirt: '#14b8a6', bag: '#f43f5e', hair: '#78350f' },
  ];

  return (
    <div className={`p-4 bg-[#FFF8EE] rounded-2xl border-2 border-[#1F2937]/15 shadow-sm ${className}`}>
      
      {/* Top Header info */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">🚶‍♂️</span>
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-[#7C5CFF] font-bold block">
              QUEUE
            </span>
            <span id="student-queue-status" className="font-extrabold text-2xl font-mono text-[#1F2937]">
              {current.label}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className={`px-2.5 py-1 rounded-full text-xs font-black border uppercase tracking-wider ${current.badgeBg} ${current.badgeText}`}>
            {current.waitTime}
          </span>
        </div>
      </div>

      {/* Visual Walkway Track with Tiny Clay Engineering Students */}
      <div className="relative w-full h-24 bg-gradient-to-r from-amber-50 via-slate-100 to-amber-100 rounded-xl border border-dashed border-[#1F2937]/25 p-2 overflow-hidden flex items-end justify-between">
        
        {/* Floor tiled walkway lines */}
        <div className="absolute inset-x-0 bottom-0 h-4 bg-amber-200/50 border-t border-amber-300 flex justify-around">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-0.5 h-full bg-amber-400/40" />
          ))}
        </div>

        {/* Direction arrow line on floor */}
        <div className="absolute top-2 left-3 right-20 flex items-center gap-2 pointer-events-none opacity-40">
          <span className="text-[10px] font-mono text-[#7C5CFF]">Walkway to Counter</span>
          <div className="flex-1 border-t border-dashed border-[#7C5CFF]" />
          <span className="text-[10px] text-[#7C5CFF]">▶▶</span>
        </div>

        {/* Queue of Clay Engineering Students */}
        <div className="flex items-end gap-1.5 sm:gap-3 z-10 pl-2 pb-1 overflow-x-auto max-w-[calc(100%-80px)]">
          {[...Array(current.studentCount)].map((_, idx) => {
            const theme = studentThemes[idx % studentThemes.length];
            return (
              <div
                key={idx}
                className="group relative flex flex-col items-center flex-shrink-0 animate-float-gentle cursor-pointer"
                style={{ animationDelay: `${idx * 0.25}s` }}
                title={`Engineer #${idx + 1} waiting with student ID`}
              >
                {/* Clay Student Character SVG */}
                <svg width="28" height="48" viewBox="0 0 32 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Feet / walking shoes */}
                  <ellipse cx="11" cy="51" rx="4" ry="2" fill="#1F2937" />
                  <ellipse cx="21" cy="51" rx="4" ry="2" fill="#1F2937" />

                  {/* Legs */}
                  <rect x="9" y="40" width="4" height="11" rx="1.5" fill="#334155" />
                  <rect x="19" y="40" width="4" height="11" rx="1.5" fill="#334155" />

                  {/* Backpack peeking out on back */}
                  <rect x="3" y="22" width="7" height="16" rx="3.5" fill={theme.bag} stroke="#1F2937" strokeWidth="0.8" />
                  {/* Backpack strap */}
                  <path d="M 9,24 Q 14,28 14,34" stroke={theme.bag} strokeWidth="2" strokeLinecap="round" />

                  {/* Torso / Clay Shirt */}
                  <rect x="8" y="20" width="16" height="21" rx="4" fill={theme.shirt} stroke="#1F2937" strokeWidth="1" />

                  {/* College ID card lanyard */}
                  <path d="M 12,20 L 16,30 L 20,20" stroke="#FF7F6A" strokeWidth="1.2" fill="none" />
                  {/* ID card badge */}
                  <rect x="14" y="29" width="4" height="6" rx="0.5" fill="#ffffff" stroke="#1F2937" strokeWidth="0.6" />
                  <rect x="15" y="30.5" width="2" height="1" fill="#0284c7" />

                  {/* Head */}
                  <circle cx="16" cy="12" r="7.5" fill="#fde68a" stroke="#d97706" strokeWidth="1" />
                  {/* Hair */}
                  <path d="M 8.5,12 C 8.5,6 23.5,6 23.5,12 C 22,8 10,8 8.5,12 Z" fill={theme.hair} />

                  {/* Eyes */}
                  <circle cx="14" cy="12" r="0.9" fill="#1F2937" />
                  <circle cx="18" cy="12" r="0.9" fill="#1F2937" />

                  {/* Smile */}
                  <path d="M 14.5,15 Q 16,16.5 17.5,15" stroke="#1F2937" strokeWidth="0.8" strokeLinecap="round" fill="none" />
                </svg>

                {/* Little speech/thought tooltip on hover */}
                <span className="hidden group-hover:block absolute -top-4 left-1/2 -translate-x-1/2 text-[8px] bg-slate-800 text-white px-1 py-0.5 rounded whitespace-nowrap z-20">
                  {idx === 0 ? "Next up!" : `In line #${idx + 1}`}
                </span>
              </div>
            );
          })}
        </div>

        {/* Canteen Billing Counter on the Right */}
        <div className="z-10 flex flex-col items-center flex-shrink-0">
          {/* Awning stripes */}
          <div className="w-16 h-4 bg-gradient-to-r from-red-500 via-white to-red-500 rounded-t flex border border-red-600 shadow-xs">
            <div className="w-4 h-full bg-red-500" />
            <div className="w-4 h-full bg-white" />
            <div className="w-4 h-full bg-red-500" />
            <div className="w-4 h-full bg-white" />
          </div>
          {/* Wooden counter */}
          <div className="w-16 h-10 bg-amber-800 rounded-b border border-amber-900 flex flex-col items-center justify-center p-1 shadow-md">
            <span className="text-[8px] text-amber-100 font-extrabold tracking-tighter uppercase font-mono">
              BILLING
            </span>
            <div className="w-6 h-1 bg-amber-950 rounded-full mt-1" />
            {/* Bell on counter */}
            <div className="w-2.5 h-2 bg-yellow-400 rounded-t-full border border-yellow-600 mt-0.5" />
          </div>
        </div>

      </div>

      {/* Queue status microcopy */}
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-dashed border-[#1F2937]/15 text-xs">
        <span className="text-slate-600 font-handwriting text-sm">
          {description}
        </span>
        <span className="text-[10px] font-mono text-[#7C5CFF] font-bold">
          Queue optimization: ACTIVE
        </span>
      </div>

    </div>
  );
};
