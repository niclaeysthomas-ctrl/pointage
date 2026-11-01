/* ======================= Tour 4, pièce 18 : LE ROULEAU (etude_rouleau4) ======================= */
/* Ce qu'on voit : un emakimono (rouleau peint japonais) sur un washi gris, lu de droite à gauche ; chaque priorité faite en DÉROULE
   une feuille : sa scène en fukinuki yatai (990 le pavillon sur l'eau, CUMBRE la cime, Lecture le cabinet aux érables, LE CLOSING la
   salle du sceau), son texte en colonnes, son nom dans le cartouche, son sceau rouge. Les nuages d'or sont posés en petites feuilles
   (kinpaku) en appareil décalé, chaque feuille avec sa normale froissée et sa teinte, éclairée par Blinn-Phong (1977) à chaque image.
   La loi du seuil : la chute des feuilles d'érable suit le modèle quasi-stationnaire de la plaque qui tombe de Tanabe & Kaneko
   (Phys. Rev. Lett. 73, 1994) : traînée anisotrope (normale ≫ tangentielle), portance ∝ V·u_t, couple aérodynamique −k·u_t·u_n et
   amortissement : la feuille oscille, glisse, bascule, au vent. L'onde du grand sceau : équation des ondes amortie
   ∂²h/∂t² = c²∇²h − γ∂h/∂t sur la feuille (différences finies, schéma explicite, CFL c·Δt/Δx ≤ 1/√2) ; sa pente éclaire le papier
   et fait flamber l'or. Le rouleau s'envole en hélice de pas p = hauteur + jeu (projection perspective x = f·X/Z) ; la cire coule
   en t^(1/3) (film visqueux à volume fixe, Huppert 1982). Toujours là : le bord des nuages par fBm quantifié (Mandelbrot–Van Ness
   1968), la projection oblique du fukinuki yatai, la justification JIS X 4051, le rayon du rouleau r = √(r₀² + e·L/π).
   La main : aplats francs, contours nets, aucun coup de pinceau ; 日課成就 est écrit trait par trait dans l'ordre japonais des
   traits, en traits nets à extrémités calculées (tome, hane, harai). Couleurs : gunjō, rokushō, shu, murasaki, gofun, or.
   Le seuil (Boucler, ~9,5 s) : le colophon se déroule d'un grand geste, tout le rouleau tient dans le cadre ; les scènes s'animent
   (l'eau coule, la brume monte sur la cime, la cire du sceau fond et coule, les érables perdent leurs feuilles qui traversent l'écran,
   l'or se détache des nuages) ; le rouleau s'élève et s'enroule en hélice autour de nous ; on le traverse vers la dernière feuille :
   la vue de toute la province, peinte sous nos yeux (soleil, cime, eau, pavillon), où les quatre personnages des scènes se rejoignent ;
   日課成就 s'écrit, le grand sceau frappe, l'onde court dans le papier. L'état reste : « JOURNÉE ACCOMPLIE ».
   Le doigt : glisser fait défiler le rouleau (après le seuil, la lumière de l'or) ; toucher une scène la nomme.
   Le budget : feuilles et panneau peints une fois par tranches de 6 ms ; au seuil, les feuilles sont figées (or cuit) puis tracées en
   ~360 cellules affines ; l'onde (56 × 62) et l'or du panneau sont les seuls calculs par image. */

const etude_rouleau4_DONNEES = Object.assign({
  jour: "lundi 26 octobre",
  titre: { grand: "一日の巻", petit: "神無月廿六日", sceau: "日", fr: "LE ROULEAU DU JOUR" },
  scenes: [
    { scene: "Le pavillon sur l'eau", pigment: "gunjō · azurite", couleur: [32, 68, 168], sceau: "英",
      texte: "朝まだき、異国の言葉に耳を澄まし、問ひに答へ、聞き漏らしし言の葉を書きとむ。" },
    { scene: "La cime", pigment: "rokushō · malachite", couleur: [36, 138, 100], sceau: "頂",
      texte: "頂は一日にして成らず。声に出して読み、三つの言葉を覚え、一段づつ山を登る。" },
    { scene: "Le cabinet aux érables", pigment: "shu · vermillon", couleur: [206, 56, 28], sceau: "読",
      texte: "哲人の文を二度読む。一度は聞くため、二度目は筆を執りて、残る一句を写す。" },
    { scene: "La salle du sceau", pigment: "murasaki · pourpre", couleur: [108, 48, 134], sceau: "契",
      texte: "商家の帳を読み、借財を量り、印の押さるるまで、ゆるがせにせず談判を導く。" }
  ],
  colophon: { debut: "右、一日の事、ことごとく成る。日を連ぬること", fin: "日に及ぶ。", grand: "日課成就", fr: "JOURNÉE BOUCLÉE" },
  fin: { titre: "JOURNÉE ACCOMPLIE", merci: "merci · à demain" }
}, JOURNEE);

/* 日課成就, trait par trait, dans l'ordre japonais (grille 0–10, y vers le bas). Type : t = tome (arrêt), h = hane (crochet),
   p = harai (balayé), d = point ; « c » = courbe lissée (Chaikin) ; après « | », un crochet net. */
const etude_rouleau4_KAN = {
  "日": ["t 2.8 1.5 2.9 9.9", "t 2.9 1.6 7.4 1.4 7.2 9.9", "t 3.0 5.6 7.1 5.4", "t 3.0 9.3 7.1 9.1"],
  "課": ["d 2.0 0.6 2.7 1.4", "t 0.4 2.5 3.9 2.3", "t 1.0 3.8 3.4 3.65", "t 1.0 5.0 3.4 4.85",
         "t 1.1 6.4 1.15 9.6", "t 1.1 6.45 3.5 6.3 3.4 9.3", "t 1.2 9.0 3.4 8.9",
         "t 4.8 1.0 4.85 5.4", "t 4.8 1.05 9.0 0.9 8.9 5.3", "t 4.9 3.2 8.8 3.1", "t 4.9 5.2 8.8 5.1",
         "t 4.4 6.6 9.8 6.4", "t 6.85 1.0 6.85 9.9", "pc 6.7 6.7 6.0 8.0 5.2 9.0 4.3 9.7", "pc 7.0 6.8 7.9 8.0 8.9 8.9 9.9 9.4"],
  "成": ["t 1.6 3.1 9.6 2.85", "pc 1.6 3.2 1.6 6.0 1.3 8.2 0.4 9.9", "h 2.6 5.2 4.6 5.05 4.3 8.3 | 3.5 7.9",
         "hc 5.3 0.8 5.5 3.8 6.1 6.2 7.2 8.0 8.4 9.2 9.3 9.7 | 9.5 7.6", "pc 8.9 4.3 8.1 6.4 6.6 8.3 4.5 9.6", "d 7.0 0.9 7.9 1.7"],
  "就": ["d 2.4 0.5 2.9 1.4", "t 0.4 2.5 5.4 2.3", "t 1.3 3.5 1.35 5.7", "t 1.3 3.55 4.4 3.4 4.3 5.6", "t 1.4 5.45 4.3 5.35",
         "h 2.85 5.6 2.85 9.3 | 2.2 8.8", "pc 1.7 6.9 1.4 8.0 0.6 9.0", "dc 3.8 7.0 4.4 7.7 4.8 8.6",
         "t 5.0 4.3 9.7 4.05", "pc 7.0 0.6 7.0 3.4 6.7 6.4 6.0 8.3 4.9 9.9", "hc 7.9 4.9 7.9 8.6 8.1 9.5 8.8 9.6 9.4 9.6 | 9.75 7.9", "d 8.4 1.4 9.2 2.6"]
};

