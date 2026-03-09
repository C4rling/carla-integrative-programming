const loginForm = document.getElementById("loginForm");

const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

const loginEmailError = document.getElementById("loginEmailError");
const loginPasswordError = document.getElementById("loginPasswordError");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid = true;

  loginEmailError.textContent = "";
  loginPasswordError.textContent = "";

  // Email Validation
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if (loginEmail.value.trim() === "") {
    loginEmailError.textContent = "Email is required";
    isValid = false;
  } 
  else if (!loginEmail.value.match(emailPattern)) {
    loginEmailError.textContent = "Enter a valid email";
    isValid = false;
  }

  // Password Validation
  if (loginPassword.value.trim() === "") {
    loginPasswordError.textContent = "Password is required";
    isValid = false;
  } 
  else if (loginPassword.value.length < 6) {
    loginPasswordError.textContent = "Password must be at least 6 characters";
    isValid = false;
  }

  if (isValid) {

    const email = loginEmail.value.trim();
    const password = loginPassword.value.trim();

    // Admin Login
    if (email === "carlajane@hnu.edu.ph" && password === "admin323") {
      localStorage.setItem("role", "admin");
      alert("Admin login successful!");
      window.location.href = "admin.html";
    }

    // Normal User Login
    else {
      localStorage.setItem("role", "user");
      alert("Login successful!");
      window.location.href = "profile.html";
    }

  }
});