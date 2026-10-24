---
name: revue-code
description: Relecture approfondie du code (diff d'une branche, d'une PR ou d'un dossier entier) — bugs, sécurité, accessibilité, règles du site, code mort. À utiliser avant une PR, quand l'utilisateur demande une relecture, ou pour un audit complet du dépôt.
---

# Revue de code

Faire la revue dans un sous-agent si le périmètre est grand (tout le dépôt) : un sous-agent par zone (pages HTML, CSS, JS du site, outil de devis et formulaire, outils Node).
Périmètre par défaut : `git diff main...HEAD`. Pour une PR : `gh pr diff <n>`. Pour tout le dépôt : tous les fichiers hors `node_modules`, `shots`, `assets`.

## 1. D'abord les outils

`npm run verif:rapide` : tout ce qui est rouge est un constat de la revue.

## 2. Ensuite la lecture humaine (ce que les outils ne voient pas)

**Bugs**

- Élément DOM utilisé sans vérifier qu'il existe (`getElementById(...)` puis `.classList` sur `null`).
- Promesses non attendues, `async` sans `try/catch` sur les appels réseau (envoi Web3Forms), états de chargement/erreur absents.
- Écouteurs ajoutés plusieurs fois, timers jamais nettoyés.
- Cas limites : liste vide, utilisateur déconnecté, réseau coupé, JS désactivé (le contenu doit rester visible).

**Sécurité**

- `innerHTML` / `insertAdjacentHTML` avec une donnée externe (saisie du visiteur, URL) → `textContent` ou échappement.
- Aucun secret dans le dépôt. La clé d'accès Web3Forms est publique par conception (elle ne fait qu'envoyer vers l'email de BSGA) : seule exception tolérée.
- Prix et calcul du devis : uniquement depuis `src/tarifs.js`, estimation toujours marquée « indicative ».
- Formulaire : champs requis, validation côté navigateur claire, honeypot anti-spam, mention RGPD présente.
- Redirections construites depuis l'URL (`?next=`) : n'autoriser que des chemins internes.
- Liens `target="_blank"` avec `rel="noopener"`.

**Accessibilité / UX** (voir aussi `audit-front`)

- Boutons = `<button type="button">`, liens = `<a href>` ; focus visible ; `aria-expanded` à jour sur les menus ; `alt` pertinents.
- Textes en français, vouvoiement des visiteurs, nom « BSGA ».

**Maintenabilité**

- Code dupliqué entre pages (en-tête/pied répétés : vérifier qu'ils sont identiques partout).
- Code mort, `console.log` oubliés, TODO sans suite, fichiers inutilisés (`tools/__pycache__`…).
- Couleurs en dur au lieu des tokens.

## 3. Rapport

Tableau : gravité (bloquant / important / mineur), fichier:ligne, problème, correction proposée. Seulement des problèmes réels et vérifiés (relire le code autour avant d'affirmer). Proposer ensuite de corriger bloquants + importants, par petits commits `fix: …`, avec `npm run verif` vert après chaque lot.
