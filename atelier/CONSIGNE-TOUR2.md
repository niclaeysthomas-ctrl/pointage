# Consigne d'un agent qui fabrique UNE pièce du tour 2

Tu fabriques UNE pièce visuelle pour **Le Pointage**, l'app de Thomas (HTML/JS pur). La pièce est un grand bloc vivant (une toile
qui calcule et s'anime) pour l'écran « Ta journée » : ses quatre priorités du jour. Son niveau : celui des pièces de la galerie
d'Eliodor. « Magnifique ou rien ». Pas une retouche : une pièce qui fait dire « wow ».

## À lire, dans cet ordre (court)
1. Cette consigne.
2. `/home/claude/pointage/atelier/GOUT.md` : les mots exacts de Thomas et ses lois (P1 à P9). **Lis le tour 1 en entier** : ce qu'il a rejeté et pourquoi.
3. `/home/claude/atelier-des-mondes/METHODE.md` §2 (le contrat) et §4 (ce qui ne marche pas).
4. `/home/claude/pointage/atelier/bibliotheque/commun.js` : les outils communs ET les données `JOURNEE` (priorités, 28 jours, chaîne) et
   les fonctions `libelleGeste(n)` / `ligneGeste(n)`. Tu les appelles, tu ne les redéfinis pas.
5. Pour voir le niveau : l'en-tête et le début de `/home/claude/atelier-des-mondes/pieces/08-encre.js` (le Sutra d'or, que Thomas a remarqué)
   et de `/home/claude/atelier-des-mondes/pieces/10-fusain.js`. Ne recopie ni leur palette (or/sanguine/indigo d'Eliodor) ni leur code.
6. Une pièce du tour 1 pour le format du fichier : `/home/claude/pointage/atelier/pieces/06-cretes.js` (mais elle était trop pauvre : 8 Ko).

## Ta mission
[MISSION]

## Les données
Les priorités de Thomas (dans `JOURNEE.priorites`, dans cet ordre) : **990** (anglais, TOEIC), **CUMBRE** (espagnol, DELE),
**Lecture** (un texte de philosophie par jour), **LE CLOSING** (finance, fusions-acquisitions). Plus `JOURNEE.jours` (28 jours, 0 à 4
priorités faites) et `JOURNEE.chaine` (jours d'affilée). Mets tes données propres à la pièce dans `etude_<nom>_DONNEES`
(par exemple `etude_x_DONNEES = Object.assign({ ...tes champs }, JOURNEE)`), pour qu'on puisse les remplacer par les vraies.

## Les exigences (chacune vient d'un verdict de Thomas)
- **Couleur sur fond gris (P2)** : le fond et le ton général sont gris (gris-noir, gris pierre, gris papier) ; la pièce pose des couleurs
  FRANCHES et choisies (pas un arc-en-ciel) qui arrivent avec les gestes. Au repos, presque monochrome ; à la fin, la couleur a gagné.
- **Chaque geste change le monde, visiblement, tout de suite (P5)** : dans la seconde qui suit chaque geste, on voit un changement
  grand et clair, à un endroit qu'on peut nommer, qui reste. Teste les QUATRE gestes un par un : aucun ne doit être faible.
  (Au tour 1, « appuyer sur cumbre ne change rien » a tué une pièce.)
- **On comprend ce qui se passe (P6)** : le nom de la priorité apparaît là où son geste agit (gravé, écrit, en légende fine).
- **Différente des autres pièces (P7)** : pas de points blancs sur la nuit, pas d'orbites, pas de traits blancs fins seuls.
- **La typographie de La Voûte (P4)** : le texte dans la pièce est en Georgia/sérif, capitales espacées, et une petite ligne mono.
- **Une vraie loi** (mathématique, physique, géométrique) qui calcule vraiment quelque chose à partir des données, nommée en clair
  dans l'en-tête avec sa source. Jamais une formule en décor.
- **Une facture** : grain, hachure, matière, lumière calculée. En zoomant sur 50 px on voit une main. Aucun aplat ni dégradé seul.
- **La forme** : un repos déjà beau ; quatre gestes qui montent (3 à 6 s chacun, le monde reste changé) ; le seuil au cinquième
  (4 à 8 s, TOUT l'écran change d'un coup, et reste) ; « Encore » relance une variante (autre graine).
- **Taille** : 15 à 40 Ko de code dense. Sous 13 Ko, c'est trop pauvre : pousse la richesse (couches de détail, annotations, matière).
- **Le téléphone** : aucune image au-delà de 30 ms ; aucune toile cachée au-delà de 2 millions de pixels, 12 millions en tout ;
  `dprMax: 1.5`. Un grand calcul avance par tranches (voir `/home/claude/atelier-des-mondes/bibliotheque/peinture-lente.js`).

## Le contrat
Un fichier `/home/claude/pointage/atelier/pieces/[FICHIER].js`, JavaScript pur, sans bibliothèque. Première ligne exactement de la forme
`/* ======================= Tour 2, pièce NN : LE TITRE (etude_<nom>) ======================= */` (le titre en CAPITALES, le script
de construction le lit). Une fonction globale `etude_<nom>()`, puis `window.ETUDE = etude_<nom>;`. Tous tes noms globaux commencent
par `etude_<nom>`. L'objet rendu : `titre`, `bouton` (utilise `libelleGeste(etape)`), `ligne` (utilise `ligneGeste(etape)` ou
mieux, une ligne à toi, courte, jamais « bravo »), `dprMax`, `taille(w, h, dpr)`, `frame(ctx, t)`, `geste()`, `tap(x, y)`, `glisse(dx, dy)`.
**Important pour la pose dans l'app** : la pièce doit aussi marcher dans un bloc de 390 × 480 (pas seulement plein écran), et exposer
`M.aller(n)` qui met la pièce DIRECTEMENT dans l'état « n gestes faits » (0 à 5) sans animation (pour l'app qui s'ouvre au milieu de la journée).

## L'en-tête du fichier (25 lignes au plus)
Ce qu'on voit ; la loi et sa source ; la main (le style) ; l'usage ; ce que font le doigt et le seuil ; comment la pièce tient le budget.

## Avant de rendre (obligatoire)
1. `cd /home/claude/pointage/atelier && python3 construire.py` (construit `[FICHIER].html`).
2. Banc : `python3 /tmp/claude-0/-home-claude/e9b8a1b5-94a4-5c62-a040-794818cad372/scratchpad/test/banc.py [FICHIER]` (depuis le dossier
   `/tmp/claude-0/-home-claude/e9b8a1b5-94a4-5c62-a040-794818cad372/scratchpad/test/`) : il ouvre la pièce en 390 × 760, joue les cinq gestes,
   écrit des captures `b-[FICHIER]-*.png` et le pire temps d'image. **Regarde les captures avec ton outil Read**, une par geste :
   chaque geste doit montrer un changement net. Si un geste est faible, corrige et recommence.
3. Vérifie `M.aller(n)` : dans une page de test ou via la console du banc, `__ETUDE.aller(3)` doit montrer l'état après 3 gestes.
4. Aucune erreur dans la console. Une erreur, et la pièce ne sort pas.
5. Ne modifie AUCUN autre fichier que le tien (ni commun.js, ni construire.py, ni l'app, ni git).

## Rends en cinq lignes
Le fichier et sa taille en Ko ; la loi ; ce que fait chaque geste en une phrase ; le seuil en une phrase ; le pire temps d'image mesuré.
