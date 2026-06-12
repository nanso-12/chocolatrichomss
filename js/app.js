/**
 * ChocolaTrichomes & Terps - Main Application Logic
 * Handles UI interactions, navigation, and dynamic content loading.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Telegram Web App (if running inside Telegram)
    if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.ready();
        tg.expand();
        
        // Apply Telegram theme colors if available
        if (tg.themeParams) {
            document.documentElement.style.setProperty('--bg-primary', tg.themeParams.bg_color || '#0B0B0E');
            document.documentElement.style.setProperty('--text-primary', tg.themeParams.text_color || '#F5F5F7');
        }
    }

    // DOM Elements
    const menuBtn = document.getElementById('menuBtn');
    const sidebar = document.getElementById('sidebar');
    const sidebarBackdrop = document.getElementById('sidebarBackdrop');
    const navItems = document.querySelectorAll('.nav-item');
    const mainContent = document.getElementById('mainContent');
    const sidebarItems = document.querySelectorAll('.sidebar-item');

    // --- Sidebar Toggle Logic ---
    function openSidebar() {
        sidebar.classList.add('active');
        sidebarBackdrop.classList.add('active');
    }

    function closeSidebar() {
        sidebar.classList.remove('active');
        sidebarBackdrop.classList.remove('active');
    }

    if (menuBtn) {
        menuBtn.addEventListener('click', openSidebar);
    }

    if (sidebarBackdrop) {
        sidebarBackdrop.addEventListener('click', closeSidebar);
    }

    // --- Bottom Navigation Logic ---
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');
            
            const page = item.getAttribute('data-page');
            handlePageChange(page);
        });
    });

    // --- Sidebar Category Logic ---
    sidebarItems.forEach(item => {
        item.addEventListener('click', () => {
            const category = item.getAttribute('data-category');
            
            // Update active state in sidebar
            sidebarItems.forEach(si => si.classList.remove('active'));
            item.classList.add('active');
            
            closeSidebar();
            loadCategoryContent(category);
        });
    });

    // --- Content Loading Handlers ---
    function handlePageChange(page) {
        console.log(`Navigating to page: ${page}`);
        
        // Reset main content
        mainContent.innerHTML = '';
        
        switch(page) {
            case 'home':
                mainContent.innerHTML = `
                    <div class="products-grid" id="productsGrid">
                        <div class="empty-state" style="grid-column:1/-1;text-align:center;padding:48px 20px">
                            <div class="empty-state-icon" style="font-size:40px">🏠</div>
                            <div class="empty-state-text">Bienvenue sur ChocolaTrichomes</div>
                            <div style="font-size:12px;color:var(--text-secondary);margin-top:6px">Sélectionnez une catégorie dans le menu</div>
                        </div>
                    </div>
                `;
                break;
            case 'search':
                mainContent.innerHTML = `
                    <div class="search-container" style="padding:20px">
                        <input type="text" placeholder="Rechercher un produit..." 
                            style="width:100%;padding:12px 16px;border-radius:var(--radius-md);border:1px solid var(--glass-border);background:var(--bg-elev-1);color:var(--text-primary);font-size:var(--fs-base);outline:none;">
                    </div>
                `;
                break;
            case 'favorites':
                mainContent.innerHTML = `
                    <div class="empty-state" style="grid-column:1/-1;text-align:center;padding:48px 20px">
                        <div class="empty-state-icon" style="font-size:40px">🤍</div>
                        <div class="empty-state-text">Aucun favori pour l'instant</div>
                        <div style="font-size:12px;color:var(--text-secondary);margin-top:6px">Appuie sur le ❤️ d'un produit pour l'ajouter ici</div>
                    </div>
                `;
                break;
            case 'profile':
                mainContent.innerHTML = `
                    <div class="empty-state" style="grid-column:1/-1;text-align:center;padding:48px 20px">
                        <div class="empty-state-icon" style="font-size:40px">👤</div>
                        <div class="empty-state-text">Profil Utilisateur</div>
                        <div style="font-size:12px;color:var(--text-secondary);margin-top:6px">Connexion requise</div>
                    </div>
                `;
                break;
        }
    }

    function loadCategoryContent(category) {
        console.log(`Loading category: ${category}`);
        mainContent.innerHTML = `
            <div class="empty-state" style="grid-column:1/-1;text-align:center;padding:48px 20px">
                <div class="empty-state-icon" style="font-size:40px">📦</div>
                <div class="empty-state-text">Chargement de la catégorie : ${category}</div>
                <div style="font-size:12px;color:var(--text-secondary);margin-top:6px">Les produits apparaîtront ici</div>
            </div>
        `;
        
        // TODO: Fetch actual product data from API based on category
        // fetch(`/api/products?category=${category}`)...
    }

    // Initialize default view
    handlePageChange('home');
});
