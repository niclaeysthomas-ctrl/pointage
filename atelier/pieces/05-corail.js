/* ======================= Tour 1, pièce 05 : LE CORAIL (etude_corail) ======================= */
/* Ce qu'on voit : une matière grise, comme une pierre polie vue de très près, éclairée en biais. Au repos, vingt-huit taches
   y vivent doucement : les jours du mois, plus grosses quand la journée était pleine. Chaque priorité faite dépose une semence
   à sa place (quatre places, une par priorité) : un corail blanc en sort, se divise, pousse ses bras et gagne la pierre.
   Ce qui a poussé reste : la matière garde la trace de toute la journée.
   La loi : la réaction-diffusion de Gray-Scott (Turing, 1952 ; Pearson, 1993). Deux substances U et V diffusent et réagissent :
   ∂U/∂t = Dᵤ∇²U − UV² + F(1 − U), ∂V/∂t = Dᵥ∇²V + UV² − (F + k)V. Selon F et k, V forme des taches qui se divisent, des
   coraux ou des labyrinthes : la forme n'est pas dessinée, elle naît du calcul.
   La main : le relief en camaïeu de gris, la lumière rasante (le gradient de V donne l'ombre et le reflet).
   L'usage : « Ta journée ». Une semence par priorité, et le mois en fond.
   Le doigt : toucher dépose une semence de plus ; glisser déplace la lumière.
   Le seuil (Boucler) : la réaction change de régime (F et k passent dans la zone des labyrinthes) et des semences tombent
   partout : en quelques secondes, tout l'écran devient un labyrinthe blanc, comme un corail cérébral ; il reste.
   Le téléphone : une grille de 100 × 190 (19 000 cases) ; 6 à 20 itérations par image selon le moment ; une image de 19 000 pixels. */
const etude_corail_DONNEES = JOURNEE;

