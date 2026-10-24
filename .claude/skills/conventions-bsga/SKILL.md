---
name: conventions-bsga
description: Conventions du site BSGA (entreprise de ménage) : structure Astro + Tailwind, identité, ton, mentions légales et règles de contenu. À utiliser pour toute création ou modification du site BSGA.
---

# Conventions du site BSGA

BSGA est une entreprise de ménage à taille humaine basée à Grasse (06130), qui s'adresse d'abord aux particuliers (offre entreprises prévue plus tard). Dépôt `DarthAppa/BSGA`, dossier local `D:\1_PROJET_PERSO\BSGA`. Répondre en français et tutoyer l'utilisateur ; le site vouvoie ses visiteurs. Voir aussi `CLAUDE.md`.

## Prestations (noms identiques partout, définis dans `src/site.js`)

| Prestation                 | Mode de prix            |
| -------------------------- | ----------------------- |
| Remise en état             | au m² + forfait horaire |
| Nettoyage régulier         | forfait                 |
| Nettoyage après chantier   | forfait adapté au m²    |
| Nettoyage après événement  | forfait adapté au m²    |
| Intendance et conciergerie | forfait                 |

## Technique

- Astro (sortie 100 % statique) + Tailwind CSS 3 compilé (`npm run build:css`), jamais de CDN. JS vanilla dans `public/assets/js/`.
- Un seul `<head>` : `src/layouts/Base.astro`. Une page = `src/pages/<nom>.astro` avec `<Base titre description>`.
- Données uniques : `src/site.js` (coordonnées, zones, prestations, éditeur, médiateur, SAP). Prix : `src/tarifs.js` uniquement, valeur provisoire marquée `// À REMPLACER`.
- Liens relatifs (`contact.html`, `assets/...`) : le site vit sous `/BSGA/` sur GitHub Pages.
- Formulaire de devis : Web3Forms (`https://api.web3forms.com`), autorisé dans la CSP de `tools/csp.mjs`.

## HTML

- Balises sémantiques : `header`, `nav`, `main id="contenu"`, `section` avec `id`, `article`, `footer`. Un seul `h1`, puis `h2`/`h3` dans l'ordre.
- Images : `public/assets/img/`, `.webp`, `alt`, `width`/`height`, `loading="lazy"` hors haut de page. Décors `aria-hidden="true"`.
- Actions = `<button type="button">`, navigation = `<a href>`. Téléphone en `tel:+33…`, email en `mailto:`.

## CSS

- Mise en page avec Tailwind (mobile d'abord, puis `sm: md: lg:`). Composants répétés et effets dans `public/assets/css/style.css` (`.btn`, `.btn--secondaire`, `.prestation`…).
- Couleurs : uniquement les tokens de `tailwind.config.cjs`, avec la même valeur en `--var` dans `style.css`.
- Contraste ≥ 4.5:1, focus visible, zones cliquables ≥ 44px, `prefers-reduced-motion` respecté. Une seule animation marquante au maximum.

## Identité visuelle

- Tokens actuels PROVISOIRES (fond, surface, encre, encreDouce, ligne, accent, accentFonce). Les valeurs définitives sont fixées en phase 2 (maquette) puis reportées ici, dans `tailwind.config.cjs` et `style.css`.
- Ambiance : propre, claire, rassurante, chaleureuse, ancrée dans le pays grassois. Éviter les clichés de template (fond crème + accent terracotta, cartes identiques à ombre grise, libellés en MAJUSCULES espacées au-dessus des titres, flèches « → » sur les boutons).

## Ton et contenu

- **Vouvoiement**, phrases simples, verbes d'action sur les boutons (« Demander un devis », « Appeler », « Envoyer ma demande »).
- Textes concrets, pas de superlatifs creux. Même chose = même nom partout.
- Jamais de faux avis, faux témoignages, faux chiffres ou faux logos clients. Section avis uniquement avec de vrais avis.
- Photos réelles ou libres de droits, jamais de visuels de marques.

## Règles légales

- **Mentions légales** (`site.js` → `mentions-legales.astro`) : dénomination, forme juridique, SIRET, adresse, TVA ou « TVA non applicable, art. 293 B du CGI », téléphone, email, directrice de publication, hébergeur, assureur RC pro, **médiateur de la consommation**.
- **Formulaire / RGPD** : voir le skill `securite`.
- **Prix** : affichés TTC (et HT si TVA), frais de déplacement indiqués. Toute estimation porte « Estimation indicative, le devis définitif est établi gratuitement après échange ou visite ».
- **Services à la personne** : tant que `SAP.declaree` est `false`, aucune mention du crédit d'impôt (bloqué par `tools/regles.mjs`). Une fois déclarée : numéro de déclaration, mention « devis gratuit » (obligatoire dès 100 € TTC/mois, arrêté du 17 mars 2015), crédit d'impôt en mention distincte et plus petite que le prix, et seulement sur les prestations éligibles (ménage au domicile du particulier, pas l'après-chantier ni l'après-événement).

## Vérification avant de dire que c'est fini

`npm run verif` vert (skill `verif-code`), captures 390px et 1280px regardées (skill `verif-visuelle`), puis `audit-front` avant une mise en ligne.
