import React from 'react';
import { EngineeringDoodle } from './EngineeringDoodle';

interface NotebookPageProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const NotebookPage: React.FC<NotebookPageProps> = ({
  children,
  className = '',
  id = 'canteen-notebook-page'
}) => {
  return (
    <div className="relative w-full max-w-6xl mx-auto my-4 sm:my-8 px-2 sm:px-4 select-text">
      
      {/* Wooden Notice Board Pins holding the notebook on top corners */}
      <div className="hidden sm:flex justify-between items-center px-12 -mb-3 z-30 relative pointer-events-none">
        {/* Left Brass Pushpin */}
        <div className="flex flex-col items-center">
          <div className="w-5 h-5 rounded-full bg-[#FF7F6A] shadow-lg border-2 border-[#b91c1c] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white/70" />
          </div>
          <div className="w-0.5 h-2 bg-slate-700 -mt-0.5" />
        </div>

        {/* Center Sticky Tape */}
        <div className="w-28 h-6 washi-tape rotate-1 border-t border-b border-amber-300/60 shadow-xs" />

        {/* Right Mint Pushpin */}
        <div className="flex flex-col items-center">
          <div className="w-5 h-5 rounded-full bg-[#2ED8A7] shadow-lg border-2 border-[#047857] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white/70" />
          </div>
          <div className="w-0.5 h-2 bg-slate-700 -mt-0.5" />
        </div>
      </div>

      {/* Main Notebook Container */}
      <div
        id={id}
        className={`relative bg-[#FFF8EE] rounded-2xl sm:rounded-3xl shadow-2xl border border-amber-900/15 overflow-hidden transition-all duration-300 ${className}`}
      >
        
        {/* Top Spiral Wire Binding (Mobile & Desktop) */}
        <div className="w-full bg-[#ede3d1] border-b border-amber-900/10 px-4 sm:px-8 py-2.5 flex items-center justify-between overflow-x-hidden relative shadow-inner">
          <div className="flex items-center gap-4 sm:gap-6 w-full justify-between">
            {[...Array(24)].map((_, i) => (
              <div key={i} className="flex flex-col items-center flex-shrink-0">
                {/* Punched hole */}
                <div className="w-3.5 h-3.5 rounded-full bg-[#4a3b2c]/80 shadow-inner border border-[#302419]" />
                {/* Spiral metallic ring loop */}
                <div className="w-1.5 h-5 bg-gradient-to-r from-slate-400 via-slate-100 to-slate-400 rounded-full -mt-2.5 shadow-sm" />
              </div>
            ))}
          </div>

          {/* Student Classmate Notebook header text */}
          <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#1F2937]/50">
              Department of Fuel & Chai // Sem IV
            </span>
            <div className="w-2 h-2 rounded-full bg-[#2ED8A7]" />
          </div>
        </div>

        {/* Notebook Content Layout: Red Margin Line + Ruled Pages */}
        <div className="relative flex flex-col md:flex-row min-h-[700px] notebook-ruled-lines">
          
          {/* Left Red Margin (Notebook Spine / Notes Margin) */}
          <div className="hidden lg:flex w-20 xl:w-24 flex-shrink-0 flex-col items-center py-8 border-r-2 border-rose-400/60 bg-[#fffbf2]/80 space-y-8 select-none">
            
            {/* Margin Annotations */}
            <div className="rotate-90 origin-center text-[11px] font-mono tracking-widest text-slate-400 whitespace-nowrap mt-16">
              CANTEEN_LOG // P. 42
            </div>

            {/* Subtle Easter Egg Doodles in margin */}
            <EngineeringDoodle type="compass" size={42} color="#7C5CFF" className="mt-8" />
            <EngineeringDoodle type="bolt" size={32} color="#FF7F6A" />
            
            <div className="font-handwriting text-xs text-[#7C5CFF] text-center px-1">
              "Check queue before break!"
            </div>

            <EngineeringDoodle type="gear" size={34} color="#2ED8A7" />
            <div className="w-8 border-b-2 border-dotted border-rose-300" />
            <div className="text-[10px] font-mono text-rose-500 font-bold">
              Q.E.D.
            </div>
          </div>

          {/* Main Notebook Body */}
          <div className="flex-1 p-4 sm:p-7 md:p-9 relative z-10">
            {children}
          </div>
        </div>

        {/* Bottom Notebook Footer edge with ruler markings */}
        <div className="bg-[#f5ecdd] border-t border-amber-900/10 px-4 sm:px-8 py-2 flex flex-wrap items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-slate-400">0cm</span>
            <div style={{ width: '176.993px' }} className="h-2 border-b border-t border-slate-400/40 flex justify-between">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-px h-full bg-slate-400/60" />
              ))}
            </div>
            <span className="font-mono text-[10px] text-slate-400">15cm</span>
          </div>

          <div className="font-handwriting text-sm text-[#7C5CFF] font-bold">
            Canteen Connect • Made for Hungry Engineers
          </div>
        </div>

      </div>
    </div>
  );
};
