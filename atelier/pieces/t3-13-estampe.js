/* ======================= Tour 3, pièce 13 : L'ESTAMPE (etude_estampe3) ======================= */
/* Ce qu'on voit : une estampe japonaise (shin-hanga, Hasui et Hiroshige) sur un washi gris : une grande vague qui se lève à gauche,
   la houle en rangées jusqu'à l'horizon, deux barques, une montagne enneigée, le soleil de l'aube, un cartouche vertical à
   quatre colonnes (les priorités) et la signature. Au repos, seul le keyban est imprimé : le trait noir, net, sur le gris.
   La loi : la houle trochoïdale de Gerstner (Theorie der Wellen, Prague, 1802). Chaque rangée de mer, à sa distance z, est la
   coupe d'une somme de cinq ondes : x = x₀ − Σ Q A sin θ, h = Σ A cos θ, θ = k·x₀ − ωt, ω² = gk (eaux profondes), vue depuis
   9 m ; le jacobien J = ∂x/∂x₀ = 1 − Σ QkA cos θ donne l'écume là où il passe sous 0,72. La grande vague : une onde de Gerstner
   seule sous une enveloppe (dos long, front court), x = a − (Q/k) sin θ + cisaillement, dont le dos reste rond ; sa lèvre prolonge
   l'orbite circulaire de la particule de crête (rayon qui décroît en e^(−kd) avec la profondeur : une spirale logarithmique).
   Au seuil, la hauteur, la raideur et le rayon de l'orbite montent : la lèvre passe de la crochette à l'enroulement complet.
   La main : une planche par couleur, en aplats nets aux bords francs ; le bois n'est qu'une texture fine dans l'aplat (fil,
   cernes), le bokashi est un dégradé propre ; le keyban est un trait plein, effilé, large selon l'angle de la plume. Aucun outil.
   L'usage : « Ta journée ». Chaque priorité imprime UNE planche : la feuille se soulève par le bas, on voit sous elle le bois
   encré de la couleur nouvelle et l'ombre de la feuille ; elle retombe du haut vers le bas et la couleur est prise. 990 : le
   bleu de Prusse de la mer et de la vague. CUMBRE : le rose de l'aube, le soleil, son reflet. Lecture : l'ocre de la montagne,
   des nuages, des barques. LE CLOSING : l'indigo des creux et le blanc gofun de l'écume. Le nom s'imprime en noir dans sa
   colonne, son sceau rouge tombe. Seuil (Boucler) : la houle s'anime, la vague se lève et s'enroule, l'écume sort en griffes,
   les embruns retombent ; une dernière feuille prend le bokashi indigo du ciel et de la mer ; signature et sceau 波.
   Encore : une autre mer. Toucher la mer : une onde court (vitesse de groupe ω/2k). Glisser : la dernière planche sort du
   kentō, un ressort la ramène. App : etat(liste, boucle), faire(i), retirer(i), boucler(), faits(), boucle(), aller(n).
   Le budget : bois, sceaux, papier préparés par tranches de 6 ms ; une planche n'est retracée que si la mer bouge, une par image
   au plus (le ciel du keyban est recopié) ; la composition en deux pas ; la feuille levée = 40 bandes copiées. */

const etude_estampe3_DONNEES = Object.assign({
  planches: [
    { couleur: "bleu de Prusse", encre: [26, 66, 146], sceau: "英" },
    { couleur: "rose de l'aube", encre: [228, 84, 104], sceau: "西" },
    { couleur: "ocre jaune", encre: [222, 154, 46], sceau: "読" },
    { couleur: "indigo et gofun", encre: [28, 40, 86], sceau: "金" }
  ],
  keyban: [22, 20, 24], bokashi: [18, 30, 74], gofun: [251, 250, 245], vermillon: [198, 38, 30],
  papier: [214, 212, 206], table: [24, 25, 29], bois: [104, 84, 64], artiste: "THOMAS", sceauArtiste: "波"
}, JOURNEE);

