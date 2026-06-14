# DOBERMANN.RO — Redesign Blueprint
### Focus Kennel × Focus Journal · „Breeding Excellence. Advancing Knowledge.”

Document strategic + prototip funcțional pentru transformarea `dobermann.ro` într-un
**hibrid între jurnal științific, platformă de canisă de elită și experiență digitală imersivă**
dedicată rasei Dobermann.

> **Ce este în acest folder**
> - `index.html`, `redesign.css`, `redesign.js` — prototip funcțional al noului homepage (concept build, fără pași de build, rulează direct în browser).
> - `BLUEPRINT.md` — documentul de față: arhitectură informațională, design system, concept anatomie 3D, fluxuri de utilizator, structura jurnalului, roadmap tehnologic.
>
> Site-ul live actual rămâne **neatins** în rădăcina repo-ului. Prototipul referă pozele reale din `../img/` ca să fie credibil vizual.

---

## 0. Cum se vede prototipul
Servește rădăcina repo-ului și deschide `/redesign/`:
```bash
cd FocusKennel.github.io
python3 -m http.server 4181
# → http://localhost:4181/redesign/
```
Prototipul demonstrează: hero cinematic dual-brand · **Explore the Dobermann** (anatomy explorer cu 4 moduri și 9 zone interactive) · Science & Genetics „lab interface” · Focus Kennel athlete cards (poze reale) · Focus Journal ca revistă științifică cu filtre pe categorii · quiz FCI gamificat cu sistem de badge-uri · World of Focus.

---

## 1. Viziune & poziționare
| | Vechi (Focus Kennel) | Nou (Focus Kennel × Journal) |
|---|---|---|
| Identitate | Canisă locală, București | Platformă media + științifică, autoritate globală pe rasă |
| Conținut | Câini + „Gazeta” | Câini (athlete profiles) + jurnal științific internațional + hub genetică + anatomie interactivă |
| Ton | Cald, local, RO | Autoritar dar accesibil · științific dar nu rece · premium dar nu ostentativ · bilingv RO/EN |
| Referințe UX | — | Tesla (minimalism high-tech), National Geographic (storytelling), F1 (dinamism), Nature (UI editorial-științific) |

**Principii UX** (vizibile în prototip):
- *Every scroll teaches something* — fiecare secțiune livrează o informație, nu doar decor.
- *Every dog is an athlete profile* — câinii ca dosare de performanță verificate.
- *Every article is a scientific narrative* — jurnalul ca publicație, nu blog.
- *No clutter, only structured intelligence* — spațiu mare, contrast editorial, ierarhie clară.

---

## 2. Arhitectură informațională (sitemap)

```
/ (HOME — experience layer cinematic)
├── #explore  · EXPLORE THE DOBERMANN  ← hub central interactiv
│     ├── Anatomy mode        (FCI + biomecanică, zone clickabile)
│     ├── Performance mode     (drive, reach, anduranță)
│     ├── Genetics mode        (heritabilitate, încărcătură de boală — layer abstract)
│     └── FCI Standard mode    (idealul scris, N°143)
├── #science  · SCIENCE & GENETICS HUB (lab interface: DCM, diversitate, COI, index de selecție)
├── #kennel   · FOCUS KENNEL  → /dogs → /dog/{slug} (athlete card → dosar complet)
│     ├── Masculi / Femele
│     └── Dogs of the Past (galeria fondatoare)
├── #journal  · FOCUS JOURNAL → /journal → /journal/{slug}
│     └── Categorii: Genetică · Sănătate · Comportament · Sport & Performanță · Standard FCI · Cercetare · Ghiduri proprietari
├── #game     · GAMIFICATION (Anatomy Explorer, Quiz FCI, Identify the structure, badge system)
├── #world    · WORLD OF FOCUS (IGP/IPO · Protecție · SAR · Expoziții · Training)
├── /litters  · Cuiburi & listă de așteptare
└── #contact  · Contact / cerere pui / colaborări de cercetare
```

**Navigație principală:** Explore · Kennel · Journal · Science · World of Focus · Contact + toggle limbă **RO/EN**.

---

