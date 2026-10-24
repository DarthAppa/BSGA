---
name: securite
description: Règles de sécurité et de données personnelles à appliquer à CHAQUE modification qui touche au formulaire de devis, à l'envoi Web3Forms, au JavaScript du navigateur ou aux données des visiteurs. À lire avant d'écrire ce code.
---

# Sécurité — règles permanentes

Architecture : site statique PUBLIC (GitHub Pages, tout le dépôt est lisible par tous). Le seul échange de données est l'envoi du formulaire de devis vers Web3Forms, qui le transfère par email à BSGA.

## Interdits absolus

1. Aucun secret dans le dépôt : mot de passe, token GitHub, clé API privée. La clé d'accès Web3Forms est publique par conception (elle ne permet que d'envoyer un email à BSGA) : c'est la seule exception. Local : `.env` (ignoré). `npm run regles` détecte les fuites. Un secret commité est compromis : le RÉVOQUER.
2. Aucune donnée de client dans le dépôt : pas de nom, adresse, téléphone ou devis réel dans le code, les tests, les captures ou `docs/` (qui est public). Notes privées : `docs-prives/` (ignoré).
3. Pas de `innerHTML` / `insertAdjacentHTML` avec une saisie du visiteur ou une donnée de l'URL → `textContent`.
4. Pas de script inline, `onclick=`, `javascript:`, `eval`, `new Function`, ni de script ou CDN tiers : la CSP (calculée par `npm run build`) les bloque. Seul domaine externe autorisé pour l'envoi : `https://api.web3forms.com`.
5. Jamais `--no-verify`, jamais désactiver une règle pour « faire passer » la vérif.

## Formulaire de devis

- Collecter le minimum : nom, téléphone ou email, commune, prestation, surface ou durée, message. Pas de date de naissance, pas de pièce d'identité.
- Mention RGPD sous le formulaire (responsable, finalité, durée, droits, lien vers `confidentialite.html`). Aucune case pré-cochée.
- Anti-spam : champ piège (honeypot) masqué ; pas de captcha intrusif.
- Messages d'erreur clairs (quoi, pourquoi, comment corriger) ; état d'envoi visible ; aucun détail technique affiché.
- Le formulaire marche sans JS (envoi classique vers Web3Forms avec page de retour) ; le JS ne fait qu'améliorer.

## Données personnelles (RGPD)

- Toute nouvelle donnée collectée ou tout nouveau prestataire : mettre à jour `src/pages/confidentialite.astro`.
- Pas de cookie publicitaire ni d'outil de suivi. Mesure d'audience éventuelle : solution exemptée de consentement.

## Vérifier

`npm run verif` (règles maison, CSP, audit npm). Avant de modifier le formulaire : relire ce skill.
