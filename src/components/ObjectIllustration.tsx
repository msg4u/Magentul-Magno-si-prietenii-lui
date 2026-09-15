import React from 'react';

interface ObjectIllustrationProps {
  id: string;
  className?: string;
  size?: number;
}

export const ObjectIllustration: React.FC<ObjectIllustrationProps> = ({
  id,
  className = '',
  size = 54
}) => {
  switch (id) {
    case 'lingura':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" className={className} fill="none">
          <defs>
            <linearGradient id="spoonGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="50%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
          </defs>
          <ellipse cx="20" cy="18" rx="14" ry="10" transform="rotate(-30 20 18)" fill="url(#spoonGrad)" stroke="#64748b" strokeWidth="2.5" />
          <ellipse cx="19" cy="16" rx="9" ry="5" transform="rotate(-30 19 16)" fill="#f8fafc" opacity="0.6" />
          <path d="M28 24 L52 50 C54 52 56 50 54 48 L32 20" fill="url(#spoonGrad)" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'cui':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" className={className} fill="none">
          <defs>
            <linearGradient id="nailGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
          </defs>
          {/* Nail head */}
          <rect x="10" y="10" width="22" height="6" rx="2" transform="rotate(-45 21 13)" fill="#334155" stroke="#1e293b" strokeWidth="2" />
          {/* Nail shaft */}
          <polygon points="18,18 48,48 52,56 46,52" fill="url(#nailGrad)" stroke="#334155" strokeWidth="2" />
          {/* Shine line */}
          <line x1="22" y1="20" x2="45" y2="43" stroke="#f1f5f9" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
        </svg>
      );

    case 'moneda':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" className={className} fill="none">
          <defs>
            <linearGradient id="coinGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="60%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="24" fill="url(#coinGrad)" stroke="#a16207" strokeWidth="2.5" />
          <circle cx="32" cy="32" r="18" fill="none" stroke="#fef08a" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x="32" y="38" textAnchor="middle" fill="#854d0e" fontSize="16" fontWeight="bold" fontFamily="sans-serif">10</text>
          <path d="M 18 20 A 20 20 0 0 1 44 14" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        </svg>
      );

    case 'nasture':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" className={className} fill="none">
          <defs>
            <linearGradient id="buttonGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="100%" stopColor="#e11d48" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="23" fill="url(#buttonGrad)" stroke="#be123c" strokeWidth="2.5" />
          <circle cx="32" cy="32" r="15" fill="#f43f5e" stroke="#be123c" strokeWidth="1.5" />
          {/* 4 holes */}
          <circle cx="27" cy="27" r="2.5" fill="#881337" />
          <circle cx="37" cy="27" r="2.5" fill="#881337" />
          <circle cx="27" cy="37" r="2.5" fill="#881337" />
          <circle cx="37" cy="37" r="2.5" fill="#881337" />
          {/* Thread cross */}
          <line x1="27" y1="27" x2="37" y2="37" stroke="#ffe4e6" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="37" y1="27" x2="27" y2="37" stroke="#ffe4e6" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'piatra':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" className={className} fill="none">
          <defs>
            <linearGradient id="stoneGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#a8a29e" />
              <stop offset="70%" stopColor="#78716c" />
              <stop offset="100%" stopColor="#57534e" />
            </linearGradient>
          </defs>
          <path
            d="M 16 38 C 12 28, 22 14, 38 16 C 50 18, 56 30, 52 42 C 48 52, 24 54, 16 38 Z"
            fill="url(#stoneGrad)"
            stroke="#44403c"
            strokeWidth="2.5"
          />
          <path d="M 24 22 C 32 18, 40 22, 44 26" stroke="#d6d3d1" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <circle cx="36" cy="36" r="2" fill="#44403c" opacity="0.4" />
          <circle cx="26" cy="42" r="1.5" fill="#44403c" opacity="0.4" />
        </svg>
      );

    case 'agrafa':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" className={className} fill="none">
          <path
            d="M 22 48 L 22 20 C 22 13 32 13 32 20 L 32 46 C 32 52 42 52 42 46 L 42 24 C 42 19 50 19 50 24 L 50 44"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-sm"
          />
        </svg>
      );

    case 'surub':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" className={className} fill="none">
          <defs>
            <linearGradient id="screwGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
          </defs>
          <ellipse cx="32" cy="14" rx="14" ry="5" fill="#475569" stroke="#1e293b" strokeWidth="2" />
          <line x1="26" y1="14" x2="38" y2="14" stroke="#f8fafc" strokeWidth="2" />
          {/* Thread body */}
          <polygon points="26,17 38,17 35,52 32,56 29,52" fill="url(#screwGrad)" stroke="#334155" strokeWidth="2" />
          {/* Spiral ridges */}
          <line x1="26" y1="23" x2="37" y2="25" stroke="#1e293b" strokeWidth="1.5" />
          <line x1="27" y1="30" x2="37" y2="32" stroke="#1e293b" strokeWidth="1.5" />
          <line x1="28" y1="37" x2="36" y2="39" stroke="#1e293b" strokeWidth="1.5" />
          <line x1="29" y1="44" x2="35" y2="46" stroke="#1e293b" strokeWidth="1.5" />
        </svg>
      );

    case 'cheie':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" className={className} fill="none">
          <circle cx="22" cy="24" r="12" fill="none" stroke="#475569" strokeWidth="3" />
          <circle cx="22" cy="24" r="6" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
          <line x1="31" y1="31" x2="52" y2="52" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
          <line x1="44" y1="44" x2="48" y2="40" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
          <line x1="49" y1="49" x2="55" y2="43" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'folie_aluminiu':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" className={className} fill="none">
          <defs>
            <linearGradient id="foilGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="50%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
          </defs>
          <path
            d="M 18 24 L 28 14 L 46 18 L 52 30 L 46 48 L 30 52 L 14 42 Z"
            fill="url(#foilGrad)"
            stroke="#64748b"
            strokeWidth="2"
          />
          {/* Crumple facets */}
          <line x1="18" y1="24" x2="34" y2="34" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="46" y1="18" x2="34" y2="34" stroke="#64748b" strokeWidth="1.5" />
          <line x1="52" y1="30" x2="34" y2="34" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="46" y1="48" x2="34" y2="34" stroke="#64748b" strokeWidth="1.5" />
          <line x1="14" y1="42" x2="34" y2="34" stroke="#ffffff" strokeWidth="1.5" />
        </svg>
      );

    case 'dop_pluta':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" className={className} fill="none">
          <defs>
            <linearGradient id="corkGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
          </defs>
          <ellipse cx="32" cy="18" rx="14" ry="6" fill="#fcd34d" stroke="#92400e" strokeWidth="2" />
          <path d="M 18 18 L 19 46 C 19 50 45 50 45 46 L 46 18" fill="url(#corkGrad)" stroke="#92400e" strokeWidth="2" />
          {/* Cork speckles */}
          <circle cx="26" cy="28" r="1" fill="#78350f" />
          <circle cx="38" cy="32" r="1.2" fill="#78350f" />
          <circle cx="28" cy="40" r="1" fill="#78350f" />
          <circle cx="35" cy="42" r="1.5" fill="#78350f" />
        </svg>
      );

    case 'creion':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" className={className} fill="none">
          <polygon points="12,46 16,52 46,22 42,16" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
          <polygon points="12,46 16,52 8,56" fill="#fed7aa" stroke="#b45309" strokeWidth="1.5" />
          <polygon points="8,56 10,54 9,57" fill="#1e293b" />
          <polygon points="46,22 42,16 48,10 52,16" fill="#f43f5e" stroke="#be123c" strokeWidth="1.5" />
          <line x1="14" y1="49" x2="44" y2="19" stroke="#d97706" strokeWidth="1.5" />
        </svg>
      );

    case 'elastic':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" className={className} fill="none">
          <ellipse cx="32" cy="32" rx="20" ry="12" transform="rotate(-25 32 32)" fill="none" stroke="#10b981" strokeWidth="4" />
          <ellipse cx="32" cy="32" rx="20" ry="12" transform="rotate(-25 32 32)" fill="none" stroke="#a7f3d0" strokeWidth="1.5" opacity="0.6" />
        </svg>
      );

    case 'bila_sticla':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" className={className} fill="none">
          <defs>
            <radialGradient id="marbleGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#e0f2fe" />
              <stop offset="40%" stopColor="#38bdf8" />
              <stop offset="80%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#075985" />
            </radialGradient>
          </defs>
          <circle cx="32" cy="32" r="22" fill="url(#marbleGrad)" stroke="#0369a1" strokeWidth="2" />
          {/* Inner glass swirl */}
          <path d="M 20 40 Q 32 20 44 26" fill="none" stroke="#f0abfc" strokeWidth="3" opacity="0.7" strokeLinecap="round" />
          {/* Shiny reflection */}
          <ellipse cx="26" cy="22" rx="5" ry="3" transform="rotate(-30 26 22)" fill="#ffffff" opacity="0.8" />
        </svg>
      );

    case 'inel_aur':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" className={className} fill="none">
          <ellipse cx="32" cy="36" rx="18" ry="12" fill="none" stroke="#eab308" strokeWidth="5" />
          <ellipse cx="32" cy="36" rx="18" ry="12" fill="none" stroke="#fef08a" strokeWidth="2" opacity="0.7" />
          {/* Sparkling gem */}
          <polygon points="32,16 38,22 32,28 26,22" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
          <circle cx="30" cy="20" r="1.5" fill="#ffffff" />
        </svg>
      );

    default:
      return (
        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
          ?
        </div>
      );
  }
};
