# BSGA - site vitrine (Astro + Tailwind)

Site de BSGA, entreprise de ménage à taille humaine basée à Grasse (06130), pour les particuliers d'abord
(offre entreprises prévue plus tard). Prestations : remise en état, nettoyage régulier, nettoyage après
chantier, nettoyage après événement, intendance et conciergerie. Contact : téléphone, email, formulaire de
devis (Web3Forms).
Hébergé sur GitHub Pages (construit et publié par GitHub Actions à chaque fusion dans `main`) :
https://darthappa.github.io/BSGA/

Façon de travailler : skill `verification-prompt` (reformuler, valider, travailler par phases, résumé de fin de
phase). Conventions du site : skill `conventions-bsga`. Répondre en français et tutoyer l'utilisateur ; le site,
lui, VOUVOIE ses visiteurs.

## Fichiers

```
src/
  pages/        une page = un fichier .astro publié en <nom>.html
  layouts/      Base.astro : LE <head>, l'en-tête et le pied de page de toutes les pages
  components/   EnTete.astro, PiedDePage.astro, PageLegale.astro
  styles/       tailwind.css (source Tailwind)
  site.js       nom, coordonnées, zones, prestations, éditeur, médiateur, SAP : définis UNE seule fois
public/         copié tel quel dans le site
  assets/css/   style.css (fait main) ; tailwind.css est GÉNÉRÉ (non suivi par git)
  assets/js/    scripts du navigateur (vanilla)
  assets/img/   images .webp
docs/           notes du projet (zone d'intervention, concurrence, normes) : PUBLIQUES (dépôt public)
docs-prives/    notes privées (ignoré par git)
tools/          build CSS, CSP, règles maison, captures, vérification complète
dist/           site construit (npm run build) : jamais modifié à la main, jamais commité
```

- Nouvelle page : `src/pages/<nom>.astro` avec `<Base titre="Sujet" description="…">` ; le titre reçoit
  « — BSGA » automatiquement. Ne jamais recopier le `<head>`, l'en-tête ou le pied de page. Ajouter le lien dans
  `EnTete.astro` (tableau `liens`).
- Coordonnées, zones, prestations, mentions légales : uniquement dans `src/site.js`.
- Prix (phase 4) : uniquement dans `src/tarifs.js`.
- `tailwind.config.cjs` : couleurs, polices. Chaque couleur a sa variable `--xxx` dans `public/assets/css/style.css`.

## Commandes

- Travailler sur les pages : `npm run dev` (site en direct sur http://localhost:4321/BSGA/ avec rechargement)
- Construire : `npm run build` (Tailwind → Astro → CSP sur `dist/`) ; le servir : `npm run serve`
- Vérifier le rendu : `npm run shot` / `node tools/screenshot.mjs page.html` (captures dans `shots/`)
- Tout vérifier : `npm run verif` (`npm run verif:rapide` sans captures)
- Première installation : `npm install` puis `npx playwright install chromium`
- Mise en ligne : automatique à chaque fusion dans `main`. Réglage GitHub : Settings › Pages › Source = « GitHub Actions ».
- IMPORTANT : jamais de token, clé API ou mot de passe dans le code ; tout va dans `.env` (ignoré par git).
  Exception : la clé d'accès Web3Forms, publique par conception.

## Règles

- IMPORTANT : un seul `<head>`, celui de `src/layouts/Base.astro`. La CSP y est ajoutée après le build par
  `tools/csp.mjs` (autorise Web3Forms pour le formulaire). Pas de script inline, pas de `onclick=`, pas de CDN.
- Couleurs : uniquement les tokens de `tailwind.config.cjs` et leurs `--var` dans `style.css`.
- Pas d'image qui n'existe pas dans le dépôt. Pas de photo ou logo de marque. Jamais de faux avis, faux
  témoignages, faux chiffres ou faux logos clients.
- IMPORTANT : tant que `SAP.declaree` est `false` dans `src/site.js`, AUCUNE mention du crédit d'impôt
  (vérifié par `tools/regles.mjs`).
- Chaque page : `<title>` au format « Sujet — BSGA », `og:site_name="BSGA"`, un seul `<h1>`.
- Textes en français, vouvoiement des visiteurs, boutons avec un verbe d'action.
- Mobile d'abord : tester à 390px et 1280px, aucune barre de défilement horizontale.
- Le site reste utilisable sans JS (téléphone et email cliquables partout).
- Après toute modification visuelle : `npm run shot`, regarder les captures, corriger avant de dire que c'est fini.

## Git

- Commits courts en français : `feat: page contact`, `fix: débordement mobile du menu`.
- Ne pas committer `node_modules/`, `shots/`, `dist/`, `.astro/`, `public/assets/css/tailwind.css`, `.env`.
- Jamais de push direct sur `main` (sauf le commit initial) : branche `feat/…`, `fix/…`, `chore/…`, puis pull
  request (skill `pull-request`, ou `/publier`).

## Vérification (obligatoire avant toute PR)

- IMPORTANT : `npm run verif` doit être vert avant de dire qu'une tâche est finie, avant un push et une PR
  (skill `verif-code`).
- Contenu : Prettier, ESLint, Stylelint, build, html-validate, `tools/regles.mjs` (titres, tokens, liens, images,
  secrets, crédit d'impôt), classes Tailwind, CSP, `npm audit`, captures 390/1280px de chaque page.
- Triple verrou : hook git `pre-push`, hook Claude `.claude/hooks/avant-pr.mjs` avant `gh pr create`,
  GitHub Actions `.github/workflows/verif.yml` sur chaque PR.
- Corriger la cause, jamais la règle : pas de `eslint-disable`, pas de `--no-verify`.
- Skills : `conventions-bsga`, `verif-code`, `revue-code`, `corriger-bug`, `securite`, `pull-request`, `publier`,
  `verif-visuelle`, `audit-front`, `maquette-vers-html`.
