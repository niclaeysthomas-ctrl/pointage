/* ======================= Tour 3, pièce 11 : LA PIERRE DES LANGUES (etude_pierre3) ======================= */
/* Ce qu'on voit : une stèle de granodiorite, comme la pierre de Rosette, seule dans le noir, frappée d'une lumière rasante (clair-obscur).
   Chaque priorité faite grave SON registre lettre à lettre au ciseau (990 l'anglais, CUMBRE l'espagnol, Lecture le grec ancien,
   LE CLOSING une ligne de grand livre), puis un pigment précieux remplit les creux : lapis-lazuli (outremer profond, voiles de calcite,
   paillettes de pyrite qui scintillent selon la lumière), vermillon de cinabre (rouge chaud, sang dans le fond du V), malachite (bandes
   concentriques claires et sombres autour de ses « yeux »), or en feuille (carrés de feuille, froissure, reflet spéculaire calculé).
   La loi 1 (la taille) : transformée de distance euclidienne exacte de chaque lettre (Felzenszwalb & Huttenlocher, 2004) = profondeur
   d'un V à 45° ; Lambert sur la normale, ombre portée par marche dans la carte des hauteurs ; l'or suit Blinn-Phong (demi-vecteur).
   La loi 2 (le seuil) : la fissure est une percolation d'invasion (Wilkinson & Willemsen, 1983) dont la pointe s'emballe comme la
   contrainte de Griffith (K = σ√(πa)). Puis la pierre ÉCLATE : un diagramme de Voronoï dont la densité de germes suit la fissure et le
   point d'impact (les éclats sont fins là où la contrainte était forte, gros au loin), bords dentelés par un champ de bruit commun aux
   deux cellules voisines (les morceaux s'emboîtent exactement au repos). Chaque morceau part avec la vitesse d'une onde de choc issue de
   l'impact (retard = distance / vitesse de l'onde), tourne, tombe (gravité), rebondit sur le sol (restitution 0,3, frottement).
   La main : la pierre et le ciseau ; aucune couleur hors des pigments et de la lumière ; Georgia en capitales gravées, une ligne mono.
   L'usage : « Ta journée ». Quatre priorités, quatre registres, dans n'importe quel ordre ; la pierre dit la même chose en trois langues.
   Le doigt : toucher un mot le fait briller avec ses traductions ; glisser déplace la lumière (les reflets de l'or et de la pyrite tournent).
   Le seuil (Boucler, ~7 s) : les fils de traduction relient les mots, la fissure court en tremblant, la lumière perce, puis la stèle
   explose : éclats, poussière, morceaux qui retombent et s'entassent au sol ; derrière, une lumière dorée remplit l'écran, et les mots,
   libérés de la pierre, restent suspendus à leur place, en relief de pigment, brillants. Cet état reste. Encore : autre maxime, autre pierre.
   Le téléphone : la pierre (≤ 460 000 px) se construit par tranches de 9 ms ; l'éclairage avance par bandes ; la couche des mots, le
   Voronoï et la découpe des morceaux se préparent pendant la fissure, par tranches de 7 ms ; les morceaux sont des petites toiles
   prédécoupées (aucun découpage à l'image). Toiles cachées < 3 M px en tout. */
const etude_pierre3_DONNEES = Object.assign({
  langues: ["ANGLAIS", "ESPAGNOL", "GREC ANCIEN", "GRAND LIVRE"],
  pigments: [
    { nom: "LAPIS-LAZULI", c: [28, 52, 150], v: [90, 130, 255] },
    { nom: "VERMILLON", c: [196, 40, 22], v: [255, 106, 64] },
    { nom: "MALACHITE", c: [18, 112, 72], v: [80, 220, 150] },
    { nom: "OR", c: [206, 156, 58], v: [255, 214, 120] }
  ],
  date: [26, 10, 2026],
  comptes: ["512", "401", "411", "2154", "604", "106"],
  // la maxime, ses trois langues, et les liens mot à mot (indices des mots) qui se traduisent
  maximes: [
    { en: "PRACTICE IS EVERYTHING", es: "LA PRÁCTICA LO ES TODO", gr: "ΜΕΛΕΤΗ ΤΟ ΠΑΝ", src: "PÉRIANDRE",
      liens: [{ en: [0], es: [0, 1], gr: [0] }, { en: [1], es: [3], gr: [] }, { en: [2], es: [2, 4], gr: [1, 2] }] },
    { en: "KNOW THYSELF", es: "CONÓCETE A TI MISMO", gr: "ΓΝΩΘΙ ΣΕΑΥΤΟΝ", src: "DELPHES",
      liens: [{ en: [0], es: [0], gr: [0] }, { en: [1], es: [1, 2, 3], gr: [1] }] },
    { en: "BEAUTIFUL THINGS ARE HARD", es: "LO BELLO ES DIFÍCIL", gr: "ΧΑΛΕΠΑ ΤΑ ΚΑΛΑ", src: "PLATON",
      liens: [{ en: [0, 1], es: [0, 1], gr: [1, 2] }, { en: [2], es: [2], gr: [] }, { en: [3], es: [3], gr: [0] }] },
    { en: "EVERYTHING FLOWS", es: "TODO FLUYE", gr: "ΠΑΝΤΑ ΡΕΙ", src: "HÉRACLITE",
      liens: [{ en: [0], es: [0], gr: [0] }, { en: [1], es: [1], gr: [1] }] },
    { en: "NOTHING IN EXCESS", es: "NADA EN EXCESO", gr: "ΜΗΔΕΝ ΑΓΑΝ", src: "DELPHES",
      liens: [{ en: [0], es: [0], gr: [0] }, { en: [1], es: [1], gr: [] }, { en: [2], es: [2], gr: [1] }] },
    { en: "CHARACTER IS DESTINY", es: "EL CARÁCTER ES EL DESTINO", gr: "ΗΘΟΣ ΑΝΘΡΩΠΩΙ ΔΑΙΜΩΝ", src: "HÉRACLITE",
      liens: [{ en: [0], es: [0, 1], gr: [0] }, { en: [1], es: [2], gr: [] }, { en: [2], es: [3, 4], gr: [2] }] }
  ]
}, JOURNEE);

function etude_pierre3_romain(n){
  const T = [[1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"], [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
  let r = "";
  for (const [v, c] of T) {
    while (n >= v) { r += c; n -= v; }
  }
  return r;
}

/* La transformée de distance euclidienne exacte (Felzenszwalb & Huttenlocher) : g vaut 0 sur la cible, 1e20 ailleurs ; rend les carrés. */
function etude_pierre3_edt(g, w, h){
  const n = Math.max(w, h);
  const f = new Float64Array(n), d = new Float64Array(n), v = new Int32Array(n), z = new Float64Array(n + 1);
  const passe = len => {
    let k = 0;
    v[0] = 0; z[0] = -1e30; z[1] = 1e30;
    for (let q = 1; q < len; q++) {
      let s;
      for (;;) {
        const p = v[k];
        s = ((f[q] + q * q) - (f[p] + p * p)) / (2 * q - 2 * p);
        if (s <= z[k] && k > 0) k--; else break;
      }
      if (s <= z[k]) { v[0] = q; z[0] = -1e30; z[1] = 1e30; k = 0; continue; }
      k++; v[k] = q; z[k] = s; z[k + 1] = 1e30;
    }
    k = 0;
    for (let q = 0; q < len; q++) {
      while (z[k + 1] < q) k++;
      const r = q - v[k];
      d[q] = r * r + f[v[k]];
    }
  };
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) f[y] = g[y * w + x];
    passe(h);
    for (let y = 0; y < h; y++) g[y * w + x] = d[y];
  }
  for (let y = 0; y < h; y++) {
    const o = y * w;
    for (let x = 0; x < w; x++) f[x] = g[o + x];
    passe(w);
    for (let x = 0; x < w; x++) g[o + x] = d[x];
  }
}

/* Une cellule de Voronoï : on coupe le polygone par la médiatrice de (a, b) et on garde le côté de a (Sutherland–Hodgman). */
function etude_pierre3_couper(poly, a, b){
  const nx = b[0] - a[0], ny = b[1] - a[1];
  const c = (nx * (a[0] + b[0]) + ny * (a[1] + b[1])) / 2;
  const out = [];
  for (let k = 0; k < poly.length; k++) {
    const p = poly[k], q = poly[(k + 1) % poly.length];
    const fp = nx * p[0] + ny * p[1] - c, fq = nx * q[0] + ny * q[1] - c;
    if (fp <= 0) out.push(p);
    if ((fp < 0 && fq > 0) || (fp > 0 && fq < 0)) {
      const u = fp / (fp - fq);
      out.push([p[0] + (q[0] - p[0]) * u, p[1] + (q[1] - p[1]) * u]);
    }
  }
  return out;
}

