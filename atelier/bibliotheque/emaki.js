/* ======================= Le Pointage : LE MENU-ROULEAU (emaki) ======================= */
/* Ce que c'est : le menu principal des apps, peint comme un emakimono. Une bande de rouleau (washi, encre noire franche,
   aplats de Yamato-e, nuages d'or) que l'on fait défiler au doigt de droite à gauche. Chaque app est UNE SCÈNE peinte ;
   les scènes se suivent, reliées par les nuages d'or suyari-gasumi. Au bord droit, le cylindre de bois : le papier qui
   reste à lire y est encore roulé, et il se déroule vers la gauche quand on fait défiler.
   Une app pas encore faite aujourd'hui est en dessin au trait sur le papier (couleurs éteintes, or éteint) ; quand on la
   coche, son sceau rouge FRAPPE et la scène se peint en partant du sceau, l'or s'allume. Ses mots : « J ADORE LES
   DIFFÉRENTES PARTIES […] menu défilant de droite à gauche avec le doigt et une option de cliquer dessus » (P18), et
   « ça casse le côté terne » (P23).

   LA LOI (quatre calculs nommés, tous vrais) :
   (1) Le défilement est un modèle physique intégré à chaque image. Sous le doigt, le papier suit le doigt (vitesse estimée
       par régression linéaire sur les 90 dernières ms). Lâché, il obéit à
           ẍ = −γ·ẋ − ω²·(x − x*)        γ = 7 s⁻¹ (frottement visqueux), ω = 4 s⁻¹ (ressort de calage), ζ = γ/2ω ≈ 0,875
       où x* est l'aimant : le centre de scène le plus proche du point où le frottement SEUL aurait arrêté le papier,
       x₀ + v₀/γ (l'élan décide de la scène, le ressort la cale). Euler semi-implicite à pas fixe de 1/240 s.
       Hors des bords, le doigt ne tire plus qu'à 35 % et un ressort plus raide (ω = 11 s⁻¹, amorti critique) ramène.
   (2) Les nuages d'or suyari-gasumi : leurs bords sont un bruit fractal (fBm, 5 octaves, Mandelbrot–Van Ness 1968)
       échantillonné par cellules et QUANTIFIÉ en paliers de 0,028 hauteur ; près des jointures ils rejoignent des niveaux
       communs, si bien que n'importe quelles scènes se raccordent. L'or est posé en feuilles fines (48 × 46 feuilles par
       scène, environ 5 px), chacune avec sa normale froissée (bruit de valeur) ; sa couleur est un Blinn-Phong (1977),
       (N·H)^48 + (N·H)^320, recalculé selon la place de la feuille à l'écran : l'or bruni s'allume et s'éteint quand on
       fait défiler, comme une vraie feuille sous une lampe.
   (3) Les architectures sont en fukinuki yatai (« toit soufflé ») : projection parallèle oblique
           x' = X + Y·k·cos α,  y' = −Z − Y·k·sin α        α = 34°, k = 0,6
       sans point de fuite, toits ôtés pour voir dedans.
   (4) Le cylindre garde l'aire de la spirale de papier : r = √(r₀² + e·L/π), L la longueur encore roulée ; il tourne
       d'un angle s/r quand le papier avance de s.

   LA MAIN : aplats francs aux bords nets, contours d'encre nets, AUCUN effet peint (P16). Le nom de l'app en Georgia,
   capitales espacées, encre noire (P4, P11), une ligne mono dessous.

   LE BUDGET : chaque scène est peinte UNE fois dans sa toile cachée (et repeinte seulement quand son état change). Pendant
   le défilement, une image ne fait que poser ces toiles ; seul l'or (quelques milliers de feuilles, une couleur chacune)
   est recalculé, dans une toile de 48 × 46 pixels par scène. Le reste est vectoriel et court (le cylindre).
   devicePixelRatio plafonné à 2.

   L'API :
     const menu = emakiMonter(conteneur, elements, { onOuvrir(el){…}, onCocher(el){…} });
       elements : [{ id, nom, scene, fait, serie, minutes, couleur?, sceau? }, …]
         scene   : "anglais" | "cime" | "chine" | "lecture" | "sceau" | "dojo" | "musique" | "jardin" | "tour"
                   (à défaut, choisie d'après le nom : 990 → anglais, CUMBRE → cime, MANDARIN → chine, …)
         couleur : [r, g, b] (le pigment de la scène ; sinon celui de la scène)
         sceau   : un caractère pour le sceau rouge (sinon celui de la scène)
     menu.maj(elements);   // l'état change : le sceau frappe ou s'efface, une scène s'ajoute ou se retire, en animation
     menu.aller(id);       // amène une scène au centre
     menu.arreter();       // retire tout
   Le conteneur reçoit sa hauteur du composant (la bande fait 230 à 280 px selon la largeur).
   Charger commun.js d'abord (graine, bruit1, bruit2, mix, rgb, clamp, lisse, maintenant, GRAIN, WASHI…). */