## 3. Homepage cinematic — concept
1. **Hero** — poza-banner actuală păstrată, overlay minimalist dual-brand **FOCUS / Kennel | Journal**, tagline *Breeding Excellence. Advancing Knowledge.*; intrare animată (rise), parallax pe imagine la scroll, marquee tehnic jos. (`.hero` în prototip.)
2. **Explore the Dobermann** — focal point interactiv (vezi §5).
3. **Science & Genetics** — trei „instrumente” cu cifrele care decid viața unui Dobermann (DCM ~58%, diversitate, index de selecție pe 6 trăsături) + bară COI animată.
4. **Focus Kennel** — athlete cards cu poze reale, badge numeric, statistici (ZTP/HD/DCM/titluri), hover cinematic reveal → dosar.
5. **Focus Journal** — masthead de revistă, filtre pe categorii, articol de fond + sidebar (articolele reale existente).
6. **Test Yourself** — quiz pe Standardul FCI 143 + sănătate, cu nivel rezultat (Beginner Owner → Breed Specialist).
7. **World of Focus** — strip documentar lifestyle/work.
8. **Contact** + footer.

Tranziții: scroll-reveal (IntersectionObserver în prototip; **GSAP ScrollTrigger** în producție pentru parallax pe straturi, pin & scrub, motion blur subtil).

---

## 4. Design system

### Culori (dark premium base · gold / steel / subtle red / blue)
```
--black     #06090e   /  --black2 #0a0f16  /  --panel #101722  /  --panel2 #151e2a
--gold      #d8a93f   --gold-br #f0c45e   --gold-soft #e7cd8f      (autoritate, accent principal)
--blue      #2f6fb0   --blue-br #4d93d8   --blue-deep #16324f      (științific, link, performance)
--red       #e0524b   --red-deep #7a201c                          (alertă/sănătate/fault, accent subtil)
--steel     #8fa3b8   --steel-br #c3d0dd                           (HUD, instrumentar, neutru tehnic)
--bone      #eef2f6   --dim #94a3b3   --dim2 #677586               (text)
```
Roluri semantice: **gold** = brand/autoritate; **blue** = corect/științific; **red** = fault/risc de sănătate; **steel** = chrome de „lab interface”.

### Tipografie
- **Display:** `Fraunces` (serif editorial, titluri high-impact, italic pentru accente).
- **Body:** `Archivo` (sans modern, foarte lizibil).
- **Mono:** `JetBrains Mono` (HUD, etichete tehnice, ID-uri de „lab”, coordonate).

### Spațiu & motion
- Secțiuni aerisite (`padding:118px`), max-width 1440px, contrast editorial.
- Micro-interacțiuni peste tot: hover reveal pe carduri, hotspot pulse, count-up, bare animate, marquee.
- `prefers-reduced-motion` respectat.

---

## 5. Anatomie interactivă — concept (placeholder SVG → Three.js în producție)

**În prototip:** siluetă Dobermann în profil (SVG), 9 zone clickabile, 4 moduri. La click pe o zonă, panoul-readout deschide patru straturi de informație:
- **FCI Standard** — formularea oficială (N°143).
- **Biomecanică** — de ce e construit așa (pârghii, amortizare, propulsie).
- **De ce contează** — relevanță pentru sport / protecție / SAR / sănătate.
- **Correct vs. Fault** — comparație corectă vs. defect.

Zone acoperite: craniu & urechi · bot & dentiție (mușcătură foarfecă, 42 dinți) · gât & inserție · piept/forechest & profunzime · linie superioară · crupă & coadă · membre anterioare (umăr) · membre posterioare (angulații) · musculatură/substanță.

Moduri (recolorează modelul + schimbă HUD + lentila panoului):
`Anatomy` (structură) · `Performance` (drive/reach/anduranță) · `Genetics` (heat-map abstract pe corp) · `FCI Standard` (contur idealul scris).

> **Standard corect:** silueta respectă Dobermannul european modern — **urechi naturale (neoperate)** și **coadă naturală (necupată)**. Amputarea urechilor și a cozii este interzisă în majoritatea Europei, iar câinele e judecat cu ureche pliată, înaltă, și coadă în linie de sabie.

**În producție:**
- Model **3D realist** (glTF/GLB) randat cu **Three.js / react-three-fiber**, rotatable, cu OrbitControls.
- Layere comutabile (schelet, musculatură, heat-map genetic) ca materiale/grupuri.
- Hotspot-uri ca `<Html>` anchors poziționate pe vertecși; raycasting pentru click pe regiuni.
- Fallback SVG (cel din prototip) pentru mobil low-end / reduced-motion / no-WebGL.
- UI „high-end medical / scientific visualization”: HUD, scan lines, pulse — deja prezent în prototip.

