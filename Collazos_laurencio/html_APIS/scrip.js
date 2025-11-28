
        // Elementos DOM
        const weatherInput = document.getElementById('city-input');
        const getWeatherBtn = document.getElementById('get-weather');
        const weatherResults = document.getElementById('weather-results');
        const weatherLoader = document.getElementById('weather-loader');

        const movieInput = document.getElementById('movie-input');
        const searchMoviesBtn = document.getElementById('search-movies');
        const moviesResults = document.getElementById('movies-results');
        const moviesLoader = document.getElementById('movies-loader');

        const newsCategory = document.getElementById('news-category');
        const getNewsBtn = document.getElementById('get-news');
        const newsResults = document.getElementById('news-results');
        const newsLoader = document.getElementById('news-loader');

        const githubUserInput = document.getElementById('github-user-input');
        const searchGithubUsersBtn = document.getElementById('search-github-users');
        const githubResults = document.getElementById('github-results');
        const githubLoader = document.getElementById('github-loader');

        const countryInput = document.getElementById('country-input');
        const searchCountriesBtn = document.getElementById('search-countries');
        const countriesResults = document.getElementById('countries-results');
        const countriesLoader = document.getElementById('countries-loader');

        const cryptoCurrency = document.getElementById('crypto-currency');
        const getCryptoBtn = document.getElementById('get-crypto');
        const cryptoResults = document.getElementById('crypto-results');
        const cryptoLoader = document.getElementById('crypto-loader');

        const scrollTopBtn = document.getElementById('scroll-top');

        // Funciones de utilidad
        function showLoader(loader) {
            loader.style.display = 'block';
        }

        function hideLoader(loader) {
            loader.style.display = 'none';
        }

        function showError(element, message) {
            element.innerHTML = `<div class="error">${message}</div>`;
        }

        function showNoResults(element, message = "No se encontraron resultados") {
            element.innerHTML = `<div class="no-results">${message}</div>`;
        }

        // Efecto de scroll suave
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Mostrar/ocultar botón de scroll
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.style.display = 'flex';
            } else {
                scrollTopBtn.style.display = 'none';
            }
        });

        // Clima - API real de OpenWeather
        getWeatherBtn.addEventListener('click', async () => {
            const city = weatherInput.value.trim();
            if (!city) {
                showError(weatherResults, 'Por favor, ingresa una ciudad');
                return;
            }

            showLoader(weatherLoader);
            weatherResults.innerHTML = '';

            try {
                // Usando API real de OpenWeather (versión gratuita)
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bb55c4d5c28e86a9c8f0b8c7c6e2c5a7&units=metric&lang=es`);
                
                if (!response.ok) {
                    throw new Error('Ciudad no encontrada');
                }
                
                const weatherData = await response.json();
                hideLoader(weatherLoader);

                const weatherIcons = {
                    '01d': '☀️', '01n': '🌙',
                    '02d': '⛅', '02n': '⛅',
                    '03d': '☁️', '03n': '☁️',
                    '04d': '☁️', '04n': '☁️',
                    '09d': '🌧️', '09n': '🌧️',
                    '10d': '🌦️', '10n': '🌦️',
                    '11d': '⛈️', '11n': '⛈️',
                    '13d': '❄️', '13n': '❄️',
                    '50d': '🌫️', '50n': '🌫️'
                };

                const weatherIcon = weatherIcons[weatherData.weather[0].icon] || '🌤️';

                weatherResults.innerHTML = `
                    <div class="card">
                        <h2>Clima en ${weatherData.name}, ${weatherData.sys.country}</h2>
                        <div class="weather-icon">${weatherIcon}</div>
                        <div class="temp">${Math.round(weatherData.main.temp)}°C</div>
                        <p><strong>Sensación térmica:</strong> ${Math.round(weatherData.main.feels_like)}°C</p>
                        <p><strong>Descripción:</strong> ${weatherData.weather[0].description}</p>
                        <p><strong>Humedad:</strong> ${weatherData.main.humidity}%</p>
                        <p><strong>Presión:</strong> ${weatherData.main.pressure} hPa</p>
                        <p><strong>Viento:</strong> ${weatherData.wind.speed} m/s</p>
                        <p><strong>Visibilidad:</strong> ${weatherData.visibility / 1000} km</p>
                    </div>
                `;
            } catch (error) {
                hideLoader(weatherLoader);
                showError(weatherResults, 'Error: ' + error.message);
            }
        });

        // Películas - API real de OMDb
        searchMoviesBtn.addEventListener('click', async () => {
            const query = movieInput.value.trim();
            if (!query) {
                showError(moviesResults, 'Por favor, ingresa un título de película');
                return;
            }

            showLoader(moviesLoader);
            moviesResults.innerHTML = '';

            try {
                // Usando API real de OMDb
                const response = await fetch(`https://www.omdbapi.com/?apikey=6c3a2d45&s=${encodeURIComponent(query)}&type=movie`);
                const data = await response.json();

                hideLoader(moviesLoader);

                if (data.Response === "True" && data.Search) {
                    // Obtener detalles completos para cada película
                    const movieDetails = await Promise.all(
                        data.Search.slice(0, 6).map(async movie => {
                            const detailResponse = await fetch(`https://www.omdbapi.com/?apikey=6c3a2d45&i=${movie.imdbID}`);
                            return await detailResponse.json();
                        })
                    );

                    moviesResults.innerHTML = movieDetails.map(movie => `
                        <div class="card">
                            <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/300x450/333/fff?text=Poster+No+Disponible'}" 
                                 alt="${movie.Title}" class="movie-poster">
                            <h3>${movie.Title}</h3>
                            <p><strong>Año:</strong> ${movie.Year}</p>
                            <p><strong>Calificación:</strong> ⭐ ${movie.imdbRating !== "N/A" ? movie.imdbRating : 'N/A'}/10</p>
                            <p><strong>Género:</strong> ${movie.Genre !== "N/A" ? movie.Genre : 'No disponible'}</p>
                            <p><strong>Duración:</strong> ${movie.Runtime !== "N/A" ? movie.Runtime : 'No disponible'}</p>
                        </div>
                    `).join('');
                } else {
                    showNoResults(moviesResults, 'No se encontraron películas con ese título');
                }
            } catch (error) {
                hideLoader(moviesLoader);
                showError(moviesResults, 'Error al buscar películas: ' + error.message);
            }
        });

        // Noticias - API real de NewsAPI (simulada por limitaciones de CORS)
        getNewsBtn.addEventListener('click', async () => {
            const category = newsCategory.value;

            showLoader(newsLoader);
            newsResults.innerHTML = '';

            try {
                // Simulación de API de noticias (en producción usarías NewsAPI)
                const newsSources = {
                    general: [
                        {
                            title: 'Avances en inteligencia artificial transforman industrias',
                            description: 'Nuevos modelos de IA están revolucionando sectores como salud, educación y tecnología.',
                            url: '#',
                            urlToImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&h=300&fit=crop',
                            publishedAt: new Date().toISOString(),
                            source: { name: 'Tech News' }
                        }
                    ],
                    technology: [
                        {
                            title: 'Nueva tecnología de baterías promete carga más rápida',
                            description: 'Investigadores desarrollan baterías que se cargan en minutos y duran días.',
                            url: '#',
                            urlToImage: 'https://images.unsplash.com/photo-1603732551681-2e91159b9dc2?w=500&h=300&fit=crop',
                            publishedAt: new Date().toISOString(),
                            source: { name: 'Science Daily' }
                        }
                    ]
                };

                // Simular delay de red
                setTimeout(() => {
                    hideLoader(newsLoader);
                    
                    const news = newsSources[category] || [
                        {
                            title: 'Titulares de noticias ' + category,
                            description: 'Contenido de noticias sobre ' + category,
                            url: '#',
                            urlToImage: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=500&h=300&fit=crop',
                            publishedAt: new Date().toISOString(),
                            source: { name: 'News Source' }
                        }
                    ];

                    newsResults.innerHTML = news.map(article => `
                        <div class="card">
                            <img src="${article.urlToImage}" alt="${article.title}">
                            <h3>${article.title}</h3>
                            <p>${article.description}</p>
                            <p><strong>Fuente:</strong> ${article.source.name}</p>
                            <p><strong>Publicado:</strong> ${new Date(article.publishedAt).toLocaleDateString()}</p>
                            <a href="${article.url}" target="_blank" style="color: var(--accent); text-decoration: none; font-weight: bold; display: inline-block; margin-top: 10px;">Leer más →</a>
                        </div>
                    `).join('');
                }, 1000);
            } catch (error) {
                hideLoader(newsLoader);
                showError(newsResults, 'Error al cargar noticias: ' + error.message);
            }
        });

        // Usuarios de GitHub - API real
        searchGithubUsersBtn.addEventListener('click', async () => {
            const username = githubUserInput.value.trim();
            if (!username) {
                showError(githubResults, 'Por favor, ingresa un nombre de usuario');
                return;
            }

            showLoader(githubLoader);
            githubResults.innerHTML = '';

            try {
                const response = await fetch(`https://api.github.com/search/users?q=${username}&per_page=6`);
                const data = await response.json();

                hideLoader(githubLoader);

                if (data.items && data.items.length > 0) {
                    // Obtener información detallada de cada usuario
                    const userDetails = await Promise.all(
                        data.items.map(async user => {
                            const userResponse = await fetch(user.url);
                            return await userResponse.json();
                        })
                    );

                    githubResults.innerHTML = userDetails.map(user => `
                        <div class="card">
                            <img src="${user.avatar_url}" alt="${user.login}" class="user-avatar">
                            <h3>${user.name || user.login}</h3>
                            <p><strong>Usuario:</strong> ${user.login}</p>
                            <p><strong>Seguidores:</strong> ${user.followers}</p>
                            <p><strong>Repositorios:</strong> ${user.public_repos}</p>
                            <p><strong>Ubicación:</strong> ${user.location || 'No especificada'}</p>
                            <a href="${user.html_url}" target="_blank" style="color: var(--accent); text-decoration: none; font-weight: bold; display: inline-block; margin-top: 10px;">Ver perfil →</a>
                        </div>
                    `).join('');
                } else {
                    showNoResults(githubResults, 'No se encontraron usuarios con ese nombre');
                }
            } catch (error) {
                hideLoader(githubLoader);
                showError(githubResults, 'Error al buscar usuarios: ' + error.message);
            }
        });

        // Países - API real de REST Countries
        searchCountriesBtn.addEventListener('click', async () => {
            const country = countryInput.value.trim();
            if (!country) {
                showError(countriesResults, 'Por favor, ingresa un nombre de país');
                return;
            }

            showLoader(countriesLoader);
            countriesResults.innerHTML = '';

            try {
                const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
                
                if (!response.ok) {
                    throw new Error('País no encontrado');
                }
                
                const data = await response.json();
                hideLoader(countriesLoader);

                if (data && data.length > 0) {
                    countriesResults.innerHTML = data.slice(0, 6).map(country => `
                        <div class="card">
                            <img src="${country.flags.png}" alt="${country.name.common}" class="country-flag">
                            <h3>${country.name.common}</h3>
                            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
                            <p><strong>Población:</strong> ${country.population.toLocaleString()}</p>
                            <p><strong>Región:</strong> ${country.region}</p>
                            <p><strong>Subregión:</strong> ${country.subregion || 'N/A'}</p>
                            <p><strong>Idioma(s):</strong> ${Object.values(country.languages || {}).join(', ') || 'N/A'}</p>
                            <p><strong>Moneda:</strong> ${country.currencies ? Object.values(country.currencies)[0].name : 'N/A'}</p>
                        </div>
                    `).join('');
                } else {
                    showNoResults(countriesResults, 'No se encontraron países con ese nombre');
                }
            } catch (error) {
                hideLoader(countriesLoader);
                showError(countriesResults, 'Error: ' + error.message);
            }
        });

        // Criptomonedas - API real de CoinGecko
        getCryptoBtn.addEventListener('click', async () => {
            const currency = cryptoCurrency.value;

            showLoader(cryptoLoader);
            cryptoResults.innerHTML = '';

            try {
                const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1&sparkline=false`);
                const data = await response.json();

                hideLoader(cryptoLoader);

                if (data && data.length > 0) {
                    cryptoResults.innerHTML = data.map(crypto => {
                        const priceChangeClass = crypto.price_change_percentage_24h >= 0 ? 'price-up' : 'price-down';
                        const changeIcon = crypto.price_change_percentage_24h >= 0 ? '↗️' : '↘️';
                        return `
                            <div class="card">
                                <div style="display: flex; align-items: center; margin-bottom: 1rem;">
                                    <img src="${crypto.image}" alt="${crypto.name}" style="width: 40px; height: 40px; margin-right: 1rem;">
                                    <h3>${crypto.name} (${crypto.symbol.toUpperCase()})</h3>
                                </div>
                                <div class="crypto-price ${priceChangeClass}">${crypto.current_price.toLocaleString()} ${currency.toUpperCase()}</div>
                                <p><strong>Cambio 24h:</strong> <span class="${priceChangeClass}">${changeIcon} ${crypto.price_change_percentage_24h ? crypto.price_change_percentage_24h.toFixed(2) : '0.00'}%</span></p>
                                <p><strong>Capitalización:</strong> ${crypto.market_cap.toLocaleString()} ${currency.toUpperCase()}</p>
                                <p><strong>Volumen 24h:</strong> ${crypto.total_volume.toLocaleString()} ${currency.toUpperCase()}</p>
                            </div>
                        `;
                    }).join('');
                } else {
                    showNoResults(cryptoResults, 'No se pudieron cargar las cotizaciones');
                }
            } catch (error) {
                hideLoader(cryptoLoader);
                showError(cryptoResults, 'Error al cargar cotizaciones: ' + error.message);
            }
        });

        // Cargar datos iniciales
        window.addEventListener('DOMContentLoaded', () => {
            // Cargar noticias por defecto
            getNewsBtn.click();
            
            // Cargar criptomonedas por defecto
            getCryptoBtn.click();
        });

        // Permitir búsqueda con Enter
        document.querySelectorAll('input').forEach(input => {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    const section = this.closest('.api-section');
                    const button = section.querySelector('button');
                    if (button) button.click();
                }
            });
        });
