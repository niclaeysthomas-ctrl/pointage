/* ======================= Tour 1, pièce 02 : L'HARMONOGRAPHE (etude_harmonographe) ======================= */
/* Ce qu'on voit : une feuille gris sombre, et une plume blanche qui trace lentement une figure de pendules. Au repos, un seul
   pendule balance la plume : une ellipse qui se resserre. Chaque priorité faite accroche un pendule de plus à la machine ;
   la plume repart du bord et retrace toute la figure, plus riche ; la figure d'avant reste dessous, grisée, comme une couche
   d'encre plus ancienne. On voit les quatre couches de la journée se superposer.
   La loi : l'harmonographe (Blackburn, 1844). La plume suit x(t) = Σ Aᵢ·sin(fᵢt + φᵢ)·e^(−dt), y(t) = Σ Bᵢ·sin(gᵢt + ψᵢ)·e^(−dt) :
   chaque pendule est un oscillateur amorti ; les rapports de fréquences presque entiers (2:3, 3:4…) dessinent les boucles,
   le petit écart à l'entier les fait tourner lentement. Les minutes de chaque priorité désaccordent son pendule.
   La main : la plume fine, l'encre qui s'accumule là où la plume repasse (les nœuds deviennent plus blancs).
   L'usage : « Ta journée ». Une couche par priorité ; la figure finale est unique à chaque journée.
   Le doigt : toucher lève la plume et montre les fréquences ; glisser fait tourner la feuille.
   Le seuil (Boucler) : la feuille se met à tourner sous la plume (harmonographe rotatif) et les quatre pendules tracent
   ensemble, vite, une rosace qui remplit tout l'écran ; la lumière s'accumule dans les croisements. Elle reste.
   Le téléphone : une seule feuille cachée à la taille de l'écran (≤ 1,3 M pixels) ; 600 à 2 400 segments par image. */
const etude_harmonographe_DONNEES = JOURNEE;

