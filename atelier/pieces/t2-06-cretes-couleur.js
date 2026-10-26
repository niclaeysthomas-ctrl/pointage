/* ======================= Tour 2, pièce 06 : LES CRÊTES EN COULEUR (etude_cretesc) ======================= */
/* Ce qu'on voit : le relevé du pulsar CP 1919 (Jocelyn Bell, 1967) devenu le relevé de ton mois. Vingt-neuf lignes empilées
   sur un papier gris sombre : en haut il y a vingt-huit jours, en bas aujourd'hui. Chaque pic est une priorité faite, à sa
   place, dans sa couleur (bleu 990, vermillon CUMBRE, ocre Lecture, émeraude LE CLOSING) ; à droite de chaque ligne, quatre
   pastilles disent quelles priorités ce jour-là ; tous les sept jours, une semaine est cotée en marge.
   Ce que fait un geste (une priorité faite) : son pic monte sur la ligne d'aujourd'hui, nommé au-dessus en capitales ; une onde
   court le long de la ligne ; puis une colonne de lumière de sa couleur remonte la pile et allume tous ses pics passés : on voit
   d'un coup ta série pour cette priorité (« SÉRIE 12 J » s'écrit à côté).
   La loi : chaque relief est une somme de gaussiennes (une par priorité faite) ; la ligne du jour est une corde dont le mouvement
   suit l'équation des ondes amortie, ∂²u/∂t² = c²·∂²u/∂x² − γ·∂u/∂t + k·(cible − u), résolue en différences finies (240 points,
   8 pas par image). Les lignes se cachent l'une l'autre par l'algorithme du peintre (du fond vers l'avant).
   La main : le relevé scientifique sur papier gris (verdict de Thomas : « très sympa, des couleurs seraient un vrai plus ») ;
   les couleurs posées en voile sous les pics et dans le trait ; la typographie de La Voûte (Georgia, capitales espacées, mono).
   L'usage : « Ta journée » dans son mois, posée en grand en haut de Maintenant ; chaque priorité cochée dans l'app lève son pic.
   Le doigt : toucher une ligne la fait vibrer et dit son jour et ses priorités ; glisser incline la pile.
   Le seuil (toutes faites) : une lumière remonte toute la pile, les jours pleins se remplissent de leurs couleurs, la pile se
   dresse en perspective comme une chaîne de montagnes, et la chaîne de jours s'écrit en grand. Elle reste ainsi.
   Le téléphone : aucune toile cachée ; ≈ 3 500 petits traits par image regroupés par couleur ; mesuré sous 12 ms sur le banc. */
const etude_cretesc_DONNEES = Object.assign({
  couleurs: ["#5B8DEF", "#E8613F", "#E2B13C", "#3FB08A", "#A77BEA", "#E46FA7"],
  aujourdhui: null,   // l'app y met les priorités déjà faites (leurs rangs) ; null = rien
}, JOURNEE);

