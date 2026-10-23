/* ═══════════════════════════════════════════════════════════════════
   📖 LES LECTURES — tes idées, développées
   Chaque texte part d'une de tes notes (Alex O'Connor & co) et la creuse
   pour un trajet de RER (~10 min). Pour en ajouter un : copie un bloc,
   change l'id (unique), et écris le corps en HTML simple (<p>, <h4>, <em>).
   ═══════════════════════════════════════════════════════════════════ */
window.LECTURES = [

{
id: "vraiment",
titre: "Quelle vitesse, vraiment ?",
sous: "Quand la question « qu'est-ce que c'est vraiment ? » ne veut rien dire",
note: "Poser la question « qu'est-ce que c'est vraiment ? » présuppose une réalité sous-jacente qui n'existe peut-être pas. Un café dans un train ne bouge pas pour le passager ; pour moi dehors, si. « Quelle vitesse a vraiment le café ? » n'a aucun sens. Continuer sur ce mode de raisonnement.",
src: "Alex O'Connor, Within Reason #167",
min: 10,
corps: `
<p>Tu es sur le quai. Un train passe à 100 km/h. À l'intérieur, un passager a posé son café sur la tablette. Pour lui, le café est immobile : il peut le reprendre sans le chercher. Pour toi, le café file à 100 km/h. Et pour quelqu'un sur la Lune, il tourne avec la Terre à plus de 1 000 km/h, en plus de tourner autour du Soleil à environ 100 000 km/h.</p>
<p>Alors, quelle est la vitesse <em>vraie</em> du café ?</p>
<p>Ta note dit l'essentiel : la question est mal posée. Pas difficile, pas mystérieuse : mal posée. Elle suppose qu'il existe, quelque part derrière toutes ces mesures, un chiffre unique qui serait <em>la</em> vitesse du café, et que les autres ne sont que des apparences. Or il n'y a pas de tel chiffre. La vitesse n'est pas une chose que le café possède, comme une couleur ou une masse. C'est une relation entre le café et autre chose.</p>

<h4>Le navire de Galilée</h4>
<p>Ce n'est pas une idée moderne. En 1632, Galilée propose déjà l'expérience : enferme-toi dans la cabine d'un grand navire, sous le pont, avec des mouches, des papillons, un bocal de poissons et un seau qui goutte. Tant que le navire avance à vitesse régulière, sans secousse, rien ne te permet de savoir s'il est à quai ou en pleine mer. Les mouches volent pareil, les gouttes tombent droit, les poissons nagent sans effort particulier vers l'avant.</p>
<p>La conclusion de Galilée est radicale pour l'époque : le mouvement uniforme n'est rien <em>en soi</em>. Il n'existe que par rapport à quelque chose. Demander si le navire « bouge vraiment », sans dire par rapport à quoi, c'est demander si Paris est « vraiment à gauche ».</p>

<h4>Ce n'est pas du relativisme</h4>
<p>Attention à ne pas glisser trop vite vers « tout est relatif, donc tout se vaut ». Ce serait l'inverse de ce que montre l'exemple.</p>
<p>Une fois que tu fixes le point de vue, la réponse est parfaitement précise. Par rapport au quai : 100 km/h, pas 99. Par rapport au passager : zéro, pas « à peu près zéro ». Et surtout, il existe une règle exacte pour passer d'un point de vue à l'autre. Si tu connais la vitesse du café pour le passager et la vitesse du train pour toi, tu calcules la vitesse du café pour toi. Les points de vue ne sont pas des opinions : ils sont reliés par une loi.</p>
<p>La relation n'est donc pas un flou. C'est une structure. Ce qui disparaît, c'est seulement le chiffre « absolu », celui qui ne serait pris depuis aucun endroit. Le philosophe Thomas Nagel a appelé cet idéal « le point de vue de nulle part ». L'exemple du café montre que pour certaines grandeurs, ce point de vue de nulle part n'a tout simplement rien à voir.</p>

<h4>Remplacer « vraiment » par « invariant »</h4>
<p>Voici, à mon avis, la meilleure façon de continuer ton raisonnement. Quand une question en « vraiment » se révèle mal posée, on n'est pas obligé de jeter la question. On peut la reformuler ainsi : <em>qu'est-ce qui ne change pas quand je change de point de vue ?</em></p>
<p>C'est exactement ce qu'a fait la physique. La vitesse du café dépend du point de vue, mais certaines choses n'en dépendent pas : par exemple, que le café et la tasse se déplacent ensemble, ou (avec Einstein) la vitesse de la lumière, la même pour tous. Einstein lui-même trouvait que le nom « relativité » était trompeur : sa théorie est d'abord une recherche de ce qui reste identique pour tout le monde. Le philosophe Robert Nozick a proposé d'en faire une définition générale : est objectif ce qui reste invariant quand on change de perspective.</p>
<p>La question « qu'est-ce que c'est vraiment ? » devient alors : « qu'est-ce qui, dans ce que je vois, survit à tous les changements de point de vue ? » Et ça, c'est une question qui a des réponses.</p>

<h4>Où l'appliquer</h4>
<p><strong>La couleur.</strong> « De quelle couleur est vraiment cette pomme ? » La couleur dépend de la lumière qui l'éclaire et de l'œil qui la reçoit : sous une lampe au sodium, la pomme rouge paraît brune ; pour un chien, elle n'a pas la même teinte. Ce qui est invariant, c'est la façon dont la surface renvoie chaque longueur d'onde. La « couleur vraie » est une relation à trois termes : surface, lumière, œil.</p>
<p><strong>Le prix.</strong> « Combien vaut vraiment cet appartement ? » Il vaut ce que quelqu'un est prêt à payer, à tel moment, sur tel marché. Il n'y a pas de valeur cachée derrière les offres. Ce qui peut être invariant, ce sont des contraintes (les loyers qu'il peut rapporter, le coût pour le reconstruire) qui encadrent les prix possibles. Tu retrouveras cette idée en finance : une valorisation n'est jamais une découverte, c'est un point de vue argumenté.</p>
<p><strong>Les personnes.</strong> « Qui est-il vraiment ? » On imagine souvent un vrai moi caché derrière les rôles : avec ses parents, au travail, avec ses amis. Peut-être que ce moi caché n'existe pas plus que la vitesse absolue du café. Ce qui serait « vrai », ce seraient plutôt les constantes : ce qu'une personne fait quelle que soit la situation.</p>

<h4>La limite honnête</h4>
<p>Toutes les questions en « vraiment » ne sont pas mal posées. « Cette bague est-elle vraiment en or ? » a une réponse nette : on fait un test, et l'or ne dépend pas de qui regarde. La différence ? Pour l'or, il existe une procédure qui donne le même résultat pour tout le monde. Pour la vitesse, chaque procédure donne un résultat différent selon d'où on la fait. Un bon réflexe : avant de chercher ce qu'est « vraiment » une chose, demande-toi si la question a un test, et si ce test donne la même réponse depuis n'importe où.</p>
<p>Et il reste une objection sérieuse, que tu croiseras dans le texte suivant. Si tout est relation, alors relation <em>entre quoi</em> ? Il faut bien qu'il y ait des choses pour être en relation. Le café, au moins, existe, non ? C'est précisément là que ton électron devient intéressant.</p>
`,
question: "Choisis une question en « vraiment » que tu te poses en ce moment (sur toi, quelqu'un, un choix). Est-elle comme l'or, avec un test ? Ou comme la vitesse, sans point de vue privilégié ? Que deviendrait-elle si tu cherchais plutôt ce qui est invariant ?",
plus: "Galilée, <em>Dialogue sur les deux grands systèmes du monde</em> (1632), le passage du navire · Thomas Nagel, <em>Le point de vue de nulle part</em> · Robert Nozick, <em>Invariances</em>"
},

{
id: "electron",
titre: "L'électron n'est pas une chaise",
sous: "Pourquoi on ne peut pas additionner les comportements d'une particule",
note: "On peut toujours zoomer plus petit, mais un électron… on ne peut plus ? Difficile à comprendre. Si on interagit d'une façon avec un électron, il se comporte d'une façon ; d'une autre, d'une autre. Mais on ne peut pas ADDITIONNER ces composantes comme avec une chaise.",
src: "Alex O'Connor, Within Reason #167",
min: 10,
corps: `
<p>Prends une chaise. Tu peux la peser : 5 kg. La mesurer : 90 cm de haut. Regarder sa couleur : chêne clair. Taper dessus : bruit sourd. Chaque façon d'interagir avec elle te révèle une facette, et toutes ces facettes s'additionnent sans conflit. Tu peux écrire une fiche : poids, hauteur, couleur, son. La fiche existe avant que tu regardes. Peser la chaise ne change pas sa couleur.</p>
<p>Ta note met le doigt sur ce qui casse avec un électron. Et elle mélange deux idées qu'il vaut la peine de séparer.</p>

<h4>Première idée : on ne peut plus zoomer</h4>
<p>Une chaise, c'est du bois. Le bois, des fibres. Les fibres, des molécules. Les molécules, des atomes. L'atome, un noyau et des électrons. Le noyau, des protons et des neutrons ; chacun, trois quarks. À chaque étape, on explique le tout par ses parties.</p>
<p>L'électron, lui, n'a <em>aucune</em> structure interne connue. Ce n'est pas qu'il serait « la somme de ses composants » : il n'a pas de composants, du moins à notre connaissance. Les expériences l'ont sondé à des échelles des milliards de fois plus petites qu'un atome, et il se comporte toujours comme un point sans parties. Dans le modèle standard, c'est une particule élémentaire, comme les quarks.</p>
<p>Précision honnête : « élémentaire » veut dire « on n'a rien trouvé dedans », pas « on a prouvé qu'il n'y a rien ». Il est possible qu'on découvre un jour une sous-structure. Mais même si c'était le cas, le second problème, le plus étrange, resterait entier.</p>

<h4>Deuxième idée : pas de fiche possible</h4>
<p>Un électron a une propriété appelée spin, qu'on peut se représenter (très grossièrement) comme une petite aiguille aimantée. On la mesure avec un aimant orienté dans une direction, disons verticale. Résultat : toujours l'un de deux, « haut » ou « bas ».</p>
<p>Maintenant, l'expérience qui change tout, faite dès 1922 sous une forme proche (Stern et Gerlach) :</p>
<p>1. Tu mesures le spin vertical : « haut ». Tu remesures : « haut » encore, à chaque fois. Bien.<br>2. Tu mesures ensuite le spin horizontal (gauche/droite) : cinquante-cinquante, au hasard.<br>3. Tu reviens au vertical. Et là, surprise : cinquante-cinquante à nouveau. Le « haut » d'avant a été effacé.</p>
<p>Avec une chaise, ce serait comme si la peser effaçait sa couleur, et que regarder sa couleur rendait son poids aléatoire. Tu ne peux pas remplir la fiche « spin vertical : haut, spin horizontal : gauche ». Ces deux cases ne peuvent pas être remplies ensemble.</p>
<p>C'est ça, ton « on ne peut pas additionner ». Chaque interaction te donne une réponse nette, mais les réponses ne s'ajoutent pas en un portrait complet.</p>

<h4>Peut-être qu'on ignore juste la fiche ?</h4>
<p>Réflexe naturel : l'électron <em>a</em> une fiche complète, mais nos mesures sont trop brutales et la dérangent. C'est ce qu'espérait Einstein.</p>
<p>Deux résultats rendent cet espoir très difficile à tenir. En 1964, John Bell montre que si les particules portaient des valeurs toutes faites, déterminées localement, certaines corrélations entre particules éloignées ne pourraient pas dépasser une certaine limite. Les expériences, d'Alain Aspect au début des années 1980 jusqu'aux versions sans faille des années 2010, montrent que la limite est dépassée. Prix Nobel 2022. Et en 1967, Kochen et Specker prouvent qu'il est mathématiquement impossible d'attribuer à l'avance une valeur à toutes les propriétés d'un système quantique, indépendamment de la façon dont on les mesure. La réponse dépend du contexte de la question.</p>
<p>Autrement dit : ce n'est pas qu'on ne connaît pas la fiche. C'est qu'il n'y a pas de fiche qui serait indépendante de la manière d'interroger.</p>

<h4>Le retour du café</h4>
<p>Tu vois le lien avec le texte précédent ? La vitesse du café n'existe que par rapport à un observateur. Le spin de l'électron n'a de valeur que par rapport à une interaction. Le physicien Carlo Rovelli a poussé ce parallèle jusqu'au bout avec la mécanique quantique relationnelle (1996) : les propriétés d'un système n'existent que relativement à un autre système avec lequel il interagit. Pas d'électron « en soi » avec une liste de valeurs, seulement des électrons-pour-ceci, des électrons-pour-cela. Exactement comme il n'y a pas de café-en-soi avec une vitesse.</p>
<p>Honnêteté obligatoire : c'est une interprétation parmi d'autres, et minoritaire. D'autres physiciens gardent des valeurs cachées en acceptant des influences instantanées à distance (Bohm) ; d'autres pensent que toutes les issues se réalisent dans des branches différentes (Everett) ; beaucoup se contentent d'utiliser les équations sans se prononcer. Les expériences ne tranchent pas encore entre elles. Mais toutes s'accordent sur un point : l'image de la fiche, celle de la chaise, ne marche pas.</p>

<h4>Et si la chaise trichait ?</h4>
<p>Dernière idée, la plus vertigineuse. Si la chaise est faite d'électrons, pourquoi a-t-elle une fiche, elle ? Une réponse possible : parce que nos interactions avec une chaise la dérangent si peu, et parce qu'elle interagit en permanence avec l'air, la lumière, le sol, que toutes les façons de l'interroger finissent par donner des réponses compatibles. La fiche de la chaise ne serait pas plus « vraie » que les réponses de l'électron : ce serait un cas particulier très stable, une relation qui ne bouge presque pas.</p>
<p>Dit autrement : peut-être que c'est la chaise qui est l'exception, et l'électron la règle.</p>
`,
question: "Y a-t-il des choses dans ta vie qui ressemblent à l'électron plus qu'à la chaise, où la façon de poser la question change la réponse ? (Un exemple pour démarrer : « est-ce que tu es motivé ? » posé un lundi matin ou après une victoire.)",
plus: "Carlo Rovelli, <em>Helgoland</em> (court, en français, très lisible) · Pour le spin sans équations : chercher « expérience de Stern-Gerlach » en vidéo"
},

{
id: "petit",
titre: "Le biais du petit",
sous: "Et si on expliquait par le dessus plutôt que par le dessous ?",
note: "On a ce biais du « petit » : il faudrait peut-être expliquer en passant au-dessus. Pour la conscience par exemple : l'univers entier devient conscient.",
src: "Alex O'Connor, Within Reason #167",
min: 10,
corps: `
<p>Pourquoi l'eau mouille-t-elle ? Parce que ses molécules s'attirent d'une certaine façon. Pourquoi le soleil brille-t-il ? Parce que des noyaux d'hydrogène fusionnent en son cœur. Pourquoi tombe-t-on malade ? Parce que des virus se multiplient dans nos cellules.</p>
<p>Depuis quatre siècles, la science avance presque toujours dans le même sens : on comprend le grand en le démontant en petits morceaux. Ça a si bien marché qu'on a fini par prendre une méthode pour une vérité sur le monde. Le petit serait plus réel, plus fondamental, et le grand ne serait qu'un assemblage. C'est le « biais du petit » de ta note.</p>
<p>La question est : est-ce une découverte, ou une habitude ?</p>

<h4>Là où le petit coince : la conscience</h4>
<p>Il y a un sujet où démonter ne marche pas, du moins pas encore : l'expérience vécue. Tu peux décrire chaque neurone, chaque signal électrique, et il reste une question : pourquoi tout ça s'accompagne-t-il d'un <em>ressenti</em>, du rouge que tu vois, de la douleur que tu sens ?</p>
<p>Une réponse, le panpsychisme, dit : la conscience était là depuis le début, en version minuscule, dans les particules elles-mêmes. Un électron aurait une forme infime d'expérience, et nos esprits naîtraient de l'assemblage de ces micro-expériences. C'est encore le biais du petit, appliqué à la conscience.</p>
<p>Le problème, c'est l'assemblage. William James l'a formulé dès 1890 : prends douze hommes, donne à chacun un mot d'une phrase. Chacun pense son mot. Nulle part n'apparaît la pensée de la phrase entière. Additionner des petits points de vue ne fabrique pas un grand point de vue. On appelle ça le problème de la combinaison, et c'est le point faible du panpsychisme.</p>

<h4>Retourner le problème</h4>
<p>D'où l'idée de ta note : et si on partait du haut ? C'est le cosmopsychisme, défendu notamment par Itay Shani et Philip Goff. Le sujet conscient fondamental ne serait pas l'électron mais l'univers lui-même, pris comme un tout. Nos esprits individuels seraient des parties, des aspects, des tourbillons dans cette conscience unique, un peu comme des vagues sont des formes de l'océan et non des briques qui le composent.</p>
<p>L'avantage : on n'a plus besoin de coller des petits esprits pour en faire un grand. L'idée a aussi des ancêtres prestigieux : Spinoza pensait déjà qu'il n'y a au fond qu'une seule réalité, dont tout le reste est une manière d'être.</p>

<h4>La physique a-t-elle son mot à dire ?</h4>
<p>Étonnamment, oui, et c'est là que ce texte rejoint ton électron. En mécanique quantique, deux particules peuvent être « intriquées ». Dans ce cas, l'état de la paire est parfaitement défini, mais chaque particule prise seule n'a pas d'état bien défini. Le tout est plus déterminé que ses parties. On ne peut pas reconstruire la paire en décrivant chaque particule séparément puis en ajoutant.</p>
<p>Le philosophe Jonathan Schaffer s'appuie sur ce fait pour défendre une idée qu'il appelle la priorité du tout : à la limite, c'est le cosmos entier qui serait fondamental, et les objets séparés seraient des découpages dans ce tout. Pas « l'univers est fait de parties », mais « les parties sont des aspects de l'univers ».</p>
<p>Ça ne prouve pas que l'univers est conscient. Mais ça montre que « le petit d'abord » n'est pas une loi de la nature : à l'échelle la plus fondamentale qu'on connaisse, c'est parfois le grand qui commande.</p>

<h4>Mon avis honnête</h4>
<p>Il faut séparer deux affirmations qu'on confond souvent.</p>
<p><strong>Un : le tout peut être plus fondamental que les parties.</strong> C'est défendable, et la physique quantique donne de vrais arguments.</p>
<p><strong>Deux : le tout est conscient.</strong> C'est un saut énorme. Le cosmopsychisme échange un mystère contre un autre : au lieu du problème de la combinaison (comment les petits esprits font un grand), on a le problème de la « décombinaison » : comment une conscience cosmique unique se découpe-t-elle en toi, moi, chacun avec ses pensées privées, qui ignorent tout les unes des autres ? Pour l'instant, personne n'a de réponse convaincante. Et aucune expérience imaginable ne permet de tester l'idée, ce qui devrait nous rendre prudents.</p>
<p>Il existe aussi une troisième voie, qu'on oublie entre le haut et le bas : les niveaux. Une conversation, un marché, une équipe ont des propriétés réelles qui n'existent ni chez les individus ni au niveau de l'humanité entière. Le « bon niveau » d'explication n'est peut-être ni le plus petit ni le plus grand, mais celui où les choses ont un comportement stable.</p>

<h4>Ce que tu peux garder</h4>
<p>Même si tu n'achètes pas l'univers conscient, l'outil mental est précieux : quand une explication par les parties ne marche pas, essaie de l'inverser. Une équipe qui ne fonctionne pas avec de bons éléments, un couple qui se dispute alors que chacun est raisonnable : le problème est peut-être au niveau du tout, pas des morceaux. Chercher le coupable individuel, c'est parfois juste le biais du petit.</p>
`,
question: "Pense à un problème que tu essaies d'expliquer en cherchant « la pièce défectueuse » (toi, quelqu'un, un détail). Que verrais-tu si tu regardais plutôt le tout : la relation, le groupe, le système ?",
plus: "Philip Goff, <em>Galileo's Error</em> (en anglais, accessible) · Alex O'Connor a reçu Goff plusieurs fois sur Within Reason · Spinoza, <em>Éthique</em>, partie I (dense, à lire accompagné)"
},

{
id: "proposer",
titre: "Ce qu'on ne voit pas quand l'autre propose",
sous: "Les occasions invisibles, et où les retrouver ailleurs",
note: "On me reproche de ne pas proposer assez qu'on se voie. Mais si la personne propose plus et que j'accepte, on ne voit pas les fois où j'aurais pu proposer si elle ne l'avait pas fait. Trouver cette logique dans d'autres sphères.",
src: "Une observation à toi",
min: 10,
corps: `
<p>Tu as remarqué quelque chose de fin. Quelqu'un te dit : « C'est toujours moi qui propose. » Les faits semblent lui donner raison : sur les dix dernières sorties, elle en a proposé huit. Mais ce chiffre cache une chose. Peut-être qu'à plusieurs de ces occasions, tu aurais proposé le lendemain, ou le soir même. Elle a juste été plus rapide. Ton envie existait, mais elle n'a jamais eu l'occasion de se montrer. Elle a été <em>préemptée</em>.</p>
<p>Le registre ne contient que ce qui s'est passé. Ce qui se serait passé sans son initiative n'y figure nulle part. Et pourtant, c'est précisément ce dont on aurait besoin pour juger.</p>

<h4>Le nom de ce problème</h4>
<p>Les philosophes de la causalité connaissent bien cette structure. L'exemple classique, discuté par David Lewis et Ned Hall : Suzy et Billy lancent chacun une pierre sur une bouteille. Celle de Suzy arrive la première et brise la bouteille ; celle de Billy passe dans le vide, là où la bouteille était. Billy n'a rien cassé. Mais si Suzy n'avait pas lancé, la bouteille aurait été brisée quand même, par lui. Regarder seulement ce qui s'est passé fait de Billy quelqu'un qui « ne casse jamais rien ». C'est faux sur ses intentions, et faux sur ce qu'il aurait fait.</p>
<p>Tu es Billy. Ce n'est pas que tu ne lances pas : c'est que ta pierre arrive après.</p>
<p>En statistique, on parle de données censurées : tu observes ton envie de proposer uniquement quand l'autre laisse un vide. Si elle ne laisse jamais de vide, l'observation est impossible, et l'absence de données ressemble à une absence d'envie.</p>

<h4>Ce qu'on voit et ce qu'on ne voit pas</h4>
<p>Il y a un texte français célèbre sur cette idée, de l'économiste Frédéric Bastiat, en 1850 : <em>Ce qu'on voit et ce qu'on ne voit pas</em>. Un gamin casse une vitre ; quelqu'un remarque que ça fait travailler le vitrier. On voit le vitrier payé. On ne voit pas les chaussures que le propriétaire aurait achetées avec cet argent. Le bon raisonneur, dit Bastiat, est celui qui tient compte des deux.</p>
<p>Ta remarque est de la même famille : on voit les propositions de l'autre, on ne voit pas les tiennes qui n'ont pas eu lieu.</p>

<h4>La même logique, ailleurs</h4>
<p><strong>La prévention.</strong> Avant l'an 2000, des milliers d'informaticiens corrigent le « bug de l'an 2000 ». Le 1er janvier, presque rien ne se passe. Conclusion de beaucoup : « Tout ça pour rien, c'était exagéré. » Le succès de la prévention efface la preuve qu'elle était utile. On appelle ça parfois le paradoxe de la préparation.</p>
<p><strong>La médecine.</strong> Un patient prend un traitement et guérit. Le traitement a-t-il marché ? Impossible de le savoir avec ce seul cas : on ne voit pas ce qui se serait passé sans. C'est pour ça qu'on fait des essais avec un groupe témoin, qui crée artificiellement le monde invisible.</p>
<p><strong>Le travail en équipe.</strong> Dans un groupe de projet, il y a souvent quelqu'un qui prend la parole en premier, qui se propose pour la synthèse, qui envoie le mail. Les autres finissent par passer pour passifs. Certains le sont. D'autres n'ont simplement jamais eu le temps de lever la main. Tu le verras en stage : celui qui s'empare de tout rend invisible l'initiative des autres, et parfois l'étouffe.</p>
<p><strong>Les parents.</strong> Un parent qui anticipe tout (le goûter, le devoir, le coup de fil) a un enfant qui « ne prend jamais d'initiative ». L'enfant n'a jamais eu de vide à remplir.</p>
<p><strong>Le sport.</strong> Un défenseur bien placé ne fait presque jamais de tacle spectaculaire : les attaquants n'essaient même pas de passer de son côté. Ses statistiques sont pauvres, son influence énorme. Ce qu'il empêche ne laisse pas de trace.</p>

<h4>L'objection que tu dois te faire</h4>
<p>Voilà le piège : cet argument est très pratique. Il peut servir d'excuse à quelqu'un qui n'aurait, en réalité, jamais proposé. « J'aurais proposé si tu ne l'avais pas fait » est invérifiable par construction, et c'est justement pour ça qu'il faut s'en méfier un peu. Ta remarque n'est pas une preuve que tu proposes assez ; c'est une preuve que le chiffre « huit sur dix » ne suffit pas à conclure. Ce n'est pas la même chose.</p>
<p>Comment trancher ? Comme en médecine : <strong>créer le vide.</strong> Regarde ce qui se passe quand l'autre ne propose pas pendant une semaine. Ou regarde tes autres relations : avec des amis qui proposent peu, est-ce toi qui lances ? Si oui, ton argument tient. Si tu ne proposes nulle part, il faut l'entendre.</p>

<h4>Le lien avec le café</h4>
<p>Et voici ce qui relie ta note aux autres textes. « Proposer souvent » ressemble à une qualité de la personne, comme une masse. Mais c'est peut-être plutôt une propriété de la relation, comme la vitesse du café. Avec quelqu'un de très rapide, tu deviens quelqu'un qui accepte. Avec quelqu'un de réservé, tu deviens quelqu'un qui lance. Demander « est-ce que je suis <em>vraiment</em> quelqu'un qui propose ? », c'est peut-être demander quelle est la vitesse vraie du café.</p>
<p>La bonne question devient alors : qu'est-ce qui se passe <em>entre nous</em>, et est-ce que ça nous convient à tous les deux ? Ça se dit simplement : « J'ai l'impression que tu es souvent plus rapide que moi pour proposer. Si tu me laisses un peu de place, on verra si je la prends. »</p>
`,
question: "Où, dans ta vie, est-ce toi qui préemptes les autres ? (Au travail, en famille, en conversation.) Et qu'est-ce que tu ne vois pas d'eux à cause de ça ?",
plus: "Frédéric Bastiat, <em>Ce qu'on voit et ce qu'on ne voit pas</em> (1850, court et gratuit en ligne) · Pour la causalité : chercher « préemption, Suzy et Billy »"
},

{
id: "fil",
titre: "Le fil rouge",
sous: "Ce que tes quatre notes disent ensemble",
note: "Relis tes notes à la suite : la vitesse du café, l'électron, le biais du petit, les propositions invisibles.",
src: "Synthèse",
min: 7,
corps: `
<p>Tu as noté ces idées en écoutant, au fil des jours, sans chercher de lien. Pourtant, mises côte à côte, elles tracent une seule ligne de pensée. C'est souvent comme ça que se forme une vraie position philosophique : pas en la décidant, mais en remarquant ce qui revient.</p>

<h4>Ce qui revient</h4>
<p><strong>Le café</strong> : la vitesse n'appartient pas à l'objet, elle naît entre l'objet et un observateur.</p>
<p><strong>L'électron</strong> : ses propriétés n'existent pas sous forme de fiche ; elles apparaissent dans une interaction, et changent avec elle.</p>
<p><strong>Le biais du petit</strong> : le tout n'est pas forcément un assemblage de morceaux autonomes ; parfois, c'est lui qui est premier.</p>
<p><strong>Les propositions</strong> : « proposer souvent » ressemble à un trait de caractère, mais dépend de ce que fait l'autre.</p>
<p>Le point commun : <em>beaucoup de choses qu'on prend pour des propriétés d'un objet sont en réalité des propriétés d'une relation.</em> Et la question « qu'est-ce que c'est vraiment, en soi ? » est souvent la mauvaise, parce qu'il n'y a pas d'« en soi » à trouver.</p>
<p>Cette famille d'idées a un nom large : le relationnisme, ou structuralisme, selon les versions. On la retrouve chez Rovelli en physique, chez certains bouddhistes (la « production conditionnée » : rien n'existe par soi seul), chez les sociologues qui étudient les réseaux plutôt que les individus.</p>

<h4>Les deux dangers</h4>
<p><strong>Le premier : tout dissoudre.</strong> Si tout est relation, relation entre quoi ? Il faut que quelque chose soit en relation. Les défenseurs les plus radicaux répondent que les « choses » ne sont que des nœuds dans un réseau de relations. Les critiques trouvent ça incohérent : un réseau sans nœuds, c'est un sourire sans chat. C'est un vrai débat ouvert, et tu n'as pas à le trancher.</p>
<p><strong>Le second : s'excuser de tout.</strong> « Ce n'est pas moi, c'est la relation » peut devenir une façon d'esquiver. La version honnête dit : mes traits dépendent aussi du contexte, donc je peux changer le contexte, ou me changer dedans. Pas : je n'y suis pour rien.</p>

<h4>L'outil qui reste</h4>
<p>Si tu ne gardes qu'une chose de cette série, garde la reformulation. Quand une question te bloque parce qu'elle demande ce qu'est vraiment une chose, transforme-la en deux questions :</p>
<p>1. <em>Par rapport à quoi ?</em> (Quel point de vue, quelle interaction, quelle personne, quel contexte.)<br>2. <em>Qu'est-ce qui ne change pas quand je change de point de vue ?</em></p>
<p>La première t'évite de chercher une essence qui n'existe pas. La seconde t'évite de tomber dans « tout se vaut ».</p>

<h4>Pour la suite</h4>
<p>Continue à noter ce que tu entends, dans le carnet juste en dessous. Note surtout ce qui te résiste, ce qui te paraît « difficile à comprendre », comme tu l'as écrit pour l'électron : c'est presque toujours là qu'il y a quelque chose. Quand tu as quelques notes, envoie-les à Claude depuis le carnet, et elles deviendront les prochains textes de cette liste.</p>
`,
question: "Quelle est la question en « vraiment » que tu aimerais le plus résoudre en ce moment ? Note-la dans le carnet : ce sera peut-être le prochain texte.",
plus: "Carlo Rovelli, <em>Helgoland</em>, dernier chapitre (il y relie lui-même physique et philosophie bouddhiste de Nāgārjuna)"
}

];
