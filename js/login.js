
    // Import the functions you need from the Firebase SDKs
    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
    import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
    import {  getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyAL6dgKjaV_N-lneOwWri-N2Xm-bf6UJ7w",
        authDomain: "ott-platform-cf43e.firebaseapp.com",
        projectId: "ott-platform-cf43e",
        storageBucket: "ott-platform-cf43e.firebasestorage.app",
        messagingSenderId: "844526974291",
        appId: "1:844526974291:web:11268d750d39062db85da6"
    };

 // Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // Firebase Authentication
const db = getFirestore(app);  // Firestore

// DOM elements
const form = document.getElementById('signup-form');
const emailInput = document.getElementById('signup-email');
const passwordInput = document.getElementById('signup-password');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const welcomeMessageElement = document.getElementById("usernameDisplay");

// Form submission handler
form.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    // Clear previous error messages
    emailError.style.display = 'none';
    passwordError.style.display = 'none';

    let valid = true;
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    // Validate email
    if (!emailValue) {
        emailError.textContent = 'Email is required.';
        emailError.style.display = 'block';
        valid = false;
    } else if (!findValidEmail(emailValue)) {
        emailError.textContent = 'Please enter a valid email address.';
        emailError.style.display = 'block';
        valid = false;
    }

    // Validate password
    if (!passwordValue) {
        passwordError.textContent = 'Password is required.';
        passwordError.style.display = 'block';
        valid = false;
    } else if (passwordValue.length < 6) {
        passwordError.textContent = 'Password should be at least 6 characters.';
        passwordError.style.display = 'block';
        valid = false;
    }

    // If valid, proceed to login
    if (valid) {
        signInWithEmailAndPassword(auth, emailValue, passwordValue)
            .then((userCredential) => {
                // Signed in successfully
                const user = userCredential.user;
                console.log("Logged in as:", user.email);
                alert("Login Successful");

                // Redirect to main1.html after successful login
                window.location.href = "../html/main1.html"; 
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                if (errorCode === 'auth/user-not-found') {
                    emailError.textContent = 'Email not found.';
                    emailError.style.display = 'block';
                } else if (errorCode === 'auth/wrong-password') {
                    passwordError.textContent = 'Incorrect password.';
                    passwordError.style.display = 'block';
                } else {
                    console.error("Error:", errorMessage);
                }
            });
    }
});

// Function to validate email format
function findValidEmail(email) {
    const atIndex = email.indexOf('@');
    if (atIndex === -1) return false;

    const localPart = email.slice(0, atIndex);
    const domainPart = email.slice(atIndex + 1);

    if (!localPart || !domainPart || domainPart.indexOf('.') === -1) return false;
    const validity = /^[a-zA-Z0-9._-]+$/;
    return validity.test(localPart) && /^[a-zA-Z0-9.-]+$/.test(domainPart);
}

// Check user authentication status
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is logged in
        const userId = user.uid;
        const userDocRef = doc(db, "users", userId);

        // Fetch user data from Firestore
        getDoc(userDocRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    const username = userData.username;
                    
                    // Save the username to Local Storage
                    localStorage.setItem("username", username);

                    // Display username in the welcome message
                    welcomeMessageElement.textContent = `Welcome, ${username}!`;
                } else {
                    console.log("User data not found in Firestore.");
                }
            })
            .catch((error) => {
                console.error("Error getting user data:", error);
            });
    } else {
        console.log("No user is logged in.");
    }
});