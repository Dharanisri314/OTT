// Function to display error messages
function displayError(element, message) {
    const errorElement = document.createElement('p');
    errorElement.classList.add('error');
    errorElement.innerText = message;
    element.parentElement.appendChild(errorElement);
}

// Clear previous error messages
function clearErrors() {
    const errorMessages = document.querySelectorAll('.error');
    errorMessages.forEach(error => error.remove());
}

// Handle form submission for payment details
document.getElementById('checkout-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting automatically

    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;

    const cardNumberRegex = /^\d{16}$/;
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvRegex = /^\d{3}$/;

    let isValid = true;
    clearErrors();

    // Validate input fields
    if (!cardNumberRegex.test(cardNumber)) {
        isValid = false;
        displayError(document.getElementById('card-number'), 'Card number must be 16 digits.');
    }
    if (!expiryDateRegex.test(expiryDate)) {
        isValid = false;
        displayError(document.getElementById('expiry-date'), 'Expiry date must be in MM/YY format.');
    }
    if (!cvvRegex.test(cvv)) {
        isValid = false;
        displayError(document.getElementById('cvv'), 'CVV must be 3 digits.');
    }

    if (isValid) {
        // Retrieve the rented movie array from localStorage
        const rentedMovies = JSON.parse(localStorage.getItem('rentedMovies')) || [];

        // Retrieve the last rented movie details
        const movieTitle = localStorage.getItem('rentedMovie');
        const moviePrice = localStorage.getItem('rentedMoviePrice');
        const movieImage = localStorage.getItem('rentedMovieImage');

        // Check if the necessary movie details exist
        if (!movieTitle || !moviePrice || !movieImage) {
            alert('Movie details are missing. Please rent a movie before proceeding.');
            return;
        }

        // Add the rented movie to the array
        rentedMovies.push({
            title: movieTitle,
            price: moviePrice,
            image: movieImage
        });

        // Save the updated rented movies array to localStorage
        localStorage.setItem('rentedMovies', JSON.stringify(rentedMovies));

        // Show success message
        document.getElementById('rented-success-message').style.display = 'block';

        // Redirect to "Thank You" page after a short delay
        setTimeout(function () {
            window.location.href = 'thank-you.html'; // Redirect after successful payment
        }, 2000);
    } else {
        alert('Please correct the errors before submitting.');
    }
});








// // Checkout page
// window.addEventListener('DOMContentLoaded', function() {
//     const movieTitle = localStorage.getItem('rentedMovie');
//     const moviePrice = localStorage.getItem('rentedMoviePrice');
//     const movieImage = localStorage.getItem('rentedMovieImage'); // Get the image URL

//     if (movieTitle && moviePrice && movieImage) {
//         // Update the movie title, price, and image on the page
//         document.getElementById('movie-title').innerText = movieTitle;
//         document.getElementById('movie-total-price').innerText = parseInt(moviePrice).toLocaleString(); // Ensure price is a number
//         document.getElementById('movie-image').src = movieImage; // Display the movie image
//     } else {
//         alert("Movie details not found. Please try again.");
//         window.location.href = 'index.html';  // Redirect to homepage if no movie data is found
//     }
// });


// // Handle form submission for payment details
// document.getElementById('checkout-form').addEventListener('submit', function (event) {
//     event.preventDefault(); // Prevent form from submitting automatically

//     const cardNumber = document.getElementById('card-number').value;
//     const expiryDate = document.getElementById('expiry-date').value;
//     const cvv = document.getElementById('cvv').value;

//     const cardNumberRegex = /^\d{16}$/;
//     const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
//     const cvvRegex = /^\d{3}$/;

//     let isValid = true;

//     // Validate input fields
//     if (!cardNumberRegex.test(cardNumber)) {
//         isValid = false;
//         displayError(document.getElementById('card-number'), 'Card number must be 16 digits.');
//     }
//     if (!expiryDateRegex.test(expiryDate)) {
//         isValid = false;
//         displayError(document.getElementById('expiry-date'), 'Expiry date must be in MM/YY format.');
//     }
//     if (!cvvRegex.test(cvv)) {
//         isValid = false;
//         displayError(document.getElementById('cvv'), 'CVV must be 3 digits.');
//     }

//     if (isValid) {
//         // Show the rented success message
//         document.getElementById('rented-success-message').style.display = 'block';

//         // Save rental details in localStorage
//         localStorage.setItem('rentalStatus', 'Rented');
//         localStorage.setItem('rentedMovie', movieTitle); // Save the title of the rented movie
//         localStorage.setItem('rentedMoviePrice', moviePrice); // Save the price
//         localStorage.setItem('rentedMovieImage', movieImage); // Save the movie image URL

//         // Redirect after a few seconds to a "Thank You" page
//         setTimeout(function() {
//             window.location.href = '../html/Rent.html';  // Redirect to the rented page
//         }, 2000);
//     } else {
//         alert('Please correct the errors before submitting.');
//     }
// });

// // Function to display error messages
// function displayError(element, message) {
//     const errorElement = document.createElement('p');
//     errorElement.classList.add('error');
//     errorElement.innerText = message;
//     element.parentElement.appendChild(errorElement);
// }

// // Clear previous error messages
// function clearErrors() {
//     const errorMessages = document.querySelectorAll('.error');
//     errorMessages.forEach(error => error.remove());
// }
