// /public/js/contact.js
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contactForm");
  const feedback = document.querySelector("#feedback");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const firstName = document.querySelector("#firstName").value.trim();
    const lastName = document.querySelector("#lastName").value.trim();
    const email = document.querySelector("#email").value.trim();
    const sub = document.querySelector("#subject").value.trim() || "Website Inquiry";
    const txt = `
      Name: ${firstName} ${lastName}
      Email: ${email}

      Message:
      ${document.querySelector("#message").value.trim()}
    `;

    feedback.textContent = "⏳ Sending your message...";
    feedback.className = "text-center mt-3 text-warning";

    try {
      const response = await fetch("/mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sub, txt }),
      });

      const data = await response.json();

      if (data.result === "success") {
        feedback.textContent = "✅ Message sent successfully!";
        feedback.className = "text-center mt-3 text-success";
        form.reset();
      } else {
        feedback.textContent = "❌ Message failed to send. Please try again.";
        feedback.className = "text-center mt-3 text-danger";
      }
    } catch (error) {
      console.error("Error:", error);
      feedback.textContent = "⚠️ There was a network error. Try again later.";
      feedback.className = "text-center mt-3 text-danger";
    }
  });
});
