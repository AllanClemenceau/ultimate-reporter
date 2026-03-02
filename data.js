// ============================================
// ULTIMATE REPORTER v0.2 — Game Data
// ============================================

const TECHNIQUES = {
  'mots-charges': {
    id: 'mots-charges',
    nom: 'Mots chargés',
    description: 'Utilisation de termes émotionnels ou minimisants pour influencer la perception.',
    icone: '💬',
    couleur: '#F59E0B',
    difficulteBase: 1
  },
  'selection-sources': {
    id: 'selection-sources',
    nom: 'Sélection de sources',
    description: 'Ne citer qu\'un seul point de vue en ignorant les voix contradictoires.',
    icone: '🎯',
    couleur: '#3B82F6',
    difficulteBase: 2
  },
  'omission-contextuelle': {
    id: 'omission-contextuelle',
    nom: 'Omission',
    description: 'Passer sous silence un fait crucial qui changerait la compréhension.',
    icone: '🕳️',
    couleur: '#FF4D6A',
    difficulteBase: 3
  },
  'generalisation-abusive': {
    id: 'generalisation-abusive',
    nom: 'Généralisation',
    description: 'Tirer une conclusion générale à partir d\'un cas isolé ou d\'une statistique non pertinente.',
    icone: '🌐',
    couleur: '#8B5CF6',
    difficulteBase: 2
  },
  'appel-emotion': {
    id: 'appel-emotion',
    nom: 'Appel émotion',
    description: 'Jouer sur les sentiments plutôt que sur les faits pour convaincre.',
    icone: '❤️‍🔥',
    couleur: '#EC4899',
    difficulteBase: 2
  }
};

const RANGS = {
  stagiaire:        { nom: 'Stagiaire',         icone: '📋', seuil: 0   },
  pigiste:          { nom: 'Pigiste',            icone: '✏️', seuil: 20  },
  reporter:         { nom: 'Reporter',           icone: '🎤', seuil: 35  },
  correspondant:    { nom: 'Correspondant',      icone: '📡', seuil: 45  },
  redacteurEnChef:  { nom: 'Rédacteur en chef',  icone: '🏆', seuil: 55  },
  prixPulitzer:     { nom: 'Prix Pulitzer',      icone: '🌟', seuil: 500 }
};

