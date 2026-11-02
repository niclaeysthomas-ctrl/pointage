/* ═══════════════════════════════════════════════════════════════════
   LA BIBLIOTHÈQUE (01/11) — des rayons de concepts, expliqués simplement.
   Un rayon = une collection (ici : la physique quantique, d'après la liste
   des 50 concepts d'un hors-série que Thomas a photographié). Les textes
   sont écrits pour le Pointage : ils ne recopient pas le livre.
   Chaque concept : [id, titre, explication, à retenir]. Les paragraphes
   sont séparés par une ligne vide. D'autres rayons s'ajoutent à BIBLIO.
   ═══════════════════════════════════════════════════════════════════ */
const BIBLIO=[{
  id:"quantique", e:"⚛️", titre:"La physique quantique", sous:"50 concepts, du corps noir à la lumière liquide",
  chap:[
  {t:"Origines et fondements", c:[
  ["q01","Prémices et origines de la physique quantique",
   "Vers 1900, la physique semble presque finie : Newton explique le mouvement, Maxwell la lumière et l'électricité. Il reste quelques « petits nuages » : des expériences que ces théories n'arrivent pas à expliquer, comme la lumière émise par un objet chaud ou la façon dont la lumière arrache des électrons à un métal.\n\nEn tirant sur ces fils, une génération de physiciens (Planck, Einstein, Bohr, Heisenberg, Schrödinger…) découvre entre 1900 et 1930 que le monde, à très petite échelle, ne fonctionne pas comme le nôtre : l'énergie vient par paquets, et une particule n'a pas de position précise tant qu'on ne la mesure pas.",
   "La quantique est née de quelques expériences que la physique classique n'expliquait pas."],
  ["q02","Le problème du corps noir",
   "Un « corps noir » est un objet idéal qui absorbe toute la lumière et la réémet selon sa seule température : un four fermé percé d'un petit trou, ou une braise. Plus il est chaud, plus sa couleur va du rouge vers le blanc puis le bleu.\n\nLa physique classique prédisait qu'il devrait émettre une énergie infinie dans l'ultraviolet : c'est la « catastrophe ultraviolette ». Évidemment faux : une braise ne vous brûle pas aux rayons UV. Il fallait une nouvelle idée pour retrouver la courbe mesurée.",
   "La couleur d'un objet chaud était inexplicable sans une idée neuve : les quanta."],
  ["q03","La constante de Planck",
   "En 1900, Max Planck trouve la bonne formule pour le corps noir, à une condition : supposer que l'énergie lumineuse est échangée par petits paquets, les quanta. L'énergie d'un paquet vaut E = h × f, où f est la fréquence de la lumière et h une constante minuscule : 6,626 × 10⁻³⁴ joule-seconde.\n\nh est l'« unité de grain » de la nature. Elle est si petite que, dans notre vie, tout paraît continu ; à l'échelle des atomes, le grain devient visible. Depuis 2019, le kilogramme lui-même est défini à partir de h.",
   "E = h·f : l'énergie de la lumière vient par paquets, et h fixe leur taille."],
  ["q04","La théorie des quanta de lumière d'Albert Einstein",
   "Planck voyait ses paquets comme une astuce de calcul. En 1905, Einstein les prend au sérieux : la lumière elle-même est faite de grains, qu'on appellera plus tard photons. Cela explique l'effet photoélectrique : une lumière rouge, même très forte, n'arrache aucun électron à un métal, alors qu'une faible lumière ultraviolette y parvient. Ce qui compte, c'est l'énergie de chaque grain (sa couleur), pas leur nombre.\n\nC'est pour cela, et non pour la relativité, qu'Einstein reçoit le prix Nobel en 1921. Les panneaux solaires et les capteurs d'appareil photo reposent sur cet effet.",
   "La lumière est faite de photons ; leur énergie dépend de la couleur, pas de l'intensité."],
  ["q05","L'atome de Bohr",
   "En 1913, Niels Bohr propose un atome où les électrons tournent autour du noyau sur certaines orbites seulement, comme des marches d'escalier. Un électron qui saute d'une marche à une plus basse émet un photon d'énergie exactement égale à la différence.\n\nC'est pour cela que chaque élément chimique émet des couleurs précises (les raies du néon, le jaune du sodium des lampadaires). Le modèle de Bohr est faux dans le détail (les électrons ne tournent pas vraiment en orbite), mais l'idée des niveaux d'énergie est restée.",
   "Dans un atome, l'énergie de l'électron ne prend que certaines valeurs : des marches."],
  ["q06","La nature ondulatoire des électrons",
   "En 1924, Louis de Broglie fait le pari inverse d'Einstein : si la lumière (une onde) se comporte comme des particules, alors les particules, comme l'électron, doivent se comporter comme des ondes. Sa longueur d'onde vaut λ = h / p (p, la quantité de mouvement).\n\nC'est confirmé en 1927 : des électrons envoyés sur un cristal font des figures d'interférence, comme de la lumière. Le microscope électronique utilise cette onde, bien plus courte que celle de la lumière, pour voir des détails mille fois plus fins.",
   "Toute particule est aussi une onde : c'est la dualité onde-corpuscule."],
  ["q07","Les interférences quantiques",
   "Quand deux vagues se croisent, elles s'additionnent (crête + crête) ou s'annulent (crête + creux) : ce sont les interférences. En quantique, ce ne sont pas des vagues d'eau qui interfèrent, mais les différentes « possibilités » d'une même particule.\n\nUne particule qui a deux chemins possibles ne choisit pas : les deux chemins interfèrent, et certains points d'arrivée deviennent impossibles. Les ordinateurs quantiques exploitent exactement cela : faire s'annuler les mauvaises réponses et se renforcer la bonne.",
   "En quantique, ce sont les possibilités d'une particule qui s'additionnent ou s'annulent."],
  ["q08","L'interprétation de Copenhague",
   "Les équations quantiques prédisent des probabilités, pas des certitudes. Que se passe-t-il vraiment entre deux mesures ? L'interprétation de Copenhague, portée par Bohr et Heisenberg vers 1927, répond en substance : la question n'a pas de sens.\n\nAvant la mesure, on ne peut parler que de la fonction d'onde et de ses probabilités ; la mesure fait « choisir » un résultat (on parle de réduction du paquet d'onde). La physique décrit ce qu'on peut observer, pas une réalité cachée derrière. C'est la vision enseignée par défaut, mais elle reste discutée.",
   "Pour Copenhague, la théorie décrit ce qu'on mesure, pas ce qui « est » entre deux mesures."],
  ["q09","Les interprétations alternatives de la physique quantique",
   "Tout le monde est d'accord sur les calculs ; personne ne l'est sur ce qu'ils signifient. D'autres lectures existent. La théorie de Bohm : les particules ont toujours une position précise, guidées par une onde pilote. Les mondes multiples d'Everett : toutes les issues se réalisent, chacune dans une branche de l'univers. Les théories de réduction spontanée : la fonction d'onde s'effondre d'elle-même, au hasard.\n\nCes interprétations donnent les mêmes prédictions pour les expériences actuelles : le choix entre elles reste, pour l'instant, une question de philosophie.",
   "Les calculs sont sûrs ; leur sens fait encore débat."],
  ["q10","Les expériences de pensée",
   "Une expérience de pensée est une expérience qu'on fait dans sa tête, parce qu'elle est impossible (ou trop chère) en vrai, mais qui pousse une théorie dans ses retranchements. Einstein en était le maître : le train frappé par la foudre, l'ascenseur en chute libre, la boîte à photons.\n\nEn quantique, elles ont servi d'arme dans le grand débat Einstein-Bohr : le chat de Schrödinger, le paradoxe EPR. Plusieurs ont fini par devenir de vraies expériences des décennies plus tard, grâce aux lasers et aux atomes froids.",
   "Imaginer une expérience impossible peut révéler la faille d'une théorie."],
  ["q11","Le chat de Schrödinger",
   "En 1935, Schrödinger imagine un chat enfermé avec un atome radioactif : si l'atome se désintègre, un mécanisme libère un poison. Selon la quantique, tant qu'on n'a pas regardé, l'atome est dans une superposition « désintégré et pas désintégré ». Donc le chat serait à la fois vivant et mort ?\n\nSchrödinger voulait montrer que c'est absurde, et poser la question : où s'arrête le monde quantique ? La réponse moderne est la décohérence : un objet aussi gros qu'un chat interagit sans cesse avec son environnement, et sa superposition se brouille en une fraction infime de seconde.",
   "Le chat pose une question : pourquoi ne voit-on jamais de superposition à notre échelle ?"],
  ["q12","Probabilités et fonction d'onde",
   "En quantique, une particule est décrite par sa fonction d'onde, souvent notée ψ (psi). Ce n'est pas une onde de matière : c'est une sorte de carte des possibilités. Max Born a donné la règle en 1926 : la probabilité de trouver la particule à un endroit est le carré de ψ à cet endroit.\n\nLe hasard n'est donc pas un manque d'information, comme au lancer de dé : il est au cœur de la théorie. On peut prédire parfaitement les statistiques de mille mesures, jamais le résultat d'une seule.",
   "ψ donne des probabilités ; le hasard quantique est fondamental."],
  ["q13","Le principe d'exclusion de Pauli",
   "En 1925, Wolfgang Pauli énonce une règle : deux électrons ne peuvent jamais être exactement dans le même état. Dans un atome, ils doivent donc s'empiler sur des niveaux différents, comme des passagers qui ne peuvent pas partager un siège.\n\nC'est grâce à cette règle que le tableau périodique a sa structure, que la chimie existe et que la matière est solide : votre main ne traverse pas la table parce que les électrons de l'une refusent d'occuper les états de ceux de l'autre. Il explique aussi pourquoi certaines étoiles mortes (naines blanches) ne s'effondrent pas.",
   "Deux électrons ne partagent jamais le même état : d'où la chimie et la solidité de la matière."],
  ["q14","La découverte du spin",
   "En 1922, l'expérience de Stern et Gerlach envoie des atomes d'argent à travers un aimant : au lieu de s'étaler, le faisceau se sépare en exactement deux taches. En 1925, on comprend que l'électron porte un petit « aimant » intérieur, le spin, qui ne peut prendre que deux valeurs : haut ou bas.\n\nOn l'imagine comme une toupie, mais rien ne tourne vraiment : c'est une propriété purement quantique. Le spin est partout : IRM à l'hôpital (le spin des noyaux d'hydrogène), disques durs, et il sert de « bit » dans certains ordinateurs quantiques.",
   "Le spin est un aimant intérieur aux particules, à deux valeurs seulement pour l'électron."],
  ["q15","Les fentes de Young dans la physique quantique",
   "En 1801, Thomas Young fait passer de la lumière par deux fentes : sur l'écran apparaissent des bandes claires et sombres, preuve que la lumière est une onde. Refaites-le avec des électrons envoyés un par un : chaque électron arrive en un point, comme une bille… mais, au fil des milliers d'arrivées, les bandes d'interférence se dessinent.\n\nChaque électron a donc « interféré avec lui-même », comme s'il passait par les deux fentes. Et si l'on place un détecteur pour savoir par quelle fente il passe, les bandes disparaissent. Feynman disait que cette expérience contient tout le mystère de la quantique.",
   "Une seule particule à la fois dessine des interférences, sauf si on regarde son chemin."],
  ["q16","L'équation de Schrödinger",
   "En 1926, Erwin Schrödinger écrit l'équation qui dit comment la fonction d'onde évolue dans le temps : c'est l'équivalent quantique de la loi de Newton. Si l'on connaît ψ maintenant, l'équation donne ψ à tout instant futur, de façon parfaitement déterministe.\n\nRésolue pour l'atome d'hydrogène, elle retrouve exactement les niveaux d'énergie observés, sans les postulats bricolés de Bohr. La chimie numérique, qui conçoit médicaments et matériaux sur ordinateur, consiste en grande partie à résoudre cette équation.",
   "L'équation de Schrödinger fait évoluer ψ ; le hasard n'intervient qu'à la mesure."]]},
  {t:"Principes et expériences fondamentales", c:[
  ["q17","Les atomes froids",
   "La température d'un gaz, c'est l'agitation de ses atomes. Avec des lasers bien réglés, on peut freiner des atomes jusqu'à quelques milliardièmes de degré au-dessus du zéro absolu (−273,15 °C). À ce point, les atomes deviennent si lents que leur nature d'onde devient énorme.\n\nEn 1995, on obtient ainsi un condensat de Bose-Einstein : des milliers d'atomes qui se comportent comme une seule onde géante. Les atomes froids donnent les horloges les plus précises du monde (elles dériveraient de moins d'une seconde sur l'âge de l'univers) et servent à fabriquer des ordinateurs quantiques.",
   "Refroidis par laser, les atomes deviennent des ondes visibles : horloges et ordinateurs quantiques."],
  ["q18","Le principe d'incertitude de Heisenberg",
   "En 1927, Werner Heisenberg montre qu'on ne peut pas connaître à la fois, avec une précision parfaite, la position d'une particule et sa vitesse : Δx × Δp ≥ ħ/2. Plus l'une est précise, plus l'autre est floue.\n\nCe n'est pas un défaut des instruments : c'est la nature même d'une onde. Une onde très localisée (un pic) est faite d'un mélange de nombreuses longueurs d'onde, donc de vitesses ; une onde de vitesse unique s'étale partout. C'est pour cela que l'électron ne tombe pas sur le noyau : coincé trop près, sa vitesse deviendrait énorme.",
   "Position et vitesse ne peuvent pas être toutes deux parfaitement définies."],
  ["q19","Le paradoxe EPR",
   "En 1935, Einstein, Podolsky et Rosen (EPR) imaginent deux particules liées, puis séparées très loin. Mesurer l'une donne aussitôt le résultat pour l'autre. Pour Einstein, soit une influence voyage plus vite que la lumière (« action fantôme à distance »), soit les résultats étaient écrits d'avance et la quantique est incomplète.\n\nCe lien s'appelle l'intrication. Einstein pariait sur des « variables cachées ». Il a fallu trente ans pour qu'on sache comment trancher (Bell), et cinquante pour le faire (Aspect).",
   "Deux particules intriquées restent liées à distance : Einstein y voyait une faille."],
  ["q20","Les inégalités de Bell",
   "En 1964, John Bell transforme le débat EPR en un test. Si les résultats étaient écrits d'avance (variables cachées locales), les corrélations entre deux particules mesurées loin l'une de l'autre ne pourraient pas dépasser une certaine limite : c'est l'inégalité de Bell. La quantique, elle, prédit qu'on la dépasse.\n\nC'est l'un des résultats les plus profonds de la physique : une question philosophique (le monde est-il « local et réaliste » ?) devient une expérience qu'on peut faire en laboratoire.",
   "Bell a rendu testable la question d'Einstein : variables cachées ou non ?"],
  ["q21","Les expériences d'Alain Aspect",
   "Au début des années 1980, à Orsay, Alain Aspect mesure des paires de photons intriqués en changeant le réglage des détecteurs pendant le vol des photons, pour qu'aucun signal ne puisse prévenir l'autre. Résultat : les inégalités de Bell sont violées, comme le prédit la quantique.\n\nEinstein avait tort sur ce point : aucune théorie à variables cachées locales ne peut décrire la nature. Aspect a reçu le prix Nobel 2022 avec John Clauser et Anton Zeilinger. Ces expériences ont lancé les technologies quantiques actuelles.",
   "Aspect a montré que l'intrication est réelle : Nobel 2022."],
  ["q22","L'équation de Dirac",
   "L'équation de Schrödinger ne tient pas compte de la relativité d'Einstein, indispensable pour des particules rapides. En 1928, Paul Dirac écrit une équation qui réunit les deux pour l'électron.\n\nDeux surprises en sortent : le spin apparaît tout seul, sans qu'on l'ajoute à la main ; et l'équation a des solutions « d'énergie négative » que Dirac finit par interpréter comme une nouvelle particule, l'anti-électron. Une équation qui prédit l'existence de quelque chose que personne n'a vu : c'est l'un des plus beaux moments de la physique.",
   "En unissant quantique et relativité, Dirac a prédit l'antimatière."],
  ["q23","L'antimatière",
   "Chaque particule a une jumelle de charge opposée : l'électron a le positron (découvert en 1932), le proton l'antiproton. Quand une particule rencontre son antiparticule, elles s'annihilent et toute leur masse devient énergie (E = mc²), en rayons gamma.\n\nL'antimatière est utilisée tous les jours à l'hôpital : le TEP-scan détecte les rayons émis par des positrons. Une grande énigme reste ouverte : le Big Bang aurait dû produire autant de matière que d'antimatière, qui se seraient annihilées. Pourquoi reste-t-il de la matière ?",
   "Chaque particule a une antiparticule ; leur rencontre transforme la masse en lumière."],
  ["q24","L'effet tunnel",
   "Une balle lancée contre un mur rebondit toujours. Une particule quantique, elle, a une petite probabilité de passer de l'autre côté d'une barrière qu'elle ne pourrait pas franchir classiquement : son onde « déborde » à travers.\n\nCe n'est pas exotique. L'effet tunnel explique la radioactivité alpha, permet au Soleil de fusionner ses noyaux (sinon il serait trop froid pour briller), fait fonctionner la mémoire flash de votre téléphone et le microscope à effet tunnel, qui voit les atomes un par un.",
   "Une particule peut traverser une barrière infranchissable : Soleil, clés USB, microscopes."],
  ["q25","Les diagrammes de Feynman",
   "Richard Feynman invente vers 1948 de petits dessins pour représenter les interactions entre particules : des lignes droites pour les électrons, des ondulations pour les photons échangés. Deux électrons qui se repoussent ? Ils s'échangent un photon.\n\nChaque dessin correspond à un terme précis d'un calcul. Ils ont rendu calculable l'électrodynamique quantique, la théorie la plus précise jamais testée : elle prédit le magnétisme de l'électron avec plus de dix chiffres exacts.",
   "Des dessins qui sont des calculs : les particules interagissent en échangeant d'autres particules."],
  ["q26","La mesure quantique",
   "En physique classique, mesurer ne change rien : on lit un thermomètre. En quantique, mesurer, c'est interagir, et cela change l'état : une particule superposée « haut et bas » donne un seul résultat, et reste ensuite dans cet état.\n\nPourquoi et comment ce passage du « plusieurs possibles » à « un seul résultat » se produit, c'est le « problème de la mesure », toujours débattu. Concrètement, il oblige les ordinateurs quantiques à ne lire leur résultat qu'à la toute fin du calcul.",
   "Mesurer modifie le système : c'est le cœur du mystère quantique."]]},
  {t:"Applications et théories avancées", c:[
  ["q27","La cryptographie quantique",
   "Pour échanger une clé secrète, on peut envoyer des photons dont l'état code des 0 et des 1. Comme toute mesure perturbe un état quantique, un espion qui intercepte les photons laisse forcément des traces : les deux correspondants le détectent en comparant une partie de leurs résultats. C'est le protocole BB84 (1984).\n\nLa sécurité ne repose plus sur la difficulté d'un calcul, mais sur les lois de la physique. Des réseaux existent déjà (Chine, Europe), même si les distances restent limitées sans satellite.",
   "Espionner un message quantique le modifie : l'espion se trahit."],
  ["q28","Les quanta au service de l'homme",
   "On estime qu'une large part de l'économie moderne repose sur la quantique. Le transistor, brique de toute l'électronique, ne se comprend qu'avec elle (les bandes d'énergie des semi-conducteurs). De même : le laser, les LED, les panneaux solaires, l'IRM, le GPS (grâce aux horloges atomiques), les capteurs photo.\n\nC'est la « première révolution quantique » : utiliser les effets quantiques de grandes quantités de particules. La deuxième, en cours, manipule des particules une à une : ordinateurs, capteurs et communications quantiques.",
   "Téléphone, GPS, IRM, LED : la quantique est déjà dans la poche."],
  ["q29","Le fonctionnement du laser",
   "Un atome excité peut émettre un photon tout seul (au hasard) ou être « stimulé » par un photon qui passe : il émet alors un photon jumeau, même couleur, même direction, même rythme. Einstein a décrit cette émission stimulée en 1917.\n\nUn laser enferme un milieu (gaz, cristal) entre deux miroirs. On l'excite (pompage), puis les photons font des allers-retours et déclenchent des avalanches de photons identiques. Résultat : une lumière d'une seule couleur, très droite, très concentrée. LASER veut dire « amplification de la lumière par émission stimulée de rayonnement ».",
   "Un photon en déclenche un autre identique : l'avalanche fait le laser."],
  ["q30","Les applications du laser",
   "Inventé en 1960, le laser fut d'abord « une solution qui cherche son problème ». Aujourd'hui : lecteurs de codes-barres, fibre optique d'Internet (des impulsions laser transportent vos données sous les océans), chirurgie des yeux, découpe industrielle, imprimantes, mesures de distance (jusqu'à la Lune, grâce aux réflecteurs posés par Apollo).\n\nIl sert aussi à la recherche : refroidir des atomes, détecter les ondes gravitationnelles (LIGO), tenter la fusion nucléaire.",
   "Du code-barres à la fibre d'Internet, le laser est partout."],
  ["q31","La téléportation quantique",
   "Rien à voir avec Star Trek : on ne déplace pas de matière. On transfère l'état quantique d'une particule à une autre, distante, en utilisant une paire intriquée partagée à l'avance plus un message classique (envoyé à la vitesse de la lumière au maximum).\n\nL'état d'origine est détruit au départ : on ne copie pas, on transfère. Réalisée pour la première fois en 1997, notamment par Anton Zeilinger, et jusqu'à plus de 1 000 km par satellite (Chine, 2017). Elle servira à relier des ordinateurs quantiques entre eux.",
   "On téléporte un état, pas un objet, et jamais plus vite que la lumière."],
  ["q32","L'ordinateur quantique",
   "Un ordinateur classique manipule des bits, 0 ou 1. Un ordinateur quantique manipule des qubits, qui peuvent être en superposition de 0 et 1 et intriqués entre eux. Un calcul bien conçu fait interférer les possibilités pour amplifier la bonne réponse.\n\nIl ne sera pas plus rapide pour tout : seulement pour certains problèmes (simuler des molécules, factoriser de grands nombres, ce qui menace une partie du chiffrement actuel). La difficulté : les qubits sont très fragiles (décohérence) et font beaucoup d'erreurs. Les machines actuelles comptent quelques centaines à milliers de qubits encore imparfaits.",
   "Les qubits exploitent superposition et intrication, pour quelques problèmes précis."],
  ["q33","La spectroscopie",
   "Chaque atome et chaque molécule absorbe et émet des couleurs bien précises, liées à ses niveaux d'énergie : c'est sa signature, comme un code-barres de lumière. La spectroscopie consiste à décomposer la lumière (avec un prisme ou un réseau) pour lire ces codes-barres.\n\nC'est ainsi qu'on connaît la composition d'étoiles qu'on ne visitera jamais (l'hélium a été découvert dans le Soleil avant d'être trouvé sur Terre), qu'on analyse l'air, le sang, les œuvres d'art, ou qu'on cherche des traces de vie sur les exoplanètes.",
   "La lumière porte la signature des atomes qui l'ont émise."],
  ["q34","Le modèle standard",
   "Le modèle standard est le « tableau périodique » des particules élémentaires, achevé dans les années 1970. Il contient 6 quarks (qui forment protons et neutrons), 6 leptons (dont l'électron et les neutrinos), les particules qui portent les forces (photon, gluons, bosons W et Z) et le boson de Higgs.\n\nIl décrit trois des quatre forces et toutes les expériences de laboratoire avec une précision stupéfiante. Mais il est incomplet : il ignore la gravité, la matière noire et l'énergie noire, et n'explique pas la masse des neutrinos.",
   "Le modèle standard liste les briques de la matière et trois forces sur quatre."],
  ["q35","La découverte du boson de Higgs",
   "Pourquoi certaines particules ont-elles une masse ? En 1964, Peter Higgs, François Englert et Robert Brout proposent qu'un champ invisible remplit l'univers : en interagissant avec lui, les particules acquièrent leur masse, un peu comme on avance plus lourdement dans une foule. Ce champ doit laisser une trace, une particule : le boson de Higgs.\n\nIl a fallu le plus grand accélérateur du monde, le LHC du CERN, pour le découvrir en 2012. Higgs et Englert ont reçu le Nobel en 2013.",
   "Le champ de Higgs donne leur masse aux particules ; son boson a été vu en 2012."],
  ["q36","L'interaction forte",
   "Le noyau d'un atome contient des protons, tous de charge positive, qui devraient se repousser violemment. Ce qui les tient ensemble, c'est l'interaction forte, la plus puissante des quatre forces, portée par les gluons (de l'anglais glue, colle).\n\nElle lie les quarks à l'intérieur des protons et des neutrons. Particularité étrange : plus on écarte deux quarks, plus la force augmente, si bien qu'on n'observe jamais un quark isolé. L'énergie des centrales et des bombes nucléaires vient de cette force.",
   "La force forte colle les quarks et les noyaux ; on ne peut pas isoler un quark."],
  ["q37","L'interaction faible",
   "L'interaction faible est responsable de certaines désintégrations radioactives : elle peut transformer un neutron en proton (radioactivité bêta), donc changer un élément chimique en un autre. Elle est portée par les bosons W et Z, très lourds, ce qui la rend très courte portée.\n\nSans elle, le Soleil ne brillerait pas : la première étape de sa fusion change un proton en neutron. Elle est la seule force qui distingue la gauche de la droite dans la nature. Dans les années 1970, on a montré qu'elle s'unit à l'électromagnétisme à haute énergie (force électrofaible).",
   "La force faible transforme les particules ; sans elle, pas de soleil."],
  ["q38","L'interaction électromagnétique",
   "C'est la force entre charges électriques : elle attire électrons et noyaux pour former les atomes, lie les atomes en molécules, et explique presque tout ce que nous touchons, voyons et ressentons (la chimie, la lumière, le frottement, la biologie). Elle est portée par le photon.\n\nMaxwell l'a unifiée au XIXᵉ siècle (électricité, magnétisme et lumière sont une même chose). Sa version quantique, l'électrodynamique quantique (Feynman, Schwinger, Tomonaga), est la théorie la mieux vérifiée de toute la science.",
   "La force électromagnétique fait les atomes, la chimie et la lumière."],
  ["q39","L'interaction gravitationnelle",
   "La gravité est de loin la plus faible des quatre forces (un petit aimant soulève un trombone contre l'attraction de la Terre entière), mais elle s'additionne toujours et gouverne donc les planètes, les étoiles et les galaxies. Einstein l'a décrite en 1915 comme une courbure de l'espace-temps.\n\nC'est la seule force qu'on ne sait pas rendre quantique. Les deux grandes théories (relativité générale et quantique) fonctionnent chacune parfaitement dans son domaine, mais se contredisent quand on les combine, au centre des trous noirs ou au Big Bang.",
   "La gravité est la seule force que la quantique n'a pas encore absorbée."],
  ["q40","Les trous noirs et la physique quantique",
   "Un trou noir est une région où la gravité est si forte que rien, pas même la lumière, ne s'en échappe. En 1974, Stephen Hawking montre qu'en tenant compte de la quantique près de leur bord, les trous noirs émettent un faible rayonnement et s'évaporent très lentement.\n\nD'où un paradoxe : si un trou noir disparaît, qu'advient-il de l'information de tout ce qu'il a avalé ? La quantique interdit qu'elle soit détruite. Ce « paradoxe de l'information » est l'un des grands chantiers de la physique actuelle.",
   "Les trous noirs s'évaporent (Hawking) ; où va l'information ? Question ouverte."],
  ["q41","Le temps et le principe de causalité",
   "La causalité, c'est l'ordre « la cause avant l'effet ». La relativité l'impose : aucune information ne voyage plus vite que la lumière. La quantique la respecte aussi : l'intrication crée des corrélations à distance, mais ne permet pas d'envoyer de message instantané.\n\nPourtant, certaines expériences récentes montrent des situations où l'ordre de deux opérations n'est pas défini (« ordre causal indéfini »). Et la nature du temps lui-même, qui n'apparaît pas de la même façon en quantique et en relativité, reste une énigme.",
   "La quantique ne permet pas d'envoyer un message plus vite que la lumière."],
  ["q42","Les théories de grande unification",
   "Électricité et magnétisme ont été unifiés, puis électromagnétisme et force faible. Les théories de grande unification (années 1970) proposent qu'à très haute énergie, juste après le Big Bang, les forces forte, faible et électromagnétique n'en faisaient qu'une.\n\nElles prédisent que le proton devrait finir par se désintégrer, au bout d'un temps colossal. Des détecteurs géants (Super-Kamiokande, au Japon) le guettent depuis des décennies : aucune désintégration observée, ce qui a éliminé les versions les plus simples.",
   "Trois forces n'en feraient qu'une à très haute énergie ; pas encore prouvé."],
  ["q43","La théorie des supercordes",
   "Et si les particules n'étaient pas des points, mais de minuscules cordes qui vibrent ? Chaque mode de vibration donnerait une particule différente, comme une corde de guitare donne différentes notes. La théorie contient naturellement une particule de gravité (le graviton) : c'est une candidate pour unifier toutes les forces.\n\nSes difficultés : elle demande 10 dimensions d'espace-temps (les dimensions en trop seraient enroulées, invisibles), admet un nombre gigantesque de variantes, et n'a encore fait aucune prédiction vérifiée.",
   "Des cordes qui vibrent au lieu de points : belle, mais pas encore testée."],
  ["q44","La théorie de la gravitation quantique à boucles",
   "C'est la grande rivale des cordes pour rendre la gravité quantique. Au lieu d'ajouter des cordes et des dimensions, elle quantifie directement l'espace : il serait fait de minuscules « grains » liés en réseau, d'une taille autour de 10⁻³⁵ mètre (la longueur de Planck).\n\nL'espace ne serait donc pas continu, mais granuleux, comme l'énergie l'est pour Planck. Une conséquence possible : le Big Bang serait un « grand rebond » d'un univers antérieur. Elle non plus n'a pas encore de confirmation expérimentale.",
   "L'espace lui-même serait fait de grains : une autre piste pour la gravité quantique."],
  ["q45","L'interprétation d'Everett ou la théorie des mondes multiples",
   "En 1957, Hugh Everett propose de prendre l'équation de Schrödinger au pied de la lettre : la fonction d'onde ne s'effondre jamais. À chaque mesure, toutes les issues se réalisent, et l'univers se ramifie en branches qui ne se voient plus : dans l'une le chat est vivant, dans l'autre il est mort.\n\nAvantage : plus besoin de règle spéciale pour la mesure. Inconvénient : un nombre vertigineux de mondes, et une vraie difficulté à expliquer d'où viennent les probabilités. Elle est prise très au sérieux par une partie des physiciens.",
   "Toutes les issues arrivent, chacune dans sa branche de l'univers."],
  ["q46","La théorie de la décohérence quantique",
   "Un système quantique isolé peut rester en superposition. Mais dès qu'il interagit avec son environnement (air, lumière, chaleur), les informations sur son état fuient partout, et les interférences entre ses possibilités deviennent impossibles à observer. Il se comporte alors comme un objet classique.\n\nC'est pourquoi on ne voit pas de chats superposés, et pourquoi les ordinateurs quantiques doivent être isolés et refroidis à l'extrême. La décohérence explique pourquoi le monde paraît classique ; elle n'explique pas, à elle seule, pourquoi on obtient un résultat plutôt qu'un autre.",
   "L'environnement brouille les superpositions : c'est pourquoi notre monde semble classique."],
  ["q47","Le vide quantique",
   "En quantique, le vide n'est pas rien. À cause du principe d'incertitude, même un espace sans aucune particule a une énergie minimale et des champs qui fluctuent sans cesse : des paires de particules virtuelles apparaissent et disparaissent en permanence.\n\nCes fluctuations ont des effets mesurables : un léger décalage des niveaux d'énergie de l'atome d'hydrogène (le « décalage de Lamb »), l'effet Casimir. Elles auraient aussi semé, juste après le Big Bang, les irrégularités qui sont devenues les galaxies.",
   "Le vide quantique bouillonne : il a une énergie et des effets mesurables."],
  ["q48","L'effet Casimir",
   "Prédit par Hendrik Casimir en 1948 : deux plaques de métal parfaitement neutres, placées très près l'une de l'autre dans le vide, s'attirent. Entre les plaques, seules certaines fluctuations du vide « tiennent », alors qu'à l'extérieur elles sont toutes possibles : la pression du vide est plus forte dehors.\n\nL'effet est minuscule à notre échelle, mais il a été mesuré précisément en 1997, et il compte pour les micro-machines (MEMS) dont les pièces très proches peuvent se coller.",
   "Le vide pousse deux plaques l'une contre l'autre : on l'a mesuré."],
  ["q49","Serge Haroche et la manipulation des systèmes quantiques individuels",
   "Longtemps, on n'étudiait la quantique qu'à travers des milliards de particules à la fois. Serge Haroche, au Collège de France et à l'ENS, a réussi à piéger un seul photon entre deux miroirs presque parfaits et à l'observer sans le détruire, en faisant passer des atomes à travers la cavité.\n\nIl a pu voir la décohérence se produire en direct. Prix Nobel 2012, partagé avec David Wineland, qui manipulait des ions un par un. Leurs travaux ont ouvert la voie aux horloges atomiques et aux ordinateurs quantiques.",
   "Haroche observe un photon unique sans le détruire : Nobel 2012."],
  ["q50","La lumière liquide",
   "Normalement, les photons s'ignorent : deux faisceaux de lumière se traversent sans se gêner. Mais si on fait passer la lumière dans un matériau qui la couple fortement à la matière (on parle de polaritons), les grains de lumière se mettent à interagir entre eux.\n\nIls peuvent alors se comporter collectivement comme un fluide, et même comme un superfluide, qui s'écoule sans frottement autour d'un obstacle. Des équipes l'ont observé à température ambiante (2017). C'est une piste pour de futurs circuits qui calculeraient avec la lumière.",
   "La lumière peut couler comme un fluide sans frottement."]]},
  {t:"Lumière sur…", c:[
  ["q51","Albert Einstein, le père de la physique moderne",
   "En 1905, son « année miraculeuse », Einstein publie à 26 ans quatre articles qui changent la physique : les quanta de lumière, la preuve de l'existence des atomes (mouvement brownien), la relativité restreinte et E = mc². En 1915, la relativité générale fait de la gravité une courbure de l'espace-temps.\n\nIl a lancé la quantique, puis l'a combattue toute sa vie (« Dieu ne joue pas aux dés »). Ses objections, comme le paradoxe EPR, ont conduit à découvrir l'intrication, aujourd'hui au cœur des technologies quantiques.",
   "Il a fondé la quantique et l'a contestée ; ses doutes ont fait avancer la science."]]}
  ]}];

