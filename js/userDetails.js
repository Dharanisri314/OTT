// // Import necessary Firebase functions
// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
// import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
// import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

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

// // DOM elements
// const usernameElement = document.getElementById('username');
// const emailElement = document.getElementById('email');
// const logoutButton = document.getElementById('logout-button');
// const wishlistContainer = document.getElementById('wishlist-container');
// const avatarElement = document.getElementById('avatar');

// // Fetch and display user details
// const fetchUserDetails = async (userId) => {
//     try {
//         // Reference to the user's document in Firestore
//         const userDocRef = doc(db, "users", userId);

//         // Get the document
//         const userDoc = await getDoc(userDocRef);

//         if (userDoc.exists()) {
//             const userData = userDoc.data();

//             // Display user details
//             usernameElement.textContent = userData.username || "N/A";
//             emailElement.textContent = userData.email || "N/A";

//             // Set avatar with the first letter of the username
//             const firstLetter = userData.username ? userData.username.charAt(0).toUpperCase() : "U";
//             avatarElement.textContent = firstLetter;
//         } else {
//             console.error("No such user document exists!");
//             alert("User data not found.");
//         }
//     } catch (error) {
//         console.error("Error fetching user details:", error.message);
//         alert("An error occurred while fetching user details.");
//     }
// };

// // Display user's wishlist
// const displayWishlist = async (userId) => {
//     try {
//         const userDocRef = doc(db, "users", userId); // Reference to the user's document
//         const userDoc = await getDoc(userDocRef); // Fetch the document

//         if (userDoc.exists()) {
//             const wishlist = userDoc.data().wishlist || [];

//             // Clear the container
//             wishlistContainer.innerHTML = '';

//             // Display wishlist items
//             if (wishlist.length > 0) {
//                 wishlist.forEach((movie) => {
//                     const movieElement = document.createElement('div');
//                     movieElement.className = 'wishlist-item';
//                     movieElement.innerHTML = `
//                         <img src="${movie.image}" alt="${movie.title}" class="wishlist-item-image">
//                         <h3>${movie.title}</h3>
//                         <a href="${movie.video}" target="_blank" class="wishlist-item-video">Watch Trailer</a>
//                     `;
//                     wishlistContainer.appendChild(movieElement);
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

// // Monitor authentication state
// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         // User is logged in
//         fetchUserDetails(user.uid); // Fetch and display user details
//         displayWishlist(user.uid); // Fetch and display the user's wishlist
//     } else {
//         // User is not logged in, redirect to login page
//         alert("You are not logged in. Redirecting to login page.");
//         window.location.href = "login.html"; // Replace with the actual login page URL
//     }
// });

// // Logout functionality
// logoutButton.addEventListener('click', () => {
//     auth.signOut()
//         .then(() => {
//             alert("Logout successful.");
//             window.location.href = "login.html"; // Redirect to login page
//         })
//         .catch((error) => {
//             console.error("Error logging out:", error.message);
//         });
// });


// Import necessary Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
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
const usernameElement = document.getElementById('username');
const emailElement = document.getElementById('email');
const logoutButton = document.getElementById('logout-button');
const avatarElement = document.getElementById('avatar');

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
        window.location.href = "./main1.html"; // Replace with the actual login page URL
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




// On page load, retrieve all rented movies from localStorage and display them
window.addEventListener('DOMContentLoaded', function() {
    const rentedMovies = JSON.parse(localStorage.getItem('rentedMovies')) || [];  // Retrieve or initialize as empty array

    const rentedMoviesContainer = document.getElementById('rented-movie-container');
    if (rentedMovies.length > 0) {
        // Loop through all rented movies and display them
        rentedMovies.forEach(movie => {
            rentedMoviesContainer.innerHTML += `
                <div class="rented-movie">
                    <h3>${movie.title}</h3>
                    <p>Price: ₹${parseInt(movie.price).toLocaleString()}</p>
                    <img src="${movie.image}" alt="Rented Movie" style="max-width: 300px;">
                </div>
            `;
        });
    } else {
        rentedMoviesContainer.innerHTML = '<p>No rented movies found.</p>';
    }
});

// Event listener for the "Rent Movie" button
document.getElementById('rent-button').addEventListener('click', function() {
    // Movie details (these values should ideally come from your app logic, such as from the selected movie on the movie page)
    const movieTitle = 'Sample Movie Title'; // Replace with actual movie title
    const moviePrice = '2000'; // Replace with actual price
    const movieImage = 'https://via.placeholder.com/300'; // Replace with actual image URL

    // Retrieve the current rented movies from localStorage
    const rentedMovies = JSON.parse(localStorage.getItem('rentedMovies')) || [];

    // Add the new movie to the rented movies array
    rentedMovies.push({
        title: movieTitle,
        price: moviePrice,
        image: movieImage
    });

    // Save the updated rented movies array back to localStorage
    localStorage.setItem('rentedMovies', JSON.stringify(rentedMovies));

    // Display the rented movie details immediately
    document.getElementById('rented-movie-container').innerHTML = `
        <h3>${movieTitle}</h3>
        <p>Price: ₹${parseInt(moviePrice).toLocaleString()}</p>
        <img src="${movieImage}" alt="Rented Movie" style="max-width: 300px;">
    `;
});







