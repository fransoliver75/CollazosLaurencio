  // Inicializar partículas
        particlesJS("particles-js", {
            particles: {
                number: { value: 100, density: { enable: true, value_area: 800 } },
                color: { value: ["#FF006E", "#3A86FF", "#38B000", "#FF9E00", "#8338EC"] },
                shape: { type: "circle" },
                opacity: { value: 0.7, random: true },
                size: { value: 4, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#ffffff",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 3,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                }
            }
        });

        // Navegación por clics en el gráfico de evolución
        document.querySelectorAll('.chart-item').forEach(item => {
            item.addEventListener('click', function() {
                const versionId = this.getAttribute('data-version');
                
                // Remover clase active de todos los items
                document.querySelectorAll('.chart-item').forEach(i => {
                    i.classList.remove('active');
                });
                
                // Añadir clase active al item clickeado
                this.classList.add('active');
                
                // Navegar a la sección correspondiente
                const targetSection = document.getElementById(versionId);
                if (targetSection) {
                    // Remover clase active de todas las secciones
                    document.querySelectorAll('.version').forEach(version => {
                        version.classList.remove('active');
                    });
                    
                    // Añadir clase active a la sección objetivo
                    targetSection.classList.add('active');
                    
                    // Scroll suave a la sección
                    targetSection.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center'
                    });
                    
                    // Efecto de confeti
                    createConfetti(targetSection);
                }
            });
        });

        // Animación de aparición al hacer scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.version').forEach(version => {
            observer.observe(version);
        });

        // Función para copiar código
        function copyCode(button) {
            const codeElement = button.closest('.example').querySelector('.code');
            const textToCopy = codeElement.innerText;
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i> ¡Copiado!';
                button.style.background = 'rgba(56, 176, 0, 0.5)';
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.style.background = '';
                }, 2000);
            });
        }

        // Efecto de confeti
        function createConfetti(element) {
            const colors = ['#FF006E', '#3A86FF', '#38B000', '#FF9E00', '#8338EC'];
            const rect = element.getBoundingClientRect();
            
            for (let i = 0; i < 30; i++) {
                setTimeout(() => {
                    const confetti = document.createElement('div');
                    confetti.className = 'confetti';
                    confetti.style.left = `${rect.left + Math.random() * rect.width}px`;
                    confetti.style.top = `${rect.top}px`;
                    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    confetti.style.width = `${Math.random() * 10 + 5}px`;
                    confetti.style.height = `${Math.random() * 10 + 5}px`;
                    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                    document.body.appendChild(confetti);
                    
                    setTimeout(() => {
                        document.body.removeChild(confetti);
                    }, 5000);
                }, i * 100);
            }
        }

        // Botones de navegación flotantes
        const backToTop = document.getElementById('backToTop');
        const backToChart = document.getElementById('backToChart');
        const evolutionChart = document.getElementById('evolutionChart');

        // Mostrar/ocultar botones al hacer scroll
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            
            // Mostrar botón "Volver Arriba" después de cierto scroll
            if (scrollPosition > 500) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
            
            // Mostrar botón "Volver al Gráfico" cuando estamos en las secciones
            if (scrollPosition > evolutionChart.offsetTop + evolutionChart.offsetHeight) {
                backToChart.classList.add('show');
            } else {
                backToChart.classList.remove('show');
            }
        });

        // Funcionalidad del botón "Volver Arriba"
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Funcionalidad del botón "Volver al Gráfico"
        backToChart.addEventListener('click', function() {
            evolutionChart.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        });

        // Efecto de máquina de escribir en el título
        document.addEventListener('DOMContentLoaded', function() {
            const title = document.querySelector('h1');
            title.classList.add('typewriter');
            
            // Activar el primer elemento del gráfico por defecto
            document.querySelector('.chart-item').classList.add('active');
            document.getElementById('html2').classList.add('active');
        });