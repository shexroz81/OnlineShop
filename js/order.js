document.addEventListener("DOMContentLoaded", () => {
  const bar = document.getElementById("bar");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeBtn = document.querySelector(".mobile-close i");

  if (bar && mobileMenu) {
    bar.addEventListener("click", () => {
      mobileMenu.classList.add("active");
    });
  }

  if (closeBtn && mobileMenu) {
    closeBtn.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
    });
  }

  const dropdownToggle = document.querySelector(".dropdown-toggle");
  const dropdownMenu = document.querySelector(".dropdown-menu");

  if (dropdownToggle && dropdownMenu) {
    dropdownToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdownMenu.classList.toggle("active");
      dropdownToggle.classList.toggle("active");
    });

    document.addEventListener("click", () => {
      dropdownMenu.classList.remove("active");
      dropdownToggle.classList.remove("active");
    });
  }

  const passwordInput = document.querySelector(".password-box input");
  const eyeBtn = document.querySelector(".eye i");

  if (passwordInput && eyeBtn) {
    eyeBtn.addEventListener("click", () => {
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeBtn.classList.remove("fa-eye");
        eyeBtn.classList.add("fa-eye-slash");
      } else {
        passwordInput.type = "password";
        eyeBtn.classList.remove("fa-eye-slash");
        eyeBtn.classList.add("fa-eye");
      }
    });
  }
});