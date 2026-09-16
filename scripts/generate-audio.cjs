const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

function getHash(text) {
  return crypto.createHash('md5').update(text.trim().replace(/\s+/g, ' ')).digest('hex').slice(0, 16);
}

function fetchTtsChunk(text) {
  return new Promise((resolve, reject) => {
    const url = 'https://translate.google.com/translate_tts?ie=UTF-8&q=' + encodeURIComponent(text) + '&tl=ro&client=tw-ob';
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
      if (res.statusCode !== 200) return reject(new Error('Status: ' + res.statusCode));
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function synthesizeRomanian(text) {
  const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
  const buffers = [];
  for (const s of sentences) {
    const trimmed = s.trim();
    if (!trimmed) continue;
    if (trimmed.length <= 140) {
      buffers.push(await fetchTtsChunk(trimmed));
      await new Promise(r => setTimeout(r, 60)); // polite delay
    } else {
      const words = trimmed.split(' ');
      let current = '';
      for (const w of words) {
        if ((current + ' ' + w).length > 140) {
          buffers.push(await fetchTtsChunk(current.trim()));
          await new Promise(r => setTimeout(r, 60));
          current = w;
        } else {
          current += ' ' + w;
        }
      }
      if (current.trim()) {
        buffers.push(await fetchTtsChunk(current.trim()));
        await new Promise(r => setTimeout(r, 60));
      }
    }
  }
  return Buffer.concat(buffers);
}

// All texts used in the application
const textsToSynthesize = [
  // Scene 1
  "Sertarul Fermecat și Puterea Magică. Într-un sertar plin cu tot felul de lucrușoare, trăia un mic magnet pe nume Magno. Magno avea o putere specială: putea să tragă spre el anumite obiecte, doar apropiindu-se de ele, fără să le atingă măcar! Dar Magno avea o mare frustrare: nu știa dinainte care obiecte din sertar erau „prietenii lui de fier” (cele pe care le putea trage spre el) și care nu aveau nimic de-a face cu puterea lui magică. „Oare cum aș putea afla cine mă ascultă și cine nu?” se întreba Magno în fiecare zi.",
  "Într-un sertar plin cu tot felul de lucrușoare, trăia un mic magnet pe nume Magno. Magno avea o putere specială: putea să tragă spre el anumite obiecte, doar apropiindu-se de ele, fără să le atingă măcar! Dar Magno avea o mare frustrare: nu știa dinainte care obiecte din sertar erau „prietenii lui de fier” (cele pe care le putea trage spre el) și care nu aveau nimic de-a face cu puterea lui magică.",
  "„Oare cum aș putea afla cine mă ascultă și cine nu?” se întreba Magno în fiecare zi.",
  "Secretul științific al lui Magno: Forța magnetică acționează de la distanță, fără atingere directă!",

  // Scene 2
  "Primul Prieten: Lingura de Metal!. — „Hai să încercăm!” și-a zis Magno, plin de curaj, și s-a apropiat de o lingură de metal care stătea liniștită în sertar. ZAC! Lingura a sărit spre Magno ca un magnet — glumă bună, chiar ERA un magnet! — și s-a lipit de el imediat! — „Ha! Te-am găsit, prietene!” a exclamat Magno, nespus de fericit.",
  "— „Hai să încercăm!” și-a zis Magno, plin de curaj, și s-a apropiat de o lingură de metal care stătea liniștită în sertar. ZAC! Lingura a sărit spre Magno ca un magnet — glumă bună, chiar ERA un magnet! — și s-a lipit de el imediat!",
  "— „Ha! Te-am găsit, prietene!” a exclamat Magno, nespus de fericit.",
  "Secretul științific al lui Magno: Obiectele fabricate din oțel conțin fier și sunt atrase instantaneu!",

  // Scene 3
  "Marea Surpriză: Moneda Nemiscata!. Apoi Magno s-a apropiat de o monedă strălucitoare. Magno era sigur că, fiind din metal, moneda va sări și ea spre el. Dar... nimic! Moneda a rămas complet nemișcată. — „Ciudat!” s-a mirat Magno. „Credeam că toate lucrurile de metal sunt prietenii mei, dar se pare că nu-i așa!”",
  "Apoi Magno s-a apropiat de o monedă strălucitoare. Magno era sigur că, fiind din metal, moneda va sări și ea spre el. Dar... nimic! Moneda a rămas complet nemișcată.",
  "— „Ciudat!” s-a mirat Magno. „Credeam că toate lucrurile de metal sunt prietenii mei, dar se pare că nu-i așa!”",
  "Secretul științific al lui Magno: Atenție: NU toate metalele sunt magnetice! Monedele sunt adesea din alamă sau cupru.",

  // Scene 4
  "Nasturele, Piatra și... Cuiul de Fier!. A încercat apoi cu un nasture de plastic — nimic. Cu o piatră mică — nimic. Apoi Magno s-a îndreptat spre un cui de fier... ZAC! Cuiul a sărit imediat spre el, lipindu-se strâns! — „ZAC! Te simt, cuiule voinic! Ești un adevărat prieten de fier!”",
  "A încercat apoi cu un nasture de plastic — nimic. Cu o piatră mică — nimic. Apoi Magno s-a îndreptat spre un cui de fier... ZAC! Cuiul a sărit imediat spre el, lipindu-se strâns!",
  "— „ZAC! Te simt, cuiule voinic! Ești un adevărat prieten de fier!”",
  "Secretul științific al lui Magno: Plasticul și piatra nu reacționează deloc, dar fierul pur se lipește imediat.",

  // Scene 5
  "Descoperirea și Casa Prietenilor Magnetici. — „Aha, acum înțeleg!” a spus Magno, gânditor. „Nu toate metalele sunt prietenii mei — doar unele! Fierul și oțelul mă ascultă imediat, dar arama, aurul sau aluminiul nu simt deloc puterea mea!” De atunci, Magno a decis să facă o listă întreagă cu toți prietenii lui adevărați de fier, punându-i pe toți într-o parte specială a sertarului, doar pentru ei — casa prietenilor magnetici! — „Hai și tu, mic cercetător, ajută-mă să sortăm toate obiectele!”",
  "— „Aha, acum înțeleg!” a spus Magno, gânditor. „Nu toate metalele sunt prietenii mei — doar unele! Fierul și oțelul mă ascultă imediat, dar arama, aurul sau aluminiul nu simt deloc puterea mea!” De atunci, Magno a decis să facă o listă întreagă cu toți prietenii lui adevărați de fier, punându-i pe toți într-o parte specială a sertarului, doar pentru ei — casa prietenilor magnetici!",
  "— „Hai și tu, mic cercetător, ajută-mă să sortăm toate obiectele!”",
  "Secretul științific al lui Magno: Regula secretă: Doar fierul, oțelul și nichelul sunt prietenii magnetici ai lui Magno!",

  // Lab step 1 instructions
  "Pasul 1: Ghicește ce va sări spre Magno! Înainte de a apropia magnetul, privește fiecare lucru și ghicește: crezi că face ZAC și sare spre el, sau stă pe loc? Apasă pe butonul roz dacă crezi că este prieten cu Magno, sau pe cel albastru dacă nu este!",

  // Objects hints & explanations
  "Lingură de metal. Lingura din sertarul lui Magno a sărit prima cu un ZAC puternic!",
  "De ce s-a întâmplat așa? Oțelul din care este făcută lingura conține fier, un metal feromagnetic puternic atras de magnet.",
  "Lingură de metal. Material: Inox / Oțel feros. Oțelul din care este făcută lingura conține fier, un metal feromagnetic puternic atras de magnet.",

  "Cui de fier. Magno l-a testat în poveste și a sărit instantaneu spre el!",
  "De ce s-a întâmplat așa? Fierul pur are atomi care se aliniază perfect cu polii magnetului Magno.",
  "Cui de fier. Material: Fier curat. Fierul pur are atomi care se aliniază perfect cu polii magnetului Magno.",

  "Monedă strălucitoare. Atenție mare! Magno era sigur că va sări pentru că lucește ca metalul, dar a rămas nemișcată!",
  "De ce s-a întâmplat așa? Deși este din metal (alamă sau cupru), moneda nu conține fier sau nichel. Doar fierul, oțelul și nichelul sunt magnetice!",
  "Monedă strălucitoare. Material: Alamă / Cupru / Aluminiu. Deși este din metal (alamă sau cupru), moneda nu conține fier sau nichel. Doar fierul, oțelul și nichelul sunt magnetice!",

  "Nasture de plastic. Magno s-a apropiat de el în poveste, dar nasturele nu a simțit nimic.",
  "De ce s-a întâmplat așa? Plasticul este un material nemetalic, fără proprietăți magnetice.",
  "Nasture de plastic. Material: Plastic colorat. Plasticul este un material nemetalic, fără proprietăți magnetice.",

  "Piatră mică. În poveste, pietricica a rămas complet liniștită în sertar.",
  "De ce s-a întâmplat așa? Rocile obișnuite sunt compuse din minerale care nu reacționează la câmpul magnetic.",
  "Piatră mică. Material: Rocă naturală. Rocile obișnuite sunt compuse din minerale care nu reacționează la câmpul magnetic.",

  "Agrafă de birou. Este mică, ușoară și făcută din sârmă de oțel.",
  "De ce s-a întâmplat așa? Agrafele de birou sunt fabricate din oțel flexibil bogat în fier — un prieten foarte fidel al lui Magno!",
  "Agrafă de birou. Material: Sârmă din oțel. Agrafele de birou sunt fabricate din oțel flexibil bogat în fier — un prieten foarte fidel al lui Magno!",

  "Șurub de oțel. Se folosește la asamblat mobilier și este foarte greu și tare.",
  "De ce s-a întâmplat așa? Șurubul este din oțel, așa că va sări cu bucurie spre Magno cu un ZAC strașnic!",
  "Șurub de oțel. Material: Oțel călit. Șurubul este din oțel, așa că va sări cu bucurie spre Magno cu un ZAC strașnic!",

  "Cheie de fier. O cheie grea cu dinți metalici.",
  "De ce s-a întâmplat așa? Cheile fabricate din oțel sau fier sunt atrase instantaneu de polii magnetului.",
  "Cheie de fier. Material: Aliaj feros. Cheile fabricate din oțel sau fier sunt atrase instantaneu de polii magnetului.",

  "Ghemotoc de folie de aluminiu. Capcană! Este din metal și lucește ca o oglindă, oare va sări?",
  "De ce s-a întâmplat așa? Aluminiul este un metal, dar NU are fier în el. De aceea Magno a spus: „Aluminiul nu simte deloc puterea mea!”",
  "Ghemotoc de folie de aluminiu. Material: Aluminiu pur. Aluminiul este un metal, dar NU are fier în el. De aceea Magno a spus: „Aluminiul nu simte deloc puterea mea!”",

  "Dop de plută. Este foarte ușor și plutește pe apă.",
  "De ce s-a întâmplat așa? Pluta este lemn poros natural, complet insensibilă la forțele magnetice.",
  "Dop de plută. Material: Scoarță de stejar (plută). Pluta este lemn poros natural, complet insensibilă la forțele magnetice.",

  "Creion de lemn. Făcut dintr-o crenguță uscată de copac.",
  "De ce s-a întâmplat așa? Lemnul nu conține electroni liberi care să creeze atracție magnetică.",
  "Creion de lemn. Material: Lemn de tei și grafit. Lemnul nu conține electroni liberi care să creeze atracție magnetică.",

  "Elastic de cauciuc. Se întinde și revine la loc ca o praștie mică.",
  "De ce s-a întâmplat așa? Cauciucul este un polimer elastic izolat, care ignoră complet magnetul.",
  "Elastic de cauciuc. Material: Cauciuc natural. Cauciucul este un polimer elastic izolat, care ignoră complet magnetul.",

  "Bilă de sticlă. Este transparentă și se rostogolește ușor.",
  "De ce s-a întâmplat așa? Sticla este fabricată din nisip topit și nu are nicio atracție magnetică.",
  "Bilă de sticlă. Material: Sticlă transparentă. Sticla este fabricată din nisip topit și nu are nicio atracție magnetică.",

  "Inel din aur sau alamă. Magno ne-a amintit: „Arama, aurul sau aluminiul nu simt puterea mea!”",
  "De ce s-a întâmplat așa? Aurul și arama sunt metale diamagnetice nobile. Doar metalele feroase sunt prietenii lui Magno!",
  "Inel din aur sau alamă. Material: Aur / Alamă decorativă. Aurul și arama sunt metale diamagnetice nobile. Doar metalele feroase sunt prietenii lui Magno!",

  // Step 3 celebration
  "Felicitări, mare cercetător magnetic! Ai explorat toate lucrușoarele și le-ai așezat în cele două cutii ale lui Magno. Secretul descoperit: Doar fierul și oțelul sunt prietenii de fier ai lui Magno!",

  // Extension Lab
  "Trece puterea lui Magno prin materiale? În poveste, Magno atrăgea obiectele prin aer. Dar ce se întâmplă dacă punem o barieră precum hârtia, apa, lemnul sau mânuța ta? Glisează magnetul pe dedesubt și privește cum dansează agrafa de fier de deasupra!",
  "Ce învățăm din acest experiment? Câmpul magnetic este invizibil și călătorește prin spațiu chiar dacă există materiale nemagnetice la mijloc, cum ar fi hârtia, plasticul, lemnul, sticla sau apa. Doar dacă bariera este foarte groasă sau făcută dintr-un strat gros de fier forța va fi deviată.",

  // Educator guide
  "Ghid pedagogic pentru părinți și educatori: Cum transformi povestea lui Magno într-un experiment real. Această activitate îmbină lectura cu metoda științifică autentică: formularea ipotezei, experimentul fizic, observarea și clasificarea rezultatelor în cele două cutii.",
  "Sfat practic și siguranță cu magneții: Evitați magneții foarte mici sau extrem de puternici de tip neodim la copiii sub 6 ani fără supraveghere strictă. Un magnet mare de frigider, un magnet școlar tip bară sau o potcoavă din plastic cu poli protejați este perfect și complet sigur pentru această activitate!"
];

async function run() {
  const outputDir = path.join(__dirname, '../public/audio');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const manifest = {};
  console.log(`Starting synthesis of ${textsToSynthesize.length} Romanian audio files...`);

  for (let i = 0; i < textsToSynthesize.length; i++) {
    const text = textsToSynthesize[i];
    const hash = getHash(text);
    const filename = `${hash}.mp3`;
    const filePath = path.join(outputDir, filename);

    manifest[hash] = `/audio/${filename}`;

    if (fs.existsSync(filePath) && fs.statSync(filePath).size > 500) {
      console.log(`[${i + 1}/${textsToSynthesize.length}] Cached: ${filename}`);
      continue;
    }

    try {
      console.log(`[${i + 1}/${textsToSynthesize.length}] Synthesizing: ${text.slice(0, 45)}...`);
      const buffer = await synthesizeRomanian(text);
      fs.writeFileSync(filePath, buffer);
      console.log(` -> Saved ${filePath} (${buffer.length} bytes)`);
    } catch (err) {
      console.error(`Failed to synthesize "${text.slice(0, 30)}":`, err.message);
    }
  }

  fs.writeFileSync(
    path.join(__dirname, '../src/data/audioManifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  console.log('Audio generation completed successfully!');
}

run();