/* ---- l'état : quand un concept a été compris (synchronisé avec le cadre) ---- */
function bibLus(){ const C=acc(); if(!C.bib) C.bib={}; return C.bib; }
function bibTous(r){ return r.chap.flatMap((ch,i)=>ch.c.map(x=>({id:x[0],t:x[1],x:x[2],r:x[3],ch:ch.t,ci:i}))); }
function bibTrouve(id){ for(const r of BIBLIO){ const c=bibTous(r).find(x=>x.id===id); if(c) return {r,c}; } return null; }
/* le concept du jour : le premier pas encore compris, dans l'ordre du rayon */
function bibDuJour(r){ const L=bibLus(); return bibTous(r).find(c=>!L[c.id])||null; }

/* les noms courts des chapitres : ce que la Rosace couche au sol (un quartier par chapitre) */
const BIB_ONGLET={quantique:"Quantique", informatique:"Informatique & IA"};
const BIB_COURT={quantique:["ORIGINES","PRINCIPES","APPLICATIONS","EINSTEIN"], informatique:["LA MACHINE","LES RÉSEAUX","LA SÉCURITÉ","L'IA"]};
function bibRayon(){ return BIBLIO.find(r=>r.id===S.bibR)||BIBLIO[0]; }
function bibR(id){ S.bibR=id; save0(); render(); }
/* ---- les questions de Thomas, par rayon (synchronisées) ; les réponses de Claude vivent dans r.rep ---- */
function bibQs(rid){ const C=acc(); if(!C.bibQ) C.bibQ={}; return (C.bibQ[rid]=C.bibQ[rid]||[]); }
function bibQAjout(rid){ const el=document.getElementById("bibQIn"), q=(el&&el.value||"").trim(); if(!q) return;
  bibQs(rid).push({id:"q"+Date.now().toString(36), t:Date.now(), q}); save(); render(); toast("Question notée. Copie-la pour Claude quand tu veux."); }
