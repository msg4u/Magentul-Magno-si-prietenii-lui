# Magno – Magnetul și Prietenii de Fier 🧲🔩

**Magno – Magnetul și Prietenii de Fier** este o aplicație web interactivă și un instrument educațional inovator conceput pentru copii cu vârste între **4 și 7 ani**. Proiectul introduce concepte fundamentale din fizică (magnetismul) printr-o formă narativă distractivă, în care personajul principal, Magno, explorează lumea din jur pentru a descoperi ce obiecte sunt atrase de forța sa magnetică.

Aplicația integrează inteligența artificială generativă prin intermediul platformei Google AI Studio pentru a le oferi celor mici răspunsuri personalizate, sigure și ușor de înțeles.

🔗 **Link Aplicație:** [https://magno-magnetul.ai.studio/](https://magno-magnetul.ai.studio/)

---

## 🚀 Conceptul Narativ și Științific

Jocul elimină formulele abstracte și le înlocuiește cu experimente virtuale și povești:
- **Prietenii de Fier:** Copiii înțeleg într-un mod empiric proprietățile materialelor feromagnetice (fier, oțel) care devin „prietenii” lui Magno.
- **Respingerea și Neutralitatea:** Aplicația demonstrează vizual de ce obiectele din plastic, lemn sau sticlă nu reacționează în prezența unui magnet.
- **Învățare prin Explorare:** Procesul stimulează curiozitatea nativă a copiilor și îi încurajează să testeze ipoteze („Ce se întâmplă dacă Magno se apropie de o lingură?”).

---

## 🛠️ Tehnologii utilizate

Proiectul folosește un ecosistem frontend de ultimă generație pentru a asigura o încărcare instantanee și o fluiditate maximă a animațiilor:

- **[Vite](https://vitejs.dev)** – Instrument de build ultra-rapid pentru aplicații web moderne.
- **[TypeScript](https://typescript.org)** – Garantează un cod stabil, scalabil și bine structurat prin tipizare statică.
- **[Bun](https://bun.sh)** – Runtime JavaScript complet și manager de pachete rapid (suportă integral și Node.js/npm).

---

## 💻 Instalare și Rulare Locală

Urmează pașii de mai jos pentru a configura și porni proiectul în mediul tău local de dezvoltare:

### 1. Clonarea repository-ului
```bash
git clone https://github.com
cd Magentul-Magno-si-prietenii-lui
```

### 2. Instalarea dependențelor
Recomandat cu **Bun** (bazat pe fișierul existent `bun.lock`):
```bash
bun install
```
Sau folosind clasicul **npm**:
```bash
npm install
```

### 3. Configurarea variabilelor de mediu
Generează fișierul `.env` local pornind de la fișierul de exemplu pentru a completa cheile API destinate Google AI Studio:
```bash
cp .env.example .env
```

### 4. Rularea serverului de dezvoltare
Pornește aplicația local:
```bash
bun run dev
# sau
npm run dev
```
Accesează adresa afișată în terminal (de regulă `http://localhost:5173`) pentru a deschide aplicația în browser.

### 5. Compilarea pentru producție
Pentru a genera build-ul optimizat și compilat în folderul `dist`:
```bash
bun run build
# sau
npm run build
```

---

## 📁 Structura Proiectului

```text
├── src/               # Codul sursă al aplicației (interfețele interactive, logica jocului, stiluri)
├── .env.example       # Șablon pentru configurarea cheilor de acces Google AI Studio
├── bun.lock           # Fișierul de blocare a versiunilor de dependințe pentru Bun
├── index.html         # Fișierul HTML principal (punctul de intrare)
├── metadata.json      # Configurațiile aplicației specifice rulării în Google AI Studio
├── package.json       # Scripturile de rulare și lista pachetelor dependente
├── tsconfig.json      # Configurațiile compilatorului TypeScript
└── vite.config.ts     # Setările și plugin-urile folosite de managerul de build Vite
```

---

## 📝 Licență și Contribuții

Acest repository a fost creat având ca fundament template-ul oficial `google-gemini/aistudio-repository-template`.

Dacă dorești să extinzi colecția de obiecte pe care le testează Magno, să adaugi noi interacțiuni sau să optimizezi performanța codului, te invităm să deschizi un **Issue** sau să trimiți un **Pull Request**.

Concept creat cu ❤️ pentru copii și părinți deopotrivă.
