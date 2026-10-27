# Consigne d'un agent du tour 4

Tu reprends (ou crées) UNE pièce visuelle pour **Le Pointage**, l'app de Thomas. Même contrat, même niveau, même banc qu'au tour 2 :
**lis d'abord `/home/claude/pointage/atelier/CONSIGNE-TOUR2.md` en entier** (contrat, exigences, banc, rendu), puis ce qui suit,
qui le complète et l'emporte en cas de doute.

## Ce qui change au tour 4 (en plus du tour 3)
1. **Lis TOUT `/home/claude/pointage/atelier/GOUT.md`**, surtout la strate du tour 3 et les lois P18 à P23 (« sois ambitieux » : le seuil est le moment le plus travaillé de la pièce).
   **Le banc pendant le seuil** : prends aussi des captures à 1, 2, 3, 4, 5, 6 et 8 s après le 5ᵉ geste (le seuil doit être ambitieux d'un bout à l'autre) et regarde-les toutes avec Read.
2. **Le fichier** : `/home/claude/pointage/atelier/pieces/[FICHIER].js`, première ligne
   `/* ======================= Tour 4, pièce NN : LE TITRE (etude_<nom>) ======================= */`. Si tu reprends une pièce du tour 2,
   **copie-la dans ce nouveau fichier et change le nom de la fonction** (`etude_<nom>3`, `etude_<nom>3_DONNEES`) : l'ancienne doit rester intacte.
3. **Le code reste lisible** : indentation normale, une instruction par ligne quand c'est long. Ne tasse JAMAIS le code pour tenir une taille.
   La taille repère est un minimum (13 Ko), pas un maximum : 30 à 60 Ko lisibles valent mieux que 40 Ko tassés.
4. **L'API pour l'app (obligatoire)**, en plus de `aller(n)` : dans l'app, les priorités se cochent dans n'importe quel ordre et se décochent.
   - `M.etat(liste, boucle)` : pose l'état sans animation (`liste` = rangs des priorités faites, `boucle` = seuil passé) ;
   - `M.faire(i)` : anime la priorité de rang `i` (comme un geste, mais pour CETTE priorité-là) ; `M.geste(i)` avec un argument fait pareil ;
   - `M.retirer(i)` : la priorité `i` est décochée (l'état revient sans elle) ;
   - `M.boucler()` : déclenche le seuil si tout est fait ; `M.faits()` : la liste des rangs faits ; `M.boucle()` : vrai si le seuil est passé.
   Exemple d'implémentation : `/home/claude/pointage/atelier/pieces/t2-08-enluminure.js` (cherche `M.etat`). Vérifie-les dans le banc
   (console : `__ETUDE.faire(2)` doit animer la 3ᵉ priorité seule).
5. **Le bloc de l'app fait 390 × 520 environ** sur un téléphone (et 760 × 720 sur ordinateur) : la pièce doit être belle à ces tailles,
   sans rien de coupé d'important. Vérifie-le : une capture en 390 × 520 avec `aller(2)` puis `aller(5)`.

## Ta mission
[MISSION]

## Rends en six lignes
Le fichier et sa taille ; la loi ; ce que fait chaque geste ; le seuil ; le pire temps d'image mesuré ; ce qui a changé par rapport au verdict
de Thomas (cite ses mots et dis comment tu y as répondu).
