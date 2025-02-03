// Get references to DOM elements
const movieTitleElement = document.getElementById("movie-title");
const totalPriceElement = document.getElementById("total-price");
const planTypeElement = document.getElementById("plan-type");
const movieImageElement = document.getElementById("movie-image");
const rentedMessage = document.getElementById("rented-success-message");

// Retrieve rental details from localStorage
const rentedMovieTitle = localStorage.getItem('rentedMovie'); // Movie title
const rentedMoviePrice = localStorage.getItem('rentedMoviePrice'); // Movie price
const rentedMovieImage = localStorage.getItem('rentedMovieImage'); // Movie image URL
const rentedMoviePlan = localStorage.getItem('rentedMoviePlan'); // Movie plan type

if (rentedMovieTitle && rentedMoviePrice && rentedMovieImage && rentedMoviePlan) {
    // Display the movie title, price, and image dynamically
    movieTitleElement.textContent = rentedMovieTitle;
    totalPriceElement.textContent = rentedMoviePrice;
    planTypeElement.textContent = rentedMoviePlan;
    movieImageElement.src = rentedMovieImage;
    rentedMessage.style.display = "block"; // Show rental confirmation message
} 

// Optionally, clear rental data from localStorage after successful rental confirmation
localStorage.removeItem('rentedMovie');
localStorage.removeItem('rentedMoviePrice');
localStorage.removeItem('rentedMovieImage');
localStorage.removeItem('rentedMoviePlan');


