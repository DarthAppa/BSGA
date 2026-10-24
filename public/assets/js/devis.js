// ==========================================
//   BSGA - Outil d'estimation et envoi de la demande de devis
//   Prix : lus dans data-devis (générés depuis src/tarifs.js). Aucun prix écrit ici.
//   Sécurité : textContent uniquement (jamais innerHTML), envoi vers Web3Forms seulement (skill securite).
// ==========================================

const euros = (n) =>
    new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
const nombre = (champ) => {
    const v = Number.parseFloat(String(champ?.value ?? '').replace(',', '.'));
    return Number.isFinite(v) && v > 0 ? v : 0;
};

// Calcule l'estimation. Renvoie { prix, detail } ou { prix: null, detail } si impossible en ligne.
export function estimer(tarifs, zones, { prestation, commune, surface, heures }) {
    const t = tarifs.prestations[prestation];
    if (!t || !commune) return { prix: null, detail: 'Choisissez une prestation et votre commune.' };
    if (t.mode === 'sur-devis')
        return { prix: null, detail: 'Cette prestation est chiffrée sur mesure, après un premier échange.' };
    if (commune === 'Autre commune')
        return { prix: null, detail: 'Hors de notre zone habituelle : nous étudions votre demande au cas par cas.' };

    const zone2 = zones.elargie.includes(commune);
    const deplacement = zone2 ? tarifs.deplacement.elargie : tarifs.deplacement.coeur;
    const texteDeplacement = deplacement ? `déplacement ${euros(deplacement)} compris` : 'déplacement inclus';

    if (t.mode === 'surface') {
        if (!surface) return { prix: null, detail: 'Indiquez la surface à nettoyer.' };
        const base = Math.max(surface * t.parM2, t.minimum);
        return { prix: base + deplacement, detail: `Pour ${surface} m², ${texteDeplacement}.` };
    }
    if (t.mode === 'heures') {
        if (!heures) return { prix: null, detail: 'Indiquez la durée souhaitée par passage.' };
        const minimum = zone2 ? Math.max(t.minimumHeures, tarifs.minimumHeuresElargie) : t.minimumHeures;
        const h = Math.max(heures, minimum);
        const ajuste = h > heures ? ` (minimum ${minimum} h dans votre commune)` : '';
        return { prix: h * t.parHeure + deplacement, detail: `Par passage de ${h} h${ajuste}, ${texteDeplacement}.` };
    }
    return { prix: null, detail: '' };
}

