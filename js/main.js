const bar = document.querySelector(".bars");
const mobileMenu = document.querySelector(".mobile-menu");
const closeBtn = document.querySelector(".mobile-close");
const pagesBtn = document.querySelector(".text-one h3");
const categoryBtn = document.getElementById("category-btn");
const categoriesLink = document.getElementById("categories-link");
const mobileLinks = document.getElementById("mobile-links");

// Categories button click
categoryBtn.addEventListener("click", () => {
  categoryBtn.classList.add("mobile-text-active");
  pagesBtn.classList.remove("mobile-text-active");
  categoriesLink.style.display = "flex";
  mobileLinks.style.display = "none";
});

// Pages button click
pagesBtn.addEventListener("click", () => {
  pagesBtn.classList.add("mobile-text-active");
  categoryBtn.classList.remove("mobile-text-active");
  categoriesLink.style.display = "none";
  mobileLinks.style.display = "block";
});

// Open menu
bar.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
});

// Simple Auto Carousel
const slides = document.querySelectorAll(".carousel-slide");
let currentSlide = 0;

function showSlide() {
  slides.forEach((slide) => slide.classList.remove("active"));
  slides[currentSlide].classList.add("active");
  currentSlide = (currentSlide + 1) % slides.length;
}

// Start carousel
showSlide();
setInterval(showSlide, 3000);

// Close menu
closeBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
});

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
