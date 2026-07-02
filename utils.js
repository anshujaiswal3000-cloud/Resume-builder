// Utility file: common helper functions jo multiple JS files me use hote hain.
const ResumeUtils = (() => {
  // Single element select karne ka shortcut, document.querySelector ko short banata hai.
  const $ = (selector) => document.querySelector(selector);
  // Multiple elements select karke array me convert karta hai, loop easy ho jata hai.
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));

  // User input ko safe HTML banata hai, taaki typed text layout/code break na kare.
  function escapeHTML(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // GitHub/LinkedIn links me https missing ho to automatically add karta hai.
  function normalizeUrl(value) {
    const trimmed = String(value || "").trim();
    if (!trimmed) return "";
    return /^https?:/i.test(trimmed) ? trimmed : `https://${trimmed}`;
  }

  // Comma separated values ko clean array me convert karta hai, e.g. skills badges.
  function splitTags(value) {
    return String(value || "").split(",").map((item) => item.trim()).filter(Boolean);
  }

  // Textarea ke lines ko clean array me convert karta hai, e.g. projects list.
  function splitLines(value) {
    return String(value || "").split(/\n+/).map((item) => item.trim()).filter(Boolean);
  }

  // Bottom-right message popup show karta hai for success/error actions.
  function showToast(message) {
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 2300);
  }

  // Name se initials generate karta hai jab profile photo upload nahi hoti.
  function getInitials(name) {
    const words = String(name || "Student").trim().split(/\s+/).slice(0, 2);
    return words.map((word) => word[0] || "").join("").toUpperCase() || "S";
  }

  // Name ke basis par avatar ka fallback color select karta hai.
  function avatarColor(name) {
    const colors = ["#0f766e", "#1d4ed8", "#7c3aed", "#be123c", "#b45309"];
    const total = String(name || "student").split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return colors[total % colors.length];
  }

  // Public helpers export karta hai so app.js and renderer.js use kar sake.
  return { $, $$, escapeHTML, normalizeUrl, splitTags, splitLines, showToast, getInitials, avatarColor };
})();