function etude_cretesc(){
  const D = etude_cretesc_DONNEES;
  let W = 390, H = 760, seed = 1967;
  const NP = 132, NC = 240;
  let u, up, cible, jours = [], faits = [], tFait = [], tSeuil = -1e9, seuilFait = false, bascule = 0, inclMain = 0, dernier = 0;
  let vibre = { k: -1, t: -1e9 }, fremit = -1e9, POS = [], COUL = [];
  const M = { titre: "LES CRÊTES EN COULEUR", bouton: libelleGeste(0), ligne: ligneGeste(0), dprMax: 1.5 };
  const hexRGB = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  const nP = () => D.priorites.length;

  /* ---- les données : chaque jour passé = la liste des priorités faites ce jour-là ---- */
  function construire(){
    const R = graine(seed), n = nP();
    POS = D.priorites.map((p, i) => .14 + (.72 * (i + .5) / n));
    COUL = D.priorites.map((p, i) => hexRGB(D.couleurs[i % D.couleurs.length]));
    jours = D.jours.map((j, k) => {
      const qui = Array.isArray(j) ? j.slice() : [...Array(n).keys()].sort(() => R() - .5).slice(0, Math.min(n, j));
      return { qui, pics: qui.map(i => ({ i, x: POS[i] + (R() - .5) * .035, h: .72 + R() * .45, s: .022 + R() * .016 })), bruit: R() * 100 };
    });
    u = new Float32Array(NC); up = new Float32Array(NC); cible = new Float32Array(NC);
    faits = []; tFait = new Array(n).fill(-1e9); tSeuil = -1e9; seuilFait = false; bascule = 0;
  }
  construire();
  // une série : combien de jours d'affilée, en remontant depuis hier (et aujourd'hui s'il est fait)
  function serie(i){ let n = faits.includes(i) ? 1 : 0; for (let k = jours.length - 1; k >= 0; k--){ if (jours[k].qui.includes(i)) n++; else break; } return n; }
  const gauss = (x, p) => p.h * Math.exp(-((x - p.x) * (x - p.x)) / (2 * p.s * p.s));

  /* ---- la corde du jour ---- */
  function recible(){
    cible.fill(0);
    faits.forEach(i => { const x0 = POS[i], s = .028, h = 1.15; for (let k = 0; k < NC; k++){ const x = k / (NC - 1); cible[k] += h * Math.exp(-((x - x0) ** 2) / (2 * s * s)); } });
  }
  function corde(n){
    const c2 = .22, g = .02, kr = .006;
    for (let s = 0; s < n; s++){ const nu = new Float32Array(NC);
      for (let i = 1; i < NC - 1; i++) nu[i] = u[i] + (u[i] - up[i]) * (1 - g) + c2 * (u[i - 1] + u[i + 1] - 2 * u[i]) + kr * (cible[i] - u[i]);
      up = u; u = nu; }
  }
  function frapper(i){ const x0 = POS[i]; for (let k = 0; k < NC; k++){ const x = k / (NC - 1); up[k] -= .1 * Math.exp(-((x - x0) ** 2) / (2 * .012 * .012)); } }

  /* ---- l'état : lever une priorité, en retirer une, aller directement à un état ---- */
  function lever(i, t){ if (faits.includes(i)) return; faits.push(i); tFait[i] = t; recible(); frapper(i); fremit = t; majTextes(); }
  function retirer(i){ const k = faits.indexOf(i); if (k < 0) return; faits.splice(k, 1); tFait[i] = -1e9; recible(); if (seuilFait){ seuilFait = false; tSeuil = -1e9; bascule = 0; } majTextes(); }
  function boucler(t){ if (seuilFait) return; seuilFait = true; tSeuil = t; for (let k = 0; k < NC; k++) up[k] -= .05 * Math.sin(k / (NC - 1) * Math.PI); fremit = t; majTextes(); }
  function majTextes(){
    const n = faits.length, N = nP();
    M.bouton = seuilFait ? "Encore" : n < N ? D.priorites[[...Array(N).keys()].find(i => !faits.includes(i))].nom : "Boucler";
    M.ligne = seuilFait ? "journée bouclée · chaîne " + (D.chaine + 1) + " j" : n ? D.priorites[faits[n - 1]].nom + " · " + n + " sur " + N : "chaîne · " + D.chaine + " jours";
  }
  // l'app ouvre la journée au milieu : on pose l'état sans animation
  function etat(liste, boucle){
    faits = liste.filter(i => i >= 0 && i < nP()); tFait = new Array(nP()).fill(-1e9); recible();
    u = Float32Array.from(cible); up = Float32Array.from(cible);
    seuilFait = !!boucle; tSeuil = boucle ? -1e9 : -1e9; bascule = boucle ? 1 : 0; majTextes();
  }

  /* ---- le dessin ---- */
  function frame(ctx, t){
    const dt = dernier ? Math.min(.05, (t - dernier) / 1000) : 1 / 60; dernier = t;
    corde(8);
    if (tSeuil > 0) bascule = lisse((t - tSeuil - 1800) / 3200);
    const L = jours.length + 1, compact = H < 600;
    const haut = H * (compact ? .16 : .2), bas = H * (compact ? .8 : .78), x0 = W * .09, x1 = W * .86;
    // le papier : gris sombre, un léger grain fixe, les règles verticales du relevé
    ctx.fillStyle = "#16171C"; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = rgb(TRAIT, .35); ctx.lineWidth = .5;
    for (let k = 0; k <= 16; k++){ const x = x0 + (x1 - x0) * k / 16; ctx.beginPath(); ctx.moveTo(x, haut - 30); ctx.lineTo(x, bas + 6); ctx.stroke(); }
    // l'aurore du seuil : un voile des quatre couleurs tout en haut
    if (bascule > 0){ faits.forEach((i, k) => { const g = ctx.createRadialGradient(x0 + (x1 - x0) * POS[i], haut * .55, 0, x0 + (x1 - x0) * POS[i], haut * .55, W * .45);
      g.addColorStop(0, rgb(COUL[i], .22 * bascule)); g.addColorStop(1, rgb(COUL[i], 0)); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }); }
    const front = tSeuil > 0 ? (t - tSeuil - 900) / 1400 * L : -99;
    const incl = clamp(bascule * .62 + inclMain, -.2, 1);
    for (let k = 0; k < L; k++){
      const ageL = L - 1 - k, z = ageL / (L - 1), estAuj = k === L - 1;
      const yBase = haut + (bas - haut) * Math.pow(k / (L - 1), 1 + incl * 1.4);
      const larg = 1 - z * incl * .45, cx = W / 2, amp = (H * (compact ? .07 : .08)) * (1 + incl * .5) * (1 - z * incl * .35);
      const allume = clamp(front - ageL) * clamp(1 - (front - ageL - 6) / 8 + .55);
      const vib = vibre.k === k ? Math.exp(-(t - vibre.t) / 600) * Math.sin((t - vibre.t) / 45) * 6 : 0;
      const fr = !estAuj ? Math.exp(-(t - fremit) / 500) * Math.sin((t - fremit) / 60 - ageL * .6) * 1.6 * Math.exp(-ageL * .15) : 0;
      const J = estAuj ? null : jours[k];
      // les points, et pour chacun la priorité qui domine (pour la couleur) et sa force
      const pts = [], dom = [], force = [];
      for (let q = 0; q < NP; q++){ const x = q / (NP - 1); let h = 0, d = -1, f = 0;
        if (estAuj){ const ci = x * (NC - 1), a = Math.floor(ci), ff = ci - a; h = u[a] * (1 - ff) + (u[Math.min(NC - 1, a + 1)] || 0) * ff;
          faits.forEach(i => { const g = 1.15 * Math.exp(-((x - POS[i]) ** 2) / (2 * .028 * .028)); if (g > f){ f = g; d = i; } });
          h = h * 1.3 + .015 * Math.sin(t / 700 + x * 30); }
        else { J.pics.forEach(p => { const g = gauss(x, p); h += g; if (g > f){ f = g; d = p.i; } }); h = h * (.55 + J.qui.length * .1) + .03 * Math.sin(J.bruit + x * 40) * Math.sin(x * 3.14); }
        const env = Math.sin(Math.PI * x) ** .5; h *= env;
        pts.push([cx + (x0 + (x1 - x0) * x - cx) * larg, yBase - h * amp + (vib + fr) * Math.sin(x * 9 + t / 90) * Math.sin(Math.PI * x)]);
        dom.push(d); force.push(clamp(f * 1.3)); }
      // la ligne cache ce qui est derrière
      ctx.fillStyle = "#16171C"; ctx.beginPath(); ctx.moveTo(pts[0][0], yBase + 2); pts.forEach(p => ctx.lineTo(p[0], p[1])); ctx.lineTo(pts[NP - 1][0], yBase + 2); ctx.closePath(); ctx.fill();
      // le voile de couleur sous chaque pic (plus fort aujourd'hui, et dans la colonne d'une priorité qui vient d'être faite)
      const qui = estAuj ? faits : J.qui;
      for (const i of qui){
        const col = tFait[i] > 0 ? clamp(((t - tFait[i]) - 700 - ageL * 55) / 260) * (1 - clamp(((t - tFait[i]) - 3600 - ageL * 40) / 1400)) : 0;
        const plein = (estAuj ? 1 : 0) + col + (seuilFait ? .55 * bascule : 0) + allume * .4;
        const a = .07 + .16 * clamp(plein);
        ctx.fillStyle = rgb(COUL[i], a); ctx.beginPath(); let ouvert = false;
        for (let q = 0; q < NP; q++){ if (dom[q] === i && force[q] > .08){ if (!ouvert){ ctx.moveTo(pts[q][0], yBase); ouvert = true; } ctx.lineTo(pts[q][0], pts[q][1]); }
          else if (ouvert){ ctx.lineTo(pts[q - 1][0], yBase); ouvert = false; } }
        if (ouvert) ctx.lineTo(pts[NP - 1][0], yBase); ctx.fill();
      }
      // le trait : gris-blanc, teinté de la couleur de la priorité qui domine ; regroupé par couleur (un seul tracé par teinte)
      const base = mix(qui.length === nP() && !estAuj ? GRIS_CLAIR : GRIS, BLANC_PUR, clamp(allume + (estAuj ? .45 : 0)));
      const alpha = (estAuj ? 1 : (qui.length === nP() ? .82 : .55) * (1 - z * .25)) + allume * .2;
      ctx.lineJoin = "round"; ctx.lineWidth = estAuj ? 1.9 : 1;
      let q = 0;
      while (q < NP - 1){
        const d = dom[q] >= 0 && force[q] > .15 ? dom[q] : -1, debut = q;
        while (q < NP - 1 && (dom[q] >= 0 && force[q] > .15 ? dom[q] : -1) === d) q++;
        const col = d >= 0 ? mix(base, COUL[d], estAuj ? .85 : .55 + .35 * clamp(allume + (tFait[d] > 0 ? 1 - clamp(((t - tFait[d]) - 3600) / 1400) : 0))) : base;
        ctx.strokeStyle = rgb(col, alpha); ctx.beginPath(); ctx.moveTo(pts[debut][0], pts[debut][1]);
        for (let r = debut + 1; r <= q; r++) ctx.lineTo(pts[r][0], pts[r][1]); ctx.stroke();
      }
      // les pastilles du jour, à droite : une par priorité, pleine si faite
      const px = x1 + 10;
      for (let i = 0; i < nP(); i++){ const on = qui.includes(i); ctx.fillStyle = on ? rgb(COUL[i], estAuj ? 1 : .85) : rgb(TRAIT, .9);
        ctx.fillRect(px + i * 6, yBase - 5, 4, 4); }
      // la cote des semaines, en marge
      if (!estAuj && ageL % 7 === 0){ ctx.fillStyle = rgb(GRIS, .7 + allume * .3); ctx.font = "9px ui-monospace, Consolas, monospace"; ctx.fillText("S-" + ageL / 7, 4, yBase + 3); }
    }
    // la ligne du jour : le nom de chaque priorité faite au-dessus de son pic, et sa série qui s'écrit après la colonne de lumière
    const yAuj = bas, ampA = H * (compact ? .07 : .08) * (1 + incl * .5);
    faits.forEach(i => { const x = x0 + (x1 - x0) * POS[i], age = t - tFait[i], a = tFait[i] > 0 ? clamp(age / 600) : 1;
      const yPic = yAuj - 1.2 * 1.3 * ampA - 10 - (nP() > 3 && i % 2 ? 13 : 0);
      ctx.strokeStyle = rgb(COUL[i], .6 * a); ctx.lineWidth = .7; ctx.beginPath(); ctx.moveTo(x, yPic + 4); ctx.lineTo(x, yPic - 6); ctx.stroke();
      ctx.fillStyle = rgb(COUL[i], a); ctx.font = "600 10px Georgia, 'Times New Roman', serif"; ctx.textAlign = "center";
      ctx.fillText(espacer(D.priorites[i].nom), x, yPic - 10);
      const sa = tFait[i] > 0 ? clamp((age - 2200) / 500) * (1 - clamp((age - 6500) / 900)) : 0;
      if (sa > 0){ ctx.fillStyle = rgb(BLANC, sa * .9); ctx.font = "9px ui-monospace, Consolas, monospace"; ctx.fillText("SÉRIE " + serie(i) + " J", x, yPic - 24); }
      ctx.textAlign = "left"; });
    // la légende des places, sous la dernière ligne (grisée tant que la priorité n'est pas faite)
    D.priorites.forEach((p, i) => { const x = x0 + (x1 - x0) * POS[i], on = faits.includes(i);
      ctx.fillStyle = on ? rgb(COUL[i], .95) : rgb(GRIS, .55); ctx.font = "9px Georgia, 'Times New Roman', serif"; ctx.textAlign = "center"; ctx.fillText(espacer(p.nom), x, bas + 20 + (nP() > 3 && i % 2 ? 11 : 0)); ctx.textAlign = "left"; });
    // le seuil : la chaîne s'écrit en grand, en haut
    if (bascule > 0){ ctx.fillStyle = rgb(BLANC, .9 * bascule); ctx.font = `500 ${compact ? 18 : 22}px Georgia, 'Times New Roman', serif`; ctx.textAlign = "center";
      ctx.fillText(espacer("chaîne · " + (D.chaine + 1) + " jours"), W / 2, haut * (compact ? .62 : .5)); ctx.textAlign = "left"; }
    passeGrain(ctx, W, H, t, .05);
  }
  const espacer = s => String(s).toUpperCase().split("").join("\u200A");

  function geste(i){
    const t = maintenant();
    if (seuilFait && i === undefined){ seed += 31; construire(); majTextes(); return; }   // « Encore »
    if (i !== undefined){ lever(i, t); return; }
    const reste = [...Array(nP()).keys()].filter(k => !faits.includes(k));
    if (reste.length){ if (faits.length && t - Math.max(...tFait) < 1200) return; lever(reste[0], t); }
    else { if (t - Math.max(...tFait) < 1500) return; boucler(t); }
  }
  M.taille = (w, h) => { W = w; H = h; };
  M.frame = frame; M.geste = geste;
  M.aller = n => { etat([...Array(Math.min(n, nP())).keys()], n > nP()); };
  M.etat = etat; M.retirer = retirer; M.boucler = () => boucler(maintenant()); M.faits = () => faits.slice(); M.boucle = () => seuilFait;
  M.tap = (x, y) => { const compact = H < 600, haut = H * (compact ? .16 : .2), bas = H * (compact ? .8 : .78), L = jours.length + 1;
    const k = Math.round((y - haut) / (bas - haut) * (L - 1)); if (k < 0 || k > L - 1) return;
    vibre = { k, t: maintenant() }; const qui = k === L - 1 ? faits : jours[k].qui;
    M.ligne = (k === L - 1 ? "aujourd'hui" : "J-" + (L - 1 - k)) + " · " + (qui.length ? qui.map(i => D.priorites[i].nom).join(", ") : "rien"); };
  M.glisse = (dx, dy) => { inclMain = clamp(inclMain - dy * .003, -.2, .5); };
  if (Array.isArray(D.aujourdhui)) etat(D.aujourdhui, false); else majTextes();
  return M;
}
window.ETUDE = etude_cretesc;
