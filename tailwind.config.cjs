// Config Tailwind (compilée par tools/build-css.mjs → public/assets/css/tailwind.css, fichier généré non suivi par git).
// Chaque couleur a son équivalent --var dans public/assets/css/style.css : à modifier aux deux endroits.
// VALEURS PROVISOIRES : l'identité visuelle définitive est choisie en phase 2 (maquette).
module.exports = {
    content: ['./src/**/*.{astro,js}', './public/assets/js/*.js'],
    theme: {
        extend: {
            colors: {
                fond: '#FFFFFF', // fond de page
                surface: '#F3F6F5', // blocs, encadrés
                encre: '#17242A', // texte principal
                encreDouce: '#4D5B61', // texte secondaire
                ligne: '#D5DDDB', // bordures, séparateurs
                accent: '#1F6F5C', // boutons, liens
                accentFonce: '#16523F', // survol des boutons
            },
            fontFamily: {
                sans: ['system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
