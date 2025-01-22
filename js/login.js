// Import the necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAL6dgKjaV_N-lneOwWri-N2Xm-bf6UJ7w",
    authDomain: "ott-platform-cf43e.firebaseapp.com",
    projectId: "ott-platform-cf43e",
    storageBucket: "ott-platform-cf43e.firebasestorage.app",
    messagingSenderId: "844526974291",
    appId: "1:844526974291:web:11268d750d39062db85da6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM Elements
const form = document.getElementById('signup-form');
const emailInput = document.getElementById('signup-email');
const passwordInput = document.getElementById('signup-password');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');

// Form submission handler
if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        // Clear previous error messages
        emailError.style.display = 'none';
        passwordError.style.display = 'none';

        let valid = true;
        const emailValue = emailInput.value.trim();
        const passwordValue = passwordInput.value.trim();

        console.log('Email Value:', emailValue); // Debugging
        console.log('Password Value:', passwordValue); // Debugging

        // Validate email
        if (!emailValue) {
            showError(emailError, 'Email is required.');
            valid = false;
        } else if (emailValue.includes(" ")) {
            showError(emailError, 'Email cannot contain spaces.');
            valid = false;
        } else if (!findValidEmail(emailValue)) {
            showError(emailError, 'Please enter a valid email address.');
            valid = false;
        }

        // Validate password
        if (!passwordValue) {
            showError(passwordError, 'Password is required.');
            valid = false;
        } else if (passwordValue.includes(" ")) {
            showError(passwordError, 'Password cannot contain spaces.');
            valid = false;
        } else if (!validatePassword(passwordValue)) {
            showError(passwordError, 'Password must be at least 6 characters long, with one uppercase letter, one lowercase letter, and one special character.');
            valid = false;
        }

        // If valid, proceed with Firebase login
        if (valid) {
            signInWithEmailAndPassword(auth, emailValue, passwordValue)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log("Logged in as:", user.email);
                    alert("Login Successful");
                    sessionStorage.setItem("login","true");
                    window.location.href = '../index.html'; // Redirect to home page
                    localStorage.setItem('user', true);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    console.error("Error code:", errorCode);
                    console.error("Error message:", errorMessage);

                    // Handle specific Firebase errors
                    if (errorCode === 'auth/user-not-found') {
                        showError(emailError, 'Invalid email address.');
                    } else if (errorCode === 'auth/wrong-password') {
                        showError(passwordError, 'Incorrect password.');
                    } else if (errorCode === 'auth/invalid-email') {
                        showError(emailError, 'Invalid email format.');
                    } else {
                        showError(emailError, 'Email or password is incorrect.');
                    }
                });
        }
    });
}

// Validate email format
function findValidEmail(email) {
    const atIndex = email.indexOf('@');
    const dotIndex = email.lastIndexOf('.');

    return atIndex !== -1 && dotIndex !== -1 && dotIndex > atIndex;
}

// Validate password strength (must have uppercase, lowercase, special char, and minimum length)
function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
    return passwordRegex.test(password);
}

// Show error message
function showError(element, message) {
    element.textContent = message;
    element.style.display = 'block';
}

// Monitor authentication state (optional)
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is logged in:", user.email);
    } else {
        console.log("User is not logged in");
    }
});