function etude_estampe3(){
  const { sin, cos, min, max, PI, ceil, abs, floor, round, pow, sqrt, hypot, log, exp, atan2 } = Math;
  const D = etude_estampe3_DONNEES, PR = D.priorites, PC = D.planches;
  const SERIF = "Georgia, 'Times New Roman', serif", MONO = "ui-monospace, Menlo, Consolas, monospace",
        CJK = "'Noto Serif CJK JP','Hiragino Mincho ProN','Yu Mincho','Noto Serif CJK SC','Songti SC',serif";
  const M = { titre: "L'ESTAMPE", dprMax: 1.5 };
  const TAU = PI*2, NR = 11, HC = 9, ZN = 14, JC = .55, JW = .72, NIB = -1.05;
  // la feuille : se lève, reste, retombe (ms) ; le sceau ; le bokashi du seuil part à 3,5 s
  const T_LEVE = 850, T_TIENT = 320, T_POSE = 1150, TP = T_LEVE + T_TIENT + T_POSE, T_SC = 480, T_BK = 3500;
  const CLES = ["K", "KM", "B", "R", "O", "G", "W", "BK"];
  const LJ = { B: 0, R: 1, O: 2, G: 3, W: 3, BK: 4, K: 5, KM: 5 };
  const PLJ = [["B"], ["R"], ["O"], ["G", "W"], ["BK"]];
  const MODES = [["B", "multiply", 1], ["R", "multiply", 1], ["O", "multiply", 1], ["G", "multiply", 1],
                 ["BK", "multiply", 1], ["W", "source-over", .97], ["KM", "multiply", 1], ["K", "multiply", 1]];

  let W = 390, H = 760, DPR = 1.5, seed = 1802, dernier = 0, dernierGeste = -1e9, simT = 0, gv = 0, geoOk = false;
  let SX, SY, SW, SH, IX, IY, IW, IH, PAD = 22, yh, F, STEP, GX, NG, CART, LS, KK = 1;
  let COMP = [], MT = null, MTc = null, NUA = [], BAR = [], SOL = null, nb, hs, VG = [], GR = [];
  let ROWS = [], Y = [], JG = [], E = [], EA, YB, TMP, XG = null, S = .9, rise = 0, griffes = 0, ecume = 0;
  const fait = [null, null, null, null];
  let tS = null;
  const REG = [0, 1, 2, 3, 4, 5].map(() => ({ ox: 0, oy: 0, vx: 0, vy: 0, bx: 0, by: 0 }));
  let embruns = null, ondes = [], temp = { txt: "", fin: 0 };
  let L = {}, TEX = {}, papier = null, genA = null, SCEAUX = [], CP = null, CPb = null, CPs = null, KS = null;
  let job = null, signeCP = "", sale = true, nCP = 0, gvV = 0, vagueSale = true;
  const PUITS = document.createElement("canvas").getContext("2d");

  /* ———————————————— le bois, les sceaux, le papier (préparés par tranches) ———————————————— */
  function bruitP(s, Px, Py){
    const R = graine(s), v = Array.from({ length: Px*Py }, R);
    return (x, y) => {
      const i = floor(x), j = floor(y), fx = x - i, fy = y - j, u = fx*fx*(3 - 2*fx), w = fy*fy*(3 - 2*fy);
      const I = ((i % Px) + Px) % Px, J = ((j % Py) + Py) % Py, I1 = (I + 1) % Px, J1 = (J + 1) % Py;
      const a = v[J*Px + I], b = v[J*Px + I1], c = v[J1*Px + I], d = v[J1*Px + I1];
      return a + (b - a)*u + (c - a)*w + (a - b - c + d)*u*w;
    };
  }
  // encre, graine, [plein, cernes, cernes par tuile, fil] : le bois ne fait qu'une texture fine dans l'aplat
  const ENC = {
    K: [D.keyban, 11, [1, .03, 9, .015]],
    KM: [D.keyban, 13, [1, .03, 9, .015]],
    B: [PC[0].encre, 21, [1, .07, 8, .018]],
    R: [PC[1].encre, 31, [1, .07, 7, .018]],
    O: [PC[2].encre, 41, [1, .08, 10, .02]],
    G: [PC[3].encre, 51, [1, .07, 8, .018]],
    W: [D.gofun, 61, [1, .06, 9, .03]],
    BK: [D.bokashi, 71, [1, .07, 6, .018]],
    BOIS: [D.bois, 81, [1, .0, 24, .0]]
  };
  function* texBois(k){
    const [col, sd, [pl, ve, nv, fil]] = ENC[k], T = 256, cv = document.createElement("canvas");
    cv.width = cv.height = T;
    const c = cv.getContext("2d"), im = c.createImageData(T, T), d = im.data, R = graine(sd);
    const w1 = bruitP(sd + 1, 4, 4), w2 = bruitP(sd + 2, 16, 16), w3 = bruitP(sd + 3, 64, 6);
    const bois = k === "BOIS";
    for (let y = 0, i = 0; y < T; y++){
      for (let x = 0; x < T; x++, i += 4){
        const u = x/T, v = y/T;
        // les cernes : des lignes fines le long du fil, ondulées par le noeud
        const cerne = pow(.5 + .5*cos((v*nv + .7*w1(u*4, v*4) + .12*w2(u*16, v*16))*TAU), 10);
        const fibre = w3(u*64, v*6) - .5;
        let a = pl - ve*cerne - fil*fibre*2 + (R() - .5)*.012;
        let f = 1;
        if (bois){ f = .9 + .16*fibre - .14*cerne + (R() - .5)*.04; a = 1; }
        d[i] = col[0]*f; d[i + 1] = col[1]*f; d[i + 2] = col[2]*f; d[i + 3] = clamp(a)*255;
      }
      if ((y & 31) === 31) yield;
    }
    c.putImageData(im, 0, 0);
    TEX[k] = cv;
  }
  function* preparer(){
    for (const k of [...CLES, "BOIS"]) if (!TEX[k]) yield* texBois(k);
    if (!SCEAUX.length){
      for (let j = 0; j < 5; j++){
        SCEAUX.push(j < 4 ? sceau(PC[j].sceau, CART.sealS, 300 + j + seed) : sceau(D.sceauArtiste, CART.colW*1.1, 999 + seed));
        yield;
      }
    }
    if (!papier) yield* peindrePapier();
  }
  function sceau(car, taille, sd){
    const s = ceil(taille*DPR), cv = document.createElement("canvas");
    cv.width = cv.height = s;
    const c = cv.getContext("2d"), R = graine(sd);
    c.fillStyle = rgb(D.vermillon);
    c.beginPath();
    [[.04, .05], [.5, .03], [.96, .04], [.97, .5], [.96, .96], [.5, .97], [.04, .96], [.03, .5]].forEach((p, k) => {
      const x = (p[0] + (R() - .5)*.02)*s, y = (p[1] + (R() - .5)*.02)*s;
      k ? c.lineTo(x, y) : c.moveTo(x, y);
    });
    c.fill();
    op(c, "destination-out");
    c.strokeStyle = c.fillStyle = "#000";
    c.lineWidth = s*.05;
    c.strokeRect(s*.12, s*.12, s*.76, s*.76);
    c.font = `700 ${s*.6}px ${CJK}`;
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText(car, s/2, s*.53);
    for (let k = 0; k < 18; k++){
      c.globalAlpha = .3 + .5*R();
      c.beginPath();
      c.arc(R()*s, R()*s, R()*s*.025 + .3, 0, TAU);
      c.fill();
    }
    return cv;
  }
  /* le washi : pâte grise, fine, bords frangés, quelques fibres de kōzo */
  function* peindrePapier(){
    const m = 14, pw = CP.width, ph = CP.height, cv = document.createElement("canvas");
    cv.width = pw; cv.height = ph;
    const c = cv.getContext("2d", { willReadFrequently: true }), im = c.createImageData(pw, ph), d = im.data, R = graine(seed*3 + 1);
    const n1 = bruit2(seed + 11), n2 = bruit2(seed + 12), n3 = bruit2(seed + 13), P = D.papier;
    const x0 = m*DPR, y0 = m*DPR, x1 = (m + SW)*DPR, y1 = (m + SH)*DPR;
    for (let y = 0; y < ph; y++){
      for (let x = 0; x < pw; x++){
        const de = min(x - x0, x1 - x, y - y0, y1 - y)/DPR;
        if (de < -4) continue;
        const X = x/DPR, Yp = y/DPR, bord = de + 3.2*(n3(X*.5, Yp*.5) - .5), a = clamp(bord/1.1);
        if (a <= 0) continue;
        const v = (n1(X/50, Yp/50) - .5)*7 + (n2(X/5, Yp/5) - .5)*4 + (R() - .5)*4 + (1 - clamp(bord/5))*5, i = (y*pw + x)*4;
        d[i] = P[0] + v + 1; d[i + 1] = P[1] + v; d[i + 2] = P[2] + v - 2; d[i + 3] = a*255;
      }
      if ((y & 15) === 15) yield;
    }
    c.putImageData(im, 0, 0);
    yield;
    const fin = document.createElement("canvas");
    fin.width = pw; fin.height = ph;
    const f = fin.getContext("2d");
    for (let k = 8; k >= 1; k--){
      f.fillStyle = "rgba(0,0,0,.07)";
      const e = k*1.3*DPR;
      f.fillRect(x0 - e*.6, y0 - e*.3 + 4*DPR, x1 - x0 + e*1.2, y1 - y0 + e*.9);
    }
    f.drawImage(cv, 0, 0);
    yield;
    f.setTransform(DPR, 0, 0, DPR, m*DPR, m*DPR);
    f.lineCap = "round";
    const N = SW*SH/90;
    for (const [col, al, lw, part] of [[255, .2, .4, .45], [255, .12, .8, .3], [120, .08, .45, .1]]){
      f.beginPath();
      f.strokeStyle = `rgba(${col},${col - 2},${col - 8},${al})`;
      f.lineWidth = lw;
      for (let k = 0; k < N*part; k++){
        const x = R()*SW, y = R()*SH, l = 8 + 40*R()*R(), a = R()*6.3, cu = (R() - .5)*l*.5;
        const ex = x + cos(a)*l, ey = y + sin(a)*l;
        f.moveTo(x, y);
        f.quadraticCurveTo((x + ex)/2 - sin(a)*cu, (y + ey)/2 + cos(a)*cu, ex, ey);
      }
      f.stroke();
      yield;
    }
    papier = { cv: fin, m };
    sale = true;
  }

  /* ———————————————— la composition (une graine = une mer) ———————————————— */
  function construire(){
    const R = graine(seed);
    nb = bruit1(seed + 3); MTc = null; geoOk = false;
    const h0 = (seed*.618) % 1;
    hs = (i, s) => { const v = sin(i*127.1 + s*311.7 + h0*91.3)*43758.5453; return v - floor(v); };
    // cinq ondes : longueur (m), amplitude (m), direction, part de la raideur
    COMP = [[48, 1.35, .22, .36], [27, .78, -.38, .26], [15, .42, .55, .18], [8.2, .2, -.8, .12], [4.6, .1, .14, .08]].map(([lam, A, da, p]) => {
      const k = TAU/lam, d = da + (R() - .5)*.2;
      return { k, A: A*(.85 + .3*R()), dx: -cos(d), dz: sin(d), w: sqrt(9.81*k), ph: R()*TAU, p };
    });
    MT = { xp: .63 + .05*R(), hl: .19 + .03*R(), hr: .2 + .04*R(), ph: R()*9, cr: .95 + .03*R() };
    SOL = { u: .44 + .07*R(), v: .5 + .08*R() };
    NUA = [
      { u0: .3, u1: .78 + .06*R(), v: .08 + .03*R(), ph: R()*9, haut: true },
      { u0: MT.xp - .3 - .04*R(), u1: MT.xp + .1 + .05*R(), v: .16 + .06*R(), ph: R()*9 }
    ];
    BAR = [{ i: 6, u: .6 + .07*R(), L: 7.5 }, { i: 7, u: .84 + .05*R(), L: 6.5 }];
    // les deux vagues : centre, dos, front, longueur d'onde (en largeurs d'image), sommet repos → seuil, raideur, cisaillement, lèvre
    VG = [
      { c: .2 + .04*R(), sl: .8, sr: .42, lam: 1.9, top: [.6, .3], s: [.3, .45], le: [.03, .3], R0: [.04, .29], sw: [.45, 1.45], ph: R()*6, gr: 7 },
      { c: .88 + .04*R(), sl: .4, sr: .26, lam: 1.1, top: [.86, .74], s: [.3, .45], le: [.02, .12], R0: [.015, .1], sw: [.4, 1.35], ph: R()*6, gr: 4 }
    ];
    GR = Array.from({ length: 16 }, () => [R(), R(), R(), R()]);
    REG.forEach(q => { q.bx = (R() - .5)*.9; q.by = (R() - .5)*.9; });
    SCEAUX = []; papier = null; embruns = null; job = null; KS = null;
    genA = preparer();
    Object.values(L).forEach(l => { l.pat = null; l.gv = -1; });
    if (ROWS.length) allouerVagues();
    sale = true;
  }
  function allouerVagues(){
    for (const V of VG){
      const a0 = IW*(V.c - 2.2*V.sl), a1 = IW*(V.c + 2.6*V.sr), n = ceil((a1 - a0)/2) + 1;
      V.a0 = a0;
      V.g = { n, xs: new Float32Array(n), ys: new Float32Array(n), hh: new Float32Array(n), J: new Float32Array(n), im: 0,
              lip: null, creux: null, griffes: [] };
    }
  }
  function layout(){
    MTc = null; geoOk = false;
    const mT = clamp(H*.075, 10, 60), mB = clamp(H*.1, 12, 84);
    let sw = W - 24, sh = H - mT - mB;
    if (sw > sh*.8) sw = sh*.8;
    SW = sw; SH = sh; SX = (W - sw)/2; SY = mT;
    const mx = SW*.06, mt = SW*.06;
    IX = SX + mx; IY = SY + mt; IW = SW - 2*mx; IH = SH - mt - (SW*.06 + 24);
    KK = clamp(IW/330, .75, 1.6);
    yh = IH*.44;
    F = (IH*.97 - yh)*ZN/HC; STEP = max(2.6, IW/130); GX = max(2, IW/170); NG = floor(IW/GX) + 2;
    LS = min(DPR, 1.25);
    const fs = clamp(IH*.021, 7.5, 11.5), lh = fs*1.24, colW = fs*1.95, pc = fs*.7, sealS = colW*.76, swt = colW*.4;
    CART = { fs, lh, colW, pc, sealS, swt, x0: IW*.045, y0: IW*.045 };
    CART.x1 = CART.x0 + 4*colW + 2*pc;
    CART.ny = CART.y0 + pc + swt + fs*.5 + lh*.85;
    CART.y1 = CART.ny + 9.4*lh + sealS + pc*1.2;
    ROWS = []; Y = []; JG = []; E = [];
    for (let i = 0; i < NR; i++){
      const n = ceil(IW*1.16/STEP) + 1;
      ROWS.push({ z: zRow(i), n, xs: new Float32Array(n), ys: new Float32Array(n), J: new Float32Array(n) });
      Y.push(new Float32Array(NG)); JG.push(new Float32Array(NG)); E.push(new Float32Array(NG));
    }
    EA = new Float32Array(NG); YB = new Float32Array(NG); TMP = new Float32Array(NG);
    XG = Array.from({ length: NG }, (_, g) => g*GX);
    allouerVagues();
    for (const k of CLES){
      const cv = (L[k] && L[k].cv) || document.createElement("canvas");
      cv.width = ceil((IW + 2*PAD)*LS); cv.height = ceil((IH + 2*PAD)*LS);
      const ls = k === "K" || k === "KM" ? LS : 1;
      cv.width = ceil((IW + 2*PAD)*ls); cv.height = ceil((IH + 2*PAD)*ls);
      L[k] = { cv, c: cv.getContext("2d"), pat: null, gv: -1, ls };
    }
    for (const k of [0, 1, 2]){
      const cv = [CP, CPb, CPs][k] || document.createElement("canvas");
      cv.width = ceil((SW + 28)*DPR); cv.height = ceil((SH + 28)*DPR);
      if (k === 0) CP = cv; else if (k === 1) CPb = cv; else CPs = cv;
    }
    job = null; KS = null;
    papier = null; SCEAUX = []; embruns = null;
    genA = preparer();
    sale = true;
  }
  const zRow = i => i === 0 ? 700 : 260*pow(ZN/260, (i - 1)/(NR - 2));
  function motif(k){
    const Lk = L[k];
    if (Lk.pat) return Lk.pat;
    const e = ENC[k];
    Lk.pat = Lk.c.createPattern(TEX[k], "repeat");
    if (Lk.ls !== 1) Lk.pat.setTransform(new DOMMatrix().scaleSelf(1/Lk.ls, 1/Lk.ls));
    void e;
    return Lk.pat;
  }

  /* ———————————————— la loi : les rangées de Gerstner ———————————————— */
  function reech(xs, ys, J, n, out, oj, bas){
    out.fill(bas ? -1e9 : 1e9);
    for (let s = 0; s < n - 1; s++){
      let xa = xs[s], xb = xs[s + 1], ya = ys[s], yb = ys[s + 1], ja = J ? J[s] : 1, jb = J ? J[s + 1] : 1;
      if (xa > xb){ [xa, xb] = [xb, xa]; [ya, yb] = [yb, ya]; [ja, jb] = [jb, ja]; }
      for (let g = max(0, ceil(xa/GX)), g1 = min(NG - 1, floor(xb/GX)); g <= g1; g++){
        const u = (g*GX - xa)/((xb - xa) || 1), y = ya + (yb - ya)*u;
        if (bas ? y > out[g] : y < out[g]){
          out[g] = y;
          if (oj) oj[g] = ja + (jb - ja)*u;
        }
      }
    }
  }
  function calc(t){
    const n = COMP.length;
    gv++;
    let nE = 0, nT = 0;
    for (let i = 0; i < NR; i++){
      const r = ROWS[i], z = r.z, sc = F/z;
      for (let s = 0; s < r.n; s++){
        const X = (-.08*IW + s*STEP - IW/2)/sc;
        let dX = 0, h = 0, J = 1;
        for (let j = 0; j < n; j++){
          const c = COMP[j], th = c.k*(X*c.dx + z*c.dz) - c.w*simT + c.ph, Q = S*c.p/(c.k*c.A), ct = cos(th);
          dX -= Q*c.A*c.dx*sin(th);
          h += c.A*ct;
          J -= Q*c.k*c.A*c.dx*c.dx*ct;
        }
        // le doigt : un paquet d'ondes qui court à la vitesse de groupe
        for (const o of ondes){
          if (o.i !== i) continue;
          const age = max(0, t - o.t0)/1000*o.acc;
          for (const sg of [-1, 1]){
            const u = X - o.X - sg*o.cg*age;
            h += o.A*o.f*exp(-age/2.6 - (u*u)/(o.sig*o.sig))*cos(o.k*(X - o.X - sg*o.cp*age));
          }
        }
        r.xs[s] = IW/2 + (X + dX)*sc;
        r.ys[s] = yh + (HC - h)*sc;
        r.J[s] = J;
      }
      reech(r.xs, r.ys, r.J, r.n, Y[i], JG[i]);
    }
    YB.fill(1e9);
    if (vagueSale){ gvV++; vagueSale = false; }
    for (const V of VG){
      if (V.gvV !== gvV){ calcVague(V); V.gvV = gvV; }
      reech(V.g.xs, V.g.ys, null, V.g.n, TMP, null, 0);
      for (let g = 0; g < NG; g++) if (TMP[g] < YB[g]) YB[g] = TMP[g];
    }
    for (let g = 0; g < NG; g++){
      let e = min(YB[g], IH + 4);
      for (let i = NR - 1; i >= 0; i--){
        E[i][g] = e;
        if (Y[i][g] < e - .3 && i){ nT++; if (JG[i][g] < JC) nE++; }
        e = min(e, Y[i][g]);
      }
      EA[g] = e;
    }
    ecume = nT ? nE/nT : 0;
  }

  /* ———————————————— la grande vague : Gerstner sous enveloppe, lèvre en spirale d'orbite ———————————————— */
  function calcVague(V){
    const g = V.g, r = rise, mixv = p => p[0] + (p[1] - p[0])*r;
    const top = IH*mixv(V.top), A = IH - top, s0 = mixv(V.s), lean = IW*mixv(V.le);
    const c = IW*V.c, k = TAU/(IW*V.lam), sl = IW*V.sl, sr = IW*V.sr;
    const ph = .06*sin(simT*.8 + V.ph);
    let im = 0;
    for (let s = 0; s < g.n; s++){
      const a = V.a0 + s*2, d = a - c, sg = d < 0 ? sl : sr, env = exp(-(d/sg)*(d/sg)), th = k*d + ph;
      const hh = env*(cos(th) + .15)/1.15, sx = s0*env;
      g.xs[s] = a - sx/k*sin(th) + lean*pow(max(0, hh), 4);
      g.ys[s] = IH - A*hh;
      g.hh[s] = hh;
      if (g.ys[s] < g.ys[im]) im = s;
    }
    for (let s = 0; s < g.n; s++){
      const p = max(0, s - 1), q = min(g.n - 1, s + 1);
      g.J[s] = (g.xs[q] - g.xs[p])/((q - p)*2);
    }
    g.im = im; g.A = A; g.top = top;
    // la lèvre : l'orbite de la particule de crête, rayon R0 e^(−b φ), qui part dans le sens du dos
    const R0 = IW*mixv(V.R0), sweep = PI*mixv(V.sw), b = .22, NL = 48;
    let tx = g.xs[im - 1] - g.xs[max(0, im - 6)], ty = g.ys[im - 1] - g.ys[max(0, im - 6)];
    const tl = hypot(tx, ty) || 1;
    tx /= tl; ty /= tl;
    const Px = g.xs[im], Py = g.ys[im], Cx = Px - ty*R0, Cy = Py + tx*R0, base = atan2(Py - Cy, Px - Cx);
    const lip = { ox: [], oy: [], ix: [], iy: [], mx: [], my: [], ang: [], rr: [], th: [], n: NL + 1, R0, Cx, Cy };
    for (let q = 0; q <= NL; q++){
      const u = q/NL, phi = sweep*u, rr = R0*exp(-b*phi), thk = R0*.5*pow(1 - .86*u, 1.2), a = base + phi, ca = cos(a), sa = sin(a);
      lip.ox.push(Cx + rr*ca); lip.oy.push(Cy + rr*sa);
      lip.ix.push(Cx + (rr - thk)*ca); lip.iy.push(Cy + (rr - thk)*sa);
      lip.mx.push(Cx + (rr - thk*.45)*ca); lip.my.push(Cy + (rr - thk*.45)*sa);
      lip.ang.push(a); lip.rr.push(rr); lip.th.push(thk);
    }
    g.lip = lip;
    // le creux : sous la lèvre, jusqu'au front de la vague
    const qe = round(NL*.72), ye = lip.iy[qe];
    let sF = im;
    while (sF < g.n - 1 && g.ys[sF] < ye) sF++;
    const cx = [Px], cy = [Py];
    for (let q = 0; q <= qe; q++){ cx.push(lip.ix[q]); cy.push(lip.iy[q]); }
    for (let s = sF; s > im; s--){ cx.push(g.xs[s]); cy.push(g.ys[s]); }
    g.creux = { x: cx, y: cy };
    // les griffes : des mains d'écume au bord de la lèvre, trois doigts qui se recourbent vers l'avant
    g.griffes = [];
    if (griffes > .01){
      for (let m = 0; m < V.gr; m++){
        const G = GR[m], q = round(NL*(.42 + .54*m/(V.gr - 1))), a = lip.ang[q];
        const nx = cos(a), ny = sin(a), fx = -sin(a), fy = cos(a);
        const len = R0*(.13 + .08*G[0])*griffes, w0 = R0*(.075 + .025*G[1])*(.4 + .6*griffes);
        for (const [rot, fl] of [[-.55, .7], [0, 1], [.55, .78]]){
          const ro = .55 + rot + (G[2] - .5)*.25, dx = nx*cos(ro) + fx*sin(ro), dy = ny*cos(ro) + fy*sin(ro);
          const X = [], Yy = [], l = len*fl;
          for (let u = 0; u <= 8; u++){
            const v = u/8, hk = v*v*1.4;
            X.push(lip.ox[q] + l*(dx*v + fx*hk)); Yy.push(lip.oy[q] + l*(dy*v + fy*hk));
          }
          g.griffes.push({ X, Y: Yy, w0: w0*(fl < 1 ? .8 : 1) });
        }
      }
    }
  }

  /* ———————————————— formes fixes : montagne, nuages, barques ———————————————— */
  function mont(){
    if (MTc) return MTc;
    const xp = IW*MT.xp, Hm = min(IH*.13, IW*.22), X = [], Yy = [], SN = [];
    for (let x = xp - IW*MT.hl; x <= xp + IW*MT.hr; x += 2){
      const dd = (x - xp)/(IW*(x < xp ? MT.hl : MT.hr)), f = min(MT.cr, pow(1 - abs(dd), 1.5))/MT.cr;
      X.push(x);
      Yy.push(yh - Hm*f);
      SN.push(yh - Hm*(.62 + .09*sin(x*.31 + MT.ph) + .07*(((x*.14 + MT.ph) % 1 + 1) % 1)));
    }
    return (MTc = { X, Y: Yy, SN, xp, Hm });
  }
  function montPath(c, m){
    c.moveTo(m.X[0], yh + 3);
    for (let k = 0; k < m.X.length; k++) c.lineTo(m.X[k], m.Y[k]);
    c.lineTo(m.X[m.X.length - 1], yh + 3);
    c.closePath();
  }
  const neigePath = (c, m) => entre(c, m.X, m.Y, m.X, m.Y.map((y, k) => max(y, m.SN[k])), m.X.length);
  function nuagePath(c, nu){
    const x0 = nu.haut ? max(IW*nu.u0, CART.x1 + 10) : IW*nu.u0, x1 = nu.haut ? min(IW*nu.u1, signRect()[0] - 10) : IW*nu.u1, yc = nu.haut ? IH*nu.v + CART.y0 : yh - mont().Hm*nu.v, th = IH*.024;
    c.moveTo(x0 + th/2, yc + th/2);
    for (let x = x0 + th/2; x <= x1 - th/2; x += 3) c.lineTo(x, yc + th/2);
    c.arc(x1 - th/2, yc, th/2, PI/2, -PI/2, true);
    for (let x = x1 - th/2; x >= x0 + th/2; x -= 3) c.lineTo(x, yc - th/2 - abs(sin(x*.06 + nu.ph))*th*.5);
    c.arc(x0 + th/2, yc, th/2, -PI/2, PI/2, true);
    c.closePath();
  }
  function barque(b){
    const r = ROWS[b.i], sc = F/r.z, X = IW*b.u, g = clamp(round(X/GX), 2, NG - 3), y = Y[b.i][g];
    const ang = clamp(atan2(Y[b.i][g + 2] - Y[b.i][g - 2], 4*GX), -.4, .4), Lp = b.L*sc;
    return { x: X, y: y + Lp*.024, ang, Lp, hp: Lp*.12 };
  }
  function coque(c, B){
    const ca = cos(B.ang), sa = sin(B.ang), Lh = B.Lp/2, h = B.hp;
    [[-Lh, -h*.2], [Lh*.55, -h*.35], [Lh*1.05, -h*1.05], [Lh*.82, h*.1], [Lh*.2, h*.6], [-Lh*.6, h*.5], [-Lh*.98, h*.05]]
      .forEach((p, k) => { const x = B.x + p[0]*ca - p[1]*sa, y = B.y + p[0]*sa + p[1]*ca; k ? c.lineTo(x, y) : c.moveTo(x, y); });
    c.closePath();
  }
  function rameurs(c, B){
    const ca = cos(B.ang), sa = sin(B.ang), h = B.hp, P = (u, v) => [B.x + u*ca - v*sa, B.y + u*sa + v*ca];
    for (let k = 0; k < 6; k++){
      const u = -B.Lp*.34 + k*B.Lp*.11, sw = sin(simT*2 + k*.3)*h*.25;
      const a = P(u, -h*.3), bb = P(u - h*.3 + sw, -h*1.4), hd = P(u - h*.36 + sw, -h*1.75);
      c.moveTo(a[0] - h*.14, a[1]); c.lineTo(bb[0] - h*.14, bb[1]); c.lineTo(bb[0] + h*.14, bb[1]); c.lineTo(a[0] + h*.14, a[1]); c.closePath();
      c.moveTo(hd[0] + h*.26, hd[1]); c.arc(hd[0], hd[1], h*.26, 0, TAU);
    }
  }

  /* ———————————————— outils de planche ———————————————— */
  // un ruban plein le long d'une courbe ; wf(s, u) donne sa largeur
  function ruban(c, X, Yy, a, b, wf){
    if (b - a < 1) return;
    const Lx = [], Ly = [], Rx = [], Ry = [];
    for (let s = a; s <= b; s++){
      const p = max(a, s - 1), q = min(b, s + 1);
      let tx = X[q] - X[p], ty = Yy[q] - Yy[p];
      const l = hypot(tx, ty) || 1, w = wf(s, (s - a)/(b - a), atan2(ty, tx))*.5;
      tx /= l; ty /= l;
      Lx.push(X[s] - ty*w); Ly.push(Yy[s] + tx*w); Rx.push(X[s] + ty*w); Ry.push(Yy[s] - tx*w);
    }
    c.moveTo(Lx[0], Ly[0]);
    for (let k = 1; k < Lx.length; k++) c.lineTo(Lx[k], Ly[k]);
    for (let k = Rx.length - 1; k >= 0; k--) c.lineTo(Rx[k], Ry[k]);
    c.closePath();
  }
  // le trait du keyban : plein, effilé aux deux bouts, plus large quand il croise la plume
  function trait(c, X, Yy, a, b, w0){
    const nn = b - a;
    ruban(c, X, Yy, a, b, (s, u, d) => {
      const bout = clamp(min(s - a, b - s)/max(2, min(6, nn*.2)));
      const wv = typeof w0 === "function" ? w0(s, u) : w0;
      return wv*(.45 + .55*abs(sin(d - NIB)))*(.25 + .75*sqrt(bout));
    });
  }
  // les plages où une condition tient sur la grille ; f(a, b) pour chacune
  function plages(cond, f){
    let a = -1;
    for (let g = 0; g <= NG; g++){
      const on = g < NG && cond(g);
      if (on && a < 0) a = g;
      if (!on && a >= 0){ if (g - 1 > a) f(a, g - 1); a = -1; }
    }
  }
  // la bande visible d'une rangée : de sa courbe + d1 à min(courbe + d2, enveloppe des rangées proches)
  function bande(c, i, d1, d2){
    const yi = Y[i], e = E[i];
    plages(g => yi[g] + d1 < e[g] - .3, (a, b) => {
      c.moveTo(a*GX, yi[a] + d1);
      for (let g = a + 1; g <= b; g++) c.lineTo(g*GX, yi[g] + d1);
      for (let g = b; g >= a; g--) c.lineTo(g*GX, min(e[g], yi[g] + d2));
      c.closePath();
    });
  }
  const sousEnv = (c, e) => { c.moveTo(0, -PAD); c.lineTo(IW, -PAD); for (let g = NG - 1; g >= 0; g--) c.lineTo(min(IW, g*GX), e[g]); c.closePath(); };
  const corps = (c, g) => { c.moveTo(g.xs[0], IH + PAD); for (let s = 0; s < g.n; s++) c.lineTo(g.xs[s], g.ys[s]); c.lineTo(g.xs[g.n - 1], IH + PAD); c.closePath(); };
  const levre = (c, g) => entre(c, g.lip.ox, g.lip.oy, g.lip.ix, g.lip.iy, g.lip.n);
  const creux = (c, g) => { const k = g.creux; c.moveTo(k.x[0], k.y[0]); for (let q = 1; q < k.x.length; q++) c.lineTo(k.x[q], k.y[q]); c.closePath(); };
  const doigts = (c, g) => { for (const d of g.griffes) ruban(c, d.X, d.Y, 0, 8, (s, u) => d.w0*2.2*pow(1 - u, .65) + .3); };
  const op = (c, m) => c.globalCompositeOperation = m;
  const rempli = (c, f, a = 1) => { c.globalAlpha = a; c.beginPath(); f(); c.fill(); c.globalAlpha = 1; };
  // un aplat et son bord : deux aplats voisins se touchent sans laisser de liseré
  const plein = (c, f, a = 1) => { c.globalAlpha = a; c.lineWidth = 1.2; c.beginPath(); f(); c.fill(); c.stroke(); c.globalAlpha = 1; };
  const efface = (c, f) => { op(c, "destination-out"); c.beginPath(); f(); c.fill(); op(c, "source-over"); };
  const effaceVagues = (c, avecDoigts = true) => {
    for (const V of VG){
      const g = V.g;
      op(c, "destination-out");
      plein(c, () => corps(c, g));
      plein(c, () => levre(c, g));
      plein(c, () => creux(c, g));
      op(c, "source-over");
      if (avecDoigts && g.griffes.length) efface(c, () => doigts(c, g));
    }
  };
  const decoupe = (c, f) => { c.save(); c.beginPath(); f(); c.clip(); };
  const moyY = i => yh + HC*F/ROWS[i].z;
  const proche = i => clamp(1 - log(ROWS[i].z/ZN)/log(700/ZN));
  function debut(k){
    const c = L[k].c, ls = L[k].ls;
    c.setTransform(1, 0, 0, 1, 0, 0);
    op(c, "source-over");
    c.globalAlpha = 1;
    c.clearRect(0, 0, L[k].cv.width, L[k].cv.height);
    c.setTransform(ls, 0, 0, ls, PAD*ls, PAD*ls);
    c.fillStyle = c.strokeStyle = "#000";
    c.lineJoin = c.lineCap = "round";
    decoupe(c, () => c.rect(0, 0, IW, IH));
    return c;
  }
  function fin(k){
    const c = L[k].c;
    op(c, "source-in");
    c.fillStyle = motif(k);
    c.fillRect(-PAD, -PAD, IW + 2*PAD, IH + 2*PAD);
    op(c, "source-over");
    L[k].gv = k === "K" ? gvV : gv;
  }
  const colX = j => CART.x1 - CART.pc - CART.colW*(j + .5);
  // un texte en colonne, à la japonaise
  function colonne(c, txt, x, y){
    c.font = `600 ${CART.fs}px ${SERIF}`;
    c.textAlign = "center";
    for (const ch of txt){
      if (ch === " "){ y += CART.lh*.55; continue; }
      if (ch > "~") c.font = `700 ${CART.fs*1.1}px ${CJK}`;
      c.fillText(ch, x, y);
      y += CART.lh;
    }
    c.textAlign = "left";
    return y;
  }
  const lettres = (c, j, d = 0) => colonne(c, PR[j].nom.toUpperCase(), colX(j) + d, CART.ny + d);
  const pastille = (c, j) => c.fillRect(colX(j) - CART.swt/2, CART.y0 + CART.pc, CART.swt, CART.swt);
  const marque = (c, j) => c.fillRect(IW*.77 + j*9*KK, IH + 10, 7*KK, 3);
  const cartRect = (c, m = 0) => c.rect(CART.x0 - m, CART.y0 - m, CART.x1 - CART.x0 + 2*m, CART.y1 - CART.y0 + 2*m);
  const signRect = () => [IW*.955 - CART.colW*1.3, CART.y0, CART.colW*1.3, (D.artiste.length + 1)*CART.lh + CART.colW*1.1 + CART.pc*2.2];
  const entre = (c, X0, Y0, X1, Y1, n) => {
    c.moveTo(X0[0], Y0[0]);
    for (let s = 1; s < n; s++) c.lineTo(X0[s], Y0[s]);
    for (let s = n - 1; s >= 0; s--) c.lineTo(X1[s], Y1[s]);
    c.closePath();
  };
  const pourBarques = (i, f) => { for (const b of BAR) if (b.i === i) f(barque(b)); };
  const trous = (c, i) => pourBarques(i, B => efface(c, () => coque(c, B)));
  const effaceCartouches = c => { efface(c, () => cartRect(c, 2)); efface(c, () => c.rect(...signRect())); };

  /* ———————————————— les planches ———————————————— */
  // K : le keyban, le trait noir
  function planK(){
    const c = debut("K"), k = KK;
    // le ciel et la montagne ne bougent pas : tracés une fois, puis recopiés
    if (!KS){
      cielK(c);
      KS = document.createElement("canvas");
      KS.width = L.K.cv.width; KS.height = L.K.cv.height;
      KS.getContext("2d").drawImage(L.K.cv, 0, 0);
    } else {
      c.save();
      c.setTransform(1, 0, 0, 1, 0, 0);
      c.drawImage(KS, 0, 0);
      c.restore();
    }
    effaceVagues(c);
    for (const V of VG) traitsVague(c, V.g);
    c.restore();
    // le cadre, les cartouches, le kentō
    c.lineWidth = 1.4*k;
    c.strokeRect(-.7, -.7, IW + 1.4, IH + 1.4);
    effaceCartouches(c);
    c.lineWidth = 1.1*k;
    c.beginPath(); cartRect(c); c.stroke();
    c.lineWidth = .5*k;
    c.beginPath();
    for (let j = 1; j < 4; j++){ const x = CART.x1 - CART.pc - CART.colW*j; c.moveTo(x, CART.y0 + CART.pc*.6); c.lineTo(x, CART.y1 - CART.pc*.6); }
    c.stroke();
    const sg = signRect();
    c.lineWidth = .9*k;
    c.strokeRect(...sg);
    c.lineWidth = 1.6;
    c.beginPath();
    c.moveTo(IW + 7, IH - 9); c.lineTo(IW + 7, IH + 7); c.lineTo(IW - 9, IH + 7);
    c.moveTo(IW*.56, IH + 7); c.lineTo(IW*.72, IH + 7);
    c.stroke();
    c.fillRect(IW*.77 - 11*KK, IH + 10, 7*KK, 3);
    fin("K");
  }
  // le keyban du ciel : nuages, soleil, montagne
  function cielK(c){
    const m = mont(), k = KK;
    c.beginPath();
    for (const nu of NUA) if (nu.haut) traitFerme(c, nu, .9*k);
    c.fill();
    const sx = IW*SOL.u, sy = yh - IH*.44*SOL.v, sr = IW*.064;
    c.lineWidth = .8*k;
    c.beginPath(); c.arc(sx, sy, sr, 0, TAU); c.stroke();
    decoupe(c, () => sousEnv(c, EA));
    // la montagne : la ligne de crête, la neige en dents, quelques ravines
    c.beginPath();
    trait(c, m.X, m.Y, 0, m.X.length - 1, 1.5*k);
    const sy2 = m.X.map((x, q) => max(m.Y[q], m.SN[q]));
    let a = -1;
    for (let q = 0; q <= m.X.length; q++){
      const on = q < m.X.length && m.SN[q] > m.Y[q] + .5;
      if (on && a < 0) a = q;
      if (!on && a >= 0){ trait(c, m.X, sy2, a, q - 1, .9*k); a = -1; }
    }
    c.fill();
    c.beginPath();
    for (let q = -2; q <= 2; q++){
      const x0 = m.xp + q*IW*.02, y0 = yh - m.Hm*.58, x1 = m.xp + q*IW*.07, y1 = yh - m.Hm*.12;
      const X = [], Yy = [];
      for (let u = 0; u <= 10; u++){ const v = u/10; X.push(x0 + (x1 - x0)*v + q*2*sin(v*PI)); Yy.push(y0 + (y1 - y0)*v); }
      trait(c, X, Yy, 0, 10, .55*k);
    }
    c.fill();
    for (const nu of NUA) if (!nu.haut){ efface(c, () => nuagePath(c, nu)); c.beginPath(); traitFerme(c, nu, .9*k); c.fill(); }
    c.restore();
  }
  // KM : le keyban de la mer (une planche à part : elle seule bouge avec la houle)
  function planKM(){
    const c = debut("KM"), k = KK;
    // la mer : chaque crête est un trait plein, gras sur la crête, maigre dans le creux
    for (let i = 0; i < NR; i++){
      const yi = Y[i], e = E[i], pr = proche(i), ji = JG[i], w0 = (.5 + 1.6*pr)*k;
      c.beginPath();
      plages(g => yi[g] < e[g] - .3, (a, b) => trait(c, XG, yi, a, b, s => w0*(.35 + 1.1*clamp((1.05 - ji[s])/.6))));
      if (i >= 3){
        const dd = F/ROWS[i].z*.32, Yd = Float32Array.from(yi, y => y + dd);
        plages(g => ji[g] < .9 && Yd[g] < e[g] - .3, (a, b) => trait(c, XG, Yd, a, b, w0*.45));
      }
      c.fill();
      pourBarques(i, B => {
        const g = clamp(round(B.x/GX), 0, NG - 1);
        if (B.y > e[g] - B.hp) return;   // cachée par une rangée plus proche
        efface(c, () => coque(c, B));
        c.lineWidth = (.8 + .4*pr)*k;
        c.beginPath(); coque(c, B); c.stroke();
        c.beginPath(); rameurs(c, B); c.fill();
      });
    }
    effaceVagues(c);
    c.restore();
    fin("KM");
  }
  // un contour fermé de nuage, en trait plein
  function traitFerme(c, nu, w){
    const p = new Path2D();
    const cv = { moveTo: (x, y) => p.moveTo(x, y), lineTo: (x, y) => p.lineTo(x, y), arc: (...a) => p.arc(...a), closePath: () => p.closePath() };
    nuagePath(cv, nu);
    c.save();
    c.lineWidth = w;
    c.stroke(p);
    c.restore();
  }
  // les traits de la vague : contour, lèvre, lignes d'eau du creux, lignes du dos, griffes
  function traitsVague(c, g){
    const l = g.lip, k = KK*(.55 + .45*clamp(g.A/(IH*.6)));
    c.beginPath();
    let s0 = 0;
    while (s0 < g.n - 1 && g.ys[s0] > IH + 2) s0++;
    let s1 = g.n - 1;
    while (s1 > 0 && g.ys[s1] > IH + 2) s1--;
    if (s1 > s0) trait(c, g.xs, g.ys, s0, s1, s => k*(1.1 + 1.5*clamp(g.hh[s])));
    trait(c, l.ox, l.oy, 0, l.n - 1, (s, u) => k*2.4*(1 - .55*u));
    trait(c, l.ix, l.iy, 0, l.n - 1, (s, u) => k*1.6*(1 - .6*u));
    c.fill();
    // les lignes d'eau, parallèles à la lèvre, dans le creux
    c.beginPath();
    for (const f of [.14, .34]){
      const X = [], Yy = [], qe = round((l.n - 1)*(.62 - f*.3));
      for (let q = 0; q <= qe; q++){ const r = l.rr[q] - l.th[q] - l.R0*f; X.push(l.Cx + r*cos(l.ang[q])); Yy.push(l.Cy + r*sin(l.ang[q])); }
      if (qe > 2) trait(c, X, Yy, 0, qe, .7*k);
    }
    c.fill();
    // les lignes du dos : le mouvement de l'eau sous la crête
    c.beginPath();
    for (const f of [.05, .11, .18]){
      const X = [], Yy = [];
      for (let s = 0; s <= g.im; s++){
        if (g.hh[s] < .38 + f) continue;
        const p = max(0, s - 2), q = min(g.n - 1, s + 2);
        let tx = g.xs[q] - g.xs[p], ty = g.ys[q] - g.ys[p];
        const tl = hypot(tx, ty) || 1, d = g.A*f;
        X.push(g.xs[s] - ty/tl*d); Yy.push(g.ys[s] + tx/tl*d);
      }
      if (X.length > 4) trait(c, X, Yy, 0, X.length - 1, .75*k);
    }
    c.fill();
    // le milieu de la lèvre : la limite des deux bleus
    c.beginPath();
    trait(c, l.mx, l.my, 0, round((l.n - 1)*.85), .55*k);
    c.fill();
  }
  // B : 990, le bleu de Prusse
  function planB(){
    const c = debut("B");
    const g = c.createLinearGradient(0, yh, 0, IH);
    g.addColorStop(0, "rgba(0,0,0,1)");
    g.addColorStop(.16, "rgba(0,0,0,.8)");
    g.addColorStop(1, "rgba(0,0,0,.8)");
    c.fillStyle = g;
    c.beginPath();
    c.moveTo(0, Y[0][0]);
    for (let q = 1; q < NG; q++) c.lineTo(q*GX, Y[0][q]);
    c.lineTo(IW + PAD, IH + PAD); c.lineTo(-PAD, IH + PAD);
    c.closePath();
    c.fill();
    c.fillStyle = "#000";
    for (let i = 0; i < NR; i++) trous(c, i);
    effaceVagues(c);
    for (const V of VG){
      const v = V.g;
      plein(c, () => corps(c, v));
      plein(c, () => levre(c, v));
      plein(c, () => creux(c, v));
    }
    c.restore();
    effaceCartouches(c);
    pastille(c, 0); marque(c, 0);
    fin("B");
  }
  // R : CUMBRE, le rose de l'aube
  function planR(){
    const c = debut("R"), m = mont(), sx = IW*SOL.u, sy = yh - IH*.44*SOL.v, sr = IW*.064;
    decoupe(c, () => sousEnv(c, EA));
    const g = c.createLinearGradient(0, yh*.36, 0, yh);
    g.addColorStop(0, "rgba(0,0,0,0)");
    g.addColorStop(.5, "rgba(0,0,0,.42)");
    g.addColorStop(1, "rgba(0,0,0,.92)");
    c.fillStyle = g;
    c.fillRect(0, yh*.36, IW, yh*.64 + 2);
    c.fillStyle = "#000";
    rempli(c, () => { c.moveTo(sx + sr, sy); c.arc(sx, sy, sr, 0, TAU); });
    c.restore();
    // le reflet : des barres franches sous le soleil, et la mer lointaine teintée
    decoupe(c, () => sousEnv(c, E[3]));
    rempli(c, () => c.rect(0, yh, IW, moyY(4) - yh), .3);
    for (let q = 0; q < 8; q++){
      const w = sr*2*(.95 - q*.09);
      rempli(c, () => c.rect(sx - w/2 + (hs(q, 2) - .5)*5, yh + 2 + q*(moyY(4) - yh)/8.5, w, 1.8*KK));
    }
    c.restore();
    for (const nu of NUA) efface(c, () => nuagePath(c, nu));
    efface(c, () => neigePath(c, m));
    effaceVagues(c);
    c.restore();
    effaceCartouches(c);
    pastille(c, 1); marque(c, 1);
    fin("R");
  }
  // O : Lecture, l'ocre
  function planO(){
    const c = debut("O"), m = mont();
    decoupe(c, () => sousEnv(c, EA));
    const g = c.createLinearGradient(0, yh - m.Hm, 0, yh);
    g.addColorStop(0, "#000");
    g.addColorStop(1, "rgba(0,0,0,.5)");
    c.fillStyle = g;
    c.beginPath(); montPath(c, m); c.fill();
    c.fillStyle = "#000";
    efface(c, () => neigePath(c, m));
    for (const nu of NUA) if (!nu.haut) efface(c, () => nuagePath(c, nu));
    for (const nu of NUA) rempli(c, () => nuagePath(c, nu), nu.haut ? .3 : .42);
    c.restore();
    for (let i = 0; i < NR; i++) pourBarques(i, B => { decoupe(c, () => sousEnv(c, E[i])); rempli(c, () => coque(c, B)); c.restore(); });
    effaceVagues(c);
    c.restore();
    effaceCartouches(c);
    pastille(c, 2); marque(c, 2);
    fin("O");
  }
  // G : LE CLOSING, l'indigo des creux
  function planG(){
    const c = debut("G");
    for (let i = 1; i < NR; i++){
      const sc = F/ROWS[i].z;
      rempli(c, () => bande(c, i, sc*.04, sc*(i >= 6 ? .5 : .65)), .92);
      trous(c, i);
    }
    effaceVagues(c);
    for (const V of VG){
      const v = V.g, l = v.lip;
      plein(c, () => creux(c, v), .55);
      rempli(c, () => entre(c, l.mx, l.my, l.ix, l.iy, l.n), .9);
      // le dos : sous une bande claire qui suit la crête, l'indigo en aplat franc
      decoupe(c, () => corps(c, v));
      const d = v.A*.13 + 4;
      rempli(c, () => {
        c.moveTo(v.xs[0], IH + PAD);
        for (let q = 0; q < v.n; q++) c.lineTo(v.xs[q] - d*.35, v.ys[q] + d);
        c.lineTo(v.xs[v.n - 1], IH + PAD);
        c.closePath();
      }, .62);
      c.restore();
    }
    c.restore();
    effaceCartouches(c);
    pastille(c, 3); marque(c, 3);
    fin("G");
  }
  // W : le gofun, l'écume blanche (planche du CLOSING ; ses griffes et ses embruns au seuil)
  function planW(st){
    const c = debut("W");
    for (let i = 1; i < NR; i++){
      const yi = Y[i], ji = JG[i], e = E[i], pr = proche(i), sc = F/ROWS[i].z;
      c.beginPath();
      plages(g => ji[g] < JW && yi[g] < e[g] - .3, (a, b) => ruban(c, XG, Float32Array.from(yi, y => y - .4), a, b,
        (s, u) => ((1 + 5*pr)*clamp((JW - ji[s])/JW*3)*sin(PI*(u*.9 + .05)) + .5)*KK));
      if (i >= 5){
        for (let g = 0; g < NG; g += 2){
          if (ji[g] < JW + .05 && hs(i, g) < .35){
            const y = yi[g] - 1 - hs(g, i)*sc*.25, r = (.5 + 1.2*pr*hs(i + 1, g))*KK;
            if (y < e[g] - r){ c.moveTo(g*GX + r, y); c.arc(g*GX, y, r, 0, TAU); }
          }
        }
      }
      c.fill();
      trous(c, i);
    }
    effaceVagues(c, false);
    for (const V of VG){
      const v = V.g, l = v.lip;
      // l'écume de crête sur le dos, puis la bande blanche de la lèvre
      c.beginPath();
      let a = -1;
      // l'écume du dos : là où la particule approche de la crête (h > 0,8 de la hauteur), une bande blanche qui s'épaissit
      for (let s = 0; s <= v.im; s++){
        const on = s < v.im && v.hh[s] > .8 && v.ys[s] < IH;
        if (on && a < 0) a = s;
        if (!on && a >= 0){
          if (s - 1 > a){
            const Yf = Float32Array.from(v.ys, (y, q) => y + KK*(1 + 3*clamp((v.hh[q] - .8)*5)));
            ruban(c, v.xs, Yf, a, s - 1, (q, u) => KK*(1 + 5*u*u)*(1 + 1.5*rise));
          }
          a = -1;
        }
      }
      const ex = [], ey = [];
      for (let q = 0; q < l.n; q++){ const r = l.rr[q] - l.th[q]*.17; ex.push(l.Cx + r*cos(l.ang[q])); ey.push(l.Cy + r*sin(l.ang[q])); }
      ruban(c, ex, ey, 0, l.n - 1, (q, u) => l.th[q]*.34*clamp(u*5));
      c.fill();
      if (v.griffes.length){ c.beginPath(); doigts(c, v); c.fill(); }
    }
    // les embruns : balistiques, ils retombent comme la neige d'Hokusai
    if (embruns){
      const G = IH*1.1, tt0 = st - 2;
      c.beginPath();
      for (const e of embruns){
        const tt = clamp(tt0, 0, e.tm), x = e.x + e.vx*tt, y = e.y + e.vy*tt + .5*G*tt*tt;
        c.moveTo(x + e.r, y); c.arc(x, y, e.r, 0, TAU);
      }
      c.fill();
    }
    c.restore();
    effaceCartouches(c);
    fin("W");
  }
  // BK : le bokashi du seuil, l'indigo du haut du ciel et du bas de la mer
  function planBK(){
    const c = debut("BK");
    decoupe(c, () => sousEnv(c, EA));
    const g = c.createLinearGradient(0, 0, 0, IH*.34);
    g.addColorStop(0, "rgba(0,0,0,1)");
    g.addColorStop(.4, "rgba(0,0,0,.66)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    c.fillStyle = g;
    c.fillRect(0, 0, IW, IH*.34);
    c.restore();
    for (const V of VG){ const v = V.g; efface(c, () => levre(c, v)); efface(c, () => creux(c, v)); if (v.griffes.length) efface(c, () => doigts(c, v)); }
    for (const nu of NUA) if (nu.haut) efface(c, () => nuagePath(c, nu));
    efface(c, () => { const sr = IW*.064; c.arc(IW*SOL.u, yh - IH*.44*SOL.v, sr, 0, TAU); });
    const g2 = c.createLinearGradient(0, IH*.7, 0, IH);
    g2.addColorStop(0, "rgba(0,0,0,0)");
    g2.addColorStop(1, "rgba(0,0,0,.6)");
    c.fillStyle = g2;
    c.fillRect(0, IH*.7, IW, IH*.3 + 1);
    c.restore();
    effaceCartouches(c);
    marque(c, 4);
    fin("BK");
  }
  const PLANS = { K: planK, KM: planKM, B: planB, R: planR, O: planO, G: planG, W: planW, BK: planBK };
  function naitreEmbruns(){
    const R = graine(seed + 77), l = VG[0].g.lip, out = [], u = IW/330;
    for (let k = 0; k < 150; k++){
      const q = min(l.n - 1, floor((.35 + .65*R())*(l.n - 1))), a = l.ang[q], sp = (40 + 150*R())*u;
      out.push({ x: l.ox[q], y: l.oy[q], vx: cos(a)*sp + 50*R()*u, vy: sin(a)*sp - 70*R()*u, tm: .3 + 1.1*R(), r: (.5 + 1.8*R()*R())*KK });
    }
    return out;
  }

  /* ———————————————— l'état : quelle planche est prise, laquelle est sous la feuille ———————————————— */
  const tP = j => j < 4 ? fait[j] : (tS !== null ? tS + T_BK : null);
  const fini = (j, t) => { const a = tP(j); return a !== null && t - a >= TP; };
  const vu = (k, t) => LJ[k] === 5 || fini(LJ[k], t);
  function feuilleActive(t){
    for (let j = 0; j < 5; j++){ const a = tP(j); if (a !== null && t - a >= 0 && t - a < TP) return j; }
    return -1;
  }
  function cle(t, st){
    let s = papier ? "p" : "-";
    for (let j = 0; j < 5; j++) s += fini(j, t) ? (t - tP(j) >= TP + T_SC ? "S" : "F") : tP(j) !== null ? "a" : "-";
    s += st >= 6.9 ? "Z" : st >= 6.4 ? "Y" : "";
    return s + "|" + ligneEtat(t);
  }
  function poser(c, k, mode, a = 1, dx = 0, dy = 0){
    const q = REG[LJ[k]];
    op(c, mode);
    c.globalAlpha = a;
    c.drawImage(L[k].cv, IX - PAD + q.ox + q.bx + dx, IY - PAD + q.oy + q.by + dy, IW + 2*PAD, IH + 2*PAD);
    c.globalAlpha = 1;
    op(c, "source-over");
  }
  // la composition en deux pas (le papier et les premières couleurs, puis le reste), tramée à chaque pas
  function composer(t, st, moitie){
    const c = CPb.getContext("2d");
    if (moitie === 1){
      c.setTransform(1, 0, 0, 1, 0, 0);
      c.clearRect(0, 0, CPb.width, CPb.height);
      c.setTransform(DPR, 0, 0, DPR, -(SX - 14)*DPR, -(SY - 14)*DPR);
      if (papier) c.drawImage(papier.cv, SX - 14, SY - 14, SW + 28, SH + 28);
      else { c.fillStyle = rgb(D.papier); c.fillRect(SX, SY, SW, SH); }
    }
    MODES.forEach(([k, mode, a], q) => { if ((q < 3) === (moitie === 1) && vu(k, t)) poser(c, k, mode, a); });
    if (moitie === 2) textesCP(c, t, st);
    PUITS.drawImage(CPb, 0, 0, 1, 1);
  }
  // la face assombrie de la feuille, prête pour quand elle se lèvera
  function ombrer(){
    const c2 = CPs.getContext("2d");
    c2.setTransform(1, 0, 0, 1, 0, 0);
    c2.globalCompositeOperation = "copy";
    c2.drawImage(CP, 0, 0);
    c2.globalCompositeOperation = "source-atop";
    c2.fillStyle = "rgba(12,14,22,.55)";
    c2.fillRect(0, 0, CPs.width, CPs.height);
    c2.globalCompositeOperation = "source-over";
    PUITS.drawImage(CPs, 0, 0, 1, 1);
  }
  // le cartouche dans l'image : noms gaufrés à blanc, puis imprimés en noir ; sceaux ; signature
  function textesCP(c, t, st){
    c.save();
    c.translate(IX, IY);
    for (let j = 0; j < 4; j++){
      if (fini(j, t)){
        op(c, "multiply");
        c.fillStyle = rgb(D.keyban, .94);
        lettres(c, j);
        op(c, "source-over");
        if (t - tP(j) >= TP + T_SC && SCEAUX[j]) tampon(c, SCEAUX[j], colX(j) - CART.sealS/2, CART.y1 - CART.pc - CART.sealS, CART.sealS, 1);
      } else gaufre(c, () => lettres(c, j), () => lettres(c, j, .55));
    }
    const sg = signRect(), xs = sg[0] + sg[2]/2, y0 = sg[1] + CART.pc + CART.lh*.8;
    if (st >= 6.4){
      op(c, "multiply");
      c.fillStyle = rgb(D.keyban, .94);
      const y = colonne(c, D.artiste + "画", xs, y0);
      op(c, "source-over");
      if (st >= 6.9 && SCEAUX[4]) tampon(c, SCEAUX[4], xs - CART.colW*.55, y - CART.lh*.35, CART.colW*1.1, 1);
    } else gaufre(c, () => colonne(c, D.artiste, xs - .6, y0 - .6), () => colonne(c, D.artiste, xs + .55, y0 + .55));
    c.restore();
    // la marge : la note de l'imprimeur, et la loi lue en direct, en encre noire
    c.fillStyle = rgb(D.keyban, .82);
    c.font = `${clamp(IW*.025, 7.5, 10)}px ${MONO}`;
    c.textAlign = "left";
    c.fillText(ligneEtat(t), IX, IY + IH + 16);
    c.fillStyle = rgb(D.keyban, .6);
    c.fillText("Gerstner 1802 · ΣQkA " + S.toFixed(2) + " · écume " + round(ecume*100) + " %", IX, IY + IH + 27);
  }
  function gaufre(c, haut, bas){
    c.fillStyle = "rgba(255,255,250,.55)";
    haut();
    c.fillStyle = "rgba(40,38,34,.2)";
    bas();
  }
  function tampon(c, cv, x, y, s, k){
    if (k <= 0 || !cv) return;
    const e = 1 + .35*(1 - doux(k));
    op(c, "multiply");
    c.globalAlpha = doux(k);
    c.drawImage(cv, x + s/2 - s*e/2, y + s/2 - s*e/2, s*e, s*e);
    c.globalAlpha = 1;
    op(c, "source-over");
  }
  /* une image = une file de pas : la loi, chaque planche, la composition, l'échange */
  function pasJob(st, t){
    const p = job.pas[job.k++];
    if (p === "calc"){ calc(t); geoOk = true; if (st >= 2 && !embruns) embruns = naitreEmbruns(); return true; }
    if (p === "comp1" || p === "comp2"){ composer(t, st, p === "comp1" ? 1 : 2); return true; }
    if (p === "swap"){ [CP, CPb] = [CPb, CP]; signeCP = job.cle; nCP++; return false; }
    if (p === "ombre"){ ombrer(); job = null; return true; }
    if (L[p].gv === (p === "K" ? gvV : gv)) return false;
    if (!TEX[p]){ job.k--; return null; }
    PLANS[p](st);
    PUITS.drawImage(L[p].cv, 0, 0, 1, 1);   // la planche est tramée ici, pas au moment de la composition
    return true;
  }

  /* ———————————————— la feuille qui se soulève et retombe ———————————————— */
  function feuille(ctx, j, e){
    const p = e < T_LEVE ? doux(e/T_LEVE) : e < T_LEVE + T_TIENT ? 1 : 1 - lisse((e - T_LEVE - T_TIENT)/T_POSE);
    const pose = e >= T_LEVE + T_TIENT;
    const yb = SY + SH + 14, yc = SY + SH - SH*.86*p, Lf = yb - yc;
    const ox0 = SX - 14, ow = SW + 28;
    // en haut : la feuille posée ; la couleur nouvelle là où elle est déjà retombée
    ctx.save();
    ctx.beginPath(); ctx.rect(0, 0, W, yc); ctx.clip();
    ctx.drawImage(CP, ox0, SY - 14, ow, SH + 28);
    if (pose){
      ctx.save();
      ctx.beginPath(); ctx.rect(IX - PAD, IY - PAD, IW + 2*PAD, IH + 2*PAD); ctx.clip();
      for (const k of PLJ[j]){ const md = MODES.find(m => m[0] === k); poser(ctx, k, md[1], md[2]); }
      poser(ctx, "KM", "multiply");
      poser(ctx, "K", "multiply");
      ctx.restore();
    }
    ctx.restore();
    if (p < .002) return;
    // dessous : le bois de la planche, encré de la couleur nouvelle
    ctx.save();
    ctx.beginPath(); ctx.rect(0, yc, W, H - yc); ctx.clip();
    const bx = IX - 10, by = IY - 10, bw = IW + 20, bh = IH + 20;
    ctx.fillStyle = "rgba(0,0,0,.35)";
    ctx.fillRect(bx + 2, by + 3, bw, bh);
    if (TEX.BOIS){
      const pat = ctx.createPattern(TEX.BOIS, "repeat");
      pat.setTransform(new DOMMatrix().translateSelf(bx, by).scaleSelf(1.4, .7));
      ctx.fillStyle = pat;
    } else ctx.fillStyle = rgb(D.bois);
    ctx.fillRect(bx, by, bw, bh);
    ctx.strokeStyle = "rgba(0,0,0,.45)";
    ctx.lineWidth = 1;
    ctx.strokeRect(bx + .5, by + .5, bw - 1, bh - 1);
    for (const k of PLJ[j]) poser(ctx, k, "source-over", .96);
    ctx.fillStyle = "rgba(255,240,220,.05)";
    ctx.fillRect(bx, by, bw, bh);
    // la feuille levée : des bandes en perspective, son ombre portée sur le bois
    const N = 40, dl = Lf/N, Hc = max(W, H)*3.4, cxv = W/2, cyv = H*.5;
    const bandes = [];
    let y = yc, z = 0;
    for (let s = 0; s < N; s++){
      const u = (s + .5)/N, a = min(1.48, p*1.28*(.72 + .56*u));
      const y2 = y + cos(a)*dl, z2 = z + sin(a)*dl, s0 = Hc/(Hc - z), s1 = Hc/(Hc - z2);
      bandes.push({ Y0: cyv + (y - cyv)*s0, Y1: cyv + (y2 - cyv)*s1, sc: (s0 + s1)/2, a, src: yc + s*dl });
      y = y2; z = z2;
    }
    // l'ombre : nette, en trois aplats qui s'élargissent avec la hauteur de la feuille
    for (const [f, al] of [[1, .16], [.66, .16], [.33, .2]]){
      const dx = (5 + 14*p)*f, dy = (8 + 26*p)*f;
      ctx.fillStyle = `rgba(0,0,0,${al*min(1, p*3)})`;
      ctx.beginPath();
      ctx.moveTo(ox0 + dx, yc);
      for (const b of bandes) ctx.lineTo(cxv + (ox0 - cxv)*b.sc + dx, b.Y1 + dy);
      for (let s = N - 1; s >= 0; s--){ const b = bandes[s]; ctx.lineTo(cxv + (ox0 + ow - cxv)*b.sc + dx, b.Y1 + dy); }
      ctx.lineTo(ox0 + ow + dx, yc);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
    // la face de la feuille, encore sans la couleur, qui s'assombrit en se redressant
    const k = CP.width/ow;
    for (const b of bandes){
      if (b.Y1 <= b.Y0) continue;
      const x0 = cxv + (ox0 - cxv)*b.sc, w = ow*b.sc, sy = (b.src - (SY - 14))*k, sh = dl*k;
      ctx.drawImage(CP, 0, sy, CP.width, sh, x0, b.Y0, w, b.Y1 - b.Y0 + .7);
      ctx.globalAlpha = clamp(.85*sin(b.a)*sin(b.a));
      ctx.drawImage(CPs, 0, sy, CP.width, sh, x0, b.Y0, w, b.Y1 - b.Y0 + .7);
      ctx.globalAlpha = 1;
    }
    // le pli : une ligne de lumière à la charnière
    ctx.strokeStyle = `rgba(255,255,250,${.35*p})`;
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(SX, yc + .5); ctx.lineTo(SX + SW, yc + .5); ctx.stroke();
  }

  /* ———————————————— l'image ———————————————— */
  function frame(ctx, t){
    const dt = dernier ? min(.05, (t - dernier)/1000) : 1/60;
    dernier = t;
    if (genA){
      const h0 = performance.now();
      while (performance.now() - h0 < 6){ if (genA.next().done){ genA = null; break; } }
    }
    const st = tS !== null ? (t - tS)/1000 : -1;
    ondes = ondes.filter(o => t - o.t0 < 7000);
    const seuilAnime = st >= 0 && st < 3.4, anime = seuilAnime || ondes.length > 0;
    if (seuilAnime || !geoOk) vagueSale = true;
    rise = st >= 0 ? lisse(st/2.8) : 0;
    griffes = st >= 0 ? lisse((st - 1.5)/1.5) : 0;
    S = .9 + .3*rise;
    if (seuilAnime) simT += dt*(.3 + .4*rise);
    // le repérage : la planche décalée revient sur le kentō
    let bouge = false;
    for (const q of REG){
      const mv = abs(q.ox) + abs(q.oy) + abs(q.vx) + abs(q.vy);
      if (mv < .02){ q.ox = q.oy = q.vx = q.vy = 0; continue; }
      q.vx += (-60*q.ox - 13*q.vx)*dt; q.vy += (-60*q.oy - 13*q.vy)*dt;
      q.ox += q.vx*dt; q.oy += q.vy*dt;
      bouge = true;
    }
    const k = cle(t, st);
    if (!job && (k !== signeCP || sale || bouge || anime || !geoOk)){
      job = { pas: [...(anime || !geoOk ? ["calc"] : []), ...CLES, "comp1", "comp2", "swap", "ombre"], k: 0, cle: k };
      sale = false;
    }
    if (job){
      const h0 = performance.now();
      let n = 0;
      while (job && (n === 0 || performance.now() - h0 < 5)){
        const r = pasJob(st, t);
        if (r === null) break;
        if (r) n++;
      }
    }
    ctx.fillStyle = rgb(D.table);
    ctx.fillRect(0, 0, W, H);
    const j = feuilleActive(t);
    if (j >= 0 && geoOk) feuille(ctx, j, t - tP(j));
    else ctx.drawImage(CP, SX - 14, SY - 14, SW + 28, SH + 28);
    // les sceaux qui tombent, la signature qui s'imprime
    ctx.save();
    ctx.translate(IX, IY);
    for (let q = 0; q < 4; q++){
      const a = tP(q);
      if (a === null) continue;
      const e = t - a - TP;
      if (e >= 0 && e < T_SC) tampon(ctx, SCEAUX[q], colX(q) - CART.sealS/2, CART.y1 - CART.pc - CART.sealS, CART.sealS, e/T_SC);
    }
    if (st >= 5.85 && st < 6.9){
      const sg = signRect(), xs = sg[0] + sg[2]/2, y0 = sg[1] + CART.pc + CART.lh*.8;
      if (st < 6.4){
        op(ctx, "multiply");
        ctx.fillStyle = rgb(D.keyban, .94*lisse((st - 5.85)/.5));
        colonne(ctx, D.artiste + "画", xs, y0);
        op(ctx, "source-over");
      } else {
        const y = y0 + (D.artiste.length + 1)*CART.lh;
        tampon(ctx, SCEAUX[4], xs - CART.colW*.55, y - CART.lh*.35, CART.colW*1.1, (st - 6.4)/.5);
      }
    }
    ctx.restore();
    passeGrain(ctx, W, H, t, .022);
    M.ligne = temp.fin > t ? temp.txt : ligneEtat(t);
  }

  /* ———————————————— les mots ———————————————— */
  function ligneEtat(t){
    if (tS !== null) return "bokashi · sceau 波 · " + (D.chaine + 1) + " jours";
    const j = feuilleActive(t === undefined ? maintenant() : t);
    if (j >= 0 && j < 4) return "planche " + (j + 1) + " · " + PR[j].nom + " · " + PC[j].couleur;
    const f = M.faits();
    if (!f.length) return "keyban · le trait seul · chaîne " + D.chaine + " j";
    return f.length + " sur 4 · " + f.map(i => PR[i].nom).join(" · ");
  }
  function maj(){
    const f = M.faits();
    M.bouton = tS !== null ? "Encore" : f.length === 4 ? "Boucler" : PR[[0, 1, 2, 3].find(i => fait[i] === null)].nom;
    M.ligne = ligneEtat();
  }
  function remise(){
    tS = null; embruns = null; ondes = []; geoOk = false; simT = 0; sale = true; job = null;
    for (let j = 0; j < 4; j++) fait[j] = null;
    REG.forEach(q => { q.ox = q.oy = q.vx = q.vy = 0; });
  }
  // une seule feuille à la fois : celle qui est en l'air se pose tout de suite
  function poserTout(t){ for (let j = 0; j < 4; j++) if (fait[j] !== null && t - fait[j] < TP) fait[j] = t - TP - T_SC - 1; }

  M.taille = (w, h, dpr) => { W = w; H = h; DPR = dpr || 1; layout(); };
  M.frame = frame;
  M.etat = (liste, boucle) => {
    const Lq = (liste || []).filter(i => i >= 0 && i < 4);
    remise();
    for (const i of Lq) fait[i] = -1e9;
    if (boucle && Lq.length === 4){ tS = -1e9; rise = 1; griffes = 1; }
    maj();
  };
  M.faire = i => {
    if (i < 0 || i > 3 || fait[i] !== null) return;
    const t = maintenant();
    poserTout(t);
    fait[i] = t;
    maj();
  };
  M.retirer = i => {
    if (i < 0 || i > 3 || fait[i] === null) return;
    fait[i] = null;
    if (tS !== null){ tS = null; embruns = null; geoOk = false; job = null; }
    sale = true;
    maj();
  };
  M.boucler = () => {
    if (tS === null && fait.every(a => a !== null)){
      const t = maintenant();
      poserTout(t);
      tS = t; embruns = null;
      maj();
    }
  };
  M.faits = () => [0, 1, 2, 3].filter(i => fait[i] !== null);
  M.boucle = () => tS !== null;
  M.aller = n => { n = max(0, min(5, n | 0)); M.etat([0, 1, 2, 3].slice(0, min(n, 4)), n === 5); };
  M.geste = i => {
    if (i !== undefined) return M.faire(i);
    const t = maintenant();
    if (t - dernierGeste < 900) return;
    dernierGeste = t;
    if (tS !== null){ seed = (seed*7 + 13) % 99991; remise(); construire(); maj(); return; }
    if (fait.every(a => a !== null)) return M.boucler();
    M.faire([0, 1, 2, 3].find(q => fait[q] === null));
  };
  M.tap = (x, y) => {
    const u = x - IX, v = y - IY;
    if (u < 0 || u > IW || v < yh || v > IH) return;
    let best = 1, bd = 1e9;
    for (let i = 1; i < NR; i++){ const d = abs(moyY(i) - v); if (d < bd){ bd = d; best = i; } }
    const t = maintenant();
    for (const di of [-1, 0, 1]){
      const i = best + di;
      if (i < 1 || i >= NR) continue;
      const sc = F/ROWS[i].z, lam = IW*.16/sc, k = TAU/lam, cp = sqrt(9.81/k);
      ondes.push({ i, X: (u - IW/2)/sc, t0: t + abs(di)*140, A: 11/sc, f: di ? .55 : 1, k, cp, cg: cp/2, sig: lam*.9, acc: 6 });
    }
    const lam = IW*.16/(F/ROWS[best].z);
    temp = { txt: "onde · λ " + lam.toFixed(1) + " m · c_g " + (sqrt(9.81*lam/TAU)/2).toFixed(1) + " m/s", fin: t + 2600 };
  };
  M.glisse = (dx, dy) => {
    const t = maintenant();
    let j = 5, best = -1e18;
    for (let q = 0; q < 5; q++){ const a = tP(q); if (a !== null && fini(q, t) && a > best){ best = a; j = q; } }
    const q = REG[j];
    q.ox = clamp(q.ox + dx*.45, -16, 16); q.oy = clamp(q.oy + dy*.45, -16, 16); q.vx = q.vy = 0;
    temp = { txt: "repérage · " + (j === 5 ? "keyban" : j === 4 ? "bokashi" : PR[j].nom) + " décalé de " + round(hypot(q.ox, q.oy)) + " px", fin: t + 1500 };
  };
  construire(); layout(); maj();
  return M;
}
window.ETUDE = etude_estampe3;
