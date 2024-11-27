import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Firebase configuration
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
const db = getFirestore(app);

// Function to create a carousel for a section
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
        movieName.textContent = movie.movie_name;

        // Append image and name to movie card
        movieCard.appendChild(movieImage);
        movieCard.appendChild(movieName);

        // Append movie card to carousel
        carousel.appendChild(movieCard);
    });

    // Append carousel to section container
    sectionContainer.appendChild(carousel);

    // Append section container to main container
    document.getElementById("mainContainer").appendChild(sectionContainer);
}

// Fetch JSON data and populate movies
document.addEventListener("DOMContentLoaded", () => {
    fetch("/assets/json/main1.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            Object.keys(data).forEach(sectionName => {
                createSection(sectionName, data[sectionName]);
            });
        })
        .catch(error => console.error("Error fetching the movie data:", error));
});