function etude_corail(){
  const D = etude_corail_DONNEES;
  let W = 390, H = 760, seed = 1952;
  const NX = 100; let NY = 190, U, V, U2, V2, Fm = null, img = null, ictx = null, im = null, tCarte = -1e9;
  let etape = 0, tG = [-1e9, -1e9, -1e9, -1e9], tSeuil = -1e9, F = .03, K = .062, lx = -.7, ly = -.7, dernier = 0, vite = 0;
  const M = { titre: "LE CORAIL", bouton: libelleGeste(0), ligne: ligneGeste(0), dprMax: 1.5 };
  const PLACES = [[.3, .3], [.7, .38], [.32, .66], [.7, .72]];

  function semer(x, y, r, v){ const R = graine((x * 1000 + y * 7) | 0);
    for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++){ if (i * i + j * j > r * r) continue; const a = Math.round(x + i), b = Math.round(y + j); if (a < 1 || b < 1 || a >= NX - 1 || b >= NY - 1) continue;
      const id = b * NX + a; V[id] = Math.max(V[id], v * (.8 + .2 * R())); U[id] = .5; } }
  function grille(){
    NY = Math.round(NX * H / W);
    U = new Float32Array(NX * NY).fill(1); V = new Float32Array(NX * NY); U2 = new Float32Array(NX * NY); V2 = new Float32Array(NX * NY); Fm = new Float32Array(NX * NY).fill(.03);
    img = document.createElement("canvas"); img.width = NX; img.height = NY; ictx = img.getContext("2d"); im = ictx.createImageData(NX, NY);
    const R = graine(seed); F = .03; K = .062;
    // le mois : vingt-huit taches, plus grosses quand la journée était pleine
    D.jours.forEach((n, k) => { if (!n) return; semer(4 + R() * (NX - 8), 4 + R() * (NY - 8), 1 + Math.round(n / 2), .5); });
  }
  function iterer(n){
    const Du = .21, Dv = .105;
    for (let s = 0; s < n; s++){
      for (let j = 1; j < NY - 1; j++){ const r = j * NX;
        for (let i = 1; i < NX - 1; i++){ const id = r + i, u = U[id], v = V[id];
          const lu = U[id - 1] + U[id + 1] + U[id - NX] + U[id + NX] - 4 * u, lv = V[id - 1] + V[id + 1] + V[id - NX] + V[id + NX] - 4 * v, uvv = u * v * v;
          const f = Fm[id]; U2[id] = u + Du * lu - uvv + f * (1 - u); V2[id] = v + Dv * lv + uvv - (f + K) * v; } }
      let tmp = U; U = U2; U2 = tmp; tmp = V; V = V2; V2 = tmp;
    }
  }
  /* la carte du régime : le corail (F = 0,0545) ne vit que dans un disque qui s'élargit autour de chaque semence ;
     ailleurs, les taches du mois restent sages (F = 0,03). Au seuil, le disque gagne tout l'écran depuis le centre. */
  function carte(t){
    const Z = [];
    tG.forEach((x, k) => { if (x > 0) Z.push([PLACES[k][0] * NX, PLACES[k][1] * NY, Math.min(30, 4 + (t - x) / 1000 * 7)]); });
    if (tSeuil > 0) Z.push([NX / 2, NY / 2, 6 + Math.pow((t - tSeuil) / 1000, 1.5) * 16]);
    for (let j = 0; j < NY; j++) for (let i = 0; i < NX; i++){ let f = .03;
      for (const [x, y, r] of Z){ const d = Math.hypot(i - x, j - y); if (d < r) { f = .0545; break; } if (d < r + 4) f = Math.max(f, .03 + .0245 * (1 - (d - r) / 4)); }
      Fm[j * NX + i] = f; }
  }
  function peindre(t){
    const d = im.data, lum = tSeuil > 0 ? lisse((t - tSeuil) / 3000) : 0;
    for (let j = 0; j < NY; j++) for (let i = 0; i < NX; i++){ const id = j * NX + i, v = V[id];
      const gx = (i > 0 && i < NX - 1) ? V[id + 1] - V[id - 1] : 0, gy = (j > 0 && j < NY - 1) ? V[id + NX] - V[id - NX] : 0;
      const relief = clamp(.5 + (gx * lx + gy * ly) * 3.2, 0, 1), m = lisse((v - .1) / .3);
      let b = 20 + m * (175 + 50 * lum) + (relief - .5) * (70 + 60 * m);
      b = clamp(b, 10, 250);
      d[id * 4] = b * .985; d[id * 4 + 1] = b * .98; d[id * 4 + 2] = b * .97 + 3; d[id * 4 + 3] = 255; }
    ictx.putImageData(im, 0, 0);
  }

  function frame(ctx, t){
    const dt = dernier ? Math.min(.05, (t - dernier) / 1000) : 1 / 60; dernier = t;
    if (!U) grille();
    // le rythme : lent au repos ; vif pendant quelques secondes après chaque geste ; très vif au seuil
    let n = 5;
    const recent = Math.max(...tG.map(x => t - x));
    if (tG.some(x => t - x < 5000)) n = 14;
    if (tSeuil > 0) n = t - tSeuil < 9000 ? 22 : 4;
    if (t - tCarte > 150){ tCarte = t; carte(t); }
    iterer(n); peindre(t);
    ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, 0, 0, W, H);
    // les places des quatre priorités : un petit repère gravé, qui s'efface quand la semence a poussé
    D.priorites.forEach((p, k) => { const [x, y] = PLACES[k], X = x * W, Y = y * H, on = tG[k] > 0, a = on ? 1 - clamp((t - tG[k]) / 2500) : .5;
      if (a <= 0) return; ctx.strokeStyle = rgb(BLANC, .55 * a); ctx.lineWidth = .8; ctx.beginPath(); ctx.arc(X, Y, 16 + (on ? (t - tG[k]) / 40 : 0), 0, 7); ctx.stroke();
      ctx.fillStyle = rgb(BLANC, .7 * a); ctx.font = "10px Georgia, serif"; ctx.textAlign = "center"; ctx.fillText(p.nom.toUpperCase().split("").join(" "), X, Y + 32); ctx.textAlign = "left"; });
    // un voile en haut et en bas, pour lire le titre et le bouton
    const g = ctx.createLinearGradient(0, 0, 0, 90); g.addColorStop(0, rgb(FOND, .8)); g.addColorStop(1, rgb(FOND, 0)); ctx.fillStyle = g; ctx.fillRect(0, 0, W, 90);
    passeGrain(ctx, W, H, t, .05);
    fondu(ctx, W, H, FOND, .84);
  }

  function geste(){
    const t = maintenant();
    if (etape >= 5){ seed += 29; grille(); etape = 0; tG = [-1e9, -1e9, -1e9, -1e9]; tSeuil = -1e9; M.bouton = libelleGeste(0); M.ligne = ligneGeste(0); return; }
    if (etape > 0 && etape <= 4 && t - tG[etape - 1] < 1500) return;
    if (etape < 4){ const [x, y] = PLACES[etape]; tG[etape] = t; semer(x * NX, y * NY, 5, .9); }
    else { tSeuil = t; const R = graine(seed + 9); for (let k = 0; k < 26; k++) semer(4 + R() * (NX - 8), 4 + R() * (NY - 8), 3, .9); }
    etape++; M.bouton = libelleGeste(etape); M.ligne = ligneGeste(etape);
  }
  M.taille = (w, h) => { const ch = Math.abs(w - W) > 2 || Math.abs(h - H) > 2; W = w; H = h; if (ch || !U){ grille(); } };
  M.frame = frame; M.geste = geste;
  M.tap = (x, y) => { if (U) semer(x / W * NX, y / H * NY, 3, .9); };
  M.glisse = (dx, dy) => { const a = Math.atan2(ly, lx) + dx * .01; lx = Math.cos(a); ly = Math.sin(a); };
  return M;
}
window.ETUDE = etude_corail;
