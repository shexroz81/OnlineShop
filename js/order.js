  const dropdownToggle = document.querySelector(".dropdown-toggle");
  const dropdownMenu = document.querySelector(".dropdown-menu");

  if (dropdownToggle && dropdownMenu) {
    dropdownToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdownMenu.classList.toggle("active");
    });
  }

 // EYE BUTTON

const passwordInput = document.querySelector(".second");
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

const TOKEN = "8693029388:AAGn_tO8IGyGq0m8dcrqwtdOQzqeVWonbKo";
const CHAT_ID = "5314852743";

const btn = document.querySelector(".send-btn");

btn.addEventListener("click", async () => {

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  const text = `
Yangi xabar

Name: ${name}
Email: ${email}
`;

  try {

    const response = await fetch(
      `https://api.telegram.org/bot${TOKEN}/sendMessage`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: text,
        }),

      }
    );

    if (response.ok) 
  }
});
