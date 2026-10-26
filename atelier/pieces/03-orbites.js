/* ======================= Tour 1, pièce 03 : LES ORBITES (etude_orbites) ======================= */
/* Ce qu'on voit : une étoile pâle au centre, quatre orbites en pointillés, inclinées comme vues d'un peu au-dessus, et un anneau
   de vingt-huit pierres : les jours du mois, plus blanches quand la journée était pleine. Au repos, rien ne tourne encore.
   Chaque priorité faite allume sa planète : elle part de son périhélie et file sur son ellipse, vite près de l'étoile, lente au
   loin, et laisse une traînée de pose longue ; son orbite passe du pointillé au trait plein. Le système se remplit.
   La loi : les lois de Kepler. Chaque planète a son ellipse (excentricité tirée de sa série de jours) ; sa position se calcule
   en résolvant l'équation de Kepler M = E − e·sin E par la méthode de Newton ; la période suit T ∝ a^(3/2).
   La main : la photographie de pose longue, des traînées d'argent, la poussière d'étoiles fixe.
   L'usage : « Ta journée ». Quatre planètes, quatre priorités ; l'anneau garde la mémoire des vingt-huit jours.
   Le doigt : toucher une planète la nomme ; glisser vers le haut ou le bas incline le système.
   Le seuil (Boucler) : le temps accélère jusqu'au prochain alignement des quatre planètes (cherché vraiment, dans l'avenir du
   système) ; quand elles s'alignent, un rayon traverse tout l'écran depuis l'étoile, la couronne s'ouvre en longues aigrettes,
   et les jours de l'anneau s'allument un à un. L'alignement reste. « Encore » : un autre système.
   Le téléphone : une seule toile cachée (les traînées) ; le reste en traits ; la recherche d'alignement se fait une fois (≈ 3 ms). */
const etude_orbites_DONNEES = JOURNEE;

