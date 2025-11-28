
        // Datos de ejemplo para productos
        let products = [
            {
                id: 1,
                name: "Camiseta Básica Negra",
                category: "camisetas",
                price: 24.99,
                stock: 50,
                description: "Camiseta de algodón 100% básica en color negro.",
                image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
            },
            {
                id: 2,
                name: "Jeans Clásicos Azules",
                category: "pantalones",
                price: 49.99,
                stock: 30,
                description: "Jeans de corte clásico en color azul.",
                image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
            },
            {
                id: 3,
                name: "Vestido Floral Verano",
                category: "vestidos",
                price: 59.99,
                stock: 25,
                description: "Vestido floral perfecto para el verano.",
                image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
            }
        ];
        
        let editingProductId = null;
        
        document.addEventListener('DOMContentLoaded', function() {
            // Tabs functionality
            document.querySelectorAll('.tab').forEach(tab => {
                tab.addEventListener('click', () => {
                    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                    
                    tab.classList.add('active');
                    document.getElementById(`${tab.dataset.tab}-tab`).classList.add('active');
                });
            });
            
            // Mostrar/Ocultar formulario de producto
            document.getElementById('new-product-btn').addEventListener('click', function() {
                document.getElementById('product-form').style.display = 'block';
                document.getElementById('form-title').textContent = 'Agregar Nuevo Producto';
                editingProductId = null;
                resetProductForm();
            });
            
            document.getElementById('cancel-product').addEventListener('click', function() {
                document.getElementById('product-form').style.display = 'none';
                editingProductId = null;
            });
            
            // Guardar producto
            document.getElementById('save-product').addEventListener('click', saveProduct);
            
            // Cargar productos al iniciar
            loadProducts();
            
            // Configurar subida de imágenes
            setupImageUpload();
        });
        
        function loadProducts() {
            const productsList = document.getElementById('products-list');
            productsList.innerHTML = '';
            
            if (products.length === 0) {
                productsList.innerHTML = '<p style="text-align: center; padding: 20px; color: var(--gray);">No hay productos registrados.</p>';
                return;
            }
            
            products.forEach(product => {
                const productItem = document.createElement('div');
                productItem.className = 'product-item';
                productItem.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <div class="product-details">
                        <div class="product-name">${product.name}</div>
                        <div class="product-category">${getCategoryName(product.category)} - Stock: ${product.stock}</div>
                        <div class="product-price">$${product.price.toFixed(2)}</div>
                    </div>
                    <div class="product-actions">
                        <button class="action-btn edit-btn" onclick="editProduct(${product.id})" title="Editar producto">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn delete-btn" onclick="deleteProduct(${product.id})" title="Eliminar producto">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                productsList.appendChild(productItem);
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
        
        function saveProduct() {
            const name = document.getElementById('product-name').value;
            const category = document.getElementById('product-category').value;
            const price = parseFloat(document.getElementById('product-price').value);
            const stock = parseInt(document.getElementById('product-stock').value);
            const description = document.getElementById('product-description').value;
            const imageFile = document.getElementById('product-image').files[0];
            
            if (!name || !category || !price || !stock || !description) {
                alert('Por favor, completa todos los campos obligatorios.');
                return;
            }
            
            let imageUrl = '';
            if (imageFile) {
                // En una aplicación real, aquí subirías la imagen a un servidor
                imageUrl = URL.createObjectURL(imageFile);
            } else if (editingProductId) {
                // Mantener la imagen existente si no se sube una nueva
                const existingProduct = products.find(p => p.id === editingProductId);
                imageUrl = existingProduct.image;
            } else {
                alert('Por favor, selecciona una imagen para el producto.');
                return;
            }
            
            if (editingProductId) {
                // Editar producto existente
                const index = products.findIndex(p => p.id === editingProductId);
                products[index] = {
                    id: editingProductId,
                    name,
                    category,
                    price,
                    stock,
                    description,
                    image: imageUrl
                };
            } else {
                // Agregar nuevo producto
                const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
                products.push({
                    id: newId,
                    name,
                    category,
                    price,
                    stock,
                    description,
                    image: imageUrl
                });
            }
            
            loadProducts();
            document.getElementById('product-form').style.display = 'none';
            editingProductId = null;
            alert('Producto guardado correctamente.');
        }
        
        function editProduct(id) {
            const product = products.find(p => p.id === id);
            if (!product) return;
            
            document.getElementById('product-form').style.display = 'block';
            document.getElementById('form-title').textContent = 'Editar Producto';
            
            document.getElementById('product-name').value = product.name;
            document.getElementById('product-category').value = product.category;
            document.getElementById('product-price').value = product.price;
            document.getElementById('product-stock').value = product.stock;
            document.getElementById('product-description').value = product.description;
            
            editingProductId = id;
        }
        
        function deleteProduct(id) {
            if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
                products = products.filter(p => p.id !== id);
                loadProducts();
                alert('Producto eliminado correctamente.');
            }
        }
        
        function resetProductForm() {
            document.getElementById('product-name').value = '';
            document.getElementById('product-category').value = 'camisetas';
            document.getElementById('product-price').value = '';
            document.getElementById('product-stock').value = '';
            document.getElementById('product-description').value = '';
            document.getElementById('product-image').value = '';
        }
        
        function setupImageUpload() {
            const uploadAreas = document.querySelectorAll('.upload-area');
            const fileInputs = document.querySelectorAll('.file-input');
            
            uploadAreas.forEach((area, index) => {
                area.addEventListener('click', () => {
                    fileInputs[index].click();
                });
                
                area.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    area.classList.add('active');
                });
                
                area.addEventListener('dragleave', () => {
                    area.classList.remove('active');
                });
                
                area.addEventListener('drop', (e) => {
                    e.preventDefault();
                    area.classList.remove('active');
                    
                    if (e.dataTransfer.files.length) {
                        fileInputs[index].files = e.dataTransfer.files;
                        handleFileUpload(fileInputs[index], `${area.id.replace('-area', '-preview')}`);
                    }
                });
            });
            
            fileInputs.forEach(input => {
                input.addEventListener('change', function() {
                    const previewId = this.id.replace('-input', '-preview');
                    handleFileUpload(this, previewId);
                });
            });
            
            document.getElementById('save-images').addEventListener('click', function() {
                alert('Imágenes guardadas correctamente.');
            });
        }
        
        function handleFileUpload(input, previewId) {
            const files = input.files;
            const previewContainer = document.getElementById(previewId);
            
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                
                if (!file.type.match('image.*')) {
                    alert('Por favor, selecciona solo archivos de imagen.');
                    continue;
                }
                
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    const previewImage = document.createElement('div');
                    previewImage.className = 'preview-image';
                    previewImage.innerHTML = `
                        <img src="${e.target.result}" alt="Vista previa">
                        <div class="remove-image"><i class="fas fa-times"></i></div>
                    `;
                    
                    previewContainer.appendChild(previewImage);
                    
                    previewImage.querySelector('.remove-image').addEventListener('click', function() {
                        previewImage.remove();
                    });
                };
                
                reader.readAsDataURL(file);
            }
        }
    