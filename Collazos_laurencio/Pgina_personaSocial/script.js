
        // Navegación entre secciones
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remover clase active de todos los enlaces
                document.querySelectorAll('.nav-link').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Agregar clase active al enlace clickeado
                this.classList.add('active');
                
                // Ocultar todas las secciones
                document.querySelectorAll('section').forEach(section => {
                    section.classList.remove('active');
                });
                
                // Mostrar la sección correspondiente
                const target = this.getAttribute('data-target');
                document.getElementById(target).classList.add('active');
                
                // Scroll hacia arriba
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        });
        
        // Carrusel
        let currentSlide = 0;
        const slides = document.querySelectorAll('.carousel-slide');
        const indicators = document.querySelectorAll('.indicator');
        const totalSlides = slides.length;
        
        function showSlide(index) {
            if (index >= totalSlides) currentSlide = 0;
            else if (index < 0) currentSlide = totalSlides - 1;
            else currentSlide = index;
            
            const carousel = document.querySelector('.carousel');
            carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
            

            // Actualizar indicadores
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === currentSlide);
            });
        }
        
        document.querySelector('.prev').addEventListener('click', () => {
            showSlide(currentSlide - 1);
        });
        
        document.querySelector('.next').addEventListener('click', () => {
            showSlide(currentSlide + 1);
        });
        
        // Configurar indicadores
        indicators.forEach((indicator, i) => {
            indicator.addEventListener('click', () => {
                showSlide(i);
            });
        });
        
        // Cambio automático de slides
        setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
        
        // Funciones para el quiz
        function checkAnswer(element, type) {
            const result = document.getElementById('result1');
            const options = element.parentElement.children;
            
            // Remover clases de todas las opciones
            for (let i = 0; i < options.length; i++) {
                options[i].classList.remove('correct', 'incorrect');
            }
            
            // Aplicar clase a la opción seleccionada
            if (type === 'correct') {
                element.classList.add('correct');
                result.textContent = "¡Correcto! La vicuña es uno de nuestros símbolos patrios.";
                result.style.backgroundColor = '#d4edda';
                result.style.color = '#155724';
                result.style.display = 'block';
                createConfetti();
            } else {
                element.classList.add('incorrect');
                result.textContent = "Incorrecto. La respuesta correcta es: La vicuña";
                result.style.backgroundColor = '#f8d7da';
                result.style.color = '#721c24';
                result.style.display = 'block';
            }
        }
        
        function checkAnswer2(element, type) {
            const result = document.getElementById('result2');
            const options = element.parentElement.children;
            
            // Remover clases de todas las opciones
            for (let i = 0; i < options.length; i++) {
                options[i].classList.remove('correct', 'incorrect');
            }
            
            // Aplicar clase a la opción seleccionada
            if (type === 'correct') {
                element.classList.add('correct');
                result.textContent = "¡Correcto! Nuestra bandera tiene franjas rojas y una blanca en el centro.";
                result.style.backgroundColor = '#d4edda';
                result.style.color = '#155724';
                result.style.display = 'block';
                createConfetti();
            } else {
                element.classList.add('incorrect');
                result.textContent = "Incorrecto. La respuesta correcta es: Rojo, blanco y rojo";
                result.style.backgroundColor = '#f8d7da';
                result.style.color = '#721c24';
                result.style.display = 'block';
            }
        }
        
        // Función para el juego de construir comunidad
        function addToCommunity(item) {
            const container = document.getElementById('community-container');
            
            // Limpiar el mensaje inicial
            if (container.innerHTML.includes("Tu comunidad aparecerá aquí")) {
                container.innerHTML = '';
            }
            
            let newElement;
            
            switch(item) {
                case 'escuela':
                    newElement = document.createElement('div');
                    newElement.innerHTML = '🏫 Escuela - Donde aprendemos y nos formamos';
                    newElement.style.padding = '10px';
                    newElement.style.margin = '5px';
                    newElement.style.backgroundColor = '#e6fffa';
                    newElement.style.borderRadius = '5px';
                    break;
                case 'parque':
                    newElement = document.createElement('div');
                    newElement.innerHTML = '🌳 Parque - Espacio para jugar y disfrutar de la naturaleza';
                    newElement.style.padding = '10px';
                    newElement.style.margin = '5px';
                    newElement.style.backgroundColor = '#f0fff4';
                    newElement.style.borderRadius = '5px';
                    break;
                case 'hospital':
                    newElement = document.createElement('div');
                    newElement.innerHTML = '🏥 Hospital - Donde cuidamos nuestra salud';
                    newElement.style.padding = '10px';
                    newElement.style.margin = '5px';
                    newElement.style.backgroundColor = '#fed7d7';
                    newElement.style.borderRadius = '5px';
                    break;
                case 'biblioteca':
                    newElement = document.createElement('div');
                    newElement.innerHTML = '📚 Biblioteca - Lugar de lectura y conocimiento';
                    newElement.style.padding = '10px';
                    newElement.style.margin = '5px';
                    newElement.style.backgroundColor = '#e9d8fd';
                    newElement.style.borderRadius = '5px';
                    break;
                case 'mercado':
                    newElement = document.createElement('div');
                    newElement.innerHTML = '🛒 Mercado - Donde compramos nuestros alimentos';
                    newElement.style.padding = '10px';
                    newElement.style.margin = '5px';
                    newElement.style.backgroundColor = '#feebc8';
                    newElement.style.borderRadius = '5px';
                    break;
            }
            
            container.appendChild(newElement);
        }
        
        function resetCommunity() {
            const container = document.getElementById('community-container');
            container.innerHTML = '<p>Tu comunidad aparecerá aquí...</p>';
        }
        
        // Juego de memoria
        const memoryCards = [
            { id: 1, content: '🇵🇪', matched: false },
            { id: 2, content: '🇵🇪', matched: false },
            { id: 3, content: '🏔️', matched: false },
            { id: 4, content: '🏔️', matched: false },
            { id: 5, content: '🌺', matched: false },
            { id: 6, content: '🌺', matched: false },
            { id: 7, content: '🦙', matched: false },
            { id: 8, content: '🦙', matched: false },
            { id: 9, content: '🌞', matched: false },
            { id: 10, content: '🌞', matched: false },
            { id: 11, content: '🌽', matched: false },
            { id: 12, content: '🌽', matched: false }
        ];
        
        let hasFlippedCard = false;
        let lockBoard = false;
        let firstCard, secondCard;
        let matchedPairs = 0;
        
        function initializeMemoryGame() {
            const gameContainer = document.getElementById('memory-game');
            gameContainer.innerHTML = '';
            
            // Mezclar las cartas
            const shuffledCards = [...memoryCards].sort(() => Math.random() - 0.5);
            
            shuffledCards.forEach(card => {
                const cardElement = document.createElement('div');
                cardElement.classList.add('memory-card');
                cardElement.dataset.id = card.id;
                
                cardElement.innerHTML = `
                    <div class="front">?</div>
                    <div class="back">${card.content}</div>
                `;
                
                cardElement.addEventListener('click', flipCard);
                gameContainer.appendChild(cardElement);
            });
            
            matchedPairs = 0;
            updateScore();
        }
        
        function flipCard() {
            if (lockBoard) return;
            if (this === firstCard) return;
            
            this.classList.add('flipped');
            
            if (!hasFlippedCard) {
                // Primera carta
                hasFlippedCard = true;
                firstCard = this;
                return;
            }
            
            // Segunda carta
            secondCard = this;
            checkForMatch();
        }
        
        function checkForMatch() {
            const isMatch = firstCard.dataset.id === secondCard.dataset.id;
            
            if (isMatch) {
                disableCards();
                matchedPairs++;
                updateScore();
                
                if (matchedPairs === memoryCards.length / 2) {
                    setTimeout(() => {
                        alert('¡Felicidades! Has completado el juego de memoria.');
                        createConfetti();
                    }, 500);
                }
            } else {
                unflipCards();
            }
        }
        
        function disableCards() {
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
            
            resetBoard();
        }
        
        function unflipCards() {
            lockBoard = true;
            
            setTimeout(() => {
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                
                resetBoard();
            }, 1000);
        }
        
        function resetBoard() {
            [hasFlippedCard, lockBoard] = [false, false];
            [firstCard, secondCard] = [null, null];
        }
        
        function resetMemoryGame() {
            const cards = document.querySelectorAll('.memory-card');
            cards.forEach(card => {
                card.classList.remove('flipped');
                card.addEventListener('click', flipCard);
            });
            
            setTimeout(() => {
                initializeMemoryGame();
            }, 500);
        }
        
        function updateScore() {
            document.getElementById('memory-score').textContent = `Parejas encontradas: ${matchedPairs}/${memoryCards.length/2}`;
        }
        
        // Rompecabezas de Machu Picchu
        let puzzlePieces = [];
        let emptyIndex = 8; // Índice de la pieza vacía (última posición)
        
        function initializePuzzle() {
            const puzzleContainer = document.getElementById('puzzle-container');
            puzzleContainer.innerHTML = '';
            
            // Crear piezas del rompecabezas
            for (let i = 0; i < 9; i++) {
                const piece = document.createElement('div');
                piece.classList.add('puzzle-piece');
                piece.dataset.index = i;
                
                // Asignar posición de fondo para cada pieza
                const row = Math.floor(i / 3);
                const col = i % 3;
                piece.style.backgroundImage = "url('https://www.peruforless.com/_next/image?url=https%3A%2F%2Fwww.peruforless.com%2Fimages%2Fmachu-picchu-ruins.jpg&w=3840&q=75')";
                piece.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;
                
                piece.addEventListener('click', () => movePuzzlePiece(i));
                puzzleContainer.appendChild(piece);
                
                puzzlePieces.push(piece);
            }
            
            // Hacer invisible la última pieza (vacía)
            puzzlePieces[emptyIndex].style.visibility = 'hidden';
            
            // Mezclar el rompecabezas
            shufflePuzzle();
        }
        
        function shufflePuzzle() {
            // Realizar 100 movimientos aleatorios para mezclar
            for (let i = 0; i < 100; i++) {
                const possibleMoves = getPossibleMoves();
                const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
                movePuzzlePiece(randomMove);
            }
            
            document.getElementById('puzzle-message').textContent = '';
        }
        
        function getPossibleMoves() {
            const moves = [];
            const row = Math.floor(emptyIndex / 3);
            const col = emptyIndex % 3;
            
            // Arriba
            if (row > 0) moves.push(emptyIndex - 3);
            // Abajo
            if (row < 2) moves.push(emptyIndex + 3);
            // Izquierda
            if (col > 0) moves.push(emptyIndex - 1);
            // Derecha
            if (col < 2) moves.push(emptyIndex + 1);
            
            return moves;
        }
        
        function movePuzzlePiece(index) {
            const possibleMoves = getPossibleMoves();
            
            if (possibleMoves.includes(index)) {
                // Intercambiar la pieza clickeada con el espacio vacío
                const temp = puzzlePieces[index].style.backgroundPosition;
                puzzlePieces[index].style.backgroundPosition = puzzlePieces[emptyIndex].style.backgroundPosition;
                puzzlePieces[emptyIndex].style.backgroundPosition = temp;
                
                // Intercambiar visibilidad
                puzzlePieces[index].style.visibility = 'hidden';
                puzzlePieces[emptyIndex].style.visibility = 'visible';
                
                // Actualizar índice vacío
                emptyIndex = index;
                
                // Verificar si el puzzle está resuelto
                checkPuzzle();
            }
        }
        
        function checkPuzzle() {
            let solved = true;
            
            for (let i = 0; i < 9; i++) {
                const row = Math.floor(i / 3);
                const col = i % 3;
                const expectedPosition = `-${col * 100}px -${row * 100}px`;
                
                if (puzzlePieces[i].style.backgroundPosition !== expectedPosition) {
                    solved = false;
                    break;
                }
            }
            
            if (solved) {
                document.getElementById('puzzle-message').textContent = '¡Felicidades! Has completado el rompecabezas.';
                document.getElementById('puzzle-message').style.color = 'green';
                createConfetti();
            } else {
                document.getElementById('puzzle-message').textContent = 'Sigue intentando, el rompecabezas no está completo.';
                document.getElementById('puzzle-message').style.color = 'orange';
            }
        }
        
        function solvePuzzle() {
            // Restablecer el rompecabezas a su estado resuelto
            for (let i = 0; i < 9; i++) {
                const row = Math.floor(i / 3);
                const col = i % 3;
                puzzlePieces[i].style.backgroundPosition = `-${col * 100}px -${row * 100}px`;
                
                if (i === 8) {
                    puzzlePieces[i].style.visibility = 'hidden';
                } else {
                    puzzlePieces[i].style.visibility = 'visible';
                }
            }
            
            emptyIndex = 8;
            document.getElementById('puzzle-message').textContent = '¡Rompecabezas resuelto!';
            document.getElementById('puzzle-message').style.color = 'green';
            createConfetti();
        }
        
        // Juego de arrastrar y soltar
        function initializeDragDrop() {
            const dragItems = document.querySelectorAll('.drag-item');
            const dropZones = document.querySelectorAll('.drop-zone');
            
            dragItems.forEach(item => {
                item.addEventListener('dragstart', dragStart);
            });
            
            dropZones.forEach(zone => {
                zone.addEventListener('dragover', dragOver);
                zone.addEventListener('dragenter', dragEnter);
                zone.addEventListener('dragleave', dragLeave);
                zone.addEventListener('drop', drop);
            });
        }
        
        function dragStart(e) {
            e.dataTransfer.setData('text/plain', e.target.dataset.target);
            setTimeout(() => {
                e.target.style.opacity = '0.4';
            }, 0);
        }
        
        function dragOver(e) {
            e.preventDefault();
        }
        
        function dragEnter(e) {
            e.preventDefault();
            e.target.classList.add('hover');
        }
        
        function dragLeave(e) {
            e.target.classList.remove('hover');
        }
        
        function drop(e) {
            e.preventDefault();
            e.target.classList.remove('hover');
            
            const data = e.dataTransfer.getData('text/plain');
            const draggedElement = document.querySelector(`.drag-item[data-target="${data}"]`);
            
            if (e.target.dataset.target === data) {
                e.target.textContent = draggedElement.textContent;
                e.target.classList.add('correct');
                e.target.classList.remove('incorrect');
                draggedElement.style.display = 'none';
            } else {
                e.target.classList.add('incorrect');
                e.target.classList.remove('correct');
            }
        }
        
        function checkDragDrop() {
            const dropZones = document.querySelectorAll('.drop-zone');
            let correctCount = 0;
            
            dropZones.forEach(zone => {
                if (zone.classList.contains('correct')) {
                    correctCount++;
                }
            });
            
            if (correctCount === 3) {
                alert('¡Felicidades! Todas las respuestas son correctas.');
                createConfetti();
            } else {
                alert(`Tienes ${correctCount} de 3 respuestas correctas. Sigue intentando.`);
            }
        }
        
        function resetDragDrop() {
            const dragItems = document.querySelectorAll('.drag-item');
            const dropZones = document.querySelectorAll('.drop-zone');
            
            dragItems.forEach(item => {
                item.style.display = 'block';
                item.style.opacity = '1';
            });
            
            dropZones.forEach(zone => {
                zone.classList.remove('correct', 'incorrect', 'hover');
                if (zone.dataset.target === 'bandera') {
                    zone.textContent = 'Rojo, blanco y rojo';
                } else if (zone.dataset.target === 'escudo') {
                    zone.textContent = 'Tiene una vicuña, un árbol y una cornucopia';
                } else if (zone.dataset.target === 'himno') {
                    zone.textContent = '"Somos libres, seámoslo siempre"';
                }
            });
        }
        
        // Funciones para modales
        function showContentModal(contentType) {
            const modal = document.getElementById('contentModal');
            const modalContent = document.getElementById('modalContent');
            
            let content = '';
            let title = '';
            
            switch(contentType) {
                case 'convivencia':
                    title = 'Convivencia Armónica';
                    content = `
                        <h2>${title}</h2>
                        <img src="https://cdn.pixabay.com/photo/2017/09/25/13/14/children-2785040_1280.jpg" alt="Niños jugando" style="width: 100%; border-radius: 10px; margin: 15px 0;">
                        <p>La convivencia armónica es fundamental para vivir en sociedad. Implica:</p>
                        <ul>
                            <li>Respetar las diferencias de los demás</li>
                            <li>Practicar la empatía y la solidaridad</li>
                            <li>Resolver conflictos de manera pacífica</li>
                            <li>Participar activamente en la comunidad</li>
                        </ul>
                        <p>En nuestra sociedad diversa, es importante valorar las distintas culturas, creencias y formas de pensar.</p>
                        <div style="text-align: center; margin-top: 20px;">
                            <button class="card-btn" onclick="closeModal('contentModal')">Cerrar</button>
                        </div>
                    `;
                    break;
                case 'entorno':
                    title = 'Nuestro Entorno';
                    content = `
                        <h2>${title}</h2>
                        <img src="https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_1280.jpg" alt="Planeta Tierra" style="width: 100%; border-radius: 10px; margin: 15px 0;">
                        <p>Nuestro entorno incluye todo lo que nos rodea: la naturaleza, las ciudades, las personas y las culturas.</p>
                        <p>Es importante conocer y cuidar nuestro entorno porque:</p>
                        <ul>
                            <li>Nos proporciona los recursos necesarios para vivir</li>
                            <li>Es nuestro hogar y el de futuras generaciones</li>
                            <li>La diversidad natural y cultural nos enriquece</li>
                        </ul>
                        <p>Podemos cuidar nuestro entorno reciclando, ahorrando agua y energía, y respetando la naturaleza.</p>
                        <div style="text-align: center; margin-top: 20px;">
                            <button class="card-btn" onclick="closeModal('contentModal')">Cerrar</button>
                        </div>
                    `;
                    break;
                case 'historia':
                    title = 'Nuestra Historia';
                    content = `
                        <h2>${title}</h2>
                        <img src="https://cdn.pixabay.com/photo/2016/11/21/17/44/archaeology-1846173_1280.jpg" alt="Ruinas históricas" style="width: 100%; border-radius: 10px; margin: 15px 0;">
                        <p>La historia nos ayuda a entender nuestro presente y a construir un mejor futuro.</p>
                        <p>A través del estudio de la historia podemos:</p>
                        <ul>
                            <li>Conocer nuestras raíces y orígenes</li>
                            <li>Valorar los logros de nuestros antepasados</li>
                            <li>Aprender de los errores del pasado</li>
                            <li>Entender cómo se ha formado nuestra sociedad</li>
                        </ul>
                        <p>En Perú tenemos una rica historia que incluye civilizaciones preincas, el Imperio Inca, la conquista española y nuestra independencia.</p>
                        <div style="text-align: center; margin-top: 20px;">
                            <button class="card-btn" onclick="closeModal('contentModal')">Cerrar</button>
                        </div>
                    `;
                    break;
                case 'identidad':
                    title = 'Identidad Personal';
                    content = `
                        <h2>${title}</h2>
                        <img src="https://cdn.pixabay.com/photo/2016/11/29/13/20/ball-1869846_1280.jpg" alt="Niños diversos" style="width: 100%; border-radius: 10px; margin: 15px 0;">
                        <p>La identidad personal es lo que nos hace únicos y diferentes a los demás.</p>
                        <p>Nuestra identidad incluye:</p>
                        <ul>
                            <li>Nuestro nombre y apellidos</li>
                            <li>Nuestra familia y origen</li>
                            <li>Nuestras características físicas</li>
                            <li>Nuestros gustos e intereses</li>
                            <li>Nuestros valores y creencias</li>
                        </ul>
                        <p>Reconocer y valorar nuestra identidad nos ayuda a tener una autoestima saludable y a respetar la identidad de los demás.</p>
                        <div style="text-align: center; margin-top: 20px;">
                            <button class="card-btn" onclick="closeModal('contentModal')">Cerrar</button>
                        </div>
                    `;
                    break;
                case 'familia':
                    title = 'La Familia';
                    content = `
                        <h2>${title}</h2>
                        <img src="https://cdn.pixabay.com/photo/2016/11/14/17/39/family-1822562_1280.jpg" alt="Familia unida" style="width: 100%; border-radius: 10px; margin: 15px 0;">
                        <p>La familia es el primer grupo social al que pertenecemos y donde aprendemos los valores fundamentales.</p>
                        <p>Las familias pueden tener diferentes formas, pero todas comparten funciones importantes:</p>
                        <ul>
                            <li>Proporcionar amor y protección</li>
                            <li>Enseñar normas y valores</li>
                            <li>Satisfacer las necesidades básicas</li>
                            <li>Transmitir la cultura y tradiciones</li>
                        </ul>
                        <p>En la familia aprendemos a relacionarnos con los demás y desarrollamos nuestra identidad.</p>
                        <div style="text-align: center; margin-top: 20px;">
                            <button class="card-btn" onclick="closeModal('contentModal')">Cerrar</button>
                        </div>
                    `;
                    break;
                case 'escuela':
                    title = 'La Escuela';
                    content = `
                        <h2>${title}</h2>
                        <img src="https://cdn.pixabay.com/photo/2016/11/14/05/21/children-1822476_1280.jpg" alt="Escuela" style="width: 100%; border-radius: 10px; margin: 15px 0;">
                        <p>La escuela es una institución fundamental en nuestra sociedad donde adquirimos conocimientos y desarrollamos habilidades.</p>
                        <p>En la escuela no solo aprendemos materias académicas, también:</p>
                        <ul>
                            <li>Aprendemos a convivir con personas diferentes</li>
                            <li>Desarrollamos valores como el respeto y la responsabilidad</li>
                            <li>Practicamos la solidaridad y el trabajo en equipo</li>
                            <li>Preparamos para ser ciudadanos activos en la sociedad</li>
                        </ul>
                        <p>Todos los estudiantes tienen derechos y responsabilidades que debemos conocer y respetar.</p>
                        <div style="text-align: center; margin-top: 20px;">
                            <button class="card-btn" onclick="closeModal('contentModal')">Cerrar</button>
                        </div>
                    `;
                    break;
                case 'comunidad':
                    title = 'Nuestra Comunidad';
                    content = `
                        <h2>${title}</h2>
                        <img src="https://cdn.pixabay.com/photo/2017/08/01/20/52/people-2567915_1280.jpg" alt="Comunidad" style="width: 100%; border-radius: 10px; margin: 15px 0;">
                        <p>Una comunidad es un grupo de personas que comparten un espacio geográfico, cultura, historia e intereses comunes.</p>
                        <p>En nuestra comunidad encontramos:</p>
                        <ul>
                            <li>Servicios públicos como hospitales, escuelas y parques</li>
                            <li>Autoridades que velan por el bienestar de todos</li>
                            <li>Organizaciones que trabajan por el desarrollo comunal</li>
                            <li>Espacios para la recreación y el deporte</li>
                        </ul>
                        <p>Participar activamente en nuestra comunidad nos ayuda a mejorarla y a sentirnos parte de ella.</p>
                        <div style="text-align: center; margin-top: 20px;">
                            <button class="card-btn" onclick="closeModal('contentModal')">Cerrar</button>
                        </div>
                    `;
                    break;
                case 'pais':
                    title = 'Nuestro País';
                    content = `
                        <h2>${title}</h2>
                        <img src="https://cdn.pixabay.com/photo/2017/09/28/21/56/peru-2797790_1280.jpg" alt="Perú" style="width: 100%; border-radius: 10px; margin: 15px 0;">
                        <p>Perú es un país megadiverso con una gran riqueza cultural y natural.</p>
                        <p>Algunas características de nuestro país:</p>
                        <ul>
                            <li>Tenemos tres regiones naturales: costa, sierra y selva</li>
                            <li>Somos un país pluricultural con muchas lenguas y tradiciones</li>
                            <li>Nuestros símbolos patrios son la bandera, el escudo y el himno nacional</li>
                            <li>Tenemos una historia milenaria que incluye grandes civilizaciones</li>
                        </ul>
                        <p>Conocer y valorar nuestro país nos ayuda a desarrollar nuestro sentido de pertenencia y patriotismo.</p>
                        <div style="text-align: center; margin-top: 20px;">
                            <button class="card-btn" onclick="closeModal('contentModal')">Cerrar</button>
                        </div>
                    `;
                    break;
                case 'medioambiente':
                    title = 'Cuidado del Medio Ambiente';
                    content = `
                        <h2>${title}</h2>
                        <img src="https://cdn.pixabay.com/photo/2016/11/21/16/21/earth-1845736_1280.jpg" alt="Medio ambiente" style="width: 100%; border-radius: 10px; margin: 15px 0;">
                        <p>El medio ambiente es todo lo que nos rodea y nos permite vivir: el aire, el agua, el suelo, las plantas y los animales.</p>
                        <p>Es nuestra responsabilidad cuidar el medio ambiente porque:</p>
                        <ul>
                            <li>Nos proporciona los recursos necesarios para vivir</li>
                            <li>Es el hogar de muchas especies</li>
                            <li>Su equilibrio es fundamental para nuestra supervivencia</li>
                            <li>Las futuras generaciones también lo necesitarán</li>
                        </ul>
                        <p>Podemos cuidar el medio ambiente con acciones simples como reciclar, ahorrar agua y energía, y no contaminar.</p>
                        <div style="text-align: center; margin-top: 20px;">
                            <button class="card-btn" onclick="closeModal('contentModal')">Cerrar</button>
                        </div>
                    `;
                    break;
                default:
                    title = 'Contenido Educativo';
                    content = `
                        <h2>${title}</h2>
                        <p>Este contenido está en desarrollo. Pronto tendrás acceso a toda la información sobre este tema.</p>
                        <div style="text-align: center; margin-top: 20px;">
                            <button class="card-btn" onclick="closeModal('contentModal')">Cerrar</button>
                        </div>
                    `;
            }
            
            modalContent.innerHTML = content;
            modal.style.display = 'flex';
        }
        
        function closeModal(modalId) {
            document.getElementById(modalId).style.display = 'none';
        }
        
        function showVideos() {
            document.getElementById('videoModal').style.display = 'flex';
        }
        
        // Funciones para recursos
        function downloadResource(type) {
            // Crear recursos descargables simulados
            const resources = {
                'cuentos': {
                    name: 'Cuentos y Leyendas Peruanas',
                    content: 'Una colección de cuentos y leyendas tradicionales del Perú.'
                },
                'material': {
                    name: 'Material Didáctico Personal Social',
                    content: 'Fichas y actividades para reforzar el aprendizaje.'
                },
                'evaluaciones': {
                    name: 'Evaluaciones del Curso',
                    content: 'Pruebas para medir tu progreso en el curso.'
                },
                'actividades': {
                    name: 'Actividades Creativas',
                    content: 'Manualidades y proyectos relacionados con los temas del curso.'
                },
                'proyectos': {
                    name: 'Proyectos de Investigación',
                    content: 'Guías para realizar pequeños proyectos de investigación.'
                }
            };
            
            if (resources[type]) {
                // Crear un blob con el contenido del recurso
                const content = `Recurso: ${resources[type].name}\n\n${resources[type].content}\n\n¡Sigue aprendiendo!`;
                const blob = new Blob([content], { type: 'text/plain' });
                
                // Crear un enlace temporal para descargar
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = `${resources[type].name}.txt`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                alert(`¡Descargando "${resources[type].name}"!`);
                createConfetti();
            } else {
                alert('Recurso no disponible en este momento.');
            }
        }
        
        function showMoreImages() {
            // Agregar más imágenes a la galería
            const gallery = document.querySelector('.gallery');
            const newImages = [
                {
                    src: 'https://cdn.pixabay.com/photo/2017/01/20/00/30/maidens-1993649_1280.jpg',
                    title: 'Islas Ballestas',
                    description: 'Conocidas como las "Galápagos peruanas"'
                },
                {
                    src: 'https://cdn.pixabay.com/photo/2017/01/19/23/46/mountain-1993170_1280.jpg',
                    title: 'Montaña de 7 Colores',
                    description: 'Una de las maravillas naturales del Perú'
                },
                {
                    src: 'https://cdn.pixabay.com/photo/2016/11/21/17/44/archaeology-1846173_1280.jpg',
                    title: 'Líneas de Nazca',
                    description: 'Misteriosos geoglifos en el desierto'
                }
            ];
            
            newImages.forEach(image => {
                const galleryItem = document.createElement('div');
                galleryItem.classList.add('gallery-item');
                galleryItem.innerHTML = `
                    <img src="${image.src}" alt="${image.title}">
                    <div class="gallery-overlay">
                        <h4>${image.title}</h4>
                        <p>${image.description}</p>
                    </div>
                `;
                gallery.appendChild(galleryItem);
            });
            
            alert('¡Se han agregado más imágenes a la galería!');
        }
        
        // Efectos de confeti
        function createConfetti() {
            const colors = ['#ff9a3c', '#ff6b6b', '#4e54c8', '#1dd1a1'];
            
            for (let i = 0; i < 50; i++) {
                const confetti = document.createElement('div');
                confetti.classList.add('confetti');
                confetti.style.left = `${Math.random() * 100}vw`;
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    confetti.remove();
                }, 5000);
            }
        }
        
        // Inicializar juegos al cargar la página
        window.addEventListener('DOMContentLoaded', () => {
            initializeMemoryGame();
            initializePuzzle();
            initializeDragDrop();
        });
    