"use strict";

(() => {
  const ready = (fn) =>
    document.readyState === "loading"
      ? document.addEventListener("DOMContentLoaded", fn)
      : fn();

  ready(() => {
    // Highlight the nav link that matches the current route
    const path = location.pathname;

    document.querySelectorAll(".navbar .nav-link").forEach((a) => {
      const href = a.getAttribute("href");

      // Handle homepage and other routes correctly
      if ((path === "/" && href === "/") || (href !== "/" && path.startsWith(href))) {
        a.classList.add("active");
      } else {
        a.classList.remove("active");
      }
    });

    // Auto-update footer year
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });
})();
