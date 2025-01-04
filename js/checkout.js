// Handle the change of the subscription plan and update the total price
document.getElementById('plans').addEventListener('change', function() {
    const plan = this.value;
    let price = 0;

    if (plan === 'weekly') {
        price = 750; // Weekly price in INR
    } else if (plan === 'monthly') {
        price = 2250; // Monthly price in INR
    } else if (plan === '24hours') {
        price = 375; // 24 hours price in INR
    }

    // Update the displayed total price
    document.getElementById('total-price').innerText = price;
});

// Handle form submission
document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;
    
    // Basic validation for payment details
    const cardNumberRegex = /^\d{16}$/;
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvRegex = /^\d{3}$/;

    if (cardNumberRegex.test(cardNumber) && expiryDateRegex.test(expiryDate) && cvvRegex.test(cvv)) {
        alert('Payment successful! Enjoy your movie.');
        window.location.href = 'thank-you.html';  // Redirect to a "Thank You" page
    } else {
        alert('Please complete all payment details correctly.');
    }
});