---

## 6. Structura Focus Journal (publicație)
- Layout „digital scientific magazine” (Nature-style): masthead cu issue/dată, articol de fond + sidebar.
- **Categorii:** Genetică · Sănătate (DCM, boli ereditare) · Comportament · Sport & Performanță · Standard FCI interpretat modern · Studii & cercetare · Ghiduri pentru proprietari.
- **UX lectură:** reading mode imersiv, ritm editorial lent, stil de citații/figuri (deja folosit în `articol-igp-genomica.html`).
- **Filtrare pe categorii** în prototip (chip-uri active, `data-cat`).
- **Producție:** headless CMS (Sanity / Contentful / Strapi) pentru articole; câmpuri: titlu, autor, categorie, abstract, corp (rich text + figuri), citații, DOI/sursă, limbă (RO/EN). **AI layer** opțional: search semantic peste articole (embeddings + vector store) pentru întrebări în limbaj natural.

---

## 7. Fluxuri de utilizator
**Visitor (curios despre rasă)**
`Home → Explore the Dobermann (joacă-te cu anatomia) → Quiz → Journal (un articol) → Contact`
Obiectiv: „înțeleg rasa dincolo de aparențe” + posibil interes pentru pui.

**Owner / viitor proprietar**
`Home → Kennel (athlete cards) → dosar câine (sănătate, pedigree) → Litters / listă de așteptare → Contact`
Obiectiv: încredere prin transparență (ZTP, HD, Holter, teste ADN).

**Breeder (crescător)**
`Home → Science & Genetics (COI, index de selecție) → dosar reproducător (teste, rezultate) → Journal (genetică/selecție) → Contact (colaborare)`
Obiectiv: validează rigoarea selecției; date de reproducție.

**Researcher / jurnalist**
`Home → Journal (categorie Cercetare) → articol cu citații → Science Hub (date populaționale) → Contact (colaborare/date)`
Obiectiv: conținut citabil, autoritate științifică.

---

## 8. Roadmap tehnologic (producție)
- **Framework:** Next.js (App Router) + React — SSR/SSG pentru SEO, rute pentru câini și articole.
- **3D:** Three.js / react-three-fiber + drei pentru anatomy explorer; model glTF.
- **Animație:** GSAP + ScrollTrigger (parallax, pin, scrub, motion blur), Lenis pentru smooth scroll.
- **CMS:** headless (jurnal + câini + cuiburi) ca să poată edita echipa fără cod.
- **Search:** AI semantic peste jurnal (embeddings).
- **i18n:** RO/EN (toggle deja în UI).
- **Performanță:** imagini `next/image` (AVIF/WebP), lazy-load, fallback SVG la anatomie.
- **A11y:** roluri ARIA pe taburi/butoane (deja în prototip), focus states, reduced-motion.

### Note de migrare din prototip
- Prototipul e vanilla (0 dependențe) ca să fie deschis instant. Componentele se mapează 1:1 pe React: `Explorer`, `LabCard`, `AthleteCard`, `JournalGrid`, `Quiz`, `WorldStrip`.
- Tokenii de culoare/tipografie din `redesign.css` devin tema (CSS vars / Tailwind config).
- Datele câinilor și articolelor (acum hardcodate în HTML, fidele site-ului live) trec în CMS/JSON.
- Silueta SVG e **placeholder** până la modelul 3D — e construită ca fallback, nu ca livrabil final.

---

## 9. Status livrabile (din OUTPUT AȘTEPTAT)
| Cerut | Status |
|---|---|
| UI/UX redesign complet | ✅ prototip funcțional homepage + design system |
| Homepage cinematic concept | ✅ implementat (hero, scroll-reveal, parallax, marquee) |
| Arhitectură informațională | ✅ §2 |
| Concept anatomie interactivă 3D | ✅ §5 + explorer funcțional (SVG, 4 moduri, 9 zone) |
| Design system | ✅ §4 + `redesign.css` |
| Fluxuri utilizator | ✅ §7 |
| Structură jurnal | ✅ §6 + secțiune Journal în prototip |

**Pas următor recomandat:** validezi direcția pe prototip, apoi scaffolding Next.js + integrare CMS + model 3D pentru anatomie.
