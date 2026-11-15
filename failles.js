/* ═══════════════════════════════════════════════════════════════════
   LA FAILLE — le corpus d'entraînement.
   Écrit le 2026-11-15 à la demande de Thomas : « travailler la compétence
   de trouver les failles et poser des questions comme Alex O'Connor,
   dix minutes par jour ».

   Trois listes, et rien d'autre. Aucun état ici : l'app garde ce qui est
   fait dans S.faille (donc dans la clé pointage_v1, donc dans LE COFFRE).

   ① FAILLE_TYPES  — la taxonomie. Chaque type porte « comment la faire
     tomber », pas seulement son nom latin : nommer un sophisme ne réfute
     rien, c'est le contre-exemple qui réfute.
   ② FAILLES       — les extraits à reconstruire, avec leur corrigé.
     Un extrait est de la PROSE, jamais déjà découpé en prémisses :
     le découpage, c'est précisément l'exercice.
     Chaque corrigé porte une `question` — celle qu'un bon intervieweur
     poserait, qui ouvre au lieu de clouer. C'est la deuxième compétence.
   ③ FAILLE_RELANCES — des amorces de questions, pour l'entraînement
     à interroger sans vouloir gagner.

   ⚠️ Les positions sont données dans leur MEILLEURE version. Un extrait
   caricatural n'entraîne à rien : on s'habitue à gagner contre personne.
   ═══════════════════════════════════════════════════════════════════ */

window.FAILLE_TYPES = [
  { id:"cachee", nom:"Prémisse cachée", court:"cachée",
    quoi:"L'argument ne tient que si une proposition non dite est vraie. Elle n'est pas défendue, souvent parce qu'elle paraît évidente à celui qui parle.",
    attaque:"Écris la proposition manquante à voix haute, puis demande-lui s'il la défend. La moitié du temps, il ne l'avait pas vue." },
  { id:"equivoque", nom:"Équivocation", court:"équivoque",
    quoi:"Un même mot change de sens entre deux prémisses. Chaque prémisse est vraie dans son sens ; l'argument n'est valide dans aucun des deux.",
    attaque:"Remplace le mot par sa définition, une fois dans chaque prémisse. Si les deux phrases obtenues ne parlent plus de la même chose, c'est gagné." },
  { id:"dilemme", nom:"Faux dilemme", court:"dilemme",
    quoi:"Deux options présentées comme exhaustives alors qu'une troisième existe.",
    attaque:"Nomme la troisième option, et montre qu'elle est compatible avec tout ce qu'il a accordé." },
  { id:"hative", nom:"Généralisation hâtive", court:"hâtive",
    quoi:"On passe d'un petit nombre de cas, ou de cas mal choisis, à une règle générale.",
    attaque:"Demande comment les cas ont été sélectionnés. Si la sélection dépend de la conclusion, la base est circulaire." },
  { id:"petition", nom:"Pétition de principe", court:"pétition",
    quoi:"La conclusion est déjà contenue dans une prémisse. L'argument est valide et parfaitement inutile.",
    attaque:"Demande ce qui établit la prémisse. Si la réponse est la conclusion, le cercle est fermé — montre-le sans le nommer." },
  { id:"consequent", nom:"Affirmation du conséquent", court:"conséquent",
    quoi:"« Si P alors Q ; or Q ; donc P ». Invalide : Q peut avoir une autre cause que P.",
    attaque:"Trouve un deuxième P' qui produirait le même Q. L'argument ne peut plus désigner P." },
  { id:"correlation", nom:"Corrélation prise pour cause", court:"corrélation",
    quoi:"Deux choses varient ensemble, on conclut que l'une produit l'autre — sans écarter la cause commune ni le sens inverse.",
    attaque:"Propose un facteur qui produirait les deux. Puis demande ce qu'on observerait si la causalité allait dans l'autre sens." },
  { id:"pente", nom:"Pente glissante", court:"pente",
    quoi:"Un premier pas mène fatalement au dernier, sans qu'on dise par quel mécanisme chaque pas entraîne le suivant.",
    attaque:"Demande le mécanisme, marche par marche. Puis cherche un cas où le premier pas a été fait sans le dernier." },
  { id:"consequences", nom:"Appel aux conséquences", court:"conséquences",
    quoi:"« Si c'était vrai, ce serait insupportable, donc c'est faux. » Confond ce qui est vrai et ce qui est souhaitable.",
    attaque:"Accorde que ce serait insupportable, et demande en quoi cela rend la chose fausse. L'inconfort n'est pas un argument — sauf en morale, où les intuitions comptent : là, dis pourquoi." },
  { id:"autorite", nom:"Autorité mal placée", court:"autorité",
    quoi:"On invoque une compétence réelle, mais dans un autre domaine que celui de la question.",
    attaque:"Demande sur quoi porte exactement l'expertise, et si l'expert lui-même présente son avis comme une expertise." },
  { id:"composition", nom:"Composition et division", court:"composition",
    quoi:"Ce qui vaut des parties est attribué au tout, ou l'inverse. Faux dès qu'il y a interaction, corrélation ou effet de sélection.",
    attaque:"Prends un cas où l'interaction est forte et montre que le total ne suit pas la partie." },
  { id:"motte", nom:"Deux thèses pour une", court:"deux thèses",
    quoi:"Une thèse modeste, facile à défendre, et une thèse forte, celle qui sert la conclusion. On défend la première et on conclut avec la seconde.",
    attaque:"Demande laquelle des deux il défend, et fais-le choisir avant de répondre." },
  { id:"paille", nom:"Homme de paille", court:"paille",
    quoi:"On réfute une version affaiblie de la position adverse.",
    attaque:"Reformule la meilleure version de la position attaquée, et demande si elle tombe aussi." },
  { id:"charge", nom:"Charge de la preuve renversée", court:"charge",
    quoi:"« Personne n'a montré que c'était faux » tenu pour une raison de croire.",
    attaque:"Demande ce qu'on observerait si la chose était fausse. Si rien ne distingue les deux cas, il n'y a pas de thèse." },
  { id:"analogie", nom:"Analogie boiteuse", court:"analogie",
    quoi:"Deux cas comparés diffèrent précisément sur le point dont dépend la conclusion.",
    attaque:"Nomme la différence, et montre qu'elle porte sur ce que l'argument conclut — pas sur un détail." },
  { id:"probable", nom:"Probabilité sans espace", court:"probabilité",
    quoi:"On annonce qu'un fait est « extrêmement improbable » sans dire sur quel ensemble de possibles, ni avec quelle mesure.",
    attaque:"Demande l'ensemble des cas possibles et comment il est pondéré. Sans mesure définie, le mot « improbable » ne dit rien." },
  { id:"base", nom:"Taux de base oublié", court:"taux de base",
    quoi:"On raisonne sur la fiabilité d'un indice en oubliant la fréquence de ce qu'il indique. Classique des tests et des signaux.",
    attaque:"Fais tourner les chiffres sur mille cas. Le résultat contredit presque toujours l'intuition de départ." },
  { id:"portee", nom:"Conclusion trop large", court:"portée",
    quoi:"Les prémisses couvrent une partie du terrain, la conclusion le couvre tout entier.",
    attaque:"Trouve le cas qui tombe dans la conclusion mais hors des prémisses, et demande ce qu'on en fait." }
];

