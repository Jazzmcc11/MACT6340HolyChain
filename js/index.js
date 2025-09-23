// /js/index.js
"use strict";

(() => {
  // helper: run after DOM is ready
  const ready = (fn) =>
    document.readyState === "loading"
      ? document.addEventListener("DOMContentLoaded", fn)
      : fn();

  ready(() => {
    // connect to test button (the one you added in index.html)
    const btn = document.querySelector("#testButton");
    if (btn) {
      btn.addEventListener("click", () => {
        console.log("Thank you for clicking.");
        alert("Thank you for clicking!");
      });
    }

    // optional: highlight nav link for the current page
    const path = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".navbar .nav-link").forEach((a) => {
      const href = a.getAttribute("href");
      if (href && path === href.replace("./", "")) {
        a.classList.add("active");
      }
    });
  });
})();
