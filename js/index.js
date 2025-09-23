// /js/index.js
"use strict";

(() => {
  const ready = (fn) =>
    document.readyState === "loading"
      ? document.addEventListener("DOMContentLoaded", fn)
      : fn();

  ready(() => {
    // highlight nav link for the current page
    const path = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".navbar .nav-link").forEach((a) => {
      const href = a.getAttribute("href");
      if (href && path === href.replace("./", "")) {
        a.classList.add("active");
      }
    });
  });
})();
