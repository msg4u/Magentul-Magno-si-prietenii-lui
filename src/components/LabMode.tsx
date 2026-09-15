import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { TEST_OBJECTS } from '../data/objectsData';
import { TestObject, TestResultState } from '../types';
import { MagnoCharacter } from './MagnoCharacter';
import { ObjectIllustration } from './ObjectIllustration';
import { 
  playZacSound, 
  playDullSound, 
  playCelebrationSound, 
  playPopSound, 
  playBoingSound 
} from '../utils/audio';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  Layers, 
  Award, 
  HelpCircle,
  Heart,
  Star,
  Zap,
  Info
} from 'lucide-react';

interface LabModeProps {
  onOpenWorksheet: () => void;
}

export const LabMode: React.FC<LabModeProps> = ({ onOpenWorksheet }) => {
  const [activeStep, setActiveStep] = useState<'predictie' | 'testare' | 'rezultate'>('predictie');
  
  // Child's predictions for each object
  const [predictions, setPredictions] = useState<Record<string, 'prieten' | 'nu_prieten'>>({});

  // Real test results
  const [results, setResults] = useState<TestResultState>({});

  // Current object being tested in Phase 2
  const [currentTestIndex, setCurrentTestIndex] = useState<number>(0);
  const [testAnimationState, setTestAnimationState] = useState<'idle' | 'moving' | 'snapped' | 'no-reaction'>('idle');
  const [isApproaching, setIsApproaching] = useState(false);

  // Selected object to view details in final box
  const [selectedInfoObject, setSelectedInfoObject] = useState<TestObject | null>(null);

  const currentObject = TEST_OBJECTS[currentTestIndex];

  // Set prediction for an object
  const handleSetPrediction = (objectId: string, prediction: 'prieten' | 'nu_prieten') => {
    playPopSound();
    setPredictions(prev => ({
      ...prev,
      [objectId]: prediction
    }));
  };

  // Trigger testing for the current object
  const handleTestCurrentObject = () => {
    if (testAnimationState !== 'idle') return;

    setTestAnimationState('moving');
    setIsApproaching(true);
    playBoingSound();

    setTimeout(() => {
      setIsApproaching(false);
      const isFriend = currentObject.isMagnetic;

      if (isFriend) {
        playZacSound();
        setTestAnimationState('snapped');
      } else {
        playDullSound();
        setTestAnimationState('no-reaction');
      }

      // Record result
      const childPredictedFriend = predictions[currentObject.id] === 'prieten';
      const isPredictionCorrect = childPredictedFriend === isFriend;

      setResults(prev => ({
        ...prev,
        [currentObject.id]: {
          tested: true,
          isMagnetic: isFriend,
          predictedMagnetic: childPredictedFriend,
          isCorrectPrediction: isPredictionCorrect,
          sortedTo: isFriend ? 'prieteni' : 'nu_prieteni'
        }
      }));
    }, 700);
  };

  // Move to next object in test phase
  const handleNextObject = () => {
    playPopSound();
    setTestAnimationState('idle');
    if (currentTestIndex < TEST_OBJECTS.length - 1) {
      setCurrentTestIndex(prev => prev + 1);
    } else {
      // Finished all tests!
      setActiveStep('rezultate');
      playCelebrationSound();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  // Reset entire activity
  const handleReset = () => {
    playPopSound();
    setPredictions({});
    setResults({});
    setCurrentTestIndex(0);
    setActiveStep('predictie');
    setTestAnimationState('idle');
  };

  // Stats calculation
  const predictedCount = Object.keys(predictions).length;
  const allPredicted = predictedCount === TEST_OBJECTS.length;
  const testedCount = Object.keys(results).filter(k => results[k]?.tested).length;
  const correctPredictionsCount = (Object.values(results) as Array<TestResultState[string]>).filter(r => r?.isCorrectPrediction).length;

  // Sorted arrays for results and boxes
  const friendItems = TEST_OBJECTS.filter(o => results[o.id]?.sortedTo === 'prieteni');
  const nonFriendItems = TEST_OBJECTS.filter(o => results[o.id]?.sortedTo === 'nu_prieteni');

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Playful Phase Switcher with 3D buttons */}
      <div className="bg-gradient-to-r from-amber-100 via-rose-50 to-sky-100 border-3 border-amber-300 rounded-3xl p-4 sm:p-5 shadow-[0_6px_0_#fcd34d] flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {/* Step 1: Predictii */}
          <button
            onClick={() => {
              playPopSound();
              setActiveStep('predictie');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-display font-extrabold text-xs sm:text-sm transition-all transform active:translate-y-1 cursor-pointer ${
              activeStep === 'predictie'
                ? 'bg-amber-500 text-white shadow-[0_4px_0_#b45309]'
                : 'bg-white hover:bg-amber-50 text-amber-900 border-2 border-amber-300 shadow-[0_4px_0_#fde68a]'
            }`}
          >
            <span>1. Ghicește! (Predicții)</span>
            <span className="text-xs bg-white/40 px-2 py-0.5 rounded-full font-bold">
              {predictedCount}/{TEST_OBJECTS.length}
            </span>
          </button>

          {/* Step 2: Testare */}
          <button
            onClick={() => {
              if (predictedCount > 0) {
                playPopSound();
                setActiveStep('testare');
              }
            }}
            disabled={predictedCount === 0}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-display font-extrabold text-xs sm:text-sm transition-all transform active:translate-y-1 cursor-pointer ${
              activeStep === 'testare'
                ? 'bg-rose-500 text-white shadow-[0_4px_0_#9f1239]'
                : predictedCount === 0
                ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
                : 'bg-white hover:bg-rose-50 text-rose-900 border-2 border-rose-300 shadow-[0_4px_0_#fecdd3]'
            }`}
          >
            <span>2. Testează cu Magno! 🧲</span>
            <span className="text-xs bg-white/40 px-2 py-0.5 rounded-full font-bold">
              {testedCount}/{TEST_OBJECTS.length}
            </span>
          </button>

          {/* Step 3: Rezultate & Cutia */}
          <button
            onClick={() => {
              if (testedCount > 0) {
                playPopSound();
                setActiveStep('rezultate');
              }
            }}
            disabled={testedCount === 0}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-display font-extrabold text-xs sm:text-sm transition-all transform active:translate-y-1 cursor-pointer ${
              activeStep === 'rezultate'
                ? 'bg-emerald-600 text-white shadow-[0_4px_0_#065f46]'
                : testedCount === 0
                ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
                : 'bg-white hover:bg-emerald-50 text-emerald-900 border-2 border-emerald-300 shadow-[0_4px_0_#a7f3d0]'
            }`}
          >
            <span>3. Casa Prietenilor 🏰</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenWorksheet}
            className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-amber-50 text-amber-900 border-2 border-amber-300 rounded-2xl text-xs font-display font-bold transition-all shadow-[0_4px_0_#fde68a] active:translate-y-1 cursor-pointer"
          >
            <Layers className="w-4 h-4 text-amber-700" />
            <span>Fișă de Desen & Print 🖨️</span>
          </button>
        </div>
      </div>

      {/* PHASE 1: PREDICȚIE (Ce crezi că va sări?) */}
      {activeStep === 'predictie' && (
        <div className="bg-white border-3 border-amber-200 rounded-3xl p-6 sm:p-8 shadow-[0_8px_0_#fde68a] space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b-2 border-amber-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-amber-800 text-2xl font-bold shadow-xs">
                🤔
              </div>
              <div>
                <h3 className="text-2xl font-bold font-display text-slate-900">
                  Pasul 1: Ghicește ce va sări spre Magno!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  Apasă pe butonul roz dacă crezi că face <strong>ZAC!</strong> sau pe cel albastru dacă crezi că stă pe loc.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  const updated: Record<string, 'prieten' | 'nu_prieten'> = {};
                  TEST_OBJECTS.forEach((o, i) => {
                    updated[o.id] = i % 2 === 0 ? 'prieten' : 'nu_prieten';
                  });
                  setPredictions(updated);
                  playPopSound();
                }}
                className="text-xs font-display font-bold text-amber-800 hover:text-rose-600 underline cursor-pointer"
              >
                Gata rapid (Autocompletare)
              </button>

              <button
                onClick={() => {
                  playPopSound();
                  setActiveStep('testare');
                }}
                disabled={predictedCount === 0}
                className="flex items-center gap-2 px-5 py-2.5 bg-rose-500 hover:bg-rose-600 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-2xl font-display font-extrabold text-sm shadow-[0_4px_0_#be123c] active:translate-y-1 active:shadow-none transition-all cursor-pointer"
              >
                <span>Hai la Testare! ({predictedCount}/{TEST_OBJECTS.length})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cards Grid for Prediction with Cute Kawaii Illustrations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TEST_OBJECTS.map((obj) => {
              const currentPred = predictions[obj.id];

              return (
                <div
                  key={obj.id}
                  className={`p-4 rounded-3xl border-3 transition-all flex flex-col justify-between relative overflow-hidden ${
                    currentPred === 'prieten'
                      ? 'border-rose-400 bg-rose-50/60 shadow-[0_4px_0_#fda4af]'
                      : currentPred === 'nu_prieten'
                      ? 'border-sky-300 bg-sky-50/60 shadow-[0_4px_0_#bae6fd]'
                      : 'border-amber-200 bg-amber-50/30 hover:border-amber-300 shadow-[0_4px_0_#fde68a]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Cute Object Icon */}
                    <div className="p-3 bg-white rounded-2xl shadow-xs border-2 border-amber-200 flex-shrink-0 flex items-center justify-center">
                      <ObjectIllustration id={obj.id} size={50} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-display font-bold text-base text-slate-900 truncate">
                          {obj.name}
                        </h4>
                      </div>
                      <span className="text-xs text-slate-500 font-semibold block">
                        Material: <strong className="text-slate-700">{obj.material}</strong>
                      </span>
                      {obj.inStory && (
                        <span className="inline-block mt-1 text-[10px] font-extrabold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full border border-rose-200">
                          📖 Apare în poveste!
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Big Chunky Prediction Buttons */}
                  <div className="mt-4 pt-3 border-t-2 border-white/80 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleSetPrediction(obj.id, 'prieten')}
                      className={`flex-1 py-2 px-2 rounded-2xl font-display font-extrabold text-xs transition-all flex items-center justify-center gap-1 cursor-pointer transform active:translate-y-1 ${
                        currentPred === 'prieten'
                          ? 'bg-rose-500 text-white shadow-[0_3px_0_#9f1239] ring-2 ring-rose-300'
                          : 'bg-white hover:bg-rose-50 text-rose-700 border-2 border-rose-300 shadow-[0_3px_0_#fecdd3]'
                      }`}
                    >
                      <span>🧲 Sare! (ZAC!)</span>
                    </button>

                    <button
                      onClick={() => handleSetPrediction(obj.id, 'nu_prieten')}
                      className={`flex-1 py-2 px-2 rounded-2xl font-display font-extrabold text-xs transition-all flex items-center justify-center gap-1 cursor-pointer transform active:translate-y-1 ${
                        currentPred === 'nu_prieten'
                          ? 'bg-sky-600 text-white shadow-[0_3px_0_#0369a1] ring-2 ring-sky-300'
                          : 'bg-white hover:bg-sky-50 text-sky-800 border-2 border-sky-300 shadow-[0_3px_0_#bae6fd]'
                      }`}
                    >
                      <span>❌ Nu sare</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom call to action */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-amber-100 via-orange-50 to-amber-100 rounded-3xl p-5 border-3 border-amber-300 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-3xl animate-bounce">🎈</span>
              <p className="text-sm sm:text-base text-amber-950 font-display font-bold">
                {allPredicted
                  ? 'Uraaa! Ai ghicit pentru toate cele 14 lucrușoare! Hai să vedem ce face Magno!'
                  : `Ai bifat predicții pentru ${predictedCount} din ${TEST_OBJECTS.length} obiecte. Poți începe testarea oricând!`}
              </p>
            </div>
            <button
              onClick={() => {
                playPopSound();
                setActiveStep('testare');
              }}
              disabled={predictedCount === 0}
              className="px-7 py-3 bg-rose-500 hover:bg-rose-600 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-2xl font-display font-extrabold text-base shadow-[0_5px_0_#be123c] active:translate-y-1 active:shadow-none transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Hai să testăm cu Magno!</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* PHASE 2: TESTARE CU MAGNO (Marea Încercare!) */}
      {activeStep === 'testare' && (
        <div className="bg-white border-3 border-amber-200 rounded-3xl p-6 sm:p-8 shadow-[0_8px_0_#fde68a] space-y-6">
          {/* Header of Test Stage */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b-2 border-amber-100 pb-4">
            <div>
              <span className="inline-block text-xs font-extrabold uppercase tracking-wider text-rose-700 bg-rose-100 px-3 py-1 rounded-full border border-rose-300">
                🔬 Pasul 2: Testarea cu Magno
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 mt-1">
                Obiectul {currentTestIndex + 1} din {TEST_OBJECTS.length}: {currentObject.name}
              </h3>
            </div>

            {/* Stepper Dots */}
            <div className="flex items-center gap-1.5 max-w-xs overflow-x-auto py-1">
              {TEST_OBJECTS.map((obj, idx) => {
                const isTested = results[obj.id]?.tested;
                return (
                  <button
                    key={obj.id}
                    onClick={() => {
                      setTestAnimationState('idle');
                      setCurrentTestIndex(idx);
                      playPopSound();
                    }}
                    className={`w-3.5 h-3.5 rounded-full transition-all cursor-pointer ${
                      currentTestIndex === idx
                        ? 'bg-rose-500 w-7 ring-3 ring-rose-200'
                        : isTested
                        ? 'bg-emerald-500'
                        : 'bg-slate-300 hover:bg-slate-400'
                    }`}
                    title={obj.name}
                  />
                );
              })}
            </div>
          </div>

          {/* Interactive Magnet Testing Stage */}
          <div className="bg-gradient-to-b from-sky-50 via-amber-50/40 to-orange-50/50 rounded-3xl p-6 sm:p-10 border-3 border-amber-200 relative min-h-[340px] flex flex-col items-center justify-center overflow-hidden shadow-inner">
            {/* Wooden play table surface */}
            <div className="absolute inset-x-4 bottom-4 h-14 bg-amber-200/70 rounded-2xl border-t-3 border-amber-300 flex items-center justify-center pointer-events-none">
              <span className="text-xs font-display font-bold text-amber-800">
                Masa de experimente științifice 🔬
              </span>
            </div>

            {/* Child's Prediction Badge */}
            <div className="absolute top-4 left-4 z-10">
              <div className="bg-white/95 border-2 border-amber-300 rounded-2xl px-3.5 py-1.5 shadow-sm flex items-center gap-2">
                <span className="text-xs text-slate-600 font-display font-bold">Tu ai ghicit:</span>
                {predictions[currentObject.id] === 'prieten' ? (
                  <span className="text-xs font-extrabold text-rose-600 bg-rose-100 px-2.5 py-0.5 rounded-xl border border-rose-300">
                    🧲 Că va sări!
                  </span>
                ) : predictions[currentObject.id] === 'nu_prieten' ? (
                  <span className="text-xs font-extrabold text-sky-700 bg-sky-100 px-2.5 py-0.5 rounded-xl border border-sky-300">
                    ❌ Că NU sare
                  </span>
                ) : (
                  <span className="text-xs italic text-amber-700 font-bold">
                    (Nu ai ghicit)
                  </span>
                )}
              </div>
            </div>

            {/* Center Stage: Magno & Object */}
            <div className="flex items-center justify-center gap-10 sm:gap-24 w-full z-10 py-6">
              {/* Magno */}
              <motion.div
                animate={
                  testAnimationState === 'moving'
                    ? { x: [0, 65, 45] }
                    : testAnimationState === 'snapped'
                    ? { x: 55, scale: [1, 1.1, 1], rotate: [0, -3, 3, 0] }
                    : testAnimationState === 'no-reaction'
                    ? { x: 40 }
                    : { y: [0, -6, 0] }
                }
                transition={{
                  duration: testAnimationState === 'moving' ? 0.7 : 2,
                  repeat: testAnimationState === 'idle' ? Infinity : 0
                }}
                className="flex flex-col items-center cursor-pointer"
                onClick={handleTestCurrentObject}
              >
                <MagnoCharacter
                  mood={
                    testAnimationState === 'snapped'
                      ? 'happy'
                      : testAnimationState === 'no-reaction'
                      ? 'puzzled'
                      : 'curious'
                  }
                  isAttracting={isApproaching || testAnimationState === 'snapped'}
                  size="hero"
                  showSparkles={testAnimationState === 'snapped'}
                />
                <span className="mt-1 text-xs font-display font-extrabold text-slate-800 bg-white/95 px-3 py-1 rounded-full border-2 border-amber-300 shadow-xs">
                  Magno 🧲
                </span>
              </motion.div>

              {/* Object to test */}
              <div className="flex flex-col items-center">
                <motion.div
                  animate={
                    testAnimationState === 'snapped'
                      ? { x: -65, rotate: -25, scale: 1.1 }
                      : testAnimationState === 'no-reaction'
                      ? { rotate: [0, -4, 4, -2, 2, 0] }
                      : { y: [0, -4, 0] }
                  }
                  transition={{
                    duration: testAnimationState === 'snapped' ? 0.25 : 2.5,
                    repeat: testAnimationState === 'idle' ? Infinity : 0
                  }}
                  className="p-4 bg-white rounded-3xl shadow-md border-3 border-amber-300 flex items-center justify-center relative"
                >
                  <ObjectIllustration id={currentObject.id} size={76} />

                  {/* Visual indication if snapped */}
                  {testAnimationState === 'snapped' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-3 -right-3 bg-emerald-500 text-white p-1.5 rounded-full shadow-md border-2 border-white"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                    </motion.div>
                  )}
                </motion.div>

                <span className="mt-3 font-display font-bold text-base text-slate-900">
                  {currentObject.name}
                </span>
                <span className="text-xs text-amber-900 font-bold bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-200">
                  Material: {currentObject.material}
                </span>
              </div>
            </div>

            {/* Test Action Trigger with 3D button */}
            <div className="z-10 mt-2 flex flex-col items-center gap-3">
              {testAnimationState === 'idle' ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleTestCurrentObject}
                  className="px-8 py-3.5 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white rounded-2xl font-display font-extrabold text-base sm:text-lg shadow-[0_6px_0_#be123c] active:translate-y-1 active:shadow-none flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 text-amber-200 animate-spin" />
                  <span>Apropie-l pe Magno! (Apasă aici!)</span>
                </motion.button>
              ) : testAnimationState === 'snapped' ? (
                <div className="flex flex-col items-center gap-3 animate-pop-burst">
                  <div className="px-6 py-2.5 bg-emerald-500 text-white font-display font-black text-base sm:text-lg rounded-2xl shadow-[0_5px_0_#065f46] border-2 border-white flex items-center gap-2">
                    <span className="text-2xl">⚡</span>
                    <span>ZAAAC! A sărit instant! {currentObject.name} este un prieten de fier!</span>
                    <span className="text-xl">💖</span>
                  </div>

                  <button
                    onClick={handleNextObject}
                    className="px-7 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-display font-extrabold text-base shadow-[0_5px_0_#047857] active:translate-y-1 active:shadow-none flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <span>📥 Pune-l în Cutia Prietenilor & Următorul</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              ) : testAnimationState === 'no-reaction' ? (
                <div className="flex flex-col items-center gap-3 animate-pop-burst">
                  <div className="px-6 py-2.5 bg-amber-500 text-white font-display font-black text-base sm:text-lg rounded-2xl shadow-[0_5px_0_#b45309] border-2 border-white flex items-center gap-2">
                    <span className="text-2xl">💤</span>
                    <span>NIMIC! A rămas nemișcat. {currentObject.name} nu are fier!</span>
                  </div>

                  <button
                    onClick={handleNextObject}
                    className="px-7 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-2xl font-display font-extrabold text-base shadow-[0_5px_0_#1e293b] active:translate-y-1 active:shadow-none flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <span>📦 Pune-l în Cutia cu alte lucrușoare & Următorul</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              ) : null}
            </div>
          </div>

          {/* Scientific Explanation for Kids */}
          <div className="p-4 bg-sky-50 border-2 border-sky-300 rounded-3xl flex items-start gap-3 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center flex-shrink-0 text-lg font-bold shadow-xs">
              🔍
            </div>
            <div className="text-xs sm:text-sm text-slate-700 font-medium">
              <strong className="font-display font-bold text-slate-900 block text-sm">
                De ce s-a întâmplat așa?
              </strong>
              {currentObject.scienceExplanation}
            </div>
          </div>
        </div>
      )}

      {/* PHASE 3: REZULTATE & CASA PRIETENILOR (The Two Compartments) */}
      {activeStep === 'rezultate' && (
        <div className="bg-white border-3 border-amber-200 rounded-3xl p-6 sm:p-8 shadow-[0_8px_0_#fde68a] space-y-8">
          {/* Header & Gold Medal Celebration */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <motion.div
              animate={{ rotate: [0, -10, 10, -5, 5, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-amber-400 text-amber-950 border-3 border-white shadow-[0_6px_0_#d97706] mx-auto text-4xl"
            >
              🏅
            </motion.div>
            <h3 className="text-2xl sm:text-4xl font-extrabold font-display text-slate-900">
              Felicitări, Mare Cercetător Magnetic!
            </h3>
            <p className="text-slate-700 text-sm sm:text-base font-medium">
              Ai explorat toate lucrușoarele și le-ai așezat în cele două cutii ale lui Magno!
              <br />
              Ai ghicit corect{' '}
              <strong className="text-emerald-600 font-extrabold text-lg">
                {correctPredictionsCount} din {testedCount}
              </strong>{' '}
              predicții!
            </p>
          </div>

          {/* The Two Compartments of "Casa Prietenilor lui Magno" (Pasul 1) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg sm:text-xl font-bold font-display text-slate-800 flex items-center gap-2">
                <span>📦 Casa lui Magno: Cutia de Sortare cu 2 Compartimente</span>
              </h4>
              <span className="text-xs font-display font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                Apasă pe un obiect să-i afli secretul! 👆
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Compartimentul 1: PRIETENI DE FIER (🧲) */}
              <div className="bg-gradient-to-b from-rose-100/90 to-rose-50 border-3 border-rose-400 rounded-3xl p-5 shadow-[0_6px_0_#fda4af] flex flex-col">
                <div className="flex items-center justify-between border-b-2 border-rose-200 pb-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl animate-bounce">🧲</span>
                    <div>
                      <h5 className="font-display font-extrabold text-rose-950 text-lg">
                        PRIETENI DE FIER
                      </h5>
                      <p className="text-xs text-rose-800 font-bold">
                        (Sar instant spre Magno — ZAC!)
                      </p>
                    </div>
                  </div>
                  <span className="bg-rose-500 text-white text-xs font-display font-extrabold px-3 py-1 rounded-full shadow-xs">
                    {friendItems.length} prieteni
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 flex-1">
                  {friendItems.length === 0 ? (
                    <div className="col-span-full py-8 text-center text-rose-400 text-xs italic">
                      Nu a fost sortat niciun prieten încă.
                    </div>
                  ) : (
                    friendItems.map(obj => (
                      <motion.div
                        key={obj.id}
                        whileHover={{ scale: 1.06, rotate: 2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          playPopSound();
                          setSelectedInfoObject(obj);
                        }}
                        className="bg-white p-3 rounded-2xl border-2 border-rose-300 flex flex-col items-center text-center shadow-xs hover:border-rose-400 transition-all cursor-pointer"
                      >
                        <ObjectIllustration id={obj.id} size={48} />
                        <span className="font-display font-bold text-xs text-slate-900 mt-2 truncate w-full">
                          {obj.name}
                        </span>
                        <span className="text-[10px] text-rose-600 font-extrabold bg-rose-50 px-2 py-0.5 rounded-full mt-0.5">
                          {obj.material}
                        </span>
                      </motion.div>
                    ))
                  )}
                </div>

                <div className="mt-4 pt-3 border-t-2 border-rose-200 text-xs text-rose-950 font-semibold flex items-center gap-1.5">
                  <span>💡</span>
                  <span><strong>Secretul lor comun:</strong> Conțin fier pur sau oțel!</span>
                </div>
              </div>

              {/* Compartimentul 2: NU SUNT PRIETENI (❌) */}
              <div className="bg-gradient-to-b from-sky-100/90 to-sky-50 border-3 border-sky-400 rounded-3xl p-5 shadow-[0_6px_0_#bae6fd] flex flex-col">
                <div className="flex items-center justify-between border-b-2 border-sky-200 pb-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl">💤</span>
                    <div>
                      <h5 className="font-display font-extrabold text-sky-950 text-lg">
                        NU SUNT PRIETENI
                      </h5>
                      <p className="text-xs text-sky-800 font-bold">
                        (Rămân pe loc, nu sunt atrași deloc)
                      </p>
                    </div>
                  </div>
                  <span className="bg-sky-600 text-white text-xs font-display font-extrabold px-3 py-1 rounded-full shadow-xs">
                    {nonFriendItems.length} obiecte
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 flex-1">
                  {nonFriendItems.length === 0 ? (
                    <div className="col-span-full py-8 text-center text-sky-400 text-xs italic">
                      Nu a fost sortat niciun obiect încă.
                    </div>
                  ) : (
                    nonFriendItems.map(obj => (
                      <motion.div
                        key={obj.id}
                        whileHover={{ scale: 1.06, rotate: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          playPopSound();
                          setSelectedInfoObject(obj);
                        }}
                        className="bg-white p-3 rounded-2xl border-2 border-sky-300 flex flex-col items-center text-center shadow-xs hover:border-sky-400 transition-all cursor-pointer"
                      >
                        <ObjectIllustration id={obj.id} size={48} />
                        <span className="font-display font-bold text-xs text-slate-900 mt-2 truncate w-full">
                          {obj.name}
                        </span>
                        <span className="text-[10px] text-sky-700 font-extrabold bg-sky-50 px-2 py-0.5 rounded-full mt-0.5">
                          {obj.material}
                        </span>
                      </motion.div>
                    ))
                  )}
                </div>

                <div className="mt-4 pt-3 border-t-2 border-sky-200 text-xs text-sky-950 font-semibold flex items-center gap-1.5">
                  <span>💡</span>
                  <span><strong>Secretul lor:</strong> Plastic, sticlă, lemn sau alte metale fără fier.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons at bottom */}
          <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t-2 border-amber-100">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl text-slate-700 bg-white hover:bg-slate-50 border-2 border-slate-300 font-display font-bold text-sm shadow-[0_4px_0_#cbd5e1] active:translate-y-1 active:shadow-none transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-slate-600" />
              <span>Joacă din nou de la început!</span>
            </button>

            <button
              onClick={onOpenWorksheet}
              className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-display font-extrabold text-sm shadow-[0_4px_0_#b45309] active:translate-y-1 active:shadow-none transition-all cursor-pointer"
            >
              <Layers className="w-4 h-4 text-white" />
              <span>Deschide Fișa Tipăribilă (Print)</span>
            </button>
          </div>
        </div>
      )}

      {/* Selected Object Pop-up Modal for Kids */}
      <AnimatePresence>
        {selectedInfoObject && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-md w-full border-3 border-amber-300 shadow-2xl relative space-y-4"
            >
              <button
                onClick={() => setSelectedInfoObject(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-50 rounded-2xl border-2 border-amber-200">
                  <ObjectIllustration id={selectedInfoObject.id} size={56} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xl text-slate-900">
                    {selectedInfoObject.name}
                  </h4>
                  <span className="text-xs text-slate-500 font-semibold">
                    Material: <strong className="text-slate-800">{selectedInfoObject.material}</strong>
                  </span>
                </div>
              </div>

              <div className={`p-4 rounded-2xl border-2 ${
                selectedInfoObject.isMagnetic
                  ? 'bg-rose-50 border-rose-200 text-rose-950'
                  : 'bg-sky-50 border-sky-200 text-sky-950'
              }`}>
                <div className="flex items-center gap-2 font-display font-bold text-sm mb-1">
                  <span>{selectedInfoObject.isMagnetic ? '🧲 Prieten Adevărat de Fier!' : '❌ Nu este atras'}</span>
                </div>
                <p className="text-xs sm:text-sm font-medium leading-relaxed">
                  {selectedInfoObject.scienceExplanation}
                </p>
              </div>

              <button
                onClick={() => setSelectedInfoObject(null)}
                className="w-full py-2.5 bg-amber-400 hover:bg-amber-500 text-amber-950 font-display font-extrabold text-sm rounded-2xl shadow-[0_3px_0_#ca8a04] active:translate-y-1 cursor-pointer"
              >
                Am înțeles! 👍
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
