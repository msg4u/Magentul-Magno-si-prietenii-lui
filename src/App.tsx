/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TabType } from './types';
import { StoryMode } from './components/StoryMode';
import { LabMode } from './components/LabMode';
import { ExtensionLab } from './components/ExtensionLab';
import { EducatorGuide } from './components/EducatorGuide';
import { PrintableWorksheet } from './components/PrintableWorksheet';
import { MagnoCharacter } from './components/MagnoCharacter';
import { playPopSound } from './utils/audio';
import { 
  BookOpen, 
  Sparkles, 
  Layers, 
  GraduationCap
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('poveste');
  const [showPrintable, setShowPrintable] = useState(false);

  const handleTabChange = (tab: TabType) => {
    playPopSound();
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100/60 via-orange-50/40 to-sky-50/50 text-slate-800 flex flex-col relative overflow-x-hidden selection:bg-rose-200">
      {/* Playful Floating Cartoon Background Bubbles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
        <div className="absolute top-12 left-6 text-2xl animate-float" style={{ animationDelay: '0s' }}>⭐</div>
        <div className="absolute top-48 right-8 text-3xl animate-float" style={{ animationDelay: '1.2s' }}>🫧</div>
        <div className="absolute top-96 left-12 text-2xl animate-float" style={{ animationDelay: '2s' }}>💖</div>
        <div className="absolute bottom-32 right-16 text-3xl animate-float" style={{ animationDelay: '0.8s' }}>✨</div>
        <div className="absolute bottom-12 left-1/4 text-2xl animate-float" style={{ animationDelay: '1.5s' }}>⚡</div>
      </div>

      {/* Top Friendly Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-3 border-amber-300 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Brand & Magno Avatar */}
          <div 
            onClick={() => handleTabChange('poveste')}
            className="flex items-center gap-3 cursor-pointer select-none group"
            title="Apasă pe Magno să asculți ce zice!"
          >
            <div className="w-13 h-13 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center p-1 shadow-xs group-hover:scale-110 group-hover:rotate-6 transition-transform">
              <MagnoCharacter mood="happy" size="sm" isAttracting={true} isInteractive={false} />
            </div>
            <div>
              <h1 className="font-display font-extrabold text-lg sm:text-2xl text-slate-950 leading-tight flex items-center gap-1.5">
                <span>Magno Magnetul</span>
                <span className="text-rose-500 text-base sm:text-lg animate-wiggle inline-block">🧲</span>
              </h1>
              <p className="text-xs text-amber-900 font-display font-bold">
                și Prietenii lui de Fier! ✨
              </p>
            </div>
          </div>

          {/* Kid-Friendly Navigation Tabs with 3D button styling */}
          <nav className="flex items-center gap-1.5 sm:gap-2 bg-amber-200/70 p-1.5 rounded-2xl border-2 border-amber-300">
            <button
              id="tab-poveste"
              onClick={() => handleTabChange('poveste')}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-display font-extrabold transition-all transform active:translate-y-1 cursor-pointer ${
                activeTab === 'poveste'
                  ? 'bg-rose-500 text-white shadow-[0_3px_0_#9f1239]'
                  : 'text-amber-950 hover:bg-white/70'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>1. Povestea 📖</span>
            </button>

            <button
              id="tab-activitate"
              onClick={() => handleTabChange('activitate')}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-display font-extrabold transition-all transform active:translate-y-1 cursor-pointer ${
                activeTab === 'activitate'
                  ? 'bg-amber-500 text-white shadow-[0_3px_0_#b45309]'
                  : 'text-amber-950 hover:bg-white/70'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>2. Activitatea 🧲</span>
            </button>

            <button
              id="tab-extensie"
              onClick={() => handleTabChange('extensie')}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-display font-extrabold transition-all transform active:translate-y-1 cursor-pointer ${
                activeTab === 'extensie'
                  ? 'bg-cyan-600 text-white shadow-[0_3px_0_#0891b2]'
                  : 'text-amber-950 hover:bg-white/70'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span className="hidden sm:inline">3. Bariere 🔬</span>
              <span className="sm:hidden">3. Bariere</span>
            </button>

            <button
              id="tab-ghid"
              onClick={() => handleTabChange('ghid')}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-display font-extrabold transition-all transform active:translate-y-1 cursor-pointer ${
                activeTab === 'ghid'
                  ? 'bg-emerald-600 text-white shadow-[0_3px_0_#065f46]'
                  : 'text-amber-950 hover:bg-white/70'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Ghid Adulți 👨‍🏫</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 z-10">
        {activeTab === 'poveste' && (
          <StoryMode onStartActivity={() => handleTabChange('activitate')} />
        )}

        {activeTab === 'activitate' && (
          <LabMode onOpenWorksheet={() => setShowPrintable(true)} />
        )}

        {activeTab === 'extensie' && (
          <ExtensionLab />
        )}

        {activeTab === 'ghid' && (
          <EducatorGuide onOpenWorksheet={() => setShowPrintable(true)} />
        )}
      </main>

      {/* Printable Worksheet Modal */}
      {showPrintable && (
        <PrintableWorksheet onClose={() => setShowPrintable(false)} />
      )}

      {/* Playful Footer */}
      <footer className="mt-auto border-t-2 border-amber-200 bg-white/80 py-5 text-center text-xs text-slate-600 z-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="flex items-center gap-1.5 font-display font-bold text-slate-800 text-xs sm:text-sm">
            <span>🧲 Povestea educativă:</span>
            <strong className="text-rose-600">„Magno, magnetul care căuta prieteni de fier”</strong>
          </p>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                playPopSound();
                setShowPrintable(true);
              }}
              className="text-amber-900 font-display font-extrabold hover:text-rose-600 underline cursor-pointer"
            >
              🖨️ Descarcă fișa de lucru pentru acasă
            </button>
            <span className="text-amber-300">•</span>
            <span className="font-semibold text-slate-500">Pentru mici exploratori de 4–7 ani</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
