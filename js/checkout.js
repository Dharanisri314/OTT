// Get references to DOM elements
const movieTitleElement = document.getElementById("movie-title");
const totalPriceElement = document.getElementById("total-price");
const planSelectElement = document.getElementById("plans");
const checkoutForm = document.getElementById("checkout-form");
const rentedMessage = document.getElementById("rented-success-message");

// Set movie title (this can be dynamic if needed)
movieTitleElement.textContent = "Inception"; // Example movie title, can be replaced dynamically

// Define prices for each subscription plan
const prices = {
    weekly: 750,
    monthly: 2250,
    "24hours": 375
};

// Update total price when subscription plan is changed
planSelectElement.addEventListener("change", function () {
    const selectedPlan = planSelectElement.value;
    const price = prices[selectedPlan];
    totalPriceElement.textContent = price;
});

// Function to validate card number using Luhn Algorithm (basic card validation)
function validateCardNumber(cardNumber) {
    const regex = /^[0-9]{16}$/; // Check if the card number is 16 digits
    return regex.test(cardNumber);
}

// Function to validate expiry date (MM/YY)
function validateExpiryDate(expiryDate) {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/; // Format MM/YY
    return regex.test(expiryDate);
}

// Function to validate CVV (3 digits)
function validateCVV(cvv) {
    const regex = /^[0-9]{3}$/; // CVV should be 3 digits
    return regex.test(cvv);
}

// Handle form submission
checkoutForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form from refreshing the page

    // Get form values
    const cardNumber = document.getElementById("card-number").value;
    const expiryDate = document.getElementById("expiry-date").value;
    const cvv = document.getElementById("cvv").value;

    let valid = true;

    // Clear previous error messages
    const errorElements = document.querySelectorAll(".error-message");
    errorElements.forEach((el) => el.remove());

    // Validate card number
    if (!validateCardNumber(cardNumber)) {
        valid = false;
        const errorMessage = document.createElement("p");
        errorMessage.classList.add("error-message");
        errorMessage.textContent = "Please enter a valid 16-digit card number.";
        document.getElementById("card-number").insertAdjacentElement("afterend", errorMessage);
    }

    // Validate expiry date
    if (!validateExpiryDate(expiryDate)) {
        valid = false;
        const errorMessage = document.createElement("p");
        errorMessage.classList.add("error-message");
        errorMessage.textContent = "Please enter a valid expiry date (MM/YY).";
        document.getElementById("expiry-date").insertAdjacentElement("afterend", errorMessage);
    }

    // Validate CVV
    if (!validateCVV(cvv)) {
        valid = false;
        const errorMessage = document.createElement("p");
        errorMessage.classList.add("error-message");
        errorMessage.textContent = "Please enter a valid CVV (3 digits).";
        document.getElementById("cvv").insertAdjacentElement("afterend", errorMessage);
    }

    // If all fields are valid, show success message
    if (valid) {
        rentedMessage.style.display = "block";
        setTimeout(function () {
            rentedMessage.style.display = "none";
            // Optionally, redirect to a confirmation page after a delay
            window.location.href = "../html/thankyou.html"; // Example redirect
        }, 2000); // Hide success message after 2 seconds
    } else {
        // If any field is invalid, don't submit form and show alert
        alert("Please fix the errors and try again.");
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
