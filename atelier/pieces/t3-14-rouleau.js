/* ======================= Tour 3, pièce 14 : LE ROULEAU (etude_rouleau) ======================= */
/* Ce qu'on voit : un emakimono (rouleau peint japonais) qui traverse le cadre en bande, sur un washi gris clair (fibres de kōzo,
   vergeures, feuilles collées bout à bout). Il se lit de droite à gauche. Au repos, seul son début est déroulé : la couverture de
   brocart indigo et son cordon, le titre 一日の巻 (« le rouleau d'un jour ») à l'encre noire franche, son sceau ; à gauche, le reste
   du rouleau encore serré sur son axe de bois laqué.
   La loi, trois calculs nommés. (1) Les nuages d'or suyari-gasumi : leurs bords sont un bruit fractal (fBm à 5 octaves,
   Mandelbrot–Van Ness 1968) échantillonné par cellules et QUANTIFIÉ en paliers de 0,028 hauteur : les marches droites aux coins
   arrondis des nuages de Heian. Près des jointures, les bords rejoignent un niveau commun : les feuilles se raccordent dans
   n'importe quel ordre. (2) Les architectures en fukinuki yatai (« toit soufflé ») : projection parallèle oblique
   x' = X + Y·k·cos α, y' = −Z − Y·k·sin α (α = 34°, k = 0,6), sans point de fuite, toits ôtés. (3) Le texte en colonnes
   (tategaki) est justifié : kinsoku de JIS X 4051 (ni 、 ni 。 en tête de colonne), choix oikomi/oidashi au moindre écart du pas,
   puis l'espace restant réparti entre les signes. L'or : posé en feuilles carrées (kinpaku), chacune avec sa normale froissée ;
   Blinn-Phong (1977), (N·H)^48 + (N·H)^320, par feuille, selon la lumière et la place à l'écran : l'or bouge quand on glisse.
   Le rayon du rouleau garde l'aire de la spirale : r = √(r₀² + e·L/π), L la longueur encore roulée.
   La main : aplats francs, contours nets à l'encre, aucun coup de pinceau ; gunjō, rokushō, shu, murasaki, gofun, or.
   L'usage : « Ta journée ». Chaque priorité faite DÉROULE une feuille (le cylindre roule, l'axe recule) : sa scène et sa couleur
   (990 l'azurite du pavillon sur l'eau, CUMBRE la malachite de la cime, Lecture le vermillon du cabinet aux érables, LE CLOSING le
   pourpre de la salle du sceau), son texte, son nom écrit dans le cartouche, son sceau rouge frappé. Les feuilles s'ajoutent dans
   l'ordre où la journée les fait. Le seuil (Boucler) : le colophon se déroule, la caméra recule et range tout le rouleau d'un coup,
   les scènes reliées par l'or ; une vague de feu court dans l'or, le grand sceau 日課成就 est frappé. L'état reste.
   Le doigt : glisser fait défiler le rouleau ; toucher une scène la nomme ; après le seuil, glisser déplace la lumière.
   Le budget : chaque feuille est peinte une fois (≤ 0,5 Mpx) par tranches de 6 ms ; par image, seuls l'or (une couleur par
   feuille d'or) et les sceaux sont recalculés. */

const etude_rouleau_DONNEES = Object.assign({
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
  colophon: { debut: "右、一日の事、ことごとく成る。日を連ぬること", fin: "日に及ぶ。", sceau: ["日", "課", "成", "就"], fr: "JOURNÉE BOUCLÉE" }
}, JOURNEE);

