
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById('search-input');
    const movieContainer = document.getElementById('mainContainer'); // The container where movie sections are created

    // Function to fetch and display all movies initially
    function displayAllMovies() {
        fetch("../assets/json/main1.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok: " + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                // Iterate through each section and display all movies
                Object.keys(data).forEach(sectionName => {
                    const movies = data[sectionName];
                    createSection(sectionName, movies);
                });
            })
            .catch(error => console.error("Error fetching the movie data:", error));
    }

    // Function to filter and display matching movies based on search query
    function filterMovies(query) {
        // Clear the current results
        movieContainer.innerHTML = '';

        // Fetch the movie data again to filter
        fetch("../assets/json/main1.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok: " + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                // Iterate through each section and filter the movies
                Object.keys(data).forEach(sectionName => {
                    const movies = data[sectionName];

                    // Filter movies based on the first letter for partial search
                    const filteredMovies = movies.filter(movie => 
                        movie.movie_name.toLowerCase().startsWith(query.toLowerCase()) || // Matches the start of movie name
                        movie.description.toLowerCase().includes(query.toLowerCase()) // Matches the description anywhere
                    );

                    // Create and display section with filtered movies
                    if (filteredMovies.length > 0) {
                        createSection(sectionName, filteredMovies);
                    }
                });
            })
            .catch(error => console.error("Error fetching the movie data:", error));
    }

    // Function to create and display a section with movies
    function createSection(sectionName, movies) {
        const sectionContainer = document.createElement("div");
        sectionContainer.id = `${sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}`;
        sectionContainer.classList.add("section-container");

        const sectionTitle = document.createElement("h2");
        sectionTitle.textContent = sectionName.charAt(0).toUpperCase() + sectionName.slice(1);
        sectionContainer.appendChild(sectionTitle);

        const carousel = document.createElement("div");
        carousel.classList.add("carousel");

        movies.forEach(movie => {
            const movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");

            const movieImage = document.createElement("img");
            movieImage.src = movie.image_url;
            movieImage.alt = movie.movie_name;

            const movieName = document.createElement("h3");
            movieName.classList.add("movie-title");
            movieName.textContent = movie.movie_name;

            const movieDescription = document.createElement("p");
            movieDescription.textContent = movie.description;

            // Add the click event listener to the movie card for redirection
            movieCard.addEventListener("click", function () {
                window.location.href = `movie-details.html?title=${encodeURIComponent(movie.movie_name)}`;
            });

            movieCard.appendChild(movieImage);
            movieCard.appendChild(movieName);
            movieCard.appendChild(movieDescription);

            carousel.appendChild(movieCard);
        });

        sectionContainer.appendChild(carousel);
        movieContainer.appendChild(sectionContainer);
    }

    // Initially display all movies when the page loads
    displayAllMovies();

    // Event listener for search input (real-time search functionality)
    searchInput.addEventListener("input", function () {
        const query = searchInput.value.trim();
        if (query.length > 0) {
            filterMovies(query); // Trigger real-time search
        } else {
            // If the search input is cleared, display all movies again
            movieContainer.innerHTML = ''; // Clear the container
            displayAllMovies(); // Display all movies
        }
    });

    // Optional: You can add a form submit handler if you are using a form element for search
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent form submission
            const query = searchInput.value.trim();
            if (query.length > 0) {
                filterMovies(query); // Trigger real-time search on form submission
            }
        });
    }
});















const images = document.querySelectorAll(".carousel-image");
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
let currentIndex = 0;

function updateCarousel() {
    images.forEach((img, index) => {
        img.classList.remove("center", "left", "right");

        if (index === currentIndex) {
            img.classList.add("center");
        } else if (index === (currentIndex - 1 + images.length) % images.length) {
            img.classList.add("left");
        } else if (index === (currentIndex + 1) % images.length) {
            img.classList.add("right");
        }
    });

    // Automatically scroll the carousel
    const container = document.querySelector(".movie_slide_container");
    const offset = -currentIndex * (images[0].offsetWidth); // Calculate offset based on the image width
    container.style.transform = `translateX(${offset}px)`;
}

// Move to the next image
function rotateCarousel() {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
}

// Move to the previous image
function prevCarousel() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel();
}

// Next and Previous button functionality
nextButton.addEventListener('click', rotateCarousel);
prevButton.addEventListener('click', prevCarousel);

// Automatically rotate the carousel every 3 seconds
setInterval(rotateCarousel, 3000);

// Initial setup
updateCarousel();

