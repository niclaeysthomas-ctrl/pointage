/* ======================= Tour 1, pièce 01 : LA VOÛTE (etude_voute) ======================= */
/* Ce qu'on voit : une nef gravée en blanc sur la nuit. Au repos, quatre chaînes pendent d'une poutre invisible, comme dans la
   maquette funiculaire de Gaudí ; le sol est une trame en perspective. Chaque priorité faite retourne sa chaîne : elle se
   redresse, et les pierres montent une à une le long d'elle, chaque pierre blanche à la pose, puis gravée de hachures.
   La loi : la chaîne qui pend prend la forme d'une caténaire, y = a·cosh(x/a) ; retournée, c'est l'arc qui ne travaille qu'en
   compression (Hooke, 1675 : « comme pend le fil souple, ainsi, renversé, se tiendra l'arc rigide »). Pour chaque arc, a est
   trouvé par dichotomie pour que a·(cosh(S/a) − 1) = la hauteur ; la hauteur vient des minutes de la priorité.
   La main : l'eau-forte, des tailles parallèles, plus serrées du côté de l'ombre (la lumière vient d'en haut à gauche).
   L'usage : « Ta journée ». Un arc par priorité, du fond vers l'avant : le dernier fait est le plus grand.
   Le doigt : toucher un arc le fait sonner (une lumière court le long des pierres) et dit sa priorité ; glisser décale le regard.
   Le seuil (Boucler) : la clé de voûte tombe en place, puis la caméra avance dans une nef sans fin, d'arc en arc, sous une
   lumière qui tombe d'en haut ; elle continue d'avancer, lentement, après. « Encore » : une autre nef (autres hauteurs).
   Le téléphone : tout est en traits (pas d'image cachée) ; au pire 14 arcs × 19 pierres × 4 tailles ≈ 1 100 traits par image. */
const etude_voute_DONNEES = JOURNEE;

