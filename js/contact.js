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
  });