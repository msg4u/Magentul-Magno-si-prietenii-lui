export interface StoryScene {
  id: number;
  title: string;
  paragraph1: string;
  paragraph2?: string;
  quote?: string;
  magnoMood: 'curious' | 'happy' | 'puzzled' | 'thoughtful' | 'triumphant';
  interactiveObject?: {
    name: string;
    type: string;
    isMagnetic: boolean;
    soundEffect: 'zac' | 'dull';
    reactionText: string;
  };
  keyTakeaway: string;
}

export const STORY_SCENES: StoryScene[] = [
  {
    id: 1,
    title: 'Sertarul Fermecat și Puterea Magică',
    paragraph1: 'Într-un sertar plin cu tot felul de lucrușoare, trăia un mic magnet pe nume Magno. Magno avea o putere specială: putea să tragă spre el anumite obiecte, doar apropiindu-se de ele, fără să le atingă măcar!',
    paragraph2: 'Dar Magno avea o mare frustrare: nu știa dinainte care obiecte din sertar erau „prietenii lui de fier” (cele pe care le putea trage spre el) și care nu aveau nimic de-a face cu puterea lui magică.',
    quote: '„Oare cum aș putea afla cine mă ascultă și cine nu?” se întreba Magno în fiecare zi.',
    magnoMood: 'curious',
    keyTakeaway: 'Forța magnetică acționează de la distanță, fără atingere directă!'
  },
  {
    id: 2,
    title: 'Primul Prieten: Lingura de Metal!',
    paragraph1: '— „Hai să încercăm!” și-a zis Magno, plin de curaj, și s-a apropiat de o lingură de metal care stătea liniștită în sertar.',
    paragraph2: 'ZAC! Lingura a sărit spre Magno ca un magnet — glumă bună, chiar ERA un magnet! — și s-a lipit de el imediat!',
    quote: '— „Ha! Te-am găsit, prietene!” a exclamat Magno, nespus de fericit.',
    magnoMood: 'happy',
    interactiveObject: {
      name: 'Lingura de Metal',
      type: 'Oțel / Inox',
      isMagnetic: true,
      soundEffect: 'zac',
      reactionText: 'ZAC! Lingura a sărit direct în brațele lui Magno!'
    },
    keyTakeaway: 'Obiectele fabricate din oțel conțin fier și sunt atrase instantaneu!'
  },
  {
    id: 3,
    title: 'Marea Surpriză: Moneda Nemiscata!',
    paragraph1: 'Apoi Magno s-a apropiat de o monedă strălucitoare. Magno era sigur că, fiind din metal, moneda va sări și ea spre el.',
    paragraph2: 'Dar... nimic! Moneda a rămas complet nemișcată.',
    quote: '— „Ciudat!” s-a mirat Magno. „Credeam că toate lucrurile de metal sunt prietenii mei, dar se pare că nu-i așa!”',
    magnoMood: 'puzzled',
    interactiveObject: {
      name: 'Moneda Strălucitoare',
      type: 'Cupru / Alamă / Aluminiu',
      isMagnetic: false,
      soundEffect: 'dull',
      reactionText: 'Nimic! Moneda a rămas pe loc, netulburată de puterea lui Magno.'
    },
    keyTakeaway: 'Atenție: NU toate metalele sunt magnetice! Monedele sunt adesea din alamă sau cupru.'
  },
  {
    id: 4,
    title: 'Nasturele, Piatra și... Cuiul de Fier!',
    paragraph1: 'A încercat apoi cu un nasture de plastic — nimic. Cu o piatră mică — nimic.',
    paragraph2: 'Apoi Magno s-a îndreptat spre un cui de fier... ZAC! Cuiul a sărit imediat spre el, lipindu-se strâns!',
    quote: '— „ZAC! Te simt, cuiule voinic! Ești un adevărat prieten de fier!”',
    magnoMood: 'happy',
    interactiveObject: {
      name: 'Cuiul de Fier',
      type: 'Fier curat',
      isMagnetic: true,
      soundEffect: 'zac',
      reactionText: 'ZAC! Cuiul a zburat cu viteză și s-a lipit strâns de Magno!'
    },
    keyTakeaway: 'Plasticul și piatra nu reacționează deloc, dar fierul pur se lipește imediat.'
  },
  {
    id: 5,
    title: 'Descoperirea și Casa Prietenilor Magnetici',
    paragraph1: '— „Aha, acum înțeleg!” a spus Magno, gânditor. „Nu toate metalele sunt prietenii mei — doar unele! Fierul și oțelul mă ascultă imediat, dar arama, aurul sau aluminiul nu simt deloc puterea mea!”',
    paragraph2: 'De atunci, Magno a decis să facă o listă întreagă cu toți prietenii lui adevărați de fier, punându-i pe toți într-o parte specială a sertarului, doar pentru ei — casa prietenilor magnetici!',
    quote: '— „Hai și tu, mic cercetător, ajută-mă să sortăm toate obiectele!”',
    magnoMood: 'triumphant',
    keyTakeaway: 'Regula secretă: Doar fierul, oțelul și nichelul sunt prietenii magnetici ai lui Magno!'
  }
];
