// Données du site définies UNE seule fois (CLAUDE.md) : réutilisées par le gabarit, les pages et les composants.
// Un champ vide ('') n'est pas affiché : le remplir suffit pour qu'il apparaisse partout.

export const SITE = {
    nom: 'BSGA',
    accroche: 'Ménage et entretien à domicile autour de Grasse',
    signature: 'La propreté, avec élégance.',
    url: 'https://darthappa.github.io/BSGA/',
    langue: 'fr',
    locale: 'fr_FR',
};

export const CONTACT = {
    telephone: '07 84 86 62 11',
    telephoneLien: '+33784866211', // format international pour les liens tel:
    email: 'italiano.aurelie04@gmail.com',
    ville: 'Grasse',
    codePostal: '06130',
    horaires: '', // ex. « Du lundi au samedi, de 8 h à 19 h » (à confirmer)
};

// Réseaux : liens affichés seulement une fois remplis (à mettre en place).
export const RESEAUX = {
    avisGoogle: '', // lien de la fiche Google (avis clients). Tant qu'il est vide, aucune section avis.
    linkedin: '', // lien du profil LinkedIn
};

// Formulaire de devis (Web3Forms). La clé d'accès est publique par conception (skill securite).
// Tant qu'elle est vide, le bouton d'envoi ouvre un email prérempli à la place.
export const FORMULAIRE = {
    cleWeb3Forms: '', // À REMPLACER : clé reçue sur https://web3forms.com avec l'email de BSGA
    action: 'https://api.web3forms.com/submit',
};

// Zone d'intervention (étude : docs/zone-intervention.md). Temps de trajet à confirmer.
// Zone 1 (cœur, jusqu'à ~20 min) : déplacement inclus. Zone 2 (élargie, 20 à 35 min) : forfait déplacement.
export const ZONES = {
    coeur: [
        'Grasse',
        'Mouans-Sartoux',
        'Peymeinade',
        'Mougins',
        'Pégomas',
        'Châteauneuf-Grasse',
        'Le Rouret',
        'Opio',
        'Cabris',
        'Spéracèdes',
        'Le Tignet',
        'Auribeau-sur-Siagne',
        'Le Bar-sur-Loup',
    ],
    elargie: [
        'Valbonne',
        'Roquefort-les-Pins',
        'La Roquette-sur-Siagne',
        'Saint-Cézaire-sur-Siagne',
        'Saint-Vallier-de-Thiey',
        'Tourrettes-sur-Loup',
        'Cannes',
        'Le Cannet',
        'Mandelieu-la-Napoule',
    ],
};

// Prestations : mêmes noms partout sur le site. Les prix vivent dans src/tarifs.js.
// icone : nom d'une icône de src/components/Icone.astro
export const PRESTATIONS = [
    {
        id: 'remise-en-etat',
        nom: 'Remise en état',
        prix: 'au m² et forfait horaire',
        icone: 'eclat',
        resume: 'Un grand ménage complet, avant une vente, une location ou un emménagement.',
        inclus: [
            'Dépoussiérage complet, du sol au plafond',
            'Cuisine et salle de bain dégraissées et détartrées',
            'Portes, plinthes, interrupteurs et vitres intérieures',
            'Sols aspirés et lavés',
        ],
    },
    {
        id: 'nettoyage-regulier',
        nom: 'Nettoyage régulier',
        prix: 'forfait',
        icone: 'calendrier',
        resume: 'Le ménage courant de votre domicile, chaque semaine, toutes les deux semaines ou chaque mois.',
        inclus: [
            'Dépoussiérage et aspiration',
            'Sols lavés',
            'Cuisine et sanitaires nettoyés',
            'Changement des draps sur demande',
        ],
    },
    {
        id: 'apres-chantier',
        nom: 'Nettoyage après chantier',
        prix: 'forfait selon la surface',
        icone: 'chantier',
        resume: 'Après des travaux : poussière fine, traces de peinture ou de plâtre, résidus de colle.',
        inclus: [
            'Poussière fine retirée de toutes les surfaces',
            'Vitres et menuiseries débarrassées des traces',
            'Plinthes, prises et radiateurs dépoussiérés',
            'Sols lavés, cuisine et sanitaires prêts à servir',
        ],
    },
    {
        id: 'apres-evenement',
        nom: 'Nettoyage après événement',
        prix: 'forfait selon la surface',
        icone: 'verre',
        resume: 'Après une réception, un anniversaire ou un mariage à la maison, nous remettons les lieux en ordre.',
        inclus: [
            'Rangement et tri des déchets',
            'Cuisine et vaisselle',
            'Sols et sanitaires',
            'Terrasse et extérieurs sur demande',
        ],
    },
    {
        id: 'intendance',
        nom: 'Intendance et conciergerie',
        prix: 'forfait',
        icone: 'cle',
        resume: 'Résidences secondaires et locations saisonnières : un logement prêt à chaque arrivée.',
        inclus: [
            'Ménage entre deux séjours',
            'Préparation avant votre arrivée',
            'Changement du linge (fourni par vous)',
            'Passage de contrôle pendant votre absence',
        ],
    },
];

// Services à la personne : tant que declaree = false, AUCUNE mention du crédit d'impôt sur le site.
export const SAP = {
    declaree: false,
    numero: '', // n° de déclaration SAP, à afficher une fois obtenu
};

// Éditeur du site (mentions légales). À compléter à l'immatriculation de l'entreprise.
export const EDITEUR = {
    nom: 'BSGA',
    responsable: '', // nom de la dirigeante, directrice de la publication
    forme: '', // ex. « Entreprise individuelle (micro-entreprise) »
    siret: '',
    adresse: '', // adresse du siège (domiciliation possible)
    tva: '', // n° de TVA, ou laisser vide en micro-entreprise : la mention art. 293 B s'affiche
    assureur: '', // assureur RC professionnelle + n° de contrat
};

// Médiateur de la consommation (obligatoire pour vendre à des particuliers). À choisir et adhérer.
export const MEDIATEUR = {
    nom: '',
    site: '',
};

// Hébergeur du site
export const HEBERGEUR = {
    nom: 'GitHub, Inc. (service GitHub Pages)',
    adresse: '88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis',
    site: 'https://github.com',
};

// Date de dernière mise à jour des pages légales
export const MAJ_LEGAL = '24 octobre 2026';
