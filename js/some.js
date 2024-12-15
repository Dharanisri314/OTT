function displayMovieDetails() {
    // Extract the movie title from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const movieTitle = urlParams.get('title');

    if (!movieTitle) {
        document.getElementById('movie-details-container').innerHTML = '<p>Movie not found. Please try again.</p>';
        return;
    }

    // Fetch movie data from the JSON file
    fetch(`/assets/json/main1.json?timestamp=${Date.now()}`)
        .then(response => response.json())
        .then(data => {
            const genres = ['action', 'comedy', 'romance', 'horror', 'thriller'];
            let movie = null;

            // Iterate over the genres and search for the movie in each genre list
            for (const genre of genres) {
                const movieList = data[genre]; // Get movies for this genre
                if (movieList) {
                    movie = movieList.find(m => m.title.toLowerCase() === movieTitle.toLowerCase());
                    if (movie) break; // If the movie is found, exit the loop
                }
            }

            if (movie) {
                // Extract movie details and crew
                const crew = movie.crew || {};

                // Display the movie details dynamically
                document.getElementById('movie-details-container').innerHTML = `
                    <div class="movie-details-card">
                        <img class="movie-details-image" src="${movie.image_url}" alt="${movie.title}" loading="lazy">
                        <div class="movie-details-info">
                            <h1>${movie.title}</h1>
                            <p><strong>Genre:</strong> ${movie.genre}</p>
                            <p><strong>Release Year:</strong> ${movie.release_date}</p>
                            <p><strong>Play Time:</strong> ${movie.play_time}</p>
                            <p><strong>Rating:</strong> ${movie.rating}</p>
                            <p><strong>Description:</strong> ${movie.description}</p>
                            <p><strong>Director:</strong> ${movie.director || 'N/A'}</p>
                            <p><strong>Cast:</strong> ${movie.cast ? movie.cast.join(', ') : 'N/A'}</p>
                            
                            <h3>Crew:</h3>
                            <p><strong>Music:</strong> ${crew.music || 'N/A'}</p>
                            <p><strong>Cinematography:</strong> ${crew.cinematography || 'N/A'}</p>
                            <p><strong>Editing:</strong> ${crew.editing || 'N/A'}</p>
                            <p><strong>Production:</strong> ${crew.production || 'N/A'}</p>

                            <a href="${movie.stream_url}" class="watch-now-btn">Watch Now</a>
                        </div>
                    </div>
                `;
            } else {
                // If movie not found in any genre
                document.getElementById('movie-details-container').innerHTML = '<p>Movie details not available. Please try again.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching movie details:', error);
            document.getElementById('movie-details-container').innerHTML = '<p>Failed to load movie details. Please try again later.</p>';
        });
}

// Call the function to display movie details on page load
displayMovieDetails();


document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById("search-results");
    const mainContainer = document.getElementById('mainContainer');

    const jsonFilePath = '../assets/json/main1.json'; // Path to your JSON file

    // Function to fetch all movies from the JSON file
    async function loadMovies() {
        try {
            const response = await fetch(jsonFilePath);
            if (!response.ok) {
                throw new Error("Network response was not ok: " + response.statusText);
            }
            const data = await response.json();

            // Combine movies from different sections into one array
            let allMovies = [];
            for (const section in data) {
                if (Array.isArray(data[section])) {
                    allMovies = allMovies.concat(data[section]);
                }
            }
            return allMovies;
        } catch (error) {
            console.error("Error fetching movie data:", error);
            return [];
        }
    }

    // Function to display results based on the first letter of the movie name
    function displayResults(results) {
        resultsContainer.innerHTML = ''; // Clear previous results

        if (results.length === 0) {
            resultsContainer.innerHTML = '<p>No movies found</p>';
            return;
        }

        results.forEach(movie => {
            const movieDiv = document.createElement('div');
            movieDiv.classList.add('movie-result');
            const imageUrl = movie.image_url || 'placeholder.jpg'; // Fallback to placeholder image

            movieDiv.innerHTML = `
                <img src="${imageUrl}" alt="${movie.title}" width="100">
                <div>
                    <h3>${movie.title}</h3>
                </div>
            `;

            // Handle movie click event to redirect to the movie details page
            movieDiv.addEventListener('click', function () {
                window.location.href = `/html/some.html?title=${encodeURIComponent(movie.title)}`; // Redirect to the details page
            });

            resultsContainer.appendChild(movieDiv);
        });
    }

    // Handle dynamic search as the user types
    searchInput.addEventListener('input', async function () {
        const searchQuery = searchInput.value.trim().toLowerCase();

        if (searchQuery.length === 0) {
            resultsContainer.innerHTML = ''; // Clear results if no search query
            mainContainer.innerHTML = ''; // Clear main container display
            return;
        }

        // Load all movies
        const movies = await loadMovies();

        // Filter movies based on the first letter of the title
        const filteredMovies = movies.filter(movie => {
            return movie.title && movie.title.toLowerCase().startsWith(searchQuery);
        });

        // Display the filtered results
        displayResults(filteredMovies);
    });
});

