"use strict";

(function () {
  const list = document.getElementById("requests-list");

  // اگر این فایل در صفحه دیگری بارگذاری شد، اجرا نشود.
  if (!list) return;

  const user = Nova.getCurrentUser();

  // جلوگیری از ورود مستقیم به داشبورد بدون ورود کاربر
  if (!user || !user.loggedIn) {
    window.location.replace("index.html#login");
    return;
  }

  const requests = Nova.getRequests();

  const userName = document.getElementById("user-name");
  const total = document.getElementById("total-requests");
  const pending = document.getElementById("pending-requests");
  const empty = document.getElementById("empty-state");
  const logoutButton = document.getElementById("logout-btn");

  // نمایش نام کاربر
  if (userName) {
    userName.textContent = user.name || user.username || "کاربر عزیز";
  }

  // تعداد کل درخواست‌ها
  if (total) {
    total.textContent = requests.length.toLocaleString("fa-IR");
  }

  // تعداد درخواست‌های در انتظار بررسی
  const pendingCount = requests.filter((item) => {
    return item.status === "در انتظار بررسی";
  }).length;

  if (pending) {
    pending.textContent = pendingCount.toLocaleString("fa-IR");
  }

  // نمایش وضعیت خالی بودن لیست
  if (empty) {
    empty.hidden = requests.length > 0;
  }

  // ساخت لیست درخواست‌ها
  list.innerHTML = requests
    .map((request) => {
      const date = request.createdAt
        ? new Date(request.createdAt).toLocaleDateString("fa-IR")
        : "—";

      const money = Number(request.budget || 0).toLocaleString("fa-IR");

      const service = escapeHtml(request.service || "درخواست سرویس");
      const fullName = escapeHtml(request.fullName || "—");
      const startDate = escapeHtml(request.startDate || "—");
      const usersCount = Number(request.usersCount || 0).toLocaleString(
        "fa-IR",
      );
      const status = escapeHtml(request.status || "در انتظار بررسی");

      return `
        <article class="request-item">

          <span class="request-symbol">▦</span>

          <div class="request-main">
            <b>${service}</b>

            <small>
              ثبت‌کننده: ${fullName}
              · تاریخ ثبت: ${date}
            </small>

            <small>
              تاریخ شروع مدنظر: ${startDate}
              · ${usersCount} کاربر
            </small>
          </div>

          <div class="request-meta">
            <strong>${money} تومان</strong>
            <span>${status}</span>
          </div>

        </article>
      `;
    })
    .join("");

  // جلوگیری از ورود کد HTML ناخواسته در اطلاعات کاربر
  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      };

      return entities[char];
    });
  }

  // خروج از حساب
  if (logoutButton) {
    logoutButton.addEventListener("click", function () {
      Nova.logout();
    });
  }
})();
