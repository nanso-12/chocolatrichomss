document.addEventListener('DOMContentLoaded', () => {
    // Initialisation de l'application Telegram (si utilisée dans Telegram)
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();
    }

    // Sélection des éléments
    const menuBtn = document.getElementById('menuBtn');
    const sidebar = document.getElementById('sidebar');
    const sidebarBackdrop = document.getElementById('sidebarBackdrop');
    const navItems = document.querySelectorAll('.nav-item');
    const sidebarItems = document.querySelectorAll('.sidebar-item');

    // Fonction pour ouvrir/fermer le menu latéral
    function toggleSidebar() {
        sidebar.classList.toggle('active');
        sidebarBackdrop.classList.toggle('active');
    }

    // Événement bouton menu
    if (menuBtn) {
        menuBtn.addEventListener('click', toggleSidebar);
    }

    // Événement clic en dehors du menu pour le fermer
    if (sidebarBackdrop) {
        sidebarBackdrop.addEventListener('click', toggleSidebar);
    }

    // Gestion de la navigation du bas (changement d'onglet actif)
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Gestion du menu latéral (changement de catégorie active)
    sidebarItems.forEach(item => {
        item.addEventListener('click', () => {
            sidebarItems.forEach(si => si.classList.remove('active'));
            item.classList.add('active');
            toggleSidebar(); // Ferme le menu après le choix
        });
    });
});
