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
    if (!regex.test(expiryDate)) {
        return false; // Invalid format
    }

    const [month, year] = expiryDate.split("/");

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed
    const currentYear = currentDate.getFullYear() % 100; // Get the last two digits of the year

    const cardMonth = parseInt(month, 10);
    const cardYear = parseInt(year, 10);

    // Check if the card expiry date is in the future or if it is the current month and year
    if (cardYear < currentYear || (cardYear === currentYear && cardMonth < currentMonth)) {
        return false; // Expiry date is in the past
    }

    return true; // Valid expiry date
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
        errorMessage.textContent = "Please enter a valid expiry date (MM/YY), not expired.";
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
        const current = localStorage.getItem("currentMovie");
        localStorage.setItem(`${current}`,"true")
        setTimeout(function () {
            rentedMessage.style.display = "none";
            // Optionally, redirect to a confirmation page after a delay
            window.location.href = `movie-details.html?title=${encodeURIComponent(current)}`; // Example redirect
        }, 2000); // Hide success message after 2 seconds
    } else {
        // If any field is invalid, don't submit form and show alert
        alert("Please fix the errors and try again.");
    }
});
