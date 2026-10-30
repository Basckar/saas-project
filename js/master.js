(function () {
"use strict";

  const pageContent = document.getElementById("page-content");
  const headerRoot = document.getElementById("site-header");
  const footerRoot = document.getElementById("site-footer");

  const pages = {
    home: "../views/home.html",
    services: "../views/services.html",
    plans: "../views/plans.html",
    about: "../views/about.html",
    contact: "../views/contact.html",
    dashboard: "../views/dashboard.html"
  };

  function currentPage() {
    const requested = location.hash.replace("#", "").trim();
    return pages[requested] ? requested : "home";
  }

  async function loadPage(name, updateHash = true) {
    const page = pages[name] ? name : "home";
    pageContent.innerHTML = '<div class="nova-loading">در حال بارگذاری...</div>';

    try {
      const response = await fetch(pages[page]);
      if (!response.ok) throw new Error("صفحه بارگذاری نشد");
      pageContent.innerHTML = await response.text();

      if (updateHash) history.replaceState(null, "", "#" + page);
      document.querySelectorAll("[data-page]").forEach(link => {
        const active = link.dataset.page === page;
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
      });

      closeMobileMenu();
      pageContent.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      pageContent.innerHTML = `
        <section class="nova-section">
          <h1>بارگذاری صفحه انجام نشد</h1>
          <p>لطفاً پروژه را با افزونه Live Server اجرا کنید؛ باز کردن مستقیم فایل‌ها ممکن است مانع بارگذاری صفحات شود.</p>
        </section>`;
      console.error(error);
    }
  }

  function closeMobileMenu() {
    const nav = document.getElementById("nova-nav");
    const toggle = document.querySelector('[data-action="toggle-menu"]');
    if (nav) nav.classList.remove("open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }

  function refreshHeader() {
    if (typeof window.renderHeader === "function") {
      headerRoot.innerHTML = window.renderHeader();
    }
  }

  function showLogin() {
    const username = prompt("نام کاربری را وارد کنید (ورود نمایشی):");
    if (!username || !username.trim()) return;
    localStorage.setItem("nova_demo_user", username.trim());
    refreshHeader();
    loadPage("dashboard");
  }

  document.addEventListener("click", function (event) {
    const pageLink = event.target.closest("[data-page]");
    if (pageLink) {
      event.preventDefault();
      loadPage(pageLink.dataset.page);
      return;
    }

    const actionElement = event.target.closest("[data-action]");
    if (!actionElement) return;

    const action = actionElement.dataset.action;
    if (action === "toggle-menu") {
      const nav = document.getElementById("nova-nav");
      const isOpen = nav.classList.toggle("open");
      actionElement.setAttribute("aria-expanded", String(isOpen));
    } else if (action === "login") {
      showLogin();
    } else if (action === "dashboard") {
      loadPage("dashboard");
    } else if (action === "logout") {
      localStorage.removeItem("nova_demo_user");
      refreshHeader();
      loadPage("home");
    }
  });

  window.addEventListener("hashchange", function () {
    loadPage(currentPage(), false);
  });

  document.addEventListener("DOMContentLoaded", function () {
    if (typeof window.renderHeader === "function") {
      headerRoot.innerHTML = window.renderHeader();
    }
    if (typeof window.renderFooter === "function") {
      footerRoot.innerHTML = window.renderFooter();
    }
    loadPage(currentPage(), false);
  });

  window.NovaMaster = { loadPage };
})();