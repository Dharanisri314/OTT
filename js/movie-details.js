



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
                window.location.href = `movie-details.html?title=${encodeURIComponent(movie.title)}`; // Redirect to the details page
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



function displayMovieDetails() {
    // Extract the movie title from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const movieTitle = urlParams.get('title'); // Get the movie title from the query parameter

    // Check if the movie title is provided
    if (!movieTitle) {
        document.getElementById('movie-details-container').innerHTML = '<p>Movie not found.</p>';
        console.error('Movie title not found in URL query parameters.');
        return;
    }

    // Fetch the JSON file containing movie details
    fetch(`/assets/json/main1.json?timestamp=${Date.now()}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch JSON file: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            // Define the genres to look for
            const genres = ['action', 'comedy', 'romance', 'horror', 'thriller'];
            let movie = null;

            // Search for the movie in all genres
            for (const genre of genres) {
                const movieList = data[genre];
                if (movieList) {
                    movie = movieList.find(m => m.title && m.title.toLowerCase() === movieTitle.toLowerCase());
                    if (movie) break;
                }
            }

            // If the movie is found, render its details
            if (movie) {
                const crew = movie.crew || {};
                const imageUrl = movie.image_url || 'placeholder.jpg'; // Fallback for missing images
                document.getElementById('movie-details-container').innerHTML = `
                    <div class="movie-details-card">
                        <img class="movie-details-image" src="${imageUrl}" alt="${movie.title}" loading="lazy">
                        <div class="movie-details-info">
                            <h2>${movie.title}</h2>
                            <p><strong>Genre:</strong> ${movie.genre || 'Unknown'}</p>
                            <p><strong>Director:</strong> ${movie.director || 'N/A'}</p>
                            <p><strong>Release Year:</strong> ${movie.release_date || 'Unknown'}</p>
                            <p><strong>Play Time:</strong> ${movie.play_time || 'Unknown'}</p>
                            <p><strong>Rating:</strong> ${movie.rating || 'N/A'}</p>
                            <p><strong>Description:</strong> ${movie.description || 'No description available.'}</p>
                            <p><strong>Cast:</strong> ${movie.cast ? movie.cast.join(', ') : 'N/A'}</p>
                            <h3>Crew:</h3>
                            <p><strong>Music:</strong> ${crew.music || 'N/A'}</p>
                            <p><strong>Cinematography:</strong> ${crew.cinematography || 'N/A'}</p>
                            <p><strong>Editing:</strong> ${crew.editing || 'N/A'}</p>
                            <p><strong>Production:</strong> ${crew.production || 'N/A'}</p>
                            <a href="${movie.stream_url || '#'}" class="watch-now-btn" target="_blank">Watch Now</a>
                            <button class="trailer-now-btn" data-trailer-url="${movie.trailer_url || ''}">Watch Trailer</button>
                        </div>
                    </div>`;

                // Add event listener to the "Watch Trailer" button
                const trailerButton = document.querySelector('.trailer-now-btn');
                trailerButton.addEventListener('click', () => {
                    const trailerUrl = trailerButton.getAttribute('data-trailer-url');
                    if (trailerUrl) {
                        showTrailer(trailerUrl);
                    } else {
                        alert('Trailer not available.');
                    }
                });
            } else {
                // Handle case when the movie is not found in the JSON
                document.getElementById('movie-details-container').innerHTML = '<p>Movie details not available.</p>';
                console.warn(`Movie titled "${movieTitle}" not found in the JSON data.`);
            }
        })
        .catch(error => {
            // Handle any errors that occur during the fetch or JSON processing
            console.error('Error loading movie details:', error);
            document.getElementById('movie-details-container').innerHTML = '<p>Failed to load movie details.</p>';
        });
}

// Show trailer function
function showTrailer(trailerUrl) {
    const modal = document.getElementById('trailer-modal');
    const trailerVideo = document.getElementById('trailer-video');

    trailerVideo.src = trailerUrl; // Set the trailer video URL
    modal.style.display = 'block'; // Show the modal

    // Close the modal on clicking the close button
    document.querySelector('.close-btn').addEventListener('click', () => {
        modal.style.display = 'none';
        trailerVideo.src = ''; // Stop the video
    });

    // Close the modal when clicking outside the modal content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            trailerVideo.src = ''; // Stop the video
        }
    });
}

// Call the function to display the movie details when the script loads
document.addEventListener('DOMContentLoaded', displayMovieDetails);



function displayMovieList(data) {
    const genres = ['action', 'comedy', 'romance', 'horror', 'thriller'];
    let allMovies = [];

    // Collect movies from all genres
    genres.forEach(genre => {
        const movieList = data[genre];
        if (movieList) {
            allMovies = allMovies.concat(movieList);
        }
    });

    // Limit to 12 movies
    allMovies = allMovies.slice(0, 12);

    // Insert movies into the container dynamically
    const movieListContainer = document.getElementById('movie-list-container');
    movieListContainer.innerHTML = ''; // Clear any existing content

    allMovies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.className = 'movie-list-item';

        // Populate the movie item with data
        movieItem.innerHTML = `
            <img class="movie-list-image" src="${movie.image_url || 'placeholder.jpg'}" alt="${movie.title}" loading="lazy">
            <h3 class="movie-list-title">${movie.title}</h3>
            <p class="movie-description">${movie.description || 'No description available'}</p> <!-- Show description -->
        `;

        // Add click event listener to navigate to the movie details page
        movieItem.addEventListener('click', () => {
            // Redirect to the movie-details.html page with the movie title as a query parameter
            window.location.href = `/html/some.html?title=${encodeURIComponent(movie.title)}`;
        });

        // Append the movie item to the container
        movieListContainer.appendChild(movieItem);
    });
}

// Fetch and display movies
fetch(`/assets/json/main1.json?timestamp=${Date.now()}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Fetched data:', data); // Debugging: Log the fetched data
        displayMovieList(data);
    })
    .catch(error => {
        console.error('Error loading movie list:', error);
    });








