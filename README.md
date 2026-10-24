# BSGA

Site vitrine de BSGA, entreprise de ménage et d'entretien à domicile à Grasse (Alpes-Maritimes).

En ligne : https://darthappa.github.io/BSGA/

## Démarrer

```bash
npm install
npx playwright install chromium
npm run dev
```

Puis ouvrir http://localhost:4321/BSGA/

## Commandes utiles

| Commande         | Effet                                                   |
| ---------------- | ------------------------------------------------------- |
| `npm run dev`    | site en direct avec rechargement automatique            |
| `npm run build`  | construit le site dans `dist/`                          |
| `npm run verif`  | vérifie tout (formatage, lint, règles, rendu mobile/PC) |
| `npm run shot`   | captures 390px et 1280px dans `shots/`                  |
| `npm run format` | corrige la mise en forme                                |

## Modifier les informations

Coordonnées, communes, prestations et mentions légales : `src/site.js`.

## Notes du projet

- [Zone d'intervention](docs/zone-intervention.md)
- Étude de la concurrence et grille de prix : `docs-prives/etude-concurrence.md` (privé, reste sur le PC)

Technique : Astro (site statique), Tailwind CSS compilé, GitHub Pages. Voir `CLAUDE.md` pour les règles.
