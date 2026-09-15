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
import { 
  BookOpen, 
  Sparkles, 
  Layers, 
  HelpCircle, 
  GraduationCap
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('poveste');
  const [showPrintable, setShowPrintable] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 via-orange-50/20 to-amber-100/30 text-slate-800 flex flex-col">
      {/* Top Friendly Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-amber-200/80 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Brand & Magno Avatar */}
          <div 
            onClick={() => setActiveTab('poveste')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-100/80 border border-amber-300/80 flex items-center justify-center p-1 shadow-2xs group-hover:scale-105 transition-transform">
              <MagnoCharacter mood="happy" size="sm" isAttracting={true} />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg sm:text-xl text-slate-900 leading-tight flex items-center gap-1.5">
                <span>Magno Magnetul</span>
                <span className="text-rose-500 font-extrabold text-sm">🧲</span>
              </h1>
              <p className="text-xs text-amber-800/80 font-semibold">
                și Prietenii de Fier
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1.5 bg-amber-100/60 p-1.5 rounded-2xl border border-amber-200/80">
            <button
              id="tab-poveste"
              onClick={() => setActiveTab('poveste')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-display font-bold transition-all ${
                activeTab === 'poveste'
                  ? 'bg-white text-rose-600 shadow-xs ring-1 ring-amber-200'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <BookOpen className="w-4 h-4 text-rose-500" />
              <span>1. Povestea</span>
            </button>

            <button
              id="tab-activitate"
              onClick={() => setActiveTab('activitate')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-display font-bold transition-all ${
                activeTab === 'activitate'
                  ? 'bg-white text-rose-600 shadow-xs ring-1 ring-amber-200'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>2. Activitatea</span>
            </button>

            <button
              id="tab-extensie"
              onClick={() => setActiveTab('extensie')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-display font-bold transition-all ${
                activeTab === 'extensie'
                  ? 'bg-white text-rose-600 shadow-xs ring-1 ring-amber-200'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Layers className="w-4 h-4 text-cyan-500" />
              <span className="hidden sm:inline">3. Extensie (Bariere)</span>
              <span className="sm:hidden">3. Extensie</span>
            </button>

            <button
              id="tab-ghid"
              onClick={() => setActiveTab('ghid')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-display font-bold transition-all ${
                activeTab === 'ghid'
                  ? 'bg-white text-rose-600 shadow-xs ring-1 ring-amber-200'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-emerald-600" />
              <span>Ghid Adulți</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'poveste' && (
          <StoryMode onStartActivity={() => setActiveTab('activitate')} />
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

      {/* Footer */}
      <footer className="mt-auto border-t border-amber-200/60 bg-white/60 py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="flex items-center gap-1.5 font-medium">
            <span>🧲 Bazat pe povestea educativă:</span>
            <strong className="text-slate-700 font-display">„Magno, magnetul care căuta prieteni de fier”</strong>
          </p>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowPrintable(true)}
              className="text-amber-800 font-bold hover:underline cursor-pointer"
            >
              Fișă de lucru tipăribilă
            </button>
            <span className="text-slate-300">•</span>
            <span>Explorare științifică distractivă și sigură</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
