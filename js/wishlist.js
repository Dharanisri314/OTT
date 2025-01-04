// // Initialize Firebase App and Authentication
// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
// import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
// import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// // Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyAL6dgKjaV_N-lneOwWri-N2Xm-bf6UJ7w",
//     authDomain: "ott-platform-cf43e.firebaseapp.com",
//     projectId: "ott-platform-cf43e",
//     storageBucket: "ott-platform-cf43e.appspot.com",
//     messagingSenderId: "844526974291",
//     appId: "1:844526974291:web:11268d750d39062db85da6"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

// // Handle User Login State
// const checkLoginState = () => {
//     const currentUser = auth.currentUser;
//     const userDisplay = document.getElementById('user-display');
//     const logoutButton = document.getElementById('logout-button');
//     const loginButton = document.getElementById('login-button');
    
//     if (userDisplay) {
//         if (currentUser) {
//             userDisplay.textContent = `Welcome, ${currentUser.displayName || 'User'}`;
//             userDisplay.style.display = "inline-block";
//             if (logoutButton) logoutButton.style.display = "inline-block";
//             if (loginButton) loginButton.style.display = "none";
//             displayWishlist(currentUser.uid);
//         } else {
//             userDisplay.style.display = "none";
//             if (logoutButton) logoutButton.style.display = "none";
//             if (loginButton) loginButton.style.display = "inline-block";
//         }
//     } else {
//         console.warn('User display element not found.');
//     }
// };

// // Sign out logic
// const logout = () => {
//     signOut(auth).then(() => {
//         console.log('User signed out');
//         checkLoginState(); // Recheck login state
//     }).catch(error => {
//         console.error('Error signing out:', error);
//     });
// };

// // Display user's wishlist
// const wishlistContainer = document.getElementById('wishlist-container');

// const displayWishlist = async (userId) => {
//     try {
//         const userDocRef = doc(db, "users", userId);
//         const userDoc = await getDoc(userDocRef);

//         if (userDoc.exists()) {
//             const wishlist = userDoc.data().wishlist || [];
//             wishlistContainer.innerHTML = ''; // Clear existing content

//             if (wishlist.length > 0) {
//                 wishlist.forEach((movie) => {
//                     const movieImage = movie.image || "https://via.placeholder.com/150";
//                     const movieTitle = movie.title || "Untitled Movie";
//                     const movieVideo = movie.video || "#";

//                     const movieElement = document.createElement('div');
//                     movieElement.className = 'wishlist-item';
//                     movieElement.innerHTML = `
//                         <img src="${movieImage}" alt="${movieTitle}" class="wishlist-item-image">
//                         <h3>${movieTitle}</h3>
//                         <a href="${movieVideo}" target="_blank" class="wishlist-item-video">Watch Trailer</a>
//                         <button class="delete-btn" data-movie-title="${movieTitle}">Delete</button>
//                     `;
//                     wishlistContainer.appendChild(movieElement);
//                 });

//                 // Add event listeners for delete buttons
//                 const deleteButtons = document.querySelectorAll('.delete-btn');
//                 deleteButtons.forEach(button => {
//                     button.addEventListener('click', (e) => {
//                         const movieTitle = e.target.getAttribute('data-movie-title');
//                         removeMovieFromWishlist(userId, movieTitle);
//                     });
//                 });
//             } else {
//                 wishlistContainer.innerHTML = '<p>No wishlist items found.</p>';
//             }
//         } else {
//             wishlistContainer.innerHTML = '<p>No wishlist items found.</p>';
//         }
//     } catch (error) {
//         console.error('Error fetching wishlist:', error);
//         alert('An error occurred while fetching the wishlist.');
//     }
// };

// // Remove movie from wishlist
// const removeMovieFromWishlist = async (userId, movieTitle) => {
//     try {
//         const userDocRef = doc(db, "users", userId);
//         const userDoc = await getDoc(userDocRef);

//         if (userDoc.exists()) {
//             const wishlist = userDoc.data().wishlist || [];
//             const updatedWishlist = wishlist.filter(movie => movie.title !== movieTitle);

//             // Update the wishlist in Firestore
//             await updateDoc(userDocRef, { wishlist: updatedWishlist });

//             console.log(`${movieTitle} removed from wishlist.`);
//             displayWishlist(userId); // Refresh wishlist UI
//         }
//     } catch (error) {
//         console.error('Error removing movie from wishlist:', error);
//     }
// };

// // Listen for authentication state changes (login/logout)
// onAuthStateChanged(auth, (user) => {
//     checkLoginState(); // Check login state whenever authentication changes
// });

// // Add event listener for logout only after DOM is fully loaded
// document.addEventListener('DOMContentLoaded', () => {
//     const logoutButton = document.getElementById('logout-button');
//     if (logoutButton) {
//         logoutButton.addEventListener('click', logout);
//     }
//     checkLoginState(); // Ensure we check the login state after the DOM is ready
// });


// Movie data (this would be dynamically retrieved or assigned in your app)
const movie = {
    title: "Inception",
    image: "https://image.url",
    video: "https://video.url"
};

// Get the "Add to Wishlist" button element
const addToWishlistButton = document.querySelector('.wishlist-btn');

// Function to update the button text and wishlist in localStorage
const updateWishlist = (movie) => {
    // Get the wishlist from localStorage, or initialize an empty array if none exists
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Check if the movie is already in the wishlist
    if (!wishlist.some(item => item.title === movie.title)) {
        // If not, add it to the wishlist
        wishlist.push(movie);
        localStorage.setItem('wishlist', JSON.stringify(wishlist)); // Save the updated wishlist to localStorage

        // Change the button text to "Remove from Wishlist"
        addToWishlistButton.textContent = 'Remove from Wishlist';

        // Display an alert saying the movie was added
        alert(`${movie.title} has been added to your wishlist.`);
    } else {
        // If the movie is already in the wishlist, remove it
        wishlist = wishlist.filter(item => item.title !== movie.title); // Remove the movie from the array
        localStorage.setItem('wishlist', JSON.stringify(wishlist)); // Save the updated wishlist to localStorage

        // Change the button text back to "Add to Wishlist"
        addToWishlistButton.textContent = 'Add to Wishlist';

        // Display an alert saying the movie was removed
        alert(`${movie.title} has been removed from your wishlist.`);
    }
};

// Add event listener for the "Add to Wishlist" button
if (addToWishlistButton) {
    addToWishlistButton.addEventListener('click', () => {
        updateWishlist(movie);
    });
}

// Function to display the current wishlist
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

        movieElement.innerHTML = `
            <img src="${movie.image || 'https://via.placeholder.com/150'}" alt="${movie.title}" class="wishlist-item-image">
            <h3>${movie.title}</h3>
            <a href="${movie.video || '#'}" target="_blank" class="wishlist-item-video">Watch Trailer</a>
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
