import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playGiggleSound, playBoingSound } from '../utils/audio';

interface MagnoProps {
  mood?: 'happy' | 'curious' | 'puzzled' | 'thoughtful' | 'triumphant' | 'giggling' | 'excited';
  isAttracting?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showSparkles?: boolean;
  className?: string;
  isInteractive?: boolean;
}

export const MagnoCharacter: React.FC<MagnoProps> = ({
  mood = 'happy',
  isAttracting = false,
  size = 'md',
  showSparkles = false,
  className = '',
  isInteractive = true
}) => {
  const [clickCount, setClickCount] = useState(0);
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [bubbleText, setBubbleText] = useState('Salut! Sunt Magno! 🧲');

  const sizeMap = {
    sm: { w: 96, h: 96, scale: 0.8 },
    md: { w: 150, h: 150, scale: 1 },
    lg: { w: 190, h: 190, scale: 1.25 },
    hero: { w: 240, h: 240, scale: 1.55 }
  };

  const currentSize = sizeMap[size];

  const handleMagnoClick = () => {
    if (!isInteractive) return;
    const phrases = [
      'Ghi-ghi-ghi! Mă gâdili! 🤭',
      'Hopa! ZAC-ZAC! ⚡',
      'Cine are chef de știință? 🧪',
      'Unde-s prietenii mei de fier? 🥄',
      'Sunt cel mai vesel magnet! 💖',
      'Cine sare spre mine? 🧲'
    ];
    const phrase = phrases[clickCount % phrases.length];
    setBubbleText(phrase);
    setShowSpeechBubble(true);
    setClickCount(c => c + 1);

    if (clickCount % 2 === 0) {
      playGiggleSound();
    } else {
      playBoingSound();
    }

    setTimeout(() => {
      setShowSpeechBubble(false);
    }, 2200);
  };

  return (
    <motion.div 
      whileHover={isInteractive ? { scale: 1.05, rotate: [-1, 2, -1] } : undefined}
      whileTap={isInteractive ? { scale: 0.92, rotate: 4 } : undefined}
      onClick={handleMagnoClick}
      className={`relative inline-flex flex-col items-center justify-center select-none ${isInteractive ? 'cursor-pointer' : ''} ${className}`}
      style={{ width: currentSize.w, height: currentSize.h }}
      title={isInteractive ? 'Apasă pe Magno să vezi ce zice!' : undefined}
    >
      {/* Speech bubble popup when clicked */}
      <AnimatePresence>
        {showSpeechBubble && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -20, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.8 }}
            className="absolute -top-12 z-30 bg-amber-400 text-amber-950 font-display font-extrabold text-xs sm:text-sm px-3.5 py-1.5 rounded-2xl shadow-lg border-2 border-white whitespace-nowrap flex items-center gap-1.5 pointer-events-none"
          >
            <span>{bubbleText}</span>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-6 border-x-transparent border-t-8 border-t-amber-400" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating magnetic love/energy bubbles */}
      {(isAttracting || showSparkles) && (
        <motion.div
          animate={{
            scale: [1, 1.22, 1],
            opacity: [0.4, 0.85, 0.4]
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -inset-3 rounded-full bg-radial from-rose-400/30 via-sky-400/25 to-amber-300/30 blur-md pointer-events-none"
        />
      )}

      {/* Comic Book Sparks */}
      {isAttracting && (
        <>
          <motion.div
            animate={{ scale: [0.8, 1.3, 0.8], rotate: [0, 15, -15, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="absolute -top-2 -left-1 text-sky-400 text-lg sm:text-xl font-black pointer-events-none"
          >
            ⚡
          </motion.div>
          <motion.div
            animate={{ scale: [1.2, 0.7, 1.2], rotate: [0, -20, 20, 0] }}
            transition={{ duration: 0.9, repeat: Infinity }}
            className="absolute -top-2 -right-1 text-rose-500 text-lg sm:text-xl font-black pointer-events-none"
          >
            ⚡
          </motion.div>
        </>
      )}

      {/* Main SVG Character */}
      <svg
        viewBox="0 0 170 170"
        className="w-full h-full drop-shadow-lg overflow-visible"
      >
        <defs>
          <linearGradient id="magnoRed" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff4b72" />
            <stop offset="60%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#e11d48" />
          </linearGradient>
          <linearGradient id="magnoBlue" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="60%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
          <linearGradient id="magnoSilver" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
          <linearGradient id="bootYellow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#eab308" />
          </linearGradient>
        </defs>

        {/* Magnetic field arcs at poles */}
        {isAttracting && (
          <g className="animate-pulse">
            <path
              d="M 32 20 C 56 -14, 114 -14, 138 20"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="4"
              strokeDasharray="5,4"
              opacity="0.85"
            />
            <path
              d="M 32 6 C 56 -28, 114 -28, 138 6"
              fill="none"
              stroke="#f43f5e"
              strokeWidth="3.5"
              strokeDasharray="6,5"
              opacity="0.75"
            />
          </g>
        )}

        {/* Cute Little Shoes / Boots at the bottom */}
        <g id="magno-shoes">
          {/* Left boot */}
          <ellipse cx="64" cy="148" rx="14" ry="8" fill="url(#bootYellow)" stroke="#ca8a04" strokeWidth="2.5" />
          <ellipse cx="60" cy="145" rx="6" ry="3" fill="#ffffff" opacity="0.6" />
          {/* Right boot */}
          <ellipse cx="106" cy="148" rx="14" ry="8" fill="url(#bootYellow)" stroke="#ca8a04" strokeWidth="2.5" />
          <ellipse cx="102" cy="145" rx="6" ry="3" fill="#ffffff" opacity="0.6" />
        </g>

        {/* Outer Horseshoe Body with chubby rounded corners */}
        {/* Left red arm */}
        <path
          d="M 22 36 L 22 84 C 22 130 52 142 85 142 L 85 112 C 64 112 48 98 48 82 L 48 36 Z"
          fill="url(#magnoRed)"
          stroke="#9f1239"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Right blue arm */}
        <path
          d="M 85 142 C 118 142 148 130 148 84 L 148 36 L 122 36 L 122 82 C 122 98 106 112 85 112 Z"
          fill="url(#magnoBlue)"
          stroke="#075985"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Sweet glossy body highlights */}
        <path
          d="M 30 42 L 30 82 C 30 110 50 126 70 132"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.45"
        />
        <path
          d="M 140 42 L 140 82 C 140 110 120 126 100 132"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.35"
        />

        {/* Left Pole Cap (N) - Shiny Silver with Cute N */}
        <rect
          x="20"
          y="16"
          width="30"
          height="22"
          rx="6"
          fill="url(#magnoSilver)"
          stroke="#64748b"
          strokeWidth="2.5"
        />
        <text
          x="35"
          y="32"
          textAnchor="middle"
          fontSize="14"
          fontWeight="900"
          fill="#e11d48"
          className="font-display select-none"
        >
          N
        </text>

        {/* Right Pole Cap (S) - Shiny Silver with Cute S */}
        <rect
          x="120"
          y="16"
          width="30"
          height="22"
          rx="6"
          fill="url(#magnoSilver)"
          stroke="#64748b"
          strokeWidth="2.5"
        />
        <text
          x="135"
          y="32"
          textAnchor="middle"
          fontSize="14"
          fontWeight="900"
          fill="#0284c7"
          className="font-display select-none"
        >
          S
        </text>

        {/* Cute Cartoon White Gloves / Hands */}
        <g id="magno-hands">
          {/* Left waving hand */}
          <g transform="translate(10, 80)">
            <ellipse cx="0" cy="0" rx="9" ry="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2.5" />
            <ellipse cx="-4" cy="-4" rx="4" ry="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
            <circle cx="2" cy="0" r="2" fill="#fda4af" opacity="0.4" />
          </g>
          {/* Right waving hand */}
          <g transform="translate(160, 80)">
            <ellipse cx="0" cy="0" rx="9" ry="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2.5" />
            <ellipse cx="4" cy="-4" rx="4" ry="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
            <circle cx="-2" cy="0" r="2" fill="#fda4af" opacity="0.4" />
          </g>
        </g>

        {/* Super Cute Kawaii Face in the U-curve center */}
        <g transform="translate(85, 114)">
          {/* Rosy blushing cheeks */}
          <ellipse cx="-24" cy="-4" rx="7" ry="4.5" fill="#fda4af" opacity="0.9" />
          <ellipse cx="24" cy="-4" rx="7" ry="4.5" fill="#fda4af" opacity="0.9" />
          {/* Little blush lines */}
          <line x1="-27" y1="-5" x2="-21" y2="-3" stroke="#f43f5e" strokeWidth="1" strokeLinecap="round" />
          <line x1="21" y1="-3" x2="27" y2="-5" stroke="#f43f5e" strokeWidth="1" strokeLinecap="round" />

          {/* Eyes depending on mood */}
          {mood === 'happy' || mood === 'triumphant' || mood === 'excited' ? (
            <>
              {/* Big sparkling anime eyes */}
              <circle cx="-14" cy="-14" r="7.5" fill="#1e1b4b" />
              {/* Big twinkle */}
              <circle cx="-12" cy="-16" r="3.2" fill="#ffffff" />
              <circle cx="-16" cy="-11" r="1.5" fill="#ffffff" />

              <circle cx="14" cy="-14" r="7.5" fill="#1e1b4b" />
              {/* Big twinkle */}
              <circle cx="16" cy="-16" r="3.2" fill="#ffffff" />
              <circle cx="12" cy="-11" r="1.5" fill="#ffffff" />

              {/* Big joyful open mouth with cute tongue */}
              <path
                d="M -11 -3 Q 0 11 11 -3 Z"
                fill="#881337"
                stroke="#1e1b4b"
                strokeWidth="2.5"
              />
              <path
                d="M -6 4 Q 0 1 6 4"
                fill="#fb7185"
              />
            </>
          ) : mood === 'puzzled' ? (
            <>
              {/* Big round puzzled eye with question mark */}
              <circle cx="-14" cy="-12" r="8" fill="#1e1b4b" />
              <circle cx="-12" cy="-14" r="3" fill="#ffffff" />

              {/* Squinted funny winking eye */}
              <path
                d="M 8 -12 Q 14 -18 20 -12"
                fill="none"
                stroke="#1e1b4b"
                strokeWidth="4"
                strokeLinecap="round"
              />
              {/* Small cute 'O' mouth */}
              <ellipse cx="0" cy="-1" rx="5" ry="6" fill="#881337" stroke="#1e1b4b" strokeWidth="2" />
              {/* Floating comic question mark */}
              <text x="28" y="-22" fontSize="20" fontWeight="900" fill="#f59e0b" className="font-display animate-bounce">?</text>
            </>
          ) : mood === 'thoughtful' ? (
            <>
              {/* Looking up thoughtfully */}
              <circle cx="-14" cy="-16" r="6.5" fill="#1e1b4b" />
              <circle cx="-12" cy="-18" r="2.5" fill="#ffffff" />
              <circle cx="14" cy="-16" r="6.5" fill="#1e1b4b" />
              <circle cx="16" cy="-18" r="2.5" fill="#ffffff" />
              {/* Cute squiggly smiling mouth */}
              <path
                d="M -8 -3 Q -4 -7 0 -3 Q 4 -7 8 -3"
                fill="none"
                stroke="#1e1b4b"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </>
          ) : (
            <>
              {/* Curious big round baby eyes */}
              <circle cx="-14" cy="-14" r="7.5" fill="#1e1b4b" />
              <circle cx="-12" cy="-16" r="3.2" fill="#ffffff" />
              <circle cx="14" cy="-14" r="7.5" fill="#1e1b4b" />
              <circle cx="16" cy="-16" r="3.2" fill="#ffffff" />
              {/* Gentle cute smile */}
              <path
                d="M -8 -3 Q 0 5 8 -3"
                fill="none"
                stroke="#1e1b4b"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </>
          )}

          {/* Golden Champion Crown for triumphant mood */}
          {(mood === 'triumphant') && (
            <g transform="translate(0, -22)">
              <polygon
                points="-18,-18 -10,-6 0,-20 10,-6 18,-18 14,-2 -14,-2"
                fill="#fbbf24"
                stroke="#d97706"
                strokeWidth="2.5"
              />
              <circle cx="-18" cy="-18" r="2.5" fill="#f43f5e" />
              <circle cx="0" cy="-20" r="3" fill="#38bdf8" />
              <circle cx="18" cy="-18" r="2.5" fill="#10b981" />
            </g>
          )}
        </g>
      </svg>

      {/* Floating Sparkles & Little Stars */}
      {(showSparkles || mood === 'triumphant') && (
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -top-3 -right-2 text-amber-400 text-xl font-bold pointer-events-none drop-shadow-sm"
        >
          ⭐
        </motion.div>
      )}
    </motion.div>
  );
};
