import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { TEST_OBJECTS } from '../data/objectsData';
import { TestObject, PredictionState, TestResultState } from '../types';
import { MagnoCharacter } from './MagnoCharacter';
import { ObjectIllustration } from './ObjectIllustration';
import { playZacSound, playDullSound, playCelebrationSound, playPopSound } from '../utils/audio';
import { 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Award, 
  ArrowRight, 
  Layers,
  Info
} from 'lucide-react';

interface LabModeProps {
  onOpenWorksheet: () => void;
}

export const LabMode: React.FC<LabModeProps> = ({ onOpenWorksheet }) => {
  const [activeStep, setActiveStep] = useState<'predictie' | 'testare' | 'rezultate'>('predictie');
  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [predictions, setPredictions] = useState<PredictionState>({});
  const [results, setResults] = useState<TestResultState>({});
  const [isApproaching, setIsApproaching] = useState(false);
  const [testAnimationState, setTestAnimationState] = useState<'idle' | 'moving' | 'snapped' | 'no-reaction'>('idle');
  const [selectedInfoObject, setSelectedInfoObject] = useState<TestObject | null>(null);

  const currentObject = TEST_OBJECTS[currentTestIndex];

  // Check how many items have predictions
  const predictedCount = Object.keys(predictions).length;
  const allPredicted = predictedCount === TEST_OBJECTS.length;

  // Handle setting a prediction for an object
  const handleSetPrediction = (objectId: string, choice: 'prieten' | 'nu_prieten') => {
    playPopSound();
    setPredictions(prev => ({
      ...prev,
      [objectId]: choice
    }));
  };

  // Perform testing on the current object with Magno
  const handleTestCurrentObject = () => {
    if (testAnimationState !== 'idle') return;
    setIsApproaching(true);
    setTestAnimationState('moving');

    setTimeout(() => {
      if (currentObject.isMagnetic) {
        playZacSound();
        setTestAnimationState('snapped');
      } else {
        playDullSound();
        setTestAnimationState('no-reaction');
      }

      // Record result
      const userPred = predictions[currentObject.id];
      const isFriend = currentObject.isMagnetic;
      const isCorrect = (userPred === 'prieten' && isFriend) || (userPred === 'nu_prieten' && !isFriend);

      setResults(prev => ({
        ...prev,
        [currentObject.id]: {
          tested: true,
          sortedTo: isFriend ? 'prieteni' : 'nu_prieteni',
          isCorrectPrediction: isCorrect
        }
      }));

      setIsApproaching(false);
    }, 700);
  };

  // Move to next test object or complete
  const handleNextObject = () => {
    setTestAnimationState('idle');
    if (currentTestIndex < TEST_OBJECTS.length - 1) {
      setCurrentTestIndex(prev => prev + 1);
    } else {
      setActiveStep('rezultate');
      playCelebrationSound();
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Safe fallback if blocked
      }
    }
  };

  const handleReset = () => {
    setPredictions({});
    setResults({});
    setCurrentTestIndex(0);
    setActiveStep('predictie');
    setTestAnimationState('idle');
  };

  // Stats calculation
  const testedCount = Object.keys(results).filter(k => results[k]?.tested).length;
  const correctPredictionsCount = (Object.values(results) as Array<TestResultState[string]>).filter(r => r?.isCorrectPrediction).length;

  // Sorted arrays for results and boxes
  const friendItems = TEST_OBJECTS.filter(o => results[o.id]?.sortedTo === 'prieteni');
  const nonFriendItems = TEST_OBJECTS.filter(o => results[o.id]?.sortedTo === 'nu_prieteni');

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Activity Progress Bar & Phase Switcher */}
      <div className="bg-white border-2 border-amber-200/90 rounded-3xl p-4 sm:p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveStep('predictie')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-display font-bold text-sm transition-all ${
              activeStep === 'predictie'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200'
            }`}
          >
            <span>1. Predicții</span>
            <span className="text-xs bg-white/30 px-2 py-0.5 rounded-full font-sans">
              {predictedCount}/{TEST_OBJECTS.length}
            </span>
          </button>

          <button
            onClick={() => {
              if (predictedCount > 0) setActiveStep('testare');
            }}
            disabled={predictedCount === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-display font-bold text-sm transition-all ${
              activeStep === 'testare'
                ? 'bg-rose-500 text-white shadow-xs'
                : predictedCount === 0
                ? 'opacity-50 cursor-not-allowed bg-slate-100 text-slate-400'
                : 'bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-200'
            }`}
          >
            <span>2. Testarea cu Magno</span>
            <span className="text-xs bg-white/30 px-2 py-0.5 rounded-full font-sans">
              {testedCount}/{TEST_OBJECTS.length}
            </span>
          </button>

          <button
            onClick={() => {
              if (testedCount > 0) setActiveStep('rezultate');
            }}
            disabled={testedCount === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-display font-bold text-sm transition-all ${
              activeStep === 'rezultate'
                ? 'bg-emerald-600 text-white shadow-xs'
                : testedCount === 0
                ? 'opacity-50 cursor-not-allowed bg-slate-100 text-slate-400'
                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200'
            }`}
          >
            <span>3. Rezultate & Casa Prietenilor</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenWorksheet}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold transition-all shadow-2xs"
          >
            <Layers className="w-3.5 h-3.5 text-amber-700" />
            <span>Fișă Tipăribilă (PDF)</span>
          </button>

          <button
            onClick={handleReset}
            title="Reia activitatea de la capăt"
            className="flex items-center gap-1 p-2 hover:bg-slate-100 text-slate-500 hover:text-slate-800 rounded-xl text-xs font-semibold transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* PHASE 1: PREDICȚIE (Hypothesis formulation before testing) */}
      {activeStep === 'predictie' && (
        <div className="bg-white border-2 border-amber-200/90 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                Pasul 3 & 4: Fișa de Predicție a Copilului
              </span>
              <h3 className="text-2xl font-bold font-display text-slate-900 mt-2">
                Ce crezi despre fiecare obiect din sertar?
              </h3>
              <p className="text-slate-600 text-sm mt-1 max-w-2xl">
                Exact ca Magno în poveste, înainte de a atinge obiectul, ghicește dacă va fi un{' '}
                <strong className="text-rose-600">„prieten de fier” (🧲)</strong> sau{' '}
                <strong className="text-slate-600">„nu e prieten” (❌)</strong>!
              </p>
            </div>

            {/* Quick auto-fill or proceed button */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  // Fill remaining random or prompt
                  const updated: PredictionState = { ...predictions };
                  TEST_OBJECTS.forEach(obj => {
                    if (!updated[obj.id]) {
                      // Guess based loosely
                      updated[obj.id] = obj.id === 'moneda' || obj.isMagnetic ? 'prieten' : 'nu_prieten';
                    }
                  });
                  setPredictions(updated);
                  playPopSound();
                }}
                className="text-xs font-bold text-amber-700 hover:underline px-2 py-1"
              >
                Completează rapid
              </button>
              <button
                onClick={() => setActiveStep('testare')}
                disabled={predictedCount === 0}
                className="flex items-center gap-2 px-5 py-2.5 bg-rose-500 hover:bg-rose-600 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl font-bold text-sm shadow-sm transition-all"
              >
                <span>Treci la Testare ({predictedCount}/{TEST_OBJECTS.length})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cards Grid for Prediction */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TEST_OBJECTS.map((obj) => {
              const currentPred = predictions[obj.id];

              return (
                <div
                  key={obj.id}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                    currentPred === 'prieten'
                      ? 'border-rose-300 bg-rose-50/40'
                      : currentPred === 'nu_prieten'
                      ? 'border-slate-300 bg-slate-50/60'
                      : 'border-amber-200/80 bg-white hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-white rounded-xl shadow-2xs border border-slate-100 flex-shrink-0">
                      <ObjectIllustration id={obj.id} size={42} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-sm text-slate-800 truncate">
                          {obj.name}
                        </h4>
                        {obj.inStory && (
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded-sm" title="Apare în povestea lui Magno!">
                            Poveste
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-500 block">
                        Material: {obj.material}
                      </span>
                    </div>
                  </div>

                  {/* Prediction Buttons */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleSetPrediction(obj.id, 'prieten')}
                      className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                        currentPred === 'prieten'
                          ? 'bg-rose-500 text-white shadow-2xs ring-2 ring-rose-300'
                          : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200'
                      }`}
                    >
                      <span>🧲 Va sări!</span>
                    </button>

                    <button
                      onClick={() => handleSetPrediction(obj.id, 'nu_prieten')}
                      className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                        currentPred === 'nu_prieten'
                          ? 'bg-slate-700 text-white shadow-2xs ring-2 ring-slate-400'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
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
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-amber-50 rounded-2xl p-4 border border-amber-200">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🧐</span>
              <p className="text-xs sm:text-sm text-amber-950 font-medium">
                {allPredicted
                  ? 'Grozav! Ai făcut predicții pentru toate obiectele. Hai să vedem ce zice Magno!'
                  : `Ai bifat predicții pentru ${predictedCount} din ${TEST_OBJECTS.length} obiecte. Poți începe testarea oricând!`}
              </p>
            </div>
            <button
              onClick={() => setActiveStep('testare')}
              disabled={predictedCount === 0}
              className="px-6 py-2.5 bg-rose-500 hover:bg-rose-600 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl font-bold text-sm shadow-sm transition-transform active:scale-95 flex items-center gap-2"
            >
              <span>Testează cu Magno</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* PHASE 2: TESTARE CU MAGNO (Bringing Magno close to each object) */}
      {activeStep === 'testare' && (
        <div className="bg-white border-2 border-amber-200/90 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
          {/* Header of Test Stage */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                Pasul 5: Testarea propriu-zisă
              </span>
              <h3 className="text-2xl font-bold font-display text-slate-900 mt-1">
                Obiectul {currentTestIndex + 1} din {TEST_OBJECTS.length}: {currentObject.name}
              </h3>
            </div>

            {/* Object stepper dots */}
            <div className="flex items-center gap-1 max-w-xs overflow-x-auto py-1">
              {TEST_OBJECTS.map((obj, idx) => {
                const isTested = results[obj.id]?.tested;
                return (
                  <button
                    key={obj.id}
                    onClick={() => {
                      setTestAnimationState('idle');
                      setCurrentTestIndex(idx);
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      currentTestIndex === idx
                        ? 'bg-rose-500 w-5 ring-2 ring-rose-200'
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
          <div className="bg-gradient-to-b from-slate-50 to-amber-50/40 rounded-3xl p-6 sm:p-10 border-2 border-amber-200/80 relative min-h-[300px] flex flex-col items-center justify-center overflow-hidden">
            {/* Magnetic Table surface */}
            <div className="absolute inset-x-4 bottom-6 h-12 bg-amber-100/60 rounded-xl border-t-2 border-amber-300/40 pointer-events-none" />

            {/* Child's Prediction Tag */}
            <div className="absolute top-4 left-4 z-10">
              <div className="bg-white/95 border border-amber-200 rounded-xl px-3 py-1.5 shadow-2xs flex items-center gap-2">
                <span className="text-xs text-slate-500 font-semibold">Predicția ta:</span>
                {predictions[currentObject.id] === 'prieten' ? (
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-lg border border-rose-200">
                    🧲 Prieten de fier
                  </span>
                ) : predictions[currentObject.id] === 'nu_prieten' ? (
                  <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200">
                    ❌ Nu e prieten
                  </span>
                ) : (
                  <span className="text-xs italic text-amber-600">
                    (Nu ai făcut predicție)
                  </span>
                )}
              </div>
            </div>

            {/* Center Stage: Magno & Object */}
            <div className="flex items-center justify-center gap-12 sm:gap-24 w-full z-10 py-6">
              {/* Magno */}
              <motion.div
                animate={
                  testAnimationState === 'moving'
                    ? { x: [0, 60, 40] }
                    : testAnimationState === 'snapped'
                    ? { x: 50, scale: [1, 1.06, 1] }
                    : testAnimationState === 'no-reaction'
                    ? { x: 40 }
                    : { y: [0, -4, 0] }
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
                <span className="mt-2 text-xs font-bold text-slate-700 bg-white/90 px-2.5 py-0.5 rounded-full border border-slate-200 shadow-2xs">
                  Magno Magnetul
                </span>
              </motion.div>

              {/* Object to test */}
              <div className="flex flex-col items-center">
                <motion.div
                  animate={
                    testAnimationState === 'snapped'
                      ? { x: -60, rotate: -20, scale: 1.05 }
                      : testAnimationState === 'no-reaction'
                      ? { rotate: [0, -2, 2, 0] }
                      : {}
                  }
                  transition={{ duration: 0.2 }}
                  className="p-4 bg-white rounded-3xl shadow-md border-2 border-amber-200 flex items-center justify-center relative"
                >
                  <ObjectIllustration id={currentObject.id} size={72} />

                  {/* Visual indication if snapped */}
                  {testAnimationState === 'snapped' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-emerald-500 text-white p-1 rounded-full shadow-xs"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                    </motion.div>
                  )}
                </motion.div>

                <span className="mt-3 font-display font-bold text-base text-slate-900">
                  {currentObject.name}
                </span>
                <span className="text-xs text-slate-500 font-semibold bg-white/80 px-2 py-0.5 rounded-full border border-slate-100">
                  Material: {currentObject.material}
                </span>
              </div>
            </div>

            {/* Test Action Trigger */}
            <div className="z-10 mt-4 flex flex-col items-center gap-3">
              {testAnimationState === 'idle' ? (
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleTestCurrentObject}
                  className="px-6 py-3 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white rounded-2xl font-bold text-base shadow-md flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Apropie-l pe Magno!</span>
                </motion.button>
              ) : testAnimationState === 'snapped' ? (
                <div className="flex flex-col items-center gap-3">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="px-4 py-2 bg-emerald-500 text-white rounded-2xl font-bold text-sm shadow-sm flex items-center gap-2"
                  >
                    <span>⚡ ZAC! A sărit imediat! {currentObject.name} este un prieten de fier!</span>
                  </motion.div>
                  <button
                    onClick={handleNextObject}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-sm flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Pune-l în cutie & Mergi mai departe</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : testAnimationState === 'no-reaction' ? (
                <div className="flex flex-col items-center gap-3">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="px-4 py-2 bg-amber-500 text-white rounded-2xl font-bold text-sm shadow-sm flex items-center gap-2"
                  >
                    <span>🤔 Nimic! A rămas pe loc. {currentObject.name} NU este magnetic!</span>
                  </motion.div>
                  <button
                    onClick={handleNextObject}
                    className="px-6 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold text-sm shadow-sm flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Pune-l în cutie & Mergi mai departe</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : null}
            </div>
          </div>

          {/* Scientific Explanation Card for Tested Item */}
          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-slate-700">
              <strong className="font-bold text-slate-900">De ce s-a întâmplat așa? </strong>
              {currentObject.scienceExplanation}
            </div>
          </div>
        </div>
      )}

      {/* PHASE 3: REZULTATE & CASA PRIETENILOR LUI MAGNO */}
      {activeStep === 'rezultate' && (
        <div className="bg-white border-2 border-amber-200/90 rounded-3xl p-6 sm:p-8 shadow-md space-y-8">
          {/* Header & Congratulations */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
              Felicitări, Mic Cercetător Magnetic!
            </h3>
            <p className="text-slate-600 text-sm">
              Ai terminat testarea și ai sortat obiectele în cutia lui Magno.
              Ai ghicit corect{' '}
              <strong className="text-emerald-700 font-bold">
                {correctPredictionsCount} din {testedCount}
              </strong>{' '}
              predicții!
            </p>
          </div>

          {/* The Two Compartments of "Casa Prietenilor lui Magno" (Pasul 1 din cerință) */}
          <div>
            <h4 className="text-base font-bold font-display text-slate-800 mb-3 flex items-center gap-2">
              <span>📦 Casa lui Magno: Cutia de Sortare cu 2 Compartimente</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Compartimentul 1: PRIETENI DE FIER (🧲) */}
              <div className="bg-rose-50/70 border-3 border-rose-300 rounded-3xl p-5 shadow-xs relative flex flex-col">
                <div className="flex items-center justify-between border-b border-rose-200 pb-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">🧲</span>
                    <div>
                      <h5 className="font-display font-bold text-rose-950 text-base">
                        PRIETENI DE FIER
                      </h5>
                      <p className="text-[11px] text-rose-800 font-semibold">
                        (Atrase instantaneu de Magno — ZAC!)
                      </p>
                    </div>
                  </div>
                  <span className="bg-rose-200 text-rose-900 text-xs font-bold px-2.5 py-1 rounded-full">
                    {friendItems.length} obiecte
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 flex-1">
                  {friendItems.length === 0 ? (
                    <div className="col-span-full py-8 text-center text-rose-400 text-xs italic">
                      Nu a fost sortat niciun prieten încă.
                    </div>
                  ) : (
                    friendItems.map(obj => (
                      <div
                        key={obj.id}
                        onClick={() => setSelectedInfoObject(obj)}
                        className="bg-white p-3 rounded-2xl border border-rose-200 flex flex-col items-center text-center shadow-2xs hover:shadow-xs transition-shadow cursor-pointer"
                      >
                        <ObjectIllustration id={obj.id} size={40} />
                        <span className="font-bold text-xs text-slate-800 mt-2 truncate w-full">
                          {obj.name}
                        </span>
                        <span className="text-[10px] text-rose-600 font-semibold">
                          {obj.material}
                        </span>
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-rose-200/60 text-[11px] text-rose-900 font-medium">
                  💡 <strong>Ce au în comun:</strong> Conțin fier pur sau oțel feromagnetic.
                </div>
              </div>

              {/* Compartimentul 2: NU SUNT PRIETENI (❌) */}
              <div className="bg-slate-50 border-3 border-slate-300 rounded-3xl p-5 shadow-xs relative flex flex-col">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">❌</span>
                    <div>
                      <h5 className="font-display font-bold text-slate-900 text-base">
                        NU SUNT PRIETENI
                      </h5>
                      <p className="text-[11px] text-slate-600 font-semibold">
                        (Nu reacționează la puterea magică a lui Magno)
                      </p>
                    </div>
                  </div>
                  <span className="bg-slate-200 text-slate-800 text-xs font-bold px-2.5 py-1 rounded-full">
                    {nonFriendItems.length} obiecte
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 flex-1">
                  {nonFriendItems.length === 0 ? (
                    <div className="col-span-full py-8 text-center text-slate-400 text-xs italic">
                      Niciun obiect sortat aici încă.
                    </div>
                  ) : (
                    nonFriendItems.map(obj => (
                      <div
                        key={obj.id}
                        onClick={() => setSelectedInfoObject(obj)}
                        className="bg-white p-3 rounded-2xl border border-slate-200 flex flex-col items-center text-center shadow-2xs hover:shadow-xs transition-shadow cursor-pointer"
                      >
                        <ObjectIllustration id={obj.id} size={40} />
                        <span className="font-bold text-xs text-slate-800 mt-2 truncate w-full">
                          {obj.name}
                        </span>
                        <span className="text-[10px] text-slate-500 font-semibold">
                          {obj.material}
                        </span>
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/80 text-[11px] text-slate-700 font-medium">
                  💡 <strong>Important:</strong> Include materiale nemetalice (lemn, plastic, sticlă), dar și metale ca aurul, arama sau aluminiul!
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Prediction vs Reality Table (Pasul 6 din cerință) */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <div className="bg-amber-50/80 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
              <h5 className="font-display font-bold text-amber-950 text-sm">
                Comparația: Predicția Ta vs. Realitatea Științifică
              </h5>
              <span className="text-xs text-slate-500 font-medium">
                Verifică dacă ai fost surprins, ca Magno cu moneda!
              </span>
            </div>

            <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
              {TEST_OBJECTS.map(obj => {
                const res = results[obj.id];
                const pred = predictions[obj.id];
                const wasTested = res?.tested;

                return (
                  <div key={obj.id} className="p-3.5 flex items-center justify-between gap-4 hover:bg-slate-50/80">
                    <div className="flex items-center gap-3 min-w-0">
                      <ObjectIllustration id={obj.id} size={32} />
                      <div>
                        <span className="font-bold text-xs text-slate-900 block">
                          {obj.name}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {obj.material}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs">
                      {/* Prediction */}
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block">Predicție:</span>
                        {pred === 'prieten' ? (
                          <span className="font-bold text-rose-600">🧲 Prieten</span>
                        ) : pred === 'nu_prieten' ? (
                          <span className="font-bold text-slate-600">❌ Nu e prieten</span>
                        ) : (
                          <span className="text-slate-400 italic">-</span>
                        )}
                      </div>

                      {/* Real status */}
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block">Realitate:</span>
                        {obj.isMagnetic ? (
                          <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            Magnetic (Fier)
                          </span>
                        ) : (
                          <span className="font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                            Ne-magnetic
                          </span>
                        )}
                      </div>

                      {/* Match verdict */}
                      {wasTested && (
                        <div className="w-8 flex justify-center">
                          {res?.isCorrectPrediction ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" title="Predicție corectă!" />
                          ) : (
                            <span className="text-sm" title="Surpriză științifică!">😲</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2.5 text-slate-700 hover:bg-slate-100 rounded-xl font-bold text-sm border border-slate-200 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Refă Testarea</span>
            </button>

            <button
              onClick={onOpenWorksheet}
              className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold text-sm shadow-xs transition-colors"
            >
              <Layers className="w-4 h-4" />
              <span>Deschide Fișa Tipăribilă pentru Acasă</span>
            </button>
          </div>
        </div>
      )}

      {/* Detail Modal if clicked on an object */}
      <AnimatePresence>
        {selectedInfoObject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-md w-full border-2 border-amber-200 shadow-xl space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
                    <ObjectIllustration id={selectedInfoObject.id} size={54} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold font-display text-slate-900">
                      {selectedInfoObject.name}
                    </h4>
                    <span className="text-xs font-semibold text-slate-500">
                      Material: {selectedInfoObject.material}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedInfoObject(null)}
                  className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700"
                >
                  ✕
                </button>
              </div>

              <div className={`p-3 rounded-2xl text-xs font-bold ${
                selectedInfoObject.isMagnetic
                  ? 'bg-rose-50 text-rose-900 border border-rose-200'
                  : 'bg-slate-100 text-slate-800 border border-slate-200'
              }`}>
                {selectedInfoObject.isMagnetic
                  ? '🧲 Este un prieten de fier! Magno îl atrage cu ZAC!'
                  : '❌ Nu este prieten de fier! Nu reacționează la magnet.'}
              </div>

              <div className="text-xs text-slate-600 space-y-2">
                <p>
                  <strong className="text-slate-800">Indiciu din poveste: </strong>
                  {selectedInfoObject.childHint}
                </p>
                <p>
                  <strong className="text-slate-800">Explicație științifică: </strong>
                  {selectedInfoObject.scienceExplanation}
                </p>
              </div>

              <button
                onClick={() => setSelectedInfoObject(null)}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold"
              >
                Am înțeles!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
