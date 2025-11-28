
        // Datos de productos (simulando base de datos)
        const products = [
            {
                id: 1,
                name: "Camiseta Básica Negra",
                category: "camisetas",
                price: 24.99,
                image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                description: "Camiseta de algodón 100% básica en color negro."
            },
            {
                id: 2,
                name: "Jeans Clásicos Azules",
                category: "pantalones",
                price: 49.99,
                image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                description: "Jeans de corte clásico en color azul."
            },
            {
                id: 3,
                name: "Vestido Floral Verano",
                category: "vestidos",
                price: 59.99,
                image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                description: "Vestido floral perfecto para el verano."
            },
            {
                id: 4,
                name: "Bolso de Cuero Negro",
                category: "accesorios",
                price: 79.99,
                image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                description: "Bolso de cuero genuino en color negro."
            },
            {
                id: 5,
                name: "Camiseta Manga Larga",
                category: "camisetas",
                price: 29.99,
                image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                description: "Camiseta de manga larga para climas fríos."
            },
            {
                id: 6,
                name: "Vestido Negro Elegante",
                category: "vestidos",
                price: 69.99,
                image: "https://images.unsplash.com/photo-1585487000127-1c3b0efb32c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                description: "Vestido negro elegante para ocasiones especiales."
            }
        ];
        
        let cart = [];
        let wishlist = [];
        
        document.addEventListener('DOMContentLoaded', function() {
            // Cargar productos
            loadProducts();
            
            // Configurar filtros de categoría
            setupCategoryFilters();
            
            // Configurar carrito
            setupCart();
            
            // Actualizar contador del carrito
            updateCartCount();
        });
        
        function loadProducts(filterCategory = 'all') {
            const productsGrid = document.getElementById('products-grid');
            productsGrid.innerHTML = '';
            
            const filteredProducts = filterCategory === 'all' 
                ? products 
                : products.filter(product => product.category === filterCategory);
            
            if (filteredProducts.length === 0) {
                productsGrid.innerHTML = '<p style="text-align: center; grid-column: 1 / -1; padding: 40px; color: var(--gray);">No hay productos en esta categoría.</p>';
                return;
            }
            
            filteredProducts.forEach(product => {
                const isInWishlist = wishlist.includes(product.id);
                
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <div class="product-info">
                        <div class="product-category">${getCategoryName(product.category)}</div>
                        <h3 class="product-name">${product.name}</h3>
                        <div class="product-price">$${product.price.toFixed(2)}</div>
                        <div class="product-actions">
                            <button class="add-to-cart" data-id="${product.id}">Añadir al Carrito</button>
                            <button class="wishlist ${isInWishlist ? 'active' : ''}" data-id="${product.id}">
                                <i class="${isInWishlist ? 'fas' : 'far'} fa-heart"></i>
                            </button>
                        </div>
                    </div>
                `;
                productsGrid.appendChild(productCard);
            });
            
            // Agregar event listeners a los botones
            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = parseInt(this.dataset.id);
                    addToCart(productId);
                });
            });
            
            document.querySelectorAll('.wishlist').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = parseInt(this.dataset.id);
                    toggleWishlist(productId, this);
                });
            });
        }
        
        function getCategoryName(category) {
            const categories = {
                'camisetas': 'Camisetas',
                'pantalones': 'Pantalones',
                'vestidos': 'Vestidos',
                'accesorios': 'Accesorios'
            };
            return categories[category] || category;
        }
        
        function setupCategoryFilters() {
            document.querySelectorAll('.category-filter').forEach(filter => {
                filter.addEventListener('click', function() {
                    document.querySelectorAll('.category-filter').forEach(f => f.classList.remove('active'));
                    this.classList.add('active');
                    
                    const category = this.dataset.category;
                    loadProducts(category);
                });
            });
        }
        
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            if (!product) return;
            
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1
                });
            }
            
            updateCartCount();
            updateCartDisplay();
            alert('Producto añadido al carrito');
        }
        
        function toggleWishlist(productId, button) {
            const index = wishlist.indexOf(productId);
            const icon = button.querySelector('i');
            
            if (index === -1) {
                // Agregar a wishlist
                wishlist.push(productId);
                button.classList.add('active');
                icon.classList.remove('far');
                icon.classList.add('fas');
                alert('Producto añadido a favoritos');
            } else {
                // Remover de wishlist
                wishlist.splice(index, 1);
                button.classList.remove('active');
                icon.classList.remove('fas');
                icon.classList.add('far');
                alert('Producto removido de favoritos');
            }
        }
        
        function setupCart() {
            const cartIcon = document.getElementById('cart-icon');
            const closeCart = document.getElementById('close-cart');
            const overlay = document.getElementById('overlay');
            const cartSidebar = document.getElementById('cart-sidebar');
            
            cartIcon.addEventListener('click', function() {
                cartSidebar.classList.add('active');
                overlay.classList.add('active');
            });
            
            closeCart.addEventListener('click', function() {
                cartSidebar.classList.remove('active');
                overlay.classList.remove('active');
            });
            
            overlay.addEventListener('click', function() {
                cartSidebar.classList.remove('active');
                overlay.classList.remove('active');
            });
            
            document.getElementById('checkout-btn').addEventListener('click', function() {
                if (cart.length === 0) {
                    alert('Tu carrito está vacío');
                    return;
                }
                
                alert('¡Gracias por tu compra! Total: $' + getCartTotal().toFixed(2));
                cart = [];
                updateCartCount();
                updateCartDisplay();
                cartSidebar.classList.remove('active');
                overlay.classList.remove('active');
            });
        }
        
        function updateCartCount() {
            const cartCount = document.querySelector('.cart-count');
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
        
        function updateCartDisplay() {
            const cartItems = document.getElementById('cart-items');
            const cartTotal = document.getElementById('cart-total');
            
            cartItems.innerHTML = '';
            
            if (cart.length === 0) {
                cartItems.innerHTML = '<p style="text-align: center; padding: 40px; color: var(--gray);">Tu carrito está vacío</p>';
                cartTotal.textContent = '$0.00';
                return;
            }
            
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        <div class="cart-item-actions">
                            <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn increase" data-id="${item.id}">+</button>
                            <button class="remove-item" data-id="${item.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `;
                cartItems.appendChild(cartItem);
            });
            
            // Agregar event listeners a los botones del carrito
            document.querySelectorAll('.decrease').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = parseInt(this.dataset.id);
                    decreaseQuantity(productId);
                });
            });
            
            document.querySelectorAll('.increase').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = parseInt(this.dataset.id);
                    increaseQuantity(productId);
                });
            });
            
            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = parseInt(this.dataset.id);
                    removeFromCart(productId);
                });
            });
            
            cartTotal.textContent = '$' + getCartTotal().toFixed(2);
        }
        
        function increaseQuantity(productId) {
            const item = cart.find(item => item.id === productId);
            if (item) {
                item.quantity += 1;
                updateCartCount();
                updateCartDisplay();
            }
        }
        
        function decreaseQuantity(productId) {
            const item = cart.find(item => item.id === productId);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    removeFromCart(productId);
                    return;
                }
                updateCartCount();
                updateCartDisplay();
            }
        }
        
        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            updateCartCount();
            updateCartDisplay();
        }
        
        function getCartTotal() {
            return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        }
   