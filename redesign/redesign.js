/* ============================================================
   FOCUS redesign — interactions (vanilla, no build step)
   ============================================================ */
'use strict';

/* ---------- nav / menu ---------- */
const nav = document.getElementById('nav');
const navLinks = document.getElementById('navLinks');
window.toggleMenu = () => navLinks.classList.toggle('open');
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
addEventListener('scroll', () => nav.classList.toggle('solid', scrollY > 40));

/* ---------- scroll progress ---------- */
const sp = document.getElementById('scrollProgress');
addEventListener('scroll', () => {
  const h = document.documentElement;
  const pct = (h.scrollTop) / (h.scrollHeight - h.clientHeight);
  sp.style.width = (pct * 100) + '%';
});

/* ---------- hero parallax ---------- */
const heroImg = document.getElementById('heroImg');
addEventListener('scroll', () => {
  const y = scrollY;
  if (y < innerHeight) heroImg.style.transform = 'translateY(' + (y * 0.22) + 'px) scale(1.04)';
});

/* ---------- reveal on scroll ---------- */
const io = new IntersectionObserver((es) => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .14 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ---------- count-up + bars (science) ---------- */
function animateCount(el) {
  const target = parseFloat(el.getAttribute('data-count'));
  const suffix = el.getAttribute('data-suffix') || '';
  const dur = 1400, start = performance.now();
  (function tick(now) {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if (p < 1) requestAnimationFrame(tick); else el.textContent = target + suffix;
  })(start);
}
const sciIo = new IntersectionObserver((es) => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.querySelectorAll('.ls-num').forEach(animateCount);
  e.target.querySelectorAll('.lab-bar').forEach(b => b.classList.add('in'));
  sciIo.unobserve(e.target);
}), { threshold: .3 });
document.querySelectorAll('.lab-card').forEach(el => sciIo.observe(el));

/* COI animated track */
const coiIo = new IntersectionObserver((es) => es.forEach(e => {
  if (!e.isIntersecting) return;
  const fill = document.getElementById('coiFill');
  const flag = document.getElementById('coiFlag');
  const pct = 6.25 / 25; // target relative to 25% scale
  fill.style.width = (pct * 100) + '%';
  flag.style.left = 'calc(' + (pct * 100) + '% - 40px)';
  coiIo.unobserve(e.target);
}), { threshold: .4 });
const coiCard = document.getElementById('coiCard');
if (coiCard) coiIo.observe(coiCard);

