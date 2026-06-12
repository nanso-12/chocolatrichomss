/**
 * ChocolaTrichomes & Terps - Main Application Logic
 * Handles UI interactions, navigation, and dynamic content loading.
 */

// --- Mock Database (Extrait de vos fichiers HTML d'origine) ---
const productsDB = [
    { id: 1, name: "Tekmache", category: "Beldia", price: "24 DH/g", image: "⚡️⚡️", stock: "out" },
    { id: 2, name: "Beldiya Issagen", category: "Beldia", price: "30 DH/g", image: "🌰🏔️", stock: "out" },
    { id: 3, name: "Premium Drysift", category: "Drysift", price: "60 DH/g", image: "🏔️", stock: "in" },
    { id: 4, name: "Frozen Gelato", category: "Frozen", price: "80 DH/g", image: "🧊", stock: "in" },
    { id: 5, name: "Static Haze", category: "Static", price: "70 DH/g", image: "⚡", stock: "in" },
    { id: 6, name: "Ice O'Lator Special", category: "IceOlator", price: "90 DH/g", image: "💧", stock: "in" },
    { id: 7, name: "Kit de Culture", category: "garden", price: "150 DH", image: "🌱", stock: "in" },
    { id: 8, name: "Vaporisateur Herbal", category: "herbvape", price: "350 DH", image: "💨", stock: "in" }
];

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
    function renderProducts(productsToRender) {
        if (productsToRender.length === 0) {
            return `
                <div class="empty-state" style="grid-column:1/-1;text-align:center;padding:48px 20px">
                    <div class="empty-state-icon" style="font-size:40px">🔍</div>
                    <div class="empty-state-text">Aucun produit trouvé</div>
                </div>
            `;
        }

        return productsToRender.map(product => {
            const stockClass = product.stock === 'out' ? 'out-of-stock' : '';
            const stockBadge = product.stock === 'out' ? '<div class="card-badges"><div class="stock-dot out"><span class="dot"></span>Out</div></div>' : '';
            const btnDisabled = product.stock === 'out' ? 'disabled' : '';
            
            return `
                <div class="product-card theme-dark ${stockClass}" style="animation-delay:0s">
                    <div class="card-media">
                        <div class="card-media-inner">
                            <span class="card-emoji-poster" style="font-size:48px;display:flex;align-items:center;justify-content:center;height:100%">${product.image}</span>
                        </div>
                        ${stockBadge}
                    </div>
                    <div class="card-info">
                        <span class="card-category-tag">${product.category}</span>
                        <div class="card-title">${product.name}</div>
                        <div class="card-bottom">
                            <span class="card-price">${product.price}</span>
                            <button class="card-add-btn" ${btnDisabled}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    function handlePageChange(page) {
        console.log(`Navigating to page: ${page}`);
        
        switch(page) {
            case 'home':
                mainContent.innerHTML = `<div class="products-grid" id="productsGrid">${renderProducts(productsDB)}</div>`;
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
        
        let filteredProducts = productsDB;
        if (category !== 'all') {
            filteredProducts = productsDB.filter(p => p.category.toLowerCase() === category.toLowerCase());
        }
        
        mainContent.innerHTML = `<div class="products-grid" id="productsGrid">${renderProducts(filteredProducts)}</div>`;
    }

    // Initialize default view
    handlePageChange('home');
});
