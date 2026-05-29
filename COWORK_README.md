# Ghid Cowork — Site Focus Dobermann Kennel

Acest fișier îi spune lui Cowork (și ție) cum e construit site-ul și cum se modifică.
**Când lucrezi în Cowork, indică-i acest folder și spune-i la început: „Citește COWORK_README.md înainte să faci modificări."**

---

## 1. Structura site-ului

```
focus-site/
├── index.html        ← pagina principală (landing + toate secțiunile)
├── style.css         ← TOATE culorile și stilurile (un singur loc)
├── indie.html        ← pagina câinelui Focus Iconic Indie
├── joyce.html        ← pagina câinelui Focus Javelin Joyce
├── jump.html         ← pagina câinelui Focus Jump Around
├── img/              ← toate pozele (.jpg)
├── video/            ← clipuri scurte (.mp4, sub ~30 MB fiecare)
└── COWORK_README.md  ← acest fișier
```

- `index.html` are secțiunile: Istoric, Câinii noștri, Câini de bază, Galerie, Rasa, Contact.
- Click pe un câine în „Câinii noștri" deschide pagina lui (`indie.html` / `joyce.html` / `jump.html`).
- Fiecare pagină de câine are: hero, fapte rapide, Palmares (titluri), Teste de sănătate, Media (taburi Show / Lucru / Video), navigare între câini.

**Limbă:** site-ul e bilingv RO/EN. Textul în română e marcat cu `data-ro`, cel englez cu `data-en`. Când adaugi text nou, adaugă AMBELE variante:
```html
<span data-ro>Text în română</span><span data-en>Text in English</span>
```

---

## 2. Reguli pentru poze (IMPORTANT)

Înainte de a pune o poză pe site, ea trebuie **redimensionată și comprimată**, altfel site-ul se încarcă lent.

**Cere-i lui Cowork:** „Redimensionează pozele la maxim 1100px pe latura lungă și salvează-le ca JPEG calitate 80, apoi pune-le în folderul img/."

- Format: `.jpg` (nu PNG pentru poze — ocupă prea mult).
- Nume fișiere: **doar litere mici, fără spații, fără diacritice.** Ex: `joyce-show-1.jpg`, NU `Joyce Show 1.JPG`.
- Mărime țintă: sub ~400 KB per poză.

### Convenție de denumire (respect-o ca să fie ordine)
- Galeria de pe prima pagină: `gallery4.jpg`, `gallery5.jpg`, …
- Show pentru un câine: `joyce-show-1.jpg`, `joyce-show-2.jpg`, …
- Lucru pentru un câine: `joyce-work-1.jpg`, `joyce-work-2.jpg`, …
  (înlocuiește `joyce` cu `indie` sau `jump` după caz)

---

## 3. Cum adaugi poze în galeria paginii principale

În `index.html`, în secțiunea `id="gallery"`, există blocuri-loc gol care arată așa:
```html
<div class="g-slot"><div><div class="plus">+</div><span data-ro>Adaugă poză</span><span data-en>Add photo</span></div></div>
```
Cere-i lui Cowork să **înlocuiască un astfel de bloc** cu unul real:
```html
<div class="g-item" onclick="openLb(this)"><img src="img/gallery4.jpg" alt="Descriere"><div class="cap">Descriere poză</div></div>
```

**Prompt exemplu:**
> „Am pus 3 poze noi în img/ (gallery4.jpg, gallery5.jpg, gallery6.jpg). Înlocuiește 3 sloturi goale din galeria de pe index.html cu ele, cu descrieri potrivite."

---

## 4. Cum adaugi poze pe pagina unui câine (Show / Lucru)

Pe pagina câinelui (ex. `joyce.html`), secțiunea Media are 3 taburi:
- **panel-show** → galeria de expoziție
- **panel-work** → galeria de lucru
- **panel-video** → clipuri

Fiecare are sloturi goale `g-slot` (sau `video-slot`). Se înlocuiesc la fel ca mai sus.

**Prompt exemplu:**
> „Pe joyce.html, în tabul Show, am pus în img/ pozele joyce-show-1.jpg până la joyce-show-4.jpg. Înlocuiește sloturile goale din panel-show cu ele."

> „Pe indie.html, în tabul Lucru (panel-work), adaugă indie-work-1.jpg și indie-work-2.jpg din folderul img/."

---

## 5. Cum adaugi clipuri video

Ai două opțiuni. Alege per clip.

### A) Clip scurt, direct pe site (sub ~30 MB)
1. Cere-i lui Cowork să comprime clipul: „Comprimă acest clip la 720p, sub 30 MB, format mp4, și pune-l în folderul video/."
2. Apoi înlocuiește un `video-slot` din `panel-video` cu:
```html
<div class="video-item"><video controls preload="metadata" src="video/joyce-1.mp4"></video><div class="vcap">Descriere clip</div></div>
```

