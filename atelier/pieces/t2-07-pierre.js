/* ======================= Tour 2, pièce 07 : LA PIERRE DES LANGUES (etude_pierre) ======================= */
/* Ce qu'on voit : une stèle de pierre grise, comme la pierre de Rosette, vue de face, plein cadre : grain, cristaux, veines de calcite,
   éclats aux bords, coin supérieur cassé. Au repos elle est vierge, éclairée en biais, quatre registres à peine marqués au ciseau.
   Chaque priorité faite grave SON registre, lettre après lettre (on voit le ciseau, la poussière) : 990 une maxime anglaise, CUMBRE sa
   traduction espagnole, Lecture la même en grec ancien, LE CLOSING une ligne de grand livre (date romaine, compte, débit = crédit,
   double trait). Son nom est gravé en rubrique dans la marge. Puis un pigment franc se pose dans les creux, du fond vers le haut :
   lapis-lazuli (et ses paillettes de pyrite), vermillon, malachite (ses bandes), or (ses éclats qui tournent avec la lumière).
   La loi 1 (la taille) : chaque lettre est un masque ; sa transformée de distance euclidienne exacte (Felzenszwalb & Huttenlocher,
   2004) donne la distance signée au bord ; la profondeur du creux est cette distance (taille en V à 45°, arête au squelette), le bord
   extérieur s'écaille. Chaque pixel est éclairé par sa normale (Lambert, lumière rasante) et l'ombre portée est calculée par marche
   vers la lumière dans la carte des hauteurs : c'est une vraie ombre en V, qui bouge quand la lumière bouge.
   La loi 2 (le seuil) : la fissure est une percolation d'invasion (Wilkinson & Willemsen, 1983) : elle casse toujours le lien le plus
   faible de son front ; la résistance de chaque lien vient de la pierre (veines et lettres l'affaiblissent), et la contrainte en pointe
   croît comme √a (Griffith, K = σ√(πa)) : la fissure longue s'emballe, les points faibles la font bifurquer.
   La main : la pierre et le ciseau ; aucune couleur hors des pigments ; Georgia en capitales gravées, une ligne mono dessous.
   L'usage : « Ta journée ». Quatre priorités, quatre registres ; la pierre dit la même chose en trois langues, et ton grand livre.
   Le doigt : toucher un mot le fait briller avec ses équivalents, et la ligne donne sa traduction ; glisser déplace la lumière rasante.
   Le seuil (Boucler) : la stèle s'éclaire, des fils de lumière relient les mots qui se traduisent (anglais ↔ espagnol ↔ grec), puis la
   pierre se fend d'une fissure ramifiée d'où sort une lumière dorée sur tout l'écran ; l'état final reste. Encore : autre maxime, autre pierre.
   Le téléphone : la pierre (≤ 460 000 px) se construit par tranches de 9 ms ; l'éclairage ne se recalcule que sur les lettres qui
   changent, et la passe entière (lumière déplacée) avance par bandes de 6 lignes, 9 ms au plus par image. Toiles cachées < 1 M px. */
