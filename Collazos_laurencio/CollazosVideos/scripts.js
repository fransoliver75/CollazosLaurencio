
        // JavaScript (igual que antes, manteniendo toda la funcionalidad)
        // Ejercicio 1: Cambiar formatos y tamaños de video
        function changeVideoFormat(format) {
            const video = document.getElementById('video1');
            const sources = video.getElementsByTagName('source');
            
            if (format === 'mp4') {
                sources[0].src = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
                sources[0].type = 'video/mp4';
            } else if (format === 'webm') {
                sources[0].src = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
                sources[0].type = 'video/webm';
            }
            
            video.load();
            video.play();
        }
        
        function changeVideoSize(size) {
            const video = document.getElementById('video1');
            const container = document.querySelector('.video-container');
            
            if (size === 'small') {
                video.width = 600;
                video.height = 338;
                container.style.maxWidth = '600px';
            } else if (size === 'medium') {
                video.width = 800;
                video.height = 450;
                container.style.maxWidth = '800px';
            } else if (size === 'large') {
                video.width = 1000;
                video.height = 563;
                container.style.maxWidth = '1000px';
            }
        }
        
        // Ejercicio 2: Control de subtítulos
        document.addEventListener('DOMContentLoaded', function() {
            const subtitleVideo = document.getElementById('subtitle-video');
            const toggleSubtitlesBtn = document.getElementById('toggle-subtitles');
            const changeLanguageBtn = document.getElementById('change-language');
            const downloadSubtitlesBtn = document.getElementById('download-subtitles');
            let subtitlesEnabled = true;
            let currentLanguage = 'es';
            
            toggleSubtitlesBtn.addEventListener('click', function() {
                const textTracks = subtitleVideo.textTracks;
                for (let i = 0; i < textTracks.length; i++) {
                    textTracks[i].mode = subtitlesEnabled ? 'hidden' : 'showing';
                }
                subtitlesEnabled = !subtitlesEnabled;
                toggleSubtitlesBtn.innerHTML = subtitlesEnabled ? 
                    '<i class="fas fa-cc"></i> Ocultar Subtítulos' : 
                    '<i class="fas fa-cc"></i> Mostrar Subtítulos';
            });
            
            changeLanguageBtn.addEventListener('click', function() {
                const textTracks = subtitleVideo.textTracks;
                for (let i = 0; i < textTracks.length; i++) {
                    if (textTracks[i].language === currentLanguage) {
                        textTracks[i].mode = 'hidden';
                    }
                }
                
                currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
                
                for (let i = 0; i < textTracks.length; i++) {
                    if (textTracks[i].language === currentLanguage && subtitlesEnabled) {
                        textTracks[i].mode = 'showing';
                    }
                }
                
                changeLanguageBtn.innerHTML = currentLanguage === 'es' ? 
                    '<i class="fas fa-language"></i> Cambiar a Inglés' : 
                    '<i class="fas fa-language"></i> Cambiar a Español';
            });
            
            downloadSubtitlesBtn.addEventListener('click', function() {
                alert('Funcionalidad de descarga de subtítulos activada. En una implementación real, aquí se descargaría el archivo VTT.');
            });
            
            // Ejercicio 3: Cambiar mensaje según la hora del día
            const saludoElement = document.getElementById('saludo');
            const hora = new Date().getHours();
            
            if (hora < 12) {
                saludoElement.textContent = '¡BUENOS DÍAS! EMPECEMOS EL CURSO';
                saludoElement.style.color = 'var(--warning)';
            } else if (hora < 18) {
                saludoElement.textContent = '¡BUENAS TARDES! CONTINUEMOS APRENDIENDO';
                saludoElement.style.color = 'var(--accent)';
            } else {
                saludoElement.textContent = '¡BUENAS NOCHES! MOMENTO DE PRACTICAR';
                saludoElement.style.color = 'var(--secondary)';
            }
            
            // Ejercicio 5: Controles personalizados avanzados
            const video = document.getElementById('custom-video');
            const playBtn = document.getElementById('play-btn');
            const pauseBtn = document.getElementById('pause-btn');
            const stopBtn = document.getElementById('stop-btn');
            const rewindBtn = document.getElementById('rewind-btn');
            const forwardBtn = document.getElementById('forward-btn');
            const muteBtn = document.getElementById('mute-btn');
            const volumeSlider = document.getElementById('volume-slider');
            const fullscreenBtn = document.getElementById('fullscreen-btn');
            const pipBtn = document.getElementById('pip-btn');
            const speedBtns = document.querySelectorAll('.speed-btn');
            const currentTimeDisplay = document.getElementById('current-time');
            const durationDisplay = document.getElementById('duration');
            const progressBar = document.getElementById('progress-bar');
            const progress = document.getElementById('progress');
            
            // Actualizar el tiempo transcurrido y la barra de progreso
            video.addEventListener('timeupdate', function() {
                const minutos = Math.floor(video.currentTime / 60);
                const segundos = Math.floor(video.currentTime % 60);
                currentTimeDisplay.textContent = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
                
                const durationMinutos = Math.floor(video.duration / 60);
                const durationSegundos = Math.floor(video.duration % 60);
                durationDisplay.textContent = `${durationMinutos.toString().padStart(2, '0')}:${durationSegundos.toString().padStart(2, '0')}`;
                
                const progressPercent = (video.currentTime / video.duration) * 100;
                progress.style.width = `${progressPercent}%`;
            });
            
            // Reproducir video
            playBtn.addEventListener('click', function() {
                video.play();
            });
            
            // Pausar video
            pauseBtn.addEventListener('click', function() {
                video.pause();
            });
            
            // Detener video (pausar y volver al inicio)
            stopBtn.addEventListener('click', function() {
                video.pause();
                video.currentTime = 0;
            });
            
            // Retroceder 10 segundos
            rewindBtn.addEventListener('click', function() {
                video.currentTime = Math.max(0, video.currentTime - 10);
            });
            
            // Adelantar 10 segundos
            forwardBtn.addEventListener('click', function() {
                video.currentTime = Math.min(video.duration, video.currentTime + 10);
            });
            
            // Silenciar/activar sonido
            muteBtn.addEventListener('click', function() {
                video.muted = !video.muted;
                muteBtn.innerHTML = video.muted ? 
                    '<i class="fas fa-volume-mute"></i>' : 
                    '<i class="fas fa-volume-up"></i>';
                muteBtn.style.background = video.muted ? 'var(--gray)' : 'var(--danger)';
            });
            
            // Control de volumen
            volumeSlider.addEventListener('input', function() {
                video.volume = volumeSlider.value / 100;
            });
            
            // Control de velocidad
            speedBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const speed = parseFloat(this.getAttribute('data-speed'));
                    video.playbackRate = speed;
                    
                    // Actualizar estado activo
                    speedBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                });
            });
            
            // Pantalla completa
            fullscreenBtn.addEventListener('click', function() {
                if (video.requestFullscreen) {
                    video.requestFullscreen();
                } else if (video.webkitRequestFullscreen) {
                    video.webkitRequestFullscreen();
                } else if (video.msRequestFullscreen) {
                    video.msRequestFullscreen();
                }
            });
            
            // Picture-in-Picture
            pipBtn.addEventListener('click', function() {
                if (video !== document.pictureInPictureElement) {
                    video.requestPictureInPicture().catch(error => {
                        console.error('Error al activar Picture-in-Picture:', error);
                    });
                } else {
                    document.exitPictureInPicture().catch(error => {
                        console.error('Error al salir de Picture-in-Picture:', error);
                    });
                }
            });
            
            // Hacer clic en la barra de progreso para saltar a un punto específico
            progressBar.addEventListener('click', function(e) {
                const rect = progressBar.getBoundingClientRect();
                const percent = (e.clientX - rect.left) / rect.width;
                video.currentTime = percent * video.duration;
            });
            
            // Efecto de aparición escalonada para las secciones
            const sections = document.querySelectorAll('section');
            sections.forEach((section, index) => {
                section.style.animationDelay = `${index * 0.2}s`;
            });
        });
    