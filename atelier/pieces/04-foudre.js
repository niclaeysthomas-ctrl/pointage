/* ======================= Tour 1, pièce 04 : LA FOUDRE (etude_foudre) ======================= */
/* Ce qu'on voit : un ciel d'orage gris en haut, la terre plate en bas, et un marcheur minuscule pour l'échelle. Dans le nuage,
   quatre points couvent : tes quatre priorités. Chaque priorité faite lâche un traceur : un éclair qui descend par bonds,
   se ramifie, hésite, et s'arrête dans le vide ; ses branches restent, blanches à la naissance puis gravées en gris.
   L'arbre grandit à chaque geste et s'approche du sol.
   La loi : le modèle de claquage diélectrique (Niemeyer, Pietronero et Wiesmann, 1984). Le potentiel électrique φ entre le
   nuage (φ = 0, comme tout l'éclair déjà formé) et le sol (φ = 1) est calculé par l'équation de Laplace (relaxation de
   Gauss-Seidel sur une grille) ; l'éclair pousse d'une case voisine choisie avec la probabilité φ^η : il va là où le champ
   est le plus fort, et c'est ce qui le ramifie comme une vraie foudre.
   La main : la photo d'orage de nuit, en noir et blanc ; un halo large et un trait fin pour chaque branche.
   L'usage : « Ta journée ». Un traceur par priorité ; la journée bouclée, c'est l'éclair qui touche terre.
   Le doigt : toucher le ciel fait gronder un éclair de chaleur dans le nuage ; glisser fait passer la pluie de biais.
   Le seuil (Boucler) : le dernier traceur touche le sol ; l'arc en retour remonte le chemin jusqu'au nuage, tout l'écran
   blanchit, puis la figure entière reste gravée dans le ciel (comme une figure de Lichtenberg). « Encore » : un autre orage.
   Le téléphone : une grille de 72 colonnes ; trois passes de relaxation et quelques cases par image ; ≤ 2 500 traits. */
const etude_foudre_DONNEES = JOURNEE;

