// Dropdown functionality
const dropdownToggle = document.querySelector(".dropdown-toggle");
const dropdownMenu = document.querySelector(".dropdown-menu");

dropdownToggle.addEventListener("click", () => {
  dropdownToggle.classList.toggle("active");
  dropdownMenu.classList.toggle("active");
});

// Dropdown menyu elementlariga bosganda mahsulotlarni filterlash
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

const scrollToTopBtn = document.getElementById("scrollToTop");

// Scroll bo‘lganda button chiqadi
window.addEventListener("scroll", () => {

    if (window.scrollY > 200) {
        scrollToTopBtn.classList.add("show");
    } else {
        scrollToTopBtn.classList.remove("show");
    }

});

// Tepaga smooth scroll
scrollToTopBtn.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});