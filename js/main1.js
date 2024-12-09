

function createSection(sectionName, movies) {
    // Create section container
    const sectionContainer = document.createElement("div");
    sectionContainer.classList.add("section-container");

    // Section title
    const sectionTitle = document.createElement("h2");
    sectionTitle.textContent = sectionName.charAt(0).toUpperCase() + sectionName.slice(1);
    sectionContainer.appendChild(sectionTitle);

    // Carousel container
    const carousel = document.createElement("div");
    carousel.classList.add("carousel");

    movies.forEach(movie => {
        // Create movie card
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        // Movie image
        const movieImage = document.createElement("img");
        movieImage.src = movie.image_url;
        movieImage.alt = movie.movie_name;

        // Movie name
        const movieName = document.createElement("h3");
        movieName.classList.add("movie-title"); // Added class for movie title
        movieName.textContent = movie.movie_name;

        // Movie description
        const movieDescription = document.createElement("p");
        movieDescription.textContent = movie.description;

        // Append image, name, and description to movie card
        movieCard.appendChild(movieImage);
        movieCard.appendChild(movieName);
        movieCard.appendChild(movieDescription);

        // Append movie card to carousel
        carousel.appendChild(movieCard);
    });

    // Append carousel to section container
    sectionContainer.appendChild(carousel);

    // Append section container to main container
    document.getElementById("mainContainer").appendChild(sectionContainer);

    // Attach click event listeners after cards are created
    attachMovieCardListeners();
}

// Fetch JSON data and populate movies
document.addEventListener("DOMContentLoaded", () => {
    fetch("../assets/json/main1.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok: " + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Iterate through each section (thriller, horror, action, etc.)
            Object.keys(data).forEach(sectionName => {
                const movies = data[sectionName];
                createSection(sectionName, movies);
            });
        })
        .catch(error => console.error("Error fetching the movie data:", error));
});

// Attach click event listeners to movie cards
function attachMovieCardListeners() {
    document.querySelectorAll(".movie-card").forEach(card => {
        card.addEventListener("click", () => {
            const movieTitle = card.querySelector(".movie-title").textContent;
            // Redirect to next.html with the movie title as a query parameter
            window.location.href = `movie-details.html?title=${encodeURIComponent(movieTitle)}`;
        });
    });
}

     // Real-time search functionality
     const searchInput = document.getElementById("search-input");

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.trim().toLowerCase();
         filterMovies(query);
     });

 // Function to filter movies based on search query
function filterMovies(query) {
    const filteredMovies = {};

     if (query === "") {
         renderSections(allMovies); // If search query is empty, show all movies
         return;
  }

    Object.keys(allMovies).forEach(sectionName => {
        const filtered = allMovies[sectionName].filter(movie =>
            movie.movie_name.toLowerCase().includes(query)
        );
        if (filtered.length > 0) {
            filteredMovies[sectionName] = filtered;
        }
    });

     renderSections(filteredMovies); // Render filtered sections
 }


