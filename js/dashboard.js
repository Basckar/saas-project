(() => {
  const list = document.getElementById("requests-list");
  if (!list) return;
  const user = NovaStorage.getUser();
  const requests = NovaStorage.getRequests();
  const userName = document.getElementById("user-name");
  const total = document.getElementById("total-requests");
  const pending = document.getElementById("pending-requests");
  const empty = document.getElementById("empty-state");
  userName.textContent = user?.name || "کاربر عزیز";
  total.textContent = requests.length.toLocaleString("fa-IR");
  pending.textContent = requests
    .filter((item) => item.status === "در انتظار بررسی")
    .length.toLocaleString("fa-IR");
  empty.hidden = requests.length > 0;
  list.innerHTML = requests
    .map((request) => {
      const date = request.createdAt
        ? new Date(request.createdAt).toLocaleDateString("fa-IR")
        : "—";
      const money = Number(request.budget || 0).toLocaleString("fa-IR");
      return `<article class="request-item">
      <span class="request-symbol">▦</span>
      <div class="request-main"><b>${escapeHtml(request.service || "درخواست سرویس")}</b><small>ثبت‌کننده: ${escapeHtml(request.fullName || "—")} · تاریخ ثبت: ${date}</small><small>تاریخ شروع مدنظر: ${escapeHtml(request.startDate || "—")} · ${Number(request.usersCount || 0).toLocaleString("fa-IR")} کاربر</small></div>
      <div class="request-meta"><strong>${money} تومان</strong><span>${escapeHtml(request.status || "در انتظار بررسی")}</span></div>
    </article>`;
    })
    .join("");
  function escapeHtml(value) {
    return String(value).replace(
      /[&<>"']/g,
      (char) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[char],
    );
  }
  document.getElementById("logout-btn")?.addEventListener("click", () => {
    NovaStorage.logout();
    window.novaToast?.("از حساب نمایشی خارج شدید.");
    setTimeout(() => {
      window.location.href = "index.html";
    }, 400);
  });
})();
