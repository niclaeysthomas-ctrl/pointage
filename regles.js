/* ═══════════════════════════════════════════════════════════════════
   ✍️ LES RÈGLES — ta grammaire, carte par carte
   Même deck que LES MOTS, même répétition espacée. Chaque carte tient
   en une règle : l'énoncé, le truc pour ne plus se tromper, des exemples.
   Source : tes notes du 14/11/2026 (style Projet Voltaire).
   Pour en ajouter une : copie un bloc, donne-lui un id unique.
   ═══════════════════════════════════════════════════════════════════ */
window.REGLES = [

/* ─────────────── LE PARTICIPE PASSÉ ─────────────── */

{id:"pp-avoir-base", type:"regle", mot:"Participe passé avec « avoir »", nat:"accord", reg:"fondamental",
 def:"Avec l'auxiliaire <b>avoir</b>, le participe passé ne s'accorde <b>jamais</b> avec le sujet.",
 hist:"C'est la première erreur à éliminer, parce qu'elle est contre-intuitive : l'oreille veut accorder avec celui qui agit. Non. Le sujet n'a aucun droit sur le participe quand l'auxiliaire est « avoir ». Retiens la phrase témoin : <b>elle a dit la vérité</b> — jamais « elle a ditE ».",
 ex:"J'ai signé (homme ou femme). · Elle a signé. · Elles ont signé. · Ils ont signé."},

{id:"pp-cod-avant", type:"regle", mot:"Le COD placé avant", nat:"accord", reg:"fondamental",
 def:"Avec « avoir », le participe s'accorde en genre et en nombre avec le <b>complément d'objet direct</b> — mais <b>uniquement si ce COD est placé avant le verbe</b>.",
 hist:"La méthode, en une question : prononce le sujet et le verbe seuls, puis demande <b>« quoi ? »</b> ou <b>« qui ? »</b>. La réponse est le COD. Ensuite, regarde où il est.<br><br>On raconte que les moines copistes accordaient quand ils voyaient déjà le complément sur la ligne, et ne s'en souciaient pas quand il restait à écrire. Par paresse, peut-être — mais la règle n'a pas d'autre logique, alors autant garder l'image.",
 ex:"<b>1.</b> Elle a signé les documents. → « signé QUOI ? » les documents, <i>après</i> → pas d'accord.<br><b>2.</b> Les documents, elle <b>les</b> a signé<b>s</b>. → le COD « les » est <i>avant</i> → accord.<br><b>3.</b> Les documents <b>qu'</b>elle a signé<b>s</b> sont là. → « que » = les documents, <i>avant</i> → accord."},

{id:"pp-coi", type:"regle", mot:"Le COI ne fait jamais accorder", nat:"accord", reg:"fondamental",
 def:"Si la question est « à qui ? », « à quoi ? », « de qui ? », « de quoi ? », c'est un <b>COI</b> : pas d'accord, quelle que soit sa place.",
 hist:"Le piège est que le COI se place avant aussi souvent que le COD — « il leur a parlé », « ses collègues à qui il a parlé ». La seule chose qui compte est la préposition dans la question. Pas de « à » ni de « de » → COD. Avec « à » ou « de » → COI, et tu laisses le participe tranquille.",
 ex:"Il a parlé à ses collègues → Il <b>leur</b> a parl<b>é</b> (« parlé À QUI ? »).<br>Ses collègues <b>à qui</b> il a parl<b>é</b>.<br>Et note bien : « leur » sans « s », puisqu'on peut dire « lui »."},

{id:"pp-etre-passif", type:"regle", mot:"Participe passé et voix passive", nat:"accord", reg:"courant",
 def:"À la voix passive, l'auxiliaire est <b>être</b> (même derrière « a été ») : le participe s'accorde avec le sujet.",
 hist:"C'est là que beaucoup trébuchent : ils voient « a été » et croient à l'auxiliaire avoir. Non — « a été organisée », c'est l'auxiliaire <b>être</b> au passé composé. Le sujet subit l'action, donc il commande l'accord.",
 ex:"Elle a été organis<b>ée</b>. · Elles avaient été avert<b>ies</b>.<br>Ces réunions ont été organis<b>ées</b> par les habitants du quartier."},

{id:"pp-fait-infinitif", type:"regle", mot:"« fait » suivi d'un infinitif", nat:"accord", reg:"courant",
 def:"Quand « fait » est suivi d'un verbe à l'infinitif, il est <b>invariable</b>.",
 hist:"Depuis 1990 la règle est fixe et sans exception, ce qui en fait une des rares du participe passé qu'on peut appliquer les yeux fermés. L'idée : « fait » et l'infinitif forment un seul bloc verbal, on n'accorde pas le milieu d'un bloc.",
 ex:"Elle s'est <b>fait</b> faire des mèches. · Ils se sont <b>fait</b> avoir. · La maison qu'il a <b>fait</b> construire."},

{id:"pp-eer", type:"regle", mot:"Les verbes en « -éer » : créé, créée", nat:"orthographe", reg:"courant",
 def:"Le participe passé de <b>créer</b> est <b>créé</b> — et au féminin <b>créée</b>, avec deux e après l'accent.",
 hist:"L'infinitif se termine déjà par « -éer » : le radical garde son é, et le participe ajoute son propre e. D'où cette suite d'e qui paraît fautive et ne l'est pas. Même chose pour <b>agréer</b> (agréé, agréée) et <b>suppléer</b> (suppléé, suppléée).",
 ex:"Cette bague a été <b>créée</b> à Florence. · Une société <b>agréée</b>. · Les heures <b>suppléées</b>."},

{id:"pp-du-due", type:"regle", mot:"dû, due, dus, dues", nat:"accent", reg:"courant",
 def:"L'accent circonflexe ne sert qu'au <b>masculin singulier</b>, pour distinguer « dû » de l'article « du ». Au féminin et au pluriel, plus d'ambiguïté : plus d'accent.",
 hist:"L'accent est un simple panneau de signalisation, pas une marque du verbe. « Du pain » et « son dû » se prononcent pareil, il fallait les séparer à l'œil. « Due » et « dus » ne risquent aucune confusion, donc on retire le panneau.",
 ex:"Réclamer son <b>dû</b>. · Elle a <b>dû</b> partir.<br>La somme <b>due</b>, les frais <b>dus</b>, les pièces <b>dues</b>."},

{id:"pp-inclus-conclu", type:"regle", mot:"inclus mais conclu, exclu", nat:"orthographe", reg:"courant",
 def:"<b>Inclus</b> et <b>exclus</b> (au sens de « compris / non compris ») prennent un s au masculin singulier. Mais le participe passé de <b>conclure</b> est <b>conclu</b>, sans s.",
 hist:"Trois verbes voisins, trois participes différents : <i>inclure</i> → inclus, <i>exclure</i> → exclu, <i>conclure</i> → conclu. Seul « inclus » garde le s latin. Le féminin te le confirme à l'oreille : incluse (s qui s'entend), conclue (rien).",
 ex:"Les frais <b>inclus</b>, charges <b>incluses</b>.<br>Marché <b>conclu</b>. · C'est tout à fait <b>exclu</b>."},

/* ─────────────── CONJUGAISON ─────────────── */

{id:"futur-conditionnel", type:"regle", mot:"Futur ou conditionnel à « je » ?", nat:"conjugaison", reg:"fondamental",
 def:"Remplace « je » par « nous » et écoute la fin du verbe. <b>-ons</b> → futur, pas de s. <b>-ions</b> → conditionnel, un s.",
 hist:"C'est le test le plus rentable de toute la grammaire française : il règle en une seconde une faute qui se voit immédiatement à l'écrit. Prononce la phrase entière, pas seulement le verbe, sinon l'oreille se trompe.",
 ex:"Demain, je viendr<b>ai</b> à vélo → nous viendr<b>ons</b> (futur, pas de s).<br>J'aimer<b>ais</b> être en vacances → nous aimer<b>ions</b> (conditionnel, un s)."},

{id:"si-rais", type:"regle", mot:"Les « si » n'aiment pas les « rais »", nat:"conjugaison", reg:"fondamental",
 def:"Jamais de conditionnel juste après « si ». Après « si », on met le présent ou l'imparfait.",
 hist:"Le moyen mnémotechnique est connu et il suffit : <b>les si n'aiment pas les rais</b>. « Si j'aurais su » est la faute la plus repérable du français.",
 ex:"SI + présent → futur : <b>S'il fait beau, j'irai</b> au marché.<br>SI + imparfait → conditionnel : <b>S'il faisait beau, j'irais</b> au marché.<br>SI + plus-que-parfait → conditionnel passé : <b>Si j'avais su, je n'aurais pas</b> fait cette erreur."},

{id:"erai-erais", type:"regle", mot:"Le « e » de l'infinitif au futur", nat:"conjugaison", reg:"courant",
 def:"Les verbes du 1<sup>er</sup> groupe gardent le <b>e</b> de l'infinitif avant le r, à toutes les personnes du futur et du conditionnel.",
 hist:"Si l'infinitif a un e, le futur l'a aussi : vérifi<b>e</b>r → je vérifi<b>e</b>rai. Et inversement : <b>conclure</b>, <b>exclure</b>, <b>inclure</b> sont du 3<sup>e</sup> groupe, il n'y a pas de e à l'infinitif, donc jamais de e au futur — « concluer » n'existe pas.",
 ex:"Je vérifierai, nous vérifierions. · Je conclurai, nous conclurions.<br><b>Exceptions :</b> envoyer et renvoyer sont irréguliers (j'<b>enverrai</b>). Cueillir, accueillir et recueillir sont du 3<sup>e</sup> groupe mais se conjuguent comme le 1<sup>er</sup> (je <b>cueillerai</b>)."},

{id:"imperatif-s", type:"regle", mot:"L'impératif et le s devant en / y", nat:"conjugaison", reg:"courant",
 def:"À l'impératif, les verbes du 1<sup>er</sup> groupe (et « aller ») ne prennent pas de s : <i>Ouvre la porte !</i> Mais ils en reprennent un devant <b>en</b> ou <b>y</b>.",
 hist:"Le s n'est là que pour la liaison : « vas-y » se prononce [va-zi]. Donc il ne revient que si « en » et « y » sont bien des pronoms. Si « en » est une préposition — suivie d'un nom ou d'un participe présent — pas de liaison, pas de s.",
 ex:"Laisse<b>s</b>-en un peu ! · Va<b>s</b>-y !<br>Mais : Mange <b>en silence</b> ! · Mange <b>en fermant</b> la bouche !"},

{id:"tu-s", type:"regle", mot:"Le s de la 2e personne", nat:"conjugaison", reg:"fondamental",
 def:"À l'indicatif présent, « tu » prend toujours un <b>s</b>. Trois exceptions seulement : tu <b>peux</b>, tu <b>veux</b>, tu <b>vaux</b>.",
 hist:"Ces trois-là viennent de verbes latins dont le radical se terminait déjà par un son dur ; le x médiéval y a remplacé un « us » abrégé. Ils vont par trois et se retiennent ensemble — avec leur troisième personne en t : il peut, il veut, il vaut.",
 ex:"Tu manges, tu finis, tu comprends.<br>Mais : je peux / tu peux / il peut · je vaux / tu vaux / il vaut."},

{id:"endre-d", type:"regle", mot:"Les verbes en -endre gardent leur d", nat:"conjugaison", reg:"courant",
 def:"Les verbes en <b>-endre, -ondre, -andre, -erdre</b> prennent un <b>d</b> à la 3<sup>e</sup> personne du singulier au présent, pas un t.",
 hist:"Le d appartient au radical, il ne disparaît pas. La terminaison du 3<sup>e</sup> groupe est bien « -s, -s, -t », mais quand le radical finit déjà par d, le t ne s'ajoute pas. Même raison pour laquelle on n'écrit pas de « -t- » euphonique après un d : <i>vend-il ?</i>",
 ex:"Il ven<b>d</b> sa voiture. · Elle répon<b>d</b> à la question. · Il per<b>d</b> ses moyens. · Il répan<b>d</b> la nouvelle."},

{id:"present-groupes", type:"regle", mot:"Les trois séries du présent", nat:"conjugaison", reg:"fondamental",
 def:"Trois terminaisons à connaître par cœur, selon le groupe.",
 hist:"Les reconnaître évite la moitié des fautes de présent. La difficulté n'est presque jamais la terminaison elle-même, c'est d'identifier le groupe — en cas de doute, regarde le « nous ».",
 ex:"1<sup>er</sup> groupe : <b>e, es, e, ons, ez, ent</b> → je mange.<br>2<sup>e</sup> groupe : <b>is, is, it, issons, issez, issent</b> → je finis.<br>3<sup>e</sup> groupe : <b>s, s, t, ons, ez, ent</b> → je comprends."},

{id:"qui-antecedent", type:"regle", mot:"« C'est moi qui… » + quelle personne ?", nat:"conjugaison", reg:"courant",
 def:"Le verbe qui suit « qui » se conjugue à la personne de l'<b>antécédent</b>, c'est-à-dire du mot que « qui » reprend.",
 hist:"« Qui » n'est pas une troisième personne : c'est un relais. Il transmet au verbe la personne de ce qu'il remplace. L'erreur « c'est moi qui a fait » vient de ce qu'on entend « qui » comme « il ».",
 ex:"C'est <b>moi</b> qui sign<b>e</b> le contrat.<br>C'est <b>toi</b> qui sign<b>es</b> le contrat.<br>C'est <b>nous</b> qui sign<b>ons</b> le contrat."},

{id:"appeler", type:"regle", mot:"appeler : deux p, et un ou deux l", nat:"conjugaison", reg:"courant",
 def:"<b>Appeler</b> et <b>rappeler</b> ont toujours deux p, et un seul l à l'infinitif. En conjuguant : <b>deux l quand on entend « è »</b>, un seul l quand on entend « eu ».",
 hist:"Le doublement du l n'a qu'un rôle : signaler que le e précédent se prononce « è », comme dans « pelle ». Si le e est muet ou sourd, un seul l suffit. La règle s'entend donc avant de s'écrire.",
 ex:"Il faut que tu le rappe<b>ll</b>es. · Il les appe<b>ll</b>era demain. (son « è »)<br>J'ai déjà appe<b>l</b>é. · Nous nous appe<b>l</b>ons souvent. (son « eu »)<br><b>Et :</b> on se rappelle <b>quelque chose</b>, pas « de » quelque chose. « Ce nom, je me <b>le</b> rappelle » — mais « je m'<b>en</b> souviens »."},

{id:"aie-aies", type:"regle", mot:"aie ou aies ?", nat:"conjugaison", reg:"courant",
 def:"<b>Aie</b> sans s = impératif d'avoir. <b>Aies</b> avec s = subjonctif présent, après « que ».",
 hist:"La présence de « que » tranche à chaque fois. Sans « que », tu donnes un ordre, c'est l'impératif et le s tombe comme pour « ouvre ».",
 ex:"<b>Aie</b> le courage de tes opinions.<br>Il faut que tu <b>aies</b> confiance."},

{id:"dites", type:"regle", mot:"dites, sans accent", nat:"accent", reg:"courant",
 def:"Au présent de l'indicatif et de l'impératif, <b>dites</b> ne prend jamais d'accent circonflexe.",
 hist:"« Dîtes » existe, mais c'est le passé simple, deuxième personne du pluriel — un temps devenu littéraire. Si tu parles d'aujourd'hui ou si tu donnes un ordre, pas d'accent.",
 ex:"Vous <b>dites</b> maintenant qu'il n'y a pas de problème.<br><b>Dites</b> la vérité !<br>(Autrefois, vous nous <b>dîtes</b> un secret — passé simple.)"},

/* ─────────────── HOMOPHONES ─────────────── */

{id:"leur-leurs", type:"regle", mot:"leur ou leurs ?", nat:"homophone", reg:"fondamental",
 def:"Si tu peux le remplacer par <b>lui</b> en mettant la phrase au singulier, c'est le pronom : <b>jamais de s</b>. Sinon c'est un déterminant possessif, et il s'accorde.",
 hist:"Le pronom « leur » est le pluriel de « lui » — et « lui » ne prend pas de s, donc « leur » non plus. Le possessif, lui, suit le nom qu'il accompagne.",
 ex:"Je <b>leur</b> parle → je <b>lui</b> parle. Pas de s.<br><b>Leur</b> chat, <b>leurs</b> jouets. · Notre voiture est ici, <b>la leur</b> est là-bas."},

{id:"notre-notre", type:"regle", mot:"notre ou nôtre ?", nat:"homophone", reg:"courant",
 def:"<b>Notre</b> et <b>votre</b>, sans accent, devant un nom. <b>Nôtre</b> et <b>vôtre</b>, avec accent circonflexe, quand ils sont employés seuls.",
 hist:"L'accent signale que le mot se suffit à lui-même : il remplace un nom au lieu de l'accompagner. Il s'entend aussi — le ô est fermé.",
 ex:"C'est <b>notre</b> voisin. · Il s'agit du <b>vôtre</b>.<br>Ma portière est bien fermée, et <b>la vôtre</b> ?"},

{id:"tout-tous", type:"regle", mot:"tout ou tous ?", nat:"homophone", reg:"courant",
 def:"<b>Tout</b> + nom masculin singulier. <b>Tous</b> + nom masculin pluriel.",
 hist:"Le piège est que le s de « tous » ne s'entend pas devant une consonne. Fie-toi au nom qui suit, jamais à l'oreille.",
 ex:"<b>Tout</b> le temps, <b>tout</b> le travail.<br><b>Tous</b> les jours, <b>tous</b> les ans."},

{id:"ni-ny", type:"regle", mot:"ni ou n'y ?", nat:"homophone", reg:"courant",
 def:"<b>Ni</b> est une conjonction de coordination. <b>N'y</b> est la contraction de « ne » et « y », et il est <b>toujours suivi d'un verbe</b>.",
 hist:"Le test est mécanique : si tu peux déplier en « ne… y », c'est n'y. S'il n'y a pas de négation à compléter, c'est ni.",
 ex:"Il n'aime <b>ni</b> le café <b>ni</b> le thé.<br>Le siège social est à Barcelone, mais elle <b>n'y</b> est pas encore allée."},

{id:"ou-ou", type:"regle", mot:"ou ou où ?", nat:"homophone", reg:"fondamental",
 def:"<b>Ou</b> sans accent = « ou bien ». <b>Où</b> avec accent = le lieu ou le moment.",
 hist:"Un seul test, imparable : remplace par « ou bien ». Si la phrase tient, pas d'accent.",
 ex:"Nous irons les voir samedi <b>ou</b> dimanche (ou bien).<br>La maison <b>où</b> j'ai vécu."},

{id:"quand-quant", type:"regle", mot:"quand, quant, qu'en", nat:"homophone", reg:"courant",
 def:"<b>Quand</b> = lorsque. <b>Quant à / aux</b> = pour ce qui est de. <b>Qu'en</b> = que… en.",
 hist:"« Quant » ne s'emploie jamais seul : il est toujours collé à « à », « au » ou « aux ». Si tu n'as pas de « à » derrière, ce n'est pas lui.",
 ex:"<b>Quand</b> il arrivera, préviens-moi (lorsque).<br><b>Quant à</b> moi, je reste (pour ce qui est de).<br><b>Qu'en</b> penses-tu ?"},

{id:"parce-que", type:"regle", mot:"parce que ou par ce que ?", nat:"homophone", reg:"courant",
 def:"<b>Parce que</b> répond à « pourquoi ? ». <b>Par ce que</b>, en trois mots, répond à « par quoi ? ».",
 hist:"La question posée tranche sans ambiguïté. « Par ce que » est rare et se reconnaît à ce qu'on pourrait dire « par cela que ».",
 ex:"Il est en retard <b>parce que</b> le train a du retard. (Pourquoi ?)<br>Il est surpris <b>par ce que</b> son collègue lui a dit. (Par quoi ?)"},

{id:"cense-sense", type:"regle", mot:"censé ou sensé ?", nat:"homophone", reg:"courant",
 def:"<b>Censé</b> = supposé, réputé. <b>Sensé</b> = qui a du bon sens.",
 hist:"« Sensé » contient « sens », au sens propre. « Censé » vient du latin <i>censere</i>, estimer — le même ancêtre que « recensement » et « censure ».",
 ex:"Elle est <b>censée</b> le faire (supposée).<br>Ses paroles me semblent <b>sensées</b> (pleines de bon sens)."},

{id:"differend", type:"regle", mot:"différend ou différent ?", nat:"homophone", reg:"courant",
 def:"Si tu peux remplacer par <b>désaccord</b>, c'est le nom <b>différend</b>, avec un d. Sinon c'est l'adjectif <b>différent</b>, avec un t.",
 hist:"Le nom finit comme « désaccord » — tous deux en d. Et il existe une troisième forme, plus rare : <b>différant</b>, le participe présent de « différer » au sens de retarder.",
 ex:"Il a eu un <b>différend</b> avec ses voisins (désaccord).<br>Ils ont des caractères très <b>différents</b>.<br>En <b>différant</b> ce paiement, il a aggravé sa dette."},

{id:"tache", type:"regle", mot:"tâche ou tache ?", nat:"accent", reg:"courant",
 def:"<b>Tâche</b> avec accent = le travail à accomplir. <b>Tache</b> sans accent = la salissure.",
 hist:"L'accent se retrouve dans le verbe « tâcher de », qui veut dire s'efforcer. Même famille que « tâche », pas que « tache ».",
 ex:"Une <b>tâche</b> ingrate. · <b>Tâche</b> d'arriver à l'heure.<br>Une <b>tache</b> de café sur la chemise."},

{id:"cen-sen", type:"regle", mot:"c'en, s'en, sans", nat:"homophone", reg:"courant",
 def:"Si tu peux remplacer par <b>cela</b>, c'est <b>c'en</b>. Sinon, avec un verbe pronominal, c'est <b>s'en</b>.",
 hist:"« C'en » est la contraction de « ce » et « en » : <i>cela en devient…</i> Le test de « cela » suffit, parce que le c' vient toujours de « ce ».",
 ex:"<b>C'en</b> devient insupportable (cela en devient).<br>Je m'<b>en</b> vais, tu t'<b>en</b> vas, il s'<b>en</b> va."},

/* ─────────────── ACCORDS ─────────────── */

{id:"plupart", type:"regle", mot:"« la plupart » commande le pluriel", nat:"accord", reg:"courant",
 def:"Le verbe s'accorde avec le <b>complément</b> de « la plupart », donc presque toujours au pluriel.",
 hist:"« La plupart » est grammaticalement singulier, mais c'est le sens qui l'emporte : on parle d'une majorité d'individus. Même logique pour « beaucoup de », « peu de », « la moitié des ».",
 ex:"La plupart <b>sont</b> déjà là.<br>La plupart des vacanciers <b>sont</b> déjà partis."},

{id:"couleurs-simples", type:"regle", mot:"Les adjectifs de couleur simples", nat:"accord", reg:"courant",
 def:"En un seul mot, ils s'accordent en genre et en nombre. Mais les <b>noms employés comme couleurs</b> restent invariables.",
 hist:"La logique est qu'un nom reste un nom : « des chaussettes orange », c'est « de la couleur d'une orange ». Les exceptions admises comme vrais adjectifs sont peu nombreuses — rose, fauve, mauve, pourpre, écarlate — et celles-là s'accordent.",
 ex:"Une chemise blanch<b>e</b>, des nappes bleu<b>es</b>, des cheveux noir<b>s</b>.<br>Mais : des yeux <b>orange</b>, des dossiers <b>marron</b>.<br>(« Châtain » s'accorde au pluriel : des cheveux châtain<b>s</b>.)"},

{id:"couleurs-composees", type:"regle", mot:"Les couleurs composées sont invariables", nat:"accord", reg:"courant",
 def:"Dès qu'une couleur s'écrit en deux mots, <b>rien ne s'accorde</b>. Et si les deux mots sont eux-mêmes des couleurs, on met un trait d'union.",
 hist:"Le groupe entier fonctionne comme une seule étiquette : on ne décline pas une étiquette. C'est aussi pour ça que l'accord d'un seul des deux mots serait absurde.",
 ex:"Une robe <b>bleu foncé</b>, des étiquettes <b>bleu clair</b>.<br>Des rideaux <b>bleu ciel</b>, des chaussettes <b>vert pomme</b>.<br>De l'encre <b>bleu-noir</b>, des assiettes <b>bleu-vert</b>."},

{id:"demi", type:"regle", mot:"demi, avant ou après le nom", nat:"accord", reg:"courant",
 def:"<b>Avant</b> le nom : invariable, avec trait d'union. <b>Après</b> le nom : prend le féminin si le nom est féminin, mais <b>jamais le pluriel</b>.",
 hist:"Placé devant, « demi » fonctionne comme un préfixe : il se soude et ne bouge pas. Placé derrière, il devient un adjectif qui qualifie — mais comme il n'y a jamais plusieurs moitiés, le pluriel n'a pas de sens.",
 ex:"Une <b>demi-heure</b>, des <b>demi-sœurs</b>, des <b>demi-litres</b>.<br>Trois heures et <b>demie</b>, deux ans et <b>demi</b>.<br>Invariable aussi devant un adjectif : des boîtes <b>demi-pleines</b>, ils étaient <b>à demi</b> morts."},

{id:"meme", type:"regle", mot:"même s'accorde, sauf…", nat:"accord", reg:"courant",
 def:"<b>Même</b> s'accorde quand il précède un nom, quand il suit un pronom personnel (avec trait d'union), et quand il renforce un nom (sans trait d'union).",
 hist:"Il ne reste invariable que comme adverbe, au sens de « aussi, y compris » : <i>même les enfants ont compris</i>. Le test : si tu peux le déplacer sans changer le sens, c'est l'adverbe, et il ne bouge pas.",
 ex:"Elles ont fait les <b>mêmes</b> études.<br>Elle l'a fait elle-<b>même</b>. · Ils l'ont fait eux-<b>mêmes</b>.<br>Il est la délicatesse <b>même</b>."},

{id:"ci-joint", type:"regle", mot:"ci-joint : tout dépend de la place", nat:"accord", reg:"courant",
 def:"<b>Invariable</b> en tête de phrase, et invariable juste devant un nom sans déterminant. Il s'accorde dans les autres cas.",
 hist:"Devant, il fonctionne comme un adverbe (« voici joint »). Ailleurs, il redevient un adjectif qui qualifie le document. Et il garde toujours son t, même au masculin singulier.",
 ex:"<b>Ci-joint</b> les attestations demandées.<br>Je vous envoie <b>ci-joint</b> photocopie de mon contrat.<br>Les pièces <b>ci-jointes</b> vous intéresseront."},

{id:"invariables", type:"regle", mot:"Les invariables qu'on accorde à tort", nat:"accord", reg:"courant",
 def:"<b>Malgré</b>, <b>certes</b>, <b>debout</b>, <b>ensemble</b>, <b>soi-disant</b> ne bougent jamais.",
 hist:"« Debout » et « ensemble » sont des adverbes : par définition ils n'ont ni genre ni nombre. « Certes » porte un s d'origine qu'il ne perd jamais. « Soi-disant » veut dire « qui se dit soi-même » — et « soi » est invariable comme dans « soi-même ».",
 ex:"<b>Malgré</b> les échecs, il ne désespère pas.<br>Ils sont <b>ensemble</b>. · Elles sont <b>debout</b>.<br>Ces <b>soi-disant</b> experts.<br>(Mais le nom : un <b>ensemble</b> de bâtiments.)"},

{id:"pluriel-deux", type:"regle", mot:"Le pluriel commence à 2", nat:"accord", reg:"courant",
 def:"Tout ce qui est <b>inférieur à 2</b> reste au singulier, même avec des décimales.",
 hist:"Le français compte autrement que l'anglais, qui passe au pluriel dès qu'on quitte 1 exactement. Ici, « 1,9 » n'a pas encore atteint deux unités : le singulier tient.",
 ex:"1 kilomètre · <b>1,9 kilomètre</b> · 1,5 kilo<br>2 kilomètres · 2,1 kilomètres"},

/* ─────────────── LES NOMBRES ─────────────── */

{id:"vingt-cent", type:"regle", mot:"vingt et cent : quand le s ?", nat:"nombres", reg:"courant",
 def:"Ils prennent un s s'ils sont <b>multipliés</b> et <b>suivis d'aucun autre nombre</b>. Sinon, rien.",
 hist:"Deux conditions, toutes les deux nécessaires. « Quatre-vingts » : multiplié, rien derrière → s. « Quatre-vingt-trois » : multiplié mais suivi d'un nombre → pas de s. Et « vingt » est invariable après « cent » ou « mille ».",
 ex:"quatre-vingt<b>s</b> personnes · deux cent<b>s</b> personnes<br>quatre-vingt-trois · deux cent dix · quatre-vingt mille<br>cent vingt personnes · trois cent mille euros"},

{id:"mille-million", type:"regle", mot:"mille, million, milliard", nat:"nombres", reg:"courant",
 def:"<b>Mille</b> est toujours invariable. <b>Million</b> et <b>milliard</b> sont des noms : ils s'accordent.",
 hist:"Historiquement, « mille » était le pluriel de « mil » — il portait déjà sa marque, et n'en reçoit donc pas d'autre. « Million » et « milliard » n'ont jamais été des adjectifs numéraux : ce sont des substantifs, comme « douzaine ».",
 ex:"Il y a trois <b>mille</b> ans.<br>Deux <b>millions</b> d'euros, trois <b>milliards</b> d'habitants.<br>Et devant eux, cent et vingt reprennent leur s : deux cent<b>s</b> millions, quatre-vingt<b>s</b> milliards.<br>Mais : deux <b>cent</b> mille (pas de s devant « mille »)."},

/* ─────────────── ORTHOGRAPHE ─────────────── */

{id:"accent-e", type:"regle", mot:"Pas d'accent devant deux consonnes", nat:"accent", reg:"courant",
 def:"Le e ne prend pas d'accent quand il est suivi d'un <b>x</b> ou de <b>deux consonnes ou plus</b>.",
 hist:"La double consonne ferme déjà la syllabe : l'accent devient inutile, l'oreille entend « è » sans lui. Exception importante : si la deuxième consonne est <b>h, l ou r</b>, la syllabe se coupe autrement et l'accent revient.",
 ex:"Sans accent : e<b>x</b>act, e<b>x</b>amen, e<b>ff</b>icace, e<b>ss</b>ence, de<b>st</b>in, te<b>ch</b>nique.<br>Avec accent : é<b>cl</b>airer, é<b>ch</b>anger, é<b>cr</b>it."},

{id:"amment-emment", type:"regle", mot:"Les adverbes en -amment / -emment", nat:"orthographe", reg:"courant",
 def:"Ils ont <b>toujours deux m</b>. L'adjectif en <b>-ant</b> donne <b>-amment</b> ; l'adjectif en <b>-ent</b> donne <b>-emment</b>.",
 hist:"La terminaison reprend la voyelle de l'adjectif d'origine : méchant → méchamment, fréquent → fréquemment. Et les deux se prononcent pareil, « aman » — c'est donc l'adjectif, pas l'oreille, qui décide.",
 ex:"méch<b>ant</b> → méch<b>amment</b> · cour<b>ant</b> → cour<b>amment</b><br>fréqu<b>ent</b> → fréqu<b>emment</b> · évid<b>ent</b> → évid<b>emment</b>"},

{id:"onnel-onal", type:"regle", mot:"-onnel (2 n) et -onal (1 n)", nat:"orthographe", reg:"courant",
 def:"Les adjectifs en <b>-onnel</b> prennent toujours deux n. Ceux en <b>-onal</b> n'en prennent qu'un.",
 hist:"Deux suffixes différents, deux origines : -onnel vient de noms en -on (passion, profession), -onal vient du latin -onalis. Il n'y a pas d'exception à retenir, juste la paire à garder en tête.",
 ex:"passio<b>nn</b>el, professio<b>nn</b>el, occasio<b>nn</b>el, exceptio<b>nn</b>el<br>régio<b>n</b>al, natio<b>n</b>al, hormo<b>n</b>al"},

{id:"euil-cueil", type:"regle", mot:"-euil, mais -cueil et -gueil", nat:"orthographe", reg:"courant",
 def:"Le son [œj] s'écrit <b>-euil</b>. Mais après un <b>c</b> ou un <b>g</b>, on inverse : <b>-cueil</b>, <b>-gueil</b>.",
 hist:"C'est une question de prononciation, pas de caprice : « ceuil » se lirait [sœj], « geuil » se lirait [ʒœj]. En plaçant le u juste après la consonne, on force le son dur [k] et [g].",
 ex:"écureuil, fauteuil, treuil, deuil<br>ac<b>cueil</b>, ac<b>cueil</b>lir, <b>cueil</b>lette, é<b>cueil</b>, re<b>cueil</b>lir, or<b>gueil</b>"},

{id:"gable", type:"regle", mot:"Les adjectifs en -gable", nat:"orthographe", reg:"rare",
 def:"Les adjectifs tirés d'un verbe en <b>-guer</b> s'écrivent <b>-gable</b>, sans u.",
 hist:"Le u du verbe n'existe que pour durcir le g devant e et i. Devant un a, il ne sert plus à rien, donc il tombe. Une seule exception : <b>distinguable</b> — il fallait bien qu'un se distingue.",
 ex:"fatiguer → fati<b>gable</b> · naviguer → navi<b>gable</b> · irriguer → irri<b>gable</b><br>Mais : distin<b>guable</b>."},

{id:"cedille", type:"regle", mot:"La cédille : a, o, u", nat:"orthographe", reg:"courant",
 def:"La cédille s'emploie devant <b>a, o, u</b> pour obtenir le son [s]. Jamais devant <b>e, i, y</b>.",
 hist:"Devant e, i et y, le c se prononce déjà [s] : la cédille serait un doublon. Elle ne sert qu'à forcer le son doux là où le c serait naturellement dur.",
 ex:"fa<b>ç</b>ade, gla<b>ç</b>ons, re<b>ç</b>u, fran<b>ç</b>ais<br>cinéma, ceci, cycle — jamais de cédille."},

{id:"t-euphonique", type:"regle", mot:"Le « t » euphonique", nat:"orthographe", reg:"courant",
 def:"On intercale un <b>-t-</b> entre un verbe finissant par une voyelle et « il », « elle », « on ». Il ne correspond à aucun mot : il est là pour l'oreille.",
 hist:"D'où ses <b>deux</b> traits d'union, qui le signalent comme un intrus. Inutile après un t ou un d, puisque le d se prononce déjà [t] en liaison. À l'impératif, en revanche, ce n'est plus un t euphonique mais le pronom « toi » élidé : on écrit une <b>apostrophe</b>.",
 ex:"Quand reviendra-<b>t</b>-elle ? · Que se passe-<b>t</b>-il ?<br>Que fau<b>t</b>-il faire ? · Se ven<b>d</b>-il bien ? (rien à ajouter)<br>Va-<b>t'</b>en ! · Donne-<b>m'</b>en un peu ! (apostrophe, pas trait d'union)"},

{id:"jours-mois", type:"regle", mot:"Jours et mois en minuscules", nat:"typographie", reg:"courant",
 def:"Ce sont des <b>noms communs</b> : minuscule, et un s au pluriel.",
 hist:"L'habitude de la majuscule vient de l'anglais, qui capitalise Monday et August. Le français ne capitalise que les noms propres — et un lundi n'en est pas un.",
 ex:"Je fais du sport tous les <b>vendredis</b>.<br>Nous prenons nos vacances en <b>août</b>. Les <b>juillets</b> sont souvent agréables.<br>(Mais « les lundi et jeudi de chaque semaine » : pas de s, il n'y en a qu'un de chaque.)"},

{id:"abreviations", type:"regle", mot:"M., MM., Mme, Mlle", nat:"typographie", reg:"courant",
 def:"<b>M.</b> et <b>MM.</b> sont les seules abréviations correctes de monsieur et messieurs. <b>Mme / Mmes</b>, <b>Mlle / Mlles</b> s'écrivent sans point.",
 hist:"« Mr » et « Mrs » sont anglais : Mister et Mistress. Les voir en français est un calque. Et on n'abrège que devant un nom ou un titre : si tu t'adresses à la personne, tu écris le mot en entier.",
 ex:"<b>M.</b> Durand nous rejoindra. · <b>MM.</b> Durand et Martin nous rejoindront.<br>Je vous écoute, <b>monsieur</b>. (en toutes lettres)"},

/* ─────────────── MOTS QU'ON ÉCORCHE ─────────────── */

{id:"chiffre-affaires", type:"regle", mot:"Un chiffre d'affaires", nat:"vocabulaire", reg:"métier",
 def:"<b>Affaires</b> prend toujours un s, même au singulier : c'est le chiffre de <b>plusieurs</b> affaires.",
 hist:"La faute se voit immédiatement dans un document financier, et c'est sans doute le mot que tu écriras le plus souvent en stage. À retenir avec son cousin : <b>avoir affaire à</b> quelqu'un, celui-là au singulier.",
 ex:"Un chiffre d'<b>affaires</b> de 12 millions.<br>Le chiffre d'<b>affaires</b> consolidé.<br>Mais : j'ai eu <b>affaire</b> à son assistante."},

{id:"fond-fonds", type:"regle", mot:"le fond ou le fonds ?", nat:"vocabulaire", reg:"métier",
 def:"<b>Le fond</b> = la partie basse, ou le contenu. <b>Un fonds</b> = un capital, un bien.",
 hist:"Le s de « fonds » est étymologique : il vient du latin <i>fundus</i>, le domaine. Mot indispensable en finance — fonds de pension, fonds d'investissement, fonds de commerce — et toujours avec son s, même au singulier.",
 ex:"Le <b>fond</b> d'une piscine. · Sur le <b>fond</b>, je suis d'accord.<br>Un <b>fonds</b> de pension. · Un <b>fonds</b> de commerce."},

{id:"diagnostic", type:"regle", mot:"diagnostic ou diagnostique ?", nat:"vocabulaire", reg:"métier",
 def:"Le <b>nom</b> s'écrit sans ue : un <b>diagnostic</b>, un <b>pronostic</b>. Le <b>verbe</b> prend le ue : je diagnostique, je pronostique.",
 hist:"Même partage que « un trafic / je trafique » ou « un public / je publie ». La règle : le nom garde la forme grecque courte, le verbe reçoit la terminaison française.",
 ex:"Poser un <b>diagnostic</b>. · Je <b>diagnostique</b> une panne.<br>Un <b>pronostic</b> favorable. · Il <b>pronostique</b> une baisse."},

{id:"parti-partie", type:"regle", mot:"prendre parti, faire partie", nat:"vocabulaire", reg:"courant",
 def:"<b>Parti</b> (masculin) dans « prendre parti » et « tirer parti de ». <b>Partie</b> (féminin) dans « faire partie de » et « prendre à partie ». Les deux restent toujours au <b>singulier</b>.",
 hist:"Deux mots différents, pas deux orthographes du même. « Parti » est le choix, la décision — d'où le parti politique. « Partie » est la portion, d'où « faire partie de ».",
 ex:"Ils ne veulent pas prendre <b>parti</b>. · Elle a su tirer <b>parti</b> de cette expérience.<br>Il fait <b>partie</b> de l'équipe. · Ils ont pris leur collègue à <b>partie</b>."},

{id:"fabricant", type:"regle", mot:"fabricant, fabriquer", nat:"vocabulaire", reg:"courant",
 def:"Le <b>nom</b> s'écrit <b>fabricant</b>, avec un c. Le <b>verbe</b> s'écrit <b>fabriquer</b>, avec qu.",
 hist:"Même couple que « un fatigant / en fatiguant », « un provocant / en provoquant ». Le nom et l'adjectif prennent la forme courte ; le verbe et son participe présent gardent le qu ou le gu.",
 ex:"Un <b>fabricant</b> de meubles. · Ils <b>fabriquent</b> des meubles.<br>Même famille : un <b>communicant</b> / en <b>communiquant</b>."},

{id:"sans-t-final", type:"regle", mot:"maintien, soutien, entretien", nat:"vocabulaire", reg:"courant",
 def:"Les <b>noms</b> n'ont pas de t final : le maintien, le soutien, l'entretien.",
 hist:"Le t n'apparaît qu'au verbe conjugué : il maintien<b>t</b>, il soutien<b>t</b>, il entretien<b>t</b>. C'est la marque de la troisième personne, pas une lettre du nom.",
 ex:"Le <b>maintien</b> de l'ordre. · Un <b>entretien</b> d'embauche.<br>Mais : il <b>maintient</b> sa position."},

{id:"feminins-te", type:"regle", mot:"Les noms féminins en -té", nat:"orthographe", reg:"courant",
 def:"Ils ne prennent <b>pas</b> de e final : la beauté, l'amitié, la moitié.",
 hist:"Exceptions à connaître : <b>dictée</b>, <b>montée</b>, <b>jetée</b>, <b>portée</b>, <b>pâtée</b> — ce sont d'anciens participes passés féminins. Et les mots comme <b>butée</b> ou <b>députée</b>, formés sur un verbe ou un masculin.",
 ex:"C'est ma moiti<b>é</b>. · Une preuve d'amiti<b>é</b>. · La difficult<b>é</b>.<br>Mais : une dict<b>ée</b>, une mont<b>ée</b>, une député<b>e</b>."},

{id:"doubles-lettres", type:"regle", mot:"Les doubles qu'on oublie", nat:"orthographe", reg:"courant",
 def:"<b>Développer</b>, <b>envelopper</b>, <b>dilemme</b>, <b>en l'occurrence</b>, <b>homogénéisation</b>, <b>nécessité</b>.",
 hist:"Rien à comprendre, seulement à fixer. Garde les couples qui s'entraident : développer et envelopper ont la même fin ; nécessité et nécessaire ont un seul c et deux s ; indemne et dilemme n'ont rien en commun sauf qu'on les écorche.",
 ex:"déve<b>l</b>o<b>pp</b>er · enve<b>l</b>o<b>pp</b>er · un dile<b>mm</b>e · inde<b>mn</b>e<br>en l'o<b>cc</b>u<b>rr</b>ence · une homogénéisation · la né<b>c</b>e<b>ss</b>ité"},

{id:"cauchemar", type:"regle", mot:"Un cauchemar, sans d", nat:"orthographe", reg:"courant",
 def:"Le nom s'écrit <b>cauchemar</b>. Mais ses dérivés prennent un d : <b>cauchemarder</b>, <b>cauchemardesque</b>.",
 hist:"Le mot vient du picard <i>cauquer</i>, presser, et de <i>mare</i>, le fantôme qui s'assoit sur le dormeur — la même « mare » que dans l'anglais <i>nightmare</i>. Le d des dérivés est une addition française tardive, et il n'a jamais remonté jusqu'au nom.",
 ex:"Un <b>cauchemar</b> éveillé.<br>Une semaine <b>cauchemardesque</b>."},

{id:"exigeant", type:"regle", mot:"exigence mais exigeant", nat:"orthographe", reg:"courant",
 def:"<b>Exigence</b> sans e après le g. <b>Exigeant</b> avec un e.",
 hist:"Le e ne sert qu'à garder le son [ʒ] devant un a ou un o. Devant un e, il est déjà doux : inutile d'en ajouter un deuxième. Même logique que la cédille, avec le g au lieu du c.",
 ex:"Une <b>exigence</b> légitime. · Un client <b>exigeant</b>.<br>Même règle : nous man<b>ge</b>ons, un chan<b>ge</b>ant."},

{id:"voire", type:"regle", mot:"voire, et même", nat:"vocabulaire", reg:"courant",
 def:"<b>Voire</b> avec un e signifie « et même ». Il renforce, il n'hésite pas.",
 hist:"Du latin <i>vera</i>, « vraiment ». Rien à voir avec le verbe « voir ». Il introduit toujours un renchérissement : ce qui suit est plus fort que ce qui précède.",
 ex:"Deux fois, <b>voire</b> trois.<br>C'est difficile, <b>voire</b> impossible."},

{id:"la-la", type:"regle", mot:"Joignez-la ou joignez-là ?", nat:"accent", reg:"courant",
 def:"Si tu peux remplacer par <b>les</b>, c'est le pronom : pas d'accent.",
 hist:"« Là » avec accent désigne un lieu — il répond à « où ? ». Le pronom « la » remplace un nom féminin, et son pluriel est « les ». Le test fonctionne à tous les coups.",
 ex:"Joignez-<b>la</b> au dossier (joignez-<b>les</b> au dossier).<br>Mais : pose-le <b>là</b> (à cet endroit)."},

{id:"sens-dessus", type:"regle", mot:"sens dessus dessous", nat:"expression", reg:"courant",
 def:"L'expression s'écrit <b>sens dessus dessous</b>, sans « en » et sans trait d'union.",
 hist:"C'est une déformation de l'ancien « c'en dessus dessous » : ce qui était en dessous se retrouve au-dessus. La graphie moderne avec « sens » s'est imposée par fausse étymologie, mais elle est aujourd'hui la seule correcte.",
 ex:"Toute la région était <b>sens dessus dessous</b>.<br>Il a mis l'appartement <b>sens dessus dessous</b>."},

{id:"eh-bien", type:"regle", mot:"eh bien, pas « et bien »", nat:"expression", reg:"courant",
 def:"L'interjection s'écrit <b>eh</b>, jamais « et ».",
 hist:"« Et » est une conjonction : il relie deux éléments. Dans « eh bien », rien n'est relié — c'est un cri de surprise ou d'hésitation, de la même famille que « eh oui », « eh non », « eh là ».",
 ex:"<b>Eh bien</b>, qu'est-ce qu'on fait ?<br><b>Eh oui</b>, c'était prévisible."},

{id:"acompte", type:"regle", mot:"un acompte, un seul c", nat:"vocabulaire", reg:"métier",
 def:"<b>Acompte</b> s'écrit avec un seul c et sans accent.",
 hist:"Le mot vient de l'expression « à compte », c'est-à-dire un versement porté au compte de ce qui est dû. La soudure a fait tomber l'accent, mais le mot reste transparent une fois qu'on connaît son origine.",
 ex:"Verser un <b>acompte</b> de 30 %.<br>À ne pas confondre avec les <b>arrhes</b>, qui ne s'imputent pas de la même façon."},

{id:"instar", type:"regle", mot:"à l'instar de", nat:"expression", reg:"soutenu",
 def:"Signifie <b>« à la manière de », « comme »</b> — et non « contrairement à ».",
 hist:"Du latin <i>ad instar</i>, « à la ressemblance de ». La confusion avec un sens d'opposition est fréquente et coûte cher, parce que l'expression s'emploie surtout à l'écrit soutenu, là où elle se remarque.",
 ex:"<b>À l'instar</b> du mouton, la vache est un herbivore.<br><b>À l'instar</b> de ses concurrents, le groupe a revu ses prévisions."},

{id:"connexion", type:"regle", mot:"connexion, mais connecter", nat:"orthographe", reg:"courant",
 def:"Le nom s'écrit avec un <b>x</b> : connexion. Le verbe avec <b>ct</b> : connecter, déconnecter.",
 hist:"Le x du nom vient directement du latin <i>connexio</i> ; le verbe, lui, a été refait sur <i>connectere</i>. Même partage pour <b>réflexion</b> / <b>refléter</b> et <b>flexion</b> / <b>fléchir</b>.",
 ex:"Une <b>connexion</b> instable. · Il faut se <b>connecter</b>.<br>Une <b>réflexion</b> intéressante. · Cela <b>reflète</b> bien la situation."}

];
