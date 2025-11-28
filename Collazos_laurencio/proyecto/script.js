
        document.addEventListener('DOMContentLoaded', function() {
            const roleOptions = document.querySelectorAll('.role-option');
            const loginBtn = document.getElementById('login-btn');
            const errorMessage = document.getElementById('error-message');
            let selectedRole = 'admin';
            
            // Seleccionar rol
            roleOptions.forEach(option => {
                option.addEventListener('click', function() {
                    roleOptions.forEach(opt => opt.classList.remove('selected'));
                    this.classList.add('selected');
                    selectedRole = this.dataset.role;
                });
            });
            
            // Manejar login
            loginBtn.addEventListener('click', function() {
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;
                
                // Validar credenciales
                if (selectedRole === 'admin' && username === 'admin' && password === '1234') {
                    // Redirigir a panel de administrador
                    window.location.href = 'admin.html';
                } else if (selectedRole === 'client' && username === 'cliente' && password === '1234') {
                    // Redirigir a tienda para clientes
                    window.location.href = 'cliente.html';
                } else {
                    // Mostrar error
                    errorMessage.style.display = 'block';
                    setTimeout(() => {
                        errorMessage.style.display = 'none';
                    }, 3000);
                }
            });
            
            // Permitir login con Enter
            document.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    loginBtn.click();
                }
            });
        });
   