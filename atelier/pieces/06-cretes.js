/* ======================= Tour 1, pièce 06 : LES CRÊTES DU MOIS (etude_cretes) ======================= */
/* Ce qu'on voit : vingt-neuf lignes blanches empilées, comme le relevé du pulsar CP 1919 (Jocelyn Bell, 1967). Chaque ligne
   est un jour : la plus haute est il y a vingt-huit jours, la plus basse est aujourd'hui. Les pics d'un jour sont ses
   priorités faites ; un jour plein a quatre pics nets, un jour manqué est presque plat et plus gris. Au repos, la ligne
   d'aujourd'hui est plate et respire à peine. Chaque priorité faite lève un pic à sa place sur la ligne du jour : il monte,
   et une onde court le long de la ligne jusqu'aux bords, puis se calme ; les jours de derrière frémissent un instant.
   La loi : chaque relief est une somme de gaussiennes (une par priorité faite) ; la ligne du jour est une corde : son
   mouvement suit l'équation des ondes amortie, ∂²u/∂t² = c²·∂²u/∂x² − γ·∂u/∂t, résolue en différences finies. Les lignes de
   derrière cachent celles qu'elles couvrent (algorithme du peintre).
   La main : le relevé scientifique, le trait blanc fin sur le noir, aucune couleur.
   L'usage : « Ta journée » dans son mois. Ce que tu fais aujourd'hui s'ajoute à la pile.
   Le doigt : toucher une ligne la fait vibrer et dit son jour ; glisser incline la pile.
   Le seuil (Boucler) : le dernier pic monte, puis une lumière remonte la pile d'aujourd'hui vers le passé, ligne après ligne ;
   la pile bascule en perspective, comme une chaîne de montagnes vue de face : la chaîne de tes jours. Elle reste ainsi.
   Le téléphone : 29 lignes × 120 points ; une corde de 240 points intégrée 8 fois par image. */
const etude_cretes_DONNEES = JOURNEE;

