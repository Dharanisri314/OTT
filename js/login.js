
    // Import the functions you need from the Firebase SDKs
    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
    import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

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

// Login form functionality
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('signup-form');
    const emailInput = document.getElementById('signup-email');
    const passwordInput = document.getElementById('signup-password');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');

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
                    // Redirect or show a success message
                    window.location.href = '/main.html'; // Example redirection after login
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
});

// Function to validate email format
function findValidEmail(email) {
    // Check if email contains "@" and a dot in the domain part
    const atIndex = email.indexOf('@');
    if (atIndex === -1) {
        return false;
    }

    const localPart = email.slice(0, atIndex);
    const domainPart = email.slice(atIndex + 1);

    if (!localPart || !domainPart || domainPart.indexOf('.') === -1) {
        return false;
    }

    // Check valid characters in local and domain parts
    const validity = /^[a-zA-Z0-9._-]+$/;
    return validity.test(localPart) && /^[a-zA-Z0-9.-]+$/.test(domainPart);
}

    