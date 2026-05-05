// Dropdown functionality
const dropdownToggle = document.querySelector(".dropdown-toggle");
const dropdownMenu = document.querySelector(".dropdown-menu");

dropdownToggle.addEventListener("click", () => {
  dropdownToggle.classList.toggle("active");
  dropdownMenu.classList.toggle("active");
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
    dropdownToggle.classList.remove("active");
    dropdownMenu.classList.remove("active");
  }
});

// bar functionality

const searchbox = document.getElementById("best-products");
const listBarBtn = document.querySelector(".list-bar");
const horizontalBarBtn = document.querySelector(".horizantal-bar");

// List view

listBarBtn.addEventListener('click', () => {
    searchbox.classList.add('list-mode');
    searchbox.classList.remove('grid-mode');
})

horizontalBarBtn.addEventListener('click', () => {
    searchbox.classList.add('grid-mode');
    searchbox.classList.remove('list-mode');
})