function etude_voute(){
  const D = etude_voute_DONNEES;
  let W = 390, H = 760, seed = 1675, R = graine(seed);
  let etape = 0, tG = [-1e9, -1e9, -1e9, -1e9], tSeuil = -1e9, cz = 0, vz = 0, pan = 0, panV = 0, dernier = 0;
  let sonne = { i: -1, t: -1e9 };
  const S = 3.6, EP = .55, CAMH = 1.1, NP = 19;   // demi-portée, épaisseur de l'arc, hauteur de l'œil, pierres par arc
  const M = { titre: "LA VOÛTE", bouton: libelleGeste(0), ligne: ligneGeste(0), dprMax: 1.5 };

  // la caténaire : a tel que a(cosh(S/a) − 1) = h (dichotomie : la fonction décroît quand a croît)
  function aPour(h){ let lo = .05, hi = 200; for (let k = 0; k < 60; k++){ const m = (lo + hi) / 2; (m * (Math.cosh(S / m) - 1) > h) ? lo = m : hi = m; } return (lo + hi) / 2; }
  // les arcs de la journée (profondeurs 13, 10, 7.4, 5.2 : le premier fait est au fond) et ceux de la nef sans fin
  let arcs = [];
  function construire(){
    R = graine(seed);
    arcs = D.priorites.map((p, i) => { const h = 4.6 + p.min / 30 * 2.2 + R() * .4; return { z: [13, 10, 7.4, 5.2][i], h, a: aPour(h), nom: p.nom, min: p.min, jour: true }; });
    for (let k = 0; k < 60; k++){ const h = 5 + R() * 2.4; arcs.push({ z: 16 + k * 2.6, h, a: aPour(h), nom: "", jour: false }); }
  }
  construire();
  const debout = (A, x) => A.h - A.a * (Math.cosh(x / A.a) - 1);   // l'arc retourné, base au sol
  const pendue = (A, x) => (A.h + 1.2) - debout(A, x);               // la même chaîne, qui pend de la poutre

  function proj(x, y, z){ const zz = z - cz; if (zz < .35) return null; const f = W * .62 / zz; return [W / 2 + (x + pan) * f, H * .66 + (CAMH - y) * f, f, zz]; }

  function frame(ctx, t){
    const dt = dernier ? Math.min(.05, (t - dernier) / 1000) : 1 / 60; dernier = t;
    // la caméra : immobile au repos ; au seuil, elle avance (accélère puis garde une marche lente, sans cible)
    if (tSeuil > 0){ const u = (t - tSeuil) / 1000; vz = u < 1.4 ? 0 : u < 7 ? 3.4 * lisse((u - 1.4) / 1.6) : .55 + 2.85 * (1 - lisse((u - 7) / 2.5)); cz += vz * dt; }
    pan += panV * dt; panV *= Math.pow(.02, dt); pan *= Math.pow(.6, dt);

    ctx.fillStyle = rgb(FOND); ctx.fillRect(0, 0, W, H);
    // la lumière d'en haut, au seuil : un puits pâle au fond de la nef
    const lum = tSeuil > 0 ? lisse((t - tSeuil - 900) / 2200) : 0;
    if (lum > 0){ const g = ctx.createRadialGradient(W / 2, H * .45, 0, W / 2, H * .45, H * .7); g.addColorStop(0, rgb(BLANC, .16 * lum)); g.addColorStop(1, rgb(BLANC, 0)); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }

    // le sol : une trame de dalles qui fuit vers le point de fuite
    ctx.lineWidth = .6;
    for (let x = -7; x <= 7; x += 1.4){ const a = proj(x, 0, cz + .5), b = proj(x, 0, cz + 70); if (!a || !b) continue; ctx.strokeStyle = rgb(TRAIT, .55); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); }
    const z0 = Math.ceil(cz / 1.3) * 1.3;
    for (let z = z0; z < cz + 70; z += 1.3){ const a = proj(-7, 0, z), b = proj(7, 0, z); if (!a) continue; ctx.strokeStyle = rgb(TRAIT, .55 * clamp(1 - (z - cz) / 60)); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); }

    // les arcs, du plus loin au plus proche
    const vis = arcs.filter(A => A.z - cz > .35 && A.z - cz < 75).sort((p, q) => q.z - p.z);
    for (const A of vis){
      const i = A.jour ? arcs.indexOf(A) : -1;
      let flip = 0, pose = 0;
      if (A.jour){ if (tG[i] > 0){ flip = lisse((t - tG[i]) / 1300); pose = clamp((t - tG[i] - 1100) / 2700); } }
      else { const ap = tSeuil > 0 ? clamp((t - tSeuil - 1200 - (A.z - 16) * 90) / 900) : 0; flip = ap; pose = ap; }
      if (!A.jour && flip <= 0) continue;
      dessinerArc(ctx, A, flip, pose, t, i);
    }
    // la clé de voûte au seuil : un éclat au sommet de l'arc de devant
    if (tSeuil > 0){ const u = (t - tSeuil) / 900; if (u < 1.6){ const A = arcs[3], p = proj(0, A.h + EP * .5, A.z); if (p){ const r = 4 + 40 * u; ctx.strokeStyle = rgb(BLANC_PUR, .9 * (1 - u / 1.6)); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(p[0], p[1], r, 0, 7); ctx.stroke(); } } }
    passeGrain(ctx, W, H, t, .05);
    fondu(ctx, W, H, FOND, .86);
  }

  function dessinerArc(ctx, A, flip, pose, t, i){
    const loin = clamp(1 - (A.z - cz - 4) / 70);   // la brume : plus pâle au loin
    // les points de la courbe (intrados), entre la chaîne pendue et l'arc debout
    const N = 36, pts = [], ext = [];
    for (let k = 0; k <= N; k++){
      const x = -S + 2 * S * k / N, y = pendue(A, x) * (1 - flip) + debout(A, x) * flip;
      // la normale, pour l'épaisseur de l'arc (seulement une fois redressé)
      const d = .01, y2 = pendue(A, x + d) * (1 - flip) + debout(A, x + d) * flip, tx = d, ty = y2 - y, l = Math.hypot(tx, ty) || 1;
      const e = EP * flip, sg = flip > .5 ? 1 : -1;
      pts.push(proj(x, y, A.z)); ext.push(proj(x - ty / l * e * sg, y + tx / l * e * sg, A.z));
    }
    if (pts.some(p => !p)) return;
    // la chaîne : tant que les pierres ne sont pas posées, on voit ses maillons
    if (pose < 1){
      ctx.strokeStyle = rgb(GRIS_CLAIR, (.35 + .4 * flip) * loin * (1 - pose)); ctx.lineWidth = 1; ctx.setLineDash([2, 3]);
      ctx.beginPath(); pts.forEach((p, k) => k ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.setLineDash([]);
      if (flip === 0){ const a = proj(-S, A.h + 1.2, A.z), b = proj(S, A.h + 1.2, A.z); ctx.strokeStyle = rgb(GRIS, .3 * loin); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); }
    }
    if (pose <= 0) return;
    // les pierres : posées de la base vers la clé, en alternant les deux côtés (comme sur un chantier)
    const posees = pose * NP;
    for (let s = 0; s < NP; s++){
      const ordre = s < NP / 2 ? s * 2 : (NP - 1 - s) * 2 + 1;   // rang de pose : base gauche, base droite, …, clé
      const age = posees - ordre / NP * NP * .96;
      if (age <= 0) continue;
      const k0 = Math.round(s * N / NP), k1 = Math.round((s + 1) * N / NP);
      const P = [pts[k0], pts[k1], ext[k1], ext[k0]];
      const blanc = clamp(1 - age / 3);   // la pierre arrive blanche, puis refroidit en gravure
      const cote = (s + .5) / NP < .5 ? 0 : 1, ombre = cote ? .62 : .32;
      ctx.strokeStyle = rgb(mix(GRIS_CLAIR, BLANC_PUR, blanc), (.55 + .45 * blanc) * loin); ctx.lineWidth = Math.max(.5, .9 * Math.min(1.4, P[0][2] / 80));
      ctx.beginPath(); P.forEach((p, k) => k ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.stroke();
      // les tailles : parallèles à la courbe, plus nombreuses du côté de l'ombre
      const nt = 1 + Math.round(ombre * 4 * Math.min(1, P[0][2] / 40));
      ctx.strokeStyle = rgb(GRIS, .7 * loin); ctx.lineWidth = .5;
      for (let h = 1; h <= nt; h++){ const u = h / (nt + 1);
        ctx.beginPath(); ctx.moveTo(P[0][0] + (P[3][0] - P[0][0]) * u, P[0][1] + (P[3][1] - P[0][1]) * u); ctx.lineTo(P[1][0] + (P[2][0] - P[1][0]) * u, P[1][1] + (P[2][1] - P[1][1]) * u); ctx.stroke(); }
      if (blanc > 0){ ctx.fillStyle = rgb(BLANC_PUR, .25 * blanc * loin); ctx.beginPath(); P.forEach((p, k) => k ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.fill(); }
    }
    // l'arc qui sonne : une lumière qui court de la base gauche à la droite
    if (i >= 0 && sonne.i === i){ const u = (t - sonne.t) / 1400; if (u < 1){ const k = Math.round(u * N); const p = pts[k], q = ext[k];
      ctx.strokeStyle = rgb(BLANC_PUR, 1 - u); ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); ctx.stroke(); } }
    // le nom, gravé au sol au pied de l'arc
    if (A.jour && pose > .9){ const p = proj(i % 2 ? S + .9 : -S - .9, 0, A.z); if (p){ ctx.fillStyle = rgb(GRIS_CLAIR, .8 * clamp((pose - .9) * 10) * loin);
      ctx.font = `${Math.max(8, Math.min(13, p[2] / 9)) | 0}px Georgia, serif`; ctx.textAlign = i % 2 ? "left" : "right"; ctx.fillText(A.nom.toUpperCase().split("").join(" "), clamp(p[0], 10 + (i % 2 ? 0 : 90), W - 10 - (i % 2 ? 90 : 0)), p[1] + 4); ctx.textAlign = "left"; } }
  }

  function geste(){
    const t = maintenant();
    if (etape >= 5){ seed += 7; construire(); etape = 0; tG = [-1e9, -1e9, -1e9, -1e9]; tSeuil = -1e9; cz = 0; vz = 0; M.bouton = libelleGeste(0); M.ligne = ligneGeste(0); return; }
    if (etape < 4){ if (etape > 0 && t - tG[etape - 1] < 1500) return; tG[etape] = t; }
    else { if (t - tG[3] < 2500) return; tSeuil = t; }
    etape++; M.bouton = libelleGeste(etape); M.ligne = ligneGeste(etape);
  }
  M.taille = (w, h) => { W = w; H = h; };
  M.frame = frame; M.geste = geste;
  M.tap = (x, y) => {
    let best = -1, bd = 1e9;
    for (let i = 0; i < 4; i++){ if (maintenant() - tG[i] < 3000 || tG[i] < 0) continue; const A = arcs[i], p = proj(0, A.h * .6, A.z); if (!p) continue; const d = Math.abs(x - p[0]) * .3 + Math.abs(y - p[1]) - p[2] * 3; if (d < bd){ bd = d; best = i; } }
    if (best >= 0){ sonne = { i: best, t: maintenant() }; M.ligne = arcs[best].nom + " · " + arcs[best].min + " min"; }
  };
  M.glisse = (dx) => { panV += dx * .02; };
  return M;
}
window.ETUDE = etude_voute;
