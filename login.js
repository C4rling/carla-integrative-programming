const loginForm = document.getElementById("loginForm");

const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

const loginEmailError = document.getElementById("loginEmailError");
const loginPasswordError = document.getElementById("loginPasswordError");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid = true;

  // Clear previous errors
  loginEmailError.textContent = "";
  loginPasswordError.textContent = "";

  // Email Validation
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if (loginEmail.value.trim() === "") {
    loginEmailError.textContent = "Email is required";
    isValid = false;
  } else if (!loginEmail.value.match(emailPattern)) {
    loginEmailError.textContent = "Enter a valid email";
    isValid = false;
  }

  // Password Validation
  if (loginPassword.value.trim() === "") {
    loginPasswordError.textContent = "Password is required";
    isValid = false;
  } else if (loginPassword.value.length < 6) {
    loginPasswordError.textContent = "Password must be at least 6 characters";
    isValid = false;
  }

  // If valid → redirect
  if (isValid) {
    alert("Login successful!");
    window.location.href = "profile.html";
  }
});