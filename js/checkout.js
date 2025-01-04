// Simulate Login and Rent Confirmation
document.getElementById('login-form').addEventListener('submit', (event) => {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Perform login authentication (example, not connected to real Firebase)
    if (email === 'user@example.com' && password === 'password123') {
        alert('Login successful!');
        document.querySelector('.login-container').style.display = 'none'; // Hide login form
        document.querySelector('.payment-container').style.display = 'block'; // Show payment form
    } else {
        alert('Invalid credentials. Please try again.');
    }
});

document.getElementById('payment-form').addEventListener('submit', (event) => {
    event.preventDefault();
    
    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;

    // Perform payment validation and API integration here
    if (cardNumber && expiryDate && cvv) {
        alert('Payment successful! Enjoy your movie.');
        window.location.href = 'thank-you.html';  // Redirect to a "Thank You" page or Movie Page
    } else {
        alert('Please complete all payment details.');
    }
});
