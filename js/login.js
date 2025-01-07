// // Import the functions you need from the Firebase SDKs
// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
// import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyAL6dgKjaV_N-lneOwWri-N2Xm-bf6UJ7w",
//     authDomain: "ott-platform-cf43e.firebaseapp.com",
//     projectId: "ott-platform-cf43e",
//     storageBucket: "ott-platform-cf43e.firebasestorage.app",
//     messagingSenderId: "844526974291",
//     appId: "1:844526974291:web:11268d750d39062db85da6"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// // DOM elements
// const form = document.getElementById('signup-form');
// const emailInput = document.getElementById('signup-email');
// const passwordInput = document.getElementById('signup-password');
// const emailError = document.getElementById('email-error');
// const passwordError = document.getElementById('password-error');

// // Form submission handler
// if (form) {
//     form.addEventListener('submit', function (e) {
//         e.preventDefault(); // Prevent default form submission

//         // Clear previous error messages
//         emailError.style.display = 'none';
//         passwordError.style.display = 'none';

//         let valid = true;

//         const emailValue = emailInput.value.trim();
//         const passwordValue = passwordInput.value.trim();

//         // Debugging: Check the values of email and password
//         console.log('Email Value:', emailValue); // Check if email value is being fetched correctly
//         console.log('Password Value:', passwordValue); // Check if password value is being fetched correctly

//         /// Trim spaces from email and password
// const trimmedEmail = emailValue.trim();
// const trimmedPassword = passwordValue.trim();

// // Validate email
// if (!trimmedEmail) {
//     showError(emailError, 'Email is required.');
//     valid = false;
// } else if (trimmedEmail.startsWith(" ")) {
//     showError(emailError, 'Email cannot start with a space.');
//     valid = false;
// } else if (trimmedEmail.includes(" ")) {
//     showError(emailError, 'Email cannot contain spaces.');
//     valid = false;
// } else if (!findValidEmail(trimmedEmail)) {
//     showError(emailError, 'Please enter a valid email address.');
//     valid = false;
// }

// // Validate password
// if (!trimmedPassword) {
//     showError(passwordError, 'Password is required.');
//     valid = false;
// } else if (trimmedPassword.includes(" ")) {
//     showError(passwordError, 'Password cannot contain spaces.');
//     valid = false;
// } else if (!validatePassword(trimmedPassword)) {
//     showError(passwordError, 'Password must be at least 6 characters long, include one uppercase letter, one lowercase letter, and one special character.');
//     valid = false;
// }

// // Proceed with Firebase authentication if valid
// if (valid) {
//     signInWithEmailAndPassword(auth, trimmedEmail, trimmedPassword)
//         .then((userCredential) => {
//             // Signed in successfully
//             const user = userCredential.user;
//             console.log("Logged in as:", user.email);
//             alert("Login Successful");
//             window.location.href = '../index.html'; // Redirect to home page
//             localStorage.setItem('user', true);
//             updateButtonToLogout();
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;

//             // Clear previous error messages
//             emailError.style.display = 'none';
//             passwordError.style.display = 'none';

//             // Handle Firebase authentication errors
//             if (errorCode === 'auth/user-not-found') {
//                 showError(emailError, 'Invalid email address. Please check the email and try again.');
//             } else if (errorCode === 'auth/wrong-password') {
//                 showError(passwordError, 'Incorrect password. Please try again.');
//             } else if (errorCode === 'auth/invalid-email') {
//                 showError(emailError, 'The email address format is invalid. Please enter a valid email.');
//             } else {
//                 console.error("Unexpected error:", errorMessage);  // Log unexpected errors
//                 showError(emailError, 'Email address or password is incorrect.');
//             }
//         });
// }

//     });
// }

// // Function to validate email format
// function findValidEmail(email) {
//     const atIndex = email.indexOf('@');
//     const dotIndex = email.lastIndexOf('.');

//     if (atIndex === -1 || dotIndex === -1 || dotIndex < atIndex) {
//         return false;
//     }

//     // Local part and domain part checks (simple validation)
//     const localPart = email.slice(0, atIndex);
//     const domainPart = email.slice(atIndex + 1);
//     const domainParts = domainPart.split('.');

//     if (localPart.length === 0 || domainParts.length < 2) {
//         return false;
//     }

//     const validity = /^[a-zA-Z0-9._-]+$/;
//     return validity.test(localPart) && /^[a-zA-Z0-9.-]+$/.test(domainPart);
// }

// // Function to validate password strength
// function validatePassword(password) {
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
//     return passwordRegex.test(password);
// }

// // Function to show error message
// function showError(element, message) {
//     element.textContent = message;
//     element.style.display = 'block';
// }

// // Monitor authentication state (optional)
// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         console.log("User is logged in:", user.email);
//     } else {
//         console.log("User is not logged in");
//     }
// });





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
