/* ═══════════════════════════════════════════════════════════════════
   ✒️ LES MOTS — un mot par jour, et l'histoire derrière
   Des mots anciens ou oubliés qu'on peut encore placer sans ridicule.
   Chaque fiche porte la définition, l'histoire du mot, et un exemple.

   Pour en ajouter un : copie un bloc, donne-lui un id unique.
   type "regle" est prévu pour les règles de grammaire (même deck,
   même répétition espacée) : mot = la règle, hist = le pourquoi.
   ═══════════════════════════════════════════════════════════════════ */
window.MOTS = [

{id:"anthracite", mot:"anthracite", nat:"nom m. et adj.", reg:"courant",
 def:"Un gris très sombre, presque noir, avec un reflet froid. À l'origine, la variété de charbon la plus dure et la plus brillante.",
 hist:"Du grec <i>anthrax, anthrakos</i>, « charbon ». Le même mot a donné <b>anthracose</b>, la maladie des poumons des mineurs, et le nom savant du charbon, la maladie du bétail — les Anglais disent encore <i>anthrax</i>. Le gris d'un costume et une maladie du bétail portent donc le même ancêtre.",
 ex:"Un ciel anthracite, de ceux qui n'annoncent même pas la pluie."},

{id:"peremptoire", mot:"péremptoire", nat:"adjectif", reg:"soutenu",
 def:"Qui n'admet pas la contradiction. Se dit d'un ton, d'un argument, d'un refus.",
 hist:"Du latin <i>perimere</i>, « détruire, anéantir ». En droit romain, l'exception <i>peremptoria</i> ne discutait pas l'affaire : elle éteignait l'action. D'où la nuance exacte du mot aujourd'hui — un argument péremptoire ne convainc pas, il clôt.",
 ex:"« C'est ainsi », dit-il d'un ton péremptoire, et personne ne reprit la parole."},

{id:"lapalissade", mot:"lapalissade", nat:"nom f.", reg:"courant",
 def:"Une évidence énoncée comme une découverte.",
 hist:"Jacques II de Chabannes, seigneur de La Palice, meurt à Pavie en 1525. Ses soldats lui font une chanson : « un quart d'heure avant sa mort, il faisait encore envie ». Le vieux <i>f</i> se lisant comme un <i>s</i>, on a chanté « il était encore en vie » — et un hommage au courage d'un maréchal est devenu le nom d'une sottise.",
 ex:"Dire qu'une entreprise déficitaire perd de l'argent est une lapalissade."},

{id:"laconique", mot:"laconique", nat:"adjectif", reg:"courant",
 def:"Qui s'exprime en très peu de mots.",
 hist:"De la <b>Laconie</b>, la région de Sparte. Les Spartiates méprisaient les longs discours. Philippe II de Macédoine leur aurait écrit : « Si j'entre en Laconie, je vous détruirai. » Ils répondirent un seul mot : « Si. »",
 ex:"Sa réponse fut laconique, et d'autant plus difficile à contredire."},

{id:"sybarite", mot:"sybarite", nat:"nom et adj.", reg:"littéraire",
 def:"Qui recherche les plaisirs raffinés et le confort, jusqu'à la mollesse.",
 hist:"De <b>Sybaris</b>, colonie grecque du sud de l'Italie, détruite en 510 av. J.-C. Sa réputation de luxe était telle que les Anciens racontaient que les Sybarites bannissaient les coqs pour dormir plus tard.",
 ex:"Un sybarite qui tient le café filtre pour une violence inutile."},

{id:"ostracisme", mot:"ostracisme", nat:"nom m.", reg:"courant",
 def:"L'exclusion décidée par un groupe contre l'un des siens.",
 hist:"Du grec <i>ostrakon</i>, le tesson de poterie. À Athènes, on écrivait sur un tesson le nom du citoyen jugé trop puissant ; au-delà d'un certain nombre de voix, il partait pour dix ans. Un vote d'exil écrit sur un morceau de pot cassé.",
 ex:"L'ostracisme poli d'une équipe qui cesse simplement de vous écrire."},

{id:"sardonique", mot:"sardonique", nat:"adjectif", reg:"soutenu",
 def:"D'une ironie amère et grimaçante. Se dit surtout d'un rire ou d'un sourire.",
 hist:"Les Anciens parlaient du « rire sardonien », attribué à une plante de <b>Sardaigne</b> dont l'ingestion crispait les muscles du visage en un rictus. Le mot garde cette torsion : un rire sardonique n'est pas joyeux, il est contracté.",
 ex:"Il accueillit la promotion de son rival d'un sourire sardonique."},

{id:"atrabilaire", mot:"atrabilaire", nat:"adjectif", reg:"littéraire",
 def:"D'humeur noire, irascible et sombre.",
 hist:"Du latin <i>atra bilis</i>, « bile noire ». La médecine antique expliquait les caractères par quatre humeurs : le sang, le flegme, la bile jaune et la bile noire. Un excès de cette dernière faisait le mélancolique et le hargneux. La théorie est morte, l'adjectif a survécu — comme <b>flegmatique</b> et <b>sanguin</b>.",
 ex:"Un patron atrabilaire que tout le service apprend à éviter le lundi."},

{id:"dedale", mot:"dédale", nat:"nom m.", reg:"courant",
 def:"Un enchevêtrement de chemins, ou de raisonnements, où l'on se perd.",
 hist:"<b>Dédale</b> est l'architecte du labyrinthe de Crète, celui qui construisit la prison du Minotaure — puis s'y trouva enfermé, et s'en échappa par les airs. Le nom propre de l'ingénieur est devenu le nom commun de son piège.",
 ex:"Le dédale administratif qui sépare une idée d'une signature."},

{id:"quintessence", mot:"quintessence", nat:"nom f.", reg:"soutenu",
 def:"Ce qu'il y a de plus pur et de plus caractéristique dans une chose.",
 hist:"La « cinquième essence ». Aux quatre éléments d'Aristote — terre, eau, air, feu — s'ajoutait un cinquième, l'éther des sphères célestes, incorruptible. Les alchimistes cherchaient à l'extraire des corps par distillations répétées. D'où le sens moderne : ce qui reste quand on a tout retiré.",
 ex:"Ces trois pages sont la quintessence d'un rapport qui en faisait cent."},

{id:"sinecure", mot:"sinécure", nat:"nom f.", reg:"courant",
 def:"Un emploi bien rémunéré qui ne demande presque aucun travail.",
 hist:"Du latin <i>sine cura</i>, « sans charge d'âmes ». C'était un bénéfice ecclésiastique attaché à aucune paroisse : le revenu sans les fidèles. L'expression « ce n'est pas une sinécure » conserve le mot dans sa seule forme négative.",
 ex:"Le poste a un beau titre, mais ce n'est pas une sinécure."},

{id:"tergiverser", mot:"tergiverser", nat:"verbe", reg:"soutenu",
 def:"User de détours pour éviter de décider ou de répondre.",
 hist:"Du latin <i>tergum vertere</i>, « tourner le dos ». Le mot décrit littéralement le mouvement de celui qui se détourne plutôt que d'affronter. Il dit donc plus qu'« hésiter » : il y a de l'évitement dedans.",
 ex:"Trois réunions à tergiverser avant d'avouer que le budget n'existait pas."},

{id:"velleite", mot:"velléité", nat:"nom f.", reg:"soutenu",
 def:"Une intention faible, qui ne va jamais jusqu'à l'acte.",
 hist:"Du latin <i>velle</i>, « vouloir ». Les scolastiques distinguaient la <i>voluntas</i>, volonté qui agit, de la <i>velleitas</i>, volonté qui reste au seuil. Le mot nomme exactement cette moitié de décision.",
 ex:"Une velléité de reprise du sport, morte le mardi suivant."},

{id:"impecunieux", mot:"impécunieux", nat:"adjectif", reg:"littéraire",
 def:"Qui manque d'argent.",
 hist:"De <i>pecunia</i>, l'argent, lui-même formé sur <i>pecus</i>, le bétail : à Rome, la richesse se comptait en têtes de bêtes. Le même ancêtre a donné <b>pécuniaire</b> et <b>peculium</b>, le pécule.",
 ex:"Un étudiant impécunieux mais remarquablement bien habillé."},

{id:"truculent", mot:"truculent", nat:"adjectif", reg:"courant",
 def:"Haut en couleur, savoureux, excessif avec verve.",
 hist:"Du latin <i>trux, trucis</i> : farouche, cruel, menaçant. Au XVI<sup>e</sup> siècle, un personnage truculent était effrayant. Le mot a glissé de la terreur au pittoresque — un bel exemple de ce que les linguistes appellent l'amélioration du sens.",
 ex:"Un récit truculent, où chaque dîner tourne au pugilat."},

{id:"byzantin", mot:"byzantin", nat:"adjectif", reg:"courant",
 def:"D'une subtilité excessive et stérile. Se dit d'une discussion, d'une querelle.",
 hist:"De <b>Byzance</b>. On raconte que ses théologiens débattaient encore du sexe des anges quand les Ottomans étaient aux portes. La légende est probablement une invention postérieure, mais l'adjectif en est né et il a gardé sa charge : discuter byzantin, c'est raffiner pendant que la maison brûle.",
 ex:"Une querelle byzantine sur la police de caractères du rapport."},

{id:"candidat", mot:"candidat", nat:"nom", reg:"courant",
 def:"Celui qui postule à une fonction, à un poste.",
 hist:"Du latin <i>candidus</i>, « blanc éclatant ». À Rome, le prétendant à une magistrature se présentait en toge blanchie à la craie, signe visible de pureté d'intention. Le même mot a donné <b>candide</b> et <b>candeur</b> — le candidat et l'innocence sont cousins, ce qui ne manque pas de sel.",
 ex:"Quarante candidats, une toge blanche et beaucoup d'intentions."},

{id:"obsequieux", mot:"obséquieux", nat:"adjectif", reg:"soutenu",
 def:"Poli avec excès, jusqu'à la servilité.",
 hist:"Du latin <i>obsequium</i>, la complaisance, formé sur <i>sequi</i>, « suivre ». Le même verbe a donné <b>obsèques</b> : le cortège qui suit. L'obséquieux est celui qui suit de trop près.",
 ex:"Un accueil obséquieux, qui met mal à l'aise avant même de s'asseoir."},

{id:"desinvolte", mot:"désinvolte", nat:"adjectif", reg:"courant",
 def:"D'une aisance un peu trop libre, qui frôle le sans-gêne.",
 hist:"De l'espagnol <i>desenvuelto</i>, « déroulé, dégagé », de <i>envolver</i>, envelopper. Être désinvolte, c'est littéralement n'être pas empaqueté : sans la gêne de ce qui vous enveloppe. Le mot garde cette image d'un corps qui ne s'embarrasse de rien.",
 ex:"Il annonça son départ d'un ton si désinvolte qu'on crut à une plaisanterie."},

{id:"forcene", mot:"forcené", nat:"adjectif et nom", reg:"courant",
 def:"Qui agit avec une violence ou un acharnement hors de tout contrôle.",
 hist:"Rien à voir avec « forcer ». De l'ancien français <i>forsené</i> : <i>fors</i>, « hors de », et <i>sen</i>, le bon sens — hors du sens. Un travailleur forcené travaille littéralement hors de sa raison.",
 ex:"Un lecteur forcené : trois livres par semaine, et tous annotés."},

{id:"hagard", mot:"hagard", nat:"adjectif", reg:"courant",
 def:"Qui a l'air égaré, le regard fixe et effaré.",
 hist:"Terme de fauconnerie : le faucon <i>hagard</i> était celui capturé adulte, déjà formé à la liberté, et qu'on ne domestiquait jamais tout à fait. Son œil restait sauvage. Le mot a quitté la volerie en gardant ce regard.",
 ex:"Il sortit de l'examen hagard, incapable de dire ce qu'il avait écrit."},

{id:"rocambolesque", mot:"rocambolesque", nat:"adjectif", reg:"courant",
 def:"Rempli de péripéties invraisemblables.",
 hist:"De <b>Rocambole</b>, héros d'une série de romans-feuilletons de Ponson du Terrail, dans les années 1850-1870. Les rebondissements y étaient si outranciers que le nom du personnage est devenu un adjectif. L'auteur est oublié ; son héros est passé dans le dictionnaire.",
 ex:"Une histoire rocambolesque de valise oubliée dans un train de nuit."},

{id:"scrupule", mot:"scrupule", nat:"nom m.", reg:"courant",
 def:"L'inquiétude morale qui retient d'agir ; l'exigence minutieuse.",
 hist:"Du latin <i>scrupulus</i>, le petit caillou pointu. Celui qui entre dans la sandale et qu'on sent à chaque pas. Cicéron employait déjà l'image pour le souci moral : quelque chose de minuscule et d'impossible à ignorer.",
 ex:"Il rendit l'argent sans scrupule — ce qui était précisément le problème."},

{id:"stoique", mot:"stoïque", nat:"adjectif", reg:"courant",
 def:"Qui supporte la douleur et l'adversité sans se plaindre.",
 hist:"Du grec <i>stoa</i>, le portique. Zénon de Citium enseignait sous le <b>Portique peint</b> d'Athènes, vers 300 av. J.-C. ; ses élèves furent nommés d'après le lieu, faute d'autre nom. Toute une philosophie désignée par son adresse.",
 ex:"Stoïque devant la file d'attente, il n'a même pas regardé son téléphone."},

{id:"cynique", mot:"cynique", nat:"adjectif et nom", reg:"courant",
 def:"Qui affiche son mépris des conventions et des sentiments.",
 hist:"Du grec <i>kuon, kunos</i>, « chien ». Les disciples d'Antisthène et de Diogène vivaient délibérément comme des chiens — dehors, sans biens, sans pudeur — pour montrer l'inutilité des conventions. L'insulte est devenue le nom de l'école, puis un trait de caractère.",
 ex:"Une lecture cynique des chiffres : ils ne mentent pas, ils ont été choisis."},

{id:"pusillanime", mot:"pusillanime", nat:"adjectif", reg:"littéraire",
 def:"Qui manque de courage et d'audace ; petitement craintif.",
 hist:"Du latin <i>pusillus animus</i>, « âme petite ». Son exact contraire existe et s'emploie encore : <b>magnanime</b>, <i>magnus animus</i>, la grande âme. Les deux mots forment une paire que le français a conservée entière.",
 ex:"Un conseil d'administration pusillanime, qui reporte tout d'un trimestre."},

{id:"atermoyer", mot:"atermoyer", nat:"verbe", reg:"soutenu",
 def:"Remettre à plus tard, gagner du temps.",
 hist:"Formé sur <b>terme</b> au sens juridique : la date d'échéance d'une dette. Atermoyer, c'était obtenir du créancier le report du terme. Le vocabulaire de l'impayé est devenu celui de la procrastination.",
 ex:"On a atermoyé six mois, le prix avait doublé entre-temps."},

{id:"palimpseste", mot:"palimpseste", nat:"nom m.", reg:"littéraire",
 def:"Un manuscrit dont on a gratté le texte pour en écrire un autre — et, au figuré, tout ce qui laisse voir ses couches anciennes.",
 hist:"Du grec <i>palin</i>, « de nouveau », et <i>psên</i>, « gratter ». Le parchemin coûtait cher : on effaçait. Des textes antiques perdus ont été retrouvés sous des textes médiévaux, dont un traité d'Archimède lu sous des prières du XIII<sup>e</sup> siècle.",
 ex:"Ce quartier est un palimpseste : chaque façade cache la précédente."},

{id:"apocryphe", mot:"apocryphe", nat:"adjectif", reg:"soutenu",
 def:"Dont l'authenticité n'est pas établie ; faussement attribué.",
 hist:"Du grec <i>apokruphos</i>, « caché ». Désignait d'abord les écrits tenus à l'écart du canon religieux — non pas faux, mais réservés. Le soupçon est venu plus tard, et il est resté : une citation apocryphe est une citation qu'on prête à quelqu'un qui ne l'a jamais dite.",
 ex:"La moitié des phrases attribuées à Churchill sont apocryphes."},

{id:"outrecuidance", mot:"outrecuidance", nat:"nom f.", reg:"littéraire",
 def:"Une présomption effrontée ; le fait de se croire plus qu'on n'est.",
 hist:"D'<i>outre</i> et de l'ancien verbe <i>cuidier</i>, « croire, penser » (du latin <i>cogitare</i>). L'outrecuidant se croit au-delà de ce qu'il est. Le verbe <i>cuidier</i> a disparu du français courant, mais il survit entier dans ce mot — et dans <b>cuistre</b>, son lointain cousin.",
 ex:"Il eut l'outrecuidance de corriger le conférencier sur sa propre thèse."},

{id:"roboratif", mot:"roboratif", nat:"adjectif", reg:"rare",
 def:"Qui fortifie, qui redonne de la vigueur.",
 hist:"Du latin <i>robur</i>, le chêne — et par extension la force. Le même mot a donné <b>robuste</b> et <b>corroborer</b>, littéralement « fortifier ensemble » : une preuve corrobore une thèse comme on consolide une charpente.",
 ex:"Un café roboratif et deux heures de sommeil : le dossier était rendu."},

{id:"procrastination", mot:"procrastination", nat:"nom f.", reg:"courant",
 def:"La tendance à remettre systématiquement au lendemain.",
 hist:"Du latin <i>pro</i>, « en avant », et <i>crastinus</i>, « de demain », formé sur <i>cras</i>, demain. Le mot dit exactement l'opération : pousser la chose dans le lendemain. Sénèque en faisait déjà le reproche central de ses lettres à Lucilius.",
 ex:"La procrastination est rarement de la paresse : c'est souvent de l'évitement."}

];
