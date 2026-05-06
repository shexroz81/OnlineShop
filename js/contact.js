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
  
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const contactInput = document.getElementById("contact");
    const messageInput = document.getElementById("message");
  
    let dataArray = []; // array
  
    form.addEventListener("submit", (e) => {
      e.preventDefault(); // page refreshni to'xtatadi
  
      const formData = {
        name: nameInput.value,
        email: emailInput.value,
        contact: contactInput.value,
        message: messageInput.value,
      };
  
      dataArray.push(formData); // objectni arrayga qo‘shamiz
  
      console.log(dataArray);
  
      // ixtiyoriy: inputlarni tozalash
      form.reset();
    });
  });
