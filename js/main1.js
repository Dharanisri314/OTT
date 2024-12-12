

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById('search-input');
    const movieContainer = document.getElementById('mainContainer'); // The container where movie sections are created
    const resultsContainer = document.getElementById("search-results");

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
            resultsContainer.innerHTML = ""; // Clear results if the query is empty
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


























































































































































document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('search-results');
    const selectedMovieContainer = document.getElementById('selected-movie-container'); // To display the selected movie's image and title

    const jsonFilePath = '../assets/json/main1.json'; // Update with the correct path to your JSON file

    // Load the movies from the JSON file
    async function loadMovies() {
        try {
            const response = await fetch(jsonFilePath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            // Combine movies from all categories into a single array
            let allMovies = [];
            for (const category in data) {
                if (Array.isArray(data[category])) {
                    allMovies = allMovies.concat(data[category]);
                }
            }
            return allMovies;
        } catch (error) {
            console.error("Error fetching movies: ", error);
            return [];
        }
    }

    // Display the search results
    function displayResults(results) {
        // Clear previous results
        resultsContainer.innerHTML = '';

        if (results.length === 0) {
            resultsContainer.innerHTML = '<p>No movies found</p>';
            return;
        }

        // Display each result
        results.forEach(movie => {
            const movieDiv = document.createElement('div');
            movieDiv.classList.add('movie-result');
            const imageUrl = movie.image_url || 'placeholder.jpg'; // Fallback to a placeholder image

            movieDiv.innerHTML = `
                <img src="${imageUrl}" alt="${movie.title}" width="100">
                <div>
                    <h3>${movie.title}</h3>
                </div>
            `;
            resultsContainer.appendChild(movieDiv);

            // When clicking on the movie image, populate the search bar with the movie title
            movieDiv.addEventListener('click', function () {
                searchInput.value = movie.title; // Populate search input with the movie title
                resultsContainer.innerHTML = ''; // Clear results after selection

                // Display the selected movie below the search bar
                displaySelectedMovie(movie);
            });
        });
    }

    // Display the selected movie's image and title
    function displaySelectedMovie(movie) {
        selectedMovieContainer.innerHTML = `
            <img src="${movie.image_url || 'placeholder.jpg'}" alt="${movie.title}" width="200">
            <h3>${movie.title}</h3>
        `;
    }

    // Handle dynamic search as the user types
    searchInput.addEventListener('input', async function () {
        const searchQuery = searchInput.value.trim().toLowerCase();

        if (searchQuery.length === 0) {
            resultsContainer.innerHTML = ''; // Clear results if no search query
            selectedMovieContainer.innerHTML = ''; // Clear selected movie display
            return;
        }

        // Load movies data
        const movies = await loadMovies();

        // Filter the movies based on the search query (first letter of the title)
        const filteredMovies = movies.filter(movie => {
            return movie.title && movie.title.toLowerCase().startsWith(searchQuery);
        });

        // Display the results
        displayResults(filteredMovies);
    });
});












