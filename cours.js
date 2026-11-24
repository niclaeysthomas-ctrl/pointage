/* ═══════════════════════════════════════════════════════════════════
   🎓 LES COURS — l'option OP34 « Stratégie et Conseil », semestre FALL
   Extrait du PlanningOP34 V19, corrige par les annonces Blackboard.
   12/11 : le cours de B. Gaven du 20/11 est reporte au 2/12, et une
   intervention Procter & Gamble est ajoutee le 3/12 en BX1D.
   16/11 (V19) : les examens sont dates — BX1A jeudi 10/12 14h-16h,
   BX1C vendredi 11/12 10h-12h. Ce n'est PAS la semaine du 14 au 18/12
   qu'annoncait la V17.
   23/11 : le cours de F. Frery du 27/11 est au campus Montparnasse,
   3 rue Armand Moisant 75015, debut 9h.
   24/11 : l'intervention de B. Collin est annulee pour l'annee et non
   reportee. A.T. Kearney reste sans nouvelle date.
   Les cours vivent ICI, pas dans l'agenda : ils ne se cochent pas et
   ne s'effacent pas, ils se consultent. L'agenda reste pour ce que
   Thomas doit faire.
   ═══════════════════════════════════════════════════════════════════ */
window.COURS_NOMS = {"BX1A": "Intelligence stratégique", "BX1B": "Pratiques du conseil en stratégie", "BX1C": "Dans la peau d'un consultant", "BX1D": "Conduite du changement", "BX1E": "Postures de consultants", "BX1D (+MS)": "Conduite du changement", "FORUM": "Forum entreprises", "EXAMENS": "Examens de spécialisation"};
window.COURS = [
{d:"2026-09-16",t:"13:30",t2:"16:30",code:"BX1E",nom:"Présentation option",info:"G. Bascle",salle:"",lieu:""},
{d:"2026-09-17",t:"09:00",t2:"12:00",code:"BX1A",nom:"L'évaluation financière",info:"F. Bancel",salle:"",lieu:""},
{d:"2026-09-17",t:"13:30",t2:"16:30",code:"BX1A",nom:"L'évaluation financière",info:"F. Bancel",salle:"",lieu:""},
{d:"2026-09-18",t:"09:00",t2:"12:00",code:"BX1A",nom:"Modélisation",info:"B. Gaven",salle:"",lieu:""},
{d:"2026-09-24",t:"09:00",t2:"12:00",code:"BX1A",nom:"Préparation aux entretiens",info:"V. Mamou · Zoom",salle:"",lieu:""},
{d:"2026-09-24",t:"13:30",t2:"16:30",code:"BX1B",nom:"O. Wyman",info:"",salle:"",lieu:""},
{d:"2026-09-25",t:"09:00",t2:"12:00",code:"BX1B",nom:"Roland Berger",info:"",salle:"",lieu:""},
{d:"2026-09-30",t:"13:30",t2:"16:30",code:"BX1A",nom:"La réflexion stratégique",info:"J. Couturier",salle:"",lieu:""},
{d:"2026-09-30",t:"17:00",t2:"20:00",code:"BX1C",nom:"(S1)",info:"Bain & Cie",salle:"",lieu:""},
{d:"2026-10-01",t:"09:00",t2:"12:00",code:"BX1D",nom:"Anticipation & intellig. du futur",info:"P. Gabilliet",salle:"",lieu:""},
{d:"2026-10-01",t:"14:00",t2:"15:00",code:"BX1B",nom:"BCG",info:"",salle:"",lieu:""},
{d:"2026-10-02",t:"09:00",t2:"12:00",code:"BX1A",nom:"L'innovation stratégique",info:"F. Fréry",salle:"",lieu:""},
{d:"2026-10-02",t:"13:30",t2:"16:30",code:"BX1A",nom:"L'innovation stratégique",info:"F. Fréry",salle:"",lieu:""},
{d:"2026-10-07",t:"13:30",t2:"16:30",code:"BX1B",nom:"EY-Parthenon",info:"",salle:"",lieu:""},
{d:"2026-10-07",t:"17:00",t2:"20:00",code:"BX1C",nom:"(S2)",info:"Bain & Cie",salle:"",lieu:""},
{d:"2026-10-08",t:"09:00",t2:"12:00",code:"FORUM",nom:"ENTREPRISES",info:"",salle:"",lieu:""},
{d:"2026-10-09",t:"09:00",t2:"12:00",code:"BX1B",nom:"Roland Berger",info:"dans leurs locaux",salle:"",lieu:""},
{d:"2026-10-14",t:"13:30",t2:"16:30",code:"BX1B",nom:"O. Wyman",info:"dans leurs locaux",salle:"",lieu:""},
{d:"2026-10-14",t:"17:00",t2:"20:00",code:"BX1C",nom:"(S3)",info:"Bain & Cie",salle:"",lieu:""},
{d:"2026-10-15",t:"09:00",t2:"12:00",code:"BX1E",nom:"Etudes de cas",info:"B. Gaven",salle:"",lieu:""},
{d:"2026-10-15",t:"13:30",t2:"16:30",code:"BX1A",nom:"Approches sociologiques de la stratégie",info:"C.W. Huynh",salle:"",lieu:""},
{d:"2026-10-16",t:"09:00",t2:"12:00",code:"BX1E",nom:"IA et consulting",info:"L.D. Benyayer",salle:"",lieu:""},
{d:"2026-10-21",t:"13:30",t2:"16:30",code:"BX1E",nom:"Etudes de cas",info:"B. Gaven",salle:"",lieu:""},
{d:"2026-10-21",t:"17:00",t2:"20:00",code:"BX1C",nom:"(S4)",info:"Bain & Cie",salle:"",lieu:""},
{d:"2026-10-23",t:"10:00",t2:"12:00",code:"BX1A",nom:"Stratégie de transformation",info:"G. Bascle",salle:"",lieu:""},
{d:"2026-10-23",t:"13:30",t2:"16:30",code:"BX1A",nom:"Stratégie de transformation",info:"G. Bascle",salle:"",lieu:""},
{d:"2026-11-04",t:"17:00",t2:"20:00",code:"BX1C",nom:"(S5)",info:"Bain & Cie",salle:"",lieu:""},
{d:"2026-11-05",t:"09:00",t2:"12:00",code:"BX1B",nom:"A.T. Kearney",info:"",salle:"",lieu:""},
{d:"2026-11-06",t:"10:00",t2:"12:00",code:"BX1A",nom:"Stratégie de transformation",info:"G. Bascle",salle:"",lieu:""},
{d:"2026-11-06",t:"13:30",t2:"16:30",code:"BX1A",nom:"Stratégie de transformation",info:"G. Bascle",salle:"",lieu:""},
{d:"2026-11-13",t:"10:00",t2:"12:00",code:"BX1A",nom:"Stratégie de transformation",info:"G. Bascle",salle:"",lieu:""},
{d:"2026-11-13",t:"13:30",t2:"16:30",code:"BX1A",nom:"Stratégie de transformation",info:"G. Bascle",salle:"",lieu:""},
{d:"2026-11-18",t:"17:00",t2:"20:00",code:"BX1C",nom:"(S6)",info:"Bain & Cie",salle:"458",lieu:"Champerret"},
{d:"2026-11-19",t:"09:00",t2:"12:00",code:"BX1A",nom:"Problématiques mondiales de la stratégie",info:"B. Collin · ANNULÉ, non reporté (annonce du 24/11)",salle:"812",lieu:"Champerret",off:1},
{d:"2026-11-20",t:"13:30",t2:"16:30",code:"BX1B",nom:"Kéa",info:"",salle:"877",lieu:"Champerret"},
{d:"2026-11-25",t:"13:30",t2:"16:30",code:"BX1B",nom:"EY-Parthenon",info:"",salle:"",lieu:""},
{d:"2026-11-25",t:"17:00",t2:"20:00",code:"BX1C",nom:"(S7)",info:"Bain & Cie",salle:"",lieu:""},
{d:"2026-11-26",t:"13:30",t2:"16:30",code:"BX1D",nom:"Stratégie d'entreprise",info:"V. Mazza & · A. Joudiou",salle:"",lieu:""},
{d:"2026-11-27",t:"09:00",t2:"12:00",code:"BX1D (+MS)",nom:"Stratégie & plateformisation",info:"F. Fréry · 3 rue Armand Moisant 75015",salle:"",lieu:"Montparnasse"},
{d:"2026-11-27",t:"13:30",t2:"16:30",code:"BX1D (+MS)",nom:"Stratégie & plateformisation",info:"F. Fréry · 3 rue Armand Moisant 75015",salle:"",lieu:"Montparnasse"},
{d:"2026-12-02",t:"13:30",t2:"16:30",code:"BX1A",nom:"Modélisation",info:"B. Gaven · reporté du 20/11",salle:"",lieu:""},
{d:"2026-12-03",t:"13:30",t2:"16:30",code:"BX1D",nom:"Procter & Gamble",info:"intervention ajoutée le 12/11",salle:"",lieu:""},
{d:"2026-12-09",t:"17:00",t2:"20:00",code:"BX1C",nom:"(S8)",info:"Bain & Cie · dans leurs locaux?",salle:"",lieu:""},
{d:"2026-12-11",t:"13:30",t2:"16:30",code:"BX1E",nom:"Débriefing",info:"G. Bascle",salle:"",lieu:""},
{d:"2026-12-10",t:"14:00",t2:"16:00",code:"EXAMENS",nom:"Examen BX1A",info:"Intelligence stratégique · 2 h · planning V19",salle:"",lieu:""},
{d:"2026-12-11",t:"10:00",t2:"12:00",code:"EXAMENS",nom:"Examen BX1C",info:"Dans la peau d'un consultant · 2 h · planning V19",salle:"",lieu:""}
];
