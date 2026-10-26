/* ======================= Monter une pièce dans n'importe quelle page ======================= */
/* Repris de l'atelier des mondes d'Eliodor. Ajout du Pointage (26/10) : la pièce se met en pause quand son bloc n'est plus dans la page
   (l'app redessine ses onglets et range le bloc de côté), et `geste` transmet ses arguments (quelle priorité vient d'être faite). */
/* cadre.html montre une pièce seule, plein écran. Ici, on la pose DANS une app : dans un bloc de la page (un en-tête, un fond,
   une carte), et ce sont les vrais gestes de l'app qui la font avancer (cocher une tâche, valider un formulaire, finir un niveau).
   Charger d'abord commun.js, puis la pièce, puis ce fichier.

   const monde = monterPiece(document.querySelector("#ciel"), etude_fusain, { donnees: etude_fusain_DONNEES, avec: { morceaux: […] } });
   // plus tard, quand l'utilisateur fait un vrai acte dans l'app :
   monde.geste();
   monde.arreter();   // quand le bloc quitte la page

   - Le bloc doit avoir une taille (hauteur en CSS) ; la toile le remplit et suit ses changements de taille.
   - `donnees` + `avec` : les vraies données de l'app remplacent les fausses, AVANT que la pièce démarre (les champs donnés seulement).
   - Le doigt sur la toile touche (tap) et fait glisser (glisse), comme dans le cadre. `interactif: false` le coupe (fond décoratif
     sous des boutons, par exemple).
   - La pièce ne dessine ni titre ni bouton : c'est l'app qui garde ses textes et ses boutons. `monde.piece.titre`, `.bouton`, `.ligne`
     restent lisibles si l'app veut les afficher. */
function monterPiece(bloc, fabrique, options){
  const o = options || {};
  if (o.donnees && o.avec) Object.assign(o.donnees, o.avec);
  const cv = document.createElement("canvas");
  cv.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block;touch-action:none";
  if (getComputedStyle(bloc).position === "static") bloc.style.position = "relative";
  bloc.prepend(cv);
  const ctx = cv.getContext("2d");
  const m = fabrique();
  let W = 0, H = 0, D = 1, vivant = true;
  function dimension(){
    const r = bloc.getBoundingClientRect(); if (!r.width || !r.height) return;
    D = Math.min(window.devicePixelRatio || 1, m.dprMax || 2, o.dprMax || 9); W = r.width; H = r.height;
    cv.width = Math.round(W*D); cv.height = Math.round(H*D); ctx.setTransform(D, 0, 0, D, 0, 0); m.taille(W, H, D);
  }
  const obs = new ResizeObserver(dimension); obs.observe(bloc); dimension();
  function boucle(){
    if (!vivant) return;
    if (W && bloc.isConnected && !document.hidden) { ctx.setTransform(D, 0, 0, D, 0, 0); m.frame(ctx, maintenant()); }
    requestAnimationFrame(boucle);
  }
  if (o.interactif !== false) {
    let p0 = null, dernier = null;
    const local = e => { const r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
    cv.addEventListener("pointerdown", e => { p0 = dernier = local(e); cv.setPointerCapture(e.pointerId); });
    cv.addEventListener("pointermove", e => { if (!p0) return; const p = local(e), dx = p[0] - dernier[0], dy = p[1] - dernier[1]; dernier = p;
      if (Math.hypot(p[0] - p0[0], p[1] - p0[1]) > 8) m.glisse?.(dx, dy); });
    cv.addEventListener("pointerup", e => { const p = local(e); if (p0 && Math.hypot(p[0] - p0[0], p[1] - p0[1]) <= 8) m.tap?.(p[0], p[1]); p0 = null; });
  } else cv.style.pointerEvents = "none";
  requestAnimationFrame(boucle);
  return {
    piece: m,
    geste(...args){ m.geste?.(...args); },
    arreter(){ vivant = false; obs.disconnect(); cv.remove(); },
  };
}
