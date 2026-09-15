import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BARRIER_MATERIALS } from '../data/objectsData';
import { MagnoCharacter } from './MagnoCharacter';
import { ObjectIllustration } from './ObjectIllustration';
import { playZacSound, playPopSound } from '../utils/audio';
import { Sparkles, MoveHorizontal, HelpCircle } from 'lucide-react';

export const ExtensionLab: React.FC = () => {
  const [selectedBarrierId, setSelectedBarrierId] = useState('hartie');
  const [sliderPosition, setSliderPosition] = useState(50); // 10 to 90%
  const [isHovering, setIsHovering] = useState(false);

  const barrier = BARRIER_MATERIALS.find(b => b.id === selectedBarrierId) || BARRIER_MATERIALS[0];

  const handleBarrierChange = (id: string) => {
    playPopSound();
    setSelectedBarrierId(id);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setSliderPosition(val);
    if (Math.abs(val - 50) === 20) {
      playZacSound();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white border-2 border-amber-200/90 rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
            Extensie Științifică
          </span>
          <span className="text-xs font-semibold text-slate-500">
            Forța Invizibilă a Magnetismului
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
          Trece puterea lui Magno prin diverse materiale?
        </h2>
        <p className="text-slate-600 text-sm mt-1">
          În poveste, Magno atrăgea obiectele prin aer. Dar ce se întâmplă dacă punem o barieră între Magno și agrafă?
          Încearcă să miști magnetul pe dedesubt!
        </p>

        {/* Barrier Selector Tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {BARRIER_MATERIALS.map((b) => (
            <button
              key={b.id}
              onClick={() => handleBarrierChange(b.id)}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                selectedBarrierId === b.id
                  ? 'bg-cyan-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
              }`}
            >
              <span>{b.name}</span>
              <span className="text-[10px] opacity-75 font-normal">({b.thickness})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Physics Stage */}
      <div className="bg-white border-2 border-amber-200/90 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold font-display text-slate-800">
              Laboratorul de Testare: {barrier.name}
            </span>
          </div>
          <span className="text-xs font-bold text-cyan-800 bg-cyan-50 px-2.5 py-1 rounded-full border border-cyan-200 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            Forța magnetică acționează prin barieră!
          </span>
        </div>

        {/* Visual Sandwich: Top Object -> Barrier -> Bottom Magno */}
        <div className="relative bg-gradient-to-b from-sky-50/70 via-slate-50 to-amber-50/50 rounded-3xl p-6 sm:p-10 border-2 border-slate-200 min-h-[340px] flex flex-col justify-between overflow-hidden">
          {/* Top Level: The paperclip moving on top */}
          <div className="h-20 relative flex items-center border-b border-dashed border-slate-300">
            <span className="absolute left-2 top-0 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Suprafața de Sus (Agrafa de Oțel)
            </span>

            {/* Follower: Paperclip */}
            <motion.div
              style={{ left: `${sliderPosition}%` }}
              className="absolute -translate-x-1/2 flex flex-col items-center pointer-events-none"
              animate={{
                y: isHovering ? [0, -4, 0] : 0
              }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            >
              <div className="p-2 bg-white rounded-xl shadow-md border border-cyan-200">
                <ObjectIllustration id="agrafa" size={44} />
              </div>
              <span className="text-[10px] font-bold text-cyan-900 bg-cyan-100/90 px-2 py-0.5 rounded-full mt-1">
                Agrafa de birou
              </span>
            </motion.div>
          </div>

          {/* Middle Barrier Layer */}
          <div className="py-5 my-2 relative">
            <div className={`w-full py-4 px-6 rounded-2xl border-2 flex items-center justify-between shadow-2xs ${barrier.color}`}>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs sm:text-sm">
                  Barieră: {barrier.name}
                </span>
                <span className="text-[11px] opacity-80">
                  (Grosime: {barrier.thickness})
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold">
                <span>Câmpul trece nestingherit</span>
                <span className="text-emerald-700 font-bold">✔</span>
              </div>
            </div>

            {/* Magnetic field line rays going through barrier */}
            <motion.div
              style={{ left: `${sliderPosition}%` }}
              className="absolute top-0 bottom-0 w-8 -translate-x-1/2 flex justify-center items-center pointer-events-none"
            >
              <div className="w-1 h-full bg-cyan-400/80 rounded-full animate-pulse blur-[1px]" />
            </motion.div>
          </div>

          {/* Bottom Level: Magno being moved by the slider */}
          <div className="h-28 relative flex items-center border-t border-dashed border-slate-300">
            <span className="absolute left-2 bottom-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Dedesubt: Mișcă-l pe Magno!
            </span>

            {/* Slider controlled Magno */}
            <motion.div
              style={{ left: `${sliderPosition}%` }}
              className="absolute -translate-x-1/2 flex flex-col items-center"
            >
              <MagnoCharacter
                mood="happy"
                isAttracting={true}
                size="md"
                showSparkles={true}
              />
              <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200 mt-1">
                Magno sub {barrier.name}
              </span>
            </motion.div>
          </div>
        </div>

        {/* Interactive Slider Control */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5">
              <MoveHorizontal className="w-4 h-4 text-slate-500" />
              Glisează aici pentru a-l mișca pe Magno la stânga și la dreapta:
            </span>
            <span className="text-cyan-700">{sliderPosition}%</span>
          </div>

          <input
            type="range"
            min="15"
            max="85"
            value={sliderPosition}
            onChange={handleSliderChange}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
          />

          <div className="flex justify-between text-[11px] text-slate-400">
            <span>Stânga</span>
            <span className="font-semibold text-slate-600">Observă cum agrafa îl urmărește fidel prin barieră!</span>
            <span>Dreapta</span>
          </div>
        </div>

        {/* Scientific Explanation Box */}
        <div className="bg-cyan-50/80 border border-cyan-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-cyan-700 flex-shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm text-cyan-950">
            <strong className="font-bold block text-cyan-900">
              Cum funcționează forța invizibilă?
            </strong>
            <p className="leading-relaxed">
              {barrier.explanation}
            </p>
            <p className="text-slate-600 text-xs mt-1">
              Forța magnetică nu are nevoie de aer ca să se propage! Ea călătorește prin spațiu, hârtie, apă, sticlă sau lemn, afectând doar atomii de fier din agrafă.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
