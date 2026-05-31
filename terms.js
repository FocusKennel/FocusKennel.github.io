/* ============================================================
   Focus Dobermann Kennel — Glosar de termeni (sursă unică)
   Tooltip explicativ la hover / tap pe orice termen de nișă.
   Adaugă/editezi termenii AICI și se aplică pe TOT site-ul.
   ============================================================ */
(function () {
  const TIPS = {
    // ——— Teste de aptitudine & lucru ———
    "ZTP": ["ZTP — test de aptitudine pentru reproducere",
      "Examen oficial care verifică structura (după standardul rasei) și caracterul (nervi tari, siguranță de sine, lipsa fricii). Doar câinii care îl trec pot fi folosiți la reproducere."],
    "V1A": ["V1A — calificativul maxim la ZTP",
      "Nota acordată la ZTP. „V” (Vorzüglich = excelent) e cea mai bună notă de structură, „1A” = caracterul ideal: sigur pe sine, neînfricat, stabil. V1A este rezultatul de top."],
    "V1B": ["V1B — calificativ foarte bun la ZTP",
      "„V” = excelent ca structură; „1B” = caracter foarte bun, ușor sub V1A. Un rezultat solid, de reproducător."],
    "BEST ZTP": ["BEST ZTP Award — cel mai bun la testare",
      "Distincție acordată celui mai bun câine dintr-o sesiune de ZTP, peste calificativul propriu-zis."],
    "BH": ["BH — câine însoțitor",
      "Test de obediență și stabilitate în viața de zi cu zi: calm printre oameni, mașini și alți câini. Dovada unui câine echilibrat și sigur social. Condiție pentru probele sportive."],
    "BEST BH": ["BEST BH Award — cel mai bun la proba BH",
      "Distincție pentru cel mai bun câine dintr-o sesiune BH."],
    "IGP": ["IGP — sportul canin de utilitate",
      "Probă în trei discipline: urmărire, obediență și apărare (fost IPO / Schutzhund). Arată inteligență, antrenabilitate și nervi puternici. Cifra (IGP-1, -2, -3) = nivelul."],
    "IPO": ["IPO — sportul de utilitate (denumire veche)",
      "Denumirea anterioară a IGP. Aceleași trei discipline: urmărire, obediență, apărare."],
    "IGP-1": ["IGP-1 — primul nivel de utilitate",
      "Prima treaptă a sportului IGP (urmărire, obediență, apărare)."],

    // ——— Sănătate ———
    "HD": ["HD — displazia de șold",
      "Radiografie a șoldurilor, citită oficial. Scala FCI: A (perfect) → E (sever). Se reproduce doar din câini A sau B, pentru articulații sănătoase toată viața."],
    "DV": ["DV — citire oficială germană",
      "Rezultat citit de clubul german al rasei (Dobermann-Verein) — referință de încredere pentru HD."],
    "vWD": ["vWD — boala von Willebrand",
      "Tulburare ereditară de coagulare a sângelui. Testabilă ADN. „clear” = câinele nu o are și nu o transmite."],
    "DCM": ["DCM — cardiomiopatia dilatativă",
      "Cea mai serioasă boală a rasei (afectează inima). Se monitorizează prin examen cardiologic (eco + Holter) și teste ADN (DCM1, DCM2)."],
    "DCM1": ["DCM1 — marker genetic cardiac",
      "Mutație genetică asociată cardiomiopatiei dilatative. „Free” = câinele nu poartă această mutație."],
    "DCM2": ["DCM2 — al doilea marker genetic cardiac",
      "A doua mutație asociată cardiomiopatiei dilatative. „Free” = câinele nu o poartă."],
    "Cardio": ["Cardio — examen cardiologic",
      "Evaluarea inimii (ecocardiografie și/sau Holter) pentru depistarea precoce a problemelor cardiace."],
    "Laboklin": ["Laboklin — laborator de genetică",
      "Laborator european de referință pentru testele ADN de sănătate la câini."],
    "PHTVL/PHPV": ["PHTVL/PHPV — test ocular",
      "Examen oftalmologic pentru o afecțiune ereditară a ochiului. „free” = neafectat."],

    // ——— Titluri & expoziții ———
    "CACIB": ["CACIB — spre Campion Internațional",
      "Certificat câștigat în expoziție, valabil spre titlul de Campion Internațional de Frumusețe (FCI)."],
    "CAC": ["CAC — spre Campion Național",
      "Certificat de Aptitudine pentru Campionat — punct câștigat spre titlul de Campion național."],
    "J-CAC": ["J-CAC — CAC de juniori",
      "Certificat de campionat pentru clasa de juniori."],
    "J-CACIB": ["J-CACIB — CACIB de juniori",
      "Certificat internațional pentru clasa de juniori."],
    "BOB": ["BOB — Best of Breed",
      "Cel mai bun exemplar al rasei din întreaga expoziție."],
    "BOS": ["BOS — Best of Opposite Sex",
      "Cel mai bun exemplar de sex opus față de câștigătorul BOB."],
    "J-BOG": ["J-BOG — Best of Group juniori",
      "Cel mai bun junior din grupa FCI a rasei."],

    // ——— Cluburi & registre ———
    "AIAD": ["AIAD — clubul italian al rasei",
      "Asociația Italiană Amatori Dobermann — una dintre cele mai prestigioase referințe din lume. Un titlu AIAD cântărește mult."],
    "IDC": ["IDC — clubul mondial al rasei",
      "International Dobermann Club — forul mondial. Titlurile IDC sunt printre cele mai valoroase internațional."],
    "DCR": ["DCR — clubul român al rasei",
      "Dobermann Club România — organizatorul expozițiilor și probelor naționale de specialitate."],
    "HDK": ["HDK — clubul maghiar al rasei",
      "Clubul Dobermann din Ungaria — expoziții specializate de referință în regiune."],
    "COR": ["COR — Cartea de Origine Română",
      "Numărul de pedigree oficial din registrul genealogic român."]
  };

  const keys = Object.keys(TIPS).sort((a, b) => b.length - a.length);
  const reAny = new RegExp('(?<![\\w-])(' + keys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')(?![\\w-])', 'g');

  function tipHTML(k) {
    return '<span class="tip">' + k + '<span class="tipbox"><span class="tt-h">' + TIPS[k][0] + '</span>' + TIPS[k][1] + '</span></span>';
  }
  function process(textNode) {
    const txt = textNode.nodeValue;
    reAny.lastIndex = 0;
    if (!reAny.test(txt)) return;
    reAny.lastIndex = 0;
    const frag = document.createDocumentFragment();
    let last = 0, m;
    while ((m = reAny.exec(txt))) {
      if (m.index > last) frag.appendChild(document.createTextNode(txt.slice(last, m.index)));
      const tmp = document.createElement('span');
      tmp.innerHTML = tipHTML(m[1]);
      frag.appendChild(tmp.firstChild);
      last = m.index + m[1].length;
    }
    if (last < txt.length) frag.appendChild(document.createTextNode(txt.slice(last)));
    textNode.parentNode.replaceChild(frag, textNode);
  }
  // Zonele unde căutăm termeni de explicat
  const scopes = document.querySelectorAll('.titles .tx, .titles .ty, .health-item .test, .facts .v, .dog .traits span, .hcard h4, .std-table td');
  scopes.forEach(scope => {
    const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT, null);
    const texts = []; let n;
    while (n = walker.nextNode()) texts.push(n);
    texts.forEach(process);
  });
  // tap pe mobil
  document.addEventListener('click', e => {
    const t = e.target.closest('.tip');
    document.querySelectorAll('.tip.open').forEach(o => { if (o !== t) o.classList.remove('open'); });
    if (t) { t.classList.toggle('open'); e.stopPropagation(); }
  });
})();
