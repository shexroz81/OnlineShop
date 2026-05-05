document.addEventListener("DOMContentLoaded", () => {
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

  const form = document.querySelector("form");
  const usernameInput = document.querySelector(".first");
  const passwordInput = document.querySelector(".second");
  const eyeBtn = document.querySelector(".eye i");
  const loginBtn = document.querySelector('button[type="submit"]');
  
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
  
  if (form && usernameInput && passwordInput && loginBtn) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
 
      const userData =  [
        {
          username: usernameInput.value,
          password: passwordInput.value
        }
      ]
  
      console.log(userData);
    });
  }
})