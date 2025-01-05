document.getElementById('rent-button').addEventListener('click', function () {
    // Get the movie details from the page
    const movieTitle = document.getElementById('movie-title').textContent;
    const moviePrice = document.getElementById('movie-price').textContent.replace('₹', '').trim(); // Remove ₹ and trim spaces
    const movieImage = document.getElementById('movie-image').src;

    // Create a movie object
    const movie = {
        title: movieTitle,
        price: moviePrice,
        image: movieImage
    };

    // Retrieve existing rented movies or initialize an empty array
    const rentedMovies = JSON.parse(localStorage.getItem('rentedMovies')) || [];

    // Add the new movie to the rented movies array
    rentedMovies.push(movie);

    // Save the updated rented movies array to localStorage
    localStorage.setItem('rentedMovies', JSON.stringify(rentedMovies));

    // Display rented movie immediately on the page (dynamically update the section)
    displayRentedMovies(); // Call the function to display all rented movies

    // Show success message
    alert(`${movieTitle} has been rented successfully!`);
});

// Function to dynamically display rented movies on the page
function displayRentedMovies() {
    const rentedMoviesContainer = document.getElementById('rented-movies-container');

    // Retrieve the rented movies from localStorage
    const rentedMovies = JSON.parse(localStorage.getItem('rentedMovies')) || [];

    // Clear the container before displaying
    rentedMoviesContainer.innerHTML = '';

    // Check if there are rented movies
    if (rentedMovies.length > 0) {
        // Loop through each rented movie and create the HTML to display
        rentedMovies.forEach(movie => {
            rentedMoviesContainer.innerHTML += `
                <div class="rented-movie">
                    <h3>${movie.title}</h3>
                    <p>Price: ₹${parseInt(movie.price).toLocaleString()}</p>
                    <img src="${movie.image}" alt="Rented Movie" style="max-width: 300px;">
                </div>
            `;
        });
    } else {
        rentedMoviesContainer.innerHTML = '<p>No rented movies found.</p>';
    }
}

// On page load, display the rented movies
document.addEventListener("DOMContentLoaded", function() {
    displayRentedMovies(); // Display movies stored in localStorage when the page loads
});
