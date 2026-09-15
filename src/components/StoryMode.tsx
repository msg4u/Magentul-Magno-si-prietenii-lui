import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { STORY_SCENES } from '../data/storyData';
import { MagnoCharacter } from './MagnoCharacter';
import { ObjectIllustration } from './ObjectIllustration';
import { 
  playZacSound, 
  playDullSound, 
  playPopSound, 
  playBoingSound, 
  speakRomanian, 
  stopSpeaking 
} from '../utils/audio';
import { 
  Volume2, 
  VolumeX, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ArrowRight, 
  BookOpen,
  Heart,
  Star
} from 'lucide-react';

interface StoryModeProps {
  onStartActivity: () => void;
}

export const StoryMode: React.FC<StoryModeProps> = ({ onStartActivity }) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [interactionState, setInteractionState] = useState<'idle' | 'testing' | 'snapped' | 'failed'>('idle');

  const scene = STORY_SCENES[currentSceneIndex];

  const handleNext = () => {
    stopSpeaking();
    setIsSpeaking(false);
    setInteractionState('idle');
    playPopSound();
    if (currentSceneIndex < STORY_SCENES.length - 1) {
      setCurrentSceneIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    stopSpeaking();
    setIsSpeaking(false);
    setInteractionState('idle');
    playPopSound();
    if (currentSceneIndex > 0) {
      setCurrentSceneIndex(prev => prev - 1);
    }
  };

  const toggleNarration = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      playPopSound();
      const textToRead = `${scene.title}. ${scene.paragraph1} ${scene.paragraph2 || ''} ${scene.quote || ''}`;
      speakRomanian(textToRead, () => setIsSpeaking(false));
    }
  };

  const triggerInteraction = () => {
    if (!scene.interactiveObject) return;
    setInteractionState('testing');
    playBoingSound();

    setTimeout(() => {
      if (scene.interactiveObject?.isMagnetic) {
        playZacSound();
        setInteractionState('snapped');
      } else {
        playDullSound();
        setInteractionState('failed');
      }
    }, 650);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-5">
      {/* Playful Floating Kid Header */}
      <div className="bg-gradient-to-r from-amber-200 via-rose-100 to-sky-100 border-3 border-amber-300 rounded-3xl p-4 sm:p-5 shadow-[0_6px_0_#fcd34d] flex flex-wrap items-center justify-between gap-4 relative overflow-hidden">
        {/* Cute decorative cloud stickers */}
        <div className="absolute -right-4 -bottom-4 text-4xl opacity-40 select-none pointer-events-none">
          ☁️
        </div>
        <div className="absolute left-1/3 -top-3 text-2xl opacity-30 select-none pointer-events-none">
          ⭐
        </div>

        <div className="flex items-center gap-3 z-10">
          <div className="w-12 h-12 rounded-2xl bg-white/90 border-2 border-amber-400 flex items-center justify-center text-rose-500 shadow-sm animate-wiggle">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold font-display text-amber-950">
                Povestea lui Magno
              </h2>
              <span className="text-xs bg-rose-500 text-white font-extrabold px-2.5 py-0.5 rounded-full shadow-xs">
                Pagina {currentSceneIndex + 1} / {STORY_SCENES.length}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-amber-900 font-semibold flex items-center gap-1">
              <span>Aventură cu sunete și prieteni de fier!</span>
              <span>✨</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 z-10">
          {/* TTS Read Aloud - Chunky 3D button */}
          <button
            id="narrate-story-btn"
            onClick={toggleNarration}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-display font-bold text-xs sm:text-sm transition-all transform active:translate-y-1 cursor-pointer ${
              isSpeaking
                ? 'bg-rose-500 text-white shadow-[0_4px_0_#9f1239] animate-pulse'
                : 'bg-white hover:bg-amber-50 text-amber-900 border-2 border-amber-300 shadow-[0_4px_0_#f59e0b]'
            }`}
          >
            {isSpeaking ? (
              <>
                <VolumeX className="w-4 h-4 text-white" />
                <span>Oprește Vocea</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-rose-500" />
                <span>Citește-mi cu voce! 🗣️</span>
              </>
            )}
          </button>

          {/* Quick Scene Buttons */}
          <div className="hidden sm:flex items-center gap-1.5 bg-white/70 p-1.5 rounded-2xl border-2 border-amber-200">
            {STORY_SCENES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  stopSpeaking();
                  setIsSpeaking(false);
                  setInteractionState('idle');
                  playPopSound();
                  setCurrentSceneIndex(idx);
                }}
                className={`w-7 h-7 rounded-xl font-display font-bold text-xs transition-all flex items-center justify-center cursor-pointer ${
                  currentSceneIndex === idx
                    ? 'bg-rose-500 text-white shadow-xs scale-110'
                    : 'bg-amber-100 hover:bg-amber-200 text-amber-900'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Story Book Card */}
      <div className="bg-white border-3 border-amber-200 rounded-3xl p-6 sm:p-8 shadow-[0_8px_0_#fde68a] relative overflow-hidden">
        {/* Cute colorful book corner ribbons */}
        <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden pointer-events-none">
          <div className="bg-rose-500 text-white font-extrabold text-[10px] py-1 text-center transform rotate-45 translate-x-7 translate-y-3 shadow-xs">
            PAGINA {currentSceneIndex + 1}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentSceneIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Scene Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 bg-rose-100 border border-rose-300 text-rose-700 font-display font-extrabold text-xs px-3 py-1 rounded-full mb-2">
                <span>⭐ Capitolul {scene.id}: Aventură în sertar</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 leading-snug">
                {scene.title}
              </h3>
            </div>

            {/* Interactive Visual Stage with Cartoon Backdrop */}
            <div className="bg-gradient-to-b from-sky-50 via-amber-50/50 to-orange-50/40 rounded-3xl p-6 border-3 border-amber-200/90 min-h-[260px] flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
              {/* Wooden Drawer bottom shelf illustration */}
              <div className="absolute inset-x-0 bottom-0 h-10 bg-amber-200/60 border-t-3 border-amber-300/80 flex items-center justify-between px-6 pointer-events-none">
                <span className="text-[11px] font-display font-bold text-amber-800 flex items-center gap-1">
                  <span>🗄️ Sertarul fermecat cu lucrușoare</span>
                </span>
                <span className="text-xs text-amber-700 font-bold opacity-60">
                  Atinge-l pe Magno! 👇
                </span>
              </div>

              {/* Characters & Objects in the Scene */}
              <div className="flex items-center justify-center gap-6 sm:gap-16 w-full z-10 pb-6 pt-2">
                {/* Magno */}
                <motion.div
                  animate={
                    interactionState === 'testing'
                      ? { x: [0, 55, 35] }
                      : interactionState === 'snapped'
                      ? { x: 45, scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }
                      : interactionState === 'failed'
                      ? { x: 30 }
                      : { y: [0, -8, 0] }
                  }
                  transition={{
                    duration: interactionState === 'testing' ? 0.6 : 2.2,
                    repeat: interactionState === 'idle' ? Infinity : 0,
                    ease: 'easeInOut'
                  }}
                  className="flex flex-col items-center"
                >
                  <MagnoCharacter
                    mood={
                      interactionState === 'snapped'
                        ? 'happy'
                        : interactionState === 'failed'
                        ? 'puzzled'
                        : scene.magnoMood
                    }
                    isAttracting={interactionState === 'testing' || interactionState === 'snapped'}
                    size="hero"
                    showSparkles={interactionState === 'snapped' || scene.magnoMood === 'triumphant'}
                  />
                  <div className="mt-1 flex items-center gap-1 bg-white/90 px-3 py-1 rounded-full border-2 border-amber-300 shadow-xs">
                    <span className="text-xs font-display font-bold text-slate-800">
                      Magno
                    </span>
                    <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                  </div>
                </motion.div>

                {/* Target Object in Scene */}
                {scene.interactiveObject ? (
                  <div className="flex flex-col items-center">
                    <motion.div
                      animate={
                        interactionState === 'snapped'
                          ? { x: -45, rotate: -25, scale: [1, 1.15, 1.05] }
                          : interactionState === 'failed'
                          ? { rotate: [0, -6, 6, -4, 4, 0] }
                          : { y: [0, -5, 0] }
                      }
                      transition={{
                        duration: interactionState === 'snapped' ? 0.25 : 2.5,
                        repeat: interactionState === 'idle' ? Infinity : 0
                      }}
                      className="p-4 bg-white rounded-3xl shadow-md border-3 border-amber-300 relative"
                    >
                      <ObjectIllustration
                        id={
                          scene.interactiveObject.name.toLowerCase().includes('lingura')
                            ? 'lingura'
                            : scene.interactiveObject.name.toLowerCase().includes('moneda')
                            ? 'moneda'
                            : 'cui'
                        }
                        size={74}
                      />

                      {/* Cute comic reaction symbol */}
                      {interactionState === 'snapped' && (
                        <motion.div
                          initial={{ scale: 0, rotate: -20 }}
                          animate={{ scale: 1.2, rotate: 0 }}
                          className="absolute -top-3 -right-3 bg-rose-500 text-white font-display font-extrabold text-xs px-2 py-0.5 rounded-full shadow-sm border-2 border-white"
                        >
                          TE IUBESC! ❤️
                        </motion.div>
                      )}
                    </motion.div>

                    <span className="mt-2 text-sm font-display font-bold text-slate-800">
                      {scene.interactiveObject.name}
                    </span>
                    <span className="text-[11px] text-amber-900 bg-amber-100 font-bold px-2 py-0.5 rounded-full border border-amber-200">
                      {scene.interactiveObject.type}
                    </span>
                  </div>
                ) : currentSceneIndex === 0 ? (
                  /* Scene 1 items hanging out together in the drawer */
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-white rounded-2xl border-2 border-amber-200 shadow-xs animate-bounce" style={{ animationDuration: '2.5s' }}>
                      <ObjectIllustration id="lingura" size={48} />
                    </div>
                    <div className="p-3 bg-white rounded-2xl border-2 border-amber-200 shadow-xs animate-bounce" style={{ animationDuration: '3s' }}>
                      <ObjectIllustration id="moneda" size={48} />
                    </div>
                    <div className="p-3 bg-white rounded-2xl border-2 border-amber-200 shadow-xs animate-bounce" style={{ animationDuration: '2.2s' }}>
                      <ObjectIllustration id="cui" size={48} />
                    </div>
                  </div>
                ) : (
                  /* Scene 5: Friends celebrating together */
                  <div className="p-4 bg-emerald-100/90 border-3 border-emerald-400 rounded-3xl text-center shadow-md animate-pop-burst">
                    <div className="flex justify-center items-center gap-2 mb-2">
                      <ObjectIllustration id="lingura" size={38} />
                      <ObjectIllustration id="cui" size={38} />
                      <ObjectIllustration id="agrafa" size={38} />
                      <span className="text-2xl">🎉</span>
                    </div>
                    <span className="font-display font-bold text-sm text-emerald-950">
                      Casa Prietenilor de Fier! 🏰
                    </span>
                  </div>
                )}
              </div>

              {/* Interactive Test Action Button for Kids */}
              {scene.interactiveObject && interactionState === 'idle' && (
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={triggerInteraction}
                  className="mt-1 mb-2 z-10 px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-display font-extrabold text-sm sm:text-base shadow-[0_5px_0_#be123c] active:translate-y-1 active:shadow-none flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Sparkles className="w-5 h-5 text-amber-200 animate-spin" />
                  <span>Apropie-l pe Magno! Ce crezi că se întâmplă?</span>
                </motion.button>
              )}

              {/* Comic Book Bang / Reaction Popups */}
              <AnimatePresence>
                {interactionState === 'snapped' && (
                  <motion.div
                    initial={{ scale: 0, rotate: -15 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    className="z-20 mt-1 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-display font-black text-sm sm:text-base rounded-2xl shadow-[0_5px_0_#065f46] border-2 border-white flex items-center gap-2"
                  >
                    <span className="text-2xl animate-spin">⚡</span>
                    <span>ZAAAC! S-a lipit imediat! E un prieten de fier!</span>
                    <span className="text-xl">🧲💖</span>
                  </motion.div>
                )}

                {interactionState === 'failed' && (
                  <motion.div
                    initial={{ scale: 0, rotate: 10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    className="z-20 mt-1 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-display font-black text-sm sm:text-base rounded-2xl shadow-[0_5px_0_#b45309] border-2 border-white flex items-center gap-2"
                  >
                    <span className="text-2xl">😴</span>
                    <span>NIMIC! Moneda doarme liniștită: e din alamă!</span>
                    <span className="text-xl">💤</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Story Paragraphs - Big, clear, readable text */}
            <div className="space-y-4 text-slate-800 text-base sm:text-lg leading-relaxed font-medium bg-amber-50/40 p-4 rounded-2xl border border-amber-100">
              <p>{scene.paragraph1}</p>
              {scene.paragraph2 && <p>{scene.paragraph2}</p>}
            </div>

            {/* Dialogue / Quote in cute comic speech bubble */}
            {scene.quote && (
              <div className="relative p-4 bg-amber-100/80 border-2 border-amber-300 rounded-3xl text-amber-950 font-display font-bold text-base sm:text-lg shadow-xs flex items-center gap-3">
                <span className="text-3xl">💬</span>
                <div>
                  <p className="italic">{scene.quote}</p>
                </div>
              </div>
            )}

            {/* Key takeaway secret card */}
            <div className="flex items-start gap-3 p-4 bg-sky-100/90 border-2 border-sky-300 rounded-3xl text-sky-950 text-sm sm:text-base shadow-xs">
              <div className="w-10 h-10 rounded-2xl bg-sky-500 text-white flex items-center justify-center flex-shrink-0 text-xl font-bold shadow-xs">
                💡
              </div>
              <div>
                <strong className="font-display font-bold block text-sky-900 text-base">
                  Secretul științific al lui Magno:
                </strong>
                <span className="font-medium text-slate-700">
                  {scene.keyTakeaway}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Footer Navigation Buttons with 3D squishy effect */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t-2 border-amber-100">
          <button
            onClick={handlePrev}
            disabled={currentSceneIndex === 0}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-display font-bold text-sm transition-all cursor-pointer ${
              currentSceneIndex === 0
                ? 'opacity-30 cursor-not-allowed text-slate-400 bg-slate-100'
                : 'text-slate-700 bg-white hover:bg-slate-50 border-2 border-slate-300 shadow-[0_4px_0_#cbd5e1] active:translate-y-1 active:shadow-none'
            }`}
          >
            <ChevronLeft className="w-5 h-5 text-slate-600" />
            <span>Pagina dinapoi</span>
          </button>

          {currentSceneIndex < STORY_SCENES.length - 1 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-7 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-display font-extrabold text-base shadow-[0_5px_0_#be123c] active:translate-y-1 active:shadow-none cursor-pointer transition-transform"
            >
              <span>Următoarea Pagină</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={onStartActivity}
              className="flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-2xl font-display font-extrabold text-base sm:text-lg shadow-[0_6px_0_#065f46] active:translate-y-1 active:shadow-none cursor-pointer animate-pulse"
            >
              <span>Să-l ajutăm pe Magno! (Activitatea)</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
