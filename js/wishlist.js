import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";  // Add onAuthStateChanged import
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

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

// Fetch and display user's wishlist
const displayWishlist = async (userId) => {
    try {
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
                        <button class="delete-btn">Delete</button> 
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


// Function to handle deleting an item (e.g., from the DOM or database)
function handleDelete(event) {
    // Get the element that triggered the delete action (in this case, the button)
    const deleteButton = event.target;
    
    // Optionally, you can confirm the delete action
    const confirmation = confirm('Are you sure you want to delete this item?');
    if (!confirmation) {
        return; // If the user cancels, do nothing
    }

    // Find the parent element of the button (this could be a card, list item, etc.)
    const itemToDelete = deleteButton.closest('.item'); // Change `.item` to the appropriate class or element type
    
    // If the item is found, remove it from the DOM
    if (itemToDelete) {
        itemToDelete.remove(); // Remove the element from the DOM
        alert('Item deleted successfully.');
    } else {
        alert('Item not found.');
    }

    // If you need to delete something from a database (e.g., Firestore), you can call a function here
    // Example (uncomment to use):
    // deleteItemFromDatabase(itemToDelete.id);
}

// Attach event listener to the delete button
document.addEventListener('DOMContentLoaded', () => {
    const deleteButton = document.querySelector('.delete-btn');
    
    if (deleteButton) {
        deleteButton.addEventListener('click', handleDelete);
    }
});
