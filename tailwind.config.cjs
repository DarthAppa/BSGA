// Config Tailwind (compilée par tools/build-css.mjs → public/assets/css/tailwind.css, fichier généré non suivi par git).
// Chaque couleur a son équivalent --var dans public/assets/css/style.css : à modifier aux deux endroits.
// Identité « noir et or » (maquette Figma, proposition 1 du 24/10/2026).
module.exports = {
    content: ['./src/**/*.{astro,js}', './public/assets/js/*.js'],
    theme: {
        extend: {
            colors: {
                fond: '#0E0D0C', // fond de page
                surface: '#1A1816', // sections alternées, cartes
                surfaceHaute: '#24211E', // encarts mis en avant
                encre: '#F4EFE7', // texte principal
                encreDouce: '#B8AFA2', // texte secondaire (contraste ≈ 9:1 sur fond)
                ligne: '#5C4B2F', // bordures, séparateurs
                accent: '#C9A45C', // or : boutons, titres, icônes
                accentClair: '#E3C78E', // or clair : liens, survol
                surAccent: '#14110D', // texte posé sur l'or
            },
            fontFamily: {
                sans: ['"Fira Sans"', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'sans-serif'],
                titre: ['"Playfair Display"', 'Georgia', '"Times New Roman"', 'serif'],
            },
        },
    },
    plugins: [],
};