function etude_rouleau(){
  const { PI, abs, ceil, cos, exp, floor, hypot, max, min, pow, round, sin, sqrt } = Math;
  const D = etude_rouleau_DONNEES, P = D.priorites;
  const lerp = (a, b, u) => a + (b - a) * u;

  /* ---------- la palette : le gris de la table, le washi, l'encre noire franche, les pigments de Yamato-e, l'or ---------- */
  const TABLE = [34, 34, 38], TABLE_OMBRE = [16, 16, 19];
  const WASHI = [213, 210, 202], WASHI_DOS = [198, 194, 185];
  const SUMI = [12, 11, 11];                                   // P11 : l'encre est noire, franche
  const VERMILLON = [196, 36, 26];                             // la pâte à sceau (shuniku)
  const LAQUE = [26, 21, 20], BOIS = [104, 70, 44], PLANCHER = [172, 134, 90], TATAMI = [184, 174, 114];
  const GUNJO = D.scenes[0].couleur, ROKUSHO = D.scenes[1].couleur, SHU = D.scenes[2].couleur, MURASAKI = D.scenes[3].couleur;
  const GOFUN = [244, 240, 228], OCRE = [184, 132, 58], INDIGO = [30, 36, 78], PIN = [30, 82, 58], PIN_C = [60, 116, 76];
  const OR_SOMBRE = [98, 68, 24], OR_MOYEN = [192, 146, 60], OR_CLAIR = [255, 218, 128], OR_BORD = [92, 64, 22];
  const JP = '"Hiragino Mincho ProN", "Yu Mincho", YuMincho, "Noto Serif CJK JP", "Noto Serif JP", "Source Han Serif JP", serif';
  const SERIF = 'Georgia, "Times New Roman", serif', MONO = 'ui-monospace, Consolas, monospace';

  /* ---------- géométrie du rouleau (en hauteurs de bande) ---------- */
  const L_TITRE = .72, L_SCENE = 1.05, L_COLO = .8, L_TOTAL = L_TITRE + 4 * L_SCENE + L_COLO;
  const R_AXE = .022, EPAISSEUR = .0034;                       // rayon de l'axe, épaisseur apparente du papier roulé
  const PAS_NUAGE = .028, CELLULE = .05, T_OR = .044;          // paliers des nuages, cellule du bruit, côté d'une feuille d'or
  const ALPHA = 34 * PI / 180, K_OBL = .6, KX = -K_OBL * cos(ALPHA), KY = K_OBL * sin(ALPHA);
  const DUREE = 2300;                                          // déroulement d'une feuille (ms)
  const LW = .0034;                                            // le trait d'encre, en hauteurs de bande

  const M = { titre: "LE ROULEAU", bouton: libelleGeste(0), ligne: ligneGeste(0), dprMax: 1.5 };
  let W = 390, H = 520, DPR = 1, seed = 11, echelle = 0;
  let Hl = 300, bandY = 100, grille = null;
  let secs = {}, couverture = null, grandSceau = null, chantier = null;
  let ordre = [], tRev = [null, null, null, null], tS = null;
  let Uan = { de: L_TITRE, a: L_TITRE, t: null }, Cam = { de: 0, a: 0, t: null, x: 0 };
  let lumDx = 0, lumDy = 0, eclat = {}, etiquette = null, dernierGeste = -1e9, rects = [];

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

  /* =================================== les nuages d'or (la loi 1) =================================== */
  function nuages(S, R){
    const L = S.L, n = max(4, round(L / CELLULE)), cw = L / n, Q = v => round(v / PAS_NUAGE) * PAS_NUAGE;
    const fa = fbm(R), fb = fbm(R), fc = fbm(R), fd = fbm(R), fe = fbm(R);
    const garde = S.garde || [];
    const garde_ = u => garde.some(g => u > g[0] - .015 && u < g[1] + .015);
    const couches = [[], [], [], []];
    for (let i = 0; i < n; i++){
      const uc = (i + .5) * cw, d = min(uc, L - uc), w = lisse((d - .03) / .17), gd = garde_(uc);
      // la bande du haut : bord inférieur fractal, quantifié ; il rejoint .14 aux jointures
      let e = Q(lerp(.14, .05 + .2 * fa(uc * 1.9 + S.k * 7), w)); if (gd) e = min(e, .17);
      couches[0].push([-.06, e]);
      // une barre détachée sous la bande, quand le bruit le veut
      const b2 = fb(uc * 2.3 + S.k * 5);
      couches[1].push(!gd && w > .6 && b2 > .56 ? [e + PAS_NUAGE, e + PAS_NUAGE + Q(.03 + .07 * (b2 - .56) / .44)] : null);
      // la bande du bas, en miroir
      let f = Q(lerp(.86, .95 - .19 * fc(uc * 1.7 + S.k * 3), w)); if (gd) f = max(f, .8);
      couches[2].push([f, 1.06]);
      const b4 = fd(uc * 2.1 + S.k * 9);
      couches[3].push(!gd && w > .6 && b4 > .58 ? [f - PAS_NUAGE - Q(.03 + .06 * (b4 - .58) / .42), f - PAS_NUAGE] : null);
    }
    const rects = [], r = .014;
    const runs = col => { let i = 0;
      while (i < n){ if (!col[i]){ i++; continue; }
        let j = i; while (j + 1 < n && col[j + 1] && col[j + 1][0] === col[i][0] && col[j + 1][1] === col[i][1]) j++;
        const u0 = i === 0 ? -.06 : i * cw - r, u1 = j === n - 1 ? L + .06 : (j + 1) * cw + r;
        rects.push([u0, col[i][0], u1, col[i][1]]); i = j + 1; } };
    couches.forEach(runs);
    // les brumes posées par la scène : position choisie, bords calculés (bruit quantifié)
    (S.brumes || []).forEach(([u0, u1, vc, ep]) => {
      const i0 = max(0, floor(u0 / cw)), i1 = min(n - 1, floor(u1 / cw)), col = Array(n).fill(null);
      for (let i = i0; i <= i1; i++){ const uc = (i + .5) * cw, t = Q(ep * (.5 + 1.1 * fe(uc * 3.1 + vc * 10))), c0 = Q(vc + .05 * (fd(uc * 1.3 + 4) - .5));
        if (t > 0) col[i] = [c0 - t / 2, c0 + t / 2]; }
      runs(col);
    });
    // les piliers de brume aux jointures : niveaux communs, pour que deux feuilles se raccordent toujours
    rects.push([-.06, .364, .075, .42], [-.06, .56, .047, .616], [L - .075, .364, L + .06, .42], [L - .047, .56, L + .06, .616]);
    const chemin = new Path2D();
    rects.forEach(q => roundRect(chemin, q[0], q[1], q[2], q[3], r));
    S.nuages = chemin; S.rectsNuages = rects;
  }
  function contourNuages(c, S){
    c.lineWidth = .008; c.strokeStyle = rgb(OR_BORD);
    S.rectsNuages.forEach(q => { const p = new Path2D(); roundRect(p, q[0], q[1], q[2], q[3], .014); c.stroke(p); });
  }
  function feuillesOr(S, R){
    const nx = ceil(S.L / T_OR), ny = ceil(1 / T_OR), cv = document.createElement("canvas");
    cv.width = nx; cv.height = ny;
    const cx = cv.getContext("2d"), img = cx.createImageData(nx, ny), marque = new Uint8Array(nx * ny);
    S.rectsNuages.forEach(([u0, v0, u1, v1]) => {
      for (let j = max(0, floor(v0 / T_OR)); j <= min(ny - 1, floor(v1 / T_OR)); j++)
        for (let i = max(0, floor(u0 / T_OR)); i <= min(nx - 1, floor(u1 / T_OR)); i++) marque[j * nx + i] = 1; });
    const liste = [], nrm = new Float32Array(nx * ny * 3), b2 = bruit2(floor(R() * 1e6));
    for (let q = 0; q < nx * ny; q++){
      if (!marque[q]) continue; liste.push(q);
      const i = q % nx, j = (q / nx) | 0;
      const ax = .3 * (b2(i * .3, j * .3) - .5) + .06 * (R() - .5), ay = .3 * (b2(i * .3 + 40, j * .3 + 17) - .5) + .06 * (R() - .5), l = hypot(ax, ay, 1);
      nrm[q * 3] = ax / l; nrm[q * 3 + 1] = ay / l; nrm[q * 3 + 2] = 1 / l;
      img.data[q * 4 + 3] = 255;
    }
    const joints = new Path2D();   // les jointures entre feuilles d'or, en traits fins
    for (let i = 1; i < nx; i++){ joints.moveTo(i * T_OR, 0); joints.lineTo(i * T_OR, 1); }
    for (let j = 1; j < ny; j++){ joints.moveTo(0, j * T_OR); joints.lineTo(S.L, j * T_OR); }
    S.or = { nx, ny, cv, cx, img, liste: Int32Array.from(liste), nrm, joints };
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
    for (let k = 0; k < nP; k++) panneau(c, p, [x + w * k / nP, Y1, z], [x + w * (k + 1) / nP, Y1, z], h, mur, motif);
    const nQ = max(2, round(d / .1));
    for (let k = nQ - 1; k >= 0; k--) panneau(c, p, [X1, y + d * (k + 1) / nQ, z], [X1, y + d * k / nQ, z], h, mix(mur, SUMI, .1), motif);
    poteau(c, p, x, Y1, z, z + h, pil, .011); poteau(c, p, X1, Y1, z, z + h, pil, .011);
    face(c, p, [x, Y1, z + h], [X1, Y1, z + h], [X1, Y1, z + h - .012], [x, Y1, z + h - .012], pil, .002);
    face(c, p, [X1, y, z + h], [X1, Y1, z + h], [X1, Y1, z + h - .012], [X1, y, z + h - .012], pil, .002);
    return () => {
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
      peindre: (c, R) => [
        () => { mont(c, [[-.05, .44], [.1, .34], [.24, .39], [.38, .3], [.52, .37], [.66, .33], [.76, .42]], .6, mix(ROKUSHO, WASHI, .35), GUNJO, R); },
        () => { const bord = []; for (let k = 0; k <= 26; k++){ const u = -.05 + .82 * k / 26; bord.push([u, .55 + .03 * sin(u * 8 + 1) + .014 * sin(u * 23)]); }
          eau(c, bord, 1.06, GUNJO); rive(c, bord); },
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
        () => { const ch = [[.64, .9], [.56, .8], [.6, .72], [.5, .64], [.44, .54], [.4, .42], [.37, .28]];
          c.lineCap = "round"; c.lineJoin = "round";
          [[.02, SUMI], [.014, OCRE]].forEach(([lw, coul]) => { c.beginPath(); ch.forEach((q, k) => k ? c.lineTo(q[0], q[1]) : c.moveTo(q[0], q[1])); c.lineWidth = lw; c.strokeStyle = rgb(coul); c.stroke(); });
          c.lineCap = "butt"; c.lineWidth = .0018; c.strokeStyle = rgb(SUMI);
          for (let k = 0; k < ch.length - 1; k++) for (let m = 1; m < 4; m++){ const x = lerp(ch[k][0], ch[k + 1][0], m / 4), y = lerp(ch[k][1], ch[k + 1][1], m / 4);   // les marches
            c.beginPath(); c.moveTo(x - .007, y); c.lineTo(x + .007, y); c.stroke(); } },
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
          // l'étagère de livres, contre le mur du fond
          const lv = [[INDIGO, .03], [OCRE, .02], [GUNJO, .025], [mix(SHU, SUMI, .3), .02]];
          let z0 = .05; lv.forEach(([col, ep]) => { face(c, p, [.16, .33, z0], [.24, .33, z0], [.24, .33, z0 + ep], [.16, .33, z0 + ep], col, .002); z0 += ep; });
          face(c, p, [.16, .33, z0], [.24, .33, z0], [.24, .4, z0], [.16, .4, z0], mix(INDIGO, GOFUN, .3), .002);
          // la table basse et le livre ouvert
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
          face(c, p, [.25, .07, .061], [.4, .07, .061], [.4, .13, .061], [.25, .13, .061], GOFUN, .002);   // l'acte, et son sceau
          c.lineWidth = .0014; c.strokeStyle = rgb(SUMI);
          for (let k = 1; k < 7; k++){ const a = p(.25 + k * .018, .075, .061), b = p(.25 + k * .018, .125, .061); c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke(); }
          const sx = p(.37, .1, .061); c.fillStyle = rgb(VERMILLON); c.fillRect(sx[0] - .007, sx[1] - .007, .014, .014);
          devant(); },
        () => { oiseaux(c, [[.08, .3, .012], [.12, .28, .01]]); }
      ]
    }
  ];

  function nouvelleSection(cle, k){
    const S = { cle, k, L: cle === "t" ? L_TITRE : cle === "c" ? L_COLO : L_SCENE, cv: null };
    if (typeof cle === "number"){
      S.garde = [[.74, .96]]; S.brumes = SCENES[cle].brumes;
      const nom = P[cle].nom.toUpperCase(), pas = .04;
      S.lettres = [...nom];
      S.cart = { u: .63, v: .045, w: .076, h: .036 + S.lettres.reduce((a, ch) => a + (ch === " " ? pas * .45 : pas), 0) };
      S.sc = { u: .63 + .038 - .032, v: 0, s: .064 }; S.sc.v = S.cart.v + S.cart.h + .014;
    }
    if (cle === "t") S.garde = [[.1, .58]];
    if (cle === "c") S.garde = [[.04, .76]];
    return S;
  }

  /* les toiles d'une feuille : base (papier, scène, texte), cartouche, sceau ; l'or est calculé à chaque image */
  function toileUnites(L, s){
    const cv = document.createElement("canvas"); cv.width = ceil(L * s); cv.height = ceil(s);
    const c = cv.getContext("2d"); c.setTransform(s, 0, 0, s, 0, 0); return [cv, c];
  }
  function sceau(chars, cote, s, R){
    const px = ceil(cote * s), cv = document.createElement("canvas"); cv.width = cv.height = px;
    const c = cv.getContext("2d"), m = px * .07;
    c.fillStyle = rgb(VERMILLON); c.fillRect(0, 0, px, px);
    c.strokeStyle = rgb(WASHI); c.lineWidth = max(1, px * .035); c.strokeRect(m, m, px - 2 * m, px - 2 * m);
    c.fillStyle = rgb(WASHI); c.textAlign = "center"; c.textBaseline = "middle";
    if (chars.length === 1){ c.font = `700 ${px * .62}px ${JP}`; c.fillText(chars[0], px / 2, px / 2 + px * .02); }
    else { c.font = `700 ${px * .36}px ${JP}`;   // 2 × 2, lu en colonnes de droite à gauche
      [[.73, .3], [.73, .72], [.27, .3], [.27, .72]].forEach(([u, v], k) => c.fillText(chars[k], px * u, px * v + px * .01)); }
    for (let k = 0; k < 26; k++){ c.fillStyle = k % 3 ? rgb(WASHI) : rgb(VERMILLON);   // la pâte qui manque, nette
      c.fillRect(R() * px, R() * px, max(1, px * .012 * (1 + R())), max(1, px * .012 * (1 + R()))); }
    return cv;
  }
  function* peindreSection(S){
    const s = echelle, R = graine(seed * 131 + (typeof S.cle === "number" ? S.cle + 3 : S.cle === "t" ? 1 : 2) * 977);
    const [cv, c] = toileUnites(S.L, s);
    papier(c, S.L, R, s, cv.width, cv.height); yield;
    nuages(S, R);
    if (typeof S.cle === "number"){
      for (const pas of SCENES[S.cle].peindre(c, R)){ pas(); yield; }
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
      S.grand = sceau(C.sceau, .34, s, R);
    } else {
      S.mise = colonnes(D.scenes[S.cle].texte, .52, .04, .044);
      ecrireColonnes(c, s, S.mise, .93, .23, .04, .052);
      // le cartouche : le nom de la priorité, en capitales gravées, sur un papier teinté de la couleur de la scène
      const K = S.cart, cw = ceil(K.w * s), ch = ceil(K.h * s), coul = D.scenes[S.cle].couleur;
      const fondC = document.createElement("canvas"); fondC.width = cw; fondC.height = ch;
      const f = fondC.getContext("2d");
      f.fillStyle = rgb(mix(coul, GOFUN, .7)); f.fillRect(0, 0, cw, ch);
      for (let k = 0; k < 18; k++){ f.fillStyle = rgb(mix(OR_MOYEN, OR_CLAIR, R() * .5)); const q = (.004 + R() * .006) * s; f.fillRect(R() * cw, R() * ch, q, q); }   // kirihaku
      f.strokeStyle = rgb(SUMI); f.lineWidth = max(1, .0034 * s); f.strokeRect(.003 * s, .003 * s, cw - .006 * s, ch - .006 * s);
      f.lineWidth = max(.6, .0014 * s); f.strokeRect(.009 * s, .009 * s, cw - .018 * s, ch - .018 * s);
      const lettres = document.createElement("canvas"); lettres.width = cw; lettres.height = ch;
      const l = lettres.getContext("2d"); l.fillStyle = rgb(SUMI); l.font = `700 ${.032 * s}px ${SERIF}`; l.textAlign = "center"; l.textBaseline = "middle";
      let y = .018 + .02;
      S.lettres.forEach(ch2 => { if (ch2 === " "){ y += .04 * .45; return; } l.fillText(ch2, cw / 2, y * s); y += .04; });
      S.cartFond = fondC; S.cartLettres = lettres;
      S.sceau = sceau([D.scenes[S.cle].sceau], S.sc.s, s, R);
    }
    yield;
    feuillesOr(S, R);
    S.cv = cv;
  }
  function peindreCouverture(){
    const s = echelle, R = graine(seed * 7 + 5), L = .36, [cv, c] = toileUnites(L, s);
    c.clearRect(0, 0, L, 1);
    c.fillStyle = rgb(INDIGO); c.fillRect(0, 0, .2, 1);
    c.save(); c.beginPath(); c.rect(0, 0, .2, 1); c.clip();   // tatewaku : les vapeurs montantes, en fil d'or
    c.lineWidth = .0035; c.strokeStyle = rgb(OR_MOYEN);
    for (let x0 = .02; x0 < .22; x0 += .05) for (const sg of [-1, 1]){ c.beginPath();
      for (let y = 0; y <= 1.001; y += .01) c.lineTo(x0 + sg * .011 * sin(y * PI * 8), y); c.stroke(); }
    c.fillStyle = rgb(mix(OR_MOYEN, GOFUN, .3));
    for (let x0 = .045; x0 < .22; x0 += .05) for (let y = .04; y < 1; y += .0625){ c.beginPath(); c.arc(x0, y + (x0 * 20 % 2) * .03, .005, 0, PI * 2); c.fill(); }
    c.restore();
    // le daisen (étiquette du titre)
    trace(c, [[.07, .08], [.12, .08], [.12, .5], [.07, .5]], mix(WASHI, GOFUN, .4), .002);
    c.save(); c.setTransform(1, 0, 0, 1, 0, 0); c.fillStyle = rgb(SUMI); c.font = `600 ${.034 * s}px ${JP}`; c.textAlign = "center"; c.textBaseline = "middle";
    [...D.titre.grand].forEach((ch, k) => c.fillText(ch, .095 * s, (.13 + k * .1) * s)); c.restore();
    trace(c, [[.2, 0], [.214, 0], [.214, 1], [.2, 1]], [150, 126, 76], .0022);   // le hassō (baguette de bord)
    // le cordon (himo), vermillon foncé
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
  }
  function avancer(budget){
    if (!chantier) return; const t0 = performance.now();
    while (performance.now() - t0 < budget){ if (chantier.next().done){ chantier = null; break; } }
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
  function calculerGrille(){
    const seq = ["t", ...(ordre.length === 4 ? ordre : [0, 1, 2, 3]), "c"], n = seq.length;
    const mg = 16, haut = 58, bas = 92, Wa = W - 2 * mg, Ha = H - haut - bas, ecart = .16;
    let best = null;
    for (let masque = 0; masque < (1 << (n - 1)); masque++){
      const rangs = [[seq[0]]];
      for (let k = 1; k < n; k++){ if (masque & (1 << (k - 1))) rangs.push([]); rangs[rangs.length - 1].push(seq[k]); }
      const lmax = max(...rangs.map(r => longueur(r))) + .3, r = rangs.length;
      const hb = min(Wa / lmax, Ha / (r + (r - 1) * ecart));
      if (!best || hb > best.hb + .5) best = { hb, rangs };
    }
    const { hb, rangs } = best, totH = hb * (rangs.length + (rangs.length - 1) * ecart);
    const pos = {}; let y = haut + (Ha - totH) / 2;
    rangs.forEach(r => { let x = W / 2 + longueur(r) * hb / 2 - .06 * hb;
      r.forEach(k => { const w = secs[k].L * hb; x -= w; pos[k] = { x, y, w, h: hb }; }); y += hb * (1 + ecart); });
    grille = { hb, pos };
  }

  /* =================================== le rendu de chaque image =================================== */
  const Lum = { x: 0, y: 0 };
  function dorer(ctx, S, Rr, boost, onde){
    const G = S.or; if (!G) return;
    const k = Rr.h, d = G.img.data, nx = G.nx, nrm = G.nrm, ez = 1.7 * max(W, H), lz = .9 * max(W, H);
    for (let q = 0; q < G.liste.length; q++){
      const idx = G.liste[q], i = idx % nx, j = (idx / nx) | 0;
      const px = Rr.x + (i + .5) * T_OR * k, py = Rr.y + (j + .5) * T_OR * k;
      let lx = Lum.x - px, ly = Lum.y - py, l = 1 / hypot(lx, ly, lz); lx *= l; ly *= l; const lzn = lz * l;
      let vx = W / 2 - px, vy = H / 2 - py, v = 1 / hypot(vx, vy, ez); vx *= v; vy *= v; const vzn = ez * v;
      let hx = lx + vx, hy = ly + vy, hz = lzn + vzn, hh = 1 / hypot(hx, hy, hz); hx *= hh; hy *= hh; hz *= hh;
      const n0 = nrm[idx * 3], n1 = nrm[idx * 3 + 1], n2 = nrm[idx * 3 + 2];
      const nl = max(0, n0 * lx + n1 * ly + n2 * lzn), nh = max(0, n0 * hx + n1 * hy + n2 * hz);
      const w = onde ? onde(S, i) : 0, b = boost + w;
      const sp = min(.9, (pow(nh, 48) * .42 + pow(nh, 320) * .8) * b) * .8, lum = (.3 + .7 * nl) * (.86 + .12 * (b - 1));
      d[idx * 4] = min(255, OR_SOMBRE[0] + (OR_MOYEN[0] - OR_SOMBRE[0]) * lum + OR_CLAIR[0] * sp + 40 * w);
      d[idx * 4 + 1] = min(255, OR_SOMBRE[1] + (OR_MOYEN[1] - OR_SOMBRE[1]) * lum + OR_CLAIR[1] * sp + 6 * w);
      d[idx * 4 + 2] = max(0, min(255, OR_SOMBRE[2] + (OR_MOYEN[2] - OR_SOMBRE[2]) * lum + OR_CLAIR[2] * sp - 18 * w));
    }
    G.cx.putImageData(G.img, 0, 0);
    ctx.save();
    ctx.beginPath(); ctx.rect(Rr.x, Rr.y, Rr.w, Rr.h); ctx.clip();
    ctx.translate(Rr.x, Rr.y); ctx.scale(k, k); ctx.clip(S.nuages);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(G.cv, 0, 0, nx * T_OR, G.ny * T_OR);
    ctx.lineWidth = max(.6 / k, .0016); ctx.strokeStyle = "rgba(112,78,26,.5)"; ctx.stroke(G.joints);
    ctx.restore();
  }
  function rouleau(ctx, xd, y, h, r, phase){
    const Rr = r * h, cx = xd - Rr, kr = max(Rr * .5, .016 * h), kh = .06 * h;
    // l'axe dépasse en bas
    trace(ctx, [[cx - kr, y + h], [cx + kr, y + h], [cx + kr, y + h + kh], [cx - kr, y + h + kh]], LAQUE, 1.2);
    ctx.fillStyle = rgb(OR_MOYEN); ctx.fillRect(cx - kr, y + h + kh * .2, kr * 2, max(1, kh * .1));
    // le cylindre : sept aplats, l'éclairage en paliers (pas de dégradé)
    const nb = 7;
    for (let b = 0; b < nb; b++){
      const a0 = -PI / 2 + PI * b / nb, a1 = a0 + PI / nb, am = (a0 + a1) / 2;
      const e = clamp(.35 + .65 * cos(am + .55)), coul = mix(mix(WASHI_DOS, SUMI, .45), mix(WASHI, GOFUN, .3), e);
      ctx.fillStyle = rgb(coul); ctx.fillRect(cx + Rr * sin(a0), y, Rr * (sin(a1) - sin(a0)) + .5, h);
    }
    ctx.lineWidth = 1; ctx.strokeStyle = "rgba(60,56,50,.55)";   // les bords des tours de papier, qui tournent avec le rouleau
    for (let m = 0; m < 3; m++){ const a = ((phase + m * 2.09) % (PI * 2) + PI * 2) % (PI * 2) - PI; if (abs(a) > PI / 2 - .05) continue;
      const x = cx + Rr * sin(a); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.stroke(); }
    ctx.lineWidth = 1.2; ctx.strokeStyle = rgb(SUMI); ctx.strokeRect(cx - Rr, y, Rr * 2, h);
    // la tranche du haut : la spirale des tours de papier
    const ry = .22;
    ctx.beginPath(); ctx.ellipse(cx, y, Rr, Rr * ry, 0, 0, PI * 2); ctx.fillStyle = rgb(mix(WASHI, GOFUN, .2)); ctx.fill();
    ctx.lineWidth = .8; ctx.strokeStyle = "rgba(70,64,56,.7)"; ctx.beginPath();
    const tours = 4, rc = R_AXE * h;
    for (let f = 0; f <= tours * PI * 2; f += .2){ const q = rc + (Rr - rc) * f / (tours * PI * 2); ctx.lineTo(cx + q * cos(f - phase), y + q * sin(f - phase) * ry); }
    ctx.stroke();
    ctx.lineWidth = 1.2; ctx.strokeStyle = rgb(SUMI); ctx.beginPath(); ctx.ellipse(cx, y, Rr, Rr * ry, 0, 0, PI * 2); ctx.stroke();
    // l'axe dépasse en haut, laque et anneau d'or
    trace(ctx, [[cx - kr, y - kh], [cx + kr, y - kh], [cx + kr, y], [cx - kr, y]], LAQUE, 1.2);
    ctx.fillStyle = "rgba(255,255,255,.18)"; ctx.fillRect(cx - kr * .55, y - kh, kr * .35, kh);
    ctx.beginPath(); ctx.ellipse(cx, y - kh, kr, kr * ry, 0, 0, PI * 2); ctx.fillStyle = rgb(mix(LAQUE, GOFUN, .12)); ctx.fill(); ctx.lineWidth = 1.2; ctx.strokeStyle = rgb(SUMI); ctx.stroke();
    ctx.fillStyle = rgb(OR_MOYEN); ctx.fillRect(cx - kr, y - kh * .3, kr * 2, max(1, kh * .1));
  }
  function frappe(ctx, cv, x, y, w, a, dur, ombre){   // un sceau qui descend et frappe ; puis l'empreinte reste
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
    if (cle === "c") return ["COLOPHON · " + D.colophon.fr, `日課成就 · ${D.chaine + 1} jours d'affilée`];
    const sc = D.scenes[cle]; return [`${ROMAIN[rang] || ""} · ${P[cle].nom.toUpperCase()}`, `${sc.scene.toLowerCase()} · ${sc.pigment}`];
  }

  function frame(ctx, t){
    avancer(6);
    const aS = tS === null ? -1 : t - tS;
    let sx = 0, sy = 0;
    if (aS > 5450 && aS < 5800){ const q = (5800 - aS) / 350; sx = sin(aS * .21) * 3 * q; sy = cos(aS * .17) * 3 * q; }   // le coup du grand sceau
    ctx.save(); ctx.fillStyle = rgb(TABLE); ctx.fillRect(0, 0, W, H); ctx.translate(sx, sy);
    const seq = sequence(), pos = positions(seq), U = uNow(t), cam = camNow(t);
    Lum.x = W * (.5 + .36 * sin(t / 5600)) + lumDx; Lum.y = H * .2 + H * .1 * cos(t / 7300) + lumDy;
    if (tS !== null && !grille) calculerGrille();
    // la place de chaque feuille : en bande (la caméra), puis rangée dans le cadre au seuil
    let gmin = 1, gmax = 0;
    rects = seq.map((k, n) => {
      const L = secs[k].L, live = { x: W / 2 + (-(pos[n] + L) - cam) * Hl, y: bandY, w: L * Hl, h: Hl };
      if (tS === null || !grille) { gmin = 0; return { k, n, ...live }; }
      const g = lisse((aS - 1950 - n * 120) / 1900), G = grille.pos[k]; gmin = min(gmin, g); gmax = max(gmax, g);
      return { k, n, g, x: lerp(live.x, G.x, g), y: lerp(live.y, G.y, g), w: lerp(live.w, G.w, g), h: lerp(live.h, G.h, g) };
    });
    const xCoupe = W / 2 + (-U - cam) * Hl;   // le papier n'existe qu'à droite du rouleau
    const coupe = gmax === 0;
    // les ombres portées sur la table
    ctx.fillStyle = rgb(TABLE_OMBRE, .55);
    rects.forEach(r => { const x0 = coupe ? max(r.x, xCoupe) : r.x; if (r.x + r.w > x0) ctx.fillRect(x0 + r.h * .012, r.y + r.h * .035, r.x + r.w - x0, r.h); });
    ctx.save();
    if (coupe){ ctx.beginPath(); ctx.rect(xCoupe, -10, W - xCoupe + 10, H + 20); ctx.clip(); }
    const Ef = tS === null ? 0 : lisse((aS - 3300) / 1500);
    const front = tS === null ? -9 : (aS - 3300) / 1700 * (L_TOTAL + .8) - .4;
    rects.forEach(r => {
      if (r.x > W + 4 || r.x + r.w < -4) return;
      const S = secs[r.k];
      if (S.cv) ctx.drawImage(S.cv, r.x, r.y, r.w, r.h);
      else { ctx.fillStyle = rgb(WASHI); ctx.fillRect(r.x, r.y, r.w, r.h); }
      // l'or : flash quand la feuille se déroule, quand on la touche, et l'embrasement du seuil
      const tr = typeof r.k === "number" ? tRev[r.k] : null;
      let boost = 1 + .55 * Ef;
      if (tr !== null){ const a = t - tr; boost += 1.5 * exp(-pow((a - 2300) / 700, 2)); }
      if (eclat[r.k] !== undefined) boost += 1.6 * exp(-(t - eclat[r.k]) / 700);
      const s0 = pos[r.n];
      const onde = tS !== null && aS > 3000 && aS < 5600 ? (Sx, i) => 2.4 * exp(-pow((s0 + Sx.L - (i + .5) * T_OR - front) / .28, 2)) : null;
      if (S.cv) dorer(ctx, S, r, boost, onde);
      // le cartouche s'écrit, puis le sceau rouge frappe
      if (typeof r.k === "number" && S.cartFond){
        const a = tr === null ? 1e9 : t - tr, k = r.h, K = S.cart;
        const x = r.x + K.u * k, y = r.y + K.v * k, w = K.w * k, h = K.h * k;
        ctx.fillStyle = "rgba(0,0,0,.28)"; ctx.fillRect(x + k * .006, y + k * .008, w, h);
        ctx.drawImage(S.cartFond, x, y, w, h);
        const ec = lisse((a - 1500) / 900);
        if (ec > 0){ ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h * ec); ctx.clip(); ctx.drawImage(S.cartLettres, x, y, w, h); ctx.restore(); }
        frappe(ctx, S.sceau, r.x + S.sc.u * k, r.y + S.sc.v * k, S.sc.s * k, a - 2450, 320, true);
      }
      if (r.k === "c" && S.grand){   // le grand sceau final
        const k = r.h, a = aS - 5000, wq = .36 * k;
        frappe(ctx, S.grand, r.x + .06 * k, r.y + .3 * k, wq, a, 480, true);
      }
      if (etiquette && etiquette.k === r.k){ const al = 1 - lisse((t - etiquette.t - 2600) / 600);
        if (al > 0){ ctx.save(); ctx.globalAlpha = al; ctx.lineWidth = 2; ctx.strokeStyle = rgb(BLANC); ctx.strokeRect(r.x + 1, r.y + 1, r.w - 2, r.h - 2); ctx.restore(); } }
    });
    ctx.restore();
    // la couverture, accrochée au début (à droite) ; le rouleau serré, à gauche de ce qui est déroulé
    const r0 = rects[0];
    if (couverture) ctx.drawImage(couverture.cv, r0.x + r0.w, r0.y, couverture.L * r0.h, r0.h);
    const rl = rects[rects.length - 1], rad = sqrt(R_AXE * R_AXE + EPAISSEUR * max(0, L_TOTAL - U) / PI);
    const xr = coupe ? xCoupe : rl.x;
    rouleau(ctx, xr, rl.y, rl.h, rad, U / rad);
    // la légende sous la bande : la feuille au centre
    const alC = 1 - lisse(gmax * 2.5);
    if (alC > 0){ let best = rects[0], dmin = 1e9;
      rects.forEach(r => { const d = abs(r.x + r.w / 2 - W / 2); if (d < dmin && r.x + r.w > xCoupe + 8){ dmin = d; best = r; } });
      const [a, b] = nomDe(best.k, best.n); legende(ctx, a, b, W / 2, bandY + Hl + max(26, Hl * .1), alC); }
    if (tS !== null && gmin > .99){ const al = lisse((aS - 6200) / 900);
      legende(ctx, "LE ROULEAU DÉROULÉ", `日課成就 · ${D.chaine + 1} jours · 4 feuilles`, W / 2, grille.pos[sequence()[sequence().length - 1]].y + grille.hb + 34, al * .9); }
    if (etiquette){ const al = 1 - lisse((t - etiquette.t - 2600) / 600), r = rects.find(q => q.k === etiquette.k);
      if (al > 0 && r){ const [a] = nomDe(r.k, r.n); ctx.save(); ctx.globalAlpha = al; ctx.font = `500 12px ${SERIF}`;
        const w = ctx.measureText(a).width + a.length * 1.6 + 20, x = clamp(r.x + r.w / 2, w / 2 + 6, W - w / 2 - 6), y = r.y + r.h - 14;
        ctx.fillStyle = "rgba(16,16,19,.86)"; ctx.fillRect(x - w / 2, y - 15, w, 22); ctx.fillStyle = rgb(BLANC); ctx.textAlign = "center"; espace(ctx, a, x, y, 1.6); ctx.restore(); } }
    ctx.restore();
    passeGrain(ctx, W, H, t, .03);
  }

  /* =================================== les gestes et l'API de l'app =================================== */
  function textes(){
    const n = ordre.length;
    M.bouton = tS !== null ? "Encore" : n < 4 ? P[[0, 1, 2, 3].find(i => !ordre.includes(i))].nom : "Boucler";
    M.ligne = tS !== null ? `rouleau déroulé · ${D.chaine + 1} jours` : n ? `${n} sur 4 · ${ordre.map(i => P[i].nom).join(" · ")}` : ligneGeste(0);
  }
  function etat(liste, boucle){
    ordre = [];
    (liste || []).forEach(i => { i = i | 0; if (i >= 0 && i < 4 && !ordre.includes(i)) ordre.push(i); });
    tRev = [0, 1, 2, 3].map(i => ordre.includes(i) ? -1e9 : null);
    tS = boucle && ordre.length === 4 ? -1e9 : null; grille = null;
    poser(); textes();
  }
  function aller(n){ n = clamp(n | 0, 0, 5); etat([0, 1, 2, 3].slice(0, min(n, 4)), n >= 5); }
  M.aller = aller;
  M.etat = etat;
  M.faire = i => { if (i < 0 || i > 3 || ordre.includes(i) || tS !== null) return; const t = maintenant();
    ordre.push(i); tRev[i] = t; derouler(t); textes();
    M.ligne = `${P[i].nom} · ${D.scenes[i].scene.toLowerCase()} · ${ordre.length} sur 4`; };
  M.retirer = i => { if (!ordre.includes(i)) return; etat(ordre.filter(k => k !== i), false); };
  M.boucler = () => { if (tS !== null || ordre.length < 4) return; const t = maintenant(); tS = t; grille = null; calculerGrille(); derouler(t); textes(); };
  M.faits = () => ordre.slice();
  M.boucle = () => tS !== null;
  M.taille = (w, h, dpr) => {
    W = w; H = h; DPR = min(dpr || 1, 1.5);
    Hl = min(H * .58, W * .9 / L_SCENE, 560); bandY = max(54, (H - Hl) / 2 - H * .035);
    const e = Hl * DPR;
    if (abs(e - echelle) > .5){ echelle = e; batir(); }
    grille = null; if (tS !== null) calculerGrille();
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
    for (const r of rects){ if (x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h){
      eclat[r.k] = t; etiquette = { k: r.k, t };
      if (r.k === "t") M.ligne = `${D.titre.grand} · le rouleau d'un jour · ${D.jour}`;
      else if (r.k === "c") M.ligne = `colophon · 日課成就 · ${D.chaine + 1} jours d'affilée`;
      else { const sc = D.scenes[r.k], m = secs[r.k].mise;
        M.ligne = `${P[r.k].nom} · ${sc.scene.toLowerCase()} · ${P[r.k].min} min` + (m ? ` · ${m.cols.length} colonnes` : ""); }
      return; } }
    if (tS === null) M.ligne = `le rouleau serré · ${4 - ordre.length} feuille${ordre.length === 3 ? "" : "s"} à dérouler`;
  };
  M.glisse = (dx, dy) => {
    if (tS !== null && t_grille()){ lumDx = clamp(lumDx + dx * 2, -W, W); lumDy = clamp(lumDy + dy * 2, -H, H); return; }
    const t = maintenant(), U = uNow(t);
    Cam = { de: 0, a: 0, t: null, x: clamp(camNow(t) - dx / Hl, -U + .2, -.25) };
    lumDx = clamp(lumDx + dx * .3, -W * .3, W * .3);
  };
  const t_grille = () => tS !== null && maintenant() - tS > 2000;
  echelle = Hl; batir(); aller(0);
  return M;
}
window.ETUDE = etude_rouleau;
