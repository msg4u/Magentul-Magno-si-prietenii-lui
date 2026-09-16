import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BARRIER_MATERIALS } from '../data/objectsData';
import { MagnoCharacter } from './MagnoCharacter';
import { ObjectIllustration } from './ObjectIllustration';
import { ListenButton } from './ListenButton';
import { playZacSound, playPopSound, preloadStoryVoices } from '../utils/audio';
import { Sparkles, MoveHorizontal, HelpCircle } from 'lucide-react';

export const ExtensionLab: React.FC = () => {
  const [selectedBarrierId, setSelectedBarrierId] = useState('hartie');
  const [sliderPosition, setSliderPosition] = useState(50); // 10 to 90%
  const [isHovering, setIsHovering] = useState(false);

  const barrier = BARRIER_MATERIALS.find(b => b.id === selectedBarrierId) || BARRIER_MATERIALS[0];

  const headerText = "Trece puterea lui Magno prin materiale? În poveste, Magno atrăgea obiectele prin aer. Dar ce se întâmplă dacă punem o barieră precum hârtia, apa, lemnul sau mânuța ta? Glisează magnetul pe dedesubt și privește cum dansează agrafa de fier de deasupra!";
  const lessonText = "Ce învățăm din acest experiment? Câmpul magnetic este invizibil și călătorește prin spațiu chiar dacă există materiale nemagnetice la mijloc, cum ar fi hârtia, plasticul, lemnul, sticla sau apa. Doar dacă bariera este foarte groasă sau făcută dintr-un strat gros de fier forța va fi deviată.";

  useEffect(() => {
    preloadStoryVoices([headerText, lessonText]);
  }, [headerText, lessonText]);

  const handleBarrierChange = (id: string) => {
    playPopSound();
    setSelectedBarrierId(id);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setSliderPosition(val);
    if (Math.abs(val - 50) === 20 || Math.abs(val - 25) === 0 || Math.abs(val - 75) === 0) {
      playZacSound();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-100 via-amber-50 to-cyan-100 border-3 border-cyan-300 rounded-3xl p-6 sm:p-8 shadow-[0_6px_0_#67e8f9]">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-display font-extrabold uppercase tracking-wider text-cyan-800 bg-white/90 px-3.5 py-1 rounded-full border border-cyan-300 shadow-2xs">
            🧪 Extensie Științifică Distractivă
          </span>
          <span className="text-xs font-bold text-cyan-900">
            Forța Invizibilă a Magnetismului ✨
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">
            Trece puterea lui Magno prin materiale? 🪄
          </h2>
          <ListenButton
            id="listen-extension-intro"
            text={headerText}
            size="sm"
            variant="pill"
            label="Ascultă introducerea 🗣️"
          />
        </div>
        <p className="text-slate-700 text-sm sm:text-base mt-2 font-medium">
          În poveste, Magno atrăgea obiectele prin aer. Dar ce se întâmplă dacă punem o barieră (hârtie, apă, lemn sau chiar mânuța ta) între Magno și agrafă?
          <br />
          <strong>Glisează magnetul pe dedesubt și privește cum dansează agrafa de sus!</strong>
        </p>

        {/* Barrier Selector Tabs */}
        <div className="mt-5 flex flex-wrap gap-2.5">
          {BARRIER_MATERIALS.map((b) => (
            <button
              key={b.id}
              onClick={() => handleBarrierChange(b.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-display font-extrabold transition-all transform active:translate-y-1 cursor-pointer flex items-center gap-2 ${
                selectedBarrierId === b.id
                  ? 'bg-cyan-600 text-white shadow-[0_4px_0_#0891b2] scale-105'
                  : 'bg-white hover:bg-cyan-50 text-cyan-950 border-2 border-cyan-200 shadow-[0_4px_0_#a5f3fc]'
              }`}
            >
              <span>{b.name}</span>
              <span className="text-[10px] opacity-80 font-bold">({b.thickness})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Physics Stage */}
      <div className="bg-white border-3 border-amber-200 rounded-3xl p-6 sm:p-8 shadow-[0_8px_0_#fde68a] space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-base sm:text-lg font-bold font-display text-slate-800">
              Laboratorul de Testare: <strong className="text-cyan-700">{barrier.name}</strong>
            </span>
          </div>
          <span className="text-xs font-display font-bold text-emerald-800 bg-emerald-100 px-3.5 py-1.5 rounded-full border-2 border-emerald-300 flex items-center gap-1.5 shadow-xs">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            Forța magnetică trece prin barieră! ✨
          </span>
        </div>

        {/* Visual Sandwich: Top Object -> Barrier -> Bottom Magno */}
        <div className="relative bg-gradient-to-b from-sky-50 via-amber-50/40 to-slate-50 rounded-3xl p-6 sm:p-8 border-3 border-cyan-200 min-h-[350px] flex flex-col justify-between overflow-hidden shadow-inner">
          {/* Top Level: The paperclip moving on top */}
          <div className="h-24 relative flex items-center border-b-2 border-dashed border-cyan-200">
            <span className="absolute left-2 top-0 text-[11px] font-display font-extrabold text-cyan-700 uppercase tracking-wider bg-white/80 px-2 py-0.5 rounded-full border border-cyan-200">
              Deasupra: Agrafa de oțel dansează! 📎💃
            </span>

            {/* Follower: Paperclip */}
            <motion.div
              style={{ left: `${sliderPosition}%` }}
              className="absolute -translate-x-1/2 flex flex-col items-center pointer-events-none"
              animate={{
                y: isHovering ? [0, -6, 0] : [0, -3, 0],
                rotate: [0, -6, 6, 0]
              }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            >
              <div className="p-2.5 bg-white rounded-2xl shadow-md border-2 border-cyan-300">
                <ObjectIllustration id="agrafa" size={50} />
              </div>
              <span className="text-[10px] font-display font-extrabold text-cyan-900 bg-cyan-100 px-2.5 py-0.5 rounded-full mt-1 border border-cyan-200 shadow-2xs">
                Agrafa de birou
              </span>
            </motion.div>
          </div>

          {/* Middle Barrier Layer */}
          <div className="py-6 my-2 relative">
            <div className={`w-full py-5 px-6 rounded-3xl border-3 flex items-center justify-between shadow-xs ${barrier.color}`}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {selectedBarrierId === 'hartie' ? '📄' : selectedBarrierId === 'carton' ? '📦' : selectedBarrierId === 'apa' ? '💧' : selectedBarrierId === 'lemn' ? '🪵' : '✋'}
                </span>
                <div>
                  <span className="font-display font-extrabold text-sm sm:text-base block">
                    Barieră: {barrier.name}
                  </span>
                  <span className="text-xs opacity-85 font-medium">
                    (Grosime: {barrier.thickness})
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-display font-bold text-emerald-800 bg-white/80 px-3 py-1 rounded-full border border-emerald-300">
                <span>Magia trece nestingherită!</span>
                <span>✔</span>
              </div>
            </div>

            {/* Magnetic field line rays going through barrier */}
            <motion.div
              style={{ left: `${sliderPosition}%` }}
              className="absolute top-0 bottom-0 w-10 -translate-x-1/2 flex justify-center items-center pointer-events-none"
            >
              <div className="w-1.5 h-full bg-cyan-400 rounded-full animate-pulse blur-[1px]" />
            </motion.div>
          </div>

          {/* Bottom Level: Magno being moved by the slider */}
          <div className="h-28 relative flex items-center border-t-2 border-dashed border-cyan-200">
            <span className="absolute left-2 bottom-1 text-[11px] font-display font-extrabold text-slate-500 uppercase tracking-wider bg-white/80 px-2 py-0.5 rounded-full border border-slate-200">
              Dedesubt: Magno se plimbă cu glisorul! 👇
            </span>

            {/* Slider controlled Magno */}
            <div
              style={{ left: `${sliderPosition}%` }}
              className="absolute -translate-x-1/2 flex flex-col items-center pointer-events-none"
            >
              <MagnoCharacter
                mood="excited"
                isAttracting={true}
                size="md"
                showSparkles={true}
              />
              <span className="text-[10px] font-display font-bold text-rose-700 bg-white px-2 py-0.5 rounded-full shadow-2xs border border-rose-200 mt-1">
                Magno
              </span>
            </div>
          </div>
        </div>

        {/* Big Kid-friendly Range Slider */}
        <div className="p-5 bg-gradient-to-r from-amber-100 via-sky-100 to-amber-100 rounded-3xl border-3 border-amber-300 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs sm:text-sm font-display font-extrabold text-slate-800">
            <span className="flex items-center gap-1.5">
              <MoveHorizontal className="w-4 h-4 text-cyan-600" />
              <span>Glisează stânga-dreapta ca să-l plimbi pe Magno:</span>
            </span>
            <span className="text-cyan-700 bg-white px-2 py-0.5 rounded-xl border border-cyan-200">
              Poziție: {sliderPosition}%
            </span>
          </div>

          <input
            type="range"
            min="15"
            max="85"
            value={sliderPosition}
            onChange={handleSliderChange}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="w-full h-5 bg-white rounded-full appearance-none cursor-pointer accent-rose-500 border-2 border-amber-300 shadow-inner"
          />

          <div className="flex justify-between text-[11px] font-display font-bold text-slate-500 px-2">
            <span>⬅️ La stânga</span>
            <span>Centru 🎯</span>
            <span>La dreapta ➡️</span>
          </div>
        </div>

        {/* Scientific Explanation in Child-Friendly Language */}
        <div className="p-4 bg-sky-50 border-2 border-sky-300 rounded-3xl flex items-start justify-between gap-3.5 shadow-xs">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-sky-500 text-white flex items-center justify-center flex-shrink-0 text-xl font-bold shadow-xs">
              💡
            </div>
            <div>
              <h4 className="font-display font-bold text-base text-sky-950">
                Ce învățăm din acest experiment?
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 mt-1 font-medium leading-relaxed">
                Câmpul magnetic este invizibil și călătorește prin spațiu chiar dacă există materiale nemagnetice la mijloc (hârtie, plastic, lemn, sticlă sau apă). Doar dacă bariera este foarte groasă sau făcută dintr-un strat gros de fier forța va fi deviată.
              </p>
            </div>
          </div>
          <ListenButton
            id="listen-extension-lesson"
            text={lessonText}
            size="sm"
            variant="icon"
            tooltip="Ascultă concluzia experimentului"
          />
        </div>
      </div>
    </div>
  );
};