/* Chaque extrait : `txt` est de la prose (saut de ligne = \n), `cle` est le
   corrigé. `faible` est l'INDICE dans `cle.prem`. `question` est la relance
   qui ouvre — à comparer avec celle qu'on a écrite soi-même. */
window.FAILLES = [

  { id:"f-finereglage", src:"Apologétique classique — l'argument du réglage fin", dur:2, min:1,
    txt:"Regarde les constantes de la physique. Change la constante cosmologique d'une fraction infime et l'univers s'effondre ou se dilate trop vite pour que des galaxies se forment. Change la force nucléaire forte de quelques pour cent et il n'y a plus de carbone. La fenêtre qui permet une chimie complexe, et donc la vie, est d'une étroitesse vertigineuse. Un réglage aussi précis par pur hasard est absurde. Il y a donc eu un réglage, et qui dit réglage dit quelqu'un qui règle.",
    cle:{
      prem:["Les constantes physiques compatibles avec une chimie complexe tiennent dans une plage très étroite.",
            "Un tel ajustement est extrêmement improbable s'il est dû au hasard.",
            "Si ce n'est pas le hasard, c'est une intention."],
      conc:"L'univers a été réglé par un agent.",
      faible:1, type:"probable",
      defaiseur:"« Improbable » suppose un ensemble de constantes possibles et une façon de les pondérer ; personne n'a cet ensemble, donc le chiffre d'improbabilité n'existe pas.",
      question:"Quand tu dis improbable — improbable par rapport à quoi ? Sur quel ensemble de valeurs possibles, et pondéré comment ?",
      note:"La troisième prémisse est aussi un faux dilemme (elle oublie la nécessité physique et le multivers), mais c'est la deuxième qui porte toute la force rhétorique : c'est elle qu'il faut viser." } },

  { id:"f-moral", src:"Débat sur les fondements de la morale", dur:3, min:1,
    txt:"Si Dieu n'existe pas, qu'est-ce qui rend la torture d'un enfant mauvaise ? Pas une préférence, parce que les préférences changent ; pas une convention, parce qu'une société peut conventionner n'importe quoi. Sans ancrage dans quelque chose qui dépasse les humains, il ne reste que des goûts. Or nous savons tous que la torture d'un enfant n'est pas une question de goût : c'est mal, point. Donc il y a bien quelque chose qui dépasse les humains.",
    cle:{
      prem:["Si Dieu n'existe pas, il n'y a pas de valeurs morales objectives.",
            "Il existe des valeurs morales objectives."],
      conc:"Dieu existe.",
      faible:0, type:"cachee",
      defaiseur:"La première prémisse suppose qu'un fait moral a besoin d'être ancré dans une personne ; un réalisme moral non théiste — Parfit, Scanlon, ou un platonisme des propriétés — fournit l'objectivité sans l'ancrage.",
      question:"Pourquoi un fait moral aurait-il besoin d'être ancré dans une personne, plutôt que d'être simplement vrai, comme un fait mathématique ?",
      note:"Noter l'économie de l'attaque : on ne touche pas à la deuxième prémisse. Nier que la torture soit objectivement mauvaise coûte beaucoup plus cher que de nier l'ancrage." } },

  { id:"f-malnaturel", src:"Théodicée — la défense par le libre arbitre", dur:2, min:1,
    txt:"Le mal dans le monde ne compte pas contre l'existence de Dieu. Un monde d'automates qui ne peuvent pas mal faire vaudrait moins qu'un monde d'êtres libres qui peuvent choisir le bien. Or la liberté réelle implique la possibilité réelle du mal : une liberté qui ne pourrait jamais mal tourner n'est pas une liberté. Le mal est donc le prix d'un bien supérieur, et un Dieu bon peut parfaitement le permettre.",
    cle:{
      prem:["La liberté réelle est un bien supérieur à l'absence de mal.",
            "La liberté réelle implique la possibilité du mal."],
      conc:"Un Dieu bon peut permettre le mal du monde.",
      faible:1, type:"portee",
      defaiseur:"Les prémisses expliquent le mal que quelqu'un choisit ; la conclusion couvre tout le mal du monde, dont le tremblement de terre et la souffrance animale, qui ne sont le choix libre de personne.",
      question:"Est-ce que la défense marche aussi pour la souffrance des animaux pendant les millions d'années qui précèdent l'homme ?",
      note:"C'est la distinction classique mal moral / mal naturel. L'extrait ne la caricature pas : la défense par le libre arbitre est forte sur son terrain, et c'est sa PORTÉE qu'on attaque, pas sa validité." } },

  { id:"f-kalam", src:"Argument cosmologique kalam", dur:3, min:1,
    txt:"Tout ce qui commence à exister a une cause : c'est la chose la mieux établie de notre expérience, rien ne surgit de rien. Or la cosmologie nous dit que l'univers a commencé à exister, il y a environ quatorze milliards d'années. Donc l'univers a une cause. Et une cause de l'univers entier ne peut être ni physique, ni dans le temps, ni dans l'espace, puisque tout cela commence avec lui.",
    cle:{
      prem:["Tout ce qui commence à exister a une cause.",
            "L'univers a commencé à exister."],
      conc:"L'univers a une cause, nécessairement non physique.",
      faible:0, type:"hative",
      defaiseur:"Toutes nos instances de « commencer à exister » sont des réarrangements de matière préexistante à l'intérieur du temps ; si l'univers commence, il n'est pas de ce genre-là, et l'induction ne s'étend pas à lui.",
      question:"Tes exemples de causes sont tous des choses qui arrivent dans le temps, après autre chose. Qu'est-ce que « causer » veut dire s'il n'y a pas d'avant ?",
      note:"Le réflexe faible est d'attaquer la deuxième prémisse en discutant cosmologie, terrain où on perd vite. La première est bien plus fragile, et personne ne la défend jamais parce qu'elle a l'air évidente." } },

  { id:"f-experience", src:"Argument par l'expérience religieuse", dur:3, min:1,
    txt:"Des centaines de millions de personnes, sur tous les continents et à toutes les époques, rapportent avoir fait l'expérience d'une présence qui les dépasse. Ce ne sont pas des illuminés isolés : ce sont des gens ordinaires, souvent sobres et sceptiques, parfois à contrecœur. En temps normal, un témoignage massif et convergent est une raison de croire — c'est comme ça que nous croyons à peu près tout ce que nous n'avons pas vérifié nous-mêmes. Il n'y a pas de raison de faire une exception ici.",
    cle:{
      prem:["Un très grand nombre de personnes rapportent une expérience d'une réalité qui les dépasse.",
            "Un témoignage massif et convergent est normalement une raison de croire."],
      conc:"Il y a une raison de croire à l'objet de ces expériences.",
      faible:1, type:"cachee",
      defaiseur:"La convergence ne compte que si les témoignages sont indépendants et discriminants ; or le CONTENU des expériences suit la tradition du sujet, donc le témoignage ne converge que sur « il y a quelque chose », pas sur ce dont il s'agit.",
      question:"Est-ce que l'expérience permet de distinguer ton Dieu de celui d'une autre tradition, ou seulement quelque chose d'une absence totale ?",
      note:"Attaque honnête : elle laisse debout une conclusion faible (il se passe quelque chose), et ne retire que la conclusion forte. C'est souvent le meilleur rapport force/coût." } },

  { id:"f-foiscience", src:"« La science aussi repose sur la foi »", dur:2, min:1,
    txt:"On oppose la science à la foi, mais la science elle-même repose sur des actes de foi. Croire que les lois de la nature seront demain ce qu'elles étaient hier, c'est un acte de foi : aucune expérience ne peut le prouver sans le présupposer. Croire que le monde extérieur existe, pareil. Le scientifique et le croyant font donc la même chose : ils partent d'engagements qu'ils ne peuvent pas démontrer.",
    cle:{
      prem:["La science présuppose des principes qu'elle ne démontre pas, comme la régularité de la nature.",
            "Croire sans démonstration, c'est de la foi.",
            "Le croyant religieux fait la même chose."],
      conc:"Science et foi religieuse sont au même niveau épistémique.",
      faible:1, type:"equivoque",
      defaiseur:"« Foi » désigne ici deux choses différentes : une confiance révisable par l'expérience, et une confiance qui ne l'est pas ; l'argument n'a de force que tant qu'on ne les sépare pas.",
      question:"Qu'est-ce qui, concrètement, te ferait abandonner le principe de régularité ? Et qu'est-ce qui te ferait abandonner l'autre croyance ?",
      note:"Test de l'équivocation : substitue la définition dans chaque prémisse. « La science présuppose une confiance révisable » et « le croyant a une confiance non révisable » : l'argument s'effondre tout seul." } },

  { id:"f-utilitarisme", src:"Objection classique à l'utilitarisme", dur:3, min:1,
    txt:"Si l'utilitarisme était vrai, un chirurgien devrait prélever les organes d'un patient en bonne santé pour sauver cinq mourants : cinq vies contre une, le calcul est sans appel. Or cela est monstrueux, et nous le savons avec plus de certitude que nous ne savons aucune théorie morale. Une théorie qui implique une monstruosité est fausse. Donc l'utilitarisme est faux.",
    cle:{
      prem:["L'utilitarisme implique qu'il faut prélever les organes d'un patient pour en sauver cinq.",
            "Cette conclusion est inacceptable.",
            "Une théorie qui implique une conclusion inacceptable est fausse."],
      conc:"L'utilitarisme est faux.",
      faible:0, type:"cachee",
      defaiseur:"La première prémisse suppose un utilitarisme de l'acte, qui juge coup par coup ; un utilitarisme de la règle interdit la pratique, parce qu'une médecine où l'on craint l'hôpital produit beaucoup moins de bien.",
      question:"Tu visais l'utilitarisme de l'acte ou celui de la règle ? Est-ce que l'objection touche les deux de la même façon ?",
      note:"La troisième prémisse n'est PAS une faille : en morale, les intuitions fortes comptent comme données. Ne pas confondre « prémisse discutable » et « prémisse faible » — la faible est celle qui tombe au moindre choc." } },

  { id:"f-euthanasie", src:"Débat parlementaire sur l'aide à mourir", dur:3, min:1,
    txt:"Le principe a l'air net : un malade en fin de vie, lucide, qui demande à partir. Mais une fois qu'on a accepté que la mort peut être un soin parce que la personne la choisit, on ne tient plus la ligne. Les critères s'élargissent, parce que la logique du choix ne connaît pas de frontière : pourquoi le malade incurable et pas le malade chronique, pourquoi le malade chronique et pas celui qui souffre psychiquement ? Les pays qui ont légalisé l'ont tous élargi ensuite. Il ne faut donc pas légaliser.",
    cle:{
      prem:["Légaliser suppose d'accepter que la mort choisie peut être un soin.",
            "Une fois ce principe accepté, aucune frontière ne tient.",
            "Les juridictions qui ont légalisé ont élargi leurs critères."],
      conc:"Il ne faut pas légaliser.",
      faible:1, type:"pente",
      defaiseur:"Il faut un mécanisme : montrer que l'élargissement découle du principe lui-même, et non de la façon dont telle loi a été rédigée — sinon une loi mieux bornée suffit à répondre.",
      question:"Existe-t-il une juridiction où les critères n'ont pas bougé ? Si oui, qu'est-ce qui l'explique — le texte, ou le principe ?",
      note:"La troisième prémisse est factuelle et peut être vraie : la pente glissante n'est pas réfutée en niant les faits, mais en demandant ce qui, dans le principe, rend la glissade nécessaire plutôt que contingente." } },

  { id:"f-multiple", src:"Note d'investissement, argumentaire d'achat", dur:1, min:1,
    txt:"La société se traite à 6 fois l'EBITDA alors que ses comparables du secteur sont entre 10 et 12 fois. À périmètre comparable, l'écart n'a pas de raison de durer : le marché finit toujours par repricer. Il y a donc 60 à 80 % de hausse à capturer simplement par le retour à la moyenne du secteur. C'est un achat.",
    cle:{
      prem:["La société se traite à 6× l'EBITDA, le secteur entre 10 et 12×.",
            "L'écart de multiple n'est pas justifié par les fondamentaux.",
            "Les écarts injustifiés se refermentent."],
      conc:"Il faut acheter le titre.",
      faible:1, type:"cachee",
      defaiseur:"Un multiple bas est aussi ce que paie un marché qui a vu quelque chose : il faut montrer que l'écart n'est expliqué ni par la croissance, ni par la marge, ni par le levier, ni par la gouvernance — l'argument le suppose au lieu de le montrer.",
      question:"Qu'est-ce qui, dans cette société, justifierait 6× si le marché avait raison ? Si tu ne trouves rien, qu'est-ce qui te dit que tu as mieux regardé que lui ?",
      note:"La prémisse 2 est posée dans les mots « à périmètre comparable », qui ne sont pas une démonstration mais une incantation. Repérer les prémisses glissées dans un adverbe est la moitié du travail." } },

  { id:"f-volatilite", src:"Entretien, question de marché", dur:2, min:1,
    txt:"Chacune des dix lignes du portefeuille a une volatilité annualisée d'environ 30 %. Le portefeuille est également pondéré, donc chaque ligne pèse 10 %. La volatilité du portefeuille est donc d'environ 30 % : c'est la moyenne pondérée des volatilités de ses composantes.",
    cle:{
      prem:["Chaque ligne a une volatilité de 30 %.",
            "Les poids sont égaux.",
            "La volatilité d'un portefeuille est la moyenne pondérée des volatilités."],
      conc:"Le portefeuille a une volatilité de 30 %.",
      faible:2, type:"composition",
      defaiseur:"La variance d'une somme contient les covariances : avec dix lignes à 30 % et une corrélation moyenne nulle, la volatilité du portefeuille tombe vers 30 % / √10 ≈ 9,5 %. La moyenne pondérée n'est le bon calcul que si tout est parfaitement corrélé.",
      question:"Dans quel cas ta formule serait exacte ? Qu'est-ce que ça te dit sur ce que tu as supposé sans le dire ?",
      note:"Le type « composition » n'est pas qu'une curiosité de logique : c'est la diversification. Vérifier le cas extrême (corrélation 1, corrélation 0) est le réflexe qui le révèle en deux secondes." } },

  { id:"f-cfo", src:"Rumeur de marché", dur:1, min:1,
    txt:"Si la société était en difficulté, le directeur financier partirait avant la publication des comptes. Or le directeur financier est parti la semaine dernière, à six semaines des résultats annuels. La société est donc en difficulté.",
    cle:{
      prem:["Si la société était en difficulté, le CFO partirait.",
            "Le CFO est parti."],
      conc:"La société est en difficulté.",
      faible:1, type:"consequent",
      defaiseur:"Un CFO part aussi pour une meilleure offre, un désaccord de stratégie ou une raison personnelle : la prémisse 1 autorise à prédire le départ à partir de la difficulté, pas à inférer la difficulté à partir du départ.",
      question:"Quelles autres raisons feraient partir un CFO à six semaines des comptes ? Qu'est-ce qui, dans ce cas-ci, permet de les écarter ?",
      note:"La forme « si P alors Q ; or Q ; donc P » survit si P est la SEULE cause plausible de Q. Le travail n'est donc pas de nommer le sophisme, mais de produire un P' concret." } },

  { id:"f-efficience", src:"Cours de finance de marché", dur:2, min:1,
    txt:"Le marché est efficient : les prix intègrent toute l'information disponible. On le sait parce qu'aucun gérant ne bat durablement son indice après frais. Et pourquoi aucun gérant ne bat-il durablement son indice ? Parce que l'information est déjà dans les prix : il n'y a rien à exploiter.",
    cle:{
      prem:["Aucun gérant ne bat durablement son indice.",
            "Si l'information était exploitable, un gérant battrait son indice."],
      conc:"Les prix intègrent toute l'information.",
      faible:1, type:"petition",
      defaiseur:"Dans l'extrait, la non-performance est expliquée par l'efficience et l'efficience est établie par la non-performance : chacune sert de preuve à l'autre, aucune n'est établie de l'extérieur.",
      question:"Qu'est-ce qu'on observerait dans un marché inefficient où les frais mangeraient quand même l'alpha ? En quoi ce serait différent de ce qu'on observe ?",
      note:"La bonne version de l'hypothèse d'efficience ne tourne pas en cercle : elle est testable et testée. C'est l'ARGUMENT de l'extrait qui est circulaire, pas la thèse. Distinguer les deux évite de jeter une théorie parce qu'on a entendu un mauvais plaidoyer." } },

  { id:"f-decrocheurs", src:"Conférence sur l'entrepreneuriat", dur:1, min:1,
    txt:"Gates, Jobs, Zuckerberg, Ellison : les fondateurs qui ont construit les plus grandes entreprises technologiques ont tous quitté l'université. Le diplôme n'est donc pas ce qui compte, et peut même retenir : ceux qui réussissent vraiment partent tôt.",
    cle:{
      prem:["Plusieurs fondateurs d'entreprises immenses ont quitté l'université.",
            "Ce que font ceux qui réussissent indique ce qui mène au succès."],
      conc:"Quitter ses études favorise la réussite.",
      faible:1, type:"hative",
      defaiseur:"L'échantillon est choisi par la conclusion : il faudrait le taux de réussite de TOUS ceux qui abandonnent, pas la liste de ceux qui ont réussi — le dénominateur est invisible parce que ses membres ne font pas de conférences.",
      question:"Sur cent personnes qui abandonnent leurs études pour monter une boîte, combien on retrouve dix ans après ? Où est-ce qu'on irait chercher ce chiffre ?",
      note:"Réflexe : devant toute liste d'exemples, demander « et le dénominateur ? ». C'est le même geste qu'aux échecs — ne pas calculer seulement la variante qui gagne." } },

  { id:"f-test", src:"Discussion sur un dépistage", dur:2, min:1,
    txt:"Le test est fiable à 99 % : il détecte la maladie dans 99 % des cas où elle est présente, et il ne se trompe que dans 1 % des cas où elle est absente. Mon test est revenu positif. J'ai donc 99 % de chances d'être malade.",
    cle:{
      prem:["Le test détecte 99 % des malades.",
            "Le test se trompe sur 1 % des non-malades.",
            "Mon test est positif."],
      conc:"J'ai 99 % de chances d'être malade.",
      faible:2, type:"base",
      defaiseur:"Il manque la prévalence. Sur 10 000 personnes avec une maladie touchant 1 sur 1 000 : 10 malades dont 9,9 positifs, et 9 990 sains dont 99,9 faux positifs — la probabilité d'être malade sachant le test positif est d'environ 9 %, pas 99 %.",
      question:"Sur mille personnes comme moi, combien ont la maladie avant qu'on ait testé qui que ce soit ?",
      note:"La conclusion ne découle pas des prémisses : il manque une donnée, pas une inférence. C'est le cas le plus payant à repérer, parce qu'aucune discussion sur la logique ne le fait apparaître — seul le calcul sur mille cas le fait." } },

  { id:"f-productivite", src:"Chronique économique", dur:3, min:1,
    txt:"La France affiche l'une des productivités horaires les plus élevées du monde, au-dessus des États-Unis sur certaines mesures. Le salarié français est donc individuellement plus efficace que son homologue américain : on travaille moins d'heures, mais chaque heure vaut davantage.",
    cle:{
      prem:["La productivité horaire moyenne française est très élevée.",
            "La moyenne d'un agrégat renseigne sur l'individu typique."],
      conc:"Le salarié français est individuellement plus efficace.",
      faible:1, type:"composition",
      defaiseur:"La moyenne est calculée sur ceux qui travaillent : si les emplois les moins productifs n'existent pas, la moyenne monte sans qu'aucun individu ne devienne plus efficace — un effet de composition, pas d'efficacité.",
      question:"Si on faisait entrer dans l'emploi un million de personnes sur des postes peu productifs, la moyenne baisserait. Est-ce que quelqu'un serait devenu moins efficace ?",
      note:"Même geste que pour la volatilité : un agrégat n'est pas une personne. Chercher systématiquement QUI est dans le dénominateur et qui n'y est pas." } },

  { id:"f-ia", src:"Débat sur le risque des systèmes d'IA", dur:3, min:1,
    txt:"Un système nettement plus compétent que nous sur presque toutes les tâches cognitives poursuivra l'objectif qu'on lui a donné, et nous ne savons pas spécifier un objectif qui reste correct dans toutes les situations : chaque spécification laisse des trous. Un tel système, déployé à grande échelle, aurait les moyens de résister à sa propre correction, puisque être corrigé l'empêche d'atteindre son objectif. Le risque est donc inacceptable tant que le problème de la spécification n'est pas résolu.",
    cle:{
      prem:["Un système très compétent poursuit l'objectif spécifié.",
            "Nous ne savons pas spécifier un objectif robuste.",
            "Un tel système résisterait à sa correction."],
      conc:"Le déploiement est inacceptable tant que la spécification n'est pas résolue.",
      faible:2, type:"cachee",
      defaiseur:"La prémisse 3 suppose que la compétence vient avec un objectif unique, stable et défendu dans le temps ; il faut montrer que c'est le cas, et non une propriété qu'on prête au système parce qu'on l'imagine comme un agent.",
      question:"Qu'est-ce qui, précisément, empêcherait une correction entre deux versions ? À quel moment le système cesserait-il d'être modifiable ?",
      note:"Position prise dans sa meilleure version : les prémisses 1 et 2 sont sérieuses et largement accordées. Viser la plus faible, c'est viser la 3 — et le faire sans ridiculiser les deux premières, sinon l'interlocuteur se ferme." } },

  { id:"f-mcdo", src:"Essai sur le commerce et la paix", dur:1, min:1,
    txt:"On n'a jamais vu deux pays comptant chacun un McDonald's se faire la guerre. Le commerce et l'interdépendance économique rendent donc la guerre trop coûteuse pour être menée : ouvrir les échanges, c'est acheter la paix.",
    cle:{
      prem:["Les pays très intégrés au commerce mondial se font rarement la guerre.",
            "Cette association s'explique par le coût que le commerce fait peser sur la guerre."],
      conc:"Développer le commerce produit la paix.",
      faible:1, type:"correlation",
      defaiseur:"Un troisième facteur produit les deux : un pays stable, riche et allié s'ouvre au commerce ET fait moins la guerre ; et le sens inverse est aussi plausible — la paix permet le commerce plus qu'elle n'en découle.",
      question:"Si le commerce causait la paix, qu'est-ce qu'on devrait voir juste après une ouverture commerciale entre deux pays hostiles ? Est-ce qu'on le voit ?",
      note:"Deux coups, toujours les mêmes : un facteur commun, puis l'inversion du sens. Si l'un des deux tient, la prémisse causale tombe sans qu'on ait à nier la corrélation." } },

  { id:"f-complement", src:"Publicité pour un complément alimentaire", dur:1, min:1,
    txt:"Aucune étude n'a jamais démontré que notre formule était sans effet. Des milliers d'utilisateurs rapportent une amélioration. Dans le doute, et puisque le produit est sans danger, il n'y a aucune raison de ne pas essayer.",
    cle:{
      prem:["Aucune étude ne montre l'absence d'effet.",
            "Des utilisateurs rapportent une amélioration.",
            "En l'absence de preuve contraire, essayer est rationnel."],
      conc:"Il faut essayer le produit.",
      faible:0, type:"charge",
      defaiseur:"L'absence de preuve d'inefficacité n'est pas une preuve d'efficacité : c'est à celui qui affirme l'effet de le montrer, et la prémisse décrit en réalité un produit jamais testé.",
      question:"Qu'est-ce qu'on observerait si le produit ne faisait rien du tout ? En quoi ce serait différent de ce que tu me décris ?",
      note:"La question est la meilleure arme contre la charge renversée : elle ne traite personne de menteur et rend l'absence de thèse visible par celui qui parle." } },

  { id:"f-science-sociale", src:"Séminaire d'épistémologie", dur:3, min:1,
    txt:"La science est une pratique sociale : les questions qu'elle pose, les financements qu'elle obtient, les objets qu'elle juge dignes d'étude dépendent d'un contexte historique et d'intérêts. C'est documenté, et personne de sérieux ne le nie. Il faut donc arrêter de traiter les résultats scientifiques comme un savoir d'une autre nature que les autres récits qu'une société se raconte.",
    cle:{
      prem:["Le choix des questions et des objets de la science dépend du contexte social.",
            "Ce qui dépend du contexte social n'a pas de statut épistémique particulier."],
      conc:"Les résultats scientifiques ne valent pas plus que d'autres récits.",
      faible:1, type:"motte",
      defaiseur:"Deux thèses sont confondues : la modeste, que le choix des questions est social, et la forte, que les réponses ne se départagent pas. La première est vraie et n'implique pas la seconde — ce qui départage les réponses, c'est la procédure, pas l'origine de la question.",
      question:"Tu défends laquelle des deux : que le choix des questions est social, ou que les réponses ne se départagent pas entre elles ?",
      note:"La question de départage est l'arme exacte contre les deux thèses pour une. Posée calmement, elle oblige à choisir, et chacun des deux choix est traitable — ce qui n'était pas le cas du mélange." } },

  { id:"f-menage", src:"Débat sur la dette publique", dur:2, min:1,
    txt:"Un État, c'est comme un ménage : si vous dépensez chaque année plus que vous ne gagnez, vous finissez par ne plus pouvoir emprunter, et vos créanciers vous mettent à la porte. Un ménage endetté doit se serrer la ceinture. L'État doit donc faire la même chose.",
    cle:{
      prem:["Un ménage qui dépense durablement plus qu'il ne gagne finit insolvable.",
            "Un État est, de ce point de vue, comme un ménage."],
      conc:"L'État doit équilibrer son budget.",
      faible:1, type:"analogie",
      defaiseur:"La désanalogie porte exactement sur ce que l'argument conclut : un ménage n'émet pas la monnaie dans laquelle il s'endette, n'a pas de durée de vie indéfinie, et ses dépenses n'augmentent pas ses propres revenus futurs.",
      question:"Quelle propriété d'un ménage fait marcher ton raisonnement ? Est-ce que l'État la possède ?",
      note:"Méthode générale pour une analogie : identifier la propriété qui fait tourner l'argument, PUIS vérifier qu'elle est présente dans les deux cas. Sans cette étape, on se dispute sur l'image." } },

  { id:"f-nobel", src:"Tribune de presse", dur:1, min:1,
    txt:"Deux prix Nobel d'économie ont signé le texte. Quand des esprits de ce calibre s'accordent sur une question de politique migratoire, le débat devrait être clos pour les non-spécialistes que nous sommes.",
    cle:{
      prem:["Deux prix Nobel d'économie soutiennent la position.",
            "Leur compétence porte sur la question discutée."],
      conc:"La position doit être acceptée.",
      faible:1, type:"autorite",
      defaiseur:"Un Nobel d'économie peut porter sur l'économétrie des séries temporelles : la compétence est réelle sans couvrir la question posée, et la plupart des positions de politique migratoire mêlent du factuel et des choix de valeurs sur lesquels aucune expertise ne tranche.",
      question:"Sur quelle partie de la question leur expertise porte-t-elle — l'effet mesuré, ou ce qu'il faut en faire ?",
      note:"Ne pas tomber dans l'excès inverse : l'avis d'un expert dans son domaine est une bonne raison. La faille est le décalage entre le domaine et la question, pas l'appel à l'expertise." } },

  { id:"f-candidatures", src:"Ce que tu te dis à toi-même", dur:2, min:1,
    txt:"J'ai envoyé une trentaine de candidatures et je n'ai obtenu que trois entretiens. Si mon CV était bon, j'en aurais plus. Mon CV est donc mauvais et il faut le refaire entièrement avant de continuer à envoyer.",
    cle:{
      prem:["Trois entretiens pour une trentaine de candidatures.",
            "Un bon CV produirait un meilleur taux.",
            "Le taux observé est inférieur à ce qu'un bon CV produirait."],
      conc:"Le CV est mauvais et doit être refait avant toute nouvelle candidature.",
      faible:2, type:"base",
      defaiseur:"Aucun taux de référence n'est donné : sans comparaison — ton propre taux sur une autre période, ou celui de camarades sur les mêmes postes — le chiffre ne distingue pas un CV faible d'un ciblage large ou d'un marché serré.",
      question:"À quel taux tu comparerais le tien ? Et si c'était le ciblage plutôt que le CV, qu'est-ce qu'on verrait de différent ?",
      note:"Celui-ci est le plus utile des vingt-quatre. La conclusion « refaire avant de continuer » a un coût immédiat : elle arrête les envois. Une conclusion qui t'autorise à t'arrêter mérite deux fois plus de méfiance qu'une autre." } },

  { id:"f-taxe", src:"Plateau télévisé", dur:1, min:1,
    txt:"Soit on taxe le capital, soit on accepte que les inégalités de patrimoine continuent de se creuser. Les inégalités de patrimoine sont intenables à terme. Il faut donc taxer le capital.",
    cle:{
      prem:["Ou bien on taxe le capital, ou bien les inégalités de patrimoine se creusent.",
            "Les inégalités de patrimoine sont intenables."],
      conc:"Il faut taxer le capital.",
      faible:0, type:"dilemme",
      defaiseur:"La première prémisse omet tout ce qui agit sur l'accumulation sans taxer le stock : la fiscalité des successions, l'accès au logement, la diffusion de la détention d'actifs — et elle laisse « taxer le capital » si vague qu'elle couvre des politiques opposées.",
      question:"Est-ce qu'il y a un troisième levier qui réduirait l'écart sans taxer le stock ? Si oui, pourquoi le dilemme ?",
      note:"Deux failles pour le prix d'une : le dilemme, et un terme non défini qui recouvre dix mesures différentes. Demander la définition avant de discuter du fond fait souvent tomber l'argument tout seul." } },

  { id:"f-carbone", src:"Débat sur la taxe carbone", dur:2, min:1,
    txt:"Ceux qui défendent une taxe carbone veulent en réalité que les gens modestes ne puissent plus se chauffer ni prendre leur voiture pour aller travailler. C'est une écologie de centre-ville, qui fait payer le prix de ses convictions à ceux qui n'ont pas le choix. On ne peut pas soutenir ça.",
    cle:{
      prem:["La taxe carbone renchérit le chauffage et le carburant.",
            "Ses défenseurs visent ce renchérissement pour lui-même, sans compensation.",
            "Une politique qui fait payer les plus contraints est inacceptable."],
      conc:"Il ne faut pas soutenir la taxe carbone.",
      faible:1, type:"paille",
      defaiseur:"La version sérieuse de la proposition est une taxe redistribuée — dividende carbone ou baisse d'un autre prélèvement — dont l'effet net sur les premiers déciles peut être positif ; l'argument ne touche que la version non compensée.",
      question:"Si la recette était intégralement redistribuée par tête, est-ce que ton objection tomberait ? Si non, qu'est-ce qui resterait ?",
      note:"La prémisse 3 est forte et il faut l'accorder : c'est en l'accordant qu'on rend l'objection traitable. Un bon intervieweur concède tout ce qui peut l'être, pour isoler le seul point en litige." } },
  { id:"f-determinisme", src:"Débat sur le libre arbitre", dur:3, min:1,
    txt:"Admettons même que le déterminisme soit cohérent. S'il est vrai, personne ne mérite jamais rien : ni blâme, ni éloge, ni punition, puisque personne n'aurait pu agir autrement. Une société qui croirait cela pour de bon s'effondrerait — plus de justice, plus de responsabilité, plus aucune raison de faire un effort. Nous ne pouvons pas vivre avec cette idée. Donc elle est fausse.",
    cle:{
      prem:["Si le déterminisme est vrai, personne ne mérite ni blâme ni éloge.",
            "Une société qui croirait cela s'effondrerait.",
            "Ce qu'on ne peut pas vivre est faux."],
      conc:"Le déterminisme est faux.",
      faible:2, type:"consequences",
      defaiseur:"Le coût de croire une chose ne touche pas à sa vérité : au mieux la prémisse 2 donne une raison de ne pas la diffuser, pas une raison de la juger fausse.",
      question:"Admettons que ce soit invivable. Qu'est-ce qui, dans le fait que ce soit invivable, rend la chose fausse ?",
      note:"À comparer avec l'objection à l'utilitarisme : là, l'appel à l'intuition était légitime, parce qu'en morale les intuitions fortes comptent comme données. Ici la thèse visée est métaphysique, et l'inconfort n'y est pas une donnée. Même forme, deux statuts : c'est ce couple qui apprend la différence.\n\nLa prémisse 1 est elle aussi attaquable — le compatibilisme, Frankfurt ou Dennett, tient que la responsabilité n'exige pas l'indéterminisme — mais l'extrait demande de l'accorder, et une attaque reste plus forte quand elle accepte le terrain." } }
];