document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('search-results');

    const jsonFilePath = '../assets/json/main1.json'; // Update with the correct path to your JSON file

    // Load the movies from the JSON file
    async function loadMovies() {
        try {
            const response = await fetch(jsonFilePath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            // Combine movies from all categories into a single array
            let allMovies = [];
            for (const category in data) {
                if (Array.isArray(data[category])) {
                    allMovies = allMovies.concat(data[category]);
                }
            }
            return allMovies;
        } catch (error) {
            console.error("Error fetching movies: ", error);
            return [];
        }
    }

    // Display the search results
    function displayResults(results) {
        // Clear previous results
        resultsContainer.innerHTML = '';

        if (results.length === 0) {
            resultsContainer.innerHTML = '<p>No movies found</p>';
            return;
        }

        // Display each result
        results.forEach(movie => {
            const movieDiv = document.createElement('div');
            movieDiv.classList.add('movie-result');
            const imageUrl = movie.image_url || 'placeholder.jpg'; // Fallback to a placeholder image

            movieDiv.innerHTML = `
                <img src="${imageUrl}" alt="${movie.title}" width="100">
                <div>
                    <h3>${movie.title}</h3>
                </div>
            `;
            resultsContainer.appendChild(movieDiv);

            // When clicking on the movie image, populate the search bar with the movie title
            movieDiv.addEventListener('click', function () {
                searchInput.value = movie.title; // Populate search input with the movie title
                resultsContainer.innerHTML = ''; // Clear results after selection
                // Optionally, you can redirect to a movie page here
                // window.location.href = `/movie/${movie.id}`;
            });
        });
    }

    // Handle dynamic search as the user types
    searchInput.addEventListener('input', async function () {
        const searchQuery = searchInput.value.trim().toLowerCase();

        if (searchQuery.length === 0) {
            resultsContainer.innerHTML = ''; // Clear results if no search query
            return;
        }

        // Load movies data
        const movies = await loadMovies();

        // Filter the movies based on the search query (first letter of the title)
        const filteredMovies = movies.filter(movie => {
            return movie.title && movie.title.toLowerCase().startsWith(searchQuery);
        });

        // Display the results
        displayResults(filteredMovies);
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('search-results');
    const selectedMovieContainer = document.getElementById('selected-movie-container');
    
    const jsonFilePath = '../assets/json/main1.json'; // Ensure this points to your JSON file

    // Load movies from JSON file
    async function loadMovies() {
        try {
            const response = await fetch(jsonFilePath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            // Combine all movies from different categories into one array
            let allMovies = [];
            for (const category in data) {
                if (Array.isArray(data[category])) {
                    allMovies = allMovies.concat(data[category]);
                }
            }
            return allMovies;
        } catch (error) {
            console.error("Error fetching movies:", error);
            return [];
        }
    }

    // Function to display results (filtered movies)
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

            // Handle movie click event
            movieDiv.addEventListener('click', function () {
                searchInput.value = movie.title; // Populate search input with the movie title
                resultsContainer.innerHTML = ''; // Clear results after selection
                displaySelectedMovie(movie); // Display the selected movie below the search bar
            });

            resultsContainer.appendChild(movieDiv);
        });
    }

    // Function to display the selected movie below the search bar
    function displaySelectedMovie(movie) {
        selectedMovieContainer.innerHTML = `
            <img src="${movie.image_url || 'placeholder.jpg'}" alt="${movie.title}" width="200">
            <h3>${movie.title}</h3>
        `;
    }

    // Handle dynamic search as the user types
    searchInput.addEventListener('input', async function () {
        const searchQuery = searchInput.value.trim().toLowerCase();

        if (searchQuery.length === 0) {
            resultsContainer.innerHTML = ''; // Clear results if no search query
            selectedMovieContainer.innerHTML = ''; // Clear selected movie display
            return;
        }

        // Load the movie data
        const movies = await loadMovies();

        // Filter movies based on the first letter of the title
        const filteredMovies = movies.filter(movie => {
            return movie.title && movie.title.toLowerCase().startsWith(searchQuery);
        });

        // Display the filtered results
        displayResults(filteredMovies);
    });
});









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

    // Function to display the search results
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

            // Handle movie click event to show the selected movie below the search bar
            movieDiv.addEventListener('click', function () {
                searchInput.value = movie.title; // Populate search input with the movie title
                resultsContainer.innerHTML = ''; // Clear results after selection
                displaySelectedMovie(movie); // Display the selected movie in the main container
            });

            resultsContainer.appendChild(movieDiv);
        });
    }

    // Function to display the selected movie in the main container
    function displaySelectedMovie(movie) {
        mainContainer.innerHTML = `
            <div class="selected-movie">
                <img src="${movie.image_url || 'placeholder.jpg'}" alt="${movie.title}" width="200">
                <h3>${movie.title}</h3>
                <p>${movie.description || 'No description available.'}</p>
            </div>
        `;
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

        // Filter movies based on the exact name match (case-insensitive)
        const filteredMovies = movies.filter(movie => {
            return movie.title && movie.title.toLowerCase() === searchQuery;
        });

        // Display the filtered results
        displayResults(filteredMovies);
    });

});
















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