/* ---------- active nav link ---------- */
const navA = navLinks.querySelectorAll('a');
const so = new IntersectionObserver((es) => es.forEach(e => {
  if (!e.isIntersecting) return;
  const id = e.target.id;
  navA.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
}), { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('section[id]').forEach(s => so.observe(s));

/* ---------- language toggle (demo) ---------- */
document.querySelectorAll('.lang-toggle button').forEach(b => {
  b.addEventListener('click', () => {
    document.querySelectorAll('.lang-toggle button').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    document.documentElement.lang = b.dataset.lang;
  });
});

/* ============================================================
   ANATOMY EXPLORER
   ============================================================ */
const ZONES = [
  { id:'skull', x:300, y:156, lx:14, label:'Skull & Ears',
    title:'Skull, Ears & Expression',
    fci:'A clean, blunt-wedge skull from above and the side; flat cheeks and a defined but moderate stop. In the modern European Dobermann the ears are left natural — set high and folded, lying close to the cheek (ear cropping is banned across most of Europe). The expression must be alert and noble.',
    bio:'The skull houses the bite leverage and the sensory platform. A balanced skull-to-muzzle ratio keeps the head light for fast, low-fatigue carriage; the natural drop ear still pivots at the base to localise sound.',
    rel:'In protection and SAR the head is the working tool — a calm, focused expression and mobile, well-set natural ears read directly as nerve and trainability.',
    ok:'Parallel planes, dry head, defined but moderate stop, natural high-set ear.',
    bad:'Domed or apple skull, heavy cheeks, snipey or coarse head; low or heavy ear set.' },

  { id:'bite', x:228, y:180, lx:-6, anchor:'end', label:'Muzzle & Bite',
    title:'Muzzle & Scissor Bite',
    fci:'Deep, well-filled muzzle of roughly equal length to the skull; 42 teeth in correct placement and a complete scissor bite. The Dobermann standard is strict on dentition — missing teeth and bite faults are penalised.',
    bio:'A deep muzzle anchors large canine roots and powerful masseter attachment — bite force depends on jaw depth, not length. A correct scissor bite distributes load and protects the incisors during a full, calm grip.',
    rel:'A full, healthy mouth is a hard-grip working trait and a heritable health marker; breeders screen dentition before ZTP.',
    ok:'Full 42-tooth scissor bite, deep underjaw.',
    bad:'Missing premolars, over/undershot bite, weak or shallow muzzle.' },

  { id:'neck', x:378, y:205, lx:10, label:'Neck',
    title:'Neck & Crest',
    fci:'Fairly long, lean and muscular, rising in a beautiful line from a well-laid shoulder; dry throat, no dewlap. The neck carries the head proudly and blends smoothly into the withers.',
    bio:'The nuchal ligament and cervical muscles act as the counterweight to the forehand. A well-arched, correctly inserted neck lets the dog extend the front stride and absorb impact on landing.',
    rel:'Reach and balance in gaiting, and the controlled head-up carriage needed to hold a sleeve or track with the nose down then up.',
    ok:'Long, arched, dry — flows into the withers.',
    bad:'Short or ewe (inverted) neck, throaty, abrupt set-on.' },

  { id:'chest', x:452, y:392, lx:14, label:'Chest',
    title:'Forechest & Depth',
    fci:'Chest reaching to the elbow, of good breadth and a pronounced forechest. Depth roughly half the height at withers; well-sprung but not barrel ribs. The forechest (prosternum) should be clearly visible in profile.',
    bio:'Thoracic depth sets the room for heart and lungs — the engine volume. A visible prosternum signals correct shoulder layback and forechest fill, which lengthens the front stride.',
    rel:'In a breed shadowed by DCM, chest capacity matters; and depth-to-leg balance decides endurance in IGP and SAR.',
    ok:'Depth to elbow, defined prosternum, oval rib.',
    bad:'Shallow or barrel chest, no forechest, flat ribs.' },

  { id:'topline', x:560, y:256, lx:0, anchor:'middle', label:'Topline',
    title:'Topline & Back',
    fci:'Short, firm and strong back; the withers higher and longer, sloping gently to a short, firm loin. The body is square — length roughly equal to height at the withers. The topline must stay firm in motion.',
    bio:'A firm topline is the bridge that transmits hind-drive forward without energy loss. Any roach or dip leaks power and signals weak core and ligament support.',
    rel:'Square build + firm topline = the efficient, ground-covering trot a working Dobermann must hold for long sessions.',
    ok:'Square, firm, slight slope from withers.',
    bad:'Long or soft back, roach or sway, croup higher than withers.' },

  { id:'croup', x:712, y:262, lx:8, label:'Croup & Tail',
    title:'Croup & Natural Tail',
    fci:'Croup falling only slightly from loin to tail set — barely rounded, neither flat (horizontal) nor steep. The tail is left natural and undocked (tail docking is banned across most of Europe): set as a smooth continuation of the topline and carried in a light sabre line.',
    bio:'Croup slope governs how far the hind leg can swing under the body. Too flat over-extends the stride; too steep shortens drive and lifts the rear. The natural tail also acts as a rudder, balancing fast turns and jumps.',
    rel:'Correct croup is the difference between true reach-and-drive and a busy, wasteful rear in trial gaiting; the natural tail aids balance in agility and protection turns.',
    ok:'Slightly sloping croup; natural tail continuing the topline in a sabre line.',
    bad:'Flat (high-set) or steep (low-set) croup; tail curled tight over the back.' },

  { id:'fore', x:412, y:338, lx:14, label:'Forequarters',
    title:'Forequarters & Shoulder',
    fci:'Shoulder blade and upper arm well laid and angulated (≈ matching angles), close-fitting; straight, strong forelegs with strong pasterns, standing vertical from the front. Elbows tight to the body.',
    bio:'Shoulder layback is the front shock-absorber. Good angulation lengthens the front reach and cushions the ~2–3× bodyweight that lands on the forehand at each stride.',
    rel:'Straight fronts and tight elbows prevent early breakdown in dogs that jump, brake and turn under load.',
    ok:'Well-laid shoulder, vertical column, slight pastern spring.',
    bad:'Steep/loaded shoulder, out at elbow, knuckling or down pasterns.' },

  { id:'hind', x:722, y:348, lx:16, label:'Hindquarters',
    title:'Hindquarters & Angulation',
    fci:'Broad, muscular hindquarters; well-bent stifle and well-let-down hock, parallel from behind. Angulation of the rear should balance the front — the croup, thigh and lower thigh forming clean, matched angles.',
    bio:'The stifle and hock are the propulsion levers — the “spring” that converts muscle into forward drive. Balanced front/rear angulation is what makes the gait efficient rather than busy.',
    rel:'Drive for the long working trot, explosive launch into the helper, and clean turns all originate here.',
    ok:'Balanced, well-bent stifle, parallel hocks, broad thigh.',
    bad:'Over- or under-angulated, cow-hocked or bowed, weak thigh.' },

  { id:'muscle', x:575, y:318, lx:0, anchor:'middle', label:'Musculature',
    title:'Musculature & Substance',
    fci:'Dry, hard, clearly defined muscle over a medium-strong bone — substance without coarseness. The Dobermann is an elegant athlete: powerful but never heavy, with skin tight and dry throughout.',
    bio:'Fast-twitch, dry muscle delivers the breed’s acceleration and grip endurance. Excess mass adds load on heart and joints; too little loses drive — selection targets the working middle.',
    rel:'Condition is trainable, but bone and muscling type are heritable — a core thing judges and ZTP evaluators read on the dog.',
    ok:'Dry, defined, athletic — medium-strong bone.',
    bad:'Coarse and loaded, or weedy with light bone.' }
];

const SVGNS = 'http://www.w3.org/2000/svg';
const hotspotsG = document.getElementById('hotspots');
const explorer = document.getElementById('explorer');
const stageHint = document.getElementById('stageHint');
const spDefault = document.getElementById('spDefault');
const spDetail = document.getElementById('spDetail');
const hudCoord = document.getElementById('hudCoord');

function el(tag, attrs) {
  const n = document.createElementNS(SVGNS, tag);
  for (const k in attrs) n.setAttribute(k, attrs[k]);
  return n;
}

ZONES.forEach(z => {
  const g = el('g', { class:'hotspot', 'data-id':z.id, tabindex:'0', role:'button', 'aria-label':z.label });
  g.appendChild(el('circle', { class:'hs-pulse', cx:z.x, cy:z.y, r:6 }));
  g.appendChild(el('circle', { class:'hs-ring',  cx:z.x, cy:z.y, r:10 }));
  g.appendChild(el('circle', { class:'hs-core',  cx:z.x, cy:z.y, r:4.2 }));
  const t = el('text', { class:'hs-label', x:z.x + (z.lx||12), y:z.y - 14 });
  if (z.anchor) t.setAttribute('text-anchor', z.anchor);
  t.textContent = z.label;
  g.appendChild(t);
  const open = () => openZone(z.id);
  g.addEventListener('click', open);
  g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  hotspotsG.appendChild(g);
});

function openZone(id) {
  const z = ZONES.find(x => x.id === id);
  if (!z) return;
  document.querySelectorAll('.hotspot').forEach(h => h.classList.toggle('active', h.dataset.id === id));
  document.getElementById('spDKicker').textContent = z.label;
  document.getElementById('spDTitle').textContent = z.title;
  document.getElementById('spFci').textContent = z.fci;
  document.getElementById('spBio').textContent = z.bio;
  document.getElementById('spRel').textContent = z.rel;
  document.getElementById('spOk').textContent = z.ok;
  document.getElementById('spBad').textContent = z.bad;
  spDefault.hidden = true; spDetail.hidden = false;
  stageHint.classList.add('hide');
  hudCoord.textContent = z.id.toUpperCase() + ' · ' + z.x + ',' + z.y;
}
document.getElementById('spBack').addEventListener('click', () => {
  spDetail.hidden = true; spDefault.hidden = false;
  document.querySelectorAll('.hotspot').forEach(h => h.classList.remove('active'));
  hudCoord.textContent = '— · —';
});

/* quicklist in default panel */
const spQuicklist = document.getElementById('spQuicklist');
ZONES.forEach(z => {
  const li = document.createElement('li');
  li.textContent = z.label;
  li.addEventListener('click', () => openZone(z.id));
  spQuicklist.appendChild(li);
});

/* mode switching */
const MODE_LABEL = {
  anatomy:'Anatomy lens — structure & FCI wording',
  performance:'Performance lens — drive, reach & endurance',
  genetics:'Genetics lens — heritability & health load',
  fci:'FCI Standard lens — the written ideal, N°143'
};
const modeBtns = document.querySelectorAll('.mode-btn');
modeBtns.forEach(btn => btn.addEventListener('click', () => {
  modeBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
  btn.classList.add('active'); btn.setAttribute('aria-selected','true');
  const m = btn.dataset.mode;
  explorer.dataset.mode = m;
  document.getElementById('hudMode').textContent = 'MODE — ' + m.toUpperCase();
  document.getElementById('spModeChip').textContent = MODE_LABEL[m];
}));
explorer.dataset.mode = 'anatomy';

/* ============================================================
   QUIZ
   ============================================================ */
const QUIZ = [
  { q:'What is the correct bite for a Dobermann under FCI Standard 143?',
    o:['Level (pincer) bite','Complete scissor bite, 42 teeth','Slight undershot','Any bite, if teeth are white'],
    a:1, e:'The standard requires a complete scissor bite with 42 correctly placed teeth. Missing teeth and bite faults are penalised.' },
  { q:'The Dobermann’s body proportion should be:',
    o:['Clearly longer than tall','Square — length ≈ height at withers','Tall and narrow','Long and low'],
    a:1, e:'The Dobermann is a square breed: body length is roughly equal to the height at the withers, females marginally longer.' },
  { q:'Roughly what share of Dobermanns develop DCM (dilated cardiomyopathy) in their lifetime?',
    o:['About 5%','About 20%','About 58%','It does not occur in the breed'],
    a:2, e:'Lifetime DCM prevalence is around 58% — the reason annual Holter + echo screening is essential before breeding.' },
  { q:'What does ZTP assess?',
    o:['Only physical beauty','Breed-suitability: conformation + temperament/working test','Hip score only','Racing speed'],
    a:1, e:'ZTP (Zuchttauglichkeitsprüfung) is a breed-suitability test combining a conformation review with a temperament and working evaluation.' },
  { q:'A visible forechest (prosternum) in profile usually indicates:',
    o:['Overweight dog','Correct shoulder layback and forechest fill','A fault to be penalised','Poor condition'],
    a:1, e:'A defined prosternum signals correct shoulder layback and forechest fill, which lengthens the front stride.' },
  { q:'Why is an IGP title alone a weak signal for breeding selection?',
    o:['It is too hard to earn','It is one performance, not an estimated breeding value','IGP is unrelated to dogs','Titles are random'],
    a:1, e:'A single exam score is a noisy, distorted signal. Modern selection fuses many heritable traits into a genomic breeding value.' },
  { q:'In the modern European Dobermann, the ears and tail are:',
    o:['Cropped and docked','Left natural — cropping and docking are banned across most of Europe','Cropped only','Docked only'],
    a:1, e:'Ear cropping and tail docking are prohibited across most of Europe. The breed is shown and judged with natural drop ears and a natural tail.' }
];

let qIdx = 0, qScore = 0;
const quizBody = document.getElementById('quizBody');
const quizBar = document.getElementById('quizBar');
const quizCount = document.getElementById('quizCount');
const quizResult = document.getElementById('quizResult');

function renderQ() {
  const item = QUIZ[qIdx];
  quizBar.style.width = ((qIdx) / QUIZ.length * 100) + '%';
  quizCount.textContent = String(qIdx + 1).padStart(2,'0') + ' / ' + String(QUIZ.length).padStart(2,'0');
  let html = '<div class="quiz-q">' + item.q + '</div><div class="quiz-opts">';
  const keys = ['A','B','C','D'];
  item.o.forEach((opt, i) => {
    html += '<button class="quiz-opt" data-i="' + i + '"><span class="qo-k">' + keys[i] + '</span><span>' + opt + '</span></button>';
  });
  html += '</div><div class="quiz-expl" id="quizExpl"></div><button class="btn btn-gold quiz-next" id="quizNext">Next →</button>';
  quizBody.innerHTML = html;
  quizBody.querySelectorAll('.quiz-opt').forEach(b => b.addEventListener('click', () => choose(b)));
  document.getElementById('quizNext').addEventListener('click', next);
}
function choose(btn) {
  const item = QUIZ[qIdx];
  const chosen = +btn.dataset.i;
  if (quizBody.dataset.answered) return;
  quizBody.dataset.answered = '1';
  quizBody.querySelectorAll('.quiz-opt').forEach((b, i) => {
    b.disabled = true;
    if (i === item.a) b.classList.add('correct');
    if (i === chosen && chosen !== item.a) b.classList.add('wrong');
  });
  if (chosen === item.a) qScore++;
  const expl = document.getElementById('quizExpl');
  expl.textContent = (chosen === item.a ? '✓ Correct. ' : '✗ ') + item.e;
  expl.classList.add('show');
  document.getElementById('quizNext').classList.add('show');
}
function next() {
  qIdx++;
  delete quizBody.dataset.answered;
  if (qIdx < QUIZ.length) { renderQ(); }
  else showResult();
}
function showResult() {
  quizBody.style.display = 'none';
  document.querySelector('.quiz-head').style.display = 'none';
  quizResult.hidden = false;
  const levels = [
    { min:0, b:'◔', t:'Beginner Owner', x:'A solid start. Read the breed guide in the Journal and run it back.' },
    { min:3, b:'◑', t:'Breed Enthusiast', x:'You know the basics of the standard and breed health. Keep going.' },
    { min:5, b:'◕', t:'Working Dog Handler', x:'Strong grasp of structure, ZTP and the working picture.' },
    { min:7, b:'●', t:'Breed Specialist', x:'Specialist level — you read the Dobermann the way a breeder does.' }
  ];
  let lv = levels[0];
  levels.forEach(l => { if (qScore >= l.min) lv = l; });
  document.getElementById('qrBadge').textContent = lv.b;
  document.getElementById('qrTitle').textContent = lv.t;
  document.getElementById('qrText').textContent = lv.x;
  document.getElementById('qrScore').textContent = qScore + ' / ' + QUIZ.length + ' correct';
}
document.getElementById('quizRetry').addEventListener('click', () => {
  qIdx = 0; qScore = 0;
  quizResult.hidden = true;
  quizBody.style.display = '';
  document.querySelector('.quiz-head').style.display = '';
  renderQ();
});
renderQ();

/* ============================================================
   JOURNAL category filter
   ============================================================ */
const jcatBtns = document.querySelectorAll('.jc');
const jItems = document.querySelectorAll('[data-cat]');
jcatBtns.forEach(b => b.addEventListener('click', () => {
  jcatBtns.forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  const cat = b.dataset.cat;
  jItems.forEach(it => {
    const cats = (it.dataset.cat || '').split(/\s+/);
    it.classList.toggle('hiddencat', cat !== 'all' && !cats.includes(cat));
  });
}));

/* footer year */
document.querySelectorAll('.yr').forEach(s => s.textContent = new Date().getFullYear());
