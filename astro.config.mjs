// Configuration Astro : site 100 % statique, publié sur GitHub Pages.
// format 'file' : src/pages/contact.astro → dist/contact.html
// Les liens du site sont relatifs (« contact.html », « assets/… ») : ils marchent aussi bien sous
// darthappa.github.io/BSGA/ qu'avec un futur nom de domaine.
import { defineConfig } from 'astro/config';

export default defineConfig({
    site: 'https://darthappa.github.io',
    base: '/BSGA',
    build: { format: 'file' },
    trailingSlash: 'ignore',
    // HTML lisible, identique à la mise en forme des sources
    compressHTML: false,
    devToolbar: { enabled: false },
});