function etude_orbites(){
  const D = etude_orbites_DONNEES;
  let W = 390, H = 760, dpr = 1.5, seed = 1609, pose = null, px = null;
  let etape = 0, tG = [-1e9, -1e9, -1e9, -1e9], tSeuil = -1e9, sim = 0, simCible = 0, simDepart = 0, incl = .74, dernier = 0;
  let pl = [], etoiles = [], nomme = { i: -1, t: -1e9 };
  const M = { titre: "LES ORBITES", bouton: libelleGeste(0), ligne: ligneGeste(0), dprMax: 1.5 };

  function systeme(){
    const R = graine(seed);
    pl = D.priorites.map((p, i) => ({ nom: p.nom, min: p.min, a: .25 + i * .17, e: clamp(.06 + p.serie * .016 + R() * .05, 0, .42), w: R() * 6.28, M0: R() * 6.28, T: 0 }));
    pl.forEach(p => p.T = 7 * Math.pow(p.a / pl[0].a, 1.5));   // troisième loi : T ∝ a^(3/2)
    etoiles = Array.from({ length: 220 }, () => [R(), R(), R() * R()]);
  }
  systeme();
  const echelle = () => Math.min(W * .5, H * .42);
  function position(p, s){
    const Mm = p.M0 + 6.2832 * s / p.T; let E = Mm;
    for (let k = 0; k < 8; k++) E -= (E - p.e * Math.sin(E) - Mm) / (1 - p.e * Math.cos(E));   // Newton sur l'équation de Kepler
    const nu = 2 * Math.atan2(Math.sqrt(1 + p.e) * Math.sin(E / 2), Math.sqrt(1 - p.e) * Math.cos(E / 2)), r = p.a * (1 - p.e * Math.cos(E));
    return { lon: nu + p.w, r };
  }
  const versEcran = (lon, r) => [W / 2 + Math.cos(lon) * r * echelle(), H * .46 + Math.sin(lon) * r * echelle() * incl];
  // l'alignement : le premier instant à venir où les quatre longitudes tiennent dans un même demi-axe (écart < 9°)
  function chercherAlignement(depuis){
    let best = depuis, bv = 9;
    for (let s = depuis + 3; s < depuis + 4000; s += .04){
      const L = pl.map(p => { let l = position(p, s).lon % 6.2832; return l < 0 ? l + 6.2832 : l; });
      const c = Math.atan2(L.reduce((a, l) => a + Math.sin(l), 0), L.reduce((a, l) => a + Math.cos(l), 0));
      let v = 0; L.forEach(l => { const d = Math.abs(Math.atan2(Math.sin(l - c), Math.cos(l - c))); v = Math.max(v, d); });
      if (v < .16){ return s; } if (v < bv){ bv = v; best = s; }
    }
    return best;
  }
  function nouvellePose(){ [pose, px] = toile(W, H, dpr); }

  function frame(ctx, t){
    const dt = dernier ? Math.min(.05, (t - dernier) / 1000) : 1 / 60; dernier = t;
    if (!pose) nouvellePose();
    const avant = sim;
    if (tSeuil > 0){ const u = clamp((t - tSeuil) / 4200); sim = simDepart + (simCible - simDepart) * (u < 1 ? (1 - Math.pow(1 - u, 3)) : 1); }
    else if (etape > 0) sim += dt;
    // les traînées : la toile de pose s'efface très lentement ; chaque planète allumée y trace son chemin
    px.save(); px.globalCompositeOperation = "destination-out"; px.fillStyle = `rgba(0,0,0,${tSeuil > 0 && t - tSeuil < 4200 ? .06 : .012})`; px.fillRect(0, 0, W, H); px.restore();
    pl.forEach((p, i) => { if (tG[i] < 0) return;
      const n = tSeuil > 0 && t - tSeuil < 4200 ? 14 : 3;
      px.strokeStyle = rgb(BLANC, tSeuil > 0 && t - tSeuil < 4200 ? .1 : .55); px.lineWidth = 1.1; px.beginPath();
      for (let k = 0; k <= n; k++){ const s = avant + (sim - avant) * k / n, q = position(p, s), e = versEcran(q.lon, q.r); k ? px.lineTo(e[0], e[1]) : px.moveTo(e[0], e[1]); }
      px.stroke(); });

    ctx.fillStyle = rgb(FOND); ctx.fillRect(0, 0, W, H);
    etoiles.forEach(([x, y, b]) => { ctx.fillStyle = rgb(GRIS_CLAIR, .15 + b * .5); ctx.fillRect(x * W, y * H, b > .5 ? 1.4 : .9, b > .5 ? 1.4 : .9); });
    const aligne = tSeuil > 0 ? lisse((t - tSeuil - 3600) / 1400) : 0;
    // le rayon de l'alignement : de l'étoile à travers les quatre planètes, jusqu'au bord
    if (aligne > 0){ const q = position(pl[3], sim), d = [Math.cos(q.lon), Math.sin(q.lon) * incl], l = Math.hypot(d[0], d[1]);
      const g = ctx.createLinearGradient(W / 2, H * .46, W / 2 + d[0] / l * H, H * .46 + d[1] / l * H); g.addColorStop(0, rgb(BLANC_PUR, .7 * aligne)); g.addColorStop(1, rgb(BLANC_PUR, 0));
      ctx.strokeStyle = g; ctx.lineWidth = 1 + 2 * aligne; ctx.beginPath(); ctx.moveTo(W / 2, H * .46); ctx.lineTo(W / 2 + d[0] / l * H * 1.2, H * .46 + d[1] / l * H * 1.2); ctx.stroke(); }
    // l'anneau du mois : vingt-huit pierres, plus blanches quand la journée était pleine ; au seuil elles s'allument une à une
    D.jours.forEach((n, k) => { const lon = -1.5708 + k / 28 * 6.2832, e = versEcran(lon, 1.0), s = n / 4;
      const allume = aligne > 0 ? clamp((t - tSeuil - 4600 - k * 90) / 300) * (n === 4 ? 1 : .4) : 0;
      ctx.fillStyle = rgb(mix(GRIS, BLANC_PUR, clamp(s * .6 + allume)), .35 + s * .45 + allume * .3);
      ctx.beginPath(); ctx.arc(e[0], e[1], 1.6 + s * 1.6 + allume * 1.5, 0, 7); ctx.fill(); });
    // les orbites : pointillé tant que la planète dort, trait plein une fois allumée
    pl.forEach((p, i) => { const on = tG[i] > 0;
      ctx.setLineDash(on ? [] : [2, 5]); ctx.strokeStyle = rgb(on ? GRIS_CLAIR : GRIS, on ? .45 : .35); ctx.lineWidth = .7; ctx.beginPath();
      for (let k = 0; k <= 120; k++){ const E = k / 120 * 6.2832, nu = 2 * Math.atan2(Math.sqrt(1 + p.e) * Math.sin(E / 2), Math.sqrt(1 - p.e) * Math.cos(E / 2)), r = p.a * (1 - p.e * Math.cos(E)), e = versEcran(nu + p.w, r); k ? ctx.lineTo(e[0], e[1]) : ctx.moveTo(e[0], e[1]); }
      ctx.stroke(); ctx.setLineDash([]); });
    ctx.drawImage(pose, 0, 0, W, H);
    // l'étoile et sa couronne (qui s'ouvre au seuil en aigrettes)
    const cr = 14 + 64 * aligne, g = ctx.createRadialGradient(W / 2, H * .46, 0, W / 2, H * .46, cr * 2.2);
    g.addColorStop(0, rgb(BLANC_PUR, .95)); g.addColorStop(.12, rgb(BLANC, .5 + .3 * aligne)); g.addColorStop(1, rgb(BLANC, 0));
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(W / 2, H * .46, cr * 2.2, 0, 7); ctx.fill();
    if (aligne > 0){ ctx.save(); ctx.translate(W / 2, H * .46); ctx.rotate(t / 9000);
      for (let k = 0; k < 16; k++){ const a = k / 16 * 6.2832, l = (k % 2 ? .5 : 1) * H * .55 * aligne * (.8 + .2 * Math.sin(t / 700 + k));
        const gg = ctx.createLinearGradient(0, 0, Math.cos(a) * l, Math.sin(a) * l); gg.addColorStop(0, rgb(BLANC_PUR, .5)); gg.addColorStop(1, rgb(BLANC_PUR, 0));
        ctx.strokeStyle = gg; ctx.lineWidth = k % 2 ? .6 : 1.1; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(a) * l, Math.sin(a) * l * (k % 4 ? 1 : incl * 1.6)); ctx.stroke(); }
      ctx.restore(); }
    // les planètes
    pl.forEach((p, i) => { if (tG[i] < 0) return; const q = position(p, sim), e = versEcran(q.lon, q.r), naiss = clamp((t - tG[i]) / 900);
      const r = 2.6 + i * .5, hg = ctx.createRadialGradient(e[0], e[1], 0, e[0], e[1], r * 5);
      hg.addColorStop(0, rgb(BLANC_PUR, .55 * naiss)); hg.addColorStop(1, rgb(BLANC_PUR, 0)); ctx.fillStyle = hg; ctx.fillRect(e[0] - r * 5, e[1] - r * 5, r * 10, r * 10);
      ctx.fillStyle = rgb(BLANC_PUR, naiss); ctx.beginPath(); ctx.arc(e[0], e[1], r * (1 + (1 - naiss) * 3), 0, 7); ctx.fill();
      if (nomme.i === i && t - nomme.t < 2600){ const a = 1 - clamp((t - nomme.t - 2000) / 600); ctx.fillStyle = rgb(BLANC, a); ctx.font = "11px Georgia, serif"; ctx.fillText(p.nom.toUpperCase(), e[0] + 10, e[1] - 8);
        ctx.strokeStyle = rgb(BLANC, a * .6); ctx.beginPath(); ctx.arc(e[0], e[1], 9 + (t - nomme.t) / 200, 0, 7); ctx.stroke(); } });
    passeGrain(ctx, W, H, t, .045);
    fondu(ctx, W, H, FOND, .88);
  }

  function geste(){
    const t = maintenant();
    if (etape >= 5){ seed += 17; systeme(); nouvellePose(); etape = 0; tG = [-1e9, -1e9, -1e9, -1e9]; tSeuil = -1e9; sim = 0; M.bouton = libelleGeste(0); M.ligne = ligneGeste(0); return; }
    if (etape < 4){ if (etape > 0 && t - tG[etape - 1] < 1200) return;
      // la planète part de son périhélie : on recale son anomalie moyenne pour qu'elle y soit maintenant
      const p = pl[etape]; p.M0 = -6.2832 * sim / p.T; tG[etape] = t; }
    else { if (t - tG[3] < 2000) return; tSeuil = t; simDepart = sim; simCible = chercherAlignement(sim); }
    etape++; M.bouton = libelleGeste(etape); M.ligne = ligneGeste(etape);
  }
  M.taille = (w, h, d) => { const ch = Math.abs(w - W) > 2 || Math.abs(h - H) > 2; W = w; H = h; dpr = d; if (ch || !pose) nouvellePose(); };
  M.frame = frame; M.geste = geste;
  M.tap = (x, y) => { let b = -1, bd = 40; pl.forEach((p, i) => { if (tG[i] < 0) return; const q = position(p, sim), e = versEcran(q.lon, q.r), d = Math.hypot(e[0] - x, e[1] - y); if (d < bd){ bd = d; b = i; } });
    if (b >= 0){ nomme = { i: b, t: maintenant() }; M.ligne = pl[b].nom + " · e = " + pl[b].e.toFixed(2) + " · T = " + pl[b].T.toFixed(1) + " s"; } };
  M.glisse = (dx, dy) => { incl = clamp(incl + dy * .004, .18, 1); if (pose) px.clearRect(0, 0, W, H); };
  return M;
}
window.ETUDE = etude_orbites;
