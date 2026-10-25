var loginMethod = "password";
var signupMethod = "otp";
var currentForm = "login";

// Login aur Signup ke buttons
var loginTab = document.getElementById("login-Form-Button");
var signupTab = document.getElementById("signup-Form-Button");

var loginFields = document.getElementById("loginFields");
var signupFields = document.getElementById("signupFields");

var submitButton = document.getElementById("submitButton");
var mainForm = document.getElementById("mainForm");

var userEmail = document.getElementById("userEmail");
var formError = document.getElementById("formError");
var formMessage = document.getElementById("formMessage");

// Login tab par click
loginTab.onclick = function () {
  currentForm = "login";

  loginFields.classList.remove("hidden");
  signupFields.classList.add("hidden");

  loginTab.classList.add("active");
  signupTab.classList.remove("active");

  submitButton.textContent = "Login";

  formError.textContent = "";
  formMessage.textContent = "";
};

// Signup tab par click
signupTab.onclick = function () {
  currentForm = "signup";

  loginFields.classList.add("hidden");
  signupFields.classList.remove("hidden");

  loginTab.classList.remove("active");
  signupTab.classList.add("active");

  submitButton.textContent = "Register";

  formError.textContent = "";
  formMessage.textContent = "";
};

// Login mein Password select karna
function showPassword() {
  loginMethod = "password";

  document.getElementById("login-password-box").classList.remove("hidden");
  document.getElementById("login-otp-box").classList.add("hidden");

  document.getElementById("passwordBtn").classList.add("active");
  document.getElementById("otpBtn").classList.remove("active");
}

// Login mein OTP select karna
function showOTP() {
  loginMethod = "otp";

  document.getElementById("login-password-box").classList.add("hidden");
  document.getElementById("login-otp-box").classList.remove("hidden");

  document.getElementById("passwordBtn").classList.remove("active");
  document.getElementById("otpBtn").classList.add("active");
}

// Signup mein OTP select karna
function showSignupOTP() {
  signupMethod = "otp";

  document.getElementById("signup-otp-button").classList.remove("hidden");
  document.getElementById("signup-password-box").classList.add("hidden");

  document.getElementById("signupOtpBtn").classList.add("active");
  document.getElementById("signupPasswordBtn").classList.remove("active");
}

// Signup mein Password select karna
function showSignupPassword() {
  signupMethod = "password";

  document.getElementById("signup-otp-button").classList.add("hidden");
  document.getElementById("signup-password-box").classList.remove("hidden");

  document.getElementById("signupOtpBtn").classList.remove("active");
  document.getElementById("signupPasswordBtn").classList.add("active");
}

// show and hide password

var eyeButtons = document.querySelectorAll(".show-hide-button");

eyeButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    var passwordId = button.getAttribute("data-eye");
    var password = document.getElementById(passwordId);
    var icon = button.querySelector("i");

    if (password.type === "password") {
      password.type = "text";
      icon.className = "bi bi-eye";
    } else {
      password.type = "password";
      icon.className = "bi bi-eye-slash";
    }
  });
});

// Email check karna
function validEmail(email) {
  if (email == "" || !email.includes("@") || !email.includes(".")) {
    return false;
  }

  return true;
}

// OTP ke 6 digits check karna
function validOtp(otp) {
  if (otp.length != 6) {
    return false;
  }

  for (var i = 0; i < otp.length; i++) {
    if (otp[i] < "0" || otp[i] > "9") {
      return false;
    }
  }

  return true;
}

// Login aur Signup form submit
mainForm.onsubmit = function (event) {
  event.preventDefault();

  formError.textContent = "";
  formMessage.textContent = "";

  var email = userEmail.value.trim();

  if (!validEmail(email)) {
    formError.textContent = "Please enter a valid email address.";
    return;
  }

  // Login validation
  if (currentForm == "login") {
    var password = document.getElementById("login-password").value;
    var otp = document.getElementById("loginOtp").value.trim();

    if (loginMethod == "password" && password.length < 6) {
      formError.textContent = "Password must contain at least 6 characters.";
    } else if (loginMethod == "otp" && !validOtp(otp)) {
      formError.textContent = "Please enter a valid 6-digit OTP.";
    } else {
      formMessage.textContent = "Login form submitted successfully.";
    }
  }

  // Signup validation
  else {
    var signupOtp = document.getElementById("signup-otp").value.trim();
    var signupPassword = document.getElementById("signupPassword").value;
    var robot = document.getElementById("recaptcha").checked;

    if (signupMethod == "otp" && !validOtp(signupOtp)) {
      formError.textContent = "Please enter a valid 6-digit OTP.";
    } else if (signupMethod == "password" && signupPassword.length < 8) {
      formError.textContent = "Password must contain at least 8 characters.";
    } else if (!robot) {
      formError.textContent = "Please confirm that you are not a robot.";
    } else {
      formMessage.textContent = "Signup form submitted successfully.";
    }
  }
};

// Forgot password
document.getElementById("forgot-password").onclick = function () {
  formError.textContent = "";
  formMessage.textContent = "";

  if (!validEmail(userEmail.value.trim())) {
    formError.textContent = "Enter a valid email address first.";
  } else {
    formMessage.textContent = "Password reset is not available yet.";
  }
};

// Get OTP button
document.getElementById("getOtp").onclick = function () {
  formError.textContent = "";
  formMessage.textContent = "";

  if (!validEmail(userEmail.value.trim())) {
    formError.textContent = "Enter a valid email address first.";
  } else {
    formMessage.textContent = "OTP feature is not connected yet.";
  }
};

// Password strength
var signupPassword = document.getElementById("signupPassword");
var strengthBar = document.getElementById("strengthBar");
var strengthText = document.getElementById("strengthText");
var strengthTrack = strengthBar.parentElement;

strengthTrack.style.display = "none";
strengthText.style.display = "none";

signupPassword.oninput = function () {
  var password = signupPassword.value;
 var score = 0;

  // Password empty hai toh hide kar do
  if (password == "") {
    strengthTrack.style.display = "none";
    strengthText.style.display = "none";
    strengthBar.style.width = "0%";
    strengthText.textContent = "Password strength";
    return;
  }

  strengthTrack.style.display = "block";
  strengthText.style.display = "block";

  

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

 if (password == "") {
        strengthBar.style.width = "0";
        strengthText.textContent = "";
    } else if (score <= 1) {
        strengthBar.style.width = "25%";
        strengthBar.style.background = "red";
        strengthText.textContent = "Weak";
        strengthText.style.color = "red";
    } else if (score <= 2) {
        strengthBar.style.width = "60%";
        strengthBar.style.background = "orange";
        strengthText.textContent = "Medium";
        strengthText.style.color = "orange";
    } else {
        strengthBar.style.width = "100%";
        strengthBar.style.background = "green";
        strengthText.textContent = "Strong";
        strengthText.style.color = "green";
    }
};

var themeToggle = document.getElementById("themeToggle");
var theme = localStorage.getItem("theme");

if (theme == "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
  themeToggle.checked = true;
} else {
  document.documentElement.setAttribute("data-theme", "light");
  themeToggle.checked = false;
}

themeToggle.onchange = function () {
  if (themeToggle.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
};
