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

// Close menu
closeBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
});