const emakiAtelier = (function(){
  "use strict";
  const { PI, abs, ceil, cos, exp, floor, hypot, max, min, pow, round, sin, sqrt } = Math;
  const lerp = (a, b, u) => a + (b - a) * u;

  /* =================================== la palette =================================== */
  const WASHI = [216, 212, 203], WASHI_DOS = [198, 194, 185];
  const SUMI = [12, 11, 11];                                    // P11 : l'encre est noire, franche
  const VERMILLON = [196, 36, 26];                              // la pâte à sceau (shuniku)
  const LAQUE = [26, 21, 20], BOIS = [104, 70, 44], PLANCHER = [172, 134, 90], TATAMI = [184, 174, 114], KIRI = [198, 156, 104];
  const GUNJO = [32, 68, 168], ROKUSHO = [36, 138, 100], SHU = [206, 56, 28], MURASAKI = [108, 48, 134];
  const GOFUN = [244, 240, 228], OCRE = [184, 132, 58], INDIGO = [30, 36, 78], PIN = [30, 82, 58], PIN_C = [60, 116, 76];
  const PIERRE = [150, 146, 136], PIERRE_C = [190, 186, 174], BAMBOU = [70, 132, 72], BAMBOU_C = [128, 172, 96];
  const OR_SOMBRE = [98, 68, 24], OR_MOYEN = [192, 146, 60], OR_CLAIR = [255, 218, 128], OR_BORD = [92, 64, 22];
  const JP = '"Hiragino Mincho ProN", "Yu Mincho", YuMincho, "Noto Serif CJK JP", "Noto Serif JP", "Source Han Serif JP", serif';
  const SERIF = 'Georgia, "Times New Roman", serif', MONO = 'ui-monospace, "SF Mono", Menlo, Consolas, monospace';

  /* =================================== les constantes de la loi =================================== */
  const GAMMA = 7, OMEGA = 4;                                   // (1) frottement visqueux, ressort de calage (s⁻¹)
  const OMEGA_BORD = 11, GAMMA_BORD = 22;                       //     hors des bords : ressort raide, amorti critique
  const PAS_PHYS = 1 / 240;                                     //     pas d'intégration fixe (s)
  const PAS_NUAGE = .028, CELLULE = .05;                        // (2) paliers des nuages, cellule du bruit
  const L_SCENE = 1.05, NX_OR = 48, NY_OR = 46;                 //     largeur d'une scène (en hauteurs), feuilles d'or
  const ALPHA = 34 * PI / 180, K_OBL = .6;                      // (3) fukinuki yatai
  const KX = -K_OBL * cos(ALPHA), KY = K_OBL * sin(ALPHA);
  const R_AXE = .026, R_PLEIN = .066;                           // (4) rayon de l'axe, rayon du rouleau plein (hauteurs)
  const L_COUV = .3;                                            //     la couverture de brocart, au début du rouleau
  const LW = .0042;                                             // le trait d'encre, en hauteurs de bande

  /* le sceau et le cartouche, en hauteurs de bande */
  const SCEAU = { u: L_SCENE - .1, v: .125, s: .118 };
  const CART = { u: .045, v: .795, h: .158 };

  /* =================================== le mode « trait » (couleurs éteintes) =================================== */
  /* Une app pas faite est peinte avec la même main, mais chaque couleur passe par eteindre() : l'encre reste noire,
     le reste devient un lavis très pâle sur le papier. Ainsi le dessin et la peinture sont EXACTEMENT la même scène. */
  let trait = false;
  function eteindre(c){
    const l = .3 * c[0] + .59 * c[1] + .11 * c[2];
    if (l < 30) return c;   // seule l'encre (noir, laque) reste noire
    const g = mix([l, l, l], c, .22);
    return mix(g, WASHI, .8);
  }
  const P = (c, a = 1) => rgb(trait ? eteindre(c) : c, a);

  /* =================================== outils de dessin (unités : hauteur de bande) =================================== */
  const vue = (ox, oy) => (X, Y, Z = 0) => [ox + X + Y * KX, oy - Z - Y * KY];   // la loi (3)

  function chemin(c, pts, ferme = true){
    c.beginPath();
    c.moveTo(pts[0][0], pts[0][1]);
    for (let k = 1; k < pts.length; k++) c.lineTo(pts[k][0], pts[k][1]);
    if (ferme) c.closePath();
  }
  function trace(c, pts, fond, lw = LW, ferme = true){
    chemin(c, pts, ferme);
    if (fond){ c.fillStyle = P(fond); c.fill(); }
    if (lw){ c.lineWidth = lw; c.strokeStyle = rgb(SUMI); c.lineJoin = "round"; c.stroke(); }
  }
  const face = (c, p, a, b, cc, d, fond, lw) => trace(c, [p(...a), p(...b), p(...cc), p(...d)], fond, lw);
  function poteau(c, p, X, Y, z0, z1, coul, larg){
    const a = p(X, Y, z0), b = p(X, Y, z1);
    trace(c, [[a[0] - larg / 2, a[1]], [a[0] + larg / 2, a[1]], [b[0] + larg / 2, b[1]], [b[0] - larg / 2, b[1]]], coul, .0026);
  }
  function ellipse(c, x, y, rx, ry, fond, lw = LW, rot = 0){
    c.beginPath(); c.ellipse(x, y, rx, ry, rot, 0, PI * 2);
    if (fond){ c.fillStyle = P(fond); c.fill(); }
    if (lw){ c.lineWidth = lw; c.strokeStyle = rgb(SUMI); c.stroke(); }
  }
  function ligne(c, pts, lw, coul){
    chemin(c, pts, false);
    c.lineWidth = lw; c.strokeStyle = P(coul); c.stroke();
  }
  function etoile(c, x, y, r, coul, rot){
    c.beginPath();
    for (let k = 0; k < 10; k++){
      const a = -PI / 2 + rot + k * PI / 5, q = k % 2 ? r * .42 : r;
      c.lineTo(x + q * cos(a), y + q * sin(a));
    }
    c.closePath(); c.fillStyle = P(coul); c.fill();
    c.lineWidth = .0014; c.strokeStyle = trait ? rgb(SUMI) : rgb(mix(coul, SUMI, .6)); c.stroke();
  }
  function fleur(c, x, y, r, coul){   // une fleur de prunier : cinq pétales ronds, un cœur d'or
    for (let k = 0; k < 5; k++){
      const a = -PI / 2 + k * PI * 2 / 5;
      ellipse(c, x + cos(a) * r * .62, y + sin(a) * r * .62, r * .46, r * .46, coul, .0012);
    }
    ellipse(c, x, y, r * .26, r * .26, OCRE, 0);
  }
  function rondRect(path, x0, y0, x1, y1, r){
    r = min(r, (x1 - x0) / 2, (y1 - y0) / 2);
    path.moveTo(x0 + r, y0);
    path.arcTo(x1, y0, x1, y1, r); path.arcTo(x1, y1, x0, y1, r);
    path.arcTo(x0, y1, x0, y0, r); path.arcTo(x0, y0, x1, y0, r);
    path.closePath();
  }
  function fbm(R){   // bruit fractal à 5 octaves, étiré sur [0, 1] (la loi 2)
    const b = bruit1(floor(R() * 1e9));
    return x => {
      let s = 0, a = .5, f = 1, n = 0;
      for (let o = 0; o < 5; o++){ s += a * b(x * f + o * 31.7); n += a; a *= .5; f *= 2.03; }
      return clamp((s / n - .5) * 2.4 + .5);
    };
  }
  function espace(c, txt, x, y, ls, aligne = "center"){   // capitales espacées (la typographie de La Voûte)
    const ch = [...txt], ws = ch.map(k => c.measureText(k).width);
    const tot = ws.reduce((a, b) => a + b, 0) + ls * (ch.length - 1);
    let px = aligne === "left" ? x : x - tot / 2;
    const al = c.textAlign; c.textAlign = "left";
    ch.forEach((k, i) => { c.fillText(k, px, y); px += ws[i] + ls; });
    c.textAlign = al;
    return tot;
  }
  const largeurEspacee = (c, txt, ls) => [...txt].reduce((a, k) => a + c.measureText(k).width, 0) + ls * (txt.length - 1);

  /* =================================== le papier =================================== */
  function papier(c, L, R, wpx, hpx){
    const v = (R() - .5) * 6;
    c.fillStyle = rgb([WASHI[0] + v, WASHI[1] + v, WASHI[2] + v - 1]); c.fillRect(0, 0, L, 1);
    c.lineWidth = .0012;   // vergeures du tamis de bambou (sugeta)
    for (let y = .006; y < 1; y += .0105){
      c.strokeStyle = `rgba(120,116,106,${.045 + R() * .03})`;
      c.beginPath(); c.moveTo(0, y); c.lineTo(L, y); c.stroke();
    }
    c.lineWidth = .0018;
    for (let x = .04 + R() * .05; x < L; x += .088){
      c.strokeStyle = "rgba(120,116,106,.06)";
      c.beginPath(); c.moveTo(x, 0); c.lineTo(x, 1); c.stroke();
    }
    for (let k = 0; k < 200 * L; k++){   // fibres de kōzo
      const x = R() * L, y = R(), l = .03 + R() * .12, a = R() * PI * 2, b = (R() - .5) * 1.2;
      c.strokeStyle = R() < .6 ? `rgba(250,248,240,${.25 + R() * .3})` : `rgba(140,134,122,${.1 + R() * .12})`;
      c.lineWidth = .0008 + R() * .0018;
      c.beginPath(); c.moveTo(x, y);
      c.quadraticCurveTo(x + cos(a + b) * l * .5, y + sin(a + b) * l * .5, x + cos(a) * l, y + sin(a) * l);
      c.stroke();
    }
    c.save(); c.setTransform(1, 0, 0, 1, 0, 0);
    c.globalCompositeOperation = "multiply"; c.globalAlpha = .07;
    c.fillStyle = c.createPattern(GRAIN, "repeat"); c.fillRect(0, 0, wpx, hpx);
    c.restore();
    // la jointure de feuille (tsugime) à droite, et les deux lisières
    c.fillStyle = "rgba(110,104,92,.13)"; c.fillRect(L - .009, 0, .009, 1);
    c.fillStyle = "rgba(90,86,78,.4)"; c.fillRect(L - .0014, 0, .0014, 1);
    c.fillStyle = "rgba(90,86,78,.3)"; c.fillRect(0, 0, L, .003); c.fillRect(0, .997, L, .003);
  }

  /* =================================== les nuages d'or (la loi 2) =================================== */
  function nuages(S, R){
    const L = L_SCENE, n = max(4, round(L / CELLULE)), cw = L / n, Q = v => round(v / PAS_NUAGE) * PAS_NUAGE;
    const fa = fbm(R), fb = fbm(R), fc = fbm(R), fd = fbm(R), fe = fbm(R);
    const garde = S.modele.garde || [];
    const enGarde = u => garde.some(g => u > g[0] - .015 && u < g[1] + .015);
    const couches = [[], [], [], []];
    for (let i = 0; i < n; i++){
      const uc = (i + .5) * cw, d = min(uc, L - uc), w = lisse((d - .03) / .17), gd = enGarde(uc);
      // la bande du haut : bord inférieur fractal, quantifié ; il rejoint .14 aux jointures
      let e = Q(lerp(.14, .056 + .13 * fa(uc * 1.9 + S.k * 7), w));
      if (gd) e = min(e, .14);
      couches[0].push([-.06, e]);
      const b2 = fb(uc * 2.3 + S.k * 5);   // une barre détachée sous la bande, quand le bruit le veut
      couches[1].push(!gd && w > .6 && b2 > .58 ? [e + PAS_NUAGE, e + PAS_NUAGE + Q(.03 + .06 * (b2 - .58) / .42)] : null);
      // la bande du bas, en miroir
      let f = Q(lerp(.86, .95 - .14 * fc(uc * 1.7 + S.k * 3), w));
      couches[2].push([f, 1.06]);
      const b4 = fd(uc * 2.1 + S.k * 9);
      couches[3].push(w > .6 && b4 > .6 && uc > .62 ? [f - PAS_NUAGE - Q(.03 + .05 * (b4 - .6) / .4), f - PAS_NUAGE] : null);
    }
    const rects = [], r = .014;
    const suites = col => {
      let i = 0;
      while (i < n){
        if (!col[i]){ i++; continue; }
        let j = i;
        while (j + 1 < n && col[j + 1] && col[j + 1][0] === col[i][0] && col[j + 1][1] === col[i][1]) j++;
        const u0 = i === 0 ? -.06 : i * cw - r, u1 = j === n - 1 ? L + .06 : (j + 1) * cw + r;
        rects.push([u0, col[i][0], u1, col[i][1]]);
        i = j + 1;
      }
    };
    couches.forEach(suites);
    // les brumes posées par la scène : leur place est choisie, leurs bords sont calculés (bruit quantifié)
    (S.modele.brumes || []).forEach(([u0, u1, vc, ep]) => {
      const i0 = max(0, floor(u0 / cw)), i1 = min(n - 1, floor(u1 / cw)), col = Array(n).fill(null);
      for (let i = i0; i <= i1; i++){
        const uc = (i + .5) * cw, t = Q(ep * (.5 + 1.1 * fe(uc * 3.1 + vc * 10))), c0 = Q(vc + .05 * (fd(uc * 1.3 + 4) - .5));
        if (t > 0) col[i] = [c0 - t / 2, c0 + t / 2];
      }
      suites(col);
    });
    // les piliers de brume aux jointures : des niveaux communs, pour que deux scènes se raccordent toujours
    rects.push([-.06, .364, .075, .42], [-.06, .56, .047, .616], [L - .075, .364, L + .06, .42], [L - .047, .56, L + .06, .616]);
    const ch = new Path2D();
    rects.forEach(q => rondRect(ch, q[0], q[1], q[2], q[3], r));
    S.nuages = ch; S.rectsNuages = rects;
  }

  /* les feuilles d'or : une grille de 48 × 46 feuilles, chacune avec sa normale froissée */
  function feuillesOr(S, R){
    const nx = NX_OR, ny = NY_OR, tu = L_SCENE / nx, tv = 1 / ny;
    const cv = document.createElement("canvas"); cv.width = nx; cv.height = ny;
    const cx = cv.getContext("2d"), img = cx.createImageData(nx, ny), marque = new Uint8Array(nx * ny);
    S.rectsNuages.forEach(([u0, v0, u1, v1]) => {
      for (let j = max(0, floor(v0 / tv)); j <= min(ny - 1, floor(v1 / tv)); j++)
        for (let i = max(0, floor(u0 / tu)); i <= min(nx - 1, floor(u1 / tu)); i++) marque[j * nx + i] = 1;
    });
    const liste = [], nrm = new Float32Array(nx * ny * 3), b2 = bruit2(floor(R() * 1e6));
    for (let q = 0; q < nx * ny; q++){
      if (!marque[q]) continue;
      liste.push(q);
      const i = q % nx, j = (q / nx) | 0;
      // le froissé : une ondulation lente (bruit de valeur) et un petit écart propre à chaque feuille
      const ax = .2 * (b2(i * .22, j * .22) - .5) + .035 * (R() - .5);
      const ay = .2 * (b2(i * .22 + 40, j * .22 + 17) - .5) + .035 * (R() - .5);
      const l = hypot(ax, ay, 1);
      nrm[q * 3] = ax / l; nrm[q * 3 + 1] = ay / l; nrm[q * 3 + 2] = 1 / l;
      img.data[q * 4 + 3] = 255;
    }
    S.or = { nx, ny, cv, cx, img, liste: Int32Array.from(liste), nrm };
  }

  /* =================================== les motifs =================================== */
  function mont(c, prof, base, corps, crete, R){
    const ch = () => {
      c.beginPath(); c.moveTo(prof[0][0], prof[0][1]);
      for (let k = 1; k < prof.length - 1; k++)
        c.quadraticCurveTo(prof[k][0], prof[k][1], (prof[k][0] + prof[k + 1][0]) / 2, (prof[k][1] + prof[k + 1][1]) / 2);
      c.lineTo(prof[prof.length - 1][0], prof[prof.length - 1][1]);
    };
    ch(); c.lineTo(prof[prof.length - 1][0], base); c.lineTo(prof[0][0], base); c.closePath();
    c.fillStyle = P(corps); c.fill();
    c.save(); c.clip();
    ch(); c.lineWidth = .06; c.strokeStyle = P(mix(corps, crete, .55)); c.stroke();   // la crête en trois aplats
    ch(); c.lineWidth = .028; c.strokeStyle = P(crete); c.stroke();
    c.restore();
    ch(); c.lineWidth = LW; c.strokeStyle = rgb(SUMI); c.stroke();
    for (let k = 1; k < prof.length - 1; k++){   // points de mousse (tenten), ronds nets
      for (let m = 0; m < 3; m++){
        c.beginPath(); c.arc(prof[k][0] + (R() - .5) * .05, prof[k][1] + .014 + R() * .02, .005, 0, PI * 2);
        c.fillStyle = rgb(SUMI); c.fill();
      }
    }
  }
  function pic(c, x, base, haut, larg, corps, crete){   // un pic de karst, arrondi au sommet
    const ch = () => {
      c.beginPath(); c.moveTo(x - larg / 2, base);
      c.bezierCurveTo(x - larg * .52, base - haut * .55, x - larg * .4, base - haut, x, base - haut);
      c.bezierCurveTo(x + larg * .4, base - haut, x + larg * .52, base - haut * .55, x + larg / 2, base);
    };
    ch(); c.closePath(); c.fillStyle = P(corps); c.fill();
    c.save(); c.clip();
    ch(); c.lineWidth = .05; c.strokeStyle = P(mix(corps, crete, .5)); c.stroke();
    ch(); c.lineWidth = .022; c.strokeStyle = P(crete); c.stroke();
    c.restore();
    ch(); c.lineWidth = LW; c.strokeStyle = rgb(SUMI); c.stroke();
  }
  function eau(c, bord, bas, coul, R0 = .042){   // seigaiha : vagues en éventails, traits nets
    c.beginPath(); c.moveTo(bord[0][0], bord[0][1]); bord.forEach(q => c.lineTo(q[0], q[1]));
    c.lineTo(bord[bord.length - 1][0], bas); c.lineTo(bord[0][0], bas); c.closePath();
    c.fillStyle = P(coul); c.fill();
    c.save(); c.clip();
    const top = min(...bord.map(q => q[1])) - .02;
    let rang = 0;
    for (let y = top; y < bas + R0; y += R0 * .45, rang++){
      for (let x = bord[0][0] - R0 + (rang % 2) * R0; x < bord[bord.length - 1][0] + R0; x += R0 * 2){
        c.beginPath(); c.arc(x, y, R0, PI, PI * 2); c.closePath(); c.fillStyle = P(coul); c.fill();
        c.lineWidth = .003;
        [1, .7, .4].forEach((f, m) => {
          c.beginPath(); c.arc(x, y, R0 * f, PI, PI * 2);
          c.strokeStyle = m === 0 ? P(mix(coul, SUMI, .4)) : P(mix(coul, GOFUN, .5)); c.stroke();
        });
      }
    }
    c.restore();
  }
  function courant(c, bord, bas, coul){   // ryūsui : l'eau qui court, en lignes ondulées nettes
    c.beginPath(); c.moveTo(bord[0][0], bord[0][1]); bord.forEach(q => c.lineTo(q[0], q[1]));
    c.lineTo(bord[bord.length - 1][0], bas); c.lineTo(bord[0][0], bas); c.closePath();
    c.fillStyle = P(coul); c.fill();
    c.save(); c.clip();
    const top = min(...bord.map(q => q[1])), x0 = bord[0][0], x1 = bord[bord.length - 1][0];
    for (let y = top + .012, k = 0; y < bas; y += .028, k++){
      c.beginPath();
      for (let x = x0; x <= x1 + .01; x += .01) c.lineTo(x, y + .007 * sin(x * 26 + k * 1.7));
      c.lineWidth = k % 2 ? .0035 : .0055;
      c.strokeStyle = k % 2 ? P(mix(coul, SUMI, .35)) : P(mix(coul, GOFUN, .55));
      c.stroke();
    }
    c.restore();
  }
  function rive(c, bord, coul = mix(ROKUSHO, WASHI, .25)){
    chemin(c, bord, false);
    c.lineWidth = .02; c.strokeStyle = P(coul); c.stroke();
    c.lineWidth = LW; c.strokeStyle = rgb(SUMI); c.stroke();
  }
  function pin(c, x, y, h, R, f = 1){
    const tronc = [[x, y]]; let px = x, py = y;
    for (let k = 1; k <= 4; k++){ px += f * h * (.05 + .07 * (R() - .35)); py -= h * .2; tronc.push([px, py]); }
    c.lineCap = "round"; c.lineJoin = "round";
    ligne(c, tronc, h * .075, SUMI); ligne(c, tronc, h * .05, BOIS);
    const touffes = [];
    for (let k = 2; k <= 4; k++){
      const [tx, ty] = tronc[k], cote = (k % 2 ? 1 : -1) * f, bx = tx + cote * h * (.14 + .08 * R()), by = ty + h * .03;
      ligne(c, [[tx, ty], [bx, by]], h * .045, SUMI); ligne(c, [[tx, ty], [bx, by]], h * .026, BOIS);
      touffes.push([bx, by - h * .02, h * (.15 + .06 * R()), h * .055]);
    }
    touffes.push([px, py - h * .03, h * .19, h * .06]);
    touffes.forEach(([tx, ty, rx, ry]) => {
      ellipse(c, tx, ty, rx, ry, PIN, 0);
      c.save(); c.beginPath(); c.ellipse(tx, ty, rx, ry, 0, 0, PI * 2); c.clip();
      ellipse(c, tx, ty - ry * .75, rx * .92, ry * .7, PIN_C, 0); c.restore();
      ellipse(c, tx, ty, rx, ry, null, LW * .9);
      c.lineWidth = .0018; c.strokeStyle = rgb(SUMI);
      for (let a = PI * 1.08; a < PI * 1.92; a += .18){   // aiguilles nettes
        const ex = tx + rx * cos(a), ey = ty + ry * sin(a);
        c.beginPath(); c.moveTo(ex, ey); c.lineTo(ex + cos(a) * ry * .45, ey + sin(a) * ry * .6); c.stroke();
      }
    });
    c.lineCap = "butt";
  }
  function erable(c, x, y, h, R, nb){
    const tronc = [[x, y], [x + h * .03, y - h * .3], [x - h * .02, y - h * .55], [x + h * .02, y - h * .72]];
    c.lineCap = "round";
    [[h * .06, SUMI], [h * .038, [70, 44, 36]]].forEach(([lw, coul]) => ligne(c, tronc, lw, coul));
    [[-1, .45], [1, .6], [-1, .7]].forEach(([s, t]) => {
      const by = y - h * t;
      ligne(c, [[x, by], [x + s * h * .22, by - h * .1]], h * .022, SUMI);
    });
    c.lineCap = "butt";
    const cols = [SHU, [226, 98, 38], [172, 32, 26], [236, 140, 48]];
    for (let k = 0; k < nb; k++){
      const a = R() * PI * 2, q = sqrt(R());
      etoile(c, x + cos(a) * q * h * .36, y - h * .66 + sin(a) * q * h * .26, h * (.03 + R() * .014), cols[(R() * cols.length) | 0], R() * PI);
    }
  }
  function prunier(c, x, y, h, R, coul){   // l'ume : branches anguleuses, fleurs à cinq pétales
    c.lineCap = "round"; c.lineJoin = "round";
    const branches = [];
    const pousse = (x0, y0, a, l, ep, prof) => {
      const x1 = x0 + cos(a) * l, y1 = y0 + sin(a) * l;
      branches.push([[x0, y0], [x1, y1], ep]);
      if (prof > 0){
        pousse(x1, y1, a - .35 - R() * .35, l * .72, ep * .66, prof - 1);
        if (R() < .8) pousse(x1, y1, a + .3 + R() * .4, l * .62, ep * .6, prof - 1);
      }
    };
    pousse(x, y, -PI / 2 + .25, h * .34, h * .07, 3);
    branches.forEach(([a, b, ep]) => { ligne(c, [a, b], ep + .006, SUMI); });
    branches.forEach(([a, b, ep]) => { ligne(c, [a, b], ep, [64, 46, 40]); });
    c.lineCap = "butt";
    branches.forEach(([a, b, ep], k) => {
      if (ep > h * .04) return;
      for (let m = 0; m < 3; m++){
        const t = R();
        fleur(c, lerp(a[0], b[0], t) + (R() - .5) * .02, lerp(a[1], b[1], t) + (R() - .5) * .02, .012 + R() * .006, m % 2 ? coul : GOFUN);
      }
    });
  }
  function bambou(c, x, bas, haut, larg, R, penche){
    const n = 6, pts = [];
    for (let k = 0; k <= n; k++){ const t = k / n; pts.push([x + penche * t * t, lerp(bas, haut, t)]); }
    for (let k = 0; k < n; k++){
      const [x0, y0] = pts[k], [x1, y1] = pts[k + 1];
      trace(c, [[x0 - larg / 2, y0], [x0 + larg / 2, y0], [x1 + larg / 2, y1 + .006], [x1 - larg / 2, y1 + .006]], k % 2 ? BAMBOU : mix(BAMBOU, BAMBOU_C, .4), .003);
      ligne(c, [[x1 - larg * .7, y1 + .004], [x1 + larg * .7, y1 + .004]], .006, SUMI);   // le nœud
    }
    // les feuilles : étroites, pointues, en éventail depuis un rameau
    for (let k = 2; k <= n; k++){
      if (R() < .35) continue;
      const [nx, ny] = pts[k], cote = R() < .5 ? -1 : 1, ox = nx + cote * larg * 2.5, oy = ny - .01;
      ligne(c, [[nx, ny], [ox, oy]], .0035, SUMI);
      for (let f = 0; f < 4; f++){
        const a = (cote < 0 ? PI : 0) + cote * (.25 - f * .32) + (R() - .5) * .2, l = .07 + R() * .03, e = .012;
        const tx = ox + cos(a) * l, ty = oy + sin(a) * l * .8 + .02;
        const mx = (ox + tx) / 2, my = (oy + ty) / 2, px = -sin(a) * e, py = cos(a) * e;
        c.beginPath(); c.moveTo(ox, oy);
        c.quadraticCurveTo(mx + px, my + py, tx, ty);
        c.quadraticCurveTo(mx - px, my - py, ox, oy);
        c.fillStyle = P(f % 2 ? PIN : mix(BAMBOU, PIN, .5)); c.fill();
        c.lineWidth = .002; c.strokeStyle = rgb(SUMI); c.stroke();
      }
    }
  }
  function oiseaux(c, pts){
    c.lineWidth = .0032; c.strokeStyle = rgb(SUMI);
    pts.forEach(([x, y, e]) => {
      c.beginPath(); c.moveTo(x - e, y - e * .3);
      c.quadraticCurveTo(x - e * .4, y - e * .5, x, y); c.quadraticCurveTo(x + e * .4, y - e * .5, x + e, y - e * .3);
      c.stroke();
    });
  }
  function torii(c, x, y, s){
    trace(c, [[x - s * .38, y], [x - s * .3, y], [x - s * .28, y - s * .8], [x - s * .36, y - s * .8]], SHU, .0026);
    trace(c, [[x + s * .38, y], [x + s * .3, y], [x + s * .28, y - s * .8], [x + s * .36, y - s * .8]], SHU, .0026);
    trace(c, [[x - s * .44, y - s * .62], [x + s * .44, y - s * .62], [x + s * .44, y - s * .55], [x - s * .44, y - s * .55]], SHU, .0026);
    trace(c, [[x - s * .58, y - s * .86], [x + s * .58, y - s * .86], [x + s * .5, y - s * .78], [x - s * .5, y - s * .78]], SHU, .0026);
    trace(c, [[x - s * .62, y - s * .96], [x, y - s * .9], [x + s * .62, y - s * .96], [x + s * .58, y - s * .88], [x - s * .58, y - s * .88]], LAQUE, .0026);
  }
  /* un personnage assis, à la manière de Heian : robes superposées (kasane), cheveux longs, visage blanc */
  function personnage(c, x, y, s, robe, f = 1, objet){
    c.save(); c.translate(x, y); c.scale(f * s, s);
    const lw = LW / s;
    for (let k = 0; k < 3; k++){
      const e = k * .07;
      c.beginPath(); c.moveTo(-.58 + e, 0);
      c.bezierCurveTo(-.62 + e, -.36, -.36 + e * .4, -.62, -.12, -.66);
      c.lineTo(.16, -.64); c.bezierCurveTo(.44, -.55, .66 - e, -.26, .62 - e, 0); c.closePath();
      c.fillStyle = P(robe[k]); c.fill(); c.lineWidth = lw; c.strokeStyle = rgb(SUMI); c.stroke();
    }
    trace(c, [[-.12, -.56], [-.6, -.34], [-.6, -.2], [-.08, -.3]], robe[0], lw);   // la manche, en avant
    c.beginPath(); c.moveTo(0, -.92); c.bezierCurveTo(.3, -.86, .32, -.4, .5, -.04); c.lineTo(.36, -.02);   // les cheveux
    c.bezierCurveTo(.2, -.4, .12, -.7, -.04, -.74); c.closePath(); c.fillStyle = rgb(SUMI); c.fill();
    ellipse(c, -.06, -.8, .11, .13, GOFUN, lw);
    c.beginPath(); c.arc(-.03, -.84, .13, PI * 1.05, PI * 2.1); c.lineTo(.08, -.7); c.closePath(); c.fillStyle = rgb(SUMI); c.fill();
    c.lineWidth = lw * .8; c.beginPath(); c.moveTo(-.13, -.8); c.lineTo(-.08, -.8); c.stroke();   // hikime : l'œil d'un trait
    if (objet === "livre"){
      trace(c, [[-.74, -.26], [-.5, -.3], [-.5, -.16], [-.74, -.12]], GOFUN, lw);
      c.lineWidth = lw * .6;
      for (let k = 0; k < 3; k++){ c.beginPath(); c.moveTo(-.7 + k * .06, -.25); c.lineTo(-.7 + k * .06, -.16); c.stroke(); }
    }
    if (objet === "pinceau"){ c.lineWidth = lw * 1.6; c.beginPath(); c.moveTo(-.58, -.28); c.lineTo(-.72, -.08); c.stroke(); }
    if (objet === "biwa"){   // le luth en poire, tenu en travers
      c.save(); c.translate(-.5, -.28); c.rotate(-.75);
      ellipse(c, 0, 0, .3, .2, [128, 74, 40], lw);
      trace(c, [[.26, -.04], [.62, -.03], [.62, .03], [.26, .04]], [96, 56, 32], lw);
      trace(c, [[.6, -.06], [.72, -.08], [.72, .08], [.6, .06]], LAQUE, lw);
      trace(c, [[-.12, -.07], [.08, -.07], [.08, .07], [-.12, .07]], GOFUN, lw * .7);   // la bande du plectre
      c.lineWidth = lw * .4; for (let k = -1; k <= 1; k++){ c.beginPath(); c.moveTo(-.22, k * .03); c.lineTo(.7, k * .02); c.stroke(); }
      c.restore();
    }
    c.restore();
  }
  function marcheur(c, x, y, s, robe){
    c.save(); c.translate(x, y); c.scale(s, s); const lw = LW / s;
    c.lineWidth = lw * 1.4; c.strokeStyle = P(BOIS); c.beginPath(); c.moveTo(-.34, -.9); c.lineTo(-.42, 0); c.stroke();
    trace(c, [[-.26, 0], [.28, 0], [.16, -.72], [-.14, -.72]], robe[0], lw);
    trace(c, [[-.18, -.02], [.06, -.02], [.02, -.6], [-.1, -.6]], robe[1], lw);
    trace(c, [[-.12, -.66], [-.38, -.5], [-.34, -.42], [-.06, -.54]], robe[0], lw);
    ellipse(c, 0, -.82, .1, .12, GOFUN, lw);
    trace(c, [[-.08, -.9], [.1, -.9], [.06, -1.18], [-.06, -1.12]], SUMI, lw);   // l'eboshi
    c.restore();
  }
  /* un combattant debout, hakama et keikogi, le sabre de bois levé */
  function combattant(c, x, y, s, robe, f = 1, garde = 0){
    c.save(); c.translate(x, y); c.scale(f * s, s); const lw = LW / s;
    trace(c, [[-.2, 0], [-.08, 0], [-.06, -.06], [-.18, -.06]], GOFUN, lw);   // les pieds (tabi)
    trace(c, [[.1, 0], [.24, 0], [.22, -.06], [.1, -.06]], GOFUN, lw);
    trace(c, [[-.3, -.04], [.34, -.04], [.18, -.5], [-.16, -.5]], robe[0], lw);   // le hakama
    c.lineWidth = lw * .7; c.strokeStyle = rgb(SUMI);
    [[-.14, -.46, -.22, -.06], [0, -.48, .02, -.06], [.12, -.46, .22, -.06]].forEach(([a, b, d, e]) => { c.beginPath(); c.moveTo(a, b); c.lineTo(d, e); c.stroke(); });
    trace(c, [[-.17, -.48], [.19, -.48], [.16, -.84], [-.15, -.84]], robe[1], lw);   // le keikogi
    trace(c, [[-.18, -.5], [.2, -.5], [.2, -.45], [-.18, -.45]], robe[0], lw);       // la ceinture
    c.lineWidth = lw; c.beginPath(); c.moveTo(-.08, -.84); c.lineTo(.03, -.6); c.lineTo(.12, -.84); c.stroke();   // le col croisé
    const mains = garde ? [.3, -.98] : [.34, -.72];
    trace(c, [[.06, -.82], [mains[0] + .04, mains[1] - .03], [mains[0] + .02, mains[1] + .05], [.02, -.72]], robe[1], lw);   // le bras
    ellipse(c, .01, -.94, .1, .11, GOFUN, lw);   // la tête, le chignon
    c.beginPath(); c.arc(.01, -.96, .105, PI * 1.02, PI * 2.02); c.closePath(); c.fillStyle = rgb(SUMI); c.fill();
    ellipse(c, -.07, -1.06, .045, .035, SUMI, 0);
    c.lineWidth = lw * .8; c.beginPath(); c.moveTo(.05, -.93); c.lineTo(.09, -.93); c.stroke();
    // le bokken
    const a = garde ? -1.15 : -.55, L = .78, bx = mains[0] + cos(a) * L, by = mains[1] + sin(a) * L;
    c.lineCap = "round";
    ligne(c, [[mains[0] - cos(a) * .1, mains[1] - sin(a) * .1], [bx, by]], .075, SUMI);
    ligne(c, [[mains[0] - cos(a) * .1, mains[1] - sin(a) * .1], [bx, by]], .045, KIRI);
    c.lineCap = "butt";
    ellipse(c, mains[0], mains[1], .045, .045, GOFUN, lw);
    c.restore();
  }
  function tatami(c, p, x, y, w, d, z){
    const nr = max(1, round(d / .075)), pr = d / nr;
    for (let r = 0; r < nr; r++){
      const Y0 = y + r * pr, dec = r % 2 ? .075 : 0;
      for (let X = x - dec; X < x + w - .001; X += .15){
        const a = max(x, X), b = min(x + w, X + .15); if (b - a < .01) continue;
        face(c, p, [a, Y0, z], [b, Y0, z], [b, Y0 + pr, z], [a, Y0 + pr, z], mix(TATAMI, WASHI, (r * 7 + X * 31) % 1 * .15), .0036);
      }
    }
  }
  function panneau(c, p, A, B, h, fond, motif){
    const a = p(...A), b = p(...B), q = [a, b, [b[0], b[1] - h], [a[0], a[1] - h]];
    trace(c, q, fond, 0);
    c.save(); chemin(c, q); c.clip();
    c.transform(b[0] - a[0], b[1] - a[1], 0, -h, a[0], a[1]);   // le plan du panneau devient le carré unité
    if (motif) motif(c);
    c.restore();
    trace(c, q, null, .003);
  }
  const MOTIFS = {
    vagues: c => { c.fillStyle = P(GUNJO); c.beginPath(); c.moveTo(0, 0); for (let u = 0; u <= 1.01; u += .1) c.lineTo(u, .26 + .06 * sin(u * 12)); c.lineTo(1, 0); c.fill(); c.fillStyle = P(OR_MOYEN); c.beginPath(); c.arc(.3, .72, .1, 0, PI * 2); c.fill(); },
    monts: c => { c.fillStyle = P(ROKUSHO); c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(.3, .9, .55, .3); c.quadraticCurveTo(.75, .7, 1, .2); c.lineTo(1, 0); c.fill(); },
    erables: c => { for (let k = 0; k < 6; k++){ c.fillStyle = P(k % 2 ? SHU : [226, 110, 40]); c.beginPath(); c.arc(.15 + (k * .37) % .8, .3 + (k * .23) % .5, .07, 0, PI * 2); c.fill(); } },
    nuees: c => { c.fillStyle = P(OR_MOYEN); [[0, .62, .7, .74], [.3, .3, 1, .4], [.1, .06, .6, .14]].forEach(([u0, v0, u1, v1]) => c.fillRect(u0, v0, u1 - u0, v1 - v0)); },
    ume: c => { c.fillStyle = P(SUMI); c.fillRect(0, .2, 1, .03); for (let k = 0; k < 4; k++){ c.fillStyle = P(k % 2 ? GOFUN : [204, 72, 120]); c.beginPath(); c.arc(.2 + k * .2, .22 + (k % 2) * .06, .06, 0, PI * 2); c.fill(); } },
    planches: c => { c.fillStyle = P([150, 112, 76]); c.fillRect(0, 0, 1, .3); c.fillStyle = P(SUMI); for (let k = 1; k < 4; k++) c.fillRect(0, k * .075, 1, .012); },
    bambous: c => { c.fillStyle = P(BAMBOU); [.2, .55, .8].forEach(x => c.fillRect(x, 0, .07, 1)); }
  };
  /* le pavillon en fukinuki yatai : toit ôté, vue plongeante, projection oblique (la loi 3) ; rend la fonction qui peint l'avant */
  function pavillon(c, p, o){
    const { x, y, w, d, z, h } = o, X1 = x + w, Y1 = y + d, ep = .024;
    const bois = o.bois || PLANCHER, pil = o.pilier || [66, 48, 36];
    if (o.pilotis !== undefined){
      for (let k = 4; k >= 0; k--) poteau(c, p, x, y + d * k / 4, o.pilotis, z - ep, pil, .01);
      for (let k = 1; k <= 5; k++) poteau(c, p, x + w * k / 5, y, o.pilotis, z - ep, pil, .01);
    }
    face(c, p, [x, y, z], [x, Y1, z], [x, Y1, z - ep], [x, y, z - ep], mix(bois, SUMI, .45));
    face(c, p, [x, y, z], [X1, y, z], [X1, y, z - ep], [x, y, z - ep], mix(bois, SUMI, .28));
    face(c, p, [x, y, z], [X1, y, z], [X1, Y1, z], [x, Y1, z], bois);
    c.lineWidth = .002; c.strokeStyle = P(mix(bois, SUMI, .5));
    const np = max(2, round(d / .032));
    for (let k = 1; k < np; k++){ const a = p(x, y + d * k / np, z), b = p(X1, y + d * k / np, z); c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke(); }
    if (o.tatami) tatami(c, p, x + .045, y + .06, w - .09, d - .06, z);
    const nP = max(2, round(w / .09)), mur = o.mur || mix(WASHI, GOFUN, .4), motif = MOTIFS[o.motif];
    for (let k = 0; k < nP; k++) panneau(c, p, [x + w * k / nP, Y1, z], [x + w * (k + 1) / nP, Y1, z], h, mur, motif);
    const nQ = max(2, round(d / .1));
    for (let k = nQ - 1; k >= 0; k--) panneau(c, p, [X1, y + d * (k + 1) / nQ, z], [X1, y + d * k / nQ, z], h, mix(mur, SUMI, .1), motif);
    poteau(c, p, x, Y1, z, z + h, pil, .012); poteau(c, p, X1, Y1, z, z + h, pil, .012);
    face(c, p, [x, Y1, z + h], [X1, Y1, z + h], [X1, Y1, z + h - .013], [x, Y1, z + h - .013], pil, .0024);
    face(c, p, [X1, y, z + h], [X1, Y1, z + h], [X1, Y1, z + h - .013], [X1, y, z + h - .013], pil, .0024);
    return () => {
      if (o.rampe){
        const rail = (A, B) => {
          const n = max(2, round(hypot(B[0] - A[0], B[1] - A[1]) / .055));
          for (let k = 0; k <= n; k++) poteau(c, p, lerp(A[0], B[0], k / n), lerp(A[1], B[1], k / n), z, z + .045, o.rampe, .007);
          face(c, p, [A[0], A[1], z + .045], [B[0], B[1], z + .045], [B[0], B[1], z + .036], [A[0], A[1], z + .036], o.rampe, .002);
          face(c, p, [A[0], A[1], z + .022], [B[0], B[1], z + .022], [B[0], B[1], z + .015], [A[0], A[1], z + .015], o.rampe, .002);
        };
        rail([x, Y1], [x, y]); rail([x, y], [X1, y]);
      }
      poteau(c, p, x, y + d / 2, z, z + h, pil, .012);
      poteau(c, p, x, y, z, z + h, pil, .013); poteau(c, p, X1, y, z, z + h, pil, .013);
      face(c, p, [x, y, z + h], [x, Y1, z + h], [x, Y1, z + h - .013], [x, y, z + h - .013], pil, .0024);
      face(c, p, [x, y, z + h], [X1, y, z + h], [X1, y, z + h - .014], [x, y, z + h - .014], pil, .0024);
    };
  }
  function coffre(c, p, x, y, z, w, d, h){
    face(c, p, [x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h], LAQUE);
    face(c, p, [x, y, z], [x, y + d, z], [x, y + d, z + h], [x, y, z + h], mix(LAQUE, SUMI, .4));
    face(c, p, [x, y, z], [x + w, y, z], [x + w, y, z + h], [x, y, z + h], LAQUE);
    c.lineWidth = .003; c.strokeStyle = P(OR_MOYEN);   // les ferrures dorées
    [.15, .85].forEach(f => { const a = p(x + w * f, y, z), b = p(x + w * f, y, z + h); c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke(); });
    const m = p(x + w / 2, y, z + h * .55); ellipse(c, m[0], m[1], .008, .008, OR_MOYEN, .0016);
  }
  function kicho(c, p, x, y, z, w, h, tissu){   // l'écran de tissu sur pied (kichō)
    poteau(c, p, x, y, z, z + h + .02, LAQUE, .007); poteau(c, p, x + w, y, z, z + h + .02, LAQUE, .007);
    face(c, p, [x - .01, y, z + h + .02], [x + w + .01, y, z + h + .02], [x + w + .01, y, z + h + .012], [x - .01, y, z + h + .012], LAQUE, .0016);
    const n = 4;
    for (let k = 0; k < n; k++){
      const a = x + w * k / n + .002, b = x + w * (k + 1) / n - .002;
      face(c, p, [a, y, z + .006], [b, y, z + .006], [b, y, z + h + .01], [a, y, z + h + .01], k % 2 ? tissu : mix(tissu, SUMI, .18), .0024);
      const r = p((a + b) / 2, y, z + h + .01);
      trace(c, [[r[0] - .002, r[1]], [r[0] + .002, r[1]], [r[0] + .002, r[1] + h * .55], [r[0] - .002, r[1] + h * .55]], k % 2 ? VERMILLON : SUMI, 0);
    }
  }
  /* un toit à coins relevés (pagode, tour) : le bas de l'avant-toit, les deux pointes, la pente concave, les tuiles */
  function toit(c, cx, y0, deb, haut, sommet, coul, nervures = true){
    const g = cx - deb, d = cx + deb, rel = haut * .9;
    const ch = () => {
      c.beginPath();
      c.moveTo(g - .014, y0 - rel);
      c.quadraticCurveTo(g + .008, y0 + .004, g + deb * .3, y0 + .004);
      c.lineTo(d - deb * .3, y0 + .004);
      c.quadraticCurveTo(d - .008, y0 + .004, d + .014, y0 - rel);
      c.quadraticCurveTo(d - deb * .25, y0 - haut * .45, cx + sommet, y0 - haut);
      c.lineTo(cx - sommet, y0 - haut);
      c.quadraticCurveTo(g + deb * .25, y0 - haut * .45, g - .014, y0 - rel);
      c.closePath();
    };
    ch(); c.fillStyle = P(coul); c.fill();
    if (nervures){
      c.save(); ch(); c.clip();
      c.lineWidth = .0024; c.strokeStyle = P(mix(coul, SUMI, .45));
      for (let x = g; x < d; x += .011){ c.beginPath(); c.moveTo(x, y0 + .01); c.lineTo(cx + (x - cx) * .55, y0 - haut); c.stroke(); }
      c.fillStyle = P(mix(coul, SUMI, .55)); c.fillRect(g - .02, y0 - .006, deb * 2 + .04, .01);   // la rive de l'avant-toit
      c.restore();
    }
    ch(); c.lineWidth = LW; c.strokeStyle = rgb(SUMI); c.stroke();
  }

  /* =================================== les scènes =================================== */
  /* Chaque scène : son pigment, son sceau, ses brumes (u0, u1, hauteur, épaisseur), les zones où le nuage du haut reste
     haut (garde), et ses pas de peinture (chaque pas est court : la peinture se fait par tranches). */
  const SCENES = {
    anglais: {
      titre: "le pavillon sur l'eau", couleur: GUNJO, sceau: "英",
      brumes: [[0, .26, .42, .045]],
      peindre: (c, R, C) => [
        () => mont(c, [[-.05, .42], [.12, .33], [.26, .38], [.42, .29], [.58, .36], [.74, .31], [.9, .38], [1.1, .34]], .62, mix(ROKUSHO, WASHI, .35), C, R),
        () => {
          const bord = [];
          for (let k = 0; k <= 30; k++){ const u = -.05 + 1.15 * k / 30; bord.push([u, .56 + .025 * sin(u * 8 + 1) + .012 * sin(u * 23)]); }
          eau(c, bord, 1.06, C); rive(c, bord);
        },
        () => { pin(c, .95, .6, .27, R, -1); pin(c, .07, .58, .22, R, 1); },
        () => {
          const p = vue(.14, .84);
          const devant = pavillon(c, p, { x: .28, y: .03, w: .36, d: .34, z: .09, h: .15, pilotis: -.07, tatami: true, mur: mix(C, GOFUN, .72), motif: "vagues", rampe: SHU });
          personnage(c, ...p(.45, .18, .09), .11, [C, mix(C, GOFUN, .45), GOFUN], 1, "livre");
          devant();
        },
        () => oiseaux(c, [[.62, .25, .014], [.67, .23, .011], [.71, .26, .012]])
      ]
    },
    cime: {
      titre: "la cime", couleur: ROKUSHO, sceau: "頂",
      brumes: [[0, .2, .5, .05], [.62, .86, .44, .04]],
      garde: [[.3, .55]],
      peindre: (c, R, C) => [
        () => mont(c, [[-.05, .7], [.1, .55], [.22, .4], [.33, .29], [.41, .25], [.48, .29], [.6, .4], [.74, .52], [.9, .6], [1.1, .64]], .95, mix(C, WASHI, .12), GUNJO, R),
        () => torii(c, .41, .27, .07),
        () => {
          mont(c, [[-.05, .7], [.06, .62], [.16, .65], [.26, .76], [.3, .82]], .95, mix(C, SUMI, .18), mix(GUNJO, SUMI, .2), R);
          mont(c, [[.4, .86], [.54, .7], [.68, .64], [.84, .68], [1.1, .74]], .95, mix(C, SUMI, .1), mix(C, SUMI, .45), R);
        },
        () => {
          const ch = [[.74, .9], [.64, .8], [.66, .72], [.56, .64], [.5, .54], [.45, .43], [.42, .3]];
          c.lineCap = "round"; c.lineJoin = "round";
          ligne(c, ch, .022, SUMI); ligne(c, ch, .015, OCRE);
          c.lineCap = "butt"; c.lineWidth = .002; c.strokeStyle = rgb(SUMI);
          for (let k = 0; k < ch.length - 1; k++) for (let m = 1; m < 4; m++){   // les marches
            const x = lerp(ch[k][0], ch[k + 1][0], m / 4), y = lerp(ch[k][1], ch[k + 1][1], m / 4);
            c.beginPath(); c.moveTo(x - .008, y); c.lineTo(x + .008, y); c.stroke();
          }
        },
        () => {
          const p = vue(.08, .76);
          const devant = pavillon(c, p, { x: .04, y: 0, w: .18, d: .14, z: 0, h: .085, mur: mix(C, GOFUN, .7), motif: "monts" });
          personnage(c, ...p(.14, .07, 0), .065, [mix(C, SUMI, .3), C, GOFUN], 1, "livre");
          devant();
        },
        () => marcheur(c, .6, .66, .08, [C, GOFUN]),
        () => { pin(c, .26, .44, .13, R, 1); pin(c, .58, .43, .11, R, -1); pin(c, .86, .66, .17, R, -1); },
        () => oiseaux(c, [[.7, .3, .013], [.75, .28, .01]])
      ]
    },
    chine: {
      titre: "la pagode et le pont", couleur: [212, 158, 30], sceau: "華",
      brumes: [[.3, .62, .47, .04]],
      garde: [[.66, .94]],
      peindre: (c, R, C) => {
        const KARST = mix(ROKUSHO, WASHI, .5), KARST_C = mix(GUNJO, ROKUSHO, .5), EAU = mix(GUNJO, ROKUSHO, .35);
        return [
          () => {   // les pics de karst, au loin, en trois plans
            [[.36, .26, .2], [.52, .3, .16], [.62, .22, .18], [.96, .28, .2]].forEach(([x, h, l]) => pic(c, x, .62, .62 - h, l, mix(KARST, WASHI, .35), mix(KARST_C, WASHI, .3)));
            [[.44, .36, .16], [.74, .34, .18], [.28, .4, .14]].forEach(([x, h, l]) => pic(c, x, .64, .64 - h, l, KARST, KARST_C));
          },
          () => {   // la rivière, et ses deux rives
            const bord = []; for (let k = 0; k <= 24; k++){ const u = -.05 + 1.15 * k / 24; bord.push([u, .6 + .006 * sin(u * 14)]); }
            courant(c, bord, 1.06, EAU);
            trace(c, [[-.06, .58], [.04, .6], [.1, .64], [.13, .7], [.08, 1.06], [-.06, 1.06]], mix(OCRE, WASHI, .45));
            trace(c, [[.5, .69], [.56, .655], [.66, .645], [.82, .655], [.96, .64], [1.11, .64], [1.11, 1.06], [.5, 1.06]], mix(OCRE, WASHI, .45));
            rive(c, [[.5, .69], [.56, .655], [.66, .645], [.82, .655], [.96, .64], [1.11, .64]], mix(ROKUSHO, WASHI, .3));
          },
          () => {   // le pont en arche : la voûte et son reflet font un cercle entier
            const xm = .31, yE = .655, rA = .075, x0 = .1, x1 = .52, yD = .54;
            c.beginPath(); c.arc(xm, yE, rA, 0, PI); c.lineWidth = .016; c.strokeStyle = P(mix(EAU, GOFUN, .5)); c.stroke();
            c.lineWidth = LW; c.strokeStyle = rgb(SUMI); c.stroke();
            const caisse = new Path2D();
            caisse.moveTo(x0, yE + .02); caisse.quadraticCurveTo(xm, yD - .06, x1, yE + .02);
            caisse.lineTo(x1, yE); caisse.lineTo(xm + rA, yE); caisse.arc(xm, yE, rA, 0, PI, true); caisse.lineTo(x0, yE); caisse.closePath();
            c.fillStyle = P(PIERRE_C); c.fill(caisse);
            c.save(); c.clip(caisse);
            c.lineWidth = .0022; c.strokeStyle = P(mix(PIERRE, SUMI, .4));
            for (let k = 0; k <= 12; k++){ const a = PI + k * PI / 12; c.beginPath(); c.moveTo(xm + cos(a) * rA, yE + sin(a) * rA); c.lineTo(xm + cos(a) * (rA + .028), yE + sin(a) * (rA + .028)); c.stroke(); }
            c.beginPath(); c.arc(xm, yE, rA + .028, PI, 2 * PI); c.stroke();
            for (let y = yE - .012; y > yD - .04; y -= .016){ c.beginPath(); c.moveTo(x0, y); c.lineTo(x1, y); c.stroke(); }
            c.restore();
            c.lineWidth = LW; c.strokeStyle = rgb(SUMI); c.stroke(caisse);
            // le parapet : des poteaux de pierre le long de la courbe, une lisse
            const courbe = t => { const u = 1 - t; return [u * u * x0 + 2 * u * t * xm + t * t * x1, u * u * (yE + .02) + 2 * u * t * (yD - .06) + t * t * (yE + .02)]; };
            const rail = [];
            for (let k = 0; k <= 10; k++){ const [px, py] = courbe(.04 + .92 * k / 10); rail.push([px, py - .026]); trace(c, [[px - .004, py], [px + .004, py], [px + .004, py - .03], [px - .004, py - .03]], PIERRE_C, .0022); }
            ligne(c, rail, .007, SUMI); ligne(c, rail, .004, PIERRE_C);
            marcheur(c, .36, courbe(.62)[1] - .002, .062, [C, GOFUN]);
          },
          () => {   // la pagode à cinq étages : murs blancs, piliers vermillon, tuiles vernies
            const cx = .8; let y = .66;
            trace(c, [[cx - .095, y], [cx + .095, y], [cx + .085, y - .02], [cx - .085, y - .02]], PIERRE_C);
            y -= .02;
            for (let k = 0; k < 5; k++){
              const bw = .118 - k * .016, bh = .046 - k * .003, rh = .03 - k * .0015, deb = bw / 2 + .038 - k * .003;
              trace(c, [[cx - bw / 2, y], [cx + bw / 2, y], [cx + bw / 2, y - bh], [cx - bw / 2, y - bh]], GOFUN);
              const nC = 4;
              for (let m = 0; m <= nC; m++){ const px = cx - bw / 2 + bw * m / nC; trace(c, [[px - .004, y], [px + .004, y], [px + .004, y - bh], [px - .004, y - bh]], SHU, .0018); }
              trace(c, [[cx - bw * .14, y], [cx + bw * .14, y], [cx + bw * .14, y - bh * .7], [cx - bw * .14, y - bh * .7]], k === 0 ? LAQUE : mix(SHU, SUMI, .35), .0022);
              y -= bh;
              toit(c, cx, y, deb, rh, (.118 - (k + 1) * .016) / 2, C);
              y -= rh;
            }
            ligne(c, [[cx, y], [cx, y - .085]], .007, SUMI);   // la flèche et ses anneaux
            for (let m = 0; m < 5; m++) ellipse(c, cx, y - .01 - m * .013, .014 - m * .0016, .004, OR_MOYEN, .0018);
            ellipse(c, cx, y - .09, .008, .008, OR_MOYEN, .002);
          },
          () => {   // le bosquet de bambous, à gauche
            bambou(c, .03, .74, -.08, .014, R, .02); bambou(c, .085, .72, -.04, .012, R, -.02); bambou(c, .135, .76, .02, .011, R, .015);
          },
          () => {   // une barque, une ligne
            const x = .66, y = .74;
            trace(c, [[x - .07, y - .012], [x + .07, y - .014], [x + .05, y + .012], [x - .05, y + .012]], BOIS);
            personnage(c, x, y - .01, .06, [mix(C, SUMI, .2), GOFUN, GOFUN], -1);
            ligne(c, [[x + .03, y - .05], [x + .1, y + .03]], .004, SUMI);
          },
          () => oiseaux(c, [[.5, .22, .013], [.55, .2, .01]])
        ];
      }
    },
    lecture: {
      titre: "le cabinet aux érables", couleur: SHU, sceau: "読",
      brumes: [[0, .2, .44, .05]],
      peindre: (c, R, C) => [
        () => erable(c, .46, .62, .42, R, 70),
        () => {
          const p = vue(.16, .84);
          const devant = pavillon(c, p, { x: .1, y: .03, w: .46, d: .38, z: .05, h: .18, tatami: true, mur: mix(C, GOFUN, .78), motif: "erables", pilier: C, rampe: C });
          const lv = [[INDIGO, .03], [OCRE, .02], [GUNJO, .025], [mix(C, SUMI, .3), .02]];
          let z0 = .05;
          lv.forEach(([col, ep]) => { face(c, p, [.16, .31, z0], [.24, .31, z0], [.24, .31, z0 + ep], [.16, .31, z0 + ep], col, .0024); z0 += ep; });
          face(c, p, [.16, .31, z0], [.24, .31, z0], [.24, .38, z0], [.16, .38, z0], mix(INDIGO, GOFUN, .3), .0024);
          face(c, p, [.3, .14, .085], [.42, .14, .085], [.42, .24, .085], [.3, .24, .085], LAQUE);
          face(c, p, [.3, .14, .085], [.42, .14, .085], [.42, .14, .075], [.3, .14, .075], mix(LAQUE, SUMI, .4));
          poteau(c, p, .305, .14, .05, .075, LAQUE, .005); poteau(c, p, .415, .14, .05, .075, LAQUE, .005);
          face(c, p, [.32, .16, .086], [.4, .16, .086], [.4, .22, .086], [.32, .22, .086], GOFUN, .0024);
          const m1 = p(.36, .16, .086), m2 = p(.36, .22, .086); c.lineWidth = .002; c.beginPath(); c.moveTo(m1[0], m1[1]); c.lineTo(m2[0], m2[1]); c.stroke();
          personnage(c, ...p(.46, .2, .05), .12, [C, mix(C, GOFUN, .55), [230, 200, 120]], 1, "pinceau");
          devant();
        },
        () => erable(c, .98, .86, .4, R, 60),
        () => { for (let k = 0; k < 12; k++) etoile(c, .5 + R() * .4, .7 + R() * .1, .011 + R() * .005, k % 2 ? C : [226, 110, 40], R() * PI); }
      ]
    },
    sceau: {
      titre: "la salle du sceau", couleur: MURASAKI, sceau: "契",
      brumes: [[0, .22, .4, .05], [.6, .84, .48, .04]],
      peindre: (c, R, C) => [
        () => { pin(c, .06, .5, .17, R, 1); mont(c, [[.22, .44], [.34, .36], [.46, .4], [.58, .34], [.72, .41], [.84, .38]], .52, mix(C, WASHI, .55), C, R); },
        () => {
          const p = vue(.2, .84);
          const devant = pavillon(c, p, { x: .08, y: .03, w: .48, d: .4, z: .06, h: .19, bois: [128, 90, 60], mur: mix(C, GOFUN, .78), motif: "nuees", pilier: LAQUE, rampe: LAQUE });
          kicho(c, p, .14, .36, .06, .1, .13, C); kicho(c, p, .4, .38, .06, .1, .13, mix(C, SHU, .25));
          personnage(c, ...p(.17, .17, .06), .12, [C, mix(C, GOFUN, .5), GOFUN], -1);
          personnage(c, ...p(.46, .22, .06), .12, [mix(ROKUSHO, SUMI, .45), OCRE, GOFUN], 1);
          coffre(c, p, .27, .2, .06, .08, .06, .05);
          face(c, p, [.25, .07, .061], [.4, .07, .061], [.4, .13, .061], [.25, .13, .061], GOFUN, .0024);   // l'acte, et son sceau
          c.lineWidth = .0016; c.strokeStyle = rgb(SUMI);
          for (let k = 1; k < 7; k++){ const a = p(.25 + k * .018, .075, .061), b = p(.25 + k * .018, .125, .061); c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke(); }
          const sx = p(.37, .1, .061); c.fillStyle = P(VERMILLON); c.fillRect(sx[0] - .008, sx[1] - .008, .016, .016);
          devant();
        },
        () => pin(c, .97, .76, .2, R, -1),
        () => oiseaux(c, [[.1, .3, .013], [.14, .28, .01]])
      ]
    },
    dojo: {
      titre: "la salle d'armes", couleur: [150, 50, 34], sceau: "鍛",
      brumes: [[0, .2, .42, .045]],
      peindre: (c, R, C) => [
        () => { mont(c, [[-.05, .44], [.14, .36], [.3, .4], [.5, .32], [.7, .38], [.86, .35], [1.1, .4]], .56, mix(PIN_C, WASHI, .45), mix(C, SUMI, .2), R); },
        () => { pin(c, .97, .74, .26, R, -1); },
        () => {
          const p = vue(.16, .85), z = .05, Y1 = .42;
          const devant = pavillon(c, p, { x: .06, y: .02, w: .52, d: .4, z, h: .2, bois: PLANCHER, mur: mix(C, GOFUN, .86), motif: "planches", pilier: C, rampe: null });
          // le kakejiku du fond : 道 (la voie)
          face(c, p, [.25, Y1, z + .19], [.33, Y1, z + .19], [.33, Y1, z + .05], [.25, Y1, z + .05], GOFUN, .0026);
          const k1 = p(.24, Y1, z + .19), k2 = p(.34, Y1, z + .19);
          ligne(c, [k1, k2], .008, SUMI);
          const tc = p(.29, Y1, z + .12);
          texteUnite(c, "道", tc[0], tc[1], .05, JP, 700);
          // le kamidana : un petit autel de laque sur une étagère
          face(c, p, [.4, Y1, z + .16], [.52, Y1, z + .16], [.52, Y1 - .05, z + .16], [.4, Y1 - .05, z + .16], BOIS, .0024);
          face(c, p, [.43, Y1 - .02, z + .16], [.49, Y1 - .02, z + .16], [.49, Y1 - .02, z + .2], [.43, Y1 - .02, z + .2], LAQUE, .0024);
          ligne(c, [p(.42, Y1 - .02, z + .2), p(.5, Y1 - .02, z + .2)], .006, OR_MOYEN);
          // le râtelier de sabres, sur le mur de droite
          for (let k = 0; k < 4; k++){ const a = p(.58, .08 + k * .07, z + .03), b = p(.58, .1 + k * .07, z + .17); ligne(c, [a, b], .007, SUMI); ligne(c, [a, b], .004, KIRI); }
          // le tambour (taiko) sur son support
          const tb = p(.5, .3, z);
          trace(c, [[tb[0] - .03, tb[1]], [tb[0] - .02, tb[1] - .03], [tb[0] + .02, tb[1] - .03], [tb[0] + .03, tb[1]]], LAQUE, .0024);
          ellipse(c, tb[0], tb[1] - .06, .032, .04, C);
          ellipse(c, tb[0] + .006, tb[1] - .06, .024, .032, GOFUN, .0024);
          // les deux combattants
          combattant(c, ...p(.2, .17, z), .2, [INDIGO, GOFUN], 1, 1);
          combattant(c, ...p(.44, .13, z), .2, [mix(C, SUMI, .45), mix(C, GOFUN, .6)], -1, 0);
          devant();
        },
        () => oiseaux(c, [[.64, .26, .013], [.69, .24, .01]])
      ]
    },
    musique: {
      titre: "le pavillon des cordes", couleur: [204, 72, 120], sceau: "楽",
      brumes: [[.0, .2, .46, .045], [.7, .9, .4, .04]],
      peindre: (c, R, C) => [
        () => mont(c, [[-.05, .44], [.16, .35], [.36, .4], [.56, .33], [.78, .39], [1.1, .35]], .58, mix(ROKUSHO, WASHI, .45), mix(C, SUMI, .1), R),
        () => {
          const p = vue(.24, .84), z = .06;
          const devant = pavillon(c, p, { x: .12, y: .03, w: .46, d: .36, z, h: .17, tatami: true, mur: mix(C, GOFUN, .82), motif: "ume", pilier: LAQUE, rampe: C });
          // le koto : une longue caisse de kiri posée au sol, ses cordes et ses chevalets
          const X0 = .2, X1 = .4, Ya = .1, Yb = .16, zt = z + .014;
          face(c, p, [X0, Ya, z], [X1, Ya, z], [X1, Ya, zt], [X0, Ya, zt], mix(KIRI, SUMI, .3));
          face(c, p, [X0, Ya, zt], [X1, Ya, zt], [X1, Yb, zt], [X0, Yb, zt], KIRI);
          c.lineWidth = .0012; c.strokeStyle = rgb(SUMI);
          for (let k = 1; k < 7; k++){ const Y = Ya + (Yb - Ya) * k / 7, a = p(X0 + .01, Y, zt), b = p(X1 - .01, Y, zt); c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke(); }
          for (let k = 1; k < 7; k++){ const Y = Ya + (Yb - Ya) * k / 7, q = p(X0 + .05 + k * .018, Y, zt); trace(c, [[q[0] - .004, q[1] + .003], [q[0] + .004, q[1] + .003], [q[0], q[1] - .006]], GOFUN, .0012); }
          personnage(c, ...p(.3, .22, z), .12, [C, mix(C, GOFUN, .5), GOFUN], 1);
          personnage(c, ...p(.5, .2, z), .12, [mix(INDIGO, C, .25), mix(OCRE, GOFUN, .3), GOFUN], 1, "biwa");
          devant();
        },
        () => prunier(c, .06, .84, .6, R, C),
        () => { for (let k = 0; k < 8; k++) fleur(c, .74 + R() * .24, .54 + R() * .3, .01, k % 2 ? C : GOFUN); },
        () => oiseaux(c, [[.7, .26, .013]])
      ]
    },
    jardin: {
      titre: "le jardin sec", couleur: [96, 150, 66], sceau: "庭",
      brumes: [[0, .26, .38, .045]],
      peindre: (c, R, C) => {
        const p = vue(.2, .8), SABLE = mix(GOFUN, WASHI, .45), MOUSSE = C;
        const rochers = [[.28, .2, .07, .06], [.4, .26, .04, .035], [.62, .12, .055, .07]];
        return [
          () => {   // le mur de terre au fond, son toit de tuiles
            face(c, p, [-.3, .5, 0], [.9, .5, 0], [.9, .5, .14], [-.3, .5, .14], mix(OCRE, WASHI, .5));
            c.lineWidth = .002; c.strokeStyle = P(mix(OCRE, SUMI, .3));
            for (let k = 1; k < 3; k++){ const a = p(-.3, .5, k * .045), b = p(.9, .5, k * .045); c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke(); }
            face(c, p, [-.3, .5, .14], [.9, .5, .14], [.9, .56, .17], [-.3, .56, .17], mix(GUNJO, SUMI, .55));
          },
          () => pin(c, .86, .5, .26, R, -1),
          () => {   // les buissons taillés (karikomi), en rangs ronds
            [[.02, .44, .07], [.14, .43, .06], [.68, .47, .07], [.8, .46, .05]].forEach(([x, y, r]) => {
              ellipse(c, x, y, r, r * .62, MOUSSE, 0);
              c.save(); c.beginPath(); c.ellipse(x, y, r, r * .62, 0, 0, PI * 2); c.clip();
              ellipse(c, x, y - r * .45, r * .9, r * .38, mix(MOUSSE, GOFUN, .3), 0); c.restore();
              ellipse(c, x, y, r, r * .62, null);
            });
          },
          () => {   // le sable ratissé : des lignes droites, et des cercles autour des rochers
            face(c, p, [-.3, 0, 0], [.85, 0, 0], [.85, .46, 0], [-.3, .46, 0], SABLE, 0);
            c.save(); trace(c, [p(-.3, 0, 0), p(.85, 0, 0), p(.85, .46, 0), p(-.3, .46, 0)], null, 0); c.clip();
            c.lineWidth = .0022; c.strokeStyle = P(mix(WASHI, SUMI, .3));
            for (let Y = .02; Y < .46; Y += .022){ const a = p(-.3, Y, 0), b = p(.85, Y, 0); c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke(); }
            rochers.forEach(([X, Y, r]) => {
              const q = p(X, Y, 0);
              c.beginPath(); c.ellipse(q[0], q[1], r * 2.4, r * 2.4 * .42, 0, 0, PI * 2); c.fillStyle = P(SABLE); c.fill();
              for (let m = 1; m <= 3; m++){ c.beginPath(); c.ellipse(q[0], q[1], r * (1.1 + m * .42), r * (1.1 + m * .42) * .42, 0, 0, PI * 2); c.stroke(); }
            });
            c.restore();
            trace(c, [p(-.3, 0, 0), p(.85, 0, 0)], null, .003, false);
          },
          () => {   // les rochers : facettes plates, coiffe de mousse
            rochers.forEach(([X, Y, r], k) => {
              const q = p(X, Y, 0), h = r * (1.3 + (k % 2) * .5);
              const pts = [[q[0] - r, q[1]], [q[0] - r * .8, q[1] - h * .6], [q[0] - r * .3, q[1] - h], [q[0] + r * .4, q[1] - h * .9], [q[0] + r, q[1] - h * .3], [q[0] + r * 1.05, q[1]]];
              trace(c, pts, PIERRE);
              trace(c, [pts[1], pts[2], [q[0] - r * .1, q[1] - h * .55], [q[0] - r * .6, q[1] - h * .3]], PIERRE_C, .0024);
              trace(c, [[q[0] - r * .3, q[1] - h], [q[0] + r * .4, q[1] - h * .9], [q[0] + r * .5, q[1] - h * .72], [q[0] - r * .2, q[1] - h * .8]], MOUSSE, .0024);
            });
          },
          () => {   // la lanterne de pierre (tōrō)
            const x = .1, y = .76;
            trace(c, [[x - .04, y], [x + .04, y], [x + .03, y - .02], [x - .03, y - .02]], PIERRE);
            trace(c, [[x - .012, y - .02], [x + .012, y - .02], [x + .012, y - .12], [x - .012, y - .12]], PIERRE_C);
            trace(c, [[x - .035, y - .12], [x + .035, y - .12], [x + .03, y - .14], [x - .03, y - .14]], PIERRE);
            trace(c, [[x - .026, y - .14], [x + .026, y - .14], [x + .026, y - .19], [x - .026, y - .19]], PIERRE_C);
            trace(c, [[x - .012, y - .15], [x + .012, y - .15], [x + .012, y - .18], [x - .012, y - .18]], [250, 214, 120], .002);
            toit(c, x, y - .19, .05, .03, .008, PIERRE, false);
            ellipse(c, x, y - .235, .01, .012, PIERRE_C, .0026);
          },
          () => {   // la véranda (engawa), et celle qui regarde le jardin
            const q = vue(.66, .9);
            face(c, q, [0, 0, .04], [.4, 0, .04], [.4, .2, .04], [0, .2, .04], PLANCHER);
            face(c, q, [0, 0, .04], [.4, 0, .04], [.4, 0, .02], [0, 0, .02], mix(PLANCHER, SUMI, .4));
            c.lineWidth = .002; c.strokeStyle = P(mix(PLANCHER, SUMI, .5));
            for (let k = 1; k < 5; k++){ const a = q(k * .08, 0, .04), b = q(k * .08, .2, .04); c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke(); }
            poteau(c, q, .02, 0, -.04, .02, LAQUE, .008); poteau(c, q, .38, 0, -.04, .02, LAQUE, .008);
            personnage(c, ...q(.18, .1, .04), .11, [mix(INDIGO, C, .3), C, GOFUN], -1);
          }
        ];
      }
    },
    tour: {
      titre: "la tour blanche", couleur: [38, 60, 118], sceau: "塔",
      brumes: [[0, .22, .5, .04]],
      garde: [[.32, .74]],
      peindre: (c, R, C) => {
        const cx = .53, TOIT = mix(C, SUMI, .3);
        return [
          () => {   // les douves
            const bord = []; for (let k = 0; k <= 20; k++){ const u = -.05 + 1.15 * k / 20; bord.push([u, .73 + .006 * sin(u * 17)]); }
            eau(c, bord, 1.06, mix(C, GUNJO, .5), .036); rive(c, bord, mix(PIN_C, WASHI, .3));
          },
          () => {   // l'enceinte de pierre (ishigaki) : pente en éventail, assises décalées
            const b0 = .74, b1 = .55, base = new Path2D();
            base.moveTo(cx - .25, b0); base.quadraticCurveTo(cx - .2, b0 - .07, cx - .17, b1);
            base.lineTo(cx + .17, b1); base.quadraticCurveTo(cx + .2, b0 - .07, cx + .25, b0); base.closePath();
            c.fillStyle = P(PIERRE); c.fill(base);
            c.save(); c.clip(base);
            c.lineWidth = .0022; c.strokeStyle = P(mix(PIERRE, SUMI, .55));
            let rang = 0;
            for (let y = b1 + .018; y < b0 + .01; y += .02, rang++){
              c.beginPath(); c.moveTo(cx - .3, y); c.lineTo(cx + .3, y); c.stroke();
              for (let x = cx - .3 + (rang % 2) * .022; x < cx + .3; x += .044){ c.beginPath(); c.moveTo(x, y - .02); c.lineTo(x, y); c.stroke(); }
            }
            c.restore();
            c.lineWidth = LW; c.strokeStyle = rgb(SUMI); c.stroke(base);
          },
          () => {   // les trois étages : murs blancs, bardage sombre, fenêtres ; toits d'ardoise indigo, pignons
            const etages = [[.3, .07, .05], [.22, .058, .045], [.15, .05, .04]];
            let y = .55;
            etages.forEach(([lw, bh, rh], k) => {
              trace(c, [[cx - lw / 2, y], [cx + lw / 2, y], [cx + lw / 2, y - bh], [cx - lw / 2, y - bh]], GOFUN);
              trace(c, [[cx - lw / 2, y], [cx + lw / 2, y], [cx + lw / 2, y - bh * .35], [cx - lw / 2, y - bh * .35]], mix(SUMI, INDIGO, .4), .0024);
              const nf = k === 2 ? 3 : 4;
              for (let m = 0; m < nf; m++){
                const fx = cx - lw / 2 + lw * (m + .5) / nf;
                trace(c, [[fx - .011, y - bh * .5], [fx + .011, y - bh * .5], [fx + .011, y - bh * .82], [fx - .011, y - bh * .82]], LAQUE, .002);
                c.lineWidth = .0016; c.strokeStyle = P(GOFUN);
                for (let b = -1; b <= 1; b++){ c.beginPath(); c.moveTo(fx + b * .006, y - bh * .5); c.lineTo(fx + b * .006, y - bh * .82); c.stroke(); }
              }
              y -= bh;
              toit(c, cx, y, lw / 2 + .04, rh, k === 2 ? .045 : (etages[k + 1][0] / 2), TOIT);
              if (k < 2){   // le pignon triangulaire (chidori-hafu), sa ferrure d'or
                const gy = y - rh * .2;
                trace(c, [[cx - .045, gy], [cx + .045, gy], [cx, gy - .04]], GOFUN, .0026);
                ellipse(c, cx, gy - .014, .006, .006, OR_MOYEN, .0016);
              }
              y -= rh;
            });
            // le faîte et ses deux poissons d'or (shachihoko)
            ligne(c, [[cx - .045, y], [cx + .045, y]], .008, SUMI);
            [-1, 1].forEach(s => {
              const fx = cx + s * .045;
              c.beginPath(); c.moveTo(fx, y); c.quadraticCurveTo(fx + s * .012, y - .02, fx - s * .004, y - .032); c.quadraticCurveTo(fx - s * .002, y - .018, fx - s * .01, y - .004); c.closePath();
              c.fillStyle = P(OR_MOYEN); c.fill(); c.lineWidth = .0022; c.strokeStyle = rgb(SUMI); c.stroke();
            });
          },
          () => {   // les bannières (nobori), les pins
            [[.86, .74], [.92, .75]].forEach(([x, y]) => {
              ligne(c, [[x, y], [x, y - .3]], .005, SUMI);
              trace(c, [[x + .003, y - .29], [x + .04, y - .29], [x + .04, y - .1], [x + .003, y - .1]], C, .0024);
              ellipse(c, x + .022, y - .25, .011, .011, GOFUN, .002);
            });
            pin(c, .12, .74, .26, R, 1); pin(c, .22, .74, .16, R, -1);
          },
          () => oiseaux(c, [[.74, .3, .013], [.78, .28, .01], [.81, .31, .009]])
        ];
      }
    }
  };
  function texteUnite(c, txt, x, y, taille, police, poids = 600){   // écrire en unités, net à toute échelle
    const m = c.getTransform();
    c.save(); c.setTransform(1, 0, 0, 1, 0, 0);
    c.font = `${poids} ${taille * m.a}px ${police}`; c.textAlign = "center"; c.textBaseline = "middle";
    c.fillStyle = rgb(SUMI);
    c.fillText(txt, m.a * x + m.e, m.d * y + m.f);
    c.restore();
  }
  const NOMS_SCENES = Object.keys(SCENES);

  /* le choix de la scène : el.scene, sinon le nom */
  function sceneDe(el, rang){
    if (el.scene && SCENES[el.scene]) return el.scene;
    const n = String(el.nom || "").toUpperCase();
    const regles = [
      [/990|ANGLAIS|ENGLISH/, "anglais"], [/CUMBRE|ESPAGNOL|SPANISH/, "cime"], [/MANDARIN|CHINOIS|CHINESE|中文/, "chine"],
      [/PIANO|SHRED|GUITARE|GUITAR|MUSIQUE|MUSIC/, "musique"], [/LECTURE|LIRE|LIVRE|PHILO|READ/, "lecture"],
      [/CLOSING|CONTRAT|VENTE/, "sceau"], [/FORGE|CORPS|SPORT|DOJO|MUSCU/, "dojo"], [/JARDIN|MÉDIT|MEDIT|CALME/, "jardin"]
    ];
    for (const [re, s] of regles) if (re.test(n)) return s;
    return rang % 2 ? "jardin" : "tour";
  }
  function hache(s){ let h = 2166136261; for (const ch of String(s)) { h ^= ch.codePointAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }

  /* =================================== peindre une scène dans sa toile cachée =================================== */
  function toileUnites(L, s){
    const cv = document.createElement("canvas"); cv.width = ceil(L * s); cv.height = ceil(s);
    const c = cv.getContext("2d"); c.setTransform(s, 0, 0, s, 0, 0); return [cv, c];
  }
  function peindreSceau(car, px, R){
    const cv = document.createElement("canvas"); cv.width = cv.height = px;
    const c = cv.getContext("2d"), m = px * .07;
    c.fillStyle = rgb(VERMILLON); c.fillRect(0, 0, px, px);
    c.strokeStyle = rgb(WASHI); c.lineWidth = max(1, px * .04); c.strokeRect(m, m, px - 2 * m, px - 2 * m);
    c.fillStyle = rgb(WASHI); c.textAlign = "center"; c.textBaseline = "middle";
    c.font = `700 ${px * .6}px ${JP}`; c.fillText(car, px / 2, px / 2 + px * .03);
    for (let k = 0; k < 22; k++){   // la pâte qui manque, nette
      c.fillStyle = k % 3 ? rgb(WASHI) : rgb(VERMILLON);
      c.fillRect(R() * px, R() * px, max(1, px * .014 * (1 + R())), max(1, px * .014 * (1 + R())));
    }
    return cv;
  }
  /* la peinture d'une scène, par pas courts (générateur) ; mode : "trait" (pas faite) ou "couleur" (faite) */
  function* peindreScene(S, s, mode){
    const R = graine(S.graine);
    const [cv, c] = toileUnites(L_SCENE, s);
    trait = mode === "trait";
    papier(c, L_SCENE, R, cv.width, cv.height); yield;
    const pas = S.modele.peindre(c, R, S.couleur);
    for (const f of pas){ trait = mode === "trait"; f(); yield; }
    trait = mode === "trait";
    // les nuages : en couleur, des TROUS dans le papier (l'or vit dessous) ; au trait, l'or éteint, dessiné
    const tu = L_SCENE / NX_OR, tv = 1 / NY_OR;
    if (trait){
      c.fillStyle = rgb(mix(WASHI, GOFUN, .45)); c.fill(S.nuages);
      c.save(); c.clip(S.nuages);
      c.lineWidth = 1 / s; c.strokeStyle = "rgba(150,118,64,.07)";
      const g = new Path2D();
      for (let i = 1; i < NX_OR; i++){ g.moveTo(i * tu, 0); g.lineTo(i * tu, 1); }
      for (let j = 1; j < NY_OR; j++){ g.moveTo(0, j * tv); g.lineTo(L_SCENE, j * tv); }
      c.stroke(g); c.restore();
      c.lineWidth = .0034; c.strokeStyle = rgb(mix(OR_BORD, WASHI, .35));
      S.rectsNuages.forEach(q => { const p = new Path2D(); rondRect(p, q[0], q[1], q[2], q[3], .014); c.stroke(p); });
    } else {
      c.save(); c.globalCompositeOperation = "destination-out"; c.fill(S.nuages); c.restore();
      c.save(); c.clip(S.nuages);
      c.lineWidth = max(1, s * .0016) / s; c.strokeStyle = "rgba(104,70,20,.26)";   // les jointures des feuilles d'or
      const g = new Path2D();
      for (let i = 1; i < NX_OR; i++){ g.moveTo(i * tu, 0); g.lineTo(i * tu, 1); }
      for (let j = 1; j < NY_OR; j++){ g.moveTo(0, j * tv); g.lineTo(L_SCENE, j * tv); }
      c.stroke(g); c.restore();
      c.lineWidth = .0062; c.strokeStyle = rgb(OR_BORD);
      S.rectsNuages.forEach(q => { const p = new Path2D(); rondRect(p, q[0], q[1], q[2], q[3], .014); c.stroke(p); });
    }
    yield;
    cartouche(c, S, s, R, mode);
    if (trait){   // la place du sceau, vide : on sait où toucher
      const k = SCEAU.s, x0 = SCEAU.u - k / 2, y0 = SCEAU.v - k / 2;
      c.fillStyle = rgb(mix(WASHI, GOFUN, .6)); c.fillRect(x0, y0, k, k);
      c.lineWidth = .003; c.strokeStyle = rgb(mix(VERMILLON, WASHI, .25)); c.strokeRect(x0, y0, k, k);
      c.lineWidth = .0016; c.strokeRect(x0 + k * .09, y0 + k * .09, k * .82, k * .82);
      texteCouleur(c, S.car, SCEAU.u, SCEAU.v + k * .03, k * .5, JP, mix(VERMILLON, WASHI, .5));
    }
    trait = false;
    return cv;
  }
  function texteCouleur(c, txt, x, y, taille, police, coul){
    const m = c.getTransform();
    c.save(); c.setTransform(1, 0, 0, 1, 0, 0);
    c.font = `700 ${taille * m.a}px ${police}`; c.textAlign = "center"; c.textBaseline = "middle";
    c.fillStyle = rgb(coul); c.fillText(txt, m.a * x + m.e, m.d * y + m.f);
    c.restore();
  }
  /* le cartouche : le nom en capitales gravées (Georgia, encre noire), la ligne mono dessous */
  function cartouche(c, S, s, R, mode){
    const el = S.el, nom = String(el.nom || "").toUpperCase();
    const ligneMono = `série ${el.serie ?? 0} j · ${el.minutes ?? 0} min`;
    c.save(); c.setTransform(1, 0, 0, 1, 0, 0);
    const maxW = (L_SCENE - CART.u - .06) * s;
    let fs = .07 * s, ls = .02 * s;
    c.font = `600 ${fs}px ${SERIF}`;
    let wNom = largeurEspacee(c, nom, ls);
    if (wNom > maxW - .06 * s){ const k = (maxW - .06 * s) / wNom; fs *= k; ls *= k; c.font = `600 ${fs}px ${SERIF}`; wNom = largeurEspacee(c, nom, ls); }
    const fm = .042 * s;
    c.font = `500 ${fm}px ${MONO}`;
    const wMono = largeurEspacee(c, ligneMono, .004 * s);
    const w = max(wNom, wMono) + .06 * s, h = CART.h * s, x = CART.u * s, y = CART.v * s;
    // l'ombre nette, le papier teinté (ou blanc au trait), le kirihaku, le double filet d'encre
    c.fillStyle = "rgba(0,0,0,.22)"; c.fillRect(x + .007 * s, y + .009 * s, w, h);
    c.fillStyle = rgb(mode === "trait" ? mix(GOFUN, WASHI, .25) : mix(S.couleur, GOFUN, .74)); c.fillRect(x, y, w, h);
    if (mode !== "trait"){
      for (let k = 0; k < 16; k++){ c.fillStyle = rgb(mix(OR_MOYEN, OR_CLAIR, R() * .5)); const q = (.005 + R() * .007) * s; c.fillRect(x + R() * (w - q), y + R() * (h - q), q, q); }
    }
    c.strokeStyle = rgb(SUMI); c.lineWidth = max(1.2, .0042 * s); c.strokeRect(x + .003 * s, y + .003 * s, w - .006 * s, h - .006 * s);
    c.lineWidth = max(.8, .0016 * s); c.strokeRect(x + .011 * s, y + .011 * s, w - .022 * s, h - .022 * s);
    c.fillStyle = rgb(SUMI); c.textBaseline = "alphabetic";
    c.font = `600 ${fs}px ${SERIF}`; espace(c, nom, x + w / 2, y + h * .54, ls);
    c.font = `500 ${fm}px ${MONO}`; c.fillStyle = rgb([34, 32, 30]); espace(c, ligneMono, x + w / 2, y + h * .82, .004 * s);
    c.restore();
    S.cartW = w / s;
  }

  /* la couverture de brocart indigo, au début du rouleau (à gauche) */
  function peindreCouverture(s){
    const L = L_COUV, [cv, c] = toileUnites(L, s);
    c.fillStyle = rgb(INDIGO); c.fillRect(.02, 0, L - .02, 1);
    c.save(); c.beginPath(); c.rect(.02, 0, L - .02, 1); c.clip();   // tatewaku : les vapeurs montantes, en fil d'or
    c.lineWidth = .004; c.strokeStyle = rgb(OR_MOYEN);
    for (let x0 = .05; x0 < L + .02; x0 += .055) for (const sg of [-1, 1]){
      c.beginPath(); for (let y = 0; y <= 1.001; y += .01) c.lineTo(x0 + sg * .012 * sin(y * PI * 8), y); c.stroke();
    }
    c.fillStyle = rgb(mix(OR_MOYEN, GOFUN, .3));
    for (let x0 = .078; x0 < L; x0 += .055) for (let y = .04; y < 1; y += .0625){ c.beginPath(); c.arc(x0, y + (x0 * 20 % 2) * .03, .0055, 0, PI * 2); c.fill(); }
    c.restore();
    trace(c, [[0, 0], [.022, 0], [.022, 1], [0, 1]], [150, 126, 76], .0026);   // le hassō (baguette de bord)
    trace(c, [[.12, .08], [.18, .08], [.18, .56], [.12, .56]], mix(WASHI, GOFUN, .4), .0026);   // le daisen (étiquette du titre)
    ["日", "々", "の", "巻"].forEach((ch, k) => texteUnite(c, ch, .15, .14 + k * .11, .052, JP, 600));
    c.lineCap = "round";   // le cordon (himo)
    [[.014, SUMI], [.008, [150, 34, 46]]].forEach(([lw, coul]) => {
      c.beginPath(); c.moveTo(.012, .5);
      c.bezierCurveTo(.09, .52, .1, .66, .06, .74); c.bezierCurveTo(.03, .82, .08, .9, .1, .97);
      c.lineWidth = lw; c.strokeStyle = rgb(coul); c.stroke();
    });
    c.lineCap = "butt";
    return cv;
  }
  /* le papier de fin (okugaki) : une tuile qui se répète jusqu'au cylindre */
  function peindreFin(s){
    const L = .5, [cv, c] = toileUnites(L, s), R = graine(77);
    papier(c, L, R, cv.width, cv.height);
    const ch = new Path2D();
    rondRect(ch, -.06, -.06, L + .06, .14, .014); rondRect(ch, -.06, .86, L + .06, 1.06, .014);
    c.fillStyle = rgb(mix(WASHI, GOFUN, .45)); c.fill(ch);
    c.lineWidth = .0034; c.strokeStyle = rgb(mix(OR_BORD, WASHI, .35)); c.stroke(ch);
    c.fillStyle = "rgba(110,104,92,.13)"; c.fillRect(L - .009, 0, .009, 1);
    return cv;
  }

  /* =================================== le cylindre (la loi 4) =================================== */
  function cylindre(ctx, cx, y, h, Rr, phase){
    const kr = max(Rr * .55, .02 * h), kh = .065 * h;
    const tr = (pts, fond) => { chemin(ctx, pts); ctx.fillStyle = rgb(fond); ctx.fill(); ctx.lineWidth = 1.2; ctx.strokeStyle = rgb(SUMI); ctx.stroke(); };
    tr([[cx - kr, y + h], [cx + kr, y + h], [cx + kr, y + h + kh], [cx - kr, y + h + kh]], LAQUE);   // l'axe dépasse en bas
    ctx.fillStyle = rgb(OR_MOYEN); ctx.fillRect(cx - kr, y + h + kh * .22, kr * 2, max(1, kh * .12));
    const nb = 7;   // le cylindre : sept aplats, l'éclairage en paliers (pas de dégradé)
    for (let b = 0; b < nb; b++){
      const a0 = -PI / 2 + PI * b / nb, a1 = a0 + PI / nb, am = (a0 + a1) / 2;
      const e = clamp(.35 + .65 * cos(am + .55)), coul = mix(mix(WASHI_DOS, SUMI, .45), mix(WASHI, GOFUN, .3), e);
      ctx.fillStyle = rgb(coul); ctx.fillRect(cx + Rr * sin(a0), y, Rr * (sin(a1) - sin(a0)) + .5, h);
    }
    ctx.lineWidth = 1; ctx.strokeStyle = "rgba(60,56,50,.55)";   // les bords des tours de papier, qui tournent avec le rouleau
    for (let m = 0; m < 3; m++){
      const a = ((phase + m * 2.09) % (PI * 2) + PI * 2) % (PI * 2) - PI;
      if (abs(a) > PI / 2 - .05) continue;
      const x = cx + Rr * sin(a); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.stroke();
    }
    ctx.lineWidth = 1.2; ctx.strokeStyle = rgb(SUMI); ctx.strokeRect(cx - Rr, y, Rr * 2, h);
    const ry = .24;   // la tranche du haut : la spirale des tours de papier
    ctx.beginPath(); ctx.ellipse(cx, y, Rr, Rr * ry, 0, 0, PI * 2); ctx.fillStyle = rgb(mix(WASHI, GOFUN, .2)); ctx.fill();
    ctx.lineWidth = .8; ctx.strokeStyle = "rgba(70,64,56,.7)"; ctx.beginPath();
    const tours = 4, rc = R_AXE * h;
    for (let f = 0; f <= tours * PI * 2; f += .2){ const q = rc + (Rr - rc) * f / (tours * PI * 2); ctx.lineTo(cx + q * cos(f - phase), y + q * sin(f - phase) * ry); }
    ctx.stroke();
    ctx.lineWidth = 1.2; ctx.strokeStyle = rgb(SUMI); ctx.beginPath(); ctx.ellipse(cx, y, Rr, Rr * ry, 0, 0, PI * 2); ctx.stroke();
    tr([[cx - kr, y - kh], [cx + kr, y - kh], [cx + kr, y], [cx - kr, y]], LAQUE);   // l'axe dépasse en haut, laque et anneau d'or
    ctx.fillStyle = "rgba(255,255,255,.18)"; ctx.fillRect(cx - kr * .55, y - kh, kr * .35, kh);
    ctx.beginPath(); ctx.ellipse(cx, y - kh, kr, kr * ry, 0, 0, PI * 2); ctx.fillStyle = rgb(mix(LAQUE, GOFUN, .12)); ctx.fill();
    ctx.lineWidth = 1.2; ctx.strokeStyle = rgb(SUMI); ctx.stroke();
    ctx.fillStyle = rgb(OR_MOYEN); ctx.fillRect(cx - kr, y - kh * .32, kr * 2, max(1, kh * .12));
  }

  /* ===================================================================================================== */
  /* =================================== le composant =================================== */
  function monter(conteneur, elementsInit, options){
    const o = options || {};
    const onOuvrir = o.onOuvrir || (() => {}), onCocher = o.onCocher || (() => {});

    /* ---------- le DOM : une toile, et une liste accessible (une entrée par scène) ---------- */
    if (getComputedStyle(conteneur).position === "static") conteneur.style.position = "relative";
    const ancienStyle = conteneur.getAttribute("style") || "";
    Object.assign(conteneur.style, { touchAction: "pan-y", userSelect: "none", webkitUserSelect: "none", webkitTapHighlightColor: "transparent", overflow: "hidden", cursor: "grab", outline: "none" });
    conteneur.setAttribute("role", "list");
    if (!conteneur.hasAttribute("aria-label")) conteneur.setAttribute("aria-label", "Le rouleau des apps : flèches pour défiler, Entrée pour ouvrir, Espace pour cocher");
    const cv = document.createElement("canvas");
    cv.setAttribute("aria-hidden", "true");
    cv.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block;touch-action:pan-y";
    conteneur.prepend(cv);
    const ctx = cv.getContext("2d");

    /* ---------- l'état ---------- */
    let W = 0, Htot = 0, h = 250, bandY = 20, dpr = 1, s = 250;   // s = h·dpr : l'échelle des toiles cachées
    let scenes = [];                        // les enregistrements, dans l'ordre du rouleau
    let couverture = null, fin = null, motifFin = null;
    let pos = 0, vel = 0, cible = 0, mode = "repos", acc = 0;   // la loi (1) : x, ẋ, x*, le mode
    let geste = null, roueFin = 0, roueEchant = [];
    let tDernier = 0, vivant = true, visible = true, rafId = 0, dernierDessin = 0;
    let focus = -1, eclat = null, zones = [], chantier = [], chantierEnCours = null;
    const banc = { images: [], intervalles: [] };   // le banc : la durée de chaque image (ms)
    let tPrecedent = 0;

    /* ---------- les enregistrements de scène ---------- */
    function nouvelleScene(el, rang){
      const cle = sceneDe(el, rang), modele = SCENES[cle];
      const S = {
        id: el.id, el: { ...el }, cle, modele,
        couleur: el.couleur || modele.couleur, car: el.sceau || modele.sceau,
        graine: hache(el.id + "|" + cle), k: (hache(el.id) % 97) / 9.7,
        fait: !!el.fait, cv: null, avant: null, tChange: -1e9, sens: 0,
        a: 1, tAjout: null, tRetrait: null, sale: true,
        item: null, sceauCv: null
      };
      nuages(S, graine(S.graine ^ 0x5bd1e995));
      feuillesOr(S, graine(S.graine ^ 0x27d4eb2f));
      return S;
    }
    function itemDe(S){   // une entrée de liste, focalisable, dite par les lecteurs d'écran
      const d = document.createElement("div");
      d.setAttribute("role", "listitem");
      d.tabIndex = -1;
      d.style.cssText = "position:absolute;left:0;top:0;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap";
      d.addEventListener("focus", () => { focus = scenes.indexOf(S); allerA(S, true); });
      conteneur.appendChild(d);
      return d;
    }
    function libelle(S){
      const el = S.el;
      return `${el.nom}, ${el.fait ? "fait aujourd'hui" : "pas encore fait"}, série ${el.serie ?? 0} jours, ${el.minutes ?? 0} minutes`;
    }
    function majItem(S){
      S.item.setAttribute("aria-label", libelle(S));
      S.item.textContent = libelle(S);
    }
    function rovingTab(){
      const actifs = scenes.filter(S => S.tRetrait === null);
      const f = actifs[clamp(focus, 0, actifs.length - 1)] || actifs[0];
      actifs.forEach(S => { S.item.tabIndex = S === f ? 0 : -1; });
    }

    /* ---------- la peinture : synchrone pour ce qui se voit et ce qui change ; le reste par tranches, au repos ---------- */
    function peindreTout(S){
      const g = peindreScene(S, s, S.fait ? "couleur" : "trait");
      let r = g.next(); while (!r.done) r = g.next();
      S.cv = r.value; S.sale = false;
      S.sceauCv = peindreSceau(S.car, max(8, round(SCEAU.s * s)), graine(S.graine ^ 77));
    }
    function planifier(){
      chantier = scenes.filter(S => S.sale);
      chantierEnCours = null;
    }
    function avancerChantier(budget){
      const t0 = performance.now();
      while (performance.now() - t0 < budget){
        if (!chantierEnCours){
          const S = chantier.shift(); if (!S) return;
          if (!S.sale) continue;
          chantierEnCours = { S, g: peindreScene(S, s, S.fait ? "couleur" : "trait") };
        }
        const r = chantierEnCours.g.next();
        if (r.done){
          const S = chantierEnCours.S;
          S.cv = r.value; S.sale = false;
          S.sceauCv = peindreSceau(S.car, max(8, round(SCEAU.s * s)), graine(S.graine ^ 77));
          chantierEnCours = null;
        }
      }
    }

    /* ---------- la géométrie du rouleau (en px, coordonnée s le long du papier) ---------- */
    const Ls = () => L_SCENE * h;
    function debuts(){   // le début de chaque scène sur le papier, selon sa largeur animée
      let a = 0; return scenes.map(S => { const q = a; a += S.a * Ls(); return q; });
    }
    function centre(S){ const d = debuts(), i = scenes.indexOf(S); return d[i] + S.a * Ls() / 2; }
    function bornes(){
      // au début, la première scène au centre ; sur un grand écran, la couverture se pose plutôt au bord gauche.
      // à la fin, la dernière scène au centre, ou collée au cylindre si l'écran est large.
      const d = debuts(), act = scenes.map((S, i) => [S, i]).filter(([S]) => S.tRetrait === null);
      if (!act.length) return [0, 0];
      const [S0, i0] = act[0], [S1, i1] = act[act.length - 1];
      const c0 = d[i0] + S0.a * Ls() / 2, c1 = d[i1] + S1.a * Ls() / 2, bout = d[i1] + S1.a * Ls();
      const b0 = max(c0, W / 2 - 16 - L_COUV * h);
      const b1 = max(b0, min(c1, bout - W / 2 + 26 + .09 * h));
      return [b0, b1];
    }
    function aimant(x){   // la scène dont le centre est le plus proche, ramenée dans les bornes
      const d = debuts(), [b0, b1] = bornes(); let best = null, dm = 1e18;
      scenes.forEach((S, i) => { if (S.tRetrait !== null) return; const c = clamp(d[i] + S.a * Ls() / 2, b0, b1), e = abs(c - x); if (e < dm){ dm = e; best = c; } });
      return best === null ? 0 : best;
    }
    function sceneAuCentre(){
      const d = debuts(); let best = null, dm = 1e18;
      scenes.forEach((S, i) => { if (S.tRetrait !== null) return; const e = abs(d[i] + S.a * Ls() / 2 - pos); if (e < dm){ dm = e; best = S; } });
      return best;
    }

    /* ---------- la loi (1) : l'intégration ---------- */
    function lacher(v){
      vel = v;
      const [b0, b1] = bornes();
      cible = clamp(aimant(clamp(pos + v / GAMMA, b0, b1)), b0, b1);
      mode = "libre";
    }
    function allerA(S, doux = true){
      const [b0, b1] = bornes();
      cible = clamp(centre(S), b0, b1);
      if (doux){ mode = "libre"; } else { pos = cible; vel = 0; mode = "repos"; }
    }
    function integrer(dt){
      if (mode !== "libre") return;
      acc += min(dt, .1);
      const [b0, b1] = bornes();
      while (acc >= PAS_PHYS){
        const dehors = pos < b0 - .5 || pos > b1 + .5;
        const g = dehors ? GAMMA_BORD : GAMMA, w = dehors ? OMEGA_BORD : OMEGA;
        const a = -g * vel - w * w * (pos - cible);
        vel += a * PAS_PHYS;          // Euler semi-implicite : la vitesse d'abord,
        pos += vel * PAS_PHYS;        // puis la position avec la nouvelle vitesse
        acc -= PAS_PHYS;
      }
      if (abs(vel) < 4 && abs(pos - cible) < .3){ pos = cible; vel = 0; mode = "repos"; acc = 0; }
    }
    function elastique(dx){   // hors des bords, le doigt ne tire plus qu'à 35 %
      const [b0, b1] = bornes();
      if ((pos < b0 && dx < 0) || (pos > b1 && dx > 0)) return dx * .35;
      return dx;
    }
    function vitesseDe(echant){   // régression linéaire sur les 90 dernières ms
      const t1 = echant.length ? echant[echant.length - 1][0] : 0;
      const e = echant.filter(q => t1 - q[0] <= 90);
      if (e.length < 2) return 0;
      let st = 0, sx = 0, stt = 0, stx = 0; const n = e.length;
      e.forEach(([t, x]) => { const u = (t - t1) / 1000; st += u; sx += x; stt += u * u; stx += u * x; });
      const den = n * stt - st * st;
      return abs(den) < 1e-9 ? 0 : (n * stx - st * sx) / den;
    }

    /* ---------- les dimensions ---------- */
    function dimension(){
      const r = conteneur.getBoundingClientRect();
      const w = r.width; if (!w) return;
      const nh = round(clamp(w * .64, 230, 280)), nd = min(window.devicePixelRatio || 1, 2);
      const mY = round(nh * .085) + 4, nHtot = nh + 2 * mY;
      if (abs(nHtot - Htot) > .5) conteneur.style.height = nHtot + "px";
      const ancienCentre = sceneAuCentre(), decal = ancienCentre ? pos - centre(ancienCentre) : 0, ancienH = h;
      const changeEchelle = nh !== h || nd !== dpr || !couverture;
      W = w; Htot = nHtot; h = nh; bandY = mY; dpr = nd;
      cv.width = round(W * dpr); cv.height = round(Htot * dpr);
      if (changeEchelle){
        s = h * dpr;
        couverture = peindreCouverture(s);
        fin = peindreFin(s); motifFin = null;
        scenes.forEach(S => { S.sale = true; S.cv = null; S.avant = null; });
        // ce qui se voit d'abord, tout de suite ; le reste par tranches
        const vus = scenes.filter(S => { const c = centre(S); return abs(c - pos) < W; });
        vus.forEach(peindreTout);
        planifier();
      }
      if (ancienCentre){ pos = centre(ancienCentre) + decal * h / ancienH; cible = aimant(pos); }
      dessiner(maintenant());
    }

    /* ---------- le rendu d'une image ---------- */
    const Lum = { x: 0, y: 0 };
    function dorer(S, x, y, boost, onde){
      const G = S.or, d = G.img.data, nx = G.nx, nrm = G.nrm, L = Ls(), tw = L / nx, th = h / G.ny;
      const ez = 1.7 * max(W, 3 * h), lz = .9 * max(W, 3 * h), ex = W / 2, ey = bandY + h / 2;
      for (let q = 0; q < G.liste.length; q++){
        const idx = G.liste[q], i = idx % nx, j = (idx / nx) | 0;
        const px = x + (i + .5) * tw, py = y + (j + .5) * th;
        let lx = Lum.x - px, ly = Lum.y - py, l = 1 / hypot(lx, ly, lz); lx *= l; ly *= l; const lzn = lz * l;
        let vx = ex - px, vy = ey - py, v = 1 / hypot(vx, vy, ez); vx *= v; vy *= v; const vzn = ez * v;
        let hx = lx + vx, hy = ly + vy, hz = lzn + vzn; const hh = 1 / hypot(hx, hy, hz); hx *= hh; hy *= hh; hz *= hh;
        const n0 = nrm[idx * 3], n1 = nrm[idx * 3 + 1], n2 = nrm[idx * 3 + 2];
        const nl = max(0, n0 * lx + n1 * ly + n2 * lzn), nh = max(0, n0 * hx + n1 * hy + n2 * hz);
        const w = onde ? onde(px, py) : 0, b = boost + w;
        const sp = min(.9, (pow(nh, 48) * .42 + pow(nh, 320) * .8) * b) * .8, lum = (.3 + .7 * nl) * (.86 + .12 * (b - 1));
        d[idx * 4] = min(255, OR_SOMBRE[0] + (OR_MOYEN[0] - OR_SOMBRE[0]) * lum + OR_CLAIR[0] * sp + 40 * w);
        d[idx * 4 + 1] = min(255, OR_SOMBRE[1] + (OR_MOYEN[1] - OR_SOMBRE[1]) * lum + OR_CLAIR[1] * sp + 8 * w);
        d[idx * 4 + 2] = max(0, min(255, OR_SOMBRE[2] + (OR_MOYEN[2] - OR_SOMBRE[2]) * lum + OR_CLAIR[2] * sp - 16 * w));
      }
      G.cx.putImageData(G.img, 0, 0);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(G.cv, x, y, L, h);
      ctx.imageSmoothingEnabled = true;
    }
    const DUR_COUP = 320, DUR_PEINT = 1100, DEB_PEINT = 340, DUR_EFFACE = 900;
    function dessiner(t){
      const t0 = performance.now();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, Htot);
      if (!W) return;
      Lum.x = W * (.5 + .34 * sin(t / 6100)); Lum.y = bandY - h * .9 + h * .25 * cos(t / 7700);
      const L = Ls(), d = debuts();
      const x0 = W / 2 - pos;                         // l'écran x du point s = 0 du papier
      const xR = v => round(v * dpr) / dpr;           // poser au pixel près : les toiles restent nettes
      // le cylindre : la loi (4)
      const total = scenes.reduce((a, S) => a + S.a * L, 0) + .9 * h;
      const xc0 = W - 8 - R_PLEIN * h;
      const roule = clamp((total - (xc0 - x0)) / h, 0, 99), Lplein = max(1, total / h);
      const e = PI * (R_PLEIN * R_PLEIN - R_AXE * R_AXE) / Lplein;
      const rr = sqrt(R_AXE * R_AXE + e * roule / PI), Rpx = rr * h, xc = W - 8 - Rpx;
      // l'ombre portée du papier
      const xg = max(-4, x0 - L_COUV * h);
      ctx.fillStyle = "rgba(0,0,0,.5)"; ctx.fillRect(xg + 4, bandY + 7, xc - xg, h);
      ctx.save(); ctx.beginPath(); ctx.rect(-4, bandY - 2, xc + 4, h + 4); ctx.clip();
      // la couverture
      const xCouv = xR(x0 - L_COUV * h);
      if (xCouv + L_COUV * h > -2) ctx.drawImage(couverture, xCouv, bandY, L_COUV * h, h);
      zones = [];
      // les scènes
      scenes.forEach((S, i) => {
        const xs = xR(x0 + d[i]), wv = S.a * L;
        if (xs > xc + 2 || xs + wv < -2 || wv < .5) return;
        const a = t - S.tChange;
        let dx = 0, dy = 0;
        if (S.sens > 0 && a > DUR_COUP && a < DUR_COUP + 200){ const q = 1 - (a - DUR_COUP) / 200; dx = sin(a * .9) * 2.2 * q; dy = cos(a * .7) * 1.6 * q; }
        ctx.save();
        if (S.a < 1){ ctx.beginPath(); ctx.rect(xs, bandY - 1, wv, h + 2); ctx.clip(); }
        ctx.translate(dx, dy);
        const y = bandY, sx = xs + SCEAU.u * h, sy = y + SCEAU.v * h, demi = SCEAU.s * h / 2;
        const rMax = hypot(max(sx - xs, xs + L - sx), max(sy - y, y + h - sy)) + 4;
        let boost = 1;
        if (eclat && eclat.S === S) boost += 1.4 * exp(-(t - eclat.t) / 600);
        if (!S.cv){   // pas encore peinte : le papier nu (ne dure qu'un instant)
          ctx.fillStyle = rgb(WASHI); ctx.fillRect(xs, y, L, h);
        } else if (S.avant && S.sens > 0 && a < DEB_PEINT + DUR_PEINT){
          // le sceau frappe, puis la couleur se répand depuis le sceau, et l'or s'allume au front
          ctx.drawImage(S.avant, xs, y, L, h);
          const ray = rMax * lisse((a - DEB_PEINT) / DUR_PEINT);
          if (ray > 0){
            ctx.save(); ctx.beginPath(); ctx.arc(sx, sy, ray, 0, PI * 2); ctx.clip();
            dorer(S, xs, y, boost + .6, (px, py) => 2.4 * exp(-pow((hypot(px - sx, py - sy) - ray) / (.12 * h), 2)));
            ctx.drawImage(S.cv, xs, y, L, h);
            ctx.restore();
            ctx.lineWidth = 1.2; ctx.strokeStyle = `rgba(12,11,11,${.5 * (1 - ray / rMax)})`;
            ctx.save(); ctx.beginPath(); ctx.rect(xs, y, L, h); ctx.clip(); ctx.beginPath(); ctx.arc(sx, sy, ray, 0, PI * 2); ctx.stroke(); ctx.restore();
          }
        } else if (S.avant && S.sens < 0 && a < DUR_EFFACE){
          // la couleur se retire vers le sceau
          ctx.drawImage(S.cv, xs, y, L, h);
          const ray = rMax * (1 - lisse((a - 150) / (DUR_EFFACE - 150)));
          ctx.save(); ctx.beginPath(); ctx.arc(sx, sy, ray, 0, PI * 2); ctx.clip();
          dorer(S, xs, y, boost * .8, null);
          ctx.drawImage(S.avant, xs, y, L, h);
          ctx.restore();
        } else {
          if (S.avant){ S.avant = null; }
          if (S.fait) dorer(S, xs, y, boost + (S.sens > 0 ? .8 * exp(-(a - DEB_PEINT - DUR_PEINT) / 500) : 0), null);
          ctx.drawImage(S.cv, xs, y, L, h);
        }
        // le sceau rouge : il descend, frappe, l'encre se pose ; ou il se lève et s'efface
        if (S.sceauCv){
          if (S.fait && S.sens > 0 && a < DUR_COUP){
            const u = clamp(a / DUR_COUP), k = 1 + 1.5 * pow(1 - u, 2), w2 = demi * k;
            ctx.fillStyle = `rgba(0,0,0,${.28 * u})`; ctx.fillRect(sx - w2 + demi * .5 * (k - 1), sy - w2 + demi * .8 * (k - 1), w2 * 2, w2 * 2);
            ctx.save(); ctx.globalAlpha = .3 + .7 * u; ctx.drawImage(S.sceauCv, sx - w2, sy - w2, w2 * 2, w2 * 2); ctx.restore();
          } else if (S.fait){
            ctx.drawImage(S.sceauCv, xR(sx - demi), xR(sy - demi), demi * 2, demi * 2);
            const ar = (a - DUR_COUP) / 650;
            if (S.sens > 0 && ar > 0 && ar < 1){   // l'onde du coup, en filet vermillon net
              const q = demi * (1 + ar * 1.1);
              ctx.lineWidth = 2.2 * (1 - ar) + .6; ctx.strokeStyle = `rgba(196,36,26,${.75 * (1 - ar)})`; ctx.strokeRect(sx - q, sy - q, q * 2, q * 2);
            }
          } else if (S.sens < 0 && a < 520){
            const u = clamp(a / 520), k = 1 + .35 * u;
            ctx.save(); ctx.globalAlpha = 1 - u; ctx.drawImage(S.sceauCv, sx - demi * k, sy - demi * k - u * 6, demi * 2 * k, demi * 2 * k); ctx.restore();
          }
        }
        // le toucher qui ouvre : un cadre blanc net, un instant
        if (eclat && eclat.S === S){
          const al = 1 - lisse((t - eclat.t - 350) / 450);
          if (al > 0){ ctx.lineWidth = 2; ctx.strokeStyle = `rgba(242,240,234,${al})`; ctx.strokeRect(xs + 2, y + 2, L - 4, h - 4); }
        }
        // le focus clavier
        if (focus === i && conteneur.contains(document.activeElement) && document.activeElement !== conteneur){
          ctx.lineWidth = 2; ctx.strokeStyle = rgb([242, 240, 234]); ctx.setLineDash([6, 4]); ctx.strokeRect(xs + 4, y + 4, L - 8, h - 8); ctx.setLineDash([]);
        }
        ctx.restore();
        // les zones de toucher : la scène (jusqu'au cylindre), et le sceau (au moins 44 × 44 px)
        if (S.tRetrait === null && S.a > .9){
          const zs = max(44, SCEAU.s * h * 1.5);
          zones.push({ S, x: max(0, xs), y, w: min(xs + L, xc) - max(0, xs), h,
            sceau: { x: sx - zs / 2, y: sy - zs / 2, w: min(zs, xc - (sx - zs / 2)), h: zs } });
        }
      });
      // le papier de fin, jusqu'au cylindre
      const xFin = xR(x0 + scenes.reduce((a, S) => a + S.a * L, 0));
      if (xFin < xc){
        if (!motifFin){ motifFin = ctx.createPattern(fin, "repeat-x"); }
        ctx.save(); ctx.translate(xFin, bandY); ctx.scale(1 / dpr, 1 / dpr);
        ctx.fillStyle = motifFin; ctx.fillRect(0, 0, (xc - xFin) * dpr + 2, h * dpr);
        ctx.restore();
      }
      ctx.restore();
      cylindre(ctx, xc, bandY, h, Rpx, pos / Rpx);
      const dt = performance.now() - t0;
      banc.images.push([dt, mode !== "repos" || !!geste]);
      if (banc.images.length > 2000) banc.images.splice(0, 1000);
    }

    /* ---------- la boucle ---------- */
    function enMouvement(t){
      if (mode !== "repos" || geste) return true;
      if (scenes.some(S => t - S.tChange < 1600 || S.a < 1 || S.tRetrait !== null)) return true;
      if (eclat && t - eclat.t < 1000) return true;
      return false;
    }
    function boucle(){
      if (!vivant) return;
      rafId = requestAnimationFrame(boucle);
      const t = maintenant(), dt = tDernier ? (t - tDernier) / 1000 : 0;
      if (tPrecedent){ banc.intervalles.push(t - tPrecedent); if (banc.intervalles.length > 2000) banc.intervalles.splice(0, 1000); }
      tPrecedent = t; tDernier = t;
      if (!visible || document.hidden || !W) return;
      // les largeurs animées (une scène ajoutée se déroule, une retirée se roule) ; la scène du centre ne bouge pas
      const ancre = sceneAuCentre(), avantC = ancre ? centre(ancre) : 0;
      let change = false;
      scenes.forEach(S => {
        if (S.tAjout !== null){ S.a = lisse((t - S.tAjout) / 650); if (S.a >= 1){ S.a = 1; S.tAjout = null; } change = true; }
        if (S.tRetrait !== null){ S.a = 1 - lisse((t - S.tRetrait) / 550); change = true; }
      });
      const sortants = scenes.filter(S => S.tRetrait !== null && S.a <= 0);
      if (sortants.length){
        sortants.forEach(S => S.item.remove());
        scenes = scenes.filter(S => !sortants.includes(S));
        rovingTab();
      }
      if (change && ancre && scenes.includes(ancre) && !geste){ const dc = centre(ancre) - avantC; pos += dc; cible += dc; }
      integrer(dt);
      const bouge = enMouvement(t);
      if (!bouge && chantier.length + (chantierEnCours ? 1 : 0)) avancerChantier(6);   // peindre au repos seulement
      if (bouge || t - dernierDessin > 66){   // au repos, l'or bouge encore doucement (15 images par seconde suffisent)
        dessiner(t); dernierDessin = t;
      }
    }

    /* ---------- les gestes : doigt, souris, molette ---------- */
    const local = e => { const r = conteneur.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
    function surDown(e){
      if (e.pointerType === "mouse" && e.button !== 0) return;
      if (geste) return;
      const [x, y] = local(e), t = maintenant();
      const roulait = mode === "libre" && abs(vel) > 60;
      if (roulait){ mode = "tenu"; vel = 0; }
      geste = { id: e.pointerId, x0: x, y0: y, xp: x, t0: t, axe: null, roulait, echant: [[t, pos]], type: e.pointerType };
    }
    function surMove(e){
      if (!geste || e.pointerId !== geste.id) return;
      const [x, y] = local(e), dx = x - geste.x0, dy = y - geste.y0;
      if (!geste.axe && hypot(dx, dy) > 8){
        if (abs(dx) > abs(dy) * 1.1){
          geste.axe = "h"; mode = "doigt"; vel = 0;
          try { conteneur.setPointerCapture(e.pointerId); } catch (_) {}
          conteneur.style.cursor = "grabbing";
        } else {
          geste.axe = "v";   // le geste est vertical : c'est la page qui défile, on rend la main
          if (mode === "tenu") lacher(0);
        }
      }
      if (geste.axe === "h"){
        const d = x - geste.xp;
        pos -= elastique(d);
        geste.echant.push([maintenant(), pos]); if (geste.echant.length > 30) geste.echant.shift();
        if (e.cancelable) e.preventDefault();
      }
      geste.xp = x;
    }
    function surUp(e){
      if (!geste || e.pointerId !== geste.id) return;
      const g = geste; geste = null;
      conteneur.style.cursor = "grab";
      const [x, y] = local(e), duree = maintenant() - g.t0;
      if (g.axe === "h"){ g.echant.push([maintenant(), pos]); lacher(vitesseDe(g.echant)); return; }
      if (g.axe === "v"){ if (mode === "tenu") lacher(0); return; }
      if (g.roulait){ lacher(0); return; }   // un toucher sur le rouleau qui file l'arrête, sans ouvrir
      if (mode === "tenu") lacher(0);
      if (duree > 700) return;
      toucher(x, y);
    }
    function surCancel(e){
      if (!geste || e.pointerId !== geste.id) return;
      const g = geste; geste = null; conteneur.style.cursor = "grab";
      if (g.axe === "h") lacher(vitesseDe(g.echant)); else if (mode === "tenu" || mode === "doigt") lacher(0);
    }
    function toucher(x, y){
      for (const z of zones){
        const q = z.sceau;
        if (x >= q.x && x <= q.x + q.w && y >= q.y && y <= q.y + q.h){ onCocher(z.S.el); return; }
      }
      for (const z of zones){
        if (x >= z.x && x <= z.x + z.w && y >= z.y && y <= z.y + z.h){
          eclat = { S: z.S, t: maintenant() };
          focus = scenes.indexOf(z.S);
          allerA(z.S, true);
          onOuvrir(z.S.el);
          return;
        }
      }
    }
    function surRoue(e){
      let dx = e.deltaX, dy = e.deltaY;
      if (e.deltaMode === 1){ dx *= 16; dy *= 16; } else if (e.deltaMode === 2){ dx *= W; dy *= W; }
      if (e.shiftKey && !dx){ dx = dy; dy = 0; }
      if (!dx || abs(dx) < abs(dy)) return;   // la molette verticale reste à la page
      e.preventDefault();
      const t = maintenant();
      pos += elastique(dx); vel = 0; mode = "molette";
      roueEchant.push([t, pos]); if (roueEchant.length > 30) roueEchant.shift();
      clearTimeout(roueFin);
      roueFin = setTimeout(() => { roueEchant = []; if (mode === "molette") lacher(0); }, 140);
    }
    function surTouche(e){
      const actifs = scenes.filter(S => S.tRetrait === null);
      if (!actifs.length) return;
      let i = focus >= 0 && focus < scenes.length ? actifs.indexOf(scenes[focus]) : actifs.indexOf(sceneAuCentre());
      if (i < 0) i = 0;
      const vers = j => { j = clamp(j, 0, actifs.length - 1); focus = scenes.indexOf(actifs[j]); rovingTab(); actifs[j].item.focus({ preventScroll: true }); allerA(actifs[j], true); };
      switch (e.key){
        case "ArrowRight": case "ArrowDown": e.preventDefault(); vers(i + 1); break;
        case "ArrowLeft": case "ArrowUp": e.preventDefault(); vers(i - 1); break;
        case "Home": e.preventDefault(); vers(0); break;
        case "End": e.preventDefault(); vers(actifs.length - 1); break;
        case "Enter": e.preventDefault(); eclat = { S: actifs[i], t: maintenant() }; onOuvrir(actifs[i].el); break;
        case " ": case "Spacebar": e.preventDefault(); onCocher(actifs[i].el); break;
      }
    }
    conteneur.addEventListener("pointerdown", surDown);
    conteneur.addEventListener("pointermove", surMove);
    conteneur.addEventListener("pointerup", surUp);
    conteneur.addEventListener("pointercancel", surCancel);
    conteneur.addEventListener("wheel", surRoue, { passive: false });
    conteneur.addEventListener("keydown", surTouche);
    const obs = new ResizeObserver(() => dimension());
    obs.observe(conteneur);
    const io = "IntersectionObserver" in window ? new IntersectionObserver(es => { visible = es[es.length - 1].isIntersecting; }) : null;
    if (io) io.observe(conteneur);

    /* ---------- maj : l'état change ---------- */
    function maj(elements){
      const t = maintenant(), liste = elements || [], ids = new Set(liste.map(el => el.id));
      const anciens = new Map(scenes.map(S => [S.id, S]));
      const nouvelles = [];
      liste.forEach((el, rang) => {
        let S = anciens.get(el.id);
        if (S && S.tRetrait !== null){ S.tRetrait = null; S.tAjout = t - S.a * 650; }
        if (!S){
          S = nouvelleScene(el, rang);
          S.item = itemDe(S);
          if (scenes.length || nouvelles.length){ S.a = 0; S.tAjout = t; }
          S.el = { ...el }; majItem(S);
          if (W){ peindreTout(S); }
          nouvelles.push(S);
          return;
        }
        const avant = S.el, apres = { ...el };
        const sceneChange = sceneDe(apres, rang) !== S.cle || String(apres.couleur) !== String(avant.couleur) || apres.sceau !== avant.sceau;
        const texteChange = apres.nom !== avant.nom || apres.serie !== avant.serie || apres.minutes !== avant.minutes;
        S.el = apres;
        if (sceneChange){
          S.cle = sceneDe(apres, rang); S.modele = SCENES[S.cle];
          S.couleur = apres.couleur || S.modele.couleur; S.car = apres.sceau || S.modele.sceau;
          S.graine = hache(apres.id + "|" + S.cle);
          nuages(S, graine(S.graine ^ 0x5bd1e995)); feuillesOr(S, graine(S.graine ^ 0x27d4eb2f));
        }
        if (!!apres.fait !== S.fait){
          // le changement d'état : la nouvelle toile est peinte maintenant (une fois), l'ancienne sert à l'animation
          S.avant = S.cv; S.fait = !!apres.fait; S.sens = S.fait ? 1 : -1; S.tChange = t;
          if (W) peindreTout(S);
          if (!S.avant) S.sens = 0;
        } else if ((sceneChange || texteChange) && W){
          peindreTout(S);
        }
        majItem(S);
        nouvelles.push(S);
      });
      // les scènes retirées restent un instant, à leur place, le temps de se rouler
      scenes.forEach((S, k) => {
        if (ids.has(S.id)) return;
        if (S.tRetrait === null) S.tRetrait = t;
        const precedent = scenes.slice(0, k).reverse().find(q => nouvelles.includes(q));
        const at = precedent ? nouvelles.indexOf(precedent) + 1 : 0;
        nouvelles.splice(at, 0, S);
      });
      scenes = nouvelles;
      if (focus >= scenes.length) focus = scenes.length - 1;
      rovingTab();
      planifier();
    }

    /* ---------- le départ ---------- */
    maj(elementsInit || []);
    scenes.forEach(S => { S.a = 1; S.tAjout = null; S.sens = 0; S.avant = null; });
    dimension();
    pos = cible = bornes()[0];
    dessiner(maintenant());
    rafId = requestAnimationFrame(boucle);

    return {
      maj,
      aller(id){ const S = scenes.find(q => q.id === id); if (S) allerA(S, true); },
      arreter(){
        vivant = false; cancelAnimationFrame(rafId); clearTimeout(roueFin);
        obs.disconnect(); if (io) io.disconnect();
        conteneur.removeEventListener("pointerdown", surDown);
        conteneur.removeEventListener("pointermove", surMove);
        conteneur.removeEventListener("pointerup", surUp);
        conteneur.removeEventListener("pointercancel", surCancel);
        conteneur.removeEventListener("wheel", surRoue);
        conteneur.removeEventListener("keydown", surTouche);
        scenes.forEach(S => { S.item.remove(); S.cv = S.avant = null; });
        scenes = []; cv.remove();
        conteneur.setAttribute("style", ancienStyle);
        conteneur.removeAttribute("role");
      },
      /* le banc (pour les mesures) : durée de chaque image et intervalles entre images, en ms */
      banc(){
        const pixels = scenes.reduce((a, S) => a + (S.cv ? S.cv.width * S.cv.height : 0) + (S.avant ? S.avant.width * S.avant.height : 0) + (S.sceauCv ? S.sceauCv.width * S.sceauCv.height : 0) + NX_OR * NY_OR, 0)
          + (couverture ? couverture.width * couverture.height : 0) + (fin ? fin.width * fin.height : 0);
        return { images: banc.images.slice(), intervalles: banc.intervalles.slice(), pixelsCaches: pixels, dpr, hauteur: h, position: pos, mode };
      },
      viderBanc(){ banc.images.length = 0; banc.intervalles.length = 0; }
    };
  }

  return { monter, scenes: NOMS_SCENES };
})();

function emakiMonter(conteneur, elements, options){ return emakiAtelier.monter(conteneur, elements, options); }
const emakiScenes = emakiAtelier.scenes;
