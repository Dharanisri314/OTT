// Import necessary Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, getDoc, updateDoc, arrayRemove } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

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
const usernameElement = document.getElementById('username');
const emailElement = document.getElementById('email');
const avatarElement = document.getElementById('avatar');
const wishlistElement = document.getElementById('wishlist');
const logoutButton = document.getElementById('logout-button');

// Ensure wishlistElement exists
if (!wishlistElement) {
    console.error("wishlistElement not found in the DOM.");
}

// Fetch and display user details
const fetchUserDetails = async (userId) => {
    try {
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();

            // Display user details
            usernameElement.textContent = userData.username || "N/A";
            emailElement.textContent = userData.email || "N/A";

            // Set avatar with the first letter of the username
            const firstLetter = userData.username ? userData.username.charAt(0).toUpperCase() : "U";
            avatarElement.textContent = firstLetter;
        } else {
            console.error("No such user document exists!");
            alert("User data not found.");
        }
    } catch (error) {
        console.error("Error fetching user details:", error.message);
        alert("An error occurred while fetching user details.");
    }
};

// Fetch and display user's wishlist
const displayWishlist = async (userId) => {
    try {
        // Clear any previous content or error messages before fetching new data
        wishlistElement.textContent = ''; // Clear the content of the wishlist element

        const wishlistRef = doc(db, "wishlists", userId); // Assuming "wishlists" collection stores user wishlists
        const wishlistDoc = await getDoc(wishlistRef);

        if (wishlistDoc.exists()) {
            const wishlistData = wishlistDoc.data();

            // Check if the wishlist contains items and display them
            if (wishlistData.items && Array.isArray(wishlistData.items)) {
                wishlistData.items.forEach(item => {
                    const listItem = document.createElement('li');
                    listItem.textContent = item; // Assuming each item is a string
                    wishlistElement.appendChild(listItem);

                    // Add a remove button for each item
                    const removeButton = document.createElement('button');
                    removeButton.textContent = 'Remove';
                    removeButton.addEventListener('click', () => {
                        removeMovieFromWishlist(userId, item); // Remove movie when button clicked
                    });
                    listItem.appendChild(removeButton);
                });
            } else {
                wishlistElement.textContent = "No items in wishlist.";
            }
        } else {
            console.error("No wishlist found for this user.");
            wishlistElement.textContent = "No wishlist data found.";
        }
    } catch (error) {
        console.error("Error fetching wishlist data:", error.message);
        wishlistElement.textContent = "An error occurred while fetching the wishlist.";
    }
};

// Function to remove a movie from the wishlist
const removeMovieFromWishlist = async (userId, movieTitle) => {
    try {
        const wishlistRef = doc(db, "wishlists", userId);
        await updateDoc(wishlistRef, {
            items: arrayRemove(movieTitle) // Remove the movie from the wishlist array
        });

        // Refresh the displayed wishlist
        displayWishlist(userId);

        // Optional: Notify the user that the movie was removed
        alert(`${movieTitle} has been removed from your wishlist.`);
    } catch (error) {
        console.error("Error removing movie from wishlist:", error.message);
        alert("An error occurred while removing the movie.");
    }
};

// Monitor authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is logged in
        console.log("User logged in:", user.uid);
        fetchUserDetails(user.uid); // Fetch and display user details
        displayWishlist(user.uid); // Fetch and display the user's wishlist
    } else {
        // User is not logged in, redirect to login page
        alert("You are not logged in. Redirecting to login page.");
        window.location.href = "./main1.html"; // Redirect to the login page
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



