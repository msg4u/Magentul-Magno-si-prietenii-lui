import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { STORY_SCENES } from '../data/storyData';
import { MagnoCharacter } from './MagnoCharacter';
import { ObjectIllustration } from './ObjectIllustration';
import { playZacSound, playDullSound, speakRomanian, stopSpeaking } from '../utils/audio';
import { Volume2, VolumeX, ChevronLeft, ChevronRight, Sparkles, ArrowRight, BookOpen } from 'lucide-react';

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
    if (currentSceneIndex < STORY_SCENES.length - 1) {
      setCurrentSceneIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    stopSpeaking();
    setIsSpeaking(false);
    setInteractionState('idle');
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
      const textToRead = `${scene.title}. ${scene.paragraph1} ${scene.paragraph2 || ''} ${scene.quote || ''}`;
      speakRomanian(textToRead, () => setIsSpeaking(false));
    }
  };

  const triggerInteraction = () => {
    if (!scene.interactiveObject) return;
    setInteractionState('testing');

    setTimeout(() => {
      if (scene.interactiveObject?.isMagnetic) {
        playZacSound();
        setInteractionState('snapped');
      } else {
        playDullSound();
        setInteractionState('failed');
      }
    }, 600);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Top Story Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-amber-100/80 border border-amber-200/80 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-800">
            <BookOpen className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-display text-amber-950">
              Povestea lui Magno
            </h2>
            <p className="text-xs text-amber-800 font-medium">
              Pagina {currentSceneIndex + 1} din {STORY_SCENES.length}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* TTS Read Aloud */}
          <button
            id="narrate-story-btn"
            onClick={toggleNarration}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all shadow-xs ${
              isSpeaking
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-white hover:bg-amber-50 text-amber-900 border border-amber-300'
            }`}
          >
            {isSpeaking ? (
              <>
                <VolumeX className="w-4 h-4" />
                <span>Oprește vocea</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-amber-700" />
                <span>Citește-mi povestea</span>
              </>
            )}
          </button>

          {/* Quick Scene Dots */}
          <div className="hidden sm:flex items-center gap-1.5 ml-2 bg-amber-200/60 p-1.5 rounded-xl">
            {STORY_SCENES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  stopSpeaking();
                  setIsSpeaking(false);
                  setInteractionState('idle');
                  setCurrentSceneIndex(idx);
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSceneIndex === idx
                    ? 'bg-rose-500 w-6'
                    : 'bg-amber-400 hover:bg-amber-500'
                }`}
                title={`Pagina ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Story Book Stage */}
      <div className="bg-white border-2 border-amber-200/90 rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        {/* Soft background drawer motif */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-radial from-amber-100/70 to-transparent rounded-bl-full pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentSceneIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Scene Title */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                Capitolul {scene.id}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 mt-2">
                {scene.title}
              </h3>
            </div>

            {/* Interactive Visual Stage */}
            <div className="bg-gradient-to-b from-amber-50/60 to-orange-50/40 rounded-2xl p-6 border border-amber-200/70 min-h-[220px] flex flex-col items-center justify-center relative overflow-hidden">
              {/* Drawer texture subtle line */}
              <div className="absolute inset-x-0 bottom-3 border-b-2 border-dashed border-amber-300/60 flex items-center justify-center">
                <span className="bg-amber-100 text-[10px] font-bold text-amber-700 px-2 py-0.5 rounded-full">
                  sertarul cu lucrușoare
                </span>
              </div>

              {/* Scene Specific Character & Interaction */}
              <div className="flex items-center justify-center gap-8 sm:gap-14 w-full z-10 py-4">
                {/* Magno */}
                <motion.div
                  animate={
                    interactionState === 'testing'
                      ? { x: [0, 40, 20] }
                      : interactionState === 'snapped'
                      ? { x: 30, scale: [1, 1.05, 1] }
                      : { y: [0, -6, 0] }
                  }
                  transition={{
                    duration: interactionState === 'testing' ? 0.6 : 2.5,
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
                    size="lg"
                    showSparkles={interactionState === 'snapped' || scene.magnoMood === 'triumphant'}
                  />
                  <span className="mt-2 text-xs font-bold text-slate-600 bg-white/80 px-2 py-0.5 rounded-full border border-slate-200">
                    Magno
                  </span>
                </motion.div>

                {/* Target object in scene (if interactive) */}
                {scene.interactiveObject ? (
                  <div className="flex flex-col items-center">
                    <motion.div
                      animate={
                        interactionState === 'snapped'
                          ? { x: -35, rotate: -15 }
                          : interactionState === 'failed'
                          ? { rotate: [0, -3, 3, 0] }
                          : {}
                      }
                      transition={{ duration: 0.2 }}
                      className="p-3 bg-white rounded-2xl shadow-sm border border-amber-200"
                    >
                      <ObjectIllustration
                        id={
                          scene.interactiveObject.name.toLowerCase().includes('lingura')
                            ? 'lingura'
                            : scene.interactiveObject.name.toLowerCase().includes('moneda')
                            ? 'moneda'
                            : 'cui'
                        }
                        size={64}
                      />
                    </motion.div>
                    <span className="mt-2 text-xs font-bold text-slate-700">
                      {scene.interactiveObject.name}
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold">
                      ({scene.interactiveObject.type})
                    </span>
                  </div>
                ) : currentSceneIndex === 0 ? (
                  /* Scene 1 decorative items in the drawer */
                  <div className="flex items-center gap-3 opacity-80">
                    <div className="p-2 bg-white/80 rounded-xl border border-amber-200">
                      <ObjectIllustration id="lingura" size={40} />
                    </div>
                    <div className="p-2 bg-white/80 rounded-xl border border-amber-200">
                      <ObjectIllustration id="moneda" size={40} />
                    </div>
                    <div className="p-2 bg-white/80 rounded-xl border border-amber-200">
                      <ObjectIllustration id="cui" size={40} />
                    </div>
                  </div>
                ) : (
                  /* Scene 5 sorted box */
                  <div className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl text-center shadow-xs">
                    <div className="flex justify-center gap-2 mb-2">
                      <ObjectIllustration id="lingura" size={32} />
                      <ObjectIllustration id="cui" size={32} />
                      <ObjectIllustration id="agrafa" size={32} />
                    </div>
                    <span className="text-xs font-bold text-emerald-800">
                      🏠 Casa Prietenilor de Fier!
                    </span>
                  </div>
                )}
              </div>

              {/* Interactive Test Action Button inside Scene */}
              {scene.interactiveObject && interactionState === 'idle' && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={triggerInteraction}
                  className="mt-2 mb-3 z-10 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-full text-xs font-bold shadow-sm flex items-center gap-1.5 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Apropie-l pe Magno de {scene.interactiveObject.name}!</span>
                </motion.button>
              )}

              {/* Reaction Banner when tested */}
              {interactionState === 'snapped' && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="mt-2 mb-2 z-10 px-4 py-1.5 bg-emerald-500 text-white rounded-full text-xs font-bold shadow-sm flex items-center gap-1.5"
                >
                  <span>⚡ ZAC! S-a lipit instantaneu! Este un prieten de fier!</span>
                </motion.div>
              )}

              {interactionState === 'failed' && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="mt-2 mb-2 z-10 px-4 py-1.5 bg-amber-500 text-white rounded-full text-xs font-bold shadow-sm flex items-center gap-1.5"
                >
                  <span>🤔 Nimic! Moneda a rămas pe loc! Nu este feromagnetică.</span>
                </motion.div>
              )}
            </div>

            {/* Story Paragraphs */}
            <div className="space-y-4 text-slate-700 leading-relaxed text-base sm:text-lg">
              <p className="font-normal">{scene.paragraph1}</p>
              {scene.paragraph2 && <p className="font-normal">{scene.paragraph2}</p>}
            </div>

            {/* Dialogue / Quote Bubble */}
            {scene.quote && (
              <div className="p-4 bg-amber-50/90 border-l-4 border-amber-500 rounded-r-2xl italic text-slate-800 font-medium">
                {scene.quote}
              </div>
            )}

            {/* Takeaway / Moral */}
            <div className="flex items-start gap-3 p-3.5 bg-sky-50 border border-sky-200 rounded-2xl text-sky-950 text-sm">
              <span className="text-xl">💡</span>
              <div>
                <strong className="font-bold">Secretul științific: </strong>
                {scene.keyTakeaway}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Footer Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-slate-100">
          <button
            onClick={handlePrev}
            disabled={currentSceneIndex === 0}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
              currentSceneIndex === 0
                ? 'opacity-40 cursor-not-allowed text-slate-400 bg-slate-100'
                : 'text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-2xs'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Înapoi</span>
          </button>

          {currentSceneIndex < STORY_SCENES.length - 1 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-bold text-sm shadow-sm transition-all transform active:scale-95"
            >
              <span>Pagina Următoare</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onStartActivity}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-bold text-sm shadow-md transition-all transform active:scale-95 animate-pulse"
            >
              <span>Ajută-l pe Magno în Activitate!</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
