
// F

// Function to display movie details
function displayMovieDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieTitle = urlParams.get('title');

    console.log("Movie Title from URL:", movieTitle);  // Check the movie title from URL

    if (!movieTitle) {
        document.getElementById('movie-details-container').innerHTML = '<p>Movie not found.</p>';
        return;
    }

    // Fetch movie data from the JSON file
    fetch(`/assets/json/main1.json?timestamp=${Date.now()}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch movie data: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched movie data:', data);  // Log fetched data

            const genres = ['action', 'comedy', 'romance', 'horror', 'thriller'];
            let movie = null;
            let movieGenre = '';

            // Loop through all genres to find the movie
            for (const genre of genres) {
                const movieList = data[genre];
                console.log(`Checking genre: ${genre}, Movies:`, movieList);

                if (!movieList) {
                    console.warn(`No movies found for genre: ${genre}`);
                    continue;
                }

                // Use Array.find to locate the movie title
                movie = movieList.find(m => m.title && m.title.toLowerCase() === movieTitle.toLowerCase());
                if (movie) {
                    movieGenre = genre;
                    break;
                }
            }

            if (movie) {
                console.log('Found movie:', movie);  // Log the found movie
                // Display the movie details
                document.getElementById('movie-details-container').innerHTML = ` 
                    <div class="movie-details-card">
                        <img class="movie-details-image" src="${movie.image_url}" alt="${movie.title}" loading="lazy">
                        <div class="movie-details-info">
                            <h2>${movie.title}</h2>
                            <p><strong>Genre:</strong> ${movie.genre}</p>
                            <p><strong>Director:</strong> ${movie.director || 'N/A'}</p>
                            <p><strong>Release Year:</strong> ${movie.release_date}</p>
                            <p><strong>Play Time:</strong> ${movie.play_time}</p>
                            <p><strong>Rating:</strong> ${movie.rating}</p>
                            <p><strong>Description:</strong> ${movie.description}</p>
                            <a href="${movie.stream_url}" class="watch-now-btn">Watch Now</a>
                        </div>
                    </div>`;
            } else {
                console.warn('Movie not found.');
                document.getElementById('movie-details-container').innerHTML = '<p>Movie details not available.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching movie data:', error);
            document.getElementById('movie-details-container').innerHTML = '<p>Failed to load movie details.</p>';
        });
}
// Function to display a list of movies (up to 18)
function displayMovieList(data) {
    const genres = ['action', 'comedy', 'romance', 'horror', 'thiller'];
    let allMovies = [];

    // Collect movies from all genres
    genres.forEach(genre => {
        const movieList = data[genre];
        if (movieList) {
            allMovies = allMovies.concat(movieList);
        }
    });

    // Limit to 18 movies
    allMovies = allMovies.slice(0, 18); // Show only the first 18 movies

    // Create headline HTML
    const headlineHTML = `
        <div class="movie-list-headline">
            <h2>Some of the Movies</h2>
        </div>
    `;

    // Generate the movie list HTML
    const movieListHTML = allMovies.map(movie => 
        `<div class="movie-list-item" onclick="showMovieDetails('${movie.title}')">
            <h3 class="movie-list-title">${movie.title}</h3>
            <img class="movie-list-image" src="${movie.image_url}" alt="${movie.title}" loading="lazy">
        </div>`
    ).join('');

    // Insert the headline and movie list into the container
    document.getElementById('movie-list-container').innerHTML = movieListHTML;
}

// Function to show the movie details when a list item is clicked
function showMovieDetails(title) {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('title', title);  // Set the title in the URL
    window.history.pushState({}, '', '?' + urlParams.toString());

    // Re-display the movie details
    displayMovieDetails();
}

// Call the function when the page loads
displayMovieDetails();

// Call the function to display the movie list when the page loads
fetch(`/assets/json/main1.json?timestamp=${Date.now()}`)
    .then(response => response.json())
    .then(data => displayMovieList(data))
    .catch(error => console.error('Error loading movie list:', error));

// Call the function to display movie details when the page loads (if applicable)
displayMovieDetails();
