/* ======================= Atelier du Pointage : outils communs ======================= */
/* Repris de l'« atelier des mondes » d'Eliodor (mêmes noms, pour que ses pièces et les nôtres parlent la même langue),
   avec la palette du Pointage : gris neutre, le blanc pour seul accent (choix de Thomas, 26/10).
   Toute pièce peut appeler ces outils ; aucune ne les redéfinit. Le temps se lit avec maintenant(), jamais Date.now(). */
function graine(s){ return function(){ s|=0; s=s+0x6D2B79F5|0; let t=Math.imul(s^s>>>15,1|s); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }
function bruit1(seed){ const R = graine(seed), v = Array.from({length:512}, R); return x => { const i = Math.floor(x), f = x - i, a = v[i & 511], b = v[(i+1) & 511], u = f*f*(3-2*f); return a + (b-a)*u; }; }
function bruit2(seed){ const R = graine(seed), v = Array.from({length:4096}, R);
  const h = (i,j) => v[((i*73856093) ^ (j*19349663)) & 4095];
  return (x,y) => { const i = Math.floor(x), j = Math.floor(y), fx = x - i, fy = y - j, u = fx*fx*(3-2*fx), w = fy*fy*(3-2*fy);
    const a = h(i,j), b = h(i+1,j), c = h(i,j+1), d = h(i+1,j+1); return a + (b-a)*u + (c-a)*w + (a-b-c+d)*u*w; }; }
const mix = (a,b,t) => a.map((x,i) => x + (b[i]-x)*t);
const rgb = (c,a=1) => `rgba(${c[0]|0},${c[1]|0},${c[2]|0},${a})`;
const clamp = (x,a=0,b=1) => Math.max(a, Math.min(b, x));
const doux = u => 1 - Math.pow(1 - clamp(u), 3);
const lisse = u => { u = clamp(u); return u*u*(3 - 2*u); };
const maintenant = () => performance.now();
/* La palette du Pointage : un fond gris-noir, des gris, le blanc cassé pour ce qui est fait. */
const FOND = [15,16,20], CARTE = [23,24,29], TRAIT = [52,53,61], GRIS = [119,117,125], GRIS_CLAIR = [163,161,168], BLANC = [242,240,234], BLANC_PUR = [255,253,248];
function toile(w, h, dpr){ const c = document.createElement("canvas"); c.width = Math.max(1, Math.round(w*dpr)); c.height = Math.max(1, Math.round(h*dpr)); const x = c.getContext("2d"); x.setTransform(dpr,0,0,dpr,0,0); return [c, x]; }
function grainTexture(){ const g = document.createElement("canvas"); g.width = g.height = 128; const x = g.getContext("2d"), im = x.createImageData(128,128), R = graine(9);
  for (let i = 0; i < im.data.length; i += 4) { const v = R()*255; im.data[i]=im.data[i+1]=im.data[i+2]=v; im.data[i+3]=255; } x.putImageData(im,0,0); return g; }
const GRAIN = grainTexture();
function passeGrain(ctx, W, H, t, a){ ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = ctx.createPattern(GRAIN, "repeat"); ctx.translate((t*.07)%128, (t*.05)%128); ctx.fillRect(-128, -128, W + 256, H + 256); ctx.restore(); }
function fondu(ctx, W, H, coul, depuis=.82){ const f = ctx.createLinearGradient(0, H*depuis, 0, H); f.addColorStop(0, rgb(coul, 0)); f.addColorStop(1, rgb(coul, 1)); ctx.fillStyle = f; ctx.fillRect(0, H*depuis, W, H*(1-depuis)); }
/* Les données communes à toutes les pièces du premier tour : la journée de Thomas (fictive, mais à sa forme).
   Plus tard, l'app les remplacera par les vraies : priorités du jour, minutes, les 28 derniers jours. */
const JOURNEE = {
  priorites: [
    { nom: "990",        domaine: "Langues",  min: 20, serie: 12 },
    { nom: "CUMBRE",     domaine: "Langues",  min: 20, serie: 11 },
    { nom: "Lecture",    domaine: "Lecture",  min: 12, serie: 9 },
    { nom: "LE CLOSING", domaine: "Carrière", min: 30, serie: 3 }
  ],
  // les 28 derniers jours, du plus ancien à hier : combien de priorités faites (0 à 4)
  jours: [4,4,3,4,2,4,4,4,1,0,4,4,3,4,4,4,4,2,4,4,4,4,3,4,4,4,4,4],
  chaine: 9
};
/* Le bouton dit la prochaine priorité ; le cinquième geste boucle la journée ; ensuite « Encore » relance une variante. */
function libelleGeste(n){ const P = JOURNEE.priorites; return n < 4 ? P[n].nom : n === 4 ? "Boucler" : "Encore"; }
function ligneGeste(n){ const P = JOURNEE.priorites; if (n === 0) return "chaîne · " + JOURNEE.chaine + " jours"; if (n <= 4) return P[n-1].nom + " · " + Math.min(n,4) + " sur 4"; return "journée bouclée · " + (JOURNEE.chaine + 1) + " jours"; }
