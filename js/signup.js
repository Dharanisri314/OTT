

// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAL6dgKjaV_N-lneOwWri-N2Xm-bf6UJ7w",
    authDomain: "ott-platform-cf43e.firebaseapp.com",
    projectId: "ott-platform-cf43e",
    storageBucket: "ott-platform-cf43e.firebaseapp.com",
    messagingSenderId: "844526974291",
    appId: "1:844526974291:web:11268d750d39062db85da6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const usernameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");

    // Helper function to show error
    const showError = (element, message) => {
        element.textContent = message;
        element.style.display = 'block';
    };

    // Helper function to clear errors
    const clearErrors = () => {
        usernameError.style.display = 'none';
        emailError.style.display = 'none';
        passwordError.style.display = 'none';
    };

    // Form submission handler
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent default form submission

        // Clear previous error messages
        clearErrors();

        let valid = true;

        // Validate username
        const usernameValue = usernameInput.value.trim();
        if (!usernameValue) {
            showError(usernameError, 'Name cannot be empty.');
            valid = false;
        } else if (usernameValue.length < 3) {
            showError(usernameError, 'Name must be at least 3 characters long.');
            valid = false;
        } else if (!/^[A-Z][a-zA-Z\s]*$/.test(usernameValue)) {
            showError(usernameError, 'Name must start with an uppercase letter and only contain letters and spaces.');
            valid = false;
        }

        // Validate email
        const emailValue = emailInput.value.trim();
        if (!emailValue) {
            showError(emailError, 'Email cannot be empty.');
            valid = false;
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailValue)) {
            showError(emailError, 'Please enter a valid email address.');
            valid = false;
        }

        // Validate password
        const passwordValue = passwordInput.value.trim();
        if (!passwordValue) {
            showError(passwordError, 'Password is required.');
            valid = false;
        } else if (passwordValue.length < 6) {
            showError(passwordError, 'Password should be at least 6 characters.');
            valid = false;
        } else if (!/[a-z]/.test(passwordValue)) {
            showError(passwordError, 'Password must contain at least one lowercase letter.');
            valid = false;
        } else if (!/[A-Z]/.test(passwordValue)) {
            showError(passwordError, 'Password must contain at least one uppercase letter.');
            valid = false;
        } else if (!/[0-9]/.test(passwordValue)) {
            showError(passwordError, 'Password must contain at least one number.');
            valid = false;
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwordValue)) {
            showError(passwordError, 'Password must contain at least one special character.');
            valid = false;
        }

        // If valid, create user and store data in Firestore
        if (valid) {
            createUserWithEmailAndPassword(auth, emailValue, passwordValue)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log('User created successfully:', user.email);

                    // Store user data in Firestore
                    setDoc(doc(db, "users", user.uid), {
                        username: usernameValue,
                        email: user.email,
                        createdAt: new Date().toISOString() // Add timestamp
                    })
                    .then(() => {
                        console.log('User data saved to Firestore');
                        alert('Account created successfully!');
                        window.location.href = "../index.html"; // Redirect after success
                    })
                    .catch((firestoreError) => {
                        // Handle Firestore-specific error
                        console.error("Error saving data to Firestore:", firestoreError.message);
                        showError(passwordError, 'An error occurred while saving user data. Please try again.');
                    });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    console.log('Error code:', errorCode);

                    // Firebase Auth-specific error handling
                    if (errorCode === 'auth/email-already-in-use') {
                        showError(emailError, 'This email is already in use.');
                    } else if (errorCode === 'auth/weak-password') {
                        showError(passwordError, 'Password should be at least 6 characters.');
                    } else {
                        // Catch any other Firebase errors
                        console.error("Error:", error.message);
                        showError(passwordError, 'Registration failed. Please check your input and try again.');
                    }
                });
        }
    });
});





