function initialiser() {
    const form = document.getElementById('form-devis');
    if (!form) return;
    let donnees;
    try {
        donnees = JSON.parse(form.dataset.devis);
    } catch {
        return; // sans données, le formulaire reste un envoi classique
    }
    const { tarifs, zones, email } = donnees;
    form.noValidate = true; // avec JS : nos messages ; sans JS : validation du navigateur
    const $ = (id) => document.getElementById(id);
    const champs = {
        prestation: $('prestation'),
        commune: $('commune'),
        surface: $('surface'),
        heures: $('heures'),
        frequence: $('frequence'),
        nom: $('nom'),
        telephone: $('telephone'),
        email: $('email'),
        message: $('message'),
    };
    const prixEl = $('estimation-prix');
    const detailEl = $('estimation-detail');
    const champEstimation = $('champ-estimation');
    const statut = $('statut-envoi');
    const bouton = $('bouton-envoyer');

    // Prestation choisie depuis la page Prestations (?prestation=...) : seulement une valeur de la liste
    const demandee = new URLSearchParams(location.search).get('prestation');
    if (demandee && [...champs.prestation.options].some((o) => o.value === demandee))
        champs.prestation.value = demandee;

    function mettreAJour() {
        const mode = tarifs.prestations[champs.prestation.value]?.mode;
        form.querySelectorAll('[data-mode]').forEach((bloc) => {
            bloc.hidden = Boolean(mode) && bloc.dataset.mode !== mode;
        });
        const r = estimer(tarifs, zones, {
            prestation: champs.prestation.value,
            commune: champs.commune.value,
            surface: nombre(champs.surface),
            heures: nombre(champs.heures),
        });
        prixEl.textContent = r.prix == null ? 'Sur devis' : `≈ ${euros(r.prix)}`;
        if (!champs.prestation.value || !champs.commune.value) prixEl.textContent = '-';
        detailEl.textContent = r.detail;
        champEstimation.value = r.prix == null ? 'Sur devis' : `${euros(r.prix)} (${r.detail})`;
    }
    form.addEventListener('input', mettreAJour);
    form.addEventListener('change', mettreAJour);
    mettreAJour();

    // Validation : messages clairs, focus sur le premier champ à corriger
    function signaler(champ, idErreur, ko) {
        const err = $(idErreur);
        if (err) err.hidden = !ko;
        [champ].flat().forEach((c) => {
            if (!c) return;
            if (ko) {
                c.setAttribute('aria-invalid', 'true');
                c.setAttribute('aria-describedby', idErreur);
            } else {
                c.removeAttribute('aria-invalid');
                c.removeAttribute('aria-describedby');
            }
        });
        return ko;
    }
    function valider() {
        const tel = champs.telephone.value.replace(/[\s.-]/g, '');
        const telOk = /^\+?\d{9,14}$/.test(tel);
        const emailOk = champs.email.value.trim() !== '' && champs.email.checkValidity();
        const erreurs = [
            signaler(champs.prestation, 'erreur-prestation', !champs.prestation.value) && champs.prestation,
            signaler(champs.commune, 'erreur-commune', !champs.commune.value) && champs.commune,
            signaler(champs.nom, 'erreur-nom', champs.nom.value.trim() === '') && champs.nom,
            signaler([champs.telephone, champs.email], 'erreur-contact', !telOk && !emailOk) && champs.telephone,
        ].filter(Boolean);
        erreurs[0]?.focus();
        return erreurs.length === 0;
    }

    // Sans clé Web3Forms : un email prérempli, à envoyer depuis la messagerie du visiteur
    function emailPrerempli() {
        const nomPrestation = champs.prestation.selectedOptions[0]?.textContent ?? '';
        const lignes = [
            `Prestation : ${nomPrestation}`,
            `Commune : ${champs.commune.value}`,
            champs.surface.value && `Surface : ${champs.surface.value} m²`,
            champs.heures.value && `Durée : ${champs.heures.value} h, ${champs.frequence.value}`,
            `Estimation affichée : ${champEstimation.value}`,
            '',
            `Nom : ${champs.nom.value}`,
            `Téléphone : ${champs.telephone.value}`,
            `Email : ${champs.email.value}`,
            '',
            champs.message.value,
        ].filter((l) => l !== '' && l !== false);
        const sujet = encodeURIComponent(`Demande de devis : ${nomPrestation}`);
        return `mailto:${email}?subject=${sujet}&body=${encodeURIComponent(lignes.join('\n'))}`;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        statut.textContent = '';
        if (!valider()) {
            statut.textContent = 'Merci de corriger les champs signalés.';
            return;
        }
        if (form.dataset.envoiEnLigne !== 'oui') {
            location.href = emailPrerempli();
            statut.textContent = 'Votre messagerie s’ouvre avec la demande préremplie : il ne reste qu’à l’envoyer.';
            return;
        }
        bouton.disabled = true;
        statut.textContent = 'Envoi en cours…';
        try {
            const reponse = await fetch(form.action, {
                method: 'POST',
                headers: { Accept: 'application/json' },
                body: new FormData(form),
            });
            const json = await reponse.json().catch(() => ({}));
            if (!reponse.ok || json.success === false) throw new Error('refus');
            form.reset();
            mettreAJour();
            statut.textContent = 'Merci, votre demande est bien envoyée. Nous vous répondons rapidement.';
        } catch {
            statut.textContent =
                'L’envoi n’a pas abouti. Réessayez dans un instant, ou appelez-nous : votre demande ne sera pas perdue.';
        } finally {
            bouton.disabled = false;
        }
    });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialiser);
else initialiser();
