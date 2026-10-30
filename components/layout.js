"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("header");
  const footer = document.getElementById("footer");

  if (header && typeof window.renderHeader === "function") {
    header.innerHTML = window.renderHeader();
  }

  if (footer && typeof window.renderFooter === "function") {
    footer.innerHTML = window.renderFooter();
  }

  // مشخص کردن صفحه فعال در منو
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".main-nav a[data-page]").forEach((link) => {
    if (link.dataset.page === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    }
  });
});
