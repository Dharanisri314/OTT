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
//         } else {
//             console.error("No such user document exists!");
//             alert("User data not found.");
//         }
//     } catch (error) {
//         console.error("Error fetching user details:", error.message);
//         alert("An error occurred while fetching user details.");
//     }
// };

// // Monitor authentication state
// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         // User is logged in, fetch their details
//         fetchUserDetails(user.uid);
//     } else {
//         // User is not logged in, redirect to login page
//         alert("You are not logged in. Redirecting to login page.");
//         window.location.href ="./main1.html"; // Replace with the actual login page URL
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



// // Import Firebase modules
// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
// import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
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

// // DOM Elements
// const usernameElement = document.getElementById("username");
// const emailElement = document.getElementById("email");
// const logoutButton = document.getElementById("logout-button");

// // Fetch User Details
// const fetchUserDetails = async (userId) => {
//     try {
//         const userRef = doc(db, "users", userId);
//         const userSnap = await getDoc(userRef);

//         if (userSnap.exists()) {
//             const userData = userSnap.data();
//             usernameElement.textContent = userData.username || "N/A";
//             emailElement.textContent = userData.email || "N/A";
//         } else {
//             console.error("User document not found.");
//         }
//     } catch (error) {
//         console.error("Error fetching user details:", error.message);
//     }
// };

// // Monitor Authentication State
// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         fetchUserDetails(user.uid);
//     } else {
//         alert("You are not logged in. Redirecting to login page.");
//         window.location.href = "./main1.html";
//     }
// });

// // Logout Functionality
// logoutButton.addEventListener("click", () => {
//     signOut(auth)
//         .then(() => {
//             alert("Logout successful.");
//             window.location.href = "login.html";
//         })
//         .catch((error) => {
//             console.error("Error during logout:", error.message);
//         });
// });




// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
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

// DOM Elements
const usernameElement = document.getElementById("username");
const emailElement = document.getElementById("email");
const avatarElement = document.getElementById("avatar");
const logoutButton = document.getElementById("logout-button");

// Fetch User Details
const fetchUserDetails = async (userId) => {
    try {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const userData = userSnap.data();

            // Display full username and email
            const fullName = userData.username || "N/A";
            usernameElement.textContent = fullName;
            emailElement.textContent = userData.email || "N/A";

            // Display first letter in the avatar
            if (fullName && fullName.length > 0) {
                avatarElement.textContent = fullName.charAt(0);
            }
        } else {
            console.error("User document not found.");
        }
    } catch (error) {
        console.error("Error fetching user details:", error.message);
    }
};

// Monitor Authentication State
onAuthStateChanged(auth, (user) => {
    if (user) {
        fetchUserDetails(user.uid);
    } else {
        alert("You are not logged in. Redirecting to login page.");
        window.location.href = "./main1.html";
    }
});

// Logout Functionality
logoutButton.addEventListener("click", () => {
    signOut(auth)
        .then(() => {
            alert("Logout successful.");
            window.location.href = "./index.html";
        })
        .catch((error) => {
            console.error("Error during logout:", error.message);
        });
});