/* Des amorces, pas des formules à réciter : elles servent à sortir du réflexe
   « j'attends qu'il finisse pour placer mon objection ». */
window.FAILLE_RELANCES = [
  { q:"Qu'est-ce qui te ferait changer d'avis ?", pq:"Si rien ne peut y répondre, la thèse n'est pas une thèse — et c'est lui qui le découvre, pas toi qui le lui annonces." },
  { q:"Si je te suis, ça donne ceci… c'est bien ce que tu dis ?", pq:"La reformulation est l'outil numéro un : elle montre que tu écoutes, et elle rend la prémisse cachée audible pour lui." },
  { q:"Tu défends la version forte ou la version modeste ?", pq:"Oblige à choisir avant la discussion, donc empêche le repli d'une thèse sur l'autre en cours de route." },
  { q:"Qu'est-ce que tu accordes à l'autre camp ?", pq:"Mesure s'il pense ou s'il récite. Et désarme : on ne se défend plus contre quelqu'un qui demande ça." },
  { q:"Dans la meilleure version de la position adverse, à quoi ça ressemble ?", pq:"S'il n'en a pas, l'échange est terminé sans que tu aies eu à le dire." },
  { q:"Qu'est-ce qui, dans tes propres termes, compterait comme contre-exemple ?", pq:"Fait écrire le critère de réfutation par celui qui affirme : tu n'as plus à le lui imposer." },
  { q:"Est-ce que c'est un désaccord sur les faits ou sur ce qu'il faut en faire ?", pq:"La moitié des débats interminables mélangent les deux. Séparer les met d'accord sur une moitié." },
  { q:"D'où tu tiens ce chiffre ?", pq:"Posé sans agressivité, et à soi-même aussi. Un chiffre sans source est un ornement." },
  { q:"Et si je te disais le contraire, qu'est-ce que tu me répondrais ?", pq:"Fait produire l'objection par l'interlocuteur. C'est le coup le plus économique du métier." },
  { q:"Pourquoi tu y crois, toi, personnellement ?", pq:"Déplace du camp au parcours. On répond presque toujours, et la vraie prémisse apparaît." }
];
