import React from 'react';
import { AvailabilityStatus } from '../types';

interface AvailabilityStampProps {
  status: AvailabilityStatus;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const AvailabilityStamp: React.FC<AvailabilityStampProps> = ({
  status,
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 tracking-wider border',
    md: 'text-xs px-2.5 py-1 tracking-widest border-2',
    lg: 'text-sm px-3.5 py-1.5 tracking-widest border-2'
  };

  switch (status) {
    case 'AVAILABLE':
      return (
        <span
          className={`inline-block font-extrabold uppercase rounded-sm select-none stamp-available ${sizeClasses[size]} ${className}`}
          style={{
            fontFamily: "'Nunito', sans-serif",
            textShadow: '0 0.5px 0.5px rgba(46, 216, 167, 0.5)'
          }}
        >
          <span className="inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2ED8A7] inline-block animate-pulse" />
            AVAILABLE
          </span>
        </span>
      );

    case 'GOING FAST':
      return (
        <span
          className={`inline-block font-black uppercase rounded-sm select-none stamp-going-fast ${sizeClasses[size]} ${className}`}
          style={{
            fontFamily: "'Nunito', sans-serif",
            letterSpacing: '0.15em'
          }}
        >
          <span className="inline-flex items-center gap-1">
            ⚡ GOING FAST
          </span>
        </span>
      );

    case 'SOLD OUT':
      return (
        <span
          className={`inline-block font-black uppercase rounded-sm select-none stamp-sold-out ${sizeClasses[size]} ${className}`}
          style={{
            fontFamily: "'Nunito', sans-serif",
            letterSpacing: '0.18em'
          }}
        >
          <span className="inline-flex items-center gap-1">
            ✕ SOLD OUT
          </span>
        </span>
      );

    default:
      return null;
  }
};
