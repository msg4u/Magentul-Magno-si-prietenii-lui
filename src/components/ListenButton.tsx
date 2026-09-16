import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { 
  speakRomanian, 
  stopSpeaking, 
  isTextPlaying, 
  prefetchVoice, 
  subscribeToVoiceState,
  playPopSound 
} from '../utils/audio';

interface ListenButtonProps {
  text: string;
  label?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'pill' | 'icon' | 'badge' | 'subtle';
  className?: string;
  id?: string;
  tooltip?: string;
}

export const ListenButton: React.FC<ListenButtonProps> = ({
  text,
  label,
  size = 'md',
  variant = 'pill',
  className = '',
  id,
  tooltip = 'Ascultă cu voce caldă în limba română'
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Proactively prefetch on mount for zero-delay instant playback
    if (text) {
      prefetchVoice(text);
    }

    const unsubscribe = subscribeToVoiceState((activeText) => {
      setIsPlaying(activeText !== null && activeText.trim() === text.trim());
    });

    return () => unsubscribe();
  }, [text]);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    playPopSound();

    if (isPlaying) {
      stopSpeaking();
    } else {
      speakRomanian(text);
    }
  };

  const handleMouseEnter = () => {
    // Warm up audio cache immediately upon hover
    if (text) {
      prefetchVoice(text);
    }
  };

  if (variant === 'icon') {
    const iconSizes = {
      xs: 'w-7 h-7',
      sm: 'w-8 h-8',
      md: 'w-9 h-9',
      lg: 'w-11 h-11'
    };
    const lucideSizes = {
      xs: 'w-3.5 h-3.5',
      sm: 'w-4 h-4',
      md: 'w-4 h-4',
      lg: 'w-5 h-5'
    };

    return (
      <button
        id={id}
        type="button"
        onClick={handleToggle}
        onMouseEnter={handleMouseEnter}
        onTouchStart={handleMouseEnter}
        title={isPlaying ? 'Oprește vocea' : tooltip}
        aria-label={isPlaying ? 'Oprește vocea' : tooltip}
        className={`inline-flex items-center justify-center rounded-2xl transition-all transform active:translate-y-0.5 cursor-pointer flex-shrink-0 ${
          iconSizes[size]
        } ${
          isPlaying
            ? 'bg-rose-500 text-white shadow-[0_3px_0_#9f1239] animate-pulse ring-2 ring-rose-300'
            : 'bg-white hover:bg-rose-50 text-rose-600 border-2 border-rose-200 shadow-[0_3px_0_#fecdd3] hover:border-rose-300'
        } ${className}`}
      >
        {isPlaying ? (
          <VolumeX className={lucideSizes[size]} />
        ) : (
          <Volume2 className={lucideSizes[size]} />
        )}
      </button>
    );
  }

  if (variant === 'badge') {
    return (
      <button
        id={id}
        type="button"
        onClick={handleToggle}
        onMouseEnter={handleMouseEnter}
        onTouchStart={handleMouseEnter}
        title={tooltip}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-display font-bold transition-all transform active:translate-y-0.5 cursor-pointer ${
          isPlaying
            ? 'bg-rose-500 text-white shadow-xs animate-pulse ring-2 ring-rose-200'
            : 'bg-rose-100 hover:bg-rose-200 text-rose-700 border border-rose-300'
        } ${className}`}
      >
        {isPlaying ? (
          <>
            <VolumeX className="w-3.5 h-3.5 text-white" />
            <span>Oprește</span>
          </>
        ) : (
          <>
            <Volume2 className="w-3.5 h-3.5 text-rose-600" />
            <span>{label || 'Ascultă'}</span>
          </>
        )}
      </button>
    );
  }

  // Default 'pill' variant
  const paddingSizes = {
    xs: 'px-2.5 py-1 text-xs',
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-3.5 py-2 text-xs sm:text-sm',
    lg: 'px-5 py-2.5 text-sm sm:text-base'
  };

  return (
    <button
      id={id}
      type="button"
      onClick={handleToggle}
      onMouseEnter={handleMouseEnter}
      onTouchStart={handleMouseEnter}
      title={tooltip}
      className={`inline-flex items-center gap-2 rounded-2xl font-display font-extrabold transition-all transform active:translate-y-1 cursor-pointer select-none ${
        paddingSizes[size]
      } ${
        isPlaying
          ? 'bg-rose-500 text-white shadow-[0_4px_0_#9f1239] animate-pulse ring-2 ring-rose-300'
          : 'bg-white hover:bg-rose-50 text-slate-800 border-2 border-rose-200 hover:border-rose-300 shadow-[0_4px_0_#fecdd3]'
      } ${className}`}
    >
      {isPlaying ? (
        <>
          <VolumeX className="w-4 h-4 text-white" />
          <span>{label ? `Oprește: ${label}` : 'Oprește vocea'}</span>
          <span className="flex items-center gap-0.5 text-rose-200">
            <span className="w-1 h-3 bg-white rounded-full animate-bounce"></span>
            <span className="w-1 h-4 bg-white rounded-full animate-bounce delay-75"></span>
            <span className="w-1 h-2 bg-white rounded-full animate-bounce delay-150"></span>
          </span>
        </>
      ) : (
        <>
          <div className="w-5 h-5 rounded-lg bg-rose-100 flex items-center justify-center text-rose-600">
            <Volume2 className="w-3.5 h-3.5" />
          </div>
          <span>{label || 'Ascultă cu voce! 🗣️'}</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        </>
      )}
    </button>
  );
};
