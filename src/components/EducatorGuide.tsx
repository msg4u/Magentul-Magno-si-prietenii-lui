import React from 'react';
import { 
  HelpCircle, 
  ShieldAlert, 
  Lightbulb, 
  Layers, 
  CheckCircle2, 
  Sparkles,
  Printer
} from 'lucide-react';

interface EducatorGuideProps {
  onOpenWorksheet: () => void;
}

export const EducatorGuide: React.FC<EducatorGuideProps> = ({ onOpenWorksheet }) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white border-2 border-amber-200/90 rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
            Ghid Pedagogic
          </span>
          <span className="text-xs font-semibold text-slate-500">
            Pentru Părinți, Educatori și Învățători
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
          Cum transformi povestea lui Magno într-un experiment real acasă sau la grădiniță
        </h2>
        <p className="text-slate-600 text-sm mt-2">
          Această activitate îmbină lectura cu metoda științifică autentică: formularea ipotezei (predicția), experimentul fizic, observarea și clasificarea rezultatelor.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            onClick={onOpenWorksheet}
            className="flex items-center gap-2 px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Deschide & Tipărește Fișa de Lucru (Worksheet)</span>
          </button>
        </div>
      </div>

      {/* Safety Alert (Sfat practic din cerință) */}
      <div className="bg-rose-50 border-2 border-rose-300 rounded-3xl p-5 sm:p-6 shadow-xs flex items-start gap-4">
        <div className="p-2.5 bg-rose-100 rounded-2xl text-rose-700 flex-shrink-0">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h4 className="font-bold font-display text-rose-950 text-base">
            Sfat Practic & Siguranță cu Magneții
          </h4>
          <p className="text-xs sm:text-sm text-rose-900 leading-relaxed">
            <strong>Evitați magneții foarte mici sau extrem de puternici de tip neodim</strong> la copiii sub 6 ani fără supraveghere strictă — pot fi periculoși dacă sunt înghițiți.
            Un <strong>magnet mare de frigider</strong>, un magnet școlar tip bară sau o potcoavă din plastic cu poli protejați este perfect și complet sigur pentru această activitate!
          </p>
        </div>
      </div>

      {/* Concept Connection (Legătura poveste-concept) */}
      <div className="bg-white border-2 border-amber-200/90 rounded-3xl p-6 sm:p-8 shadow-md space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-amber-100 rounded-xl text-amber-800">
            <Lightbulb className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold font-display text-slate-900">
            Legătura Poveste – Concept Științific
          </h3>
        </div>

        <p className="text-slate-700 text-sm leading-relaxed">
          Povestea introduce, prin „dezamăgirea” repetată a lui Magno, ideea esențială (și adesea contra-intuitivă pentru copii) că <strong>nu toate metalele sunt magnetice</strong> — doar fierul, oțelul și nichelul.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
            <h5 className="font-bold text-xs uppercase tracking-wider text-emerald-900 mb-2 flex items-center gap-1.5">
              <span>🧲 Metale Feromagnetice (Prietenii lui Magno)</span>
            </h5>
            <ul className="text-xs text-slate-700 space-y-1.5">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span><strong>Fier (Fe)</strong>: cui, balamale, sârmă veche</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span><strong>Oțel</strong> (aliaj fier-carbon): agrafe de birou, linguri inox, șuruburi</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span><strong>Nichel și Cobalt</strong>: magneți industriali și acumulatori</span>
              </li>
            </ul>
          </div>

          <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-2xl">
            <h5 className="font-bold text-xs uppercase tracking-wider text-amber-900 mb-2 flex items-center gap-1.5">
              <span>❌ Metale Ne-magnetice (Surpriza lui Magno!)</span>
            </h5>
            <ul className="text-xs text-slate-700 space-y-1.5">
              <li className="flex items-center gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span><strong>Alamă și Cupru</strong>: majoritatea monedelor, țevi galbene</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span><strong>Aluminiu</strong>: folia alimentară argintie, cutiile de suc</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span><strong>Aur și Argint</strong>: inele, cercei, tacâmuri prețioase</span>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-xs text-slate-500 italic mt-2">
          Structura narativă de „încercare - eșec - învățare” reflectă exact procesul de testare și clasificare pe care copilul îl repetă cu obiectele reale din casă.
        </p>
      </div>

      {/* Guided Discussion Questions (Cum ghidezi activitatea) */}
      <div className="bg-white border-2 border-amber-200/90 rounded-3xl p-6 sm:p-8 shadow-md space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-rose-100 rounded-xl text-rose-800">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold font-display text-slate-900">
            Întrebări Ghidate pentru Convorbirea cu Copilul
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-rose-600">Întrebarea 1:</span>
            <p className="text-sm font-semibold text-slate-900">
              „Crezi că lingura va fi prietena lui Magno, ca în poveste? De ce?”
            </p>
            <p className="text-xs text-slate-500">
              Ghidează copilul să observe că este din metal și că se simte grea și rece la atingere.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-rose-600">Întrebarea 2:</span>
            <p className="text-sm font-semibold text-slate-900">
              „De ce crezi că moneda l-a dezamăgit pe Magno, deși e din metal strălucitor?”
            </p>
            <p className="text-xs text-slate-500">
              Fixează ideea că luciul sau aspectul metalic nu garantează prezența fierului.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-rose-600">Întrebarea 3:</span>
            <p className="text-sm font-semibold text-slate-900">
              „Ce au în comun toți «prietenii de fier» ai lui Magno?”
            </p>
            <p className="text-xs text-slate-500">
              Ajută copilul să observe că toți conțin oțel sau fier, chiar dacă au forme foarte diferite (agrafă, cui, lingură).
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-rose-600">Întrebarea 4:</span>
            <p className="text-sm font-semibold text-slate-900">
              „Ce alte obiecte din camera ta crezi că ar vrea să fie prietene cu Magno?”
            </p>
            <p className="text-xs text-slate-500">
              Încurajează căutarea liberă: piciorul scaunului, caloriferul, o cutie de biscuiți din tablă etc.
            </p>
          </div>
        </div>
      </div>

      {/* 6 Steps Implementation Checklist */}
      <div className="bg-white border-2 border-amber-200/90 rounded-3xl p-6 sm:p-8 shadow-md space-y-4">
        <h3 className="text-xl font-bold font-display text-slate-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-600" />
          <span>Cei 6 Pași de Desfășurare Practică</span>
        </h3>

        <div className="space-y-3 text-xs sm:text-sm text-slate-700">
          <div className="flex items-start gap-3 p-3 bg-amber-50/50 rounded-xl border border-amber-200/60">
            <span className="w-6 h-6 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center flex-shrink-0 text-xs">1</span>
            <div>
              <strong>Pregătirea cutiei de sortare: </strong>
              Împărțiți o cutie de pantofi în 2 compartimente: „PRIETENI DE FIER” (desenați un magnet) și „NU SUNT PRIETENI” (desenați un X).
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-amber-50/50 rounded-xl border border-amber-200/60">
            <span className="w-6 h-6 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center flex-shrink-0 text-xs">2</span>
            <div>
              <strong>Adunarea obiectelor: </strong>
              Strângeți 10–15 obiecte: lingură, dop de plută, nasture, cui, agrafă, bilă de sticlă, creion, monedă.
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-amber-50/50 rounded-xl border border-amber-200/60">
            <span className="w-6 h-6 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center flex-shrink-0 text-xs">3</span>
            <div>
              <strong>Creează fișa de predicție: </strong>
              Folosește fișa tipăribilă sau desenează pe o coală căsuțele de bifat înainte de test.
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-amber-50/50 rounded-xl border border-amber-200/60">
            <span className="w-6 h-6 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center flex-shrink-0 text-xs">4</span>
            <div>
              <strong>Predicția anticipată: </strong>
              Copilul bifează înainte de atingerea magnetului — exact cum Magno credea că moneda va sări!
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-amber-50/50 rounded-xl border border-amber-200/60">
            <span className="w-6 h-6 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center flex-shrink-0 text-xs">5</span>
            <div>
              <strong>Testarea fizică: </strong>
              Apropiați magnetul încet de obiect. Ascultați dacă face „ZAC!” și puneți-l în compartimentul corespunzător.
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-amber-50/50 rounded-xl border border-amber-200/60">
            <span className="w-6 h-6 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center flex-shrink-0 text-xs">6</span>
            <div>
              <strong>Comparația și concluzia: </strong>
              Verificați surprizele și discutați de ce doar obiectele de fier și oțel au devenit prieteni!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
