
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







// Function to update the button state based on the wishlist
function updateButtonState(movie) {
    const addToWishlistButton = document.querySelector('.wishlist-btn');
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Check if the movie is already in the wishlist
    if (wishlist.some(item => item.title === movie.title)) {
        addToWishlistButton.textContent = 'Remove from Wishlist';  // Movie is in wishlist
    } else {
        addToWishlistButton.textContent = 'Add to Wishlist'; // Movie is not in wishlist
    }
}








// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAL6dgKjaV_N-lneOwWri-N2Xm-bf6UJ7w",
    authDomain: "ott-platform-cf43e.firebaseapp.com",
    projectId: "ott-platform-cf43e",
    storageBucket: "ott-platform-cf43e.appspot.com",
    messagingSenderId: "844526974291",
    appId: "1:844526974291:web:11268d750d39062db85da6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


// Function to display movie details
function displayMovieDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieTitle = urlParams.get('title');

    if (!movieTitle) {
        document.getElementById('movie-details-container').innerHTML = '<p>Movie not found.</p>';
        console.error('Movie title not found in URL query parameters.');
        return;
    }

    fetch(`/assets/json/main1.json?timestamp=${Date.now()}`)
        .then(response => {
            if (!response.ok) throw new Error(`Failed to fetch JSON file: ${response.statusText}`);
            return response.json();
        })
        .then(data => {
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

            if (movie) {
                const crew = movie.crew || {};
                const imageUrl = movie.image_url || 'placeholder.jpg';
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
                          <button id="watch-now" class="watch-now-btn">Watch Now</button>
                           <button class="trailer-now-btn" data-trailer-url="${movie.trailer_url || ''}">Watch Trailer</button>
                          <button class="wishlist-btn">Add to Wishlist</button>
                        </div>
                    </div>`;

                const watchNow = document.getElementById("watch-now");
                const logged = sessionStorage.getItem("login");
                watchNow.addEventListener("click", () => {
                    if (logged == "true") {
                        const rented = localStorage.getItem(`${movieTitle}`);
                        if (rented == "true") {
                            window.open(movie.stream_url, '_blank');
                        }
                        else {
                            alert("You Must Pay Rent to Watch Movie");
                            localStorage.setItem(`${movieTitle}`, "false");
                            localStorage.setItem("currentMovie", movieTitle);
                            window.location.href = "checkout.html";
                        }
                    } else {
                        alert("Please login")
                        window.location = "signup.html"
                    }




                });

                // Update the button state based on the current movie
                updateButtonState(movie);

                // Add event listener to handle wishlist button click
                const addToWishlistButton = document.querySelector('.wishlist-btn');
                addToWishlistButton.addEventListener('click', () => handleWishlist(movie));


                // Function to show trailer in a modal
                function showTrailer(trailerUrl) {
                    const modal = document.getElementById('trailer-modal');
                    const trailerVideo = document.getElementById('trailer-video');

                    if (!trailerUrl) {
                        console.error('Trailer URL is not available.');
                        return;
                    }

                    trailerVideo.src = trailerUrl;
                    modal.style.display = 'block'; // Show the modal

                    // Add event listener for close button inside the modal
                    const closeBtn = document.querySelector('.close-btn');
                    if (closeBtn) {
                        closeBtn.addEventListener('click', () => {
                            modal.style.display = 'none';
                            trailerVideo.src = ''; // Stop the video
                        });
                    }

                    // Close the modal when clicking outside the modal content
                    window.addEventListener('click', (event) => {
                        if (event.target === modal) {
                            modal.style.display = 'none';
                            trailerVideo.src = ''; // Stop the video
                        }
                    });
                }

                // Event listener for "Watch Trailer" button
                const trailerButton = document.querySelector('.trailer-now-btn');
                if (trailerButton) {
                    trailerButton.addEventListener('click', () => {
                        const trailerUrl = trailerButton.getAttribute('data-trailer-url');
                        if (trailerUrl) {
                            showTrailer(trailerUrl);
                        } else {
                            console.error('No trailer URL available');
                        }
                    });
                }

                // Event listener for "Add to Wishlist" button
                const wishlistButton = document.querySelector('.wishlist-btn');
                if (wishlistButton) {
                    wishlistButton.addEventListener('click', () => {
                        checkLoginAndPerformAction(() => {
                            saveToWishlist(movie); // Function to save movie to wishlist
                        });
                    });
                }

                // Event listener for "Remove from Wishlist" button
                const removeWishlistButton = document.querySelector('.remove-wishlist-btn');
                if (removeWishlistButton) {
                    removeWishlistButton.addEventListener('click', () => {
                        checkLoginAndPerformAction(() => {
                            removeFromWishlist(movie); // Function to remove movie from wishlist
                        });
                    });
                }
            } else {
                document.getElementById('movie-details-container').innerHTML = '<p>Movie details not available.</p>';
                console.warn(`Movie titled "${movieTitle}" not found in the JSON data.`);
            }
        })
        .catch(error => {
            console.error('Error loading movie details:', error);
            document.getElementById('movie-details-container').innerHTML = '<p>Failed to load movie details.</p>';
        });
}






// Function to save a movie to the user's wishlist
async function saveToWishlist(movie) {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const userRef = doc(db, "users", user.uid);
            try {
                await updateDoc(userRef, {
                    wishlist: arrayUnion({
                        title: movie.title,
                        image: movie.image_url || 'placeholder.jpg',
                        video: movie.trailer_url || ''
                    })
                });

            } catch (error) {
                console.error("Error adding to wishlist:", error.message);
                alert("Failed to add the movie to the wishlist.");
            }
        } else {
            alert("You must be logged in to add movies to your wishlist.");
        }
    });
}

// Function to remove a movie from the user's wishlist
async function removeFromWishlist(movie) {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const userRef = doc(db, "users", user.uid);
            try {
                await updateDoc(userRef, {
                    wishlist: arrayRemove({
                        title: movie.title,
                        image: movie.image_url || 'placeholder.jpg',
                        video: movie.trailer_url || ''
                    })
                });
                alert("Movie removed from your wishlist!");
            } catch (error) {
                console.error("Error removing from wishlist:", error.message);
                alert("Failed to remove the movie from the wishlist.");
            }
        } else {
            alert("You must be logged in to remove movies from your wishlist.");
        }
    });
}


// Function to handle adding/removing the movie from the wishlist
function handleWishlist(movie) {

    const loginned = sessionStorage.getItem("login");
    if (!loginned) {
        alert('You must log in to add movies to your wishlist.');
    }
    else {
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

        if (!wishlist.some(item => item.title === movie.title)) {
            // Movie is not in the wishlist, add it
            wishlist.push(movie);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            alert(`${movie.title} has been added to your wishlist.`);
        } else {
            // Movie is in the wishlist, remove it
            wishlist = wishlist.filter(item => item.title !== movie.title);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            alert(`${movie.title} has been removed from your wishlist.`);
        }

        // Update the button state after modifying the wishlist
        updateButtonState(movie);
    }
}





// Call the function to display movie details on page load
document.addEventListener('DOMContentLoaded', displayMovieDetails);
const userDisplay = document.getElementById("user-display");

// Monitor authentication state
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.exists() ? userDoc.data() : null;

        if (userData) {
            userDisplay.textContent = userData.username;
            userDisplay.style.display = "inline-block"; // Show user display

        }
    } else {
        userDisplay.style.display = "none"; // Hide user display

    }
});