function bibQSuppr(rid,id){ const x=bibQs(rid).find(x=>x.id===id); if(x){ x.del=Date.now(); save(); render(); } }
function bibQCopier(rid){ const r=BIBLIO.find(x=>x.id===rid), L=bibQs(rid).filter(x=>!x.del);
  const txt="Mes questions · "+r.titre+"\n\n"+L.map((x,i)=>(i+1)+". "+x.q).join("\n");
  const ok=()=>toast("Copié. Colle-le dans la conversation avec Claude.");
  if(navigator.clipboard&&navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(ok).catch(()=>prompt("Copie ce texte :",txt)); else prompt("Copie ce texte :",txt); }
function bibRepOuvrir(rid,k){ const r=BIBLIO.find(x=>x.id===rid), x=r&&r.rep&&r.rep[k]; if(!x) return;
  sheet(`<div class="bib-f"><div class="bib-f-sur">${r.e} ${esc(r.titre)} · ta question</div>
    <h3>${esc(x.q)}</h3>${x.r.split("\n\n").map(p=>`<p>${esc(p)}</p>`).join("")}
    ${x.ret?`<div class="bib-ret"><small>À retenir</small>${esc(x.ret)}</div>`:""}
    <button class="btn ghost" onclick="closeOv();render()">Fermer</button></div>`); }

function biblioHtml(){
  const L=bibLus(), r=bibRayon(), T=bibTous(r), n=T.filter(c=>L[c.id]).length, j=bibDuJour(r);
  const Q=bibQs(r.id).filter(x=>!x.del), R=r.rep||[];
  return `${BIBLIO.length>1?`<div class="bib-rayons">${BIBLIO.map(x=>`<button class="${x===r?"on":""}" onclick="bibR('${x.id}')">${x.e} ${esc(BIB_ONGLET[x.id]||x.titre)}</button>`).join("")}</div>`:""}
    ${typeof etude_rosace4==="function"?`<div id="rosSlot"></div>`:""}
    <div class="cahbloc bib">
      <div class="cahbloc-h"><b>${r.e} ${esc(r.titre)}</b><span>${n} sur ${T.length} compris</span></div>
      <div class="bib-jauge"><i style="width:${Math.round(100*n/T.length)}%"></i></div>
      ${j?`<button class="bib-jour" onclick="bibOuvrir('${j.id}')"><small>Le concept du jour · ${esc(j.ch)}</small><b>${esc(j.t)}</b><span>${esc(j.r)}</span></button>`
        :`<div class="cvide">Tout le rayon est compris.</div>`}
      ${r.chap.map((ch,i)=>{ const C=T.filter(c=>c.ci===i), k=C.filter(c=>L[c.id]).length;
        return `<details class="bib-ch"><summary>${esc(ch.t)}<em>${k}/${C.length}${k===C.length?" · verre allumé":""}</em></summary>
          ${C.map(c=>`<button class="bib-l ${L[c.id]?"lu":""}" onclick="bibOuvrir('${c.id}')"><i>${L[c.id]?"✓":"·"}</i>${esc(c.t)}</button>`).join("")}</details>`; }).join("")}
    </div>
    <div class="cahbloc bib">
      <div class="cahbloc-h"><b>❓ Questions</b><span>${R.length} répondue${R.length>1?"s":""}${Q.length?" · "+Q.length+" en attente":""}</span></div>
      <textarea id="bibQIn" class="bib-q-in" placeholder="Une question sur ce rayon, même naïve…"></textarea>
      <button class="btn ghost" style="margin-top:8px" onclick="bibQAjout('${r.id}')">＋ Noter ma question</button>
      ${Q.length?`<div class="bib-q-att">${Q.map(x=>`<div class="bib-q"><span>${esc(x.q)}</span><button onclick="bibQSuppr('${r.id}','${x.id}')" aria-label="Retirer">✕</button></div>`).join("")}
        <button class="btn" onclick="bibQCopier('${r.id}')">Copier mes questions pour Claude</button></div>`:""}
      ${R.length?`<div class="bib-q-rep">${R.map((x,k)=>`<button class="bib-l" onclick="bibRepOuvrir('${r.id}',${k})"><i>✓</i>${esc(x.q)}</button>`).join("")}</div>`:""}
    </div>
    <p class="bib-pied">D'autres rayons viendront : dis à Claude ce que tu veux comprendre.</p>`;
}

/* ---- LA ROSACE de la bibliothèque (02/11) : la pièce du tour 4 (5/5), un quartier par chapitre.
   Un chapitre entièrement compris allume son quartier (animé au moment où il se complète) ;
   le rayon entier compris : le seuil (le cristal, le spectre, la roue de lumière).
   Les 28 médaillons : les 28 derniers jours, allumés par les chapitres travaillés ce jour-là. ---- */
const ROS={};
function bibRosEtat(r){ const L=bibLus(), T=bibTous(r);
  const ok=r.chap.map((ch,i)=>T.filter(c=>c.ci===i).every(c=>L[c.id]));
  return {liste:ok.map((v,i)=>v?i:-1).filter(i=>i>=0), boucle:ok.every(Boolean)}; }
function bibRosDonnees(r){ const L=bibLus(), T=bibTous(r), t=today(), noms=BIB_COURT[r.id]||r.chap.map(c=>c.t.toUpperCase());
  const jours=[]; for(let k=27;k>=0;k--){ const d=dayShift(t,-k);
    jours.push([...new Set(T.filter(c=>L[c.id]&&new Date(L[c.id]).toISOString().slice(0,10)===d).map(c=>c.ci))]); }
  const nb=i=>T.filter(c=>c.ci===i), sous=i=>nb(i).filter(c=>L[c.id]).length+" sur "+nb(i).length+" compris";
  return {priorites:noms.slice(0,4).map((nom,i)=>({nom, min:20, sous:sous(i), serie:0, domaine:r.titre})), jours, mot:"LE RAYON EST COMPRIS"}; }
function bibRosPoser(){
  const slot=document.getElementById("rosSlot"); if(!slot||typeof monterPiece!=="function") return;
  const r=bibRayon(), e=bibRosEtat(r);
  Object.keys(ROS).forEach(k=>{ if(k!==r.id){ try{ ROS[k].m.arreter(); }catch(e){} delete ROS[k]; } });   // une seule rosace vivante
  try{
    let x=ROS[r.id];
    if(!x){ const bloc=document.createElement("div"); bloc.className="bib-rosace"; slot.replaceWith(bloc);
      const m=monterPiece(bloc, etude_rosace4, {donnees:etude_rosace4_DONNEES, avec:bibRosDonnees(r)});
      m.piece.etat(e.liste, e.boucle); ROS[r.id]={bloc, m, liste:e.liste.slice(), boucle:e.boucle}; return; }
    slot.replaceWith(x.bloc);
    const P=x.m.piece, neufs=e.liste.filter(i=>!x.liste.includes(i)), partis=x.liste.filter(i=>!e.liste.includes(i));
    if(partis.length||(x.boucle&&!e.boucle)) P.etat(e.liste, e.boucle);
    else { neufs.forEach((i,k)=>setTimeout(()=>P.faire(i), 400+k*2500)); if(e.boucle&&!x.boucle) setTimeout(()=>P.boucler(), 400+neufs.length*3500); }
    x.liste=e.liste.slice(); x.boucle=e.boucle;
  }catch(err){ console.error(err); slot.remove(); }
}
function bibOuvrir(id){
  const f=bibTrouve(id); if(!f) return; const {r,c}=f, T=bibTous(r), i=T.findIndex(x=>x.id===id), lu=!!bibLus()[id];
  const nav=(k,l)=>T[k]?`<button class="btn ghost" style="margin:0;flex:1" onclick="bibOuvrir('${T[k].id}')">${l}</button>`:"";
  sheet(`<div class="bib-f">
    <div class="bib-f-sur">${r.e} ${esc(r.titre)} · ${esc(c.ch)} · ${i+1}/${T.length}</div>
    <h3>${esc(c.t)}</h3>
    ${c.x.split("\n\n").map(p=>`<p>${esc(p)}</p>`).join("")}
    <div class="bib-ret"><small>À retenir</small>${esc(c.r)}</div>
    <button class="btn" onclick="bibCompris('${id}')">${lu?"✓ Compris · le retirer":"✓ J'ai compris"}</button>
    <div style="display:flex;gap:8px;margin-top:8px">${nav(i-1,"‹ Précédent")}${nav(i+1,"Suivant ›")}</div>
    <button class="btn ghost" onclick="closeOv();render()">Fermer</button></div>`);
}
function bibCompris(id){ const L=bibLus(); if(L[id]) delete L[id]; else L[id]=Date.now(); save();
  const f=bibTrouve(id), T=f?bibTous(f.r):[], nx=L[id]?T.slice(T.findIndex(x=>x.id===id)+1).find(x=>!L[x.id]):null;
  if(L[id]) toast("Compris. Un concept de plus dans ta tête.");
  nx?bibOuvrir(nx.id):(closeOv(),render()); }
