// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth,signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAL6dgKjaV_N-lneOwWri-N2Xm-bf6UJ7w",
    authDomain: "ott-platform-cf43e.firebaseapp.com",
    projectId: "ott-platform-cf43e",
    storageBucket: "ott-platform-cf43e.firebasestorage.app",
    messagingSenderId: "844526974291",
    appId: "1:844526974291:web:11268d750d39062db85da6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", async function () {
    const userDisplay = document.getElementById("user-display");
    const logoutButton = document.getElementById("logout-button");
    const loginButton = document.getElementById("login-button");
    const searchInput = document.getElementById("search-input");
    const resultsContainer = document.getElementById("search-results");
    const movieContainer = document.getElementById("mainContainer");

    const jsonFilePath = 'assets/json/main1.json'; // Path to your JSON file

    // Monitor authentication state
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            const userData = userDoc.exists() ? userDoc.data() : null;

            if (userData) {
                userDisplay.textContent = userData.username;
                userDisplay.style.display = "inline-block"; // Show user display
                logoutButton.style.display = "inline-block"; // Show logout button
                loginButton.style.display = "none"; // Hide login button
            }
        } else {
            userDisplay.style.display = "none"; // Hide user display
            logoutButton.style.display = "none"; // Hide logout button
            loginButton.style.display = "inline-block"; // Show login button
        }
    });

    // Logout functionality
    function updateButtonToLogout() {
        if(logoutButton){
            logoutButton.textContent = 'Logout';
            logoutButton.addEventListener('click', function () {
                if(confirm('Are you sure you are leaving the Filmki shamiksha?')){
                    signOut(auth).then(() => {
                        alert("Thank you for visiting Filmki shamiksha.");
                        updateButtonToLogin();
                    }).catch((error) => {
                        console.error("Error logging out:", error.message);
                    });
                }
            });
        }
    }
    
    // Update button to Login
    function updateButtonToLogin() {
        if(logoutButton){
            logoutButton.textContent = 'Login';
            logoutButton.removeEventListener('click', updateButtonToLogout);
        }
    
    }
    
    // Monitor authentication state
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is logged in, change button to Logout
            updateButtonToLogout();
        } else {
            // No user logged in, change button to Login
            updateButtonToLogin();
        }
    });
    

    // Fetch movie data
    async function fetchMovies() {
        try {
            const response = await fetch(jsonFilePath);
            if (!response.ok) {
                throw new Error("Network response was not ok: " + response.statusText);
            }
            const data = await response.json();
            console.log("Fetched movie data:", data); // Debugging log
            return data;
        } catch (error) {
            console.error("Error fetching movie data:", error);
            return {};
        }
    }

    // Create sections dynamically
    function createSection(sectionName, movies) {
        const sectionContainer = document.createElement("div");
        sectionContainer.id = `${sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}`;
        sectionContainer.classList.add("section-container");

        const sectionTitle = document.createElement("h2");
        sectionTitle.textContent = `${sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}`;
        sectionContainer.appendChild(sectionTitle);

        const carousel = document.createElement("div");
        carousel.classList.add("carousel");

        movies.forEach(movie => {
            const movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");

            const movieImage = document.createElement("img");
            const imageUrl = movie.image_url || 'placeholder.jpg'; // Fallback to placeholder image
            console.log("Movie image URL:", imageUrl); // Debugging log
            movieImage.src = imageUrl;
            movieImage.alt = movie.movie_name || "Movie Image";

            const movieName = document.createElement("h3");
            movieName.classList.add("movie-title");
            movieName.textContent = movie.movie_name;

            const movieDescription = document.createElement("p");
            movieDescription.textContent = movie.description;

            // Add click event for redirection
            movieCard.addEventListener("click", function () {
                window.location.href = `html/movie-details.html?title=${encodeURIComponent(movie.movie_name)}`;
            });

            movieCard.appendChild(movieImage);
            movieCard.appendChild(movieName);
            movieCard.appendChild(movieDescription);
            carousel.appendChild(movieCard);
        });

        sectionContainer.appendChild(carousel);
        movieContainer.appendChild(sectionContainer);
    }

    // Display all movies
    async function displayAllMovies() {
        const data = await fetchMovies();
        Object.keys(data).forEach(sectionName => {
            const movies = data[sectionName];
            if (Array.isArray(movies)) {
                createSection(sectionName, movies);
            }
        });
    }

    // Load all movies for search
    async function loadMovies() {
        const data = await fetchMovies();
        let allMovies = [];
        for (const section in data) {
            if (Array.isArray(data[section])) {
                allMovies = allMovies.concat(data[section]);
            }
        }
        return allMovies;
    }

    // Display search results
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

            console.log("Search result movie image URL:", imageUrl); // Debugging log
            movieDiv.innerHTML = `
                <img src="${imageUrl}" alt="${movie.movie_name}" width="100">
                <div>
                    <h3>${movie.movie_name}</h3>
                </div>
            `;

            movieDiv.addEventListener('click', function () {
                window.location.href = `html/movie-details.html?title=${encodeURIComponent(movie.movie_name)}`;
            });

            resultsContainer.appendChild(movieDiv);
        });
    }

    // Handle dynamic search input
    if (searchInput) {
        searchInput.addEventListener('input', async function () {
            const searchQuery = searchInput.value.trim().toLowerCase();

            if (searchQuery.length === 0) {
                resultsContainer.innerHTML = ''; // Clear results if no search query
                movieContainer.innerHTML = ''; // Clear main container display
                displayAllMovies(); // Redisplay all movies
                return;
            }

            const movies = await loadMovies();
            const filteredMovies = movies.filter(movie => movie.movie_name && movie.movie_name.toLowerCase().startsWith(searchQuery));
            displayResults(filteredMovies);
        });
    }

    // Display all movies on page load
    displayAllMovies();
});



const images = document.querySelectorAll(".carousel-image");
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

  const container = document.getElementById("movieSlideContainer");
  const offset = -currentIndex * images[0].offsetWidth;
  container.style.transform = `translateX(${offset}px)`;
}

function rotateCarousel() {
  currentIndex = (currentIndex + 1) % images.length;
  updateCarousel();
}

// Set up interval for automatic rotation
const interval = setInterval(rotateCarousel, 3000); // Rotate every 3 seconds

// Add button functionality
document.getElementById("prevButton").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateCarousel();
});

document.getElementById("nextButton").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateCarousel();
});

// Optional: Pause rotation on hover
const sliderContainer = document.querySelector(".slider-container");
sliderContainer.addEventListener("mouseover", () => clearInterval(interval));
sliderContainer.addEventListener("mouseleave", () => setInterval(rotateCarousel, 3000));

// Initial setup
updateCarousel();





// Elements
const logoutButton = document.getElementById("logout-button");
const loginButton = document.getElementById("login-button");
const usernameDisplay = document.getElementById("usernameDisplay");
const usernameContainer = document.getElementById("username-container");

// Initially hide logout button and username (logged out state)
logoutButton.style.display = "none";
usernameContainer.style.display = "none";

// Simulate login action
loginButton.addEventListener("click", () => {
    loginButton.style.display = "none"; // Hide login button
    logoutButton.style.display = "inline-block"; // Show logout button
    usernameContainer.style.display = "block"; // Show username
});

// Simulate logout action
logoutButton.addEventListener("click", () => {
    logoutButton.style.display = "none"; // Hide logout button
    loginButton.style.display = "inline-block"; // Show login button
    usernameContainer.style.display = "none"; // Hide username
});