const DOSSIERS_INDEX = [
  {
    slug: 'lactalis-2017',
    titre: 'Lait contaminé : l\'affaire Lactalis',
    sousTitre: '53 nourrissons contaminés, un géant silencieux',
    categorie: 'Santé',
    difficulte: 1,
    gratuit: true,
    nombreArticles: 4,
    tempsEstime: '15-20 min',
    tags: ['santé', 'industrie', 'lanceurs d\'alerte'],
    techniquesAbordees: ['mots-charges', 'omission-contextuelle', 'selection-sources', 'generalisation-abusive'],
    playable: true,
    image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=800&h=400&fit=crop'
  },
  {
    slug: 'ovhcloud-incendie',
    titre: 'Incendie OVHcloud : le champion déchu ?',
    sousTitre: 'Quand le cloud français part en fumée',
    categorie: 'Tech',
    difficulte: 2,
    gratuit: true,
    nombreArticles: 3,
    tempsEstime: '20-25 min',
    tags: ['tech', 'entreprise', 'infrastructure'],
    techniquesAbordees: ['mots-charges', 'omission-contextuelle'],
    playable: false,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop'
  },
  {
    slug: 'mort-de-nahel',
    titre: 'Mort de Nahel : deux récits, une fracture',
    sousTitre: 'La fabrique médiatique d\'un événement national',
    categorie: 'Société',
    difficulte: 3,
    gratuit: false,
    nombreArticles: 5,
    tempsEstime: '25-30 min',
    tags: ['société', 'police', 'médias'],
    techniquesAbordees: ['selection-sources', 'appel-emotion', 'omission-contextuelle'],
    playable: false,
    image: 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?w=800&h=400&fit=crop'
  },
  {
    slug: 'cnews-climat',
    titre: 'CNews vs le climat : quand l\'antenne déraille',
    sousTitre: 'Analyse d\'une couverture climatosceptique',
    categorie: 'Médias',
    difficulte: 2,
    gratuit: false,
    nombreArticles: 3,
    tempsEstime: '20 min',
    tags: ['médias', 'climat', 'désinformation'],
    techniquesAbordees: ['generalisation-abusive', 'selection-sources', 'mots-charges'],
    playable: false,
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=400&fit=crop'
  }
];
const DOSSIER_LACTALIS = {
  meta: {
    slug: 'lactalis-2017',
    titre: 'Lait contaminé : l\'affaire Lactalis',
    sousTitre: '53 nourrissons contaminés, un géant silencieux',
    description: 'En décembre 2017, des dizaines de nourrissons sont contaminés par des salmonelles après avoir consommé du lait infantile Lactalis. L\'affaire révèle des dysfonctionnements en série.',
    categorie: 'Santé',
    difficulte: 1,
    contexteHistorique: 'Retour sur une crise sanitaire majeure qui a mis en lumière les failles du système de contrôle alimentaire français. Le groupe Lactalis, premier groupe laitier mondial et entreprise la plus secrète de France, se retrouve au cœur d\'un scandale sanitaire touchant les plus vulnérables : des nourrissons.',
    periodeCouverte: { debut: '2017-11', fin: '2023-02' }
  },

  sources: [
    {
      id: 'src-dgccrf-rapport',
      type: 'document-officiel',
      titre: 'Rapport DGCCRF — Contrôles usine de Craon',
      auteur: 'Direction générale de la concurrence, de la consommation et de la répression des fraudes',
      date: 'Février 2018',
      resume: 'Le rapport révèle que l\'usine de Craon avait connu une contamination à la salmonelle dès 2005, soit 12 ans avant la crise publique.',
      extraits: [
        {
          id: 'ext-dgccrf-1',
          texte: 'Des autocontrôles positifs à Salmonella Agona ont été identifiés dans l\'environnement de production dès 2009, et un produit fini a été testé positif en 2011.',
          page: '12'
        },
        {
          id: 'ext-dgccrf-2',
          texte: 'L\'entreprise a manqué de vigilance voire de clairvoyance vis-à-vis des signaux négatifs répétés qui alertaient sur une perte de sécurité de la fabrication.',
          page: '34'
        }
      ],
      fiabilite: 'officiel',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=200&fit=crop'
    },
    {
      id: 'src-besnier-audition',
      type: 'temoignage',
      titre: 'Audition d\'Emmanuel Besnier — Commission d\'enquête parlementaire',
      auteur: 'Emmanuel Besnier, PDG de Lactalis',
      date: '7 juin 2018',
      resume: 'Le PDG de Lactalis affirme sous serment n\'avoir jamais eu connaissance de contaminations dans les produits finis.',
      extraits: [
        {
          id: 'ext-besnier-1',
          texte: 'À aucun moment nous n\'avions eu connaissance de la présence de salmonelles dans nos produits finis. À aucun moment les analyses n\'ont été positives.',
          page: null
        }
      ],
      fiabilite: 'temoignage-partie-concernee'
    },
    {
      id: 'src-que-choisir-enquete',
      type: 'enquete-media',
      titre: 'Enquête UFC-Que Choisir — Des salmonelles passées sous silence',
      auteur: 'Elsa Casalegno, UFC-Que Choisir',
      date: '12 décembre 2018',
      resume: 'L\'enquête révèle que des autocontrôles positifs existaient dès 2009, contredisant les déclarations du PDG.',
      extraits: [
        {
          id: 'ext-qc-1',
          texte: 'Des documents retraçant les autocontrôles positifs montrent ce que l\'industriel ne pouvait ignorer : Salmonella Agona était présente dans l\'environnement depuis 2009, et elle avait même contaminé un produit en 2011.'
        }
      ],
      fiabilite: 'enquete-independante',
      image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=200&fit=crop'
    },
    {
      id: 'src-familles-temoignage',
      type: 'temoignage',
      titre: 'Témoignages de familles de victimes',
      auteur: 'Association des familles de victimes de Lactalis',
      date: 'Janvier 2018',
      resume: 'Plusieurs familles décrivent les hospitalisations de leurs nourrissons et le manque d\'information de Lactalis.',
      extraits: [
        {
          id: 'ext-familles-1',
          texte: 'Notre fille de 3 mois a été hospitalisée pendant 5 jours. Lactalis n\'a jamais pris contact avec nous directement. Nous avons appris le rappel par les médias.'
        }
      ],
      fiabilite: 'temoignage-victime'
    }
  ],

  articles: [
    {
      id: 'art-1',
      titre: 'Lactalis : un incident isolé dans une filière sous contrôle',
      media: 'Le Quotidien Économique',
      mediaType: 'presse-economique',
      auteur: 'J. Martin',
      date: '15 janvier 2018',
      contenu: [
        {
          id: 'p-1-1',
          type: 'paragraphe',
          texte: 'Le groupe Lactalis, leader mondial des produits laitiers, fait face à un épisode de contamination regrettable mais limité dans son usine mayennaise.'
        },
        {
          id: 'p-1-2',
          type: 'paragraphe',
          texte: 'Selon un porte-parole du groupe, « les mesures correctives ont été immédiatement mises en place dès l\'identification du problème ». Le processus de rappel, bien que complexe, a fonctionné conformément aux procédures en vigueur.'
        },
        {
          id: 'p-1-3',
          type: 'paragraphe',
          texte: 'Des experts du secteur agroalimentaire soulignent que ce type d\'incident, bien que malheureux, reste rare dans une industrie qui produit des millions de lots chaque année. « Il faut remettre les choses en perspective », estime un analyste de la filière laitière.'
        },
        {
          id: 'p-1-4',
          type: 'paragraphe',
          texte: 'Le titre a perdu 2% en bourse dans la journée, mais les analystes s\'accordent à dire que l\'impact financier restera contenu pour un groupe de cette envergure.'
        }
      ],
      annotations: [
        {
          id: 'ann-1-1',
          paragrapheId: 'p-1-1',
          debutOffset: 68,
          finOffset: 119,
          texteCible: 'un épisode de contamination regrettable mais limité',
          technique: 'mots-charges',
          explication: 'Les mots « épisode », « regrettable » et « limité » minimisent la gravité. 53 nourrissons contaminés, des hospitalisations, une contamination connue depuis 12 ans — rien de « limité ».',
          sourcesContradictoires: ['ext-dgccrf-1', 'ext-familles-1'],
          difficulte: 1,
          points: 10
        },
        {
          id: 'ann-1-2',
          paragrapheId: 'p-1-2',
          debutOffset: 0,
          finOffset: 220,
          texteCible: 'Selon un porte-parole du groupe, « les mesures correctives ont été immédiatement mises en place dès l\'identification du problème ». Le processus de rappel, bien que complexe, a fonctionné conformément aux procédures en vigueur.',
          technique: 'selection-sources',
          explication: 'L\'article ne cite que le porte-parole de Lactalis. Aucune voix contradictoire : ni la DGCCRF, ni les familles, ni les distributeurs qui ont continué à vendre les produits rappelés.',
          sourcesContradictoires: ['ext-dgccrf-2', 'ext-qc-1'],
          difficulte: 2,
          points: 15
        },
        {
          id: 'ann-1-3',
          paragrapheId: 'p-1-3',
          debutOffset: 0,
          finOffset: 263,
          texteCible: 'Des experts du secteur agroalimentaire soulignent que ce type d\'incident, bien que malheureux, reste rare dans une industrie qui produit des millions de lots chaque année. « Il faut remettre les choses en perspective », estime un analyste de la filière laitière.',
          technique: 'generalisation-abusive',
          explication: 'Généralisation qui noie le cas spécifique (contamination connue depuis 12 ans, autocontrôles ignorés) dans une statistique générale sur l\'industrie. L\'« analyste » n\'est pas nommé.',
          sourcesContradictoires: ['ext-dgccrf-1'],
          difficulte: 2,
          points: 15
        },
        {
          id: 'ann-1-4',
          paragrapheId: 'p-1-1',
          debutOffset: 0,
          finOffset: 67,
          texteCible: 'Le groupe Lactalis, leader mondial des produits laitiers, fait face',
          technique: 'omission-contextuelle',
          explication: 'L\'article omet totalement que l\'usine de Craon avait déjà connu une contamination en 2005 et que des signaux existaient depuis 2009. Le problème est présenté comme nouveau et ponctuel.',
          sourcesContradictoires: ['ext-dgccrf-1', 'ext-qc-1'],
          difficulte: 3,
          points: 20
        }
      ]
    }
  ],

  scoring: {
    pointsMaximum: 60,
    seuils: {
      stagiaire: 0,
      pigiste: 20,
      reporter: 35,
      correspondant: 45,
      redacteurEnChef: 55
    },
    penaliteFauxPositif: -5,
    bonusSourceCorrecte: 5
  }
};

const SOURCE_TYPE_LABELS = {
  'document-officiel': 'Document officiel',
  'temoignage': 'Témoignage',
  'enquete-media': 'Enquête média',
  'communique': 'Communiqué',
  'donnees-chiffrees': 'Données chiffrées'
};

const FIABILITE_LABELS = {
  'officiel':                    { label: 'Source officielle',   color: '#3B82F6' },
  'enquete-independante':        { label: 'Enquête indépendante', color: '#10B981' },
  'temoignage-victime':          { label: 'Témoignage victime',  color: '#F59E0B' },
  'temoignage-partie-concernee': { label: 'Partie concernée',    color: '#FF4D6A' },
  'non-verifie':                 { label: 'Non vérifié',         color: '#6B7080' }
};

const CATEGORIE_COLORS = {
  'Santé':   '#FF4D6A',
  'Tech':    '#3B82F6',
  'Société': '#F59E0B',
  'Médias':  '#8B5CF6'
};
