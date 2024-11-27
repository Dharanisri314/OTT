
    // Import the functions you need from the Firebase SDKs
    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
    import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

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

// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const usernameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");

    // Form submission handler
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent default form submission

        // Clear previous error messages
        usernameError.style.display = 'none';
        emailError.style.display = 'none';
        passwordError.style.display = 'none';

        let valid = true;

const usernameValue = usernameInput.value.trim();

if (usernameValue === '') {
    usernameError.textContent = 'Name cannot be empty or just spaces.';
    usernameError.style.display = 'block';
    valid = false;
} else if (usernameValue.length < 3) {
    usernameError.textContent = 'Name must be at least 3 characters long.';
    usernameError.style.display = 'block';
    valid = false;
} 
// Validate format: Only letters and spaces, and must start with an uppercase letter
else if (!/^[A-Z][a-zA-Z\s]*$/.test(usernameValue)) {
    usernameError.textContent = 'Name must start with an uppercase letter and only contain letters and spaces.';
    usernameError.style.display = 'block';
    valid = false;
} else {
    usernameError.style.display = 'none'; // Clear the error if valid
}

 // Validate email
        const emailValue = emailInput.value.trim();
        if (emailValue === '') {
            emailError.textContent = 'Email cannot be empty or just spaces.';
            emailError.style.display = 'block';
            valid = false;
        } else if (/\s/.test(emailValue)) {
            emailError.textContent = 'Email cannot contain spaces.';
            emailError.style.display = 'block';
            valid = false;
        } else if (!emailValue.includes('@')) {
            emailError.textContent = 'Email must contain an "@" symbol.';
            emailError.style.display = 'block';
            valid = false;
        } else if (!validateEmail(emailValue)) {
            emailError.textContent = 'Please enter a valid email address.';
            emailError.style.display = 'block';
            valid = false;
        }

        // Validate password
        const passwordValue = passwordInput.value.trim();
        if (passwordValue === '') {
            passwordError.textContent = 'Password is required.';
            passwordError.style.display = 'block';
            valid = false;
        } else if (passwordValue.length < 6) {
            passwordError.textContent = 'Password should be at least 6 characters.';
            passwordError.style.display = 'block';
            valid = false;
        }
        
        // If form is valid, proceed to create a Firebase user account
        if (valid) {
            createUserWithEmailAndPassword(auth, emailValue, passwordValue)
                .then((userCredential) => {
                    // Signed up successfully
                    const user = userCredential.user;
                    console.log('User created successfully:', user.email);
                    window.location.href = '/main.html'; // Example redirection
                })
                .catch((error) => {
                    // Handle Firebase-specific errors
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    if (errorCode === 'auth/email-already-in-use') {
                        emailError.textContent = 'This email is already in use.';
                        emailError.style.display = 'block';
                    } else if (errorCode === 'auth/weak-password') {
                        passwordError.textContent = 'Password should be at least 6 characters.';
                        passwordError.style.display = 'block';
                    } else {
                        console.error("Error:", errorMessage);
                    }
                });
        }
    });

    // Function to validate email format using a regular expression
    function validateEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }

    // Function to validate name format using a regular expression
    function validateName(name) {
        const namePattern = /^[a-zA-Z\s'-]+$/; // Allows letters, spaces, hyphens, and apostrophes
        return namePattern.test(name);
    }
});
