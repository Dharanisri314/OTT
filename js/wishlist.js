const displayWishlist = () => {
    const wishlistContainer = document.getElementById('wishlist-container');
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Clear any existing content in the wishlist container
    wishlistContainer.innerHTML = '';

    // Check if the wishlist is empty
    if (wishlist.length === 0) {
        wishlistContainer.innerHTML = '<p>Your wishlist is empty.</p>';
        return;
    }

    // Loop through the wishlist and create an item element for each movie
    wishlist.forEach((movie) => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('wishlist-item');

        // Use the correct image URL from the movie object
        const imageUrl = movie.image_url || 'https://via.placeholder.com/150'; // Fallback image
        // Use the trailer URL from the movie object
        const videoUrl = movie.trailer_url || '#'; // Fallback URL

        movieElement.innerHTML = `
          <img src="${imageUrl}" alt="${movie.title}" class="wishlist-item-image">
          <h3>${movie.title}</h3>
          <a href="${videoUrl}" target="_blank" class="wishlist-item-video">Watch Trailer</a>
          <button class="remove-btn" data-title="${movie.title}">Remove</button>
        `;

        // Append the movie item to the wishlist container
        wishlistContainer.appendChild(movieElement);
    });

    // Add event listeners to the "Remove" buttons in the wishlist
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const movieTitle = e.target.getAttribute('data-title');
            removeMovieFromWishlist(movieTitle);
        });
    });
};

// Function to remove a movie from the wishlist
const removeMovieFromWishlist = (movieTitle) => {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Filter out the movie that needs to be removed
    wishlist = wishlist.filter(item => item.title !== movieTitle);

    // Save the updated wishlist back to localStorage
    localStorage.setItem('wishlist', JSON.stringify(wishlist));

    // Refresh the displayed wishlist
    displayWishlist();

    // Optional: Notify the user that the movie was removed
    alert(`${movieTitle} has been removed from your wishlist.`);
};

// Initially display the wishlist when the page loads
document.addEventListener('DOMContentLoaded', displayWishlist);



// Monitor authentication state
onAuthStateChanged(auth, (user) => {  // Use the imported onAuthStateChanged
    if (user) {
        // User is logged in
        console.log("User logged in:", user.uid);
        displayWishlist(user.uid); // Fetch and display the user's wishlist
    } else {
        // User is not logged in, redirect to login page
        alert("You are not logged in. Redirecting to login page.");
        window.location.href = "login.html"; // Replace with the actual login page URL
    }
});

// Logout functionality
logoutButton.addEventListener('click', () => {
    auth.signOut()
        .then(() => {
            alert("Logout successful.");
            window.location.href = "login.html"; // Redirect to login page
        })
        .catch((error) => {
            console.error("Error logging out:", error.message);
        });
});
m














































































