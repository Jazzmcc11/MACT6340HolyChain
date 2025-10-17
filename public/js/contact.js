// public/js/contact.js
// Handles sending the contact form to /mail

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // grab values
    const subject = document.querySelector("#subject")?.value || "Website Inquiry";
    const message = document.querySelector("#message")?.value || "";

    try {
      const response = await fetch("/mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sub: subject, txt: message }),
      });

      const data = await response.json();

      if (data.result === "success") {
        alert("✅ Message sent successfully!");
        window.location.href = "/thanks.html";
      } else {
        alert("❌ Message failed to send. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("⚠️ There was a network error. Try again later.");
    }
  });
});
