// Function to display rented movies on the profile page
function displayRentedMovies() {
    const rentedMoviesContainer = document.getElementById('rented-movie-container');
    const rentedMovies = JSON.parse(localStorage.getItem('rentedMovies')) || [];

    // Clear the container before displaying new data
    rentedMoviesContainer.innerHTML = '';

    if (rentedMovies.length > 0) {
        rentedMovies.forEach(movie => {
            // Create a new movie element
            const movieElement = document.createElement('div');
            movieElement.classList.add('rented-movie');
            movieElement.innerHTML = `
                <h3>${movie.title}</h3>
                <p>Price: ₹${parseInt(movie.price).toLocaleString()}</p>
                <img src="${movie.image}" alt="Rented Movie" style="max-width: 300px;">
            `;
            // Append the movie element to the rented movies container
            rentedMoviesContainer.appendChild(movieElement);
        });
    } else {
        rentedMoviesContainer.innerHTML = '<p>No rented movies found.</p>';
    }
}

// Event listener for the "Rented" button
document.getElementById('rented-button').addEventListener('click', function () {
    displayRentedMovies(); // Display the rented movies when the button is clicked
});
