// Import the functions you need from the Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM elements
const form = document.getElementById('signup-form');
const emailInput = document.getElementById('signup-email');
const passwordInput = document.getElementById('signup-password');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const loginLogoutButton = document.getElementById('login-logout-button');

// Form submission handler
if (form) {
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
            showError(emailError, 'Email is required.');
            valid = false;
        } else if (!findValidEmail(emailValue)) {
            showError(emailError, 'Please enter a valid email address.');
            valid = false;
        }

        // Validate password
        if (!passwordValue) {
            showError(passwordError, 'Password is required.');
            valid = false;
        } else if (!validatePassword(passwordValue)) {
            showError(passwordError, 'Password must be at least 6 characters long, include one uppercase letter, one lowercase letter, and one special character.');
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
                    window.location.href = '../index.html'; // Redirect to home page
                    localStorage.setItem('user', true);
                    updateButtonToLogout();
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    // Clear previous error messages
                    emailError.style.display = 'none';
                    passwordError.style.display = 'none';

                    // Handle Firebase authentication errors
                    if (errorCode === 'auth/user-not-found') {
                        showError(emailError, 'Invalid email address. Please check the email and try again.');
                    } else if (errorCode === 'auth/wrong-password') {
                        showError(passwordError, 'Incorrect password. Please try again.');
                    } else if (errorCode === 'auth/invalid-email') {
                        showError(emailError, 'The email address format is invalid. Please enter a valid email.');
                    } else {
                        console.error("Unexpected error:", errorMessage);  // Log unexpected errors
                        showError(emailError, 'email address or password Incorrect.');
                    }
                });
        }
    });
}

// Function to validate email format
function findValidEmail(email) {
    const atIndex = email.indexOf('@');
    if (atIndex === -1) {
        return false;
    }

    const localPart = email.slice(0, atIndex);
    const domainPart = email.slice(atIndex + 1);

    if (!localPart || !domainPart || domainPart.indexOf('.') === -1) {
        return false;
    }

    const validity = /^[a-zA-Z0-9._-]+$/;
    return validity.test(localPart) && /^[a-zA-Z0-9.-]+$/.test(domainPart);
}

// Function to validate password strength
function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
    return passwordRegex.test(password);
}

// Function to show error message
function showError(element, message) {
    element.textContent = message;
    element.style.display = 'block';
}

// Update button to Logout
function updateButtonToLogout() {
    if (loginLogoutButton) {
        loginLogoutButton.textContent = 'Logout';
        loginLogoutButton.addEventListener('click', function () {
            if (confirm('Are you sure you want to logout?')) {
                signOut(auth).then(() => {
                    alert("Logout Successful");
                    updateButtonToLogin();
                }).catch((error) => {
                    console.error("Error logging out:", error.message);
                });
            }
        });
    }
}

// Update button to Login
function updateButtonToLogin() {
    if (loginLogoutButton) {
        loginLogoutButton.textContent = 'Login';
        loginLogoutButton.removeEventListener('click', updateButtonToLogout);
    }
}

// Monitor authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is logged in, change button to Logout
        updateButtonToLogout();
    } else {
        // No user logged in, change button to Login
        updateButtonToLogin();
    }
});