function etude_harmonographe(){
  const D = etude_harmonographe_DONNEES;
  let W = 390, H = 760, dpr = 1.5, seed = 1844, papier = null, pctx = null;
  let etape = 0, trace = null, tSeuil = -1e9, rot = 0, rotV = 0, dernier = 0, plumeLevee = -1e9;
  const M = { titre: "L'HARMONOGRAPHE", bouton: libelleGeste(0), ligne: ligneGeste(0), dprMax: 1.5 };
  let P = [];   // les pendules : amplitudes, fréquences, phases

  function pendules(){
    const R = graine(seed), base = [[2, 3], [3, 2], [3, 4], [5, 4], [1, 3], [4, 5]];
    const choix = [0, 1, 2, 3, 4, 5].sort(() => R() - .5);
    P = [{ A: 1, B: 1, f: 1, g: 1.003, p: R() * 6, q: R() * 6 + 1.57 }];   // le pendule du repos : une ellipse
    D.priorites.forEach((pr, i) => { const [a, b] = base[choix[i]], ec = pr.min / 3000;
      P.push({ A: .55 + R() * .4, B: .55 + R() * .4, f: a + ec, g: b - ec * .7, p: R() * 6.28, q: R() * 6.28 }); });
  }
  pendules();

  function point(tau, n, amort, tourne){
    let x = 0, y = 0;
    if (tourne){
      // le rotatif : deux pendules accordés presque juste (l'écart fait tourner les pétales) et la feuille qui tourne
      const a = P[1], c = P[3], fa = Math.round(a.f), fc = Math.round(c.f) || 1;
      x = Math.sin(fa * tau + a.p) + .62 * Math.sin((fc + .004) * tau + c.p);
      y = Math.sin(fa * tau + a.p + 1.5708) + .62 * Math.sin((fc + .004) * tau + c.p + 1.5708 * (fa % 2 ? 1 : -1));
    } else
    for (let i = 0; i <= n; i++){ const p = P[i]; x += p.A * Math.sin(p.f * tau + p.p); y += p.B * Math.sin(p.g * tau + p.q); }
    const e = Math.exp(-amort * tau), s = tourne ? Math.min(W, H) * .29 : Math.min(W, H) * .42 / (1 + n * .55);
    x *= e * s; y *= e * s;
    if (tourne){ const c = Math.cos(tourne * tau), si = Math.sin(tourne * tau); const xx = x * c - y * si; y = x * si + y * c; x = xx; }
    return [x, y];
  }
  // un tracé : n pendules accrochés, de tau 0 à tauFin, en `duree` ms
  function lancer(n, t, duree, tauFin, amort, tourne, alpha, lw){ trace = { n, t0: t, duree, tauFin, amort, tourne, alpha, lw, fait: 0, der: null }; }

  function nouveauPapier(){
    [papier, pctx] = toile(W, H, dpr);
    pctx.fillStyle = rgb(CARTE); pctx.fillRect(0, 0, W, H);
    // le grain du papier, fixé une fois
    const R = graine(seed + 3); pctx.fillStyle = "rgba(255,255,255,.025)";
    for (let k = 0; k < 2600; k++) pctx.fillRect(R() * W, R() * H, 1, 1);
    pctx.translate(W / 2, H / 2);
  }
  function voiler(a){ pctx.save(); pctx.setTransform(dpr, 0, 0, dpr, 0, 0); pctx.fillStyle = rgb(CARTE, a); pctx.fillRect(0, 0, W, H); pctx.restore(); }

  function avancer(t){
    if (!trace) return;
    const u = clamp((t - trace.t0) / trace.duree), cible = lisse(u) * trace.tauFin;
    const pas = trace.tourne ? .012 : .02;
    pctx.save(); pctx.globalCompositeOperation = trace.tourne ? "lighter" : "source-over";
    pctx.strokeStyle = rgb(BLANC, trace.alpha); pctx.lineWidth = trace.lw; pctx.lineJoin = "round";
    pctx.beginPath(); let p = trace.der || point(trace.fait, trace.n, trace.amort, trace.tourne); pctx.moveTo(p[0], p[1]);
    let k = 0; while (trace.fait < cible && k++ < 2400){ trace.fait += pas; p = point(trace.fait, trace.n, trace.amort, trace.tourne); pctx.lineTo(p[0], p[1]); }
    pctx.stroke(); pctx.restore(); trace.der = p;
    if (u >= 1 && trace.fait >= trace.tauFin) trace.fini = true;
  }

  function frame(ctx, t){
    const dt = dernier ? Math.min(.05, (t - dernier) / 1000) : 1 / 60; dernier = t;
    if (!papier) nouveauPapier();
    if (!trace){ lancer(0, t, 9000, 60, .035, 0, .42, .7); }
    if (t - plumeLevee > 1200) avancer(t);
    // le repos : quand le tracé du pendule seul est fini, la plume le reprend en boucle, très pâle (la machine respire)
    if (etape === 0 && trace && trace.fini){ voiler(.08); lancer(0, t, 9000, 60, .035, 0, .3, .7); }
    rot += rotV * dt; rotV *= Math.pow(.05, dt);
    ctx.fillStyle = rgb(FOND); ctx.fillRect(0, 0, W, H);
    ctx.save(); ctx.translate(W / 2, H / 2); ctx.rotate(rot);
    if (tSeuil > 0){ const u = lisse((t - tSeuil) / 7000); ctx.scale(1 + .06 * u, 1 + .06 * u); }
    ctx.drawImage(papier, -W / 2, -H / 2, W, H); ctx.restore();
    // la plume : un point blanc et son petit halo, là où elle écrit
    if (trace && !trace.fini && trace.der && t - plumeLevee > 1200){
      const c = Math.cos(rot), s = Math.sin(rot), x = trace.der[0] * c - trace.der[1] * s + W / 2, y = trace.der[0] * s + trace.der[1] * c + H / 2;
      const g = ctx.createRadialGradient(x, y, 0, x, y, 14); g.addColorStop(0, rgb(BLANC_PUR, .5)); g.addColorStop(1, rgb(BLANC_PUR, 0));
      ctx.fillStyle = g; ctx.fillRect(x - 14, y - 14, 28, 28); ctx.fillStyle = rgb(BLANC_PUR); ctx.beginPath(); ctx.arc(x, y, 1.6, 0, 7); ctx.fill();
    }
    // le repère des pendules, en bas : un trait par pendule accroché, qui balance à sa fréquence
    const n = Math.min(etape, 4);
    for (let i = 0; i <= n; i++){
      const x = W / 2 + (i - n / 2) * 26, a = Math.sin(t / 1000 * P[i].f * 1.6 + P[i].p) * .35;
      ctx.strokeStyle = ctx.fillStyle = rgb(i === n && etape > 0 && etape <= 4 ? BLANC : GRIS, .7); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x, H - 118); ctx.lineTo(x + Math.sin(a) * 22, H - 118 + Math.cos(a) * 22); ctx.stroke();
      ctx.beginPath(); ctx.arc(x + Math.sin(a) * 22, H - 118 + Math.cos(a) * 22, 2.5, 0, 7); ctx.fill();
    }
    passeGrain(ctx, W, H, t, .04);
  }

  function geste(){
    const t = maintenant();
    if (etape >= 5){ seed += 11; pendules(); nouveauPapier(); etape = 0; tSeuil = -1e9; trace = null; rot = 0; M.bouton = libelleGeste(0); M.ligne = ligneGeste(0); return; }
    if (trace && !trace.fini && t - trace.t0 < 2500) return;
    if (etape < 4){
      voiler(.62);                                         // la couche d'avant se grise
      lancer(etape + 1, t, 5200, 70 + etape * 12, .028, 0, .55, .75);
    } else {
      voiler(.35); tSeuil = t;
      lancer(4, t, 7500, 260, .006, .021, .22, .55);        // la feuille tourne : la rosace
    }
    etape++; M.bouton = libelleGeste(etape); M.ligne = ligneGeste(etape);
  }
  M.taille = (w, h, d) => { const ch = Math.abs(w - W) > 2 || Math.abs(h - H) > 2; W = w; H = h; dpr = d; if (ch || !papier){ nouveauPapier(); trace = null; } };
  M.frame = frame; M.geste = geste;
  M.tap = () => { plumeLevee = maintenant(); const n = Math.min(etape, 4); M.ligne = P.slice(0, n + 1).map(p => p.f.toFixed(2) + ":" + p.g.toFixed(2)).join("  "); };
  M.glisse = (dx, dy) => { rotV += (dx - dy) * .004; };
  return M;
}
window.ETUDE = etude_harmonographe;