const etude_pierre_DONNEES = Object.assign({
  langues: ["ANGLAIS", "ESPAGNOL", "GREC ANCIEN", "GRAND LIVRE"],
  pigments: [{ nom: "LAPIS-LAZULI", c: [30, 64, 172], v: [96, 140, 255] }, { nom: "VERMILLON", c: [212, 50, 28], v: [255, 110, 70] },
             { nom: "MALACHITE", c: [20, 132, 88], v: [70, 230, 150] }, { nom: "OR", c: [214, 166, 60], v: [255, 214, 120] }],
  date: [26, 10, 2026], comptes: ["512", "401", "411", "2154", "604", "106"],
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

function etude_pierre_romain(n){ const T = [[1000,"M"],[900,"CM"],[500,"D"],[400,"CD"],[100,"C"],[90,"XC"],[50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]];
  let r = ""; for (const [v, c] of T) while (n >= v){ r += c; n -= v; } return r; }
/* La transformée de distance euclidienne exacte (Felzenszwalb & Huttenlocher) : g vaut 0 sur la cible, 1e20 ailleurs ; rend les carrés. */
function etude_pierre_edt(g, w, h){
  const n = Math.max(w, h), f = new Float64Array(n), d = new Float64Array(n), v = new Int32Array(n), z = new Float64Array(n + 1);
  const passe = len => { let k = 0; v[0] = 0; z[0] = -1e30; z[1] = 1e30;
    for (let q = 1; q < len; q++){ let s; for (;;){ const p = v[k]; s = ((f[q] + q*q) - (f[p] + p*p)) / (2*q - 2*p); if (s <= z[k] && k > 0) k--; else break; }
      if (s <= z[k]) { v[0] = q; z[0] = -1e30; z[1] = 1e30; k = 0; continue; }
      k++; v[k] = q; z[k] = s; z[k + 1] = 1e30; }
    k = 0; for (let q = 0; q < len; q++){ while (z[k + 1] < q) k++; const r = q - v[k]; d[q] = r*r + f[v[k]]; } };
  for (let x = 0; x < w; x++){ for (let y = 0; y < h; y++) f[y] = g[y*w + x]; passe(h); for (let y = 0; y < h; y++) g[y*w + x] = d[y]; }
  for (let y = 0; y < h; y++){ const o = y*w; for (let x = 0; x < w; x++) f[x] = g[o + x]; passe(w); for (let x = 0; x < w; x++) g[o + x] = d[x]; }
}

function etude_pierre(){
  const D = etude_pierre_DONNEES, PRI = D.priorites;
  let W = 390, H = 760, DPR = 1, seed = 196, variante = 0;
  let SX = 0, SY = 0, SW = 1, SH = 1, s = 1, w = 1, h = 1, N = 1;
  let A, Hs, Dc, Lid, U, ALB, GR, NX, NY, Z, IMG, cvS = null, cxS, mur = null, ombre = null, teintes = [];
  let G = [], PR = new Float32Array(1), PG = new Float32Array(1), LV = new Float32Array(1), DM = new Float32Array(1);
  let mots = [[], [], [], []], regs = [], gen = null, pret = false, tPret = -1, V = D.maximes[0], livre = null;
  let tReg = [null, null, null, null], stale = true, tSeuil = null, etape = 0, dernierGeste = -1e9;
  let az = Math.atan2(-.55, -.85), el = .3, vite = [], plein = null, encorePlein = false;
  let fissure = null, parts = [], lueur = null, frappe = -1, dernier = 0, cle = "";
  const mes = document.createElement("canvas").getContext("2d");
  const police = sz => `bold ${sz.toFixed(2)}px Georgia, "Times New Roman", serif`;
  const M = { titre: "LA PIERRE DES LANGUES", bouton: libelleGeste(0), ligne: "stèle vierge · chaîne " + D.chaine + " jours", dprMax: 1.5 };

  /* ---------- la mise en page des quatre registres (en px de travail) ---------- */
  function largeur1(txt, tr){ mes.font = police(100); let L = 0, n = 0; for (const ch of txt){ L += mes.measureText(ch).width/100 + tr; n++; } return L - (n ? tr : 0); }
  function poserLigne(k, txt, x, base, sz, tr, rub, wi0){ mes.font = police(sz); let wi = wi0;
    for (const ch of txt){ const adv = mes.measureText(ch).width;
      if (ch === " ") wi++;
      else G.push({ reg: k, ch, x, y: base, sz, rub, wi: rub ? -1 : wi, x0: x, x1: x + adv, ly0: base - sz*1.08, ly1: base + sz*.34 });
      x += adv + tr*sz; }
    return wi; }
  function mettreEnPage(){
    V = D.maximes[variante % D.maximes.length];
    const R = graine(seed*3 + 11), pad = w*.075, larg = w - 2*pad, r0 = h*.118, r1 = h*.962, bh = (r1 - r0)/4;
    G = []; mots = [[], [], [], []]; regs = [];
    const montant = () => { const v = Math.round((.4 + R()*8.6)*1000)*1000; return String(v).replace(/\B(?=(\d{3})+(?!\d))/g, " "); };
    const m = montant(); livre = [etude_pierre_romain(D.date[0]) + "·" + etude_pierre_romain(D.date[1]), "Nº " + D.comptes[(seed + variante) % D.comptes.length], m, m];
    for (let k = 0; k < 4; k++){
      const y0 = r0 + k*bh, y1 = y0 + bh; regs.push({ y0, y1 });
      const rs = clamp(bh*.09, 9*s, 13.5*s);
      poserLigne(k, etude_pierre_romain(k + 1) + " · " + PRI[k].nom.toUpperCase(), pad, y0 + rs*1.7, rs, .2, true, 0);
      const ty0 = y0 + rs*2.4, ty1 = y1 - bh*.08, cy = (ty0 + ty1)/2;
      if (k < 3){
        const words = [V.en, V.es, V.gr][k].split(" "), tr = .1;
        const coupes = [[words]];
        if (words.length > 1) { let best = null, bv = 1e9; for (let i = 1; i < words.length; i++){ const a = words.slice(0, i).join(" "), b = words.slice(i).join(" "), v = Math.max(a.length, b.length); if (v < bv){ bv = v; best = [words.slice(0, i), words.slice(i)]; } } coupes.push(best); }
        let choix = null, tail = 0;
        for (const c of coupes){ const lw = Math.max(...c.map(l => largeur1(l.join(" "), tr))); const sz = Math.min((ty1 - ty0)/(c.length*1.25), larg*.97/lw, bh*.4);
          if (sz > tail*1.12){ tail = sz; choix = c; } }
        let wi = 0;
        choix.forEach((l, li) => { const txt = l.join(" "), lw = largeur1(txt, tr)*tail, base = cy - (choix.length - 1)*tail*1.25/2 + li*tail*1.25 + tail*.36;
          const g0 = G.length; wi = poserLigne(k, txt, (w - lw)/2, base, tail, tr, false, wi) + 1;
          for (let j = g0; j < G.length; j++){ const g = G[j], M2 = mots[k][g.wi] || (mots[k][g.wi] = { x0: 1e9, y0: 1e9, x1: -1e9, y1: -1e9, t: "" });
            M2.x0 = Math.min(M2.x0, g.x0); M2.x1 = Math.max(M2.x1, g.x1); M2.y0 = Math.min(M2.y0, g.y - g.sz*.78); M2.y1 = Math.max(M2.y1, g.y + g.sz*.1); M2.t += g.ch; } });
      } else {
        const tr = .05, cw = larg/4; let sz = Math.min((ty1 - ty0)*.5, bh*.3); livre.forEach(t => sz = Math.min(sz, cw*.84/largeur1(t, tr)));
        const base = cy + sz*.28;
        livre.forEach((t, c) => { const lw = largeur1(t, tr)*sz, g0 = G.length; poserLigne(k, t, pad + c*cw + (cw - lw)/2, base, sz, tr, false, c);
          for (let j = g0; j < G.length; j++) G[j].wi = c;
          mots[3][c] = { x0: pad + c*cw + (cw - lw)/2, x1: pad + c*cw + (cw + lw)/2, y0: base - sz*.8, y1: base + sz*.3, t }; });
        const rect = (x0, y0, x1, y1, wi) => G.push({ reg: 3, r: true, x0, x1, y0, y1, ly0: y0 - 2, ly1: y1 + 2, wi, rub: false });
        for (let c = 1; c < 4; c++){ const x = pad + c*cw; rect(x - .75*s, base - sz*1.05, x + .75*s, base + sz*.48, -1); }
        for (const dy of [sz*.5, sz*.5 + 3*s]) rect(pad + 2*cw + cw*.1, base + dy, pad + 4*cw - cw*.1, base + dy + 1.7*s, -1);
      }
    }
    // le temps de chaque lettre (ms après le geste) : la rubrique d'abord, puis le texte, au prorata des largeurs ; puis le pigment
    for (let k = 0; k < 4; k++){
      const rub = G.filter(g => g.reg === k && g.rub), tx = G.filter(g => g.reg === k && !g.rub);
      rub.forEach((g, i) => { g.a = i*420/rub.length; g.b = g.a + 420/rub.length*1.8; });
      const tot = tx.reduce((a, g) => a + Math.max(3*s, g.x1 - g.x0), 0); let cum = 0;
      tx.forEach(g => { const L = Math.max(3*s, g.x1 - g.x0); g.a = 450 + 2850*cum/tot; cum += L; g.b = 450 + 2850*cum/tot + 70; });
      G.filter(g => g.reg === k).forEach(g => { g.pa = 3150 + 650*((g.x0 + g.x1)/2/w); });
    }
    const n = G.length; PR = new Float32Array(n); PG = new Float32Array(n); LV = new Float32Array(n); DM = new Float32Array(n);
  }
  function dessinerGlyphe(c, g){ if (g.r) c.fillRect(g.x0, g.y0, g.x1 - g.x0, g.y1 - g.y0); else { c.font = police(g.sz); c.fillText(g.ch, g.x, g.y); } }

  /* ---------- la taille d'un registre : masque, distance signée, profondeur en V ---------- */
  function graver(k, R){
    const B = regs[k], y0 = Math.max(0, Math.floor(B.y0) - 2), hh = Math.min(h, Math.ceil(B.y1) + 2) - y0;
    const [cv, c] = [document.createElement("canvas"), null]; cv.width = w; cv.height = hh; const cx = cv.getContext("2d");
    cx.fillStyle = "#fff"; cx.translate(0, -y0); const L = G.map((g, i) => i).filter(i => G[i].reg === k); L.forEach(i => dessinerGlyphe(cx, G[i]));
    const im = cx.getImageData(0, 0, w, hh).data, n = w*hh, gi = new Float64Array(n), go = new Float64Array(n);
    for (let i = 0; i < n; i++){ const ins = im[i*4 + 3] > 127; gi[i] = ins ? 1e20 : 0; go[i] = ins ? 0 : 1e20; }
    etude_pierre_edt(gi, w, hh); etude_pierre_edt(go, w, hh);
    // le masque teinté (pour faire briller un mot touché)
    const tv = document.createElement("canvas"); tv.width = w; tv.height = hh; const tc = tv.getContext("2d"); tc.fillStyle = rgb(D.pigments[k].v); tc.translate(0, -y0);
    L.forEach(i => dessinerGlyphe(tc, G[i])); teintes[k] = { cv: tv, y0 };
    for (let i = 0; i < n; i++){
      const a = im[i*4 + 3]; let dep = 0;
      if (a > 127) dep = Math.sqrt(gi[i]) - .5 + (a/255 - .5);          // dedans : la distance au bord = la profondeur (V à 45°)
      else if (a > 0) dep = a/255*.5;
      else { const dout = Math.sqrt(go[i]); if (dout < 1.8*s && R() > .55) dep = (1 - dout/(1.8*s))*.4*R(); }   // dehors : le bord s'écaille
      if (dep <= 0) continue;
      const X = i % w, Y = (i/w | 0) + y0, j = Y*w + X; if (!A[j]) continue;
      let best = -1, bd = 1e9;
      for (const l of L){ const g = G[l]; if (Y < g.ly0 || Y > g.ly1) continue; const dx = X < g.x0 ? g.x0 - X : X > g.x1 ? X - g.x1 : 0; if (dx < bd){ bd = dx; best = l; } }
      if (best < 0 || bd > 3*s) continue;
      const g = G[best], gh = g.ly1 - g.ly0;
      Dc[j] = dep; Lid[j] = best; U[j] = clamp(((X - g.x0)/Math.max(1, g.x1 - g.x0))*.78 + ((Y - g.ly0)/gh)*.22)*255;
      if (dep > DM[best]) DM[best] = dep;
    }
  }

  /* ---------- la pierre : construite par tranches ---------- */
  function* construire(){
    const R = graine(seed), nA = bruit2(seed + 1), nB = bruit2(seed + 2), nC = bruit2(seed + 3), nD = bruit2(seed + 4), nE = bruit2(seed + 5), nS = bruit1(seed + 6), nT = bruit1(seed + 7);
    { const cw = Math.ceil(W/2), ch = Math.ceil(H/2), cv = document.createElement("canvas"); cv.width = cw; cv.height = ch; const c = cv.getContext("2d"), im = c.createImageData(cw, ch);
      for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++){ const o = (y*cw + x)*4, v = 19 + 13*nA(x*.012, y*.012) + 6*nB(x*.08, y*.08) + (R() - .5)*7;
        im.data[o] = v; im.data[o + 1] = v + 1; im.data[o + 2] = v + 4; im.data[o + 3] = 255; }
      c.putImageData(im, 0, 0); mur = cv; }
    yield;
    w = Math.max(8, Math.round(SW*s)); h = Math.max(8, Math.round(SH*s)); N = w*h;
    A = new Uint8Array(N); Hs = new Float32Array(N); Dc = new Float32Array(N); Lid = new Int16Array(N).fill(-1); U = new Uint8Array(N);
    ALB = new Uint8Array(N); GR = new Uint8Array(N); NX = new Float32Array(N); NY = new Float32Array(N); Z = new Uint8Array(N);
    cvS = document.createElement("canvas"); cvS.width = w; cvS.height = h; cxS = cvS.getContext("2d"); IMG = cxS.createImageData(w, h);
    const ga = new Float32Array(h), dr = new Float32Array(h), ha = new Float32Array(w), ba = new Float32Array(w);
    for (let y = 0; y < h; y++){ const Y = y/s; ga[y] = 2.5 + 3*nS(Y*.03) + 1.3*nT(Y*.21); dr[y] = SW - 2.5 - 3*nT(Y*.03 + 40) - 1.3*nS(Y*.2 + 9); }
    for (let x = 0; x < w; x++){ const X = x/s, xn = X/SW;
      ha[x] = 3 + 5*nS(X*.025 + 70) + 1.6*nT(X*.19 + 30) + SH*.075*Math.pow(Math.max(0, (xn - .56)/.44), 1.25)*(.8 + .4*nT(X*.05)) + SH*.03*Math.max(0, (.16 - xn)/.16);
      ba[x] = SH - 3 - 2.5*nT(X*.03 + 90); }
    for (let y = 0; y < h; y++){
      const Y = y/s;
      for (let x = 0; x < w; x++){
        const X = x/s, i = y*w + x, de = Math.min(X - ga[y], dr[y] - X, Y - ha[x], ba[x] - Y);
        A[i] = clamp(de*s + .5)*255;
        GR[i] = R()*255;
        if (de < -1){ Hs[i] = -3*s; continue; }
        const big = nA(X*.011, Y*.011)*.6 + nA(X*.03 + 50, Y*.03)*.4, mid = nB(X*.09, Y*.09), fin = nC(X*.45, Y*.45);
        const v = nD(X*.018 + mid*.7, Y*.032 + big*.9), crete = 1 - Math.abs(2*v - 1), veine = lisse((crete - .968)/.026)*(.4 + .6*nB(X*.02 + 7, Y*.02));
        let hz = 2.2*big + .55*mid + .3*fin + .3*veine;
        const p = nE(X*.6, Y*.6); if (p > .84) hz -= (p - .84)*7;
        let g = 86 + 42*big + 14*mid + 9*(R() - .5), r = R();
        if (r < .03) g -= 34; else if (r > .986) g += 46;
        if (nC(X*.85 + 9, Y*.85) > .83) g += 26;
        g += veine*58;
        const bw = 7; if (de < bw){ const u = (bw - Math.max(0, de))/bw; hz -= u*u*bw*.55; g += 10*u; }
        Hs[i] = hz*s; ALB[i] = clamp(g, 0, 255);
      }
      if (y % 6 === 5) yield;
    }
    // les éclats : conchoïdaux, la pierre fraîche est plus claire
    for (let e = 0; e < 34; e++){
      const bord = e < 26; let cx, cy, r = (bord ? 2 + R()*6 : 1.2 + R()*3)*s;
      if (bord){ const side = R()*4 | 0, u = R(); if (side === 0){ cy = u*h; cx = ga[cy | 0]*s + R()*2*s; } else if (side === 1){ cy = u*h; cx = dr[cy | 0]*s - R()*2*s; }
        else if (side === 2){ cx = u*w; cy = ha[cx | 0]*s + R()*2*s; } else { cx = u*w; cy = ba[cx | 0]*s - R()*2*s; } }
      else { cx = R()*w; cy = R()*h; }
      const dep = (bord ? 1.6 : .9)*s;
      for (let y = Math.max(0, cy - r | 0); y < Math.min(h, cy + r + 1); y++) for (let x = Math.max(0, cx - r | 0); x < Math.min(w, cx + r + 1); x++){
        const d = Math.hypot(x - cx, y - cy)/r; if (d >= 1) continue; const i = y*w + x; Hs[i] -= dep*Math.pow(1 - d*d, .7); ALB[i] = Math.min(255, ALB[i] + 20*(1 - d)); }
    }
    yield;
    mettreEnPage();
    // les registres à peine marqués : cinq traits de ciseau, profondeur exacte d'un V (distance analytique à la ligne)
    { const hw = .8*s;
      for (let k = 0; k <= 4; k++){ const base = regs[0].y0 + k*(regs[0].y1 - regs[0].y0);
        for (let x = Math.round(w*.045); x < w - Math.round(w*.045); x++){ const yc = base + .7*s*nS(x/s*.05 + k*13);
          for (let y = Math.floor(yc - 3); y <= yc + 3; y++){ if (y < 0 || y >= h) continue; const i = y*w + x, d = hw - Math.abs(y - yc); if (d <= -.5 || !A[i]) continue;
            const dep = (d + .5)*.62; if (dep > Dc[i]){ Dc[i] = dep; Lid[i] = -2; } } } } }
    yield;
    for (let k = 0; k < 4; k++){ graver(k, R); yield; }
    for (let i = 0; i < N; i++) if (Dc[i] > 0){ Z[i] = 1; if (i > 0) Z[i - 1] = 1; if (i < N - 1) Z[i + 1] = 1; if (i >= w) Z[i - w] = 1; if (i + w < N) Z[i + w] = 1; }
    for (let y = 1; y < h - 1; y++){ for (let x = 1; x < w - 1; x++){ const i = y*w + x, hx = (Hs[i + 1] - Hs[i - 1])*.5, hy = (Hs[i + w] - Hs[i - w])*.5, q = 1/Math.sqrt(hx*hx + hy*hy + 1);
        NX[i] = -hx*q; NY[i] = -hy*q; } if (y % 40 === 0) yield; }
    // l'ombre de la stèle sur le mur : la silhouette en quart, floutée (trois boîtes)
    { const q = 4, m = 10, ow = Math.ceil(w/q) + 2*m, oh = Math.ceil(h/q) + 2*m; let a = new Float32Array(ow*oh), b = new Float32Array(ow*oh);
      for (let y = 0; y < h; y += q) for (let x = 0; x < w; x += q) a[((y/q | 0) + m)*ow + (x/q | 0) + m] = A[y*w + x]/255;
      for (let p = 0; p < 3; p++){ for (let y = 0; y < oh; y++) for (let x = 0; x < ow; x++){ let t = 0; for (let d = -2; d <= 2; d++) t += a[y*ow + clamp(x + d, 0, ow - 1)]; b[y*ow + x] = t/5; }
        for (let y = 0; y < oh; y++) for (let x = 0; x < ow; x++){ let t = 0; for (let d = -2; d <= 2; d++) t += b[clamp(y + d, 0, oh - 1)*ow + x]; a[y*ow + x] = t/5; } }
      const cv = document.createElement("canvas"); cv.width = ow; cv.height = oh; const c = cv.getContext("2d"), im = c.createImageData(ow, oh);
      for (let i = 0; i < ow*oh; i++){ im.data[i*4 + 3] = a[i]*200; } c.putImageData(im, 0, 0); ombre = { cv, m: m*q/s }; }
  }

  /* ---------- l'éclairage d'un pixel : Lambert sur la normale, ombre portée par marche vers la lumière ---------- */
  function prof(j){ const l = Lid[j]; if (l === -1) return 0; if (l === -2) return Dc[j];
    let f = (PR[l]*1.3 - U[j]/255)/.3; if (f <= 0) return 0; if (f >= 1){ const c = Dc[j]; return c > LV[l] ? LV[l] : c; } return Dc[j]*f; }
  function ombrer(x0, y0, x1, y1){
    const d = IMG.data, lz = Math.sin(el), ce = Math.cos(el), lx = ce*Math.cos(az), ly = ce*Math.sin(az), gain = .62/lz, tg = Math.tan(el);
    const cax = Math.cos(az), cay = Math.sin(az), pas = Math.min(9, Math.ceil(2.6*s/tg)), spx = cax*.3/w, spy = cay*.3/h, PC = D.pigments.map(p => p.c);
    for (let y = y0; y < y1; y++){
      let o = (y*w + x0)*4;
      for (let x = x0; x < x1; x++, o += 4){
        const i = y*w + x, a = A[i];
        if (!a){ d[o + 3] = 0; continue; }
        let nx, ny, nz, g = ALB[i], cut = 0, sh = 1, pc = -1;
        if (Z[i] && x > 0 && y > 0 && x < w - 1 && y < h - 1){
          cut = prof(i); const hc = Hs[i] - cut;
          const hx = (Hs[i + 1] - prof(i + 1)) - (Hs[i - 1] - prof(i - 1)), hy = (Hs[i + w] - prof(i + w)) - (Hs[i - w] - prof(i - w));
          const q = 1/Math.sqrt(hx*hx*.25 + hy*hy*.25 + 1); nx = -hx*.5*q; ny = -hy*.5*q; nz = q;
          if (cut > .15){
            const l = Lid[i]; if (l >= 0 && PG[l] > 0 && Dc[i] > LV[l] && PR[l]*1.3 - U[i]/255 >= .3) pc = G[l].reg;
            for (let k = 1; k <= pas; k++){ const qx = (x + k*cax + .5) | 0, qy = (y + k*cay + .5) | 0; if (qx < 0 || qy < 0 || qx >= w || qy >= h) break;
              const j = qy*w + qx; if (Hs[j] - prof(j) - hc > k*tg){ sh = .34 + .3*(k - 1)/pas; break; } }
            g = g*1.07 + 9;
          }
        } else { nx = NX[i]; ny = NY[i]; nz = Math.sqrt(Math.max(0, 1 - nx*nx - ny*ny)); }
        const dot = nx*lx + ny*ly + nz*lz;
        let I = (.26 + gain*(dot > 0 ? dot : 0))*sh*(1 - .045*cut/s)*(.86 + (x - w/2)*spx + (y - h/2)*spy);
        if (I > 1.55) I = 1.55;
        if (pc >= 0){
          const C = PC[pc], gr = GR[i]/255; let k = (.55 + .5*I)*(.84 + .3*gr), r = C[0], gg = C[1], b = C[2];
          if (pc === 0 && gr > .965){ r = 222; gg = 184; b = 96; k *= 1.2; }                                  // paillettes de pyrite
          else if (pc === 2){ const band = .5 + .5*Math.sin(Hs[i]*3/s + x*.32/s + y*.11/s + gr*.6); r = 14 + 40*band; gg = 100 + 90*band; b = 64 + 60*band; }
          else if (pc === 3){ const gl = Math.max(0, Math.cos(az*2 + gr*40)); k *= .85 + .9*gl*gl*gl; }  // l'or tourne avec la lumière
          d[o] = r*k; d[o + 1] = gg*k; d[o + 2] = b*k;
        } else { d[o] = g*I + 2; d[o + 1] = g*I + 1; d[o + 2] = g*I*1.04 + 4; }
        d[o + 3] = a;
      }
    }
    cxS.putImageData(IMG, 0, 0, x0, y0, x1 - x0, y1 - y0);
  }
  function demanderPlein(){ if (plein) encorePlein = true; else plein = { y: 0 }; }
  function travailler(budget){
    const t0 = performance.now();
    while (vite.length && performance.now() - t0 < budget){ const r = vite.shift(); ombrer(r[0], r[1], r[2], r[3]); }
    while (plein && performance.now() - t0 < budget){ const y1 = Math.min(h, plein.y + 6); ombrer(0, plein.y, w, y1); plein.y = y1;
      if (y1 >= h){ plein = null; if (tPret < 0) tPret = maintenant(); if (encorePlein){ encorePlein = false; plein = { y: 0 }; } } }
  }

  /* ---------- l'état : chaque lettre avance, chaque pigment monte ---------- */
  function avancer(t){
    for (let k = 0; k < 4; k++){
      const dt = tReg[k] === null ? -1 : t - tReg[k];
      if (!stale && (dt < 0 || dt > 5200)) continue;
      let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
      for (let l = 0; l < G.length; l++){ const g = G[l]; if (g.reg !== k) continue;
        const p = dt < 0 ? 0 : clamp((dt - g.a)/(g.b - g.a)), pg = dt < 0 ? 0 : lisse((dt - g.pa)/800);
        if (p !== PR[l] || pg !== PG[l]){ PR[l] = p; PG[l] = pg; LV[l] = DM[l]*(1 - .64*pg);
          x0 = Math.min(x0, g.x0); x1 = Math.max(x1, g.x1); y0 = Math.min(y0, g.ly0); y1 = Math.max(y1, g.ly1); } }
      if (x1 > x0 && !stale) vite.push([Math.max(0, x0 - 4*s | 0), Math.max(0, y0 - 3*s | 0), Math.min(w, x1 + 4*s | 0), Math.min(h, y1 + 3*s | 0)]);
    }
    if (stale){ stale = false; demanderPlein(); }
  }

  /* ---------- la fissure : percolation d'invasion + contrainte de Griffith ---------- */
  function fendre(){
    const R = graine(seed*7 + 3), c = Math.max(3, SW/70), nx = Math.floor(SW/c), ny = Math.floor(SH/c), n = nx*ny;
    const ok = new Uint8Array(n), res = new Float32Array(n), dans = new Uint8Array(n), par = new Int32Array(n).fill(-1), lon = new Int32Array(n), px = new Float32Array(n), py = new Float32Array(n);
    for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++){ const q = j*nx + i, X = (i + .5)*c, Y = (j + .5)*c, idx = Math.min(N - 1, (Y*s | 0)*w + (X*s | 0));
      ok[q] = A[idx] > 250 ? 1 : 0; res[q] = .2 + .8*R() - (ALB[idx] > 150 ? .32 : 0) - (Dc[idx] > 0 ? .12 : 0);
      px[q] = X + (R() - .5)*c*.9; py[q] = Y + (R() - .5)*c*.9; }
    const hp = [], hi = [];
    const pousser = (q, p) => { hp.push(p); hi.push(q); let k = hp.length - 1; while (k > 0){ const m = (k - 1) >> 1; if (hp[m] <= hp[k]) break; [hp[m], hp[k]] = [hp[k], hp[m]]; [hi[m], hi[k]] = [hi[k], hi[m]]; k = m; } };
    const tirer = () => { const q = hi[0], lp = hp.pop(), li = hi.pop(); if (hp.length){ hp[0] = lp; hi[0] = li; let k = 0;
        for (;;){ const a = 2*k + 1, b = a + 1; let m = k; if (a < hp.length && hp[a] < hp[m]) m = a; if (b < hp.length && hp[b] < hp[m]) m = b; if (m === k) break;
          [hp[m], hp[k]] = [hp[k], hp[m]]; [hi[m], hi[k]] = [hi[k], hi[m]]; k = m; } } return q; };
    const voisins = q => { const i = q % nx, j = q/nx | 0, v = []; for (let b = -1; b <= 1; b++) for (let a = -1; a <= 1; a++){ if (!a && !b) continue; const x = i + a, y = j + b; if (x >= 0 && y >= 0 && x < nx && y < ny) v.push(y*nx + x); } return v; };
    const i0 = Math.floor(nx*(.55 + R()*.2)); let q0 = -1; for (let j = 0; j < ny; j++) if (ok[j*nx + i0]){ q0 = j*nx + i0; break; }
    if (q0 < 0) return;
    const ordre = [q0]; dans[q0] = 1;
    const ouvrir = q => { for (const v of voisins(q)) if (ok[v] && !dans[v]) pousser(v, res[v] - 1.9*Math.sqrt((lon[q] + 1)/ny) + ((v/nx | 0) < (q/nx | 0) ? .35 : 0)); };
    ouvrir(q0); let perce = 0;
    while (hp.length && ordre.length < 2200){
      const q = tirer(); if (dans[q]) continue;
      let pa = -1, nb = 0; for (const v of voisins(q)) if (dans[v]){ nb++; pa = v; }
      if (nb !== 1) continue;
      dans[q] = 1; par[q] = pa; lon[q] = lon[pa] + 1; ordre.push(q); ouvrir(q);
      const j = q/nx | 0; if (!perce && (j >= ny - 2 || !ok[q + nx])) perce = ordre.length;
      if (perce && ordre.length > perce*1.2) break;
    }
    // l'épaisseur : le nombre de descendants (le tronc s'ouvre plus que les branches)
    const desc = new Float32Array(n); for (let k = ordre.length - 1; k > 0; k--){ const q = ordre[k]; desc[par[q]] += desc[q] + 1; }
    const seg = ordre.slice(1).map(q => { const p = par[q], g = par[p], x0 = g >= 0 ? (px[p] + px[g])/2 : px[p], y0 = g >= 0 ? (py[p] + py[g])/2 : py[p], fin = desc[q] === 0;
      return { x0: SX + x0, y0: SY + y0, cx: SX + px[p], cy: SY + py[p], x1: SX + (fin ? px[q] : (px[p] + px[q])/2), y1: SY + (fin ? py[q] : (py[p] + py[q])/2), l: Math.min(4.2, .5 + .62*Math.log2(1 + desc[q])) }; });
    let mx = 0, my = 0; seg.forEach(g => { mx += g.x1; my += g.y1; }); mx /= Math.max(1, seg.length); my /= Math.max(1, seg.length);
    const rais = []; for (let k = 0; k < 18; k++){ const g = seg[R()*seg.length | 0]; if (!g) break; const a = Math.atan2(g.y1 - my, g.x1 - mx) + (R() - .5)*.6; rais.push({ x: g.x1, y: g.y1, a, l: .15 + R()*.2 }); }
    fissure = { seg, mx, my, rais };
  }

  /* ---------- le dessin d'une image ---------- */
  const enCSS = (b, k) => ({ x0: SX + b.x0/s, y0: SY + b.y0/s, x1: SX + b.x1/s, y1: SY + b.y1/s });
  function groupe(k, L){ if (!L || !L.length) return null; let b = null; for (const i of L){ const m = mots[k][i]; if (!m) continue; const c = enCSS(m);
      b = b ? { x0: Math.min(b.x0, c.x0), y0: Math.min(b.y0, c.y0), x1: Math.max(b.x1, c.x1), y1: Math.max(b.y1, c.y1) } : c; } return b; }
  function briller(ctx, k, L, a){ const T = teintes[k]; if (!T || !L) return;
    ctx.save(); ctx.globalCompositeOperation = "lighter";
    for (const i of L){ const m = mots[k][i]; if (!m) continue; const x0 = Math.max(0, m.x0 - 3*s), y0 = Math.max(0, m.y0 - T.y0 - 6*s), x1 = Math.min(w, m.x1 + 3*s), y1 = Math.min(T.cv.height, m.y1 - T.y0 + 8*s);
      if (x1 <= x0 || y1 <= y0) continue;
      for (const [ox, oy, f] of [[0, 0, 1], [1.2, 0, .35], [-1.2, 0, .35], [0, 1.2, .35], [0, -1.2, .35]]){ ctx.globalAlpha = a*f;
        ctx.drawImage(T.cv, x0, y0, x1 - x0, y1 - y0, SX + x0/s + ox, SY + (y0 + T.y0)/s + oy, (x1 - x0)/s, (y1 - y0)/s); } }
    ctx.restore(); }
  function ciseau(ctx, t){
    let act = null, k0 = -1;
    for (let k = 0; k < 4; k++){ if (tReg[k] === null) continue; const dt = t - tReg[k]; if (dt < 0 || dt > 3500) continue;
      for (let l = 0; l < G.length; l++) if (G[l].reg === k && PR[l] > 0 && PR[l] < 1){ act = G[l]; k0 = l; } }
    if (!act) return;
    const p = clamp(PR[k0]*1.18), tx = SX + (act.x0 + (act.x1 - act.x0)*p)/s, ty = SY + (act.ly0 + (act.ly1 - act.ly0)*(.35 + .3*Math.sin(t*.05)))/s;
    const coup = Math.floor(t/115); if (coup !== frappe){ frappe = coup; const R = graine(coup);
      const sol = SY + regs[act.reg].y1/s - 3;
      for (let k = 0; k < 5 && parts.length < 280; k++) parts.push({ x: tx, y: ty, vx: (R() - .5)*90, vy: -30 - R()*70, v: 150 + R()*90, z: .6 + R()*1.3, n: t, sol }); }
    const rec = Math.exp(-((t % 115)/26))*4, L = clamp(SW*.24, 52, 120), ax = .42, ay = -.91, bx = tx + ax*(L + rec), by = ty + ay*(L + rec), ex = tx + ax*rec, ey = ty + ay*rec;
    // l'ombre portée du ciseau, longue sous la lumière rasante
    const lo = Math.min(170, L*.55/Math.tan(el)), ox = -Math.cos(az)*lo, oy = -Math.sin(az)*lo;
    ctx.save(); ctx.strokeStyle = "rgba(6,6,8,.3)"; ctx.lineWidth = 5; ctx.lineCap = "round"; ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(bx*.0 + tx + ox, ty + oy); ctx.stroke();
    // la lame, le fût moleté, la tête écrasée par la massette
    const nxp = -ay, nyp = ax, gr = ctx.createLinearGradient(ex - nxp*3, ey - nyp*3, ex + nxp*3, ey + nyp*3);
    gr.addColorStop(0, "#3a3c42"); gr.addColorStop(.45, "#d8dadf"); gr.addColorStop(.6, "#8d9097"); gr.addColorStop(1, "#2a2b30");
    ctx.fillStyle = gr; ctx.beginPath(); ctx.moveTo(ex - nxp*.6, ey - nyp*.6); ctx.lineTo(ex + nxp*.6, ey + nyp*.6);
    ctx.lineTo(ex + ax*12 + nxp*2.8, ey + ay*12 + nyp*2.8); ctx.lineTo(bx + nxp*2.8, by + nyp*2.8); ctx.lineTo(bx - nxp*2.8, by - nyp*2.8); ctx.lineTo(ex + ax*12 - nxp*2.8, ey + ay*12 - nyp*2.8); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = "rgba(20,20,24,.55)"; ctx.lineWidth = .6; ctx.beginPath();
    for (let u = .45; u < .95; u += 2.4/L){ const cx = ex + ax*L*u, cy = ey + ay*L*u; ctx.moveTo(cx - nxp*2.8, cy - nyp*2.8); ctx.lineTo(cx + nxp*2.8, cy + nyp*2.8); } ctx.stroke();
    ctx.fillStyle = "#6c6e75"; ctx.beginPath(); ctx.ellipse(bx, by, 4.6, 2.4, Math.atan2(ay, ax) + Math.PI/2, 0, 7); ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,.5)"; ctx.fillRect(tx - .6, ty - .6, 1.2, 1.2);
    ctx.restore();
  }
  function poussiere(ctx, t){
    const dt = dernier ? Math.min(.05, (t - dernier)/1000) : .016;
    ctx.save();
    parts = parts.filter(p => t - p.n < 7000);
    for (const p of parts){ if (p.y < p.sol){ p.vy += 260*dt; p.x += p.vx*dt; p.y += p.vy*dt; p.vx *= .98; if (p.y >= p.sol){ p.y = p.sol; p.vx = 0; } }
      const age = (t - p.n)/7000; ctx.fillStyle = `rgba(${p.v},${p.v},${p.v + 4},${(.85*(1 - age)).toFixed(3)})`; ctx.fillRect(p.x, p.y, p.z, p.z); }
    ctx.restore();
  }
  function fils(ctx, f){
    const PC = D.pigments;
    V.liens.forEach((L, k) => { const a = groupe(0, L.en), b = groupe(1, L.es), c = groupe(2, L.gr), u = clamp(f*1.6 - k*.25);
      if (u <= 0) return;
      const paires = []; if (a && b) paires.push([a, b, PC[0].v, PC[1].v]); if (b && c) paires.push([b, c, PC[1].v, PC[2].v]);
      paires.forEach(([p, q, c1, c2], m) => { const v = clamp(u*2 - m); if (v <= 0) return;
        const x0 = (p.x0 + p.x1)/2, y0 = p.y1 + 2, x1 = (q.x0 + q.x1)/2, y1 = q.y0 - 2, cx = (x0 + x1)/2 + (x1 - x0)*.15, cy = (y0 + y1)/2;
        const g = ctx.createLinearGradient(x0, y0, x1, y1); g.addColorStop(0, rgb(c1, .95)); g.addColorStop(1, rgb(c2, .95));
        ctx.save(); ctx.globalCompositeOperation = "lighter"; ctx.strokeStyle = g; ctx.lineCap = "round";
        for (const [lw, al] of [[11, .14], [4, .4], [1.5, 1]]){ ctx.globalAlpha = al; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(x0, y0);
          for (let i = 1; i <= 24*v; i++){ const tt = i/24, x = (1 - tt)*(1 - tt)*x0 + 2*(1 - tt)*tt*cx + tt*tt*x1, y = (1 - tt)*(1 - tt)*y0 + 2*(1 - tt)*tt*cy + tt*tt*y1; ctx.lineTo(x, y); } ctx.stroke(); }
        ctx.globalAlpha = .9*v; ctx.fillStyle = rgb(BLANC_PUR); ctx.beginPath(); ctx.arc(x0, y0, 1.6, 0, 7); ctx.fill(); if (v >= 1){ ctx.beginPath(); ctx.arc(x1, y1, 1.6, 0, 7); ctx.fill(); }
        ctx.restore(); }); });
  }
  function dessinerFissure(ctx, f, flot){
    const F = fissure; if (!F) return; const n = Math.floor(F.seg.length*f); if (n < 1) return;
    ctx.save(); ctx.lineCap = "round"; ctx.lineJoin = "round";
    const passe = (col, lw, op) => { ctx.globalCompositeOperation = op; ctx.strokeStyle = col;
      for (let b = 0; b < 5; b++){ ctx.lineWidth = lw(b); ctx.beginPath(); for (let i = 0; i < n; i++){ const g = F.seg[i]; if (Math.min(4, g.l | 0) !== b) continue; ctx.moveTo(g.x0, g.y0); ctx.quadraticCurveTo(g.cx, g.cy, g.x1, g.y1); } ctx.stroke(); } };
    passe("rgba(8,7,6,.92)", b => b + 1.8, "source-over");
    passe(`rgba(255,170,70,${(.13 + .08*flot).toFixed(3)})`, b => (b + 1)*2.6 + 3, "lighter");
    passe(`rgba(255,200,110,${(.05 + .06*flot).toFixed(3)})`, b => (b + 1)*7 + 8, "lighter");
    passe("rgba(255,226,160,.95)", b => .5 + b*.55, "lighter");
    ctx.restore();
  }
  function frame(ctx, t){
    if (gen){ const t0 = performance.now(); while (performance.now() - t0 < 9){ if (gen.next().done){ gen = null; pret = true; stale = true; break; } } }
    if (pret){ avancer(t); if (tSeuil !== null && !fissure) fendre(); travailler(gen ? 3 : 9); }
    ctx.globalCompositeOperation = "source-over"; ctx.globalAlpha = 1;
    ctx.fillStyle = rgb(FOND); ctx.fillRect(0, 0, W, H);
    if (mur) ctx.drawImage(mur, 0, 0, W, H);
    const lc = Math.cos(az), ls = Math.sin(az), tg = Math.tan(el);
    const halo = ctx.createRadialGradient(SX + SW/2 + lc*SW*.55, SY + SH/2 + ls*SH*.4, 0, SX + SW/2 + lc*SW*.55, SY + SH/2 + ls*SH*.4, Math.max(W, H)*.85);
    halo.addColorStop(0, "rgba(205,203,210,.10)"); halo.addColorStop(1, "rgba(205,203,210,0)"); ctx.fillStyle = halo; ctx.fillRect(0, 0, W, H);
    const apparu = tPret < 0 ? 0 : lisse((t - tPret)/700);
    const ts = tSeuil === null ? -1 : t - tSeuil, eclat = ts < 0 ? 0 : lisse(ts/1500), fl = ts < 0 ? 0 : lisse((ts - 2800)/3400), flot = ts < 0 ? 0 : lisse((ts - 4300)/2600);
    if (ombre && apparu > 0){ const off = clamp(3.2/tg, 7, 24); ctx.globalAlpha = .9*apparu;
      ctx.drawImage(ombre.cv, SX - ombre.m - lc*off, SY - ombre.m - ls*off, SW + 2*ombre.m, SH + 2*ombre.m); ctx.globalAlpha = 1; }
    if (cvS && apparu > 0){
      ctx.globalAlpha = apparu; ctx.imageSmoothingEnabled = true; ctx.drawImage(cvS, SX, SY, SW, SH);
      if (eclat > 0){ ctx.globalCompositeOperation = "lighter"; ctx.globalAlpha = .26*eclat - .08*flot; ctx.drawImage(cvS, SX, SY, SW, SH); }
      ctx.globalCompositeOperation = "source-over"; ctx.globalAlpha = 1;
      if (eclat > 0) for (let k = 0; k < 4; k++) if (mots[k]) briller(ctx, k, mots[k].map((m, i) => i), .3*eclat);
      if (lueur && t - lueur.t < 2600){ const e = Math.exp(-(t - lueur.t)/900)*(.82 + .18*Math.sin((t - lueur.t)/90))*1.3; lueur.L.forEach(([k, L], j) => briller(ctx, k, L, (j ? .55 : 1)*e)); }
      if (ts >= 0) fils(ctx, clamp((ts - 900)/2400));
      if (ts >= 0) dessinerFissure(ctx, fl, flot);
      ciseau(ctx, t); poussiere(ctx, t);
    }
    if (flot > 0 && fissure){ const F = fissure; ctx.save(); ctx.globalCompositeOperation = "lighter";
      const r = ctx.createRadialGradient(F.mx, F.my, 0, F.mx, F.my, Math.max(W, H)*.95);
      r.addColorStop(0, `rgba(255,196,96,${(.42*flot).toFixed(3)})`); r.addColorStop(.35, `rgba(220,150,60,${(.2*flot).toFixed(3)})`); r.addColorStop(1, "rgba(160,100,40,0)");
      ctx.fillStyle = r; ctx.fillRect(0, 0, W, H);
      for (const q of F.rais){ const L = Math.max(W, H)*1.2, a1 = q.a - q.l/2, a2 = q.a + q.l/2, g = ctx.createRadialGradient(q.x, q.y, 0, q.x, q.y, L);
        g.addColorStop(0, `rgba(255,214,140,${(.1*flot).toFixed(3)})`); g.addColorStop(1, "rgba(255,200,120,0)"); ctx.fillStyle = g;
        ctx.beginPath(); ctx.moveTo(q.x, q.y); ctx.lineTo(q.x + Math.cos(a1)*L, q.y + Math.sin(a1)*L); ctx.lineTo(q.x + Math.cos(a2)*L, q.y + Math.sin(a2)*L); ctx.closePath(); ctx.fill(); }
      ctx.restore(); }
    // la ligne mono, sous la stèle
    ctx.fillStyle = rgb(flot > 0 ? [235, 205, 150] : GRIS_CLAIR, .62); ctx.font = "9px ui-monospace, Consolas, monospace"; ctx.textAlign = "center";
    const deg = Math.round(((az*180/Math.PI) % 360 + 360) % 360), ldeg = Math.round(el*180/Math.PI);
    const txt = !pret ? "LA PIERRE SE TAILLE…" : fl > 0 && fissure ? `GRIFFITH · ${Math.floor(fissure.seg.length*fl)} LIENS ROMPUS · « ${V.gr} »` : `DISTANCE SIGNÉE · TAILLE EN V · LUMIÈRE ${deg}° / ${ldeg}°`;
    ctx.fillText(txt, W/2, Math.min(H - 4, SY + SH + 13)); ctx.textAlign = "left";
    passeGrain(ctx, W, H, t, .04);
    dernier = t;
  }

  /* ---------- les gestes ---------- */
  function ligne(n){ if (n === 0) return "stèle vierge · chaîne " + D.chaine + " jours"; if (n <= 4) return PRI[n - 1].nom + " · " + D.langues[n - 1].toLowerCase() + " · " + D.pigments[n - 1].nom.toLowerCase() + " · " + n + " sur 4";
    return "la pierre parle · " + (D.chaine + 1) + " jours"; }
  function relancer(){ variante++; seed += 101; tReg = [null, null, null, null]; tSeuil = null; fissure = null; parts = []; lueur = null; etape = 0;
    pret = false; tPret = -1; plein = null; vite = []; gen = construire(); M.bouton = libelleGeste(0); M.ligne = ligne(0); }
  function geste(){
    const t = maintenant();
    if (etape >= 5){ relancer(); return; }
    if (t - dernierGeste < 900) return; dernierGeste = t;
    if (etape < 4) tReg[etape] = t; else { tSeuil = t; fissure = null; }
    etape++; M.bouton = libelleGeste(etape); M.ligne = ligne(etape);
  }
  M.aller = n => { n = clamp(n | 0, 0, 5); const t = maintenant();
    for (let k = 0; k < 4; k++) tReg[k] = k < n ? t - 1e7 : null;
    tSeuil = n >= 5 ? t - 1e7 : null; fissure = null; parts = []; etape = n; stale = true; M.bouton = libelleGeste(n); M.ligne = ligne(n); };
  M.taille = (ww, hh, dpr) => {
    const k = ww + "x" + hh + "x" + dpr; if (k === cle) return; cle = k; W = ww; H = hh; DPR = dpr || 1;
    const haut = Math.max(40, H*.07), bas = Math.max(84, H*.11), ah = H - haut - bas;
    SH = ah; SW = Math.min(W - 28, SH*.8); SX = (W - SW)/2; SY = haut;
    s = Math.min(Math.max(1, Math.min(DPR, 1.5)), Math.sqrt(460000/(SW*SH)));
    pret = false; tPret = -1; plein = null; vite = []; fissure = null; stale = true; gen = construire();
  };
  M.frame = frame; M.geste = geste;
  M.tap = (x, y) => {
    for (let k = 0; k < 4; k++){ if (tReg[k] === null || !mots[k]) continue;
      for (let i = 0; i < mots[k].length; i++){ const m = mots[k][i]; if (!m) continue; const b = enCSS(m); if (x < b.x0 - 5 || x > b.x1 + 5 || y < b.y0 - 6 || y > b.y1 + 6) continue;
        if (k === 3){ lueur = { t: maintenant(), L: [[3, [0, 1, 2, 3]]] }; M.ligne = "grand livre · " + livre[1] + " · débit " + livre[2] + " = crédit " + livre[3]; return; }
        const cle2 = ["en", "es", "gr"][k], L = V.liens.find(l => l[cle2].includes(i));
        if (!L){ lueur = { t: maintenant(), L: [[k, [i]]] }; M.ligne = m.t + " · " + D.langues[k].toLowerCase(); return; }
        lueur = { t: maintenant(), L: [[k, L[cle2]], ...["en", "es", "gr"].map((c, j) => [j, L[c]]).filter(([j]) => j !== k && tReg[j] !== null)] };
        const dire = j => L[["en", "es", "gr"][j]].map(q => mots[j][q] && mots[j][q].t).join(" ");
        M.ligne = [0, 1, 2].filter(j => L[["en", "es", "gr"][j]].length).map(dire).join(" ↔ "); return; } }
    if (x > SX && x < SX + SW && y > SY && y < SY + SH) M.ligne = "« " + V.gr + " » · " + V.src.toLowerCase();
  };
  M.glisse = (dx, dy) => { az += dx*.012; el = clamp(el - dy*.004, .14, .8); if (pret) demanderPlein(); };
  return M;
}
window.ETUDE = etude_pierre;