function etude_rouleau4(){
  const { PI, abs, atan2, ceil, cos, exp, floor, hypot, max, min, pow, round, sign, sin, sqrt } = Math;
  const D = etude_rouleau4_DONNEES, P = D.priorites;
  const lerp = (a, b, u) => a + (b - a) * u;

  /* ---------- la palette : le gris de la table, le washi, l'encre noire franche, les pigments de Yamato-e, l'or ---------- */
  const TABLE = [34, 34, 38], TABLE_OMBRE = [16, 16, 19];
  const WASHI = [213, 210, 202], WASHI_DOS = [198, 194, 185];
  const SUMI = [12, 11, 11];
  const VERMILLON = [196, 36, 26];
  const LAQUE = [26, 21, 20], BOIS = [104, 70, 44], PLANCHER = [172, 134, 90], TATAMI = [184, 174, 114];
  const GUNJO = D.scenes[0].couleur, ROKUSHO = D.scenes[1].couleur, SHU = D.scenes[2].couleur, MURASAKI = D.scenes[3].couleur;
  const GOFUN = [244, 240, 228], OCRE = [184, 132, 58], INDIGO = [30, 36, 78], PIN = [30, 82, 58], PIN_C = [60, 116, 76];
  const OR_SOMBRE = [98, 68, 24], OR_MOYEN = [192, 146, 60], OR_CLAIR = [255, 218, 128], OR_BORD = [92, 64, 22];
  const JP = '"Hiragino Mincho ProN", "Yu Mincho", YuMincho, "Noto Serif CJK JP", "Noto Serif JP", "Source Han Serif JP", serif';
  const SERIF = 'Georgia, "Times New Roman", serif', MONO = 'ui-monospace, Consolas, monospace';

  /* ---------- géométrie du rouleau (en hauteurs de bande) ---------- */
  const L_TITRE = .72, L_SCENE = 1.05, L_COLO = .8, L_TOTAL = L_TITRE + 4 * L_SCENE + L_COLO, LC = .36;
  const R_AXE = .022, EPAISSEUR = .0034;
  const PAS_NUAGE = .024, CELLULE = .042, T_OR = .017;         // T_OR : le côté d'une feuille d'or (2,6 fois plus petite qu'au tour 3)
  const ALPHA = 34 * PI / 180, K_OBL = .6, KX = -K_OBL * cos(ALPHA), KY = K_OBL * sin(ALPHA);
  const DUREE = 2300;
  const LW = .0034;

  /* ---------- le seuil : son temps (ms après Boucler) et sa géométrie ---------- */
  const TS = { deroule: 900, zoom0: 150, zoom1: 1450, vie: 450, envol: 1650, envolPas: 135, envolDur: 1150, vol0: 3250, vol1: 5000,
    soleil: 3850, monts: 4050, eau: 4350, brume: 4400, pav: 4650, marche: 5000, feuilleP: 4800, calli0: 5750, calli1: 8250, sceau: 8300, legende: 8800 };
  const RHO = .62, PAS_H = 1.1, ZH0 = .35, ZF = 6, DP = 1.2, MONT = .045;
  const SIGMA_C = (L_TOTAL - LC) / 2;
  const Z_FIN = ZH0 + (L_TOTAL + LC) * PAS_H / (2 * PI * RHO) + 1, ZC_FIN = Z_FIN - .5, ZP = ZC_FIN + DP;

  const M = { titre: "LE ROULEAU", bouton: libelleGeste(0), ligne: ligneGeste(0), dprMax: 1.5 };
  let W = 390, H = 520, DPR = 1, seed = 11, echelle = 0;
  let Hl = 300, bandY = 100, Hfull = 60, F = 360;
  let secs = {}, couverture = null, chantier = null, chantierP = null, PN = null, echelleP = 0;
  let ordre = [], tRev = [null, null, null, null], tS = null, Seuil = { U: 0, cam: 0 }, aFiger = [];
  let Uan = { de: L_TITRE, a: L_TITRE, t: null }, Cam = { de: 0, a: 0, t: null, x: 0 };
  let lumDx = 0, lumDy = 0, eclat = {}, etiquette = null, dernierGeste = -1e9, rects = [], tPrec = null;
  const PAN = { A: .9, x: 0, y: 0, w: 300, h: 330, cy: 260 };
  let feuilles = [], paillettes = [], nbF = 0, nbFT = 0, nbP = 0, nbFP = 0, onde = null;
  /* =================================== outils de dessin (unités : hauteur de bande) =================================== */
  const vue = (ox, oy) => (X, Y, Z = 0) => [ox + X + Y * KX, oy - Z - Y * KY];   // la projection oblique du fukinuki yatai

  function trace(c, pts, fond, lw = LW, ferme = true, encre = SUMI){
    c.beginPath();
    c.moveTo(pts[0][0], pts[0][1]);
    for (let k = 1; k < pts.length; k++) c.lineTo(pts[k][0], pts[k][1]);
    if (ferme) c.closePath();
    if (fond){ c.fillStyle = rgb(fond); c.fill(); }
    if (lw){ c.lineWidth = lw; c.strokeStyle = rgb(encre); c.lineJoin = "round"; c.stroke(); }
  }
  const face = (c, p, a, b, cc, d, fond, lw) => trace(c, [p(...a), p(...b), p(...cc), p(...d)], fond, lw);
  function poteau(c, p, X, Y, z0, z1, coul, larg){
    const a = p(X, Y, z0), b = p(X, Y, z1);
    trace(c, [[a[0] - larg / 2, a[1]], [a[0] + larg / 2, a[1]], [b[0] + larg / 2, b[1]], [b[0] - larg / 2, b[1]]], coul, .0022);
  }
  function ellipse(c, x, y, rx, ry, fond, lw = LW){
    c.beginPath(); c.ellipse(x, y, rx, ry, 0, 0, PI * 2);
    if (fond){ c.fillStyle = rgb(fond); c.fill(); }
    if (lw){ c.lineWidth = lw; c.strokeStyle = rgb(SUMI); c.stroke(); }
  }
  function etoile(c, x, y, r, coul, rot){
    c.beginPath();
    for (let k = 0; k < 10; k++){ const a = -PI / 2 + rot + k * PI / 5, q = k % 2 ? r * .42 : r; c.lineTo(x + q * cos(a), y + q * sin(a)); }
    c.closePath(); c.fillStyle = rgb(coul); c.fill();
    c.lineWidth = .0012; c.strokeStyle = rgb(mix(coul, SUMI, .6)); c.stroke();
  }
  function roundRect(path, x0, y0, x1, y1, r){
    r = min(r, (x1 - x0) / 2, (y1 - y0) / 2);
    path.moveTo(x0 + r, y0);
    path.arcTo(x1, y0, x1, y1, r); path.arcTo(x1, y1, x0, y1, r);
    path.arcTo(x0, y1, x0, y0, r); path.arcTo(x0, y0, x1, y0, r);
    path.closePath();
  }
  function fbm(R){   // bruit fractal à 5 octaves, étiré sur [0, 1]
    const b = bruit1(floor(R() * 1e9));
    return x => { let s = 0, a = .5, f = 1, n = 0;
      for (let o = 0; o < 5; o++){ s += a * b(x * f + o * 31.7); n += a; a *= .5; f *= 2.03; }
      return clamp((s / n - .5) * 2.4 + .5); };
  }
  function kanji(n){
    const C = "〇一二三四五六七八九"; if (n < 10) return C[n];
    const d = floor(n / 10), u = n % 10; return (d > 1 ? C[d] : "") + "十" + (u ? C[u] : "");
  }
  function espace(c, txt, x, y, ls){   // capitales espacées, centrées (la typographie de La Voûte)
    const ch = [...txt], ws = ch.map(k => c.measureText(k).width), tot = ws.reduce((a, b) => a + b, 0) + ls * (ch.length - 1);
    let px = x - tot / 2; const al = c.textAlign; c.textAlign = "left";
    ch.forEach((k, i) => { c.fillText(k, px, y); px += ws[i] + ls; }); c.textAlign = al;
  }

  /* ---------- la justification des colonnes (JIS X 4051, simplifiée) ---------- */
  const PAS_DEBUT = "、。，．・：；？！ゝゞ々ぁぃぅぇぉっゃゅょゎァィゥェォッャュョ）」』";
  const PAS_FIN = "（「『";
  function colonnes(texte, hautCol, fs, pas){
    const c = [...texte], cols = []; let i = 0, oikomi = 0, oidashi = 0;
    const cap = floor((hautCol - fs) / pas) + 1;
    const ecart = k => k < 2 ? 9 : abs((hautCol - fs) / (k - 1) - pas) / pas;
    while (i < c.length){
      let k = min(cap, c.length - i);
      if (i + k < c.length){
        const suivant = c[i + k];
        if (PAS_DEBUT.includes(suivant)){
          // oikomi : on fait entrer le signe en serrant ; oidashi : on chasse le dernier signe à la colonne suivante
          const kIn = k + 1, kOut = (PAS_DEBUT.includes(c[i + k - 1]) ? k - 2 : k - 1);
          if (ecart(kIn) * .8 <= ecart(kOut)){ k = kIn; oikomi++; } else { k = kOut; oidashi++; }
        } else if (PAS_FIN.includes(c[i + k - 1])){ k -= 1; oidashi++; }
      }
      cols.push({ signes: c.slice(i, i + k), justifiee: i + k < c.length });
      i += k;
    }
    cols.forEach(col => { const n = col.signes.length; col.pas = col.justifiee && n > 1 ? (hautCol - fs) / (n - 1) : pas; });
    return { cols, oikomi, oidashi };
  }
  function ecrireColonnes(c, s, mise, xDroite, haut, fs, ecartCol, encre = SUMI){
    c.save(); c.setTransform(1, 0, 0, 1, 0, 0);
    c.font = `600 ${fs * s}px ${JP}`; c.textAlign = "center"; c.textBaseline = "middle"; c.fillStyle = rgb(encre);
    mise.cols.forEach((col, j) => {
      const x = (xDroite - j * ecartCol) * s;
      col.signes.forEach((ch, k) => {
        let y = (haut + fs / 2 + k * col.pas) * s, dx = 0;
        if ("、。".includes(ch)){ dx = fs * .56 * s; y -= fs * .56 * s; }   // en tategaki, la ponctuation monte en haut à droite
        c.fillText(ch, x + dx, y);
      });
    });
    c.restore();
  }

  /* =================================== le papier ===================================  */
  function papier(c, L, R, s, wpx, hpx){
    const v = (R() - .5) * 6;
    c.fillStyle = rgb([WASHI[0] + v, WASHI[1] + v, WASHI[2] + v - 1]); c.fillRect(0, 0, L, 1);
    // vergeures du tamis de bambou (sugeta) : lignes horizontales fines, et lignes de chaîne
    c.lineWidth = .0012;
    for (let y = .006; y < 1; y += .0105){ c.strokeStyle = `rgba(120,116,106,${.05 + R() * .03})`; c.beginPath(); c.moveTo(0, y); c.lineTo(L, y); c.stroke(); }
    c.lineWidth = .0018;
    for (let x = .04 + R() * .05; x < L; x += .088){ c.strokeStyle = "rgba(120,116,106,.06)"; c.beginPath(); c.moveTo(x, 0); c.lineTo(x, 1); c.stroke(); }
    // fibres de kōzo : longues, souples, plus claires ou plus sombres que la pâte
    for (let k = 0; k < 260 * L; k++){
      const x = R() * L, y = R(), l = .03 + R() * .12, a = R() * PI * 2, b = (R() - .5) * 1.2;
      c.strokeStyle = R() < .6 ? `rgba(250,248,240,${.25 + R() * .3})` : `rgba(140,134,122,${.12 + R() * .14})`;
      c.lineWidth = .0008 + R() * .0018;
      c.beginPath(); c.moveTo(x, y);
      c.quadraticCurveTo(x + cos(a + b) * l * .5, y + sin(a + b) * l * .5, x + cos(a) * l, y + sin(a) * l); c.stroke();
    }
    c.save(); c.setTransform(1, 0, 0, 1, 0, 0);
    c.globalCompositeOperation = "multiply"; c.globalAlpha = .07; c.fillStyle = c.createPattern(GRAIN, "repeat");
    c.fillRect(0, 0, wpx, hpx); c.restore();
    // jointure de feuille (tsugime) à droite, et les deux lisières
    c.fillStyle = "rgba(110,104,92,.13)"; c.fillRect(L - .009, 0, .009, 1);
    c.fillStyle = "rgba(90,86,78,.35)"; c.fillRect(L - .0012, 0, .0012, 1);
    c.fillStyle = "rgba(90,86,78,.3)"; c.fillRect(0, 0, L, .003); c.fillRect(0, .997, L, .003);
  }


  /* =================================== les nuages d'or =================================== */
  const Qn = v => round(v / PAS_NUAGE) * PAS_NUAGE;
  function nuages(S, R){
    const L = S.L, n = max(4, round(L / CELLULE)), cw = L / n;
    const fa = fbm(R), fb = fbm(R), fc = fbm(R), fd = fbm(R), fe = fbm(R);
    const garde = S.garde || [];
    const garde_ = u => garde.some(g => u > g[0] - .015 && u < g[1] + .015);
    const couches = [[], [], [], []];
    for (let i = 0; i < n; i++){
      const uc = (i + .5) * cw, d = min(uc, L - uc), w = lisse((d - .03) / .17), gd = garde_(uc);
      let e = Qn(lerp(.14, .05 + .2 * fa(uc * 1.9 + S.k * 7), w)); if (gd) e = min(e, .17);
      couches[0].push([-.06, e]);
      const b2 = fb(uc * 2.3 + S.k * 5);
      couches[1].push(!gd && w > .6 && b2 > .56 ? [e + PAS_NUAGE, e + PAS_NUAGE + Qn(.03 + .07 * (b2 - .56) / .44)] : null);
      let f = Qn(lerp(.86, .95 - .19 * fc(uc * 1.7 + S.k * 3), w)); if (gd) f = max(f, .8);
      couches[2].push([f, 1.06]);
      const b4 = fd(uc * 2.1 + S.k * 9);
      couches[3].push(!gd && w > .6 && b4 > .58 ? [f - PAS_NUAGE - Qn(.03 + .06 * (b4 - .58) / .42), f - PAS_NUAGE] : null);
    }
    const rects = [], r = .012;
    const runs = col => { let i = 0;
      while (i < n){ if (!col[i]){ i++; continue; }
        let j = i; while (j + 1 < n && col[j + 1] && col[j + 1][0] === col[i][0] && col[j + 1][1] === col[i][1]) j++;
        const u0 = i === 0 ? -.06 : i * cw - r, u1 = j === n - 1 ? L + .06 : (j + 1) * cw + r;
        rects.push([u0, col[i][0], u1, col[i][1]]); i = j + 1; } };
    couches.forEach(runs);
    (S.brumes || []).forEach(([u0, u1, vc, ep]) => {
      const i0 = max(0, floor(u0 / cw)), i1 = min(n - 1, floor(u1 / cw)), col = Array(n).fill(null);
      for (let i = i0; i <= i1; i++){
        const uc = (i + .5) * cw, t = Qn(ep * (.5 + 1.1 * fe(uc * 3.1 + vc * 10))), c0 = Qn(vc + .05 * (fd(uc * 1.3 + 4) - .5));
        if (t > 0) col[i] = [c0 - t / 2, c0 + t / 2];
      }
      runs(col);
    });
    // les piliers de brume aux jointures : niveaux communs, pour que deux feuilles se raccordent toujours
    if (!S.panneau) rects.push([-.06, .364, .075, .42], [-.06, .56, .047, .616], [L - .075, .364, L + .06, .42], [L - .047, .56, L + .06, .616]);
    const chemin = new Path2D();
    rects.forEach(q => roundRect(chemin, q[0], q[1], q[2], q[3], r));
    S.nuages = chemin; S.rectsNuages = rects;
  }
  function contourNuages(c, S){
    c.lineWidth = .007; c.strokeStyle = rgb(OR_BORD);
    S.rectsNuages.forEach(q => { const p = new Path2D(); roundRect(p, q[0], q[1], q[2], q[3], .012); c.stroke(p); });
  }
  /* la brume (kasumi) : bandes blanches aux bords quantifiés par le même bruit, posées par une scène, animées au seuil */
  function kasumi(R, bandes){
    const out = [], f = fbm(R), g = fbm(R);
    bandes.forEach(([u0, u1, vc, ep], b) => {
      for (let u = u0; u < u1 - .001; u += CELLULE){
        const t = Qn(ep * (.6 + .9 * f(u * 3 + b * 7))), c0 = vc + Qn(.03 * (g(u * 2.2 + b) - .5));
        out.push([u - .008, c0 - t / 2, u + CELLULE + .008, c0 + t / 2]);
      }
    });
    return out;
  }
  function peindreKasumi(c, rects, dv, al){   // le contour de l'union d'abord (trait large), puis le blanc par-dessus : un seul bord net
    if (al <= 0) return;
    const p = new Path2D(); rects.forEach(q => roundRect(p, q[0], q[1] + dv, q[2], q[3] + dv, .012));
    c.save(); c.globalAlpha = al;
    c.lineWidth = .006; c.strokeStyle = rgb(mix(WASHI, SUMI, .3)); c.stroke(p);
    c.fillStyle = rgb(mix(GOFUN, WASHI, .12)); c.fill(p);
    c.restore();
  }

  /* l'or en feuilles (kinpaku) : petites feuilles carrées en appareil décalé (une rangée sur deux décalée d'une demi-feuille),
     chacune deux pixels d'une petite image ; normale froissée et teinte propres ; la couleur est calculée à chaque image. */
  function feuillesOr(S, R){
    const nx = ceil(S.L / T_OR) + 1, ny = ceil(1 / T_OR), pw = nx * 2 + 2, cv = document.createElement("canvas");
    cv.width = pw; cv.height = ny;
    const cx = cv.getContext("2d"), img = cx.createImageData(pw, ny);
    const rs = S.rectsNuages;
    const dans = (u, v) => { for (let k = 0; k < rs.length; k++){ const q = rs[k]; if (u >= q[0] && u <= q[2] && v >= q[1] && v <= q[3]) return true; } return false; };
    const b2 = bruit2(floor(R() * 1e6));
    const cu = [], cvv = [], p0 = [], lig = [], ii = [], nrm = [], teinte = [];
    for (let j = 0; j < ny; j++){
      const o = j % 2 ? .5 : 0;
      for (let i = 0; i < nx; i++){
        const uc = (i - o + .5) * T_OR, vc = (j + .5) * T_OR;
        if (!dans(uc, vc)) continue;
        cu.push(uc); cvv.push(vc); p0.push(2 * i + (o ? 0 : 1)); lig.push(j); ii.push(i);
        const ax = .22 * (b2(i * .16, j * .16) - .5) + .05 * (R() - .5), ay = .22 * (b2(i * .16 + 40, j * .16 + 17) - .5) + .05 * (R() - .5), l = hypot(ax, ay, 1);
        nrm.push(ax / l, ay / l, 1 / l);
        teinte.push((R() - .5) * 2);
        const p = (j * pw + p0[p0.length - 1]) * 4; img.data[p + 3] = 255; img.data[p + 7] = 255;
      }
    }
    const joints = new Path2D();   // les jointures entre feuilles : rangées pleines, montants décalés
    for (let j = 1; j < ny; j++){ joints.moveTo(-T_OR, j * T_OR); joints.lineTo(S.L + T_OR, j * T_OR); }
    for (let j = 0; j < ny; j++){ const o = j % 2 ? .5 : 0;
      for (let i = 0; i <= nx; i++){ const u = (i - o) * T_OR; joints.moveTo(u, j * T_OR); joints.lineTo(u, (j + 1) * T_OR); } }
    S.or = { nx, ny, pw, cv, cx, img, n: cu.length, cu: Float32Array.from(cu), cv_: Float32Array.from(cvv), p0: Int32Array.from(p0),
      lig: Int32Array.from(lig), ii: Int32Array.from(ii), nrm: Float32Array.from(nrm), teinte: Float32Array.from(teinte), joints };
  }
  const Lum = { x: 0, y: 0 };
  function dorer(ctx, S, Rr, boost, onde_, Lx){
    const G = S.or; if (!G) return;
    const k = Rr.h, d = G.img.data, nrm = G.nrm, VW = Lx ? Lx.W : W, VH = Lx ? Lx.H : H;
    const lxp = Lx ? Lx.x : Lum.x, lyp = Lx ? Lx.y : Lum.y, ez = 1.7 * max(VW, VH), lz = .9 * max(VW, VH);
    for (let q = 0; q < G.n; q++){
      const p = (G.lig[q] * G.pw + G.p0[q]) * 4;
      if (!d[p + 3]) continue;
      const px = Rr.x + G.cu[q] * k, py = Rr.y + G.cv_[q] * k;
      let lx = lxp - px, ly = lyp - py, l = 1 / hypot(lx, ly, lz); lx *= l; ly *= l; const lzn = lz * l;
      let vx = VW / 2 - px, vy = VH / 2 - py, v = 1 / hypot(vx, vy, ez); vx *= v; vy *= v; const vzn = ez * v;
      let hx = lx + vx, hy = ly + vy, hz = lzn + vzn, hh = 1 / hypot(hx, hy, hz); hx *= hh; hy *= hh; hz *= hh;
      const n0 = nrm[q * 3], n1 = nrm[q * 3 + 1], n2 = nrm[q * 3 + 2];
      const nl = max(0, n0 * lx + n1 * ly + n2 * lzn), nh = max(0, n0 * hx + n1 * hy + n2 * hz);
      const w = onde_ ? onde_(G.cu[q], G.cv_[q]) : 0, b = boost + w, te = G.teinte[q];
      const sp = min(.9, (pow(nh, 48) * .42 + pow(nh, 320) * .8) * b) * .8, lum = (.3 + .7 * nl) * (.86 + .12 * (b - 1));
      const r = min(255, OR_SOMBRE[0] + (OR_MOYEN[0] - OR_SOMBRE[0]) * lum + OR_CLAIR[0] * sp + 40 * w + 6 * te);
      const g = min(255, OR_SOMBRE[1] + (OR_MOYEN[1] - OR_SOMBRE[1]) * lum + OR_CLAIR[1] * sp + 6 * w + 3 * te);
      const bl = max(0, min(255, OR_SOMBRE[2] + (OR_MOYEN[2] - OR_SOMBRE[2]) * lum + OR_CLAIR[2] * sp - 18 * w - 4 * te));
      d[p] = d[p + 4] = r; d[p + 1] = d[p + 5] = g; d[p + 2] = d[p + 6] = bl;
    }
    G.cx.putImageData(G.img, 0, 0);
    ctx.save();
    ctx.beginPath(); ctx.rect(Rr.x, Rr.y, Rr.w, Rr.h); ctx.clip();
    ctx.translate(Rr.x, Rr.y); ctx.scale(k, k); ctx.clip(S.nuages);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(G.cv, -T_OR / 2, 0, G.pw * T_OR / 2, G.ny * T_OR);
    ctx.imageSmoothingEnabled = true;
    ctx.lineWidth = max(.5 / k, .0011); ctx.strokeStyle = "rgba(112,78,26,.36)"; ctx.stroke(G.joints);
    ctx.restore();
  }
  /* une feuille d'or se détache du nuage : on l'ôte de l'image (et de la feuille figée, où le papier reparaît) */
  function detacher(S, q){
    const G = S.or, p = (G.lig[q] * G.pw + G.p0[q]) * 4; G.img.data[p + 3] = G.img.data[p + 7] = 0;
    if (S.figee){ const h = S.cv.height, x = (G.cu[q] - T_OR / 2) * h - .5, y = (G.cv_[q] - T_OR / 2) * h - .5, s = T_OR * h + 1;
      S.fige.getContext("2d").drawImage(S.cv, x, y, s, s, x, y, s, s); }
  }
  /* =================================== les motifs de la scène =================================== */
  function mont(c, prof, base, corps, crete, R){
    const chemin = () => { c.beginPath(); c.moveTo(prof[0][0], prof[0][1]);
      for (let k = 1; k < prof.length - 1; k++) c.quadraticCurveTo(prof[k][0], prof[k][1], (prof[k][0] + prof[k + 1][0]) / 2, (prof[k][1] + prof[k + 1][1]) / 2);
      c.lineTo(prof[prof.length - 1][0], prof[prof.length - 1][1]); };
    chemin(); c.lineTo(prof[prof.length - 1][0], base); c.lineTo(prof[0][0], base); c.closePath();
    c.fillStyle = rgb(corps); c.fill();
    c.save(); c.clip();
    chemin(); c.lineWidth = .06; c.strokeStyle = rgb(mix(corps, crete, .55)); c.stroke();   // la crête en paliers : trois aplats
    chemin(); c.lineWidth = .028; c.strokeStyle = rgb(crete); c.stroke();
    c.restore();
    chemin(); c.lineWidth = LW; c.strokeStyle = rgb(SUMI); c.stroke();
    for (let k = 1; k < prof.length - 1; k++){   // points de mousse (tenten), ronds nets
      for (let m = 0; m < 3; m++){ c.beginPath(); c.arc(prof[k][0] + (R() - .5) * .05, prof[k][1] + .012 + R() * .02, .0045, 0, PI * 2); c.fillStyle = rgb(SUMI); c.fill(); }
    }
  }
  function eau(c, bord, bas, coul){
    c.beginPath(); c.moveTo(bord[0][0], bord[0][1]); bord.forEach(q => c.lineTo(q[0], q[1]));
    c.lineTo(bord[bord.length - 1][0], bas); c.lineTo(bord[0][0], bas); c.closePath();
    c.fillStyle = rgb(coul); c.fill();
    c.save(); c.clip();
    const R0 = .034, top = min(...bord.map(q => q[1])) - .02;
    let rang = 0;
    for (let y = top; y < bas + R0; y += R0 * .45, rang++){   // seigaiha : vagues en éventails, traits nets
      for (let x = bord[0][0] - R0 + (rang % 2) * R0; x < bord[bord.length - 1][0] + R0; x += R0 * 2){
        c.beginPath(); c.arc(x, y, R0, PI, PI * 2); c.closePath(); c.fillStyle = rgb(coul); c.fill();
        c.lineWidth = .0028;
        [1, .74, .5, .26].forEach((f, m) => { c.beginPath(); c.arc(x, y, R0 * f, PI, PI * 2);
          c.strokeStyle = m === 0 ? rgb(mix(coul, SUMI, .4)) : rgb(mix(coul, GOFUN, .48)); c.stroke(); });
      }
    }
    c.restore();
  }
  function rive(c, bord){
    c.beginPath(); bord.forEach((q, k) => k ? c.lineTo(q[0], q[1]) : c.moveTo(q[0], q[1]));
    c.lineWidth = .02; c.strokeStyle = rgb(mix(ROKUSHO, WASHI, .25)); c.stroke();
    c.lineWidth = LW; c.strokeStyle = rgb(SUMI); c.stroke();
  }
  function pin(c, x, y, h, R, f = 1){
    const tronc = [[x, y]]; let px = x, py = y;
    for (let k = 1; k <= 4; k++){ px += f * h * (.05 + .07 * (R() - .35)); py -= h * .2; tronc.push([px, py]); }
    c.lineCap = "round"; c.lineJoin = "round";
    const ligne = (pts, lw, coul) => { c.beginPath(); pts.forEach((q, k) => k ? c.lineTo(q[0], q[1]) : c.moveTo(q[0], q[1])); c.lineWidth = lw; c.strokeStyle = rgb(coul); c.stroke(); };
    ligne(tronc, h * .075, SUMI); ligne(tronc, h * .05, BOIS);
    const touffes = [];
    for (let k = 2; k <= 4; k++){ const [tx, ty] = tronc[k], cote = (k % 2 ? 1 : -1) * f, bx = tx + cote * h * (.14 + .08 * R()), by = ty + h * .03;
      ligne([[tx, ty], [bx, by]], h * .045, SUMI); ligne([[tx, ty], [bx, by]], h * .026, BOIS);
      touffes.push([bx, by - h * .02, h * (.15 + .06 * R()), h * .055]); }
    touffes.push([px, py - h * .03, h * .19, h * .06]);
    touffes.forEach(([tx, ty, rx, ry]) => {
      ellipse(c, tx, ty, rx, ry, PIN, 0);
      c.save(); c.beginPath(); c.ellipse(tx, ty, rx, ry, 0, 0, PI * 2); c.clip();
      ellipse(c, tx, ty - ry * .75, rx * .92, ry * .7, PIN_C, 0); c.restore();
      ellipse(c, tx, ty, rx, ry, null, LW * .9);
      c.lineWidth = .0016; c.strokeStyle = rgb(SUMI);
      for (let a = PI * 1.08; a < PI * 1.92; a += .16){ const ex = tx + rx * cos(a), ey = ty + ry * sin(a);   // aiguilles nettes
        c.beginPath(); c.moveTo(ex, ey); c.lineTo(ex + cos(a) * ry * .45, ey + sin(a) * ry * .6); c.stroke(); }
    });
    c.lineCap = "butt";
  }
  function erable(c, x, y, h, R, nb){
    const tronc = [[x, y], [x + h * .03, y - h * .3], [x - h * .02, y - h * .55], [x + h * .02, y - h * .72]];
    c.lineCap = "round";
    [[h * .06, SUMI], [h * .038, [70, 44, 36]]].forEach(([lw, coul]) => { c.beginPath(); tronc.forEach((q, k) => k ? c.lineTo(q[0], q[1]) : c.moveTo(q[0], q[1])); c.lineWidth = lw; c.strokeStyle = rgb(coul); c.stroke(); });
    [[-1, .45], [1, .6], [-1, .7]].forEach(([s, t]) => { const by = y - h * t; c.beginPath(); c.moveTo(x, by); c.lineTo(x + s * h * .22, by - h * .1); c.lineWidth = h * .022; c.strokeStyle = rgb(SUMI); c.stroke(); });
    c.lineCap = "butt";
    const cols = [SHU, [226, 98, 38], [172, 32, 26], [236, 140, 48]];
    for (let k = 0; k < nb; k++){ const a = R() * PI * 2, q = sqrt(R());
      etoile(c, x + cos(a) * q * h * .36, y - h * .66 + sin(a) * q * h * .26, h * (.026 + R() * .014), cols[(R() * cols.length) | 0], R() * PI); }
  }
  function oiseaux(c, pts){
    c.lineWidth = .0028; c.strokeStyle = rgb(SUMI);
    pts.forEach(([x, y, e]) => { c.beginPath(); c.moveTo(x - e, y - e * .3); c.quadraticCurveTo(x - e * .4, y - e * .5, x, y); c.quadraticCurveTo(x + e * .4, y - e * .5, x + e, y - e * .3); c.stroke(); });
  }
  function torii(c, x, y, s){
    trace(c, [[x - s * .38, y], [x - s * .3, y], [x - s * .28, y - s * .8], [x - s * .36, y - s * .8]], SHU, .0022);
    trace(c, [[x + s * .38, y], [x + s * .3, y], [x + s * .28, y - s * .8], [x + s * .36, y - s * .8]], SHU, .0022);
    trace(c, [[x - s * .44, y - s * .62], [x + s * .44, y - s * .62], [x + s * .44, y - s * .55], [x - s * .44, y - s * .55]], SHU, .0022);
    trace(c, [[x - s * .58, y - s * .86], [x + s * .58, y - s * .86], [x + s * .5, y - s * .78], [x - s * .5, y - s * .78]], SHU, .0022);
    trace(c, [[x - s * .62, y - s * .96], [x, y - s * .9], [x + s * .62, y - s * .96], [x + s * .58, y - s * .88], [x - s * .58, y - s * .88]], LAQUE, .0022);
  }
  /* un personnage assis, à la manière de Heian : les robes superposées (kasane), les cheveux longs, le visage blanc */
  function personnage(c, x, y, s, robe, f = 1, objet){
    c.save(); c.translate(x, y); c.scale(f * s, s);
    const lw = LW / s;
    for (let k = 0; k < 3; k++){ const e = k * .07;
      c.beginPath(); c.moveTo(-.58 + e, 0);
      c.bezierCurveTo(-.62 + e, -.36, -.36 + e * .4, -.62, -.12, -.66);
      c.lineTo(.16, -.64); c.bezierCurveTo(.44, -.55, .66 - e, -.26, .62 - e, 0); c.closePath();
      c.fillStyle = rgb(robe[k]); c.fill(); c.lineWidth = lw; c.strokeStyle = rgb(SUMI); c.stroke(); }
    trace(c, [[-.12, -.56], [-.6, -.34], [-.6, -.2], [-.08, -.3]], robe[0], lw);           // la manche, en avant
    c.beginPath(); c.moveTo(.0, -.92); c.bezierCurveTo(.3, -.86, .32, -.4, .5, -.04); c.lineTo(.36, -.02);   // les cheveux
    c.bezierCurveTo(.2, -.4, .12, -.7, -.04, -.74); c.closePath(); c.fillStyle = rgb(SUMI); c.fill();
    ellipse(c, -.06, -.8, .11, .13, GOFUN, lw);
    c.beginPath(); c.arc(-.03, -.84, .13, PI * 1.05, PI * 2.1); c.lineTo(.08, -.7); c.closePath(); c.fillStyle = rgb(SUMI); c.fill();
    c.lineWidth = lw * .8; c.beginPath(); c.moveTo(-.13, -.8); c.lineTo(-.08, -.8); c.stroke();             // hikime : l'œil d'un trait
    if (objet === "livre"){ trace(c, [[-.74, -.26], [-.5, -.3], [-.5, -.16], [-.74, -.12]], GOFUN, lw);
      c.lineWidth = lw * .6; for (let k = 0; k < 3; k++){ c.beginPath(); c.moveTo(-.7 + k * .06, -.25); c.lineTo(-.7 + k * .06, -.16); c.stroke(); } }
    if (objet === "pinceau"){ c.lineWidth = lw * 1.6; c.beginPath(); c.moveTo(-.58, -.28); c.lineTo(-.72, -.08); c.stroke(); }
    c.restore();
  }
  function marcheur(c, x, y, s, robe){
    c.save(); c.translate(x, y); c.scale(s, s); const lw = LW / s;
    c.lineWidth = lw * 1.4; c.strokeStyle = rgb(BOIS); c.beginPath(); c.moveTo(-.34, -.9); c.lineTo(-.42, 0); c.stroke();   // le bâton
    trace(c, [[-.26, 0], [.28, 0], [.16, -.72], [-.14, -.72]], robe[0], lw);
    trace(c, [[-.18, -.02], [.06, -.02], [.02, -.6], [-.1, -.6]], robe[1], lw);
    trace(c, [[-.12, -.66], [-.38, -.5], [-.34, -.42], [-.06, -.54]], robe[0], lw);
    ellipse(c, 0, -.82, .1, .12, GOFUN, lw);
    trace(c, [[-.08, -.9], [.1, -.9], [.06, -1.18], [-.06, -1.12]], SUMI, lw);                              // l'eboshi
    c.restore();
  }
  function tatami(c, p, x, y, w, d, z){
    const nr = max(1, round(d / .07)), pr = d / nr;
    for (let r = 0; r < nr; r++){
      const Y0 = y + r * pr, dec = r % 2 ? .07 : 0;
      for (let X = x - dec; X < x + w - .001; X += .14){
        const a = max(x, X), b = min(x + w, X + .14); if (b - a < .01) continue;
        face(c, p, [a, Y0, z], [b, Y0, z], [b, Y0 + pr, z], [a, Y0 + pr, z], mix(TATAMI, WASHI, (r * 7 + X * 31) % 1 * .15), .0034);
      }
    }
  }
  function panneau(c, p, A, B, h, fond, motif){
    const a = p(...A), b = p(...B), q = [a, b, [b[0], b[1] - h], [a[0], a[1] - h]];
    trace(c, q, fond, 0);
    c.save(); c.beginPath(); q.forEach((r, k) => k ? c.lineTo(r[0], r[1]) : c.moveTo(r[0], r[1])); c.closePath(); c.clip();
    c.transform(b[0] - a[0], b[1] - a[1], 0, -h, a[0], a[1]);   // le plan du panneau devient le carré unité (v vers le haut)
    if (motif) motif(c);
    c.restore();
    trace(c, q, null, .0026);
    const hx = a[0] + (b[0] - a[0]) * .82, hy = a[1] + (b[1] - a[1]) * .82 - h * .45;
    ellipse(c, hx, hy, .004, .006, SUMI, 0);
  }
  const MOTIFS = {
    vagues: c => { c.fillStyle = rgb(GUNJO); c.beginPath(); c.moveTo(0, 0); for (let u = 0; u <= 1.01; u += .1) c.lineTo(u, .26 + .06 * sin(u * 12)); c.lineTo(1, 0); c.fill(); c.fillStyle = rgb(OR_MOYEN); c.beginPath(); c.arc(.3, .72, .1, 0, PI * 2); c.fill(); },
    monts: c => { c.fillStyle = rgb(ROKUSHO); c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(.3, .9, .55, .3); c.quadraticCurveTo(.75, .7, 1, .2); c.lineTo(1, 0); c.fill(); },
    erables: c => { for (let k = 0; k < 6; k++){ c.fillStyle = rgb(k % 2 ? SHU : [226, 110, 40]); c.beginPath(); c.arc(.15 + (k * .37) % .8, .3 + (k * .23) % .5, .07, 0, PI * 2); c.fill(); } },
    nuees: c => { c.fillStyle = rgb(OR_MOYEN); [[.0, .62, .7, .74], [.3, .3, 1, .4], [.1, .06, .6, .14]].forEach(([u0, v0, u1, v1]) => c.fillRect(u0, v0, u1 - u0, v1 - v0)); }
  };
  /* le pavillon en fukinuki yatai : toit ôté, vue plongeante, projection oblique (la loi 2) ; rend la fonction qui peint l'avant */
  function pavillon(c, p, o){
    const { x, y, w, d, z, h } = o, X1 = x + w, Y1 = y + d, ep = .022;
    const bois = o.bois || PLANCHER, pil = o.pilier || [66, 48, 36];
    if (o.pilotis !== undefined){
      for (let k = 4; k >= 0; k--) poteau(c, p, x, y + d * k / 4, o.pilotis, z - ep, pil, .009);
      for (let k = 1; k <= 5; k++) poteau(c, p, x + w * k / 5, y, o.pilotis, z - ep, pil, .009);
    }
    face(c, p, [x, y, z], [x, Y1, z], [x, Y1, z - ep], [x, y, z - ep], mix(bois, SUMI, .45));
    face(c, p, [x, y, z], [X1, y, z], [X1, y, z - ep], [x, y, z - ep], mix(bois, SUMI, .28));
    face(c, p, [x, y, z], [X1, y, z], [X1, Y1, z], [x, Y1, z], bois);
    c.lineWidth = .0016; c.strokeStyle = rgb(mix(bois, SUMI, .5));
    const np = max(2, round(d / .03));
    for (let k = 1; k < np; k++){ const a = p(x, y + d * k / np, z), b = p(X1, y + d * k / np, z); c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke(); }
    if (o.tatami) tatami(c, p, x + .045, y + .06, w - .09, d - .06, z);
    // le mur du fond et le mur de droite, peints (fusuma), vus de l'intérieur
    const nP = max(2, round(w / .085)), mur = o.mur || mix(WASHI, GOFUN, .4), motif = MOTIFS[o.motif];
    for (let k = 0; k < nP; k++) panneau(c, p, [x + w * k / nP, Y1, z], [x + w * (k + 1) / nP, Y1, z], h, mur, o.motifs ? MOTIFS[o.motifs[k % o.motifs.length]] : motif);
    const nQ = max(2, round(d / .1));
    for (let k = nQ - 1; k >= 0; k--) panneau(c, p, [X1, y + d * (k + 1) / nQ, z], [X1, y + d * k / nQ, z], h, mix(mur, SUMI, .1), motif);
    poteau(c, p, x, Y1, z, z + h, pil, .011); poteau(c, p, X1, Y1, z, z + h, pil, .011);
    face(c, p, [x, Y1, z + h], [X1, Y1, z + h], [X1, Y1, z + h - .012], [x, Y1, z + h - .012], pil, .002);
    face(c, p, [X1, y, z + h], [X1, Y1, z + h], [X1, Y1, z + h - .012], [X1, y, z + h - .012], pil, .002);
    const c0 = c;
    return cc => {   // l'avant (piliers, rampes) : sur la même toile, ou sur une autre
      const c = cc || c0;
      if (o.rampe){
        const rail = (A, B) => { const n = max(2, round(hypot(B[0] - A[0], B[1] - A[1]) / .05));
          for (let k = 0; k <= n; k++) poteau(c, p, lerp(A[0], B[0], k / n), lerp(A[1], B[1], k / n), z, z + .045, o.rampe, .006);
          face(c, p, [A[0], A[1], z + .045], [B[0], B[1], z + .045], [B[0], B[1], z + .037], [A[0], A[1], z + .037], o.rampe, .0018);
          face(c, p, [A[0], A[1], z + .022], [B[0], B[1], z + .022], [B[0], B[1], z + .016], [A[0], A[1], z + .016], o.rampe, .0018); };
        rail([x, Y1], [x, y]); rail([x, y], [X1, y]);
      }
      poteau(c, p, x, y + d / 2, z, z + h, pil, .011);
      poteau(c, p, x, y, z, z + h, pil, .012); poteau(c, p, X1, y, z, z + h, pil, .012);
      face(c, p, [x, y, z + h], [x, Y1, z + h], [x, Y1, z + h - .012], [x, y, z + h - .012], pil, .002);
      face(c, p, [x, y, z + h], [X1, y, z + h], [X1, y, z + h - .013], [x, y, z + h - .013], pil, .002);
    };
  }
  function coffre(c, p, x, y, z, w, d, h){
    face(c, p, [x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h], LAQUE);
    face(c, p, [x, y, z], [x, y + d, z], [x, y + d, z + h], [x, y, z + h], mix(LAQUE, SUMI, .4));
    face(c, p, [x, y, z], [x + w, y, z], [x + w, y, z + h], [x, y, z + h], LAQUE);
    c.lineWidth = .0026; c.strokeStyle = rgb(OR_MOYEN);   // les ferrures dorées
    [[0, .15], [0, .85]].forEach(([, f]) => { const a = p(x + w * f, y, z), b = p(x + w * f, y, z + h); c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke(); });
    const a = p(x, y, z + h * .82), b = p(x + w, y, z + h * .82); c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke();
    const m = p(x + w / 2, y, z + h * .55); ellipse(c, m[0], m[1], .007, .007, OR_MOYEN, .0015);
  }
  function kicho(c, p, x, y, z, w, h, tissu){   // l'écran de tissu sur pied (kichō)
    poteau(c, p, x, y, z, z + h + .02, LAQUE, .006); poteau(c, p, x + w, y, z, z + h + .02, LAQUE, .006);
    face(c, p, [x - .01, y, z + h + .02], [x + w + .01, y, z + h + .02], [x + w + .01, y, z + h + .012], [x - .01, y, z + h + .012], LAQUE, .0015);
    const n = 4;
    for (let k = 0; k < n; k++){ const a = x + w * k / n + .002, b = x + w * (k + 1) / n - .002;
      face(c, p, [a, y, z + .006], [b, y, z + .006], [b, y, z + h + .01], [a, y, z + h + .01], k % 2 ? tissu : mix(tissu, SUMI, .18), .0022);
      const m1 = p((a + b) / 2, y, z + h * .7), m2 = p((a + b) / 2, y, z + h * .35);
      c.lineWidth = .0022; c.strokeStyle = rgb(GOFUN); c.beginPath(); c.moveTo(m1[0] - .006, m1[1]); c.lineTo(m1[0] + .006, m1[1]); c.moveTo(m2[0] - .006, m2[1]); c.lineTo(m2[0] + .006, m2[1]); c.stroke();
      const r = p((a + b) / 2, y, z + h + .01); trace(c, [[r[0] - .002, r[1]], [r[0] + .002, r[1]], [r[0] + .002, r[1] + h * .55], [r[0] - .002, r[1] + h * .55]], k % 2 ? VERMILLON : SUMI, 0);
    }
  }


  /* =================================== les feuilles du rouleau =================================== */
  const SCENES = [
    { // 990 : le pavillon sur l'eau, l'azurite
      brumes: [[0, .27, .47, .05]],
      peindre: (c, R, S) => [
        () => { mont(c, [[-.05, .44], [.1, .34], [.24, .39], [.38, .3], [.52, .37], [.66, .33], [.76, .42]], .6, mix(ROKUSHO, WASHI, .35), GUNJO, R); },
        () => { const bord = []; for (let k = 0; k <= 26; k++){ const u = -.05 + .82 * k / 26; bord.push([u, .55 + .03 * sin(u * 8 + 1) + .014 * sin(u * 23)]); }
          eau(c, bord, 1.06, GUNJO); rive(c, bord);
          const ch = new Path2D(); bord.forEach((q, k) => k ? ch.lineTo(q[0], q[1]) : ch.moveTo(q[0], q[1]));
          ch.lineTo(bord[bord.length - 1][0], 1.06); ch.lineTo(bord[0][0], 1.06); ch.closePath(); S.eauChemin = ch; S.eauBord = bord; },
        () => { pin(c, .62, .56, .3, R, -1); pin(c, .07, .56, .2, R, 1); },
        () => { const p = vue(.02, .9);
          const devant = pavillon(c, p, { x: .3, y: .03, w: .34, d: .38, z: .09, h: .16, pilotis: -.06, tatami: true, mur: mix(GUNJO, GOFUN, .72), motif: "vagues", rampe: SHU });
          personnage(c, ...p(.47, .2, .09), .12, [GUNJO, mix(GUNJO, GOFUN, .45), GOFUN], 1, "livre");
          devant(); },
        () => { oiseaux(c, [[.14, .27, .014], [.19, .25, .011], [.23, .28, .012], [.27, .245, .009]]); }
      ]
    },
    { // CUMBRE : la cime, la malachite
      brumes: [[0, .2, .5, .05], [.44, .7, .47, .045]],
      peindre: (c, R) => [
        () => { mont(c, [[-.05, .66], [.1, .52], [.22, .36], [.3, .25], [.36, .19], [.42, .24], [.52, .34], [.62, .44], [.74, .58]], .95, mix(ROKUSHO, WASHI, .12), GUNJO, R); },
        () => { torii(c, .36, .2, .05); },
        () => { mont(c, [[-.05, .68], [.06, .6], [.16, .63], [.26, .74], [.3, .8]], .95, mix(ROKUSHO, SUMI, .18), mix(GUNJO, SUMI, .2), R);
          mont(c, [[.34, .84], [.46, .66], [.58, .6], [.68, .64], [.76, .72]], .95, mix(ROKUSHO, SUMI, .1), mix(ROKUSHO, SUMI, .45), R); },
        () => { chemin(c, [[.64, .9], [.56, .8], [.6, .72], [.5, .64], [.44, .54], [.4, .42], [.37, .28]], .02); },
        () => { const p = vue(.06, .86); const devant = pavillon(c, p, { x: .04, y: .0, w: .17, d: .14, z: .0, h: .08, mur: mix(ROKUSHO, GOFUN, .7), motif: "monts" });
          personnage(c, ...p(.14, .07, 0), .06, [mix(ROKUSHO, SUMI, .3), ROKUSHO, GOFUN], 1, "livre"); devant(); },
        () => { marcheur(c, .5, .64, .075, [ROKUSHO, GOFUN]); },
        () => { pin(c, .22, .38, .12, R, 1); pin(c, .54, .37, .1, R, -1); pin(c, .66, .62, .15, R, -1); }
      ]
    },
    { // Lecture : le cabinet aux érables, le vermillon
      brumes: [[0, .16, .48, .05]],
      peindre: (c, R) => [
        () => { erable(c, .44, .64, .44, R, 80); },
        () => { const p = vue(.12, .9);
          const devant = pavillon(c, p, { x: .1, y: .03, w: .46, d: .4, z: .05, h: .19, tatami: true, mur: mix(SHU, GOFUN, .78), motif: "erables", pilier: SHU, rampe: SHU });
          const lv = [[INDIGO, .03], [OCRE, .02], [GUNJO, .025], [mix(SHU, SUMI, .3), .02]];
          let z0 = .05; lv.forEach(([col, ep]) => { face(c, p, [.16, .33, z0], [.24, .33, z0], [.24, .33, z0 + ep], [.16, .33, z0 + ep], col, .002); z0 += ep; });
          face(c, p, [.16, .33, z0], [.24, .33, z0], [.24, .4, z0], [.16, .4, z0], mix(INDIGO, GOFUN, .3), .002);
          face(c, p, [.3, .14, .085], [.42, .14, .085], [.42, .24, .085], [.3, .24, .085], LAQUE);
          face(c, p, [.3, .14, .085], [.42, .14, .085], [.42, .14, .075], [.3, .14, .075], mix(LAQUE, SUMI, .4));
          poteau(c, p, .305, .14, .05, .075, LAQUE, .004); poteau(c, p, .415, .14, .05, .075, LAQUE, .004);
          face(c, p, [.32, .16, .086], [.4, .16, .086], [.4, .22, .086], [.32, .22, .086], GOFUN, .002);
          const m1 = p(.36, .16, .086), m2 = p(.36, .22, .086); c.lineWidth = .0018; c.beginPath(); c.moveTo(m1[0], m1[1]); c.lineTo(m2[0], m2[1]); c.stroke();
          personnage(c, ...p(.46, .2, .05), .13, [SHU, mix(SHU, GOFUN, .55), [230, 200, 120]], 1, "pinceau");
          devant(); },
        () => { erable(c, .06, .97, .44, R, 90); },
        () => { for (let k = 0; k < 14; k++) etoile(c, .16 + R() * .5, .72 + R() * .14, .009 + R() * .005, k % 2 ? SHU : [226, 110, 40], R() * PI); }
      ]
    },
    { // LE CLOSING : la salle du sceau, le pourpre
      brumes: [[0, .2, .44, .05], [.52, .7, .5, .04]],
      peindre: (c, R) => [
        () => { pin(c, .05, .5, .16, R, 1); mont(c, [[.2, .44], [.32, .37], [.44, .4], [.56, .35], [.64, .42]], .5, mix(MURASAKI, WASHI, .55), MURASAKI, R); },
        () => { const p = vue(.16, .9);
          const devant = pavillon(c, p, { x: .08, y: .03, w: .48, d: .42, z: .06, h: .2, bois: [128, 90, 60], mur: mix(MURASAKI, GOFUN, .78), motif: "nuees", pilier: LAQUE, rampe: LAQUE });
          kicho(c, p, .14, .36, .06, .1, .13, MURASAKI); kicho(c, p, .4, .38, .06, .1, .13, mix(MURASAKI, SHU, .25));
          personnage(c, ...p(.17, .17, .06), .13, [MURASAKI, mix(MURASAKI, GOFUN, .5), GOFUN], -1);
          personnage(c, ...p(.46, .22, .06), .13, [mix(ROKUSHO, SUMI, .45), OCRE, GOFUN], 1);
          coffre(c, p, .27, .2, .06, .08, .06, .05);
          face(c, p, [.25, .07, .061], [.4, .07, .061], [.4, .13, .061], [.25, .13, .061], GOFUN, .002);
          c.lineWidth = .0014; c.strokeStyle = rgb(SUMI);
          for (let k = 1; k < 7; k++){ const a = p(.25 + k * .018, .075, .061), b = p(.25 + k * .018, .125, .061); c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke(); }
          const sx = p(.37, .1, .061); c.fillStyle = rgb(VERMILLON); c.fillRect(sx[0] - .007, sx[1] - .007, .014, .014);
          devant(); },
        () => { oiseaux(c, [[.08, .3, .012], [.12, .28, .01]]); }
      ]
    }
  ];
  function chemin(c, ch, lw){   // un chemin de montagne, ocre, avec ses marches
    c.lineCap = "round"; c.lineJoin = "round";
    [[lw, SUMI], [lw * .7, OCRE]].forEach(([l, coul]) => { c.beginPath(); ch.forEach((q, k) => k ? c.lineTo(q[0], q[1]) : c.moveTo(q[0], q[1])); c.lineWidth = l; c.strokeStyle = rgb(coul); c.stroke(); });
    c.lineCap = "butt"; c.lineWidth = lw * .09; c.strokeStyle = rgb(SUMI);
    for (let k = 0; k < ch.length - 1; k++) for (let m = 1; m < 4; m++){ const x = lerp(ch[k][0], ch[k + 1][0], m / 4), y = lerp(ch[k][1], ch[k + 1][1], m / 4);
      c.beginPath(); c.moveTo(x - lw * .35, y); c.lineTo(x + lw * .35, y); c.stroke(); }
  }

  function nouvelleSection(cle, k){
    const S = { cle, k, L: cle === "t" ? L_TITRE : cle === "c" ? L_COLO : L_SCENE, cv: null };
    if (typeof cle === "number"){
      S.garde = [[.74, .96]]; S.brumes = SCENES[cle].brumes;
      const nom = P[cle].nom.toUpperCase(), pas = .04;
      S.lettres = [...nom];
      S.cart = { u: .63, v: .045, w: .076, h: .036 + S.lettres.reduce((a, ch) => a + (ch === " " ? pas * .45 : pas), 0) };
      S.sc = { u: .63 + .038 - .032, v: 0, s: .064 }; S.sc.v = S.cart.v + S.cart.h + .014;
      if (cle === 2) S.couronnes = [[.44, .35, .16, .11], [.06, .68, .16, .11]];
      if (cle === 3) S.cire = [[S.sc.u, S.sc.v + S.sc.s, S.sc.s, 4], [.473, .812, .014, 2]];
    }
    if (cle === "t") S.garde = [[.1, .58]];
    if (cle === "c") S.garde = [[.04, .76]];
    return S;
  }

  function toileUnites(L, s){
    const cv = document.createElement("canvas"); cv.width = ceil(L * s); cv.height = ceil(s);
    const c = cv.getContext("2d"); c.setTransform(s, 0, 0, s, 0, 0); return [cv, c];
  }
  function toilePx(w, h){ const cv = document.createElement("canvas"); cv.width = w; cv.height = h; return [cv, cv.getContext("2d")]; }
  function sceau(chars, cote, s, R){
    const px = ceil(cote * s), cv = document.createElement("canvas"); cv.width = cv.height = px;
    const c = cv.getContext("2d"), m = px * .07;
    c.fillStyle = rgb(VERMILLON); c.fillRect(0, 0, px, px);
    c.strokeStyle = rgb(WASHI); c.lineWidth = max(1, px * .035); c.strokeRect(m, m, px - 2 * m, px - 2 * m);
    c.fillStyle = rgb(WASHI); c.textAlign = "center"; c.textBaseline = "middle";
    const n = chars.length;
    if (n === 1){ c.font = `700 ${px * .62}px ${JP}`; c.fillText(chars[0], px / 2, px / 2 + px * .02); }
    else if (n === 2){ c.font = `700 ${px * .38}px ${JP}`; c.fillText(chars[0], px / 2, px * .3); c.fillText(chars[1], px / 2, px * .72); }
    else { c.font = `700 ${px * .36}px ${JP}`;   // en colonnes, de droite à gauche
      const pl = n === 3 ? [[.73, .3], [.73, .72], [.27, .51]] : [[.73, .3], [.73, .72], [.27, .3], [.27, .72]];
      pl.forEach(([u, v], k) => c.fillText(chars[k], px * u, px * v + px * .01)); }
    for (let k = 0; k < 26; k++){ c.fillStyle = k % 3 ? rgb(WASHI) : rgb(VERMILLON);
      c.fillRect(R() * px, R() * px, max(1, px * .012 * (1 + R())), max(1, px * .012 * (1 + R()))); }
    return cv;
  }
  /* deux toiles qui reçoivent les mêmes traits : la scène entière, et son avant (ce qui est devant l'eau qui coulera) */
  function double(a){
    const e = { b: null };
    const p = new Proxy(a, {
      get(t, k){ const v = t[k]; if (typeof v !== "function") return v;
        return (...args) => { if (e.b) e.b[k](...args); return v.apply(t, args); }; },
      set(t, k, v){ t[k] = v; if (e.b) e.b[k] = v; return true; }
    });
    return [p, e];
  }
  function* peindreSection(S){
    const s = echelle, R = graine(seed * 131 + (typeof S.cle === "number" ? S.cle + 3 : S.cle === "t" ? 1 : 2) * 977);
    const [cv, c0] = toileUnites(S.L, s);
    let c = c0, dbl = null;
    papier(c, S.L, R, s, cv.width, cv.height); yield;
    nuages(S, R);
    if (typeof S.cle === "number"){
      if (S.cle === 0){ const [av, ac] = toileUnites(S.L, s); S.avant = av; const [p, e] = double(c0); c = p; dbl = [e, ac]; }
      const pas = SCENES[S.cle].peindre(c, R, S);
      for (let k = 0; k < pas.length; k++){ if (dbl && k === 2) dbl[0].b = dbl[1]; pas[k](); yield; }
      if (S.cle === 1) S.kasumi = kasumi(R, [[.0, .5, .62, .05], [.12, .62, .5, .04], [.2, .66, .74, .035]]);
    }
    contourNuages(c, S); yield; 
    if (S.cle === "t"){
      const T = D.titre;
      ecrireColonnes(c, s, colonnes(T.grand, .54, .11, .13), .45, .2, .11, 0);
      ecrireColonnes(c, s, colonnes(T.petit, .34, .042, .05), .3, .2, .042, 0);
      c.drawImage(sceau([T.sceau], .062, s, R), .269, .58, .062, .062);
      c.save(); c.setTransform(1, 0, 0, 1, 0, 0); c.fillStyle = rgb(SUMI);
      c.translate(.16 * s, .47 * s); c.rotate(PI / 2);
      c.font = `500 ${.03 * s}px ${SERIF}`; c.textAlign = "center"; espace(c, T.fr, 0, 0, .012 * s);
      c.font = `500 ${.022 * s}px ${MONO}`; espace(c, D.jour + " · chaîne " + D.chaine + " j", 0, .045 * s, .002 * s);
      c.restore();
    } else if (S.cle === "c"){
      const C = D.colophon, txt = C.debut + kanji(D.chaine + 1) + C.fin;
      S.mise = colonnes(txt, .52, .04, .044);
      ecrireColonnes(c, s, S.mise, .7, .23, .04, .052);
      c.save(); c.setTransform(1, 0, 0, 1, 0, 0); c.fillStyle = rgb(SUMI);
      c.translate(.49 * s, .48 * s); c.rotate(PI / 2);
      c.font = `500 ${.028 * s}px ${SERIF}`; c.textAlign = "center"; espace(c, C.fr, 0, 0, .01 * s);
      c.restore();
      c.drawImage(sceau([D.titre.sceau], .05, s, R), .2, .7, .05, .05);
    } else {
      S.mise = colonnes(D.scenes[S.cle].texte, .52, .04, .044);
      ecrireColonnes(c, s, S.mise, .93, .23, .04, .052);
      const K = S.cart, cw = ceil(K.w * s), ch = ceil(K.h * s), coul = D.scenes[S.cle].couleur;
      const [fondC, f] = toilePx(cw, ch);
      f.fillStyle = rgb(mix(coul, GOFUN, .7)); f.fillRect(0, 0, cw, ch);
      for (let k = 0; k < 18; k++){ f.fillStyle = rgb(mix(OR_MOYEN, OR_CLAIR, R() * .5)); const q = (.004 + R() * .006) * s; f.fillRect(R() * cw, R() * ch, q, q); }
      f.strokeStyle = rgb(SUMI); f.lineWidth = max(1, .0034 * s); f.strokeRect(.003 * s, .003 * s, cw - .006 * s, ch - .006 * s);
      f.lineWidth = max(.6, .0014 * s); f.strokeRect(.009 * s, .009 * s, cw - .018 * s, ch - .018 * s);
      const [lettres, l] = toilePx(cw, ch);
      l.fillStyle = rgb(SUMI); l.font = `700 ${.032 * s}px ${SERIF}`; l.textAlign = "center"; l.textBaseline = "middle";
      let y = .018 + .02;
      S.lettres.forEach(ch2 => { if (ch2 === " "){ y += .04 * .45; return; } l.fillText(ch2, cw / 2, y * s); y += .04; });
      S.cartFond = fondC; S.cartLettres = lettres;
      S.sceau = sceau([D.scenes[S.cle].sceau], S.sc.s, s, R);
    }
    if (dbl) dbl[0].b = null;
    if (S.cle === 0) S.tuile = tuileSeigaiha(.034 * s, GUNJO, s);
    yield; 
    feuillesOr(S, R);
    S.fige = toilePx(cv.width, cv.height)[0];                         // la feuille figée du seuil (or cuit), prête d'avance
    if (S.cle === 0 || S.cle === 1 || S.cle === 3) S.vif = toilePx(cv.width, cv.height)[0];
    S.cv = cv;
  }
  /* la tuile de seigaiha (vagues en éventails) : périodique, pour faire couler l'eau sans repeindre la scène */
  function tuileSeigaiha(r0, coul, s){
    const tw = max(4, round(2 * r0)), th = max(2, round(.9 * r0)), R0 = tw / 2, dy = th / 2;
    const [cv, c] = toilePx(tw, th);
    c.fillStyle = rgb(coul); c.fillRect(0, 0, tw, th);
    for (let r = 0; r * dy <= th + R0 + dy; r++){
      const y = r * dy, off = (r % 2) * R0;
      for (let m = -1; m <= 1; m++){
        const x = off + m * tw;
        c.beginPath(); c.arc(x, y, R0, PI, PI * 2); c.closePath(); c.fillStyle = rgb(coul); c.fill();
        c.lineWidth = max(.8, .0028 * s);
        [1, .74, .5, .26].forEach((f, k) => { c.beginPath(); c.arc(x, y, R0 * f, PI, PI * 2);
          c.strokeStyle = k === 0 ? rgb(mix(coul, SUMI, .4)) : rgb(mix(coul, GOFUN, .48)); c.stroke(); });
      }
    }
    return c.createPattern(cv, "repeat");
  }
  function peindreCouverture(){
    const s = echelle, L = LC, [cv, c] = toileUnites(L, s);
    c.clearRect(0, 0, L, 1);
    c.fillStyle = rgb(INDIGO); c.fillRect(0, 0, .2, 1);
    c.save(); c.beginPath(); c.rect(0, 0, .2, 1); c.clip();
    c.lineWidth = .0035; c.strokeStyle = rgb(OR_MOYEN);
    for (let x0 = .02; x0 < .22; x0 += .05) for (const sg of [-1, 1]){ c.beginPath();
      for (let y = 0; y <= 1.001; y += .01) c.lineTo(x0 + sg * .011 * sin(y * PI * 8), y); c.stroke(); }
    c.fillStyle = rgb(mix(OR_MOYEN, GOFUN, .3));
    for (let x0 = .045; x0 < .22; x0 += .05) for (let y = .04; y < 1; y += .0625){ c.beginPath(); c.arc(x0, y + (x0 * 20 % 2) * .03, .005, 0, PI * 2); c.fill(); }
    c.restore();
    trace(c, [[.07, .08], [.12, .08], [.12, .5], [.07, .5]], mix(WASHI, GOFUN, .4), .002);
    c.save(); c.setTransform(1, 0, 0, 1, 0, 0); c.fillStyle = rgb(SUMI); c.font = `600 ${.034 * s}px ${JP}`; c.textAlign = "center"; c.textBaseline = "middle";
    [...D.titre.grand].forEach((ch, k) => c.fillText(ch, .095 * s, (.13 + k * .1) * s)); c.restore();
    trace(c, [[.2, 0], [.214, 0], [.214, 1], [.2, 1]], [150, 126, 76], .0022);
    c.lineCap = "round";
    [[.012, SUMI], [.007, [150, 34, 46]]].forEach(([lw, coul]) => { c.beginPath(); c.moveTo(.207, .5);
      c.bezierCurveTo(.3, .48, .34, .62, .27, .72); c.bezierCurveTo(.22, .8, .3, .88, .32, .96); c.lineWidth = lw; c.strokeStyle = rgb(coul); c.stroke(); });
    c.lineCap = "butt";
    couverture = { cv, L };
  }
  function* tout(){
    peindreCouverture(); yield;
    const cles = ["t", ...ordre, 0, 1, 2, 3, "c"].filter((v, i, a) => a.indexOf(v) === i);
    for (const k of cles) yield* peindreSection(secs[k]);
  }
  function batir(){
    secs = { t: nouvelleSection("t", 0), c: nouvelleSection("c", 5) };
    for (let i = 0; i < 4; i++) secs[i] = nouvelleSection(i, i + 1);
    couverture = null; chantier = tout();
    PN = null; chantierP = peindrePanneau();
  }
  function avancer(budget){
    const t0 = performance.now();
    const ch = () => tS !== null && chantierP ? "P" : chantier ? "S" : chantierP ? "P" : null;
    while (performance.now() - t0 < budget){
      const q = ch(); if (!q) break;
      if (q === "S"){ if (chantier.next().done) chantier = null; }
      else if (chantierP.next().done) chantierP = null;
    }
  }

  /* =================================== la dernière feuille : la vue de toute la province =================================== */
  const PV = vue(.1, .84);                                    // le pavillon du panneau, en fukinuki yatai
  const SIEGES = [.05, .12, .19, .26].map(x => PV(x, .075, .05));
  const ROBES = [[GUNJO, mix(GUNJO, GOFUN, .45), GOFUN], [ROKUSHO, mix(ROKUSHO, GOFUN, .5), GOFUN],
                 [SHU, mix(SHU, GOFUN, .55), [230, 200, 120]], [MURASAKI, mix(MURASAKI, GOFUN, .5), GOFUN]];
  const MARCHES = [   // d'où vient chaque personnage : 990 par la rive, CUMBRE descend de la cime, Lecture sous l'érable, LE CLOSING par la droite
    [[-.06, .645], [.04, .655], [.08, .7]],
    [[.42, .24], [.46, .3], [.39, .38], [.45, .46], [.36, .54], [.3, .62], [.22, .66]],
    [[.62, .69], [.48, .675], [.36, .672]],
    [[.96, .69], [.74, .69], [.56, .678], [.42, .68]]
  ].map((ch, k) => ch.concat([SIEGES[k]]));
  const POSEES = [[.45, .75, .4, .016], [.53, .79, 1.9, .018], [.6, .755, 3.1, .015], [.69, .785, .9, .017], [.42, .815, 2.4, .014],
                  [.36, .735, 5.2, .015], [.74, .735, 4.1, .016], [.49, .705, 2.0, .013], [.64, .81, 1.2, .015], [.3, .79, 3.7, .014]];
  const COLS_ERABLE = [SHU, [226, 98, 38], [172, 32, 26], [236, 140, 48]];
  const CALLI = { u: .8, v: .13, taille: .1, pas: .11 };

  function* peindrePanneau(){
    while (!PAN.h || !couverture) yield;
    {   // les polices des légendes (et leur repli pour les caractères chinois) chargées d'avance, pas au milieu du seuil
      const c = toilePx(8, 8)[1], txt = D.colophon.grand + " · " + D.fin.titre + " " + D.fin.merci;
      [`500 11px ${MONO}`, `500 14px ${SERIF}`, `500 12px ${SERIF}`].forEach(f => { c.font = f; c.fillText(txt, 0, 6); c.measureText(txt); });
    }
    yield;
    const s = PAN.h * DPR, A = PAN.A, R = graine(seed * 53 + 11);
    echelleP = s;
    const Pn = { L: A, k: 9, garde: [[-.1, A + .1]], brumes: [[-.02, .44, .56, .03]], panneau: true, c: {} };
    const toile = () => toileUnites(A, s);
    let [cv, c] = toile();
    papier(c, A, R, s, cv.width, cv.height); yield;
    nuages(Pn, R); contourNuages(c, Pn); Pn.c.base = cv; yield;
    Pn.soleil = [.2, .29, .075];   // le soleil du soir : peint à chaque image (il naît en grandissant)
    [cv, c] = toile();   // les monts : la crête lointaine, la cime de CUMBRE, son torii, son chemin, ses pins
    mont(c, [[-.05, .47], [.08, .4], [.18, .43], [.3, .36], [.4, .41], [.52, .38], [.64, .44], [.72, .5]], .7, mix(MURASAKI, WASHI, .5), mix(MURASAKI, INDIGO, .3), R);
    yield;
    mont(c, [[.08, .68], [.18, .53], [.28, .37], [.36, .25], [.42, .19], [.48, .25], [.55, .37], [.63, .52], [.74, .68]], .9, mix(ROKUSHO, WASHI, .12), GUNJO, R);
    torii(c, .42, .19, .034);
    chemin(c, [[.42, .22], [.46, .3], [.39, .38], [.45, .46], [.36, .54], [.3, .62], [.22, .66]], .013);
    pin(c, .27, .5, .08, R, 1); pin(c, .58, .48, .07, R, -1);
    mont(c, [[-.05, .63], [.04, .56], [.13, .59], [.2, .66]], .9, mix(ROKUSHO, SUMI, .18), mix(GUNJO, SUMI, .2), R);
    oiseaux(c, [[.55, .14, .011], [.6, .125, .009], [.64, .15, .01]]);
    Pn.c.monts = cv; yield;
    const bord = []; for (let k = 0; k <= 30; k++){ const u = -.05 + (A + .1) * k / 30; bord.push([u, .655 + .045 * u / A + .008 * sin(u * 17)]); }
    const ch = new Path2D(); bord.forEach((q, k) => k ? ch.lineTo(q[0], q[1]) : ch.moveTo(q[0], q[1]));
    ch.lineTo(A + .05, 1.06); ch.lineTo(-.05, 1.06); ch.closePath();
    Pn.eauChemin = ch; Pn.tuile = tuileSeigaiha(.028 * s, GUNJO, s); yield;
    [cv, c] = toile();   // la rive et le pavillon, où les quatre se rejoindront
    rive(c, bord);
    const devant = pavillon(c, PV, { x: 0, y: 0, w: .3, d: .15, z: .05, h: .085, pilotis: -.09, tatami: true, mur: mix(WASHI, GOFUN, .5),
      motifs: ["vagues", "monts", "erables", "nuees"], rampe: SHU, pilier: LAQUE });
    Pn.c.pav = cv; yield;
    [cv, c] = toile();   // devant : piliers et rampes, l'érable, un pin de rive
    devant(c);
    erable(c, .62, .7, .32, R, 64);
    pin(c, .03, .64, .1, R, 1);
    Pn.c.devant = cv; Pn.couronne = [.62, .49, .11, .08]; yield;
    Pn.kasumi = kasumi(R, [[-.02, .3, .55, .035], [.3, .7, .5, .03], [.05, .5, .44, .025]]);
    [cv, c] = toile();   // 日課成就, entier (l'état qui reste), et la date en petit
    CALLI_TRAITS.forEach(q => calligraphier(c, q, 1));
    c.save(); c.setTransform(1, 0, 0, 1, 0, 0); c.fillStyle = rgb(SUMI); c.font = `600 ${.03 * s}px ${JP}`; c.textAlign = "center"; c.textBaseline = "middle";
    [...D.titre.petit].forEach((k2, k) => c.fillText(k2, (CALLI.u - .095) * s, (.15 + k * .036) * s)); c.restore();
    Pn.c.calli = cv; yield;
    Pn.sceau = sceau([...kanji(D.chaine + 1), "日"], .085, s, R);
    feuillesOr(Pn, R); yield;
    const tiede = toilePx(8, 8)[1];   // un premier tracé de chaque couche, hors écran, pour que le seuil ne le paie pas
    Object.values(Pn.c).forEach(cv2 => tiede.drawImage(cv2, 0, 0, 8, 8)); tiede.drawImage(Pn.sceau, 0, 0, 8, 8);
    PN = Pn;
  }

  /* =================================== 日課成就 : les traits =================================== */
  function chaikin(p, n){
    for (let k = 0; k < n; k++){ const q = [p[0]];
      for (let i = 0; i < p.length - 1; i++){ const a = p[i], b = p[i + 1];
        q.push([a[0] * .75 + b[0] * .25, a[1] * .75 + b[1] * .25], [a[0] * .25 + b[0] * .75, a[1] * .25 + b[1] * .75]); }
      q.push(p[p.length - 1]); p = q; }
    return p;
  }
  /* un trait : sa ligne médiane rééchantillonnée, et sa largeur calculée le long du trait (entrée appuyée, horizontales plus fines,
     tome qui s'arrête, hane qui s'effile en crochet, harai qui se balaie jusqu'à la pointe, point qui grossit) */
  function trait(def){
    const tok = def.split(" "), type = tok[0], fin = type[0];
    const parts = tok.slice(1).join(" ").split("|").map(s2 => { const n = s2.trim().split(/\s+/).map(Number), q = [];
      for (let i = 0; i < n.length; i += 2) q.push([n[i], n[i + 1]]); return q; });
    let pts = type.includes("c") ? chaikin(parts[0], 3) : parts[0];
    const avantCrochet = pts.length - 1;
    if (parts[1]) pts = pts.concat(parts[1]);
    const ech = [pts[0]], L = [0]; let crochet = 1e9;
    for (let i = 0; i < pts.length - 1; i++){
      if (i === avantCrochet && parts[1]) crochet = L[L.length - 1];
      const a = pts[i], b = pts[i + 1], d = hypot(b[0] - a[0], b[1] - a[1]), n = max(1, ceil(d / .12));
      for (let k = 1; k <= n; k++){ ech.push([a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n]); L.push(L[L.length - 1] + d / n); }
    }
    const tot = L[L.length - 1], W0 = .82;
    const larg = ech.map((q, i) => {
      const a = ech[max(0, i - 1)], b = ech[min(ech.length - 1, i + 1)], dx = b[0] - a[0], dy = b[1] - a[1], d = hypot(dx, dy) || 1, s2 = L[i];
      let w = W0 * (.58 + .42 * abs(dy) / d);
      if (fin !== "d") w *= 1 + .22 * max(0, 1 - s2 / .45);
      if (fin === "t") w *= 1 + .08 * max(0, 1 - (tot - s2) / .5);
      if (fin === "p") w *= max(.1, min(1, (tot - s2) / (tot * .5)));
      if (fin === "h" && s2 > crochet) w *= max(.12, 1 - (s2 - crochet) / max(.01, tot - crochet) * .9);
      if (fin === "d") w = W0 * (.35 + pow(s2 / tot, .7));
      return w; });
    return { pts: ech, L, tot, larg, fin };
  }
  function dessinerTrait(c, T, frac){
    const n = T.pts.length, lim = T.tot * frac; let m = 1; while (m < n && T.L[m] <= lim) m++;
    const Pt = T.pts.slice(0, m), Wd = T.larg.slice(0, m);
    c.beginPath(); c.ellipse(Pt[0][0] - .08, Pt[0][1] - .06, Wd[0] * .55, Wd[0] * .42, .8, 0, PI * 2); c.fill();
    if (Pt.length < 2) return;
    const g = [], d = [];
    for (let i = 0; i < Pt.length; i++){
      const a = Pt[max(0, i - 1)], b = Pt[min(Pt.length - 1, i + 1)], dx = b[0] - a[0], dy = b[1] - a[1], l = hypot(dx, dy) || 1, nx = -dy / l, ny = dx / l, h = Wd[i] / 2;
      g.push([Pt[i][0] + nx * h, Pt[i][1] + ny * h]); d.push([Pt[i][0] - nx * h, Pt[i][1] - ny * h]);
    }
    c.beginPath(); g.forEach((q, i) => i ? c.lineTo(q[0], q[1]) : c.moveTo(q[0], q[1]));
    for (let i = d.length - 1; i >= 0; i--) c.lineTo(d[i][0], d[i][1]);
    c.closePath(); c.fill();
    const e = Pt.length - 1;
    if (frac < 1 || T.fin === "t" || T.fin === "d"){ c.beginPath(); c.arc(Pt[e][0], Pt[e][1], Wd[e] / 2, 0, PI * 2); c.fill(); }
  }
  /* les 37 traits, dans l'ordre, chacun avec sa fenêtre de temps (longueur + une pause entre deux caractères) */
  const CALLI_TRAITS = (() => {
    const tr = [];
    [...D.colophon.grand].forEach((ch, k) => (etude_rouleau4_KAN[ch] || []).forEach(s2 => tr.push({ k, T: trait(s2) })));
    let tot = 0;
    tr.forEach((q, i) => { q.d = .5 + q.T.tot / 6; q.p = i && tr[i - 1].k !== q.k ? .9 : .12; tot += q.d + q.p; });
    let acc = 0;
    tr.forEach(q => { acc += q.p; q.t0 = acc / tot; acc += q.d; q.t1 = acc / tot; });
    return tr;
  })();
  function calligraphier(c, q, frac){   // dans les unités du panneau
    c.save();
    c.translate(CALLI.u - CALLI.taille / 2, CALLI.v + q.k * CALLI.pas); c.scale(CALLI.taille / 10, CALLI.taille / 10);
    c.fillStyle = rgb(SUMI); dessinerTrait(c, q.T, frac);
    c.restore();
  }

  /* =================================== les feuilles d'érable et l'or qui vole =================================== */
  const FEUILLE = (() => {   // une feuille de momiji : sept lobes pointus, le pétiole
    const p = new Path2D(), lobes = [[-90, 1], [-38, .86], [-142, .86], [8, .62], [172, .62], [52, .34], [128, .34]].sort((a, b) => a[0] - b[0]);
    const pts = [];
    lobes.forEach(([a, r], k) => { const ar = a * PI / 180, b = ((lobes[(k + 1) % lobes.length][0] + (k === lobes.length - 1 ? 360 : 0)) + a) / 2 * PI / 180;
      pts.push([r * cos(ar), r * sin(ar)], [.3 * cos(b), .3 * sin(b)]); });
    pts.forEach((q, k) => k ? p.lineTo(q[0], q[1]) : p.moveTo(q[0], q[1])); p.closePath();
    const n = new Path2D(); lobes.forEach(([a, r]) => { n.moveTo(0, 0); n.lineTo(r * .8 * cos(a * PI / 180), r * .8 * sin(a * PI / 180)); });
    n.moveTo(0, 0); n.lineTo(0, .55);
    return { p, n };
  })();
  function dessinerFeuille(ctx, x, y, r, ang, ecrase, coul){
    ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(r, r * ecrase);
    ctx.fillStyle = rgb(coul); ctx.fill(FEUILLE.p);
    ctx.lineWidth = 1.1 / r; ctx.strokeStyle = rgb(mix(coul, SUMI, .55)); ctx.stroke(FEUILLE.p);
    ctx.lineWidth = .7 / r; ctx.stroke(FEUILLE.n);
    ctx.restore();
  }
  function vent(x, y, aS, t){
    let wx = 46 + 44 * sin(t / 1100 + y / 140), wy = -12 + 22 * sin(t / 760 + x / 120);
    const e = lisse((aS - TS.envol + 300) / 600) * (1 - lisse((aS - TS.vol1 + 200) / 700));
    if (e > 0){ const dx = x - W / 2, dy = y - PAN.cy, r = hypot(dx, dy) + 30;
      wx += e * (-dy / r * 260 + dx / r * 150); wy += e * (dx / r * 260 + dy / r * 150); }
    return [wx, wy];
  }
  const gS = () => 420 * max(.7, H / 620);
  function nouvelleFeuille(x, y, R, cible){
    feuilles.push({ x, y, vx: (R() - .5) * 40, vy: -20 - R() * 30, th: (R() - .5) * 2, w: (R() - .5) * 4, r: (6 + 6 * R()) * max(.8, PAN.h / 340),
      coul: COLS_ERABLE[(R() * 4) | 0], kn: 4.5 + R(), kt: .15, kl: .012, kq: .0032 * (.8 + .4 * R()), kw: 1.8, cible });
  }
  /* la plaque qui tombe (Tanabe & Kaneko 1994) : traînée anisotrope, portance, couple ; intégrée par petits pas */
  function voler(f, dt, aS, t){
    const [wx, wy] = vent(f.x, f.y, aS, t), g = gS();
    for (let k = 0; k < 2; k++){
      const tx = cos(f.th), ty = sin(f.th), nx = -ty, ny = tx, ux = f.vx - wx, uy = f.vy - wy, V = hypot(ux, uy) + 1e-6;
      const ut = ux * tx + uy * ty, un = ux * nx + uy * ny;
      let ax = -(f.kt * ut * tx + f.kn * un * nx), ay = -(f.kt * ut * ty + f.kn * un * ny) + g;
      const Lf = f.kl * V * ut * sign(un); ax += Lf * (-uy / V); ay += Lf * (ux / V);
      const aw = -f.kw * f.w - f.kq * ut * un;
      const h = dt / 2; f.vx += ax * h; f.vy += ay * h; f.w += aw * h; f.th += f.w * h; f.x += f.vx * h; f.y += f.vy * h;
    }
  }
  function nouvellePaillette(x, y, R){
    paillettes.push({ x, y, vx: (R() - .5) * 80, vy: -40 - R() * 70, a: R() * 6, b: R() * 6, sa: (R() - .5) * 9, sb: (R() - .5) * 9, r: 2.2 + 3 * R() * max(.8, PAN.h / 340) });
  }
  function paillette(ctx, p){
    const nx = sin(p.a) * cos(p.b), ny = sin(p.b), nz = abs(cos(p.a) * cos(p.b));
    let lx = Lum.x - p.x, ly = Lum.y - p.y, lz = 300, l = hypot(lx, ly, lz); lx /= l; ly /= l; lz /= l;
    const hx = lx, hy = ly, hz = lz + 1, hh = hypot(hx, hy, hz), nh = max(0, (nx * hx + ny * hy + nz * hz) / hh);
    const sp = min(1, pow(nh, 24) * 1.4), di = .35 + .65 * max(0, nx * lx + ny * ly + nz * lz);
    const c = [OR_SOMBRE[0] + (OR_MOYEN[0] - OR_SOMBRE[0]) * di + (OR_CLAIR[0] - OR_MOYEN[0]) * sp, OR_SOMBRE[1] + (OR_MOYEN[1] - OR_SOMBRE[1]) * di + (OR_CLAIR[1] - OR_MOYEN[1]) * sp,
               OR_SOMBRE[2] + (OR_MOYEN[2] - OR_SOMBRE[2]) * di + (OR_CLAIR[2] - OR_MOYEN[2]) * sp];
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a * .3);
    const w = p.r * max(.15, abs(cos(p.a))), h = p.r * max(.15, abs(cos(p.b)));
    ctx.fillStyle = rgb(c); ctx.fillRect(-w / 2, -h / 2, w, h);
    ctx.restore();
  }
  function posee(k, t){   // une feuille posée sur le panneau (unités du panneau) : elle dérive un peu sur l'eau
    const [u, v, a, r] = POSEES[k];
    return [u + .004 * sin(t / 1700 + k * 1.3), v + .0015 * sin(t / 1300 + k), a + .08 * sin(t / 2100 + k), r];
  }
  const arriveeP = k => TS.feuilleP + k * 260 + 2300;
  function particules(ctx, aS, t, dt){
    if (aS < 0 || aS > 14000){ feuilles.length = 0; paillettes.length = 0; return; }
    const R = Math.random;
    // l'érable du cabinet perd ses feuilles (tant que la bande est à plat)
    const r2 = rects.find(r => r.k === 2);
    if (aS > TS.vie && aS < TS.envol && r2){ const objectif = floor((aS - TS.vie) * .03);
      while (nbF < objectif){ nbF++; const cr = secs[2].couronnes[nbF % 2];
        nouvelleFeuille(r2.x + (cr[0] + (R() - .5) * 2 * cr[2]) * r2.h, r2.y + (cr[1] + (R() - .5) * 2 * cr[3]) * r2.h, R); } }
    // pendant l'envol, le vent en apporte d'autres, par les bords
    if (aS > TS.envol && aS < TS.vol1 - 400){ const objectif = floor((aS - TS.envol) * .012);
      while (nbFT < objectif){ nbFT++; nouvelleFeuille(R() < .5 ? -10 : W + 10, H * (.15 + .7 * R()), R); } }
    // l'or se détache des nuages
    if (aS > TS.vie + 250 && aS < TS.envol){ const objectif = floor((aS - TS.vie - 250) * .08);
      let essais = 0;
      while (nbP < objectif && essais++ < 20){ const r = rects[(R() * rects.length) | 0], S = secs[r.k], G = S && S.or; if (!G || !G.n) continue;
        const q = (R() * G.n) | 0, p = (G.lig[q] * G.pw + G.p0[q]) * 4; if (!G.img.data[p + 3]) continue;
        const x = r.x + G.cu[q] * r.h, y = r.y + G.cv_[q] * r.h; if (x < 0 || x > W) continue;
        nbP++; detacher(S, q); nouvellePaillette(x, y, R); } }
    // l'érable du panneau : ses feuilles tombent et se posent sur l'eau
    if (aS > TS.feuilleP && PN){ const objectif = min(POSEES.length + 6, floor((aS - TS.feuilleP) / 260) + 1);
      while (nbFP < objectif){ const k = nbFP++, cr = PN.couronne, rr = rectPanneau(aS);
        nouvelleFeuille(rr.x + (cr[0] + (R() - .5) * cr[2]) * rr.h, rr.y + (cr[1] + (R() - .5) * cr[3]) * rr.h, R, k < POSEES.length ? k : undefined); } }
    const rr = rectPanneau(aS);
    feuilles = feuilles.filter(f => {
      voler(f, dt, aS, t);
      let x = f.x, y = f.y, ang = f.th, r = f.r, ec = max(.18, abs(cos(f.th * 1.3 + f.w * .05)));
      if (f.cible !== undefined){
        const ta = arriveeP(f.cible); if (aS >= ta) return false;
        const e = lisse((aS - ta + 1100) / 1100);
        if (e > 0){ const [u, v, a, rs] = posee(f.cible, t); x = lerp(x, rr.x + u * rr.h, e); y = lerp(y, rr.y + v * rr.h, e);
          ang = lerp(ang, a, e); r = lerp(r, rs * rr.h, e); ec = lerp(ec, .62, e); }
      }
      if (y > H + 30 || x < -60 || x > W + 60 || y < -80) return false;
      dessinerFeuille(ctx, x, y, r, ang, ec, f.coul);
      return true;
    });
    paillettes = paillettes.filter(p => {
      const [wx, wy] = vent(p.x, p.y, aS, t);
      p.vx += ((wx * 1.3 - p.vx) * 1.4 + 0) * dt; p.vy += ((wy * 1.3 - p.vy) * 1.4 + 70) * dt;
      p.x += p.vx * dt; p.y += p.vy * dt; p.a += p.sa * dt; p.b += p.sb * dt;
      if (p.y > H + 20 || p.x < -20 || p.x > W + 20 || p.y < -60) return false;
      paillette(ctx, p); return true;
    });
  }

  /* =================================== l'onde du sceau : ∂²h/∂t² = c²∇²h − γ∂h/∂t =================================== */
  function nouvelleOnde(){
    const nx = 56, ny = round(56 / PAN.A), [cv, cx] = toilePx(nx, ny);
    return { nx, ny, a: new Float32Array(nx * ny), b: new Float32Array(nx * ny), cv, cx, img: cx.createImageData(nx, ny), lance: false };
  }
  function lancerOnde(){
    const O = onde, ci = CALLI.u / PAN.A * O.nx, cj = (.585 + .0425) * O.ny;
    for (let j = 0; j < O.ny; j++) for (let i = 0; i < O.nx; i++){
      const r2 = ((i - ci) ** 2 + (j - cj) ** 2) / 2; O.a[j * O.nx + i] = O.b[j * O.nx + i] = 1.5 * exp(-r2); }
    O.lance = true; O.n = 0; O.ci = round(ci); O.cj = round(cj);
  }
  function pasOnde(){
    const O = onde, nx = O.nx, ny = O.ny, C2 = .36, g = .012;
    for (let s = 0; s < 3; s++){
      const a = O.a, b = O.b;
      if (O.n++ < 34){ const f = 1.1 * sin(O.n * .55) * (1 - O.n / 34);   // le sceau qui rebondit : un train d'ondes
        for (let dj = -1; dj <= 1; dj++) for (let di = -1; di <= 1; di++) a[(O.cj + dj) * nx + O.ci + di] += f * (di || dj ? .5 : 1); }
      for (let j = 1; j < ny - 1; j++) for (let i = 1; i < nx - 1; i++){
        const k = j * nx + i, lap = a[k - 1] + a[k + 1] + a[k - nx] + a[k + nx] - 4 * a[k];
        b[k] = (2 * a[k] - b[k] + C2 * lap) * (1 - g);
      }
      O.a = b; O.b = a;
    }
  }
  function gradOnde(u, v){
    const O = onde; if (!O || !O.lance) return 0;
    const i = min(O.nx - 2, max(1, (u / PAN.A * O.nx) | 0)), j = min(O.ny - 2, max(1, (v * O.ny) | 0)), k = j * O.nx + i;
    return hypot(O.a[k + 1] - O.a[k - 1], O.a[k + O.nx] - O.a[k - O.nx]) * 2.2;
  }
  function ombrerOnde(ctx, rr, al){
    const O = onde, d = O.img.data, nx = O.nx;
    for (let j = 0; j < O.ny; j++) for (let i = 0; i < nx; i++){
      const k = j * nx + i, p = k * 4;
      const sx = (i > 0 && i < nx - 1) ? O.a[k + 1] - O.a[k - 1] : 0, sy = (j > 0 && j < O.ny - 1) ? O.a[k + nx] - O.a[k - nx] : 0;
      const sh = (-sx * .6 - sy * .8) * 1.6;
      const v = sh > 0 ? 255 : 20; d[p] = d[p + 1] = v; d[p + 2] = sh > 0 ? 240 : 24; d[p + 3] = min(150, abs(sh) * 255);
    }
    O.cx.putImageData(O.img, 0, 0);
    ctx.save(); ctx.globalAlpha = al; ctx.imageSmoothingEnabled = true;
    ctx.drawImage(O.cv, rr.x, rr.y, rr.w, rr.h); ctx.restore();
  }

  /* =================================== au seuil : les feuilles figées, et les trois qui vivent =================================== */
  function cartouche(c, S, h){
    const K = S.cart;
    c.fillStyle = "rgba(0,0,0,.28)"; c.fillRect((K.u + .006) * h, (K.v + .008) * h, K.w * h, K.h * h);
    c.drawImage(S.cartFond, K.u * h, K.v * h, K.w * h, K.h * h); c.drawImage(S.cartLettres, K.u * h, K.v * h, K.w * h, K.h * h);
    c.drawImage(S.sceau, S.sc.u * h, S.sc.v * h, S.sc.s * h, S.sc.s * h);
  }
  function figer(S){
    if (!S.cv || !S.fige || S.figee) return;
    const w = S.cv.width, h = S.cv.height, fc = S.fige.getContext("2d");
    fc.setTransform(1, 0, 0, 1, 0, 0); fc.clearRect(0, 0, w, h); fc.drawImage(S.cv, 0, 0);
    dorer(fc, S, { x: 0, y: 0, w, h }, 1.3, null, { x: w * .35, y: -h * .5, W: w * 1.6, H: h * 1.6 });
    if (S.cartFond) cartouche(fc, S, h);
    S.figee = true; S.vifPret = false;
  }
  let nVif = 0;
  function vivre(aS){   // une feuille vivante repeinte par image, à tour de rôle (chacune à 20 images par seconde)
    nVif++;
    for (const [m, k] of [[0, 0], [1, 1], [2, 3]]){
      const S = secs[k]; if (!S || !S.vif) continue;
      if (S.vifPret && nVif % 3 !== m) continue;
      const c = S.vif.getContext("2d"), h = S.cv.height, w = S.cv.width;
      if (!S.figee) continue;
      c.setTransform(1, 0, 0, 1, 0, 0); c.drawImage(S.fige, 0, 0);
      if (k === 0 && S.eauChemin){   // l'eau du pavillon coule
        c.save(); c.setTransform(h, 0, 0, h, 0, 0); c.clip(S.eauChemin);
        const o = (aS / 1000) * .06 * h;
        c.setTransform(1, 0, 0, 1, -o, o * .1); c.fillStyle = S.tuile; c.fillRect(o - 4, -o, w + 8, h * 1.2 + o); c.restore();
        c.save(); c.setTransform(h, 0, 0, h, 0, 0); rive(c, S.eauBord); c.restore();
        c.drawImage(S.avant, 0, 0);
        c.save(); c.setTransform(h, 0, 0, h, 0, 0); c.clip(S.nuages); c.setTransform(1, 0, 0, 1, 0, 0); c.drawImage(S.fige, 0, 0); c.restore();
        cartouche(c, S, h);
      }
      S.vifPret = true;
      c.save(); c.setTransform(h, 0, 0, h, 0, 0);
      if (k === 1 && S.kasumi){   // la brume monte sur la cime
        const e = lisse((aS - TS.vie) / 2600);
        peindreKasumi(c, S.kasumi, -.16 * e, .92 * lisse((aS - TS.vie + 200) / 700));
      }
      if (k === 3 && S.cire){   // la cire du sceau fond et coule : longueur ∝ t^(1/3)
        const u = clamp((aS - TS.vie) / 3200);
        S.cire.forEach(([x0, y0, sz, n], m) => {
          for (let q = 0; q < n; q++){
            const fx = x0 + sz * (.15 + .7 * (q + .5) / n + .08 * sin(q * 7.1 + m)), lg = sz * (1.1 + .9 * sin(q * 3.7 + 1.3 * m) ** 2) * pow(u, 1 / 3) * (1.6 + m * .4);
            const lw = sz * (.16 + .06 * sin(q * 5.3));
            if (lg <= 0) continue;
            c.fillStyle = rgb(VERMILLON);
            c.beginPath(); c.moveTo(fx - lw / 2, y0 - .002); c.lineTo(fx + lw / 2, y0 - .002); c.lineTo(fx + lw / 2, y0 + lg);
            c.arc(fx, y0 + lg, lw * .72, 0, PI); c.closePath(); c.fill();
            c.lineWidth = .0012; c.strokeStyle = rgb(mix(VERMILLON, SUMI, .45)); c.stroke();
            c.fillStyle = "rgba(255,236,220,.55)"; c.fillRect(fx - lw * .3, y0 + lg * .1, lw * .18, lg * .8);
          }
        });
      }
      c.restore();
    }
  }

  /* =================================== l'état, le temps, la caméra =================================== */
  const sequence = () => ["t", ...ordre, ...(tS !== null ? ["c"] : [])];
  function positions(seq){ let a = 0; return seq.map(k => { const S = secs[k], q = a; a += S.L; return q; }); }
  const longueur = seq => seq.reduce((a, k) => a + secs[k].L, 0);
  function cibleCam(seq){ const pos = positions(seq), k = seq.length - 1; return -(pos[k] + secs[seq[k]].L / 2) - (seq.length === 1 ? .06 : 0); }
  const uNow = t => Uan.t === null ? Uan.a : lerp(Uan.de, Uan.a, lisse((t - Uan.t) / DUREE));
  const camNow = t => Cam.t === null ? Cam.x : lerp(Cam.de, Cam.a, lisse((t - Cam.t) / DUREE));
  function derouler(t){
    const seq = sequence();
    Uan = { de: uNow(t), a: longueur(seq), t };
    Cam = { de: camNow(t), a: cibleCam(seq), t, x: cibleCam(seq) };
  }
  function poser(){
    const seq = sequence();
    Uan = { de: longueur(seq), a: longueur(seq), t: null };
    Cam = { de: 0, a: 0, t: null, x: cibleCam(seq) };
  }

  /* =================================== la bande à plat =================================== */
  function rouleau(ctx, xd, y, h, r, phase){
    const Rr = r * h, cx = xd - Rr, kr = max(Rr * .5, .016 * h), kh = .06 * h;
    trace(ctx, [[cx - kr, y + h], [cx + kr, y + h], [cx + kr, y + h + kh], [cx - kr, y + h + kh]], LAQUE, 1.2);
    ctx.fillStyle = rgb(OR_MOYEN); ctx.fillRect(cx - kr, y + h + kh * .2, kr * 2, max(1, kh * .1));
    const nb = 7;
    for (let b = 0; b < nb; b++){
      const a0 = -PI / 2 + PI * b / nb, a1 = a0 + PI / nb, am = (a0 + a1) / 2;
      const e = clamp(.35 + .65 * cos(am + .55)), coul = mix(mix(WASHI_DOS, SUMI, .45), mix(WASHI, GOFUN, .3), e);
      ctx.fillStyle = rgb(coul); ctx.fillRect(cx + Rr * sin(a0), y, Rr * (sin(a1) - sin(a0)) + .5, h);
    }
    ctx.lineWidth = 1; ctx.strokeStyle = "rgba(60,56,50,.55)";
    for (let m = 0; m < 3; m++){ const a = ((phase + m * 2.09) % (PI * 2) + PI * 2) % (PI * 2) - PI; if (abs(a) > PI / 2 - .05) continue;
      const x = cx + Rr * sin(a); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.stroke(); }
    ctx.lineWidth = 1.2; ctx.strokeStyle = rgb(SUMI); ctx.strokeRect(cx - Rr, y, Rr * 2, h);
    const ry = .22;
    ctx.beginPath(); ctx.ellipse(cx, y, Rr, Rr * ry, 0, 0, PI * 2); ctx.fillStyle = rgb(mix(WASHI, GOFUN, .2)); ctx.fill();
    ctx.lineWidth = .8; ctx.strokeStyle = "rgba(70,64,56,.7)"; ctx.beginPath();
    const tours = 4, rc = R_AXE * h;
    for (let f = 0; f <= tours * PI * 2; f += .2){ const q = rc + (Rr - rc) * f / (tours * PI * 2); ctx.lineTo(cx + q * cos(f - phase), y + q * sin(f - phase) * ry); }
    ctx.stroke();
    ctx.lineWidth = 1.2; ctx.strokeStyle = rgb(SUMI); ctx.beginPath(); ctx.ellipse(cx, y, Rr, Rr * ry, 0, 0, PI * 2); ctx.stroke();
    trace(ctx, [[cx - kr, y - kh], [cx + kr, y - kh], [cx + kr, y], [cx - kr, y]], LAQUE, 1.2);
    ctx.fillStyle = "rgba(255,255,255,.18)"; ctx.fillRect(cx - kr * .55, y - kh, kr * .35, kh);
    ctx.beginPath(); ctx.ellipse(cx, y - kh, kr, kr * ry, 0, 0, PI * 2); ctx.fillStyle = rgb(mix(LAQUE, GOFUN, .12)); ctx.fill(); ctx.lineWidth = 1.2; ctx.strokeStyle = rgb(SUMI); ctx.stroke();
    ctx.fillStyle = rgb(OR_MOYEN); ctx.fillRect(cx - kr, y - kh * .3, kr * 2, max(1, kh * .1));
  }
  function frappe(ctx, cv, x, y, w, a, dur, ombre){
    if (a < 0) return;
    const u = clamp(a / dur), e = 1 + 1.4 * pow(1 - u, 2), al = u < 1 ? .25 + .75 * u : 1;
    const cxs = x + w / 2, cys = y + w / 2;
    if (u < 1 && ombre){ ctx.fillStyle = `rgba(0,0,0,${.25 * u})`; ctx.fillRect(cxs - w * e / 2 + w * .1 * (e - 1) * 3, cys - w * e / 2 + w * .15 * (e - 1) * 3, w * e, w * e); }
    ctx.save(); ctx.globalAlpha = al;
    ctx.drawImage(cv, cxs - w * e / 2, cys - w * e / 2, w * e, w * e); ctx.restore();
    const ar = (a - dur) / 700;
    if (ar > 0 && ar < 1){ const q = w * (1 + ar * .9); ctx.lineWidth = 2 * (1 - ar) + .5; ctx.strokeStyle = `rgba(196,36,26,${.7 * (1 - ar)})`; ctx.strokeRect(cxs - q / 2, cys - q / 2, q, q); }
  }
  function legende(ctx, titre, sous, x, y, alpha){
    if (alpha <= 0) return;
    ctx.save(); ctx.globalAlpha = alpha; ctx.textAlign = "center"; ctx.textBaseline = "alphabetic";
    ctx.fillStyle = rgb(BLANC); ctx.font = `500 ${min(14, W * .036)}px ${SERIF}`; espace(ctx, titre, x, y, 2.6);
    ctx.fillStyle = rgb(GRIS_CLAIR); ctx.font = `500 ${min(11, W * .028)}px ${MONO}`; espace(ctx, sous, x, y + 18, .6);
    ctx.restore();
  }
  const ROMAIN = ["", "I", "II", "III", "IV", "V"];
  function nomDe(cle, rang){
    if (cle === "t") return [D.titre.fr, `${D.titre.grand} · ${D.jour}`];
    if (cle === "c") return ["COLOPHON · " + D.colophon.fr, `${D.colophon.grand} · ${D.chaine + 1} jours d'affilée`];
    const sc = D.scenes[cle]; return [`${ROMAIN[rang] || ""} · ${P[cle].nom.toUpperCase()}`, `${sc.scene.toLowerCase()} · ${sc.pigment}`];
  }
  function dessinerBande(ctx, t, aS){
    const seq = sequence(), pos = positions(seq);
    let Hz = Hl, yb = bandY, cam = camNow(t), U = uNow(t), ombre = 1, alLeg = 1;
    if (aS >= 0){   // le grand geste : le colophon se déroule, la caméra recule jusqu'à tenir tout le rouleau
      const z = lisse((aS - TS.zoom0) / (TS.zoom1 - TS.zoom0));
      Hz = lerp(Hl, Hfull, z); yb = lerp(bandY, PAN.cy - Hfull / 2, z);
      cam = lerp(Seuil.cam, -SIGMA_C, lisse((aS - 80) / 1400));
      U = lerp(Seuil.U, L_TOTAL, doux(aS / TS.deroule));
      ombre = 1 - lisse((aS - 1150) / 450); alLeg = 1 - lisse(aS / 350);
    }
    rects = seq.map((k, n) => ({ k, n, x: W / 2 + (-(pos[n] + secs[k].L) - cam) * Hz, y: yb, w: secs[k].L * Hz, h: Hz }));
    const xCoupe = W / 2 + (-U - cam) * Hz;
    if (ombre > 0){ ctx.fillStyle = rgb(TABLE_OMBRE, .55 * ombre);
      rects.forEach(r => { const x0 = max(r.x, xCoupe); if (r.x + r.w > x0) ctx.fillRect(x0 + r.h * .012, r.y + r.h * .035, r.x + r.w - x0, r.h); }); }
    ctx.save(); ctx.beginPath(); ctx.rect(xCoupe, -10, W - xCoupe + 10, H + 20); ctx.clip();
    rects.forEach(r => {
      if (r.x > W + 4 || r.x + r.w < -4) return;
      const S = secs[r.k], src = aS >= 0 && S.figee ? (S.vifPret ? S.vif : S.fige) : null;
      if (src){ ctx.drawImage(src, r.x, r.y, r.w, r.h); return; }
      if (S.cv) ctx.drawImage(S.cv, r.x, r.y, r.w, r.h);
      else { ctx.fillStyle = rgb(WASHI); ctx.fillRect(r.x, r.y, r.w, r.h); }
      const tr = typeof r.k === "number" ? tRev[r.k] : null;
      let boost = 1;
      if (tr !== null){ const a = t - tr; boost += 1.5 * exp(-pow((a - 2300) / 700, 2)); }
      if (eclat[r.k] !== undefined) boost += 1.6 * exp(-(t - eclat[r.k]) / 700);
      if (S.cv) dorer(ctx, S, r, boost, null);
      if (typeof r.k === "number" && S.cartFond){   // le cartouche s'écrit, puis le sceau rouge frappe
        const a = tr === null ? 1e9 : t - tr, k = r.h, K = S.cart;
        const x = r.x + K.u * k, y = r.y + K.v * k, w = K.w * k, h = K.h * k;
        ctx.fillStyle = "rgba(0,0,0,.28)"; ctx.fillRect(x + k * .006, y + k * .008, w, h);
        ctx.drawImage(S.cartFond, x, y, w, h);
        const ec = lisse((a - 1500) / 900);
        if (ec > 0){ ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h * ec); ctx.clip(); ctx.drawImage(S.cartLettres, x, y, w, h); ctx.restore(); }
        frappe(ctx, S.sceau, r.x + S.sc.u * k, r.y + S.sc.v * k, S.sc.s * k, a - 2450, 320, true);
      }
      if (etiquette && etiquette.k === r.k){ const al = 1 - lisse((t - etiquette.t - 2600) / 600);
        if (al > 0){ ctx.save(); ctx.globalAlpha = al; ctx.lineWidth = 2; ctx.strokeStyle = rgb(BLANC); ctx.strokeRect(r.x + 1, r.y + 1, r.w - 2, r.h - 2); ctx.restore(); } }
    });
    ctx.restore();
    const r0 = rects[0];
    if (couverture) ctx.drawImage(couverture.cv, r0.x + r0.w, r0.y, couverture.L * r0.h, r0.h);
    const rl = rects[rects.length - 1], rad = sqrt(R_AXE * R_AXE + EPAISSEUR * max(0, L_TOTAL - U) / PI);
    rouleau(ctx, xCoupe, rl.y, rl.h, rad, U / rad);
    if (alLeg > 0){ let best = rects[0], dmin = 1e9;
      rects.forEach(r => { const d = abs(r.x + r.w / 2 - W / 2); if (d < dmin && r.x + r.w > xCoupe + 8){ dmin = d; best = r; } });
      const [a, b] = nomDe(best.k, best.n); legende(ctx, a, b, W / 2, bandY + Hl + max(26, Hl * .1), alLeg); }
    if (etiquette && aS < 0){ const al = 1 - lisse((t - etiquette.t - 2600) / 600), r = rects.find(q => q.k === etiquette.k);
      if (al > 0 && r){ const [a] = nomDe(r.k, r.n); ctx.save(); ctx.globalAlpha = al; ctx.font = `500 12px ${SERIF}`;
        const w = ctx.measureText(a).width + a.length * 1.6 + 20, x = clamp(r.x + r.w / 2, w / 2 + 6, W - w / 2 - 6), y = r.y + r.h - 14;
        ctx.fillStyle = "rgba(16,16,19,.86)"; ctx.fillRect(x - w / 2, y - 15, w, 22); ctx.fillStyle = rgb(BLANC); ctx.textAlign = "center"; espace(ctx, a, x, y, 1.6); ctx.restore(); } }
  }

  /* =================================== l'envol : le rouleau s'enroule en hélice autour de la caméra =================================== */
  const zCam = aS => ZC_FIN * lisse((aS - TS.vol0) / (TS.vol1 - TS.vol0));
  const spin = aS => 1.1 * lisse((aS - TS.envol) / (TS.vol1 - TS.envol));
  function point3(sg, v, b, aS){
    const Xf = SIGMA_C - sg, Yf = v - .5;
    const f = -sg / RHO + spin(aS), Xh = RHO * cos(f), Yh = RHO * sin(f), Zh = ZH0 + (sg + LC) * PAS_H / (2 * PI * RHO) + v;
    return [lerp(Xf, Xh, b), lerp(Yf, Yh, b) - sin(PI * b) * .3, lerp(ZF, Zh, b)];
  }
  function projeter(q, zc){ const d = q[2] - zc; return d < .12 ? null : [W / 2 + F * q[0] / d, PAN.cy + F * q[1] / d, d]; }
  function dessinerTunnel(ctx, t, aS){
    const zc = zCam(aS), base = ctx.getTransform(), items = [];
    const seq = sequence(), pos = positions(seq);
    const morceaux = [{ src: couverture && couverture.cv, s0: -LC, L: LC }].concat(seq.map((k, n) => ({ src: secs[k].figee ? (secs[k].vifPret ? secs[k].vif : secs[k].fige) : secs[k].cv, s0: pos[n], L: secs[k].L })));
    morceaux.forEach(m => {
      if (!m.src) return;
      const ns = max(2, ceil(m.L / .06)), hpx = m.src.height, k = hpx;
      const bS = sg => lisse((aS - TS.envol - (sg + LC) * TS.envolPas) / TS.envolDur);
      for (let i = 0; i < ns; i++){
        const sa = m.s0 + m.L * i / ns, sb = m.s0 + m.L * (i + 1) / ns, b = bS((sa + sb) / 2);
        const nv = b < .002 ? 1 : 2;
        for (let j = 0; j < nv; j++){
          const v0 = j / nv, v1 = (j + 1) / nv;
          const A = projeter(point3(sb, v0, b, aS), zc), B = projeter(point3(sa, v0, b, aS), zc), C = projeter(point3(sb, v1, b, aS), zc), Dd = projeter(point3(sa, v1, b, aS), zc);
          if (!A || !B || !C || !Dd) continue;
          const xs = [A[0], B[0], C[0], Dd[0]], ys = [A[1], B[1], C[1], Dd[1]];
          if (max(...xs) < -2 || min(...xs) > W + 2 || max(...ys) < -2 || min(...ys) > H + 2) continue;
          const u0 = (m.s0 + m.L - sb) * k, u1 = (m.s0 + m.L - sa) * k;
          items.push({ d: (A[2] + B[2] + C[2] + Dd[2]) / 4, b, A, B, C, Dd, src: m.src, sx: u0, sy: v0 * hpx, sw: u1 - u0, sh: (v1 - v0) * hpx });
        }
      }
    });
    // l'axe de bois, au bout du rouleau
    const bE = lisse((aS - TS.envol - (L_TOTAL + LC) * TS.envolPas) / TS.envolDur);
    const a1 = projeter(point3(L_TOTAL + .005, -.07, bE, aS), zc), a2 = projeter(point3(L_TOTAL + .005, 1.07, bE, aS), zc);
    if (a1 && a2) items.push({ d: (a1[2] + a2[2]) / 2, axe: [a1, a2] });
    items.sort((p, q) => q.d - p.d);
    // la dernière feuille, au fond, que l'on va rejoindre
    const alP = lisse((aS - TS.envol - 150) / 900);
    if (alP > 0) dessinerPanneau(ctx, rectPanneau(aS), aS, t, alP);
    for (const it of items){
      ctx.globalAlpha = it.b === undefined ? 1 : lerp(1, clamp(1.18 - it.d * .12, .55, 1), it.b);
      if (it.axe){ const [p, q] = it.axe; ctx.lineCap = "round";
        ctx.lineWidth = max(2, F * .03 / p[2]); ctx.strokeStyle = rgb(LAQUE); ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); ctx.stroke();
        ctx.lineWidth = max(1, F * .012 / p[2]); ctx.strokeStyle = rgb(OR_MOYEN); ctx.stroke(); ctx.lineCap = "butt"; continue; }
      const { A, B, C, Dd } = it;
      const ex = B[0] - A[0], ey = B[1] - A[1], fx = C[0] - A[0], fy = C[1] - A[1], cr = ex * fy - ey * fx;
      if (cr > 0){
        const le = hypot(ex, ey) || 1, lf = hypot(fx, fy) || 1, ge = 1 + .9 / le, gf = 1 + .9 / lf;
        ctx.setTransform(base);
        ctx.transform(ex * ge / it.sw, ey * ge / it.sw, fx * gf / it.sh, fy * gf / it.sh, A[0] - ex * .45 / le - fx * .45 / lf, A[1] - ey * .45 / le - fy * .45 / lf);
        ctx.drawImage(it.src, it.sx, it.sy, it.sw, it.sh, 0, 0, it.sw, it.sh);
        ctx.setTransform(base);
      } else {   // le dos du papier
        ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); ctx.lineTo(Dd[0], Dd[1]); ctx.lineTo(C[0], C[1]); ctx.closePath();
        ctx.fillStyle = rgb(mix(WASHI_DOS, SUMI, clamp(.12 + it.d * .05, 0, .4))); ctx.fill();
        ctx.lineWidth = .8; ctx.strokeStyle = rgb(WASHI_DOS); ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
  }

  /* =================================== la vue de la province, peinte sous nos yeux =================================== */
  function rectPanneau(aS){
    const sc = aS >= TS.vol1 || aS > 1e8 ? 1 : DP / (ZP - zCam(aS));
    const w = PAN.w * sc, h = PAN.h * sc;
    return { x: W / 2 - w / 2, y: PAN.cy - h / 2, w, h };
  }
  function dessinerPanneau(ctx, rr, aS, t, alpha){
    const fini = aS > 1e8, pr = (a, b) => fini ? 1 : lisse((aS - a) / b);
    const m = rr.h * MONT;
    ctx.save(); ctx.globalAlpha = alpha;
    // le montage (hyōgu) : brocart indigo, filets d'or, et son ombre sur la table
    ctx.fillStyle = rgb(TABLE_OMBRE, .6); ctx.fillRect(rr.x - m + rr.h * .012, rr.y - m + rr.h * .03, rr.w + 2 * m, rr.h + 2 * m);
    ctx.fillStyle = rgb(INDIGO); ctx.fillRect(rr.x - m, rr.y - m, rr.w + 2 * m, rr.h + 2 * m);
    ctx.lineWidth = max(.6, rr.h * .002); ctx.strokeStyle = rgb(OR_MOYEN);
    ctx.strokeRect(rr.x - m * .55, rr.y - m * .55, rr.w + m * 1.1, rr.h + m * 1.1);
    ctx.strokeRect(rr.x - m * .35, rr.y - m * .35, rr.w + m * .7, rr.h + m * .7);
    ctx.strokeStyle = rgb(SUMI); ctx.strokeRect(rr.x - m, rr.y - m, rr.w + 2 * m, rr.h + 2 * m);
    if (!PN){ ctx.fillStyle = rgb(WASHI); ctx.fillRect(rr.x, rr.y, rr.w, rr.h); ctx.restore(); return; }
    const L = PN.c;
    ctx.beginPath(); ctx.rect(rr.x, rr.y, rr.w, rr.h); ctx.clip();
    ctx.drawImage(L.base, rr.x, rr.y, rr.w, rr.h);
    const couche = (cv, e, mode) => {
      if (e <= 0) return;
      if (e >= 1){ ctx.drawImage(cv, rr.x, rr.y, rr.w, rr.h); return; }
      ctx.save(); ctx.beginPath();
      if (mode === "monte") ctx.rect(rr.x, rr.y + rr.h * (1 - e), rr.w, rr.h * e);
      else if (mode === "large") ctx.rect(rr.x + rr.w * (.5 - e * .5), rr.y, rr.w * e, rr.h);
      else { const [sx, sy, sr] = PN.soleil; ctx.arc(rr.x + sx * rr.h, rr.y + sy * rr.h, sr * rr.h * e, 0, PI * 2); }
      ctx.clip(); ctx.drawImage(cv, rr.x, rr.y, rr.w, rr.h); ctx.restore();
    };
    const eS = pr(TS.soleil, 500);
    if (eS > 0){ const [sx, sy, sr] = PN.soleil, q = doux(eS);
      ctx.save(); ctx.translate(rr.x, rr.y); ctx.scale(rr.h, rr.h);
      ellipse(ctx, sx, sy, (sr + .011) * q, (sr + .011) * q, mix(OR_MOYEN, WASHI, .25), LW);
      ellipse(ctx, sx, sy, sr * q, sr * q, VERMILLON, LW);
      ctx.beginPath(); ctx.arc(sx, sy, sr * q * .82, PI * 1.1, PI * 1.55); ctx.lineWidth = .006; ctx.strokeStyle = rgb(mix(VERMILLON, GOFUN, .3)); ctx.stroke();
      ctx.restore(); }
    couche(L.monts, pr(TS.monts, 900), "monte");
    const eE = pr(TS.eau, 700);
    if (eE > 0){   // l'eau coule : les éventails glissent, sous le pavillon
      ctx.save(); ctx.beginPath(); ctx.rect(rr.x + rr.w * (.5 - eE * .5), rr.y, rr.w * eE, rr.h); ctx.clip();
      ctx.translate(rr.x, rr.y); ctx.scale(rr.h, rr.h); ctx.clip(PN.eauChemin);
      ctx.fillStyle = rgb(GUNJO); ctx.fillRect(-.1, 0, PAN.A + .2, 1.1);
      ctx.scale(1 / echelleP, 1 / echelleP);
      const o = (t / 1000 * .035 * echelleP) % 1e6;
      ctx.translate(-o, 0); ctx.fillStyle = PN.tuile; ctx.fillRect(o - 10, 0, PAN.A * echelleP + 20, echelleP * 1.1);
      ctx.restore();
    }
    const eB = pr(TS.brume, 1400);   // la brume monte sur la cime
    if (eB > 0){ ctx.save(); ctx.translate(rr.x, rr.y); ctx.scale(rr.h, rr.h); peindreKasumi(ctx, PN.kasumi, .1 * (1 - eB), .88 * min(1, eB * 2)); ctx.restore(); }
    const eP = pr(TS.pav, 700);
    couche(L.pav, eP, "monte");
    // les quatre personnages des scènes se rejoignent au pavillon
    if (eP > .5 || fini){
      ctx.save(); ctx.translate(rr.x, rr.y); ctx.scale(rr.h, rr.h);
      for (let k = 0; k < 4; k++){
        const u = fini ? 1 : clamp((aS - TS.marche - k * 230) / 1550);
        if (u <= 0) continue;
        if (u >= 1){ personnage(ctx, ...SIEGES[k], .085, ROBES[k], k === 3 ? -1 : 1, k === 2 ? "livre" : undefined); continue; }
        const ch = MARCHES[k], seg = []; let tot = 0;
        for (let i = 0; i < ch.length - 1; i++){ const l = hypot(ch[i + 1][0] - ch[i][0], ch[i + 1][1] - ch[i][1]); seg.push(l); tot += l; }
        let s2 = doux(u) * tot, i = 0; while (i < seg.length - 1 && s2 > seg[i]){ s2 -= seg[i]; i++; }
        const f = clamp(s2 / seg[i]), x = lerp(ch[i][0], ch[i + 1][0], f), y = lerp(ch[i][1], ch[i + 1][1], f);
        const bob = abs(sin(u * 22)) * .004;
        marcheur(ctx, x, y - bob, .07, [ROBES[k][0], ROBES[k][1]]);
      }
      ctx.restore();
    }
    couche(L.devant, eP, "monte");
    // les feuilles posées sur l'eau
    ctx.save(); ctx.translate(rr.x, rr.y);
    POSEES.forEach((q, k) => { if (!fini && aS < arriveeP(k)) return; const [u, v, a, r] = posee(k, t);
      dessinerFeuille(ctx, u * rr.h, v * rr.h, r * rr.h, a, .62, COLS_ERABLE[k % 4]); });
    ctx.restore();
    // l'or des nuages, calculé ; l'onde du sceau le fait flamber
    const ondeOr = onde && onde.lance && !fini ? (u, v) => gradOnde(u, v) : null;
    dorer(ctx, PN, rr, 1 + (eclat.P !== undefined ? 1.4 * exp(-(t - eclat.P) / 700) : 0), ondeOr);
    // 日課成就, trait par trait
    const uC = fini ? 2 : (aS - TS.calli0) / (TS.calli1 - TS.calli0);
    if (uC >= 1) ctx.drawImage(L.calli, rr.x, rr.y, rr.w, rr.h);
    else if (uC > 0){ ctx.save(); ctx.translate(rr.x, rr.y); ctx.scale(rr.h, rr.h);
      CALLI_TRAITS.forEach(q => { const f = clamp((uC - q.t0) / (q.t1 - q.t0)); if (f > 0) calligraphier(ctx, q, f); }); ctx.restore(); }
    // le grand sceau, et l'onde dans le papier
    const tq = .085 * rr.h, xs = rr.x + (CALLI.u - .0425) * rr.h, ys = rr.y + .585 * rr.h;
    frappe(ctx, PN.sceau, xs, ys, tq, fini ? 1e9 : aS - TS.sceau, 420, true);
    if (onde && onde.lance && !fini && aS < TS.sceau + 3200) ombrerOnde(ctx, rr, 1 - lisse((aS - TS.sceau - 2300) / 900));
    ctx.restore();
  }

  /* =================================== chaque image =================================== */
  function frame(ctx, t){
    avancer(3);
    const aS = tS === null ? -1 : t - tS, dt = tPrec === null ? 1 / 60 : clamp((t - tPrec) / 1000, 0, 1 / 20); tPrec = t;
    let sx = 0, sy = 0;
    const aC = aS - TS.sceau - 420;
    if (aC > 0 && aC < 380){ const q = (380 - aC) / 380; sx = sin(aS * .21) * 3 * q; sy = cos(aS * .17) * 3 * q; }   // le coup du grand sceau
    ctx.save(); ctx.fillStyle = rgb(TABLE); ctx.fillRect(0, 0, W, H); ctx.translate(sx, sy);
    Lum.x = W * (.5 + .36 * sin(t / 5600)) + lumDx; Lum.y = H * .2 + H * .1 * cos(t / 7300) + lumDy;
    if (aS < 0) dessinerBande(ctx, t, aS);
    else {
      if (aS < 1e8){
        for (let k = 0, n = 0; k < aFiger.length && n < 1; k++){ const S = secs[aFiger[k]]; if (S && S.cv && !S.figee){ figer(S); n++; } }
        if (aS > TS.vie - 100 && aS < TS.vol1 + 100) vivre(aS);
        if (onde && aS > TS.sceau + 420 && !onde.lance) lancerOnde();
        if (onde && onde.lance && aS < TS.sceau + 3200) pasOnde();
      }
      if (aS < TS.envol) dessinerBande(ctx, t, aS);
      else if (aS < TS.vol1) dessinerTunnel(ctx, t, aS);
      else dessinerPanneau(ctx, rectPanneau(aS), aS, t, 1);
      particules(ctx, aS, t, dt);
      const al = aS > 1e8 ? 1 : lisse((aS - TS.legende) / 800);
      legende(ctx, D.fin.titre, `${D.colophon.grand} · ${D.chaine + 1} jours d'affilée · ${D.fin.merci}`, W / 2, PAN.y + PAN.h * (1 + MONT) + 26, al);
    }
    ctx.restore();
    passeGrain(ctx, W, H, t, .03);
  }

  /* =================================== les gestes et l'API de l'app =================================== */
  function textes(){
    const n = ordre.length;
    M.bouton = tS !== null ? "Encore" : n < 4 ? P[[0, 1, 2, 3].find(i => !ordre.includes(i))].nom : "Boucler";
    M.ligne = tS !== null ? `journée accomplie · ${D.chaine + 1} jours d'affilée` : n ? `${n} sur 4 · ${ordre.map(i => P[i].nom).join(" · ")}` : ligneGeste(0);
  }
  function etat(liste, boucle){
    ordre = [];
    (liste || []).forEach(i => { i = i | 0; if (i >= 0 && i < 4 && !ordre.includes(i)) ordre.push(i); });
    tRev = [0, 1, 2, 3].map(i => ordre.includes(i) ? -1e9 : null);
    tS = boucle && ordre.length === 4 ? -1e9 : null;
    feuilles = []; paillettes = []; onde = null;
    Object.values(secs).forEach(S => { S.figee = S.vifPret = false;
      if (S.or){ const d = S.or.img.data; for (let q = 0; q < S.or.n; q++){ const p = (S.or.lig[q] * S.or.pw + S.or.p0[q]) * 4; d[p + 3] = d[p + 7] = 255; } } });
    poser(); textes();
  }
  function aller(n){ n = clamp(n | 0, 0, 5); etat([0, 1, 2, 3].slice(0, min(n, 4)), n >= 5); }
  M.aller = aller;
  M.etat = etat;
  M.faire = i => { if (i < 0 || i > 3 || ordre.includes(i) || tS !== null) return; const t = maintenant();
    ordre.push(i); tRev[i] = t; derouler(t); textes();
    M.ligne = `${P[i].nom} · ${D.scenes[i].scene.toLowerCase()} · ${ordre.length} sur 4`; };
  M.retirer = i => { if (!ordre.includes(i)) return; etat(ordre.filter(k => k !== i), false); };
  M.boucler = () => {
    if (tS !== null || ordre.length < 4) return;
    const t = maintenant();
    Seuil = { U: uNow(t), cam: camNow(t) };
    tS = t; aFiger = sequence(); nbF = nbFT = nbP = nbFP = 0; feuilles = []; paillettes = []; onde = nouvelleOnde();
    textes(); M.ligne = "le rouleau se déroule d'un geste";
  };
  M.faits = () => ordre.slice();
  M.boucle = () => tS !== null;
  M.taille = (w, h, dpr) => {
    W = w; H = h; DPR = min(dpr || 1, 1.5);
    Hl = min(H * .58, W * .9 / L_SCENE, 560); bandY = max(54, (H - Hl) / 2 - H * .035);
    const haut = 50, bas = 118, mg = 12;
    PAN.h = max(120, min((H - haut - bas) / (1 + 2 * MONT), (W - 2 * mg) / (PAN.A + 2 * MONT)));
    PAN.w = PAN.h * PAN.A; PAN.cy = haut + (H - haut - bas) / 2; PAN.x = W / 2 - PAN.w / 2; PAN.y = PAN.cy - PAN.h / 2;
    Hfull = min(W * .94 / (L_TOTAL + LC), H * .3); F = Hfull * ZF;
    const e = Hl * DPR;
    if (abs(e - echelle) > .5){ echelle = e; batir(); }
    else if (abs(PAN.h * DPR - echelleP) > .5){ PN = null; chantierP = peindrePanneau(); }
    if (tS !== null && onde) onde = nouvelleOnde();
    if (Cam.t === null) Cam.x = cibleCam(sequence());
  };
  M.frame = frame;
  M.geste = i => {
    if (i !== undefined) return M.faire(i);
    const t = maintenant(); if (t - dernierGeste < 900) return; dernierGeste = t;
    if (tS !== null){ seed += 17; batir(); aller(0); return; }
    if (ordre.length < 4) M.faire([0, 1, 2, 3].find(k => !ordre.includes(k))); else M.boucler();
  };
  M.tap = (x, y) => {
    const t = maintenant();
    if (tS !== null){
      const rr = rectPanneau(t - tS);
      if (x >= rr.x && x <= rr.x + rr.w && y >= rr.y && y <= rr.y + rr.h){ eclat.P = t; M.ligne = `${D.colophon.grand} · la province, la journée accomplie`; }
      return;
    }
    for (const r of rects){ if (x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h){
      eclat[r.k] = t; etiquette = { k: r.k, t };
      if (r.k === "t") M.ligne = `${D.titre.grand} · le rouleau d'un jour · ${D.jour}`;
      else { const sc = D.scenes[r.k], m = secs[r.k].mise;
        M.ligne = `${P[r.k].nom} · ${sc.scene.toLowerCase()} · ${P[r.k].min} min` + (m ? ` · ${m.cols.length} colonnes` : ""); }
      return; } }
    M.ligne = `le rouleau serré · ${4 - ordre.length} feuille${ordre.length === 3 ? "" : "s"} à dérouler`;
  };
  M.glisse = (dx, dy) => {
    if (tS !== null){ lumDx = clamp(lumDx + dx * 2, -W, W); lumDy = clamp(lumDy + dy * 2, -H, H); return; }
    const t = maintenant(), U = uNow(t);
    Cam = { de: 0, a: 0, t: null, x: clamp(camNow(t) - dx / Hl, -U + .2, -.25) };
    lumDx = clamp(lumDx + dx * .3, -W * .3, W * .3);
  };
  echelle = Hl; batir(); aller(0);
  return M;
}
window.ETUDE = etude_rouleau4;
