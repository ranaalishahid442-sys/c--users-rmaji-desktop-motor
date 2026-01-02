document.addEventListener('DOMContentLoaded', () => {

    // --- State Management ---
    const state = {
        cart: JSON.parse(localStorage.getItem('bikelo_cart')) || [],
        products: typeof shopData !== 'undefined' ? shopData.products : [],
        categories: typeof shopData !== 'undefined' ? shopData.categories : []
    };

    // --- DOM Elements ---
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Cart Elements
    const cartContentArea = document.getElementById('cart-content-area');
    const summarySubtotal = document.getElementById('summary-subtotal');
    const summaryTotal = document.getElementById('summary-total');
    const cartCountBadges = document.querySelectorAll('.cart-count');

    // --- Navigation Logic ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            navLinks.classList.toggle('active-mobile');
        });
    }

    // --- Core Cart Logic ---
    const updateCartState = () => {
        localStorage.setItem('bikelo_cart', JSON.stringify(state.cart));
        updateCartCount();
        if (document.body.classList.contains('cart-page')) {
            renderCartPage();
        }
    };

    const updateCartCount = () => {
        const count = state.cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountBadges.forEach(badge => badge.textContent = count);
    };

    const addToCart = (product, qty = 1, buttonEl = null) => {
        const existingItem = state.cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += parseInt(qty);
        } else {
            state.cart.push({ ...product, quantity: parseInt(qty) });
        }
        updateCartState();

        // Visual Feedback (Button Text)
        if (buttonEl) {
            const originalText = buttonEl.textContent;
            buttonEl.textContent = "Added to Garage!";
            buttonEl.classList.add('btn-success');
            setTimeout(() => {
                buttonEl.textContent = originalText;
                buttonEl.classList.remove('btn-success');
            }, 2000);
        }
    };

    const removeFromCart = (index) => {
        state.cart.splice(index, 1);
        updateCartState();
    };


    // --- Page Specific Rendering ---

    // 1. Cart Page Logic
    const renderCartPage = () => {
        if (!cartContentArea) return;

        if (state.cart.length === 0) {
            cartContentArea.innerHTML = '<div class="empty-cart-msg">Your garage is empty. <a href="shop.html">Go to Shop</a></div>';
            if (summarySubtotal) summarySubtotal.textContent = 'Rs. 0';
            if (summaryTotal) summaryTotal.textContent = 'Rs. 0';
            return;
        }

        // Build Table HTML
        let tableHTML = `
            <table class="cart-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
        `;

        let total = 0;

        state.cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            tableHTML += `
                <tr>
                    <td>
                        <div class="cart-product-info">
                            <img src="${item.image}" alt="${item.name}">
                            <div class="info-text">
                                <span class="name">${item.name}</span>
                                <span class="id">ID: ${item.id}</span>
                            </div>
                        </div>
                    </td>
                    <td data-label="Price">Rs. ${item.price.toLocaleString()}</td>
                    <td data-label="Quantity">
                        <div class="cart-qty-control">
                            <input type="number" min="1" value="${item.quantity}" readonly>
                        </div>
                    </td>
                    <td data-label="Total">Rs. ${itemTotal.toLocaleString()}</td>
                    <td data-label="Action"><button class="remove-btn" data-index="${index}">&times;</button></td>
                </tr>
            `;
        });

        tableHTML += `</tbody></table>`;
        cartContentArea.innerHTML = tableHTML;

        if (summarySubtotal) summarySubtotal.textContent = `Rs. ${total.toLocaleString()}`;
        if (summaryTotal) summaryTotal.textContent = `Rs. ${total.toLocaleString()}`;

        // Bind Remove Buttons
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.target.dataset.index);
                removeFromCart(idx);
            });
        });
    };

    // Initial Render for Cart Page
    if (document.body.classList.contains('cart-page')) {
        renderCartPage();
    }


    // 2. Shop Page Rendering
    const shopContainer = document.getElementById('shop-container');
    if (document.body.classList.contains('shop-page') && shopContainer) {
        state.categories.forEach(cat => {
            const categoryProducts = state.products.filter(p => p.categoryId === cat.id);
            if (categoryProducts.length === 0) return;

            const catSection = document.createElement('div');
            catSection.className = 'category-row';
            catSection.id = cat.id;

            const catTitle = document.createElement('h3');
            catTitle.className = 'category-title';
            catTitle.textContent = cat.name;

            const grid = document.createElement('div');
            grid.className = 'products-grid';

            categoryProducts.forEach(product => {
                const card = document.createElement('div');
                card.className = 'product-card';
                card.innerHTML = `
                    <div class="card-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="card-info">
                        <h4>${product.name}</h4>
                        <div class="price">Rs. ${product.price.toLocaleString()}</div>
                    </div>
                    <a href="product.html?id=${product.id}" class="card-link-overlay" style="position:absolute; top:0; left:0; width:100%; height:100%; z-index:1;"></a>
                `;
                grid.appendChild(card);
            });

            catSection.appendChild(catTitle);
            catSection.appendChild(grid);
            shopContainer.appendChild(catSection);
        });
    }

    // 3. Product Detail Page Logic
    if (document.body.classList.contains('product-page')) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        const product = state.products.find(p => p.id === productId);

        if (product) {
            const category = state.categories.find(c => c.id === product.categoryId);
            const categoryName = category ? category.name : 'Parts';

            document.getElementById('product-title').textContent = product.name;
            document.getElementById('product-price').textContent = `Rs. ${product.price.toLocaleString()}`;
            document.getElementById('product-desc').textContent = `${product.name} is a premium ${categoryName} component designed for high performance and durability on Pakistani roads.`;

            const catEl = document.getElementById('product-category');
            if (catEl) catEl.textContent = categoryName;

            document.getElementById('main-product-img').src = product.image;

            // Add to Cart Button
            const addBtn = document.getElementById('add-to-cart-btn');
            const qtyInput = document.getElementById('qty-input');

            if (addBtn) {
                addBtn.addEventListener('click', () => {
                    addToCart(product, qtyInput.value, addBtn);
                });
            }

            // Quantity Buttons
            const minusBtn = document.querySelector('.minus');
            const plusBtn = document.querySelector('.plus');
            if (minusBtn) minusBtn.addEventListener('click', () => { if (qtyInput.value > 1) qtyInput.value--; });
            if (plusBtn) plusBtn.addEventListener('click', () => { qtyInput.value++; });
        }
    }

    // Init Cart Count
    updateCartCount();

});
