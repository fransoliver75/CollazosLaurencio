// Efecto de cambio de transparencia en la barra de navegación al hacer scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'var(--netflix-black)';
    } else {
        navbar.style.background = 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)';
    }
});

// Efectos de hover mejorados para los elementos del carrusel
document.querySelectorAll('.carousel-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.5)';
        this.style.zIndex = '10';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.boxShadow = 'none';
        this.style.zIndex = '1';
    });
});

// Simulación de funcionalidad de los botones
document.querySelector('.btn-play').addEventListener('click', function() {
    alert('Reproduciendo "La Casa de Papel"');
});

document.querySelector('.btn-list').addEventListener('click', function() {
    alert('"La Casa de Papel" añadida a tu lista');
});