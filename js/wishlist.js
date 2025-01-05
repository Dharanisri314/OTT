import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAL6dgKjaV_N-lneOwWri-N2Xm-bf6UJ7w",
    authDomain: "ott-platform-cf43e.firebaseapp.com",
    projectId: "ott-platform-cf43e",
    storageBucket: "ott-platform-cf43e.appspot.com",
    messagingSenderId: "844526974291",
    appId: "1:844526974291:web:11268d750d39062db85da6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// DOM elements
const wishlistContainer = document.getElementById('wishlist-container');
const logoutButton = document.getElementById('logout-button');

// Fetch and display user's wishlist from Firestore
const displayWishlist = async (userId) => {
    try {
        // Reference to the user's wishlist document in Firestore
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const wishlist = userDoc.data().wishlist || [];
            wishlistContainer.innerHTML = ''; // Clear any existing content

            if (wishlist.length > 0) {
                wishlist.forEach((movie) => {
                    const movieImage = movie.image || "https://via.placeholder.com/150";
                    const movieTitle = movie.title || "Untitled Movie";
                    const movieVideo = movie.video || "#";

                    const movieElement = document.createElement('div');
                    movieElement.className = 'wishlist-item';
                    movieElement.innerHTML = `
                        <img src="${movieImage}" alt="${movieTitle}" class="wishlist-item-image">
                        <h3>${movieTitle}</h3>
                        <a href="${movieVideo}" target="_blank" class="wishlist-item-video">Watch Trailer</a>
                        <button class="remove-btn" data-title="${movieTitle}">Remove</button>
                    `;
                    wishlistContainer.appendChild(movieElement);
                });
            } else {
                wishlistContainer.innerHTML = '<p>No wishlist items found.</p>';
            }
        } else {
            wishlistContainer.innerHTML = '<p>No wishlist items found.</p>';
        }
    } catch (error) {
        console.error('Error fetching wishlist:', error);
        alert('An error occurred while fetching the wishlist.');
    }
};

// Remove movie from the user's wishlist in Firestore
const removeMovieFromWishlist = async (userId, movieTitle) => {
    try {
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            let wishlist = userDoc.data().wishlist || [];
            // Filter out the movie to be removed
            wishlist = wishlist.filter(item => item.title !== movieTitle);

            // Update Firestore with the new wishlist
            await setDoc(userDocRef, { wishlist: wishlist });

            // Refresh the displayed wishlist
            displayWishlist(userId);

            alert(`${movieTitle} has been removed from your wishlist.`);
        }
    } catch (error) {
        console.error('Error removing movie:', error);
        alert('An error occurred while removing the movie.');
    }
};

// Add movie to the user's wishlist in Firestore
const addMovieToWishlist = async (userId, movie) => {
    try {
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const wishlist = userDoc.data().wishlist || [];
            // Add the new movie to the wishlist
            wishlist.push(movie);

            // Update Firestore with the new wishlist
            await setDoc(userDocRef, { wishlist: wishlist });

            // Refresh the displayed wishlist
            displayWishlist(userId);

            alert(`${movie.title} has been added to your wishlist.`);
        } else {
            // If no wishlist exists for the user, create one with the new movie
            await setDoc(userDocRef, { wishlist: [movie] });
            displayWishlist(userId);
            alert(`${movie.title} has been added to your wishlist.`);
        }
    } catch (error) {
        console.error('Error adding movie:', error);
        alert('An error occurred while adding the movie.');
    }
};

// Monitor authentication state
onAuthStateChanged(auth, (user) => {
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