### B) Clip lung sau greu → YouTube (RECOMANDAT pentru demonstrații de lucru)
1. Urci clipul pe YouTube (poate fi „Unlisted" dacă nu vrei să fie public căutabil).
2. Iei codul de embed (pe YouTube: Share → Embed) — îți dă un `<iframe>`.
3. Înlocuiește un `video-slot` cu:
```html
<div class="video-item"><iframe src="https://www.youtube.com/embed/CODUL_VIDEO" allowfullscreen></iframe><div class="vcap">Descriere clip</div></div>
```
Unde `CODUL_VIDEO` e partea din link de după `watch?v=`.

**De ce YouTube pentru clipuri grele:** GitHub respinge fișiere peste 100 MB și are limită de trafic. Clipurile lungi pe YouTube nu consumă spațiul tău.

**Prompt exemplu:**
> „Am un clip de lucru cu Jump pe YouTube, codul e abc123XYZ. Pune-l în tabul Video de pe jump.html ca embed YouTube, cu descrierea «Antrenament protecție 2025»."

---

## 6. Cum modifici titluri sau teste de sănătate pe pagina unui câine

**Titluri** (secțiunea Palmares) — fiecare titlu e un bloc:
```html
<div class="title-item"><div class="ty">Show</div><div class="tx">AIAD Open Class Winner</div></div>
```
`ty` = categoria (Show, ZTP, BH, Champion, Sport). `tx` = titlul propriu-zis.

**Teste de sănătate** — fiecare test e un card:
```html
<div class="health-item"><div class="icon">♿</div><div class="test">HD</div><div class="result">A (DV)</div><div class="sub">Șold / Hips</div></div>
```
`result` = rezultatul (ex. „A (DV)", „clear", „Free").

**Prompt exemplu:**
> „Pe indie.html, schimbă rezultatul Cardio din «în evaluare» în «normal» și adaugă un titlu nou de tip Show: «BOB Cluj 2026»."

---

## 7. Cum schimbi culorile întregului site

Toate culorile sunt în `style.css`, sus de tot, în blocul `:root`. Schimbi o singură valoare și se aplică peste tot.
```css
--gold:#d8a93f;        /* auriu principal */
--gold-bright:#f0c45e; /* auriu deschis */
--blue:#2f6fb0;        /* albastru */
--blue-bright:#4d93d8; /* albastru deschis */
--black:#070a0f;       /* fundal negru */
```
**Prompt exemplu:**
> „În style.css, schimbă --gold în #c9962e (un auriu mai cald)."

---

## 8. Cum adaugi un câine nou

Cel mai simplu: copiezi o pagină existentă.
**Prompt exemplu:**
> „Copiază joyce.html într-un fișier nou nemo.html, schimbă numele în «Focus New Moon», golește titlurile și testele, pune poza img/nemo.jpg în hero, și actualizează linkurile de navigare anterior/următor. Apoi adaugă un card nou în secțiunea «Câinii noștri» din index.html care duce la nemo.html."

---

## 9. Cum verifici înainte să publici

După orice modificare, cere-i lui Cowork:
> „Deschide index.html în browser ca să verific cum arată."

Sau dublu-click pe `index.html` în folder — se deschide în browser și vezi rezultatul local (înainte să-l urci pe GitHub).

---

## 10. Cum publici modificările pe GitHub (site live)

Site-ul e găzduit pe GitHub Pages la adresa `https://<username>.github.io`.

După ce ai modificat fișiere local:
1. Intră pe github.com → repository-ul `<username>.github.io`.
2. **Add file → Upload files.**
3. Trage fișierele modificate (ex. `index.html`, `joyce.html`) și/sau folderele `img/` și `video/` actualizate.
4. Jos: **Commit changes.**
5. În 30–60 de secunde modificarea e live.

> Notă: dacă ai instalat ulterior connectorul GitHub în Cowork, îi poți spune direct „urcă modificările pe GitHub" și o face singur. Până atunci, faci pasul de upload manual prin browser.

---

## Reguli de aur (rezumat pentru Cowork)

1. Poze: max 1100px, JPEG calitate 80, sub 400 KB, nume cu litere mici fără spații/diacritice.
2. Video local doar sub ~30 MB; restul pe YouTube embed.
3. Orice text nou se pune în AMBELE limbi (`data-ro` și `data-en`).
4. Culorile se schimbă doar în `style.css`, în `:root`.
5. Nu șterge fișiere fără să întrebi. Fă o copie de siguranță a folderului înainte de modificări mari.
6. După modificări, deschide pagina în browser pentru verificare.
