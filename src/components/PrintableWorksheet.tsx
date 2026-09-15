import React from 'react';
import { TEST_OBJECTS } from '../data/objectsData';
import { Printer, X } from 'lucide-react';

interface PrintableWorksheetProps {
  onClose: () => void;
}

export const PrintableWorksheet: React.FC<PrintableWorksheetProps> = ({ onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white print:static">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative print:shadow-none print:border-none print:p-2">
        {/* Screen Controls (Hidden on print) */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xl">🧲</span>
            <span className="font-display font-bold text-slate-900 text-lg">
              Fișă de Predicție & Experiment (Printabilă)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Tipărește (Print)</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 text-slate-500 rounded-xl cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Content */}
        <div className="space-y-6 text-slate-800">
          {/* Header */}
          <div className="border-b-2 border-slate-800 pb-4 flex items-start justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-slate-950">
                Fișă Științifică: „Prietenii de Fier ai lui Magno”
              </h1>
              <p className="text-xs text-slate-600 mt-1">
                Activitate practică de explorare a forței magnetice (copii 3–8 ani)
              </p>
            </div>
            <div className="text-right text-xs space-y-1 font-medium">
              <div>Nume cercetător: ___________________</div>
              <div>Data: ______________</div>
            </div>
          </div>

          {/* Instructions */}
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 leading-relaxed print:bg-slate-50 print:border-slate-300">
            <strong>Instrucțiuni pentru copil: </strong>
            1. Înainte să atingi obiectul cu magnetul, bifează în coloana <strong>„Predicție”</strong> dacă tu crezi că va fi atras de Magno sau nu.
            2. Apropie magnetul de obiect și ascultă dacă face <strong>ZAC!</strong>
            3. Notează în coloana <strong>„Ce s-a întâmplat”</strong> dacă este un adevărat prieten de fier!
          </div>

          {/* Prediction & Results Table */}
          <div className="border border-slate-300 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-300 text-slate-800 font-bold">
                  <th className="p-2.5 border-r border-slate-200">#</th>
                  <th className="p-2.5 border-r border-slate-200">Obiect de testat</th>
                  <th className="p-2.5 border-r border-slate-200">Din ce material e făcut?</th>
                  <th className="p-2.5 border-r border-slate-200 text-center">
                    Predicția Mea
                    <span className="block text-[10px] font-normal text-slate-500">(Bifează înainte!)</span>
                  </th>
                  <th className="p-2.5 text-center">
                    Ce s-a întâmplat?
                    <span className="block text-[10px] font-normal text-slate-500">(Rezultat real)</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {TEST_OBJECTS.slice(0, 10).map((obj, i) => (
                  <tr key={obj.id} className="hover:bg-slate-50">
                    <td className="p-2 border-r border-slate-200 font-bold text-slate-500">{i + 1}</td>
                    <td className="p-2 border-r border-slate-200 font-semibold text-slate-900">
                      {obj.name}
                    </td>
                    <td className="p-2 border-r border-slate-200 text-slate-600">
                      {obj.material}
                    </td>
                    <td className="p-2 border-r border-slate-200 text-center">
                      <div className="inline-flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <span className="w-4 h-4 border-2 border-slate-400 rounded-sm inline-block"></span>
                          <span>🧲 Sare</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-4 h-4 border-2 border-slate-400 rounded-sm inline-block"></span>
                          <span>❌ Nu sare</span>
                        </span>
                      </div>
                    </td>
                    <td className="p-2 text-center">
                      <div className="inline-flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <span className="w-4 h-4 border-2 border-slate-400 rounded-sm inline-block"></span>
                          <span>🧲 Prieten!</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-4 h-4 border-2 border-slate-400 rounded-sm inline-block"></span>
                          <span>❌ Nu e</span>
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Reflection Section */}
          <div className="border border-slate-200 rounded-xl p-3 text-xs space-y-2">
            <div className="font-bold text-slate-900">
              Concluzia micului cercetător:
            </div>
            <div>
              Ce obiect te-a surprins cel mai mult când l-ai testat? (A fost moneda, ca în poveste?)
            </div>
            <div className="border-b border-dotted border-slate-400 pt-3"></div>
            <div>
              Care este regula secretă a lui Magno? Din ce sunt făcuți prietenii lui?
            </div>
            <div className="border-b border-dotted border-slate-400 pt-3"></div>
          </div>

          {/* Footer note */}
          <div className="text-[10px] text-slate-500 text-center pt-2">
            Inspirat de povestea educativă „Magno, magnetul care căuta prieteni de fier”.
          </div>
        </div>
      </div>
    </div>
  );
};
