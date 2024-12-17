document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('search-results');
    const movieDetailsContainer = document.getElementById('movie-details-container');
    const jsonFilePath = '/assets/json/main1.json'; // Path to your JSON file

    // Function to fetch all movies from the JSON file
    async function fetchMovies() {
        try {
            const response = await fetch(`${jsonFilePath}?timestamp=${Date.now()}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch JSON file: ${response.statusText}`);
            }
            const data = await response.json();

            // Combine all movies from all genres into one array
            const allMovies = [];
            for (const genre in data) {
                if (Array.isArray(data[genre])) {
                    allMovies.push(...data[genre]);
                }
            }
            return allMovies;
        } catch (error) {
            console.error("Error fetching movie data:", error);
            return [];
        }
    }

    // Function to display search results
    function displaySearchResults(results) {
        resultsContainer.innerHTML = ''; // Clear previous results

        if (results.length === 0) {
            resultsContainer.innerHTML = '<p>No movies found.</p>';
            return;
        }

        results.forEach(movie => {
            const movieDiv = document.createElement('div');
            movieDiv.classList.add('movie-result');

            const imageUrl = movie.image_url || 'placeholder.jpg'; // Fallback for missing images
            movieDiv.innerHTML = `
                <img src="${imageUrl}" alt="${movie.title}" width="100">
                <div>
                    <h3>${movie.title}</h3>
                </div>
            `;

            // Add click event to redirect to the movie details page
            movieDiv.addEventListener('click', () => {
                window.location.href = `/html/some.html?title=${encodeURIComponent(movie.title)}`;
            });

            resultsContainer.appendChild(movieDiv);
        });
    }

    // Dynamic search functionality
    searchInput.addEventListener('input', async function () {
        const query = searchInput.value.trim().toLowerCase();

        if (query.length === 0) {
            resultsContainer.innerHTML = ''; // Clear results if input is empty
            return;
        }

        // Fetch all movies and filter them based on the search query
        const movies = await fetchMovies();
        const filteredMovies = movies.filter(movie => movie.title && movie.title.toLowerCase().includes(query));

        displaySearchResults(filteredMovies);
    });

    // Function to display movie details
    async function displayMovieDetails() {
        const urlParams = new URLSearchParams(window.location.search);
        const movieTitle = urlParams.get('title');

        if (!movieTitle) {
            movieDetailsContainer.innerHTML = '<p>Movie not found. Please try again.</p>';
            return;
        }

        const movies = await fetchMovies();

        // Find the movie by title
        const movie = movies.find(m => m.title.toLowerCase() === movieTitle.toLowerCase());

        if (movie) {
            const crew = movie.crew || {};
            movieDetailsContainer.innerHTML = `
                <div class="movie-details-card">
                    <img class="movie-details-image" src="${movie.image_url}" alt="${movie.title}" loading="lazy">
                    <div class="movie-details-info">
                        <h1>${movie.title}</h1>
                        <p><strong>Genre:</strong> ${movie.genre || 'Unknown'}</p>
                        <p><strong>Release Year:</strong> ${movie.release_date || 'Unknown'}</p>
                        <p><strong>Play Time:</strong> ${movie.play_time || 'Unknown'}</p>
                        <p><strong>Rating:</strong> ${movie.rating || 'N/A'}</p>
                        <p><strong>Description:</strong> ${movie.description || 'No description available.'}</p>
                        <p><strong>Director:</strong> ${movie.director || 'N/A'}</p>
                        <p><strong>Cast:</strong> ${movie.cast ? movie.cast.join(', ') : 'N/A'}</p>
                        
                        <h3>Crew:</h3>
                        <p><strong>Music:</strong> ${crew.music || 'N/A'}</p>
                        <p><strong>Cinematography:</strong> ${crew.cinematography || 'N/A'}</p>
                        <p><strong>Editing:</strong> ${crew.editing || 'N/A'}</p>
                        <p><strong>Production:</strong> ${crew.production || 'N/A'}</p>

                        <a href="${movie.stream_url}" class="watch-now-btn">Watch Now</a>
                        <button class="trailer-now-btn" data-trailer-url="${movie.trailer_url || ''}">Watch Trailer</button>
                    </div>
                </div>
            `;

            // Add functionality for "Watch Trailer" button
            const trailerButton = document.querySelector('.trailer-now-btn');
            if (trailerButton) {
                trailerButton.addEventListener('click', () => {
                    const trailerUrl = trailerButton.getAttribute('data-trailer-url');
                    if (trailerUrl) {
                        window.open(trailerUrl, '_blank');
                    } else {
                        alert('Trailer not available.');
                    }
                });
            }
        } else {
            movieDetailsContainer.innerHTML = '<p>Movie details not found. Please try again.</p>';
        }
    }

    // Call displayMovieDetails if we're on the details page
    if (window.location.search.includes('title=')) {
        displayMovieDetails();
    }
});
