"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // عناصر پنجره ورود
  const loginModal = document.getElementById("login-modal");
  const loginForm = document.getElementById("login-form");
  const toast = document.getElementById("toast");

  // نمایش پیام
  function showToast(message, type = "success") {
    if (!toast) return;

    toast.textContent = message;
    toast.classList.remove("show", "success", "error");
    toast.classList.add("show", type);

    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

  // باز کردن پنجره ورود
  function openLogin() {
    if (!loginModal) {
      showToast("پنجره ورود در صفحه پیدا نشد.", "error");
      return;
    }

    loginModal.classList.add("open");
    loginModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    const phoneInput = document.getElementById("login-phone");

    if (phoneInput) {
      window.setTimeout(() => phoneInput.focus(), 100);
    }
  }

  // بستن پنجره ورود
  function closeLogin() {
    if (!loginModal) return;

    loginModal.classList.remove("open");
    loginModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  // اتصال دکمه‌های ورود و خروج به رویداد کلیک
  document.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof Element)) return;

    if (target.closest("[data-open-login]")) {
      event.preventDefault();
      openLogin();
      return;
    }

    if (target.closest("[data-close-login]")) {
      event.preventDefault();
      closeLogin();
      return;
    }

    // بستن پنجره با کلیک روی فضای تاریک اطراف آن
    if (target === loginModal) {
      closeLogin();
    }

    // منوی موبایل
    const menuButton = target.closest(".menu-toggle");
    if (menuButton) {
      const nav = document.querySelector(".main-nav");

      if (nav) {
        nav.classList.toggle("open");
        menuButton.setAttribute(
          "aria-expanded",
          String(nav.classList.contains("open")),
        );
      }
    }
  });

  // بستن پنجره با کلید Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLogin();
    }
  });

  // ابزار ذخیره و خواندن اطلاعات برای صفحات دیگر
  window.Nova = {
    showToast,

    saveRequest(request) {
      try {
        const requests = JSON.parse(
          localStorage.getItem("nova_requests") || "[]",
        );

        requests.unshift({
          ...request,
          id: Date.now(),
          createdAt: new Date().toISOString(),
        });

        localStorage.setItem("nova_requests", JSON.stringify(requests));

        return true;
      } catch (error) {
        console.error("خطا در ذخیره درخواست:", error);
        showToast("ذخیره اطلاعات انجام نشد.", "error");
        return false;
      }
    },

    getRequests() {
      try {
        return JSON.parse(localStorage.getItem("nova_requests") || "[]");
      } catch {
        return [];
      }
    },

    getCurrentUser() {
      try {
        return JSON.parse(localStorage.getItem("nova_user") || "null");
      } catch {
        return null;
      }
    },

    logout() {
      localStorage.removeItem("nova_user");
      showToast("از حساب نمایشی خارج شدید.");
      window.location.href = "index.html";
    },
  };

  // جلوگیری از ارسال معمولی فرم و نمایش خطاهای واضح
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!loginForm.checkValidity()) {
        loginForm.reportValidity();
        return;
      }

      // پردازش ورود در فایل login.js انجام می‌شود.
      // اینجا فقط جلوی رفرش ناخواسته صفحه گرفته می‌شود.
    });
  }
});
