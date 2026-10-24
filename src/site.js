// Données du site définies UNE seule fois (CLAUDE.md) : réutilisées par le gabarit, les pages et les composants.
// Un champ vide ('') n'est pas affiché : le remplir suffit pour qu'il apparaisse partout.

export const SITE = {
    nom: 'BSGA',
    accroche: 'Ménage et entretien à domicile autour de Grasse',
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

// Zone d'intervention (étude : docs/zone-intervention.md). Temps de trajet à confirmer.
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

// Prestations : mêmes noms partout sur le site. Les prix vivent dans src/tarifs.js (phase 4).
export const PRESTATIONS = [
    { id: 'remise-en-etat', nom: 'Remise en état', prix: 'au m² et forfait horaire' },
    { id: 'nettoyage-regulier', nom: 'Nettoyage régulier', prix: 'forfait' },
    { id: 'apres-chantier', nom: 'Nettoyage après chantier', prix: 'forfait selon la surface' },
    { id: 'apres-evenement', nom: 'Nettoyage après événement', prix: 'forfait selon la surface' },
    { id: 'intendance', nom: 'Intendance et conciergerie', prix: 'forfait' },
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