function etude_cretes(){
  const D = etude_cretes_DONNEES;
  let W = 390, H = 760, seed = 1967;
  const NP = 120, NC = 240; let u, up, cible, jours = [], tG = [-1e9, -1e9, -1e9, -1e9], tSeuil = -1e9, etape = 0, bascule = 0, inclMain = 0, dernier = 0;
  let vibre = { k: -1, t: -1e9 }, fremit = -1e9;
  const M = { titre: "LES CRÊTES DU MOIS", bouton: libelleGeste(0), ligne: ligneGeste(0), dprMax: 1.5 };
  const POS = [.22, .41, .6, .79];

  function construire(){
    const R = graine(seed);
    // chaque jour passé : ses pics (une gaussienne par priorité faite), placés près de la place de la priorité
    jours = D.jours.map((n, k) => { const faits = [0, 1, 2, 3].sort(() => R() - .5).slice(0, n);
      return { n, pics: faits.map(i => ({ x: POS[i] + (R() - .5) * .05, h: .7 + R() * .5, s: .025 + R() * .02 })), bruit: R() * 100 }; });
    u = new Float32Array(NC); up = new Float32Array(NC); cible = new Float32Array(NC);
  }
  construire();
  const gauss = (x, P) => P.reduce((a, p) => a + p.h * Math.exp(-((x - p.x) * (x - p.x)) / (2 * p.s * p.s)), 0);
  // la corde du jour : u tend vers son relief cible (les pics levés), avec onde et amortissement
  function corde(n){
    const c2 = .22, g = .02, raideur = .006;
    for (let s = 0; s < n; s++){ const nu = new Float32Array(NC);
      for (let i = 1; i < NC - 1; i++){ const acc = c2 * (u[i - 1] + u[i + 1] - 2 * u[i]) + raideur * (cible[i] - u[i]);
        nu[i] = u[i] + (u[i] - up[i]) * (1 - g) + acc; }
      up = u; u = nu; }
  }
  function lever(i, t){ const p = { x: POS[i], h: 1.05, s: .03 };
    for (let k = 0; k < NC; k++){ const x = k / (NC - 1); cible[k] += p.h * Math.exp(-((x - p.x) ** 2) / (2 * p.s * p.s)); }
    // l'impulsion : la corde reçoit un coup à cet endroit, qui part en onde des deux côtés
    for (let k = 0; k < NC; k++){ const x = k / (NC - 1); up[k] -= .09 * Math.exp(-((x - p.x) ** 2) / (2 * .012 * .012)); }
    fremit = t;
  }

  function frame(ctx, t){
    const dt = dernier ? Math.min(.05, (t - dernier) / 1000) : 1 / 60; dernier = t;
    corde(8);
    if (tSeuil > 0) bascule = lisse((t - tSeuil - 1800) / 3200);
    const L = 29, haut = H * .2, bas = H * .78, x0 = W * .09, x1 = W * .91;
    ctx.fillStyle = rgb(FOND); ctx.fillRect(0, 0, W, H);
    // la lumière qui remonte la pile au seuil
    const front = tSeuil > 0 ? (t - tSeuil - 900) / 1400 * 29 : -99;
    for (let k = 0; k < L; k++){
      // k = 0 : il y a 28 jours (en haut) ; k = 28 : aujourd'hui (en bas)
      const ageL = (L - 1 - k), z = ageL / (L - 1);
      // la perspective du seuil : les lignes du fond se rapprochent et rétrécissent, la pile se dresse
      const incl = bascule * .62 + inclMain;
      const yBase = haut + (bas - haut) * Math.pow(k / (L - 1), 1 + incl * 1.4);
      const larg = 1 - z * incl * .45, cx = W / 2, amp = (H * .085) * (1 + incl * .5) * (1 - z * incl * .35);
      const pts = [];
      const allume = clamp(front - ageL) * clamp(1 - (front - ageL - 6) / 8 + .55);
      const vib = vibre.k === k ? Math.exp(-(t - vibre.t) / 600) * Math.sin((t - vibre.t) / 45) * 6 : 0;
      const fr = k < L - 1 ? Math.exp(-(t - fremit) / 500) * Math.sin((t - fremit) / 60 - ageL * .6) * 1.6 * Math.exp(-ageL * .15) : 0;
      for (let i = 0; i < NP; i++){ const x = i / (NP - 1);
        let h;
        if (k === L - 1){ const ci = x * (NC - 1), a = Math.floor(ci), f = ci - a; h = u[a] * (1 - f) + (u[Math.min(NC - 1, a + 1)] || 0) * f;
          h = h * 1.35 + .015 * Math.sin(t / 700 + x * 30); }   // la ligne du jour respire
        else { const J = jours[k]; h = gauss(x, J.pics) * (.55 + J.n * .12) + .03 * Math.sin(J.bruit + x * 40) * Math.sin(x * 3.14); }
        h *= Math.sin(Math.PI * x) ** .5;   // les bords restent calmes, comme sur le relevé
        pts.push([cx + (x0 + (x1 - x0) * x - cx) * larg, yBase - h * amp + (vib + fr) * Math.sin(x * 9 + t / 90) * Math.sin(Math.PI * x)]); }
      // la ligne cache ce qui est derrière : on remplit dessous avec le fond, puis on trace
      ctx.fillStyle = rgb(FOND); ctx.beginPath(); ctx.moveTo(pts[0][0], H); pts.forEach(p => ctx.lineTo(p[0], p[1])); ctx.lineTo(pts[NP - 1][0], H); ctx.closePath(); ctx.fill();
      const plein = k === L - 1 ? etape >= 4 : jours[k].n === 4;
      const coul = mix(plein ? GRIS_CLAIR : GRIS, BLANC_PUR, clamp(allume + (k === L - 1 ? .4 + .15 * etape : 0)));
      ctx.strokeStyle = rgb(coul, (plein ? .85 : .55) * (1 - z * .25) + allume * .2); ctx.lineWidth = k === L - 1 ? 1.8 : 1; ctx.lineJoin = "round";
      ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
      if (allume > .3 && k % 7 === 0){ ctx.fillStyle = rgb(BLANC, .4 * allume); ctx.font = "9px ui-monospace, monospace"; ctx.fillText("J-" + ageL, 6, yBase + 3); }
    }
    // la légende du jour : les quatre places, sous la dernière ligne
    D.priorites.forEach((p, i) => { const x = x0 + (x1 - x0) * POS[i], on = tG[i] > 0;
      ctx.fillStyle = rgb(on ? BLANC : GRIS, on ? .85 : .45); ctx.font = "9px Georgia, serif"; ctx.textAlign = "center"; ctx.fillText(p.nom.toUpperCase(), x, bas + 22); ctx.textAlign = "left"; });
    ctx.fillStyle = rgb(GRIS, .6); ctx.font = "9px ui-monospace, monospace"; ctx.fillText("CP 1919 · 28 jours", x0, haut - 64);
    passeGrain(ctx, W, H, t, .045);
    fondu(ctx, W, H, FOND, .9);
  }

  function geste(){
    const t = maintenant();
    if (etape >= 5){ seed += 31; construire(); etape = 0; tG = [-1e9, -1e9, -1e9, -1e9]; tSeuil = -1e9; bascule = 0; M.bouton = libelleGeste(0); M.ligne = ligneGeste(0); return; }
    if (etape > 0 && etape <= 4 && t - tG[etape - 1] < 1300) return;
    if (etape < 4){ tG[etape] = t; lever(etape, t); }
    else { tSeuil = t; for (let k = 0; k < NC; k++) up[k] -= .05 * Math.sin(k / (NC - 1) * Math.PI); fremit = t; }
    etape++; M.bouton = libelleGeste(etape); M.ligne = ligneGeste(etape);
  }
  M.taille = (w, h) => { W = w; H = h; };
  M.frame = frame; M.geste = geste;
  M.tap = (x, y) => { const haut = H * .2, bas = H * .78, k = Math.round((y - haut) / (bas - haut) * 28); if (k < 0 || k > 28) return;
    vibre = { k, t: maintenant() }; const n = k === 28 ? Math.min(etape, 4) : jours[k].n; M.ligne = (k === 28 ? "aujourd'hui" : "J-" + (28 - k)) + " · " + n + " sur 4"; };
  M.glisse = (dx, dy) => { inclMain = clamp(inclMain - dy * .003, -.2, .5); };
  return M;
}
window.ETUDE = etude_cretes;
