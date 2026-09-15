import React from 'react';
import { motion } from 'motion/react';

interface MagnoProps {
  mood?: 'happy' | 'curious' | 'puzzled' | 'thoughtful' | 'triumphant';
  isAttracting?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showSparkles?: boolean;
  className?: string;
}

export const MagnoCharacter: React.FC<MagnoProps> = ({
  mood = 'happy',
  isAttracting = false,
  size = 'md',
  showSparkles = false,
  className = ''
}) => {
  const sizeMap = {
    sm: { w: 90, h: 90, scale: 0.75 },
    md: { w: 140, h: 140, scale: 1 },
    lg: { w: 180, h: 180, scale: 1.25 },
    hero: { w: 230, h: 230, scale: 1.6 }
  };

  const currentSize = sizeMap[size];

  return (
    <div 
      className={`relative inline-flex flex-col items-center justify-center select-none ${className}`}
      style={{ width: currentSize.w, height: currentSize.h }}
    >
      {/* Magnetic Aura / Field Lines when active */}
      {(isAttracting || showSparkles) && (
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.35, 0.75, 0.35]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -inset-4 rounded-full bg-gradient-to-tr from-cyan-400/25 via-rose-400/25 to-amber-300/25 blur-lg pointer-events-none"
        />
      )}

      {/* SVG Horseshoe Magnet */}
      <svg
        viewBox="0 0 160 160"
        className="w-full h-full drop-shadow-md overflow-visible"
      >
        <defs>
          <linearGradient id="redGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#e11d48" />
          </linearGradient>
          <linearGradient id="blueGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
          <linearGradient id="silverGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f1f5f9" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
        </defs>

        {/* Magnetic field arcs at poles */}
        {isAttracting && (
          <g className="animate-pulse">
            <path
              d="M 28 20 C 50 -10, 110 -10, 132 20"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="3.5"
              strokeDasharray="4,4"
              opacity="0.8"
            />
            <path
              d="M 28 8 C 50 -24, 110 -24, 132 8"
              fill="none"
              stroke="#f43f5e"
              strokeWidth="2.5"
              strokeDasharray="5,5"
              opacity="0.6"
            />
          </g>
        )}

        {/* Outer Horseshoe Body */}
        {/* Left red arm */}
        <path
          d="M 18 36 L 18 80 C 18 124 50 144 80 144 L 80 114 C 60 114 44 100 44 80 L 44 36 Z"
          fill="url(#redGrad)"
          stroke="#be123c"
          strokeWidth="3"
        />

        {/* Right blue arm */}
        <path
          d="M 80 144 C 110 144 142 124 142 80 L 142 36 L 116 36 L 116 80 C 116 100 100 114 80 114 Z"
          fill="url(#blueGrad)"
          stroke="#0369a1"
          strokeWidth="3"
        />

        {/* Bottom curve highlight */}
        <path
          d="M 38 90 C 44 120 70 134 80 134 C 90 134 116 120 122 90"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3"
          opacity="0.3"
          strokeLinecap="round"
        />

        {/* Left Pole Cap (N) - Silver tip */}
        <rect
          x="18"
          y="18"
          width="26"
          height="18"
          rx="4"
          fill="url(#silverGrad)"
          stroke="#94a3b8"
          strokeWidth="2"
        />
        <text
          x="31"
          y="31"
          textAnchor="middle"
          fontSize="11"
          fontWeight="bold"
          fill="#be123c"
          className="font-display select-none"
        >
          N
        </text>

        {/* Right Pole Cap (S) - Silver tip */}
        <rect
          x="116"
          y="18"
          width="26"
          height="18"
          rx="4"
          fill="url(#silverGrad)"
          stroke="#94a3b8"
          strokeWidth="2"
        />
        <text
          x="129"
          y="31"
          textAnchor="middle"
          fontSize="11"
          fontWeight="bold"
          fill="#0369a1"
          className="font-display select-none"
        >
          S
        </text>

        {/* Face center area at the bottom U-curve */}
        <g transform="translate(80, 114)">
          {/* Cheeks */}
          <circle cx="-22" cy="-4" r="5" fill="#fda4af" opacity="0.8" />
          <circle cx="22" cy="-4" r="5" fill="#fda4af" opacity="0.8" />

          {/* Eyes depending on mood */}
          {mood === 'happy' || mood === 'triumphant' ? (
            <>
              {/* Joyful curved eyes or big happy eyes */}
              <circle cx="-14" cy="-12" r="5.5" fill="#0f172a" />
              <circle cx="-12" cy="-14" r="2" fill="#ffffff" />
              <circle cx="14" cy="-12" r="5.5" fill="#0f172a" />
              <circle cx="16" cy="-14" r="2" fill="#ffffff" />
              {/* Happy smile */}
              <path
                d="M -10 -2 Q 0 8 10 -2"
                fill="none"
                stroke="#0f172a"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </>
          ) : mood === 'puzzled' ? (
            <>
              {/* One raised eyebrow, quizzical eyes */}
              <circle cx="-14" cy="-10" r="6" fill="#0f172a" />
              <circle cx="-12" cy="-12" r="2" fill="#ffffff" />
              {/* Squinted other eye */}
              <path
                d="M 8 -10 Q 14 -16 20 -10"
                fill="none"
                stroke="#0f172a"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              {/* O-shaped mouth */}
              <circle cx="0" cy="0" r="4.5" fill="#0f172a" />
              {/* Small floating question mark */}
              <text x="32" y="-20" fontSize="16" fontWeight="bold" fill="#f59e0b" className="font-display">?</text>
            </>
          ) : mood === 'thoughtful' ? (
            <>
              {/* Looking up thoughtfully */}
              <circle cx="-14" cy="-14" r="5" fill="#0f172a" />
              <circle cx="-13" cy="-16" r="2" fill="#ffffff" />
              <circle cx="14" cy="-14" r="5" fill="#0f172a" />
              <circle cx="15" cy="-16" r="2" fill="#ffffff" />
              {/* Thoughtful wavy line */}
              <path
                d="M -7 -2 Q 0 -6 7 -2"
                fill="none"
                stroke="#0f172a"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </>
          ) : (
            <>
              {/* Curious wide open eyes */}
              <circle cx="-14" cy="-12" r="6" fill="#0f172a" />
              <circle cx="-12" cy="-14" r="2.5" fill="#ffffff" />
              <circle cx="14" cy="-12" r="6" fill="#0f172a" />
              <circle cx="16" cy="-14" r="2.5" fill="#ffffff" />
              <path
                d="M -6 -2 Q 0 4 6 -2"
                fill="none"
                stroke="#0f172a"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </>
          )}

          {/* Triumphant crown/stars */}
          {mood === 'triumphant' && (
            <path
              d="M -16 -34 L -10 -22 L 0 -34 L 10 -22 L 16 -34 L 12 -18 L -12 -18 Z"
              fill="#fbbf24"
              stroke="#d97706"
              strokeWidth="2"
            />
          )}
        </g>
      </svg>

      {/* Sparkles / stars */}
      {showSparkles && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-1 -right-1 text-amber-400 text-lg pointer-events-none"
        >
          ✨
        </motion.div>
      )}
    </div>
  );
};
