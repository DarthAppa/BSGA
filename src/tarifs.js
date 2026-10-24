// TOUS les prix du site, et uniquement ici (CLAUDE.md). Montants en euros TTC.
// Micro-entreprise : TVA non applicable (art. 293 B du CGI), donc TTC = montant facturé.
// VALEURS PROVISOIRES (repères : docs/zone-intervention.md) : chaque prix marqué « À REMPLACER » doit être
// validé avant la mise en ligne. L'outil d'estimation (public/assets/js/devis.js) lit ces valeurs via la page devis.

export const TARIFS = {
    // mode 'surface' : surface (m²) × prix au m², avec un minimum
    // mode 'heures' : nombre d'heures × prix horaire, avec un minimum d'heures
    // mode 'sur-devis' : pas d'estimation en ligne
    prestations: {
        'remise-en-etat': { mode: 'surface', parM2: 6, minimum: 150 }, // À REMPLACER
        'nettoyage-regulier': { mode: 'heures', parHeure: 32, minimumHeures: 2 }, // À REMPLACER
        'apres-chantier': { mode: 'surface', parM2: 8, minimum: 200 }, // À REMPLACER
        'apres-evenement': { mode: 'surface', parM2: 5, minimum: 180 }, // À REMPLACER
        intendance: { mode: 'sur-devis' },
    },
    // Remise en état : heures supplémentaires éventuelles (« forfait horaire »)
    heureSupplementaire: 35, // À REMPLACER
    deplacement: {
        coeur: 0, // zone 1 : déplacement inclus
        elargie: 15, // À REMPLACER : forfait par intervention en zone 2
    },
    // Zone 2 : minimum d'heures pour le nettoyage régulier (docs/zone-intervention.md)
    minimumHeuresElargie: 3, // À REMPLACER
};

export const MENTION_ESTIMATION =
    'Estimation indicative, le devis définitif est établi gratuitement après échange ou visite.';
