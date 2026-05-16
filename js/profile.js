document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("signupForm");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const togglePassword = document.getElementById("togglePassword");
  const toggleConfirmPassword = document.getElementById(
    "toggleConfirmPassword",
  );

  // Password toggle
  togglePassword.addEventListener("click", function () {
    passwordInput.type =
      passwordInput.type === "password" ? "text" : "password";
    this.innerHTML =
      passwordInput.type === "password"
        ? '<i class="fa-solid fa-eye"></i>'
        : '<i class="fa-solid fa-eye-slash"></i>';
  });

  toggleConfirmPassword.addEventListener("click", function () {
    confirmPasswordInput.type =
      confirmPasswordInput.type === "password" ? "text" : "password";
    this.innerHTML =
      confirmPasswordInput.type === "password"
        ? '<i class="fa-solid fa-eye"></i>'
        : '<i class="fa-solid fa-eye-slash"></i>';
  });

  // Validation
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();
    document.querySelectorAll(".error-message").forEach((e) => e.remove());
    document
      .querySelectorAll(".error")
      .forEach((e) => e.classList.remove("error"));

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const password = passwordInput.value;
    const confirm = confirmPasswordInput.value;

    function showError(input, message) {
      input.classList.add("error");
      const err = document.createElement("div");
      err.className = "error-message show";
      err.textContent = message;
      input.parentElement.insertAdjacentElement("afterend", err);
    }

    if (name.value.trim().length < 2)
      showError(name, "Name must be at least 2 characters long");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()))
      showError(email, "Please enter a valid email address");
    else if (password.length < 8)
      showError(passwordInput, "Password must be at least 8 characters long");
    else if (password !== confirm)
      showError(confirmPasswordInput, "Passwords do not match");
    else console.log("Forma yuborildi!");
  });
});