function etude_foudre(){
  const D = etude_foudre_DONNEES;
  let W = 390, H = 760, seed = 1984, R = graine(seed);
  const NX = 72; let NY = 120, c = 5.4, y0 = 120, phi, occ, parent, age, enfants, liste = [];
  let etape = 0, tG = [-1e9, -1e9, -1e9, -1e9], tSeuil = -1e9, aPousser = 0, touche = -1, tTouche = -1e9, pluie = .2, dernier = 0, chaleur = -1e9, chX = 0;
  const M = { titre: "LA FOUDRE", bouton: libelleGeste(0), ligne: ligneGeste(0), dprMax: 1.5 };
  const ETA = 1.7;

  function grille(){
    R = graine(seed);
    c = W / NX; y0 = H * .17; NY = Math.floor((H * .8 - y0) / c);
    phi = new Float32Array(NX * NY); occ = new Uint8Array(NX * NY); parent = new Int32Array(NX * NY).fill(-1); age = new Float64Array(NX * NY); enfants = new Uint16Array(NX * NY);
    for (let j = 0; j < NY; j++) for (let i = 0; i < NX; i++) phi[j * NX + i] = j / (NY - 1);
    liste = []; touche = -1;
    // les quatre racines dans le nuage : une par priorité
    D.priorites.forEach((p, k) => { const i = Math.round(NX * (.18 + k * .21 + (R() - .5) * .06)); const id = i; occ[id] = 1; phi[id] = 0; age[id] = -1e9; liste.push(id); });
  }
  function relaxer(passes){
    for (let n = 0; n < passes; n++)
      for (let j = 1; j < NY - 1; j++) for (let i = 0; i < NX; i++){ const id = j * NX + i; if (occ[id]) continue;
        const g = i > 0 ? phi[id - 1] : phi[id + 1], d = i < NX - 1 ? phi[id + 1] : phi[id - 1];
        phi[id] = phi[id] + 1.6 * ((g + d + phi[id - NX] + phi[id + NX]) * .25 - phi[id]); }   // sur-relaxation
  }
  // un pas de croissance : on choisit une case voisine de l'éclair, avec la probabilité φ^η
  function pousser(t, versRacine){
    const cand = [], poids = []; let tot = 0;
    for (const id of liste){ const i = id % NX, j = (id / NX) | 0;
      for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, 1]]){ const a = i + di, b = j + dj; if (a < 0 || a >= NX || b < 0 || b >= NY) continue;
        const n = b * NX + a; if (occ[n]) continue; if (versRacine >= 0 && racine(id) !== versRacine) continue;
        const w = Math.pow(Math.max(0, phi[n]), ETA) * (dj === 1 ? 1.15 : 1); if (w <= 0) continue; cand.push([n, id]); poids.push(w); tot += w; } }
    if (!cand.length) return false;
    let r = R() * tot, k = 0; while (r > poids[k] && k < poids.length - 1){ r -= poids[k]; k++; }
    const [n, p] = cand[k]; occ[n] = 1; phi[n] = 0; parent[n] = p; age[n] = t; liste.push(n);
    for (let q = p; q >= 0; q = parent[q]) enfants[q]++;
    if (((n / NX) | 0) >= NY - 1){ touche = n; tTouche = t; }
    return true;
  }
  function racine(id){ while (parent[id] >= 0) id = parent[id]; return id; }
  const pos = id => [(id % NX + .5) * c, y0 + (((id / NX) | 0) + .5) * c];
  grille();

  function frame(ctx, t){
    const dt = dernier ? Math.min(.05, (t - dernier) / 1000) : 1 / 60; dernier = t;
    relaxer(3);
    // la croissance : le traceur du geste en cours pousse par bonds (plusieurs cases d'un coup, puis une pause)
    if (aPousser > 0 && touche < 0){ const bond = tSeuil > 0 ? 9 : (t / 120 | 0) % 3 === 0 ? 2 : 0;
      for (let k = 0; k < bond && aPousser > 0; k++){ if (!pousser(t, etape <= 4 && tSeuil < 0 ? liste[Math.min(etape, 4) - 1] : -1)) { aPousser = 0; break; } aPousser--; } }
    if (tSeuil > 0 && touche < 0 && aPousser <= 0) aPousser = 400;   // le seuil : on pousse jusqu'au sol
    const flash = touche >= 0 ? Math.max(0, 1 - (t - tTouche) / 900) : 0, apres = touche >= 0 ? lisse((t - tTouche - 300) / 1800) : 0;

    // le ciel : un dégradé d'orage, le nuage plus clair quand il est éclairé de l'intérieur
    const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, rgb(mix([30, 31, 37], BLANC, flash * .7))); g.addColorStop(.3, rgb(mix([21, 22, 27], BLANC, flash * .4))); g.addColorStop(1, rgb(FOND));
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    const ch = clamp(1 - (t - chaleur) / 700);
    if (ch > 0){ const rg = ctx.createRadialGradient(chX, y0 * .6, 0, chX, y0 * .6, 160); rg.addColorStop(0, rgb(BLANC, .35 * ch)); rg.addColorStop(1, rgb(BLANC, 0)); ctx.fillStyle = rg; ctx.fillRect(0, 0, W, y0 * 2); }
    // le nuage : des volutes de bruit, plus sombres en dessous
    const N = bruit2(seed + 5);
    for (let k = 0; k < 90; k++){ const x = (k * 37 % 97) / 97 * W, y = y0 * (.2 + (k * 53 % 89) / 89 * .9), r = 30 + N(k * .7, 3) * 50;
      ctx.fillStyle = rgb(mix([40, 41, 48], BLANC, flash * .5), .08 + .05 * N(k, 1)); ctx.beginPath(); ctx.arc(x + Math.sin(t / 9000 + k) * 6, y, r, 0, 7); ctx.fill(); }
    // la pluie
    ctx.strokeStyle = rgb(GRIS, .16); ctx.lineWidth = .6; ctx.beginPath(); const Rp = graine(((t / 70) | 0));
    for (let k = 0; k < 70; k++){ const x = Rp() * W, y = y0 + Rp() * (H - y0); ctx.moveTo(x, y); ctx.lineTo(x + pluie * 14, y + 14); } ctx.stroke();
    // l'éclair : chaque segment de son parent à lui ; plus épais quand beaucoup de branches passent par lui
    const chemin = new Set(); if (touche >= 0){ const u = clamp((t - tTouche) / 260); let q = touche, n = 0; const L = []; while (q >= 0){ L.push(q); q = parent[q]; } L.slice(0, Math.ceil(L.length * u)).forEach(x => chemin.add(x)); }
    ctx.lineCap = "round";
    for (let pass = 0; pass < 2; pass++){
      for (const id of liste){ const p = parent[id]; if (p < 0) continue;
        const a = pos(p), b = pos(id), jeune = clamp(1 - (t - age[id]) / 1400), e = Math.min(4, .6 + Math.sqrt(enfants[id] + 1) * .32), dans = chemin.has(id);
        const lum = clamp(.45 + jeune * .55 + (dans ? .6 : 0) + flash * .5 + apres * .15);
        if (pass === 0){ if (jeune < .05 && !dans && flash <= 0 && apres <= 0) continue; ctx.strokeStyle = rgb(BLANC_PUR, .12 * lum); ctx.lineWidth = e * 5 + (dans ? 10 * flash : 0); }
        else { ctx.strokeStyle = rgb(mix(GRIS_CLAIR, BLANC_PUR, lum), .5 + .5 * lum); ctx.lineWidth = e * (dans ? 1.8 + 2 * flash : 1); }
        ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); } }
    // les racines dans le nuage : une lueur qui couve, plus forte quand la priorité a parlé
    D.priorites.forEach((p, k) => { const q = pos(liste[k]), on = tG[k] > 0 ? 1 : 0, br = .25 + .25 * Math.sin(t / 500 + k) + .5 * on;
      const rg = ctx.createRadialGradient(q[0], q[1], 0, q[0], q[1], 26); rg.addColorStop(0, rgb(BLANC_PUR, .35 * br)); rg.addColorStop(1, rgb(BLANC_PUR, 0)); ctx.fillStyle = rg; ctx.fillRect(q[0] - 26, q[1] - 26, 52, 52); });
    // le sol et le marcheur (l'échelle)
    const sol = y0 + NY * c;
    ctx.fillStyle = rgb(mix([10, 10, 13], BLANC, flash * .25)); ctx.fillRect(0, sol, W, H - sol);
    ctx.strokeStyle = rgb(GRIS, .6); ctx.lineWidth = .8; ctx.beginPath(); ctx.moveTo(0, sol); ctx.lineTo(W, sol); ctx.stroke();
    const mx = W * .72; ctx.fillStyle = rgb(GRIS_CLAIR, .8); ctx.fillRect(mx, sol - 7, 1.4, 5); ctx.beginPath(); ctx.arc(mx + .7, sol - 8.5, 1.3, 0, 7); ctx.fill(); ctx.fillRect(mx - .6, sol - 2, .8, 2); ctx.fillRect(mx + 1.2, sol - 2, .8, 2);
    // l'éclat de l'arc en retour : tout l'écran blanchit
    if (flash > 0){ ctx.fillStyle = rgb(BLANC_PUR, .55 * flash * flash); ctx.fillRect(0, 0, W, H); }
    if (touche >= 0){ const q = pos(touche); const rg = ctx.createRadialGradient(q[0], sol, 0, q[0], sol, 90); rg.addColorStop(0, rgb(BLANC_PUR, .5 * (flash + apres * .3))); rg.addColorStop(1, rgb(BLANC_PUR, 0)); ctx.fillStyle = rg; ctx.fillRect(q[0] - 90, sol - 90, 180, 180); }
    passeGrain(ctx, W, H, t, .05);
    fondu(ctx, W, H, FOND, .9);
  }

  function geste(){
    const t = maintenant();
    if (etape >= 5){ seed += 23; grille(); etape = 0; tG = [-1e9, -1e9, -1e9, -1e9]; tSeuil = -1e9; aPousser = 0; M.bouton = libelleGeste(0); M.ligne = ligneGeste(0); return; }
    if (aPousser > 0) return;
    if (etape < 4){ tG[etape] = t; aPousser = 75 + etape * 20; }
    else { tSeuil = t; aPousser = 400; }
    etape++; M.bouton = libelleGeste(etape); M.ligne = ligneGeste(etape);
  }
  M.taille = (w, h) => { const ch = Math.abs(w - W) > 2 || Math.abs(h - H) > 2; W = w; H = h; if (ch){ grille(); etape = 0; tG = [-1e9, -1e9, -1e9, -1e9]; tSeuil = -1e9; M.bouton = libelleGeste(0); M.ligne = ligneGeste(0); } };
  M.frame = frame; M.geste = geste;
  M.tap = (x) => { chaleur = maintenant(); chX = x; };
  M.glisse = (dx) => { pluie = clamp(pluie + dx * .01, -1, 1); };
  return M;
}
window.ETUDE = etude_foudre;