function etude_pierre3(){
  const D = etude_pierre3_DONNEES, PRI = D.priorites;
  const BURST = 3600;                      // ms après « Boucler » : la pierre éclate
  let W = 390, H = 760, DPR = 1, seed = 196, variante = 0;
  let SX = 0, SY = 0, SW = 1, SH = 1, s = 1, w = 1, h = 1, N = 1;
  // la pierre : alpha, hauteur, profondeur de taille, lettre, abscisse dans la lettre, albédo, grain, normales, zone gravée, matières
  let A, Hs, Dc, Lid, U, ALB, GR, NX, NY, Z, MZ, CR, IMG, cvS = null, cxS, mur = null, ombre = null, teintes = [];
  let G = [], PR = new Float32Array(1), PG = new Float32Array(1), LV = new Float32Array(1), DM = new Float32Array(1);
  let mots = [[], [], [], []], regs = [], MAL = [], gen = null, pret = false, tPret = -1, V = D.maximes[0], livre = null;
  let tReg = [null, null, null, null], stale = true, tSeuil = null, dernierGeste = -1e9, derniere = -1;
  let az = Math.atan2(-.55, -.85), el = .3, vite = [], plein = null, encorePlein = false;
  let fissure = null, parts = [], lueur = null, frappe = -1, dernier = 0, cle = "";
  // l'éclatement
  let prep = null, pretBris = false, brise = false, tBrise = 0, morceaux = [], eclats = [], nuage = [];
  let motsCv = null, motsHalo = null, motsGen = null, cvFrag = null, fendGen = null, motsSil = null, posage = null;
  const mes = document.createElement("canvas").getContext("2d");
  const police = sz => `bold ${sz.toFixed(2)}px Georgia, "Times New Roman", serif`;
  const M = { titre: "LA PIERRE DES LANGUES", bouton: libelleGeste(0), ligne: "stèle vierge · chaîne " + D.chaine + " jours", dprMax: 1.5 };

  // la poussière : un disque doux, dessiné une fois
  const PLUME = (() => {
    const c = document.createElement("canvas");
    c.width = c.height = 32;
    const x = c.getContext("2d"), g = x.createRadialGradient(16, 16, 0, 16, 16, 16);
    g.addColorStop(0, "rgba(214,204,188,1)");
    g.addColorStop(.45, "rgba(196,186,170,.45)");
    g.addColorStop(1, "rgba(180,170,155,0)");
    x.fillStyle = g;
    x.fillRect(0, 0, 32, 32);
    return c;
  })();

  /* ---------- la mise en page des quatre registres (en px de travail) ---------- */
  function largeur1(txt, tr){
    mes.font = police(100);
    let L = 0, n = 0;
    for (const ch of txt) { L += mes.measureText(ch).width / 100 + tr; n++; }
    return L - (n ? tr : 0);
  }
  function poserLigne(k, txt, x, base, sz, tr, rub, wi0){
    mes.font = police(sz);
    let wi = wi0;
    for (const ch of txt) {
      const adv = mes.measureText(ch).width;
      if (ch === " ") wi++;
      else G.push({ reg: k, ch, x, y: base, sz, rub, wi: rub ? -1 : wi, x0: x, x1: x + adv, ly0: base - sz * 1.08, ly1: base + sz * .34 });
      x += adv + tr * sz;
    }
    return wi;
  }
  function mettreEnPage(){
    V = D.maximes[variante % D.maximes.length];
    const R = graine(seed * 3 + 11), pad = w * .075, larg = w - 2 * pad, r0 = h * .118, r1 = h * .962, bh = (r1 - r0) / 4;
    G = []; mots = [[], [], [], []]; regs = [];
    const montant = () => {
      const v = Math.round((.4 + R() * 8.6) * 1000) * 1000;
      return String(v).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };
    const m = montant();
    livre = [etude_pierre3_romain(D.date[0]) + "·" + etude_pierre3_romain(D.date[1]), "Nº " + D.comptes[(seed + variante) % D.comptes.length], m, m];
    for (let k = 0; k < 4; k++) {
      const y0 = r0 + k * bh, y1 = y0 + bh;
      regs.push({ y0, y1 });
      const rs = clamp(bh * .09, 9 * s, 13.5 * s);
      poserLigne(k, etude_pierre3_romain(k + 1) + " · " + PRI[k].nom.toUpperCase(), pad, y0 + rs * 1.7, rs, .2, true, 0);
      const ty0 = y0 + rs * 2.4, ty1 = y1 - bh * .08, cy = (ty0 + ty1) / 2;
      if (k < 3) {
        const words = [V.en, V.es, V.gr][k].split(" "), tr = .1;
        const coupes = [[words]];
        if (words.length > 1) {
          let best = null, bv = 1e9;
          for (let i = 1; i < words.length; i++) {
            const a = words.slice(0, i).join(" "), b = words.slice(i).join(" "), v = Math.max(a.length, b.length);
            if (v < bv) { bv = v; best = [words.slice(0, i), words.slice(i)]; }
          }
          coupes.push(best);
        }
        let choix = null, tail = 0;
        for (const c of coupes) {
          const lw = Math.max(...c.map(l => largeur1(l.join(" "), tr)));
          const sz = Math.min((ty1 - ty0) / (c.length * 1.25), larg * .97 / lw, bh * .4);
          if (sz > tail * 1.12) { tail = sz; choix = c; }
        }
        let wi = 0;
        choix.forEach((l, li) => {
          const txt = l.join(" "), lw = largeur1(txt, tr) * tail;
          const base = cy - (choix.length - 1) * tail * 1.25 / 2 + li * tail * 1.25 + tail * .36;
          const g0 = G.length;
          wi = poserLigne(k, txt, (w - lw) / 2, base, tail, tr, false, wi) + 1;
          for (let j = g0; j < G.length; j++) {
            const g = G[j];
            const M2 = mots[k][g.wi] || (mots[k][g.wi] = { x0: 1e9, y0: 1e9, x1: -1e9, y1: -1e9, t: "" });
            M2.x0 = Math.min(M2.x0, g.x0); M2.x1 = Math.max(M2.x1, g.x1);
            M2.y0 = Math.min(M2.y0, g.y - g.sz * .78); M2.y1 = Math.max(M2.y1, g.y + g.sz * .1);
            M2.t += g.ch;
          }
        });
      } else {
        const tr = .05, cw = larg / 4;
        let sz = Math.min((ty1 - ty0) * .5, bh * .3);
        livre.forEach(t => sz = Math.min(sz, cw * .84 / largeur1(t, tr)));
        const base = cy + sz * .28;
        livre.forEach((t, c) => {
          const lw = largeur1(t, tr) * sz, g0 = G.length;
          poserLigne(k, t, pad + c * cw + (cw - lw) / 2, base, sz, tr, false, c);
          for (let j = g0; j < G.length; j++) G[j].wi = c;
          mots[3][c] = { x0: pad + c * cw + (cw - lw) / 2, x1: pad + c * cw + (cw + lw) / 2, y0: base - sz * .8, y1: base + sz * .3, t };
        });
        const rect = (x0, y0, x1, y1, wi) => G.push({ reg: 3, r: true, x0, x1, y0, y1, ly0: y0 - 2, ly1: y1 + 2, wi, rub: false });
        for (let c = 1; c < 4; c++) {
          const x = pad + c * cw;
          rect(x - .75 * s, base - sz * 1.05, x + .75 * s, base + sz * .48, -1);
        }
        for (const dy of [sz * .5, sz * .5 + 3 * s]) rect(pad + 2 * cw + cw * .1, base + dy, pad + 4 * cw - cw * .1, base + dy + 1.7 * s, -1);
      }
    }
    // les « yeux » de la malachite : ses bandes tournent autour de quelques centres posés dans le registre III
    MAL = [];
    for (let i = 0; i < 7; i++) {
      MAL.push({ x: pad + (i + .2 + R() * .6) / 7 * larg, y: regs[2].y0 + (regs[2].y1 - regs[2].y0) * (.15 + .7 * R()), k: .8 + R() * .5 });
    }
    // le temps de chaque lettre (ms après le geste) : la rubrique d'abord, puis le texte, au prorata des largeurs ; puis le pigment
    for (let k = 0; k < 4; k++) {
      const rub = G.filter(g => g.reg === k && g.rub), tx = G.filter(g => g.reg === k && !g.rub);
      rub.forEach((g, i) => { g.a = i * 420 / rub.length; g.b = g.a + 420 / rub.length * 1.8; });
      const tot = tx.reduce((a, g) => a + Math.max(3 * s, g.x1 - g.x0), 0);
      let cum = 0;
      tx.forEach(g => {
        const L = Math.max(3 * s, g.x1 - g.x0);
        g.a = 450 + 2850 * cum / tot;
        cum += L;
        g.b = 450 + 2850 * cum / tot + 70;
      });
      G.filter(g => g.reg === k).forEach(g => { g.pa = 3150 + 650 * ((g.x0 + g.x1) / 2 / w); });
    }
    const n = G.length;
    PR = new Float32Array(n); PG = new Float32Array(n); LV = new Float32Array(n); DM = new Float32Array(n);
  }
  function dessinerGlyphe(c, g){
    if (g.r) c.fillRect(g.x0, g.y0, g.x1 - g.x0, g.y1 - g.y0);
    else { c.font = police(g.sz); c.fillText(g.ch, g.x, g.y); }
  }

  /* ---------- la taille d'un registre : masque, distance signée, profondeur en V ---------- */
  function graver(k, R){
    const B = regs[k], y0 = Math.max(0, Math.floor(B.y0) - 2), hh = Math.min(h, Math.ceil(B.y1) + 2) - y0;
    const cv = document.createElement("canvas");
    cv.width = w; cv.height = hh;
    const cx = cv.getContext("2d");
    cx.fillStyle = "#fff";
    cx.translate(0, -y0);
    const L = G.map((g, i) => i).filter(i => G[i].reg === k);
    L.forEach(i => dessinerGlyphe(cx, G[i]));
    const im = cx.getImageData(0, 0, w, hh).data, n = w * hh, gi = new Float64Array(n), go = new Float64Array(n);
    for (let i = 0; i < n; i++) {
      const ins = im[i * 4 + 3] > 127;
      gi[i] = ins ? 1e20 : 0;
      go[i] = ins ? 0 : 1e20;
    }
    etude_pierre3_edt(gi, w, hh);
    etude_pierre3_edt(go, w, hh);
    // le masque teinté (pour faire briller un mot touché)
    const tv = document.createElement("canvas");
    tv.width = w; tv.height = hh;
    const tc = tv.getContext("2d");
    tc.fillStyle = rgb(D.pigments[k].v);
    tc.translate(0, -y0);
    L.forEach(i => dessinerGlyphe(tc, G[i]));
    teintes[k] = { cv: tv, y0 };
    for (let i = 0; i < n; i++) {
      const a = im[i * 4 + 3];
      let dep = 0;
      if (a > 127) dep = Math.sqrt(gi[i]) - .5 + (a / 255 - .5);          // dedans : la distance au bord = la profondeur (V à 45°)
      else if (a > 0) dep = a / 255 * .5;
      else {                                                             // dehors : le bord s'écaille
        const dout = Math.sqrt(go[i]);
        if (dout < 1.8 * s && R() > .55) dep = (1 - dout / (1.8 * s)) * .4 * R();
      }
      if (dep <= 0) continue;
      const X = i % w, Y = (i / w | 0) + y0, j = Y * w + X;
      if (!A[j]) continue;
      let best = -1, bd = 1e9;
      for (const l of L) {
        const g = G[l];
        if (Y < g.ly0 || Y > g.ly1) continue;
        const dx = X < g.x0 ? g.x0 - X : X > g.x1 ? X - g.x1 : 0;
        if (dx < bd) { bd = dx; best = l; }
      }
      if (best < 0 || bd > 3 * s) continue;
      const g = G[best], gh = g.ly1 - g.ly0;
      Dc[j] = dep;
      Lid[j] = best;
      U[j] = clamp(((X - g.x0) / Math.max(1, g.x1 - g.x0)) * .78 + ((Y - g.ly0) / gh) * .22) * 255;
      if (dep > DM[best]) DM[best] = dep;
    }
  }

  /* ---------- la pierre : construite par tranches ---------- */
  function* construire(){
    const R = graine(seed);
    const nA = bruit2(seed + 1), nB = bruit2(seed + 2), nC = bruit2(seed + 3), nD = bruit2(seed + 4), nE = bruit2(seed + 5);
    const nS = bruit1(seed + 6), nT = bruit1(seed + 7);
    // le fond : un noir de velours, à peine grenu (le sujet seul, P14)
    {
      const cw = Math.ceil(W / 2), ch = Math.ceil(H / 2), cv = document.createElement("canvas");
      cv.width = cw; cv.height = ch;
      const c = cv.getContext("2d"), im = c.createImageData(cw, ch);
      for (let y = 0; y < ch; y++) {
        for (let x = 0; x < cw; x++) {
          const o = (y * cw + x) * 4, v = 9 + 8 * nA(x * .012, y * .012) + 3 * nB(x * .08, y * .08) + (R() - .5) * 5;
          im.data[o] = v; im.data[o + 1] = v + 1; im.data[o + 2] = v + 3; im.data[o + 3] = 255;
        }
      }
      c.putImageData(im, 0, 0);
      mur = cv;
    }
    yield;
    w = Math.max(8, Math.round(SW * s)); h = Math.max(8, Math.round(SH * s)); N = w * h;
    A = new Uint8Array(N); Hs = new Float32Array(N); Dc = new Float32Array(N); Lid = new Int16Array(N).fill(-1); U = new Uint8Array(N);
    ALB = new Uint8Array(N); GR = new Uint8Array(N); NX = new Float32Array(N); NY = new Float32Array(N); Z = new Uint8Array(N);
    MZ = new Uint8Array(N); CR = new Uint8Array(N);
    cvS = document.createElement("canvas");
    cvS.width = w; cvS.height = h;
    cxS = cvS.getContext("2d");
    IMG = cxS.createImageData(w, h);
    const ga = new Float32Array(h), dr = new Float32Array(h), ha = new Float32Array(w), ba = new Float32Array(w);
    for (let y = 0; y < h; y++) {
      const Y = y / s;
      ga[y] = 2.5 + 3 * nS(Y * .03) + 1.3 * nT(Y * .21);
      dr[y] = SW - 2.5 - 3 * nT(Y * .03 + 40) - 1.3 * nS(Y * .2 + 9);
    }
    for (let x = 0; x < w; x++) {
      const X = x / s, xn = X / SW;
      ha[x] = 3 + 5 * nS(X * .025 + 70) + 1.6 * nT(X * .19 + 30)
            + SH * .075 * Math.pow(Math.max(0, (xn - .56) / .44), 1.25) * (.8 + .4 * nT(X * .05))
            + SH * .03 * Math.max(0, (.16 - xn) / .16);
      ba[x] = SH - 3 - 2.5 * nT(X * .03 + 90);
    }
    for (let y = 0; y < h; y++) {
      const Y = y / s;
      for (let x = 0; x < w; x++) {
        const X = x / s, i = y * w + x, de = Math.min(X - ga[y], dr[y] - X, Y - ha[x], ba[x] - Y);
        A[i] = clamp(de * s + .5) * 255;
        GR[i] = R() * 255;
        // les matières des pigments : la marbrure lente (lapis, malachite) et la froissure fine (feuille d'or, calcite)
        MZ[i] = nB(X * .19 + 31, Y * .19 + 7) * 255;
        CR[i] = nC(X * 1.1 + 17, Y * 1.1 + 3) * 255;
        if (de < -1) { Hs[i] = -3 * s; continue; }
        const big = nA(X * .011, Y * .011) * .6 + nA(X * .03 + 50, Y * .03) * .4, mid = nB(X * .09, Y * .09), fin = nC(X * .45, Y * .45);
        const v = nD(X * .018 + mid * .7, Y * .032 + big * .9), crete = 1 - Math.abs(2 * v - 1);
        const veine = lisse((crete - .968) / .026) * (.4 + .6 * nB(X * .02 + 7, Y * .02));
        let hz = 2.2 * big + .55 * mid + .3 * fin + .3 * veine;
        const p = nE(X * .6, Y * .6);
        if (p > .84) hz -= (p - .84) * 7;
        // la granodiorite : un gris sombre, des cristaux noirs (hornblende) et blancs (feldspath), des veines de calcite
        let g = 72 + 40 * big + 14 * mid + 9 * (R() - .5);
        const r = R();
        if (r < .045) g -= 36; else if (r > .984) g += 50;
        if (nC(X * .85 + 9, Y * .85) > .83) g += 24;
        g += veine * 62;
        const bw = 7;
        if (de < bw) {
          const u = (bw - Math.max(0, de)) / bw;
          hz -= u * u * bw * .55;
          g += 10 * u;
        }
        Hs[i] = hz * s;
        ALB[i] = clamp(g, 0, 255);
      }
      if (y % 6 === 5) yield;
    }
    // les éclats : conchoïdaux, la pierre fraîche est plus claire
    for (let e = 0; e < 34; e++) {
      const bord = e < 26;
      let cx, cy;
      const r = (bord ? 2 + R() * 6 : 1.2 + R() * 3) * s;
      if (bord) {
        const side = R() * 4 | 0, u = R();
        if (side === 0) { cy = u * h; cx = ga[cy | 0] * s + R() * 2 * s; }
        else if (side === 1) { cy = u * h; cx = dr[cy | 0] * s - R() * 2 * s; }
        else if (side === 2) { cx = u * w; cy = ha[cx | 0] * s + R() * 2 * s; }
        else { cx = u * w; cy = ba[cx | 0] * s - R() * 2 * s; }
      } else { cx = R() * w; cy = R() * h; }
      const dep = (bord ? 1.6 : .9) * s;
      for (let y = Math.max(0, cy - r | 0); y < Math.min(h, cy + r + 1); y++) {
        for (let x = Math.max(0, cx - r | 0); x < Math.min(w, cx + r + 1); x++) {
          const d = Math.hypot(x - cx, y - cy) / r;
          if (d >= 1) continue;
          const i = y * w + x;
          Hs[i] -= dep * Math.pow(1 - d * d, .7);
          ALB[i] = Math.min(255, ALB[i] + 20 * (1 - d));
        }
      }
    }
    yield;
    mettreEnPage();
    // les registres à peine marqués : cinq traits de ciseau, profondeur exacte d'un V (distance analytique à la ligne)
    {
      const hw = .8 * s;
      for (let k = 0; k <= 4; k++) {
        const base = regs[0].y0 + k * (regs[0].y1 - regs[0].y0);
        for (let x = Math.round(w * .045); x < w - Math.round(w * .045); x++) {
          const yc = base + .7 * s * nS(x / s * .05 + k * 13);
          for (let y = Math.floor(yc - 3); y <= yc + 3; y++) {
            if (y < 0 || y >= h) continue;
            const i = y * w + x, d = hw - Math.abs(y - yc);
            if (d <= -.5 || !A[i]) continue;
            const dep = (d + .5) * .62;
            if (dep > Dc[i]) { Dc[i] = dep; Lid[i] = -2; }
          }
        }
      }
    }
    yield;
    for (let k = 0; k < 4; k++) { graver(k, R); yield; }
    for (let i = 0; i < N; i++) {
      if (Dc[i] > 0) {
        Z[i] = 1;
        if (i > 0) Z[i - 1] = 1;
        if (i < N - 1) Z[i + 1] = 1;
        if (i >= w) Z[i - w] = 1;
        if (i + w < N) Z[i + w] = 1;
      }
    }
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const i = y * w + x, hx = (Hs[i + 1] - Hs[i - 1]) * .5, hy = (Hs[i + w] - Hs[i - w]) * .5, q = 1 / Math.sqrt(hx * hx + hy * hy + 1);
        NX[i] = -hx * q;
        NY[i] = -hy * q;
      }
      if (y % 40 === 0) yield;
    }
    // l'ombre de la stèle sur le fond : la silhouette en quart, floutée (trois boîtes)
    ombre = flouQuart(i => A[i] / 255, [0, 0, 0], 200);
  }

  /* une silhouette en quart de résolution, floutée trois fois (boîte de 5) : l'ombre de la stèle, le halo des mots */
  function flouQuart(val, coul, amax){
    const q = 4, m = 10, ow = Math.ceil(w / q) + 2 * m, oh = Math.ceil(h / q) + 2 * m;
    let a = new Float32Array(ow * oh), b = new Float32Array(ow * oh);
    for (let y = 0; y < h; y += q) {
      for (let x = 0; x < w; x += q) {
        let v = 0;
        for (let dy = 0; dy < q && y + dy < h; dy += 2) for (let dx = 0; dx < q && x + dx < w; dx += 2) v = Math.max(v, val((y + dy) * w + x + dx));
        a[((y / q | 0) + m) * ow + (x / q | 0) + m] = v;
      }
    }
    for (let p = 0; p < 3; p++) {
      for (let y = 0; y < oh; y++) {
        for (let x = 0; x < ow; x++) {
          let t = 0;
          for (let d = -2; d <= 2; d++) t += a[y * ow + clamp(x + d, 0, ow - 1)];
          b[y * ow + x] = t / 5;
        }
      }
      for (let y = 0; y < oh; y++) {
        for (let x = 0; x < ow; x++) {
          let t = 0;
          for (let d = -2; d <= 2; d++) t += b[clamp(y + d, 0, oh - 1) * ow + x];
          a[y * ow + x] = t / 5;
        }
      }
    }
    const cv = document.createElement("canvas");
    cv.width = ow; cv.height = oh;
    const c = cv.getContext("2d"), im = c.createImageData(ow, oh);
    for (let i = 0; i < ow * oh; i++) {
      im.data[i * 4] = coul[0]; im.data[i * 4 + 1] = coul[1]; im.data[i * 4 + 2] = coul[2];
      im.data[i * 4 + 3] = Math.min(255, a[i] * amax);
    }
    c.putImageData(im, 0, 0);
    return { cv, m: m * q / s };
  }

  /* ---------- les pigments : chaque pierre a sa matière ----------
     pc : le registre ; I : la lumière reçue (ombre comprise) ; dn : la profondeur relative dans le V (0 au bord, 1 au fond) ;
     (nx, ny, nz) la normale, (lx, ly, lz) la direction de la lumière. Le résultat est écrit dans PIG. */
  const PIG = [0, 0, 0];
  const LAPIS = [[8, 12, 64], [24, 50, 168], [70, 112, 238]];
  const CINABRE = [[92, 6, 8], [196, 30, 16], [252, 112, 60]];
  function trois(C, t){
    if (t < .5) {
      const u = t / .5;
      PIG[0] = C[0][0] + (C[1][0] - C[0][0]) * u; PIG[1] = C[0][1] + (C[1][1] - C[0][1]) * u; PIG[2] = C[0][2] + (C[1][2] - C[0][2]) * u;
    } else {
      const u = (t - .5) / .5;
      PIG[0] = C[1][0] + (C[2][0] - C[1][0]) * u; PIG[1] = C[1][1] + (C[2][1] - C[1][1]) * u; PIG[2] = C[1][2] + (C[2][2] - C[1][2]) * u;
    }
  }
  function pigment(pc, i, x, y, nx, ny, nz, I, dn, lx, ly, lz){
    const gr = GR[i] / 255, mz = MZ[i] / 255, cr = CR[i] / 255;
    if (pc === 0) {
      // le lapis-lazuli : un outremer profond marbré, voilé de calcite, semé de pyrite (des grains de 2 px qui accrochent la lumière)
      trois(LAPIS, clamp(.16 + .48 * I - .32 * dn + .42 * (mz - .5) + .06 * (gr - .5)));
      if (cr > .8) {
        const u = (cr - .8) / .2 * .38;
        PIG[0] += (150 - PIG[0]) * u; PIG[1] += (160 - PIG[1]) * u; PIG[2] += (196 - PIG[2]) * u;
      }
      const p = GR[(y & ~1) * w + (x & ~1)] / 255;
      if (p > .955) {
        const glint = Math.pow(Math.max(0, Math.cos(az * 3 + p * 977)), 8);
        const k = .5 + .45 * I + 1.6 * glint;
        PIG[0] = 196 * k; PIG[1] = 156 * k; PIG[2] = 62 * k;
      }
    } else if (pc === 1) {
      // le vermillon de cinabre : du rouge sang au fond du V au rouge feu sur l'arête éclairée ; quelques cristaux qui brillent
      trois(CINABRE, clamp(.06 + .56 * I - .5 * dn + .3 * (mz - .5) + .12 * (gr - .5)));
      if (gr > .982) { PIG[0] += 40; PIG[1] += 26; PIG[2] += 14; }
    } else if (pc === 2) {
      // la malachite : des bandes concentriques autour de ses yeux ; claires et fines, sombres et larges, ondulées par la marbrure
      let d = 1e9, kk = 1;
      for (const c of MAL) {
        const e = Math.hypot(x - c.x, (y - c.y) * 1.25);
        if (e < d) { d = e; kk = c.k; }
      }
      const ph = (d + (mz - .5) * 14 * s) / (s * 1.55 * kk);
      const raw = .5 + .5 * Math.sin(ph + 1.6 * Math.sin(ph * .29));
      const clair = Math.pow(raw, 3.2), sombre = raw < .12 ? (.12 - raw) / .12 : 0;
      const L = .62 + .62 * I - .22 * dn;
      PIG[0] = (8 + 16 * raw + 92 * clair) * L * (1 - .55 * sombre);
      PIG[1] = (52 + 66 * raw + 110 * clair) * L * (1 - .55 * sombre);
      PIG[2] = (34 + 38 * raw + 76 * clair) * L * (1 - .55 * sombre);
    } else {
      // l'or en feuille : la feuille est froissée (sa normale bouge), posée en carrés qui se recouvrent ; Blinn-Phong sur le demi-vecteur
      const fx = (CR[Math.min(N - 1, i + 1)] - CR[Math.max(0, i - 1)]) / 255 * 1.6;
      const fy = (CR[Math.min(N - 1, i + w)] - CR[Math.max(0, i - w)]) / 255 * 1.6;
      let mx = nx + fx * .5, my = ny + fy * .5, mzz = nz;
      const q = 1 / Math.hypot(mx, my, mzz);
      mx *= q; my *= q; mzz *= q;
      const dif = Math.max(0, mx * lx + my * ly + mzz * lz);
      let hx = lx, hy = ly, hz = lz + 1;
      const qh = 1 / Math.hypot(hx, hy, hz);
      hx *= qh; hy *= qh; hz *= qh;
      const sp = Math.pow(Math.max(0, mx * hx + my * hy + mzz * hz), 26);
      const sh = I < .4 ? I / .4 : 1;
      PIG[0] = 46 + (186 * dif * 1.15 + 255 * sp * 1.5) * sh;
      PIG[1] = 28 + (130 * dif * 1.15 + 228 * sp * 1.5) * sh;
      PIG[2] = 8 + (40 * dif * 1.15 + 160 * sp * 1.5) * sh;
      const X = x / s + 3, Y = y / s + 5, cote = 13;
      if (X % cote < .9 || Y % cote < .9) { PIG[0] *= .8; PIG[1] *= .76; PIG[2] *= .7; }
    }
  }

  /* ---------- l'éclairage d'un pixel : Lambert sur la normale, ombre portée par marche vers la lumière ---------- */
  function prof(j){
    const l = Lid[j];
    if (l === -1) return 0;
    if (l === -2) return Dc[j];
    const f = (PR[l] * 1.3 - U[j] / 255) / .3;
    if (f <= 0) return 0;
    if (f >= 1) { const c = Dc[j]; return c > LV[l] ? LV[l] : c; }
    return Dc[j] * f;
  }
  function ombrer(x0, y0, x1, y1){
    const d = IMG.data, lz = Math.sin(el), ce = Math.cos(el), lx = ce * Math.cos(az), ly = ce * Math.sin(az), gain = .7 / lz, tg = Math.tan(el);
    const cax = Math.cos(az), cay = Math.sin(az), pas = Math.min(9, Math.ceil(2.6 * s / tg));
    for (let y = y0; y < y1; y++) {
      let o = (y * w + x0) * 4;
      for (let x = x0; x < x1; x++, o += 4) {
        const i = y * w + x, a = A[i];
        if (!a) { d[o + 3] = 0; continue; }
        let nx, ny, nz, g = ALB[i], cut = 0, sh = 1, pc = -1, l = -1;
        if (Z[i] && x > 0 && y > 0 && x < w - 1 && y < h - 1) {
          cut = prof(i);
          const hc = Hs[i] - cut;
          const hx = (Hs[i + 1] - prof(i + 1)) - (Hs[i - 1] - prof(i - 1)), hy = (Hs[i + w] - prof(i + w)) - (Hs[i - w] - prof(i - w));
          const q = 1 / Math.sqrt(hx * hx * .25 + hy * hy * .25 + 1);
          nx = -hx * .5 * q; ny = -hy * .5 * q; nz = q;
          if (cut > .15) {
            l = Lid[i];
            if (l >= 0 && PG[l] > 0 && Dc[i] > LV[l] && PR[l] * 1.3 - U[i] / 255 >= .3) pc = G[l].reg;
            for (let k = 1; k <= pas; k++) {
              const qx = (x + k * cax + .5) | 0, qy = (y + k * cay + .5) | 0;
              if (qx < 0 || qy < 0 || qx >= w || qy >= h) break;
              const j = qy * w + qx;
              if (Hs[j] - prof(j) - hc > k * tg) { sh = .26 + .3 * (k - 1) / pas; break; }
            }
            g = g * 1.07 + 9;
          }
        } else {
          nx = NX[i]; ny = NY[i]; nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny));
        }
        const dot = nx * lx + ny * ly + nz * lz;
        // le clair-obscur : peu de lumière ambiante, une flaque de lumière du côté de la source, la nuit de l'autre
        let pool = .78 + 1.25 * ((x - w / 2) / w * cax + (y - h / 2) / h * cay);
        pool = pool < .22 ? .22 : pool > 1.45 ? 1.45 : pool;
        let I = (.09 + gain * (dot > 0 ? dot : 0)) * sh * (1 - .05 * cut / s) * pool;
        if (I > 1.7) I = 1.7;
        if (pc >= 0) {
          const dn = clamp(Dc[i] / Math.max(.6, DM[l]));
          // le pigment est une pierre précieuse : il garde de la lumière même dans la pénombre (racine de I), sombre au fond du V
          pigment(pc, i, x, y, nx, ny, nz, Math.min(1.35, .3 + .85 * Math.sqrt(I)), dn, lx, ly, lz);
          d[o] = PIG[0]; d[o + 1] = PIG[1]; d[o + 2] = PIG[2];
        } else {
          d[o] = g * I + 1; d[o + 1] = g * I + 1; d[o + 2] = g * I * 1.05 + 3;
        }
        d[o + 3] = a;
      }
    }
    cxS.putImageData(IMG, 0, 0, x0, y0, x1 - x0, y1 - y0);
  }
  function demanderPlein(){ if (plein) encorePlein = true; else plein = { y: 0 }; }
  function travailler(budget){
    const t0 = performance.now();
    while (vite.length && performance.now() - t0 < budget) {
      // un rectangle à rééclairer avance par bandes de 6 lignes : aucune image n'attend tout un registre
      const r = vite[0], y1 = Math.min(r[3], r[1] + 6);
      ombrer(r[0], r[1], r[2], y1);
      r[1] = y1;
      if (y1 >= r[3]) vite.shift();
    }
    while (plein && performance.now() - t0 < budget) {
      const y1 = Math.min(h, plein.y + 6);
      ombrer(0, plein.y, w, y1);
      plein.y = y1;
      if (y1 >= h) {
        plein = null;
        if (tPret < 0) tPret = maintenant();
        if (encorePlein) { encorePlein = false; plein = { y: 0 }; }
      }
    }
  }
  const imagePrete = () => pret && !plein && !vite.length && tPret >= 0;

  /* ---------- l'état : chaque lettre avance, chaque pigment monte ---------- */
  function avancer(t){
    for (let k = 0; k < 4; k++) {
      const dt = tReg[k] === null ? -1 : t - tReg[k];
      if (!stale && (dt < 0 || dt > 5200)) continue;
      let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
      for (let l = 0; l < G.length; l++) {
        const g = G[l];
        if (g.reg !== k) continue;
        const p = dt < 0 ? 0 : clamp((dt - g.a) / (g.b - g.a)), pg = dt < 0 ? 0 : lisse((dt - g.pa) / 800);
        if (p !== PR[l] || pg !== PG[l]) {
          PR[l] = p; PG[l] = pg; LV[l] = DM[l] * (1 - .64 * pg);
          x0 = Math.min(x0, g.x0); x1 = Math.max(x1, g.x1); y0 = Math.min(y0, g.ly0); y1 = Math.max(y1, g.ly1);
        }
      }
      if (x1 > x0 && !stale) vite.push([Math.max(0, x0 - 4 * s | 0), Math.max(0, y0 - 3 * s | 0), Math.min(w, x1 + 4 * s | 0), Math.min(h, y1 + 3 * s | 0)]);
    }
    if (stale) { stale = false; demanderPlein(); }
  }
  const gravureFinie = t => tReg.every(r => r !== null && t - r > 5000);

  /* ---------- la fissure : percolation d'invasion + contrainte de Griffith ---------- */
  function* fendre(){
    const R = graine(seed * 7 + 3), c = Math.max(3, SW / 70), nx = Math.floor(SW / c), ny = Math.floor(SH / c), n = nx * ny;
    const ok = new Uint8Array(n), res = new Float32Array(n), dans = new Uint8Array(n), par = new Int32Array(n).fill(-1), lon = new Int32Array(n);
    const px = new Float32Array(n), py = new Float32Array(n);
    for (let j = 0; j < ny; j++) {
      for (let i = 0; i < nx; i++) {
        const q = j * nx + i, X = (i + .5) * c, Y = (j + .5) * c, idx = Math.min(N - 1, (Y * s | 0) * w + (X * s | 0));
        ok[q] = A[idx] > 250 ? 1 : 0;
        res[q] = .2 + .8 * R() - (ALB[idx] > 140 ? .32 : 0) - (Dc[idx] > 0 ? .12 : 0);
        px[q] = X + (R() - .5) * c * .9;
        py[q] = Y + (R() - .5) * c * .9;
      }
    }
    const hp = [], hi = [];
    const pousser = (q, p) => {
      hp.push(p); hi.push(q);
      let k = hp.length - 1;
      while (k > 0) {
        const m = (k - 1) >> 1;
        if (hp[m] <= hp[k]) break;
        [hp[m], hp[k]] = [hp[k], hp[m]]; [hi[m], hi[k]] = [hi[k], hi[m]];
        k = m;
      }
    };
    const tirer = () => {
      const q = hi[0], lp = hp.pop(), li = hi.pop();
      if (hp.length) {
        hp[0] = lp; hi[0] = li;
        let k = 0;
        for (;;) {
          const a = 2 * k + 1, b = a + 1;
          let m = k;
          if (a < hp.length && hp[a] < hp[m]) m = a;
          if (b < hp.length && hp[b] < hp[m]) m = b;
          if (m === k) break;
          [hp[m], hp[k]] = [hp[k], hp[m]]; [hi[m], hi[k]] = [hi[k], hi[m]];
          k = m;
        }
      }
      return q;
    };
    const voisins = q => {
      const i = q % nx, j = q / nx | 0, v = [];
      for (let b = -1; b <= 1; b++) {
        for (let a = -1; a <= 1; a++) {
          if (!a && !b) continue;
          const x = i + a, y = j + b;
          if (x >= 0 && y >= 0 && x < nx && y < ny) v.push(y * nx + x);
        }
      }
      return v;
    };
    const i0 = Math.floor(nx * (.5 + R() * .25));
    let q0 = -1;
    for (let j = 0; j < ny; j++) if (ok[j * nx + i0]) { q0 = j * nx + i0; break; }
    if (q0 < 0) { fissure = { seg: [], mx: SX + SW / 2, my: SY + SH / 2, rais: [], ix: SX + SW / 2, iy: SY + SH / 2 }; return; }
    yield;
    const ordre = [q0];
    dans[q0] = 1;
    const ouvrir = q => {
      for (const v of voisins(q)) {
        if (ok[v] && !dans[v]) pousser(v, res[v] - 1.9 * Math.sqrt((lon[q] + 1) / ny) + ((v / nx | 0) < (q / nx | 0) ? .35 : 0));
      }
    };
    ouvrir(q0);
    let perce = 0;
    while (hp.length && ordre.length < 2200) {
      const q = tirer();
      if (dans[q]) continue;
      let pa = -1, nb = 0;
      for (const v of voisins(q)) if (dans[v]) { nb++; pa = v; }
      if (nb !== 1) continue;
      dans[q] = 1; par[q] = pa; lon[q] = lon[pa] + 1;
      ordre.push(q);
      ouvrir(q);
      const j = q / nx | 0;
      if (!perce && (j >= ny - 2 || !ok[q + nx])) perce = ordre.length;
      if (perce && ordre.length > perce * 1.25) break;
      if (ordre.length % 150 === 0) yield;
    }
    // l'épaisseur : le nombre de descendants (le tronc s'ouvre plus que les branches)
    const desc = new Float32Array(n);
    for (let k = ordre.length - 1; k > 0; k--) { const q = ordre[k]; desc[par[q]] += desc[q] + 1; }
    const seg = ordre.slice(1).map(q => {
      const p = par[q], g = par[p], fin = desc[q] === 0;
      const x0 = g >= 0 ? (px[p] + px[g]) / 2 : px[p], y0 = g >= 0 ? (py[p] + py[g]) / 2 : py[p];
      return {
        x0: SX + x0, y0: SY + y0, cx: SX + px[p], cy: SY + py[p],
        x1: SX + (fin ? px[q] : (px[p] + px[q]) / 2), y1: SY + (fin ? py[q] : (py[p] + py[q]) / 2),
        l: Math.min(4.2, .5 + .62 * Math.log2(1 + desc[q]))
      };
    });
    let mx = 0, my = 0;
    seg.forEach(g => { mx += g.x1; my += g.y1; });
    mx /= Math.max(1, seg.length); my /= Math.max(1, seg.length);
    const rais = [];
    for (let k = 0; k < 22; k++) {
      const g = seg[R() * seg.length | 0];
      if (!g) break;
      rais.push({ x: g.x1, y: g.y1, a: Math.atan2(g.y1 - my, g.x1 - mx) + (R() - .5) * .6, l: .12 + R() * .2 });
    }
    // le point d'impact : là où le tronc est le plus épais, aux deux cinquièmes de la course
    const tronc = seg.filter(g => g.l > 2.2);
    const pi = (tronc.length ? tronc : seg)[Math.floor((tronc.length ? tronc : seg).length * .4)];
    fissure = { seg, mx, my, rais, ix: pi ? pi.x1 : mx, iy: pi ? pi.y1 : my };
  }

  /* ---------- la préparation de l'éclatement (pendant que la fissure court, par tranches) ---------- */
  // la couche des mots libérés : le creux de chaque lettre devient un relief de pigment (la normale est retournée)
  function* genererMots(){
    const cv = document.createElement("canvas");
    cv.width = w; cv.height = h;
    const c = cv.getContext("2d"), im = c.createImageData(w, h), d = im.data;
    const e2 = .8, lz = Math.sin(e2), ce = Math.cos(e2), lx = ce * Math.cos(az), ly = ce * Math.sin(az);
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const i = y * w + x;
        if (!Z[i]) continue;
        const l = Lid[i];
        if (l < 0 || PG[l] <= 0) continue;
        const cut = prof(i);
        if (cut < .12) continue;
        const hx = prof(i + 1) - prof(i - 1), hy = prof(i + w) - prof(i - w);
        const q = 1 / Math.sqrt(hx * hx * .25 + hy * hy * .25 + 1);
        const nx = -hx * .5 * q, ny = -hy * .5 * q, nz = q;
        const dot = Math.max(0, nx * lx + ny * ly + nz * lz);
        pigment(G[l].reg, i, x, y, nx, ny, nz, .32 + .95 * dot, 0, lx, ly, lz);
        const o = i * 4;
        const kk = G[l].reg === 3 ? .72 : 1.08;     // l'or en l'air se détache de la lumière dorée par un ton plus bruni
        d[o] = PIG[0] * kk + 6; d[o + 1] = PIG[1] * kk + 4; d[o + 2] = PIG[2] * kk + 2;
        d[o + 3] = clamp((cut - .12) / .5) * 255;
      }
      if (y % 30 === 0) yield;
    }
    c.putImageData(im, 0, 0);
    yield;
    const masque = im.data;
    // l'ombre nette des mots (une silhouette d'encre) : elle les détache de la lumière
    const sil = document.createElement("canvas");
    sil.width = w; sil.height = h;
    {
      const sc = sil.getContext("2d"), si = sc.createImageData(w, h), sd = si.data;
      for (let y = 0; y < h; y++) {
        for (let o = y * w * 4, e = o + w * 4; o < e; o += 4) { sd[o] = 30; sd[o + 1] = 16; sd[o + 2] = 4; sd[o + 3] = masque[o + 3]; }
        if (y % 150 === 149) yield;
      }
      sc.putImageData(si, 0, 0);
    }
    yield;
    const halo = flouQuart(i => (Z[i] && Lid[i] >= 0 && prof(i) > .12) ? 1 : 0, [34, 18, 6], 300);
    return { cv, halo, masque, sil };
  }
  function* preparer(){
    const sortie = yield* genererMots();
    motsCv = sortie.cv; motsHalo = sortie.halo; motsSil = sortie.sil;
    // la pierre sans ses mots : les morceaux emporteront des lettres creuses, le pigment reste en l'air
    // (calculée sur les pixels, sans composer de toiles : pas d'attente du processeur graphique)
    cvFrag = document.createElement("canvas");
    cvFrag.width = w; cvFrag.height = h;
    {
      const c = cvFrag.getContext("2d"), im = c.createImageData(w, h), d = im.data, src = IMG.data, mq = sortie.masque;
      for (let y = 0; y < h; y++) {
        for (let o = y * w * 4, e = o + w * 4; o < e; o += 4) {
          d[o] = src[o]; d[o + 1] = src[o + 1]; d[o + 2] = src[o + 2];
          d[o + 3] = src[o + 3] * (255 - mq[o + 3]) / 255;
        }
        if (y % 120 === 119) yield;
      }
      c.putImageData(im, 0, 0);
    }
    yield;
    // le Voronoï : la densité des germes suit la fissure et l'impact
    const F = fissure, R = graine(seed * 13 + 5), germes = [];
    const dans = (x, y) => x > SX + 2 && x < SX + SW - 2 && y > SY + 2 && y < SY + SH - 2;
    for (let k = 0; k < 34; k++) {
      const g = F.seg[R() * F.seg.length | 0], e = SW * .07;
      const x = g.x1 + (R() - .5) * e, y = g.y1 + (R() - .5) * e;
      if (dans(x, y)) germes.push([x, y]);
    }
    for (let k = 0; k < 12; k++) {
      const r = SW * .16 * Math.sqrt(R()), a = R() * 6.283;
      const x = F.ix + Math.cos(a) * r, y = F.iy + Math.sin(a) * r;
      if (dans(x, y)) germes.push([x, y]);
    }
    const dmin = SW * .15;
    for (let k = 0; k < 30; k++) {
      for (let essai = 0; essai < 30; essai++) {
        const x = SX + R() * SW, y = SY + R() * SH;
        if (germes.every(p => Math.hypot(p[0] - x, p[1] - y) > dmin)) { germes.push([x, y]); break; }
      }
    }
    yield;
    // les bords dentelés : un même champ de bruit déplace les points des deux cellules voisines, elles s'emboîtent
    const bx = bruit2(seed + 41), by = bruit2(seed + 42), amp = Math.max(2.2, SW * .009);
    const dent = (p, q) => {
      const L = Math.hypot(q[0] - p[0], q[1] - p[1]), n = Math.max(1, Math.round(L / 5)), out = [];
      for (let k = 0; k < n; k++) {
        const x = p[0] + (q[0] - p[0]) * k / n, y = p[1] + (q[1] - p[1]) * k / n;
        out.push([x + (bx(x * .16, y * .16) - .5) * 2 * amp, y + (by(x * .16, y * .16) - .5) * 2 * amp]);
      }
      return out;
    };
    const cadre = [[SX - 12, SY - 12], [SX + SW + 12, SY - 12], [SX + SW + 12, SY + SH + 12], [SX - 12, SY + SH + 12]];
    const cellules = [];
    for (let i = 0; i < germes.length; i++) {
      let poly = cadre;
      for (let j = 0; j < germes.length && poly.length >= 3; j++) if (j !== i) poly = etude_pierre3_couper(poly, germes[i], germes[j]);
      if (poly.length < 3) continue;
      let jag = [];
      for (let k = 0; k < poly.length; k++) jag = jag.concat(dent(poly[k], poly[(k + 1) % poly.length]));
      let ar = 0, cx = 0, cy = 0;
      for (let k = 0; k < jag.length; k++) {
        const p = jag[k], q = jag[(k + 1) % jag.length], c = p[0] * q[1] - q[0] * p[1];
        ar += c; cx += (p[0] + q[0]) * c; cy += (p[1] + q[1]) * c;
      }
      ar /= 2;
      if (Math.abs(ar) < 6) continue;
      cx /= 6 * ar; cy /= 6 * ar;
      cellules.push({ jag, cx, cy, aire: Math.abs(ar) });
      if (i % 10 === 9) yield;
    }
    // la découpe : chaque morceau devient trois petites toiles (sa face, son épaisseur sombre, son liseré de lumière)
    const liste = [];
    for (let k = 0; k < cellules.length; k++) {
      const C = cellules[k];
      let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
      for (const p of C.jag) { x0 = Math.min(x0, p[0]); y0 = Math.min(y0, p[1]); x1 = Math.max(x1, p[0]); y1 = Math.max(y1, p[1]); }
      x0 = Math.max(x0, SX - 1); y0 = Math.max(y0, SY - 1); x1 = Math.min(x1, SX + SW + 1); y1 = Math.min(y1, SY + SH + 1);
      if (x1 - x0 < 1 || y1 - y0 < 1) continue;
      const tw = Math.ceil((x1 - x0) * s) + 2, th = Math.ceil((y1 - y0) * s) + 2;
      const face = document.createElement("canvas");
      face.width = tw; face.height = th;
      const fc = face.getContext("2d");
      fc.beginPath();
      C.jag.forEach((p, j) => { const X = (p[0] - x0) * s, Y = (p[1] - y0) * s; if (j) fc.lineTo(X, Y); else fc.moveTo(X, Y); });
      fc.closePath();
      fc.clip();
      fc.drawImage(cvFrag, -(x0 - SX) * s, -(y0 - SY) * s);
      const teinte = col => {
        const cv = document.createElement("canvas");
        cv.width = tw; cv.height = th;
        const c = cv.getContext("2d");
        c.drawImage(face, 0, 0);
        c.globalCompositeOperation = "source-in";
        c.fillStyle = col;
        c.fillRect(0, 0, tw, th);
        return cv;
      };
      const dist = Math.hypot(C.cx - F.ix, C.cy - F.iy);
      let rmax = 0;
      const pts = C.jag.map(p => { const q = [p[0] - C.cx, p[1] - C.cy]; rmax = Math.max(rmax, Math.hypot(q[0], q[1])); return q; });
      liste.push({
        face, dos: teinte("#121114"), lis: teinte("rgb(255,204,112)"),
        ox: x0 - C.cx, oy: y0 - C.cy, tw: tw / s, th: th / s,
        pts, cx: C.cx, cy: C.cy, aire: C.aire, rmax, dist,
        x: C.cx, y: C.cy, a: 0, vx: 0, vy: 0, om: 0, sc: 1, vz: 0, parti: false, repos: false,
        retard: dist / 2.6
      });
      if (k % 5 === 4) yield;
    }
    morceaux = liste;
    pretBris = true;
  }

  /* ---------- l'éclatement : l'onde de choc lance les morceaux, la poussière et les éclats ---------- */
  function lancer(){
    const F = fissure, R = graine(seed * 17 + 9);
    for (const f of morceaux) {
      let dx = f.cx - F.ix, dy = f.cy - F.iy;
      const d = Math.hypot(dx, dy) || 1;
      dx /= d; dy /= d;
      if (d < 4) { const a = R() * 6.283; dx = Math.cos(a); dy = Math.sin(a); }
      const v = (240 + 1150 * Math.exp(-d / (SW * .3))) * (.7 + .6 * R()) * clamp(Math.sqrt(1600 / f.aire), .7, 1.5);
      f.vx = dx * v * .95;
      f.vy = dy * v * .7 - 300 - 260 * R();
      f.om = (R() - .5) * Math.min(11, 3 + 160 / Math.sqrt(f.aire));
      f.vz = R() < .22 ? .35 + .55 * R() : -.08 * R();
    }
    // la poussière : là où la pierre se broie (le long de la fissure), poussée par l'onde
    nuage = [];
    for (let k = 0; k < 340; k++) {
      const g = F.seg[R() * F.seg.length | 0];
      const x = k < 260 ? g.x1 + (R() - .5) * 10 : SX + R() * SW, y = k < 260 ? g.y1 + (R() - .5) * 10 : SY + R() * SH;
      const a = Math.atan2(y - F.iy, x - F.ix) + (R() - .5) * 1.2, v = 60 + 380 * R() * R();
      nuage.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 40, r: 2 + 4 * R(), gr: 10 + 26 * R(), vie: 1600 + 2200 * R(), n: 0, al: .18 + .3 * R() });
    }
    // les éclats : de petits triangles de pierre, vifs, qui rebondissent
    eclats = [];
    for (let k = 0; k < 190; k++) {
      const g = F.seg[R() * F.seg.length | 0];
      const a = Math.atan2(g.y1 - F.iy, g.x1 - F.ix) + (R() - .5) * 2.2, v = 200 + 700 * R();
      eclats.push({ x: g.x1, y: g.y1, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 380 * R(), a: R() * 6.283, om: (R() - .5) * 30,
                    r: .9 + 2.6 * R() * R(), clair: R() < .55, repos: false });
    }
  }
  function physique(dt, tb){
    const g = 980, sol = H - 3;
    for (const f of morceaux) {
      if (!f.parti) { if (tb < f.retard) continue; f.parti = true; }
      if (f.repos) continue;
      f.vy += g * dt;
      f.vx *= 1 - .12 * dt;
      f.x += f.vx * dt;
      f.y += f.vy * dt;
      f.a += f.om * dt;
      f.sc = clamp(f.sc + f.vz * dt, .72, 1.9);
      if (f.vz > .2) continue;                       // ceux qui viennent vers nous tombent devant le sol
      // le point le plus bas du morceau tourné
      const ca = Math.cos(f.a) * f.sc, sa = Math.sin(f.a) * f.sc;
      let bas = -1e9;
      for (const p of f.pts) { const y = p[0] * sa + p[1] * ca; if (y > bas) bas = y; }
      if (f.y + bas > sol) {
        f.y = sol - bas;
        if (f.vy > 0) {
          f.vy = -f.vy * .3;
          f.vx *= .68;
          f.om *= .5;
          if (Math.abs(f.vy) < 80) {
            f.vy = 0; f.om *= .6; f.vx *= .8;
            if (Math.abs(f.vx) < 14 && Math.abs(f.om) < .25) f.repos = true;
          }
        }
      }
    }
    for (const e of eclats) {
      if (e.repos) continue;
      e.vy += g * dt;
      e.x += e.vx * dt; e.y += e.vy * dt; e.a += e.om * dt;
      if (e.y > sol - e.r) {
        e.y = sol - e.r;
        e.vy = -e.vy * .35; e.vx *= .6; e.om *= .5;
        if (Math.abs(e.vy) < 50) { e.vy = 0; if (Math.abs(e.vx) < 10) e.repos = true; }
      }
    }
    for (const p of nuage) {
      p.n += dt * 1000;
      const k = Math.exp(-2.4 * dt);
      p.vx *= k; p.vy = p.vy * k + 30 * dt;
      p.x += p.vx * dt; p.y += p.vy * dt;
      p.r += p.gr * dt;
    }
    nuage = nuage.filter(p => p.n < p.vie);
  }
  function* poser(){
    // pour l'état « déjà bouclé » : on joue la chute en silence jusqu'au repos, par tranches
    lancer();
    for (let k = 0; k < 480; k++) {
      physique(1 / 40, k * 25);
      if (k % 40 === 39) yield;
    }
    nuage = [];
  }
  function remettre(){
    fissure = null; fendGen = null; prep = null; pretBris = false; brise = false; morceaux = []; eclats = []; nuage = [];
    motsCv = null; motsHalo = null; motsGen = null; cvFrag = null; motsSil = null; posage = null;
  }
  function seuilAvancer(t){
    const ts = t - tSeuil;
    if (!fissure && !fendGen && imagePrete()) fendGen = fendre();
    if (fendGen) {
      const t0 = performance.now();
      while (performance.now() - t0 < 6) { if (fendGen.next().done) { fendGen = null; break; } }
    }
    if (fissure && fissure.seg.length && !prep && !pretBris && !brise && imagePrete() && gravureFinie(t)) prep = preparer();
    if (prep) {
      const t0 = performance.now();
      const budget = ts > BURST + 7000 ? 12 : 5;      // état posé d'un coup (app ouverte le soir) : on prépare plus vite
      while (performance.now() - t0 < budget) { if (prep.next().done) { prep = null; break; } }
    }
    if (!brise && pretBris && ts >= BURST) {
      brise = true;
      if (ts > BURST + 7000) { tBrise = t - 1e7; posage = poser(); }
      else { tBrise = t; lancer(); }
    }
    if (posage) {
      const t0 = performance.now();
      while (performance.now() - t0 < 6) { if (posage.next().done) { posage = null; break; } }
    }
    if (motsGen) {
      const t0 = performance.now();
      while (performance.now() - t0 < 6) {
        const r = motsGen.next();
        if (r.done) { motsCv = r.value.cv; motsHalo = r.value.halo; motsSil = r.value.sil; motsGen = null; break; }
      }
    }
  }

  /* ---------- le dessin ---------- */
  const enCSS = b => ({ x0: SX + b.x0 / s, y0: SY + b.y0 / s, x1: SX + b.x1 / s, y1: SY + b.y1 / s });
  function groupe(k, L){
    if (!L || !L.length) return null;
    let b = null;
    for (const i of L) {
      const m = mots[k][i];
      if (!m) continue;
      const c = enCSS(m);
      b = b ? { x0: Math.min(b.x0, c.x0), y0: Math.min(b.y0, c.y0), x1: Math.max(b.x1, c.x1), y1: Math.max(b.y1, c.y1) } : c;
    }
    return b;
  }
  function briller(ctx, k, L, a){
    const T = teintes[k];
    if (!T || !L) return;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    for (const i of L) {
      const m = mots[k][i];
      if (!m) continue;
      const x0 = Math.max(0, m.x0 - 3 * s), y0 = Math.max(0, m.y0 - T.y0 - 6 * s), x1 = Math.min(w, m.x1 + 3 * s), y1 = Math.min(T.cv.height, m.y1 - T.y0 + 8 * s);
      if (x1 <= x0 || y1 <= y0) continue;
      for (const [ox, oy, f] of [[0, 0, 1], [1.2, 0, .35], [-1.2, 0, .35], [0, 1.2, .35], [0, -1.2, .35]]) {
        ctx.globalAlpha = a * f;
        ctx.drawImage(T.cv, x0, y0, x1 - x0, y1 - y0, SX + x0 / s + ox, SY + (y0 + T.y0) / s + oy, (x1 - x0) / s, (y1 - y0) / s);
      }
    }
    ctx.restore();
  }
  function ciseau(ctx, t){
    let act = null, k0 = -1;
    for (let k = 0; k < 4; k++) {
      if (tReg[k] === null) continue;
      const dt = t - tReg[k];
      if (dt < 0 || dt > 3500) continue;
      for (let l = 0; l < G.length; l++) if (G[l].reg === k && PR[l] > 0 && PR[l] < 1) { act = G[l]; k0 = l; }
    }
    if (!act) return;
    const p = clamp(PR[k0] * 1.18);
    const tx = SX + (act.x0 + (act.x1 - act.x0) * p) / s, ty = SY + (act.ly0 + (act.ly1 - act.ly0) * (.35 + .3 * Math.sin(t * .05))) / s;
    const coup = Math.floor(t / 115);
    if (coup !== frappe) {
      frappe = coup;
      const R = graine(coup), sol = SY + regs[act.reg].y1 / s - 3;
      for (let k = 0; k < 5 && parts.length < 280; k++) {
        parts.push({ x: tx, y: ty, vx: (R() - .5) * 90, vy: -30 - R() * 70, v: 150 + R() * 90, z: .6 + R() * 1.3, n: t, sol });
      }
    }
    const rec = Math.exp(-((t % 115) / 26)) * 4, L = clamp(SW * .24, 52, 120), ax = .42, ay = -.91;
    const bx = tx + ax * (L + rec), by = ty + ay * (L + rec), ex = tx + ax * rec, ey = ty + ay * rec;
    // l'ombre portée du ciseau, longue sous la lumière rasante
    const lo = Math.min(170, L * .55 / Math.tan(el)), ox = -Math.cos(az) * lo, oy = -Math.sin(az) * lo;
    ctx.save();
    ctx.strokeStyle = "rgba(4,4,6,.35)"; ctx.lineWidth = 5; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(tx + ox, ty + oy); ctx.stroke();
    // la lame, le fût moleté, la tête écrasée par la massette
    const nxp = -ay, nyp = ax, gr = ctx.createLinearGradient(ex - nxp * 3, ey - nyp * 3, ex + nxp * 3, ey + nyp * 3);
    gr.addColorStop(0, "#3a3c42"); gr.addColorStop(.45, "#d8dadf"); gr.addColorStop(.6, "#8d9097"); gr.addColorStop(1, "#2a2b30");
    ctx.fillStyle = gr;
    ctx.beginPath();
    ctx.moveTo(ex - nxp * .6, ey - nyp * .6); ctx.lineTo(ex + nxp * .6, ey + nyp * .6);
    ctx.lineTo(ex + ax * 12 + nxp * 2.8, ey + ay * 12 + nyp * 2.8); ctx.lineTo(bx + nxp * 2.8, by + nyp * 2.8);
    ctx.lineTo(bx - nxp * 2.8, by - nyp * 2.8); ctx.lineTo(ex + ax * 12 - nxp * 2.8, ey + ay * 12 - nyp * 2.8);
    ctx.closePath(); ctx.fill();
    ctx.strokeStyle = "rgba(20,20,24,.55)"; ctx.lineWidth = .6;
    ctx.beginPath();
    for (let u = .45; u < .95; u += 2.4 / L) {
      const cx = ex + ax * L * u, cy = ey + ay * L * u;
      ctx.moveTo(cx - nxp * 2.8, cy - nyp * 2.8); ctx.lineTo(cx + nxp * 2.8, cy + nyp * 2.8);
    }
    ctx.stroke();
    ctx.fillStyle = "#6c6e75";
    ctx.beginPath(); ctx.ellipse(bx, by, 4.6, 2.4, Math.atan2(ay, ax) + Math.PI / 2, 0, 7); ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,.5)"; ctx.fillRect(tx - .6, ty - .6, 1.2, 1.2);
    ctx.restore();
  }
  function poussiere(ctx, t){
    const dt = dernier ? Math.min(.05, (t - dernier) / 1000) : .016;
    parts = parts.filter(p => t - p.n < 7000);
    for (const p of parts) {
      if (p.y < p.sol) {
        p.vy += 260 * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.vx *= .98;
        if (p.y >= p.sol) { p.y = p.sol; p.vx = 0; }
      }
      const age = (t - p.n) / 7000;
      ctx.fillStyle = `rgba(${p.v},${p.v},${p.v + 4},${(.85 * (1 - age)).toFixed(3)})`;
      ctx.fillRect(p.x, p.y, p.z, p.z);
    }
  }
  // les fils de traduction : anglais ↔ espagnol ↔ grec ; dans la lumière, ils deviennent des fils d'encre de couleur
  function fils(ctx, f, dansLaLumiere){
    const PC = D.pigments;
    V.liens.forEach((L, k) => {
      const a = groupe(0, L.en), b = groupe(1, L.es), c = groupe(2, L.gr), u = clamp(f * 1.6 - k * .25);
      if (u <= 0) return;
      const paires = [];
      if (a && b) paires.push([a, b, PC[0], PC[1]]);
      if (b && c) paires.push([b, c, PC[1], PC[2]]);
      paires.forEach(([p, q, c1, c2], m) => {
        const v = clamp(u * 2 - m);
        if (v <= 0) return;
        const x0 = (p.x0 + p.x1) / 2, y0 = p.y1 + 2, x1 = (q.x0 + q.x1) / 2, y1 = q.y0 - 2, cx = (x0 + x1) / 2 + (x1 - x0) * .15, cy = (y0 + y1) / 2;
        const g = ctx.createLinearGradient(x0, y0, x1, y1);
        g.addColorStop(0, rgb(dansLaLumiere ? c1.c : c1.v, .95));
        g.addColorStop(1, rgb(dansLaLumiere ? c2.c : c2.v, .95));
        ctx.save();
        ctx.globalCompositeOperation = dansLaLumiere ? "source-over" : "lighter";
        ctx.strokeStyle = g; ctx.lineCap = "round";
        const couches = dansLaLumiere ? [[5, .12], [1.6, .9]] : [[11, .14], [4, .4], [1.5, 1]];
        for (const [lw, al] of couches) {
          ctx.globalAlpha = al; ctx.lineWidth = lw;
          ctx.beginPath(); ctx.moveTo(x0, y0);
          for (let i = 1; i <= 24 * v; i++) {
            const tt = i / 24;
            ctx.lineTo((1 - tt) * (1 - tt) * x0 + 2 * (1 - tt) * tt * cx + tt * tt * x1, (1 - tt) * (1 - tt) * y0 + 2 * (1 - tt) * tt * cy + tt * tt * y1);
          }
          ctx.stroke();
        }
        ctx.globalAlpha = .9 * v;
        ctx.fillStyle = dansLaLumiere ? "rgba(40,22,8,.9)" : rgb(BLANC_PUR);
        ctx.beginPath(); ctx.arc(x0, y0, 1.6, 0, 7); ctx.fill();
        if (v >= 1) { ctx.beginPath(); ctx.arc(x1, y1, 1.6, 0, 7); ctx.fill(); }
        ctx.restore();
      });
    });
  }
  function dessinerFissure(ctx, f, flot){
    const F = fissure;
    if (!F) return;
    const n = Math.floor(F.seg.length * f);
    if (n < 1) return;
    ctx.save();
    ctx.lineCap = "round"; ctx.lineJoin = "round";
    const passe = (col, lw, op) => {
      ctx.globalCompositeOperation = op;
      ctx.strokeStyle = col;
      for (let b = 0; b < 5; b++) {
        ctx.lineWidth = lw(b);
        ctx.beginPath();
        for (let i = 0; i < n; i++) {
          const g = F.seg[i];
          if (Math.min(4, g.l | 0) !== b) continue;
          ctx.moveTo(g.x0, g.y0);
          ctx.quadraticCurveTo(g.cx, g.cy, g.x1, g.y1);
        }
        ctx.stroke();
      }
    };
    passe("rgba(6,5,4,.95)", b => b + 2 + 1.5 * flot, "source-over");
    passe(`rgba(255,170,70,${(.15 + .2 * flot).toFixed(3)})`, b => (b + 1) * 2.6 + 3 + 4 * flot, "lighter");
    passe(`rgba(255,200,110,${(.06 + .12 * flot).toFixed(3)})`, b => (b + 1) * 7 + 8 + 10 * flot, "lighter");
    passe("rgba(255,232,170,.95)", b => .5 + b * .55 + 1.2 * flot, "lighter");
    ctx.restore();
  }
  function rais(ctx, F, a, tourne){
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    for (const q of F.rais) {
      const L = Math.max(W, H) * 1.3, an = q.a + tourne, a1 = an - q.l / 2, a2 = an + q.l / 2;
      const g = ctx.createRadialGradient(q.x, q.y, 0, q.x, q.y, L);
      g.addColorStop(0, `rgba(255,220,150,${a.toFixed(3)})`);
      g.addColorStop(1, "rgba(255,200,120,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(q.x, q.y);
      ctx.lineTo(q.x + Math.cos(a1) * L, q.y + Math.sin(a1) * L);
      ctx.lineTo(q.x + Math.cos(a2) * L, q.y + Math.sin(a2) * L);
      ctx.closePath(); ctx.fill();
    }
    ctx.restore();
  }
  // la lumière dorée qui était derrière la pierre : elle s'ouvre depuis l'impact et remplit l'écran
  function lumiere(ctx, t, lum){
    const F = fissure, R0 = Math.max(W, H) * (.15 + 1.3 * doux(lum * 1.1));
    const g = ctx.createRadialGradient(F.ix, F.iy, 0, F.ix, F.iy, R0);
    g.addColorStop(0, rgb([255, 240, 200], lum));
    g.addColorStop(.25, rgb([250, 206, 122], lum));
    g.addColorStop(.6, rgb([200, 134, 52], lum));
    g.addColorStop(1, rgb([96, 56, 20], lum));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    rais(ctx, F, .07 * lum, t * .00003);
    // les poussières d'or qui dansent dans la lumière (sans état : une fonction du temps)
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    const R = graine(seed + 77);
    for (let k = 0; k < 70; k++) {
      const x0 = R() * W, y0 = R() * H, v = 6 + 14 * R(), ph = R() * 6.283, z = .6 + 1.6 * R();
      const x = x0 + Math.sin(t * .0004 + ph) * 18, y = ((y0 - t * .001 * v) % H + H) % H;
      const a = lum * (.25 + .35 * Math.max(0, Math.sin(t * .002 + ph * 3)));
      ctx.fillStyle = `rgba(255,236,180,${a.toFixed(3)})`;
      ctx.fillRect(x, y, z, z);
    }
    ctx.restore();
  }
  function dessinerMorceaux(ctx, lum){
    for (const f of morceaux) {
      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(f.a);
      ctx.scale(f.sc, f.sc);
      const X = f.ox, Y = f.oy;
      if (lum > 0 && f.parti) { ctx.globalAlpha = Math.min(1, lum * 1.2); ctx.drawImage(f.lis, X - 1.3, Y - 1.3, f.tw, f.th); }
      ctx.globalAlpha = 1;
      if (f.parti) ctx.drawImage(f.dos, X + 1.6, Y + 2.6, f.tw, f.th);
      ctx.drawImage(f.face, X, Y, f.tw, f.th);
      if (lum > 0 && f.parti) { ctx.globalAlpha = .16 * lum; ctx.drawImage(f.lis, X, Y, f.tw, f.th); }
      ctx.restore();
    }
    // les éclats, groupés par teinte
    for (const clair of [true, false]) {
      ctx.fillStyle = clair ? "#cbc6be" : "#4a484f";
      ctx.beginPath();
      for (const e of eclats) {
        if (e.clair !== clair) continue;
        const c = Math.cos(e.a) * e.r, sn = Math.sin(e.a) * e.r;
        ctx.moveTo(e.x + c, e.y + sn);
        ctx.lineTo(e.x - sn * .8 - c * .4, e.y + c * .8 - sn * .4);
        ctx.lineTo(e.x + sn * .6 - c * .7, e.y - c * .6 - sn * .7);
        ctx.closePath();
      }
      ctx.fill();
    }
  }
  function dessinerNuage(ctx, tb){
    for (const p of nuage) {
      const u = p.n / p.vie, a = p.al * (1 - u) * Math.min(1, p.n / 120);
      if (a <= .005) continue;
      ctx.globalAlpha = a;
      ctx.drawImage(PLUME, p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
    }
    ctx.globalAlpha = 1;
  }
  function dessinerMots(ctx, t, lum){
    if (!motsCv) return;
    const lev = Math.sin(t * .0011) * .9 - 1.5 * doux(lum);
    if (motsHalo) {
      ctx.globalAlpha = .55 * clamp(lum * 1.4);
      ctx.drawImage(motsHalo.cv, SX - motsHalo.m, SY - motsHalo.m + lev + 2.5, SW + 2 * motsHalo.m, SH + 2 * motsHalo.m);
    }
    if (motsSil) {
      ctx.globalAlpha = .75 * clamp(lum * 1.4);
      ctx.drawImage(motsSil, SX + .9, SY + lev + 1.3, SW, SH);
    }
    ctx.globalAlpha = 1;
    ctx.drawImage(motsCv, SX, SY + lev, SW, SH);
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = .1 + .08 * Math.sin(t * .0021);
    ctx.drawImage(motsCv, SX, SY + lev, SW, SH);
    ctx.restore();
  }

  function frame(ctx, t){
    if (gen) {
      const t0 = performance.now();
      while (performance.now() - t0 < 9) { if (gen.next().done) { gen = null; pret = true; stale = true; break; } }
    }
    if (pret) {
      avancer(t);
      if (tSeuil !== null) seuilAvancer(t);
      travailler(gen ? 3 : 8);
    }
    const dt = dernier ? Math.min(.04, (t - dernier) / 1000) : .016;
    const ts = tSeuil === null ? -1 : t - tSeuil;
    const tb = brise ? t - tBrise : -1;
    if (brise && !posage && tb < 15000) physique(dt, tb);
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
    ctx.fillStyle = rgb([8, 8, 10]);
    ctx.fillRect(0, 0, W, H);
    if (mur) ctx.drawImage(mur, 0, 0, W, H);
    const lc = Math.cos(az), ls = Math.sin(az), tg = Math.tan(el);
    // la flaque de lumière sur le fond, du côté de la source
    {
      const hx = SX + SW / 2 + lc * SW * .5, hy = SY + SH / 2 + ls * SH * .45;
      const halo = ctx.createRadialGradient(hx, hy, 0, hx, hy, Math.max(W, H) * .7);
      halo.addColorStop(0, "rgba(200,198,206,.12)");
      halo.addColorStop(1, "rgba(200,198,206,0)");
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, W, H);
    }
    const apparu = tPret < 0 ? 0 : lisse((t - tPret) / 700);
    const eclat = ts < 0 ? 0 : lisse(ts / 1200);
    const fl = ts < 0 ? 0 : lisse((ts - 1000) / 2300);
    const flot = ts < 0 ? 0 : lisse((ts - 1900) / 1600);
    const lum = tb < 0 ? 0 : lisse(tb / 1700);
    if (lum > 0 && fissure) lumiere(ctx, t, lum);
    // le tremblement : la fissure fait vibrer la pierre, l'éclatement la secoue
    let shx = 0, shy = 0;
    if (ts >= 0 && !brise) { const a = 2.2 * fl * fl; shx = (Math.random() - .5) * a; shy = (Math.random() - .5) * a; }
    if (brise && tb < 900) { const a = 11 * Math.exp(-tb / 170); shx = (Math.random() - .5) * a; shy = (Math.random() - .5) * a; }
    ctx.save();
    ctx.translate(shx, shy);
    if (!brise) {
      if (ombre && apparu > 0) {
        const off = clamp(3.2 / tg, 7, 24);
        ctx.globalAlpha = .95 * apparu;
        ctx.drawImage(ombre.cv, SX - ombre.m - lc * off, SY - ombre.m - ls * off, SW + 2 * ombre.m, SH + 2 * ombre.m);
        ctx.globalAlpha = 1;
      }
      if (cvS && apparu > 0) {
        ctx.globalAlpha = apparu;
        ctx.imageSmoothingEnabled = true;
        ctx.drawImage(cvS, SX, SY, SW, SH);
        if (eclat > 0) {
          ctx.globalCompositeOperation = "lighter";
          ctx.globalAlpha = .2 * eclat;
          ctx.drawImage(cvS, SX, SY, SW, SH);
        }
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 1;
        if (eclat > 0) for (let k = 0; k < 4; k++) if (mots[k]) briller(ctx, k, mots[k].map((m, i) => i), .28 * eclat);
        if (ts >= 0) fils(ctx, clamp((ts - 300) / 1800), false);
        if (ts >= 0) dessinerFissure(ctx, fl, flot);
        ciseau(ctx, t);
        poussiere(ctx, t);
      }
    } else {
      if (!posage) dessinerMorceaux(ctx, lum);
      dessinerNuage(ctx, tb);
    }
    ctx.restore();
    if (brise) {
      dessinerMots(ctx, t, lum);
      fils(ctx, 1, true);
    }
    if (lueur && t - lueur.t < 2600 && cvS) {
      const e = Math.exp(-(t - lueur.t) / 900) * (.82 + .18 * Math.sin((t - lueur.t) / 90)) * 1.3;
      lueur.L.forEach(([k, L], j) => briller(ctx, k, L, (j ? .55 : 1) * e));
    }
    // avant l'éclatement : la lumière perce par la fissure
    if (!brise && flot > 0 && fissure) {
      const F = fissure;
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      const r = ctx.createRadialGradient(F.ix, F.iy, 0, F.ix, F.iy, Math.max(W, H) * .8);
      r.addColorStop(0, `rgba(255,196,96,${(.3 * flot).toFixed(3)})`);
      r.addColorStop(.35, `rgba(220,150,60,${(.12 * flot).toFixed(3)})`);
      r.addColorStop(1, "rgba(160,100,40,0)");
      ctx.fillStyle = r;
      ctx.fillRect(0, 0, W, H);
      ctx.restore();
      rais(ctx, F, .09 * flot, 0);
    }
    // l'éclair de l'éclatement
    if (brise && tb < 700) {
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = `rgba(255,236,196,${(.85 * Math.exp(-tb / 190)).toFixed(3)})`;
      ctx.fillRect(0, 0, W, H);
      ctx.restore();
    }
    // la ligne mono, sous la stèle
    ctx.fillStyle = lum > .5 ? "rgba(48,26,8,.78)" : rgb(GRIS_CLAIR, .62);
    ctx.font = "9px ui-monospace, Consolas, monospace";
    ctx.textAlign = "center";
    const deg = Math.round(((az * 180 / Math.PI) % 360 + 360) % 360), ldeg = Math.round(el * 180 / Math.PI);
    let txt;
    if (!pret) txt = "LA PIERRE SE TAILLE…";
    else if (brise) txt = `VORONOÏ · ${morceaux.length} MORCEAUX · LES MOTS SONT LIBRES`;
    else if (fl > 0 && fissure) txt = `GRIFFITH · ${Math.floor(fissure.seg.length * fl)} LIENS ROMPUS · « ${V.gr} »`;
    else txt = `DISTANCE SIGNÉE · TAILLE EN V · LUMIÈRE ${deg}° / ${ldeg}°`;
    ctx.fillText(txt, W / 2, Math.min(H - 4, SY + SH + 13));
    ctx.textAlign = "left";
    passeGrain(ctx, W, H, t, .035);
    dernier = t;
  }

  /* ---------- les gestes et l'API de l'app ---------- */
  const faits = () => [0, 1, 2, 3].filter(k => tReg[k] !== null);
  function ligne(){
    const F = faits();
    if (tSeuil !== null) return "les mots sont libres · " + (D.chaine + 1) + " jours";
    if (!F.length) return "stèle vierge · chaîne " + D.chaine + " jours";
    const i = derniere >= 0 && tReg[derniere] !== null ? derniere : F[F.length - 1];
    return PRI[i].nom + " · " + D.langues[i].toLowerCase() + " · " + D.pigments[i].nom.toLowerCase() + " · " + F.length + " sur 4";
  }
  function textes(){
    const F = faits();
    M.bouton = tSeuil !== null ? "Encore" : F.length < 4 ? PRI[[0, 1, 2, 3].find(k => tReg[k] === null)].nom : "Boucler";
    M.ligne = ligne();
  }
  function relancer(){
    variante++; seed += 101;
    tReg = [null, null, null, null]; tSeuil = null; parts = []; lueur = null; derniere = -1;
    remettre();
    pret = false; tPret = -1; plein = null; vite = []; gen = construire();
    textes();
  }
  function etat(liste, boucle){
    const L = (liste || []).filter(i => i >= 0 && i < 4);
    const t = maintenant();
    tReg = [0, 1, 2, 3].map(k => L.includes(k) ? t - 1e7 : null);
    tSeuil = boucle && L.length === 4 ? t - 1e7 : null;
    remettre();
    parts = []; lueur = null; stale = true;
    textes();
  }
  M.etat = etat;
  M.aller = n => { n = clamp(n | 0, 0, 5); etat([0, 1, 2, 3].filter(k => k < n), n >= 5); };
  M.faire = i => {
    if (i < 0 || i > 3 || tReg[i] !== null || tSeuil !== null) return;
    tReg[i] = maintenant(); derniere = i;
    textes();
  };
  M.retirer = i => {
    if (i < 0 || i > 3 || tReg[i] === null) return;
    if (tSeuil !== null) { tSeuil = null; remettre(); }
    tReg[i] = null; stale = true;
    textes();
  };
  M.boucler = () => {
    if (tSeuil !== null || faits().length < 4) return;
    tSeuil = maintenant(); remettre();
    textes();
  };
  M.faits = faits;
  M.boucle = () => tSeuil !== null;
  M.geste = i => {
    if (i !== undefined) return M.faire(i);
    const t = maintenant();
    if (t - dernierGeste < 900) return;
    dernierGeste = t;
    if (tSeuil !== null) { relancer(); return; }
    const F = faits();
    if (F.length === 4) M.boucler();
    else M.faire([0, 1, 2, 3].find(k => tReg[k] === null));
  };
  M.taille = (ww, hh, dpr) => {
    const k = ww + "x" + hh + "x" + dpr;
    if (k === cle) return;
    cle = k; W = ww; H = hh; DPR = dpr || 1;
    const haut = Math.max(40, H * .07), bas = Math.max(84, H * .11), ah = H - haut - bas;
    SH = ah; SW = Math.min(W - 28, SH * .8); SX = (W - SW) / 2; SY = haut;
    s = Math.min(Math.max(1, Math.min(DPR, 1.5)), Math.sqrt(460000 / (SW * SH)));
    pret = false; tPret = -1; plein = null; vite = []; stale = true;
    remettre();
    gen = construire();
  };
  M.frame = frame;
  M.tap = (x, y) => {
    for (let k = 0; k < 4; k++) {
      if (tReg[k] === null || !mots[k]) continue;
      for (let i = 0; i < mots[k].length; i++) {
        const m = mots[k][i];
        if (!m) continue;
        const b = enCSS(m);
        if (x < b.x0 - 5 || x > b.x1 + 5 || y < b.y0 - 6 || y > b.y1 + 6) continue;
        if (k === 3) {
          lueur = { t: maintenant(), L: [[3, [0, 1, 2, 3]]] };
          M.ligne = "grand livre · " + livre[1] + " · débit " + livre[2] + " = crédit " + livre[3];
          return;
        }
        const cle2 = ["en", "es", "gr"][k], L = V.liens.find(l => l[cle2].includes(i));
        if (!L) { lueur = { t: maintenant(), L: [[k, [i]]] }; M.ligne = m.t + " · " + D.langues[k].toLowerCase(); return; }
        lueur = { t: maintenant(), L: [[k, L[cle2]], ...["en", "es", "gr"].map((c, j) => [j, L[c]]).filter(([j]) => j !== k && tReg[j] !== null)] };
        const dire = j => L[["en", "es", "gr"][j]].map(q => mots[j][q] && mots[j][q].t).join(" ");
        M.ligne = [0, 1, 2].filter(j => L[["en", "es", "gr"][j]].length).map(dire).join(" ↔ ");
        return;
      }
    }
    if (x > SX && x < SX + SW && y > SY && y < SY + SH) M.ligne = "« " + V.gr + " » · " + V.src.toLowerCase();
  };
  M.glisse = (dx, dy) => {
    az += dx * .012;
    el = clamp(el - dy * .004, .14, .8);
    if (pret && !brise) demanderPlein();
    if (brise && motsCv && !motsGen) motsGen = genererMots();   // les reflets de l'or et de la pyrite suivent la lumière, même en l'air
  };
  return M;
}
window.ETUDE = etude_pierre3;
