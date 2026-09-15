import React from 'react';

interface ObjectIllustrationProps {
  id: string;
  className?: string;
  size?: number;
  mood?: 'happy' | 'sleepy' | 'surprised' | 'snapped';
}

export const ObjectIllustration: React.FC<ObjectIllustrationProps> = ({
  id,
  className = '',
  size = 60
}) => {
  switch (id) {
    case 'lingura':
      return (
        <svg width={size} height={size} viewBox="0 0 70 70" className={`overflow-visible ${className}`} fill="none">
          <defs>
            <linearGradient id="cuteSpoon" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="60%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
          </defs>
          {/* Spoon bowl */}
          <ellipse cx="26" cy="24" rx="20" ry="16" transform="rotate(-25 26 24)" fill="url(#cuteSpoon)" stroke="#475569" strokeWidth="3" />
          <ellipse cx="24" cy="21" rx="14" ry="9" transform="rotate(-25 24 21)" fill="#ffffff" opacity="0.6" />
          
          {/* Spoon handle */}
          <path d="M38 32 C 45 38, 54 48, 58 56 C 60 59, 57 62, 54 60 C 46 54, 38 44, 32 36" fill="url(#cuteSpoon)" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
          
          {/* Cute face on spoon */}
          <g transform="translate(24, 22)">
            {/* Blushing cheeks */}
            <circle cx="-9" cy="3" r="3" fill="#fda4af" />
            <circle cx="9" cy="3" r="3" fill="#fda4af" />
            {/* Eyes */}
            <circle cx="-6" cy="-2" r="2.8" fill="#1e293b" />
            <circle cx="-5" cy="-3" r="1.2" fill="#ffffff" />
            <circle cx="6" cy="-2" r="2.8" fill="#1e293b" />
            <circle cx="7" cy="-3" r="1.2" fill="#ffffff" />
            {/* Joyful open smile */}
            <path d="M -4 2 Q 0 8 4 2" fill="#be123c" stroke="#1e293b" strokeWidth="1.5" />
          </g>
          {/* Cute pink bow on handle */}
          <g transform="translate(42, 38)">
            <circle cx="0" cy="0" r="2.5" fill="#f43f5e" />
            <polygon points="-5,-3 0,0 -5,3" fill="#fb7185" />
            <polygon points="5,-3 0,0 5,3" fill="#fb7185" />
          </g>
        </svg>
      );

    case 'cui':
      return (
        <svg width={size} height={size} viewBox="0 0 70 70" className={`overflow-visible ${className}`} fill="none">
          <defs>
            <linearGradient id="cuteNail" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>
          </defs>
          {/* Nail head */}
          <rect x="12" y="10" width="28" height="8" rx="3.5" transform="rotate(-40 26 14)" fill="#334155" stroke="#1e293b" strokeWidth="2.5" />
          {/* Nail body */}
          <polygon points="22,20 52,50 56,60 48,54" fill="url(#cuteNail)" stroke="#334155" strokeWidth="2.5" />
          
          {/* Face on nail body */}
          <g transform="translate(34, 33) rotate(-40)">
            <circle cx="-5" cy="3" r="2" fill="#fda4af" />
            <circle cx="5" cy="3" r="2" fill="#fda4af" />
            {/* Winking eye */}
            <path d="M -7 -1 Q -5 -4 -3 -1" fill="none" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" />
            {/* Big open eye */}
            <circle cx="5" cy="-2" r="2.5" fill="#0f172a" />
            <circle cx="6" cy="-3" r="1" fill="#ffffff" />
            {/* Cute cheeky smirk */}
            <path d="M -3 3 Q 1 6 4 2" fill="none" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />
          </g>
          {/* Sparkle */}
          <text x="50" y="24" fontSize="12">✨</text>
        </svg>
      );

    case 'moneda':
      return (
        <svg width={size} height={size} viewBox="0 0 70 70" className={`overflow-visible ${className}`} fill="none">
          <defs>
            <linearGradient id="cuteCoin" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="60%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
          <circle cx="35" cy="35" r="28" fill="url(#cuteCoin)" stroke="#b45309" strokeWidth="3" />
          <circle cx="35" cy="35" r="22" fill="none" stroke="#fef08a" strokeWidth="2" strokeDasharray="4 2" />

          {/* Cute sunglasses or sleepy eyes */}
          <g transform="translate(35, 34)">
            {/* Sunglasses frame */}
            <rect x="-18" y="-9" width="16" height="12" rx="4" fill="#1e293b" />
            <rect x="2" y="-9" width="16" height="12" rx="4" fill="#1e293b" />
            <line x1="-2" y1="-4" x2="2" y2="-4" stroke="#1e293b" strokeWidth="2.5" />
            {/* Glare on sunglasses */}
            <line x1="-15" y1="-7" x2="-8" y2="-1" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
            <line x1="5" y1="-7" x2="12" y2="-1" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />

            {/* Cool relaxed smile */}
            <path d="M -6 9 Q 0 14 6 9" fill="none" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
            {/* Cheeks */}
            <circle cx="-16" cy="7" r="3" fill="#f43f5e" opacity="0.4" />
            <circle cx="16" cy="7" r="3" fill="#f43f5e" opacity="0.4" />
          </g>
          {/* Cute sleepy 'zzz' bubble nearby */}
          <text x="50" y="18" fontSize="11" fontWeight="bold" fill="#b45309" className="font-display">zzz</text>
        </svg>
      );

    case 'nasture':
      return (
        <svg width={size} height={size} viewBox="0 0 70 70" className={`overflow-visible ${className}`} fill="none">
          <defs>
            <linearGradient id="cuteButton" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="100%" stopColor="#e11d48" />
            </linearGradient>
          </defs>
          <circle cx="35" cy="35" r="27" fill="url(#cuteButton)" stroke="#9f1239" strokeWidth="3" />
          <circle cx="35" cy="35" r="18" fill="#f43f5e" stroke="#be123c" strokeWidth="2" />
          
          {/* Big cute cartoon eyes using 2 of the button holes */}
          <circle cx="28" cy="28" r="4.5" fill="#1e1b4b" />
          <circle cx="27" cy="27" r="1.8" fill="#ffffff" />

          <circle cx="42" cy="28" r="4.5" fill="#1e1b4b" />
          <circle cx="43" cy="27" r="1.8" fill="#ffffff" />

          {/* Bottom 2 button holes with cute thread */}
          <circle cx="29" cy="38" r="2.2" fill="#881337" />
          <circle cx="41" cy="38" r="2.2" fill="#881337" />
          <line x1="29" y1="38" x2="41" y2="38" stroke="#ffe4e6" strokeWidth="1.5" strokeLinecap="round" />

          {/* Cheeks and sweet smile */}
          <circle cx="22" cy="34" r="3.5" fill="#fda4af" />
          <circle cx="48" cy="34" r="3.5" fill="#fda4af" />
          <path d="M 31 43 Q 35 47 39 43" fill="none" stroke="#881337" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'piatra':
      return (
        <svg width={size} height={size} viewBox="0 0 70 70" className={`overflow-visible ${className}`} fill="none">
          <defs>
            <linearGradient id="cuteStone" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#d6d3d1" />
              <stop offset="60%" stopColor="#a8a29e" />
              <stop offset="100%" stopColor="#78716c" />
            </linearGradient>
          </defs>
          <path
            d="M 18 42 C 14 30, 24 16, 42 18 C 56 20, 62 34, 56 46 C 50 56, 26 58, 18 42 Z"
            fill="url(#cuteStone)"
            stroke="#44403c"
            strokeWidth="3"
          />
          {/* Sleeping or relaxed cute stone face */}
          <g transform="translate(36, 36)">
            {/* Sleeping curved eyes */}
            <path d="M -11 -3 Q -8 1 -5 -3" fill="none" stroke="#292524" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 5 -3 Q 8 1 11 -3" fill="none" stroke="#292524" strokeWidth="2.5" strokeLinecap="round" />
            {/* Blushing cheeks */}
            <circle cx="-11" cy="4" r="3" fill="#fca5a5" opacity="0.8" />
            <circle cx="11" cy="4" r="3" fill="#fca5a5" opacity="0.8" />
            {/* Gentle smile */}
            <path d="M -3 3 Q 0 6 3 3" fill="none" stroke="#292524" strokeWidth="2" strokeLinecap="round" />
          </g>
          {/* Cute green moss sprout on top of the pebble */}
          <path d="M 38 18 Q 40 10 44 14 Q 42 18 38 18" fill="#4ade80" stroke="#15803d" strokeWidth="1.5" />
        </svg>
      );

    case 'agrafa':
      return (
        <svg width={size} height={size} viewBox="0 0 70 70" className={`overflow-visible ${className}`} fill="none">
          {/* Curly bouncy paperclip body */}
          <path
            d="M 24 52 L 24 22 C 24 13 36 13 36 22 L 36 48 C 36 56 48 56 48 48 L 48 26 C 48 20 56 20 56 26 L 56 46"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Cute face on paperclip loop */}
          <g transform="translate(30, 24)">
            <circle cx="-2" cy="0" r="2.5" fill="#0369a1" />
            <circle cx="-1.5" cy="-0.8" r="1" fill="#ffffff" />
            <circle cx="4" cy="0" r="2.5" fill="#0369a1" />
            <circle cx="4.5" cy="-0.8" r="1" fill="#ffffff" />
            <path d="M -1 5 Q 1 8 3 5" fill="none" stroke="#0369a1" strokeWidth="1.5" strokeLinecap="round" />
          </g>
          {/* Tiny sparkles */}
          <text x="10" y="24" fontSize="12">✨</text>
        </svg>
      );

    case 'surub':
      return (
        <svg width={size} height={size} viewBox="0 0 70 70" className={`overflow-visible ${className}`} fill="none">
          <defs>
            <linearGradient id="cuteScrew" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>
          </defs>
          <ellipse cx="35" cy="16" rx="16" ry="6" fill="#475569" stroke="#1e293b" strokeWidth="2.5" />
          {/* Thread body */}
          <polygon points="28,19 42,19 39,56 35,62 31,56" fill="url(#cuteScrew)" stroke="#334155" strokeWidth="2.5" />
          {/* Ridges */}
          <line x1="28" y1="28" x2="41" y2="30" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
          <line x1="29" y1="36" x2="40" y2="38" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
          <line x1="30" y1="44" x2="39" y2="46" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
          
          {/* Face on screw cap */}
          <g transform="translate(35, 16)">
            <circle cx="-6" cy="-1" r="2.2" fill="#f8fafc" />
            <circle cx="6" cy="-1" r="2.2" fill="#f8fafc" />
            <path d="M -2 2 Q 0 4 2 2" fill="none" stroke="#f8fafc" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        </svg>
      );

    case 'cheie':
      return (
        <svg width={size} height={size} viewBox="0 0 70 70" className={`overflow-visible ${className}`} fill="none">
          {/* Antique smiling key with heart cutout */}
          <circle cx="24" cy="24" r="14" fill="#fbbf24" stroke="#b45309" strokeWidth="3" />
          {/* Heart cutout */}
          <path d="M 24 22 C 22 18, 18 20, 20 24 L 24 28 L 28 24 C 30 20, 26 18, 24 22 Z" fill="#ffffff" />
          {/* Key shaft */}
          <line x1="34" y1="34" x2="56" y2="56" stroke="#fbbf24" strokeWidth="5" strokeLinecap="round" />
          <line x1="34" y1="34" x2="56" y2="56" stroke="#b45309" strokeWidth="1.5" strokeLinecap="round" />
          {/* Key teeth */}
          <line x1="48" y1="48" x2="54" y2="42" stroke="#b45309" strokeWidth="4" strokeLinecap="round" />
          <line x1="53" y1="53" x2="59" y2="47" stroke="#b45309" strokeWidth="4" strokeLinecap="round" />
          
          {/* Cute face on key handle */}
          <g transform="translate(24, 25)">
            <circle cx="-5" cy="-7" r="1.5" fill="#78350f" />
            <circle cx="5" cy="-7" r="1.5" fill="#78350f" />
            <circle cx="-8" cy="-5" r="2" fill="#fda4af" />
            <circle cx="8" cy="-5" r="2" fill="#fda4af" />
          </g>
        </svg>
      );

    case 'folie_aluminiu':
      return (
        <svg width={size} height={size} viewBox="0 0 70 70" className={`overflow-visible ${className}`} fill="none">
          <defs>
            <linearGradient id="cuteFoil" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
          </defs>
          <path
            d="M 20 26 L 30 16 L 50 20 L 58 32 L 52 50 L 34 56 L 16 46 Z"
            fill="url(#cuteFoil)"
            stroke="#64748b"
            strokeWidth="2.5"
          />
          {/* Goofy cute face on the crumpled foil */}
          <g transform="translate(36, 36)">
            <circle cx="-8" cy="-4" r="4.5" fill="#ffffff" stroke="#334155" strokeWidth="1.5" />
            <circle cx="-7" cy="-4" r="2" fill="#0f172a" />
            <circle cx="8" cy="-4" r="4.5" fill="#ffffff" stroke="#334155" strokeWidth="1.5" />
            <circle cx="7" cy="-4" r="2" fill="#0f172a" />
            {/* Silly wavy tongue */}
            <path d="M -4 5 Q 0 9 4 5" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
            <circle cx="-12" cy="2" r="2.5" fill="#fda4af" />
            <circle cx="12" cy="2" r="2.5" fill="#fda4af" />
          </g>
        </svg>
      );

    case 'dop_pluta':
      return (
        <svg width={size} height={size} viewBox="0 0 70 70" className={`overflow-visible ${className}`} fill="none">
          <ellipse cx="35" cy="20" rx="16" ry="7" fill="#fcd34d" stroke="#92400e" strokeWidth="2.5" />
          <path d="M 19 20 L 21 52 C 21 56 49 56 49 52 L 51 20" fill="#d97706" stroke="#92400e" strokeWidth="2.5" />
          {/* Cute chubby smiling face */}
          <g transform="translate(35, 36)">
            <circle cx="-6" cy="-3" r="2.5" fill="#451a03" />
            <circle cx="-5" cy="-4" r="1" fill="#ffffff" />
            <circle cx="6" cy="-3" r="2.5" fill="#451a03" />
            <circle cx="7" cy="-4" r="1" fill="#ffffff" />
            <circle cx="-10" cy="2" r="3" fill="#f87171" opacity="0.8" />
            <circle cx="10" cy="2" r="3" fill="#f87171" opacity="0.8" />
            <path d="M -3 3 Q 0 7 3 3" fill="none" stroke="#451a03" strokeWidth="2" strokeLinecap="round" />
          </g>
        </svg>
      );

    case 'creion':
      return (
        <svg width={size} height={size} viewBox="0 0 70 70" className={`overflow-visible ${className}`} fill="none">
          {/* Yellow wooden pencil body with cute pink eraser hat */}
          <polygon points="15,50 20,56 50,26 45,20" fill="#f59e0b" stroke="#b45309" strokeWidth="2.5" />
          {/* Wood tip */}
          <polygon points="15,50 20,56 10,61" fill="#fed7aa" stroke="#b45309" strokeWidth="2" />
          <polygon points="10,61 12,59 11,62" fill="#1e293b" />
          {/* Pink Eraser with silver band */}
          <polygon points="45,20 50,26 53,23 48,17" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
          <polygon points="53,23 48,17 53,12 58,18" fill="#fb7185" stroke="#be123c" strokeWidth="2" />
          
          {/* Face on pencil body */}
          <g transform="translate(32, 38) rotate(-45)">
            <circle cx="-4" cy="-2" r="2" fill="#78350f" />
            <circle cx="4" cy="-2" r="2" fill="#78350f" />
            <circle cx="-7" cy="1" r="2" fill="#fda4af" />
            <circle cx="7" cy="1" r="2" fill="#fda4af" />
            <path d="M -2 2 Q 0 4 2 2" fill="none" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        </svg>
      );

    case 'elastic':
      return (
        <svg width={size} height={size} viewBox="0 0 70 70" className={`overflow-visible ${className}`} fill="none">
          <ellipse cx="35" cy="35" rx="22" ry="14" transform="rotate(-20 35 35)" fill="#6ee7b7" stroke="#059669" strokeWidth="5" />
          <ellipse cx="35" cy="35" rx="16" ry="8" transform="rotate(-20 35 35)" fill="#ffffff" />
          {/* Cute face inside the loop */}
          <g transform="translate(35, 35)">
            <circle cx="-5" cy="-2" r="2" fill="#065f46" />
            <circle cx="5" cy="-2" r="2" fill="#065f46" />
            <path d="M -3 3 Q 0 6 3 3" fill="none" stroke="#065f46" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="-8" cy="1" r="2" fill="#fca5a5" />
            <circle cx="8" cy="1" r="2" fill="#fca5a5" />
          </g>
        </svg>
      );

    case 'bila_sticla':
      return (
        <svg width={size} height={size} viewBox="0 0 70 70" className={`overflow-visible ${className}`} fill="none">
          <defs>
            <radialGradient id="cuteMarble" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#e0f2fe" />
              <stop offset="35%" stopColor="#38bdf8" />
              <stop offset="75%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0369a1" />
            </radialGradient>
          </defs>
          <circle cx="35" cy="35" r="25" fill="url(#cuteMarble)" stroke="#0284c7" strokeWidth="2.5" />
          <path d="M 22 42 Q 35 22 48 30" fill="none" stroke="#f472b6" strokeWidth="3.5" opacity="0.8" strokeLinecap="round" />
          {/* Big cute cartoon sparkle eyes */}
          <g transform="translate(35, 33)">
            <circle cx="-7" cy="-2" r="3.5" fill="#082f49" />
            <circle cx="-6" cy="-3.5" r="1.5" fill="#ffffff" />
            <circle cx="7" cy="-2" r="3.5" fill="#082f49" />
            <circle cx="8" cy="-3.5" r="1.5" fill="#ffffff" />
            <path d="M -3 4 Q 0 7 3 4" fill="none" stroke="#082f49" strokeWidth="1.8" strokeLinecap="round" />
          </g>
          {/* Glossy reflection */}
          <ellipse cx="28" cy="22" rx="6" ry="3.5" transform="rotate(-30 28 22)" fill="#ffffff" opacity="0.85" />
        </svg>
      );

    case 'inel_aur':
      return (
        <svg width={size} height={size} viewBox="0 0 70 70" className={`overflow-visible ${className}`} fill="none">
          <ellipse cx="35" cy="40" rx="20" ry="14" fill="none" stroke="#eab308" strokeWidth="6" />
          <ellipse cx="35" cy="40" rx="20" ry="14" fill="none" stroke="#fef08a" strokeWidth="2" opacity="0.8" />
          {/* Sparkly diamond on top */}
          <polygon points="35,16 43,24 35,32 27,24" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
          <circle cx="32" cy="22" r="2" fill="#ffffff" />
          {/* Cute diva face on gem */}
          <g transform="translate(35, 25)">
            <line x1="-3" y1="-2" x2="-1" y2="-2" stroke="#075985" strokeWidth="1.5" />
            <line x1="1" y1="-2" x2="3" y2="-2" stroke="#075985" strokeWidth="1.5" />
            <circle cx="0" cy="1" r="1" fill="#f43f5e" />
          </g>
          <text x="44" y="16" fontSize="12">💎</text>
        </svg>
      );

    default:
      return (
        <div className="w-12 h-12 rounded-full bg-amber-100 border-2 border-amber-300 flex items-center justify-center font-bold text-amber-800 text-lg">
          🎁
        </div>
      );
  }
};
