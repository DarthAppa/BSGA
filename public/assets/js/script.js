// ==========================================
//   BSGA — Script principal (menu, lien actif)
// ==========================================
document.documentElement.classList.replace('no-js', 'js');

document.addEventListener('DOMContentLoaded', () => {
    /* ---------- Lien de la page en cours (aria-current) ---------- */
    const dernier = location.pathname.split('/').pop() || 'index.html';
    const pageCourante = dernier.endsWith('.html') ? dernier : `${dernier}.html`;
    document.querySelectorAll('.nav-link').forEach((a) => {
        if (a.getAttribute('href') === pageCourante) a.setAttribute('aria-current', 'page');
    });

    /* ---------- Menu mobile ---------- */
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobile-menu');
    if (burger && mobileMenu) {
        const ouvrir = (ouvert) => {
            mobileMenu.classList.toggle('hidden', !ouvert);
            burger.setAttribute('aria-expanded', String(ouvert));
        };
        burger.addEventListener('click', () => ouvrir(mobileMenu.classList.contains('hidden')));
        mobileMenu.addEventListener('click', (e) => {
            if (e.target.closest('a')) ouvrir(false);
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
                ouvrir(false);
                burger.focus();
            }
        });
    }
});
