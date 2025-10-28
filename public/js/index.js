"use strict";

(() => {
  const ready = (fn) =>
    document.readyState === "loading"
      ? document.addEventListener("DOMContentLoaded", fn)
      : fn();

  ready(() => {
    // ==========================
    // 🧭 Highlight Active Nav Link
    // ==========================
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

    // ==========================
    // 📅 Auto-update Footer Year
    // ==========================
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ==========================
    // 🦊 MetaMask Wallet Connect
    // ==========================
    let userAddress = null;
    const connect = document.querySelector("#wallet-connect");

    async function connectWallet() {
      try {
        if (window.ethereum) {
          // Ask MetaMask for access
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });

          // Save the wallet address
          userAddress = accounts[0];

          // Shorten display for button
          const walletString = `${userAddress.substring(0, 6)}...${userAddress.substring(38)}`;
          connect.innerHTML = walletString;

          // Optional: Add a connected style
          connect.classList.add("connected");

          console.log("✅ Connected Wallet:", userAddress);
        } else {
          alert("MetaMask not detected! Please install MetaMask to continue.");
        }
      } catch (error) {
        console.error("❌ MetaMask connection failed:", error);
      }
    }

    // Add click event listener
    if (connect) {
      connect.addEventListener("click", connectWallet);
    }

    // Auto-connect when page loads
    window.addEventListener("load", () => {
      if (window.ethereum) {
        connectWallet();
      }
    });
  });
})();
