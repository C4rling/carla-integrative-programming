const form = document.getElementById("signupForm");

const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmError = document.getElementById("confirmError");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // Stop form from submitting

  let isValid = true;

  // Clear previous errors
  nameError.textContent = "";
  emailError.textContent = "";
  passwordError.textContent = "";
  confirmError.textContent = "";

  // Full Name Validation
  if (fullname.value.trim() === "") {
    nameError.textContent = "Full name is required";
    isValid = false;
  }

  // Email Validation
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (email.value.trim() === "") {
    emailError.textContent = "Email is required";
    isValid = false;
  } else if (!email.value.match(emailPattern)) {
    emailError.textContent = "Enter a valid email address";
    isValid = false;
  }

  // Password Validation
  if (password.value.length < 6) {
    passwordError.textContent = "Password must be at least 6 characters";
    isValid = false;
  }

  // Confirm Password Validation
  if (confirmPassword.value !== password.value) {
    confirmError.textContent = "Passwords do not match";
    isValid = false;
  }

  // If everything is valid
  if (isValid) {
    alert("Account created successfully!");
    form.reset();
  }
});